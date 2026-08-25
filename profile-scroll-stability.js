/* ============================================================
   طرف الخيط — Profile Scroll Stability
   يحافظ على ثبات مساحة كارت الحساب أثناء تحميل حالة الربط.
   ملاحظة: عرض الصورة الشخصية يتم الآن من social-profile-sync.js
   و avatar-controls.js، لذلك لا نقرأ Auth من هنا نهائيًا.
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

  function boot(){
    installStyle();
    const root = document.getElementById('pf-root');
    if(root){
      const observer = new MutationObserver(installStyle);
      observer.observe(root,{childList:true,subtree:false});
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
