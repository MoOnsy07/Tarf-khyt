/* ============================================================
   الاتصال بـ Supabase — للأكواد بس (مفيش حسابات/تسجيل دخول)
   ============================================================ */
const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* بيحاول يفك الكود لقضية معيّنة. بيرجع true لو الكود صح ولسه ما اتستخدمش،
   وبيعلّمه "مستخدم" في نفس اللحظة عشان محدش يقدر يستخدمه تاني.
   الفحص والتعديل بيحصلوا جوه Supabase نفسها (function)، مش من الكود اللي في المتصفح،
   فمحدش يقدر "يحتال" على النظام حتى لو فتح الـ Developer Tools. */
async function redeemCode(caseId, code){
  const cleanCode = (code || '').trim().toUpperCase();
  if(!cleanCode) return false;
  const { data, error } = await sb.rpc('redeem_code', { p_case_id: caseId, p_code: cleanCode });
  if(error){ console.error('redeemCode error', error); return false; }
  return data === true;
}
