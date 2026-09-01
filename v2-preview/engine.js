(() => {
  'use strict';

  const CASE = window.V2_CASE;
  if (!CASE) throw new Error('V2_CASE is missing');

  const SAVE_KEY = `taraf_v2_${CASE.id}`;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clone = obj => JSON.parse(JSON.stringify(obj));
  const saved = (() => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); } catch { return null; } })();
  const state = Object.assign(clone(CASE.initialState), saved || {});
  state.visited = Array.isArray(state.visited) ? state.visited : [];
  state.evidence = Array.isArray(state.evidence) ? state.evidence : [];
  state.completedActions = Array.isArray(state.completedActions) ? state.completedActions : [];
  state.boardPositions = state.boardPositions && typeof state.boardPositions === 'object' ? state.boardPositions : {};

  let toastTimer = null;
  function save(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }catch{} }
  function has(flag){ return Boolean(state[flag]); }
  function meets(req=[]){ return req.every(has); }
  function markVisited(id){ if(!state.visited.includes(id)) state.visited.push(id); save(); }
  function addEvidence(id){ if(!id || state.evidence.includes(id)) return false; state.evidence.push(id); save(); updateEvidenceCount(); return true; }
  function toast(text){ const el=$('#toast'); clearTimeout(toastTimer); el.textContent=text; el.classList.add('show'); toastTimer=setTimeout(()=>el.classList.remove('show'),2600); }
  function openOverlay(id){ const el=document.getElementById(id); if(!el)return; el.classList.remove('hidden'); el.setAttribute('aria-hidden','false'); }
  function closeOverlay(id){ const el=document.getElementById(id); if(!el)return; el.classList.add('hidden'); el.setAttribute('aria-hidden','true'); }
  function updateEvidenceCount(){ $('#evidenceCount').textContent=String(state.evidence.length); }

  function renderHotspots(){
    const layer=$('#hotspotsLayer'); layer.innerHTML='';
    CASE.scene.hotspots.forEach(h=>{
      const btn=document.createElement('button'); btn.type='button'; btn.className='hotspot'; btn.dataset.hotspot=h.id;
      btn.setAttribute('aria-label',`فحص ${h.title}`);
      Object.assign(btn.style,{left:`${h.area.x}%`,top:`${h.area.y}%`,width:`${h.area.w}%`,height:`${h.area.h}%`});
      if(state.visited.includes(h.id)) btn.classList.add('visited');
      btn.addEventListener('mouseenter',()=>$('#scene').style.setProperty('--focus-x',`${h.area.x+h.area.w/2}%`));
      btn.addEventListener('click',()=>inspectHotspot(h.id));
      layer.appendChild(btn);
    });
  }

  function inspectHotspot(id){
    const h=CASE.scene.hotspots.find(x=>x.id===id); if(!h)return;
    markVisited(id); renderHotspots();
    $('#inspectTitle').textContent=h.title; $('#inspectDesc').textContent=h.description;
    const visual=$('#inspectVisual');
    const cx=Math.max(0,Math.min(100,h.area.x+h.area.w/2));
    const cy=Math.max(0,Math.min(100,h.area.y+h.area.h/2));
    visual.innerHTML='<div class="inspect-live-badge">فحص مباشر</div><div class="inspect-crosshair" aria-hidden="true"></div>';
    visual.style.backgroundImage=`linear-gradient(rgba(5,7,9,.05),rgba(5,7,9,.2)),url("${CASE.scene.image}")`;
    visual.style.backgroundPosition=`${cx}% ${cy}%`;
    visual.style.backgroundSize='285%';

    const details=$('#inspectDetails'); details.innerHTML='';
    h.details.forEach((text,i)=>{ const row=document.createElement('div'); row.className='detail-row'; row.innerHTML=`<span class="detail-index">0${i+1}</span><span></span>`; row.lastElementChild.textContent=text; details.appendChild(row); });
    renderActions(h); openOverlay('inspector'); $('#sceneHint').style.opacity='0';
  }

  function renderActions(h){
    const wrap=$('#inspectActions'); wrap.innerHTML='';
    h.actions.forEach(action=>{
      const done=state.completedActions.includes(action.id), allowed=meets(action.requires||[]);
      const btn=document.createElement('button'); btn.type='button'; btn.className=`action-btn${!done&&allowed?' primary':''}`; btn.disabled=done||!allowed;
      btn.textContent=done?`${action.label} ✓`:action.label;
      if(!allowed&&!done) btn.title='لسه ناقصك شيء في مسرح التحقيق';
      btn.addEventListener('click',()=>runAction(h,action)); wrap.appendChild(btn);
    });
  }

  function runAction(h,action){
    if(state.completedActions.includes(action.id)||!meets(action.requires||[]))return;
    state.completedActions.push(action.id); Object.entries(action.set||{}).forEach(([k,v])=>state[k]=v);
    const isNew=addEvidence(action.evidence); save(); $('#contextText').textContent=action.result;
    toast(isNew?'اتضاف دليل جديد لحافظتك.':'تم تسجيل الإجراء.'); evaluateWorld(); renderActions(h); renderInventory(); renderBoard();
  }

  function evaluateWorld(){
    const a=state.evidence.includes('shoulder-note'), b=state.evidence.includes('nabil-shoulder-record');
    if(a&&b&&!state.identityDoubtTriggered){
      state.identityDoubtTriggered=true;
      $('#objectiveText').textContent='في تناقض مادي في هوية الجثمان. اجمع قرائن مستقلة قبل ما تبني استنتاجك.';
      $('#contextText').textContent='السجل الطبي يقول إن نبيل عنده تثبيت معدني واضح في الكتف. فحص الجثمان لم يُظهره. ده تناقض، مش حكم نهائي.';
      toast('الهدف اتغيّر: عندك تناقض لازم تثبته، مش إجابة جاهزة.'); save(); return;
    }
    if(state.identityDoubtTriggered) $('#objectiveText').textContent='في تناقض مادي في هوية الجثمان. اجمع قرائن مستقلة قبل ما تبني استنتاجك.';
  }

  function renderInventory(){
    const list=$('#inventoryList'); list.innerHTML='';
    if(!state.evidence.length){ list.innerHTML='<div class="detail-row">لسه ماجمعتش أدلة. ارجع للمشهد وافحصه بنفسك.</div>'; return; }
    state.evidence.forEach((id,index)=>{ const ev=CASE.evidence[id]; if(!ev)return; const card=document.createElement('article'); card.className='evidence-card'; card.innerHTML=`<div class="evidence-no">E-${String(index+1).padStart(2,'0')}</div><div><strong></strong><p></p></div>`; $('strong',card).textContent=ev.title; $('p',card).textContent=ev.summary; list.appendChild(card); });
  }

  function defaultBoardPosition(index){ const columns=3,col=index%columns,row=Math.floor(index/columns); return{x:18+col*185,y:18+row*100}; }
  function renderBoard(){
    const board=$('#board'); board.innerHTML='';
    if(!state.evidence.length){ const empty=document.createElement('div'); empty.className='detail-row'; empty.style.margin='18px'; empty.textContent='أي دليل تجمعه هيظهر هنا كبطاقة تقدر تحركها وترتبها.'; board.appendChild(empty); return; }
    state.evidence.forEach((id,index)=>{ const ev=CASE.evidence[id]; if(!ev)return; const card=document.createElement('div'); card.className='board-card'; card.dataset.evidence=id; card.innerHTML='<b></b><span>اسحبني على اللوحة</span>'; $('b',card).textContent=ev.title; const pos=state.boardPositions[id]||defaultBoardPosition(index); card.style.left=`${pos.x}px`; card.style.top=`${pos.y}px`; enableDrag(card,board,id); board.appendChild(card); });
  }
  function enableDrag(card,board,id){
    let dragging=false,offsetX=0,offsetY=0;
    const move=e=>{ if(!dragging)return; const p=e.touches?e.touches[0]:e,rect=board.getBoundingClientRect(),cr=card.getBoundingClientRect(); let x=p.clientX-rect.left-offsetX,y=p.clientY-rect.top-offsetY; x=Math.max(0,Math.min(x,rect.width-cr.width)); y=Math.max(0,Math.min(y,rect.height-cr.height)); card.style.left=`${x}px`; card.style.top=`${y}px`; state.boardPositions[id]={x,y}; };
    const end=()=>{ if(!dragging)return; dragging=false; save(); document.removeEventListener('pointermove',move); document.removeEventListener('pointerup',end); };
    card.addEventListener('pointerdown',e=>{ dragging=true; const r=card.getBoundingClientRect(); offsetX=e.clientX-r.left; offsetY=e.clientY-r.top; card.setPointerCapture?.(e.pointerId); document.addEventListener('pointermove',move); document.addEventListener('pointerup',end); });
  }

  function pulseHotspots(){ const buttons=$$('.hotspot'); buttons.forEach(b=>b.classList.remove('pulse')); void $('#hotspotsLayer').offsetWidth; buttons.forEach(b=>b.classList.add('pulse')); $('#contextText').textContent='النظرة السريعة بتلمّح مناطق قابلة للفحص فقط؛ مش معناها إن كل منطقة فيها دليل.'; }
  function resetBoard(){ state.boardPositions={}; save(); renderBoard(); }

  function wireUI(){
    $('#sceneTitle').textContent=CASE.scene.title; $('#objectiveText').textContent=CASE.scene.objective;
    const scene=$('#scene'); scene.style.backgroundImage=`linear-gradient(180deg,rgba(2,3,5,.08),rgba(2,3,5,.2)),url("${CASE.scene.image}")`; scene.setAttribute('aria-label',CASE.scene.imageAlt||CASE.scene.title);
    $('#btnInventory').addEventListener('click',()=>{renderInventory();openOverlay('inventory');});
    $('#btnNotebook').addEventListener('click',()=>{renderBoard();openOverlay('notebook');});
    $('#btnPulse').addEventListener('click',pulseHotspots); $('#btnClearBoard').addEventListener('click',resetBoard);
    $$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>closeOverlay(btn.dataset.close)));
    $$('.overlay').forEach(ov=>ov.addEventListener('click',e=>{if(e.target===ov)closeOverlay(ov.id);}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.overlay:not(.hidden)').forEach(el=>closeOverlay(el.id));});
  }

  wireUI(); updateEvidenceCount(); renderHotspots(); renderInventory(); renderBoard(); evaluateWorld();
})();