-- طرف الخيط — إصلاح هوية الليدربورد: الجهاز + اسم اللاعب
-- شغّل الملف مرة واحدة من Supabase Dashboard > SQL Editor.
-- لا يحذف نتائج صحيحة؛ يفصل النتائج حسب (visitor_id + player_name).

begin;

-- 1) إزالة أي Unique قديم كان يمنع وجود اسمين مختلفين على نفس الجهاز لنفس القضية.
do $$
declare r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname='public'
      and t.relname='case_scores'
      and c.contype='u'
      and (
        select array_agg(a.attname order by u.ord)
        from unnest(c.conkey) with ordinality u(attnum, ord)
        join pg_attribute a on a.attrelid=t.oid and a.attnum=u.attnum
      ) = array['case_id','visitor_id']::text[]
  loop
    execute format('alter table public.case_scores drop constraint %I', r.conname);
  end loop;
end $$;

drop index if exists public.case_scores_case_visitor_uidx;

-- تنظيف تكرار حقيقي لنفس الهوية فقط، مع الاحتفاظ بأفضل نتيجة.
with ranked as (
  select ctid,
         row_number() over (
           partition by case_id, visitor_id, player_name
           order by case when ending_id='good' then 3 when ending_id='partial' then 2 else 1 end desc,
                    score desc nulls last,
                    solve_time_seconds asc nulls last,
                    updated_at desc nulls last,
                    ctid desc
         ) rn
  from public.case_scores
)
delete from public.case_scores c
using ranked r
where c.ctid=r.ctid and r.rn>1;

create unique index if not exists case_scores_case_visitor_player_uidx
  on public.case_scores(case_id, visitor_id, player_name);

-- 2) إصلاح RPC القديم المستخدم في supabase-client.js.
drop function if exists public.submit_score(text,text,text,integer,integer,integer,text);
create function public.submit_score(
  p_case_id text,
  p_visitor_id text,
  p_player_name text,
  p_score integer,
  p_points_left integer,
  p_hints_used integer,
  p_ending_id text
)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  old_row public.case_scores%rowtype;
  old_rank integer;
  new_rank integer;
  better boolean := false;
begin
  p_case_id := left(trim(coalesce(p_case_id,'')),120);
  p_visitor_id := left(trim(coalesce(p_visitor_id,'')),128);
  p_player_name := left(regexp_replace(trim(coalesce(p_player_name,'')), '[[:space:]]+', ' ', 'g'),30);
  p_score := greatest(coalesce(p_score,0),0);
  p_hints_used := greatest(coalesce(p_hints_used,0),0);
  p_ending_id := coalesce(nullif(trim(p_ending_id),''),'partial');

  if p_case_id='' or p_visitor_id='' or char_length(p_player_name)<2 then
    return false;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_visitor_id || '|' || p_player_name || '|' || p_case_id,0));

  select * into old_row
  from public.case_scores
  where case_id=p_case_id
    and visitor_id=p_visitor_id
    and player_name=p_player_name
  limit 1;

  if not found then
    insert into public.case_scores(
      case_id,visitor_id,player_name,score,points_left,hints_used,ending_id,created_at,updated_at
    ) values (
      p_case_id,p_visitor_id,p_player_name,p_score,p_points_left,p_hints_used,p_ending_id,now(),now()
    );
    return true;
  end if;

  old_rank := case old_row.ending_id when 'good' then 3 when 'partial' then 2 else 1 end;
  new_rank := case p_ending_id when 'good' then 3 when 'partial' then 2 else 1 end;
  better := new_rank > old_rank
         or (new_rank = old_rank and p_score > coalesce(old_row.score,0));

  if better then
    update public.case_scores
       set score=p_score,
           points_left=p_points_left,
           hints_used=p_hints_used,
           ending_id=p_ending_id,
           updated_at=now()
     where case_id=p_case_id
       and visitor_id=p_visitor_id
       and player_name=p_player_name;
  end if;

  return true;
end;
$$;

grant execute on function public.submit_score(text,text,text,integer,integer,integer,text) to anon, authenticated;

