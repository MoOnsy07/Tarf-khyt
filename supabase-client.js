/* ============================================================
   الاتصال بـ Supabase — للأكواد بس (مفيش حسابات/تسجيل دخول)
   ============================================================ */
const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ============================================================
   تسجيل اسم اللاعب فور تأكيده
   - منفصل عن جداول الليدربورد، لذلك الاسم لا يظهر في الترتيب
     قبل إنهاء قضية بنجاح.
   - الـRPC ينشئ صفًا واحدًا لكل جهاز/متصفح ويحدّث آخر ظهور له.
   - شغّل ملف PLAYER_REGISTRATION_SETUP.sql مرة واحدة في Supabase
     قبل رفع هذا الملف.
   ============================================================ */
async function registerPlayerName({ visitorId, playerName, pagePath, caseId }){
  const cleanVisitorId = String(visitorId || '').trim().slice(0, 128);
  const cleanPlayerName = String(playerName || '').trim().replace(/\s+/g, ' ').slice(0, 30);

  if(!cleanVisitorId || cleanPlayerName.length < 2) return false;

  try{
    const { data, error } = await sb.rpc('register_player_name', {
      p_visitor_id: cleanVisitorId,
      p_player_name: cleanPlayerName,
      p_page_path: String(pagePath || window.location.pathname || '/').slice(0, 200),
      p_case_id: caseId == null ? null : String(caseId).slice(0, 120),
    });

    if(error){
      console.error('registerPlayerName error', error);
      return false;
    }
    return data === true;
  }catch(err){
    console.error('registerPlayerName failed', err);
    return false;
  }
}

/* بيحاول يفك الكود لقضية معيّنة. بيرجع true لو الكود صح ولسه ما اتستخدمش،
   وبيعلّمه "مستخدم" في نفس اللحظة عشان نفس الكود مايتصرفش مرتين.
   ملحوظة أمنية: الـRPC يحمي استهلاك الكود نفسه، لكن فتح القضية بعد النجاح محفوظ
   محليًا في المتصفح حاليًا؛ حماية محتوى Premium بالكامل محتاجة entitlement من السيرفر
   وتحميل المحتوى المدفوع بعد التحقق، مش مجرد localStorage. */
async function redeemCode(caseId, code){
  const cleanCode = (code || '').trim().toUpperCase();
  if(!cleanCode) return false;
  const { data, error } = await sb.rpc('redeem_code', { p_case_id: caseId, p_code: cleanCode });
  if(error){ console.error('redeemCode error', error); return false; }
  return data === true;
}

/* ============================================================
   الليدربورد العام — نقاط الأداء (score) بتتبعت آخر كل قضية، مع
   لقب اللاعب. أفضل نتيجة بس هي اللي بتتسجل لكل (قضية + جهاز).
   محتاج جدول وfunctions على Supabase — شوف leaderboard-setup.sql
   ============================================================ */
async function submitScore({ caseId, visitorId, playerName, score, pointsLeft, hintsUsed, endingId }){
  const { error } = await sb.rpc('submit_score', {
    p_case_id: caseId,
    p_visitor_id: visitorId,
    p_player_name: playerName,
    p_score: score,
    p_points_left: pointsLeft,
    p_hints_used: hintsUsed,
    p_ending_id: endingId,
  });
  if(error){ console.error('submitScore error', error); return false; }
  return true;
}

async function fetchLeaderboard(caseId, limit=10){
  const { data, error } = await sb.rpc('get_leaderboard', { p_case_id: caseId, p_limit: limit });
  if(error){ console.error('fetchLeaderboard error', error); return []; }
  return data || [];
}
