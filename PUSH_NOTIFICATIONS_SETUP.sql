-- طرف الخيط: تسجيل FCM tokens من Android والويب عبر RPC واحدة.
-- الإرسال يتم من Supabase Edge Function باسم send-push؛ لا تضع service_role
-- أو Firebase service account داخل ملفات الموقع أو GitHub.

alter table public.push_devices enable row level security;
revoke all on table public.push_devices from anon, authenticated;

create or replace function public.register_push_token(
  p_token text,
  p_install_id text default null,
  p_platform text default 'android',
  p_app_version text default null
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  v_token text := btrim(coalesce(p_token, ''));
  v_install text := nullif(left(btrim(coalesce(p_install_id, '')), 128), '');
  v_platform text := lower(btrim(coalesce(p_platform, '')));
  v_app_version text := nullif(left(btrim(coalesce(p_app_version, '')), 60), '');
begin
  if length(v_token) < 20
     or length(v_token) > 4096
     or v_token ~ '[[:space:]]' then
    return false;
  end if;

  if v_platform not in ('android', 'web') then
    return false;
  end if;

  if v_install is not null and length(v_install) < 8 then
    return false;
  end if;

  insert into public.push_devices(
    fcm_token, install_id, platform, app_version, enabled, last_seen_at
  )
  values (
    v_token, v_install, v_platform, v_app_version, true, now()
  )
  on conflict (fcm_token) do update set
    install_id = coalesce(excluded.install_id, public.push_devices.install_id),
    platform = excluded.platform,
    app_version = coalesce(excluded.app_version, public.push_devices.app_version),
    enabled = true,
    last_seen_at = now();

  return true;
end;
$$;

revoke all on function public.register_push_token(text, text, text, text) from public;
grant execute on function public.register_push_token(text, text, text, text)
  to anon, authenticated, service_role;

comment on function public.register_push_token(text, text, text, text) is
  'Validates and registers Android/web FCM tokens without exposing push_devices rows.';