-- 3) إصلاح RPC الجديد: نفس القضية على نفس الجهاز لكن باسم مختلف = هوية مختلفة.
create or replace function public.submit_score_v2(
  p_case_id text,
  p_case_title text,
  p_visitor_id text,
  p_player_name text,
  p_score integer,
  p_points_left integer,
  p_hints_used integer,
  p_ending_id text,
  p_solve_time_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  old_row public.case_scores%rowtype;
  better boolean := false;
begin
  p_case_id := left(trim(coalesce(p_case_id,'')),120);
  p_case_title := left(trim(coalesce(p_case_title,p_case_id)),160);
  p_visitor_id := left(trim(coalesce(p_visitor_id,'')),128);
  p_player_name := left(regexp_replace(trim(coalesce(p_player_name,'')), '[[:space:]]+', ' ', 'g'),30);
  p_score := greatest(coalesce(p_score,0),0);
  p_hints_used := greatest(coalesce(p_hints_used,0),0);
  p_solve_time_seconds := greatest(coalesce(p_solve_time_seconds,1),1);

  if p_case_id='' or p_visitor_id='' or char_length(p_player_name)<2 or p_ending_id is distinct from 'good' then
    return false;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_visitor_id || '|' || p_player_name || '|' || p_case_id,0));

  select * into old_row
  from public.case_scores
  where case_id=p_case_id
    and visitor_id=p_visitor_id
    and player_name=p_player_name
  limit 1;

  if not found then
    insert into public.case_scores(
      case_id,case_title,visitor_id,player_name,score,points_left,hints_used,
      ending_id,solve_time_seconds,created_at,updated_at
    ) values (
      p_case_id,p_case_title,p_visitor_id,p_player_name,p_score,p_points_left,p_hints_used,
      'good',p_solve_time_seconds,now(),now()
    );
    return true;
  end if;

  better := old_row.ending_id is distinct from 'good'
         or p_score>coalesce(old_row.score,0)
         or (p_score=coalesce(old_row.score,0)
             and p_solve_time_seconds<coalesce(old_row.solve_time_seconds,2147483647));

  update public.case_scores
     set case_title=coalesce(nullif(p_case_title,''),case_title),
         score=case when better then p_score else score end,
         points_left=case when better then p_points_left else points_left end,
         hints_used=case when better then p_hints_used else hints_used end,
         ending_id='good',
         solve_time_seconds=case when better then p_solve_time_seconds else solve_time_seconds end,
         updated_at=now()
   where case_id=p_case_id
     and visitor_id=p_visitor_id
     and player_name=p_player_name;

  return true;
end;
$$;

grant execute on function public.submit_score_v2(text,text,text,text,integer,integer,integer,text,integer) to anon, authenticated;

-- 4) التجميع العام بقى حسب الجهاز + الاسم، وليس الجهاز وحده.
create or replace function public.get_global_leaderboard_by_cases(p_limit integer default 50)
returns table(visitor_id text, player_name text, cases_solved bigint, total_points bigint)
language sql stable security definer set search_path=public
as $$
  select c.visitor_id,
         c.player_name,
         count(*)::bigint as cases_solved,
         coalesce(sum(c.score),0)::bigint as total_points
  from public.case_scores c
  where c.ending_id='good'
  group by c.visitor_id,c.player_name
  order by count(*) desc,coalesce(sum(c.score),0) desc,c.player_name asc
  limit least(greatest(coalesce(p_limit,50),1),200);
$$;

grant execute on function public.get_global_leaderboard_by_cases(integer) to anon, authenticated;

create or replace function public.get_global_leaderboard_by_points(p_limit integer default 50)
returns table(visitor_id text, player_name text, cases_solved bigint, total_points bigint)
language sql stable security definer set search_path=public
as $$
  select c.visitor_id,
         c.player_name,
         count(*)::bigint as cases_solved,
         coalesce(sum(c.score),0)::bigint as total_points
  from public.case_scores c
  where c.ending_id='good'
  group by c.visitor_id,c.player_name
  order by coalesce(sum(c.score),0) desc,count(*) desc,c.player_name asc
  limit least(greatest(coalesce(p_limit,50),1),200);
$$;

grant execute on function public.get_global_leaderboard_by_points(integer) to anon, authenticated;

commit;

-- اختبار بعد التشغيل:
-- select player_name, count(*) filter(where ending_id='good') good_cases, count(*) total_rows
-- from public.case_scores
-- group by visitor_id, player_name
-- order by good_cases desc;
--
-- select * from public.get_global_leaderboard_by_cases(50);
