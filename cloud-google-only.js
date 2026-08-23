/* طرف الخيط — تعطيل تسجيل الدخول بالإيميل مؤقتًا والإبقاء على Google فقط */
(function(){
  'use strict';

  function disableEmailLogin(){
    const emailRow = document.querySelector('.pf-cloud-email-row');
    if(emailRow) emailRow.remove();

    const googleBtn = document.getElementById('pf-cloud-google');
    const status = document.getElementById('pf-cloud-status');
    if(googleBtn && status){
      status.textContent = 'اربط تقدمك بحساب Google — بدون رسائل بريد.';
      status.className = 'pf-cloud-status';
    }

    if(window.TarafCloud && !window.TarafCloud.__emailDisabled){
      window.TarafCloud.sendMagicLink = async function(){
        throw new Error('تسجيل الدخول بالإيميل متوقف مؤقتًا. استخدم Google.');
      };
      window.TarafCloud.__emailDisabled = true;
    }
  }

  function boot(){
    disableEmailLogin();
    const observer = new MutationObserver(disableEmailLogin);
    observer.observe(document.documentElement, {childList:true, subtree:true});
    window.addEventListener('taraf:auth-changed', disableEmailLogin);
    window.addEventListener('taraf:cloud-sync-complete', disableEmailLogin);
    let tries = 0;
    const timer = setInterval(function(){
      disableEmailLogin();
      if(++tries >= 40 || (window.TarafCloud && window.TarafCloud.__emailDisabled)) clearInterval(timer);
    }, 250);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
