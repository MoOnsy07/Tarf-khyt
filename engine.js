/* ============================================================
   المحرك العام — بيشتغل مع أي قضية متوصفة بنفس الـ schema
   (شوف cases/case-last-episode.js كنموذج)
   لا تكتبش قصة أو بيانات هنا؛ الملف ده للمنطق بس.
   ============================================================ */

const app = {
  view: 'loading',      // loading | library | case
  unlockedIds: [],
  completedIds: [],
  libraryFilter: 'all', // فلتر المكتبة الحالي
};

// تسميات التصنيفات — ضيف هنا أي تصنيف جديد تستخدمه في CASE.categories
const CATEGORY_LABELS = {
  murder:'قتل', theft:'سرقة', comedy:'فكاهية', disappearance:'اختفاء',
  social:'اجتماعية', scandal:'فضيحة',
};

let CASE = null;         // القضية الحالية (object)
let game = null;         // حالة اللعب داخل القضية الحالية

/* ============================================================
   AMBIENCE — صوت خلفية مخصص لكل قضية، بيشتغل وقت الإنترو بس
   وبيهدى تلقائي (fade) لما تدخل شاشة اللعب. عرّفه في بيانات
   القضية بـ CASE.introAmbience. لو مش معرّف، مفيش صوت خالص.
   ============================================================ */

const SFX_KEY = 'ca_sfx_enabled';
// صوت تشويقي واحد ثابت لإنترو أي قضية. أي قضية تقدر تكسر القاعدة
// وتحط صوت خاص بيها عن طريق CASE.introAmbience لو حبيت تنويع بعدين.
const DEFAULT_INTRO_AMBIENCE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/sfx/intro-ambience.mp3';
function sfxEnabled(){
  const v = localStorage.getItem(SFX_KEY);
  return v === null ? true : v === '1';
}
function setSfxEnabled(val){
  localStorage.setItem(SFX_KEY, val ? '1' : '0');
  if(!val) stopAmbience();
}

let ambienceAudio = null;
let ambienceFadeTimer = null;

function fadeAudio(audio, from, to, duration, onDone){
  clearInterval(ambienceFadeTimer);
  const steps = 20, stepTime = duration/steps, diff = to-from;
  let i = 0;
  ambienceFadeTimer = setInterval(()=>{
    i++;
    audio.volume = Math.max(0, Math.min(1, from + diff*(i/steps)));
    if(i>=steps){ clearInterval(ambienceFadeTimer); if(onDone) onDone(); }
  }, stepTime);
}

// بيشتغل مرة واحدة بس وقت الإنترو، لو القضية معرّفة CASE.introAmbience
function startAmbience(src, targetVolume){
  stopAmbience();
  if(!sfxEnabled() || !src) return;
  try{
    ambienceAudio = new Audio(src);
    ambienceAudio.loop = true;
    ambienceAudio.volume = 0;
    ambienceAudio.play().catch(()=>{});
    fadeAudio(ambienceAudio, 0, targetVolume != null ? targetVolume : 0.35, 900);
  }catch(e){}
}

function stopAmbience(){
  if(!ambienceAudio) return;
  const toStop = ambienceAudio;
  fadeAudio(toStop, toStop.volume, 0, 600, ()=>{ toStop.pause(); });
  ambienceAudio = null;
}

function freshGameState(){
  return {
    screen:'briefing',
    lastTabIndex:0,
    collected:new Set(),
    interrogated:{},
    audioSolved:false,
    cameraSolved:false,
    activeSuspect:null,
    accSuspect:null,
    accEvidence:new Set(),
    ending:null,
    prologueIdx:0,
    rumorsShown:new Set(), // اختياري — بس للقضايا اللي فيها CASE.rumors (طابع "قهوة البلد")
    points:null,           // نقاط تحقيق — بتتظبط في enterCase لو CASE.investigationPoints موجودة
    confronted:{},         // suspectId -> Set(evidenceId) — الأدلة اللي واجهت بيها كل شخص
    connections:{},        // evidenceId -> suspectId — روابط لوحة التحقيق (الخيوط)
    boardSelected:null,    // دليل متحدد حاليًا على اللوحة، مستني تربطه بشخص
    hintsUsed:0,
    contradictionSolved:false,
    contradictionSelected:[],
    classifications:{},    // suspectId -> 'strong' | 'weak' | 'cleared' — تصنيف اللاعب الشخصي، دفتر التحقيق
    interrogationClosed:{}, // suspectId -> true — الشخصية قفلت الكلام بعد سؤال معيّن (question.closesInterrogation)
    timelineOrder: (CASE && CASE.timelinePuzzle && CASE.timelinePuzzle.enabled) ? shuffleArray(CASE.timelinePuzzle.events.map(e=>e.id)) : [],
    timelineSolved:false,
    theoryAnswers:{},      // questionId -> optionId — إجابات بناء نظرية الجريمة (اختياري، CASE.theoryBuilder)
  };
}

