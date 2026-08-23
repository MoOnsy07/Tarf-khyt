/* ============================================================
   المحرك العام — بيشتغل مع أي قضية متوصفة بنفس الـ schema
   (شوف cases/case-last-episode.js كنموذج)
   لا تكتبش قصة أو بيانات هنا؛ الملف ده للمنطق بس.
   ============================================================ */

const app = {
  view: 'loading',      // loading | library | case
  unlockedIds: [],
  completedIds: [],
  libraryFilter: 'all',   // فلتر المكتبة الحالي
  librarySearch: '',      // نص البحث الحالي
  librarySort: 'newest',  // ترتيب المكتبة: newest | shortest | hardest | price
  libraryShown: 18,       // عدد الكروت المعروضة حاليًا (تحميل تدريجي)
};

const LIBRARY_PAGE_SIZE = 18; // عدد الكروت المضافة في كل ضغطة "تحميل المزيد" 

// التواصل الرسمي لطرف الخيط
// WHATSAPP_NUMBER معرّفة أصلاً في config.js (بيتحمّل قبل engine.js) — هنا بس بنبني رابط منها
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const TELEGRAM_CHANNEL_URL = 'https://t.me/taraf5eet';

// كارت التواصل — واتساب للدعم والاقتراحات، وتليجرام للقضايا والتحديثات
function socialLinksHTML(context){
  const telegramBlock = context === 'library' ? `
    <div class="telegram-intel-card">
      <div class="telegram-intel-icon">📩</div>
      <div class="telegram-intel-copy">
        <div class="telegram-intel-eyebrow mono">قناة البلاغات</div>
        <strong>متفوّتش القضية الجاية</strong>
        <span>إعلانات القضايا الجديدة، تحديثات اللعبة ونتائج المتصدرين بتنزل على قناة طرف الخيط.</span>
      </div>
      <a href="${TELEGRAM_CHANNEL_URL}" target="_blank" rel="noopener" class="btn telegram-intel-btn mono" data-telegram-cta="library_card">افتح القناة ←</a>
    </div>
  ` : `
    <div class="social-follow-item" style="margin-top:12px;">
      <span class="social-follow-label mono">تابع القضايا الجديدة وتحديثات اللعبة</span>
      <div class="social-follow-btns">
        <a href="${TELEGRAM_CHANNEL_URL}" target="_blank" rel="noopener" class="btn ghost social-btn telegram mono" data-telegram-cta="ending_links">📣 قناة طرف الخيط</a>
      </div>
    </div>
  `;
  return `
    <div class="social-follow ${context||''}">
      <div class="social-follow-item">
        <span class="social-follow-label mono">عندك استفسار، اقتراح أو واجهتك مشكلة؟</span>
        <div class="social-follow-btns">
          <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="btn ghost social-btn whatsapp mono">💬 تواصل معانا على واتساب</a>
        </div>
      </div>
      ${telegramBlock}
    </div>
  `;
}

const TELEGRAM_CTA_LAST_SHOWN_KEY = 'ca_telegram_cta_last_shown_v1';
const TELEGRAM_CTA_OPENED_KEY = 'ca_telegram_cta_opened_v1';
const TELEGRAM_CTA_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

document.addEventListener('click', e=>{
  const link = e.target.closest('[data-telegram-cta]');
  if(!link) return;
  try{ localStorage.setItem(TELEGRAM_CTA_OPENED_KEY, '1'); }catch(err){}
  gaTrack('telegram_cta_click', { cta_location:link.dataset.telegramCta || 'unknown' });
});

function shouldShowTelegramInvite(){
  if(!CASE || !game || game.screen !== 'ending') return false;
  try{
    if(localStorage.getItem(TELEGRAM_CTA_OPENED_KEY) === '1') return false;
    const lastShown = Number(localStorage.getItem(TELEGRAM_CTA_LAST_SHOWN_KEY) || 0);
    if(lastShown && Date.now() - lastShown < TELEGRAM_CTA_COOLDOWN_MS) return false;
  }catch(err){}
  return getCompletedIds().length >= 1;
}

