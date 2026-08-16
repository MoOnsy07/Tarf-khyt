/* ============================================================
   المحرك العام — بيشتغل مع أي قضية متوصفة بنفس الـ schema
   (شوف cases/case-last-episode.js كنموذج)
   لا تكتبش قصة أو بيانات هنا؛ الملف ده للمنطق بس.
   ============================================================ */

const app = {
  view: 'loading',      // loading | library | case
  unlockedIds: [],
  completedIds: [],
};

let CASE = null;         // القضية الحالية (object)
let game = null;         // حالة اللعب داخل القضية الحالية

function freshGameState(){
  return {
    screen:'briefing',
    lastTabIndex:0,
    collected:new Set(),
    interrogated:{},
    audioSolved:false,
    activeSuspect:null,
    accSuspect:null,
    accEvidence:new Set(),
    ending:null,
    prologueIdx:0,
    rumorsShown:new Set(), // اختياري — بس للقضايا اللي فيها CASE.rumors (طابع "قهوة البلد")
  };
}

// أدلة مسرح الجريمة (unlocked:true) لازم تكون متجمّعة دايمًا — أول ما تدخل القضية،
// وبعد أي "ابدأ من الأول" كمان. من غير الدالة دي بتتنسى بسهولة في أكتر من مكان.
function ensureSceneEvidence(){
  CASE.evidence.filter(e=>e.unlocked).forEach(e=>game.collected.add(e.id));
}

const appRoot = document.getElementById('app');

/* ============================================================
   LOCAL STORAGE — كل حاجة متسجلة على الجهاز ده بس (مفيش حسابات)
   ============================================================ */

function getUnlockedIds(){
  try { return JSON.parse(localStorage.getItem('ca_unlocked') || '[]'); }
  catch(e){ return []; }
}
function addUnlockedId(caseId){
  const list = getUnlockedIds();
  if(!list.includes(caseId)){ list.push(caseId); localStorage.setItem('ca_unlocked', JSON.stringify(list)); }
}

function getCompletedIds(){
  try { return JSON.parse(localStorage.getItem('ca_completed') || '[]'); }
  catch(e){ return []; }
}
function addCompletedId(caseId){
  const list = getCompletedIds();
  if(!list.includes(caseId)){ list.push(caseId); localStorage.setItem('ca_completed', JSON.stringify(list)); }
}

function loadLocalProgress(caseId){
  try { return JSON.parse(localStorage.getItem('ca_progress_'+caseId) || 'null'); }
  catch(e){ return null; }
}
function saveLocalProgress(caseId, progress){
  localStorage.setItem('ca_progress_'+caseId, JSON.stringify(progress));
  if(progress.ending) addCompletedId(caseId);
}

/* ============================================================
   BOOT
   ============================================================ */

function boot(){
  app.unlockedIds = getUnlockedIds();
  app.completedIds = getCompletedIds();
  showLibrary();
}

/* ============================================================
   LIBRARY SCREEN
   ============================================================ */

function isCaseLocked(caseData){
  if(caseData.isPremium && !app.unlockedIds.includes(caseData.id)){
    return { locked:true, reason:'premium' };
  }
  if(caseData.seriesId && caseData.seriesOrder > 1){
    const prev = CASES_REGISTRY.find(c => c.seriesId===caseData.seriesId && c.seriesOrder===caseData.seriesOrder-1);
    if(prev && !app.completedIds.includes(prev.id)){
      return { locked:true, reason:'series' };
    }
  }
  return { locked:false };
}

