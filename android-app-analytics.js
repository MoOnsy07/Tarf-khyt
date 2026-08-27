/* ============================================================
   طرف الخيط — Android APK analytics
   يميّز تشغيل نسخة Android عن الويب عن طريق marker في رابط TWA.
   لا يجمع اسم/إيميل/رقم هاتف. Install ID عشوائي محلي فقط.
   ============================================================ */
(function(){
  'use strict';

  const APP_MARKER_KEY = 'taraf_android_app_v1';
  const APP_VERSION_KEY = 'taraf_android_app_version_v1';
  const INSTALL_ID_KEY = 'taraf_android_install_id_v1';
  const SESSION_SENT_KEY = 'taraf_android_open_sent_v1';

  function randomId(){
    try{
      if(window.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    }catch(e){}
    return 'and_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  }

  function markAndroidFromURL(){
    try{
      const url = new URL(location.href);
      if(url.searchParams.get('android_app') === '1'){
        localStorage.setItem(APP_MARKER_KEY,'1');
        const appVersion=String(url.searchParams.get('app_version')||'').trim().slice(0,40);
        if(appVersion) localStorage.setItem(APP_VERSION_KEY,appVersion);
        url.searchParams.delete('android_app');
        url.searchParams.delete('app_version');
        history.replaceState(null,'',url.pathname + (url.search ? url.search : '') + url.hash);
        return true;
      }
    }catch(e){}
    try{ return localStorage.getItem(APP_MARKER_KEY) === '1'; }catch(e){ return false; }
  }

  function isAndroidApp(){
    try{ return localStorage.getItem(APP_MARKER_KEY) === '1'; }catch(e){ return false; }
  }

  function getInstallId(){
    try{
      let id = localStorage.getItem(INSTALL_ID_KEY);
      if(!id){ id = randomId(); localStorage.setItem(INSTALL_ID_KEY,id); }
      return id;
    }catch(e){ return randomId(); }
  }

  function getAppVersion(){
    try{ return String(localStorage.getItem(APP_VERSION_KEY)||'').trim().slice(0,40); }
    catch(e){ return ''; }
  }

  async function sendOpen(){
    if(!isAndroidApp()) return;
    try{
      if(sessionStorage.getItem(SESSION_SENT_KEY) === '1') return;
      sessionStorage.setItem(SESSION_SENT_KEY,'1');
    }catch(e){}

    const installId = getInstallId();
    try{
      if(typeof sb !== 'undefined' && sb && typeof sb.rpc === 'function'){
        const {data,error} = await sb.rpc('track_android_app_open',{
          p_install_id:installId,
          p_path:String(location.pathname || '/').slice(0,180),
          p_app_version:getAppVersion()||null,
        });
        if(error) throw error;
        try{
          if(data && data.first_open && typeof gtag === 'function'){
            gtag('event','android_first_open',{event_category:'android_app'});
          }else if(typeof gtag === 'function'){
            gtag('event','android_app_open',{event_category:'android_app'});
          }
        }catch(e){}
      }
    }catch(e){
      try{ sessionStorage.removeItem(SESSION_SENT_KEY); }catch(_){}
    }
  }

  const fromApp = markAndroidFromURL();
  window.TarafAndroidApp = {
    isAndroidApp,
    getInstallId,
    getAppVersion,
    markerSeen:fromApp,
  };

  function boot(){ setTimeout(sendOpen,0); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
