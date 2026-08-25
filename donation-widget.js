/* ============================================================
   طرف الخيط — نافذة الدعم + لوحة شرف الداعمين
   ============================================================ */
(function () {
  'use strict';

  const cfg = {
    vodafoneCash: (typeof DONATION_VODAFONE_CASH !== 'undefined' ? DONATION_VODAFONE_CASH : '').trim(),
    instaPay: (typeof DONATION_INSTAPAY !== 'undefined' ? DONATION_INSTAPAY : '').trim(),
    instaPayLink: (typeof DONATION_INSTAPAY_LINK !== 'undefined' ? DONATION_INSTAPAY_LINK : '').trim(),
    title: (typeof DONATION_TITLE !== 'undefined' ? DONATION_TITLE : 'ادعم طرف الخيط ❤️'),
  };

  const track = (eventName, params={}) => {
    try { if(typeof window.gtag === 'function') window.gtag('event', eventName, {event_category:'donation', ...params}); } catch(_){}
  };
  const esc = (v) => String(v ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

  const styles = document.createElement('style');
  styles.textContent = `
  .taraf-support-fab{position:fixed;right:18px;left:auto;bottom:18px;z-index:9997;border:1px solid rgba(224,164,88,.45);background:linear-gradient(135deg,#171a22,#0d0f15);color:#f4dfbd;border-radius:999px;padding:11px 15px;font-family:Cairo,Tahoma,sans-serif;font-weight:800;cursor:pointer;box-shadow:0 12px 34px rgba(0,0,0,.35);display:flex;align-items:center;gap:7px}
  .taraf-support-backdrop{position:fixed;inset:0;z-index:9998;background:rgba(3,4,7,.8);backdrop-filter:blur(7px);display:none;align-items:center;justify-content:center;padding:18px}.taraf-support-backdrop.is-open{display:flex}
  .taraf-support-card{width:min(480px,100%);max-height:90vh;overflow:auto;background:#11141b;border:1px solid rgba(224,164,88,.28);border-radius:22px;padding:22px;color:#ece5d8;font-family:Cairo,Tahoma,sans-serif;box-shadow:0 24px 70px rgba(0,0,0,.58);position:relative}
  .taraf-support-close{position:absolute;left:14px;top:12px;width:34px;height:34px;border:0;border-radius:50%;background:#1d212b;color:#fff;font-size:22px;cursor:pointer}.taraf-support-card h3{margin:0 0 8px;font-size:22px;color:#f1c786}.taraf-support-card p{color:#c9c4ba;line-height:1.8;font-size:14px}
  .taraf-support-method{border:1px solid #2a2f3a;border-radius:16px;padding:14px;margin-top:10px;background:#151820}.taraf-support-method strong{display:block;margin-bottom:7px}.taraf-support-value{display:flex;gap:8px;align-items:center;direction:ltr}.taraf-support-value code{flex:1;background:#0d0f14;border-radius:10px;padding:9px 10px;color:#f1c786;font-family:monospace;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .taraf-support-copy,.taraf-support-pay,.taraf-support-action{border:0;background:#e0a458;color:#111;border-radius:10px;padding:9px 11px;font-family:Cairo,Tahoma,sans-serif;font-weight:800;cursor:pointer;text-decoration:none;text-align:center}.taraf-support-pay{display:block;margin-top:9px}.taraf-support-action{width:100%;margin-top:12px}.taraf-support-action.ghost{background:#1b1f28;color:#f1c786;border:1px solid #3a3f4b}
  .taraf-support-divider{height:1px;background:#292d36;margin:18px 0}.taraf-support-note{font-size:12px!important;color:#8f938f!important;margin-bottom:0!important}
  .taraf-support-form{display:none}.taraf-support-form.is-open{display:block}.taraf-support-field{display:block;margin:10px 0}.taraf-support-field span{display:block;font-size:12px;color:#aeb2b9;margin-bottom:5px}.taraf-support-field input,.taraf-support-field select{width:100%;box-sizing:border-box;background:#0d1016;color:#fff;border:1px solid #303642;border-radius:10px;padding:10px;font-family:Cairo,Tahoma,sans-serif}.taraf-support-check{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:#bbb;margin-top:10px}
  .taraf-support-status{display:none;margin-top:10px;padding:10px;border-radius:10px;font-size:13px}.taraf-support-status.ok{display:block;background:#11251a;color:#9ce2b1;border:1px solid #245735}.taraf-support-status.err{display:block;background:#2a1515;color:#f0a8a8;border:1px solid #6b2c2c}
  .taraf-wall{display:none}.taraf-wall.is-open{display:block}.taraf-wall-list{display:grid;gap:8px;margin-top:12px}.taraf-wall-item{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid #2b3039;background:#151820;border-radius:12px;padding:10px 12px}.taraf-wall-name{font-weight:800}.taraf-wall-meta{font-size:11px;color:#8f949c}.taraf-wall-empty{text-align:center;color:#8f949c;padding:18px 8px}
  @media(max-width:560px){.taraf-support-fab{right:12px;left:auto;bottom:12px;font-size:13px}.taraf-support-card{padding:20px 16px}}
  `;
  document.head.appendChild(styles);

  const fab = document.createElement('button');
  fab.className='taraf-support-fab'; fab.type='button'; fab.innerHTML='❤️ <span>ادعم اللعبة</span>';

  const backdrop = document.createElement('div');
  backdrop.className='taraf-support-backdrop'; backdrop.setAttribute('role','dialog'); backdrop.setAttribute('aria-modal','true');

  const methods=[];
  if(cfg.vodafoneCash) methods.push(`<div class="taraf-support-method"><strong>📱 Vodafone Cash</strong><div class="taraf-support-value"><code>${esc(cfg.vodafoneCash)}</code><button class="taraf-support-copy" type="button" data-copy="${esc(cfg.vodafoneCash)}" data-method="vodafone_cash">نسخ</button></div></div>`);
  if(cfg.instaPay) methods.push(`<div class="taraf-support-method"><strong>⚡ InstaPay</strong><div class="taraf-support-value"><code>${esc(cfg.instaPay)}</code><button class="taraf-support-copy" type="button" data-copy="${esc(cfg.instaPay)}" data-method="instapay">نسخ</button></div>${cfg.instaPayLink?`<a class="taraf-support-pay" href="${esc(cfg.instaPayLink)}" target="_blank" rel="noopener noreferrer" data-instapay-link>فتح InstaPay وإرسال الدعم</a>`:''}</div>`);

  backdrop.innerHTML=`<div class="taraf-support-card">
    <button class="taraf-support-close" type="button">×</button>
    <div class="taraf-main-view">
      <h3>${esc(cfg.title)}</h3>
      <p>لو اللعبة عجبتك وحابب تدعم استمرار طرف الخيط، تقدر تدعم بأي مبلغ يناسبك.</p>
      ${methods.join('')}
      <div class="taraf-support-divider"></div>
      <button class="taraf-support-action" type="button" data-open-register>🏆 سجل دعمك في لوحة الشرف</button>
      <button class="taraf-support-action ghost" type="button" data-open-wall>🎖️ عرض لوحة شرف الداعمين</button>
      <p class="taraf-support-note">الدعم اختياري بالكامل، وليس شراءً داخل اللعبة، ولا يفتح مزايا أو يؤثر على ترتيب اللاعبين.</p>
    </div>

    <div class="taraf-support-form" data-register-view>
      <h3>🏆 سجل دعمك</h3>
      <p>بعد ما تحوّل، ابعت بيانات بسيطة. اسمك مش هيظهر في لوحة الشرف إلا بعد المراجعة.</p>
      <label class="taraf-support-field"><span>الاسم الظاهر في لوحة الشرف</span><input type="text" maxlength="40" data-support-name placeholder="مثال: أحمد م."></label>
      <label class="taraf-support-field"><span>طريقة الدعم</span><select data-support-method><option value="instapay">InstaPay</option><option value="vodafone_cash">Vodafone Cash</option></select></label>
      <label class="taraf-support-field"><span>قيمة الدعم — اختياري</span><input type="number" min="1" step="1" data-support-amount placeholder="مثال: 50"></label>
      <label class="taraf-support-field"><span>رقم مرجعي / ملاحظة للتحقق — اختياري</span><input type="text" maxlength="120" data-support-ref placeholder="آخر أرقام العملية أو ملاحظة"></label>
      <label class="taraf-support-check"><input type="checkbox" checked data-support-consent><span>أوافق على ظهور اسمي فقط في لوحة شرف الداعمين بعد المراجعة. لن يظهر مبلغ الدعم.</span></label>
      <button class="taraf-support-action" type="button" data-submit-support>إرسال للمراجعة</button>
      <button class="taraf-support-action ghost" type="button" data-back-main>رجوع</button>
      <div class="taraf-support-status" data-support-status></div>
    </div>

    <div class="taraf-wall" data-wall-view>
      <h3>🎖️ لوحة شرف داعمي طرف الخيط</h3>
      <p>شكرًا لكل شخص ساعد المشروع يكمل ❤️</p>
      <div class="taraf-wall-list" data-wall-list><div class="taraf-wall-empty">جاري تحميل الداعمين...</div></div>
      <button class="taraf-support-action ghost" type="button" data-back-wall>رجوع</button>
    </div>
  </div>`;

  document.body.append(fab,backdrop);
  const main=backdrop.querySelector('.taraf-main-view'), form=backdrop.querySelector('[data-register-view]'), wall=backdrop.querySelector('[data-wall-view]');
  const show=(which)=>{ main.style.display=which==='main'?'block':'none'; form.classList.toggle('is-open',which==='form'); wall.classList.toggle('is-open',which==='wall'); };
  const open=()=>{backdrop.classList.add('is-open');document.body.style.overflow='hidden';show('main');track('donation_modal_open');};
  const close=()=>{backdrop.classList.remove('is-open');document.body.style.overflow='';};
  fab.addEventListener('click',open); backdrop.querySelector('.taraf-support-close').addEventListener('click',close); backdrop.addEventListener('click',e=>{if(e.target===backdrop)close();});

  backdrop.querySelectorAll('.taraf-support-copy').forEach(btn=>btn.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(btn.dataset.copy||'');btn.textContent='تم ✓';setTimeout(()=>btn.textContent='نسخ',1200);track('donation_payment_copy',{payment_method:btn.dataset.method});}catch(_){}
  }));
  const insta=backdrop.querySelector('[data-instapay-link]'); if(insta) insta.addEventListener('click',()=>track('donation_instapay_open'));

  backdrop.querySelector('[data-open-register]').addEventListener('click',()=>{show('form');track('supporter_register_open');});
  backdrop.querySelector('[data-back-main]').addEventListener('click',()=>show('main'));
  backdrop.querySelector('[data-back-wall]').addEventListener('click',()=>show('main'));

  async function loadWall(){
    const list=backdrop.querySelector('[data-wall-list]'); list.innerHTML='<div class="taraf-wall-empty">جاري تحميل الداعمين...</div>';
    if(typeof fetchSupportersWall!=='function'){list.innerHTML='<div class="taraf-wall-empty">لوحة الشرف لسه محتاجة تفعيل قاعدة البيانات.</div>';return;}
    const rows=await fetchSupportersWall(100);
    if(!rows.length){list.innerHTML='<div class="taraf-wall-empty">أول اسم ممكن يكون اسمك ❤️</div>';return;}
    list.innerHTML=rows.map(r=>`<div class="taraf-wall-item"><div><div class="taraf-wall-name">${esc(r.supporter_name)}</div><div class="taraf-wall-meta">${r.payment_method==='instapay'?'InstaPay':'Vodafone Cash'}</div></div><span>🏅</span></div>`).join('');
  }
  backdrop.querySelector('[data-open-wall]').addEventListener('click',async()=>{show('wall');track('supporters_wall_open');await loadWall();});

  backdrop.querySelector('[data-submit-support]').addEventListener('click',async(e)=>{
    const btn=e.currentTarget, status=backdrop.querySelector('[data-support-status]');
    const name=backdrop.querySelector('[data-support-name]').value.trim();
    const paymentMethod=backdrop.querySelector('[data-support-method]').value;
    const amount=backdrop.querySelector('[data-support-amount]').value;
    const referenceNote=backdrop.querySelector('[data-support-ref]').value.trim();
    const consentPublic=backdrop.querySelector('[data-support-consent]').checked;
    status.className='taraf-support-status';
    if(name.length<2){status.textContent='اكتب اسم من حرفين على الأقل.';status.classList.add('err');return;}
    if(typeof submitSupporter!=='function'){status.textContent='تسجيل لوحة الشرف لسه محتاج تفعيل قاعدة البيانات.';status.classList.add('err');return;}
    btn.disabled=true;btn.textContent='جاري الإرسال...';
    const ok=await submitSupporter({supporterName:name,paymentMethod,referenceNote,amount,consentPublic});
    btn.disabled=false;btn.textContent='إرسال للمراجعة';
    if(ok){status.textContent='تم تسجيل دعمك ❤️ بعد المراجعة اسمك هيظهر في لوحة الشرف.';status.classList.add('ok');track('supporter_register_submit',{payment_method:paymentMethod});}
    else{status.textContent='حصلت مشكلة في التسجيل. تأكد إن إعداد لوحة الشرف اتفعل في Supabase.';status.classList.add('err');}
  });
})();

