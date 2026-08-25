/* ============================================================
   طرف الخيط — Cloud Progress Sync
   - اللعب يفضل شغال محليًا بدون حساب.
   - عند ربط الحساب: مزامنة التقدم بين الأجهزة عبر Supabase Auth.
   - يدعم Google + Facebook + رابط دخول بالبريد (Magic Link).
   ============================================================ */
(function(){
  'use strict';

  if(window.TarafCloud && window.TarafCloud.__loaded) return;

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  const SUPABASE_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  const PROFILE_TABLE = 'game_profiles';
  const PROGRESS_TABLE = 'account_case_progress';
  const COMPLETED_KEY = 'ca_completed';
  const PLAYER_NAME_KEY = 'ca_player_name';
  const LEGACY_PLAYER_NAME_KEY = 'tarafkhyt_player_name';
  const SYNC_STAMP_KEY = 'ca_cloud_last_sync_v1';
  const CLOUD_SCRIPT_VERSION = '2026-08-25-1';

  let clientPromise = null;
  let syncPromise = null;
  let engineHooked = false;
  let authSubscription = null;
  let profileObserver = null;
  let libraryObserver = null;

  function escapeHTML(value){
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function cleanName(value){
    return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 30);
  }

  function getLocalPlayerName(){
    try{
      let name = localStorage.getItem(PLAYER_NAME_KEY);
      if(!name){
        name = localStorage.getItem(LEGACY_PLAYER_NAME_KEY);
        if(name) localStorage.setItem(PLAYER_NAME_KEY, name);
      }
      return cleanName(name);
    }catch(e){ return ''; }
  }

  function setLocalPlayerName(name){
    const clean = cleanName(name);
    if(!clean) return;
    try{
      localStorage.setItem(PLAYER_NAME_KEY, clean);
      localStorage.setItem(LEGACY_PLAYER_NAME_KEY, clean);
    }catch(e){}
  }

  function ensureSupabaseLibrary(){
    if(window.supabase && typeof window.supabase.createClient === 'function') return Promise.resolve();
    return new Promise((resolve, reject)=>{
      const existing = document.querySelector('script[data-taraf-supabase-loader]');
      if(existing){
        existing.addEventListener('load', resolve, {once:true});
        existing.addEventListener('error', ()=>reject(new Error('تعذر تحميل مكتبة Supabase')), {once:true});
        return;
      }
      const script = document.createElement('script');
      script.src = SUPABASE_CDN;
      script.async = true;
      script.dataset.tarafSupabaseLoader = '1';
      script.onload = resolve;
      script.onerror = ()=>reject(new Error('تعذر تحميل مكتبة Supabase'));
      document.head.appendChild(script);
    });
  }

  async function getClient(){
    if(clientPromise) return clientPromise;
    clientPromise = (async()=>{
      try{
        if(typeof sb !== 'undefined' && sb && sb.auth) return sb;
      }catch(e){}

      await ensureSupabaseLibrary();
      return window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
      });
    })();
    return clientPromise;
  }

  function authRedirectURL(){
    return window.location.origin + '/profile.html?cloud=linked';
  }

  async function getSession(){
    try{
      const c = await getClient();
      const {data, error} = await c.auth.getSession();
      if(error) return null;
      return data && data.session ? data.session : null;
    }catch(e){ return null; }
  }

  async function getAccount(){
    const session = await getSession();
    if(!session || !session.user) return null;
    const meta = session.user.user_metadata || {};
    return {
      id: session.user.id,
      email: session.user.email || '',
      avatarUrl: meta.avatar_url || meta.picture || '',
      fullName: meta.full_name || meta.name || '',
      provider: session.user.app_metadata && session.user.app_metadata.provider || '',
      user: session.user,
    };
  }

  async function signInWithGoogle(){
    const c = await getClient();
    const {data, error} = await c.auth.signInWithOAuth({
      provider:'google',
      options:{ redirectTo: authRedirectURL() }
    });
    if(error) throw error;
    return data;
  }

  async function signInWithFacebook(){
    const c = await getClient();
    const {data, error} = await c.auth.signInWithOAuth({
      provider:'facebook',
      options:{
        redirectTo: authRedirectURL(),
        scopes:'email public_profile user_friends'
      }
    });
    if(error) throw error;
    return data;
  }

  async function sendMagicLink(email){
    const cleanEmail = String(email || '').trim().toLowerCase().slice(0, 254);
    if(!/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error('اكتب بريد إلكتروني صحيح.');
    const c = await getClient();
    const {data, error} = await c.auth.signInWithOtp({
      email: cleanEmail,
      options:{
        emailRedirectTo: authRedirectURL(),
        shouldCreateUser:true,
      }
    });
    if(error) throw error;
    return data;
  }

  async function signOut(){
    const c = await getClient();
    const {error} = await c.auth.signOut();
    if(error) throw error;
    dispatch('taraf:auth-changed', {signedIn:false});
    injectProfileCard(true);
  }

  function collectLocalProgress(){
    const result = new Map();
    try{
      for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i);
        if(!key || !key.startsWith('ca_progress_')) continue;
        const caseId = key.slice('ca_progress_'.length);
        if(!caseId) continue;
        try{
          const value = JSON.parse(localStorage.getItem(key) || 'null');
          if(value && typeof value === 'object') result.set(caseId, value);
        }catch(e){}
      }
    }catch(e){}
    return result;
  }

  function progressStamp(progress){
    const n = Number(progress && progress._savedAt || 0);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function dateStamp(value){
    const n = Date.parse(value || '');
    return Number.isFinite(n) ? n : 0;
  }

  function writeLocalProgress(caseId, progress, stamp){
    if(!caseId || !progress || typeof progress !== 'object') return;
    const next = {...progress, _savedAt: stamp || progressStamp(progress) || Date.now()};
    try{ localStorage.setItem('ca_progress_' + caseId, JSON.stringify(next)); }catch(e){}
  }

  function rebuildCompletedIds(){
    const ids = [];
    collectLocalProgress().forEach((progress, caseId)=>{
      if(progress && progress.ending) ids.push(caseId);
    });
    try{ localStorage.setItem(COMPLETED_KEY, JSON.stringify([...new Set(ids)])); }catch(e){}
    try{
      if(typeof app !== 'undefined' && app) app.completedIds = [...new Set(ids)];
    }catch(e){}
  }

  async function saveCaseToCloud(caseId, progress, account){
    const acc = account || await getAccount();
    if(!acc || !caseId || !progress) return false;
    const c = await getClient();
    const stamp = progressStamp(progress) || Date.now();
    const payload = {...progress, _savedAt: stamp};
    const {data, error} = await c.rpc('save_cloud_progress', {
      p_case_id: String(caseId).slice(0, 120),
      p_progress: payload,
      p_client_saved_at: new Date(stamp).toISOString(),
    });
    if(error){
      console.error('save_cloud_progress error', error);
      return false;
    }
    return data === true;
  }

  async function deleteCaseFromCloud(caseId){
    const acc = await getAccount();
    if(!acc || !caseId) return false;
    const c = await getClient();
    const {error} = await c.from(PROGRESS_TABLE)
      .delete()
      .eq('user_id', acc.id)
      .eq('case_id', String(caseId).slice(0,120));
    if(error){ console.error('cloud progress delete error', error); return false; }
    return true;
  }

  async function syncProfile(acc){
    const c = await getClient();
    const {data, error} = await c.from(PROFILE_TABLE)
      .select('player_name,updated_at')
      .eq('user_id', acc.id)
      .maybeSingle();

    if(error){ console.error('cloud profile read error', error); return; }
    const localName = getLocalPlayerName();

    if(!data){
      const {error:insertError} = await c.from(PROFILE_TABLE).upsert({
        user_id: acc.id,
        player_name: localName || null,
        updated_at: new Date().toISOString(),
      }, {onConflict:'user_id'});
      if(insertError) console.error('cloud profile create error', insertError);
      return;
    }

    if(data.player_name){
      setLocalPlayerName(data.player_name);
    }else if(localName){
      await c.from(PROFILE_TABLE).update({player_name:localName, updated_at:new Date().toISOString()}).eq('user_id', acc.id);
    }
  }

  async function updatePlayerName(name){
    const clean = cleanName(name);
    if(!clean) return false;
    setLocalPlayerName(clean);
    const acc = await getAccount();
    if(!acc) return false;
    const c = await getClient();
    const {error} = await c.from(PROFILE_TABLE).upsert({
      user_id: acc.id,
      player_name: clean,
      updated_at: new Date().toISOString(),
    }, {onConflict:'user_id'});
    if(error){ console.error('cloud profile update error', error); return false; }
    return true;
  }

  async function syncAll(options){
    if(syncPromise) return syncPromise;
    syncPromise = (async()=>{
      const acc = await getAccount();
      if(!acc) return {signedIn:false, changed:false};
      const c = await getClient();

      const [{data:cloudRows, error:cloudError}] = await Promise.all([
        c.from(PROGRESS_TABLE).select('case_id,progress,client_saved_at,updated_at').eq('user_id', acc.id),
        syncProfile(acc),
      ]);

      if(cloudError){
        console.error('cloud progress read error', cloudError);
        throw cloudError;
      }

      const cloud = new Map((cloudRows || []).map(row=>[String(row.case_id), row]));
      const local = collectLocalProgress();
      const allIds = new Set([...cloud.keys(), ...local.keys()]);
      let changed = false;
      let uploaded = 0;
      let downloaded = 0;

      for(const caseId of allIds){
        const l = local.get(caseId) || null;
        const r = cloud.get(caseId) || null;

        if(l && !r){
          const stamp = progressStamp(l) || Date.now();
          if(!progressStamp(l)) writeLocalProgress(caseId, l, stamp);
          if(await saveCaseToCloud(caseId, {...l, _savedAt:stamp}, acc)) uploaded++;
          continue;
        }

        if(r && !l){
          const rStamp = dateStamp(r.client_saved_at) || dateStamp(r.updated_at) || Date.now();
          writeLocalProgress(caseId, r.progress || {}, rStamp);
          downloaded++;
          changed = true;
          continue;
        }

        if(!l || !r) continue;
        const lStamp = progressStamp(l);
        const rStamp = dateStamp(r.client_saved_at) || dateStamp(r.updated_at);

        if(!lStamp || (rStamp && rStamp > lStamp + 1000)){
          writeLocalProgress(caseId, r.progress || {}, rStamp || Date.now());
          downloaded++;
          changed = true;
        }else if(!rStamp || lStamp > rStamp + 1000){
          if(await saveCaseToCloud(caseId, l, acc)) uploaded++;
        }
      }

      rebuildCompletedIds();
      try{ localStorage.setItem(SYNC_STAMP_KEY, String(Date.now())); }catch(e){}

      if(changed){
        try{
          if(typeof render === 'function' && typeof app !== 'undefined' && app && app.view === 'library') render();
        }catch(e){}
      }

      const detail = {signedIn:true, changed, uploaded, downloaded, account:acc, manual:!!(options && options.manual)};
      dispatch('taraf:cloud-sync-complete', detail);
      return detail;
    })().finally(()=>{ syncPromise = null; });
    return syncPromise;
  }

  function dispatch(name, detail){
    try{ window.dispatchEvent(new CustomEvent(name, {detail:detail || {}})); }catch(e){}
  }

  function queueCaseSave(caseId, progress){
    clearTimeout(queueCaseSave._t);
    queueCaseSave._pending = {caseId, progress};
    queueCaseSave._t = setTimeout(async()=>{
      const pending = queueCaseSave._pending;
      queueCaseSave._pending = null;
      if(!pending) return;
      try{ await saveCaseToCloud(pending.caseId, pending.progress); }catch(e){}
    }, 500);
  }

  function hookEngineStorage(){
    if(engineHooked) return true;
    if(typeof window.saveLocalProgress !== 'function') return false;

    const originalSave = window.saveLocalProgress;
    window.saveLocalProgress = function(caseId, progress){
      const stamped = {...(progress || {}), _savedAt:Date.now()};
      const result = originalSave.call(this, caseId, stamped);
      queueCaseSave(caseId, stamped);
      return result;
    };

    if(typeof window.clearLocalProgress === 'function'){
      const originalClear = window.clearLocalProgress;
      window.clearLocalProgress = function(caseId){
        const result = originalClear.call(this, caseId);
        deleteCaseFromCloud(caseId).catch(()=>{});
        return result;
      };
    }

    engineHooked = true;
    return true;
  }

  function startEngineHookWatcher(){
    if(hookEngineStorage()) return;
    let tries = 0;
    const timer = setInterval(()=>{
      tries++;
      if(hookEngineStorage() || tries > 100) clearInterval(timer);
    }, 100);
  }

  function injectStyles(){
    if(document.getElementById('taraf-cloud-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-cloud-style';
    style.textContent = `
      .pf-cloud-card{background:linear-gradient(135deg,rgba(224,164,88,.08),rgba(255,255,255,.02));border:1px solid var(--line,#34302a);border-radius:6px;padding:18px;margin:0 0 18px;}
      .pf-cloud-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
      .pf-cloud-icon{font-size:24px;line-height:1;}.pf-cloud-title{font-weight:800;color:var(--ink,#eee);font-size:15px;}.pf-cloud-sub{color:var(--ink-dim,#aaa);font-size:12.5px;line-height:1.7;}
      .pf-cloud-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}.pf-cloud-email-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}.pf-cloud-email{min-width:200px;flex:1;background:var(--void,#0b0b0b);border:1px solid var(--line,#34302a);color:var(--ink,#eee);border-radius:4px;padding:10px 11px;font-family:inherit;direction:ltr;text-align:left;}
      .pf-cloud-status{margin-top:9px;font-size:12px;color:var(--ink-dim,#aaa);min-height:18px;}.pf-cloud-ok{color:#8fd6a4}.pf-cloud-error{color:#e08a7c}.pf-cloud-account{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--ink-dim,#aaa);direction:ltr;text-align:right;word-break:break-all;}
      .pf-cloud-account-line{display:flex;align-items:center;gap:10px;margin-top:10px}.pf-cloud-avatar{width:44px;height:44px;flex:0 0 44px;border-radius:50%;object-fit:cover;border:2px solid var(--amber-dim,#8a6a3e);background:var(--void,#0b0b0b)}
      .pf-cloud-facebook{background:#1877f2!important;color:#fff!important;border-color:#1877f2!important}.pf-cloud-facebook:hover{filter:brightness(1.08)}
      .cloud-lib-link{position:relative}.cloud-lib-dot{width:7px;height:7px;border-radius:50%;background:#8fd6a4;display:inline-block;margin-inline-start:2px;box-shadow:0 0 8px rgba(143,214,164,.7)}
      @media(max-width:560px){.pf-cloud-actions>*{flex:1}.pf-cloud-email-row{flex-direction:column}.pf-cloud-email{width:100%;min-width:0}}
    `;
    document.head.appendChild(style);
  }

  function cloudCardSkeleton(){
    return `<div class="pf-cloud-card" id="pf-cloud-card">
      <div class="pf-cloud-head"><span class="pf-cloud-icon">☁️</span><div><div class="pf-cloud-title">حفظ ملف المحقق</div><div class="pf-cloud-sub">بنراجع حالة الربط...</div></div></div>
    </div>`;
  }

  async function refreshCloudCard(){
    const card = document.getElementById('pf-cloud-card');
    if(!card) return;
    const acc = await getAccount();
    if(!document.getElementById('pf-cloud-card')) return;

    if(acc){
      const last = Number(localStorage.getItem(SYNC_STAMP_KEY) || 0);
      const lastText = last ? new Date(last).toLocaleString('ar-EG', {dateStyle:'short', timeStyle:'short'}) : 'لسه';
      const avatar = acc.avatarUrl
        ? `<img class="pf-cloud-avatar" src="${escapeHTML(acc.avatarUrl)}" alt="صورة الحساب" referrerpolicy="no-referrer">`
        : '<span class="pf-cloud-avatar" aria-hidden="true"></span>';
      card.innerHTML = `
        <div class="pf-cloud-head"><span class="pf-cloud-icon">✅</span><div><div class="pf-cloud-title">تقدمك مربوط بالسحابة</div><div class="pf-cloud-sub">تقدر تدخل بنفس الحساب من أي جهاز وترجع قضاياك.</div></div></div>
        <div class="pf-cloud-account-line">${avatar}<div class="pf-cloud-account">${escapeHTML(acc.email || acc.fullName || acc.id)}</div></div>
        <div class="pf-cloud-status pf-cloud-ok" id="pf-cloud-status">آخر مزامنة: ${escapeHTML(lastText)}</div>
        <div class="pf-cloud-actions">
          <button type="button" class="btn mono" id="pf-cloud-sync">↻ مزامنة الآن</button>
          <button type="button" class="btn ghost mono" id="pf-cloud-signout">تسجيل خروج</button>
        </div>`;

      document.getElementById('pf-cloud-sync').addEventListener('click', async e=>{
        const btn = e.currentTarget;
        const status = document.getElementById('pf-cloud-status');
        btn.disabled = true;
        if(status) status.textContent = 'جاري المزامنة...';
        try{
          const r = await syncAll({manual:true});
          if(status) status.textContent = `تمت المزامنة ✓ — رفع ${r.uploaded||0} / تنزيل ${r.downloaded||0}`;
          setTimeout(()=>injectProfileCard(true), 700);
        }catch(err){
          if(status){ status.textContent = 'تعذر إتمام المزامنة. جرّب تاني.'; status.className='pf-cloud-status pf-cloud-error'; }
        }finally{ btn.disabled = false; }
      });

      document.getElementById('pf-cloud-signout').addEventListener('click', async e=>{
        e.currentTarget.disabled = true;
        try{ await signOut(); }catch(err){ e.currentTarget.disabled = false; }
      });
      return;
    }

    card.innerHTML = `
      <div class="pf-cloud-head"><span class="pf-cloud-icon">🔐</span><div><div class="pf-cloud-title">متخسرش تقدمك</div><div class="pf-cloud-sub">اربط ملف المحقق مجانًا. اللعب يفضل شغال من غير حساب لو مش حابب.</div></div></div>
      <div class="pf-cloud-actions">
        <button type="button" class="btn mono" id="pf-cloud-google">G&nbsp; متابعة بحساب Google</button>
        <button type="button" class="btn mono pf-cloud-facebook" id="pf-cloud-facebook">f&nbsp; متابعة بحساب Facebook</button>
      </div>
      <div class="pf-cloud-email-row">
        <input class="pf-cloud-email" type="email" id="pf-cloud-email" autocomplete="email" placeholder="email@example.com">
        <button type="button" class="btn ghost mono" id="pf-cloud-email-btn">ابعت رابط الدخول</button>
      </div>
      <div class="pf-cloud-status" id="pf-cloud-status">اربط بحساب Google أو Facebook عشان تحفظ تقدمك بين الأجهزة.</div>`;

    const status = document.getElementById('pf-cloud-status');
    document.getElementById('pf-cloud-google').addEventListener('click', async e=>{
      const btn = e.currentTarget;
      btn.disabled = true;
      if(status) status.textContent = 'بنفتح Google...';
      try{ await signInWithGoogle(); }
      catch(err){
        btn.disabled = false;
        if(status){ status.textContent = 'Google محتاج يتفعّل من إعدادات Supabase Auth أولًا.'; status.className='pf-cloud-status pf-cloud-error'; }
      }
    });

    document.getElementById('pf-cloud-facebook').addEventListener('click', async e=>{
      const btn = e.currentTarget;
      btn.disabled = true;
      if(status) status.textContent = 'بنفتح Facebook...';
      try{ await signInWithFacebook(); }
      catch(err){
        btn.disabled = false;
        if(status){ status.textContent = String(err && err.message || 'تعذر فتح Facebook.'); status.className='pf-cloud-status pf-cloud-error'; }
      }
    });

    document.getElementById('pf-cloud-email-btn').addEventListener('click', async e=>{
      const btn = e.currentTarget;
      const input = document.getElementById('pf-cloud-email');
      btn.disabled = true;
      if(status){ status.className='pf-cloud-status'; status.textContent='بنبعت الرابط...'; }
      try{
        await sendMagicLink(input.value);
        if(status){ status.textContent='اتبعث ✓ افتح الإيميل واضغط رابط الدخول، وهترجع هنا وتلاقي تقدمك.'; status.className='pf-cloud-status pf-cloud-ok'; }
      }catch(err){
        if(status){ status.textContent = String(err && err.message || 'تعذر إرسال الرابط.'); status.className='pf-cloud-status pf-cloud-error'; }
      }finally{ btn.disabled = false; }
    });
  }

  function injectProfileCard(force){
    if(!/\/profile\.html$/i.test(window.location.pathname)) return false;
    injectStyles();
    const identity = document.querySelector('#pf-root .pf-identity');
    if(!identity) return false;
    let card = document.getElementById('pf-cloud-card');
    if(card && !force) return true;
    if(card) card.remove();
    identity.insertAdjacentHTML('afterend', cloudCardSkeleton());
    refreshCloudCard().catch(()=>{});
    return true;
  }

  function watchProfile(){
    if(!/\/profile\.html$/i.test(window.location.pathname)) return;
    injectProfileCard();
    if(profileObserver) return;
    profileObserver = new MutationObserver(()=>injectProfileCard());
    const root = document.getElementById('pf-root');
    if(root) profileObserver.observe(root, {childList:true, subtree:false});

    document.addEventListener('click', e=>{
      if(!e.target || e.target.id !== 'pf-name-save') return;
      setTimeout(()=>{
        const name = getLocalPlayerName();
        if(name) updatePlayerName(name).catch(()=>{});
      }, 50);
    });
  }

  async function injectLibraryCTA(){
    injectStyles();
    const profileLink = document.querySelector('.lib-profile-link');
    if(!profileLink) return false;
    if(document.querySelector('.cloud-lib-link')) return true;
    const acc = await getAccount();
    const a = document.createElement('a');
    a.href = 'profile.html#cloud';
    a.className = 'btn ghost mono cloud-lib-link';
    a.style.cssText = 'white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;gap:6px;';
    a.innerHTML = acc ? `☁️ محفوظ <span class="cloud-lib-dot"></span>` : '☁️ احفظ تقدمك';
    profileLink.insertAdjacentElement('afterend', a);
    return true;
  }

  function watchLibrary(){
    injectLibraryCTA().catch(()=>{});
    if(libraryObserver || !document.body) return;
    libraryObserver = new MutationObserver(()=>injectLibraryCTA().catch(()=>{}));
    const appRoot = document.getElementById('app');
    if(appRoot) libraryObserver.observe(appRoot, {childList:true, subtree:true});
  }

  async function initAuth(){
    try{
      const c = await getClient();
      if(!authSubscription){
        const listener = c.auth.onAuthStateChange((event, session)=>{
          if(event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED'){
            if(session && session.user){
              setTimeout(()=>syncAll().catch(()=>{}), 0);
            }
          }
          if(event === 'SIGNED_OUT') dispatch('taraf:auth-changed', {signedIn:false});
          setTimeout(()=>{
            injectProfileCard(true);
            const old = document.querySelector('.cloud-lib-link');
            if(old) old.remove();
            injectLibraryCTA().catch(()=>{});
          }, 50);
        });
        authSubscription = listener && listener.data ? listener.data.subscription : listener;
      }
      const session = await getSession();
      if(session && session.user) await syncAll();
    }catch(err){
      console.warn('TarafCloud init skipped:', err && err.message || err);
    }
  }

  window.TarafCloud = {
    __loaded:true,
    version:CLOUD_SCRIPT_VERSION,
    getAccount,
    getSession,
    signInWithGoogle,
    signInWithFacebook,
    sendMagicLink,
    signOut,
    syncAll,
    updatePlayerName,
    saveCaseToCloud,
    deleteCaseFromCloud,
  };

  function boot(){
    injectStyles();
    startEngineHookWatcher();
    watchProfile();
    watchLibrary();
    initAuth();
    window.addEventListener('taraf:cloud-sync-complete', ()=>{
      injectProfileCard(true);
      const old = document.querySelector('.cloud-lib-link');
      if(old) old.remove();
      injectLibraryCTA().catch(()=>{});
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