function showTelegramInvite(){
  if(!shouldShowTelegramInvite() || document.getElementById('telegramInviteOverlay')) return;
  try{ localStorage.setItem(TELEGRAM_CTA_LAST_SHOWN_KEY, String(Date.now())); }catch(err){}
  gaTrack('telegram_cta_impression', { cta_location:'first_free_case_ending' });

  const overlay = document.createElement('div');
  overlay.className = 'overlay telegram-invite-overlay';
  overlay.id = 'telegramInviteOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'telegramInviteTitle');
  overlay.innerHTML = `
    <div class="modal telegram-invite-modal">
      <button type="button" class="telegram-invite-close" aria-label="إغلاق">×</button>
      <div class="telegram-invite-seal">📩</div>
      <div class="tag mono">بلاغ جديد من الأرشيف</div>
      <h3 id="telegramInviteTitle">متفوّتش القضية الجاية</h3>
      <p>إعلانات القضايا الجديدة، تحديثات اللعبة ونتائج المتصدرين هتلاقيها على قناة طرف الخيط.</p>
      <a href="${TELEGRAM_CHANNEL_URL}" target="_blank" rel="noopener" class="btn telegram-invite-primary" data-telegram-cta="first_free_case_ending">افتح قناة البلاغات ←</a>
      <button type="button" class="btn ghost telegram-invite-later">كمّل من غير انضمام</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const onKey = e=>{ if(e.key === 'Escape') close(); };
  const close = ()=>{
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  };
  overlay.addEventListener('click', e=>{ if(e.target===overlay) close(); });
  overlay.querySelector('.telegram-invite-close').addEventListener('click', close);
  overlay.querySelector('.telegram-invite-later').addEventListener('click', close);
  overlay.querySelector('[data-telegram-cta]').addEventListener('click', ()=>setTimeout(close, 150));
  document.addEventListener('keydown', onKey);
  overlay.querySelector('[data-telegram-cta]').focus();
}


// القضايا اللي أصولها البصرية (بورتريهات الشخصيات + صور الأدلة) مكتملة فعلاً
// وجاهزة للعب بتجربة كاملة. أي قضية تانية بتتعرض معتّمة وعليها "قريبًا" في
// المكتبة، لحد ما نضيف الصور بتاعتها هنا. حدّث القائمة دي كل ما قضية تخلص.
// READY_CASE_IDS بقت جايه من ready-cases.js (لازم يتحمّل قبل engine.js في الـHTML)
function isCaseReady(c){
  return READY_CASE_IDS.has(c.id);
}

// تسميات التصنيفات — ضيف هنا أي تصنيف جديد تستخدمه في CASE.categories
const CATEGORY_LABELS = {
  murder:'قتل', theft:'سرقة', comedy:'فكاهية', disappearance:'اختفاء',
  social:'اجتماعية', scandal:'فضيحة', mystery:'غموض', corruption:'فساد',
  drama:'دراما', family:'عائلية', sports:'رياضة', fraud:'احتيال',
  thriller:'تشويق', kidnapping:'خطف', coldcase:'قضية قديمة', digital:'رقمية',
  accident:'حادث', fashion:'موضة', nightlife:'حياة ليلية', food:'طعام',
  forgery:'تزوير', arson:'حريق متعمد',
};

// مش كل tag داخلي لازم يتحول لزر فلتر. القائمة دي متعمدة عشان المكتبة
// تفضل خفيفة على الموبايل، وباقي القضايا تفضل متاحة من "الكل" والبحث.
const LIBRARY_FILTER_CATEGORIES = [
  'murder', 'theft', 'disappearance', 'mystery', 'corruption', 'social', 'comedy'
];

let CASE = null;         // القضية الحالية (object)
let game = null;         // حالة اللعب داخل القضية الحالية

/* ============================================================
   GOOGLE ANALYTICS 4 — أحداث اللعب المخصصة
   لازم يكون Google tag (gtag.js) موجود في <head> في index.html.
   مفيش أسماء لاعبين أو بيانات حساسة بتتبعت لـ Analytics.
   ============================================================ */
function gaTrack(eventName, params={}){
  try{
    if(typeof window.gtag !== 'function') return;
    const caseParams = CASE ? {
      case_id: String(CASE.id || ''),
      case_title: String(CASE.title || ''),
      case_no: String(CASE.caseNo || ''),
    } : {};
    window.gtag('event', eventName, { ...caseParams, ...params });
  }catch(e){
    // Analytics عمره ما يوقف اللعبة لو حصلت مشكلة في التتبع
  }
}

// أي نص جاي من المستخدم أو من قاعدة البيانات لازم يتعرض كنص فقط،
// مش كـ HTML قابل للتنفيذ جوه الصفحة.
function escapeHTML(value){
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    playMode:'normal',     // normal | realistic — بيتحدد قبل بداية القضية وبيتسجل مع الـ Save
    lastTabIndex:0,
    startedAt: Date.now(), // وقت بداية القضية — بيتستخدم لحساب مدة الحل للنظام العام
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
    points:null,           // متروك للتوافق مع Saves قديمة؛ مفيش رصيد أسئلة بعد التحديث
    confronted:{},         // suspectId -> Set(evidenceId) — الأدلة اللي واجهت بيها كل شخص
    connections:{},        // evidenceId -> suspectId — روابط لوحة التحقيق (الخيوط)
    boardSelected:null,    // دليل متحدد حاليًا على اللوحة، مستني تربطه بشخص
    hintsUsed:0,
    contradictionSolved:false,
    contradictionSelected:[],
    classifications:{},    // suspectId -> 'strong' | 'weak' | 'cleared' — تصنيف اللاعب الشخصي، دفتر التحقيق
    interrogationClosed:{}, // suspectId -> true — الشخصية قفلت الكلام بعد سؤال معيّن (question.closesInterrogation)
    suspectOrder: shuffleArray((CASE && CASE.suspects ? CASE.suspects : []).map(s=>s.id)), // ترتيب عشوائي ثابت أثناء القضية لمنع تسريب الجاني من مكانه في القائمة
    timelineOrder: (CASE && CASE.timelinePuzzle && CASE.timelinePuzzle.enabled) ? shuffleArray(CASE.timelinePuzzle.events.map(e=>e.id)) : [],
    timelineSolved:false,
    theoryAnswers:{},      // questionId -> optionId — إجابات بناء نظرية الجريمة (اختياري، CASE.theoryBuilder)
    theoryOptionOrder: (CASE && CASE.theoryBuilder && CASE.theoryBuilder.enabled)
      ? Object.fromEntries((CASE.theoryBuilder.questions||[]).map(q=>[q.id, shuffleArray((q.options||[]).map(o=>o.id))]))
      : {}, // questionId -> ترتيب عشوائي ثابت لأماكن الاختيارات، عشان الإجابة الصح ما تبقاش دايمًا أول اختيار
    score:0,                // نقاط تسجيل الأداء (Score) — منفصلة عن نقاط التحقيق، بتتسجل في الليدربورد العام آخر القضية
    scoreLog:[],             // سجل بسيط لكل حركة أثّرت في الـ score، بيتعرض في دفتر التحقيق
    secretsFound:new Set(), // IDs الأسرار/المكافآت المخفية اللي اتكشفت بالفعل (evidence بـ bonusPoints)

    // === 7 آليات الألغاز الجديدة (كلها عامة — مبنية بالكامل من بيانات القضية) ===
    dnaLabSolved:false,
    alibiGridSolved:false,
    ledgerAuditSolved:false,
    polygraphSolved:false,
    polygraphAsked:new Set(),        // suspectId — المشتبه بيهم اللي اتسألوا فعلاً وظهرت قراءتهم
    floorPlanSolved:false,
    floorPlanPreviewSuspect:null,    // suspectId — المسار المعروض حاليًا على المخطط قبل التأكيد
    witnessReliabilitySolved:false,
    handwritingSolved:false,
    handwritingSelected:[],          // أسماء الحقول (angle/pressure/spacing) اللي اللاعب علّم عليها كفرق

    // === آليات عامة إضافية ===
    codeLockSolved:false,
    codeLockInput:'',
    cipherSolved:false,
    cipherSelections:{},
    cipherInput:'',
    matchSolved:false,
    matchSelections:{},
    investigationActionsDone:new Set(), // إجراءات فحص/تفتيش/تحريات ميدانية اتنفذت
    backgroundChecks:new Set(), // suspectId — صحائف الحالة الجنائية التي طلبها اللاعب
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

function currentPlayMode(){
  return game && game.playMode === 'realistic' ? 'realistic' : 'normal';
}

function isForensicCase(caseData=CASE){
  if(!caseData) return false;
  if(Array.isArray(caseData.categories) && caseData.categories.some(c=>String(c).toLowerCase()==='murder')) return true;
  const text = [
    caseData.title, caseData.subtitle, caseData.teaser,
    caseData.briefing && caseData.briefing.text1,
    caseData.briefing && caseData.briefing.text2,
  ].filter(Boolean).join(' ');
  // المقصود هنا قضايا وفاة/قتل/تسمم أو اعتداء جنائي واضح. ده بيشغّل طبقة المعاينة الواقعية فقط.
  return /(قتل|مقتول|اتقتل|جثة|وفاة|توفى|مات|سمم|تسمم|محاولة قتل)/.test(text);
}

function forensicActionKindForEvidence(ev){
  const text = [ev.tag, ev.title, ev.short, ev.full].filter(Boolean).join(' ');
  if(/بصم/.test(text)) return {kind:'بصمات', verb:'ارفع وافحص البصمات'};
  if(/DNA|حمض نووي|عينة|دم/.test(text)) return {kind:'معمل', verb:'اجمع العينة وابعتها للمعمل'};
  if(/طب شرعي|سبب الوفاة|توقيت.*وفاة|سم|مادة|كيميائ/.test(text)) return {kind:'تحليل جنائي', verb:'اطلب الفحص والتحليل الجنائي'};
  if(/كاميرا|CCTV|تسجيل/.test(text)) return {kind:'كاميرات', verb:'راجع التسجيل المرتبط بالمشهد'};
  if(/هاتف|موبايل|مكالمة|رسائل|سجل/.test(text)) return {kind:'فحص رقمي', verb:'افحص السجل أو الجهاز'};
  if(/شهادة|شاهد/.test(text)) return {kind:'تحريات', verb:'وثّق الشهادة ميدانيًا'};
  return {kind:'مسرح الجريمة', verb:'عاين واجمع الدليل'};
}

function generatedRealisticActions(){
  if(currentPlayMode() !== 'realistic' || !isForensicCase()) return [];
  const initialEvidence = CASE.evidence.filter(e=>e.unlocked);
  const visit = {
    id:'__real_scene_visit',
    kind:'مسرح الجريمة',
    label:'زيارة مسرح الجريمة وتأمين المكان',
    description:'ابدأ بمعاينة المكان قبل الاستجوابات. سجّل حدود المشهد ومداخل ومخارج المكان قبل لمس أي حاجة.',
    successText:'تم الوصول للمشهد وتأمينه. الخطوة الجاية توثيق المكان قبل جمع الآثار.',
    resultEvidenceIds:[],
    score:0,
  };
  const documentScene = {
    id:'__real_scene_document',
    kind:'توثيق',
    label:'صوّر ووثّق مسرح الجريمة',
    description:'وثّق الوضع الأصلي للمكان والعناصر الظاهرة قبل تحريكها أو جمعها.',
    successText:'تم تصوير وتوثيق المشهد. تقدر تبدأ المعاينة الدقيقة وجمع الآثار.',
    resultEvidenceIds:[],
    requiresActions:['__real_scene_visit'],
    score:0,
  };
  const evidenceActions = initialEvidence.map((ev,idx)=>{
    const meta = forensicActionKindForEvidence(ev);
    return {
      id:`__real_scene_ev_${ev.id}`,
      kind:meta.kind,
      label:`${meta.verb}: ${ev.title}`,
      description:'الإجراء ده جزء من المعاينة الواقعية. نتيجته هتدخل ملف الأدلة بعد التنفيذ، مش قبل كده.',
      successText:`تم توثيق النتيجة وإضافة «${ev.title}» لملف الأدلة.`,
      resultEvidenceIds:[ev.id],
      requiresActions:['__real_scene_document'],
      score:0,
      order:idx+1,
    };
  });
  return [visit, documentScene, ...evidenceActions];
}

function investigationActionsForCase(){
  return [...generatedRealisticActions(), ...(CASE.investigationActions || [])];
}

// في الوضع العادي الأدلة الأولية بتظهر زي قبل كده. في التحقيق الواقعي لقضايا القتل/الوفاة
// اللاعب لازم يزور مسرح الجريمة ويجمعها بنفسه من تبويب "فحص وتحريات".
function ensureSceneEvidence(){
  if(currentPlayMode()==='realistic' && isForensicCase()) return;
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

// تقييم اللاعب للقضية (نجوم 1-5 + تعليق اختياري) — محفوظ محليًا بعد الإرسال
// عشان شاشة النهاية تعرض "شكرًا" بدل الفورم لو رجع لنفس القضية تاني
function getSavedReview(caseId){
  try { return JSON.parse(localStorage.getItem('ca_review_'+caseId) || 'null'); }
  catch(e){ return null; }
}
function saveReviewLocally(caseId, review){
  try { localStorage.setItem('ca_review_'+caseId, JSON.stringify(review)); }
  catch(e){ /* localStorage ممكن يكون معطّل، مش مشكلة كبيرة */ }
}

// القضايا اللي اتبعت نتيجتها للـ leaderboard العام من الجهاز ده قبل كده —
// عشان إعادة لعب نفس القضية متضخّمش "إجمالي النقاط" بصفوف مكررة بلا حد أقصى
function getGlobalLeaderboardSubmittedIds(){
  try { return JSON.parse(localStorage.getItem('ca_global_lb_submitted') || '[]'); }
  catch(e){ return []; }
}
function markGlobalLeaderboardSubmitted(caseId){
  const list = getGlobalLeaderboardSubmittedIds();
  if(!list.includes(caseId)){ list.push(caseId); localStorage.setItem('ca_global_lb_submitted', JSON.stringify(list)); }
}

function loadLocalProgress(caseId){
  try { return JSON.parse(localStorage.getItem('ca_progress_'+caseId) || 'null'); }
  catch(e){ return null; }
}
function saveLocalProgress(caseId, progress){
  localStorage.setItem('ca_progress_'+caseId, JSON.stringify(progress));
  if(progress.ending) addCompletedId(caseId);
}
function clearLocalProgress(caseId){
  localStorage.removeItem('ca_progress_'+caseId);
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
   PLAYER IDENTITY — لهوية الليدربورد العام بس (مفيش حسابات حقيقية)
   ============================================================ */
const VISITOR_ID_KEY = 'ca_visitor_id';
function getVisitorId(){
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if(!id){
    id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2));
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

const PLAYER_NAME_KEY = 'ca_player_name';
const LEGACY_PLAYER_NAME_KEY = 'tarafkhyt_player_name';
function getPlayerName(){
  let name = localStorage.getItem(PLAYER_NAME_KEY);
  if(!name){
    name = localStorage.getItem(LEGACY_PLAYER_NAME_KEY);
    if(name) localStorage.setItem(PLAYER_NAME_KEY, name);
  }
  return name;
}
function setPlayerName(name){
  const cleanName = String(name || '').trim().replace(/\s+/g, ' ').slice(0,30);
  localStorage.setItem(PLAYER_NAME_KEY, cleanName);
  // نفس المفتاح اللي leaderboard.js كان بيستخدمه في النسخ القديمة.
  localStorage.setItem(LEGACY_PLAYER_NAME_KEY, cleanName);
}

function ensureLocalPlayerAlias(){
  const existing = getPlayerName();
  if(existing) return existing;
  const alias = 'محقق-' + Math.floor(1000 + Math.random() * 9000);
  setPlayerName(alias);
  return alias;
}

const PLAYER_REGISTRATION_SESSION_KEY = 'ca_player_registration_synced_v1';
async function syncPlayerRegistration(playerName, caseData){
  if(typeof registerPlayerName !== 'function') return false;

  const cleanName = String(playerName || '').trim().replace(/\s+/g, ' ').slice(0,30);
  if(cleanName.length < 2) return false;

  const visitorId = getVisitorId();
  const caseId = caseData && caseData.id != null ? String(caseData.id) : '';
  const signature = [visitorId, cleanName, location.pathname, caseId].join('|');

  try{
    if(sessionStorage.getItem(PLAYER_REGISTRATION_SESSION_KEY) === signature) return true;
  }catch(e){}

  const saved = await registerPlayerName({
    visitorId,
    playerName: cleanName,
    pagePath: location.pathname,
    caseId: caseId || null,
  });

  if(saved){
    try{ sessionStorage.setItem(PLAYER_REGISTRATION_SESSION_KEY, signature); }catch(e){}
  }
  return saved;
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

// عنوان الصفحة الافتراضي ووصفها — بنرجعلهم كل ما نرجع للأرشيف
const DEFAULT_PAGE_TITLE = document.title;
const DEFAULT_META_DESCRIPTION = (document.querySelector('meta[name="description"]') || {}).content || '';

// بتحدّث عنوان التاب ووصف الميتا حسب القضية المفتوحة — مهم لمحركات البحث
// (جوجل بيقرا الصفحة بعد ما الجافاسكريبت يشتغل) ولمعاينة اللينكات وقت المشاركة.
function updatePageMeta(caseData){
  try{
    document.title = `${caseData.title} | طرف الخيط`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc && caseData.teaser) metaDesc.setAttribute('content', caseData.teaser);
  }catch(e){}
}
function resetPageMeta(){
  try{
    document.title = DEFAULT_PAGE_TITLE;
    const metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc && DEFAULT_META_DESCRIPTION) metaDesc.setAttribute('content', DEFAULT_META_DESCRIPTION);
  }catch(e){}
}

function boot(){
  app.unlockedIds = getUnlockedIds();
  app.completedIds = getCompletedIds();
  applyFontSize();

  // بداية نظيفة لتاريخ التصفح: entry واحدة بس بتمثّل الأرشيف، وأي قضية بعد كده
  // بتتحط فوقها. كده زرار "رجوع" في المتصفح بيرجّع للأرشيف جوّه اللعبة
  // بدل ما يودّي المستخدم برّه الموقع خالص.
  try{ history.replaceState({ view:'library' }, '', location.href); }catch(e){}
  window.addEventListener('popstate', handlePopState);

  // لينك مباشر لقضية معينة (?case=case-id) — له أولوية على آخر قضية محفوظة،
  // عشان أي شير أو نتيجة بحث جوجل توديك للقضية بالذات اللي في الرابط.
  let urlCaseId = null;
  try{ urlCaseId = new URLSearchParams(location.search).get('case'); }catch(e){}
  const urlCase = urlCaseId ? CASES_REGISTRY.find(c => c.id === urlCaseId) : null;
  if(urlCase && isCaseReady(urlCase)){
    const urlLock = isCaseLocked(urlCase);
    if(!urlLock.locked){
      enterCase(urlCase);
      return;
    }
    // قضية من سلسلة لسه مقفولة — نوريله الأرشيف ونفتحله معاينتها بدل ما نرميه عادي
    clearActiveCase();
    showLibrary();
    openCasePreview(urlCase, urlLock);
    return;
  }

  // لو كان فيه قضية شغالة قبل الريفريش، رجّع المستخدم لها تاني بدل الأرشيف
  const activeCaseId = getActiveCase();
  const activeCase = activeCaseId ? CASES_REGISTRY.find(c => c.id === activeCaseId) : null;
  if(activeCase && isCaseReady(activeCase) && !isCaseLocked(activeCase).locked){
    enterCase(activeCase);
  } else {
    clearActiveCase();
    showLibrary();
  }
}

function handlePopState(e){
  const state = e.state;
  if(state && state.view === 'case' && state.caseId){
    const c = CASES_REGISTRY.find(x=>x.id === state.caseId);
    if(c && isCaseReady(c) && !isCaseLocked(c).locked){
      enterCase(c, { historyMode:'none' });
      return;
    }
  }
  returnToLibraryFromCase({ historyMode:'none' });
}

// نقطة رجوع موحّدة للأرشيف من جوّه أي قضية (زرار، تحذير محتوى، شاشة النهاية، أو زرار المتصفح)
function returnToLibraryFromCase(opts={}){
  stopAmbience();
  if(CASE && game){
    gaTrack('case_exit', {
      completed: game.ending ? 'yes' : 'no',
      ending: game.ending || 'incomplete',
      evidence_count: game.collected ? game.collected.size : 0,
      score: game.score || 0,
    });
    if(typeof logCaseEvent === 'function'){
      logCaseEvent({
        caseId: CASE.id,
        visitorId: getVisitorId(),
        eventType: 'exit',
        completed: !!game.ending,
        ending: game.ending || null,
      });
    }
  }
  if(CASE) persistProgress();
  clearActiveCase();
  resetPageMeta();
  if(opts.historyMode !== 'none'){
    try{
      const url = new URL(location.href);
      url.searchParams.delete('case');
      history.replaceState({ view:'library' }, '', url.toString());
    }catch(e){}
  }
  app.unlockedIds = getUnlockedIds();
  app.completedIds = getCompletedIds();
  showLibrary();
}

/* ============================================================
   LIBRARY SCREEN
   ============================================================ */

function isCaseLocked(caseData){
  if(caseData.seriesId && caseData.seriesOrder > 1){
    const prev = CASES_REGISTRY.find(c => c.seriesId===caseData.seriesId && c.seriesOrder===caseData.seriesOrder-1);
    if(prev && !app.completedIds.includes(prev.id)){
      return { locked:true, reason:'series' };
    }
  }
  return { locked:false };
}

let librarySearchDebounce = null;

function showLibrary(){
  app.view = 'library';

  // بناء قايمة الفلاتر المتاحة فعليًا (بس اللي عنده قضية واحدة على الأقل)
  const usedCategories = new Set(CASES_REGISTRY.flatMap(c=>c.categories||[]));
  const filters = [{key:'all', label:'الكل'}, {key:'free', label:'مجانية'}];
  LIBRARY_FILTER_CATEGORIES.forEach(cat=>{
    if(usedCategories.has(cat)) filters.push({key:cat, label: CATEGORY_LABELS[cat] || cat});
  });

  function matchesFilter(c){
    if(app.libraryFilter==='all') return true;
    if(app.libraryFilter==='free') return true;
    return (c.categories||[]).includes(app.libraryFilter);
  }

  function matchesSearch(c){
    const q = app.librarySearch.trim().toLowerCase();
    if(!q) return true;
    const haystack = [c.title, c.teaser, c.subtitle, c.caseNo, caseLocationText(c, true)]
      .filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(q);
  }

  function sortCases(list){
    const sorted = [...list];
    switch(app.librarySort){
      case 'shortest':
        sorted.sort((a,b)=> (a.estMinutes||0) - (b.estMinutes||0));
        break;
      case 'hardest': {
        const rank = {'سهلة':0, 'متوسطة':1, 'صعبة':2, 'صعبة جدًا':3};
        sorted.sort((a,b)=> (rank[b.difficulty]??0) - (rank[a.difficulty]??0));
        break;
      }
      case 'newest':
      default: {
        // الأحدث = ترتيب عكسي لمصفوفة CASES_REGISTRY نفسها (آخر ما اتضاف يظهر الأول)
        const orderIndex = new Map(CASES_REGISTRY.map((c,i)=>[c.id,i]));
        sorted.sort((a,b)=> orderIndex.get(b.id) - orderIndex.get(a.id));
      }
    }
    // القضايا الجاهزة (أصولها البصرية مكتملة) دايمًا الأول، وبعدين "قريبًا"،
    // مع الحفاظ على ترتيب الفرز المختار جوه كل مجموعة (sort مستقرة في JS الحديث)
    sorted.sort((a,b)=> (isCaseReady(b)?1:0) - (isCaseReady(a)?1:0));
    return sorted;
  }

  const filterBar = filters.map(f=>
    `<button class="lib-filter ${app.libraryFilter===f.key?'active':''}" data-filter="${f.key}">${f.label}</button>`
  ).join('');

  const allMatching = sortCases(CASES_REGISTRY.filter(c => matchesFilter(c) && matchesSearch(c)));
  const visibleCases = allMatching.slice(0, app.libraryShown);
  const hasMore = allMatching.length > visibleCases.length;

  const cards = visibleCases.map(c=>{
    const lock = isCaseLocked(c);
    const ready = isCaseReady(c);
    const badges = [];
    if(c.seriesId) badges.push(`<span class="lib-badge series mono">الحلقة ${c.seriesOrder}</span>`);
    if(c.contentWarning) badges.push(`<span class="lib-badge adult mono">+18</span>`);
    const lockOverlay = lock.locked ? `
      <div class="lib-lock-overlay">
        <div style="font-size:22px;">🔒</div>
        <div>خلّص الحلقة اللي قبلها الأول</div>
      </div>` : '';
    const comingSoonOverlay = !ready ? `
      <div class="lib-lock-overlay coming-soon-overlay">
        <div style="font-size:22px;">⏳</div>
        <div>قريبًا</div>
      </div>` : '';

    // حالة القضية: لسه مبتدأش / قيد التحقيق / مكتملة — وكل حالة ليها زرار مناسب
    const progress = (!lock.locked && ready) ? loadLocalProgress(c.id) : null;
    const isCompleted = !!(progress && progress.ending);
    const evidenceTotal = c.evidence.length;
    const evidenceCollected = progress && progress.collected ? progress.collected.length : 0;
    const pct = evidenceTotal ? Math.round((evidenceCollected/evidenceTotal)*100) : 0;
    let statusHTML = '';
    let actionsHTML = '';
    if(!lock.locked && ready){
      if(isCompleted){
        const endingLabel = progress.ending==='good' ? 'نجحت في القضية' : progress.ending==='partial' ? 'حل جزئي' : 'اتهام غلط';
        const endingTone = progress.ending==='good' ? 'good' : progress.ending==='partial' ? 'partial' : 'bad';
        statusHTML = `<div class="lib-progress-badge ${endingTone} mono">✓ قضية مكتملة — ${endingLabel} · ${pct}% أدلة</div>`;
        actionsHTML = `<button class="btn ghost lib-replay-btn mono" data-replay-case="${c.id}" style="width:100%; margin-top:8px; font-size:12px;">إعادة اللعب ↺</button>`;
      } else if(progress){
        statusHTML = `<div class="lib-progress-badge inprogress mono">قيد التحقيق — ${pct}% أدلة</div>`;
        actionsHTML = `
          <button class="btn ghost lib-continue-btn mono" data-continue-case="${c.id}" style="width:100%; margin-top:8px; font-size:12px;">استكمل التحقيق ←</button>
          <button class="btn ghost lib-restart-btn mono" data-restart-case="${c.id}" style="width:100%; margin-top:6px; font-size:11px; color:var(--ink-dim);">ابدأ من الأول</button>
        `;
      }
    }

    return `
      <div class="lib-card ${!ready ? 'coming-soon' : ''}" data-case="${c.id}" data-locked="${lock.locked}" data-lock-reason="${lock.reason||''}" data-ready="${ready}">
        ${badges.join('')}
        <button class="lib-preview-btn mono" data-preview-case="${c.id}" aria-label="معاينة سريعة" title="معاينة سريعة">ⓘ</button>
        <div class="cover"><img src="${c.coverImg}" class="photo-tone" alt="${c.title}" loading="lazy">${!ready ? comingSoonOverlay : lockOverlay}</div>
        <div class="body">
          <h4>${c.title}</h4>
          <div class="meta">${c.caseNo} · ${c.estMinutes} دقيقة · ${c.difficulty}</div>
          <div class="lib-location">📍 ${caseLocationText(c)}</div>
          ${c.teaser ? `<p class="lib-teaser">${c.teaser}</p>` : ''}
          ${statusHTML}
          ${actionsHTML}
        </div>
      </div>
    `;
  }).join('') || `<p class="dim" style="grid-column:1/-1; text-align:center; padding:30px 0;">${app.librarySearch ? 'مفيش نتايج مطابقة للبحث.' : 'مفيش قضايا في التصنيف ده لسه.'}</p>`;

  const resultsCountLabel = `${allMatching.length} قضية${app.librarySearch || app.libraryFilter!=='all' ? ' مطابقة' : ' في الأرشيف'}`;

  const loadMoreHTML = hasMore
    ? `<div style="text-align:center; margin-top:22px;">
         <button class="btn ghost mono" id="lib-load-more">حمّل المزيد (${allMatching.length - visibleCases.length} باقي) ↓</button>
       </div>`
    : '';

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
      <button type="button" class="lib-free-start-cta" id="lib-browse-cases">
        <span>تصفّح القضايا المتاحة</span>
        <span class="lib-free-start-arrow" aria-hidden="true">↓</span>
      </button>
      <div class="lib-free-start-note">كل القضايا الجاهزة مجانية بالكامل — من غير تسجيل أو دفع</div>
      <svg class="lib-hero-thread" viewBox="0 0 220 22" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6,6 C60,18 150,-2 214,10"/>
      </svg>
      <div class="lib-hero-sub">اختار قضيتك وابدأ التحقيق</div>
    </div>

    <div class="lib-toolbar">
      <div class="lib-search-wrap">
        <span class="lib-search-icon mono">⌕</span>
        <input type="text" id="lib-search" class="lib-search-input" placeholder="دوّر باسم القضية..." value="${app.librarySearch.replace(/"/g,'&quot;')}" autocomplete="off">
      </div>
      <select id="lib-sort" class="lib-sort-select mono">
        <option value="newest" ${app.librarySort==='newest'?'selected':''}>الأحدث</option>
        <option value="shortest" ${app.librarySort==='shortest'?'selected':''}>الأقصر مدة</option>
        <option value="hardest" ${app.librarySort==='hardest'?'selected':''}>الأصعب</option>
      </select>
      <a href="leaderboard.html" class="btn ghost mono lib-leaderboard-link" style="white-space:nowrap; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">🏆 لوحة المتصدرين</a>
      <a href="profile.html" class="btn ghost mono lib-profile-link" style="white-space:nowrap; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">🕵️ ملفي</a>
      <a href="how-to-play.html" class="btn ghost mono lib-howtoplay-link" style="white-space:nowrap; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">📖 إزاي تلعب</a>
    </div>

    ${socialLinksHTML('library')}

    <div class="lib-filters-scroll" id="cases-list-start"><div class="lib-filters">${filterBar}</div></div>

    <div class="lib-results-count mono">${resultsCountLabel}</div>

    <div class="lib-grid">${cards}</div>

    ${loadMoreHTML}
  `;

  // ------- زر تصفح القضايا في أول الشاشة -------
  const browseCasesBtn = document.getElementById('lib-browse-cases');
  if(browseCasesBtn){
    browseCasesBtn.addEventListener('click', ()=>{
      gaTrack('browse_cases_cta_click', { cta_location:'library_hero' });
      const target = document.getElementById('cases-list-start');
      if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  }

  // ------- الفلاتر -------
  document.querySelectorAll('.lib-filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      app.libraryFilter = btn.dataset.filter;
      app.libraryShown = LIBRARY_PAGE_SIZE; // نرجع لأول صفحة عند تغيير الفلتر
      showLibrary();
    });
  });

  // ------- البحث (مع تأخير بسيط عشان الأداء وقت الكتابة) -------
  const searchInput = document.getElementById('lib-search');
  if(searchInput){
    searchInput.addEventListener('input', (e)=>{
      const value = e.target.value;
      clearTimeout(librarySearchDebounce);
      librarySearchDebounce = setTimeout(()=>{
        app.librarySearch = value;
        app.libraryShown = LIBRARY_PAGE_SIZE;
        showLibrary();
        // نرجّع الفوكس للمربع بعد إعادة الرسم عشان المستخدم يكمل يكتب عادي
        const refocused = document.getElementById('lib-search');
        if(refocused){
          refocused.focus();
          refocused.selectionStart = refocused.selectionEnd = refocused.value.length;
        }
      }, 300);
    });
  }

  // ------- الترتيب -------
  const sortSelect = document.getElementById('lib-sort');
  if(sortSelect){
    sortSelect.addEventListener('change', (e)=>{
      app.librarySort = e.target.value;
      app.libraryShown = LIBRARY_PAGE_SIZE;
      showLibrary();
    });
  }

  // ------- تحميل المزيد -------
  const loadMoreBtn = document.getElementById('lib-load-more');
  if(loadMoreBtn){
    loadMoreBtn.addEventListener('click', ()=>{
      app.libraryShown += LIBRARY_PAGE_SIZE;
      showLibrary();
    });
  }

  // ------- كروت القضايا -------
  document.querySelectorAll('.lib-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      const caseData = CASES_REGISTRY.find(c => c.id === card.dataset.case);
      // زرار المعاينة السريعة (ⓘ) — بيفتح تفاصيل القضية من غير ما يدخلها، متاح حتى لو "قريبًا"
      const previewBtn = e.target.closest('[data-preview-case]');
      if(previewBtn){
        e.stopPropagation();
        openCasePreview(caseData, isCaseLocked(caseData));
        return;
      }
      // قضايا "قريبًا" — لسه مفيش صور كافية، امنع الدخول لحد ما تكتمل
      if(card.dataset.ready === 'false'){
        return;
      }
      if(card.dataset.locked === 'true'){
        return;
      }
      // أزرار "إعادة من الأول" و"إعادة اللعب" بتمسح التقدّم الأول قبل الدخول
      const restartBtn = e.target.closest('[data-restart-case], [data-replay-case]');
      if(restartBtn){
        e.stopPropagation();
        if(!confirm('هيتم مسح تقدّمك الحالي في القضية دي وتبدأ من الأول. متأكد؟')) return;
        clearLocalProgress(caseData.id);
        enterCase(caseData);
        return;
      }
      // زرار "استكمل التحقيق" أو أي كليك تاني على الكارت — بيدخل عادي (بيرجّع تقدّمك المحفوظ لو موجود)
      enterCase(caseData);
    });
  });
}

/* ============================================================
   CASE QUICK PREVIEW — نظرة سريعة على القضية من غير ما تدخلها
   ============================================================ */
