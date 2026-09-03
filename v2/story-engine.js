(() => {
  'use strict';

  const CASE = window.STORY_CASE;
  if (!CASE) throw new Error('STORY_CASE is missing');

  const SAVE_KEY = `taraf_story_${CASE.id}`;
  const $ = (sel, root = document) => root.querySelector(sel);
  const clone = obj => JSON.parse(JSON.stringify(obj));
  const now = () => Date.now();

  function isObject(v){ return v && typeof v === 'object' && !Array.isArray(v); }
  function merge(base, extra){
    const out = clone(base || {});
    Object.entries(extra || {}).forEach(([k,v]) => {
      out[k] = isObject(v) && isObject(out[k]) ? merge(out[k], v) : clone(v);
    });
    return out;
  }
  function getPath(obj, path){ return String(path).split('.').reduce((a,k)=>a == null ? undefined : a[k], obj); }
  function setPath(obj, path, value){
    const parts = String(path).split('.'); let ref = obj;
    parts.slice(0,-1).forEach(k => { if(!isObject(ref[k])) ref[k] = {}; ref = ref[k]; });
    ref[parts[parts.length-1]] = value;
  }

  const saved = (() => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); } catch { return null; } })();
  const defaultState = merge({
    version: 1,
    currentNode: CASE.start,
    playerName: '',
    flags: {},
    stats: { investigation:0, risk:0, independence:0, influence:0, policeTrust:0, observerTrust:0 },
    choices: {},
    evidence: [],
    history: [],
    scheduled: [],
    investigations: {},
    metrics: { decisionTimes:{}, backAttempts:0, timeouts:0, openedAt: now(), nodeEnteredAt: now() }
  }, CASE.initialState || {});
  const state = merge(defaultState, saved || {});
  if (!CASE.nodes[state.currentNode]) state.currentNode = CASE.start;

  const runtime = { timer:null, timerInterval:null, cutsceneIndex:0, toastTimer:null, saveTimer:null };

  function save(){
    const el = $('#saveState'); if(el){ el.textContent='جارٍ الحفظ'; el.classList.add('saving'); }
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {}
    clearTimeout(runtime.saveTimer);
    runtime.saveTimer = setTimeout(()=>{ if(el){ el.textContent='محفوظ'; el.classList.remove('saving'); } }, 260);
    updateDebug();
  }

  function resetTimers(){ clearTimeout(runtime.timer); clearInterval(runtime.timerInterval); runtime.timer = null; runtime.timerInterval = null; }
  function toast(text){
    const el = $('#storyToast'); if(!el) return;
    clearTimeout(runtime.toastTimer); el.textContent=text; el.classList.add('show');
    runtime.toastTimer=setTimeout(()=>el.classList.remove('show'),2400);
  }
  function flash(text){
    const el=$('#systemFlash'); if(!el)return; el.textContent=text; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  }
  function addEvidence(id){ if(!id || state.evidence.includes(id)) return false; state.evidence.push(id); return true; }
  function hasEvidence(id){ return state.evidence.includes(id); }

  function conditionPasses(cond){
    if(!cond) return true;
    if(Array.isArray(cond)) return cond.every(conditionPasses);
    if(cond.all && !cond.all.every(conditionPasses)) return false;
    if(cond.any && !cond.any.some(conditionPasses)) return false;
    if(cond.flag && !getPath(state.flags, cond.flag)) return false;
    if(cond.notFlag && getPath(state.flags, cond.notFlag)) return false;
    if(cond.evidence && !hasEvidence(cond.evidence)) return false;
    if(cond.notEvidence && hasEvidence(cond.notEvidence)) return false;
    if(cond.choice){ const actual = state.choices[cond.choice.node]; if(actual !== cond.choice.equals) return false; }
    if(cond.stat){
      const val = Number(getPath(state.stats, cond.stat.key) || 0);
      if(cond.stat.gte != null && val < cond.stat.gte) return false;
      if(cond.stat.lte != null && val > cond.stat.lte) return false;
      if(cond.stat.eq != null && val !== cond.stat.eq) return false;
    }
    return true;
  }

  function applyEffects(effect = {}){
    Object.entries(effect.set || {}).forEach(([path,value]) => setPath(state, path, value));
    Object.entries(effect.flags || {}).forEach(([path,value]) => setPath(state.flags, path, value));
    Object.entries(effect.stats || {}).forEach(([path,delta]) => setPath(state.stats, path, Number(getPath(state.stats,path)||0)+Number(delta||0)));
    (effect.evidence || []).forEach(addEvidence);
    if(effect.chapter != null) state.chapter = effect.chapter;
    (effect.schedule || []).forEach(item => {
      if(!state.scheduled.some(x=>x.id===item.id)) state.scheduled.push(clone(item));
    });
    if(effect.flash) setTimeout(()=>flash(interpolate(effect.flash)),100);
  }

  function interpolate(text=''){
    return String(text).replaceAll('[اسم اللاعب]', state.playerName || 'المحقق').replaceAll('[player]', state.playerName || 'المحقق');
  }

  function resolveNext(next){
    if(typeof next === 'string') return next;
    if(Array.isArray(next)){
      const hit = next.find(route => conditionPasses(route.when));
      return hit ? hit.to : null;
    }
    return null;
  }

  function runScheduled(triggerNode){
    let changed=false;
    state.scheduled.forEach(item => {
      if(item.done || item.trigger !== triggerNode) return;
      if(item.when && !conditionPasses(item.when)) return;
      item.done=true; changed=true; applyEffects(item.effect || {});
      if(item.toast) setTimeout(()=>toast(interpolate(item.toast)),380);
      if(item.flash) setTimeout(()=>flash(interpolate(item.flash)),180);
    });
    if(changed) save();
  }

  function recordHistory(kind, payload={}){
    state.history.push({ kind, node:state.currentNode, at:now(), ...payload });
    if(state.history.length > 250) state.history = state.history.slice(-250);
  }

  function navigate(id, opts={}){
    if(!id || !CASE.nodes[id]) return;
    resetTimers();
    if(!opts.replace) recordHistory('leave', { to:id });
    state.currentNode=id; state.metrics.nodeEnteredAt=now(); save();
    runScheduled(id); render();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function elapsedDecisionMs(){ return Math.max(0, now() - Number(state.metrics.nodeEnteredAt || now())); }

  function choose(node, choice, byTimeout=false){
    if(state.choices[node.id] && !node.allowRepeat) return;
    const elapsed = elapsedDecisionMs();
    state.choices[node.id]=choice.id;
    state.metrics.decisionTimes[node.id]=elapsed;
    if(byTimeout) state.metrics.timeouts = Number(state.metrics.timeouts||0)+1;
    applyEffects(choice.effect || {});
    recordHistory('choice',{ choice:choice.id, elapsedMs:elapsed, timeout:byTimeout });
    save();
    if(choice.feedback) toast(interpolate(choice.feedback));
    const target=resolveNext(choice.next || node.next);
    setTimeout(()=>navigate(target), choice.delay || 180);
  }

  function nodeShell(node, extra=''){
    return `<section class="node-shell ${node.system?'system-node':''} ${extra}"><article class="node-card ${node.black?'black':''}"><div class="node-top"><div class="node-kicker">${interpolate(node.kicker || CASE.kicker || 'طرف خيط · وضع القصة')}</div><h2 class="node-title">${interpolate(node.title || '')}</h2>${node.subtitle?`<p class="node-subtitle">${interpolate(node.subtitle)}</p>`:''}</div><div class="story-body" id="nodeBody"></div></article></section>`;
  }

  function renderIdentity(node){
    const stage=$('#stage'); stage.innerHTML=nodeShell(node);
    $('#nodeBody').innerHTML=`<div class="beat-text">${interpolate(node.prompt || 'اكتب اسمك')}</div><form id="identityForm" class="identity-form"><input id="identityInput" maxlength="28" autocomplete="off" placeholder="الاسم" value="${state.playerName.replaceAll('"','&quot;')}"/><button class="story-btn primary" type="submit">${node.button || 'تأكيد'}</button></form>`;
    $('#identityForm').addEventListener('submit',e=>{
      e.preventDefault(); const value=$('#identityInput').value.trim(); if(!value){toast('اكتب اسم المحقق الأول.');return;}
      state.playerName=value; applyEffects(node.effect||{}); recordHistory('identity',{value}); save(); navigate(resolveNext(node.next));
    });
    setTimeout(()=>$('#identityInput')?.focus(),100);
  }

  function renderCutscene(node){
    runtime.cutsceneIndex=0; const stage=$('#stage'); stage.innerHTML=nodeShell(node);
    const body=$('#nodeBody');
    const beats=(node.beats||[]).filter(b=>conditionPasses(b.when));
    function showBeat(){
      const beat=beats[runtime.cutsceneIndex] || {};
      body.innerHTML=`<div class="beat-wrap ${beat.glitch?'glitch':''}">${beat.speaker?`<div class="beat-speaker">${interpolate(beat.speaker)}</div>`:''}<div class="beat-text">${interpolate(beat.text||'')}</div>${beat.small?`<div class="beat-small">${interpolate(beat.small)}</div>`:''}</div><div class="controls"><button id="beatNext" class="story-btn ${runtime.cutsceneIndex===beats.length-1?'primary':''}" type="button">${runtime.cutsceneIndex===beats.length-1?(node.nextLabel||'استمرار'):'التالي'}</button></div>`;
      if(beat.flash) flash(interpolate(beat.flash));
      $('#beatNext').addEventListener('click',()=>{
        if(runtime.cutsceneIndex < beats.length-1){ runtime.cutsceneIndex++; showBeat(); }
        else { applyEffects(node.effect||{}); recordHistory('cutscene-complete'); save(); navigate(resolveNext(node.next)); }
      });
    }
    showBeat();
  }

  function renderSystem(node){
    const stage=$('#stage');
    stage.innerHTML=`<section class="node-shell system-node"><article class="node-card black"><div class="system-screen ${node.glitch?'glitch':''}"><div class="system-line">${interpolate(node.line||'')}</div><div class="system-big ${node.danger?'system-danger':''}">${interpolate(node.big||'')}</div>${node.small?`<div class="system-line system-muted">${interpolate(node.small)}</div>`:''}<div class="controls"><button id="systemNext" class="story-btn ${node.danger?'danger':'primary'}" type="button">${node.button||'استمرار'}</button></div></div></article></section>`;
    if(node.effect) applyEffects(node.effect);
    $('#systemNext').addEventListener('click',()=>{recordHistory('system-complete');save();navigate(resolveNext(node.next));});
  }

  function renderDecision(node){
    const stage=$('#stage'); stage.innerHTML=nodeShell(node);
    const body=$('#nodeBody');
    const previous=state.choices[node.id];
    const visible=(node.choices||[]).filter(c=>conditionPasses(c.when));
    body.innerHTML=`<div class="beat-text">${interpolate(node.prompt||'ماذا تفعل؟')}</div>${node.note?`<div class="beat-small">${interpolate(node.note)}</div>`:''}<div id="choices" class="choices"></div><div id="decisionTimer"></div>`;
    const wrap=$('#choices');
    if(previous && !node.allowRepeat){
      const chosen=(node.choices||[]).find(c=>c.id===previous);
      wrap.innerHTML=`<div class="inspect-detail">قرارك اتسجل: <strong>${interpolate(chosen?.label || previous)}</strong>. القرارات الأساسية مفيهاش تراجع.</div><button id="continueLocked" class="story-btn primary" type="button">استمرار</button>`;
      $('#continueLocked').addEventListener('click',()=>navigate(resolveNext(chosen?.next || node.next)));
      return;
    }
    visible.forEach(choice=>{
      const btn=document.createElement('button'); btn.type='button'; btn.className=`choice-btn ${choice.secret?'hidden-choice':''}`;
      btn.innerHTML=`<strong>${interpolate(choice.label)}</strong>${choice.description?`<span>${interpolate(choice.description)}</span>`:''}`;
      btn.addEventListener('click',()=>choose(node,choice,false)); wrap.appendChild(btn);
    });
    if(node.timer){ startDecisionTimer(node, visible); }
  }

  function startDecisionTimer(node, choices){
    const host=$('#decisionTimer'); if(!host)return;
    const duration=Math.max(1,Number(node.timer.seconds||20)); let left=duration;
    host.innerHTML=`<div class="timer-wrap"><div class="timer-head"><span>${node.timer.label||'الوقت المتبقي'}</span><strong id="timerText">${left}</strong></div><div class="timer-track"><div id="timerBar" class="timer-bar"></div></div></div>`;
    const wrap=$('.timer-wrap',host), text=$('#timerText',host), bar=$('#timerBar',host);
    runtime.timerInterval=setInterval(()=>{
      left-=.1; const pct=Math.max(0,left/duration*100); bar.style.width=`${pct}%`; text.textContent=String(Math.max(0,Math.ceil(left)));
      if(left<=Math.min(7,duration*.3)) wrap.classList.add('urgent');
      if(left<=0){
        resetTimers(); const fallback=choices.find(c=>c.id===node.timer.timeoutChoice) || choices[0];
        if(fallback){ toast(node.timer.timeoutMessage||'الوقت خلص. سكوتك اتحسب قرار.'); choose(node,fallback,true); }
        else if(node.timer.timeoutNext){ state.metrics.timeouts++; save(); navigate(node.timer.timeoutNext); }
      }
    },100);
  }

  function investigationState(node){
    if(!state.investigations[node.id]) state.investigations[node.id]={checked:[],startedAt:now(),completed:false};
    return state.investigations[node.id];
  }

  function renderInvestigation(node){
    const inv=investigationState(node); const stage=$('#stage');
    const limit=Number(node.limit||999); const remaining=Math.max(0,limit-inv.checked.length);
    stage.innerHTML=`<section class="node-shell investigation-shell"><div class="investigation-head"><div><div class="node-kicker">${interpolate(node.kicker||'فحص مسرح')}</div><h2 class="investigation-title">${interpolate(node.title)}</h2></div><div class="investigation-meta"><span class="pill">فحوص متبقية: <b id="remainingCount">${remaining}</b></span>${node.timer?'<span class="pill">الوقت: <b id="investigationTimer">--</b></span>':''}</div></div><div class="scene-frame"><div class="scene-image" id="sceneImage"></div><div id="hotspotLayer" class="hotspot-layer"></div><div class="scene-caption">${interpolate(node.caption||'فتّش بنفسك. مش كل حاجة هتلحق تشوفها.')}</div></div><div class="controls" id="investigationControls"></div></section>`;
    if(node.image) $('#sceneImage').style.backgroundImage=`linear-gradient(rgba(0,0,0,.08),rgba(0,0,0,.18)),url("${node.image}")`;
    renderInvestigationHotspots(node,inv);
    renderInvestigationControls(node,inv);
    if(node.timer) startInvestigationTimer(node,inv);
    save();
  }

  function renderInvestigationHotspots(node,inv){
    const layer=$('#hotspotLayer'); layer.innerHTML='';
    (node.hotspots||[]).filter(h=>conditionPasses(h.when)).forEach(h=>{
      const btn=document.createElement('button'); btn.type='button'; btn.className=`story-hotspot ${inv.checked.includes(h.id)?'done':''}`;
      Object.assign(btn.style,{left:`${h.area.x}%`,top:`${h.area.y}%`,width:`${h.area.w}%`,height:`${h.area.h}%`});
      btn.setAttribute('aria-label',`فحص ${h.title}`); btn.addEventListener('click',()=>openHotspot(node,h,inv)); layer.appendChild(btn);
    });
  }

  function openHotspot(node,h,inv){
    if(inv.checked.includes(h.id))return;
    const sheet=document.createElement('div'); sheet.className='inspect-sheet';
    sheet.innerHTML=`<section class="inspect-card"><button class="close-x" type="button">×</button><div class="node-kicker">فحص موضعي</div><h2>${interpolate(h.title)}</h2><p>${interpolate(h.description||'')}</p><div class="inspect-details">${(h.details||[]).map(x=>`<div class="inspect-detail">${interpolate(x)}</div>`).join('')}</div><div class="controls"><button class="story-btn primary" id="collectHotspot" type="button">${h.actionLabel||'سجّل ما وجدته'}</button></div></section>`;
    document.body.appendChild(sheet);
    $('.close-x',sheet).addEventListener('click',()=>sheet.remove());
    $('#collectHotspot',sheet).addEventListener('click',()=>{
      inv.checked.push(h.id); applyEffects(h.effect||{}); (h.evidence||[]).forEach(addEvidence); recordHistory('investigation',{hotspot:h.id}); save(); sheet.remove();
      const remaining=Math.max(0,Number(node.limit||999)-inv.checked.length); $('#remainingCount').textContent=remaining;
      renderInvestigationHotspots(node,inv); renderInvestigationControls(node,inv);
      toast(h.feedback||'اتسجل اللي لقيته.');
    });
  }

  function renderInvestigationControls(node,inv){
    const wrap=$('#investigationControls'); if(!wrap)return;
    const enough=inv.checked.length>=Number(node.limit||999);
    wrap.innerHTML='';
    if(enough){
      const btn=document.createElement('button'); btn.className='story-btn primary'; btn.type='button'; btn.textContent=node.completeLabel||'إنهاء الفحص';
      btn.addEventListener('click',()=>finishInvestigation(node,inv,false)); wrap.appendChild(btn);
    }
  }

  function startInvestigationTimer(node,inv){
    const duration=Number(node.timer.seconds||120); const spent=Math.floor((now()-Number(inv.startedAt||now()))/1000); let left=Math.max(0,duration-spent); const text=$('#investigationTimer');
    const tick=()=>{ if(text) text.textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(Math.max(0,left%60)).padStart(2,'0')}`; };
    tick(); runtime.timerInterval=setInterval(()=>{ left--; tick(); if(left<=0){ resetTimers(); state.metrics.timeouts++; toast(node.timer.timeoutMessage||'الوقت خلص. الفريق وصل ووقف الفحص.'); finishInvestigation(node,inv,true); } },1000);
  }

  function finishInvestigation(node,inv,timedOut){
    if(inv.completed)return; inv.completed=true; inv.timedOut=Boolean(timedOut); applyEffects(node.effect||{}); recordHistory('investigation-complete',{timedOut,count:inv.checked.length}); save(); navigate(resolveNext(timedOut ? (node.timeoutNext||node.next) : node.next));
  }

  function renderReport(node){
    const stage=$('#stage'); stage.innerHTML=nodeShell(node);
    const items=(node.items||[]).map(item=>{
      const value=typeof item.value==='function'?item.value(state):getPath(state,item.value);
      return `<div class="profile-item"><span>${interpolate(item.label)}</span><strong>${interpolate(value==null?'—':String(value))}</strong></div>`;
    }).join('');
    $('#nodeBody').innerHTML=`<div class="beat-text">${interpolate(node.text||'')}</div><div class="profile-grid">${items}</div>${node.seal?`<div class="ending-seal">${interpolate(node.seal)}</div>`:''}<div class="controls"><button id="reportNext" class="story-btn primary" type="button">${node.button||'استمرار'}</button></div>`;
    $('#reportNext').addEventListener('click',()=>navigate(resolveNext(node.next)));
  }

  function renderEnd(node){
    const stage=$('#stage'); stage.innerHTML=nodeShell(node);
    $('#nodeBody').innerHTML=`<div class="beat-text">${interpolate(node.text||'')}</div>${node.seal?`<div class="ending-seal">${interpolate(node.seal)}</div>`:''}<div class="controls"><button id="restartStory" class="story-btn ghost" type="button">إعادة التجربة من البداية</button></div>`;
    $('#restartStory').addEventListener('click',()=>{ if(confirm('تمسح حفظ القضية وتبدأ من الأول؟')){localStorage.removeItem(SAVE_KEY);location.reload();} });
  }

  function updateHeader(node){
    $('#caseTitle').textContent=CASE.title; $('#caseEyebrow').textContent=CASE.kicker||'طرف خيط · وضع القصة';
    $('#chapterLabel').textContent=node.chapter || state.chapter || CASE.chapter || 'الفصل الأول';
    document.body.dataset.node=node.id; document.body.dataset.type=node.type;
  }

  function render(){
    resetTimers(); const node=CASE.nodes[state.currentNode]; if(!node)return;
    updateHeader(node); updateDebug();
    if(node.type==='identity') return renderIdentity(node);
    if(node.type==='cutscene') return renderCutscene(node);
    if(node.type==='system') return renderSystem(node);
    if(node.type==='decision') return renderDecision(node);
    if(node.type==='investigation') return renderInvestigation(node);
    if(node.type==='report') return renderReport(node);
    if(node.type==='end') return renderEnd(node);
    throw new Error(`Unknown Story node type: ${node.type}`);
  }

  function updateDebug(){
    const pre=$('#debugState'); if(pre) pre.textContent=JSON.stringify(state,null,2);
  }
  function wireDebug(){
    const panel=$('#debugPanel'); const enabled=new URLSearchParams(location.search).get('debug')==='1';
    // من غير ?debug=1 في الرابط، لوحة المطورين مش بتتوصّل خالص — لا اختصار كيبورد،
    // لا زرار قفل/انتقال/مسح. كده لاعب عادي (أو فضولي بيجرب Ctrl+Shift+D) ما يقدرش
    // يشوف الحالة الداخلية أو يقفز لأي خاتمة قبل ما يوصلها فعليًا.
    if(!enabled) return;
    panel.classList.remove('hidden');
    $('#debugClose')?.addEventListener('click',()=>panel.classList.add('hidden'));
    $('#debugJumpBtn')?.addEventListener('click',()=>{const id=$('#debugJumpInput').value.trim(); if(CASE.nodes[id])navigate(id); else toast('المشهد ده مش موجود.');});
    $('#debugResetBtn')?.addEventListener('click',()=>{localStorage.removeItem(SAVE_KEY);location.reload();});
    document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='d'){panel.classList.toggle('hidden');updateDebug();}});
  }

  wireDebug();
  if(new URLSearchParams(location.search).get('reset')==='1'){ localStorage.removeItem(SAVE_KEY); location.replace(location.pathname); return; }
  render();
})();
