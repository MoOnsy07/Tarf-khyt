/* طرف الخيط — Facebook public UI disabled until Meta verification is available. */
(function(){
  'use strict';
  if(window.__tarafFacebookPublicDisabled) return;
  window.__tarafFacebookPublicDisabled=true;
  window.TARAF_FACEBOOK_FRIENDS_ENABLED=false;
  window.TARAF_FACEBOOK_PUBLIC_ENABLED=false;

  function disableFacebook(){
    const signIn=document.getElementById('pf-cloud-facebook');
    if(signIn) signIn.remove();
    const link=document.getElementById('pf-link-facebook');
    if(link) link.remove();

    document.querySelectorAll('.pf-linked-identity').forEach(row=>{
      const provider=row.querySelector('.pf-linked-provider');
      if(provider && /facebook/i.test(provider.textContent||'')) row.remove();
    });

    if(window.TarafCloud){
      window.TarafCloud.facebookPublicEnabled=false;
      window.TarafCloud.facebookFriendsEnabled=false;
      window.TarafCloud.signInWithFacebook=async function(){
        throw new Error('تسجيل الدخول بـFacebook غير متاح حاليًا. استخدم Google.');
      };
    }
  }

  function boot(){
    disableFacebook();
    const observer=new MutationObserver(disableFacebook);
    observer.observe(document.documentElement,{childList:true,subtree:true});
    let tries=0;
    const timer=setInterval(()=>{disableFacebook();if(++tries>=40) clearInterval(timer);},250);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
