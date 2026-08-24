/* ============================================================
   طرف الخيط — Telegram Invite Policy
   تظهر الدعوة بعد أول قضية مكتملة، وبعدها كل 3 قضايا مكتملة.
   لو اللاعب ضغط أي رابط تيليجرام، تتوقف الدعوة نهائيًا على نفس المتصفح.
   ============================================================ */
(function(){
  'use strict';

  const OPENED_KEY = 'ca_telegram_cta_opened_v1';
  const LAST_SHOWN_COUNT_KEY = 'ca_telegram_cta_last_completed_count_v2';
  const CASE_INTERVAL = 3;

  let installed = false;
  let bypassCheck = false;

  function completedCount(){
    try{
      if(typeof window.getCompletedIds === 'function'){
        const ids = window.getCompletedIds();
        return Array.isArray(ids) ? ids.length : 0;
      }
    }catch(e){}
    return 0;
  }

  function shouldShowByCaseCount(){
    try{
      if(!window.CASE || !window.game || window.game.screen !== 'ending') return false;
      if(localStorage.getItem(OPENED_KEY) === '1') return false;

      const count = completedCount();
      if(count < 1) return false;

      const lastShownCount = Number(localStorage.getItem(LAST_SHOWN_COUNT_KEY) || 0);
      if(!Number.isFinite(lastShownCount) || lastShownCount < 0) return true;

      // أول مرة بعد أول قضية، وبعدها كل 3 قضايا: 1، 4، 7، 10...
      return lastShownCount === 0 ? count >= 1 : (count - lastShownCount) >= CASE_INTERVAL;
    }catch(e){
      return false;
    }
  }

  function install(){
    if(installed) return true;
    if(typeof window.shouldShowTelegramInvite !== 'function' || typeof window.showTelegramInvite !== 'function') return false;

    const originalShow = window.showTelegramInvite;

    window.shouldShowTelegramInvite = function(){
      if(bypassCheck) return true;
      return shouldShowByCaseCount();
    };

    window.showTelegramInvite = function(){
      if(!shouldShowByCaseCount()) return;

      const count = completedCount();
      bypassCheck = true;
      try{
        originalShow();
      }finally{
        bypassCheck = false;
      }

      // نسجل عدد القضايا فقط لو الـoverlay ظهر فعلًا.
      if(document.getElementById('telegramInviteOverlay')){
        try{ localStorage.setItem(LAST_SHOWN_COUNT_KEY, String(count)); }catch(e){}
      }
    };

    installed = true;
    return true;
  }

  if(!install()){
    let tries = 0;
    const timer = setInterval(function(){
      tries++;
      if(install() || tries >= 200) clearInterval(timer);
    }, 50);
  }
})();
