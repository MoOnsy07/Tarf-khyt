// قايمة القضايا اللي أصولها البصرية مكتملة وجاهزة للعب فعليًا.
// ملف مشترك بين engine.js وأي صفحة تانية محتاجة تعرف حالة الجاهزية
// (زي profile.html) — عشان اللستة تتحدث في مكان واحد بس.
const READY_CASE_IDS = new Set([
  'dark-testimony','final-testament','last-episode','leaked-video','missing-bride','hit-and-run','last-dish','last-rehearsal','lost-wallet','illusion-startup','last-call','no-witness-night','number-19','role-of-lifetime','room-307','shifting-painting','fake-audio','false-rumor','forged-canvas','ghost-author','exam-leak','dawn-call','finish-line','flat-12b','last-bell','last-update','mud-print','old-estate','postponed-engagement','recorded-voice','red-thread','vault-key','warehouse-fire','closed-file','forged-will','missing-twin','var-conspiracy','coded-message','behind-scenes','vanished-wife','last-laugh','nile-cruise','old-photo','one-comment','secret-clinic','secret-recipe','opening-night','suspicious-transfer','second-face','buffalo-case','93rd-minute','bribery','broken-faucet','dating-app','dawn-club','deleted-scene','overbilled','wedding-gold','charity-funds','grandma-ring','return-from-death',
]);

// CASE 061 تفضل مخفية من المكتبة العامة، لكن تقدر تتفتح من رابط المالك المباشر.
(function setupReturnFromDeathOwnerPreview(){
  if(typeof document==='undefined') return;
  try{
    const style=document.createElement('style');
    style.textContent='.lib-card[data-case="return-from-death"]{display:none!important;}';
    (document.head||document.documentElement).appendChild(style);
  }catch(_){}
  try{
    const q=new URLSearchParams(location.search);
    if(q.get('case')!=='return-from-death') return;
    const token=String(q.get('owner')||'').trim().toUpperCase();
    let h=0x811c9dc5;
    for(let i=0;i<token.length;i++){ h^=token.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0; }
    if(h.toString(16).padStart(8,'0')==='24c43d8a'){
      localStorage.setItem('ca_exclusive_access_return-from-death','1');
    }
  }catch(_){}
})();

