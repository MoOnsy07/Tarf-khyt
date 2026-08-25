/* طرف الخيط — Google-only public auth UI. Facebook محفوظ في البنية لكنه مخفي عن المستخدمين. */
(function(){
  'use strict';

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

  function cleanPublicAuthUI(){
    const emailRow=document.querySelector('.pf-cloud-email-row');
    if(emailRow) emailRow.remove();
    const facebookBtn=document.getElementById('pf-cloud-facebook');
    if(facebookBtn) facebookBtn.remove();

    const status=document.getElementById('pf-cloud-status');
    const googleBtn=document.getElementById('pf-cloud-google');
    const hasStateMessage=status && (
      status.classList.contains('pf-cloud-ok') ||
      status.classList.contains('pf-cloud-error') ||
      status.classList.contains('ok') ||
      status.classList.contains('err')
    );
    if(googleBtn && status && !hasStateMessage){
      const msg='اربط تقدمك بحساب Google عشان تحفظه بين الأجهزة.';
      if(status.textContent!==msg) status.textContent=msg;
      if(status.className!=='pf-cloud-status') status.className='pf-cloud-status';
    }

    if(window.TarafCloud){
      if(!window.TarafCloud.__emailDisabled){
        window.TarafCloud.sendMagicLink=async function(){
          throw new Error('تسجيل الدخول بالإيميل متوقف مؤقتًا. استخدم Google.');
        };
        window.TarafCloud.__emailDisabled=true;
      }
      window.TarafCloud.facebookPublicEnabled=false;
    }
  }

  function installStyles(){
    if(document.getElementById('taraf-google-only-style')) return;
    const style=document.createElement('style');
    style.id='taraf-google-only-style';
    style.textContent=`
      #pf-cloud-facebook,#pf-link-facebook{display:none!important}
      .pf-linked-identities{margin-top:13px;padding:12px;border:1px solid var(--line,#34302a);border-radius:5px;background:rgba(255,255,255,.018)}
      .pf-linked-identities-title{font-size:11px;font-weight:800;color:var(--ink-dim,#aaa);margin-bottom:8px;letter-spacing:.02em}
      .pf-linked-identity{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0}
      .pf-linked-provider{font-size:13px;font-weight:800;color:var(--ink,#eee);display:flex;align-items:center;gap:7px}
      .pf-linked-ok{font-size:11px;color:#8fd6a4;font-weight:800;white-space:nowrap}
      .pf-link-btn{padding:6px 10px!important;font-size:11px!important;white-space:nowrap}
      .pf-linked-hint{font-size:10.5px;color:var(--ink-dim,#aaa);margin-top:7px;line-height:1.6}
    `;
    document.head.appendChild(style);
  }

  function authRedirectURL(){ return window.location.origin+'/profile.html?cloud=linked'; }

  async function linkGoogle(){
    try{
      if(typeof sb!=='undefined' && sb && sb.auth && typeof sb.auth.linkIdentity==='function'){
        const {data,error}=await sb.auth.linkIdentity({provider:'google',options:{redirectTo:authRedirectURL()}});
        if(error) throw error;
        return data;
      }
    }catch(err){ if(err && !/not defined/i.test(String(err.message||err))) throw err; }

    if(!window.TarafCloud || typeof window.TarafCloud.getSession!=='function') throw new Error('جلسة الحساب لسه ما اتحمّلتش.');
    const session=await window.TarafCloud.getSession();
    if(!session || !session.access_token || !session.refresh_token) throw new Error('لازم تكون مسجل دخول الأول.');
    if(!window.supabase || typeof window.supabase.createClient!=='function') throw new Error('خدمة تسجيل الدخول لسه ما اتحمّلتش.');

    const temp=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
    const {error:setError}=await temp.auth.setSession({access_token:session.access_token,refresh_token:session.refresh_token});
    if(setError) throw setError;
    const {data,error}=await temp.auth.linkIdentity({provider:'google',options:{redirectTo:authRedirectURL()}});
    if(error) throw error;
    return data;
  }

  function hasGoogle(account){
    const ids=account && account.user && Array.isArray(account.user.identities) ? account.user.identities : [];
    return ids.some(x=>x && x.provider==='google') || (account && account.provider==='google');
  }

  async function renderGoogleIdentity(){
    if(renderGoogleIdentity._busy) return;
    const card=document.getElementById('pf-cloud-card');
    if(!card || !document.getElementById('pf-cloud-signout')) return;
    if(!window.TarafCloud || typeof window.TarafCloud.getAccount!=='function') return;
    renderGoogleIdentity._busy=true;
    try{
      const account=await window.TarafCloud.getAccount();
      if(!account || !document.getElementById('pf-cloud-card')) return;
      const linked=hasGoogle(account);
      let box=document.getElementById('pf-linked-identities');
      const signature=linked?'g1':'g0';
      if(box && box.dataset.signature===signature) return;
      if(box) box.remove();
      box=document.createElement('div');
      box.id='pf-linked-identities';
      box.className='pf-linked-identities';
      box.dataset.signature=signature;
      box.innerHTML=`
        <div class="pf-linked-identities-title">طريقة الدخول المرتبطة بملف المحقق</div>
        <div class="pf-linked-identity">
          <div class="pf-linked-provider">G&nbsp; Google</div>
          ${linked?'<span class="pf-linked-ok">✓ مربوط</span>':'<button type="button" class="btn ghost mono pf-link-btn" id="pf-link-google">ربط Google</button>'}
        </div>
        <div class="pf-linked-hint">Google هو طريقة تسجيل الدخول المتاحة حاليًا.</div>`;
      const status=document.getElementById('pf-cloud-status');
      if(status) status.insertAdjacentElement('beforebegin',box); else card.appendChild(box);
      const btn=document.getElementById('pf-link-google');
      if(btn) btn.onclick=async()=>{
        btn.disabled=true;
        if(status){status.className='pf-cloud-status';status.textContent='بنربط Google بنفس ملف المحقق...';}
        try{await linkGoogle();}
        catch(err){btn.disabled=false;if(status){status.className='pf-cloud-status pf-cloud-error';status.textContent=String(err&&err.message||'تعذر ربط Google.');}}
      };
    }finally{ renderGoogleIdentity._busy=false; }
  }

  function refresh(){ cleanPublicAuthUI(); installStyles(); renderGoogleIdentity(); }

  function boot(){
    refresh();
    const observer=new MutationObserver(refresh);
    observer.observe(document.documentElement,{childList:true,subtree:true});
    window.addEventListener('taraf:auth-changed',refresh);
    window.addEventListener('taraf:cloud-sync-complete',refresh);
    let tries=0;
    const timer=setInterval(()=>{refresh();if(++tries>=40) clearInterval(timer);},250);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