function showLibrary(){
  app.view = 'library';
  const cards = CASES_REGISTRY.map(c=>{
    const lock = isCaseLocked(c);
    const badges = [];
    if(c.isPremium) badges.push(`<span class="lib-badge premium mono">PREMIUM</span>`);
    if(c.seriesId) badges.push(`<span class="lib-badge series mono">الحلقة ${c.seriesOrder}</span>`);
    const lockOverlay = lock.locked ? `
      <div class="lib-lock-overlay">
        <div style="font-size:22px;">🔒</div>
        ${lock.reason==='premium'
          ? '<div>قضية بريميوم<br><span class="mono" style="color:var(--amber);">اضغط للشراء</span></div>'
          : '<div>خلّص الحلقة اللي قبلها الأول</div>'}
      </div>` : '';
    return `
      <div class="lib-card" data-case="${c.id}" data-locked="${lock.locked}" data-lock-reason="${lock.reason||''}">
        ${badges.join('')}
        <div class="cover"><img src="${c.coverImg}" class="photo-tone" alt="${c.title}" loading="lazy"></div>
        <div class="body">
          <h4>${c.title}</h4>
          <div class="meta">${c.caseNo} · ${c.estMinutes} دقيقة · ${c.difficulty}</div>
        </div>
        ${lockOverlay}
      </div>
    `;
  }).join('');

  appRoot.innerHTML = `
    <div class="lib-hero">
      <svg class="lib-fingerprint" viewBox="0 0 200 200" aria-hidden="true">
        <path d="M100,20 C50,20 20,60 20,100 C20,150 50,180 100,180"/>
        <path d="M100,35 C62,35 35,68 35,100 C35,142 62,165 100,165"/>
        <path d="M100,50 C74,50 50,76 50,100 C50,134 74,150 100,150"/>
        <path d="M100,65 C86,65 65,84 65,100 C65,126 86,135 100,135"/>
        <path d="M100,20 C150,20 180,60 180,100 C180,150 150,180 100,180" stroke-dasharray="4 6"/>
        <path d="M100,35 C138,35 165,68 165,100 C165,142 138,165 100,165" stroke-dasharray="3 7"/>
      </svg>
      <div class="lib-hero-eyebrow mono">CASE ARCHIVE</div>
      <h1 class="lib-hero-title">طرف <span class="accent">الخيط</span></h1>
      <svg class="lib-hero-thread" viewBox="0 0 220 22" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6,6 C60,18 150,-2 214,10"/>
      </svg>
      <div class="lib-hero-sub">اختار قضيتك وابدأ التحقيق</div>
    </div>
    <div class="lib-grid">${cards}</div>
  `;

  document.querySelectorAll('.lib-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const caseData = CASES_REGISTRY.find(c=>c.id === card.dataset.case);
      if(card.dataset.locked === 'true'){
        if(card.dataset.lockReason === 'premium') openPurchasePopup(caseData);
        return;
      }
      enterCase(caseData);
    });
  });
}

/* ============================================================
   PURCHASE POPUP (واتساب + كود)
   ============================================================ */

function openPurchasePopup(caseData){
  const waText = encodeURIComponent(`عايز أشتري قضية "${caseData.title}"`);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="tag" style="color:var(--amber);">قضية بريميوم</div>
      <h3>${caseData.title}</h3>
      <p>تواصل معانا على واتساب لشراء القضية، هتوصلك كود تفتح بيه القضية على طول.</p>
      <a href="${waLink}" target="_blank" rel="noopener" class="btn" style="display:block; text-align:center; background:#25D366; color:#04230f; margin-top:8px; text-decoration:none;">
        تواصل على واتساب ←
      </a>
      <div class="divider"></div>
      <p class="dim">عندك كود بالفعل؟</p>
      <input type="text" id="redeemInput" placeholder="اكتب الكود هنا" style="width:100%; background:var(--panel-2); border:1px solid var(--line); color:var(--ink); padding:11px 14px; border-radius:3px; font-family:'JetBrains Mono',monospace; text-align:center; letter-spacing:.1em; margin-bottom:10px;">
      <div id="redeemMsg" style="font-size:13px; margin-bottom:10px; min-height:18px;"></div>
      <button class="btn" id="redeemBtn" style="width:100%;">افتح القضية</button>
      <button class="btn ghost close-btn" style="width:100%; margin-top:8px;">إغلاق</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('.close-btn').addEventListener('click', ()=>overlay.remove());

  overlay.querySelector('#redeemBtn').addEventListener('click', async ()=>{
    const input = overlay.querySelector('#redeemInput');
    const msg = overlay.querySelector('#redeemMsg');
    const btn = overlay.querySelector('#redeemBtn');
    const code = input.value.trim();
    if(!code){ msg.textContent = 'اكتب الكود الأول.'; msg.style.color = 'var(--danger)'; return; }
    btn.disabled = true;
    btn.textContent = '...جارِ التحقق';
    const ok = await redeemCode(caseData.id, code);
    btn.disabled = false;
    btn.textContent = 'افتح القضية';
    if(ok){
      msg.textContent = 'تمام! القضية اتفتحت.';
      msg.style.color = 'var(--signal)';
      addUnlockedId(caseData.id);
      app.unlockedIds = getUnlockedIds();
      setTimeout(()=>{ overlay.remove(); showLibrary(); }, 900);
    } else {
      msg.textContent = 'الكود غلط أو مستخدم قبل كده.';
      msg.style.color = 'var(--danger)';
    }
  });
}

/* ============================================================
   ENTER A CASE
   ============================================================ */