function shuffleArray(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
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

// آخر قضية كانت مفتوحة — بتتسجل عشان لو المستخدم عمل ريفريش
// وهو لسه بيحقق، نرجّعه لنفس القضية بدل ما نرميه على الأرشيف
const ACTIVE_CASE_KEY = 'ca_active_case';
function setActiveCase(caseId){
  localStorage.setItem(ACTIVE_CASE_KEY, caseId);
}
function clearActiveCase(){
  localStorage.removeItem(ACTIVE_CASE_KEY);
}
function getActiveCase(){
  return localStorage.getItem(ACTIVE_CASE_KEY);
}

/* ============================================================
   FONT SIZE — تفضيل حجم الخط، محفوظ ومطبّق على شكل zoom عام
   بيغطي كل عناصر المنصة من غير ما نحتاج نعيد كتابة الـ CSS كله
   ============================================================ */

const FONT_SIZE_KEY = 'ca_font_size';
function getFontSize(){
  return localStorage.getItem(FONT_SIZE_KEY) || 'normal';
}
function setFontSize(size){
  localStorage.setItem(FONT_SIZE_KEY, size);
  applyFontSize();
}
function applyFontSize(){
  appRoot.classList.remove('text-small','text-large');
  const s = getFontSize();
  if(s==='small') appRoot.classList.add('text-small');
  if(s==='large') appRoot.classList.add('text-large');
}

/* ============================================================
   BOOT
   ============================================================ */

function boot(){
  app.unlockedIds = getUnlockedIds();
  app.completedIds = getCompletedIds();
  applyFontSize();

  // لو كان فيه قضية شغالة قبل الريفريش، رجّع المستخدم لها تاني بدل الأرشيف
  const activeCaseId = getActiveCase();
  const activeCase = activeCaseId ? CASES_REGISTRY.find(c => c.id === activeCaseId) : null;
  if(activeCase && !isCaseLocked(activeCase).locked){
    enterCase(activeCase);
  } else {
    clearActiveCase();
    showLibrary();
  }
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

  // بناء قايمة الفلاتر المتاحة فعليًا (بس اللي عنده قضية واحدة على الأقل)
  const hasFree = CASES_REGISTRY.some(c=>!c.isPremium);
  const hasPremium = CASES_REGISTRY.some(c=>c.isPremium);
  const usedCategories = [...new Set(CASES_REGISTRY.flatMap(c=>c.categories||[]))];
  const filters = [{key:'all', label:'الكل'}];
  if(hasFree) filters.push({key:'free', label:'مجانية'});
  if(hasPremium) filters.push({key:'premium', label:'مدفوعة'});
  usedCategories.forEach(cat=>{
    filters.push({key:cat, label: CATEGORY_LABELS[cat] || cat});
  });

  function matchesFilter(c){
    if(app.libraryFilter==='all') return true;
    if(app.libraryFilter==='free') return !c.isPremium;
    if(app.libraryFilter==='premium') return !!c.isPremium;
    return (c.categories||[]).includes(app.libraryFilter);
  }

  const filterBar = filters.map(f=>
    `<button class="lib-filter ${app.libraryFilter===f.key?'active':''}" data-filter="${f.key}">${f.label}</button>`
  ).join('');

  const visibleCases = CASES_REGISTRY.filter(matchesFilter);

  const cards = visibleCases.map(c=>{
    const lock = isCaseLocked(c);
    const badges = [];
    if(c.isPremium) badges.push(`<span class="lib-badge premium mono">PREMIUM</span>`);
    if(c.isPremium && c.discountLabel) badges.push(`<span class="lib-badge discount mono">${c.discountLabel}</span>`);
    if(c.seriesId) badges.push(`<span class="lib-badge series mono">الحلقة ${c.seriesOrder}</span>`);
    if(c.contentWarning) badges.push(`<span class="lib-badge adult mono">+18</span>`);
    const priceHTML = (c.isPremium && c.price)
      ? `<div class="lib-price mono">${c.oldPrice ? `<span class="old">${c.oldPrice}</span> ` : ''}${c.price}</div>`
      : '';
    const lockOverlay = lock.locked ? `
      <div class="lib-lock-overlay">
        <div style="font-size:22px;">🔒</div>
        ${lock.reason==='premium'
          ? `<div>قضية بريميوم<br><span class="mono" style="color:var(--amber);">${c.price ? 'اضغط للشراء — '+c.price : 'اضغط للشراء'}</span></div>`
          : '<div>خلّص الحلقة اللي قبلها الأول</div>'}
      </div>` : '';
    return `
      <div class="lib-card" data-case="${c.id}" data-locked="${lock.locked}" data-lock-reason="${lock.reason||''}">
        ${badges.join('')}
        <div class="cover"><img src="${c.coverImg}" class="photo-tone" alt="${c.title}" loading="lazy"></div>
        <div class="body">
          <h4>${c.title}</h4>
          <div class="meta">${c.caseNo} · ${c.estMinutes} دقيقة · ${c.difficulty}</div>
          ${priceHTML}
        </div>
        ${lockOverlay}
      </div>
    `;
  }).join('') || `<p class="dim" style="grid-column:1/-1; text-align:center; padding:30px 0;">مفيش قضايا في التصنيف ده لسه.</p>`;

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
    <div class="lib-filters">${filterBar}</div>
    <div class="lib-grid">${cards}</div>
  `;

  document.querySelectorAll('.lib-filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      app.libraryFilter = btn.dataset.filter;
      showLibrary();
    });
  });

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
  const waText = encodeURIComponent(
    caseData.price
      ? `عايز أشتري قضية "${caseData.title}" (${caseData.price})`
      : `عايز أشتري قضية "${caseData.title}"`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
  const priceHTML = caseData.price ? `
    <div style="text-align:center; margin:10px 0 4px;">
      ${caseData.oldPrice ? `<span class="mono" style="color:var(--ink-dim); text-decoration:line-through; font-size:14px; margin-left:8px;">${caseData.oldPrice}</span>` : ''}
      <span class="mono" style="color:var(--amber); font-size:22px; font-weight:800;">${caseData.price}</span>
      ${caseData.discountLabel ? `<div class="mono" style="color:var(--signal); font-size:11px; margin-top:4px;">${caseData.discountLabel}</div>` : ''}
    </div>` : '';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="tag" style="color:var(--amber);">قضية بريميوم</div>
      <h3>${caseData.title}</h3>
      ${priceHTML}
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
  setActiveCase(caseData.id);
  game = freshGameState();
  game.points = CASE.investigationPoints != null ? CASE.investigationPoints : null;

  const saved = loadLocalProgress(CASE.id);
  if(saved){
    game.collected = new Set(saved.collected || []);
    game.interrogated = {};
    Object.entries(saved.interrogated || {}).forEach(([sid, arr])=>{ game.interrogated[sid] = new Set(arr); });
    game.audioSolved = !!saved.audioSolved;
    game.cameraSolved = !!saved.cameraSolved;
    game.ending = saved.ending || null;
    if(saved.points != null) game.points = saved.points;
    game.confronted = {};
    Object.entries(saved.confronted || {}).forEach(([sid, arr])=>{ game.confronted[sid] = new Set(arr); });
    game.connections = saved.connections || {};
    game.hintsUsed = saved.hintsUsed || 0;
    game.contradictionSolved = !!saved.contradictionSolved;
    game.classifications = saved.classifications || {};
    game.interrogationClosed = saved.interrogationClosed || {};
    if(saved.timelineOrder && saved.timelineOrder.length) game.timelineOrder = saved.timelineOrder;
    game.timelineSolved = !!saved.timelineSolved;
    game.theoryAnswers = saved.theoryAnswers || {};
  } else if(!CASE.isPremium){
    addUnlockedId(CASE.id); // قضية مجانية، تتسجل كمفتوحة أول ما تتلعب
    app.unlockedIds = getUnlockedIds();
  }

  // أدلة مسرح الجريمة (unlocked:true) لازم تكون متجمّعة من البداية دايمًا،
  // سواء قضية جديدة أو تقدّم متسجل قبل كده (بيتم دمجها بهدوء من غير toast)
  ensureSceneEvidence();

  if(CASE.contentWarning) showContentWarning();
  else showCaseSplash();
}

function showContentWarning(){
  app.view = 'case';
  appRoot.innerHTML = '';
  document.body.insertAdjacentHTML('beforeend', `
    <div id="warnGate" class="splash" style="cursor:default;" tabindex="-1">
      <div class="splash-caseno mono">${CASE.caseNo} — تنبيه محتوى</div>
      <h1 class="splash-title" style="font-size:clamp(24px,5vw,36px); color:var(--danger);">⚠ محتوى للكبار (+18)</h1>
      <p style="max-width:480px; color:var(--ink-dim); line-height:2; font-size:14px; margin:18px 0 30px; text-align:center;">${CASE.contentWarning}</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
        <button class="btn ghost" id="warnBack">رجوع للأرشيف</button>
        <button class="btn" id="warnContinue">فهمت، كمّل ←</button>
      </div>
    </div>
  `);
  document.getElementById('warnContinue').addEventListener('click', ()=>{
    document.getElementById('warnGate').remove();
    showCaseSplash();
  });
  document.getElementById('warnBack').addEventListener('click', ()=>{
    document.getElementById('warnGate').remove();
    clearActiveCase();
    showLibrary();
  });
}

function persistProgress(){
  saveLocalProgress(CASE.id, {
    collected: [...game.collected],
    interrogated: Object.fromEntries(Object.entries(game.interrogated).map(([k,v])=>[k,[...v]])),
    audioSolved: game.audioSolved,
    cameraSolved: game.cameraSolved,
    ending: game.ending,
    points: game.points,
    confronted: Object.fromEntries(Object.entries(game.confronted).map(([k,v])=>[k,[...v]])),
    connections: game.connections,
    hintsUsed: game.hintsUsed,
    contradictionSolved: game.contradictionSolved,
    classifications: game.classifications,
    interrogationClosed: game.interrogationClosed,
    timelineOrder: game.timelineOrder,
    timelineSolved: game.timelineSolved,
    theoryAnswers: game.theoryAnswers,
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
  startAmbience(CASE.introAmbience || DEFAULT_INTRO_AMBIENCE);
  document.body.insertAdjacentHTML('beforeend', `
    <div id="prologue" class="prologue" style="display:flex;">
      <div class="prologue-bg" id="prologueBg"></div>
      <button id="prologueSfxToggle" class="prologue-sfx-btn mono" aria-label="كتم/تشغيل الصوت">${sfxEnabled() ? '🔊' : '🔇'}</button>
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
  document.getElementById('prologueSfxToggle').addEventListener('click', e=>{
    e.stopPropagation();
    setSfxEnabled(!sfxEnabled());
    e.target.textContent = sfxEnabled() ? '🔊' : '🔇';
    if(sfxEnabled()) startAmbience(CASE.introAmbience || DEFAULT_INTRO_AMBIENCE);
  });
}

function showPrologueSlide(i){
  const s = CASE.prologue[i];
  const bg = document.getElementById('prologueBg');
  const content = document.getElementById('prologueContent');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applySlide(){
    bg.style.backgroundImage = s.img ? `url('${s.img}')` : 'none';
    document.getElementById('prologueScene').textContent = s.scene;
    const nextBtn = document.getElementById('prologueNext');
    nextBtn.classList.remove('show');
    nextBtn.textContent = (i === CASE.prologue.length-1) ? 'افتح ملف القضية ←' : 'التالي ←';
    document.getElementById('prologueProgress').innerHTML =
      CASE.prologue.map((_,idx)=>`<div class="dot ${idx===i?'active':''}"></div>`).join('');
    const textEl = document.getElementById('prologueText');
    prologueSkip = typeTextSkippable(textEl, s.text, 22, ()=>{ nextBtn.classList.add('show'); });
  }

  if(reduced){ applySlide(); return; }

  bg.classList.add('fading');
  content.classList.add('fading');
  setTimeout(()=>{
    applySlide();
    requestAnimationFrame(()=>{
      bg.classList.remove('fading');
      content.classList.remove('fading');
    });
  }, 420);
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
  const pointsHTML = CASE.investigationPoints != null
    ? `<span class="status-dot" style="background:var(--danger); box-shadow:0 0 8px var(--danger);"></span><span id="ptsCount" class="mono">${game.points}</span> نقاط تحقيق`
    : '';
  appRoot.innerHTML = `
    <div class="masthead">
      <div>
        <div class="case-no mono">${CASE.caseNo} — ${CASE.subtitle}</div>
        <h1 class="flicker">${CASE.title}</h1>
      </div>
      <div class="stat-line">
        <button class="btn ghost" id="backToLibrary" style="font-size:12px; padding:6px 12px;">← الأرشيف</button>
        <button class="btn ghost" id="settingsBtn" style="font-size:12px; padding:6px 12px;">⚙️ إعدادات</button>
        <button class="btn ghost" id="hintBtn" style="font-size:12px; padding:6px 12px;">💡 تلميح</button>
        <span class="status-dot"></span>
        <span id="evCount" class="mono">0 / ${CASE.evidence.length}</span> أدلة مجمّعة
        ${pointsHTML}
      </div>
    </div>
    <div class="tabs" id="tabs"></div>
    <div class="panel" id="panelBody"></div>
    <button id="notebookFab" class="notebook-fab" title="دفتر التحقيق" aria-label="دفتر التحقيق">📓</button>
  `;
  document.getElementById('notebookFab').addEventListener('click', openNotebook);
  document.getElementById('hintBtn').addEventListener('click', giveHint);
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('backToLibrary').addEventListener('click', ()=>{
    stopAmbience();
    persistProgress();
    clearActiveCase();
    app.unlockedIds = getUnlockedIds();
    app.completedIds = getCompletedIds();
    showLibrary();
  });
  render();
}

/* ============================================================
   RENDER ROOT
   ============================================================ */

const TAB_ORDER = ['briefing','evidence','suspects','audio','camera','contradiction','timeline','accusation','theory','ending'];

function render(){
  renderTabs();
  renderPanel();
  document.getElementById('evCount').textContent = game.collected.size + ' / ' + CASE.evidence.length;
  updatePointsUI();
}

function updatePointsUI(){
  const el = document.getElementById('ptsCount');
  if(el) el.textContent = game.points;
}

// بتحاول تخصم نقطة تحقيق (سؤال استجواب أو مواجهة بدليل). لو القضية مالهاش نظام نقاط
// (CASE.investigationPoints مش متعرّفة)، دايمًا بترجع true من غير أي خصم.
function spendPoint(){
  if(CASE.investigationPoints == null) return true;
  if(game.points <= 0){
    showToast('خلصت نقاط التحقيق — قدّم اتهامك بناءً على اللي جمعته لحد دلوقتي.', 'danger');
    return false;
  }
  game.points--;
  updatePointsUI();
  return true;
}

// نظام تلميحات عام — بيدوّر تلقائي على أول دليل ناقص وبيقولك منين تجيبه،
// من غير ما يحتاج أي محتوى مخصص من القضية نفسها. محدود 3 استخدامات لكل قضية.
const MAX_HINTS = 3;
function giveHint(){
  if(game.hintsUsed >= MAX_HINTS){
    showToast('استخدمت كل التلميحات المتاحة (3) — كمّل بحدسك من هنا.', 'danger');
    return;
  }
  const missing = CASE.evidence.find(e=>!game.collected.has(e.id));
  let msg;
  if(!missing){
    msg = '💡 جمعت كل الأدلة المتاحة! روح للوحة التحقيق وابدأ تربط الخيوط.';
  } else {
    let found = null;
    for(const s of CASE.suspects){
      const qIdx = s.questions.findIndex(q=>q.unlockId===missing.id);
      if(qIdx>=0){ found = { suspect:s, q:s.questions[qIdx] }; break; }
    }
    if(found){
      msg = `💡 جرب تسأل ${found.suspect.name}: "${found.q.q}"`;
    } else if(CASE.cameraPuzzle && CASE.cameraPuzzle.enabled && (CASE.cameraPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.cameraPuzzle.tabLabel || 'تحليل الكاميرات'}".`;
    } else if(CASE.audioPuzzle && CASE.audioPuzzle.enabled && (CASE.audioPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = '💡 جرب تبويب "تحليل صوتي".';
    } else if(CASE.contradictionPuzzle && CASE.contradictionPuzzle.enabled && (CASE.contradictionPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.contradictionPuzzle.tabLabel || 'التناقضات'}".`;
    } else if(CASE.timelinePuzzle && CASE.timelinePuzzle.enabled && (CASE.timelinePuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.timelinePuzzle.tabLabel || 'الخط الزمني'}".`;
    } else {
      msg = '💡 كمّل تستكشف لوحة الأدلة والمشتبه بيهم كويس.';
    }
  }
  game.hintsUsed++;
  persistProgress();
  showToast(msg, 'rumor');
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
  const cameraAvailable = CASE.cameraPuzzle && CASE.cameraPuzzle.enabled;
  const cameraUnlockId = evidenceThatUnlocks('unlocksCamera');
  const cameraUnlocked = cameraAvailable && (!cameraUnlockId || game.collected.has(cameraUnlockId));
  const contraAvailable = CASE.contradictionPuzzle && CASE.contradictionPuzzle.enabled;
  const contraUnlockId = evidenceThatUnlocks('unlocksContradiction');
  const contraUnlocked = contraAvailable && (!contraUnlockId || game.collected.has(contraUnlockId));
  const timelineAvailable = CASE.timelinePuzzle && CASE.timelinePuzzle.enabled;
  const timelineUnlockId = evidenceThatUnlocks('unlocksTimeline');
  const timelineUnlocked = timelineAvailable && (!timelineUnlockId || game.collected.has(timelineUnlockId));
  const accUnlocked = game.collected.size >= Math.max(Math.min(5, CASE.evidence.length), Math.ceil(CASE.evidence.length * 0.75));
  const defs = [
    {id:'briefing', label:'ملف القضية'},
    {id:'evidence', label:'لوحة الأدلة'},
    {id:'suspects', label:'المشتبه بهم'},
  ];
  if(audioAvailable) defs.push({id:'audio', label:'تحليل صوتي', locked: !audioUnlocked});
  if(cameraAvailable) defs.push({id:'camera', label: (CASE.cameraPuzzle.tabLabel || 'تحليل الكاميرات'), locked: !cameraUnlocked});
  if(contraAvailable) defs.push({id:'contradiction', label: (CASE.contradictionPuzzle.tabLabel || 'التناقضات'), locked: !contraUnlocked});
  if(timelineAvailable) defs.push({id:'timeline', label: (CASE.timelinePuzzle.tabLabel || 'الخط الزمني'), locked: !timelineUnlocked});
  defs.push({id:'accusation', label:'لوحة التحقيق', locked: !accUnlocked});

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

// عام: بيدوّر على أي دليل عليه فلاج معيّن (زي unlocksCamera) عشان يفتح تبويب معيّن
function evidenceThatUnlocks(flag){
  const ev = CASE.evidence.find(e=>e[flag]);
  return ev ? ev.id : null;
}

function renderPanel(){
  const el = document.getElementById('panelBody');
  const newIndex = TAB_ORDER.indexOf(game.screen);
  const tabChanged = newIndex >= 0 && newIndex !== game.lastTabIndex;
  el.classList.remove('slide-r','slide-l');
  if(tabChanged){
    void el.offsetWidth; // force reflow so the animation re-triggers
    el.classList.add(newIndex >= game.lastTabIndex ? 'slide-r' : 'slide-l');
  }
  if(newIndex >= 0) game.lastTabIndex = newIndex;
  if(game.screen==='briefing') el.innerHTML = briefingHTML();
  else if(game.screen==='evidence') el.innerHTML = evidenceHTML();
  else if(game.screen==='suspects') el.innerHTML = suspectsHTML();
  else if(game.screen==='audio') el.innerHTML = audioHTML();
  else if(game.screen==='camera') el.innerHTML = cameraHTML();
  else if(game.screen==='contradiction') el.innerHTML = contradictionHTML();
  else if(game.screen==='timeline') el.innerHTML = timelineHTML();
  else if(game.screen==='accusation') el.innerHTML = accusationHTML();
  else if(game.screen==='theory') el.innerHTML = theoryHTML();
  else if(game.screen==='ending') el.innerHTML = endingHTML();

  attachPanelEvents();
  if(game.screen==='briefing') runBriefingTypewriter();
  if(game.screen==='accusation') setTimeout(drawBoardConnections, tabChanged ? 420 : 30);
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
    checkEvidenceCombinations();
  }
}

// أدلة ناقصة بتتكمّل ببعض — عرّف CASE.evidenceCombinations = [{parts:[id1,id2,...], resultId:'combinedId'}]
// كل ما جزئين (أو أكتر) من دليل ناقص يتجمعوا مع بعض، الدليل المركّب بيتفتح تلقائي.
// resultId لازم يكون موجود كعنصر في CASE.evidence نفسها (unlocked:false، وده اللي بيوصف الاستنتاج الجديد).
function checkEvidenceCombinations(){
  if(!CASE.evidenceCombinations) return;
  CASE.evidenceCombinations.forEach(combo=>{
    if(game.collected.has(combo.resultId)) return;
    if(combo.parts.every(p=>game.collected.has(p))){
      const resultEv = evidenceById(combo.resultId);
      game.collected.add(combo.resultId);
      if(resultEv) showToast('🧩 ربطت الأدلة الناقصة: ' + resultEv.title, 'combo');
      persistProgress();
    }
  });
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
    showToast((CASE.rumorLabel || '📢 من قهوة البلد: ') + CASE.rumors[idx], 'rumor');
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
  t.className = 'toast' + (tone==='danger' ? ' danger' : tone==='rumor' ? ' rumor' : tone==='combo' ? ' combo' : '');
  t.textContent = text;
  wrap.appendChild(t);
  setTimeout(()=>t.remove(), 3400);
}

function evidenceHTML(){
  const sorted = [...CASE.evidence].sort((a,b)=>a.order-b.order);
  const hasCombos = CASE.evidenceCombinations && CASE.evidenceCombinations.length;
  const cards = sorted.map(ev=>{
    if(game.collected.has(ev.id)){
      const thumb = ev.img ? `<img class="ev-thumb photo-tone" src="${ev.img}" alt="${ev.title}" loading="lazy">` : '';
      const partialTag = ev.partial ? `<div class="tag partial">🧩 دليل ناقص — محتاج يتكمّل</div>` : '';
      const selCls = linkMode && linkSelected.includes(ev.id) ? ' link-selected' : '';
      return `<div class="ev-card${selCls}" data-ev="${ev.id}">
        ${thumb}
        <div class="tag ${ev.crit?'crit':''}">${ev.tag}${ev.crit?' · حاسم':''}</div>
        ${partialTag}
        <h4>${ev.title}</h4>
        <div class="preview">${ev.short}</div>
      </div>`;
    }
    return `<div class="ev-locked">🔒 دليل غير مكتشف بعد</div>`;
  }).join('');
  const linkToggle = hasCombos
    ? `<button class="btn ghost" id="linkModeBtn" style="margin-bottom:14px;">${linkMode ? '✕ إلغاء وضع الربط' : '🔗 اربط دليلين ببعض'}</button>`
    : '';
  const linkHint = linkMode ? `<p class="dim" style="color:var(--signal);">اختار دليلين تفتكر إنهم مرتبطين — دوس على الأول بعدين التاني.</p>` : '';
  return `
    <h2>لوحة الأدلة</h2>
    <p class="dim">فحص الأدلة بيساعدك تبني الصورة الكاملة. بعض الأدلة بتتكشف من خلال استجواب المشتبه بهم.</p>
    ${linkToggle}
    ${linkHint}
    <div class="divider"></div>
    <div class="ev-grid">${cards}</div>
  `;
}

function openEvidenceModal(id){
  const ev = evidenceById(id);
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const modalImg = ev.img ? `<div class="ev-zoom-wrap"><img class="ev-thumb photo-tone ev-zoom-img" style="height:180px;" src="${ev.img}" alt="${ev.title}" loading="lazy"></div>` : '';
  overlay.innerHTML = `
    <div class="modal">
      ${modalImg}
      <div class="tag ${ev.crit?'crit':''}" style="color:${ev.crit?'var(--danger)':'var(--signal)'}">${ev.tag}${ev.crit?' · دليل حاسم':''}</div>
      <h3>${ev.title}</h3>
      <p>${ev.full}</p>
      ${ev.img ? '<p class="dim" style="font-size:11.5px;">دوس على الصورة للتكبير وفحص التفاصيل.</p>' : ''}
      <button class="btn close-btn">إغلاق</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('.close-btn').addEventListener('click', ()=>overlay.remove());
  const zoomImg = overlay.querySelector('.ev-zoom-img');
  if(zoomImg){
    zoomImg.addEventListener('click', e=>{
      e.stopPropagation();
      const rect = zoomImg.getBoundingClientRect();
      const originX = ((e.clientX-rect.left)/rect.width*100).toFixed(1);
      const originY = ((e.clientY-rect.top)/rect.height*100).toFixed(1);
      zoomImg.style.transformOrigin = originX+'% '+originY+'%';
      zoomImg.classList.toggle('zoomed');
    });
  }
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
  const closed = !!game.interrogationClosed[s.id];
  const answered = game.interrogated[s.id] || new Set();
  const lines = [...answered].sort((a,b)=>a-b).map(idx=>{
    const item = s.questions[idx];
    return `<div class="line q"><div class="who">أنت</div>${item.q}</div>
            <div class="line a"><div class="who">${s.name}</div>${item.a}</div>`;
  }).join('');
  const outOfPoints = CASE.investigationPoints != null && game.points <= 0;
  const qButtons = closed ? '' : s.questions.map((item,idx)=>{
    const used = answered.has(idx);
    const locked = item.requires && !item.requires.every(id=>game.collected.has(id));
    if(locked && !used) return ''; // سؤال جولة تانية لسه ما فتحش
    return `<button class="q-btn" data-q="${idx}" ${(used||outOfPoints)?'disabled':''}>${item.q}</button>`;
  }).filter(Boolean).join('');
  const closedBanner = closed ? `<p class="dim" style="color:var(--danger); margin-top:6px;">🚫 ${s.name} قفل الكلام، مش هيرد على أسئلة تانية دلوقتي.</p>` : '';

  const confronted = game.confronted[s.id] || new Set();
  const confrontableEvidence = [...CASE.evidence].filter(e=>game.collected.has(e.id)).sort((a,b)=>a.order-b.order);
  const confrontHTML = confrontableEvidence.length ? `
    <h3>واجهه بدليل</h3>
    <p class="dim" style="margin-top:-6px;">اعرض عليه أي دليل جمعته وشوف رد فعله.</p>
    <div class="q-grid">
      ${confrontableEvidence.map(ev=>{
        const used = confronted.has(ev.id);
        return `<button class="q-btn confront-btn" data-confront="${ev.id}" ${(used||outOfPoints)?'disabled':''}>🧵 ${ev.title}</button>`;
      }).join('')}
    </div>
  ` : '';

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
    ${closedBanner}
    ${confrontHTML}
  `;
}

/* ============================================================
   SETTINGS — الصوت، حجم الخط، والتواصل معانا
   ============================================================ */

function openSettings(){
  if(document.getElementById('settingsOverlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'settingsOverlay';
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;
  const currentSize = getFontSize();
  overlay.innerHTML = `
    <div class="modal">
      <h3 style="margin-bottom:18px;">⚙️ الإعدادات</h3>

      <div class="settings-row">
        <span>المؤثرات الصوتية</span>
        <button class="btn ghost" id="settingsSfxToggle">${sfxEnabled() ? '🔊 مشغّل' : '🔇 مقفول'}</button>
      </div>

      <div class="settings-row" style="align-items:flex-start;">
        <span>حجم الخط</span>
        <div style="display:flex; gap:6px;">
          <button class="btn ghost font-size-btn ${currentSize==='small'?'active':''}" data-fontsize="small">صغير</button>
          <button class="btn ghost font-size-btn ${currentSize==='normal'?'active':''}" data-fontsize="normal">عادي</button>
          <button class="btn ghost font-size-btn ${currentSize==='large'?'active':''}" data-fontsize="large">كبير</button>
        </div>
      </div>

      <div class="divider"></div>
      <a href="${waLink}" target="_blank" rel="noopener" class="btn" style="display:block; text-align:center; background:#25D366; color:#04230f; text-decoration:none;">تواصل معانا على واتساب ←</a>
      <button class="btn ghost close-btn" style="width:100%; margin-top:10px;">إغلاق</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('.close-btn').addEventListener('click', ()=>overlay.remove());

  const sfxBtn = overlay.querySelector('#settingsSfxToggle');
  sfxBtn.addEventListener('click', ()=>{
    setSfxEnabled(!sfxEnabled());
    sfxBtn.textContent = sfxEnabled() ? '🔊 مشغّل' : '🔇 مقفول';
    if(sfxEnabled()) startAmbience(CASE ? (CASE.introAmbience || DEFAULT_INTRO_AMBIENCE) : null);
  });

  overlay.querySelectorAll('.font-size-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      setFontSize(btn.dataset.fontsize);
      overlay.querySelectorAll('.font-size-btn').forEach(b=>b.classList.toggle('active', b===btn));
    });
  });
}

/* ============================================================
   INVESTIGATION NOTEBOOK (generic — دفتر التحقيق + لوحة تصنيف المشتبهين)
   بيفتح فوق أي شاشة عن طريق الزرار العائم. مش بديل شاشة الاتهام —
   التصنيف هنا مجرد أداة تنظيم وتفكير للاعب، وبيأثر بس في ملاحظة
   إضافية بنهاية القضية (شوف classificationNoteHTML).
   ============================================================ */

const CLASSIFY_LEVELS = [
  { key:'strong', label:'مشتبه قوي', cls:'strong' },
  { key:'weak', label:'مشتبه ضعيف', cls:'weak' },
  { key:'cleared', label:'مستبعد', cls:'cleared' },
];

let notebookTab = 'suspects';
let linkMode = false;
let linkSelected = [];

function openNotebook(){
  if(document.getElementById('notebookOverlay')) return;
  notebookTab = 'suspects';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'notebookOverlay';
  overlay.innerHTML = `
    <div class="modal notebook-modal">
      <div class="notebook-head">
        <h3 style="margin:0;">📓 دفتر التحقيق</h3>
        <button class="btn ghost close-btn" style="padding:6px 12px; font-size:12px;">إغلاق</button>
      </div>
      <div class="notebook-tabs">
        <button class="notebook-tab active" data-nbtab="suspects">المشتبهين</button>
        <button class="notebook-tab" data-nbtab="evidence">الأدلة</button>
      </div>
      <div class="notebook-body" id="notebookBody"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('.close-btn').addEventListener('click', ()=>overlay.remove());
  overlay.querySelectorAll('.notebook-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      notebookTab = btn.dataset.nbtab;
      overlay.querySelectorAll('.notebook-tab').forEach(b=>b.classList.toggle('active', b===btn));
      renderNotebookBody();
    });
  });
  renderNotebookBody();
}

function renderNotebookBody(){
  const body = document.getElementById('notebookBody');
  if(!body) return;
  body.innerHTML = notebookTab==='suspects' ? notebookSuspectsHTML() : notebookEvidenceHTML();
  if(notebookTab==='suspects'){
    body.querySelectorAll('[data-classify]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        classifySuspect(btn.dataset.classify, btn.dataset.level);
      });
    });
  } else {
    body.querySelectorAll('[data-nb-ev]').forEach(card=>{
      card.addEventListener('click', ()=> openEvidenceModal(card.dataset.nbEv));
    });
  }
}

