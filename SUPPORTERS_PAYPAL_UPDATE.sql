-- ============================================================
-- طرف الخيط — إضافة PayPal لطرق دعم لوحة الشرف
-- شغّل هذا الملف مرة واحدة بعد SUPPORTERS_SETUP.sql
-- ============================================================

-- لو الجدول اتعمل بالنسخة القديمة اللي فيها check على payment_method،
-- نشيل القيد القديم ونضيف واحد يقبل PayPal كمان.
do $$
declare
  r record;
begin
  for r in
    select conname
    from pg_constraint
    where conrelid = 'public.supporters'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%payment_method%'
  loop
    execute format('alter table public.supporters drop constraint if exists %I', r.conname);
  end loop;
end $$;

alter table public.supporters
  add constraint supporters_payment_method_check
  check (payment_method in ('vodafone_cash','instapay','paypal'));

create or replace function public.submit_supporter(
  p_supporter_name text,
  p_payment_method text,
  p_reference_note text default null,
  p_amount numeric default null,
  p_consent_public boolean default true
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := regexp_replace(trim(coalesce(p_supporter_name,'')), '\s+', ' ', 'g');
  v_method text := lower(trim(coalesce(p_payment_method,'')));
  v_ref text := nullif(left(trim(coalesce(p_reference_note,'')),120),'');
begin
  if char_length(v_name) < 2 or char_length(v_name) > 40 then return false; end if;
  if v_method not in ('vodafone_cash','instapay','paypal') then return false; end if;
  if p_amount is not null and (p_amount <= 0 or p_amount > 1000000) then return false; end if;

  insert into public.supporters(supporter_name,payment_method,reference_note,amount,consent_public,status)
  values (left(v_name,40),v_method,v_ref,p_amount,coalesce(p_consent_public,true),'pending');
  return true;
exception when others then
  return false;
end;
$$;

grant execute on function public.submit_supporter(text,text,text,numeric,boolean) to anon, authenticated;
