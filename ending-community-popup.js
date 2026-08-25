/* ============================================================
   طرف الخيط — Popup موحد بعد نهاية القضية
   تيليجرام + دعم المشروع في نفس النافذة بدون Popup إضافي
   ============================================================ */
(function(){
  'use strict';

  const SHOWN_AT_COUNT_KEY = 'ca_community_popup_last_completed_count_v1';
  const FIRST_SHOW_AT = 1;
  const REPEAT_EVERY_CASES = 5;

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

  function completedCount(){
    try{
      if(typeof getCompletedIds === 'function') return getCompletedIds().length;
    }catch(_){ }
    return 0;
  }

  function shouldShowCommunityPopup(){
    if(typeof CASE === 'undefined' || typeof game === 'undefined' || !CASE || !game || game.screen !== 'ending') return false;
    if(document.getElementById('communityEndingOverlay')) return false;

    const count = completedCount();
    if(count < FIRST_SHOW_AT) return false;

    try{
      const last = Number(localStorage.getItem(SHOWN_AT_COUNT_KEY) || 0);
      if(!last) return true;
      return count - last >= REPEAT_EVERY_CASES;
    }catch(_){
      return true;
    }
  }

  function track(name, params={}){
    try{
      if(typeof gaTrack === 'function') gaTrack(name, params);
      else if(typeof window.gtag === 'function') window.gtag('event', name, params);
    }catch(_){ }
  }

  function copyText(value, button, method){
    if(!value) return;
    const done = ()=>{
      const old = button.textContent;
      button.textContent = 'تم ✓';
      setTimeout(()=>{ if(button.isConnected) button.textContent = old; }, 1200);
      track('donation_payment_copy', { payment_method: method, cta_location:'ending_combined_popup' });
    };

    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(value).then(done).catch(()=>fallbackCopy(value, done));
    }else fallbackCopy(value, done);
  }

  function fallbackCopy(value, done){
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); done(); }catch(_){ }
    ta.remove();
  }

  function methodRow(icon, label, value, method, link){
    if(!value) return '';
    return `
      <div class="community-support-method">
        <div class="community-support-method-copy">
          <strong>${icon} ${esc(label)}</strong>
          <span>${esc(value)}</span>
        </div>
        <div class="community-support-method-actions">
          <button type="button" class="community-mini-btn" data-copy-value="${esc(value)}" data-copy-method="${esc(method)}">نسخ</button>
          ${link ? `<a class="community-mini-btn primary" href="${esc(link)}" target="_blank" rel="noopener noreferrer" data-payment-open="${esc(method)}">فتح</a>` : ''}
        </div>
      </div>`;
  }

  function showCommunityPopup(){
    if(!shouldShowCommunityPopup()) return;

    const count = completedCount();
    try{ localStorage.setItem(SHOWN_AT_COUNT_KEY, String(count)); }catch(_){ }
    track('community_ending_popup_impression', { completed_cases:count });

    if(!document.getElementById('community-ending-popup-styles')){
      const style = document.createElement('style');
      style.id='community-ending-popup-styles';
      style.textContent=`
        .community-ending-overlay{position:fixed;inset:0;z-index:10020;background:rgba(3,4,7,.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px;font-family:Cairo,Tahoma,sans-serif}
        .community-ending-modal{width:min(560px,100%);max-height:90vh;overflow:auto;background:#11141b;border:1px solid rgba(224,164,88,.3);border-radius:22px;padding:22px;color:#ece5d8;box-shadow:0 24px 70px rgba(0,0,0,.6);position:relative}
        .community-ending-close{position:absolute;left:14px;top:12px;width:36px;height:36px;border:0;border-radius:50%;background:#1d212b;color:#fff;font-size:22px;cursor:pointer}
        .community-ending-head{text-align:center;padding:4px 36px 16px}.community-ending-seal{font-size:38px}.community-ending-head h3{margin:7px 0 5px;color:#f1c786;font-size:22px}.community-ending-head p{margin:0;color:#aaa;font-size:13px;line-height:1.8}
        .community-ending-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.community-ending-card{border:1px solid #2c313c;background:#151820;border-radius:16px;padding:15px}.community-ending-card .icon{font-size:27px}.community-ending-card h4{margin:7px 0 5px;font-size:15px}.community-ending-card p{margin:0 0 12px;color:#aeb2b9;font-size:12px;line-height:1.7}
        .community-ending-btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:44px;box-sizing:border-box;border-radius:11px;border:1px solid rgba(224,164,88,.45);background:#e0a458;color:#111;text-decoration:none;font-family:Cairo,Tahoma,sans-serif;font-weight:800;cursor:pointer;padding:9px 11px}.community-ending-btn.ghost{background:#1b1f28;color:#f1c786;border-color:#3a3f4b}
        .community-support-details{display:none;border-top:1px solid #292d36;margin-top:16px;padding-top:15px}.community-support-details.is-open{display:block}.community-support-title{font-weight:800;color:#f1c786;margin-bottom:8px}.community-support-method{display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #2b3039;background:#151820;border-radius:12px;padding:11px 12px;margin-top:8px}.community-support-method-copy{min-width:0}.community-support-method-copy strong{display:block;font-size:13px}.community-support-method-copy span{display:block;direction:ltr;text-align:left;color:#aeb2b9;font-family:monospace;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px}.community-support-method-actions{display:flex;gap:6px}.community-mini-btn{border:1px solid #3a3f4b;background:#1b1f28;color:#f1c786;border-radius:9px;padding:7px 9px;font:700 12px Cairo,Tahoma,sans-serif;text-decoration:none;cursor:pointer}.community-mini-btn.primary{background:#e0a458;color:#111;border-color:#e0a458}.community-ending-note{text-align:center;color:#777;font-size:11px;margin:13px 0 0;line-height:1.7}
        @media(max-width:560px){.community-ending-modal{padding:20px 15px}.community-ending-grid{grid-template-columns:1fr}.community-support-method{align-items:flex-start}.community-support-method-copy span{max-width:190px}}
      `;
      document.head.appendChild(style);
    }

    const overlay = document.createElement('div');
    overlay.id='communityEndingOverlay';
    overlay.className='community-ending-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-labelledby','communityEndingTitle');

    overlay.innerHTML=`
      <div class="community-ending-modal">
        <button type="button" class="community-ending-close" aria-label="إغلاق">×</button>
        <div class="community-ending-head">
          <div class="community-ending-seal">🧵</div>
          <h3 id="communityEndingTitle">خلصت القضية يا محقق</h3>
          <p>لو حابب تكمل مع طرف الخيط، اختار اللي يناسبك.</p>
        </div>

        <div class="community-ending-grid">
          <div class="community-ending-card">
            <div class="icon">📢</div>
            <h4>تابعنا على تيليجرام</h4>
            <p>القضايا الجديدة، التحديثات، وأي إعلان مهم هتلاقيه هناك.</p>
            <a href="${esc(telegramUrl)}" target="_blank" rel="noopener" class="community-ending-btn" data-community-telegram>فتح قناة تيليجرام</a>
          </div>

          <div class="community-ending-card">
            <div class="icon">❤️</div>
            <h4>ادعم طرف الخيط</h4>
            <p>لو التجربة عجبتك، تقدر تساعد المشروع يكمل بأي مبلغ يناسبك.</p>
            <button type="button" class="community-ending-btn ghost" data-toggle-support>عرض طرق الدعم</button>
          </div>
        </div>

        <div class="community-support-details" data-support-details>
          <div class="community-support-title">طرق الدعم</div>
          ${methodRow('📱','Vodafone Cash — داخل مصر',vodafone,'vodafone_cash','')}
          ${methodRow('⚡','InstaPay — داخل مصر',instapay,'instapay',instapayLink)}
          ${methodRow('🌍','PayPal — من خارج مصر',paypal,'paypal','')}
          <p class="community-ending-note">الدعم اختياري بالكامل ولا يفتح مزايا داخل اللعبة أو يؤثر على ترتيب اللاعبين.</p>
        </div>

        <p class="community-ending-note">النافذة دي مش هتظهر بعد كل قضية؛ بنكررها كل عدة قضايا عشان التجربة تفضل هادية.</p>
      </div>`;

    document.body.appendChild(overlay);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow='hidden';

    const close = ()=>{
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow=previousOverflow;
      overlay.remove();
    };
    const onKey = e=>{ if(e.key==='Escape') close(); };

    overlay.addEventListener('click', e=>{ if(e.target===overlay) close(); });
    overlay.querySelector('.community-ending-close').addEventListener('click',close);
    overlay.querySelector('[data-community-telegram]').addEventListener('click',()=>{
      track('telegram_cta_click',{cta_location:'ending_combined_popup'});
    });

    const toggle = overlay.querySelector('[data-toggle-support]');
    const details = overlay.querySelector('[data-support-details]');
    toggle.addEventListener('click',()=>{
      const open = details.classList.toggle('is-open');
      toggle.textContent = open ? 'إخفاء طرق الدعم' : 'عرض طرق الدعم';
      if(open) track('donation_methods_open',{cta_location:'ending_combined_popup'});
    });

    overlay.querySelectorAll('[data-copy-value]').forEach(btn=>{
      btn.addEventListener('click',()=>copyText(btn.dataset.copyValue || '',btn,btn.dataset.copyMethod || 'unknown'));
    });
    overlay.querySelectorAll('[data-payment-open]').forEach(link=>{
      link.addEventListener('click',()=>track('donation_payment_open',{payment_method:link.dataset.paymentOpen,cta_location:'ending_combined_popup'}));
    });

    document.addEventListener('keydown',onKey);
    overlay.querySelector('[data-community-telegram]').focus();
  }

  // engine.js بينادي showTelegramInvite بعد نهاية القضية.
  // نستبدلها هنا بالنافذة الموحدة من غير ما نغير منطق إنهاء القضية نفسه.
  try{
    window.showTelegramInvite = showCommunityPopup;
    // في بعض المتصفحات الربط العالمي للدوال بيكون Identifier مباشر.
    showTelegramInvite = showCommunityPopup;
  }catch(_){
    window.showTelegramInvite = showCommunityPopup;
  }

  window.showCommunityEndingPopup = showCommunityPopup;
})();
