-- ============================================================
-- طرف الخيط — ربط تقدم اللاعب بحساب Supabase Auth
-- شغّل الملف مرة واحدة من Supabase Dashboard > SQL Editor.
-- الجداول الجديدة منفصلة عن case_progress الحالي، فلا يتم حذف أو تعديل أي تقدم قديم.
-- ============================================================

begin;

create table if not exists public.game_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  player_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint game_profiles_player_name_len check (player_name is null or char_length(player_name) between 2 and 30)
);

create table if not exists public.account_case_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id text not null,
  progress jsonb not null default '{}'::jsonb,
  client_saved_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, case_id),
  constraint account_case_progress_case_id_len check (char_length(case_id) between 1 and 120)
);

create index if not exists account_case_progress_user_updated_idx
  on public.account_case_progress(user_id, updated_at desc);

alter table public.game_profiles enable row level security;
alter table public.account_case_progress enable row level security;

drop policy if exists game_profiles_select_own on public.game_profiles;
create policy game_profiles_select_own on public.game_profiles
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists game_profiles_insert_own on public.game_profiles;
create policy game_profiles_insert_own on public.game_profiles
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists game_profiles_update_own on public.game_profiles;
create policy game_profiles_update_own on public.game_profiles
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists game_profiles_delete_own on public.game_profiles;
create policy game_profiles_delete_own on public.game_profiles
  for delete to authenticated
  using (auth.uid() = user_id);

drop policy if exists account_case_progress_select_own on public.account_case_progress;
create policy account_case_progress_select_own on public.account_case_progress
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists account_case_progress_insert_own on public.account_case_progress;
create policy account_case_progress_insert_own on public.account_case_progress
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists account_case_progress_update_own on public.account_case_progress;
create policy account_case_progress_update_own on public.account_case_progress
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists account_case_progress_delete_own on public.account_case_progress;
create policy account_case_progress_delete_own on public.account_case_progress
  for delete to authenticated
  using (auth.uid() = user_id);

revoke all on table public.game_profiles from anon;
revoke all on table public.account_case_progress from anon;
grant select, insert, update, delete on table public.game_profiles to authenticated;
grant select, insert, update, delete on table public.account_case_progress to authenticated;

create or replace function public.save_cloud_progress(
  p_case_id text,
  p_progress jsonb,
  p_client_saved_at timestamptz default now()
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_case_id text := left(trim(coalesce(p_case_id,'')),120);
  v_saved_at timestamptz := coalesce(p_client_saved_at, now());
begin
  if v_user_id is null or v_case_id = '' then
    return false;
  end if;

  insert into public.account_case_progress(
    user_id, case_id, progress, client_saved_at, created_at, updated_at
  ) values (
    v_user_id, v_case_id, coalesce(p_progress,'{}'::jsonb), v_saved_at, now(), now()
  )
  on conflict (user_id, case_id) do update
    set progress = excluded.progress,
        client_saved_at = excluded.client_saved_at,
        updated_at = now()
  where excluded.client_saved_at >= public.account_case_progress.client_saved_at;

  return true;
end;
$$;

grant execute on function public.save_cloud_progress(text,jsonb,timestamptz) to authenticated;
revoke execute on function public.save_cloud_progress(text,jsonb,timestamptz) from anon;

commit;

-- فحص بعد التشغيل:
-- select to_regclass('public.game_profiles') as profiles_table,
--        to_regclass('public.account_case_progress') as progress_table;
