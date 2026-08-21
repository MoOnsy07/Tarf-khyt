/* ============================================================
   بيانات قضية: خطوبة مؤجلة
   قضية اختفاء — عريس بيختفي ليلة كتب الكتاب من غير أي أثر،
   قدام عيلته وعيلة العروسة المنتظرين في الصالة.
   ============================================================ */

const IMG_BASE_POSTPONEDENGAGEMENT = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/postponed-engagement/';

const CASE_POSTPONED_ENGAGEMENT = {
  id: 'postponed-engagement',
  title: 'خطوبة مؤجلة',
  caseNo: 'CASE 058',
  subtitle: 'بيت العروسة، ليلة كتب الكتاب',
  coverImg: IMG_BASE_POSTPONEDENGAGEMENT + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 19,
  teaser: 'عريس بيختفي فجأة في ليلة كتب الكتاب، وسط عيلته وعيلة العروسة المنتظرين في الصالة، من غير أي رسالة أو تفسير واضح.',

  isPremium: false,
  categories: ['disappearance', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_POSTPONEDENGAGEMENT + 'cover.webp',
    heroCaption: 'CASE 058 — ليلة كتب الكتاب',
    text1: 'العريس "معتز" كان فاضل شوية على موعد كتب الكتاب في بيت عروسته "هنا"، وفجأة اختفى من غير أي أثر، بعد ما خرج "يستنشق هوا" لدقايق قدام العمارة. عيلته وعيلة هنا فضلوا مستنيين ساعات طويلة قبل ما يقرروا يبلغوا.',
    text2: 'هنا طلبت منك تحقق بسرعة قبل ما القصة تتحول لفضيحة اجتماعية كبيرة. عندك آخر رسائل معتز، وقائمة الأشخاص المقربين منه اللي حضروا الاحتفال.',
    meta: [
      { label:'المختفي', value:'معتز — العريس' },
      { label:'آخر مكان معروف', value:'قدام عمارة هنا مباشرة' },
      { label:'التوقيت', value:'قبل كتب الكتاب بدقايق' },
      { label:'طلب التحقيق', value:'هنا، العروسة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاستعدادات',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene1.jpg',
      text:'بيت هنا مزين بأناقة، العائلتين مجتمعين، والجميع مبسوط ومنتظر بداية حفل كتب الكتاب.'
    },
    {
      scene:'المشهد ٢ — الخروج',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene2.jpg',
      text:'معتز بيعتذر للحاضرين ويقول إنه هينزل يستنشق هوا لدقايق قبل الحفل، ويمشي لوحده لبره العمارة.'
    },
    {
      scene:'المشهد ٣ — القلق',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene3.jpg',
      text:'الوقت بيعدي، معتز ما يرجعش، وموبايله طالع مغلق. الحاضرين بيبدأوا يقلقوا ويدوروا عليه في الشارع.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene4.jpg',
      text:'هنا بتديك موبايل معتز فيه آخر رسائله، وقائمة أصدقائه وأقاربه اللي حضروا الاحتفال.'
    },
  ],

  suspects: [
    {
      id:'exgirlfriend_dalia_p', name:'داليا', role:'صديقة سابقة لمعتز', img: IMG_BASE_POSTPONEDENGAGEMENT + 'dalia_p.jpg', avatarEmoji:'💔',
      alibi:'قالت إنها ماكانتش موجودة في الاحتفال أصلاً، ولا قريبة من المكان.',
      questions:[
        { q:'علاقتك بمعتز خلصت إزاي؟', unlockId:'dalia_p_breakup',
          a:'"خلصت بشكل مفاجئ من ناحيته، لسه متأثرة من الطريقة اللي حصل بيها."' },
        { q:'كنتِ بتتواصلي معاه قبل الخطوبة دي؟', requires:['dalia_p_breakup'], unlockId:'dalia_p_contact',
          a:'(بتتردد) "بعتله رسالة قبل الاحتفال بيوم، سألته لو متأكد من قراره."' },
      ]
    },
    {
      id:'best_man_tamer_p', name:'تامر', role:'أعز أصدقاء معتز', img: IMG_BASE_POSTPONEDENGAGEMENT + 'tamer_p.jpg', avatarEmoji:'🤵',
      alibi:'قال إنه كان جوه الاحتفال طول الوقت، معاه أفراد العيلة.',
      questions:[
        { q:'معتز كان بيتصرف طبيعي قبل ما يخرج؟', unlockId:'tamer_p_behavior',
          a:'"كان متوتر شوية، بس ده طبيعي في يوم زي ده، مفيش حاجة غريبة لفتت نظري."' },
        { q:'قالك حاجة عن نيته يخرج بره؟', requires:['tamer_p_behavior'], unlockId:'tamer_p_confession',
          a:'(بيتردد) "قالي إنه لازم يكلم حد مهم قبل الحفل، ما قالش مين بالظبط."' },
      ]
    },
    {
      id:'brides_father_sameh_p', name:'سامح', role:'والد هنا، العروسة', img: IMG_BASE_POSTPONEDENGAGEMENT + 'sameh_p.jpg', avatarEmoji:'👔',
      alibi:'قال إنه كان مستقبل الضيوف داخل الشقة طول الوقت.',
      questions:[
        { q:'كانت عندك أي تحفظات على معتز كعريس لابنتك؟', unlockId:'sameh_p_reservations',
          a:'"صراحة، كان عندي شكوك في وضعه المالي، طلبت منه توضيحات قبل الخطوبة."' },
        { q:'كلمت معتز بشكل خاص قبل الحفل؟', requires:['sameh_p_reservations'], unlockId:'sameh_p_private_talk',
          a:'(بيتردد) "قابلته لحظة قبل ما ينزل، ذكرته بالتوضيحات اللي طلبتها، بس مقصدتش أضغط عليه."' },
      ]
    },
    {
      id:'debt_collector_hassan_p', name:'حسن', role:'شخص معتز مديون له بمبلغ كبير', img: IMG_BASE_POSTPONEDENGAGEMENT + 'hassan_p.jpg', avatarEmoji:'💰',
      alibi:'قال إنه ماكانش قريب من مكان الاحتفال خالص.',
      questions:[
        { q:'علاقتك بمعتز كانت إيه؟', unlockId:'hassan_p_debt',
          a:'"مديون ليّ بمبلغ كبير من مشروع فشل، كان لازم يسدد قبل الخطوبة."' },
        { q:'كنت متصل بيه في يوم الاحتفال؟', requires:['hassan_p_debt'], unlockId:'hassan_p_pressure_call',
          a:'(بيتردد) "اتصلت بيه أذكره بالموعد النهائي للسداد، كان متوتر جدًا في المكالمة."' },
        { q:'شاهد أكد إنك كنت قريب من العمارة، مش بعيد زي ما قلت — عايز تفسر؟', requires:['hassan_p_pressure_call','sameh_p_private_talk','dalia_p_contact'], closesInterrogation:true,
          a:'(بيصمت طويل) "جيت أقابله شخصيًا آخر لحظة قبل ما يتجوز، عشان أضمن حقي. اتناقشنا برة العمارة، والموضوع اتصعّد، فأخدته معايا لحد ما يدبر الفلوس."' },
      ]
    },
  ],

  evidence: [
    { id:'last_text_message', tag:'من موبايل معتز', crit:false, title:'آخر رسالة من معتز', img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-text.jpg',
      short:'رسالة أخيرة بتقول "نازل أستنشق هوا وأرجع حالاً"',
      full:'آخر رسالة من معتز كانت لتامر بتقول إنه نازل يستنشق هوا ويرجع حالاً، من غير أي إشارة لأي مشكلة واضحة.',
      unlocked:true, order:1 },

    { id:'dalia_p_breakup', tag:'من استجواب داليا', crit:false, title:'انفصال داليا ومعتز', img:null,
      short:'داليا انفصلت عن معتز بشكل مفاجئ',
      full:'داليا اعترفت بانفصالها المفاجئ عن معتز، وإنها لسه متأثرة من الطريقة اللي حصل بيها الانفصال.',
      unlocked:false, order:2 },

    { id:'dalia_p_contact', tag:'من استجواب داليا', crit:false, title:'رسالة داليا الأخيرة', img:null,
      short:'داليا بعتت رسالة لمعتز قبل الاحتفال بيوم',
      full:'داليا اعترفت بإرسال رسالة لمعتز قبل الاحتفال بيوم واحد، بتسأله لو متأكد من قراره الزواج.',
      unlocked:false, order:3 },

    { id:'tamer_p_behavior', tag:'من استجواب تامر', crit:false, title:'توتر معتز الطبيعي', img:null,
      short:'معتز كان متوتر بشكل طبيعي زي أي عريس',
      full:'تامر أكد إن توتر معتز كان طبيعي في يوم زي ده، من غير أي علامات غير عادية واضحة.',
      unlocked:false, order:4 },

    { id:'tamer_p_confession', tag:'من استجواب تامر', crit:true, title:'نية معتز للتواصل مع حد', img:null,
      short:'معتز كان لازم يكلم حد مهم قبل الحفل',
      full:'تامر كشف إن معتز قاله إنه لازم يكلم حد مهم قبل الحفل، من غير ما يحدد هوية الشخص ده.',
      unlocked:false, order:5 },

    { id:'sameh_p_reservations', tag:'من استجواب سامح', crit:true, title:'شكوك سامح المالية', img:null,
      short:'سامح كان عنده شكوك في الوضع المالي لمعتز',
      full:'سامح اعترف بوجود شكوك في الوضع المالي لمعتز، وطلب منه توضيحات قبل الخطوبة.',
      unlocked:false, order:6 },

    { id:'sameh_p_private_talk', tag:'من استجواب سامح', crit:false, title:'لقاء سامح الأخير بمعتز', img:null,
      short:'سامح قابل معتز لحظة قبل ما ينزل',
      full:'سامح أكد إنه قابل معتز لحظة قبل ما ينزل، وذكّره بالتوضيحات المالية المطلوبة منه.',
      unlocked:false, order:7 },

    { id:'hassan_p_debt', tag:'من استجواب حسن', crit:true, title:'دين معتز الكبير', img:null,
      short:'معتز مديون لحسن بمبلغ كبير من مشروع فاشل',
      full:'حسن اعترف إن معتز مديون له بمبلغ كبير من مشروع تجاري فشل، وكان لازم يسدد قبل الخطوبة.',
      unlocked:false, order:8 },

    { id:'hassan_p_pressure_call', tag:'من سجل مكالمات معتز', crit:true, title:'مكالمة ضغط من حسن', img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-call.jpg',
      short:'حسن اتصل بمعتز في يوم الاحتفال يذكره بالسداد',
      full:'سجل المكالمات بيوضح اتصال من حسن لمعتز في نفس يوم الاحتفال، بيذكره بموعد نهائي للسداد.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  alibiGridPuzzle: {
    enabled: true,
    tabLabel: 'جدول مواقع الليلة',
    introText: 'قارن أقوال كل المشتبه بيهم عن أماكنهم في فترة اختفاء معتز، ودوّر على التناقض اللي بيكشف الكذب.',
    resultText: 'لقيت التناقض! حسن قال إنه ماكانش قريب من مكان الاحتفال خالص، لكن سجل مكالماته وشهادة الجيران بيوضحوا وجوده الفعلي قريب من العمارة.',
    timeSlots: ['قبل الخروج', 'لحظة الخروج', 'فترة الاختفاء', 'وقت البلاغ'],
    suspectClaims: {
      exgirlfriend_dalia_p:  ['بعيد تمامًا', 'بعيد تمامًا', 'بعيد تمامًا', 'بعيد تمامًا'],
      best_man_tamer_p:      ['جوه الاحتفال', 'جوه الاحتفال', 'جوه الاحتفال', 'جوه الاحتفال'],
      brides_father_sameh_p: ['يستقبل ضيوف', 'يستقبل ضيوف', 'يستقبل ضيوف', 'يستقبل ضيوف'],
      debt_collector_hassan_p: ['بعيد تمامًا', 'بعيد تمامًا', 'قريب من العمارة', 'بعيد تمامًا'],
    },
    contradictionSlotIndex: 2,
    contradictingSuspectId: 'debt_collector_hassan_p',
    resultEvidenceIds: ['hassan_p_pressure_call'],
  },

  evidenceCombinations: [
    { parts:['hassan_p_debt','tamer_p_confession'], resultId:'hassan_p_pressure_call' },
  ],

  correctSuspectId: 'debt_collector_hassan_p',
  conclusiveEvidenceIds: ['hassan_p_debt', 'hassan_p_pressure_call', 'tamer_p_confession'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن حسن هو المسؤول عن اختفاء معتز؟',
        options: [
          { id:'a', text:'التناقض الواضح في جدول مواقعه اللي أثبت وجوده قريب من العمارة + مكالمة الضغط اللي بعتها لمعتز في نفس يوم الاحتفال + اعتراف تامر بنية معتز للقاء حد مهم قبل الحفل' },
          { id:'b', text:'لأنه دائن لمعتز وده يكفي كدافع' },
          { id:'c', text:'لأن داليا كانت صديقته السابقة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي حصل فعليًا قدام العمارة؟',
        options: [
          { id:'a', text:'حسن جه يقابل معتز شخصيًا آخر لحظة قبل الزواج عشان يضمن حقه المالي بعد ما شك إن معتز هيتهرب من الدين بعد الخطوبة، النقاش اتصعّد، وأخده معاه لحد ما يدبر الفلوس' },
          { id:'b', text:'معتز هرب بإرادته من الزواج بسبب الضغط المالي' },
          { id:'c', text:'داليا كانت وراء اختفائه بدافع الغيرة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — RESCUE', title:'الخطوبة اللي كشفت الدين',
      paragraphs:[
        'معتز كان مديون لحسن بمبلغ كبير من مشروع تجاري فشل، وكان لازم يسدد قبل الخطوبة. حسن شك إن معتز هيتهرب من الدين بعد ما يتجوز، فقرر يقابله شخصيًا آخر لحظة قدام العمارة عشان يضمن حقه. النقاش اتصعّد، وأخده حسن معاه لحد ما يدبر الفلوس المطلوبة.',
        'التناقض الواضح في جدول مواقعه اللي أثبت وجوده الفعلي قريب من العمارة رغم إنكاره، ومكالمة الضغط اللي بعتها لمعتز في نفس يوم الاحتفال، واعتراف تامر بنية معتز للقاء حد مهم قبل الحفل، كلها أدلة حاصرت حسن وأدت لإنقاذ معتز في اللحظة المناسبة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية حسن، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: تناقض جدول مواقعه، مكالمة الضغط، ونية معتز للقاء حد مهم، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ومعتز فضل في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "خطوبة مؤجلة"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant living room decorated for an
   engagement ceremony, empty chairs facing each other, warm ambient
   lighting, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (engagement-scene1.jpg):
   "Photorealistic wide shot of two families gathered in a decorated
   living room for an engagement ceremony, warm ambient lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (engagement-scene2.jpg):
   "Photorealistic shot of a young man in a formal suit walking out
   of an apartment building at dusk, natural lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (engagement-scene3.jpg):
   "Photorealistic shot of worried family members searching a street
   outside an apartment building at dusk, natural lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (engagement-scene4.jpg):
   "Photorealistic shot of a woman in an elegant dress handing a
   phone to an investigator in a living room, warm indoor lighting,
   photorealistic, no text, no watermark"

   داليا (dalia_p.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual outfit,
   sorrowful guarded expression, sitting in a living room, soft
   natural lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   تامر (tamer_p.jpg):
   "Photorealistic portrait of a young Egyptian man in a formal suit,
   worried concerned expression, standing in a decorated living room,
   warm ambient lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   سامح (sameh_p.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, formal
   outfit, composed guarded expression, standing in a decorated
   living room, warm ambient lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   حسن (hassan_p.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   sharp outfit, tense calculating expression, standing outside an
   apartment building, dusk lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل الرسالة (engagement-text.jpg):
   "Photorealistic close-up of a smartphone screen showing a text
   message conversation, soft phone glow lighting, no text, no
   watermark, photorealistic"

   دليل المكالمة (engagement-call.jpg):
   "Photorealistic close-up of a smartphone screen showing a call log
   with a highlighted entry, soft phone glow lighting, no text, no
   watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_POSTPONED_ENGAGEMENT;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'hassan_p_alibi_broken', tag:'من شبكة الأعذار', crit:true, title:'حسن كان قريب من العمارة', img:null,
    short:'التوقيتات وشهادة الجيران بتكسر ادعاء حسن إنه كان بعيد',
    full:'مقارنة سجل المكالمات وشهادات الجيران بتوضح إن حسن كان قريب من عمارة معتز في الوقت الحرج، رغم إنكاره وجوده هناك.', unlocked:false, order:90 });
  c.alibiGridPuzzle.resultEvidenceIds = ['hassan_p_alibi_broken'];
  c.conclusiveEvidenceIds = ['hassan_p_pressure_call','tamer_p_confession','hassan_p_alibi_broken'];
  const h=c.suspects.find(s=>s.id==='debt_collector_hassan_p'); if(h){const q=h.questions.find(q=>q.closesInterrogation); if(q) q.requires=['hassan_p_pressure_call','tamer_p_confession','hassan_p_alibi_broken'];}
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: مكالمة الضغط، كلام تامر عن المقابلة المهمة، وكسر حجة مكان حسن، قبل ما تتهم.';

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_POSTPONED_ENGAGEMENT;
  c.evidenceCombinations = [];
  const h = c.suspects.find(s => s.id === 'debt_collector_hassan_p');
  if (h) {
    const q = h.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيصمت) "جيت أقابله فعلًا عشان الدين، واتكلمنا بعيد عن العمارة. بعدها مشي لوحده وقال إنه هيحل الموضوع. أنا كذبت في مكاني عشان ماحدش يربطني بالفضيحة."';
    }
  }
  if (c.alibiGridPuzzle) {
    c.alibiGridPuzzle.resultText = 'الجدول يثبت إن حسن كان قريب من العمارة رغم إنكاره. ده يكسر الأليبي ويثبت فرصة المواجهة، لكنه ما يثبتش وحده إنه تسبب في الاختفاء.';
  }
  c.conclusiveRequired = 3;
})();