function enterCase(caseData){
  CASE = caseData;
  game = freshGameState();

  const saved = loadLocalProgress(CASE.id);
  if(saved){
    game.collected = new Set(saved.collected || []);
    game.interrogated = {};
    Object.entries(saved.interrogated || {}).forEach(([sid, arr])=>{ game.interrogated[sid] = new Set(arr); });
    game.audioSolved = !!saved.audioSolved;
    game.ending = saved.ending || null;
  } else if(!CASE.isPremium){
    addUnlockedId(CASE.id); // قضية مجانية، تتسجل كمفتوحة أول ما تتلعب
    app.unlockedIds = getUnlockedIds();
  }

  // أدلة مسرح الجريمة (unlocked:true) لازم تكون متجمّعة من البداية دايمًا،
  // سواء قضية جديدة أو تقدّم متسجل قبل كده (بيتم دمجها بهدوء من غير toast)
  ensureSceneEvidence();

  showCaseSplash();
}

function persistProgress(){
  saveLocalProgress(CASE.id, {
    collected: [...game.collected],
    interrogated: Object.fromEntries(Object.entries(game.interrogated).map(([k,v])=>[k,[...v]])),
    audioSolved: game.audioSolved,
    ending: game.ending,
  });
}

/* ============================================================
   SPLASH + PROLOGUE
   ============================================================ */

function showCaseSplash(){
  app.view = 'case';
  appRoot.innerHTML = '';
  document.body.insertAdjacentHTML('beforeend', `
    <div id="splash" class="splash" tabindex="0" role="button" aria-label="اضغط للبدء">
      <div class="splash-caseno mono">${CASE.caseNo} — ${CASE.subtitle}</div>
      <h1 class="splash-title flicker">${CASE.title}</h1>
      <div class="splash-sub mono">قضية جريمة تفاعلية</div>
      <div class="splash-prompt mono">اضغط في أي مكان للبدء ←</div>
    </div>
  `);
  const splash = document.getElementById('splash');
  const dismiss = ()=>{
    splash.classList.add('hide');
    setTimeout(()=>{ splash.remove(); startPrologue(); }, 500);
  };
  splash.addEventListener('click', dismiss);
  splash.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') dismiss(); });
}

let prologueSkip = null;

function typeTextSkippable(el, text, speed, onDone){
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i=0, finished=false, timer=null;
  function finish(){ if(finished) return; finished=true; clearTimeout(timer); el.textContent=text; if(onDone) onDone(); }
  if(reduced){ finish(); return finish; }
  (function step(){
    if(finished) return;
    if(i<=text.length){ el.textContent=text.slice(0,i); i++; timer=setTimeout(step, speed); }
    else finish();
  })();
  return finish;
}

function startPrologue(){
  if(!CASE.prologue || !CASE.prologue.length){ mountGameShell(); return; }
  document.body.insertAdjacentHTML('beforeend', `
    <div id="prologue" class="prologue" style="display:flex;">
      <div class="prologue-bg" id="prologueBg"></div>
      <div class="prologue-content" id="prologueContent">
        <div class="prologue-scene mono" id="prologueScene"></div>
        <p class="prologue-text" id="prologueText"></p>
        <button class="btn prologue-next" id="prologueNext">التالي ←</button>
      </div>
      <div class="prologue-progress" id="prologueProgress"></div>
    </div>
  `);
  game.prologueIdx = 0;
  showPrologueSlide(0);
  document.getElementById('prologueContent').addEventListener('click', e=>{
    if(e.target.id==='prologueNext') return;
    if(prologueSkip) prologueSkip();
  });
  document.getElementById('prologueNext').addEventListener('click', ()=>{
    game.prologueIdx++;
    if(game.prologueIdx < CASE.prologue.length) showPrologueSlide(game.prologueIdx);
    else endPrologue();
  });
}

function showPrologueSlide(i){
  const s = CASE.prologue[i];
  document.getElementById('prologueBg').style.backgroundImage = s.img ? `url('${s.img}')` : 'none';
  document.getElementById('prologueScene').textContent = s.scene;
  const nextBtn = document.getElementById('prologueNext');
  nextBtn.classList.remove('show');
  nextBtn.textContent = (i === CASE.prologue.length-1) ? 'افتح ملف القضية ←' : 'التالي ←';
  document.getElementById('prologueProgress').innerHTML =
    CASE.prologue.map((_,idx)=>`<div class="dot ${idx===i?'active':''}"></div>`).join('');
  const textEl = document.getElementById('prologueText');
  prologueSkip = typeTextSkippable(textEl, s.text, 22, ()=>{ nextBtn.classList.add('show'); });
}

function endPrologue(){
  const p = document.getElementById('prologue');
  p.classList.add('hide');
  setTimeout(()=>{ p.remove(); mountGameShell(); }, 500);
}

/* ============================================================
   GAME SHELL (tabs + panel), mounted after splash/prologue
   ============================================================ */