/* ============================================================
   بانر القضايا الحصرية لأعضاء قناة تليجرام
   يظهر في المكتبة فقط، مباشرة بعد Hero طرف الخيط.
   ============================================================ */
(function(){
  'use strict';
  if(window.__TARAF_EXCLUSIVE_CASES_BANNER__) return;
  window.__TARAF_EXCLUSIVE_CASES_BANNER__ = true;

  const BANNER_ID = 'taraf-exclusive-cases-banner';
  const IMAGE_SRC = 'images/site/exclusive-cases-banner.webp';
  const TELEGRAM_URL = 'https://t.me/taraf5eet';

  const style = document.createElement('style');
  style.textContent = `
    .taraf-exclusive-banner{width:min(1120px,calc(100% - 32px));margin:0 auto 24px;border:1px solid rgba(213,43,43,.30);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,#11141a,#0b0d12);box-shadow:0 18px 54px rgba(0,0,0,.32);position:relative}
    .taraf-exclusive-banner-media{display:block;width:100%;height:auto;aspect-ratio:1672/941;object-fit:contain;background:#080a0e}
    .taraf-exclusive-banner-actions{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 16px 15px;border-top:1px solid rgba(255,255,255,.07)}
    .taraf-exclusive-banner-copy{min-width:0;color:#c9cdd5;font-family:Cairo,Tahoma,sans-serif;font-size:13px;line-height:1.65}
    .taraf-exclusive-banner-copy strong{display:block;color:#f3efe6;font-size:15px;margin-bottom:1px}
    .taraf-exclusive-banner-btn{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;border-radius:12px;padding:11px 17px;background:linear-gradient(135deg,#df3434,#a90f18);color:#fff!important;border:1px solid rgba(255,255,255,.13);font-family:Cairo,Tahoma,sans-serif;font-size:13px;font-weight:900;box-shadow:0 8px 24px rgba(183,18,28,.24);transition:transform .18s ease,filter .18s ease}
    .taraf-exclusive-banner-btn:hover{transform:translateY(-1px);filter:brightness(1.08)}
    @media(max-width:700px){
      .taraf-exclusive-banner{width:calc(100% - 20px);margin-bottom:18px;border-radius:15px}
      .taraf-exclusive-banner-actions{display:block;padding:11px}
      .taraf-exclusive-banner-copy{text-align:center;font-size:12px;margin-bottom:10px}
      .taraf-exclusive-banner-copy strong{font-size:14px}
      .taraf-exclusive-banner-btn{width:100%;box-sizing:border-box;padding:11px 12px}
    }
  `;
  document.head.appendChild(style);

  let impressionSent = false;
  function buildBanner(){
    const wrap = document.createElement('section');
    wrap.id = BANNER_ID;
    wrap.className = 'taraf-exclusive-banner';
    wrap.setAttribute('aria-label','قضايا حصرية لأعضاء قناة طرف الخيط');
    wrap.innerHTML = `
      <img class="taraf-exclusive-banner-media" src="${IMAGE_SRC}" alt="قريبًا — قضايا حصرية لمشتركي قناة طرف الخيط فقط" loading="eager">
      <div class="taraf-exclusive-banner-actions">
        <div class="taraf-exclusive-banner-copy">
          <strong>القضايا الحصرية جاية قريب 🔐</strong>
          انضم للقناة من دلوقتي عشان توصلك أكواد فتح القضايا وقت نزولها.
        </div>
        <a class="taraf-exclusive-banner-btn" href="${TELEGRAM_URL}" target="_blank" rel="noopener" data-telegram-cta="exclusive_cases_banner">📣 انضم للقناة وخد كود القضايا</a>
      </div>`;
    return wrap;
  }

  function syncBanner(){
    const hero = document.querySelector('#app .lib-hero');
    const existing = document.getElementById(BANNER_ID);
    if(!hero){ if(existing) existing.remove(); return; }
    if(existing) return;
    const banner = buildBanner();
    hero.insertAdjacentElement('afterend', banner);
    if(!impressionSent){
      impressionSent = true;
      try{ if(typeof window.gtag === 'function') window.gtag('event','telegram_cta_impression',{cta_location:'exclusive_cases_banner'}); }catch(_){}
    }
  }

  syncBanner();
  const appNode = document.getElementById('app');
  if(appNode){
    const observer = new MutationObserver(()=>syncBanner());
    observer.observe(appNode,{childList:true,subtree:false});
  }
})();