(function loadTarafAuthStack(){
  if(typeof document==='undefined'||window.__tarafAuthStackLoading) return;
  window.__tarafAuthStackLoading=true;
  function hasSupabaseLibrary(){return !!(window.supabase&&typeof window.supabase.createClient==='function')}
  function hasSharedClient(){try{return typeof sb!=='undefined'&&!!(sb&&sb.auth)}catch(e){return false}}
  function loadScript(src,attr,timeoutMs){
    return new Promise((resolve,reject)=>{
      if(attr){const existing=document.querySelector('script['+attr+']');if(existing){if(existing.dataset.tarafLoaded==='1')return resolve();existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',()=>reject(new Error('تعذر تحميل '+src)),{once:true});return}}
      const s=document.createElement('script');s.src=src;s.async=false;if(attr)s.setAttribute(attr,'1');
      const timer=setTimeout(()=>reject(new Error('انتهت مهلة تحميل '+src)),timeoutMs||12000);
      s.onload=()=>{clearTimeout(timer);s.dataset.tarafLoaded='1';resolve()};s.onerror=()=>{clearTimeout(timer);reject(new Error('تعذر تحميل '+src))};
      (document.head||document.documentElement).appendChild(s);
    });
  }
  async function boot(){
    try{
      if(!hasSupabaseLibrary()) await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2','data-taraf-supabase-core',12000);
      if(!hasSharedClient()) await loadScript('supabase-client.js?v=20260825-1','data-taraf-supabase-client',8000);
      await loadScript('cloud-sync.js?v=20260825-2','data-taraf-cloud-sync',8000);
      await loadScript('cloud-google-only.js?v=20260825-5','data-taraf-cloud-google-only',8000);
      await loadScript('social-profile-sync.js?v=20260825-4','data-taraf-social-profile-sync',8000);
      if(/\/profile\.html$/i.test(window.location.pathname)) await loadScript('avatar-controls.js?v=20260825-3','data-taraf-avatar-controls',8000);
    }catch(err){
      console.warn('Taraf auth stack:',err&&err.message||err);
      const card=document.getElementById('pf-cloud-card');
      if(card&&/بنراجع حالة الربط/.test(card.textContent||'')) card.innerHTML='<div class="pf-cloud-head"><span class="pf-cloud-icon">⚠️</span><div><div class="pf-cloud-title">تعذر تحميل ربط الحساب</div><div class="pf-cloud-sub">اللعب والتقدم المحلي شغالين عادي. حدّث الصفحة وجرب تاني.</div></div></div>';
    }
  }
  boot();
})();

(function loadTarafSuspectProfiles(){if(typeof document==='undefined'||document.querySelector('script[data-taraf-suspect-profiles]'))return;const s=document.createElement('script');s.src='suspect-profiles.js?v=20260825-3';s.async=false;s.dataset.tarafSuspectProfiles='1';(document.head||document.documentElement).appendChild(s)})();
(function loadTarafTelegramInvitePolicy(){if(typeof document==='undefined'||document.querySelector('script[data-taraf-telegram-policy]'))return;const s=document.createElement('script');s.src='telegram-invite-policy.js?v=20260824-1';s.async=false;s.dataset.tarafTelegramPolicy='1';(document.head||document.documentElement).appendChild(s)})();
(function loadTarafProfileScrollStability(){if(typeof document==='undefined'||document.querySelector('script[data-taraf-profile-scroll-stability]'))return;const s=document.createElement('script');s.src='profile-scroll-stability.js?v=20260825-5';s.async=false;s.dataset.tarafProfileScrollStability='1';(document.head||document.documentElement).appendChild(s)})();
(function loadTarafDiscoveryDeductionPolicy(){if(typeof document==='undefined'||document.querySelector('script[data-taraf-discovery-deduction]'))return;const s=document.createElement('script');s.src='discovery-deduction-policy.js?v=20260824-3';s.async=false;s.dataset.tarafDiscoveryDeduction='1';(document.head||document.documentElement).appendChild(s)})();

// CASE 061 — تحميل القضية قبل المحرك مع fallback لأي أصل بصري غير موجود على main.
(function loadReturnFromDeathCase(){
  if(typeof document==='undefined' || typeof CASES_REGISTRY==='undefined') return;
  function register(){
    try{
      if(typeof CASE_RETURN_FROM_DEATH!=='undefined' && Array.isArray(CASES_REGISTRY) && !CASES_REGISTRY.some(c=>c&&c.id==='return-from-death')){
        CASES_REGISTRY.push(CASE_RETURN_FROM_DEATH);
      }
    }catch(err){ console.warn('Return from Death registry:',err); }
  }
  if(typeof CASE_RETURN_FROM_DEATH!=='undefined'){ register(); return; }
  if(document.readyState==='loading'){
    document.write('<script src="cases/case-return-from-death.js?v=20260829-1"><\/script><script src="cases/case-return-from-death-image-fallback.js?v=20260829-1"><\/script><script>try{if(typeof CASE_RETURN_FROM_DEATH!=="undefined"&&Array.isArray(CASES_REGISTRY)&&!CASES_REGISTRY.some(function(c){return c&&c.id==="return-from-death";})){CASES_REGISTRY.push(CASE_RETURN_FROM_DEATH);}}catch(e){console.warn("Return from Death registry:",e);}<\/script>');
    return;
  }
  const caseScript=document.createElement('script');
  caseScript.src='cases/case-return-from-death.js?v=20260829-1';
  caseScript.async=false;
  caseScript.onload=()=>{
    const fallback=document.createElement('script');
    fallback.src='cases/case-return-from-death-image-fallback.js?v=20260829-1';
    fallback.async=false;
    fallback.onload=register;
    fallback.onerror=register;
    (document.head||document.documentElement).appendChild(fallback);
  };
  caseScript.onerror=()=>console.warn('تعذر تحميل قضية العودة من الموت');
  (document.head||document.documentElement).appendChild(caseScript);
})();
