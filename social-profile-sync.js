/* ============================================================
   طرف الخيط — Social Profile Sync
   - يحفظ رابط صورة الحساب فقط، وليس ملف الصورة نفسه.
   - يربط نتائج الليدربورد بالحساب بعد تسجيل الدخول.
   - يحدّث قائمة أصدقاء Facebook الذين يستخدمون نفس التطبيق.
   ============================================================ */
(function(){
  'use strict';

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  const VISITOR_ID_KEY = 'ca_visitor_id';
  let client = null;
  let running = false;

  function getClient(){
    try{
      if(typeof sb !== 'undefined' && sb && sb.auth) return sb;
    }catch(e){}
    if(!window.supabase || typeof window.supabase.createClient !== 'function') return null;
    if(!client){
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
      });
    }
    return client;
  }

  function localVisitorId(){
    try{ return localStorage.getItem(VISITOR_ID_KEY) || ''; }
    catch(e){ return ''; }
  }

  function identityInfo(user, provider){
    const ids = user && Array.isArray(user.identities) ? user.identities : [];
    const item = ids.find(x => x && x.provider === provider);
    if(!item) return null;
    const data = item.identity_data || {};
    return {
      id: String(data.provider_id || data.sub || item.id || '').slice(0,128),
      avatar: String(data.avatar_url || data.picture || '').slice(0,2048),
      name: String(data.full_name || data.name || '').slice(0,160),
    };
  }

  function bestAvatar(user){
    const fb = identityInfo(user, 'facebook');
    const google = identityInfo(user, 'google');
    const meta = user && user.user_metadata || {};
    return (fb && fb.avatar) || (google && google.avatar) || String(meta.avatar_url || meta.picture || '').slice(0,2048);
  }

  function bestName(user){
    const meta = user && user.user_metadata || {};
    return String(meta.full_name || meta.name || '').slice(0,160);
  }

  async function syncProfile(session){
    const c = getClient();
    if(!c || !session || !session.user) return;
    const user = session.user;
    const fb = identityInfo(user, 'facebook');
    const google = identityInfo(user, 'google');
    let playerName = '';
    try{ playerName = (localStorage.getItem('ca_player_name') || localStorage.getItem('tarafkhyt_player_name') || '').trim().slice(0,30); }catch(e){}

    const payload = {
      user_id: user.id,
      player_name: playerName || null,
      avatar_url: bestAvatar(user) || null,
      full_name: bestName(user) || null,
      facebook_id: fb && fb.id || null,
      google_id: google && google.id || null,
      updated_at: new Date().toISOString(),
    };

    const {error} = await c.from('game_profiles').upsert(payload, {onConflict:'user_id'});
    if(error) console.warn('social profile sync:', error.message || error);

    const visitorId = localVisitorId();
    if(visitorId) await c.rpc('claim_visitor_scores', {p_visitor_id:visitorId});
  }

  async function syncFacebookFriends(session){
    const c = getClient();
    if(!c || !session || !session.user) return;
    const fb = identityInfo(session.user, 'facebook');
    if(!fb) return;

    const token = session.provider_token;
    if(!token) return; // هنحدّثها تلقائيًا عند أي Facebook OAuth جديد متاح فيه provider token.

    try{
      const url = 'https://graph.facebook.com/me/friends?fields=id&limit=5000&access_token=' + encodeURIComponent(token);
      const res = await fetch(url, {credentials:'omit'});
      if(!res.ok) throw new Error('Facebook friends request failed');
      const json = await res.json();
      const ids = Array.isArray(json.data) ? json.data.map(x=>String(x && x.id || '')).filter(Boolean) : [];
      await c.rpc('replace_facebook_friend_cache', {p_friend_ids:ids});
    }catch(err){
      console.warn('facebook friends sync skipped:', err && err.message || err);
    }
  }

  function installAvatarStyle(){
    if(document.getElementById('taraf-social-avatar-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-social-avatar-style';
    style.textContent = '.pf-avatar.has-social-avatar{overflow:hidden;background:var(--void,#0b0b0b);padding:0}.pf-avatar.has-social-avatar img{width:100%;height:100%;display:block;object-fit:cover}';
    document.head.appendChild(style);
  }

  async function paintProfileAvatar(){
    if(!/\/profile\.html$/i.test(location.pathname)) return;
    const c = getClient();
    const el = document.querySelector('.pf-avatar');
    if(!c || !el) return;
    const {data} = await c.auth.getSession();
    const session = data && data.session;
    if(!session || !session.user) return;
    const url = bestAvatar(session.user);
    if(!url) return;
    installAvatarStyle();
    el.classList.add('has-social-avatar');
    el.innerHTML = '<img src="' + String(url).replace(/"/g,'&quot;') + '" alt="صورة المحقق" referrerpolicy="no-referrer">';
  }

  async function run(){
    if(running) return;
    running = true;
    try{
      const c = getClient();
      if(!c) return;
      const {data} = await c.auth.getSession();
      const session = data && data.session;
      if(session && session.user){
        await syncProfile(session);
        await syncFacebookFriends(session);
        await paintProfileAvatar();
      }
    }finally{ running = false; }
  }

  function boot(){
    run();
    const c = getClient();
    if(c){
      c.auth.onAuthStateChange((event, session)=>{
        if(session && session.user) setTimeout(run, 0);
      });
    }
    if(/\/profile\.html$/i.test(location.pathname)){
      new MutationObserver(()=>paintProfileAvatar()).observe(document.getElementById('pf-root') || document.body, {childList:true,subtree:true});
    }
    window.addEventListener('taraf:cloud-sync-complete', run);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