function mountGameShell(){
  appRoot.innerHTML = `
    <div class="masthead">
      <div>
        <div class="case-no mono">${CASE.caseNo} — ${CASE.subtitle}</div>
        <h1 class="flicker">${CASE.title}</h1>
      </div>
      <div class="stat-line">
        <button class="btn ghost" id="backToLibrary" style="font-size:12px; padding:6px 12px;">← الأرشيف</button>
        <span class="status-dot"></span>
        <span id="evCount" class="mono">0 / ${CASE.evidence.length}</span> أدلة مجمّعة
      </div>
    </div>
    <div class="tabs" id="tabs"></div>
    <div class="panel" id="panelBody"></div>
  `;
  document.getElementById('backToLibrary').addEventListener('click', ()=>{
    persistProgress();
    app.unlockedIds = getUnlockedIds();
    app.completedIds = getCompletedIds();
    showLibrary();
  });
  render();
}

/* ============================================================
   RENDER ROOT
   ============================================================ */

const TAB_ORDER = ['briefing','evidence','suspects','audio','accusation','ending'];

function render(){
  renderTabs();
  renderPanel();
  document.getElementById('evCount').textContent = game.collected.size + ' / ' + CASE.evidence.length;
}

function typeText(el, text, speed, onDone){
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){ el.textContent = text; if(onDone) onDone(); return; }
  let i=0;
  el.textContent = '';
  (function step(){
    if(i<=text.length){ el.textContent = text.slice(0,i); i++; setTimeout(step, speed); }
    else if(onDone){ onDone(); }
  })();
}

function renderTabs(){
  const tabsEl = document.getElementById('tabs');
  const audioAvailable = CASE.audioPuzzle && CASE.audioPuzzle.enabled;
  const audioUnlocked = audioAvailable && game.collected.has(evidenceThatUnlocksAudio());
  const accUnlocked = game.collected.size >= Math.min(5, CASE.evidence.length);
  const defs = [
    {id:'briefing', label:'ملف القضية'},
    {id:'evidence', label:'لوحة الأدلة'},
    {id:'suspects', label:'المشتبه بهم'},
  ];
  if(audioAvailable) defs.push({id:'audio', label:'تحليل صوتي', locked: !audioUnlocked});
  defs.push({id:'accusation', label:'الاتهام', locked: !accUnlocked});

  tabsEl.innerHTML = defs.map(d=>{
    const active = game.screen===d.id ? 'active':'';
    const disabled = d.locked ? 'disabled' : '';
    return `<button class="tab ${active}" ${disabled} data-tab="${d.id}">${d.label}</button>`;
  }).join('');
  tabsEl.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{ game.screen = btn.dataset.tab; render(); });
  });
}

function evidenceThatUnlocksAudio(){
  const ev = CASE.evidence.find(e=>e.unlocksAudio);
  return ev ? ev.id : null;
}

function renderPanel(){
  const el = document.getElementById('panelBody');
  const newIndex = TAB_ORDER.indexOf(game.screen);
  el.classList.remove('slide-r','slide-l');
  void el.offsetWidth;
  if(newIndex >= 0){
    el.classList.add(newIndex >= game.lastTabIndex ? 'slide-r' : 'slide-l');
    game.lastTabIndex = newIndex;
  }
  if(game.screen==='briefing') el.innerHTML = briefingHTML();
  else if(game.screen==='evidence') el.innerHTML = evidenceHTML();
  else if(game.screen==='suspects') el.innerHTML = suspectsHTML();
  else if(game.screen==='audio') el.innerHTML = audioHTML();
  else if(game.screen==='accusation') el.innerHTML = accusationHTML();
  else if(game.screen==='ending') el.innerHTML = endingHTML();

  attachPanelEvents();
  if(game.screen==='briefing') runBriefingTypewriter();
}

/* ============================================================
   BRIEFING
   ============================================================ */

function briefingHTML(){
  return `
    <div class="hero-banner">
      <img src="${CASE.briefing.heroImg}" class="photo-tone" alt="${CASE.title}" loading="lazy">
      <div class="hero-caption mono">${CASE.briefing.heroCaption}</div>
    </div>
    <h2>ملخص الواقعة</h2>
    <p id="briefP1"></p>
    <p id="briefP2"></p>
    <div class="divider"></div>
    <div class="brief-meta">
      ${CASE.briefing.meta.map(m=>`<div class="item"><div class="label">${m.label}</div><div class="value">${m.value}</div></div>`).join('')}
    </div>
    <div class="divider"></div>
    <h3>مهمتك</h3>
    <p class="dim">افحص مسرح الجريمة، استجوّب المشتبه بهم، وحلل الأدلة بعناية. الحقيقة غالبًا بتختبي في التفاصيل اللي محدش بيسمعها كويس.</p>
    <div class="divider"></div>
    <button class="btn" data-goto="evidence">ابدأ التحقيق ←</button>
  `;
}