function openCasePreview(caseData, lock){
  const c = caseData;
  gaTrack('case_preview', {
    case_id: String(c.id || ''),
    case_title: String(c.title || ''),
    case_no: String(c.caseNo || ''),
    locked: lock && lock.locked ? 'yes' : 'no',
  });
  const tags = [];
  if(c.contentWarning) tags.push('+18');
  if(c.seriesId) tags.push(`الحلقة ${c.seriesOrder}`);
  const tagsHTML = tags.length ? `<div class="mono" style="color:var(--amber); font-size:11px; letter-spacing:.06em; margin-bottom:8px;">${tags.join(' · ')}</div>` : '';

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px; padding:0; overflow:hidden;">
      <div style="aspect-ratio:16/9; overflow:hidden; position:relative;">
        <img src="${c.coverImg}" class="photo-tone" alt="${c.title}" style="width:100%; height:100%; object-fit:cover;">
        <div style="position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgba(24,28,37,.92) 100%);"></div>
        <button id="previewClose" class="prologue-back-btn mono" style="position:absolute; top:12px; left:12px; padding:6px 10px;">✕</button>
      </div>
      <div style="padding:18px 20px 22px;">
        ${tagsHTML}
        <h3 style="margin-bottom:4px;">${c.title}</h3>
        <div class="mono dim" style="font-size:12px;">${c.caseNo} · ${c.subtitle}</div>
        <div class="case-location preview-location">📍 ${caseLocationText(c, true)}</div>
        <p style="font-size:14px; line-height:1.8; color:var(--ink-dim);">${c.teaser || ''}</p>
        <div style="display:flex; gap:14px; margin-top:14px; flex-wrap:wrap; font-size:12px; color:var(--ink-dim);">
          <span>⏱ ${c.estMinutes} دقيقة</span>
          <span>🎚 ${c.difficulty}</span>
          <span>🕵️ ${c.suspects.length} مشتبه بيهم</span>
          <span>🔍 ${c.evidence.length} دليل</span>
        </div>
        <button class="btn" id="previewEnter" style="width:100%; margin-top:16px;">
          ${lock.locked ? 'خلّص الحلقة اللي قبلها الأول' : 'ابدأ التحقيق ←'}
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('#previewClose').addEventListener('click', ()=>overlay.remove());
  const enterBtn = overlay.querySelector('#previewEnter');
  if(lock.locked && lock.reason==='series'){
    enterBtn.disabled = true;
    enterBtn.style.opacity = '.5';
    enterBtn.style.cursor = 'not-allowed';
  } else {
    enterBtn.addEventListener('click', ()=>{
      overlay.remove();
      enterCase(c);
    });
  }
}
/* ============================================================
   ENTER A CASE
   ============================================================ */

/* ============================================================
   NAME PROMPT — بيتعرض مرة واحدة بس، قبل أول قضية، عشان يتسجل
   اسمك في الليدربورد العام. ممكن "تخطي" ويتحطلك اسم افتراضي.
   ============================================================ */
function showNamePrompt(onDone, caseData){
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="tag" style="color:var(--signal);">🕵️ قبل ما تبدأ</div>
      <h3>اختار لقبك</h3>
      <p class="dim">اللقب ده هيظهر في الليدربورد العام لما تحل قضية. تقدر تسيبه ومتحطش اسمك الحقيقي.</p>
      <input type="text" id="nameInput" placeholder="مثلاً: المحقق سامي" maxlength="30" style="width:100%; background:var(--panel-2); border:1px solid var(--line); color:var(--ink); padding:11px 14px; border-radius:3px; text-align:center; margin:14px 0 10px;">
      <button class="btn" id="nameConfirm" style="width:100%;">يلا نبدأ ←</button>
      <button class="btn ghost" id="nameSkip" style="width:100%; margin-top:8px;">تخطي (اسم عشوائي)</button>
      <p id="nameSaveStatus" class="dim mono" style="min-height:18px; margin-top:10px; font-size:11px;"></p>
    </div>
  `;
  document.body.appendChild(overlay);
  const input = overlay.querySelector('#nameInput');
  const confirmBtn = overlay.querySelector('#nameConfirm');
  const skipBtn = overlay.querySelector('#nameSkip');
  const status = overlay.querySelector('#nameSaveStatus');
  let saving = false;
  input.focus();
  const finish = async (name)=>{
    if(saving) return;
    const cleanName = String(name || '').trim().replace(/\s+/g, ' ').slice(0,30);
    if(cleanName.length < 2){
      status.textContent = 'اكتب لقب من حرفين على الأقل، أو اختار اسم عشوائي.';
      status.style.color = 'var(--danger)';
      input.focus();
      return;
    }

    saving = true;
    input.disabled = true;
    confirmBtn.disabled = true;
    skipBtn.disabled = true;
    status.textContent = 'جارِ تسجيل اسمك...';
    status.style.color = 'var(--ink-dim)';

    setPlayerName(cleanName);
    const savedOnline = await syncPlayerRegistration(cleanName, caseData);
    if(!savedOnline){
      // التسجيل المحلي كفاية لبدء اللعب، والمحاولة هتتكرر عند دخول القضية.
      console.warn('Player name was saved locally; Supabase registration will retry.');
    }
    overlay.remove();
    onDone();
  };
  confirmBtn.addEventListener('click', ()=>{
    const v = input.value.trim();
    finish(v);
  });
  skipBtn.addEventListener('click', ()=>{
    finish('محقق-' + Math.floor(1000+Math.random()*9000));
  });
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') confirmBtn.click(); });
}

function showPlayModePrompt(caseData, opts={}){
  if(document.getElementById('playModeOverlay')) return;
  const overlay = document.createElement('div');
  overlay.className='overlay';
  overlay.id='playModeOverlay';
  const forensic = isForensicCase(caseData);
  overlay.innerHTML = `
    <div class="modal" style="max-width:620px;">
      <div class="tag" style="color:var(--signal);">🎮 أسلوب اللعب</div>
      <h3 style="margin:8px 0 6px;">عايز تحقق إزاي؟</h3>
      <p class="dim" style="line-height:1.9;">الاختيار بيتحفظ للقضية الحالية ومش بيتغير في نص التحقيق.</p>
      <div class="evidence-grid" style="margin-top:14px;">
        <div class="evidence-card" style="cursor:default;">
          <div class="ev-top"><span class="tag mono">عادي</span><span>⚡</span></div>
          <h3>تحقيق سريع</h3>
          <p class="dim">الأدلة الأولية بتكون جاهزة، والتلميحات بالمستوى المعتاد. مناسب لو عايز تركز على القصة والاستنتاج من غير خطوات ميدانية زيادة.</p>
          <button class="btn" data-play-mode="normal" style="width:100%;">اختار الوضع العادي</button>
        </div>
        <div class="evidence-card" style="cursor:default;">
          <div class="ev-top"><span class="tag mono">واقعي</span><span>🧪</span></div>
          <h3>تحقيق واقعي</h3>
          <p class="dim">توجيه أقل وتلميحات أقل.${forensic ? ' في القضية دي هتزور مسرح الجريمة وتجمع/تفحص الأدلة المادية بنفسك قبل ما تدخل الملف.' : ' في القضايا اللي فيها مسرح جريمة أو أدلة جنائية، خطوات الفحص بتكون يدوية أكتر.'}</p>
          <button class="btn" data-play-mode="realistic" style="width:100%;">اختار التحقيق الواقعي</button>
        </div>
      </div>
      <button class="btn ghost" id="playModeBack" style="width:100%;margin-top:10px;">رجوع</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-play-mode]').forEach(btn=>btn.addEventListener('click',()=>{
    const mode=btn.dataset.playMode;
    overlay.remove();
    enterCase(caseData, {...opts, playMode:mode, modeChosen:true});
  }));
  overlay.querySelector('#playModeBack').addEventListener('click',()=>overlay.remove());
}

function enterCase(caseData, opts={}){
  // حارس نهائي: القضية الناقصة بصريًا ماينفعش تتفتح حتى من Resume/History أو نداء مباشر.
  if(!caseData || !isCaseReady(caseData)){
    clearActiveCase();
    showLibrary();
    return;
  }
  // أول تجربة تبدأ فورًا؛ اللقب العشوائي بيتحفظ محليًا ويقدر اللاعب
  // يغيره بعدين من صفحة "ملفي" من غير ما نعطّل بداية القضية.
  ensureLocalPlayerAlias();
  const savedBeforeStart = loadLocalProgress(caseData.id);
  if(!savedBeforeStart && !opts.modeChosen && !opts.playMode){
    showPlayModePrompt(caseData, opts);
    return;
  }
  // يسجل أيضًا اللاعبين القدامى اللي كان اسمهم محفوظ قبل إضافة النظام الجديد.
  syncPlayerRegistration(getPlayerName(), caseData).catch(err=>{
    console.error('syncPlayerRegistration failed', err);
  });
  CASE = caseData;
  setActiveCase(caseData.id);
  updatePageMeta(caseData);
  game = freshGameState();
  game.playMode = opts.playMode === 'realistic' ? 'realistic' : 'normal';
  game.points = null; // نقاط الأسئلة/المواجهات اتشالت؛ مفيش فعل تحقيق بيتكلف رصيد.

  if(opts.historyMode !== 'none'){
    try{
      const url = new URL(location.href);
      url.searchParams.set('case', caseData.id);
      history.pushState({ view:'case', caseId: caseData.id }, '', url.toString());
    }catch(e){}
  }

  const saved = loadLocalProgress(CASE.id);
  if(saved){
    const validEvidenceIds = new Set(CASE.evidence.map(e=>e.id));
    game.collected = new Set((saved.collected || []).filter(id=>validEvidenceIds.has(id)));
    if(Number.isFinite(saved.startedAt) && saved.startedAt > 0) game.startedAt = saved.startedAt;
    game.interrogated = {};
    Object.entries(saved.interrogated || {}).forEach(([sid, arr])=>{ game.interrogated[sid] = new Set(arr); });
    game.audioSolved = !!saved.audioSolved;
    game.cameraSolved = !!saved.cameraSolved;
    game.ending = saved.ending || null;
    game.playMode = saved.playMode === 'realistic' ? 'realistic' : 'normal';
    game.points = null;
    game.confronted = {};
    Object.entries(saved.confronted || {}).forEach(([sid, arr])=>{ game.confronted[sid] = new Set(arr); });
    game.connections = saved.connections || {};
    game.hintsUsed = saved.hintsUsed || 0;
    game.contradictionSolved = !!saved.contradictionSolved;
    game.classifications = saved.classifications || {};
    game.interrogationClosed = saved.interrogationClosed || {};
    if(Array.isArray(saved.suspectOrder) && saved.suspectOrder.length) game.suspectOrder = saved.suspectOrder;
    if(saved.timelineOrder && saved.timelineOrder.length) game.timelineOrder = saved.timelineOrder;
    game.timelineSolved = !!saved.timelineSolved;
    game.theoryAnswers = saved.theoryAnswers || {};
    if(saved.theoryOptionOrder && Object.keys(saved.theoryOptionOrder).length) game.theoryOptionOrder = saved.theoryOptionOrder;
    game.score = saved.score || 0;
    game.scoreLog = saved.scoreLog || [];
    game.secretsFound = new Set(saved.secretsFound || []);
    game.dnaLabSolved = !!saved.dnaLabSolved;
    game.alibiGridSolved = !!saved.alibiGridSolved;
    game.ledgerAuditSolved = !!saved.ledgerAuditSolved;
    game.polygraphSolved = !!saved.polygraphSolved;
    game.polygraphAsked = new Set(saved.polygraphAsked || []);
    game.floorPlanSolved = !!saved.floorPlanSolved;
    game.witnessReliabilitySolved = !!saved.witnessReliabilitySolved;
    game.handwritingSolved = !!saved.handwritingSolved;
    game.handwritingSelected = saved.handwritingSelected || [];
    game.codeLockSolved = !!saved.codeLockSolved;
    game.codeLockInput = saved.codeLockInput || '';
    game.cipherSolved = !!saved.cipherSolved;
    game.cipherSelections = saved.cipherSelections || {};
    game.cipherInput = saved.cipherInput || '';
    game.matchSolved = !!saved.matchSolved;
    game.matchSelections = saved.matchSelections || {};
    game.investigationActionsDone = new Set(saved.investigationActionsDone || []);
    game.backgroundChecks = new Set(saved.backgroundChecks || []);
  } else {
    addUnlockedId(CASE.id); // قضية مجانية، تتسجل كمفتوحة أول ما تتلعب
    app.unlockedIds = getUnlockedIds();
  }

  // أدلة مسرح الجريمة (unlocked:true) لازم تكون متجمّعة من البداية دايمًا،
  // سواء قضية جديدة أو تقدّم متسجل قبل كده (بيتم دمجها بهدوء من غير toast)
  ensureSceneEvidence();

  gaTrack(saved ? 'case_resume' : 'case_start', {
    difficulty: String(CASE.difficulty || ''),
    est_minutes: Number(CASE.estMinutes) || 0,
    evidence_total: CASE.evidence.length,
    suspect_total: CASE.suspects.length,
    play_mode: currentPlayMode(),
    forensic_case: isForensicCase() ? 'yes' : 'no',
  });
  if(!saved && typeof logCaseEvent === 'function'){
    logCaseEvent({ caseId: CASE.id, visitorId: getVisitorId(), eventType: 'start' });
  }

  // لو فيه تقدّم محفوظ فعلاً (يعني إنت مستكمل مش بادئ من جديد)، ادخل غرفة
  // التحقيق على طول من غير ما تعيد شاشة الانترو والمقدمة تاني من الأول
  if(saved){
    app.view = 'case';
    mountGameShell();
    return;
  }

  if(CASE.contentWarning) showContentWarning({ skipSplash:!!opts.skipSplash });
  else if(opts.skipSplash) startPrologue();
  else showCaseSplash();
}

function showContentWarning(opts={}){
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
    if(opts.skipSplash) startPrologue();
    else showCaseSplash();
  });
  document.getElementById('warnBack').addEventListener('click', ()=>{
    document.getElementById('warnGate').remove();
    returnToLibraryFromCase();
  });
}

