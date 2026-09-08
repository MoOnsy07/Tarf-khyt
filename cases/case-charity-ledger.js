/* ============================================================
   بيانات قضية: دفاتر الجمعية
   جمعية خيرية بيتكشف فيها عجز مالي كبير، والمحاسبة بتبان
   المسؤولة الأولى. لكن مين اللي كان بيهددها فعليًا لو تكلمت؟
   ============================================================ */

const IMG_BASE_CHARITYLEDGER = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/charity-ledger/';

const CASE_CHARITY_LEDGER = {
  id: 'charity-ledger',
  title: 'دفاتر الجمعية',
  caseNo: 'CASE 072',
  subtitle: 'جمعية خيرية، حي السيدة زينب، القاهرة',
  coverImg: IMG_BASE_CHARITYLEDGER + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 51,
  investigationPoints: 24,
  teaser: 'جمعية خيرية معروفة بيتكشف فيها عجز مالي كبير في تبرعات المحتاجين، والمحاسبة المسؤولة عن الدفاتر بتبان المشتبه بها الأولى. لكن ليه هي خايفة جدًا تتكلم، ومين اللي بيراقبها من بعيد كل ما تحاول تفتح فمها؟',

  isPremium: false,
  categories: ['fraud', 'corruption', 'social'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_CHARITYLEDGER + 'cover.webp',
    heroCaption: 'CASE 072 — عجز في حسابات جمعية خيرية',
    text1: 'جمعية "نور الخير" الخيرية المعروفة بمساعدة الأسر المحتاجة، اكتُشف فيها عجز مالي كبير خلال المراجعة السنوية — تبرعات كتير موثقة على الورق لكن مش وصلت فعليًا للمستفيدين. المحاسبة "سهام" هي المسؤولة عن الدفاتر، وبقت المشتبه بها الأولى.',
    text2: 'أحد المتبرعين الكبار، "كمال"، طلب تحقيق مستقل قبل ما يوقف تبرعاته للجمعية بالكامل. سهام بتبان خايفة جدًا في كل مرة بيتكلم حد عن الموضوع، وكأنها بتخاف من حد تاني غير التحقيق نفسه.',
    meta: [
      { label:'الجمعية', value:'نور الخير — جمعية خيرية' },
      { label:'حجم العجز', value:'مبلغ كبير من تبرعات موثقة لم تصل للمستفيدين' },
      { label:'المتهمة الأولى', value:'سهام، المحاسبة المسؤولة عن الدفاتر' },
      { label:'طلب التحقيق', value:'كمال، أحد كبار المتبرعين' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — العمل الخيري', img: IMG_BASE_CHARITYLEDGER + 'scene1.jpg',
      text:'مكتب الجمعية مليان بصناديق التبرعات وسجلات المستفيدين، وفريق صغير بيشتغل بحماس على توزيع المساعدات.' },
    { scene:'المشهد ٢ — المراجعة السنوية', img: IMG_BASE_CHARITYLEDGER + 'scene2.jpg',
      text:'مراجع حسابات خارجي بيقعد مع سهام يراجع دفاتر الجمعية استعدادًا للتقرير السنوي.' },
    { scene:'المشهد ٣ — اكتشاف العجز', img: IMG_BASE_CHARITYLEDGER + 'scene3.jpg',
      text:'المراجع بيلاحظ فرق كبير بين المبالغ الموثقة والمبالغ اللي فعليًا وصلت للمستفيدين، وبيبلّغ مجلس إدارة الجمعية فورًا.' },
    { scene:'المشهد ٤ — القلق', img: IMG_BASE_CHARITYLEDGER + 'scene4.jpg',
      text:'كمال بيقابل سهام يسألها عن التفاصيل، ويلاحظ إنها خايفة بشكل غير طبيعي، وبتنظر حوالين نفسها قبل ما ترد على أي سؤال.' },
  ],

  suspects: [
    {
      id:'accountant_siham', name:'سهام', role:'المحاسبة المسؤولة عن دفاتر الجمعية', img: IMG_BASE_CHARITYLEDGER + 'siham.jpg', avatarEmoji:'📒',
      alibi:'قالت إنها بتسجل كل التبرعات زي ما بتوصلها بالظبط، ومالهاش دخل في توزيعها الفعلي.',
      loseMsg:'سهام فعلًا كانت مسؤولة عن التسجيل بس، ومش عن التوزيع الفعلي للمبالغ. تدقيق الحسابات كشف الحساب الوهمي الحقيقي المسجل باسم قريب لرئيس مجلس الإدارة، مش باسمها أو باسم أي حد من عيلتها. خوفها الواضح كان نتيجة تهديد مباشر تلقته، مش دليل على تورطها في السرقة نفسها.',
      questions:[
        { q:'إنتِ المسؤولة عن الدفاتر، إزاي حصل العجز ده؟',
          a:'"أنا بس بسجل التبرعات زي ما بتوصلني، مالوش دخل في توزيعها الفعلي على المستفيدين."' },
        { q:'ليه إنتِ خايفة كده كل ما حد يسأل عن الموضوع؟', unlockId:'siham_fear_hint',
          a:'(بتنظر حواليها) "مش عايزة أتكلم أكتر من كده دلوقتي، أرجوك."' },
      ],
      confrontations:{}
    },
    {
      id:'chairman_adel', name:'عادل', role:'رئيس مجلس إدارة الجمعية', img: IMG_BASE_CHARITYLEDGER + 'adel.jpg', avatarEmoji:'🎩',
      alibi:'قال إنه بيثق في سهام تمامًا، وإن مسؤوليته الإدارية بعيدة عن التفاصيل المالية اليومية.',
      questions:[
        { q:'إنت رئيس مجلس الإدارة، إزاي محدش لاحظ العجز ده قبل كده؟',
          a:'"أنا بثق في المحاسبة تمامًا، ومسؤوليتي إدارية عامة أكتر من متابعة كل تفصيلة مالية يومية."' },
        { q:'حد من عيلتك ليه علاقة بحسابات الجمعية؟', unlockId:'adel_relative_hint',
          a:'"ابن خالي بيشتغل معانا بشكل جزئي في بعض المهام الإدارية، بس ده حاجة عادية جدًا."' },
        { q:'كنت عارف إن سهام خايفة تتكلم عن العجز؟', requires:['adel_relative_hint'],
          a:'"لاحظت إنها متوترة، بس فكرت إنها خايفة من المسؤولية بس، مش من حاجة تانية."' },
      ],
      confrontations:{}
    },
    {
      id:'auditor_hisham', name:'هشام', role:'مراجع الحسابات الخارجي', img: IMG_BASE_CHARITYLEDGER + 'hisham.jpg', avatarEmoji:'🧾',
      alibi:'قال إنه اكتشف العجز أثناء المراجعة السنوية الروتينية، من غير أي معرفة مسبقة بتفاصيله.',
      loseMsg:null,
      questions:[
        { q:'إزاي اكتشفت العجز بالظبط؟', unlockId:'hisham_discovery_method',
          a:'"لاحظت نمط تكرار غريب في بعض الحسابات، مبالغ صغيرة بتتكرر شهريًا بأسماء مش واضحة في سجل المستفيدين."' },
        { q:'كنت اتضغط عليك من حد إنك تسكت عن الموضوع؟',
          a:'"لأ خالص، أنا بلغت مجلس الإدارة فورًا زي ما المفروض قانونيًا."' },
      ],
      confrontations:{}
    },
    {
      id:'donor_kamal', name:'كمال', role:'أحد كبار المتبرعين، طلب التحقيق', img: IMG_BASE_CHARITYLEDGER + 'kamal.jpg', avatarEmoji:'🤝',
      alibi:'مش موظف في الجمعية، بس بيزورها بانتظام كمتبرع نشط.',
      questions:[
        { q:'إيه اللي خلاك تشك في الموضوع أكتر من مجرد عجز مالي عادي؟', unlockId:'kamal_fear_observation',
          a:'"لاحظت إن سهام بتخاف بشكل مش طبيعي، وبتنظر حواليها قبل ما ترد على أي سؤال بسيط، وكأنها خايفة من حد بيراقبها."' },
        { q:'لاحظت أي تفاعل غريب بين سهام وعادل؟', requires:['kamal_fear_observation'], unlockId:'kamal_adel_interaction',
          a:'"مرة شفت عادل بيقولها حاجة بصوت واطي قدام مكتبها، وهي اتغير وشها فورًا وسكتت تمامًا."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'audit_discrepancy_report', tag:'من تقرير المراجعة', crit:false, title:'تقرير العجز المالي', img:null,
      short:'تقرير المراجعة السنوية يوثق عجز مالي كبير في حسابات الجمعية',
      full:'تقرير المراجعة السنوية بيوثق عجز مالي كبير بين التبرعات الموثقة والمبالغ اللي فعليًا وصلت للمستفيدين.',
      unlocked:true, order:1 },

    { id:'siham_fear_hint', tag:'من استجواب سهام', crit:false, title:'خوف سهام الواضح', img:null,
      short:'سهام رفضت تتكلم بشكل واضح وبانت خايفة جدًا',
      full:'سهام أظهرت خوفًا واضحًا وغير طبيعي كل ما اتسألت عن تفاصيل العجز، ورفضت تتكلم أكتر من الحد الأدنى.',
      unlocked:false, order:2 },

    { id:'adel_relative_hint', tag:'من استجواب عادل', crit:false, title:'قريب عادل في الجمعية', img:null,
      short:'ابن خال عادل بيشتغل بشكل جزئي في مهام إدارية بالجمعية',
      full:'عادل كشف إن قريبه (ابن خاله) بيشتغل بشكل جزئي في بعض المهام الإدارية بالجمعية، وده يفتح احتمال وجود حساب مرتبط بالعائلة.',
      unlocked:false, order:3 },

    { id:'hisham_discovery_method', tag:'من استجواب هشام', crit:false, title:'طريقة اكتشاف العجز', img:null,
      short:'هشام لاحظ نمط تكرار غريب لمبالغ صغيرة بأسماء غير واضحة',
      full:'هشام أكد إنه لاحظ نمط تكرار غريب لمبالغ صغيرة شهرية بأسماء مش واضحة في سجل المستفيدين، وده اللي قاده لاكتشاف العجز.',
      unlocked:false, order:4 },

    { id:'kamal_fear_observation', tag:'من استجواب كمال', crit:false, title:'ملاحظة كمال على خوف سهام', img:null,
      short:'كمال لاحظ إن سهام بتنظر حواليها قبل الرد وكأنها مراقَبة',
      full:'كمال أكد ملاحظته إن سهام بتنظر حواليها بشكل متكرر قبل ما ترد على أي سؤال، سلوك يوحي بخوفها من مراقبة مباشرة، مش من التحقيق نفسه بس.',
      unlocked:false, order:5 },

    { id:'kamal_adel_interaction', tag:'من استجواب كمال', crit:true, title:'تفاعل مريب بين سهام وعادل', img:null,
      short:'كمال شاف عادل بيهمس لسهام وهي اتغير وشها فورًا',
      full:'كمال شهد إنه شاف عادل بيقول حاجة بصوت واطي لسهام قدام مكتبها، وإنها اتغير وشها فورًا وسكتت تمامًا بعدها، وده يشاور على تهديد مباشر.',
      unlocked:false, order:6 },

    { id:'fake_account_found', tag:'من تدقيق الحسابات', crit:true, title:'الحساب الوهمي الحقيقي', img: IMG_BASE_CHARITYLEDGER + 'evidence-ledger.jpg',
      short:'الحساب الوهمي مسجل باسم قريب عادل، مش سهام',
      full:'تدقيق الحسابات كشف الحساب الوهمي اللي بيتكرر شهريًا بمبالغ صغيرة، ومسجل باسم قريب عادل (ابن خاله) اللي بيشتغل جزئيًا في الجمعية، مش باسم سهام أو أي حد من عيلتها.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تأكيد عادل إنه "لاحظ توتر سهام بس فكر إنه خوف من المسؤولية"، بملاحظة كمال المباشرة لتهديد لفظي واضح منه لها. فيه تناقض في وصف نفس الموقف.',
    resultText: 'التناقض واضح: عادل قلل من ملاحظته لتوتر سهام ووصفه كـ"خوف من المسؤولية"، بينما كمال شهد بوضوح إنه شاف عادل نفسه بيهمس لها تهديدًا مباشرًا أدى لتغيّر فوري في تعبيرها.',
    resultEvidenceIds: ['kamal_adel_interaction'],
    statements: [
      { id:'st1', text:'"لاحظت إنها متوترة، بس فكرت إنها خايفة من المسؤولية بس."', source:'عادل — في الاستجواب' },
      { id:'st2', text:'"شفت عادل بيقولها حاجة بصوت واطي قدام مكتبها، وهي اتغير وشها فورًا."', source:'كمال — في الاستجواب' },
      { id:'st3', text:'"أنا بس بسجل التبرعات زي ما بتوصلني."', source:'سهام — في الاستجواب' },
      { id:'st4', text:'"لاحظت نمط تكرار غريب في بعض الحسابات."', source:'هشام — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },

  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق الحسابات',
    introText: 'راجع كشف تبرعات الجمعية وحدد الحساب الوهمي اللي بيتكرر بنمط مريب كل شهر ومسجل باسم قريب لأحد المشتبه بيهم.',
    resultText: 'لقيت الحساب الوهمي! الحساب رقم 7734 مسجل باسم قريب عادل، وده بيربطه مباشرة بالتلاعب في الكشوف.',
    ledgerRows: [
      { account:'1102', name:'أسرة محمد فتحي', amount:'800', suspicious:false },
      { account:'7734', name:'ياسر عادل حلمي', amount:'2,400', suspicious:true },
      { account:'5567', name:'أسرة سمير توفيق', amount:'1,100', suspicious:false },
      { account:'3321', name:'مؤسسة الرحمة', amount:'6,000', suspicious:false },
    ],
    correctAccountId: '7734',
    linkedSuspectId: 'chairman_adel',
    resultEvidenceIds: ['fake_account_found'],
  },

  evidenceCombinations: [
    { parts:['adel_relative_hint','fake_account_found'], resultId:'fake_account_found' },
  ],

  investigationActions: [
    {
      id:'check_family_records', kind:'مراجعة سجلات العائلة', label:'تحقق من صلة قرابة اسم الحساب الوهمي بعادل',
      description:'راجع سجلات العائلة وتأكد إن الاسم المسجل في الحساب الوهمي فعلًا قريب لعادل.',
      requires:['fake_account_found','adel_relative_hint'], resultEvidenceIds:['fake_account_found'],
      successText:'السجلات أكدت إن الاسم المسجل في الحساب الوهمي هو نفسه ابن خال عادل المذكور.'
    },
  ],

  correctSuspectId: 'chairman_adel',
  conclusiveEvidenceIds: ['fake_account_found', 'kamal_adel_interaction', 'adel_relative_hint'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن عادل هو المسؤول عن العجز؟',
        options: [
          { id:'a', text:'تدقيق الحسابات كشف الحساب الوهمي باسم قريبه + شهادة كمال على تهديده المباشر لسهام + تناقضه في وصف حادثة التهديد' },
          { id:'b', text:'لأنه رئيس مجلس الإدارة وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بالحساب الوهمي نفسه' },
          { id:'c', text:'لأنه كان هادئ جدًا وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotsiham',
        label:'ليه سهام كانت بريئة رغم إنها المسؤولة المباشرة عن الدفاتر؟',
        options: [
          { id:'a', text:'تدقيق الحسابات أثبت إن الحساب الوهمي مسجل باسم قريب عادل مش باسمها، وخوفها الواضح كان نتيجة تهديد مباشر تلقته منه، مش دليل على تورطها' },
          { id:'b', text:'لأنها كانت خايفة وقت الاستجواب، وده افتراض عكسي خاطئ — الخوف ممكن يكون نتيجة تهديد بدل ما يكون دليل على الذنب' },
          { id:'c', text:'لأنها اعترفت بمسؤوليتها عن التسجيل بصراحة، وده سلوك تعاوني بس مش إثبات مباشر على براءتها الكاملة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الصمت اللي كان خوف مش ذنب',
      paragraphs:[
        'عادل استخدم منصبه كرئيس مجلس إدارة عشان يحوّل جزء من تبرعات الجمعية لحساب وهمي مسجل باسم قريبه، وهدد سهام مباشرة عشان تسكت وتغطي على العجز في الدفاتر. خوفها الواضح ماكانش شعور بالذنب — كان خوف حقيقي من انتقامه.',
        'اللي قفل الدائرة كان تدقيق الحسابات اللي كشف الحساب الوهمي باسم قريبه، وشهادة كمال المباشرة على تهديده لسهام، وتناقضه في وصف حادثة التهديد نفسها.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية عادل، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عن سهام صفة المشتبه بها الأولى.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: الحساب الوهمي، شهادة كمال، وقريب عادل في الجمعية، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل يدير الجمعية وكأن حاجة ماحصلتش. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "دفاتر الجمعية"

   الغلاف (cover.webp):
   "Photorealistic shot of a modest charity office with donation
   boxes and paperwork stacks, documentary photography style, no
   text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of volunteers working cheerfully in a
   charity office with donation boxes, photorealistic, no text, no
   watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of an accountant and an auditor reviewing
   financial ledgers at a desk, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a concerned auditor pointing at
   discrepancies in a financial document, photorealistic, no text,
   no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a nervous woman glancing over her
   shoulder while talking to a man in an office hallway,
   photorealistic, no text, no watermark"

   الشخصيات:

   سهام (siham.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman
   accountant, anxious expression, office background, photorealistic,
   no text, no watermark"

   عادل (adel.jpg):
   "Photorealistic portrait of a distinguished older Egyptian man in
   formal attire, composed authoritative expression, photorealistic,
   no text, no watermark"

   هشام (hisham.jpg):
   "Photorealistic portrait of a professional Egyptian male auditor,
   glasses, holding documents, photorealistic, no text, no watermark"

   كمال (kamal.jpg):
   "Photorealistic portrait of a kind middle-aged Egyptian
   businessman, thoughtful expression, photorealistic, no text, no
   watermark"

   أدلة:
   evidence-ledger.jpg: "Photorealistic close-up of a financial
   ledger book page with highlighted suspicious entries,
   photorealistic, no text, no watermark"
   ============================================================ */