function runBriefingTypewriter(){
  const p1 = document.getElementById('briefP1');
  const p2 = document.getElementById('briefP2');
  if(!p1||!p2) return;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(game.briefingTyped || reduced){
    p1.textContent = CASE.briefing.text1;
    p2.textContent = CASE.briefing.text2;
    return;
  }
  game.briefingTyped = true;
  let i=0,j=0;
  p1.innerHTML = '<span class="type-cursor"></span>';
  (function step1(){
    if(i<=CASE.briefing.text1.length){ p1.textContent = CASE.briefing.text1.slice(0,i); i++; setTimeout(step1,14); }
    else{ p2.innerHTML='<span class="type-cursor"></span>'; step2(); }
  })();
  function step2(){
    if(j<=CASE.briefing.text2.length){ p2.textContent = CASE.briefing.text2.slice(0,j); j++; setTimeout(step2,12); }
  }
}

/* ============================================================
   EVIDENCE
   ============================================================ */

function evidenceById(id){ return CASE.evidence.find(e=>e.id===id); }
function suspectById(id){ return CASE.suspects.find(s=>s.id===id); }

// بعض الشخصيات (زي شخصيات فولكلورية/كوميدية) ممكن متكونش ليها صورة —
// في الحالة دي بيتعرض إيموجي بدلها (avatarEmoji في بيانات القضية)
function avatarMarkup(s, cls){
  if(s.img) return `<img class="${cls} photo-tone" src="${s.img}" alt="${s.name}" loading="lazy">`;
  return `<div class="${cls}" style="display:flex;align-items:center;justify-content:center;background:var(--panel-2);font-size:28px;">${s.avatarEmoji || '❓'}</div>`;
}

function collect(id, opts={}){
  if(!game.collected.has(id)){
    game.collected.add(id);
    if(!opts.silent){
      const ev = evidenceById(id);
      if(ev) showToast('دليل جديد: ' + ev.title, ev.crit ? 'danger' : 'amber');
      maybeShowVillageRumor();
    }
    persistProgress();
  }
}

// طابع "قهوة البلد" — شائعة عشوائية بتظهر بعد جمع دليل، بس للقضايا اللي فيها CASE.rumors
// (مش دليل حقيقي، مجرد جو عام؛ اختياري تمامًا ومفيهوش أي تأثير على منطق اللعبة)
function maybeShowVillageRumor(){
  if(!CASE.rumors || !CASE.rumors.length) return;
  if(Math.random() > 0.55) return; // مش كل مرة، عشان متبقاش مزعجة
  const remaining = CASE.rumors
    .map((text,i)=>i)
    .filter(i=>!game.rumorsShown.has(i));
  if(!remaining.length) return;
  const idx = remaining[Math.floor(Math.random()*remaining.length)];
  game.rumorsShown.add(idx);
  setTimeout(()=>{
    showToast('📢 من قهوة البلد: ' + CASE.rumors[idx], 'rumor');
  }, 2600);
}

