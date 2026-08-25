/* ============================================================
   طرف الخيط — Facebook Launch Mode
   إطلاق Facebook Login بالصلاحيات الأساسية فقط.
   user_friends محفوظة للمرحلة التالية بعد اعتماد Meta.
   ============================================================ */
(function(){
  'use strict';

  if(window.__tarafFacebookLaunchMode) return;
  window.__tarafFacebookLaunchMode = true;
  window.TARAF_FACEBOOK_FRIENDS_ENABLED = false;

  const FACEBOOK_SCOPES = 'email public_profile';

  function redirectURL(){
    return window.location.origin + '/profile.html?cloud=linked';
  }

  function sharedClient(){
    try{
      if(typeof sb !== 'undefined' && sb && sb.auth) return sb;
    }catch(e){}
    return null;
  }

  async function signInFacebookBasic(){
    const client = sharedClient();
    if(!client) throw new Error('خدمة تسجيل الدخول لسه ما اتحمّلتش. جرّب تاني بعد لحظة.');
    const {data,error} = await client.auth.signInWithOAuth({
      provider:'facebook',
      options:{
        redirectTo:redirectURL(),
        scopes:FACEBOOK_SCOPES,
      }
    });
    if(error) throw error;
    return data;
  }

  async function linkFacebookBasic(){
    const client = sharedClient();
    if(!client || typeof client.auth.linkIdentity !== 'function'){
      throw new Error('خدمة ربط Facebook لسه ما اتحمّلتش. جرّب تاني بعد لحظة.');
    }
    const {data,error} = await client.auth.linkIdentity({
      provider:'facebook',
      options:{
        redirectTo:redirectURL(),
        scopes:FACEBOOK_SCOPES,
      }
    });
    if(error) throw error;
    return data;
  }

  function installOverride(){
    if(!window.TarafCloud || !window.TarafCloud.__loaded) return false;
    window.TarafCloud.signInWithFacebook = signInFacebookBasic;
    window.TarafCloud.facebookFriendsEnabled = false;
    window.TarafCloud.facebookScopes = FACEBOOK_SCOPES;
    return true;
  }

  // نلتقط زر الربط قبل listener القديم، عشان ربط Facebook يطلب الصلاحيات الأساسية فقط.
  document.addEventListener('click', async function(e){
    const target = e.target && e.target.closest ? e.target.closest('#pf-link-facebook') : null;
    if(!target) return;
    e.preventDefault();
    e.stopImmediatePropagation();

    const status = document.getElementById('pf-cloud-status');
    target.disabled = true;
    if(status){
      status.className = 'pf-cloud-status';
      status.textContent = 'بنربط Facebook بنفس ملف المحقق...';
    }
    try{
      await linkFacebookBasic();
    }catch(err){
      target.disabled = false;
      if(status){
        status.className = 'pf-cloud-status pf-cloud-error';
        const msg = String(err && (err.message || err.error_description) || '');
        status.textContent = /already.*linked|identity.*exists|already.*registered|conflict/i.test(msg)
          ? 'الحساب ده مربوط بالفعل بملف محقق تاني.'
          : (msg || 'تعذر ربط Facebook. جرّب تاني.');
      }
    }
  }, true);

  function boot(){
    if(installOverride()) return;
    let tries = 0;
    const timer = setInterval(function(){
      if(installOverride() || ++tries >= 80) clearInterval(timer);
    },100);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
