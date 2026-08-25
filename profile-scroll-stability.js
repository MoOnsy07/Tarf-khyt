/* ============================================================
   طرف الخيط — Profile Scroll Stability
   يحافظ على ثبات مساحة كارت الحساب أثناء تحميل حالة الربط.
   ============================================================ */
(function(){
  'use strict';

  if(!/\/profile\.html$/i.test(window.location.pathname)) return;

  function installStyle(){
    if(document.getElementById('taraf-profile-scroll-stability-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-profile-scroll-stability-style';
    style.textContent = `
      #pf-cloud-card{
        box-sizing:border-box;
        min-height:238px;
        overflow-anchor:none;
      }
      @media(max-width:560px){
        #pf-cloud-card{min-height:270px;}
      }
    `;
    document.head.appendChild(style);
  }

  function loadSessionGuard(){
    if(document.querySelector('script[data-taraf-cloud-session-guard]')) return;
    const s=document.createElement('script');
    s.src='cloud-session-guard.js?v=20260825-1';
    s.async=false;
    s.dataset.tarafCloudSessionGuard='1';
    (document.head||document.documentElement).appendChild(s);
  }

  function boot(){
    installStyle();
    loadSessionGuard();
    const root = document.getElementById('pf-root');
    if(root){
      const observer = new MutationObserver(installStyle);
      observer.observe(root,{childList:true,subtree:false});
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
