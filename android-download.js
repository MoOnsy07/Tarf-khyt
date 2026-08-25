/* طرف الخيط — زر تحميل نسخة Android APK + تتبع التحميلات */
(function(){
  'use strict';

  const APK_READY = true;
  const APK_URL = 'https://github.com/MoOnsy07/Tarf-khyt/releases/download/android-latest/taraf-khyt.apk';
  const DOWNLOAD_ID_KEY = 'taraf_android_download_visitor_v1';

  function randomId(){
    try{ if(window.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID(); }catch(e){}
    return 'dl_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  }

  function getDownloadVisitorId(){
    try{
      const existingGameId = localStorage.getItem('ca_visitor_id');
      if(existingGameId) return String(existingGameId).slice(0,128);
      let id = localStorage.getItem(DOWNLOAD_ID_KEY);
      if(!id){ id=randomId(); localStorage.setItem(DOWNLOAD_ID_KEY,id); }
      return id;
    }catch(e){ return randomId(); }
  }

  function insideAndroidApp(){
    try{
      return !!(window.TarafAndroidApp && window.TarafAndroidApp.isAndroidApp && window.TarafAndroidApp.isAndroidApp())
        || localStorage.getItem('taraf_android_app_v1') === '1';
    }catch(e){ return false; }
  }

  async function trackDownload(){
    const id=getDownloadVisitorId();
    try{
      if(typeof sb !== 'undefined' && sb && typeof sb.rpc === 'function'){
        await Promise.race([
          sb.rpc('track_android_download',{p_visitor_id:id}),
          new Promise(resolve=>setTimeout(resolve,450))
        ]);
      }
    }catch(e){}
    try{
      if(typeof gtag === 'function'){
        gtag('event','android_apk_download',{event_category:'android_app'});
      }
    }catch(e){}
  }

  function mount(){
    if(!APK_READY || insideAndroidApp() || document.getElementById('taraf-android-download')) return;
    const app=document.getElementById('app');
    if(!app) return;

    if(!document.getElementById('taraf-android-download-style')){
      const style=document.createElement('style');
      style.id='taraf-android-download-style';
      style.textContent=`
        .taraf-android-download{max-width:980px;margin:12px auto 8px;padding:0 14px;position:relative;z-index:5}
        .taraf-android-download-card{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(224,164,88,.11),rgba(179,34,28,.07));border:1px solid rgba(224,164,88,.35);border-radius:10px;padding:13px 15px;color:var(--ink,#eee)}
        .taraf-android-download-copy{min-width:190px;flex:1}.taraf-android-download-title{font-weight:900;font-size:14px}.taraf-android-download-sub{font-size:11.5px;color:var(--ink-dim,#aaa);margin-top:2px}
        .taraf-android-download-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;text-decoration:none;background:var(--amber,#e0a458);color:#16100a!important;border-radius:7px;padding:9px 14px;font-weight:900;font-size:12.5px;white-space:nowrap;border:0;cursor:pointer;font-family:inherit}
        @media(max-width:520px){.taraf-android-download-card{align-items:stretch}.taraf-android-download-btn{width:100%}}
      `;
      document.head.appendChild(style);
    }

    const wrap=document.createElement('div');
    wrap.id='taraf-android-download';
    wrap.className='taraf-android-download';
    wrap.innerHTML=`<div class="taraf-android-download-card">
      <div class="taraf-android-download-copy">
        <div class="taraf-android-download-title">📱 طرف الخيط على Android</div>
        <div class="taraf-android-download-sub">نزّل التطبيق مباشرة بصيغة APK — بدون متجر Play.</div>
      </div>
      <button type="button" class="taraf-android-download-btn" id="taraf-apk-download-btn">تحميل APK ↓</button>
    </div>`;
    app.parentNode.insertBefore(wrap,app);

    const btn=document.getElementById('taraf-apk-download-btn');
    if(btn) btn.addEventListener('click',async()=>{
      if(btn.disabled) return;
      btn.disabled=true;
      const old=btn.textContent;
      btn.textContent='جاري بدء التحميل...';
      await trackDownload();
      window.location.href=APK_URL;
      setTimeout(()=>{ btn.disabled=false; btn.textContent=old; },1200);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
