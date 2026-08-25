/* طرف الخيط — Google + Facebook Auth + manual identity linking، مع إخفاء Magic Link */
(function(){
  'use strict';

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  let linkClient = null;

  function disableEmailLogin(){
    const emailRow = document.querySelector('.pf-cloud-email-row');
    if(emailRow) emailRow.remove();

    const googleBtn = document.getElementById('pf-cloud-google');
    const facebookBtn = document.getElementById('pf-cloud-facebook');
    const status = document.getElementById('pf-cloud-status');
    const hasStateMessage = status && (
      status.classList.contains('pf-cloud-ok') ||
      status.classList.contains('pf-cloud-error') ||
      status.classList.contains('ok') ||
      status.classList.contains('err')
    );
    if((googleBtn || facebookBtn) && status && !hasStateMessage){
      const msg = 'اربط تقدمك بحساب Google أو Facebook — بدون رسائل بريد.';
      if(status.textContent !== msg) status.textContent = msg;
      if(status.className !== 'pf-cloud-status') status.className = 'pf-cloud-status';
    }

    if(window.TarafCloud && !window.TarafCloud.__emailDisabled){
      window.TarafCloud.sendMagicLink = async function(){
        throw new Error('تسجيل الدخول بالإيميل متوقف مؤقتًا. استخدم Google أو Facebook.');
      };
      window.TarafCloud.__emailDisabled = true;
    }
  }

  function installIdentityStyles(){
    if(document.getElementById('taraf-identity-link-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-identity-link-style';
    style.textContent = `
      .pf-linked-identities{margin-top:13px;padding:12px;border:1px solid var(--line,#34302a);border-radius:5px;background:rgba(255,255,255,.018)}
      .pf-linked-identities-title{font-size:11px;font-weight:800;color:var(--ink-dim,#aaa);margin-bottom:8px;letter-spacing:.02em}
      .pf-linked-identity{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid rgba(255,255,255,.045)}
      .pf-linked-identity:first-of-type{border-top:0}
      .pf-linked-provider{font-size:13px;font-weight:800;color:var(--ink,#eee);display:flex;align-items:center;gap:7px}
      .pf-linked-ok{font-size:11px;color:#8fd6a4;font-weight:800;white-space:nowrap}
      .pf-link-btn{padding:6px 10px!important;font-size:11px!important;white-space:nowrap}
      .pf-linked-hint{font-size:10.5px;color:var(--ink-dim,#aaa);margin-top:7px;line-height:1.6}
      @media(max-width:480px){.pf-linked-identity{align-items:flex-start}.pf-link-btn{flex:none!important}}
    `;
    document.head.appendChild(style);
  }

  function authRedirectURL(){
    return window.location.origin + '/profile.html?cloud=linked';
  }

  async function getLinkClient(){
    try{
      if(typeof sb !== 'undefined' && sb && sb.auth && typeof sb.auth.linkIdentity === 'function') return sb;
    }catch(e){}

    if(!window.supabase || typeof window.supabase.createClient !== 'function'){
      throw new Error('مكتبة تسجيل الدخول لسه ما اتحمّلتش. جرّب تاني بعد لحظة.');
    }
    if(!linkClient){
      linkClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
      });
    }
    return linkClient;
  }

  async function linkIdentity(provider){
    const client = await getLinkClient();
    const options = { redirectTo: authRedirectURL() };
    if(provider === 'facebook') options.scopes = 'email public_profile user_friends';

    const {data, error} = await client.auth.linkIdentity({ provider, options });
    if(error) throw error;
    return data;
  }

  function providerSet(account){
    const set = new Set();
    const identities = account && account.user && Array.isArray(account.user.identities)
      ? account.user.identities
      : [];
    identities.forEach(identity=>{
      if(identity && identity.provider) set.add(String(identity.provider).toLowerCase());
    });
    if(account && account.provider) set.add(String(account.provider).toLowerCase());
    return set;
  }

  function friendlyLinkError(err){
    const msg = String(err && (err.message || err.error_description) || '');
    if(/already.*linked|identity.*exists|already.*registered|conflict/i.test(msg)){
      return 'الحساب ده مربوط بالفعل بملف محقق تاني. ادخل بالحساب ده الأول لو عايز تستخدمه.';
    }
    if(/manual.*link|linking.*disabled/i.test(msg)){
      return 'ربط الحسابات لسه مش متفعّل في إعدادات Supabase.';
    }
    return msg || 'تعذر ربط الحساب. جرّب تاني.';
  }

  async function enhanceIdentityLinking(){
    if(enhanceIdentityLinking._busy) return;
    const card = document.getElementById('pf-cloud-card');
    if(!card || !document.getElementById('pf-cloud-signout')) return;
    if(!window.TarafCloud || typeof window.TarafCloud.getAccount !== 'function') return;

    enhanceIdentityLinking._busy = true;
    try{
      const account = await window.TarafCloud.getAccount();
      if(!account || !document.getElementById('pf-cloud-card')) return;

      const providers = providerSet(account);
      const signature = ['google','facebook'].map(p=>providers.has(p) ? '1' : '0').join('');
      let box = document.getElementById('pf-linked-identities');
      if(box && box.dataset.signature === signature) return;
      if(box) box.remove();

      box = document.createElement('div');
      box.id = 'pf-linked-identities';
      box.className = 'pf-linked-identities';
      box.dataset.signature = signature;
      box.innerHTML = `
        <div class="pf-linked-identities-title">طرق الدخول المرتبطة بنفس ملف المحقق</div>
        <div class="pf-linked-identity">
          <div class="pf-linked-provider">G&nbsp; Google</div>
          ${providers.has('google')
            ? '<span class="pf-linked-ok">✓ مربوط</span>'
            : '<button type="button" class="btn ghost mono pf-link-btn" id="pf-link-google">ربط الآن</button>'}
        </div>
        <div class="pf-linked-identity">
          <div class="pf-linked-provider">f&nbsp; Facebook</div>
          ${providers.has('facebook')
            ? '<span class="pf-linked-ok">✓ مربوط</span>'
            : '<button type="button" class="btn ghost mono pf-link-btn" id="pf-link-facebook">ربط الآن</button>'}
        </div>
        <div class="pf-linked-hint">بعد ربط الاتنين، تقدر تدخل بـGoogle أو Facebook وترجع لنفس التقدم ونفس ملف المحقق.</div>`;

      const status = document.getElementById('pf-cloud-status');
      if(status) status.insertAdjacentElement('beforebegin', box);
      else card.appendChild(box);

      const googleLink = document.getElementById('pf-link-google');
      if(googleLink){
        googleLink.addEventListener('click', async()=>{
          googleLink.disabled = true;
          if(status){ status.className='pf-cloud-status'; status.textContent='بنربط Google بنفس ملف المحقق...'; }
          try{ await linkIdentity('google'); }
          catch(err){
            googleLink.disabled = false;
            if(status){ status.className='pf-cloud-status pf-cloud-error'; status.textContent=friendlyLinkError(err); }
          }
        });
      }

      const facebookLink = document.getElementById('pf-link-facebook');
      if(facebookLink){
        facebookLink.addEventListener('click', async()=>{
          facebookLink.disabled = true;
          if(status){ status.className='pf-cloud-status'; status.textContent='بنربط Facebook بنفس ملف المحقق...'; }
          try{ await linkIdentity('facebook'); }
          catch(err){
            facebookLink.disabled = false;
            if(status){ status.className='pf-cloud-status pf-cloud-error'; status.textContent=friendlyLinkError(err); }
          }
        });
      }
    }catch(e){}
    finally{ enhanceIdentityLinking._busy = false; }
  }

  function refreshEnhancements(){
    disableEmailLogin();
    installIdentityStyles();
    enhanceIdentityLinking();
  }

  function boot(){
    refreshEnhancements();
    const observer = new MutationObserver(refreshEnhancements);
    observer.observe(document.documentElement, {childList:true, subtree:true});
    window.addEventListener('taraf:auth-changed', refreshEnhancements);
    window.addEventListener('taraf:cloud-sync-complete', refreshEnhancements);
    let tries = 0;
    const timer = setInterval(function(){
      refreshEnhancements();
      if(++tries >= 80) clearInterval(timer);
    }, 250);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