function classifySuspect(suspectId, level){
  if(game.classifications[suspectId] === level){
    delete game.classifications[suspectId]; // دوس على نفس التصنيف تاني يشيله
  } else {
    game.classifications[suspectId] = level;
  }
  persistProgress();
  renderNotebookBody();
}

function notebookSuspectsHTML(){
  const cards = CASE.suspects.filter(s=>s.accusable !== false).map(s=>{
    const current = game.classifications[s.id];
    const interrogatedCount = game.interrogated[s.id] ? game.interrogated[s.id].size : 0;
    const btns = CLASSIFY_LEVELS.map(l=>
      `<button class="classify-btn ${l.cls} ${current===l.key?'active':''}" data-classify="${s.id}" data-level="${l.key}">${l.label}</button>`
    ).join('');
    return `
      <div class="notebook-suspect ${current?'classified-'+current:''}">
        ${avatarMarkup(s,'avatar-photo small')}
        <div class="notebook-suspect-info">
          <h4>${s.name}</h4>
          <div class="role">${s.role}</div>
          <div class="mono" style="font-size:11px; color:var(--ink-dim); margin-top:4px;">${interrogatedCount>0 ? interrogatedCount+' سؤال متسأل' : 'لسه ما استجوبتوش'}</div>
        </div>
        <div class="classify-row">${btns}</div>
      </div>
    `;
  }).join('');
  return `
    <p class="dim" style="margin-top:0;">صنّف كل مشتبه حسب شكّك فيه. التصنيف ده بس لتنظيم أفكارك — اللعبة مش هتقولك مين الصح.</p>
    ${cards}
  `;
}

