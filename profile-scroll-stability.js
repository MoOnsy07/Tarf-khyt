/* ============================================================
   طرف الخيط — Profile Scroll Stability
   يمنع قفزات صفحة البروفايل عند تبدّل حالة Cloud Card.
   ============================================================ */
(function(){
  'use strict';

  if(!/\/profile\.html$/i.test(window.location.pathname)) return;

  function installStyle(){
    if(document.getElementById('taraf-profile-scroll-stability-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-profile-scroll-stability-style';
    style.textContent = `
      /* خلي مساحة كارت السحابة ثابتة بين loading / signed-in / signed-out.
         ده يمنع تغيّر ارتفاع المحتوى الموجود فوق باقي البروفايل وبالتالي قفزة السكرول. */
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

    // لو الكارت بيتعاد حقنه بعد Auth/Sync، تأكد إن القاعدة تفضل موجودة
    // من غير ما نعمل أي scrollTo أو نتدخل في سكرول المستخدم نفسه.
    const root = document.getElementById('pf-root');
    if(!root) return;
    const observer = new MutationObserver(installStyle);
    observer.observe(root, {childList:true, subtree:false});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
