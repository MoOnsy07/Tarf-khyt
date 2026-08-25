/* ============================================================
   طرف الخيط — Social Profile Sync
   - لا ينشئ Supabase Auth client إضافي.
   - يحفظ رابط صورة الحساب فقط، وليس ملف الصورة نفسه.
   - يربط نتائج الليدربورد بالحساب بعد تسجيل الدخول.
   - يحدّث قائمة أصدقاء Facebook الذين يستخدمون نفس التطبيق.
   ============================================================ */
(function(){
  'use strict';

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  const VISITOR_ID_KEY = 'ca_visitor_id';
  let running = false;
  let lastSession = null;
  let avatarObserver = null;

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

  async function getSession(){
    if(window.TarafCloud && typeof window.TarafCloud.getSession === 'function'){
      return await window.TarafCloud.getSession();
    }
    try{
      if(typeof sb !== 'undefined' && sb && sb.auth){
        const {data} = await sb.auth.getSession();
        return data && data.session || null;
      }
    }catch(e){}
    return null;
  }

  async function rest(path, session, body, prefer){
    if(!session || !session.access_token) throw new Error('No authenticated session');
    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: 'Bearer ' + session.access_token,
      'Content-Type': 'application/json',
    };
    if(prefer) headers.Prefer = prefer;
    const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
      method:'POST',
      headers,
      body: JSON.stringify(body == null ? {} : body),
    });
    if(!res.ok){
      let msg = 'Supabase request failed';
      try{ const json = await res.json(); msg = json.message || json.error || msg; }catch(e){}
      throw new Error(msg);
    }
    return res;
  }

  async function syncProfile(session){
    if(!session || !session.user) return;
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

    try{
      await rest('game_profiles?on_conflict=user_id', session, [payload], 'resolution=merge-duplicates,return=minimal');
    }catch(err){
      console.warn('social profile sync:', err && err.message || err);
    }

    const visitorId = localVisitorId();
    if(visitorId){
      try{ await rest('rpc/claim_visitor_scores', session, {p_visitor_id:visitorId}); }
      catch(err){ console.warn('score claim skipped:', err && err.message || err); }
    }
  }

  async function syncFacebookFriends(session){
    if(!session || !session.user) return;
    const fb = identityInfo(session.user, 'facebook');
    if(!fb || !session.provider_token) return;

    try{
      const url = 'https://graph.facebook.com/me/friends?fields=id&limit=5000&access_token=' + encodeURIComponent(session.provider_token);
      const res = await fetch(url, {credentials:'omit'});
      if(!res.ok) throw new Error('Facebook friends request failed');
      const json = await res.json();
      const ids = Array.isArray(json.data) ? json.data.map(x=>String(x && x.id || '')).filter(Boolean) : [];
      await rest('rpc/replace_facebook_friend_cache', session, {p_friend_ids:ids});
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

  function paintProfileAvatar(session){
    if(!/\/profile\.html$/i.test(location.pathname)) return;
    const el = document.querySelector('.pf-avatar');
    if(!el || !session || !session.user) return;
    const url = bestAvatar(session.user);
    if(!url) return;

    // مهم: لا نعيد innerHTML لو الصورة موجودة بالفعل، لتجنب MutationObserver loop.
    const existing = el.querySelector('img');
    if(el.dataset.socialAvatarUrl === url && existing && existing.getAttribute('src') === url) return;

    installAvatarStyle();
    el.classList.add('has-social-avatar');
    el.dataset.socialAvatarUrl = url;
    if(existing){
      if(existing.getAttribute('src') !== url) existing.setAttribute('src', url);
      return;
    }
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'صورة المحقق';
    img.referrerPolicy = 'no-referrer';
    el.replaceChildren(img);
  }

  async function run(sessionOverride){
    if(running) return;
    running = true;
    try{
      const session = sessionOverride || await getSession();
      lastSession = session || null;
      if(session && session.user){
        await syncProfile(session);
        await syncFacebookFriends(session);
        paintProfileAvatar(session);
      }
    }finally{ running = false; }
  }

  function installAvatarObserver(){
    if(avatarObserver || !/\/profile\.html$/i.test(location.pathname)) return;
    const root = document.getElementById('pf-root');
    if(!root) return;
    avatarObserver = new MutationObserver(()=>{
      if(lastSession && lastSession.user) paintProfileAvatar(lastSession);
    });
    avatarObserver.observe(root, {childList:true,subtree:true});
  }

  function boot(){
    installAvatarStyle();
    installAvatarObserver();
    run();
    window.addEventListener('taraf:cloud-sync-complete', e=>{
      const session = e && e.detail && e.detail.session;
      run(session || null);
    });
    window.addEventListener('taraf:auth-changed', ()=>run());
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
