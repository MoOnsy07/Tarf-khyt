/* ============================================================
   طرف الخيط — دوران نوافذ ما بعد القضية
   1: تقييم، 2: تيليجرام، 3: دعم، ثم تكرار محسوب بدون إزعاج
   ============================================================ */
(function(){
  'use strict';

  const REVIEW_DONE_KEY = 'ca_ending_review_done_v1';
  const TELEGRAM_DONE_KEY = 'ca_telegram_cta_opened_v1';
  const LAST_SHOWN_PREFIX = 'ca_ending_popup_last_';
  const LEGACY_COMMUNITY_LAST_KEY = 'ca_community_popup_last_completed_count_v1';
  const SUPPORT_FIRST_AT = 3;
  const SUPPORT_INTERVAL = 6;

  const telegramUrl = (typeof TELEGRAM_CHANNEL_URL !== 'undefined' && TELEGRAM_CHANNEL_URL)
    ? TELEGRAM_CHANNEL_URL
    : 'https://t.me/taraf5eet';

  const vodafone = (typeof DONATION_VODAFONE_CASH !== 'undefined' ? DONATION_VODAFONE_CASH : '').trim();
  const instapay = (typeof DONATION_INSTAPAY !== 'undefined' ? DONATION_INSTAPAY : '').trim();
  const instapayLink = (typeof DONATION_INSTAPAY_LINK !== 'undefined' ? DONATION_INSTAPAY_LINK : '').trim();
  const paypal = (typeof DONATION_PAYPAL_EMAIL !== 'undefined' ? DONATION_PAYPAL_EMAIL : '').trim();

  const esc = value => String(value == null ? '' : value)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');

  function storageGet(key, fallback=''){
    try{
      const value = localStorage.getItem(key);
      return value == null ? fallback : value;
    }catch(_){
      return fallback;
    }
  }

  function storageSet(key, value){
    try{ localStorage.setItem(key, String(value)); }catch(_){ }
  }

  function completedCount(){
    try{
      if(typeof getCompletedIds === 'function'){
        const ids = getCompletedIds();
        return Array.isArray(ids) ? ids.length : 0;
      }
    }catch(_){ }
    return 0;
  }

  function hasAnySavedReview(){
    if(storageGet(REVIEW_DONE_KEY) === '1') return true;
    try{
      for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i) || '';
        if(!key.startsWith('ca_review_')) continue;
        const saved = JSON.parse(localStorage.getItem(key) || 'null');
        if(saved && Number(saved.rating) >= 1){
          storageSet(REVIEW_DONE_KEY, '1');
          return true;
        }
      }
    }catch(_){ }
    return false;
  }

  function telegramWasOpened(){
    return storageGet(TELEGRAM_DONE_KEY) === '1';
  }

  function lastShown(type){
    const own = Number(storageGet(LAST_SHOWN_PREFIX + type, '0')) || 0;
    if(type !== 'support' || own) return own;
    return Number(storageGet(LEGACY_COMMUNITY_LAST_KEY, '0')) || 0;
  }

  function scheduledTypeForCount(count){
    if(!Number.isFinite(count) || count < 1) return null;

    // التقييم: 1، 4، 7... لحد ما اللاعب يرسل تقييمًا واحدًا.
    if(count % 3 === 1 && !hasAnySavedReview() && lastShown('review') !== count){
      return 'review';
    }

    // تيليجرام: 2، 5، 8... لحد ما اللاعب يفتح القناة مرة واحدة.
    if(count % 3 === 2 && !telegramWasOpened() && lastShown('telegram') !== count){
      return 'telegram';
    }

    // الدعم يبدأ بعد القضية الثالثة ثم كل 6 قضايا: 3، 9، 15...
    if(count >= SUPPORT_FIRST_AT && (count - SUPPORT_FIRST_AT) % SUPPORT_INTERVAL === 0){
      const last = lastShown('support');
      if(last !== count && (!last || count - last >= SUPPORT_INTERVAL)) return 'support';
    }

    return null;
  }

  function track(name, params={}){
    try{
      if(typeof gaTrack === 'function') gaTrack(name, params);
      else if(typeof window.gtag === 'function') window.gtag('event', name, params);
    }catch(_){ }
  }

  function ensureStyles(){
    if(document.getElementById('ending-rotation-popup-styles')) return;
    const style = document.createElement('style');
    style.id = 'ending-rotation-popup-styles';
    style.textContent = `
      /* التقييم بقى Popup؛ نخفي النسخة القديمة داخل شاشة النهاية لمنع التكرار. */
      #panelBody .review-box{display:none!important}
      .ending-rotation-overlay{position:fixed;inset:0;z-index:10020;background:rgba(3,4,7,.84);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px;font-family:Cairo,Tahoma,sans-serif}
      .ending-rotation-modal{width:min(520px,100%);max-height:90vh;overflow:auto;background:#11141b;border:1px solid rgba(224,164,88,.32);border-radius:22px;padding:22px;color:#ece5d8;box-shadow:0 24px 70px rgba(0,0,0,.62);position:relative;direction:rtl}
      .ending-rotation-close{position:absolute;left:14px;top:12px;width:36px;height:36px;border:0;border-radius:50%;background:#1d212b;color:#fff;font-size:22px;cursor:pointer}
      .ending-rotation-head{text-align:center;padding:4px 36px 15px}.ending-rotation-icon{font-size:40px}.ending-rotation-head h3{margin:7px 0 5px;color:#f1c786;font-size:22px}.ending-rotation-head p{margin:0;color:#aeb2b9;font-size:13px;line-height:1.8}
      .ending-rotation-btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;box-sizing:border-box;border-radius:11px;border:1px solid #e0a458;background:#e0a458;color:#111;text-decoration:none;font:800 14px Cairo,Tahoma,sans-serif;cursor:pointer;padding:9px 12px}
      .ending-rotation-btn:disabled{opacity:.55;cursor:not-allowed}.ending-rotation-btn.ghost{margin-top:9px;background:#1b1f28;color:#f1c786;border-color:#3a3f4b}
      .ending-review-stars{display:flex;direction:ltr;justify-content:center;gap:4px;margin:7px 0 14px}.ending-review-star{border:0;background:transparent;color:#e0a458;font-size:36px;line-height:1;cursor:pointer;padding:2px}
      .ending-review-comment{width:100%;min-height:78px;box-sizing:border-box;resize:vertical;border:1px solid #343946;background:#171a22;color:#eee;border-radius:11px;padding:11px 12px;font:13px Cairo,Tahoma,sans-serif;margin-bottom:10px}
      .ending-support-method{display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #2b3039;background:#151820;border-radius:12px;padding:11px 12px;margin-top:9px}
      .ending-support-copy{min-width:0}.ending-support-copy strong{display:block;font-size:13px}.ending-support-copy span{display:block;direction:ltr;text-align:left;color:#aeb2b9;font:12px monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px}
      .ending-support-actions{display:flex;gap:6px}.ending-mini-btn{border:1px solid #3a3f4b;background:#1b1f28;color:#f1c786;border-radius:9px;padding:7px 9px;font:700 12px Cairo,Tahoma,sans-serif;text-decoration:none;cursor:pointer}.ending-mini-btn.primary{background:#e0a458;color:#111;border-color:#e0a458}
      .ending-rotation-note{text-align:center;color:#777;font-size:11px;margin:13px 0 0;line-height:1.7}
      @media(max-width:560px){.ending-rotation-modal{padding:20px 15px}.ending-support-method{align-items:flex-start}.ending-support-copy span{max-width:185px}}
    `;
    document.head.appendChild(style);
  }

  function createOverlay(type, innerHTML){
    const overlay = document.createElement('div');
    overlay.id = 'endingRotationOverlay';
    overlay.className = 'ending-rotation-overlay';
    overlay.dataset.popupType = type;
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.innerHTML = `
      <div class="ending-rotation-modal">
        <button type="button" class="ending-rotation-close" aria-label="إغلاق">×</button>
        ${innerHTML}
      </div>`;

    document.body.appendChild(overlay);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const close = ()=>{
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      overlay.remove();
    };
    const onKey = e=>{ if(e.key === 'Escape') close(); };

    overlay.addEventListener('click', e=>{ if(e.target === overlay) close(); });
    overlay.querySelector('.ending-rotation-close').addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return { overlay, close };
  }

  function showReviewPopup(count){
    const {overlay, close} = createOverlay('review', `
      <div class="ending-rotation-head">
        <div class="ending-rotation-icon">⭐</div>
        <h3>قيّم القضية</h3>
        <p>تقييمك بيساعدنا نعرف إيه اللي يستاهل يتكرر وإيه اللي محتاج يتظبط.</p>
      </div>
      <div class="ending-review-stars" data-review-stars data-rating="0">
        ${[1,2,3,4,5].map(n=>`<button type="button" class="ending-review-star" data-star="${n}" aria-label="تقييم ${n} نجوم">☆</button>`).join('')}
      </div>
      <textarea class="ending-review-comment" data-review-comment maxlength="240" rows="3" placeholder="رأيك في القضية (اختياري)..."></textarea>
      <button type="button" class="ending-rotation-btn" data-submit-review disabled>أرسل التقييم</button>
      <button type="button" class="ending-rotation-btn ghost" data-review-later>مش دلوقتي</button>`);

    const stars = overlay.querySelector('[data-review-stars]');
    const submit = overlay.querySelector('[data-submit-review]');
    stars.querySelectorAll('[data-star]').forEach(button=>{
      button.addEventListener('click', ()=>{
        const rating = Number(button.dataset.star) || 0;
        stars.dataset.rating = String(rating);
        stars.querySelectorAll('[data-star]').forEach(star=>{
          star.textContent = Number(star.dataset.star) <= rating ? '★' : '☆';
        });
        submit.disabled = rating < 1;
      });
    });

    submit.addEventListener('click', async ()=>{
      const rating = Number(stars.dataset.rating) || 0;
      if(rating < 1) return;
      const comment = (overlay.querySelector('[data-review-comment]').value || '').trim().slice(0,240);
      submit.disabled = true;
      submit.textContent = 'جارِ الإرسال...';

      try{
        if(typeof submitCaseReview === 'function'){
          await submitCaseReview(rating, comment);
        }else{
          const currentCase = (typeof CASE !== 'undefined' && CASE) ? CASE : null;
          if(currentCase) storageSet('ca_review_' + currentCase.id, JSON.stringify({rating, comment}));
          if(currentCase && typeof submitReview === 'function'){
            await submitReview({
              caseId: currentCase.id,
              visitorId: typeof getVisitorId === 'function' ? getVisitorId() : '',
              playerName: typeof getPlayerName === 'function' ? (getPlayerName() || 'محقق مجهول') : 'محقق مجهول',
              rating,
              comment,
            });
          }
        }
        storageSet(REVIEW_DONE_KEY, '1');
        track('ending_rotation_action_complete', {popup_type:'review', completed_cases:count, rating:String(rating)});
        close();
      }catch(err){
        console.error('ending review failed', err);
        submit.disabled = false;
        submit.textContent = 'حاول تاني';
      }
    });

    overlay.querySelector('[data-review-later]').addEventListener('click', close);
    overlay.querySelector('[data-star]').focus();
  }

  function showTelegramPopup(count){
    const {overlay, close} = createOverlay('telegram', `
      <div class="ending-rotation-head">
        <div class="ending-rotation-icon">📢</div>
        <h3>متفوّتش القضية الجاية</h3>
        <p>القضايا الجديدة، التحديثات، ونتائج المتصدرين هتلاقيها على قناة طرف الخيط.</p>
      </div>
      <a href="${esc(telegramUrl)}" target="_blank" rel="noopener noreferrer" class="ending-rotation-btn" data-ending-telegram data-telegram-cta="ending_rotation_popup">فتح قناة تيليجرام</a>
      <button type="button" class="ending-rotation-btn ghost" data-telegram-later>كمّل من غير انضمام</button>`);

    overlay.querySelector('[data-ending-telegram]').addEventListener('click', ()=>{
      storageSet(TELEGRAM_DONE_KEY, '1');
      track('ending_rotation_action_complete', {popup_type:'telegram', completed_cases:count});
      setTimeout(close, 150);
    });
    overlay.querySelector('[data-telegram-later]').addEventListener('click', close);
    overlay.querySelector('[data-ending-telegram]').focus();
  }

  function copyText(value, button, method){
    if(!value) return;
    const done = ()=>{
      const old = button.textContent;
      button.textContent = 'تم ✓';
      setTimeout(()=>{ if(button.isConnected) button.textContent = old; }, 1200);
      track('donation_payment_copy', {payment_method:method, cta_location:'ending_rotation_popup'});
    };
    const fallback = ()=>{
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand('copy'); done(); }catch(_){ }
      ta.remove();
    };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(value).then(done).catch(fallback);
    }else fallback();
  }

  function supportMethod(icon, label, value, method, link){
    if(!value) return '';
    return `
      <div class="ending-support-method">
        <div class="ending-support-copy">
          <strong>${icon} ${esc(label)}</strong>
          <span>${esc(value)}</span>
        </div>
        <div class="ending-support-actions">
          <button type="button" class="ending-mini-btn" data-copy-value="${esc(value)}" data-copy-method="${esc(method)}">نسخ</button>
          ${link ? `<a class="ending-mini-btn primary" href="${esc(link)}" target="_blank" rel="noopener noreferrer" data-payment-open="${esc(method)}">فتح</a>` : ''}
        </div>
      </div>`;
  }

  function showSupportPopup(count){
    const {overlay} = createOverlay('support', `
      <div class="ending-rotation-head">
        <div class="ending-rotation-icon">❤️</div>
        <h3>ادعم طرف الخيط</h3>
        <p>لو التجربة عجبتك، تقدر تساعد المشروع يكمل بأي مبلغ يناسبك.</p>
      </div>
      ${supportMethod('📱','Vodafone Cash — داخل مصر',vodafone,'vodafone_cash','')}
      ${supportMethod('⚡','InstaPay — داخل مصر',instapay,'instapay',instapayLink)}
      ${supportMethod('🌍','PayPal — من خارج مصر',paypal,'paypal','')}
      <p class="ending-rotation-note">الدعم اختياري بالكامل ولا يفتح مزايا داخل اللعبة أو يؤثر على ترتيب اللاعبين.</p>`);

    overlay.querySelectorAll('[data-copy-value]').forEach(button=>{
      button.addEventListener('click', ()=>copyText(button.dataset.copyValue || '', button, button.dataset.copyMethod || 'unknown'));
    });
    overlay.querySelectorAll('[data-payment-open]').forEach(link=>{
      link.addEventListener('click', ()=>track('donation_payment_open', {payment_method:link.dataset.paymentOpen, cta_location:'ending_rotation_popup'}));
    });
    const first = overlay.querySelector('[data-copy-value], [data-payment-open]');
    if(first) first.focus();
  }

  function shouldOpenEndingPopup(){
    try{
      return typeof CASE !== 'undefined' && typeof game !== 'undefined' && CASE && game && game.screen === 'ending';
    }catch(_){
      return false;
    }
  }

  function showEndingRotationPopup(){
    if(!shouldOpenEndingPopup() || document.getElementById('endingRotationOverlay')) return;
    const count = completedCount();
    const type = scheduledTypeForCount(count);
    if(!type) return;

    storageSet(LAST_SHOWN_PREFIX + type, count);
    track('ending_rotation_popup_impression', {popup_type:type, completed_cases:count});

    if(type === 'review') showReviewPopup(count);
    else if(type === 'telegram') showTelegramPopup(count);
    else if(type === 'support') showSupportPopup(count);
  }

  ensureStyles();

  // engine.js بينادي الدالة دي بعد انتهاء القضية. نستبدلها بالمنظّم الجديد.
  try{
    window.showTelegramInvite = showEndingRotationPopup;
    showTelegramInvite = showEndingRotationPopup;
  }catch(_){
    window.showTelegramInvite = showEndingRotationPopup;
  }

  // واجهة صغيرة للاختبار اليدوي من غير ما نكشف بيانات أو نغيّر حالة اللاعب.
  window.EndingPopupRotation = {
    show: showEndingRotationPopup,
    scheduledTypeForCount,
  };
})();
