/* ============================================================
   بيانات قضية: خاتم الجدة
   قضية سرقة — خاتم عيلي غالي بيتسرق في يوم الخطوبة قدام كل
   الضيوف، من غير ما حد يلاحظ حتى لحظة السرقة نفسها.
   ============================================================ */

const IMG_BASE_GRANDMARING = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/grandma-ring/';

const CASE_GRANDMA_RING = {
  id: 'grandma-ring',
  title: 'خاتم الجدة',
  caseNo: 'CASE 049',
  subtitle: 'حفلة خطوبة عائلية، قاعة أفراح',
  coverImg: IMG_BASE_GRANDMARING + 'cover.webp',
  difficulty: 'سهلة',
  estMinutes: 26,
  investigationPoints: 15,
  teaser: 'خاتم عيلي أثري وغالي بيتسرق من على طاولة العروسة في يوم خطوبتها، قدام عشرات الضيوف، من غير ما حد يلاحظ لحظة السرقة نفسها.',

  isPremium: false,
  categories: ['theft', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_GRANDMARING + 'cover.webp',
    heroCaption: 'CASE 049 — منتصف حفلة الخطوبة',
    text1: 'العروسة "سارة" كانت لابسة خاتم جدتها الأثري الغالي في يوم خطوبتها، وحطته على الطاولة لحظة قبل ما تصور مع العريس. لما رجعت، الخاتم كان اختفى تمامًا من غير ما حد يلاحظ حاجة.',
    text2: 'سارة طلبت منك تحقق بسرعة قبل ما الحفلة تخلص والضيوف يتفرقوا. عندك قائمة الناس اللي كانوا قريبين من الطاولة في اللحظة دي.',
    meta: [
      { label:'القطعة المسروقة', value:'خاتم أثري عائلي ثمين' },
      { label:'مكان الحادثة', value:'طاولة العروسة، قاعة الأفراح' },
      { label:'التوقيت', value:'أثناء جلسة تصوير العروسين' },
      { label:'طلب التحقيق', value:'سارة، العروسة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحفلة',
      img: IMG_BASE_GRANDMARING + 'ring-scene1.jpg',
      text:'قاعة أفراح مزينة بأناقة، سارة لابسة الخاتم بفخر وسط تهنئة الضيوف والموسيقى.'
    },
    {
      scene:'المشهد ٢ — لحظة التصوير',
      img: IMG_BASE_GRANDMARING + 'ring-scene2.jpg',
      text:'سارة بتحط الخاتم على الطاولة لحظة قبل جلسة تصوير مع العريس، عشان الخاتم مايبانش في بعض اللقطات المطلوبة.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_GRANDMARING + 'ring-scene3.jpg',
      text:'سارة بترجع للطاولة بعد التصوير، تدور على الخاتم، تلاقيه مش موجود خالص.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_GRANDMARING + 'ring-scene4.jpg',
      text:'سارة بتديك قائمة الأقارب والضيوف اللي كانوا قريبين من الطاولة وقت التصوير.'
    },
  ],

  suspects: [
    {
      id:'cousin_mervat', name:'مرفت', role:'ابنة عم سارة', img: IMG_BASE_GRANDMARING + 'mervat.jpg', avatarEmoji:'💍',
      alibi:'قالت إنها كانت قاعدة على طاولة بعيدة طول وقت التصوير.',
      questions:[
        { q:'كنتِ معجبة بالخاتم ده قبل كده؟', unlockId:'mervat_admiration',
          a:'"طبعًا، كل العيلة بتحب الخاتم ده، بس ده مش معناه إني هسرقه."' },
        { q:'قربتِ من طاولة سارة في أي وقت؟', unlockId:'mervat_table_visit',
          a:'(بتتردد) "مريت جنب الطاولة أهنئها بس، ثواني بسيطة."' },
      ]
    },
    {
      id:'waiter_amr_r', name:'عمرو', role:'نادل في قاعة الأفراح', img: IMG_BASE_GRANDMARING + 'amr_r.jpg', avatarEmoji:'🍽️',
      alibi:'قال إنه كان بيقدم المشروبات للضيوف زي شغله المعتاد.',
      questions:[
        { q:'كنت قريب من طاولة العروسة وقت التصوير؟', unlockId:'amr_r_table_service',
          a:'"جيت أرتب الكاسات على الطاولة، ده جزء من شغلي العادي."' },
        { q:'شفت حد بيقرب من الطاولة غيرك؟', requires:['amr_r_table_service'], unlockId:'amr_r_saw_someone',
          a:'"شفت واحد من الضيوف بيقف قريب جدًا من الطاولة لفترة أطول من المعتاد."' },
      ]
    },
    {
      id:'family_friend_kamal_r', name:'كمال', role:'صديق العائلة، جامع تحف قديمة', img: IMG_BASE_GRANDMARING + 'kamal_r.jpg', avatarEmoji:'💎',
      alibi:'قال إنه كان قاعد يتكلم مع أقارب العروسة طول الوقت.',
      questions:[
        { q:'اهتمامك بالخاتم ده كان بسبب إيه؟', unlockId:'kamal_r_interest',
          a:'"الخاتم ده قطعة أثرية نادرة، بجمع قطع زيه من سنين، كان دايمًا حلمي أمتلك واحد شبهه."' },
        { q:'شاهد أكد إنك وقفت قريب من الطاولة لفترة أطول من المعتاد — عايز تفسر؟', requires:['kamal_r_interest','amr_r_saw_someone','mervat_table_visit'], closesInterrogation:true,
          a:'(بيسكت) "الإغراء كان أكبر مني، ده أندر قطعة شفتها في حياتي. أخدته بسرعة وحطيته في جيبي، مقصدش أوجع حد بالطريقة دي."' },
      ]
    },
  ],

  evidence: [
    { id:'empty_table_spot', tag:'من مسرح السرقة', crit:true, title:'مكان الخاتم فاضي', img: IMG_BASE_GRANDMARING + 'ring-empty.jpg',
      short:'الخاتم اختفى من على الطاولة من غير أي أثر واضح',
      full:'مكان الخاتم على الطاولة فاضي تمامًا، من غير أي أثر واضح لكسر أو اقتحام، وده بيدل على سرقة سريعة وهادئة.',
      unlocked:true, order:1 },

    { id:'mervat_admiration', tag:'من استجواب مرفت', crit:false, title:'إعجاب مرفت بالخاتم', img:null,
      short:'مرفت اعترفت بإعجابها العام بالخاتم',
      full:'مرفت اعترفت بإعجابها العام بالخاتم زي باقي العيلة، بس نفت أي علاقة لها بسرقته.',
      unlocked:false, order:2 },

    { id:'mervat_table_visit', tag:'من استجواب مرفت', crit:false, title:'زيارة مرفت للطاولة', img:null,
      short:'مرفت أكدت إنها قربت من الطاولة لثواني بسيطة',
      full:'مرفت أكدت إنها مرت جنب الطاولة لتهنئة سارة لثواني بسيطة بس، من غير أي شيء مريب.',
      unlocked:false, order:3 },

    { id:'amr_r_table_service', tag:'من استجواب عمرو', crit:false, title:'خدمة عمرو للطاولة', img:null,
      short:'عمرو كان بيرتب الكاسات على الطاولة',
      full:'عمرو أكد إنه كان بيرتب الكاسات على طاولة العروسة كجزء من شغله المعتاد وقت التصوير.',
      unlocked:false, order:4 },

    { id:'amr_r_saw_someone', tag:'من استجواب عمرو', crit:true, title:'شخص واقف قريب من الطاولة', img:null,
      short:'عمرو شاف ضيف واقف قريب من الطاولة لفترة أطول من المعتاد',
      full:'عمرو أكد إنه شاف أحد الضيوف واقف قريب جدًا من طاولة العروسة لفترة أطول من المعتاد، بشكل لفت انتباهه وقتها.',
      unlocked:false, order:5 },

    { id:'kamal_r_interest', tag:'من استجواب كمال', crit:true, title:'هوس كمال بالقطع الأثرية', img:null,
      short:'كمال جامع تحف نادرة ومهووس بقطع زي الخاتم',
      full:'كمال اعترف بشغفه الشخصي الكبير بجمع قطع أثرية نادرة، وإن الخاتم ده كان حلمه من زمان.',
      unlocked:false, order:6 },
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
    tabLabel: 'جدول مواقع الضيوف',
    introText: 'قارن مواقع كل المشتبه بيهم في اللحظات المختلفة أثناء جلسة التصوير، ودوّر على مين كان قريب من الطاولة في اللحظة الحرجة.',
    resultText: 'لقيت التناقض! كمال قال إنه كان قاعد يتكلم مع الأقارب طول الوقت، لكن الجدول بيوضح وجوده قريب من الطاولة في نفس لحظة اختفاء الخاتم.',
    timeSlots: ['بداية التصوير', 'منتصف التصوير', 'قبل النهاية', 'نهاية التصوير'],
    suspectClaims: {
      cousin_mervat:      ['طاولة بعيدة', 'طاولة بعيدة', 'طاولة بعيدة', 'طاولة بعيدة'],
      waiter_amr_r:       ['يخدم الطاولة', 'يخدم ضيوف', 'يخدم ضيوف', 'يخدم ضيوف'],
      family_friend_kamal_r: ['مع الأقارب', 'مع الأقارب', 'قريب من الطاولة', 'مع الأقارب'],
    },
    contradictionSlotIndex: 2,
    contradictingSuspectId: 'family_friend_kamal_r',
    resultEvidenceIds: ['amr_r_saw_someone'],
  },

  evidenceCombinations: [
    { parts:['kamal_r_interest','mervat_table_visit'], resultId:'amr_r_saw_someone' },
  ],

  correctSuspectId: 'family_friend_kamal_r',
  conclusiveEvidenceIds: ['kamal_r_interest', 'amr_r_saw_someone', 'empty_table_spot'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كمال هو الفاعل؟',
        options: [
          { id:'a', text:'شهادة عمرو النادل اللي أكدت وجوده قريب من الطاولة لفترة غير عادية + هوسه الشخصي بجمع القطع الأثرية النادرة + التناقض في جدول مواقعه' },
          { id:'b', text:'لأنه صديق العائلة وده يكفي كدافع' },
          { id:'c', text:'لأن مرفت كانت أقرب واحدة للطاولة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي خلى كمال يسرق الخاتم؟',
        options: [
          { id:'a', text:'إغراء لحظي عابر، مش خطة مدبّرة من قبل؛ شاف الخاتم لوحده على الطاولة وانساق وراء شغفه الشخصي بجمع القطع الأثرية النادرة' },
          { id:'b', text:'كان مخطط للسرقة من زمان قبل الحفلة' },
          { id:'c', text:'كان بيحاول يبيعه فورًا لتغطية ديون شخصية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الإغراء اللي ما قاومهوش',
      paragraphs:[
        'كمال، صديق العائلة وجامع القطع الأثرية النادرة، شاف خاتم سارة لوحده على الطاولة في لحظة التصوير. الإغراء كان أكبر منه، فأخده بسرعة وحطه في جيبه، من غير تخطيط مسبق، مجرد نزوة لحظية انساق وراها بسبب شغفه الشخصي العميق بالقطع النادرة.',
        'شهادة عمرو النادل اللي أكدت وجوده قريب من الطاولة لفترة غير عادية، وهوسه الشخصي المعترف بيه بجمع القطع الأثرية، والتناقض الواضح في جدول مواقعه أثناء جلسة التصوير، كلها أدلة حاصرته وكشفت السرقة بسرعة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كمال، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قبل ما الحفلة تخلص.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: شهادة النادل، هوسه بالتحف، وتناقض جدول مواقعه، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والخاتم فضل مفقود، والفاعل الحقيقي فضل طليق وسط الحفلة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "خاتم الجدة"

   الغلاف (cover.webp):
   "Photorealistic close-up of an ornate antique ring resting on an
   elegant table at a wedding hall, warm event lighting, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (ring-scene1.jpg):
   "Photorealistic wide shot of an elegant engagement party in a
   decorated wedding hall, guests celebrating, warm ambient lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (ring-scene2.jpg):
   "Photorealistic shot of a bride placing a ring on a table before
   a photo session, warm event lighting, photorealistic, no text,
   no watermark"

   المشهد ٣ (ring-scene3.jpg):
   "Photorealistic close-up of an empty spot on an elegant table
   where a ring should be, warm event lighting, forensic evidence
   photography style, no text, no watermark, photorealistic"

   المشهد ٤ (ring-scene4.jpg):
   "Photorealistic shot of a worried bride talking to an investigator
   at a wedding hall table, warm event lighting, photorealistic, no
   text, no watermark"

   مرفت (mervat.jpg):
   "Photorealistic portrait of a young Egyptian woman in an elegant
   evening dress, guarded cautious expression, standing at a wedding
   hall, warm event lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   عمرو (amr_r.jpg):
   "Photorealistic portrait of a young Egyptian male waiter, formal
   event uniform, attentive observant expression, standing near a
   wedding hall table, warm event lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   كمال (kamal_r.jpg):
   "Photorealistic portrait of an elderly Egyptian man, elegant
   formal outfit, calculating guilty expression, standing at a
   wedding hall, warm event lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل الطاولة (ring-empty.jpg):
   "Photorealistic close-up of an elegant empty table spot with a
   faint ring impression mark, warm event lighting, forensic
   evidence photography style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_GRANDMA_RING;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'kamal_r_alibi_broken', tag:'من شبكة الأعذار', crit:true, title:'كمال كان عند الطاولة وقت السرقة', img:null,
    short:'جدول الحركة بيكسر كلام كمال وبيحطه قريب من الخاتم وقت اختفائه',
    full:'مقارنة أماكن الضيوف بتوضح إن كمال ماكانش قاعد مع الأقارب طول الوقت زي ما قال، وكان قريب من طاولة العروسة في نفس لحظة اختفاء الخاتم.', unlocked:false, order:90 });
  c.alibiGridPuzzle.resultEvidenceIds = ['kamal_r_alibi_broken'];
  c.conclusiveEvidenceIds = ['kamal_r_interest','amr_r_saw_someone','kamal_r_alibi_broken'];
  const k=c.suspects.find(s=>s.id==='family_friend_kamal_r'); if(k){const q=k.questions.find(q=>q.closesInterrogation); if(q) q.requires=['kamal_r_interest','amr_r_saw_someone','kamal_r_alibi_broken'];}
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: اهتمام كمال بالخاتم، شهادة عمرو، وكسر حجة مكان كمال وقت السرقة، قبل ما تتهم.';

})();

(() => {
  const s = CASE_GRANDMA_RING.suspects.find(x => x.id === 'family_friend_kamal_r');
  if (s && !s.questions.some(x => x.q === 'وقت التصوير، سبت مكانك لأي سبب؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'وقت التصوير، سبت مكانك لأي سبب؟', requires:['kamal_r_interest'], a:'(بيتردد) "قمت دقايق أتحرك من الزحمة وأشرب حاجة، بس ماخدتش بالي إني كنت قريب من طاولة سارة."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_GRANDMA_RING;
  c.evidenceCombinations = [];
  const k = c.suspects.find(s => s.id === 'family_friend_kamal_r');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "وقفت عند الطاولة عشان أشوف الخاتم عن قرب، مش أكتر. أنا مهتم بالقطع القديمة فعلًا، لكن ده مش دليل إني أخدته."';
    }
  }
  c.conclusiveRequired = 3;
})();
