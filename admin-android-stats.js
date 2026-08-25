/* ============================================================
   طرف الخيط — Android analytics block for admin.html
   ============================================================ */
(function(){
  'use strict';
  if(window.__tarafAdminAndroidStatsLoaded) return;
  if(!/\/admin\.html$/i.test(location.pathname)) return;
  window.__tarafAdminAndroidStatsLoaded=true;

  function esc(v){
    const d=document.createElement('div');
    d.textContent=v==null?'':String(v);
    return d.innerHTML;
  }

  function fmtDate(v){
    if(!v) return '—';
    try{return new Date(v).toLocaleString('ar-EG',{dateStyle:'short',timeStyle:'short'});}catch(e){return '—';}
  }

  function installStyles(){
    if(document.getElementById('ad-android-stats-style')) return;
    const s=document.createElement('style');
    s.id='ad-android-stats-style';
    s.textContent=`
      .ad-android{margin:0 0 24px;background:linear-gradient(135deg,rgba(224,164,88,.07),rgba(255,255,255,.018));border:1px solid var(--line);border-radius:8px;padding:15px}
      .ad-android-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;flex-wrap:wrap}
      .ad-android-title{font-size:16px;font-weight:900;color:var(--ink)}
      .ad-android-sub{font-size:11.5px;color:var(--ink-dim);margin-top:2px}
      .ad-android-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
      .ad-android-stat{background:var(--panel-2);border:1px solid var(--line);border-radius:6px;padding:12px;text-align:center}
      .ad-android-stat .n{font-family:'JetBrains Mono',monospace;font-size:21px;font-weight:900;color:var(--amber)}
      .ad-android-stat .l{font-size:10.5px;color:var(--ink-dim);margin-top:3px;line-height:1.5}
      .ad-android-foot{margin-top:10px;font-size:10.5px;color:var(--ink-dim);display:flex;gap:16px;flex-wrap:wrap}
      @media(max-width:700px){.ad-android-grid{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(s);
  }

  function ensureBox(){
    let box=document.getElementById('ad-android-stats');
    if(box) return box;
    const refresh=document.getElementById('ad-refresh');
    const root=document.getElementById('ad-root');
    if(!refresh || !root) return null;
    box=document.createElement('section');
    box.id='ad-android-stats';
    box.className='ad-android';
    box.innerHTML='<div class="ad-loading mono">بيجيب أرقام Android...</div>';
    root.parentNode.insertBefore(box,root);
    return box;
  }

  async function loadAndroidStats(){
    const box=ensureBox();
    if(!box) return;
    box.innerHTML='<div class="ad-loading mono">بيجيب أرقام Android...</div>';
    try{
      if(typeof sb==='undefined' || !sb || typeof sb.rpc!=='function') throw new Error('Supabase not ready');
      const {data,error}=await sb.rpc('get_android_app_stats');
      if(error) throw error;
      const r=Array.isArray(data)?data[0]:data;
      if(!r) throw new Error('No stats');
      const clicks=Number(r.total_download_clicks)||0;
      const unique=Number(r.unique_downloaders)||0;
      const installs=Number(r.installs)||0;
      const conversion=unique ? Math.round((installs/unique)*100) : 0;
      box.innerHTML=`
        <div class="ad-android-head">
          <div><div class="ad-android-title">📱 Android APK</div><div class="ad-android-sub">تحميلات الموقع + أول فتح للتطبيق + النشاط</div></div>
          <div class="ad-rate">تحويل التحميل → فتح: ${conversion}%</div>
        </div>
        <div class="ad-android-grid">
          <div class="ad-android-stat"><div class="n">${clicks}</div><div class="l">ضغطات تحميل APK</div></div>
          <div class="ad-android-stat"><div class="n">${unique}</div><div class="l">أجهزة ضغطت تحميل</div></div>
          <div class="ad-android-stat"><div class="n">${installs}</div><div class="l">تثبيتات / أول فتح فعلي</div></div>
          <div class="ad-android-stat"><div class="n">${Number(r.installs_7d)||0}</div><div class="l">تثبيتات آخر 7 أيام</div></div>
          <div class="ad-android-stat"><div class="n">${Number(r.active_7d)||0}</div><div class="l">نشطين آخر 7 أيام</div></div>
          <div class="ad-android-stat"><div class="n">${Number(r.active_30d)||0}</div><div class="l">نشطين آخر 30 يوم</div></div>
          <div class="ad-android-stat"><div class="n">${Number(r.total_app_opens)||0}</div><div class="l">إجمالي فتحات التطبيق</div></div>
          <div class="ad-android-stat"><div class="n">${conversion}%</div><div class="l">نسبة التحويل التقريبية</div></div>
        </div>
        <div class="ad-android-foot"><span>آخر تحميل: ${esc(fmtDate(r.last_download_at))}</span><span>آخر فتح للتطبيق: ${esc(fmtDate(r.last_app_open_at))}</span></div>`;
    }catch(e){
      console.error('Android admin stats error', e);
      box.innerHTML='<div class="ad-error mono">تعذر تحميل أرقام Android حاليًا.</div>';
    }
  }

  function boot(){
    installStyles();
    ensureBox();
    let tries=0;
    const timer=setInterval(()=>{
      tries++;
      try{
        if(typeof sb!=='undefined' && sb && typeof sb.rpc==='function'){
          clearInterval(timer);
          loadAndroidStats();
          const refresh=document.getElementById('ad-refresh');
          if(refresh) refresh.addEventListener('click',()=>setTimeout(loadAndroidStats,0));
        }else if(tries>=80){
          clearInterval(timer);
          const box=ensureBox();
          if(box) box.innerHTML='<div class="ad-error mono">Supabase لسه ما اتحمّلش. اعمل تحديث للصفحة.</div>';
        }
      }catch(e){ if(tries>=80) clearInterval(timer); }
    },100);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
