/* ============================================================
   طرف الخيط — نافذة دعم المشروع
   تعتمد على DONATION_* الموجودة في config.js
   ============================================================ */
(function () {
  'use strict';

  const cfg = {
    vodafoneCash: (typeof DONATION_VODAFONE_CASH !== 'undefined' ? DONATION_VODAFONE_CASH : '').trim(),
    instaPay: (typeof DONATION_INSTAPAY !== 'undefined' ? DONATION_INSTAPAY : '').trim(),
    instaPayLink: (typeof DONATION_INSTAPAY_LINK !== 'undefined' ? DONATION_INSTAPAY_LINK : '').trim(),
    title: (typeof DONATION_TITLE !== 'undefined' ? DONATION_TITLE : 'ادعم طرف الخيط ❤️'),
  };

  const track = (eventName, params = {}) => {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          event_category: 'donation',
          ...params,
        });
      }
    } catch (_) {}
  };

  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const styles = document.createElement('style');
  styles.textContent = `
    .taraf-support-fab{position:fixed;left:18px;bottom:18px;z-index:9997;border:1px solid rgba(224,164,88,.45);background:linear-gradient(135deg,#171a22,#0d0f15);color:#f4dfbd;border-radius:999px;padding:11px 15px;font-family:Cairo,Tahoma,sans-serif;font-weight:800;cursor:pointer;box-shadow:0 12px 34px rgba(0,0,0,.35);display:flex;align-items:center;gap:7px;transition:.2s ease}
    .taraf-support-fab:hover{transform:translateY(-2px);border-color:#e0a458}
    .taraf-support-backdrop{position:fixed;inset:0;z-index:9998;background:rgba(3,4,7,.78);backdrop-filter:blur(7px);display:none;align-items:center;justify-content:center;padding:18px}
    .taraf-support-backdrop.is-open{display:flex}
    .taraf-support-card{width:min(430px,100%);background:#11141b;border:1px solid rgba(224,164,88,.26);border-radius:22px;padding:22px;color:#ece5d8;font-family:Cairo,Tahoma,sans-serif;box-shadow:0 24px 70px rgba(0,0,0,.55);position:relative}
    .taraf-support-close{position:absolute;left:14px;top:12px;width:34px;height:34px;border:0;border-radius:50%;background:#1d212b;color:#fff;font-size:22px;cursor:pointer}
    .taraf-support-card h3{margin:0 0 8px;font-size:22px;color:#f1c786}
    .taraf-support-card p{margin:0 0 16px;color:#c9c4ba;line-height:1.8;font-size:14px}
    .taraf-support-amounts{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}
    .taraf-support-amount{border:1px solid #303542;background:#171a22;color:#ece5d8;border-radius:12px;padding:9px 6px;font-family:inherit;cursor:pointer}
    .taraf-support-amount.is-selected{border-color:#e0a458;color:#f1c786;background:#201b14}
    .taraf-support-method{border:1px solid #2a2f3a;border-radius:16px;padding:14px;margin-top:10px;background:#151820}
    .taraf-support-method strong{display:block;margin-bottom:7px;color:#fff}
    .taraf-support-value{display:flex;gap:8px;align-items:center;direction:ltr}
    .taraf-support-value code{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:#0d0f14;border-radius:10px;padding:9px 10px;color:#f1c786;font-family:monospace;font-size:13px}
    .taraf-support-copy{border:0;background:#e0a458;color:#111;border-radius:10px;padding:9px 11px;font-family:Cairo,Tahoma,sans-serif;font-weight:800;cursor:pointer}
    .taraf-support-pay{display:block;margin-top:9px;text-align:center;text-decoration:none;background:#e0a458;color:#111;border-radius:11px;padding:10px 12px;font-weight:900}
    .taraf-support-pay:hover{filter:brightness(1.05)}
    .taraf-support-note{font-size:12px!important;color:#8f938f!important;margin-top:14px!important;margin-bottom:0!important}
    .taraf-support-empty{border:1px dashed #3a3f4b;border-radius:14px;padding:14px;color:#9fa4ac;text-align:center;font-size:13px}
    @media(max-width:560px){.taraf-support-fab{left:12px;bottom:12px;padding:10px 13px;font-size:13px}.taraf-support-card{padding:20px 16px}.taraf-support-amounts{grid-template-columns:repeat(2,1fr)}}
  `;
  document.head.appendChild(styles);

  const fab = document.createElement('button');
  fab.className = 'taraf-support-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'دعم طرف الخيط');
  fab.innerHTML = '❤️ <span>ادعم اللعبة</span>';

  const backdrop = document.createElement('div');
  backdrop.className = 'taraf-support-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'دعم طرف الخيط');

  const methods = [];
  if (cfg.vodafoneCash) {
    methods.push(`
      <div class="taraf-support-method">
        <strong>📱 Vodafone Cash</strong>
        <div class="taraf-support-value">
          <code>${escapeHtml(cfg.vodafoneCash)}</code>
          <button class="taraf-support-copy" type="button" data-copy="${escapeHtml(cfg.vodafoneCash)}" data-method="vodafone_cash">نسخ</button>
        </div>
      </div>`);
  }
  if (cfg.instaPay) {
    methods.push(`
      <div class="taraf-support-method">
        <strong>⚡ InstaPay</strong>
        <div class="taraf-support-value">
          <code>${escapeHtml(cfg.instaPay)}</code>
          <button class="taraf-support-copy" type="button" data-copy="${escapeHtml(cfg.instaPay)}" data-method="instapay">نسخ</button>
        </div>
        ${cfg.instaPayLink ? `<a class="taraf-support-pay" href="${escapeHtml(cfg.instaPayLink)}" target="_blank" rel="noopener noreferrer" data-instapay-link>فتح InstaPay وإرسال الدعم</a>` : ''}
      </div>`);
  }

  backdrop.innerHTML = `
    <div class="taraf-support-card">
      <button class="taraf-support-close" type="button" aria-label="إغلاق">×</button>
      <h3>${escapeHtml(cfg.title)}</h3>
      <p>لو اللعبة عجبتك وحابب تدعم صانع طرف الخيط واستمرار تطوير المشروع، تقدر تدعم بأي مبلغ يناسبك.</p>
      <div class="taraf-support-amounts" aria-label="مبالغ مقترحة">
        <button class="taraf-support-amount" type="button" data-amount="20">20 جنيه</button>
        <button class="taraf-support-amount" type="button" data-amount="50">50 جنيه</button>
        <button class="taraf-support-amount" type="button" data-amount="100">100 جنيه</button>
        <button class="taraf-support-amount" type="button" data-amount="other">مبلغ آخر</button>
      </div>
      ${methods.length ? methods.join('') : '<div class="taraf-support-empty">وسائل الدعم لم تُضف بعد.</div>'}
      <p class="taraf-support-note">الدعم اختياري بالكامل، وليس شراءً داخل اللعبة، ولا يفتح مزايا أو يؤثر على ترتيب اللاعبين.</p>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(backdrop);

  const open = () => {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    track('donation_modal_open');
  };
  const close = () => {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  fab.addEventListener('click', open);
  backdrop.querySelector('.taraf-support-close').addEventListener('click', close);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && backdrop.classList.contains('is-open')) close(); });

  backdrop.querySelectorAll('.taraf-support-amount').forEach((btn) => {
    btn.addEventListener('click', () => {
      backdrop.querySelectorAll('.taraf-support-amount').forEach((x) => x.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      track('donation_amount_select', { donation_amount: btn.dataset.amount });
    });
  });

  backdrop.querySelectorAll('.taraf-support-copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy || '';
      let copied = false;
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch (_) {
        const input = document.createElement('textarea');
        input.value = value;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try { copied = document.execCommand('copy'); } catch (_) {}
        input.remove();
      }
      if (copied) {
        const old = btn.textContent;
        btn.textContent = 'تم ✓';
        setTimeout(() => { btn.textContent = old; }, 1500);
        track('donation_payment_copy', { payment_method: btn.dataset.method || 'unknown' });
      }
    });
  });

  const instaLink = backdrop.querySelector('[data-instapay-link]');
  if (instaLink) {
    instaLink.addEventListener('click', () => {
      track('donation_instapay_open');
    });
  }
})();