function notebookEvidenceHTML(){
  const collectedList = [...CASE.evidence].filter(e=>game.collected.has(e.id)).sort((a,b)=>a.order-b.order);
  if(!collectedList.length){
    return `<p class="dim" style="margin-top:0;">لسه ما جمعتش أي أدلة. فتش مسرح الجريمة واستجوّب المشتبه بهم.</p>`;
  }
  const rows = collectedList.map(ev=>`
    <div class="notebook-ev-row" data-nb-ev="${ev.id}">
      <span class="tag ${ev.crit?'crit':''}" style="flex-shrink:0;">${ev.crit?'حاسم':ev.tag}</span>
      <span>${ev.title}</span>
    </div>
  `).join('');
  return `
    <p class="dim" style="margin-top:0;">${collectedList.length} / ${CASE.evidence.length} دليل مجمّع. دوس على أي دليل للتفاصيل.</p>
    ${rows}
  `;
}

// أدلة مضللة (Red Herrings) — evidence.redHerring:true معناها الدليل ده مصمم يوهم اللاعب،
// من غير ما اللعبة تقوله كده صراحة أثناء اللعب. الملاحظة دي بترجع بعد النهاية بس، كمراجعة تعليمية.
function redHerringNoteHTML(){
  const used = [...game.accEvidence].map(evidenceById).filter(ev=>ev && ev.redHerring);
  if(!used.length) return '';
  const titles = used.map(ev=>ev.title).join('، ');
  const note = game.ending==='good'
    ? `🔍 من الأدلة اللي ربطتها بالاتهام، دي كانت أدلة مضللة فعلاً (${titles}) — بس برضو عرفت توصل للنتيجة الصح.`
    : `🔍 من الأدلة اللي بنيت عليها اتهامك، دي كانت أدلة مضللة (${titles}) — ده على الأرجح اللي لعب دور في اتهامك الغلط.`;
  return `<p class="dim" style="margin-top:10px;">${note}</p>`;
}

