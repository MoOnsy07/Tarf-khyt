-- طرف الخيط — توحيد الليدربورد على public.case_scores
-- شغّل الملف مرة واحدة من Supabase Dashboard > SQL Editor.
begin;

create table if not exists public.case_scores (
  case_id text not null,
  visitor_id text not null,
  player_name text not null,
  score integer not null default 0,
  points_left integer,
  hints_used integer not null default 0,
  ending_id text not null default 'good',
  case_title text,
  solve_time_seconds integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.case_scores add column if not exists case_title text;
alter table public.case_scores add column if not exists solve_time_seconds integer;
alter table public.case_scores add column if not exists created_at timestamptz not null default now();
alter table public.case_scores add column if not exists updated_at timestamptz not null default now();

with ranked as (
  select ctid,
         row_number() over (
           partition by case_id, visitor_id
           order by case when ending_id='good' then 1 else 0 end desc,
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

create unique index if not exists case_scores_case_visitor_uidx
  on public.case_scores(case_id, visitor_id);

do $$
begin
  if to_regclass('public.leaderboard_entries') is not null then
    execute $q$
      update public.case_scores c
         set case_title = x.case_title
        from (
          select case_id, max(case_title) case_title
          from public.leaderboard_entries
          where case_title is not null and trim(case_title)<>''
          group by case_id
        ) x
       where c.case_id=x.case_id
         and (c.case_title is null or trim(c.case_title)='')
    $q$;

    if exists (
      select 1 from information_schema.columns
      where table_schema='public' and table_name='leaderboard_entries' and column_name='visitor_id'
    ) then
      execute $q$
        update public.case_scores c
           set solve_time_seconds=x.solve_time_seconds
          from (
            select distinct on (case_id, visitor_id)
                   case_id, visitor_id, solve_time_seconds
            from public.leaderboard_entries
            where visitor_id is not null
              and ending_type='good'
              and solve_time_seconds is not null
            order by case_id, visitor_id, solve_time_seconds asc
          ) x
         where c.case_id=x.case_id
           and c.visitor_id=x.visitor_id
           and c.solve_time_seconds is null
      $q$;
    end if;
  end if;
end $$;

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

  perform pg_advisory_xact_lock(hashtextextended(p_visitor_id || '|' || p_case_id,0));

  select * into old_row
  from public.case_scores
  where case_id=p_case_id and visitor_id=p_visitor_id
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

  better := p_score>coalesce(old_row.score,0)
         or (p_score=coalesce(old_row.score,0)
             and p_solve_time_seconds<coalesce(old_row.solve_time_seconds,2147483647));

  update public.case_scores
     set player_name=p_player_name,
         case_title=coalesce(nullif(p_case_title,''),case_title),
         score=case when better then p_score else score end,
         points_left=case when better then p_points_left else points_left end,
         hints_used=case when better then p_hints_used else hints_used end,
         ending_id='good',
         solve_time_seconds=case when better then p_solve_time_seconds else solve_time_seconds end,
         updated_at=now()
   where case_id=p_case_id and visitor_id=p_visitor_id;

  return true;
end;
$$;

grant execute on function public.submit_score_v2(text,text,text,text,integer,integer,integer,text,integer) to anon, authenticated;

create or replace function public.get_global_leaderboard_by_cases(p_limit integer default 50)
returns table(visitor_id text, player_name text, cases_solved bigint, total_points bigint)
language sql stable security definer set search_path=public
as $$
  with good as (
    select * from public.case_scores where ending_id='good'
  ), latest_name as (
    select distinct on (visitor_id) visitor_id,player_name
    from good
    order by visitor_id,updated_at desc nulls last,created_at desc nulls last
  ), agg as (
    select visitor_id,count(*)::bigint cases_solved,coalesce(sum(score),0)::bigint total_points
    from good group by visitor_id
  )
  select a.visitor_id,n.player_name,a.cases_solved,a.total_points
  from agg a join latest_name n using(visitor_id)
  order by a.cases_solved desc,a.total_points desc,n.player_name asc
  limit least(greatest(coalesce(p_limit,50),1),200);
$$;

grant execute on function public.get_global_leaderboard_by_cases(integer) to anon, authenticated;

create or replace function public.get_global_leaderboard_by_points(p_limit integer default 50)
returns table(visitor_id text, player_name text, cases_solved bigint, total_points bigint)
language sql stable security definer set search_path=public
as $$
  with good as (
    select * from public.case_scores where ending_id='good'
  ), latest_name as (
    select distinct on (visitor_id) visitor_id,player_name
    from good
    order by visitor_id,updated_at desc nulls last,created_at desc nulls last
  ), agg as (
    select visitor_id,count(*)::bigint cases_solved,coalesce(sum(score),0)::bigint total_points
    from good group by visitor_id
  )
  select a.visitor_id,n.player_name,a.cases_solved,a.total_points
  from agg a join latest_name n using(visitor_id)
  order by a.total_points desc,a.cases_solved desc,n.player_name asc
  limit least(greatest(coalesce(p_limit,50),1),200);
$$;

grant execute on function public.get_global_leaderboard_by_points(integer) to anon, authenticated;

create or replace function public.get_global_fastest(p_case_id text default null,p_limit integer default 50)
returns table(visitor_id text,player_name text,case_id text,case_title text,solve_time_seconds integer,points integer,score integer)
language sql stable security definer set search_path=public
as $$
  select c.visitor_id,c.player_name,c.case_id,coalesce(c.case_title,c.case_id),
         c.solve_time_seconds,c.score,c.score
  from public.case_scores c
  where c.ending_id='good'
    and c.solve_time_seconds is not null
    and (p_case_id is null or c.case_id=p_case_id)
  order by c.solve_time_seconds asc,c.score desc,c.player_name asc
  limit least(greatest(coalesce(p_limit,50),1),200);
$$;

grant execute on function public.get_global_fastest(text,integer) to anon, authenticated;

create or replace function public.get_leaderboard_cases()
returns table(case_id text,case_title text)
language sql stable security definer set search_path=public
as $$
  select c.case_id,max(coalesce(c.case_title,c.case_id))
  from public.case_scores c
  where c.ending_id='good'
  group by c.case_id
  order by max(coalesce(c.case_title,c.case_id));
$$;

grant execute on function public.get_leaderboard_cases() to anon, authenticated;

drop function if exists public.get_leaderboard(text,integer);
create function public.get_leaderboard(p_case_id text,p_limit integer default 10)
returns table(visitor_id text,player_name text,score integer)
language sql stable security definer set search_path=public
as $$
  select c.visitor_id,c.player_name,c.score
  from public.case_scores c
  where c.case_id=p_case_id and c.ending_id='good'
  order by c.score desc,c.solve_time_seconds asc nulls last,c.updated_at asc
  limit least(greatest(coalesce(p_limit,10),1),100);
$$;

grant execute on function public.get_leaderboard(text,integer) to anon, authenticated;

commit;

-- فحص سريع بعد Run:
-- select * from public.get_global_leaderboard_by_cases(20);
-- select * from public.get_global_leaderboard_by_points(20);
