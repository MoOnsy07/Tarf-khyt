-- ============================================================
-- CASE_REVIEWS_SETUP.sql
-- تقييمات اللاعبين (نجوم 1-5 + تعليق اختياري) بعد كل قضية.
-- شغّل الملف ده مرة واحدة في Supabase Dashboard → SQL Editor
-- قبل ما ترفع النسخة الجديدة من supabase-client.js و engine.js.
-- ============================================================

create table if not exists public.case_reviews (
  id           bigint generated always as identity primary key,
  case_id      text not null,
  visitor_id   text not null,
  player_name  text,
  rating       smallint not null check (rating between 1 and 5),
  comment      text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (case_id, visitor_id)
);

alter table public.case_reviews enable row level security;

-- مفيش قراءة أو كتابة مباشرة من الـ client — كل حاجة عن طريق
-- الـ RPC functions تحت (زي باقي جداول المشروع)
drop policy if exists "no direct access" on public.case_reviews;
create policy "no direct access" on public.case_reviews
  for all using (false) with check (false);

-- إرسال تقييم جديد، أو تحديث تقييم سابق لنفس (القضية + الجهاز)
create or replace function public.submit_review(
  p_case_id     text,
  p_visitor_id  text,
  p_player_name text,
  p_rating      smallint,
  p_comment     text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_case_id is null or p_visitor_id is null or p_rating is null
     or p_rating < 1 or p_rating > 5 then
    return false;
  end if;

  insert into public.case_reviews (case_id, visitor_id, player_name, rating, comment, updated_at)
  values (
    p_case_id, p_visitor_id,
    nullif(trim(p_player_name), ''),
    p_rating,
    nullif(trim(p_comment), ''),
    now()
  )
  on conflict (case_id, visitor_id)
  do update set
    player_name = excluded.player_name,
    rating      = excluded.rating,
    comment     = excluded.comment,
    updated_at  = now();

  return true;
end;
$$;

-- متوسط التقييم وعدد التقييمات لقضية معيّنة
create or replace function public.get_case_review_stats(p_case_id text)
returns table (avg_rating numeric, review_count bigint)
language sql
security definer
set search_path = public
as $$
  select
    coalesce(round(avg(rating)::numeric, 2), 0) as avg_rating,
    count(*) as review_count
  from public.case_reviews
  where case_id = p_case_id;
$$;

grant execute on function public.submit_review(text, text, text, smallint, text) to anon, authenticated;
grant execute on function public.get_case_review_stats(text) to anon, authenticated;
