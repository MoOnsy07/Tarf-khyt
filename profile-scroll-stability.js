/* ============================================================
   طرف الخيط — Profile Scroll Stability + Social Avatar
   يمنع قفزات صفحة البروفايل عند تبدّل حالة Cloud Card،
   ويعرض صورة حساب Google/Facebook داخل ملف المحقق لو متاحة.
   ============================================================ */
(function(){
  'use strict';

  if(!/\/profile\.html$/i.test(window.location.pathname)) return;

  let avatarApplying = false;

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
      .pf-avatar.pf-social-avatar{
        padding:0;
        overflow:hidden;
        background:var(--panel);
        border:2px solid var(--amber-dim);
      }
      .pf-avatar.pf-social-avatar img{
        width:100%;
        height:100%;
        display:block;
        object-fit:cover;
        border-radius:50%;
      }
      @media(max-width:560px){
        #pf-cloud-card{min-height:270px;}
      }
    `;
    document.head.appendChild(style);
  }

  async function applySocialAvatar(){
    if(avatarApplying) return;
    const avatar = document.querySelector('#pf-root .pf-avatar');
    if(!avatar || !window.TarafCloud || typeof window.TarafCloud.getAccount !== 'function') return;

    avatarApplying = true;
    try{
      const account = await window.TarafCloud.getAccount();
      const url = account && account.avatarUrl ? String(account.avatarUrl) : '';
      if(!url) return;

      const current = avatar.querySelector('img[data-pf-social-avatar]');
      if(current && current.src === url) return;

      avatar.classList.add('pf-social-avatar');
      avatar.textContent = '';
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'صورة المحقق';
      img.referrerPolicy = 'no-referrer';
      img.dataset.pfSocialAvatar = '1';
      img.addEventListener('error', ()=>{
        img.remove();
        avatar.classList.remove('pf-social-avatar');
      }, {once:true});
      avatar.appendChild(img);
    }catch(e){}
    finally{ avatarApplying = false; }
  }

  function boot(){
    installStyle();
    applySocialAvatar();

    // لو الكارت أو بطاقة الهوية بيتعاد حقنهم بعد Auth/Sync/تعديل الاسم،
    // حافظ على ثبات الصفحة وجدّد صورة الحساب من غير ما نتدخل في السكرول.
    const root = document.getElementById('pf-root');
    if(root){
      const observer = new MutationObserver(()=>{
        installStyle();
        setTimeout(applySocialAvatar, 0);
      });
      observer.observe(root, {childList:true, subtree:true});
    }

    window.addEventListener('taraf:auth-changed', ()=>setTimeout(applySocialAvatar, 50));
    window.addEventListener('taraf:cloud-sync-complete', ()=>setTimeout(applySocialAvatar, 50));

    let tries = 0;
    const timer = setInterval(()=>{
      applySocialAvatar();
      if(++tries >= 40 || (window.TarafCloud && document.querySelector('#pf-root .pf-avatar'))) clearInterval(timer);
    }, 250);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
