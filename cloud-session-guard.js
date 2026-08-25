/* ============================================================
   طرف الخيط — Cloud Session Guard
   يمنع صفحة ملف المحقق من البقاء على "بنراجع حالة الربط..."
   عند تأخر Supabase Auth lock / تعدد التبويبات.
   ============================================================ */
(function(){
  'use strict';

  if(window.__tarafCloudSessionGuard) return;
  window.__tarafCloudSessionGuard = true;

  const PROJECT_REF = 'meynspmfkkedhqhffsqk';
  const STORAGE_KEY = 'sb-' + PROJECT_REF + '-auth-token';
  let installed = false;
  let sharedRead = null;

  function parseCachedSession(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return null;
      const parsed = JSON.parse(raw);
      const session = parsed && parsed.access_token ? parsed
        : parsed && parsed.session && parsed.session.access_token ? parsed.session
        : parsed && parsed.currentSession && parsed.currentSession.access_token ? parsed.currentSession
        : null;
      if(!session || !session.user || !session.access_token) return null;

      const exp = Number(session.expires_at || 0);
      // لو التوكن منتهي بالفعل ما نعتمدش عليه كجلسة صالحة.
      if(exp && exp * 1000 <= Date.now() + 5000) return null;
      return session;
    }catch(e){ return null; }
  }

  function withTimeout(promise, ms){
    return Promise.race([
      Promise.resolve(promise).catch(()=>null),
      new Promise(resolve=>setTimeout(()=>resolve(null), ms))
    ]);
  }

  async function guardedGetSession(){
    const cached = parseCachedSession();
    if(cached) return cached;
    if(sharedRead) return sharedRead;

    sharedRead = (async()=>{
      try{
        if(typeof sb !== 'undefined' && sb && sb.auth && typeof sb.auth.getSession === 'function'){
          const result = await withTimeout(sb.auth.getSession(), 1800);
          const session = result && result.data && result.data.session || null;
          if(session) return session;
        }
      }catch(e){}
      return parseCachedSession();
    })().finally(()=>{ sharedRead = null; });

    return sharedRead;
  }

  async function guardedGetAccount(){
    const session = await guardedGetSession();
    if(!session || !session.user) return null;
    const user = session.user;
    const meta = user.user_metadata || {};
    return {
      id:user.id,
      email:user.email || '',
      avatarUrl:meta.avatar_url || meta.picture || '',
      fullName:meta.full_name || meta.name || '',
      provider:user.app_metadata && user.app_metadata.provider || '',
      user
    };
  }

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  async function rescueCloudCard(){
    if(!/\/profile\.html$/i.test(location.pathname)) return;
    const card = document.getElementById('pf-cloud-card');
    if(!card || !/بنراجع حالة الربط/.test(card.textContent || '')) return;

    const account = await guardedGetAccount();
    // لو الكارت اتحدث طبيعي أثناء انتظارنا، ما نلمسوش.
    const liveCard = document.getElementById('pf-cloud-card');
    if(!liveCard || !/بنراجع حالة الربط/.test(liveCard.textContent || '')) return;

    if(account){
      const avatar = account.avatarUrl
        ? '<img class="pf-cloud-avatar" src="'+esc(account.avatarUrl)+'" alt="صورة الحساب" referrerpolicy="no-referrer">'
        : '<span class="pf-cloud-avatar" aria-hidden="true"></span>';
      liveCard.innerHTML = `
        <div class="pf-cloud-head"><span class="pf-cloud-icon">✅</span><div><div class="pf-cloud-title">تقدمك مربوط بالسحابة</div><div class="pf-cloud-sub">تم تحميل الحساب. تقدر تكمل من أي جهاز بنفس الحساب.</div></div></div>
        <div class="pf-cloud-account-line">${avatar}<div class="pf-cloud-account">${esc(account.email || account.fullName || account.id)}</div></div>
        <div class="pf-cloud-status pf-cloud-ok" id="pf-cloud-status">الحساب متصل ✓</div>
        <div class="pf-cloud-actions">
          <button type="button" class="btn mono" id="pf-cloud-sync">↻ مزامنة الآن</button>
          <button type="button" class="btn ghost mono" id="pf-cloud-signout">تسجيل خروج</button>
        </div>`;

      const syncBtn = document.getElementById('pf-cloud-sync');
      if(syncBtn) syncBtn.onclick = async()=>{
        const status = document.getElementById('pf-cloud-status');
        syncBtn.disabled = true;
        if(status) status.textContent = 'جاري المزامنة...';
        try{
          const r = window.TarafCloud && typeof window.TarafCloud.syncAll === 'function'
            ? await withTimeout(window.TarafCloud.syncAll({manual:true}), 6000)
            : null;
          if(!r) throw new Error('timeout');
          if(status){ status.textContent='تمت المزامنة ✓'; status.className='pf-cloud-status pf-cloud-ok'; }
        }catch(e){
          if(status){ status.textContent='المزامنة اتأخرت. الحساب نفسه متصل وتقدر تكمل اللعب.'; status.className='pf-cloud-status pf-cloud-error'; }
        }finally{ syncBtn.disabled=false; }
      };

      const outBtn = document.getElementById('pf-cloud-signout');
      if(outBtn) outBtn.onclick = async()=>{
        outBtn.disabled=true;
        try{
          if(window.TarafCloud && typeof window.TarafCloud.signOut==='function') await window.TarafCloud.signOut();
          else if(typeof sb!=='undefined' && sb && sb.auth) await sb.auth.signOut();
          location.reload();
        }catch(e){ outBtn.disabled=false; }
      };
    }else{
      liveCard.innerHTML = `
        <div class="pf-cloud-head"><span class="pf-cloud-icon">🔐</span><div><div class="pf-cloud-title">احفظ ملف المحقق</div><div class="pf-cloud-sub">سجل دخول عشان تحفظ تقدمك وتستخدم الصورة الشخصية والأصدقاء.</div></div></div>
        <div class="pf-cloud-actions">
          <button type="button" class="btn mono" id="pf-cloud-google">G&nbsp; متابعة بحساب Google</button>
          <button type="button" class="btn mono pf-cloud-facebook" id="pf-cloud-facebook">f&nbsp; متابعة بحساب Facebook</button>
        </div>
        <div class="pf-cloud-status" id="pf-cloud-status">اختار طريقة تسجيل الدخول.</div>`;

      const g = document.getElementById('pf-cloud-google');
      if(g) g.onclick = async()=>{
        g.disabled=true;
        try{ await window.TarafCloud.signInWithGoogle(); }
        catch(e){ g.disabled=false; document.getElementById('pf-cloud-status').textContent='تعذر فتح Google. جرّب تاني.'; }
      };
      const f = document.getElementById('pf-cloud-facebook');
      if(f) f.onclick = async()=>{
        f.disabled=true;
        try{ await window.TarafCloud.signInWithFacebook(); }
        catch(e){ f.disabled=false; document.getElementById('pf-cloud-status').textContent=String(e && e.message || 'تعذر فتح Facebook.'); }
      };
    }

    try{ window.dispatchEvent(new CustomEvent('taraf:auth-changed',{detail:{rescued:true,signedIn:!!account}})); }catch(e){}
  }

  function install(){
    if(installed || !window.TarafCloud || !window.TarafCloud.__loaded) return false;
    installed = true;
    // الإضافات الجديدة تستخدم القراءة المحمية بدل إنشاء قراءات Auth متزامنة.
    window.TarafCloud.getSession = guardedGetSession;
    window.TarafCloud.getAccount = guardedGetAccount;

    setTimeout(rescueCloudCard, 700);
    setTimeout(rescueCloudCard, 1800);
    setTimeout(rescueCloudCard, 3200);
    window.addEventListener('taraf:auth-changed',()=>setTimeout(rescueCloudCard,100));
    return true;
  }

  function boot(){
    if(install()) return;
    let tries=0;
    const timer=setInterval(()=>{
      if(install() || ++tries>=80) clearInterval(timer);
    },100);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
