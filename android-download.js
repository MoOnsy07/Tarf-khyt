/* طرف الخيط — زر تحميل نسخة Android APK */
(function(){
  'use strict';

  // بيتحوّل لـ true تلقائيًا من Workflow بعد أول APK ناجح.
  const APK_READY = true;
  const APK_URL = 'https://github.com/MoOnsy07/Tarf-khyt/releases/download/android-latest/taraf-khyt.apk';

  function mount(){
    if(!APK_READY || document.getElementById('taraf-android-download')) return;
    const app=document.getElementById('app');
    if(!app) return;

    if(!document.getElementById('taraf-android-download-style')){
      const style=document.createElement('style');
      style.id='taraf-android-download-style';
      style.textContent=`
        .taraf-android-download{max-width:980px;margin:12px auto 8px;padding:0 14px;position:relative;z-index:5}
        .taraf-android-download-card{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(224,164,88,.11),rgba(179,34,28,.07));border:1px solid rgba(224,164,88,.35);border-radius:10px;padding:13px 15px;color:var(--ink,#eee)}
        .taraf-android-download-copy{min-width:190px;flex:1}.taraf-android-download-title{font-weight:900;font-size:14px}.taraf-android-download-sub{font-size:11.5px;color:var(--ink-dim,#aaa);margin-top:2px}
        .taraf-android-download-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;text-decoration:none;background:var(--amber,#e0a458);color:#16100a!important;border-radius:7px;padding:9px 14px;font-weight:900;font-size:12.5px;white-space:nowrap}
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
      <a class="taraf-android-download-btn" href="${APK_URL}">تحميل APK ↓</a>
    </div>`;
    app.parentNode.insertBefore(wrap,app);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