// ملاحظة اختيارية بتتضاف لشاشة النهاية — بتعكس دقة تصنيف اللاعب من غير ما تغيّر نتيجة القضية نفسها
function classificationNoteHTML(){
  if(!game.classifications || !Object.keys(game.classifications).length) return '';
  const correctId = CASE.correctSuspectId;
  const correctClass = game.classifications[correctId];
  let note;
  if(correctClass === 'strong'){
    note = '📓 من دفتر التحقيق: صنّفت الجاني الحقيقي "مشتبه قوي" من البداية — حدسك كان في محله.';
  } else if(correctClass === 'cleared'){
    note = '📓 من دفتر التحقيق: كنت مستبعد الجاني الحقيقي تمامًا في تصنيفك — يستاهل تراجعة تانية للأدلة.';
  } else if(correctClass === 'weak'){
    note = '📓 من دفتر التحقيق: كان عندك شك خفيف في الجاني الحقيقي، بس مكنش شك قوي كفاية.';
  } else {
    note = '📓 من دفتر التحقيق: ما صنّفتش الجاني الحقيقي خالص — جرب تستخدم لوحة التصنيف أكتر في القضية الجاية.';
  }
  return `<p class="dim" style="margin-top:14px; border-top:1px dashed var(--line); padding-top:14px;">${note}</p>`;
}

