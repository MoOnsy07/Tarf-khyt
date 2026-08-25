/* ============================================================
   طرف الخيط — Avatar Controls
   - رفع صورة شخصية مختلفة من الجهاز/الموبايل.
   - ضغط وقص الصورة محليًا قبل الرفع (512x512 JPEG).
   - إظهار/إخفاء الصورة من الليدر بورد بدون التأثير على الحساب أو التقدم.
   - الرجوع لصورة Google/Facebook وحذف الصورة المرفوعة من Storage.
   ============================================================ */
(function(){
  'use strict';

  if(window.TarafAvatarManager && window.TarafAvatarManager.__loaded) return;

  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';
  const BUCKET = 'avatars';
  const MAX_SOURCE_BYTES = 12 * 1024 * 1024;
  const OUTPUT_SIZE = 512;

  let currentSession = null;
  let currentProfile = null;
  let observer = null;
  let refreshBusy = false;

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#039;');
  }

  function installStyles(){
    if(document.getElementById('taraf-avatar-controls-style')) return;
    const style = document.createElement('style');
    style.id = 'taraf-avatar-controls-style';
    style.textContent = `
      .pf-avatar-manager{margin-top:13px;padding:13px;border:1px solid var(--line,#34302a);border-radius:5px;background:rgba(255,255,255,.018)}
      .pf-avatar-manager-title{font-size:11px;font-weight:900;color:var(--ink-dim,#aaa);margin-bottom:9px;letter-spacing:.02em}
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
      @media(max-width:520px){.pf-avatar-manager-row{align-items:flex-start}.pf-avatar-manager-actions{width:calc(100% - 66px)}.pf-avatar-manager-actions .btn{flex:1;min-width:135px}}
    `;
    document.head.appendChild(style);
  }

  async function getSession(){
    if(window.TarafCloud && typeof window.TarafCloud.getSession === 'function'){
      return await window.TarafCloud.getSession();
    }
    try{
      if(typeof sb !== 'undefined' && sb && sb.auth){
        const {data} = await sb.auth.getSession();
        return data && data.session || null;
      }
    }catch(e){}
    return null;
  }

  function authHeaders(session, json){
    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: 'Bearer ' + session.access_token,
    };
    if(json) headers['Content-Type'] = 'application/json';
    return headers;
  }

  async function fetchProfile(session){
    if(!session || !session.user) return null;
    const url = SUPABASE_URL + '/rest/v1/game_profiles?user_id=eq.' + encodeURIComponent(session.user.id) + '&select=avatar_url,custom_avatar_url,custom_avatar_path,avatar_public,player_name';
    const res = await fetch(url,{headers:authHeaders(session,false),cache:'no-store'});
    if(!res.ok) throw new Error('تعذر تحميل إعدادات الصورة.');
    const rows = await res.json();
    return Array.isArray(rows) && rows[0] ? rows[0] : null;
  }

  async function patchProfile(session, changes){
    if(!session || !session.user) throw new Error('لازم تسجل دخول الأول.');
    const url = SUPABASE_URL + '/rest/v1/game_profiles?user_id=eq.' + encodeURIComponent(session.user.id);
    const res = await fetch(url,{
      method:'PATCH',
      headers:{...authHeaders(session,true),Prefer:'return=minimal'},
      body:JSON.stringify({...changes,updated_at:new Date().toISOString()}),
    });
    if(!res.ok){
      let msg='تعذر حفظ إعدادات الصورة.';
      try{ const x=await res.json(); msg=x.message||msg; }catch(e){}
      throw new Error(msg);
    }
  }

  function oauthAvatar(session){
    const user = session && session.user;
    if(!user) return '';
    const identities = Array.isArray(user.identities) ? user.identities : [];
    const fb = identities.find(x=>x && x.provider==='facebook');
    const google = identities.find(x=>x && x.provider==='google');
    const pick = item=>{
      const d = item && item.identity_data || {};
      return String(d.avatar_url || d.picture || '');
    };
    const meta = user.user_metadata || {};
    return pick(fb) || pick(google) || String(meta.avatar_url || meta.picture || '');
  }

  function effectiveAvatar(){
    if(!currentSession) return '';
    return String(currentProfile && currentProfile.custom_avatar_url || currentProfile && currentProfile.avatar_url || oauthAvatar(currentSession) || '');
  }

  function playerInitial(){
    let name='';
    try{ name=localStorage.getItem('ca_player_name') || localStorage.getItem('tarafkhyt_player_name') || ''; }catch(e){}
    return String(name).trim().charAt(0).toUpperCase() || '؟';
  }

  function paintOwnAvatar(){
    if(!/\/profile\.html$/i.test(location.pathname)) return;
    const el = document.querySelector('.pf-avatar');
    if(!el) return;
    const url = effectiveAvatar();
    if(!url){
      if(el.querySelector('img') || el.classList.contains('has-social-avatar')){
        el.classList.remove('has-social-avatar');
        delete el.dataset.socialAvatarUrl;
        el.textContent = playerInitial();
      }
      return;
    }
    const existing = el.querySelector('img');
    if(el.dataset.socialAvatarUrl===url && existing && existing.getAttribute('src')===url) return;
    el.classList.add('has-social-avatar');
    el.dataset.socialAvatarUrl=url;
    if(existing){ existing.src=url; return; }
    const img=document.createElement('img');
    img.src=url;
    img.alt='صورة المحقق';
    img.referrerPolicy='no-referrer';
    el.replaceChildren(img);
  }

  function previewHtml(){
    const url=effectiveAvatar();
    return url ? `<img src="${esc(url)}" alt="صورة المحقق" referrerpolicy="no-referrer">` : esc(playerInitial());
  }

  function setStatus(text,type){
    const el=document.getElementById('pf-avatar-manager-status');
    if(!el) return;
    el.className='pf-avatar-manager-status' + (type ? ' '+type : '');
    el.textContent=text || '';
  }

  function ensureControls(){
    if(!/\/profile\.html$/i.test(location.pathname) || !currentSession || !currentSession.user) return;
    const card=document.getElementById('pf-cloud-card');
    if(!card || !document.getElementById('pf-cloud-signout')) return;

    let box=document.getElementById('pf-avatar-manager');
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

    const isPublic = currentProfile ? currentProfile.avatar_public !== false : true;
    const hasCustom = !!(currentProfile && currentProfile.custom_avatar_url);
    box.innerHTML=`
      <div class="pf-avatar-manager-title">الصورة الشخصية</div>
      <div class="pf-avatar-manager-row">
        <div class="pf-avatar-preview">${previewHtml()}</div>
        <div class="pf-avatar-manager-actions">
          <button type="button" class="btn ghost mono" id="pf-avatar-upload">📷 رفع صورة مختلفة</button>
          <button type="button" class="btn ghost mono" id="pf-avatar-visibility">${isPublic ? '🙈 إخفاء من الليدر بورد' : '👁 إظهار في الليدر بورد'}</button>
          ${hasCustom ? '<button type="button" class="btn ghost mono" id="pf-avatar-reset">↩ استخدام صورة الحساب</button>' : ''}
          <input class="pf-avatar-file" id="pf-avatar-file" type="file" accept="image/*">
        </div>
      </div>
      ${isPublic ? '' : '<div class="pf-avatar-privacy-hidden">🔒 صورتك مخفية عن باقي اللاعبين في الليدر بورد.</div>'}
      <div class="pf-avatar-manager-hint">رفع صورة هنا لا يغيّر صورة Google أو Facebook. تقدر تخفي الصورة عن المتصدرين في أي وقت.</div>
      <div class="pf-avatar-manager-status" id="pf-avatar-manager-status"></div>`;

    const uploadBtn=document.getElementById('pf-avatar-upload');
    const fileInput=document.getElementById('pf-avatar-file');
    const visibilityBtn=document.getElementById('pf-avatar-visibility');
    const resetBtn=document.getElementById('pf-avatar-reset');

    if(uploadBtn && fileInput){
      uploadBtn.onclick=()=>fileInput.click();
      fileInput.onchange=async()=>{
        const file=fileInput.files && fileInput.files[0];
        if(!file) return;
        uploadBtn.disabled=true;
        visibilityBtn && (visibilityBtn.disabled=true);
        setStatus('بنجهّز الصورة ونرفعها...');
        try{
          await uploadCustomAvatar(file);
          setStatus('تم تحديث الصورة ✓','ok');
        }catch(err){
          setStatus(String(err && err.message || 'تعذر رفع الصورة.'),'err');
        }finally{
          fileInput.value='';
          uploadBtn.disabled=false;
          visibilityBtn && (visibilityBtn.disabled=false);
        }
      };
    }

    if(visibilityBtn){
      visibilityBtn.onclick=async()=>{
        visibilityBtn.disabled=true;
        const next = !(currentProfile ? currentProfile.avatar_public !== false : true);
        setStatus(next ? 'بنظهر الصورة في الليدر بورد...' : 'بنخفي الصورة من الليدر بورد...');
        try{
          await patchProfile(currentSession,{avatar_public:next});
          if(!currentProfile) currentProfile={};
          currentProfile.avatar_public=next;
          ensureControls();
          setStatus(next ? 'الصورة ظاهرة في الليدر بورد ✓' : 'الصورة اتخفت من الليدر بورد ✓','ok');
        }catch(err){
          visibilityBtn.disabled=false;
          setStatus(String(err && err.message || 'تعذر تغيير الخصوصية.'),'err');
        }
      };
    }

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
  }

  async function imageToJpeg(file){
    if(!file.type || !file.type.startsWith('image/')) throw new Error('اختار ملف صورة صالح.');
    if(file.size > MAX_SOURCE_BYTES) throw new Error('الصورة كبيرة جدًا. الحد الأقصى قبل الضغط 12MB.');

    let source=null;
    let revoke='';
    try{
      if('createImageBitmap' in window){
        source=await createImageBitmap(file);
      }else{
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
      const side=Math.min(w,h);
      const sx=Math.max(0,(w-side)/2);
      const sy=Math.max(0,(h-side)/2);
      const canvas=document.createElement('canvas');
      canvas.width=OUTPUT_SIZE;
      canvas.height=OUTPUT_SIZE;
      const ctx=canvas.getContext('2d',{alpha:false});
      ctx.drawImage(source,sx,sy,side,side,0,0,OUTPUT_SIZE,OUTPUT_SIZE);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.84));
      if(!blob) throw new Error('تعذر تجهيز الصورة للرفع.');
      if(blob.size > 1000000) throw new Error('تعذر ضغط الصورة للحجم المطلوب. جرّب صورة تانية.');
      return blob;
    }finally{
      if(source && typeof source.close==='function') try{source.close();}catch(e){}
      if(revoke) URL.revokeObjectURL(revoke);
    }
  }

  function makeStorageClient(session){
    if(!window.supabase || typeof window.supabase.createClient!=='function') throw new Error('خدمة الصور لسه ما اتحمّلتش. جرّب تاني بعد لحظة.');
    return window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
      auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},
      global:{headers:{Authorization:'Bearer '+session.access_token}}
    });
  }

  function randomToken(){
    if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
  }

  async function uploadCustomAvatar(file){
    const session=currentSession || await getSession();
    if(!session || !session.user) throw new Error('لازم تسجل دخول الأول.');
    const blob=await imageToJpeg(file);
    const storage=makeStorageClient(session);
    const newPath=session.user.id+'/'+randomToken()+'.jpg';
    const oldPath=currentProfile && currentProfile.custom_avatar_path || '';

    const {error:uploadError}=await storage.storage.from(BUCKET).upload(newPath,blob,{
      contentType:'image/jpeg',cacheControl:'3600',upsert:false
    });
    if(uploadError) throw new Error(uploadError.message || 'تعذر رفع الصورة.');

    const {data:publicData}=storage.storage.from(BUCKET).getPublicUrl(newPath);
    const publicUrl=publicData && publicData.publicUrl;
    if(!publicUrl){
      try{ await storage.storage.from(BUCKET).remove([newPath]); }catch(e){}
      throw new Error('تعذر إنشاء رابط الصورة.');
    }

    try{
      await patchProfile(session,{custom_avatar_url:publicUrl,custom_avatar_path:newPath,avatar_public:true});
    }catch(err){
      try{ await storage.storage.from(BUCKET).remove([newPath]); }catch(e){}
      throw err;
    }

    if(oldPath && oldPath!==newPath){
      try{ await storage.storage.from(BUCKET).remove([oldPath]); }catch(e){}
    }

    currentSession=session;
    if(!currentProfile) currentProfile={};
    currentProfile.custom_avatar_url=publicUrl;
    currentProfile.custom_avatar_path=newPath;
    currentProfile.avatar_public=true;
    paintOwnAvatar();
    ensureControls();
    window.dispatchEvent(new CustomEvent('taraf:avatar-updated',{detail:{avatarUrl:publicUrl,public:true}}));
  }

  async function removeCustomAvatar(){
    const session=currentSession || await getSession();
    if(!session || !session.user) throw new Error('لازم تسجل دخول الأول.');
    const oldPath=currentProfile && currentProfile.custom_avatar_path || '';
    await patchProfile(session,{custom_avatar_url:null,custom_avatar_path:null});

    if(oldPath){
      try{
        const storage=makeStorageClient(session);
        await storage.storage.from(BUCKET).remove([oldPath]);
      }catch(e){ console.warn('avatar storage cleanup skipped',e); }
    }

    if(!currentProfile) currentProfile={};
    currentProfile.custom_avatar_url=null;
    currentProfile.custom_avatar_path=null;
    paintOwnAvatar();
    ensureControls();
    window.dispatchEvent(new CustomEvent('taraf:avatar-updated',{detail:{avatarUrl:effectiveAvatar(),public:currentProfile.avatar_public!==false}}));
  }

  async function refresh(){
    if(refreshBusy) return;
    refreshBusy=true;
    try{
      currentSession=await getSession();
      if(!currentSession || !currentSession.user){
        currentProfile=null;
        const box=document.getElementById('pf-avatar-manager');
        if(box) box.remove();
        return;
      }
      try{ currentProfile=await fetchProfile(currentSession); }
      catch(e){ currentProfile=currentProfile || null; }
      paintOwnAvatar();
      ensureControls();
    }finally{ refreshBusy=false; }
  }

  function watchProfile(){
    if(observer || !/\/profile\.html$/i.test(location.pathname)) return;
    const root=document.getElementById('pf-root') || document.body;
    observer=new MutationObserver(()=>{
      paintOwnAvatar();
      ensureControls();
    });
    observer.observe(root,{childList:true,subtree:true});
  }

  function boot(){
    installStyles();
    watchProfile();
    refresh();
    window.addEventListener('taraf:cloud-sync-complete',refresh);
    window.addEventListener('taraf:auth-changed',refresh);
  }

  window.TarafAvatarManager={__loaded:true,refresh};

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
