/* ============================================================
   الاتصال بـ Supabase — للأكواد بس (مفيش حسابات/تسجيل دخول)
   ============================================================ */
const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ============================================================
   تسجيل اسم اللاعب فور تأكيده
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
    if(error){ console.error('registerPlayerName error', error); return false; }
    return data === true;
  }catch(err){ console.error('registerPlayerName failed', err); return false; }
}

async function redeemCode(caseId, code){
  const cleanCode = (code || '').trim().toUpperCase();
  if(!cleanCode) return { ok:false, reason:'empty' };
  let data, error;
  try{ ({ data, error } = await sb.rpc('redeem_code', { p_case_id: caseId, p_code: cleanCode })); }
  catch(networkErr){ console.error('redeemCode network error', networkErr); return { ok:false, reason:'network' }; }
  if(error){ console.error('redeemCode error', error); return { ok:false, reason:'network' }; }
  return { ok: data === true, reason: data === true ? null : 'invalid' };
}

async function submitScore({ caseId, visitorId, playerName, score, pointsLeft, hintsUsed, endingId }){
  const { error } = await sb.rpc('submit_score', {
    p_case_id: caseId, p_visitor_id: visitorId, p_player_name: playerName,
    p_score: score, p_points_left: pointsLeft, p_hints_used: hintsUsed, p_ending_id: endingId,
  });
  if(error){ console.error('submitScore error', error); return false; }
  return true;
}

async function fetchLeaderboard(caseId, limit=10){
  const { data, error } = await sb.rpc('get_leaderboard', { p_case_id: caseId, p_limit: limit });
  if(error){ console.error('fetchLeaderboard error', error); return []; }
  return data || [];
}

async function logCaseEvent({ caseId, visitorId, eventType, completed=null, ending=null }){
  try{
    const { error } = await sb.rpc('log_case_event', {
      p_case_id: String(caseId || '').slice(0, 120),
      p_visitor_id: String(visitorId || '').slice(0, 128),
      p_event_type: eventType, p_completed: completed, p_ending: ending,
    });
    if(error) console.error('logCaseEvent error', error);
  }catch(e){ console.error('logCaseEvent failed', e); }
}

async function submitReview({ caseId, visitorId, playerName, rating, comment }){
  try{
    const { error } = await sb.rpc('submit_review', {
      p_case_id: String(caseId || '').slice(0, 120),
      p_visitor_id: String(visitorId || '').slice(0, 128),
      p_player_name: String(playerName || '').slice(0, 30),
      p_rating: rating,
      p_comment: String(comment || '').slice(0, 240),
    });
    if(error){ console.error('submitReview error', error); return false; }
    return true;
  }catch(err){ console.error('submitReview failed', err); return false; }
}

async function fetchCaseReviewStats(caseId){
  try{
    const { data, error } = await sb.rpc('get_case_review_stats', { p_case_id: caseId });
    if(error){ console.error('fetchCaseReviewStats error', error); return null; }
    const row = Array.isArray(data) ? data[0] : data;
    if(!row) return { avg: 0, count: 0 };
    return { avg: Number(row.avg_rating || 0), count: Number(row.review_count || 0) };
  }catch(err){ console.error('fetchCaseReviewStats failed', err); return null; }
}

async function fetchCaseStats(){
  const { data, error } = await sb.rpc('get_case_stats');
  if(error){ console.error('fetchCaseStats error', error); return []; }
  return data || [];
}

/* ============================================================
   لوحة شرف الداعمين
   شغّل SUPPORTERS_SETUP.sql مرة واحدة في Supabase.
   ============================================================ */
async function submitSupporter({ supporterName, paymentMethod, referenceNote='', amount=null, consentPublic=true }){
  try{
    const numericAmount = amount === '' || amount == null ? null : Number(amount);
    const { data, error } = await sb.rpc('submit_supporter', {
      p_supporter_name: String(supporterName || '').trim().replace(/\s+/g,' ').slice(0,40),
      p_payment_method: String(paymentMethod || '').trim(),
      p_reference_note: String(referenceNote || '').trim().slice(0,120) || null,
      p_amount: Number.isFinite(numericAmount) ? numericAmount : null,
      p_consent_public: Boolean(consentPublic),
    });
    if(error){ console.error('submitSupporter error', error); return false; }
    return data === true;
  }catch(err){ console.error('submitSupporter failed', err); return false; }
}

async function fetchSupportersWall(limit=100){
  try{
    const { data, error } = await sb.rpc('get_supporters_wall', { p_limit: Math.max(1, Math.min(Number(limit)||100, 200)) });
    if(error){ console.error('fetchSupportersWall error', error); return []; }
    return data || [];
  }catch(err){ console.error('fetchSupportersWall failed', err); return []; }
}
