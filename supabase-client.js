/* ============================================================
   إعدادات Supabase — حط بيانات مشروعك هنا
   (Project Settings → API في لوحة Supabase)
   ============================================================ */
const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ============================================================
   AUTH
   ============================================================ */

async function authSignUp(email, password){
  const { data, error } = await sb.auth.signUp({ email, password });
  return { data, error };
}

async function authSignIn(email, password){
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function authSignOut(){
  await sb.auth.signOut();
}

async function authGetSession(){
  const { data } = await sb.auth.getSession();
  return data.session; // null لو مفيش تسجيل دخول
}

/* ============================================================
   PROGRESS — تقدّم اللاعب في قضية معيّنة
   ============================================================ */

// بيرجع null لو مفيش تقدّم متسجل قبل كده لنفس القضية
async function loadProgress(caseId){
  const session = await authGetSession();
  if(!session) return null;
  const { data, error } = await sb
    .from('case_progress')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('case_id', caseId)
    .maybeSingle();
  if(error){ console.error('loadProgress error', error); return null; }
  return data;
}

// بيحفظ/يحدّث تقدّم اللاعب (upsert بيستخدم الـ unique constraint على user_id+case_id)
async function saveProgress(caseId, progress){
  const session = await authGetSession();
  if(!session) return; // لو مسجلش دخول، منحفظش (اللعبة برضو شغالة، بس من غير مزامنة)
  const payload = {
    user_id: session.user.id,
    case_id: caseId,
    collected: progress.collected || [],
    interrogated: progress.interrogated || {},
    audio_solved: !!progress.audioSolved,
    ending: progress.ending || null,
    completed_at: progress.ending ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await sb.from('case_progress').upsert(payload, { onConflict: 'user_id,case_id' });
  if(error) console.error('saveProgress error', error);
}

/* ============================================================
   UNLOCKS — إيه القضايا المفتوحة لليوزر ده
   ============================================================ */

async function listUnlockedCaseIds(){
  const session = await authGetSession();
  if(!session) return [];
  const { data, error } = await sb
    .from('case_unlocks')
    .select('case_id')
    .eq('user_id', session.user.id);
  if(error){ console.error('listUnlockedCaseIds error', error); return []; }
  return data.map(r => r.case_id);
}

// لمعرفة أنهي قضايا خلّصها اللاعب فعليًا (وصل لنهاية) — بيتستخدم في فتح السلاسل
async function listCompletedCaseIds(){
  const session = await authGetSession();
  if(!session) return [];
  const { data, error } = await sb
    .from('case_progress')
    .select('case_id')
    .eq('user_id', session.user.id)
    .not('ending', 'is', null);
  if(error){ console.error('listCompletedCaseIds error', error); return []; }
  return data.map(r => r.case_id);
}

// بتتنادى تلقائي أول ما قضية مجانية/سلسلة تتفتح لأول مرة، أو لاحقًا لما نظام الدفع الحقيقي يتفعّل
async function unlockCaseForUser(caseId, source){
  const session = await authGetSession();
  if(!session) return;
  const { error } = await sb
    .from('case_unlocks')
    .upsert({ user_id: session.user.id, case_id: caseId, source: source || 'free' }, { onConflict: 'user_id,case_id' });
  if(error) console.error('unlockCaseForUser error', error);
}
