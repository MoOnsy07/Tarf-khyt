/* ============================================================
   leaderboard.js — الليدربورد الموحد لـ طرف الخيط
   يدعم العالمي + الأصدقاء + الصور الشخصية.
   ============================================================ */

const Leaderboard = (() => {
  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  const NAME_STORAGE_KEY = 'ca_player_name';
  const LEGACY_NAME_STORAGE_KEY = 'tarafkhyt_player_name';
  const VISITOR_ID_KEY = 'ca_visitor_id';
  let client = null;

  function getClient(){
    try{ if(typeof sb !== 'undefined' && sb && typeof sb.rpc === 'function') return sb; }catch(e){}
    if(!client) client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });
    return client;
  }

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
      const {data,error} = await getClient().rpc('submit_score_v2', {
        p_case_id:cleanCaseId,
        p_case_title:String(caseTitle || cleanCaseId).slice(0,160),
        p_visitor_id:cleanVisitorId,
        p_player_name:playerName,
        p_score:safeScore,
        p_points_left:null,
        p_hints_used:0,
        p_ending_id:'good',
        p_solve_time_seconds:safeTime,
      });
      if(!error) return {data};
      if(!rpcMissing(error)) return {error};
    }catch(err){}

    try{
      const {data,error} = await getClient().from('leaderboard_entries').insert([{
        player_name:playerName,
        visitor_id:cleanVisitorId,
        case_id:cleanCaseId,
        case_title:String(caseTitle || cleanCaseId).slice(0,160),
        points:safeScore,
        solve_time_seconds:safeTime,
        ending_type:'good',
      }]);
      return error ? {error} : {data,legacy:true};
    }catch(error){ return {error}; }
  }

  async function rpcRows(name,args){
    try{
      const {data,error} = await getClient().rpc(name,args || {});
      return error ? {rows:[],error} : {rows:data || [],error:null};
    }catch(error){ return {rows:[],error}; }
  }

  async function getTopByCasesSolved(limit=50){
    const safe = Math.min(200,Math.max(1,Math.floor(Number(limit)||50)));
    const r = await rpcRows('get_global_leaderboard_by_cases',{p_limit:safe});
    if(!r.error) return r.rows;
    const {data,error} = await getClient().from('leaderboard_by_cases_solved').select('*').order('cases_solved',{ascending:false}).order('total_points',{ascending:false}).limit(safe);
    return error ? [] : (data || []);
  }

  async function getTopByTotalPoints(limit=50){
    const safe = Math.min(200,Math.max(1,Math.floor(Number(limit)||50)));
    const r = await rpcRows('get_global_leaderboard_by_points',{p_limit:safe});
    if(!r.error) return r.rows;
    const {data,error} = await getClient().from('leaderboard_by_total_points').select('*').order('total_points',{ascending:false}).limit(safe);
    return error ? [] : (data || []);
  }

  async function getFastestForCase(caseId,limit=50){
    const safe = Math.min(200,Math.max(1,Math.floor(Number(limit)||50)));
    const clean = caseId ? String(caseId).slice(0,120) : null;
    const r = await rpcRows('get_global_fastest',{p_case_id:clean,p_limit:safe});
    if(!r.error) return r.rows;
    let q = getClient().from('leaderboard_fastest_per_case').select('*').order('solve_time_seconds',{ascending:true}).limit(safe);
    if(clean) q = q.eq('case_id',clean);
    const {data,error} = await q;
    return error ? [] : (data || []);
  }

  async function getFriendsByCasesSolved(limit=50){
    const safe = Math.min(200,Math.max(1,Math.floor(Number(limit)||50)));
    const r = await rpcRows('get_friends_leaderboard_by_cases',{p_limit:safe});
    return r.error ? [] : r.rows;
  }

  async function getFriendsByTotalPoints(limit=50){
    const safe = Math.min(200,Math.max(1,Math.floor(Number(limit)||50)));
    const r = await rpcRows('get_friends_leaderboard_by_points',{p_limit:safe});
    return r.error ? [] : r.rows;
  }

  async function getFriendsFastestForCase(caseId,limit=50){
    const safe = Math.min(200,Math.max(1,Math.floor(Number(limit)||50)));
    const r = await rpcRows('get_friends_fastest',{p_case_id:caseId ? String(caseId).slice(0,120) : null,p_limit:safe});
    return r.error ? [] : r.rows;
  }

  async function getCasesWithEntries(){
    const r = await rpcRows('get_leaderboard_cases',{});
    if(!r.error) return r.rows.map(x=>({caseId:x.case_id,caseTitle:x.case_title || x.case_id}));
    const {data,error} = await getClient().from('leaderboard_entries').select('case_id,case_title').eq('ending_type','good');
    if(error) return [];
    const seen = new Map();
    (data || []).forEach(x=>{ if(!seen.has(x.case_id)) seen.set(x.case_id,x.case_title || x.case_id); });
    return Array.from(seen,([caseId,caseTitle])=>({caseId,caseTitle}));
  }

  async function getSession(){
    try{
      const {data,error} = await getClient().auth.getSession();
      return error ? null : (data && data.session || null);
    }catch(e){ return null; }
  }

  async function hasFacebook(){
    const session = await getSession();
    const ids = session && session.user && Array.isArray(session.user.identities) ? session.user.identities : [];
    return ids.some(x=>x && x.provider === 'facebook');
  }

  return {
    submitScore,
    getTopByCasesSolved,
    getTopByTotalPoints,
    getFastestForCase,
    getFriendsByCasesSolved,
    getFriendsByTotalPoints,
    getFriendsFastestForCase,
    getCasesWithEntries,
    getSavedPlayerName,
    getSession,
    hasFacebook,
  };
})();

window.addEventListener('load', () => {
  if(typeof window.shouldShowTelegramInvite !== 'function' || typeof window.showTelegramInvite !== 'function') return;
  const KEY='ca_telegram_cta_last_completed_count_v2';
  const original=window.showTelegramInvite;
  window.shouldShowTelegramInvite=function(){
    if(typeof CASE==='undefined'||typeof game==='undefined'||!CASE||!game||game.screen!=='ending') return false;
    try{
      if(localStorage.getItem('ca_telegram_cta_opened_v1')==='1') return false;
      const count=(typeof getCompletedIds==='function'?getCompletedIds():[]).length;
      if(count<1||count%2===0) return false;
      return Number(localStorage.getItem(KEY)||0)!==count;
    }catch(e){return false;}
  };
  window.showTelegramInvite=function(){
    if(!window.shouldShowTelegramInvite()) return;
    const count=(typeof getCompletedIds==='function'?getCompletedIds():[]).length;
    original();
    if(document.getElementById('telegramInviteOverlay')) try{localStorage.setItem(KEY,String(count));}catch(e){}
  };
});