// ربط الأدلة يدويًا — اللاعب بيختار دليلين على أساس إنهم مرتبطين، ولو صح بيتفتح استنتاج جديد
// (نفس بنية CASE.evidenceCombinations المستخدمة في التركيب التلقائي، بس هنا بقرار اللاعب)
function handleLinkSelect(id){
  if(linkSelected.includes(id)){
    linkSelected = linkSelected.filter(x=>x!==id);
    render(); game.screen='evidence';
    return;
  }
  if(linkSelected.length >= 2) return;
  linkSelected.push(id);
  if(linkSelected.length < 2){
    render(); game.screen='evidence';
    return;
  }
  attemptLink(linkSelected[0], linkSelected[1]);
}

function attemptLink(a, b){
  const combo = (CASE.evidenceCombinations||[]).find(c=>c.parts.length===2 && c.parts.includes(a) && c.parts.includes(b));
  if(combo && !game.collected.has(combo.resultId)){
    collect(combo.resultId);
    showToast('🧩 الربط صح! اكتشفت: ' + evidenceById(combo.resultId).title, 'combo');
  } else if(combo){
    showToast('الربط ده اتعمل قبل كده.', 'rumor');
  } else {
    showToast('الدليلين دول مش مرتبطين ببعض — جرب تركيبة تانية.', 'danger');
  }
  linkMode = false;
  linkSelected = [];
  render(); game.screen='evidence';
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
   CONTRADICTION PUZZLE (generic — driven by CASE.contradictionPuzzle)
   دوّر بين شهادات/تصريحات مختلفة ولاقي الاتنين اللي بيتناقضوا
   ============================================================ */

function contradictionHTML(){
  const cfg = CASE.contradictionPuzzle;
  if(game.contradictionSolved){
    return `
      <h2>${cfg.tabLabel || 'التناقضات'} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const chips = cfg.statements.map(st=>{
    const sel = game.contradictionSelected.includes(st.id) ? 'selected' : '';
    return `<div class="board-chip ${sel}" data-contra="${st.id}" style="text-align:right; margin-bottom:8px;">
      <div class="mono" style="font-size:10px; color:var(--ink-dim); margin-bottom:4px;">${st.source}</div>
      ${st.text}
    </div>`;
  }).join('');
  return `
    <h2>${cfg.tabLabel || 'التناقضات'}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <div id="contraList">${chips}</div>
    <div class="wave-feedback" id="contraFeedback"></div>
  `;
}

function handleContradictionClick(id){
  const cfg = CASE.contradictionPuzzle;
  const sel = game.contradictionSelected;
  if(sel.includes(id)){
    game.contradictionSelected = sel.filter(x=>x!==id);
    render(); game.screen='contradiction';
    return;
  }
  if(sel.length >= 2) return; // اتنين بس في المرة الواحدة
  sel.push(id);
  if(sel.length < 2){
    render(); game.screen='contradiction';
    return;
  }
  // اتاختارت اتنين — نتأكد لو هما اللي بيتناقضوا
  const correct = cfg.correctPair;
  const match = correct.every(x=>sel.includes(x)) && sel.every(x=>correct.includes(x));
  render(); game.screen='contradiction';
  const feedback = document.getElementById('contraFeedback');
  if(match){
    feedback.textContent = '✓ لقيت التناقض الصح!';
    feedback.className = 'wave-feedback ok';
    game.contradictionSolved = true;
    triggerFlash('good');
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الاتنين دول مش متناقضين فعلًا، جرب تشكيلة تانية.';
    feedback.className = 'wave-feedback bad';
    setTimeout(()=>{
      game.contradictionSelected = [];
      render(); game.screen='contradiction';
    }, 1100);
  }
}

/* ============================================================
   CAMERA TIMELINE PUZZLE (generic — driven by CASE.cameraPuzzle)
   مراجعة تايم لاين كاميرا مراقبة: دوّر على اللحظة الصح في الشريط الزمني
   ============================================================ */

// بيحوّل عدد دقايق من بداية الشريط لصيغة ساعة معروضة، على أساس ساعة بداية الشريط (24 ساعة)
function formatClockFromOffset(startHour24, offsetMinutes){
  let totalMin = Math.round(startHour24*60 + offsetMinutes);
  totalMin = ((totalMin % 1440) + 1440) % 1440;
  let hh = Math.floor(totalMin/60), mm = totalMin%60;
  const ampm = hh>=12 ? 'PM':'AM';
  let hh12 = hh%12; if(hh12===0) hh12=12;
  return `${hh12}:${String(mm).padStart(2,'0')} ${ampm}`;
}

function cameraHTML(){
  const cfg = CASE.cameraPuzzle;
  const label = cfg.tabLabel || 'تحليل الكاميرات';
  if(game.cameraSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const startLabel = formatClockFromOffset(cfg.startHour24, 0);
  const endLabel = formatClockFromOffset(cfg.startHour24, cfg.totalMinutes);
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="cam-wrap">
      <div class="cam-track" id="camTrack">
        <div class="cam-marker" id="camMarker"></div>
      </div>
      <div class="cam-labels">
        <span class="mono">${startLabel}</span>
        <span class="mono" id="camReadout">--:-- --</span>
        <span class="mono">${endLabel}</span>
      </div>
      <div class="wave-feedback" id="camFeedback"></div>
    </div>
  `;
}

function handleCamClick(e){
  const cfg = CASE.cameraPuzzle;
  const track = document.getElementById('camTrack');
  const rect = track.getBoundingClientRect();
  const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const offsetMinutes = relX * cfg.totalMinutes;
  const label = formatClockFromOffset(cfg.startHour24, offsetMinutes);

  const marker = document.getElementById('camMarker');
  marker.style.left = (relX*100) + '%';
  marker.classList.add('show');
  document.getElementById('camReadout').textContent = label;

  const feedback = document.getElementById('camFeedback');
  if(Math.abs(offsetMinutes - cfg.targetMinutes) <= cfg.toleranceMinutes){
    feedback.textContent = `✓ ظبطت اللحظة الصح (${label}).`;
    feedback.className = 'wave-feedback ok';
    game.cameraSolved = true;
    triggerFlash('good');
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = `✗ ${label} — لسه مش الوقت الصح، جرّب مكان تاني على الخط.`;
    feedback.className = 'wave-feedback bad';
  }
}

/* ============================================================
   TIMELINE PUZZLE (generic — driven by CASE.timelinePuzzle)
   اللاعب بيرتب أحداث القضية بنفسه (▲▼) لحد ما يوصل للترتيب الصح
   ============================================================ */

function timelineHTML(){
  const cfg = CASE.timelinePuzzle;
  const label = cfg.tabLabel || 'الخط الزمني';
  if(game.timelineSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const items = game.timelineOrder.map((id,i)=>{
    const ev = cfg.events.find(e=>e.id===id);
    return `
      <div class="timeline-item">
        <span class="mono timeline-pos">${i+1}</span>
        <span class="timeline-text">${ev.text}</span>
        <div class="timeline-arrows">
          <button class="tl-btn" data-tl-up="${id}" ${i===0?'disabled':''}>▲</button>
          <button class="tl-btn" data-tl-down="${id}" ${i===game.timelineOrder.length-1?'disabled':''}>▼</button>
        </div>
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <div id="timelineList">${items}</div>
    <button class="btn" id="submitTimeline" style="margin-top:16px;">تأكيد الترتيب</button>
    <div class="wave-feedback" id="timelineFeedback"></div>
  `;
}

function moveTimelineItem(id, dir){
  const idx = game.timelineOrder.indexOf(id);
  const swapWith = idx + dir;
  if(swapWith < 0 || swapWith >= game.timelineOrder.length) return;
  [game.timelineOrder[idx], game.timelineOrder[swapWith]] = [game.timelineOrder[swapWith], game.timelineOrder[idx]];
  persistProgress();
  render(); game.screen='timeline';
}

function submitTimeline(){
  const cfg = CASE.timelinePuzzle;
  const correct = cfg.correctOrder.length===game.timelineOrder.length
    && cfg.correctOrder.every((id,i)=>game.timelineOrder[i]===id);
  const feedback = document.getElementById('timelineFeedback');
  if(correct){
    feedback.textContent = '✓ رتبتها صح! كده بقت الصورة واضحة.';
    feedback.className = 'wave-feedback ok';
    game.timelineSolved = true;
    triggerFlash('good');
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الترتيب لسه مش صح، راجع الأحداث تاني.';
    feedback.className = 'wave-feedback bad';
  }
}

/* ============================================================
   THEORY BUILDER (optional — driven by CASE.theoryBuilder)
   بديل شاشة الاتهام البسيطة: قبل ما تقفل القضية، اللاعب يفسّر
   الدافع/الطريقة/التوقيت باختياره من مجموعة خيارات لكل عنصر
   ============================================================ */

function theoryHTML(){
  const cfg = CASE.theoryBuilder;
  const answers = game.theoryAnswers || {};
  const qBlocks = cfg.questions.map(q=>{
    const opts = q.options.map(o=>{
      const sel = answers[q.id]===o.id ? 'selected' : '';
      return `<div class="board-chip ${sel}" style="text-align:right;" data-theory-q="${q.id}" data-theory-opt="${o.id}">${o.text}</div>`;
    }).join('');
    return `<div style="margin-bottom:20px;"><h4 style="margin-bottom:10px;">${q.label}</h4><div style="display:flex; flex-direction:column; gap:8px;">${opts}</div></div>`;
  }).join('');
  const allAnswered = cfg.questions.every(q=>answers[q.id]);
  return `
    <h2>ابني نظرية الجريمة</h2>
    <p class="dim">قبل ما تقفل القضية، فسّر إزاي حصلت الجريمة بالظبط.</p>
    <div class="divider"></div>
    ${qBlocks}
    <button class="btn" id="submitTheory" ${allAnswered?'':'disabled'}>اقفل القضية ←</button>
  `;
}

function theoryNoteHTML(){
  const cfg = CASE.theoryBuilder;
  if(!cfg || !cfg.enabled || !game.theoryAnswers || !Object.keys(game.theoryAnswers).length) return '';
  const total = cfg.questions.length;
  const correct = cfg.questions.filter(q=>game.theoryAnswers[q.id]===q.correctOptionId).length;
  return `<p class="dim" style="margin-top:10px;">🧠 نظرية الجريمة: جبت ${correct} من ${total} عناصر صح.</p>`;
}

/* ============================================================
   ACCUSATION
   ============================================================ */

function accusationHTML(){
  // شخصيات زي الشهود/الناجيين ممكن يتحطلهم accusable:false — يتستجوبوا عادي بس ميظهروش هنا خالص
  const accusableSuspects = CASE.suspects.filter(s=>s.accusable !== false);
  const collectedList = [...CASE.evidence].filter(e=>game.collected.has(e.id)).sort((a,b)=>a.order-b.order);

  const evChips = collectedList.map(ev=>{
    const connectedTo = game.connections[ev.id];
    const cls = connectedTo ? 'connected' : (game.boardSelected===ev.id ? 'selected' : '');
    return `<div class="board-chip ${cls}" id="board-ev-${ev.id}" data-board-ev="${ev.id}">${ev.title}</div>`;
  }).join('');

  const susChips = accusableSuspects.map(s=>{
    const hasLink = Object.values(game.connections).includes(s.id);
    return `<div class="board-chip ${hasLink?'connected':''}" id="board-sus-${s.id}" data-board-sus="${s.id}">${s.name}</div>`;
  }).join('');

  const targets = new Set(Object.values(game.connections));
  let warning = '';
  let canSubmit = false;
  if(targets.size > 1){
    warning = `<div class="board-warning">قدر تتهم شخص واحد بس في المرة — افصل باقي الروابط الأول (دوس على الدليل المربوط تاني عشان تفصله).</div>`;
  } else if(targets.size === 1 && Object.keys(game.connections).length > 0){
    canSubmit = true;
  }

  return `
    <h2>لوحة التحقيق</h2>
    <p class="dim">دوس على دليل، بعدين دوس على المشتبه به اللي هتربطه بيه — زي ما بتربط خيط فعلي بين حاجتين. لما تربط اللي محتاجه، قدّم اتهامك.</p>
    <div class="divider"></div>
    <div class="board-wrap" id="boardWrap">
      <svg class="board-svg" id="boardSvg"></svg>
      <div class="board-col"><h4 class="mono">الأدلة</h4>${evChips}</div>
      <div class="board-col"><h4 class="mono">المشتبه بهم</h4>${susChips}</div>
    </div>
    ${warning}
    <button class="btn" id="submitAcc" ${canSubmit?'':'disabled'} style="margin-top:16px;">قدّم الاتهام النهائي</button>
  `;
}

function drawBoardConnections(){
  const svg = document.getElementById('boardSvg');
  const wrap = document.getElementById('boardWrap');
  if(!svg || !wrap) return;
  const wrapRect = wrap.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${wrapRect.width} ${wrapRect.height}`);
  svg.innerHTML = '';
  const ns = 'http://www.w3.org/2000/svg';
  Object.entries(game.connections).forEach(([evId, susId])=>{
    const evEl = document.getElementById('board-ev-'+evId);
    const susEl = document.getElementById('board-sus-'+susId);
    if(!evEl || !susEl) return;
    const evR = evEl.getBoundingClientRect(), susR = susEl.getBoundingClientRect();
    const x1 = evR.left + evR.width/2 - wrapRect.left, y1 = evR.top + evR.height/2 - wrapRect.top;
    const x2 = susR.left + susR.width/2 - wrapRect.left, y2 = susR.top + susR.height/2 - wrapRect.top;
    const path = document.createElementNS(ns,'path');
    path.setAttribute('d', `M${x1},${y1} Q${(x1+x2)/2},${(y1+y2)/2} ${x2},${y2}`);
    path.setAttribute('class','board-thread');
    svg.appendChild(path);
  });
}
window.addEventListener('resize', ()=>{ if(game && game.screen==='accusation') drawBoardConnections(); });

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
    const required = CASE.conclusiveRequired || 2;
    if(correctSuspect && hits>=required) game.ending='good';
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
    ${classificationNoteHTML()}
    ${redHerringNoteHTML()}
    ${theoryNoteHTML()}
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
    card.addEventListener('click', ()=>{
      if(linkMode) handleLinkSelect(card.dataset.ev);
      else openEvidenceModal(card.dataset.ev);
    });
  });
  const linkModeBtn = document.getElementById('linkModeBtn');
  if(linkModeBtn) linkModeBtn.addEventListener('click', ()=>{
    linkMode = !linkMode;
    linkSelected = [];
    render(); game.screen='evidence';
  });
  document.querySelectorAll('[data-suspect]').forEach(card=>{
    card.addEventListener('click', ()=>{ game.activeSuspect = card.dataset.suspect; render(); });
  });
  const backBtn = document.querySelector('[data-back-suspects]');
  if(backBtn) backBtn.addEventListener('click', ()=>{ game.activeSuspect=null; render(); });

  document.querySelectorAll('.q-btn:not(.confront-btn)').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!spendPoint()) return;
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
      if(item.closesInterrogation){
        game.interrogationClosed[s.id] = true;
      }
      persistProgress();
      if(item.closesInterrogation){
        setTimeout(()=>{ render(); }, item.a.length*10+400);
      } else {
        renderTabs();
      }
      document.getElementById('evCount').textContent = game.collected.size + ' / ' + CASE.evidence.length;
    });
  });

  document.querySelectorAll('.confront-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!spendPoint()) return;
      const evId = btn.dataset.confront;
      const s = suspectById(game.activeSuspect);
      if(!game.confronted[s.id]) game.confronted[s.id] = new Set();
      if(game.confronted[s.id].has(evId)) return;
      game.confronted[s.id].add(evId);
      btn.disabled = true;

      const ev = evidenceById(evId);
      // رد فعل مخصص لو القضية عرّفته في suspect.confrontations، وإلا رد عام
      let reaction = 'بيبص على الدليل شوية، بس مبيديش رد واضح عليه.';
      let unlockId = null;
      if(s.confrontations && s.confrontations[evId]){
        reaction = s.confrontations[evId].text;
        unlockId = s.confrontations[evId].unlockId || null;
      } else if(s.confrontations && s.confrontations.default){
        reaction = s.confrontations.default;
      }

      const transcript = document.getElementById('transcript');
      if(transcript){
        const placeholder = transcript.querySelector('p.dim');
        if(placeholder) placeholder.remove();
        const qLine = document.createElement('div');
        qLine.className='line q';
        qLine.innerHTML = `<div class="who">🧵 واجهته بـ</div>${ev.title}`;
        const aLine = document.createElement('div');
        aLine.className='line a';
        aLine.innerHTML = `<div class="who">${s.name}</div><span></span>`;
        transcript.appendChild(qLine);
        transcript.appendChild(aLine);
        transcript.scrollTop = transcript.scrollHeight;
        typeText(aLine.querySelector('span'), reaction, 10, ()=>{ transcript.scrollTop = transcript.scrollHeight; });
        const scrollTimer = setInterval(()=>{ transcript.scrollTop = transcript.scrollHeight; },120);
        setTimeout(()=>clearInterval(scrollTimer), reaction.length*10+200);
      }
      if(unlockId) collect(unlockId);
      persistProgress();
      renderTabs();
      document.getElementById('evCount').textContent = game.collected.size + ' / ' + CASE.evidence.length;
    });
  });

  const waveSvg = document.getElementById('waveSvg');
  if(waveSvg) waveSvg.addEventListener('click', handleWaveClick);

  const camTrack = document.getElementById('camTrack');
  if(camTrack) camTrack.addEventListener('click', handleCamClick);

  document.querySelectorAll('[data-tl-up]').forEach(btn=>{
    btn.addEventListener('click', ()=> moveTimelineItem(btn.dataset.tlUp, -1));
  });
  document.querySelectorAll('[data-tl-down]').forEach(btn=>{
    btn.addEventListener('click', ()=> moveTimelineItem(btn.dataset.tlDown, 1));
  });
  const submitTlBtn = document.getElementById('submitTimeline');
  if(submitTlBtn) submitTlBtn.addEventListener('click', submitTimeline);

  document.querySelectorAll('[data-theory-q]').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      if(!game.theoryAnswers) game.theoryAnswers = {};
      game.theoryAnswers[chip.dataset.theoryQ] = chip.dataset.theoryOpt;
      persistProgress();
      render(); game.screen='theory';
    });
  });
  const submitTheoryBtn = document.getElementById('submitTheory');
  if(submitTheoryBtn) submitTheoryBtn.addEventListener('click', computeEnding);

  document.querySelectorAll('[data-contra]').forEach(chip=>{
    chip.addEventListener('click', ()=> handleContradictionClick(chip.dataset.contra));
  });

  document.querySelectorAll('[data-board-ev]').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const evId = chip.dataset.boardEv;
      if(game.connections[evId]){
        delete game.connections[evId]; // كان مربوط، دوس عليه تاني يفصله
        game.boardSelected = null;
      } else {
        game.boardSelected = (game.boardSelected===evId) ? null : evId; // toggle الاختيار
      }
      persistProgress();
      render(); game.screen='accusation';
    });
  });
  document.querySelectorAll('[data-board-sus]').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      if(!game.boardSelected) return; // لازم تختار دليل الأول
      game.connections[game.boardSelected] = chip.dataset.boardSus;
      game.boardSelected = null;
      persistProgress();
      render(); game.screen='accusation';
    });
  });
  const submitBtn = document.getElementById('submitAcc');
  if(submitBtn) submitBtn.addEventListener('click', ()=>{
    const targets = new Set(Object.values(game.connections));
    if(targets.size !== 1) return;
    game.accSuspect = [...targets][0];
    game.accEvidence = new Set(Object.keys(game.connections));
    if(CASE.theoryBuilder && CASE.theoryBuilder.enabled){
      persistProgress();
      game.screen='theory';
      render();
    } else {
      computeEnding();
    }
  });

  const restartBtn = document.querySelector('[data-restart]');
  if(restartBtn) restartBtn.addEventListener('click', ()=>{
    game = freshGameState();
    game.points = CASE.investigationPoints != null ? CASE.investigationPoints : null;
    ensureSceneEvidence();
    persistProgress();
    render();
  });
  const backLibBtn = document.querySelector('[data-back-to-lib]');
  if(backLibBtn) backLibBtn.addEventListener('click', ()=>{
    clearActiveCase();
    app.unlockedIds = getUnlockedIds();
    app.completedIds = getCompletedIds();
    showLibrary();
  });
}

/* ============================================================
   GO
   ============================================================ */

boot();
