-- ============================================================
-- LEADERBOARD_IDENTITY_FIX.sql
-- المشكلة: leaderboard_entries كانت بتسجّل player_name بس، من غير
-- أي عمود بيربط الصف بجهاز/شخص معيّن. النتيجة: أي اتنين لاعبين
-- مختلفين اختاروا نفس الاسم المستعار كانوا بيتلموا في نفس صف
-- الليدربورد العام (نفس المشكلة اللي كانت بتخلّي إعادة اللعب
-- تضاعف النقاط، بس من زاوية "نفس الاسم" بدل "نفس القضية").
--
-- الحل: نضيف عمود visitor_id (بصمة الجهاز، نفس الفكرة المستخدمة
-- في case_scores)، ونخلي التجميع في الـviews يعتمد عليه بدل الاسم.
--
-- شغّل الملف ده مرة واحدة في Supabase Dashboard → SQL Editor،
-- بعد ما ترفع نسخة leaderboard.js و engine.js الجديدة.
-- ============================================================

-- 1) إضافة العمود (safe — مش هيأثر على الصفوف القديمة، هتفضل NULL)
alter table public.leaderboard_entries
  add column if not exists visitor_id text;

-- ============================================================
-- 2) قبل ما نعيد بناء الـviews: شوف تعريفها الحالي أولاً بالكويري
-- ده، وابعتلي النتيجة لو حابب أظبط الـviews تحت على قد التعريف
-- الأصلي بالظبط (فيه أعمدة أو ترتيب مختلف عن اللي متوقعه):
--
--   select viewname, definition from pg_views
--   where viewname in (
--     'leaderboard_by_total_points',
--     'leaderboard_by_cases_solved',
--     'leaderboard_fastest_per_case'
--   );
--
-- النسخة تحت "أفضل تخمين" مبنية على الأعمدة الظاهرة فعليًا في
-- الموقع (الترتيب، الاسم، النقاط، عدد القضايا) — لو مطابقة، شغّلها
-- عادي. لو عايز تتأكد 100% قبل ما تستبدل، شغّل الكويري فوق الأول.
-- ============================================================

-- مفتاح الهوية: visitor_id لو موجود (الصفوف الجديدة)، وإلا الاسم
-- (الصفوف القديمة قبل التحديث ده — هتفضل زي ما هي بدون دمج تلقائي)
create or replace view public.leaderboard_by_total_points as
with best_per_case as (
  select
    *,
    coalesce(visitor_id, 'name:' || player_name) as identity_key,
    row_number() over (
      partition by coalesce(visitor_id, 'name:' || player_name), case_id
      order by coalesce(points, 0) desc, solve_time_seconds asc nulls last, id asc
    ) as result_rank
  from public.leaderboard_entries
  where ending_type = 'good'
)
select
  identity_key,
  (array_agg(player_name order by id desc))[1] as player_name,
  sum(coalesce(points, 0))::bigint as total_points,
  count(*)::bigint as cases_solved
from best_per_case
where result_rank = 1
group by identity_key;

create or replace view public.leaderboard_by_cases_solved as
with best_per_case as (
  select
    *,
    coalesce(visitor_id, 'name:' || player_name) as identity_key,
    row_number() over (
      partition by coalesce(visitor_id, 'name:' || player_name), case_id
      order by coalesce(points, 0) desc, solve_time_seconds asc nulls last, id asc
    ) as result_rank
  from public.leaderboard_entries
  where ending_type = 'good'
)
select
  identity_key,
  (array_agg(player_name order by id desc))[1] as player_name,
  count(*)::bigint as cases_solved,
  sum(coalesce(points, 0))::bigint as total_points
from best_per_case
where result_rank = 1
group by identity_key;

create or replace view public.leaderboard_fastest_per_case as
with fastest_per_case as (
  select
    case_id,
    case_title,
    coalesce(visitor_id, 'name:' || player_name) as identity_key,
    player_name,
    coalesce(points, 0) as points,
    solve_time_seconds,
    row_number() over (
      partition by case_id, coalesce(visitor_id, 'name:' || player_name)
      order by solve_time_seconds asc nulls last, coalesce(points, 0) desc, id asc
    ) as result_rank
  from public.leaderboard_entries
  where ending_type = 'good'
)
select
  case_id,
  case_title,
  player_name,
  solve_time_seconds,
  points,
  identity_key
from fastest_per_case
where result_rank = 1;

-- ============================================================
-- ملاحظة: الصفوف القديمة (اللي اتسجلت قبل التحديث ده) visitor_id
-- بتاعها NULL، فهتفضل متجمّعة بالاسم زي الأول — يعني أرقام دعاء
-- المتراكمة من قبل مش هتتغيّر لوحدها. لو عايز تصفّرها أو تدمجها
-- صح، محتاج كويري تنظيف منفصل بعد ما تتأكد مين الصفوف بتاعتها.
--
-- تنبيه أمني: الـviews دي تمنع تكرار نفس القضية في الإجماليات، لكنها
-- لا تمنع لاعبًا من إرسال نقاط مزورة من المتصفح. التحقق الحقيقي من
-- النتيجة لازم ينتقل لاحقًا إلى Edge Function/RPC على السيرفر.
-- ============================================================
