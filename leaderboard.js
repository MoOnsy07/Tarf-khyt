/* ============================================================
   leaderboard.js — الليدربورد العام الموحد لـ "طرف الخيط"
   المصدر الأساسي: public.case_scores عبر RPCs الموحدة.
   قبل تشغيل LEADERBOARD_UNIFIED_SETUP.sql يوجد fallback للنظام القديم
   حتى لا تتعطل صفحة الليدربورد أثناء الانتقال.
   ============================================================ */

const Leaderboard = (() => {
  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

  let client = null;
  function getClient(){
    if(typeof sb !== 'undefined' && sb && typeof sb.rpc === 'function') return sb;
    if(!client) client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return client;
  }

  const NAME_STORAGE_KEY = 'ca_player_name';
  const LEGACY_NAME_STORAGE_KEY = 'tarafkhyt_player_name';
  const VISITOR_ID_KEY = 'ca_visitor_id';

  function getSavedPlayerName(){
    try{
      let name = localStorage.getItem(NAME_STORAGE_KEY);
      if(!name){
        name = localStorage.getItem(LEGACY_NAME_STORAGE_KEY);
        if(name) localStorage.setItem(NAME_STORAGE_KEY, name);
      }
      return name;
    }catch(e){ return null; }
  }

  function getVisitorId(fallback){
    if(fallback) return String(fallback).slice(0,128);
    try{
      let id = localStorage.getItem(VISITOR_ID_KEY);
      if(!id){
        id = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : ('v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2));
        localStorage.setItem(VISITOR_ID_KEY, id);
      }
      return id;
    }catch(e){ return ''; }
  }

  function rpcMissing(error){
    const msg = String((error && (error.message || error.details || error.hint)) || '');
    return /does not exist|not found|PGRST202|42883/i.test(msg);
  }

  async function submitScore({ caseId, caseTitle, points, solveTimeSeconds, endingType, visitorId }){
    if((endingType || 'good') !== 'good') return { skipped:true };

    const playerName = String(getSavedPlayerName() || '').trim().replace(/\s+/g, ' ').slice(0,30);
    const cleanVisitorId = getVisitorId(visitorId);
    const cleanCaseId = String(caseId || '').trim().slice(0,120);
    if(playerName.length < 2 || !cleanVisitorId || !cleanCaseId) return { skipped:true };

    const safeScore = Math.max(0, Math.floor(Number(points) || 0));
    const safeTime = Math.max(1, Math.floor(Number(solveTimeSeconds) || 1));

    try{
      const { data, error } = await getClient().rpc('submit_score_v2', {
        p_case_id: cleanCaseId,
        p_case_title: String(caseTitle || cleanCaseId).slice(0,160),
        p_visitor_id: cleanVisitorId,
        p_player_name: playerName,
        p_score: safeScore,
        p_points_left: null,
        p_hints_used: 0,
        p_ending_id: 'good',
        p_solve_time_seconds: safeTime,
      });

      if(!error) return { data };
      if(!rpcMissing(error)){
        console.error('Leaderboard.submitScore error', error);
        return { error };
      }
    }catch(err){
      console.warn('submit_score_v2 unavailable; using legacy leaderboard fallback.', err);
    }

    try{
      const { data, error } = await getClient()
        .from('leaderboard_entries')
        .insert([{
          player_name: playerName,
          visitor_id: cleanVisitorId,
          case_id: cleanCaseId,
          case_title: String(caseTitle || cleanCaseId).slice(0,160),
          points: safeScore,
          solve_time_seconds: safeTime,
          ending_type: 'good',
        }]);
      if(error){ console.error('Legacy leaderboard submit error', error); return { error }; }
      return { data, legacy:true };
    }catch(err){
      console.error('Leaderboard submit failed', err);
      return { error:err };
    }
  }

  async function rpcRows(name, args){
    try{
      const { data, error } = await getClient().rpc(name, args || {});
      if(error) return { rows:[], error };
      return { rows:data || [], error:null };
    }catch(error){
      return { rows:[], error };
    }
  }

  async function getTopByCasesSolved(limit=50){
    const safeLimit = Math.min(200, Math.max(1, Math.floor(Number(limit) || 50)));
    const modern = await rpcRows('get_global_leaderboard_by_cases', { p_limit:safeLimit });
    if(!modern.error) return modern.rows;

    const { data, error } = await getClient()
      .from('leaderboard_by_cases_solved')
      .select('*')
      .order('cases_solved', { ascending:false })
      .order('total_points', { ascending:false })
      .limit(safeLimit);
    if(error){ console.error('getTopByCasesSolved error', modern.error, error); return []; }
    return data || [];
  }

  async function getTopByTotalPoints(limit=50){
    const safeLimit = Math.min(200, Math.max(1, Math.floor(Number(limit) || 50)));
    const modern = await rpcRows('get_global_leaderboard_by_points', { p_limit:safeLimit });
    if(!modern.error) return modern.rows;

    const { data, error } = await getClient()
      .from('leaderboard_by_total_points')
      .select('*')
      .order('total_points', { ascending:false })
      .limit(safeLimit);
    if(error){ console.error('getTopByTotalPoints error', modern.error, error); return []; }
    return data || [];
  }

  async function getFastestForCase(caseId, limit=50){
    const safeLimit = Math.min(200, Math.max(1, Math.floor(Number(limit) || 50)));
    const cleanCaseId = caseId ? String(caseId).slice(0,120) : null;
    const modern = await rpcRows('get_global_fastest', {
      p_case_id: cleanCaseId,
      p_limit: safeLimit,
    });
    if(!modern.error) return modern.rows;

    let query = getClient()
      .from('leaderboard_fastest_per_case')
      .select('*')
      .order('solve_time_seconds', { ascending:true })
      .limit(safeLimit);
    if(cleanCaseId) query = query.eq('case_id', cleanCaseId);
    const { data, error } = await query;
    if(error){ console.error('getFastestForCase error', modern.error, error); return []; }
    return data || [];
  }

  async function getCasesWithEntries(){
    const modern = await rpcRows('get_leaderboard_cases', {});
    if(!modern.error){
      return modern.rows.map(r=>({ caseId:r.case_id, caseTitle:r.case_title || r.case_id }));
    }

    const { data, error } = await getClient()
      .from('leaderboard_entries')
      .select('case_id, case_title')
      .eq('ending_type', 'good');
    if(error){ console.error('getCasesWithEntries error', modern.error, error); return []; }
    const seen = new Map();
    (data || []).forEach(row=>{ if(!seen.has(row.case_id)) seen.set(row.case_id, row.case_title || row.case_id); });
    return Array.from(seen, ([caseId, caseTitle])=>({ caseId, caseTitle }));
  }

  return {
    submitScore,
    getTopByCasesSolved,
    getTopByTotalPoints,
    getFastestForCase,
    getCasesWithEntries,
    getSavedPlayerName,
  };
})();

/* ============================================================
   Telegram popup cadence hotfix
   يظهر بعد القضية 1،3،5... ويختفي بعد 2،4،6...
   بنركبه بعد window.load لأن engine.js بيتحمّل بعد leaderboard.js.
   ============================================================ */
window.addEventListener('load', () => {
  if(typeof window.shouldShowTelegramInvite !== 'function' || typeof window.showTelegramInvite !== 'function') return;

  const LAST_COMPLETED_COUNT_KEY = 'ca_telegram_cta_last_completed_count_v2';
  const originalShowTelegramInvite = window.showTelegramInvite;

  window.shouldShowTelegramInvite = function(){
    if(typeof CASE === 'undefined' || typeof game === 'undefined' || !CASE || !game || game.screen !== 'ending') return false;

    try{
      if(localStorage.getItem('ca_telegram_cta_opened_v1') === '1') return false;

      const completedCount = (typeof getCompletedIds === 'function' ? getCompletedIds() : []).length;
      if(completedCount < 1 || completedCount % 2 === 0) return false;

      const lastShownForCount = Number(localStorage.getItem(LAST_COMPLETED_COUNT_KEY) || 0);
      if(lastShownForCount === completedCount) return false;

      return true;
    }catch(err){
      return false;
    }
  };

  window.showTelegramInvite = function(){
    if(!window.shouldShowTelegramInvite()) return;
    const completedCount = (typeof getCompletedIds === 'function' ? getCompletedIds() : []).length;

    originalShowTelegramInvite();

    if(document.getElementById('telegramInviteOverlay')){
      try{ localStorage.setItem(LAST_COMPLETED_COUNT_KEY, String(completedCount)); }catch(err){}
    }
  };
});