function persistProgress(){
  saveLocalProgress(CASE.id, {
    startedAt: game.startedAt,
    playMode: currentPlayMode(),
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
    suspectOrder: game.suspectOrder,
    timelineOrder: game.timelineOrder,
    timelineSolved: game.timelineSolved,
    theoryAnswers: game.theoryAnswers,
    theoryOptionOrder: game.theoryOptionOrder,
    score: game.score,
    scoreLog: game.scoreLog,
    secretsFound: [...game.secretsFound],
    dnaLabSolved: game.dnaLabSolved,
    alibiGridSolved: game.alibiGridSolved,
    ledgerAuditSolved: game.ledgerAuditSolved,
    polygraphSolved: game.polygraphSolved,
    polygraphAsked: [...game.polygraphAsked],
    floorPlanSolved: game.floorPlanSolved,
    witnessReliabilitySolved: game.witnessReliabilitySolved,
    handwritingSolved: game.handwritingSolved,
    handwritingSelected: game.handwritingSelected,
    codeLockSolved: game.codeLockSolved,
    codeLockInput: game.codeLockInput,
    cipherSolved: game.cipherSolved,
    cipherSelections: game.cipherSelections,
    cipherInput: game.cipherInput,
    matchSolved: game.matchSolved,
    matchSelections: game.matchSelections,
    investigationActionsDone: [...game.investigationActionsDone],
    backgroundChecks: [...game.backgroundChecks],
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
      <button id="splashBackBtn" class="prologue-back-btn mono">← الأرشيف</button>
      <div class="splash-caseno mono">${CASE.caseNo} — ${CASE.subtitle}</div>
      <div class="splash-location">📍 ${caseLocationText(CASE)}</div>
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
  document.getElementById('splashBackBtn').addEventListener('click', e=>{
    e.stopPropagation();
    splash.remove();
    returnToLibraryFromCase();
  });
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
      <button id="prologueBackBtn" class="prologue-back-btn mono">← الأرشيف</button>
      <button id="prologueSfxToggle" class="prologue-sfx-btn mono" aria-label="كتم/تشغيل الصوت">${sfxEnabled() ? '🔊' : '🔇'}</button>
      <button id="prologueSkipBtn" class="prologue-skip-btn mono">تخطي المقدمة ←</button>
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
  document.getElementById('prologueSkipBtn').addEventListener('click', e=>{
    e.stopPropagation();
    endPrologue('skipped');
  });
  document.getElementById('prologueBackBtn').addEventListener('click', e=>{
    e.stopPropagation();
    document.getElementById('prologue').remove();
    returnToLibraryFromCase();
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

function endPrologue(reason='complete'){
  gaTrack('prologue_complete', {
    slide_count: CASE.prologue ? CASE.prologue.length : 0,
    completion_reason: reason,
  });
  const p = document.getElementById('prologue');
  if(!p) return;
  p.classList.add('hide');
  setTimeout(()=>{ p.remove(); mountGameShell(); }, 500);
}

/* ============================================================
   GAME SHELL (tabs + panel), mounted after splash/prologue
   ============================================================ */

function mountGameShell(){
  const modeHTML = currentPlayMode()==='realistic'
    ? `<span class="tag mono" style="color:var(--signal);">🧪 تحقيق واقعي</span>`
    : `<span class="tag mono">⚡ وضع عادي</span>`;
  appRoot.innerHTML = `
    <div class="masthead">
      <div>
        <div class="case-no mono">${CASE.caseNo} — ${CASE.subtitle}</div>
        <div class="case-location masthead-location">📍 ${caseLocationText(CASE, true)}</div>
        <h1 class="flicker">${CASE.title}</h1>
      </div>
      <div class="stat-line">
        <button class="btn ghost" id="backToLibrary" style="font-size:12px; padding:6px 12px;">← الأرشيف</button>
        <button class="btn ghost" id="settingsBtn" style="font-size:12px; padding:6px 12px;">⚙️ إعدادات</button>
        <button class="btn ghost" id="hintBtn" style="font-size:12px; padding:6px 12px;">💡 تلميح</button>
        <span class="status-dot"></span>
        <span id="evCount" class="mono">0 / ${CASE.evidence.length}</span> أدلة مجمّعة
        ${modeHTML}
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
    returnToLibraryFromCase();
  });
  render();
}

/* ============================================================
   POINTS INFO — شرح نظام النقاط، بيظهر تلقائي أول مرة، وبعدين
   متاح من زرار "؟" في أي وقت.
   ============================================================ */
function showPointsInfo(){
  // متروكة للتوافق مع أي زر قديم؛ مفيش رصيد أسئلة داخل التحقيق بعد التحديث.
  showToast('مفيش نقاط بتتخصم على الأسئلة أو المواجهات. تقييم التحقيق بيظهر في النهاية فقط.', 'amber');
}

/* ============================================================
   RENDER ROOT
   ============================================================ */

const TAB_ORDER = ['briefing','fieldwork','evidence','suspects','audio','camera','contradiction','timeline','dnaLab','alibiGrid','ledgerAudit','polygraph','floorPlan','witnessReliability','handwriting','codeLock','cipher','match','accusation','theory','ending'];

function render(){
  renderTabs();
  renderPanel();
  document.getElementById('evCount').textContent = game.collected.size + ' / ' + CASE.evidence.length;
  updatePointsUI();
}

function updatePointsUI(){
  const el = document.getElementById('ptsCount');
  if(el) el.textContent = game.points;
  const scoreEl = document.getElementById('scoreCount');
  if(scoreEl) scoreEl.textContent = game.score;
}

/* ============================================================
   SCORE — نظام تسجيل نقاط منفصل عن رصيد نقاط التحقيق.
   كل حركة مهمة في القضية (صح أو غلط) بتأثر فيه، وهو اللي بيتبعت
   للّيدربورد العام آخر القضية. القيمة ممكن تكون موجبة أو سالبة.
   ============================================================ */
function addScore(delta, reason, opts={}){
  if(delta === 0) return;
  game.score += delta;
  game.scoreLog.push({ delta, reason, at: Date.now() });
  updatePointsUI();
  persistProgress();
  if(opts.silent) return;
  if(delta > 0){
    showToast(`+${delta} نقطة — ${reason}`, 'score-up');
  } else {
    showToast(`${delta} نقطة — ${reason}`, 'score-down');
  }
}

// للتوافق مع الكود القديم فقط: الأسئلة والمواجهات لم تعد تستهلك أي رصيد.
function spendPoint(){
  return true; // الأسئلة والمواجهات مجانية بالكامل — الصعوبة جاية من الاستنتاج مش من رصيد نقاط.
}

// قواعد صعوبة موحّدة — الصعوبة هنا بتقلل التوجيه المباشر من الواجهة،
// مش بتخبي أدلة عشوائيًا ولا تغيّر حلول القضايا.
function caseDifficultyRank(){
  const d = String(CASE && CASE.difficulty || '').trim();
  if(d.includes('صعبة جدًا') || d.includes('صعب جدًا')) return 3;
  if(d.includes('صعبة') || d.includes('صعب')) return 2;
  if(d.includes('متوسطة') || d.includes('متوسط')) return 1;
  return 0;
}
function maxHintsForCase(){
  const r = caseDifficultyRank();
  const base = r>=3 ? 1 : r===2 ? 1 : r===1 ? 2 : 3;
  return currentPlayMode()==='realistic' ? Math.max(0, base-1) : base;
}
function evidenceCompletionNeeded(){
  const total = CASE.evidence.length;
  const r = caseDifficultyRank();
  let ratio = r>=3 ? 0.88 : r===2 ? 0.82 : r===1 ? 0.75 : 0.65;
  if(currentPlayMode()==='realistic') ratio = Math.min(0.95, ratio + 0.05);
  return Math.min(total, Math.max(Math.min(5,total), Math.ceil(total*ratio)));
}
function minimumAccusationLinks(){
  const required = CASE.conclusiveRequired || 2;
  const r = caseDifficultyRank();
  if(r===0) return Math.min(1, required);
  if(r===1) return Math.min(2, required);
  return required;
}
function theoryAccuracy(){
  const cfg = CASE.theoryBuilder;
  if(!cfg || !cfg.enabled || !Array.isArray(cfg.questions) || !cfg.questions.length){
    return {enabled:false,total:0,correct:0,required:0,passed:true};
  }
  const total = cfg.questions.length;
  const correct = cfg.questions.filter(q=>game.theoryAnswers && game.theoryAnswers[q.id]===q.correctOptionId).length;
  const r = caseDifficultyRank();
  const required = r===0 ? 0 : r===1 ? Math.max(1,total-1) : total;
  return {enabled:true,total,correct,required,passed:correct>=required};
}

// نظام تلميحات عام — بيدوّر تلقائي على أول دليل ناقص وبيقولك منين تجيبه،
// من غير ما يحتاج أي محتوى مخصص من القضية نفسها. محدود 3 استخدامات لكل قضية.
function giveHint(){
  const maxHints = maxHintsForCase();
  if(game.hintsUsed >= maxHints){
    showToast(`استخدمت كل التلميحات المتاحة (${maxHints}) — كمّل بحدسك من هنا.`, 'danger');
    return;
  }
  const missing = CASE.evidence.find(e=>!game.collected.has(e.id));
  let msg;
  let found = null;
  const diffRank = caseDifficultyRank();
  if(!missing){
    msg = '💡 جمعت كل الأدلة المتاحة! روح للوحة التحقيق وابدأ تربط الخيوط.';
  } else {
    for(const s of CASE.suspects){
      const qIdx = s.questions.findIndex(q=>q.unlockId===missing.id);
      if(qIdx>=0){ found = { suspect:s, q:s.questions[qIdx] }; break; }
    }
    if(found){
      if(diffRank===0) msg = `💡 جرب تسأل ${found.suspect.name}: "${found.q.q}"`;
      else if(diffRank===1) msg = `💡 راجع استجواب ${found.suspect.name} كويس؛ فيه خيط لسه ما استخرجتوش.`;
      else msg = '💡 فيه إفادة لسه ما استنفدتش معناها. راجع أقوال المشتبه بهم وقارنها بالأدلة اللي معاك.';
    } else if(CASE.cameraPuzzle && CASE.cameraPuzzle.enabled && (CASE.cameraPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.cameraPuzzle.tabLabel || 'تحليل الكاميرات'}".`;
    } else if(CASE.audioPuzzle && CASE.audioPuzzle.enabled && (CASE.audioPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = '💡 جرب تبويب "تحليل صوتي".';
    } else if(CASE.contradictionPuzzle && CASE.contradictionPuzzle.enabled && (CASE.contradictionPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.contradictionPuzzle.tabLabel || 'التناقضات'}".`;
    } else if(CASE.timelinePuzzle && CASE.timelinePuzzle.enabled && (CASE.timelinePuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.timelinePuzzle.tabLabel || 'الخط الزمني'}".`;
    } else if(CASE.dnaLabPuzzle && CASE.dnaLabPuzzle.enabled && (CASE.dnaLabPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.dnaLabPuzzle.tabLabel || 'تحليل معملي'}".`;
    } else if(CASE.alibiGridPuzzle && CASE.alibiGridPuzzle.enabled && (CASE.alibiGridPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.alibiGridPuzzle.tabLabel || 'جدول الحجج الزمنية'}".`;
    } else if(CASE.ledgerAuditPuzzle && CASE.ledgerAuditPuzzle.enabled && (CASE.ledgerAuditPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.ledgerAuditPuzzle.tabLabel || 'تدقيق السجلات'}".`;
    } else if(CASE.polygraphPuzzle && CASE.polygraphPuzzle.enabled && (CASE.polygraphPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.polygraphPuzzle.tabLabel || 'كشف الكذب'}".`;
    } else if(CASE.floorPlanPuzzle && CASE.floorPlanPuzzle.enabled && (CASE.floorPlanPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.floorPlanPuzzle.tabLabel || 'المخطط'}".`;
    } else if(CASE.witnessReliabilityPuzzle && CASE.witnessReliabilityPuzzle.enabled && (CASE.witnessReliabilityPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.witnessReliabilityPuzzle.tabLabel || 'تقييم الشهادات'}".`;
    } else if(CASE.handwritingPuzzle && CASE.handwritingPuzzle.enabled && (CASE.handwritingPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.handwritingPuzzle.tabLabel || 'تحليل خط اليد'}".`;
    } else if(CASE.codeLockPuzzle && CASE.codeLockPuzzle.enabled && (CASE.codeLockPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.codeLockPuzzle.tabLabel || 'فك القفل'}".`;
    } else if(CASE.cipherPuzzle && CASE.cipherPuzzle.enabled && (CASE.cipherPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.cipherPuzzle.tabLabel || 'فك الشفرة'}".`;
    } else if(CASE.matchPuzzle && CASE.matchPuzzle.enabled && (CASE.matchPuzzle.resultEvidenceIds||[]).includes(missing.id)){
      msg = `💡 جرب تبويب "${CASE.matchPuzzle.tabLabel || 'الربط'}".`;
    } else {
      const action = (CASE.investigationActions||[]).find(a=>(a.resultEvidenceIds||[]).includes(missing.id));
      if(action){
        msg = `💡 جرب تبويب "فحص وتحريات" ونفّذ: ${action.label || 'الإجراء المتاح'}.`;
      } else {
        msg = '💡 كمّل تستكشف لوحة الأدلة والمشتبه بيهم كويس.';
      }
    }
  }
  if(diffRank>=2 && missing && !found){
    msg = '💡 الخيط الناقص مش في سؤال مباشر. راجع أدوات التحليل والفحص المتاحة وشوف أنهي واحدة لسه ما استنفدتهاش.';
  }
  game.hintsUsed++;
  gaTrack('hint_used', {
    hint_number: game.hintsUsed,
    evidence_count: game.collected.size,
    evidence_total: CASE.evidence.length,
  });
  persistProgress();
  showToast(msg, 'rumor');
  addScore(-5, 'استخدام تلميح', { silent:true });
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
  const fieldworkAvailable = investigationActionsForCase().length > 0;
  const audioAvailable = CASE.audioPuzzle && CASE.audioPuzzle.enabled;
  const audioUnlockId = evidenceThatUnlocksAudio();
  // لو القضية ماحددتش دليل بعينه يفتح التحليل الصوتي، التبويب يبقى متاح من البداية.
  // قبل الإصلاح كان game.collected.has(null) بيقفل التبويب للأبد في بعض القضايا.
  const audioUnlocked = audioAvailable && (!audioUnlockId || game.collected.has(audioUnlockId));
  const cameraAvailable = CASE.cameraPuzzle && CASE.cameraPuzzle.enabled;
  const cameraUnlockId = evidenceThatUnlocks('unlocksCamera');
  const cameraUnlocked = cameraAvailable && (!cameraUnlockId || game.collected.has(cameraUnlockId));
  const contraAvailable = CASE.contradictionPuzzle && CASE.contradictionPuzzle.enabled;
  const contraUnlockId = evidenceThatUnlocks('unlocksContradiction');
  const contraUnlocked = contraAvailable && (!contraUnlockId || game.collected.has(contraUnlockId));
  const timelineAvailable = CASE.timelinePuzzle && CASE.timelinePuzzle.enabled;
  const timelineUnlockId = evidenceThatUnlocks('unlocksTimeline');
  const timelineUnlocked = timelineAvailable && (!timelineUnlockId || game.collected.has(timelineUnlockId));

  const dnaLabAvailable = CASE.dnaLabPuzzle && CASE.dnaLabPuzzle.enabled;
  const dnaLabUnlockId = evidenceThatUnlocks('unlocksDnaLab');
  const dnaLabUnlocked = dnaLabAvailable && (!dnaLabUnlockId || game.collected.has(dnaLabUnlockId));

  const alibiGridAvailable = CASE.alibiGridPuzzle && CASE.alibiGridPuzzle.enabled;
  const alibiGridUnlockId = evidenceThatUnlocks('unlocksAlibiGrid');
  const alibiGridUnlocked = alibiGridAvailable && (!alibiGridUnlockId || game.collected.has(alibiGridUnlockId));

  const ledgerAuditAvailable = CASE.ledgerAuditPuzzle && CASE.ledgerAuditPuzzle.enabled;
  const ledgerAuditUnlockId = evidenceThatUnlocks('unlocksLedgerAudit');
  const ledgerAuditUnlocked = ledgerAuditAvailable && (!ledgerAuditUnlockId || game.collected.has(ledgerAuditUnlockId));

  const polygraphAvailable = CASE.polygraphPuzzle && CASE.polygraphPuzzle.enabled;
  const polygraphUnlockId = evidenceThatUnlocks('unlocksPolygraph');
  const polygraphUnlocked = polygraphAvailable && (!polygraphUnlockId || game.collected.has(polygraphUnlockId));

  const floorPlanAvailable = CASE.floorPlanPuzzle && CASE.floorPlanPuzzle.enabled;
  const floorPlanUnlockId = evidenceThatUnlocks('unlocksFloorPlan');
  const floorPlanUnlocked = floorPlanAvailable && (!floorPlanUnlockId || game.collected.has(floorPlanUnlockId));

  const witnessReliabilityAvailable = CASE.witnessReliabilityPuzzle && CASE.witnessReliabilityPuzzle.enabled;
  const witnessReliabilityUnlockId = evidenceThatUnlocks('unlocksWitnessReliability');
  const witnessReliabilityUnlocked = witnessReliabilityAvailable && (!witnessReliabilityUnlockId || game.collected.has(witnessReliabilityUnlockId));

  const handwritingAvailable = CASE.handwritingPuzzle && CASE.handwritingPuzzle.enabled;
  const handwritingUnlockId = evidenceThatUnlocks('unlocksHandwriting');
  const handwritingUnlocked = handwritingAvailable && (!handwritingUnlockId || game.collected.has(handwritingUnlockId));

  const codeLockAvailable = CASE.codeLockPuzzle && CASE.codeLockPuzzle.enabled;
  const codeLockUnlockId = evidenceThatUnlocks('unlocksCodeLock');
  const codeLockUnlocked = codeLockAvailable && (!codeLockUnlockId || game.collected.has(codeLockUnlockId));

  const cipherAvailable = CASE.cipherPuzzle && CASE.cipherPuzzle.enabled;
  const cipherUnlockId = evidenceThatUnlocks('unlocksCipher');
  const cipherUnlocked = cipherAvailable && (!cipherUnlockId || game.collected.has(cipherUnlockId));

  const matchAvailable = CASE.matchPuzzle && CASE.matchPuzzle.enabled;
  const matchUnlockId = evidenceThatUnlocks('unlocksMatch');
  const matchUnlocked = matchAvailable && (!matchUnlockId || game.collected.has(matchUnlockId));

  const accUnlocked = game.collected.size >= evidenceCompletionNeeded();
  const defs = [
    {id:'briefing', label:'ملف القضية'},
  ];
  if(fieldworkAvailable) defs.push({id:'fieldwork', label:'فحص وتحريات'});
  const mustVisitSceneFirst = currentPlayMode()==='realistic' && isForensicCase() && !game.investigationActionsDone.has('__real_scene_visit');
  defs.push(
    {id:'evidence', label:'لوحة الأدلة'},
    {id:'suspects', label:'المشتبه بهم', locked: mustVisitSceneFirst},
  );
  if(audioAvailable) defs.push({id:'audio', label:'تحليل صوتي', locked: !audioUnlocked});
  if(cameraAvailable) defs.push({id:'camera', label: (CASE.cameraPuzzle.tabLabel || 'تحليل الكاميرات'), locked: !cameraUnlocked});
  if(contraAvailable) defs.push({id:'contradiction', label: (CASE.contradictionPuzzle.tabLabel || 'التناقضات'), locked: !contraUnlocked});
  if(timelineAvailable) defs.push({id:'timeline', label: (CASE.timelinePuzzle.tabLabel || 'الخط الزمني'), locked: !timelineUnlocked});
  if(dnaLabAvailable) defs.push({id:'dnaLab', label: (CASE.dnaLabPuzzle.tabLabel || 'تحليل معملي'), locked: !dnaLabUnlocked});
  if(alibiGridAvailable) defs.push({id:'alibiGrid', label: (CASE.alibiGridPuzzle.tabLabel || 'جدول الحجج الزمنية'), locked: !alibiGridUnlocked});
  if(ledgerAuditAvailable) defs.push({id:'ledgerAudit', label: (CASE.ledgerAuditPuzzle.tabLabel || 'تدقيق السجلات'), locked: !ledgerAuditUnlocked});
  if(polygraphAvailable) defs.push({id:'polygraph', label: (CASE.polygraphPuzzle.tabLabel || 'كشف الكذب'), locked: !polygraphUnlocked});
  if(floorPlanAvailable) defs.push({id:'floorPlan', label: (CASE.floorPlanPuzzle.tabLabel || 'المخطط'), locked: !floorPlanUnlocked});
  if(witnessReliabilityAvailable) defs.push({id:'witnessReliability', label: (CASE.witnessReliabilityPuzzle.tabLabel || 'تقييم الشهادات'), locked: !witnessReliabilityUnlocked});
  if(handwritingAvailable) defs.push({id:'handwriting', label: (CASE.handwritingPuzzle.tabLabel || 'تحليل خط اليد'), locked: !handwritingUnlocked});
  if(codeLockAvailable) defs.push({id:'codeLock', label: (CASE.codeLockPuzzle.tabLabel || 'فك القفل'), locked: !codeLockUnlocked});
  if(cipherAvailable) defs.push({id:'cipher', label: (CASE.cipherPuzzle.tabLabel || 'فك الشفرة'), locked: !cipherUnlocked});
  if(matchAvailable) defs.push({id:'match', label: (CASE.matchPuzzle.tabLabel || 'الربط'), locked: !matchUnlocked});
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
  else if(game.screen==='fieldwork') el.innerHTML = fieldworkHTML();
  else if(game.screen==='evidence') el.innerHTML = evidenceHTML();
  else if(game.screen==='suspects') el.innerHTML = suspectsHTML();
  else if(game.screen==='audio') el.innerHTML = audioHTML();
  else if(game.screen==='camera') el.innerHTML = cameraHTML();
  else if(game.screen==='contradiction') el.innerHTML = contradictionHTML();
  else if(game.screen==='timeline') el.innerHTML = timelineHTML();
  else if(game.screen==='dnaLab') el.innerHTML = dnaLabHTML();
  else if(game.screen==='alibiGrid') el.innerHTML = alibiGridHTML();
  else if(game.screen==='ledgerAudit') el.innerHTML = ledgerAuditHTML();
  else if(game.screen==='polygraph') el.innerHTML = polygraphHTML();
  else if(game.screen==='floorPlan') el.innerHTML = floorPlanHTML();
  else if(game.screen==='witnessReliability') el.innerHTML = witnessReliabilityHTML();
  else if(game.screen==='handwriting') el.innerHTML = handwritingHTML();
  else if(game.screen==='codeLock') el.innerHTML = codeLockHTML();
  else if(game.screen==='cipher') el.innerHTML = cipherHTML();
  else if(game.screen==='match') el.innerHTML = matchHTML();
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
    <div class="case-location briefing-location">📍 ${caseLocationText(CASE, true)}</div>
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
   FIELDWORK / INVESTIGATION ACTIONS
   إجراءات ميدانية عامة: تفتيش، فحص بصمات، مراجعة سجل، سؤال شاهد خارجي...
   القضية بتعرّف CASE.investigationActions، والمحرك يتولى الباقي.
   ============================================================ */
function fieldworkHTML(){
  const actions = investigationActionsForCase();
  const rows = actions.map(a=>{
    const done = game.investigationActionsDone.has(a.id);
    const requires = a.requires || [];
    const requiresActions = a.requiresActions || [];
    const locked = !done && (!requires.every(id=>game.collected.has(id)) || !requiresActions.every(id=>game.investigationActionsDone.has(id)));
    const missing = requires.filter(id=>!game.collected.has(id)).map(id=>evidenceById(id)).filter(Boolean);
    const state = done ? '✓ تم' : locked ? '🔒 لسه' : 'جاهز';
    const helper = done
      ? (a.successText || 'الإجراء اتنفّذ واتضافت نتيجته لملف القضية.')
      : locked
        ? `محتاج خطوة أو خيط سابق قبل الإجراء${missing.length ? ': ' + missing.map(e=>e.title).join(' + ') : '.'}`
        : (a.description || 'نفّذ الإجراء عشان تعرف إذا كان هيطلع خيط جديد.');
    return `
      <div class="evidence-card ${done?'found':''}" style="cursor:default;">
        <div class="ev-top"><span class="tag mono">${a.kind || 'تحريات'}</span><span class="mono dim">${state}</span></div>
        <h3 style="margin:8px 0 6px;">${a.label || 'إجراء تحقيق'}</h3>
        <p class="dim" style="margin:0 0 12px;">${helper}</p>
        <button class="btn ${done?'ghost':''}" data-field-action="${a.id}" ${done||locked?'disabled':''}>${done?'تم التنفيذ ✓':'نفّذ الإجراء'}</button>
      </div>`;
  }).join('');
  return `
    <h2>فحص وتحريات</h2>
    <p class="dim">مش كل الأدلة بتيجي من الاستجواب. هنا بتفتّش المكان، تفحص الأشياء، تراجع السجلات وتتابع الشهود الخارجيين حسب خيوط القضية.</p>
    <div class="evidence-grid">${rows || '<p class="dim">مفيش إجراءات ميدانية في القضية دي.</p>'}</div>
  `;
}

function runFieldAction(actionId){
  const a = investigationActionsForCase().find(x=>x.id===actionId);
  if(!a || game.investigationActionsDone.has(actionId)) return;
  const requires = a.requires || [];
  const requiresActions = a.requiresActions || [];
  if(!requires.every(id=>game.collected.has(id)) || !requiresActions.every(id=>game.investigationActionsDone.has(id))){
    showToast('لسه محتاج خيط سابق قبل الإجراء ده.', 'danger');
    return;
  }
  game.investigationActionsDone.add(actionId);
  let gained = 0;
  (a.resultEvidenceIds||[]).forEach(id=>{ if(collect(id)) gained++; });
  gaTrack('field_action_completed', {
    action_id:String(actionId),
    result_count:gained,
  });
  addScore(a.score != null ? Number(a.score) : 5, a.label || 'إجراء تحريات', { silent:true });
  persistProgress();
  triggerFlash('good');
  showToast(a.successText || 'تم الإجراء واتضافت النتيجة لملف القضية.', 'amber');
  render(); game.screen='fieldwork';
}

/* ============================================================
   EVIDENCE
   ============================================================ */

function evidenceById(id){ return CASE.evidence.find(e=>e.id===id); }
function suspectById(id){ return CASE.suspects.find(s=>s.id===id); }
function orderedSuspects(){
  const byId = new Map(CASE.suspects.map(s=>[s.id,s]));
  const ordered = (game.suspectOrder || []).map(id=>byId.get(id)).filter(Boolean);
  const seen = new Set(ordered.map(s=>s.id));
  CASE.suspects.forEach(s=>{ if(!seen.has(s.id)) ordered.push(s); });
  return ordered;
}

// بعض الشخصيات (زي شخصيات فولكلورية/كوميدية) ممكن متكونش ليها صورة —
// في الحالة دي بيتعرض إيموجي بدلها (avatarEmoji في بيانات القضية)
function avatarMarkup(s, cls){
  if(s.img) return `<img class="${cls} photo-tone" src="${s.img}" alt="${s.name}" loading="lazy">`;
  return `<div class="${cls}" style="display:flex;align-items:center;justify-content:center;background:var(--panel-2);font-size:28px;">${s.avatarEmoji || '❓'}</div>`;
}

function collect(id, opts={}){
  const ev = evidenceById(id);
  // أي unlockId غلط في ملف قضية ماينفعش يتحسب كأنه دليل حقيقي؛ ده كان ممكن
  // يزوّد عداد الأدلة ويفتح لوحة الاتهام بدري من غير دليل موجود أصلًا.
  if(!ev){
    console.warn('Ignored unknown evidence id:', id, CASE && CASE.id);
    return false;
  }
  if(!game.collected.has(id)){
    game.collected.add(id);
    gaTrack('evidence_collected', {
      evidence_id: String(id),
      evidence_title: ev ? String(ev.title || '') : '',
      evidence_critical: ev && ev.crit ? 'yes' : 'no',
      evidence_count: game.collected.size,
      evidence_total: CASE.evidence.length,
    });
    if(!opts.silent){
      if(ev) showToast('دليل جديد: ' + ev.title, (caseDifficultyRank()===0 && ev.crit) ? 'danger' : 'amber');
      maybeShowVillageRumor();
    }
    // الأسرار المخفية تفضل تتسجل كإنجاز داخلي، لكن من غير رصيد نقاط أو مكافأة ظاهرة تغيّر سلوك اللاعب.
    if(ev && ev.bonusPoints && !game.secretsFound.has(id)){
      game.secretsFound.add(id);
      showToast('🔎 اكتشفت تفصيلة مخفية واتسجلت في ملف القضية.', 'amber');
    }
    if(!opts.silent && ev){
      addScore(ev.crit ? 6 : 4, 'دليل جديد: ' + ev.title, { silent:true });
    }
    persistProgress();
    checkEvidenceCombinations();
    return true;
  }
  return false;
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
  t.className = 'toast' + (tone==='danger' ? ' danger' : tone==='rumor' ? ' rumor' : tone==='combo' ? ' combo' : tone==='score-up' ? ' score-up' : tone==='score-down' ? ' score-down' : '');
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
        <div class="tag ${caseDifficultyRank()===0 && ev.crit?'crit':''}">${ev.tag}${caseDifficultyRank()===0 && ev.crit?' · حاسم':''}</div>
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
  const modalImg = ev.img ? `<div class="ev-zoom-wrap"><img class="ev-thumb photo-tone ev-zoom-img" src="${ev.img}" alt="${ev.title}" loading="lazy"></div>` : '';
  overlay.innerHTML = `
    <div class="modal">
      ${modalImg}
      <div class="tag ${caseDifficultyRank()===0 && ev.crit?'crit':''}" style="color:${caseDifficultyRank()===0 && ev.crit?'var(--danger)':'var(--signal)'}">${ev.tag}${caseDifficultyRank()===0 && ev.crit?' · دليل حاسم':''}</div>
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
  const cards = orderedSuspects().map(s=>{
    const done = game.interrogated[s.id] ? game.interrogated[s.id].size : 0;
    return `<div class="sus-card" data-suspect="${s.id}">
      ${avatarMarkup(s, 'avatar-photo')}
      <h4>${s.name}</h4>
      <div class="role">${s.role}</div>
      ${done>0?`<div class="mono" style="font-size:11px;color:var(--signal);margin-top:10px;">تم الاستجواب</div>`:''}
    </div>`;
  }).join('');
  return `
    <h2>المشتبه بهم</h2>
    <p class="dim">اضغط على أي مشتبه به عشان تبدأ الاستجواب.</p>
    <div class="divider"></div>
    <div class="sus-grid">${cards}</div>
  `;
}

function stableProfileNumber(value){
  let h=2166136261;
  const text=String(value||'');
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}

function inferredNeutralOccupation(s){
  const role=String(s.role||'').toLowerCase();
  const seed=stableProfileNumber(`${CASE && CASE.id}|${s.id}|occupation`);
  const pick=(items)=>items[seed%items.length];
  const forceNeutral=/بيدّعي|يدّعي|يدعي|مدّعي/.test(role);
  if(/صاحب الشقة|مالك الشقة|مؤجر/.test(role)) return 'يعمل في إدارة وتأجير العقارات';
  if(/تحف|أنتيكات|آثار قديمة/.test(role)) return 'تاجر مقتنيات وتحف';
  const rules=[
    [/طالب|طالبة|تلميذ|تلميذة/, 'طالب/ـة'],
    [/مدرس|مدرّس|معلم|معلمة|أستاذ/, 'يعمل في مجال التعليم'],
    [/دكتور|طبيب|جراح|تجميل|ممرض|ممرضة|صيدل/, 'يعمل في المجال الطبي'],
    [/محامي|قانون|نيابة/, 'يعمل في المجال القانوني'],
    [/مهندس|مبرمج|مطور|تقني|تكنولوجيا|it\b/, 'يعمل في المجال التقني'],
    [/محاسب|بنك|مصرف|مالي|خزنة/, 'يعمل في المجال المالي والإداري'],
    [/صحفي|إعلام|مذيع|برنامج|محرر/, 'يعمل في مجال الإعلام'],
    [/مصور|مونتاج|فيديو|كاميرا/, 'يعمل في الإنتاج البصري'],
    [/ممثل|ممثلة|مخرج|مسرح|سيناريو|كاتب/, 'يعمل في المجال الفني'],
    [/شيف|طباخ|مطبخ/, 'يعمل في مجال الطهي'],
    [/نادل|جرسون|مقهى|قهوة/, 'يعمل في الضيافة والخدمات'],
    [/سواق|سائق|توك توك|تاكسي|نقل/, 'يعمل في مجال النقل'],
    [/حارس|بواب|أمن/, 'يعمل في الأمن والخدمات'],
    [/تاجر|سمسار|مورد|مقاول|رجل أعمال|صاحب شركة|مستثمر/, 'يعمل في التجارة والأعمال'],
    [/مدير|إدارة|سكرتير|موظف|إداري/, 'يعمل في الإدارة'],
    [/عامل|فني|نجار|ورشة|مخزن/, 'عامل/فني'],
    [/فلاح|مزارع|مواشي|أرض/, 'يعمل في الزراعة أو تربية المواشي'],
    [/لاعب|مدرب|حكم|رياضي|نادي/, 'يعمل في المجال الرياضي'],
    [/مصمم|أزياء|عارض|عارضة|أتيليه/, 'يعمل في مجال الأزياء'],
    [/طبيب|عيادة/, 'يعمل في المجال الطبي'],
  ];
  const match=forceNeutral ? null : rules.find(([re])=>re.test(role));
  if(match) return match[1];

  // لو دور الشخصية اجتماعي فقط (قريب/صديق/جار...) نديها مهنة ثابتة
  // ومناسبة لبيئة القضية، بدل مهنة تتغير مع كل Refresh أو تلميح يكشف الحل.
  if(/طفل|طفلة|تلميذ|تلميذة/.test(role)) return 'طالب/ـة بالمرحلة الأساسية';
  if(/مراهق|مراهقة|طالب ثانوي/.test(role)) return 'طالب/ـة بالمرحلة الثانوية';
  if(/جدة|جد |الحاجة|الجد|مسن|مسنة/.test(role)){
    return pick(['بالمعاش — موظف/ـة إداري سابقًا','بالمعاش — عمل حر سابقًا','ربة منزل']);
  }

  const categories=Array.isArray(CASE && CASE.categories)
    ? CASE.categories.map(c=>String(c).toLowerCase()) : [];
  const contextualPools=[
    {keys:['sports'], jobs:['موظف إداري بنادٍ رياضي','مندوب مبيعات أدوات رياضية','مدرب لياقة بدنية','محاسب']},
    {keys:['food'], jobs:['موظف مشتريات','مشرف صالة','مورد أغذية','محاسب']},
    {keys:['fashion'], jobs:['موظف مبيعات ملابس','منسق مخزون','مصمم جرافيك','محاسب']},
    {keys:['digital'], jobs:['موظف دعم فني','مصمم جرافيك','مسؤول خدمة عملاء','محاسب']},
    {keys:['nightlife'], jobs:['موظف حجوزات','مسؤول خدمة عملاء','مندوب مبيعات','محاسب']},
    {keys:['corruption','fraud','forgery'], jobs:['موظف إداري','مندوب مبيعات','محاسب','صاحب مشروع صغير']},
    {keys:['family','social','disappearance'], jobs:['موظف إداري','مدرس/ـة','مندوب مبيعات','صاحب محل','محاسب','موظف خدمة عملاء']},
  ];
  const contextual=contextualPools.find(pool=>pool.keys.some(key=>categories.includes(key)));
  const generalJobs=[
    'موظف إداري','محاسب','مندوب مبيعات','موظف خدمة عملاء',
    'صاحب محل','مدرس/ـة','مصمم جرافيك','موظف مشتريات',
  ];
  return pick(contextual ? contextual.jobs : generalJobs);
}

function inferredNeutralAge(s){
  const role=String(s.role||'').toLowerCase();
  const seed=stableProfileNumber(`${CASE && CASE.id}|${s.id}|age`);
  const between=(min,max)=>min+(seed%(max-min+1));
  if(/طفل|طفلة/.test(role)) return between(8,14);
  if(/مراهق|مراهقة|طالب ثانوي|تلميذ/.test(role)) return between(16,19);
  if(/طالب|طالبة/.test(role)) return between(19,24);
  if(/جدة|جد |الحاجة|الجد|مسن|مسنة/.test(role)) return between(62,74);
  // صلة القرابة المركبة مثل «ابنة عم» لا تعني أن الشخصية من جيل الوالدين.
  if(/^(والد|والدة|أب|أم|عم|عمة|خال|خالة)(\s|$)/.test(role)) return between(48,63);
  if(/مدير|صاحب|مالك|طبيب|دكتور|محامي|أستاذ|مدرس|مدرب/.test(role)) return between(36,53);
  if(/شاب|شابة|صديق|صديقة|خطيب|خطيبة|عريس|عروسة|زميل|زميلة/.test(role)) return between(24,36);
  return between(27,49);
}

function inferredNeutralAddress(s){
  const custom=s.backgroundCheck || s.criminalRecord || {};
  if(custom.address || s.address) return custom.address || s.address;
  const location=caseLocationText(CASE) || 'نطاق الواقعة';
  const role=String(s.role||'');
  if(/غريب|من خارج|وافد/.test(role)) return `عنوان مسجل خارج ${location} — التفاصيل محجوبة`;
  return `مقيم في نطاق ${location}`;
}

function suspectBackgroundProfile(s){
  const custom = s.backgroundCheck || s.criminalRecord || {};
  // تحريات إدارية محايدة: أي سجل مرتبط بالقضية الحالية لا يظهر هنا،
  // لأن مكانه ملف الأدلة وليس صحيفة الهوية.
  const records = (Array.isArray(custom.records) ? custom.records : [])
    .filter(r=>!(r && typeof r==='object' && r.relatedToCase===true));
  const caseNo = String(CASE && (CASE.caseNo || CASE.id) || 'CASE').replace(/[^A-Za-z0-9]+/g,'-');
  const suspectNo = Math.max(1, (CASE.suspects || []).findIndex(x=>x.id===s.id) + 1);
  return {
    fileNo: custom.fileNo || `${caseNo}-BG-${String(suspectNo).padStart(2,'0')}`,
    age: custom.age || s.age || inferredNeutralAge(s),
    address: inferredNeutralAddress(s),
    occupation: custom.occupation || inferredNeutralOccupation(s),
    searchArea: custom.searchArea || caseLocationText(CASE) || 'نطاق الواقعة',
    records,
    notes: custom.administrativeNotes || '',
  };
}

function backgroundCheckHTML(s){
  const requested = game.backgroundChecks.has(s.id);
  if(!requested) return `
    <div class="evidence-card" style="margin:14px 0;cursor:default;">
      <div class="ev-top"><span class="tag mono">تحريات أمنية</span><span class="mono dim">غير مطلوبة</span></div>
      <h3 style="margin:8px 0 6px;">تحريات الهوية والسجل</h3>
      <p class="dim" style="margin:0 0 12px;">استعلام إداري محايد عن بيانات الشخص وسجله العام. لا يكشف علاقته بالجريمة ولا يفتح دليلًا.</p>
      <button class="btn ghost" data-background-check="${s.id}">اطلب التحريات</button>
    </div>`;
  const p = suspectBackgroundProfile(s);
  const records = p.records.length
    ? `<ul style="margin:8px 0 0;padding-right:20px;">${p.records.map(r=>`<li>${typeof r==='string' ? r : `${r.year ? r.year+' — ' : ''}${r.title || r.type || 'واقعة مسجلة'}${r.outcome ? ` — ${r.outcome}` : ''}`}</li>`).join('')}</ul>`
    : '<p class="dim" style="margin:8px 0 0;">لا توجد وقائع أو إدانات مسجلة ضمن بيانات القضية.</p>';
  return `
    <div class="evidence-card found" style="margin:14px 0;cursor:default;">
      <div class="ev-top"><span class="tag mono">تحريات إدارية</span><span class="mono dim">✓ تم الاستعلام</span></div>
      <h3 style="margin:8px 0 10px;">${s.name}</h3>
      <div class="dim" style="display:grid;gap:6px;">
        <div><strong>رقم ملف التحريات:</strong> ${p.fileNo}</div>
        <div><strong>المهنة/الصفة:</strong> ${p.occupation}</div>
        <div><strong>السن:</strong> ${p.age}</div>
        <div><strong>العنوان المسجل:</strong> ${p.address}</div>
        <div><strong>نطاق الاستعلام:</strong> ${p.searchArea}</div>
      </div>
      <div style="margin-top:10px;"><strong>السجل العام:</strong>${records}</div>
      ${p.notes ? `<p style="margin:10px 0 0;"><strong>ملاحظات إدارية:</strong> ${p.notes}</p>` : ''}
      <p class="dim mono" style="font-size:11px;margin:12px 0 0;">الصحيفة لا تضيف نقاطًا، لا تفتح أدلة، ولا ترجّح أي شخص. الاستنتاج من أدلة القضية فقط.</p>
    </div>`;
}

function interrogationQuestionVisible(s, item, idx){
  const answered = game.interrogated[s.id] || new Set();
  if(answered.has(idx)) return true;
  const req = Array.isArray(item.requires) ? item.requires : [];
  if(!req.length) return true;
  if(!req.every(id=>game.collected.has(id))) return false;
  // الدليل الجديد لوحده ما يفتحش سؤال فوق راس شخص بعينه. اللاعب لازم يواجه الشخص
  // بدليل مرتبط الأول؛ كده سؤال المتابعة يبقى نتيجة فعل تحقيق، مش تلميح من الواجهة.
  const confronted = game.confronted[s.id] || new Set();
  return req.some(id=>confronted.has(id));
}

function interrogationQuestionButtonsHTML(s, answered, outOfPoints, closed){
  if(closed) return '';
  return s.questions.map((item,idx)=>{
    const used = answered.has(idx);
    if(!interrogationQuestionVisible(s,item,idx) && !used) return '';
    return `<button class="q-btn" data-q="${idx}" ${used?'disabled':''}>${item.q}</button>`;
  }).filter(Boolean).join('');
}

function evidenceRelevantToSuspect(ev, s, answered=new Set()){
  if(!ev || !s) return false;

  // الربط الصريح يفضل أعلى أولوية: الكاتب حدّد بنفسه إن الدليل ينفع
  // يتواجه به الشخص، أو كتب ردًا مخصصًا لنفس زوج (الشخص + الدليل).
  const explicit = ev.confrontableBy || ev.relatedSuspects || ev.suspectIds;
  if(Array.isArray(explicit) && explicit.includes(s.id)) return true;
  if(s.confrontations && Object.prototype.hasOwnProperty.call(s.confrontations, ev.id)) return true;

  // لو فيه سؤال متابعة مكتوب محتاج الدليل، المواجهة منطقية فقط بعد جمع
  // كل الأدلة المطلوبة وقبل ما السؤال يتجاوب. وقت الضغط المحرك هيستخدم
  // نفس السؤال وإجابته المكتوبين في القضية، بدل أي رد احتياطي متكرر.
  return (s.questions || []).some((q, idx)=>{
    if(answered.has(idx)) return false;
    const req = Array.isArray(q && q.requires) ? q.requires : [];
    return req.includes(ev.id) && req.every(id=>game.collected.has(id));
  });
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
  const qButtons = interrogationQuestionButtonsHTML(s, answered, false, closed);
  const closedBanner = closed ? `<p class="dim" style="color:var(--danger); margin-top:6px;">🚫 ${s.name} قفل الكلام، مش هيرد على أسئلة تانية دلوقتي.</p>` : '';

  const confronted = game.confronted[s.id] || new Set();
  // ما نعرضش كل الأدلة لكل مشتبه به. المواجهة تظهر فقط لو فيه رابط فعلي
  // بين الدليل والشخص في بيانات القضية، وإلا واجهة اللعبة نفسها بتسرّب/تلخبط المنطق.
  const confrontableEvidence = [...CASE.evidence]
    .filter(e=>game.collected.has(e.id) && evidenceRelevantToSuspect(e, s, answered))
    .sort((a,b)=>a.order-b.order);
  const confrontHTML = confrontableEvidence.length ? `
    <h3>واجهه بدليل</h3>
    <p class="dim" style="margin-top:-6px;">هنا بتظهر الأدلة المرتبطة بإفادة الشخص أو تحركاته فقط.</p>
    <div class="q-grid">
      ${confrontableEvidence.map(ev=>{
        const used = confronted.has(ev.id);
        return `<button class="q-btn confront-btn" data-confront="${ev.id}" ${used?'disabled':''}>🧵 ${ev.title}</button>`;
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
    ${backgroundCheckHTML(s)}
    <div class="divider"></div>
    <div class="transcript" id="transcript">
      ${lines || '<p class="dim" style="margin:0;">اسأل أول سؤال عشان تبدأ الاستجواب.</p>'}
    </div>
    <div class="q-grid" id="questionGrid">${qButtons}</div>
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

      <div class="settings-row">
        <span>أسلوب التحقيق</span>
        <span class="tag mono">${currentPlayMode()==='realistic' ? '🧪 واقعي' : '⚡ عادي'}</span>
      </div>
      <p class="dim" style="font-size:12px;margin:-4px 0 12px;">الوضع بيتحدد قبل بداية القضية عشان مسار الأدلة يفضل ثابت أثناء التحقيق.</p>

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
  const cards = orderedSuspects().filter(s=>s.accusable !== false).map(s=>{
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
      <span class="tag ${caseDifficultyRank()===0 && ev.crit?'crit':''}" style="flex-shrink:0;">${caseDifficultyRank()===0 && ev.crit?'حاسم':ev.tag}</span>
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
    collect(combo.resultId, { silent:true }); // فيه توست مخصص تحت بدل رسالة "دليل جديد" العامة
    showToast('🧩 الربط صح! اكتشفت: ' + evidenceById(combo.resultId).title, 'combo');
    gaTrack('evidence_link_success', { result_evidence_id: String(combo.resultId) });
    addScore(6, 'ربطت أدلة ناقصة ببعض', { silent:true });
  } else if(combo){
    showToast('الربط ده اتعمل قبل كده.', 'rumor');
  } else {
    showToast('الدليلين دول مش مرتبطين ببعض — جرب تركيبة تانية.', 'danger');
    gaTrack('evidence_link_failed');
    addScore(-2, 'ربط أدلة غلط', { silent:true });
  }
  linkMode = false;
  linkSelected = [];
  render(); game.screen='evidence';
}

/* ============================================================
   AUDIO PUZZLE (generic — driven by CASE.audioPuzzle)
   ============================================================ */

function audioHasWavePuzzle(cfg){
  return !!(cfg && Array.isArray(cfg.duplicateSourceRange) && Array.isArray(cfg.duplicateTargetRange)
    && Number.isFinite(cfg.matchStart) && Number.isFinite(cfg.matchEnd));
}

function buildWave(seed){
  const base = [];
  let s = seed || 7;
  function rnd(){ s = (s*9301+49297)%233280; return s/233280; }
  for(let i=0;i<90;i++) base.push(Math.round(10+rnd()*60));
  const cfg = CASE.audioPuzzle;
  if(!audioHasWavePuzzle(cfg)) return base;
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
  if(!audioHasWavePuzzle(cfg)){
    return `
      <h2>${cfg.tabLabel || 'تحليل صوتي'}</h2>
      <p class="dim">${cfg.introText || ''}</p>
      <div class="evidence-card" style="cursor:default; margin-top:16px;">
        <div class="tag mono">مختبر صوت</div>
        <h3 style="margin:8px 0 6px;">مقارنة وتنقية التسجيل</h3>
        <p class="dim">شغّل المقارنة التقنية بين الملف والعينات المرجعية المسجلة في ملف القضية.</p>
        <button class="btn" id="runSimpleAudioAnalysis">ابدأ التحليل</button>
        <div class="wave-feedback" id="simpleAudioFeedback"></div>
      </div>`;
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
  const wave = buildWave(); const t = relX * wave.length;
  const feedback = document.getElementById('waveFeedback');
  if(t >= cfg.matchStart && t <= cfg.matchEnd){
    feedback.textContent = '✓ ظبطت المقطع. الموجة دي مكررة حرفيًا من دقيقة قبل كده.';
    feedback.className = 'wave-feedback ok';
    game.audioSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'audio' });
    addScore(10, 'حللت التحليل الصوتي', { silent:true });

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

function completeSimpleAudioAnalysis(){
  const cfg = CASE.audioPuzzle;
  if(game.audioSolved) return;
  const feedback = document.getElementById('simpleAudioFeedback');
  if(feedback){
    feedback.textContent = '✓ ' + (cfg.resultText || 'التحليل اكتمل.');
    feedback.className = 'wave-feedback ok';
  }
  game.audioSolved = true;
  gaTrack('puzzle_solved', { puzzle_type:'audio' });
  addScore(10, 'أكملت التحليل الصوتي', { silent:true });
  (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
  persistProgress();
  triggerFlash('good');
  setTimeout(()=>render(), 900);
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
    gaTrack('puzzle_solved', { puzzle_type:'contradiction' });
    triggerFlash('good');
    addScore(10, 'كشفت التناقض', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الاتنين دول مش متناقضين فعلًا، جرب تشكيلة تانية.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'اختيار تناقض غلط', { silent:true });
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
    gaTrack('puzzle_solved', { puzzle_type:'camera' });
    triggerFlash('good');
    addScore(10, 'حددت لحظة الكاميرا الصح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = `✗ ${label} — لسه مش الوقت الصح، جرّب مكان تاني على الخط.`;
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'تحديد وقت كاميرا غلط', { silent:true });
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
    gaTrack('puzzle_solved', { puzzle_type:'timeline' });
    triggerFlash('good');
    addScore(10, 'رتّبت الخط الزمني صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الترتيب لسه مش صح، راجع الأحداث تاني.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'ترتيب خط زمني غلط', { silent:true });
  }
}

/* ============================================================
   أدوات مشتركة للألغاز الجديدة
   ============================================================ */
function puzzleSuspectName(id){
  const s = suspectById(id);
  return s ? s.name : id;
}

/* ============================================================
   DNA / MATERIAL LAB PUZZLE (generic — driven by CASE.dnaLabPuzzle)
   قارن تسلسل العينة بتسلسل كل مشتبه فيه، ودوّر على التطابق
   ============================================================ */

function dnaLabHTML(){
  const cfg = CASE.dnaLabPuzzle;
  const label = cfg.tabLabel || 'تحليل معملي';
  if(game.dnaLabSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const sampleChips = cfg.sampleSequence.map(v=>`<span class="mono seq-chip">${v}</span>`).join('');
  const rows = Object.entries(cfg.suspectSequences).map(([sid, seq])=>{
    const chips = seq.map(v=>`<span class="mono seq-chip">${v}</span>`).join('');
    return `
      <div class="board-chip" data-dnalab="${sid}" style="text-align:right; margin-bottom:8px; cursor:pointer;">
        <div style="font-weight:700; margin-bottom:6px;">${puzzleSuspectName(sid)}</div>
        <div class="seq-row">${chips}</div>
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <div style="margin-bottom:14px;">
      <div class="mono" style="font-size:11px; color:var(--ink-dim); margin-bottom:6px;">العينة الأصلية</div>
      <div class="seq-row">${sampleChips}</div>
    </div>
    <div class="divider"></div>
    <p class="dim mono" style="font-size:11px; margin-bottom:10px;">اضغط على المشتبه فيه اللي تسلسله بيتطابق مع العينة</p>
    <div id="dnaLabList">${rows}</div>
    <div class="wave-feedback" id="dnaLabFeedback"></div>
  `;
}

function handleDnaLabClick(sid){
  const cfg = CASE.dnaLabPuzzle;
  const feedback = document.getElementById('dnaLabFeedback');
  if(sid === cfg.correctSuspectId){
    feedback.textContent = '✓ ' + (cfg.resultText || 'التطابق صح!');
    feedback.className = 'wave-feedback ok';
    game.dnaLabSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'dnaLab' });
    triggerFlash('good');
    addScore(10, 'طابقت العينة صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ التسلسل مش مطابق للعينة، جرب مشتبه فيه تاني.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'مطابقة عينة غلط', { silent:true });
  }
}

/* ============================================================
   ALIBI GRID PUZZLE (generic — driven by CASE.alibiGridPuzzle)
   قارن جدول أماكن كل مشتبه فيه عبر فترات زمنية، ودوّر على التناقض
   ============================================================ */

function alibiGridHTML(){
  const cfg = CASE.alibiGridPuzzle;
  const label = cfg.tabLabel || 'جدول الحجج الزمنية';
  if(game.alibiGridSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const headCells = cfg.timeSlots.map(t=>`<th class="mono">${t}</th>`).join('');
  const rows = Object.entries(cfg.suspectClaims).map(([sid, claims])=>{
    const cells = claims.map((c,i)=>`<td data-alibi-suspect="${sid}" data-alibi-slot="${i}">${c}</td>`).join('');
    return `<tr><td class="alibi-name">${puzzleSuspectName(sid)}</td>${cells}</tr>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <div style="overflow-x:auto;">
      <table class="alibi-grid" id="alibiGridTable">
        <thead><tr><th></th>${headCells}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="dim mono" style="font-size:11px; margin-top:10px;">اضغط على الخانة اللي فيها التناقض</p>
    <div class="wave-feedback" id="alibiGridFeedback"></div>
  `;
}

function handleAlibiGridClick(sid, slotIdx){
  const cfg = CASE.alibiGridPuzzle;
  const feedback = document.getElementById('alibiGridFeedback');
  if(sid === cfg.contradictingSuspectId && slotIdx === cfg.contradictionSlotIndex){
    feedback.textContent = '✓ ' + (cfg.resultText || 'لقيت التناقض!');
    feedback.className = 'wave-feedback ok';
    game.alibiGridSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'alibiGrid' });
    triggerFlash('good');
    addScore(10, 'كشفت تناقض الجدول الزمني', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الخانة دي مش فيها تناقض واضح، جرب خانة تانية.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'تحديد خانة غلط', { silent:true });
  }
}

/* ============================================================
   LEDGER AUDIT PUZZLE (generic — driven by CASE.ledgerAuditPuzzle)
   راجع صفوف السجل ودوّر على الصف المريب
   ============================================================ */

function ledgerAuditHTML(){
  const cfg = CASE.ledgerAuditPuzzle;
  const label = cfg.tabLabel || 'تدقيق السجلات';
  if(game.ledgerAuditSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const rows = cfg.ledgerRows.map((row,i)=>{
    return `
      <div class="board-chip" data-ledger="${i}" style="display:flex; justify-content:space-between; gap:10px; margin-bottom:8px; cursor:pointer;">
        <span class="mono" style="color:var(--ink-dim); min-width:60px;">${row.account}</span>
        <span style="flex:1; text-align:right;">${row.name}</span>
        <span class="mono" style="color:var(--amber);">${row.amount}</span>
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <div id="ledgerAuditList">${rows}</div>
    <div class="wave-feedback" id="ledgerAuditFeedback"></div>
  `;
}

function handleLedgerAuditClick(rowIdx){
  const cfg = CASE.ledgerAuditPuzzle;
  const row = cfg.ledgerRows[rowIdx];
  const feedback = document.getElementById('ledgerAuditFeedback');
  if(row && row.account === cfg.correctAccountId){
    feedback.textContent = '✓ ' + (cfg.resultText || 'لقيت الحساب المريب!');
    feedback.className = 'wave-feedback ok';
    game.ledgerAuditSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'ledgerAudit' });
    triggerFlash('good');
    addScore(10, 'دققت السجل صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الصف ده مش المريب فعلاً، راجع باقي السجل.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'تحديد سجل غلط', { silent:true });
  }
}

/* ============================================================
   POLYGRAPH PUZZLE (generic — driven by CASE.polygraphPuzzle)
   اسأل كل مشتبه فيه نفس السؤال وراقب قراءة التذبذب
   ============================================================ */

function polygraphHTML(){
  const cfg = CASE.polygraphPuzzle;
  const label = cfg.tabLabel || 'كشف الكذب';
  if(game.polygraphSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const rows = Object.entries(cfg.suspectReadings).map(([sid, reading])=>{
    const asked = game.polygraphAsked.has(sid);
    if(!asked){
      return `
        <div class="board-chip" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:700;">${puzzleSuspectName(sid)}</span>
          <button class="btn ghost" data-polygraph-ask="${sid}">اسأل</button>
        </div>`;
    }
    const pct = Math.max(0, Math.min(100, reading));
    const tone = pct > cfg.truthThreshold ? 'var(--danger)' : 'var(--signal)';
    return `
      <div class="board-chip" style="margin-bottom:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:700;">${puzzleSuspectName(sid)}</span>
          <button class="btn" data-polygraph-accuse="${sid}">اتهم بالكذب</button>
        </div>
        <div class="poly-bar"><div class="poly-fill" style="width:${pct}%; background:${tone};"></div></div>
        <div class="mono" style="font-size:11px; color:${tone}; margin-top:4px;">مستوى التذبذب: ${pct}%</div>
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <p style="margin-bottom:14px; font-weight:700;">"${cfg.question}"</p>
    <div id="polygraphList">${rows}</div>
    <div class="wave-feedback" id="polygraphFeedback"></div>
  `;
}

function handlePolygraphAsk(sid){
  game.polygraphAsked.add(sid);
  persistProgress();
  render(); game.screen='polygraph';
}

function handlePolygraphAccuse(sid){
  const cfg = CASE.polygraphPuzzle;
  const feedback = document.getElementById('polygraphFeedback');
  if(sid === cfg.correctSuspectId){
    feedback.textContent = '✓ ' + (cfg.resultText || 'ده اللي بيكذب!');
    feedback.className = 'wave-feedback ok';
    game.polygraphSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'polygraph' });
    triggerFlash('good');
    addScore(10, 'كشفت الكذب صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ قراءته مش أعلى قراءة، فيه حد تاني بيكذب أكتر.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'اتهام كشف كذب غلط', { silent:true });
  }
}

/* ============================================================
   FLOOR PLAN PUZZLE (generic — driven by CASE.floorPlanPuzzle)
   اختار مشتبه فيه لتتبع مساره على المخطط، وأكد اختيارك
   ============================================================ */

function floorPlanHTML(){
  const cfg = CASE.floorPlanPuzzle;
  const label = cfg.tabLabel || 'المخطط';
  if(game.floorPlanSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const roomChips = cfg.rooms.map(r=>`<span class="board-chip" style="cursor:default; margin:0 4px 8px 0; display:inline-block;">${r}</span>`).join('');
  const preview = game.floorPlanPreviewSuspect;
  const rows = Object.keys(cfg.suspectPaths).map(sid=>{
    const active = preview === sid ? 'selected' : '';
    const path = cfg.suspectPaths[sid];
    const pathHTML = preview === sid
      ? `<div class="mono" style="font-size:12px; color:var(--amber); margin-top:8px;">${path.join(' ← ')}</div>
         <button class="btn" data-floorplan-confirm="${sid}" style="margin-top:10px;">أكد: ده اللي وصل للمكان الحساس</button>`
      : '';
    return `
      <div class="board-chip ${active}" data-floorplan-preview="${sid}" style="text-align:right; margin-bottom:8px; cursor:pointer;">
        <div style="font-weight:700;">${puzzleSuspectName(sid)}</div>
        ${pathHTML}
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <div class="mono" style="font-size:11px; color:var(--ink-dim); margin-bottom:8px;">غرف المكان</div>
    <div style="margin-bottom:14px;">${roomChips}</div>
    <div class="divider"></div>
    <p class="dim mono" style="font-size:11px; margin-bottom:10px;">اضغط على مشتبه فيه عشان تتبع مساره</p>
    <div id="floorPlanList">${rows}</div>
    <div class="wave-feedback" id="floorPlanFeedback"></div>
  `;
}

function handleFloorPlanPreview(sid){
  game.floorPlanPreviewSuspect = (game.floorPlanPreviewSuspect === sid) ? null : sid;
  render(); game.screen='floorPlan';
}

function handleFloorPlanConfirm(sid){
  const cfg = CASE.floorPlanPuzzle;
  const feedback = document.getElementById('floorPlanFeedback');
  if(sid === cfg.correctSuspectId){
    feedback.textContent = '✓ ' + (cfg.resultText || 'ده اللي كان يقدر يوصل!');
    feedback.className = 'wave-feedback ok';
    game.floorPlanSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'floorPlan' });
    triggerFlash('good');
    addScore(10, 'تتبعت المسار صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ المسار ده مش بيوصل للمكان الحساس، جرب مشتبه فيه تاني.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'تتبع مسار غلط', { silent:true });
    game.floorPlanPreviewSuspect = null;
    setTimeout(()=>{ render(); game.screen='floorPlan'; }, 1100);
  }
}

/* ============================================================
   WITNESS RELIABILITY PUZZLE (generic — driven by CASE.witnessReliabilityPuzzle)
   قارن شهادتين وحدد مين شهادته أقل مصداقية
   ============================================================ */

function witnessReliabilityHTML(){
  const cfg = CASE.witnessReliabilityPuzzle;
  const label = cfg.tabLabel || 'تقييم الشهادات';
  if(game.witnessReliabilitySolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const cards = cfg.testimonies.map(t=>{
    return `
      <div class="board-chip" data-witness="${t.suspectId}" style="text-align:right; margin-bottom:10px; cursor:pointer;">
        <div style="font-weight:700; margin-bottom:6px;">${puzzleSuspectName(t.suspectId)}</div>
        <div style="line-height:1.8;">${t.text}</div>
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <p class="dim mono" style="font-size:11px; margin-bottom:10px;">اضغط على الشهادة اللي شايفها أقل مصداقية (الكذب)</p>
    <div id="witnessList">${cards}</div>
    <div class="wave-feedback" id="witnessFeedback"></div>
  `;
}

function handleWitnessClick(sid){
  const cfg = CASE.witnessReliabilityPuzzle;
  const feedback = document.getElementById('witnessFeedback');
  if(sid === cfg.correctSuspectId){
    feedback.textContent = '✓ ' + (cfg.resultText || 'شهادته هي الأقل مصداقية فعلاً!');
    feedback.className = 'wave-feedback ok';
    game.witnessReliabilitySolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'witnessReliability' });
    triggerFlash('good');
    addScore(10, 'قيّمت الشهادات صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ الشهادة دي أقرب للحقيقة، راجع التفاصيل تاني.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'تقييم شهادة غلط', { silent:true });
  }
}

/* ============================================================
   HANDWRITING PUZZLE (generic — driven by CASE.handwritingPuzzle)
   قارن توقيع مرجعي بتوقيع الوصية/الملاحظة، وحدد نقاط الاختلاف
   ============================================================ */

const HANDWRITING_FIELD_LABELS = { angle:'الزاوية', pressure:'ضغط القلم', spacing:'تباعد الحروف' };

function handwritingFieldValue(v){
  return typeof v === 'number' ? (v + '°') : v;
}

function handwritingHTML(){
  const cfg = CASE.handwritingPuzzle;
  const label = cfg.tabLabel || 'تحليل خط اليد';
  if(game.handwritingSolved){
    return `
      <h2>${label} — مكتمل</h2>
      <p>${cfg.resultText}</p>
      <div class="divider"></div>
      <button class="btn" data-goto="evidence" style="margin-top:10px;">شوف لوحة الأدلة ←</button>
    `;
  }
  const fields = Object.keys(cfg.referenceSignature);
  const rows = fields.map(f=>{
    const sel = game.handwritingSelected.includes(f) ? 'selected' : '';
    return `
      <div class="board-chip ${sel}" data-handwriting="${f}" style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:8px; cursor:pointer;">
        <span style="font-weight:700;">${HANDWRITING_FIELD_LABELS[f] || f}</span>
        <span class="mono" style="color:var(--ink-dim);">مرجع: ${handwritingFieldValue(cfg.referenceSignature[f])}</span>
        <span class="mono" style="color:var(--amber);">العينة: ${handwritingFieldValue(cfg.willSignature[f])}</span>
      </div>`;
  }).join('');
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText}</p>
    <div class="divider"></div>
    <p class="dim mono" style="font-size:11px; margin-bottom:10px;">علّم على الصفات اللي شايفها مختلفة بين التوقيعين، ولو مفيش فرق أكّد التحليل من غير ما تعلّم على حاجة</p>
    <div id="handwritingList">${rows}</div>
    <button class="btn" id="submitHandwriting" style="margin-top:16px;">تأكيد التحليل</button>
    <div class="wave-feedback" id="handwritingFeedback"></div>
  `;
}

function toggleHandwritingField(f){
  const sel = game.handwritingSelected;
  if(sel.includes(f)) game.handwritingSelected = sel.filter(x=>x!==f);
  else sel.push(f);
  persistProgress();
  render(); game.screen='handwriting';
}

function submitHandwriting(){
  const cfg = CASE.handwritingPuzzle;
  const expected = cfg.discrepancyPoints || [];
  const chosen = game.handwritingSelected;
  const correct = expected.length === chosen.length && expected.every(f=>chosen.includes(f));
  const feedback = document.getElementById('handwritingFeedback');
  if(correct){
    feedback.textContent = '✓ ' + (cfg.resultText || 'التحليل صح!');
    feedback.className = 'wave-feedback ok';
    game.handwritingSolved = true;
    gaTrack('puzzle_solved', { puzzle_type:'handwriting' });
    triggerFlash('good');
    addScore(10, 'حللت خط اليد صح', { silent:true });
    (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
    persistProgress();
    setTimeout(()=>render(), 1300);
  } else {
    feedback.textContent = '✗ التحليل مش دقيق كفاية، راجع الصفات تاني.';
    feedback.className = 'wave-feedback bad';
    addScore(-2, 'تحليل خط يد غلط', { silent:true });
  }
}

/* ============================================================
   CODE LOCK / CIPHER / MATCH PUZZLES
   كانت موجودة في بيانات عدة قضايا من غير Renderer في المحرك.
   ============================================================ */
function finishGenericPuzzle(type, cfg, solvedFlag, reason){
  game[solvedFlag] = true;
  gaTrack('puzzle_solved', { puzzle_type:type });
  triggerFlash('good');
  addScore(10, reason, { silent:true });
  (cfg.resultEvidenceIds||[]).forEach(id=>collect(id));
  persistProgress();
  setTimeout(()=>render(), 900);
}

function codeLockHTML(){
  const cfg = CASE.codeLockPuzzle;
  const label = cfg.tabLabel || 'فك القفل';
  if(game.codeLockSolved) return `<h2>${label} — مكتمل</h2><p>${cfg.resultText||'اتفتح القفل بنجاح.'}</p><div class="divider"></div><button class="btn" data-goto="evidence">شوف لوحة الأدلة ←</button>`;
  return `
    <h2>${label}</h2>
    <p class="dim">${cfg.introText||''}</p>
    ${cfg.hint ? `<p class="dim mono">تلميح الملف: ${cfg.hint}</p>` : ''}
    <label style="display:block; margin:16px 0 6px;">الكود</label>
    <input id="codeLockInput" inputmode="numeric" autocomplete="off" maxlength="${String(cfg.code||'').length || 8}" value="${game.codeLockInput||''}" style="width:100%;max-width:320px;padding:12px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);border-radius:8px;" />
    <div><button class="btn" id="submitCodeLock" style="margin-top:12px;">تأكيد الكود</button></div>
    <div class="wave-feedback" id="codeLockFeedback"></div>`;
}
function submitCodeLock(){
  const cfg=CASE.codeLockPuzzle, input=document.getElementById('codeLockInput');
  const val=(input?.value||'').trim(); game.codeLockInput=val; persistProgress();
  const fb=document.getElementById('codeLockFeedback');
  if(val===String(cfg.code||'')){
    if(fb){fb.textContent='✓ '+(cfg.resultText||'الكود صح.');fb.className='wave-feedback ok';}
    finishGenericPuzzle('codeLock',cfg,'codeLockSolved','فكيت القفل');
  }else{
    if(fb){fb.textContent=cfg.wrongMsg||'✗ الكود مش صح، راجع الخيوط.';fb.className='wave-feedback bad';}
    addScore(-2,'محاولة كود غلط',{silent:true});
  }
}

function cipherHTML(){
  const cfg=CASE.cipherPuzzle, label=cfg.tabLabel||'فك الشفرة';
  if(game.cipherSolved) return `<h2>${label} — مكتمل</h2><p>${cfg.resultText||'فكيت الشفرة.'}</p><div class="divider"></div><button class="btn" data-goto="evidence">شوف لوحة الأدلة ←</button>`;
  if(Array.isArray(cfg.fragments) && cfg.fragments.length){
    const blocks=cfg.fragments.map(f=>`<div style="margin-bottom:14px;"><p style="margin-bottom:7px;">${f.context||''}</p><select data-cipher-fragment="${f.id}" style="width:100%;padding:10px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);border-radius:8px;"><option value="">اختار الكلمة...</option>${(f.options||[]).map(o=>`<option value="${o.id}" ${game.cipherSelections[f.id]===o.id?'selected':''}>${o.text}</option>`).join('')}</select></div>`).join('');
    return `<h2>${label}</h2><p class="dim">${cfg.introText||''}</p>${blocks}<button class="btn" id="submitCipher">فك الرسالة</button><div class="wave-feedback" id="cipherFeedback"></div>`;
  }
  return `<h2>${label}</h2><p class="dim">${cfg.introText||''}</p>${cfg.cipherText?`<div class="mono" style="padding:14px;border:1px solid var(--line);margin:14px 0;direction:ltr;text-align:center;">${cfg.cipherText}</div>`:''}<label style="display:block;margin:10px 0 6px;">النص بعد فك الشفرة</label><input id="cipherInput" value="${game.cipherInput||''}" autocomplete="off" style="width:100%;max-width:420px;padding:12px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);border-radius:8px;"/><div><button class="btn" id="submitCipher" style="margin-top:12px;">تأكيد الحل</button></div><div class="wave-feedback" id="cipherFeedback"></div>`;
}
function normalizeArabicAnswer(v){return String(v||'').trim().replace(/[ًٌٍَُِّْـ]/g,'').replace(/\s+/g,' ').toLowerCase();}
function submitCipher(){
  const cfg=CASE.cipherPuzzle, fb=document.getElementById('cipherFeedback'); let ok=false;
  if(Array.isArray(cfg.fragments)&&cfg.fragments.length){
    ok=cfg.fragments.every(f=>game.cipherSelections[f.id]===f.correctOptionId);
  }else{
    const input=document.getElementById('cipherInput'); game.cipherInput=(input?.value||'').trim();
    ok=normalizeArabicAnswer(game.cipherInput)===normalizeArabicAnswer(cfg.solutionText||cfg.decodedMessage||'');
  }
  persistProgress();
  if(ok){if(fb){fb.textContent='✓ '+(cfg.resultText||'فكيت الشفرة.');fb.className='wave-feedback ok';}finishGenericPuzzle('cipher',cfg,'cipherSolved','فكيت الشفرة');}
  else{if(fb){fb.textContent='✗ الحل لسه مش مضبوط، راجع الخيوط.';fb.className='wave-feedback bad';}addScore(-2,'محاولة فك شفرة غلط',{silent:true});}
}

function matchHTML(){
  const cfg=CASE.matchPuzzle,label=cfg.tabLabel||'الربط';
  if(game.matchSolved) return `<h2>${label} — مكتمل</h2><p>${cfg.resultText||'الربط صحيح.'}</p><div class="divider"></div><button class="btn" data-goto="evidence">شوف لوحة الأدلة ←</button>`;
  const rows=(cfg.leftItems||[]).map(l=>`<div style="display:grid;grid-template-columns:minmax(100px,1fr) minmax(150px,2fr);gap:10px;align-items:center;margin-bottom:10px;"><strong>${l.text}</strong><select data-match-left="${l.id}" style="width:100%;padding:10px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);border-radius:8px;"><option value="">اختار الدور...</option>${(cfg.rightItems||[]).map(r=>`<option value="${r.id}" ${game.matchSelections[l.id]===r.id?'selected':''}>${r.text}</option>`).join('')}</select></div>`).join('');
  return `<h2>${label}</h2><p class="dim">${cfg.introText||''}</p><div style="margin:16px 0;">${rows}</div><button class="btn" id="submitMatch">تأكيد الربط</button><div class="wave-feedback" id="matchFeedback"></div>`;
}
function submitMatch(){
  const cfg=CASE.matchPuzzle, pairs=cfg.correctPairs||[], fb=document.getElementById('matchFeedback');
  const ok=pairs.length>0 && pairs.every(([l,r])=>game.matchSelections[l]===r);
  if(ok){if(fb){fb.textContent='✓ '+(cfg.resultText||'الربط صحيح.');fb.className='wave-feedback ok';}finishGenericPuzzle('match',cfg,'matchSolved','ربطت الأدوار صح');}
  else{if(fb){fb.textContent='✗ فيه ربط مش مضبوط، راجع الأدلة وحاول تاني.';fb.className='wave-feedback bad';}addScore(-2,'ربط أدلة غلط',{silent:true});}
}

/* ============================================================
   THEORY BUILDER (optional — driven by CASE.theoryBuilder)
   بديل شاشة الاتهام البسيطة: قبل ما تقفل القضية، اللاعب يفسّر
   الدافع/الطريقة/التوقيت باختياره من مجموعة خيارات لكل عنصر
   ============================================================ */

function theoryHTML(){
  const cfg = CASE.theoryBuilder;
  const answers = game.theoryAnswers || {};
  const order = game.theoryOptionOrder || {};
  const qBlocks = cfg.questions.map(q=>{
    const optById = new Map((q.options||[]).map(o=>[o.id, o]));
    const orderedIds = (order[q.id] && order[q.id].length) ? order[q.id] : q.options.map(o=>o.id);
    const opts = orderedIds.map(oid=>optById.get(oid)).filter(Boolean).map(o=>{
      const sel = answers[q.id]===o.id ? 'selected' : '';
      return `<div class="board-chip ${sel}" style="text-align:right;" data-theory-q="${q.id}" data-theory-opt="${o.id}">${o.text}</div>`;
    }).join('');
    return `<div style="margin-bottom:20px;"><h4 style="margin-bottom:10px;">${q.label}</h4><div style="display:flex; flex-direction:column; gap:8px;">${opts}</div></div>`;
  }).join('');
  const allAnswered = cfg.questions.every(q=>answers[q.id]);
  return `
    <h2>ابني نظرية الجريمة</h2>
    <p class="dim">قبل ما تقفل القضية، فسّر إزاي حصلت الجريمة بالظبط. في القضايا الأصعب، اختيار الجاني الصح لوحده مش كفاية لنهاية كاملة.</p>
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
  const accusableSuspects = orderedSuspects().filter(s=>s.accusable !== false);
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
  const linkedCount = Object.keys(game.connections).length;
  const minLinks = minimumAccusationLinks();
  let warning = '';
  let canSubmit = false;
  if(targets.size > 1){
    warning = `<div class="board-warning">قدر تتهم شخص واحد بس في المرة — افصل باقي الروابط الأول (دوس على الدليل المربوط تاني عشان تفصله).</div>`;
  } else if(targets.size === 1 && linkedCount >= minLinks){
    canSubmit = true;
  } else if(targets.size === 1 && linkedCount < minLinks){
    warning = `<div class="board-warning">الاتهام محتاج ملف أقوى: اربط على الأقل ${minLinks} أدلة بالشخص قبل ما تقفل القضية.</div>`;
  }

  return `
    <h2>لوحة التحقيق</h2>
    <p class="dim">اختار الأدلة اللي فعلًا بتبني عليها اتهامك واربطها بمشتبه واحد. التقييم النهائي بيحسب كل الأدلة الحاسمة اللي اكتشفتها أثناء التحقيق، واللوحة بتوضح الشخص اللي بتتهمه.</p>
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
    const conclusiveSet = new Set(CASE.conclusiveEvidenceIds || []);
    // كان التقييم القديم بيحسب الأدلة المربوطة يدويًا على لوحة الاتهام فقط.
    // ده كان يطلع "حل جزئي" رغم إن اللاعب جمع كل الأدلة الحاسمة، لمجرد إنه
    // ما ربطش نفس الـ IDs المطلوبة واحدًا واحدًا. التقييم الصحيح يعتمد على
    // الأدلة المكتشفة فعليًا؛ اللوحة تحدد المتهم ولا تمحو نتيجة التحقيق.
    const hits = [...game.collected].filter(id=>conclusiveSet.has(id)).length;
    const required = CASE.conclusiveRequired || 2;
    const theory = theoryAccuracy();
    if(correctSuspect && hits>=required && theory.passed) game.ending='good';
    else if(correctSuspect) game.ending='partial';
    else game.ending='bad';

    // في القضايا المتوسطة والصعبة، معرفة الجاني لوحدها مش كفاية: نظرية الجريمة لازم تكون متماسكة.
    if(theory.enabled && theory.required>0){
      if(theory.passed) addScore(8, 'بنيت نظرية جريمة متماسكة', { silent:true });
      else addScore(-6, 'نظرية الجريمة فيها ثغرات', { silent:true });
    }
    // نتيجة الاتهام هي أكبر حدث في التقييم الداخلي. مفيش مكافأة على تقليل الأسئلة أو توفير رصيد.
    const endingScore = game.ending==='good' ? 50 : game.ending==='partial' ? 20 : -25;
    addScore(endingScore, game.ending==='good' ? 'اتهام صح وحاسم' : game.ending==='partial' ? 'اتهام صح بس ناقص أدلة' : 'اتهام غلط', { silent:true });
    gaTrack('case_complete', {
      ending: game.ending,
      accused_suspect_id: String(game.accSuspect || ''),
      evidence_count: game.collected.size,
      evidence_total: CASE.evidence.length,
      conclusive_found: hits,
      conclusive_required: required,
      hints_used: game.hintsUsed,
      score: game.score,
      play_mode: currentPlayMode(),
      theory_correct: theory.correct,
      theory_total: theory.total,
      theory_required: theory.required,
    });

    game.screen='ending';
    persistProgress();
    render();
    triggerFlash(game.ending);
    submitScoreToLeaderboard();       // ليدربورد القضية دي بس (case_scores)
    submitToGlobalLeaderboard();      // الليدربورد العام عبر كل القضايا (leaderboard_entries)
    setTimeout(showTelegramInvite, 1100);
  }, 1500);
}

/* ============================================================
   الليدربورد العام — عبر كل القضايا (اسم مستعار + عدد قضايا +
   إجمالي نقاط + أسرع وقت). منفصل تمامًا عن case_scores فوق،
   بيتعرض في صفحة leaderboard.html لوحدها.
   ============================================================ */
function submitToGlobalLeaderboard(){
  if(typeof Leaderboard === 'undefined') return; // leaderboard.js مش متحمّل
  if(game.ending !== 'good') return; // بيتسجل بس لما القضية تتحل صح بالكامل
  // منع التسجيل المكرر: أول حل ناجح للقضية دي بس هو اللي بيتبعت للـ leaderboard
  // العام، حتى لو اللاعب عاد لعبها تاني بعد كده (إعادة لعب لازم متزودش إجمالي نقاطه)
  if(getGlobalLeaderboardSubmittedIds().includes(CASE.id)) return;
  const solveTimeSeconds = game.startedAt ? Math.round((Date.now() - game.startedAt) / 1000) : 0;
  Leaderboard.submitScore({
    caseId: CASE.id,
    caseTitle: CASE.title,
    points: Math.max(0, Math.floor(game.score || 0)),
    solveTimeSeconds,
    endingType: 'good',
    visitorId: getVisitorId(),
  }).then(res => {
    if(!res || !res.error) markGlobalLeaderboardSubmitted(CASE.id);
  }).catch(err => console.error('submitToGlobalLeaderboard failed', err));
}

/* ============================================================
   LEADERBOARD — بعد كل قضية بتتبعت نتيجتك للـ Supabase (لو الاتصال شغال)،
   وشاشة النهاية بتعرض أفضل 10 نتائج لنفس القضية.
   ============================================================ */
async function submitScoreToLeaderboard(){
  if(typeof submitScore !== 'function') return; // supabase-client.js مش متحمّل
  try{
    await submitScore({
      caseId: CASE.id,
      visitorId: getVisitorId(),
      playerName: getPlayerName() || 'محقق مجهول',
      score: game.score,
      pointsLeft: game.points,
      hintsUsed: game.hintsUsed,
      endingId: game.ending,
    });
  }catch(err){
    console.error('submitScoreToLeaderboard failed', err);
  }
  renderLeaderboardBox();
}

// ألقاب إبداعية لأول 5 محققين في كل قضية — بعد كده رقم ترتيب عادي
const LEADERBOARD_TITLES = [
  '🥇 المحقق الأسطوري',
  '🥈 العقل المدبر',
  '🥉 صياد الأدلة',
  '🕵️ خبير التحقيق',
  '🔍 عين الصقر',
];
function leaderboardRankLabel(i){
  return LEADERBOARD_TITLES[i] || `#${i+1}`;
}

async function renderLeaderboardBox(){
  const box = document.getElementById('leaderboardBox');
  if(!box) return;
  box.innerHTML = `<p class="dim mono" style="font-size:12px;">جارِ تحميل الليدربورد...</p>`;
  if(typeof fetchLeaderboard !== 'function'){
    box.innerHTML = `<p class="dim" style="font-size:12px;">الليدربورد مش متاح دلوقتي.</p>`;
    return;
  }
  try{
    const rows = await fetchLeaderboard(CASE.id, 10);
    if(!rows.length){
      box.innerHTML = `<p class="dim" style="font-size:12px;">كن أول واحد يدخل الليدربورد على القضية دي!</p>`;
      return;
    }
    const myId = getVisitorId();
    box.innerHTML = rows.map((r,i)=>`
      <div class="lb-row ${r.visitor_id===myId?'me':''} ${i<5?'lb-top':''}">
        <span class="lb-rank mono">${leaderboardRankLabel(i)}</span>
        <span class="lb-name">${escapeHTML(r.player_name||'محقق مجهول')}</span>
        <span class="lb-score mono">${Number(r.score) || 0}</span>
      </div>
    `).join('');
  }catch(err){
    console.error('renderLeaderboardBox failed', err);
    box.innerHTML = `<p class="dim" style="font-size:12px;">تعذّر تحميل الليدربورد.</p>`;
  }
}

/* ============================================================
   تقييم القضية — نجوم (1-5) + تعليق اختياري بعد كل قضية.
   شغّل CASE_REVIEWS_SETUP.sql مرة واحدة في Supabase قبل رفع
   النسخة الجديدة من supabase-client.js.
   ============================================================ */
function reviewBoxHTML(){
  const saved = getSavedReview(CASE.id);
  if(saved){
    const safeRating = Math.max(0, Math.min(5, Number(saved.rating) || 0));
    return `
      <div class="review-box mono">
        <h4 style="font-size:13px; color:var(--signal); margin-bottom:8px;">✓ شكرًا على تقييمك للتحقيق ده</h4>
        <div class="review-stars-display">${'★'.repeat(safeRating)}${'☆'.repeat(5-safeRating)}</div>
        ${saved.comment ? `<p class="dim" style="font-size:13px; margin-top:8px;">"${escapeHTML(saved.comment)}"</p>` : ''}
        <div id="reviewAverageBox" style="margin-top:10px; font-size:12px; color:var(--ink-dim);"></div>
      </div>
    `;
  }
  return `
    <div class="review-box">
      <h4 class="mono" style="font-size:13px; color:var(--signal); margin-bottom:10px;">قيّم التحقيق</h4>
      <div class="star-rating" id="reviewStars" data-rating="0">
        ${[1,2,3,4,5].map(n=>`<button type="button" class="star-btn" data-star="${n}" aria-label="تقييم ${n} نجوم">☆</button>`).join('')}
      </div>
      <textarea id="reviewComment" class="review-comment" placeholder="رأيك في القضية (اختياري)..." maxlength="240" rows="2"></textarea>
      <button class="btn ghost" id="submitReviewBtn" disabled style="width:100%; margin-top:10px;">أرسل التقييم</button>
      <div id="reviewAverageBox" style="margin-top:10px; font-size:12px; color:var(--ink-dim);"></div>
    </div>
  `;
}

async function renderCaseReviewStats(){
  const box = document.getElementById('reviewAverageBox');
  if(!box) return;
  if(typeof fetchCaseReviewStats !== 'function') return; // supabase-client.js مش متحمّل أو محدّث
  try{
    const stats = await fetchCaseReviewStats(CASE.id);
    if(!stats || !stats.count){
      box.textContent = 'كن أول واحد يقيّم القضية دي';
      return;
    }
    box.innerHTML = `متوسط تقييم اللاعبين: <strong style="color:var(--amber);">${stats.avg.toFixed(1)} ★</strong> من ${stats.count} تقييم`;
  }catch(err){
    console.error('renderCaseReviewStats failed', err);
  }
}

async function submitCaseReview(rating, comment){
  gaTrack('case_review_submitted', { rating: String(rating) });
  saveReviewLocally(CASE.id, { rating, comment });
  if(typeof submitReview === 'function'){
    try{
      await submitReview({
        caseId: CASE.id,
        visitorId: getVisitorId(),
        playerName: getPlayerName() || 'محقق مجهول',
        rating, comment,
      });
    }catch(err){ console.error('submitCaseReview failed', err); }
  }
  const box = document.querySelector('.review-box');
  if(box) box.outerHTML = reviewBoxHTML();
  renderCaseReviewStats();
}

/* ============================================================
   جاهز لقضية تانية؟ — بنعرض قضيتين مجانيتين بعد كل قضية، من
   بين القضايا الجاهزة اللي لسه ما لعبهاش (بالأولوية).
   ============================================================ */
function pickEndingRecommendations(){
  const completed = new Set(getCompletedIds());
  const pool = CASES_REGISTRY.filter(c => isCaseReady(c) && c.id !== CASE.id);
  function pickFrom(list){
    if(!list.length) return null;
    const notDone = list.filter(c=>!completed.has(c.id));
    const source = notDone.length ? notDone : list;
    return source[Math.floor(Math.random()*source.length)];
  }
  const firstPick = pickFrom(pool);
  const secondPick = pickFrom(pool.filter(c => !firstPick || c.id !== firstPick.id));
  return { firstPick, secondPick };
}

function endingRecCardHTML(c){
  if(!c) return '';
  const badge = `<span class="lib-badge mono" style="background:var(--signal); color:#0c231d;">مجانية</span>`;
  return `
    <div class="lib-card ending-rec-card" data-rec-case="${c.id}">
      ${badge}
      <div class="cover"><img src="${c.coverImg}" class="photo-tone" alt="${c.title}" loading="lazy"></div>
      <div class="body">
        <h4>${c.title}</h4>
        <div class="meta">${c.caseNo} · ${c.estMinutes} دقيقة</div>
      </div>
    </div>
  `;
}

function endingRecommendationsHTML(){
  const { firstPick, secondPick } = pickEndingRecommendations();
  if(!firstPick && !secondPick) return '';
  return `
    <div class="ending-recs-section">
      <h4 class="mono" style="font-size:13px; color:var(--signal); margin-bottom:10px;">جاهز لقضية تانية؟</h4>
      <div class="ending-recs">
        ${endingRecCardHTML(firstPick)}
        ${endingRecCardHTML(secondPick)}
      </div>
    </div>
  `;
}

/* ============================================================
   ENDING
   ============================================================ */

function normalizedEndingHint(text){
  const required = Number(CASE.conclusiveRequired) || 2;
  const numberWord = '(?:تلات(?:ة)?|ثلاث(?:ة)?|أربع(?:ة)?|اربعة|خمس(?:ة)?|[2-9])';
  return String(text || '')
    .replace(new RegExp(`اجمع\\s+${numberWord}\\s+أدلة?\\s+على الأقل`, 'i'), `اجمع ${required} أدلة على الأقل`)
    .replace(new RegExp(`على الأقل\\s+${numberWord}\\s+أدلة?`, 'i'), `على الأقل ${required} أدلة`);
}

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
  const hintText = game.ending === 'partial' ? normalizedEndingHint(e.hint) : e.hint;
  const hint = hintText ? `<p class="dim">${hintText}</p>` : '';
  return `
    <div class="stamp ${game.ending} mono">${e.stamp}</div>
    <div class="ending-badge ${game.ending} mono">${e.badgeLabel}</div>
    <div class="ending-title ${game.ending}">${e.title}</div>
    ${paragraphs}
    ${hint}
    ${bonus}
    <div class="score-final mono">تقييم التحقيق النهائي: <strong>${game.score}</strong></div>
    <div class="lb-box">
      <h4 class="mono" style="font-size:13px; color:var(--signal); margin-bottom:8px;">🏆 الليدربورد — طرف الخيط</h4>
      <div id="leaderboardBox"><p class="dim mono" style="font-size:12px;">جارِ تحميل الليدربورد...</p></div>
    </div>
    ${reviewBoxHTML()}
    ${socialLinksHTML('ending')}
    ${classificationNoteHTML()}
    ${redHerringNoteHTML()}
    ${theoryNoteHTML()}
    ${endingRecommendationsHTML()}
    <div class="divider"></div>
    <button class="btn ghost" data-restart>ابدأ القضية دي من الأول</button>
    <button class="btn" data-back-to-lib style="margin-right:10px;">رجوع للأرشيف</button>
  `;
}

/* ============================================================
   EVENTS
   ============================================================ */

function handleInterrogationQuestionButton(btn){
  const idx = parseInt(btn.dataset.q,10);
  const s = suspectById(game.activeSuspect);
  if(!s) return;
  if(!game.interrogated[s.id]) game.interrogated[s.id] = new Set();
  if(game.interrogated[s.id].has(idx)) return;
  game.interrogated[s.id].add(idx);
  const item = s.questions[idx];
  gaTrack('interrogation_question', {
    suspect_id: String(s.id || ''),
    suspect_name: String(s.name || ''),
    question_number: idx + 1,
  });
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
  if(item.closesInterrogation) game.interrogationClosed[s.id] = true;
  persistProgress();
  if(item.closesInterrogation){
    setTimeout(()=>{ render(); }, item.a.length*10+400);
  } else {
    renderTabs();
  }
  const evCount = document.getElementById('evCount');
  if(evCount) evCount.textContent = game.collected.size + ' / ' + CASE.evidence.length;
}

function bindInterrogationQuestionButtons(root=document){
  root.querySelectorAll('.q-btn:not(.confront-btn)').forEach(btn=>{
    if(btn.dataset.boundQuestion==='1') return;
    btn.dataset.boundQuestion='1';
    btn.addEventListener('click', ()=>handleInterrogationQuestionButton(btn));
  });
}

function refreshInterrogationQuestionGrid(){
  const grid = document.getElementById('questionGrid');
  const s = suspectById(game.activeSuspect);
  if(!grid || !s) return;
  const answered = game.interrogated[s.id] || new Set();
  grid.innerHTML = interrogationQuestionButtonsHTML(s, answered, false, !!game.interrogationClosed[s.id]);
  bindInterrogationQuestionButtons(grid);
}

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

  document.querySelectorAll('[data-background-check]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const suspectId = btn.dataset.backgroundCheck;
      if(!suspectById(suspectId) || game.backgroundChecks.has(suspectId)) return;
      game.backgroundChecks.add(suspectId);
      gaTrack('background_check_requested', { suspect_id:String(suspectId) });
      persistProgress();
      showToast('تم استلام نتيجة التحريات الأمنية.', 'amber');
      render();
    });
  });

  bindInterrogationQuestionButtons();

  document.querySelectorAll('.confront-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.disabled) return;
      const evId = btn.dataset.confront;
      const s = suspectById(game.activeSuspect);
      if(!game.confronted[s.id]) game.confronted[s.id] = new Set();
      if(!game.interrogated[s.id]) game.interrogated[s.id] = new Set();
      if(game.confronted[s.id].has(evId)) return;
      game.confronted[s.id].add(evId);
      btn.disabled = true;

      const ev = evidenceById(evId);
      gaTrack('suspect_confronted', {
        suspect_id: String(s.id || ''),
        suspect_name: String(s.name || ''),
        evidence_id: String(evId || ''),
      });
      // رد المواجهة: الأول رد مخصص من بيانات القضية. لو القضية القديمة
      // معندهاش confrontations لكن عندها سؤال متابعة محتاج الدليل، المواجهة
      // بتسأل السؤال المكتوب نفسه وتعرض إجابته المخصصة بدل الجملة العامة.
      let reaction = null;
      let unlockId = null;
      let linkedQuestion = null;
      let linkedQuestionIndex = -1;
      let autoAnsweredLinkedQuestion = false;
      const confrontation = s.confrontations && s.confrontations[evId];

      if(confrontation){
        if(typeof confrontation === 'string'){
          reaction = confrontation;
        } else {
          reaction = confrontation.text || confrontation.a || null;
          unlockId = confrontation.unlockId || null;
        }
      }

      if(!reaction){
        linkedQuestionIndex = (s.questions || []).findIndex((item, idx)=>{
          if(game.interrogated[s.id].has(idx)) return false;
          const req = Array.isArray(item.requires) ? item.requires : [];
          return req.includes(evId) && req.every(id=>game.collected.has(id));
        });
        if(linkedQuestionIndex >= 0){
          linkedQuestion = s.questions[linkedQuestionIndex];
          reaction = linkedQuestion.a;
          autoAnsweredLinkedQuestion = true;
        }
      }

      if(!reaction && s.confrontations && s.confrontations.default){
        const fallback = s.confrontations.default;
        reaction = typeof fallback === 'string' ? fallback : (fallback.text || fallback.a || null);
        if(!unlockId && fallback && typeof fallback === 'object') unlockId = fallback.unlockId || null;
      }

      // حارس دفاعي فقط لأي قضية مستقبلية فيها metadata ناقصة. مع الفلترة
      // الحالية المفروض المسار ده مايبقاش قابل للوصول في القضايا الموجودة.
      if(!reaction){
        console.warn('Missing confrontation response:', CASE && CASE.id, s.id, evId);
        reaction = `${s.name} بصّ على «${ev.title}»، لكن ملف القضية مفيهوش سؤال مواجهة محدد للدليل ده.`;
      }

      const transcript = document.getElementById('transcript');
      if(transcript){
        const placeholder = transcript.querySelector('p.dim');
        if(placeholder) placeholder.remove();
        const qLine = document.createElement('div');
        qLine.className='line q';
        qLine.innerHTML = `<div class="who">🧵 واجهته بـ</div>${ev.title}${autoAnsweredLinkedQuestion ? `<div style="margin-top:7px;color:var(--signal);">${linkedQuestion.q}</div>` : ''}`;
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
      if(autoAnsweredLinkedQuestion){
        game.interrogated[s.id].add(linkedQuestionIndex);
        const linkedRequirements = Array.isArray(linkedQuestion.requires) ? linkedQuestion.requires : [];
        document.querySelectorAll('.confront-btn').forEach(otherBtn=>{
          // امنع الضغط السريع على دليل تاني لنفس سؤال المتابعة قبل إعادة الرسم.
          // ولو السؤال قفل الاستجواب، اقفل كل مواجهات الشخص فورًا.
          if(linkedQuestion.closesInterrogation || linkedRequirements.includes(otherBtn.dataset.confront)){
            otherBtn.disabled = true;
          }
        });
        gaTrack('interrogation_question', {
          suspect_id: String(s.id || ''),
          suspect_name: String(s.name || ''),
          question_number: linkedQuestionIndex + 1,
          via_confrontation: 'yes',
        });
        if(linkedQuestion.unlockId) collect(linkedQuestion.unlockId);
        if(linkedQuestion.closesInterrogation) game.interrogationClosed[s.id] = true;
      }
      if(unlockId) collect(unlockId);
      persistProgress();
      renderTabs();
      if(autoAnsweredLinkedQuestion){
        // بعد انتهاء الكتابة نعيد بناء الاستجواب من الحالة المحفوظة؛ السؤال
        // وإجابته يفضلوا ظاهرين، وأي أزرار مواجهة زائدة لنفس السؤال تختفي.
        setTimeout(()=>{
          if(CASE && game && game.activeSuspect === s.id && app.view === 'case') render();
        }, reaction.length*10+400);
      } else {
        // الرد المخصص ممكن يفتح سؤال متابعة عادي؛ نحدّث الأزرار من غير
        // ما نمسح نص المواجهة الجاري كتابته.
        refreshInterrogationQuestionGrid();
      }
      const evCount = document.getElementById('evCount');
      if(evCount) evCount.textContent = game.collected.size + ' / ' + CASE.evidence.length;
    });
  });

  document.querySelectorAll('[data-field-action]').forEach(btn=>{
    btn.addEventListener('click', ()=>runFieldAction(btn.dataset.fieldAction));
  });

  const codeInput = document.getElementById('codeLockInput');
  if(codeInput){
    codeInput.addEventListener('input', ()=>{ game.codeLockInput=codeInput.value; });
    codeInput.addEventListener('keydown', e=>{ if(e.key==='Enter') submitCodeLock(); });
  }
  const submitCode = document.getElementById('submitCodeLock');
  if(submitCode) submitCode.addEventListener('click', submitCodeLock);

  document.querySelectorAll('[data-cipher-fragment]').forEach(sel=>{
    sel.addEventListener('change', ()=>{ game.cipherSelections[sel.dataset.cipherFragment]=sel.value; persistProgress(); });
  });
  const cipherInput = document.getElementById('cipherInput');
  if(cipherInput){ cipherInput.addEventListener('input', ()=>{ game.cipherInput=cipherInput.value; }); cipherInput.addEventListener('keydown', e=>{if(e.key==='Enter') submitCipher();}); }
  const submitCipherBtn=document.getElementById('submitCipher');
  if(submitCipherBtn) submitCipherBtn.addEventListener('click', submitCipher);

  document.querySelectorAll('[data-match-left]').forEach(sel=>{
    sel.addEventListener('change', ()=>{ game.matchSelections[sel.dataset.matchLeft]=sel.value; persistProgress(); });
  });
  const submitMatchBtn=document.getElementById('submitMatch');
  if(submitMatchBtn) submitMatchBtn.addEventListener('click', submitMatch);

  const simpleAudioBtn = document.getElementById('runSimpleAudioAnalysis');
  if(simpleAudioBtn) simpleAudioBtn.addEventListener('click', completeSimpleAudioAnalysis);

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

  document.querySelectorAll('[data-dnalab]').forEach(chip=>{
    chip.addEventListener('click', ()=> handleDnaLabClick(chip.dataset.dnalab));
  });

  document.querySelectorAll('[data-alibi-suspect]').forEach(cell=>{
    cell.addEventListener('click', ()=> handleAlibiGridClick(cell.dataset.alibiSuspect, parseInt(cell.dataset.alibiSlot,10)));
  });

  document.querySelectorAll('[data-ledger]').forEach(row=>{
    row.addEventListener('click', ()=> handleLedgerAuditClick(parseInt(row.dataset.ledger,10)));
  });

  document.querySelectorAll('[data-polygraph-ask]').forEach(btn=>{
    btn.addEventListener('click', ()=> handlePolygraphAsk(btn.dataset.polygraphAsk));
  });
  document.querySelectorAll('[data-polygraph-accuse]').forEach(btn=>{
    btn.addEventListener('click', ()=> handlePolygraphAccuse(btn.dataset.polygraphAccuse));
  });

  document.querySelectorAll('[data-floorplan-preview]').forEach(chip=>{
    chip.addEventListener('click', (e)=>{
      if(e.target.closest('[data-floorplan-confirm]')) return;
      handleFloorPlanPreview(chip.dataset.floorplanPreview);
    });
  });
  document.querySelectorAll('[data-floorplan-confirm]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      handleFloorPlanConfirm(btn.dataset.floorplanConfirm);
    });
  });

  document.querySelectorAll('[data-witness]').forEach(chip=>{
    chip.addEventListener('click', ()=> handleWitnessClick(chip.dataset.witness));
  });

  document.querySelectorAll('[data-handwriting]').forEach(chip=>{
    chip.addEventListener('click', ()=> toggleHandwritingField(chip.dataset.handwriting));
  });
  const submitHandwritingBtn = document.getElementById('submitHandwriting');
  if(submitHandwritingBtn) submitHandwritingBtn.addEventListener('click', submitHandwriting);

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
    gaTrack('accusation_submitted', {
      suspect_id: String(game.accSuspect || ''),
      evidence_count: game.accEvidence.size,
    });
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
    gaTrack('case_restart', { previous_ending: game.ending || 'incomplete', play_mode: currentPlayMode() });
    const selectedMode = currentPlayMode();
    game = freshGameState();
    game.points = null;
    game.playMode = selectedMode;
    ensureSceneEvidence();
    persistProgress();
    render();
  });
  const backLibBtn = document.querySelector('[data-back-to-lib]');
  if(backLibBtn) backLibBtn.addEventListener('click', ()=>{
    returnToLibraryFromCase();
  });

  // ---- تقييم القضية (شاشة النهاية) ----
  const starsBox = document.getElementById('reviewStars');
  if(starsBox){
    starsBox.querySelectorAll('.star-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const n = parseInt(btn.dataset.star, 10);
        starsBox.dataset.rating = String(n);
        starsBox.querySelectorAll('.star-btn').forEach(b=>{
          const bn = parseInt(b.dataset.star, 10);
          b.textContent = bn<=n ? '★' : '☆';
          b.classList.toggle('active', bn<=n);
        });
        const submitBtn = document.getElementById('submitReviewBtn');
        if(submitBtn) submitBtn.disabled = false;
      });
    });
  }
  const submitReviewBtn = document.getElementById('submitReviewBtn');
  if(submitReviewBtn) submitReviewBtn.addEventListener('click', ()=>{
    const box = document.getElementById('reviewStars');
    const rating = parseInt(box && box.dataset.rating || '0', 10);
    if(!rating) return;
    const commentEl = document.getElementById('reviewComment');
    const comment = commentEl ? commentEl.value.trim().slice(0,240) : '';
    submitReviewBtn.disabled = true;
    submitReviewBtn.textContent = 'جارِ الإرسال...';
    submitCaseReview(rating, comment);
  });
  if(document.getElementById('reviewAverageBox')) renderCaseReviewStats();

  // ---- جاهز لقضية تانية؟ (شاشة النهاية) ----
  document.querySelectorAll('[data-rec-case]').forEach(card=>{
    card.addEventListener('click', ()=>{
      const c = CASES_REGISTRY.find(x=>x.id===card.dataset.recCase);
      if(!c) return;
      gaTrack('ending_recommendation_click', {
        case_id: String(c.id || ''),
      });
      openCasePreview(c, isCaseLocked(c));
    });
  });
}

/* ============================================================
   GO
   ============================================================ */

boot();