function showToast(text, tone){
  let wrap = document.getElementById('toastWrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (tone==='danger' ? ' danger' : tone==='rumor' ? ' rumor' : '');
  t.textContent = text;
  wrap.appendChild(t);
  setTimeout(()=>t.remove(), 3400);
}

function evidenceHTML(){
  const sorted = [...CASE.evidence].sort((a,b)=>a.order-b.order);
  const cards = sorted.map(ev=>{
    if(game.collected.has(ev.id)){
      const thumb = ev.img ? `<img class="ev-thumb photo-tone" src="${ev.img}" alt="${ev.title}" loading="lazy">` : '';
      return `<div class="ev-card" data-ev="${ev.id}">
        ${thumb}
        <div class="tag ${ev.crit?'crit':''}">${ev.tag}${ev.crit?' · حاسم':''}</div>
        <h4>${ev.title}</h4>
        <div class="preview">${ev.short}</div>
      </div>`;
    }
    return `<div class="ev-locked">🔒 دليل غير مكتشف بعد</div>`;
  }).join('');
  return `
    <h2>لوحة الأدلة</h2>
    <p class="dim">فحص الأدلة بيساعدك تبني الصورة الكاملة. بعض الأدلة بتتكشف من خلال استجواب المشتبه بهم.</p>
    <div class="divider"></div>
    <div class="ev-grid">${cards}</div>
  `;
}

function openEvidenceModal(id){
  const ev = evidenceById(id);
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const modalImg = ev.img ? `<img class="ev-thumb photo-tone" style="height:180px;" src="${ev.img}" alt="${ev.title}" loading="lazy">` : '';
  overlay.innerHTML = `
    <div class="modal">
      ${modalImg}
      <div class="tag ${ev.crit?'crit':''}" style="color:${ev.crit?'var(--danger)':'var(--signal)'}">${ev.tag}${ev.crit?' · دليل حاسم':''}</div>
      <h3>${ev.title}</h3>
      <p>${ev.full}</p>
      <button class="btn close-btn">إغلاق</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('.close-btn').addEventListener('click', ()=>overlay.remove());
}

/* ============================================================
   SUSPECTS
   ============================================================ */

function suspectsHTML(){
  if(game.activeSuspect) return interrogationHTML(game.activeSuspect);
  const cards = CASE.suspects.map(s=>{
    const done = game.interrogated[s.id] ? game.interrogated[s.id].size : 0;
    const total = s.questions.length;
    return `<div class="sus-card" data-suspect="${s.id}">
      ${avatarMarkup(s, 'avatar-photo')}
      <h4>${s.name}</h4>
      <div class="role">${s.role}</div>
      ${done>0?`<div class="mono" style="font-size:11px;color:var(--signal);margin-top:10px;">${done}/${total} أسئلة</div>`:''}
    </div>`;
  }).join('');
  return `
    <h2>المشتبه بهم</h2>
    <p class="dim">اضغط على أي مشتبه به عشان تبدأ الاستجواب.</p>
    <div class="divider"></div>
    <div class="sus-grid">${cards}</div>
  `;
}

function interrogationHTML(suspectId){
  const s = suspectById(suspectId);
  const answered = game.interrogated[s.id] || new Set();
  const lines = [...answered].sort((a,b)=>a-b).map(idx=>{
    const item = s.questions[idx];
    return `<div class="line q"><div class="who">أنت</div>${item.q}</div>
            <div class="line a"><div class="who">${s.name}</div>${item.a}</div>`;
  }).join('');
  const qButtons = s.questions.map((item,idx)=>{
    const used = answered.has(idx);
    return `<button class="q-btn" data-q="${idx}" ${used?'disabled':''}>${item.q}</button>`;
  }).join('');
  return `
    <button class="btn ghost" data-back-suspects style="margin-bottom:16px;">← رجوع للمشتبه بهم</button>
    <div style="display:flex; align-items:center; gap:14px; margin-bottom:6px;">
      ${avatarMarkup(s, 'avatar-photo small')}
      <div><h2 style="margin-bottom:2px;">${s.name}</h2><span class="dim" style="font-size:14px;">${s.role}</span></div>
    </div>
    <p class="dim">علمة الحضور: ${s.alibi}</p>
    <div class="divider"></div>
    <div class="transcript" id="transcript">
      ${lines || '<p class="dim" style="margin:0;">اسأل أول سؤال عشان تبدأ الاستجواب.</p>'}
    </div>
    <div class="q-grid">${qButtons}</div>
  `;
}

/* ============================================================
   AUDIO PUZZLE (generic — driven by CASE.audioPuzzle)
   ============================================================ */

function buildWave(seed){
  const base = [];
  let s = seed || 7;
  function rnd(){ s = (s*9301+49297)%233280; return s/233280; }
  for(let i=0;i<90;i++) base.push(Math.round(10+rnd()*60));
  const cfg = CASE.audioPuzzle;
  const [srcA, srcB] = cfg.duplicateSourceRange;
  const [tgtA] = cfg.duplicateTargetRange;
  for(let i=0;i<(srcB-srcA);i++) base[tgtA+i] = base[srcA+i];
  return base;
}

function audioHTML(){
  const cfg = CASE.audioPuzzle;
  if(game.audioSolved){
    return `
      <h2>تحليل صوتي — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const wave = buildWave();
  const w=900,h=200,step=w/wave.length;
  const points = wave.map((v,i)=>`${(i*step).toFixed(1)},${(h-v).toFixed(1)}`).join(' ');
  return `
    <h2>تحليل صوتي — أرشيف البث</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="wave-wrap">
      <div class="wave-beam"></div>
      <svg viewBox="0 0 ${w} ${h}" id="waveSvg">
        <polyline points="${points}" fill="none" stroke="var(--signal)" stroke-width="2" opacity="0.9"/>
        <line x1="0" y1="${h}" x2="${w}" y2="${h}" stroke="var(--line)" stroke-width="1"/>
      </svg>
      <div class="wave-hint mono">اضغط في أي مكان على الموجة للتأكيد</div>
      <div class="wave-feedback" id="waveFeedback"></div>
    </div>
  `;
}

function handleWaveClick(e){
  const cfg = CASE.audioPuzzle;
  const svg = document.getElementById('waveSvg');
  const rect = svg.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width;
  const t = relX * 90;
  const feedback = document.getElementById('waveFeedback');
  if(t >= cfg.matchStart && t <= cfg.matchEnd){
    feedback.textContent = '✓ ظبطت المقطع. الموجة دي مكررة حرفيًا من دقيقة قبل كده.';
    feedback.className = 'wave-feedback ok';
    game.audioSolved = true;

    const wave = buildWave();
    const w=900,h=200,step=w/wave.length;
    const [srcA,srcB] = cfg.duplicateSourceRange;
    const [tgtA,tgtB] = cfg.duplicateTargetRange;
    const seg1 = wave.slice(srcA,srcB).map((v,i)=>`${((srcA+i)*step).toFixed(1)},${(h-v).toFixed(1)}`).join(' ');
    const seg2 = wave.slice(tgtA,tgtB).map((v,i)=>`${((tgtA+i)*step).toFixed(1)},${(h-v).toFixed(1)}`).join(' ');
    const ns = 'http://www.w3.org/2000/svg';
    [seg1,seg2].forEach(pts=>{
      const hl = document.createElementNS(ns,'polyline');
      hl.setAttribute('points', pts);
      hl.setAttribute('fill','none');
      hl.setAttribute('stroke','var(--danger)');
      hl.setAttribute('stroke-width','3');
      hl.setAttribute('class','wave-match');
      svg.appendChild(hl);
    });
    requestAnimationFrame(()=>svg.querySelectorAll('.wave-match').forEach(el=>el.classList.add('show')));

    triggerFlash('good');
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ لسه مش هنا. جرّب مكان تاني في الموجة.';
    feedback.className = 'wave-feedback bad';
  }
}

function triggerFlash(tone){
  const f = document.createElement('div');
  f.className = 'flash ' + tone + ' go';
  document.body.appendChild(f);
  setTimeout(()=>f.remove(), 900);
}

/* ============================================================
   ACCUSATION
   ============================================================ */

function accusationHTML(){
  const suspectPicks = CASE.suspects.map(s=>{
    const sel = game.accSuspect===s.id ? 'selected':'';
    return `<button class="pick ${sel}" data-pick-suspect="${s.id}">${s.name}</button>`;
  }).join('');
  const collectedList = [...CASE.evidence].filter(e=>game.collected.has(e.id)).sort((a,b)=>a.order-b.order);
  const evPicks = collectedList.map(ev=>{
    const sel = game.accEvidence.has(ev.id) ? 'selected':'';
    return `<button class="pick ev ${sel}" data-pick-ev="${ev.id}">${ev.title}</button>`;
  }).join('');
  const canSubmit = game.accSuspect && game.accEvidence.size>0;
  return `
    <h2>لحظة الاتهام</h2>
    <p class="dim">اختار المشتبه به اللي هتتهمه، وابعت الأدلة اللي هتقدمها كإثبات (لغاية 3 أدلة).</p>
    <div class="divider"></div>
    <h3>المتهم</h3>
    <div class="acc-suspects">${suspectPicks}</div>
    <h3>الأدلة المقدَّمة</h3>
    <div class="acc-evidence">${evPicks}</div>
    <button class="btn" id="submitAcc" ${canSubmit?'':'disabled'}>قدّم الاتهام النهائي</button>
  `;
}

function computeEnding(){
  const el = document.getElementById('panelBody');
  el.classList.remove('slide-r','slide-l');
  el.innerHTML = `<div class="verdict-loading"><div class="verdict-scan"></div><p class="mono dim" id="verdictText">جارِ مراجعة الأدلة</p></div>`;
  const vt = document.getElementById('verdictText');
  let dots=0;
  const dotTimer = setInterval(()=>{ dots=(dots+1)%4; vt.textContent='جارِ مراجعة الأدلة'+'.'.repeat(dots); }, 260);

  setTimeout(()=>{
    clearInterval(dotTimer);
    const correctSuspect = game.accSuspect === CASE.correctSuspectId;
    const conclusiveSet = new Set(CASE.conclusiveEvidenceIds);
    const hits = [...game.accEvidence].filter(id=>conclusiveSet.has(id)).length;
    if(correctSuspect && hits>=2) game.ending='good';
    else if(correctSuspect) game.ending='partial';
    else game.ending='bad';

    game.screen='ending';
    persistProgress();
    render();
    triggerFlash(game.ending);
  }, 1500);
}

/* ============================================================
   ENDING
   ============================================================ */

function endingHTML(){
  const e = CASE.endings[game.ending];
  const all = game.collected.size === CASE.evidence.length;
  const bonus = all ? `<p class="dim" style="margin-top:14px;">جمعت كل الأدلة — تحقيق دقيق بجد.</p>` : '';
  const wrongSuspect = game.accSuspect ? suspectById(game.accSuspect) : null;
  const wrongName = wrongSuspect ? wrongSuspect.name : '—';
  // لو المشتبه به الغلط عنده رد مخصص (loseMsg)، بيتستخدم بدل النص العام بتاع القضية
  const paragraphs = (game.ending==='bad' && wrongSuspect && wrongSuspect.loseMsg)
    ? `<p>${wrongSuspect.loseMsg}</p>`
    : e.paragraphs.map(p=>`<p>${p.replace('{wrongName}', wrongName)}</p>`).join('');
  const hint = e.hint ? `<p class="dim">${e.hint}</p>` : '';
  return `
    <div class="stamp ${game.ending} mono">${e.stamp}</div>
    <div class="ending-badge ${game.ending} mono">${e.badgeLabel}</div>
    <div class="ending-title ${game.ending}">${e.title}</div>
    ${paragraphs}
    ${hint}
    ${bonus}
    <div class="divider"></div>
    <button class="btn ghost" data-restart>ابدأ القضية دي من الأول</button>
    <button class="btn" data-back-to-lib style="margin-right:10px;">رجوع للأرشيف</button>
  `;
}

/* ============================================================
   EVENTS
   ============================================================ */

function attachPanelEvents(){
  document.querySelectorAll('[data-goto]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ game.screen = btn.dataset.goto; render(); });
  });
  document.querySelectorAll('[data-ev]').forEach(card=>{
    card.addEventListener('click', ()=> openEvidenceModal(card.dataset.ev));
  });
  document.querySelectorAll('[data-suspect]').forEach(card=>{
    card.addEventListener('click', ()=>{ game.activeSuspect = card.dataset.suspect; render(); });
  });
  const backBtn = document.querySelector('[data-back-suspects]');
  if(backBtn) backBtn.addEventListener('click', ()=>{ game.activeSuspect=null; render(); });

  document.querySelectorAll('.q-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.q,10);
      const s = suspectById(game.activeSuspect);
      if(!game.interrogated[s.id]) game.interrogated[s.id] = new Set();
      if(game.interrogated[s.id].has(idx)) return;
      game.interrogated[s.id].add(idx);
      const item = s.questions[idx];
      btn.disabled = true;

      const transcript = document.getElementById('transcript');
      if(transcript){
        const placeholder = transcript.querySelector('p.dim');
        if(placeholder) placeholder.remove();
        const qLine = document.createElement('div');
        qLine.className='line q';
        qLine.innerHTML = `<div class="who">أنت</div>${item.q}`;
        const aLine = document.createElement('div');
        aLine.className='line a';
        aLine.innerHTML = `<div class="who">${s.name}</div><span></span>`;
        transcript.appendChild(qLine);
        transcript.appendChild(aLine);
        transcript.scrollTop = transcript.scrollHeight;
        typeText(aLine.querySelector('span'), item.a, 10, ()=>{ transcript.scrollTop = transcript.scrollHeight; });
        const scrollTimer = setInterval(()=>{ transcript.scrollTop = transcript.scrollHeight; },120);
        setTimeout(()=>clearInterval(scrollTimer), item.a.length*10+200);
      }
      if(item.unlockId) collect(item.unlockId);
      persistProgress();
      renderTabs();
      document.getElementById('evCount').textContent = game.collected.size + ' / ' + CASE.evidence.length;
    });
  });

  const waveSvg = document.getElementById('waveSvg');
  if(waveSvg) waveSvg.addEventListener('click', handleWaveClick);

  document.querySelectorAll('[data-pick-suspect]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ game.accSuspect = btn.dataset.pickSuspect; render(); game.screen='accusation'; });
  });
  document.querySelectorAll('[data-pick-ev]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.pickEv;
      if(game.accEvidence.has(id)) game.accEvidence.delete(id);
      else if(game.accEvidence.size<3) game.accEvidence.add(id);
      render(); game.screen='accusation';
    });
  });
  const submitBtn = document.getElementById('submitAcc');
  if(submitBtn) submitBtn.addEventListener('click', computeEnding);

  const restartBtn = document.querySelector('[data-restart]');
  if(restartBtn) restartBtn.addEventListener('click', ()=>{
    game = freshGameState();
    ensureSceneEvidence();
    persistProgress();
    render();
  });
  const backLibBtn = document.querySelector('[data-back-to-lib]');
  if(backLibBtn) backLibBtn.addEventListener('click', ()=>{
    app.unlockedIds = getUnlockedIds();
    app.completedIds = getCompletedIds();
    showLibrary();
  });
}

/* ============================================================
   GO
   ============================================================ */

boot();
