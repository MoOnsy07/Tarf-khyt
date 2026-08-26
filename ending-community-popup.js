/* ============================================================
   طرف الخيط — نافذة ما بعد القضية
   التقييم أساسي بعد كل قضية + كارت ثانوي بالتناوب:
   قضية فردية: قناة تيليجرام — قضية زوجية: دعم اللعبة.
   لو اللاعب أكد إنه انضم للقناة، أدوار القناة تتحول للدعم.
   ============================================================ */
(function(){
  'use strict';

  const TELEGRAM_DONE_KEY = 'ca_telegram_cta_opened_v1';
  const SHOWN_CASE_PREFIX = 'ca_ending_review_popup_shown_';

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
    }catch(_){ return fallback; }
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

  function currentCaseId(){
    try{ return CASE && CASE.id ? String(CASE.id) : ''; }catch(_){ return ''; }
  }

  function telegramWasOpened(){
    return storageGet(TELEGRAM_DONE_KEY) === '1';
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
      #panelBody .review-box{display:none!important}
      .ending-rotation-overlay{position:fixed;inset:0;z-index:10020;background:rgba(3,4,7,.86);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px;font-family:Cairo,Tahoma,sans-serif}
      .ending-rotation-modal{width:min(540px,100%);max-height:92vh;overflow:auto;background:#11141b;border:1px solid rgba(224,164,88,.32);border-radius:22px;padding:22px;color:#ece5d8;box-shadow:0 24px 70px rgba(0,0,0,.62);position:relative;direction:rtl}
      .ending-rotation-close{position:absolute;left:14px;top:12px;width:36px;height:36px;border:0;border-radius:50%;background:#1d212b;color:#fff;font-size:22px;cursor:pointer}
      .ending-rotation-head{text-align:center;padding:4px 36px 12px}.ending-rotation-icon{font-size:38px}.ending-rotation-head h3{margin:7px 0 5px;color:#f1c786;font-size:22px}.ending-rotation-head p{margin:0;color:#aeb2b9;font-size:13px;line-height:1.8}
      .ending-review-stars{display:flex;direction:ltr;justify-content:center;gap:4px;margin:7px 0 13px}.ending-review-star{border:0;background:transparent;color:#e0a458;font-size:38px;line-height:1;cursor:pointer;padding:2px}
      .ending-review-question{text-align:center;color:#f1c786;font-size:13px;line-height:1.8;margin:-2px 0 10px;min-height:24px}
      .ending-review-topics{display:flex;justify-content:center;flex-wrap:wrap;gap:7px;margin:0 0 10px}.ending-review-topic{border:1px solid #343946;background:#171a22;color:#c9cbd0;border-radius:999px;padding:6px 10px;font:700 11px Cairo,Tahoma,sans-serif;cursor:pointer}.ending-review-topic:hover,.ending-review-topic.active{border-color:#e0a458;color:#f1c786;background:#211d18}
      .ending-review-comment{width:100%;min-height:88px;box-sizing:border-box;resize:vertical;border:1px solid #343946;background:#171a22;color:#eee;border-radius:11px;padding:11px 12px;font:13px Cairo,Tahoma,sans-serif;margin-bottom:5px}
      .ending-review-helper{display:flex;justify-content:space-between;gap:10px;color:#858a94;font-size:11px;line-height:1.6;margin:0 2px 11px}.ending-review-helper.useful{color:#79c9a5}
      .ending-rotation-btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;box-sizing:border-box;border-radius:11px;border:1px solid #e0a458;background:#e0a458;color:#111;text-decoration:none;font:800 14px Cairo,Tahoma,sans-serif;cursor:pointer;padding:9px 12px}.ending-rotation-btn:disabled{opacity:.55;cursor:not-allowed}.ending-rotation-btn.ghost{background:#1b1f28;color:#f1c786;border-color:#3a3f4b}
      .ending-extra-card{margin-top:16px;padding:14px;border:1px solid #2f3440;border-radius:15px;background:#151820}.ending-extra-label{color:#858a94;font:700 10px Cairo,Tahoma,sans-serif;margin-bottom:4px}.ending-extra-card h4{margin:0 0 5px;color:#f1c786;font-size:15px}.ending-extra-card p{margin:0 0 11px;color:#aeb2b9;font-size:12px;line-height:1.75}.ending-extra-actions{display:flex;gap:8px;flex-wrap:wrap}.ending-extra-actions .ending-rotation-btn{flex:1;min-width:150px;min-height:40px;font-size:12px}
      .ending-support-method{display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #2b3039;background:#11141b;border-radius:11px;padding:9px 10px;margin-top:8px}.ending-support-copy{min-width:0}.ending-support-copy strong{display:block;font-size:12px}.ending-support-copy span{display:block;direction:ltr;text-align:left;color:#aeb2b9;font:11px monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px}.ending-support-actions{display:flex;gap:6px}.ending-mini-btn{border:1px solid #3a3f4b;background:#1b1f28;color:#f1c786;border-radius:9px;padding:6px 8px;font:700 11px Cairo,Tahoma,sans-serif;text-decoration:none;cursor:pointer}.ending-mini-btn.primary{background:#e0a458;color:#111;border-color:#e0a458}
      .ending-rotation-note{text-align:center;color:#777;font-size:10px;margin:9px 0 0;line-height:1.7}
      @media(max-width:560px){.ending-rotation-modal{padding:19px 14px}.ending-support-method{align-items:flex-start}.ending-support-copy span{max-width:175px}.ending-extra-actions{display:block}.ending-extra-actions .ending-rotation-btn{margin-top:7px}}
    `;
    document.head.appendChild(style);
  }

  function createOverlay(innerHTML){
    const overlay = document.createElement('div');
    overlay.id = 'endingRotationOverlay';
    overlay.className = 'ending-rotation-overlay';
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

  function copyText(value, button, method){
    if(!value) return;
    const done = ()=>{
      const old = button.textContent;
      button.textContent = 'تم ✓';
      setTimeout(()=>{ if(button.isConnected) button.textContent = old; }, 1200);
      track('donation_payment_copy', {payment_method:method, cta_location:'ending_review_popup'});
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

  function telegramCard(){
    return `
      <div class="ending-extra-card" data-extra-card="telegram">
        <div class="ending-extra-label">بعد ما تبعت رأيك</div>
        <h4>📢 متفوّتش القضية الجاية</h4>
        <p>القضايا الجديدة، التحديثات ونتائج المتصدرين بتنزل على قناة طرف الخيط.</p>
        <div class="ending-extra-actions">
          <a href="${esc(telegramUrl)}" target="_blank" rel="noopener noreferrer" class="ending-rotation-btn" data-ending-telegram data-telegram-cta="ending_review_popup">انضم للقناة</a>
          <button type="button" class="ending-rotation-btn ghost" data-telegram-already>أنا انضمّيت قبل كده ✓</button>
        </div>
      </div>`;
  }

  function supportCard(){
    const methods = [
      supportMethod('📱','Vodafone Cash — داخل مصر',vodafone,'vodafone_cash',''),
      supportMethod('⚡','InstaPay — داخل مصر',instapay,'instapay',instapayLink),
      supportMethod('🌍','PayPal — من خارج مصر',paypal,'paypal','')
    ].join('');
    if(!methods) return '';
    return `
      <div class="ending-extra-card" data-extra-card="support">
        <div class="ending-extra-label">اختياري بالكامل</div>
        <h4>❤️ ادعم طرف الخيط</h4>
        <p>لو التجربة عجبتك، دعمك بيساعدنا نكمل تطوير قضايا وصور وأنظمة جديدة.</p>
        ${methods}
        <p class="ending-rotation-note">الدعم لا يفتح مزايا ولا يؤثر على ترتيب اللاعبين.</p>
      </div>`;
  }

  function secondaryCardForCount(count){
    const wantsTelegram = count % 2 === 1 && !telegramWasOpened();
    return wantsTelegram ? telegramCard() : supportCard();
  }

  function showReviewPopup(count){
    const {overlay, close} = createOverlay(`
      <div class="ending-rotation-head">
        <div class="ending-rotation-icon">⭐</div>
        <h3>رأيك في القضية؟</h3>
        <p>قولنا إيه اللي عجبك أو إيه اللي محتاج يتظبط — رأيك بيفرق فعلًا في القضايا الجاية.</p>
      </div>
      <div class="ending-review-stars" data-review-stars data-rating="0">
        ${[1,2,3,4,5].map(n=>`<button type="button" class="ending-review-star" data-star="${n}" aria-label="تقييم ${n} نجوم">☆</button>`).join('')}
      </div>
      <div class="ending-review-question" data-review-question>اختار تقييمك الأول.</div>
      <div class="ending-review-topics" aria-label="اختار نقطة تتكلم عنها">
        <button type="button" class="ending-review-topic" data-review-topic="القصة">القصة</button>
        <button type="button" class="ending-review-topic" data-review-topic="الأدلة">الأدلة</button>
        <button type="button" class="ending-review-topic" data-review-topic="الصعوبة">الصعوبة</button>
        <button type="button" class="ending-review-topic" data-review-topic="واجهة اللعب">واجهة اللعب</button>
      </div>
      <textarea class="ending-review-comment" data-review-comment maxlength="240" rows="3" placeholder="اكتب رأيك في سطر أو سطرين..."></textarea>
      <div class="ending-review-helper">
        <span data-review-helper>حتى جملة قصيرة هتساعدنا أكتر من النجوم لوحدها.</span>
        <span data-review-count>0/240</span>
      </div>
      <button type="button" class="ending-rotation-btn" data-submit-review disabled>إرسال رأيي ⭐</button>
      ${secondaryCardForCount(count)}`);

    const stars = overlay.querySelector('[data-review-stars]');
    const submit = overlay.querySelector('[data-submit-review]');
    const commentBox = overlay.querySelector('[data-review-comment]');
    const question = overlay.querySelector('[data-review-question]');
    const helper = overlay.querySelector('[data-review-helper]');
    const countLabel = overlay.querySelector('[data-review-count]');

    function refreshCommentNudge(){
      const comment = (commentBox.value || '').trim();
      const words = comment ? comment.split(/\s+/).filter(Boolean).length : 0;
      countLabel.textContent = `${commentBox.value.length}/240`;
      helper.classList.toggle('useful', words >= 3);
      helper.textContent = words >= 3
        ? 'تمام، كده رأيك واضح وهيوصل لنا 👌'
        : words > 0
          ? 'كمّل الفكرة بكلمتين كمان عشان نفهم قصدك.'
          : 'حتى جملة قصيرة هتساعدنا أكتر من النجوم لوحدها.';
    }

    stars.querySelectorAll('[data-star]').forEach(button=>{
      button.addEventListener('click', ()=>{
        const rating = Number(button.dataset.star) || 0;
        stars.dataset.rating = String(rating);
        stars.querySelectorAll('[data-star]').forEach(star=>{
          star.textContent = Number(star.dataset.star) <= rating ? '★' : '☆';
        });
        submit.disabled = rating < 1;
        question.textContent = rating <= 3
          ? 'إيه أكتر حاجة ضايقتك أو محتاجة تتحسن؟'
          : 'إيه أكتر حاجة عجبتك وعايز تشوف منها أكتر؟';
        commentBox.placeholder = rating <= 3
          ? 'مثال: الأدلة كانت محتاجة توضيح أكتر...'
          : 'مثال: الربط بين الأدلة كان أكتر جزء عجبني...';
        refreshCommentNudge();
      });
    });

    overlay.querySelectorAll('[data-review-topic]').forEach(topic=>{
      topic.addEventListener('click', ()=>{
        overlay.querySelectorAll('[data-review-topic]').forEach(item=>item.classList.toggle('active', item === topic));
        const label = topic.dataset.reviewTopic || '';
        const prefix = `بالنسبة لـ${label}: `;
        if(!(commentBox.value || '').trim()) commentBox.value = prefix;
        commentBox.placeholder = `قولنا رأيك في ${label} بجملة قصيرة...`;
        commentBox.focus();
        commentBox.setSelectionRange(commentBox.value.length, commentBox.value.length);
        refreshCommentNudge();
      });
    });
    commentBox.addEventListener('input', refreshCommentNudge);

    submit.addEventListener('click', async ()=>{
      const rating = Number(stars.dataset.rating) || 0;
      if(rating < 1) return;
      const comment = (commentBox.value || '').trim().slice(0,240);
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
        track('ending_review_submit', {completed_cases:count, rating:String(rating), has_comment:comment ? '1' : '0'});
        submit.textContent = 'تم إرسال رأيك ✓';
        setTimeout(close, 650);
      }catch(err){
        console.error('ending review failed', err);
        submit.disabled = false;
        submit.textContent = 'حاول تاني';
      }
    });

    const telegramJoin = overlay.querySelector('[data-ending-telegram]');
    if(telegramJoin){
      telegramJoin.addEventListener('click', ()=>{
        storageSet(TELEGRAM_DONE_KEY, '1');
        track('ending_secondary_action', {secondary_type:'telegram', action:'join_click', completed_cases:count});
      });
    }

    const telegramAlready = overlay.querySelector('[data-telegram-already]');
    if(telegramAlready){
      telegramAlready.addEventListener('click', ()=>{
        storageSet(TELEGRAM_DONE_KEY, '1');
        track('ending_secondary_action', {secondary_type:'telegram', action:'already_joined', completed_cases:count});
        const card = telegramAlready.closest('[data-extra-card]');
        if(card){
          const replacement = document.createElement('div');
          replacement.innerHTML = supportCard();
          const next = replacement.firstElementChild;
          if(next){
            card.replaceWith(next);
            bindSupportActions(overlay);
          }else card.remove();
        }
      });
    }

    bindSupportActions(overlay);
    overlay.querySelector('[data-star]').focus();
  }

  function bindSupportActions(root){
    root.querySelectorAll('[data-copy-value]:not([data-bound])').forEach(button=>{
      button.dataset.bound = '1';
      button.addEventListener('click', ()=>copyText(button.dataset.copyValue || '', button, button.dataset.copyMethod || 'unknown'));
    });
    root.querySelectorAll('[data-payment-open]:not([data-bound])').forEach(link=>{
      link.dataset.bound = '1';
      link.addEventListener('click', ()=>track('donation_payment_open', {payment_method:link.dataset.paymentOpen, cta_location:'ending_review_popup'}));
    });
  }

  function shouldOpenEndingPopup(){
    try{
      return typeof CASE !== 'undefined' && typeof game !== 'undefined' && CASE && game && game.screen === 'ending';
    }catch(_){ return false; }
  }

  function showEndingReviewPopup(){
    if(!shouldOpenEndingPopup() || document.getElementById('endingRotationOverlay')) return;
    const caseId = currentCaseId();
    if(!caseId) return;

    const shownKey = SHOWN_CASE_PREFIX + caseId;
    if(storageGet(shownKey) === '1') return;
    storageSet(shownKey, '1');

    const count = Math.max(1, completedCount());
    const secondaryType = (count % 2 === 1 && !telegramWasOpened()) ? 'telegram' : 'support';
    track('ending_review_popup_impression', {completed_cases:count, secondary_type:secondaryType});
    showReviewPopup(count);
  }

  ensureStyles();

  // engine.js بينادي الدالة دي بعد انتهاء القضية.
  try{
    window.showTelegramInvite = showEndingReviewPopup;
    showTelegramInvite = showEndingReviewPopup;
  }catch(_){
    window.showTelegramInvite = showEndingReviewPopup;
  }

  window.EndingPopupRotation = {
    show: showEndingReviewPopup,
    secondaryForCount: count => (Number(count) % 2 === 1 && !telegramWasOpened()) ? 'telegram' : 'support',
  };
})();