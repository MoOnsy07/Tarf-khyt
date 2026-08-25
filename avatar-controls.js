/* ============================================================
   طرف الخيط — Avatar Controls (loop-safe)
   - رفع صورة مختلفة من الجهاز/الموبايل.
   - ضغط وقص الصورة محليًا إلى 512x512 JPEG.
   - إظهار/إخفاء الصورة من الليدر بورد.
   - الرجوع لصورة Google/Facebook.
   - بدون MutationObserver لمنع تجمّد صفحة البروفايل.
   ============================================================ */
(function(){
  'use strict';

  if(window.TarafAvatarManager && window.TarafAvatarManager.__loaded) return;
  if(!/\/profile\.html$/i.test(location.pathname)) return;

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  const BUCKET = 'avatars';
  const MAX_SOURCE_BYTES = 12 * 1024 * 1024;
  const OUTPUT_SIZE = 512;

  let currentSession = null;
  let currentProfile = null;
  let refreshPromise = null;
  let lastUiSignature = '';

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function sharedClient(){
    try{
      if(typeof sb !== 'undefined' && sb && sb.auth && sb.storage) return sb;
    }catch(e){}
    return null;
  }

  function installStyles(){
    if(document.getElementById('taraf-avatar-controls-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-avatar-controls-style';
    style.textContent = `
      .pf-avatar-manager{margin-top:13px;padding:13px;border:1px solid var(--line,#34302a);border-radius:5px;background:rgba(255,255,255,.018)}
      .pf-avatar-manager-title{font-size:11px;font-weight:900;color:var(--ink-dim,#aaa);margin-bottom:9px}
      .pf-avatar-manager-row{display:flex;align-items:center;gap:11px;flex-wrap:wrap}
      .pf-avatar-preview{width:54px;height:54px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex:none;background:var(--void,#0b0b0b);border:1px solid var(--line,#34302a);color:var(--amber,#e0a458);font-weight:900}
      .pf-avatar-preview img{width:100%;height:100%;object-fit:cover;display:block}
      .pf-avatar-manager-actions{display:flex;gap:7px;flex:1;flex-wrap:wrap}
      .pf-avatar-manager-actions .btn{padding:7px 10px!important;font-size:11px!important}
      .pf-avatar-privacy-hidden{color:#e0a458;font-size:10.5px;font-weight:800;margin-top:8px}
      .pf-avatar-manager-hint{color:var(--ink-dim,#aaa);font-size:10.5px;line-height:1.65;margin-top:8px}
      .pf-avatar-manager-status{font-size:11px;min-height:17px;margin-top:7px;color:var(--ink-dim,#aaa)}
      .pf-avatar-manager-status.ok{color:#8fd6a4}.pf-avatar-manager-status.err{color:#e08a7c}
      .pf-avatar-file{display:none!important}
      .pf-avatar.has-social-avatar{overflow:hidden;background:var(--void,#0b0b0b);padding:0}
      .pf-avatar.has-social-avatar img{width:100%;height:100%;display:block;object-fit:cover}
      @media(max-width:520px){.pf-avatar-manager-row{align-items:flex-start}.pf-avatar-manager-actions{width:calc(100% - 66px)}.pf-avatar-manager-actions .btn{flex:1;min-width:135px}}
    `;
    document.head.appendChild(style);
  }

  async function getSession(){
    if(window.TarafCloud && typeof window.TarafCloud.getSession === 'function'){
      try{ return await window.TarafCloud.getSession(); }catch(e){}
    }
    const c = sharedClient();
    if(c){
      try{
        const {data} = await c.auth.getSession();
        return data && data.session || null;
      }catch(e){}
    }
    return null;
  }

  function authHeaders(session, json){
    const h={apikey:SUPABASE_KEY,Authorization:'Bearer '+session.access_token};
    if(json) h['Content-Type']='application/json';
    return h;
  }

  async function fetchProfile(session){
    const url = SUPABASE_URL + '/rest/v1/game_profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=avatar_url,custom_avatar_url,custom_avatar_path,avatar_public,player_name';
    const res = await fetch(url,{headers:authHeaders(session,false),cache:'no-store'});
    if(!res.ok) throw new Error('تعذر تحميل إعدادات الصورة.');
    const rows=await res.json();
    return Array.isArray(rows) && rows[0] ? rows[0] : null;
  }

  async function patchProfile(changes){
    const session=currentSession || await getSession();
    if(!session || !session.user) throw new Error('لازم تسجل دخول الأول.');
    const url = SUPABASE_URL + '/rest/v1/game_profiles?user_id=eq.' + encodeURIComponent(session.user.id);
    const res=await fetch(url,{
      method:'PATCH',
      headers:{...authHeaders(session,true),Prefer:'return=minimal'},
      body:JSON.stringify({...changes,updated_at:new Date().toISOString()})
    });
    if(!res.ok){
      let msg='تعذر حفظ إعدادات الصورة.';
      try{const x=await res.json();msg=x.message||msg;}catch(e){}
      throw new Error(msg);
    }
  }

  function identityAvatar(user,provider){
    const ids=user && Array.isArray(user.identities) ? user.identities : [];
    const item=ids.find(x=>x && x.provider===provider);
    const d=item && item.identity_data || {};
    return String(d.avatar_url || d.picture || '');
  }

  function oauthAvatar(){
    const user=currentSession && currentSession.user;
    if(!user) return '';
    const meta=user.user_metadata || {};
    return identityAvatar(user,'facebook') || identityAvatar(user,'google') || String(meta.avatar_url || meta.picture || '');
  }

  function effectiveAvatar(){
    return String(
      currentProfile && currentProfile.custom_avatar_url ||
      currentProfile && currentProfile.avatar_url ||
      oauthAvatar() || ''
    );
  }

  function playerInitial(){
    try{
      const name=localStorage.getItem('ca_player_name') || localStorage.getItem('tarafkhyt_player_name') || '';
      return String(name).trim().charAt(0).toUpperCase() || '؟';
    }catch(e){ return '؟'; }
  }

  function paintOwnAvatar(){
    const el=document.querySelector('#pf-root .pf-avatar');
    if(!el) return;
    const url=effectiveAvatar();
    const existing=el.querySelector('img');

    if(!url){
      if(existing || el.classList.contains('has-social-avatar')){
        el.classList.remove('has-social-avatar');
        delete el.dataset.socialAvatarUrl;
        el.textContent=playerInitial();
      }
      return;
    }

    if(el.dataset.socialAvatarUrl===url && existing && existing.getAttribute('src')===url) return;
    el.classList.add('has-social-avatar');
    el.dataset.socialAvatarUrl=url;
    if(existing){
      existing.setAttribute('src',url);
      return;
    }
    const img=document.createElement('img');
    img.src=url;
    img.alt='صورة المحقق';
    img.referrerPolicy='no-referrer';
    el.replaceChildren(img);
  }

  function setStatus(text,type){
    const el=document.getElementById('pf-avatar-manager-status');
    if(!el) return;
    el.className='pf-avatar-manager-status'+(type?' '+type:'');
    el.textContent=text || '';
  }

  function uiSignature(){
    return [
      currentSession && currentSession.user && currentSession.user.id || '',
      effectiveAvatar(),
      currentProfile && currentProfile.custom_avatar_url || '',
      currentProfile && currentProfile.avatar_public === false ? '0':'1'
    ].join('|');
  }

  function renderControls(force){
    if(!currentSession || !currentSession.user) return false;
    const card=document.getElementById('pf-cloud-card');
    if(!card || !document.getElementById('pf-cloud-signout')) return false;

    const sig=uiSignature();
    let box=document.getElementById('pf-avatar-manager');
    if(box && !force && box.dataset.signature===sig) return true;

    if(!box){
      box=document.createElement('div');
      box.id='pf-avatar-manager';
      box.className='pf-avatar-manager';
      const identities=document.getElementById('pf-linked-identities');
      const status=document.getElementById('pf-cloud-status');
      if(identities) identities.insertAdjacentElement('afterend',box);
      else if(status) status.insertAdjacentElement('beforebegin',box);
      else card.appendChild(box);
    }

    const isPublic=currentProfile ? currentProfile.avatar_public!==false : true;
    const hasCustom=!!(currentProfile && currentProfile.custom_avatar_url);
    const avatar=effectiveAvatar();
    box.dataset.signature=sig;
    box.innerHTML=`
      <div class="pf-avatar-manager-title">الصورة الشخصية</div>
      <div class="pf-avatar-manager-row">
        <div class="pf-avatar-preview">${avatar?`<img src="${esc(avatar)}" alt="صورة المحقق" referrerpolicy="no-referrer">`:esc(playerInitial())}</div>
        <div class="pf-avatar-manager-actions">
          <button type="button" class="btn ghost mono" id="pf-avatar-upload">📷 رفع صورة مختلفة</button>
          <button type="button" class="btn ghost mono" id="pf-avatar-visibility">${isPublic?'🙈 إخفاء من الليدر بورد':'👁 إظهار في الليدر بورد'}</button>
          ${hasCustom?'<button type="button" class="btn ghost mono" id="pf-avatar-reset">↩ استخدام صورة الحساب</button>':''}
          <input class="pf-avatar-file" id="pf-avatar-file" type="file" accept="image/*">
        </div>
      </div>
      ${isPublic?'':'<div class="pf-avatar-privacy-hidden">🔒 صورتك مخفية عن باقي اللاعبين في الليدر بورد.</div>'}
      <div class="pf-avatar-manager-hint">رفع صورة هنا لا يغيّر صورة Google أو Facebook. تقدر تخفي الصورة عن الليدر بورد في أي وقت.</div>
      <div class="pf-avatar-manager-status" id="pf-avatar-manager-status"></div>`;

    const uploadBtn=document.getElementById('pf-avatar-upload');
    const fileInput=document.getElementById('pf-avatar-file');
    const visibilityBtn=document.getElementById('pf-avatar-visibility');
    const resetBtn=document.getElementById('pf-avatar-reset');

    uploadBtn.onclick=()=>fileInput.click();
    fileInput.onchange=async()=>{
      const file=fileInput.files && fileInput.files[0];
      if(!file) return;
      uploadBtn.disabled=true;
      visibilityBtn.disabled=true;
      setStatus('بنجهّز الصورة ونرفعها...');
      try{
        await uploadCustomAvatar(file);
        setStatus('تم تحديث الصورة ✓','ok');
      }catch(err){
        setStatus(String(err && err.message || 'تعذر رفع الصورة.'),'err');
      }finally{
        fileInput.value='';
        uploadBtn.disabled=false;
        visibilityBtn.disabled=false;
      }
    };

    visibilityBtn.onclick=async()=>{
      visibilityBtn.disabled=true;
      const next=!(currentProfile ? currentProfile.avatar_public!==false : true);
      setStatus(next?'بنظهر الصورة في الليدر بورد...':'بنخفي الصورة من الليدر بورد...');
      try{
        await patchProfile({avatar_public:next});
        if(!currentProfile) currentProfile={};
        currentProfile.avatar_public=next;
        lastUiSignature='';
        renderControls(true);
        setStatus(next?'الصورة ظاهرة في الليدر بورد ✓':'الصورة اتخفت من الليدر بورد ✓','ok');
        window.dispatchEvent(new CustomEvent('taraf:avatar-updated',{detail:{avatarUrl:effectiveAvatar(),public:next}}));
      }catch(err){
        visibilityBtn.disabled=false;
        setStatus(String(err && err.message || 'تعذر تغيير الخصوصية.'),'err');
      }
    };

    if(resetBtn){
      resetBtn.onclick=async()=>{
        resetBtn.disabled=true;
        setStatus('بنرجع لصورة الحساب...');
        try{
          await removeCustomAvatar();
          setStatus('رجعنا لصورة الحساب ✓','ok');
        }catch(err){
          resetBtn.disabled=false;
          setStatus(String(err && err.message || 'تعذر حذف الصورة المرفوعة.'),'err');
        }
      };
    }
    lastUiSignature=sig;
    return true;
  }

  async function imageToJpeg(file){
    if(!file.type || !file.type.startsWith('image/')) throw new Error('اختار ملف صورة صالح.');
    if(file.size>MAX_SOURCE_BYTES) throw new Error('الصورة كبيرة جدًا. الحد الأقصى قبل الضغط 12MB.');

    let source=null, revoke='';
    try{
      if('createImageBitmap' in window) source=await createImageBitmap(file);
      else{
        revoke=URL.createObjectURL(file);
        source=await new Promise((resolve,reject)=>{
          const img=new Image();
          img.onload=()=>resolve(img);
          img.onerror=()=>reject(new Error('المتصفح مقدرش يقرأ الصورة.'));
          img.src=revoke;
        });
      }
      const w=source.width || source.naturalWidth;
      const h=source.height || source.naturalHeight;
      if(!w || !h) throw new Error('أبعاد الصورة غير صالحة.');
      const side=Math.min(w,h), sx=(w-side)/2, sy=(h-side)/2;
      const canvas=document.createElement('canvas');
      canvas.width=OUTPUT_SIZE; canvas.height=OUTPUT_SIZE;
      const ctx=canvas.getContext('2d',{alpha:false});
      ctx.drawImage(source,sx,sy,side,side,0,0,OUTPUT_SIZE,OUTPUT_SIZE);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.84));
      if(!blob) throw new Error('تعذر تجهيز الصورة للرفع.');
      if(blob.size>1000000) throw new Error('تعذر ضغط الصورة للحجم المطلوب.');
      return blob;
    }finally{
      if(source && typeof source.close==='function') try{source.close();}catch(e){}
      if(revoke) URL.revokeObjectURL(revoke);
    }
  }

  async function uploadCustomAvatar(file){
    const session=currentSession || await getSession();
    const c=sharedClient();
    if(!session || !session.user) throw new Error('لازم تسجل دخول الأول.');
    if(!c) throw new Error('خدمة الصور لسه ما اتحمّلتش. جرّب تاني بعد لحظة.');

    const blob=await imageToJpeg(file);
    const token=(window.crypto && crypto.randomUUID)?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
    const newPath=session.user.id+'/'+token+'.jpg';
    const oldPath=currentProfile && currentProfile.custom_avatar_path || '';

    const {error:uploadError}=await c.storage.from(BUCKET).upload(newPath,blob,{contentType:'image/jpeg',cacheControl:'3600',upsert:false});
    if(uploadError) throw new Error(uploadError.message || 'تعذر رفع الصورة.');

    const {data:publicData}=c.storage.from(BUCKET).getPublicUrl(newPath);
    const publicUrl=publicData && publicData.publicUrl;
    if(!publicUrl){
      try{await c.storage.from(BUCKET).remove([newPath]);}catch(e){}
      throw new Error('تعذر إنشاء رابط الصورة.');
    }

    try{ await patchProfile({custom_avatar_url:publicUrl,custom_avatar_path:newPath,avatar_public:true}); }
    catch(err){ try{await c.storage.from(BUCKET).remove([newPath]);}catch(e){} throw err; }

    if(oldPath && oldPath!==newPath) try{await c.storage.from(BUCKET).remove([oldPath]);}catch(e){}

    currentSession=session;
    currentProfile={...(currentProfile||{}),custom_avatar_url:publicUrl,custom_avatar_path:newPath,avatar_public:true};
    paintOwnAvatar();
    renderControls(true);
    window.dispatchEvent(new CustomEvent('taraf:avatar-updated',{detail:{avatarUrl:publicUrl,public:true}}));
  }

  async function removeCustomAvatar(){
    const c=sharedClient();
    const oldPath=currentProfile && currentProfile.custom_avatar_path || '';
    await patchProfile({custom_avatar_url:null,custom_avatar_path:null});
    if(oldPath && c) try{await c.storage.from(BUCKET).remove([oldPath]);}catch(e){}
    currentProfile={...(currentProfile||{}),custom_avatar_url:null,custom_avatar_path:null};
    paintOwnAvatar();
    renderControls(true);
    window.dispatchEvent(new CustomEvent('taraf:avatar-updated',{detail:{avatarUrl:effectiveAvatar(),public:currentProfile.avatar_public!==false}}));
  }

  async function refresh(){
    if(refreshPromise) return refreshPromise;
    refreshPromise=(async()=>{
      const session=await getSession();
      currentSession=session || null;
      if(!session || !session.user){
        currentProfile=null;
        const box=document.getElementById('pf-avatar-manager');
        if(box) box.remove();
        return;
      }
      try{currentProfile=await fetchProfile(session);}catch(e){currentProfile=currentProfile||null;}
      paintOwnAvatar();
      renderControls();
    })().finally(()=>{refreshPromise=null;});
    return refreshPromise;
  }

  function boot(){
    installStyles();
    refresh();

    // Polling محدود فقط لانتظار إعادة رسم Cloud Card. لا يوجد MutationObserver.
    let tries=0;
    const timer=setInterval(()=>{
      if(currentSession){ paintOwnAvatar(); renderControls(); }
      else if(tries%4===0) refresh();
      if(++tries>=40) clearInterval(timer);
    },250);

    window.addEventListener('taraf:cloud-sync-complete',()=>{lastUiSignature='';refresh();});
    window.addEventListener('taraf:auth-changed',()=>{lastUiSignature='';refresh();});
  }

  window.TarafAvatarManager={__loaded:true,refresh};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
