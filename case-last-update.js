/* ============================================================
   بيانات قضية: آخر تحديث
   قضية قتل/فساد — مبرمج ستارت أب بيموت بعد ما يكتشف ثغرة
   أمنية خطيرة كان ناوي يفضحها للمستثمرين.
   ============================================================ */

const IMG_BASE_LASTUPDATE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-update/';

const CASE_LAST_UPDATE = {
  id: 'last-update',
  title: 'آخر تحديث',
  caseNo: 'CASE 044',
  subtitle: 'مكاتب ستارت أب تكنولوجي، القاهرة الجديدة',
  coverImg: IMG_BASE_LASTUPDATE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 20,
  teaser: 'مبرمج شاب بيكتشف ثغرة أمنية خطيرة في تطبيق الشركة بتسرّب بيانات المستخدمين، وبعد ما يهدد يفضحها للمستثمرين، بيتلاقى مقتول في مكتبه.',

  isPremium: false,
  categories: ['murder', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTUPDATE + 'cover.webp',
    heroCaption: 'CASE 044 — بعد اجتماع المستثمرين بيوم',
    text1: 'المبرمج "يوسف" كان مسؤول عن أمان تطبيق الستارت أب الناشئ "لينكيت". اكتشف ثغرة أمنية خطيرة بتسرّب بيانات حساسة لآلاف المستخدمين، وهدد إنه هيفضح الموضوع للمستثمرين في الاجتماع الجاي لو محدش تعامل معاها فورًا.',
    text2: 'بعد يوم واحد بس، يوسف اتلاقى مقتول في مكتبه بعد ساعات العمل. المؤسس المشارك للشركة طلب منك تحقق بسرعة قبل ما القضية تدمر سمعة الشركة قبل جولة تمويل حاسمة.',
    meta: [
      { label:'المجني عليه', value:'يوسف — مبرمج مسؤول عن الأمان' },
      { label:'الاكتشاف', value:'ثغرة أمنية خطيرة تسرّب بيانات المستخدمين' },
      { label:'مكان الحادثة', value:'مكتب يوسف بعد ساعات العمل' },
      { label:'طلب التحقيق', value:'المؤسس المشارك للشركة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاكتشاف',
      img: IMG_BASE_LASTUPDATE + 'update-scene1.jpg',
      text:'يوسف بيراجع كود التطبيق في مكتبه المضاء بضوء الشاشات، ويلاحظ فجأة ثغرة خطيرة في نظام الحماية.'
    },
    {
      scene:'المشهد ٢ — التهديد',
      img: IMG_BASE_LASTUPDATE + 'update-scene2.jpg',
      text:'يوسف بيقابل المؤسسين في اجتماع طارئ ويهددهم إنه هيفضح الثغرة للمستثمرين لو محدش عالجها فورًا.'
    },
    {
      scene:'المشهد ٣ — الليلة الأخيرة',
      img: IMG_BASE_LASTUPDATE + 'update-scene3.jpg',
      text:'يوسف بيفضل شغال لوحده في المكتب بعد ما الجميع مشى، ضوء شاشته الوحيد المضاء في الظلام.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_LASTUPDATE + 'update-scene4.jpg',
      text:'المؤسس المشارك بيديك صلاحية تراجع سجلات دخول المكتب وقائمة فريق العمل القريب من يوسف.'
    },
  ],

  suspects: [
    {
      id:'cofounder_tamer_u', name:'تامر', role:'المؤسس المشارك للشركة، طلب التحقيق', img: IMG_BASE_LASTUPDATE + 'tamer_u.jpg', avatarEmoji:'💻',
      accusable:true,
      alibi:'قال إنه كان في بيته وقت مقتل يوسف.',
      questions:[
        { q:'تهديد يوسف كان هيأثر عليكم إزاي؟',
          a:'"كان هيدمر جولة التمويل الجاية بالكامل، المستثمرين هيبعدوا فورًا لو عرفوا بثغرة زي دي."' },
        { q:'حاولت تقنع يوسف يأجل الإفصاح؟', requires:['security_bug_report'], unlockId:'tamer_u_pressure',
          a:'(بيتردد) "عرضت عليه مكافأة كبيرة يسكت عنها مؤقتًا لحد ما نصلحها، ده أمر عادي في الشركات الناشئة."' },
      ]
    },
    {
      id:'lead_investor_dina_u', name:'دينا', role:'مستثمرة رئيسية في الشركة', img: IMG_BASE_LASTUPDATE + 'dina_u.jpg', avatarEmoji:'💰',
      alibi:'قالت إنها كانت في مدينة تانية وقت الحادثة.',
      questions:[
        { q:'كنتِ عارفة بموضوع الثغرة قبل الحادثة؟', unlockId:'dina_u_awareness',
          a:'"سمعت إشاعة بسيطة، بس محدش أكدلي التفاصيل الكاملة."' },
        { q:'استثمارك في الشركة كان مهدد لو الثغرة انكشفت؟', requires:['dina_u_awareness'],
          a:'"طبعًا، استثمار ضخم كان معلق على نجاح الجولة الجاية."' },
      ]
    },
    {
      id:'junior_dev_karim_u', name:'كريم', role:'مبرمج مبتدئ، كان بيتنافس مع يوسف على ترقية', img: IMG_BASE_LASTUPDATE + 'karim_u.jpg', avatarEmoji:'⌨️',
      alibi:'قال إنه كان في بيته يشتغل على مشروع شخصي.',
      questions:[
        { q:'علاقتك بيوسف في الشغل كانت إيه؟', unlockId:'karim_u_rivalry',
          a:'"كنا الاتنين مرشحين لترقية كبيرة، ده خلق شوية توتر بينا بصراحة."' },
        { q:'كنت عارف بموضوع الثغرة اللي اكتشفها يوسف؟', requires:['karim_u_rivalry'], unlockId:'karim_u_knew_bug',
          a:'(بيتردد) "شفت جزء من الكود بتاعه بالصدفة، وكانت فرصتي أثبت إني أحسن منه في حل المشكلة."' },
      ]
    },
    {
      id:'office_manager_salma_u', name:'سلمى', role:'مديرة المكتب، آخر واحدة شافت يوسف', img: IMG_BASE_LASTUPDATE + 'salma_u.jpg', avatarEmoji:'🔑',
      alibi:'قالت إنها قفلت المكتب في وقتها المعتاد وسابت يوسف شغال لوحده.',
      questions:[
        { q:'إيه آخر حاجة قالها يوسف قبل ما تمشي؟', unlockId:'salma_u_last_words',
          a:'"قالي إنه هيبعت تقرير كامل للمستثمرين بنفسه بكرة الصبح لو محدش اتصرف الليلة دي."' },
        { q:'سجل الدخول بيوضح إن تامر رجع المكتب بعد ما مشيتِ — عايز تفسري؟', requires:['salma_u_last_words','tamer_u_pressure','karim_u_knew_bug'], closesInterrogation:true,
          a:'(بتتردد) "شفت كارت دخول تامر اتسجل تاني بعد ما مشيت، مكنتش عايزة أوقع حد في مشكلة، بس الحقيقة أهم."' },
      ]
    },
  ],

  evidence: [
    { id:'security_bug_report', tag:'من كود التطبيق', crit:true, title:'تقرير الثغرة الأمنية', img: IMG_BASE_LASTUPDATE + 'update-code.jpg',
      short:'ثغرة خطيرة موثقة بيد يوسف قبل مقتله بيوم',
      full:'يوسف كان وثّق الثغرة الأمنية بالتفصيل في مستند داخلي، ومهددًا فيه بالإفصاح الرسمي لو محدش تعامل معاها.',
      unlocked:true, order:1 },

    { id:'tamer_u_pressure', tag:'من استجواب تامر', crit:true, title:'محاولة إسكات يوسف', img:null,
      short:'تامر عرض مكافأة على يوسف عشان يسكت مؤقتًا',
      full:'تامر اعترف إنه عرض على يوسف مكافأة مالية كبيرة عشان يسكت عن الثغرة مؤقتًا لحد ما تتصلح، بس يوسف رفض.',
      unlocked:false, order:2 },

    { id:'dina_u_awareness', tag:'من استجواب دينا', crit:false, title:'معرفة دينا بالثغرة', img:null,
      short:'دينا سمعت إشاعة بسيطة عن الثغرة',
      full:'دينا اعترفت إنها سمعت إشاعة بسيطة عن وجود ثغرة، بس محدش أكدلها التفاصيل الكاملة.',
      unlocked:false, order:3 },

    { id:'karim_u_rivalry', tag:'من استجواب كريم', crit:false, title:'منافسة على ترقية', img:null,
      short:'كريم ويوسف مرشحين لنفس الترقية',
      full:'كريم اعترف بوجود منافسة على ترقية كبيرة بينه وبين يوسف، وده خلق توتر بينهم.',
      unlocked:false, order:4 },

    { id:'karim_u_knew_bug', tag:'من استجواب كريم', crit:false, title:'كريم كان عارف بالثغرة', img:null,
      short:'كريم شاف كود يوسف بالصدفة',
      full:'كريم اعترف إنه شاف جزء من كود يوسف بالصدفة، وكان بيحاول يستغل الموقف لإثبات كفاءته.',
      unlocked:false, order:5 },

    { id:'salma_u_last_words', tag:'من استجواب سلمى', crit:true, title:'كلام يوسف الأخير', img:null,
      short:'يوسف كان ناوي يبعت تقرير للمستثمرين بنفسه',
      full:'سلمى أكدت إن يوسف قالها إنه هيبعت تقرير كامل للمستثمرين بنفسه في الصبح لو محدش اتصرف الليلة دي، وده كان تهديد مباشر لمصالح الشركة.',
      unlocked:false, order:6 },

    { id:'access_log_tamer', tag:'من سجل دخول المكتب', crit:true, title:'دخول تامر بعد إغلاق المكتب', img: IMG_BASE_LASTUPDATE + 'update-log.jpg',
      short:'سجل الدخول بيوضح رجوع تامر للمكتب بعد ما سلمى قفلت',
      full:'سجل دخول المكتب بيوضح إن كارت تامر اتسجل مرة تانية بعد ما سلمى قفلت وخرجت، رغم إنه ادّعى إنه كان في بيته طول الوقت.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },

  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق سجل الدخول',
    introText: 'راجع سجل دخول بطاقات الموظفين للمكتب في الليلة اللي مات فيها يوسف، ودوّر على أي دخول مريب بعد ساعات العمل الرسمية.',
    resultText: 'لقيت الدخول المريب! بطاقة تامر اتسجلت مرة تانية الساعة 11:15 مساءً، بعد ما المكتب كان مفروض مقفول تمامًا.',
    ledgerRows: [
      { account:'بطاقة سلمى', name:'خروج نهائي', amount:'9:00 م', suspicious:false },
      { account:'بطاقة تامر', name:'دخول ثانٍ', amount:'11:15 م', suspicious:true },
      { account:'بطاقة كريم', name:'لا يوجد دخول', amount:'—', suspicious:false },
      { account:'بطاقة دينا', name:'لا يوجد دخول', amount:'—', suspicious:false },
    ],
    correctAccountId: 'بطاقة تامر',
    linkedSuspectId: 'cofounder_tamer_u',
    resultEvidenceIds: ['access_log_tamer'],
  },

  evidenceCombinations: [
    { parts:['tamer_u_pressure','salma_u_last_words'], resultId:'access_log_tamer' },
  ],

  correctSuspectId: 'cofounder_tamer_u',
  conclusiveEvidenceIds: ['tamer_u_pressure', 'access_log_tamer', 'salma_u_last_words'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن تامر هو الفاعل؟',
        options: [
          { id:'a', text:'سجل الدخول اللي أثبت رجوعه للمكتب بعد إغلاقه + محاولته إسكات يوسف بمكافأة مالية رفضها + كلام يوسف الأخير اللي أكد نيته الإفصاح صباحًا' },
          { id:'b', text:'لأنه مؤسس الشركة وده يكفي كدافع' },
          { id:'c', text:'لأن كريم كان بينافسه على ترقية' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية تامر الحقيقية؟',
        options: [
          { id:'a', text:'رجع المكتب بنية إقناع يوسف أخيرة يسكت عن الثغرة، لكن رفضه القاطع وإصراره على الإفصاح صباحًا خلى الموقف يتصعّد لعنف قاتل غير مخطط له' },
          { id:'b', text:'كان مخطط للقتل من البداية عشان يحمي جولة التمويل' },
          { id:'c', text:'كان بيحاول يصلح الثغرة بنفسه بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'كود واحد كشف الجريمة',
      paragraphs:[
        'تامر كان خايف إن ثغرة يوسف الأمنية تدمر جولة تمويل حاسمة للشركة. حاول يقنعه يسكت مقابل مكافأة مالية كبيرة، لكن يوسف رفض بشدة وأصرّ إنه هيبعت تقرير كامل للمستثمرين بنفسه صباح اليوم التالي. رجع تامر المكتب بعد إغلاقه في محاولة أخيرة لإقناعه، لكن الموقف اتصعّد لعنف قاتل.',
        'سجل دخول المكتب اللي أثبت رجوعه بعد الإغلاق الرسمي، ومحاولته الموثقة لإسكات يوسف بمكافأة مالية، وكلام يوسف الأخير اللي أكدته سلمى عن نيته الإفصاح صباحًا، كلها أدلة حاصرته وأثبتت مسؤوليته الكاملة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية تامر، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: سجل الدخول، محاولة الإسكات، وكلام يوسف الأخير، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى يوسف فضلت مرتبطة بتهمة مالهاش أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "آخر تحديث"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty modern tech office at night, a
   single computer screen glowing with code, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (update-scene1.jpg):
   "Photorealistic shot of a young programmer looking worried at
   multiple code screens in an office, dim screen glow lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (update-scene2.jpg):
   "Photorealistic shot of a tense meeting in a modern startup
   office conference room, warm office lighting, photorealistic, no
   text, no watermark"

   المشهد ٣ (update-scene3.jpg):
   "Photorealistic shot of a lone programmer working late at night
   in an empty office, single desk lamp and screen glow,
   photorealistic, no text, no watermark"

   المشهد ٤ (update-scene4.jpg):
   "Photorealistic shot of a startup cofounder handing documents to
   an investigator in a modern office, formal office lighting,
   photorealistic, no text, no watermark"

   تامر (tamer_u.jpg):
   "Photorealistic portrait of a young Egyptian male startup
   cofounder, smart casual tech outfit, calculating nervous
   expression, standing in a modern office, warm office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دينا (dina_u.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female
   investor, sharp formal outfit, composed guarded expression,
   standing in a modern office lobby, formal lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   كريم (karim_u.jpg):
   "Photorealistic portrait of a young Egyptian male junior
   programmer, casual tech outfit, nervous competitive expression,
   sitting at a desk with a laptop, dim screen glow lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   سلمى (salma_u.jpg):
   "Photorealistic portrait of a young Egyptian female office
   manager, smart casual outfit, worried composed expression,
   standing near an office door, warm indoor lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل الكود (update-code.jpg):
   "Photorealistic close-up of a computer screen showing code with a
   highlighted security vulnerability comment, dim screen glow, no
   text, no watermark, photorealistic"

   دليل سجل الدخول (update-log.jpg):
   "Photorealistic close-up of an office access card log printout
   with a highlighted late entry, clinical office lighting, no
   text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_LAST_UPDATE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const salma=c.suspects.find(s=>s.id==='office_manager_salma_u'); if(salma){const q=salma.questions.find(q=>q.closesInterrogation); if(q) q.unlockId='access_log_tamer';}
  const t=c.suspects.find(s=>s.id==='cofounder_tamer_u');
  if(t && !t.questions.some(q=>q.closesInterrogation)) t.questions.push({
    q:'سجل الدخول أثبت إنك رجعت المكتب بعد الإغلاق، وإنت حاولت تشتري سكوت يوسف وهو قال إنه هيبلغ المستثمرين الصبح. رجعت ليه؟',
    requires:['access_log_tamer','tamer_u_pressure','salma_u_last_words'], closesInterrogation:true,
    a:'(بيسكت) "رجعت أحاول أقنعه للمرة الأخيرة. لما أصر إنه هيبعت التقرير الصبح، خفت الجولة التمويلية تضيع وكل حاجة بنيناها تقع... والمواجهة خرجت عن السيطرة."'
  });

})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LAST_UPDATE;
  c.evidenceCombinations = [];
  const s = c.suspects.find(x => x.id === 'office_manager_salma_u');
  if (s) {
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) q.unlockId = 'access_log_tamer';
  }
  const t = c.suspects.find(x => x.id === 'cofounder_tamer_u');
  if (t) {
    const q = t.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "رجعت المكتب فعلًا عشان أحاول أقنعه يأجل التقرير. اتناقشنا، وبعدها مشيت. سجل الدخول يثبت رجوعي، مش إنه يثبت إني قتلته."';
    }
  }
  c.conclusiveEvidenceIds = ['tamer_u_pressure','access_log_tamer','salma_u_last_words'];
  c.conclusiveRequired = 3;
})();
