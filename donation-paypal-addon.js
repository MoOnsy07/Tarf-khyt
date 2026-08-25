/* ============================================================
   طرف الخيط — إضافة PayPal للدعم من خارج مصر
   ============================================================ */
(function(){
  'use strict';
  const email = (typeof DONATION_PAYPAL_EMAIL !== 'undefined' ? DONATION_PAYPAL_EMAIL : '').trim();
  if(!email) return;

  const esc = (v)=>String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

  function copyText(value, btn){
    const done=()=>{const old=btn.textContent;btn.textContent='تم ✓';setTimeout(()=>btn.textContent=old,1200);try{if(typeof gtag==='function')gtag('event','donation_payment_copy',{event_category:'donation',payment_method:'paypal'});}catch(_){}};
    if(navigator.clipboard && navigator.clipboard.writeText){navigator.clipboard.writeText(value).then(done).catch(()=>{});}
    else{
      const t=document.createElement('textarea');t.value=value;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy');done();}catch(_){}t.remove();
    }
  }

  function mount(){
    const card=document.querySelector('.taraf-support-card .taraf-main-view');
    if(!card || card.querySelector('[data-paypal-support]')) return false;
    const divider=card.querySelector('.taraf-support-divider');
    if(!divider) return false;

    const box=document.createElement('div');
    box.className='taraf-support-method';
    box.setAttribute('data-paypal-support','');
    box.innerHTML=`<strong>🌍 PayPal — من خارج مصر</strong><div class="taraf-support-value"><code>${esc(email)}</code><button class="taraf-support-copy" type="button" data-paypal-copy>نسخ الإيميل</button></div><div style="font-size:12px;color:#8f938f;margin-top:8px;line-height:1.7">ابعت الدعم على حساب PayPal المرتبط بالإيميل ده. هنضيف زر دفع مباشر لما يكون عندنا PayPal.Me مؤكد.</div>`;
    card.insertBefore(box,divider);
    const copy=box.querySelector('[data-paypal-copy]');
    copy.addEventListener('click',()=>copyText(email,copy));

    const methodSelect=document.querySelector('[data-support-method]');
    if(methodSelect && !methodSelect.querySelector('option[value="paypal"]')){
      const opt=document.createElement('option');opt.value='paypal';opt.textContent='PayPal';methodSelect.appendChild(opt);
    }
    return true;
  }

  if(!mount()){
    const obs=new MutationObserver(()=>{if(mount())obs.disconnect();});
    obs.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),10000);
  }
})();
