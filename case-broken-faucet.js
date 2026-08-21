/* ============================================================
   بيانات قضية: صنبور مكسور
   قضية قتل — سباك بيتقتل جوه فيلا مهجورة كان بيصلحها لوحده،
   من غير أي شاهد واضح على الحادثة.
   ============================================================ */

const IMG_BASE_BROKENFAUCET = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/broken-faucet/';

const CASE_BROKEN_FAUCET = {
  id: 'broken-faucet',
  title: 'صنبور مكسور',
  caseNo: 'CASE 057',
  subtitle: 'فيلا مهجورة، أطراف المدينة',
  coverImg: IMG_BASE_BROKENFAUCET + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 29,
  investigationPoints: 16,
  teaser: 'سباك محترف بيتقتل وهو بيصلح فيلا مهجورة لوحده، بعيد عن أي شاهد أو كاميرا. الفيلا نفسها بتخبي سر أكبر بكتير من مجرد صنبور مكسور.',

  isPremium: false,
  categories: ['murder', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_BROKENFAUCET + 'cover.webp',
    heroCaption: 'CASE 057 — فيلا مهجورة، بعد الظهر',
    text1: 'السباك "عادل" كان بيصلح تسريب مياه في فيلا مهجورة تابعة لعائلة ثرية، بشكل منفرد بعيد عن أي عمال تانيين. لما ماجاش البيت في المعاد، أخوه راح يدور عليه، ولقاه مقتول جوه الفيلا في غرفة بعيدة عن مكان الصنبور المفروض يصلحه.',
    text2: 'أخو عادل طلب منك تحقق قبل ما القضية تتحول لملف مفتوح بلا حل. عندك تفاصيل عمل عادل الأخير، وقائمة الأشخاص المرتبطين بالفيلا وعائلتها.',
    meta: [
      { label:'المجني عليه', value:'عادل — سباك محترف' },
      { label:'مكان الحادثة', value:'فيلا مهجورة، غرفة بعيدة عن مكان الشغل' },
      { label:'الغموض', value:'مكان الجثة بعيد عن مكان الصنبور المفروض يصلحه' },
      { label:'طلب التحقيق', value:'أخو عادل' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — بداية الشغل',
      img: IMG_BASE_BROKENFAUCET + 'faucet-scene1.jpg',
      text:'عادل بيوصل الفيلا المهجورة لوحده، معدات السباكة معاه، وبيبدأ يفحص مصدر تسريب المياه في المطبخ.'
    },
    {
      scene:'المشهد ٢ — استكشاف الفيلا',
      img: IMG_BASE_BROKENFAUCET + 'faucet-scene2.jpg',
      text:'عادل بيمشي في ممرات الفيلا المهجورة يدور على مصدر التسريب الحقيقي، بيوصل لغرفة بعيدة مقفولة.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_BROKENFAUCET + 'faucet-scene3.jpg',
      text:'أخو عادل بيوصل الفيلا يدور عليه بعد ما اتأخر، يلاقيه مقتول في غرفة بعيدة تمامًا عن مكان الصنبور.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_BROKENFAUCET + 'faucet-scene4.jpg',
      text:'أخو عادل بيديك تفاصيل شغل عادل الأخير، ومعلومات عن عائلة الفيلا المهجورة.'
    },
  ],

  suspects: [
    {
      id:'villa_caretaker_naim', name:'نعيم', role:'حارس الفيلا القديم', img: IMG_BASE_BROKENFAUCET + 'naim.jpg', avatarEmoji:'🔑',
      alibi:'قال إنه كان بره الفيلا يفحص السور الخارجي.',
      questions:[
        { q:'ليه الفيلا دي مهجورة أصلاً؟', unlockId:'naim_villa_history',
          a:'"العيلة صاحبة الفيلا سابتها من سنين بعد خلاف كبير بينهم، محدش بيسكن فيها دلوقتي."' },
        { q:'كنت عارف إن عادل هيصلح الصنبور النهاردة؟', requires:['naim_villa_history'], unlockId:'naim_knew_schedule',
          a:'"أيوه، أنا اللي فتحله الفيلا الصبح، وسبته يشتغل لوحده."' },
      ]
    },
    {
      id:'family_heir_youssef_b', name:'يوسف', role:'أحد ورثة عائلة الفيلا', img: IMG_BASE_BROKENFAUCET + 'youssef_b.jpg', avatarEmoji:'🏚️',
      alibi:'قال إنه كان بره المدينة تمامًا وقت الحادثة.',
      questions:[
        { q:'علاقتك بالفيلا دي كانت إيه؟', unlockId:'youssef_b_inheritance',
          a:'"في نزاع قانوني معقد بيني وبين إخواتي على ملكية الفيلا وبيعها."' },
        { q:'الفيلا فيها حاجة تخصك بشكل خاص؟', requires:['youssef_b_inheritance'], unlockId:'youssef_b_hidden_item',
          a:'(بيتردد) "فيه غرفة قديمة فيها مستندات مهمة تخص الميراث، كنت خايف حد يوصلها قبلي."' },
      ]
    },
    {
      id:'plumber_colleague_sabry_b', name:'صبري', role:'زميل عادل في مهنة السباكة', img: IMG_BASE_BROKENFAUCET + 'sabry_b.jpg', avatarEmoji:'🔧',
      alibi:'قال إنه كان مشغول بشغلانة تانية طول اليوم.',
      questions:[
        { q:'علاقتك بعادل كانت مستقرة في الشغل؟', unlockId:'sabry_b_rivalry',
          a:'"كنا بنتنافس على نفس عملاء الشركات الكبيرة، بس ده جزء طبيعي من الشغل."' },
        { q:'كنت عارف إنه هيشتغل في الفيلا دي بالذات النهاردة؟', requires:['sabry_b_rivalry'],
          a:'"سمعت منه، بس ماكنش عندي سبب أقرب من هناك."' },
      ]
    },
  ],

  evidence: [
    { id:'body_location_mismatch', tag:'من مسرح الجريمة', crit:true, title:'مكان الجثة بعيد عن مكان الشغل', img: IMG_BASE_BROKENFAUCET + 'faucet-body.jpg',
      short:'الجثة اتلاقت في غرفة بعيدة تمامًا عن مكان تسريب المياه',
      full:'جثة عادل اتلاقت في غرفة بعيدة تمامًا عن مطبخ الفيلا، مكان تسريب المياه المفروض يصلحه، وده بيثير تساؤلات عن سبب وجوده هناك أصلاً.',
      unlocked:true, order:1 },

    { id:'naim_villa_history', tag:'من استجواب نعيم', crit:false, title:'تاريخ هجر الفيلا', img:null,
      short:'العيلة سابت الفيلا بعد خلاف كبير من سنين',
      full:'نعيم أكد إن عائلة الفيلا سابتها مهجورة من سنين بعد خلاف عائلي كبير بين الورثة.',
      unlocked:false, order:2 },

    { id:'naim_knew_schedule', tag:'من استجواب نعيم', crit:false, title:'نعيم عارف بموعد عادل', img:null,
      short:'نعيم هو اللي فتح الفيلا لعادل وسابه لوحده',
      full:'نعيم أكد إنه هو اللي فتح الفيلا لعادل الصبح وسابه يشتغل لوحده، حسب الترتيب المعتاد.',
      unlocked:false, order:3 },

    { id:'youssef_b_inheritance', tag:'من استجواب يوسف', crit:true, title:'نزاع الميراث', img:null,
      short:'يوسف في نزاع قانوني على ملكية الفيلا',
      full:'يوسف اعترف بوجود نزاع قانوني معقد بينه وبين إخواته على ملكية وبيع الفيلا.',
      unlocked:false, order:4 },

    { id:'youssef_b_hidden_item', tag:'من استجواب يوسف', crit:true, title:'مستندات ميراث مخبأة', img:null,
      short:'غرفة قديمة في الفيلا فيها مستندات مهمة للميراث',
      full:'يوسف اعترف بوجود غرفة قديمة في الفيلا فيها مستندات مهمة تخص نزاع الميراث، وإنه كان خايف حد يوصلها قبله.',
      unlocked:false, order:5 },

    { id:'sabry_b_rivalry', tag:'من استجواب صبري', crit:false, title:'منافسة مهنية', img:null,
      short:'صبري وعادل بينافسوا على نفس العملاء',
      full:'صبري اعترف بوجود منافسة مهنية عادية بينه وبين عادل على عملاء الشركات الكبيرة.',
      unlocked:false, order:6 },

    { id:'hidden_room_documents', tag:'من الغرفة البعيدة', crit:true, title:'مستندات ميراث في الغرفة', img: IMG_BASE_BROKENFAUCET + 'faucet-documents.jpg',
      short:'الغرفة اللي اتقتل فيها عادل فيها فعلاً مستندات ميراث قديمة',
      full:'الغرفة اللي اتلاقت فيها جثة عادل فيها فعلاً مستندات ميراث قديمة ومهمة، وده بيربط مكان الجريمة مباشرة بنزاع يوسف مع إخواته.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  floorPlanPuzzle: {
    enabled: true,
    tabLabel: 'مخطط الفيلا',
    introText: 'تتبع مسار عادل من المطبخ (مكان الصنبور) للغرفة البعيدة اللي اتلاقى فيها مقتول، ودوّر على سبب وجوده هناك وربطه بأحد المشتبه بيهم.',
    resultText: 'المسار من المطبخ بيوصل للغرفة المقفولة اللي فيها مستندات الميراث. ده يفسر ليه عادل خرج من مكان شغله، لكنه ما يحددش وحده مين كان موجود معاه وقت الجريمة.',
    rooms: ['المطبخ', 'الممر الطويل', 'الغرفة البعيدة المقفولة', 'المدخل الرئيسي'],
    suspectPaths: {
      villa_caretaker_naim:   ['المدخل الرئيسي'],
      family_heir_youssef_b:  ['المطبخ', 'الممر الطويل', 'الغرفة البعيدة المقفولة'],
      plumber_colleague_sabry_b: ['المدخل الرئيسي'],
    },
    correctSuspectId: 'family_heir_youssef_b',
    resultEvidenceIds: ['hidden_room_documents'],
  },

  evidenceCombinations: [
    { parts:['youssef_b_hidden_item','naim_knew_schedule'], resultId:'hidden_room_documents' },
  ],

  correctSuspectId: 'family_heir_youssef_b',
  conclusiveEvidenceIds: ['youssef_b_inheritance', 'youssef_b_hidden_item', 'hidden_room_documents'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن يوسف هو الفاعل؟',
        options: [
          { id:'a', text:'وجود مستندات ميراث فعلية في الغرفة البعيدة اللي اتقتل فيها عادل + نزاعه القانوني الموثق مع إخواته على الفيلا + اعترافه بخوفه من وصول أي حد للمستندات دي' },
          { id:'b', text:'لأنه أحد الورثة وده يكفي كدافع' },
          { id:'c', text:'لأن نعيم هو اللي فتح الفيلا لعادل' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي حصل فعليًا في الغرفة البعيدة؟',
        options: [
          { id:'a', text:'عادل، وهو بيدور على مصدر تسريب المياه الحقيقي، وصل بالصدفة للغرفة المقفولة ولقى مستندات الميراث. يوسف كان موجود هناك سرًا يراجع المستندات، وخاف إن عادل يكتشف الموضوع ويسرب المعلومة لإخوته، فحاول يمنعه بعنف' },
          { id:'b', text:'عادل كان بيسرق المستندات بنفسه لصالح طرف تالت' },
          { id:'c', text:'نعيم الحارس هو اللي وجّه عادل للغرفة عمدًا' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الصنبور اللي كشف عن غرفة مخفية',
      paragraphs:[
        'يوسف كان في نزاع قانوني معقد مع إخواته على ملكية الفيلا، وكان بيروح سرًا لغرفة قديمة فيها مستندات ميراث حساسة يراجعها بعيدًا عن أعين إخواته. عادل، وهو بيدور على مصدر تسريب المياه الحقيقي بعيدًا عن المطبخ، وصل بالصدفة لنفس الغرفة ولقى يوسف هناك. خاف يوسف إن عادل يكتشف وجود المستندات ويسرب الخبر لإخوته، فحاول يمنعه بعنف غير مخطط له.',
        'وجود مستندات الميراث الفعلية في نفس الغرفة اللي اتقتل فيها عادل، ونزاعه القانوني الموثق مع إخواته على الفيلا، واعترافه بخوفه الشديد من وصول أي حد لتلك المستندات، كلها أدلة حاصرته وكشفت لغز "الصنبور المكسور" اللي أدى في الحقيقة لاكتشاف سر عائلي مخفي.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية يوسف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: مستندات الغرفة، نزاعه القانوني، وخوفه من الاكتشاف، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى عادل فضلت مرتبطة بجريمة غامضة مالهاش تفسير حقيقي، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "صنبور مكسور"

   الغلاف (cover.webp):
   "Photorealistic shot of an abandoned villa interior with dusty
   furniture covered in sheets, dim daylight through closed shutters,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (faucet-scene1.jpg):
   "Photorealistic shot of a plumber examining a leaking kitchen
   faucet in an abandoned villa, dim daylight, photorealistic, no
   text, no watermark"

   المشهد ٢ (faucet-scene2.jpg):
   "Photorealistic shot of a man walking down a dusty abandoned villa
   hallway with a flashlight, dim atmospheric lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (faucet-scene3.jpg):
   "Photorealistic dramatic shot of an abandoned villa room with
   scattered old furniture, dim lighting, forensic evidence
   photography style, no text, no watermark"

   المشهد ٤ (faucet-scene4.jpg):
   "Photorealistic shot of a worried man talking to an investigator
   outside an abandoned villa, daylight, photorealistic, no text, no
   watermark"

   نعيم (naim.jpg):
   "Photorealistic portrait of an elderly Egyptian male villa
   caretaker, simple work outfit, watchful guarded expression,
   standing near a villa gate, daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   يوسف (youssef_b.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, formal
   business outfit, nervous calculating expression, standing outside
   an old villa, daylight, candid documentary photography style, no
   text, no watermark, photorealistic"

   صبري (sabry_b.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male plumber,
   work uniform with tools, guarded expression, standing near a
   toolbox, natural lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   دليل الجثة (faucet-body.jpg):
   "Photorealistic shot of a dusty abandoned villa room with a
   forensic marker on the floor, dim lighting, evidence photography
   style, no text, no watermark, photorealistic"

   دليل المستندات (faucet-documents.jpg):
   "Photorealistic close-up of old inheritance documents in a dusty
   hidden room, dim lighting, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_BROKEN_FAUCET;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'youssef_b_route', tag:'من مخطط الفيلا', crit:true, title:'مسار يوسف للغرفة المقفولة', img:null,
    short:'مخطط الحركة بيربط يوسف مباشرة بالغرفة اللي فيها مستندات الميراث',
    full:'مراجعة مخطط الفيلا ومسارات الدخول بتوضح إن يوسف كان أكتر شخص من المشتبه بيهم عنده سبب ومسار مباشر للغرفة المقفولة اللي اتلاقت فيها المستندات والجثة.', unlocked:false, order:90 });
  c.floorPlanPuzzle.resultText = 'المخطط يثبت إن الوصول للغرفة المقفولة ممكن من مسار عادل، وإن يوسف يعرف الغرفة بسبب مستندات الميراث. الربط ده يخلق شبهة قوية لكنه محتاج دليل حضور مستقل قبل الاتهام.';
  c.floorPlanPuzzle.resultEvidenceIds = ['youssef_b_route'];
  c.conclusiveEvidenceIds = ['body_location_mismatch','youssef_b_inheritance','hidden_room_documents','youssef_b_route'];
  c.conclusiveRequired = 4;
  const y = c.suspects.find(s => s.id === 'family_heir_youssef_b');
  if (y && !y.questions.some(q => q.closesInterrogation)) y.questions.push({
    q:'المستندات اتلاقت في نفس الأوضة، ومخطط الفيلا بيربط مسارك بيها. إنت كنت هناك وقت ما عادل وصل، صح؟',
    requires:['youssef_b_inheritance','hidden_room_documents','youssef_b_route'], closesInterrogation:true,
    a:'(بيخفض صوته) "كنت رحت الفيلا قبل كده عشان الورق، وكنت عارف الأوضة دي كويس. لكن يوم عادل أنا بقول إني ماكنتش هناك. وجود طريق يوصلني للأوضة مش دليل إني قتلته."'
  });
  setTheory0('مسار الفيلا اللي ربط يوسف بالغرفة المقفولة + مستندات الميراث اللي اتلاقت في نفس مكان الجريمة + نزاعه القانوني الواضح على الفيلا');
  c.endings.good.paragraphs[1] = 'مسار الفيلا اللي ربط يوسف بالغرفة المقفولة، ومستندات الميراث الموجودة فعلًا في نفس مكان الجريمة، ونزاعه القانوني المباشر على الفيلا، كلها أدلة حاصرته وكشفت إن الصنبور المكسور كان مجرد بداية لطريق وصل عادل لسر العيلة.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: نزاع الميراث، مستندات الغرفة، ومسار يوسف للغرفة المقفولة، قبل ما تتهم.';

})();
