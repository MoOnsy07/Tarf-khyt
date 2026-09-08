/* ============================================================
   بيانات قضية: ثقة عمياء
   مشروع استثماري بيتصور إنه "مضمون" بيجمع فلوس مئات الناس،
   ولما ينهار، الجميع بيدوّر على مين "خدع" المستثمرين. لكن مين
   بيقول إنه كان أكبر ضحية، ممكن يكون هو نفسه اللي خطط للنصب.
   ============================================================ */

const IMG_BASE_BLINDTRUST = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/blind-trust/';

const CASE_BLIND_TRUST = {
  id: 'blind-trust',
  title: 'ثقة عمياء',
  caseNo: 'CASE 069',
  subtitle: 'مكتب استشارات استثمارية، الشيخ زايد، الجيزة',
  coverImg: IMG_BASE_BLINDTRUST + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 53,
  investigationPoints: 25,
  teaser: 'مشروع استثماري "مضمون العائد" جمع فلوس مئات الناس على مدى سنة، وفجأة انهار وكل الفلوس اختفت. الشك وقع على المدير المالي، لكن أحد "الضحايا" اللي بيصرخ بأعلى صوته إنه اتخدع، ممكن يكون هو نفسه العقل المدبر.',

  isPremium: false,
  categories: ['fraud', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_BLINDTRUST + 'cover.webp',
    heroCaption: 'CASE 069 — الضحية اللي كان بيمثّل',
    text1: 'مشروع "ثقة كابيتال" الاستثماري جمع فلوس مئات المستثمرين على وعد بعائد شهري ثابت "مضمون"، وبعد سنة من النجاح الظاهري، انهار المشروع فجأة واختفت كل الفلوس تقريبًا.',
    text2: 'أحد كبار المستثمرين، "سامر"، بيصرخ بأعلى صوته إنه اتخدع زي الجميع وخسر مدخراته، وطالب بتحقيق عاجل ضد المدير المالي للمشروع. طلب منك تحقق قبل ما القضية تتقفل باتهام شخص واحد بس.',
    meta: [
      { label:'المشروع', value:'ثقة كابيتال — استثمار "مضمون العائد"' },
      { label:'حجم الخسارة', value:'ملايين الجنيهات من مئات المستثمرين' },
      { label:'المتهم الأول', value:'المدير المالي للمشروع' },
      { label:'طلب التحقيق', value:'سامر، أحد كبار المستثمرين' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — النجاح الظاهري', img: IMG_BASE_BLINDTRUST + 'scene1.jpg',
      text:'مكتب أنيق مليان بمستثمرين سعداء بيستلموا عوائدهم الشهرية بانتظام، والكلمة بتنتشر عن "الفرصة اللي محدش يفوّتها".' },
    { scene:'المشهد ٢ — علامات القلق', img: IMG_BASE_BLINDTRUST + 'scene2.jpg',
      text:'بعض المستثمرين بيلاحظوا تأخير بسيط في العوائد، لكن المدير المالي بيطمنهم إنها مشكلة تقنية مؤقتة.' },
    { scene:'المشهد ٣ — الانهيار', img: IMG_BASE_BLINDTRUST + 'scene3.jpg',
      text:'المكتب بيقفل فجأة، والهواتف بتوقف عن الرد، ومجموعة المستثمرين على واتساب بتتحول لحالة هلع كاملة.' },
    { scene:'المشهد ٤ — الاتهامات', img: IMG_BASE_BLINDTRUST + 'scene4.jpg',
      text:'سامر بيقود حملة غاضبة ضد المدير المالي، مطالبًا بمحاسبته فورًا قبل ما يهرب بالباقي من الفلوس.' },
  ],

  suspects: [
    {
      id:'financial_manager_yehia', name:'يحيى', role:'المدير المالي للمشروع', img: IMG_BASE_BLINDTRUST + 'yehia.jpg', avatarEmoji:'📊',
      alibi:'قال إنه كان بيحاول ينقذ المشروع لحد اللحظة الأخيرة، وإنه خسر فلوسه الشخصية فيه كمان.',
      loseMsg:'يحيى فعلًا استثمر فلوسه الشخصية في المشروع وخسرها زي باقي المستثمرين، وسجلات البنك بتؤكد إنه ماسحبش أي مبالغ غير معتادة قبل الانهيار. مفتاح التحويلات النهائية كان تحت سيطرة شخص تاني تمامًا. اتهامه هيكون تكرار لنفس الخطأ اللي وقع فيه الجميع من البداية — تصديق أول اسم ظاهر بدل التحقيق الفعلي.',
      questions:[
        { q:'إنت المسؤول المالي، ليه الفلوس اختفت من غير أي أثر؟',
          a:'"أنا حاولت أنقذ المشروع لحد آخر لحظة، وخسرت فلوسي الشخصية فيه زي أي مستثمر تاني."' },
        { q:'مين غيرك كان عنده صلاحية على التحويلات النهائية؟', unlockId:'transfer_access_hint',
          a:'"سامر كان شريك مؤسس في المشروع فعليًا، مش مجرد مستثمر عادي، وكان عنده صلاحية جزئية على بعض الحسابات."' },
      ],
      confrontations:{}
    },
    {
      id:'samer_victim', name:'سامر', role:'مستثمر كبير وشريك مؤسس غير معلن', img: IMG_BASE_BLINDTRUST + 'samer.jpg', avatarEmoji:'😤',
      alibi:'قال إنه كان في بيته وقت انهيار المشروع، وإنه اتصدم زي باقي المستثمرين بالضبط.',
      questions:[
        { q:'ليه إنت متحمس جدًا لمحاسبة يحيى بالذات؟',
          a:'"هو المدير المالي، الطبيعي إنه أول واحد يتحاسب. أنا خسرت فلوس كتير في المشروع ده."' },
        { q:'كنت شريك مؤسس فعلي في المشروع؟', unlockId:'samer_founder_role',
          a:'"دوري كان استشاري بسيط في البداية بس، مش شراكة رسمية حقيقية زي ما بيقولوا."' },
        { q:'سجلات الشركة بتوضح إنك كنت شريك مؤسس رسمي بنسبة 30%، مش استشاري بسيط — تفسر ده إزاي؟', unlockId:'samer_ownership_contradiction', requires:['samer_founder_role'],
          a:'(بيتلعثم) "دي تفاصيل قانونية معقدة، الوضع الفعلي كان مختلف عن الورق."' },
        { q:'حساباتك البنكية الشخصية بتوضح تحويلات خارجية كبيرة قبل الانهيار بأسبوع — تفسر ده إزاي؟', unlockId:'samer_offshore_transfer', requires:['samer_ownership_contradiction'], closesInterrogation:true,
          a:'(بيصمت طويل) "كنت بحاول أأمّن جزء من فلوسي بس، مش سرقة."' },
      ],
      confrontations:{
        transfer_access_hint:'الصلاحية اللي كانت عندي كانت محدودة جدًا، مش كافية أعمل حاجة بمفردي.',
      }
    },
    {
      id:'marketer_dalia', name:'داليا', role:'مسؤولة التسويق والترويج للمشروع', img: IMG_BASE_BLINDTRUST + 'dalia.jpg', avatarEmoji:'📢',
      alibi:'قالت إنها كانت بتروّج للمشروع زي ما اتقال لها، من غير أي معرفة بتفاصيله المالية الداخلية.',
      loseMsg:null,
      questions:[
        { q:'كنتِ عارفة إن العائد "المضمون" ده غير واقعي؟',
          a:'"أنا كنت بروّج للمشروع زي ما اتقال لي من الإدارة، ماكنتش عارفة تفاصيل مالية دقيقة عن مصدر العوائد."' },
        { q:'مين كان بيحدد لكِ رسايل الترويج وأرقام العائد؟', unlockId:'dalia_instructions_source',
          a:'"سامر شخصيًا كان بيدّيني الأرقام والرسايل النهائية، مش يحيى، رغم إن يحيى هو المدير المالي المفروض."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'collapse_report', tag:'من بلاغ الانهيار', crit:false, title:'بلاغ انهيار المشروع', img:null,
      short:'بلاغ رسمي بانهيار المشروع الاستثماري واختفاء الأموال',
      full:'البلاغ الرسمي بيوثق انهيار مشروع "ثقة كابيتال" الاستثماري واختفاء معظم أموال المستثمرين بشكل مفاجئ.',
      unlocked:true, order:1 },

    { id:'transfer_access_hint', tag:'من استجواب يحيى', crit:false, title:'صلاحية سامر الجزئية', img:null,
      short:'سامر كان عنده صلاحية جزئية على بعض حسابات المشروع',
      full:'يحيى كشف إن سامر كان شريك مؤسس غير معلن في المشروع، وكان عنده صلاحية جزئية على بعض الحسابات، رغم إنه كان معروف للعامة كمستثمر عادي بس.',
      unlocked:false, order:2 },

    { id:'samer_founder_role', tag:'من استجواب سامر', crit:false, title:'إنكار دور الشراكة الحقيقي', img:null,
      short:'سامر قلل من دوره الحقيقي في تأسيس المشروع',
      full:'سامر حاول يقلل من دوره الحقيقي في المشروع، واصفًا نفسه بـ"مستشار بسيط" رغم الأدلة على دور أكبر بكتير.',
      unlocked:false, order:3 },

    { id:'dalia_instructions_source', tag:'من استجواب داليا', crit:true, title:'سامر مصدر تعليمات التسويق', img:null,
      short:'سامر هو اللي كان بيحدد رسايل الترويج، مش المدير المالي الرسمي',
      full:'داليا كشفت إن سامر شخصيًا كان بيحدد لها رسايل الترويج وأرقام العائد "المضمون"، رغم إن ده مفروض يكون من اختصاص المدير المالي الرسمي، مش شريك خارجي.',
      unlocked:false, order:4 },

    { id:'samer_ownership_contradiction', tag:'من سجلات الشركة', crit:true, title:'ملكية سامر الحقيقية 30%', img: IMG_BASE_BLINDTRUST + 'evidence-ownership.jpg',
      short:'سجلات الشركة تثبت ملكية سامر الرسمية بنسبة 30%',
      full:'سجلات تأسيس الشركة الرسمية بتوضح إن سامر كان شريك مؤسس بنسبة ملكية 30%، رغم إنكاره المتكرر لأي دور رسمي في تأسيس المشروع.',
      unlocked:false, order:5 },

    { id:'samer_offshore_transfer', tag:'من سجلات البنك', crit:true, title:'تحويلات سامر الخارجية المريبة', img: IMG_BASE_BLINDTRUST + 'evidence-bank.jpg',
      short:'سامر حوّل مبالغ كبيرة لحسابات خارجية قبل الانهيار بأسبوع',
      full:'سجلات البنك بتوضح إن سامر حوّل مبالغ مالية كبيرة لحسابات خارجية قبل انهيار المشروع بأسبوع بالظبط، وده يشاور على معرفة مسبقة بالانهيار القادم.',
      unlocked:false, order:6 },

    { id:'polygraph_result_samer', tag:'من كشف الكذب', crit:true, title:'نتيجة كشف الكذب على سامر', img: IMG_BASE_BLINDTRUST + 'evidence-polygraph.jpg',
      short:'أعلى مستوى تذبذب سجله سامر عند سؤاله عن معرفته المسبقة بالانهيار',
      full:'جهاز كشف الكذب سجل أعلى مستوى تذبذب مع سامر عند سؤاله بشكل مباشر عن معرفته المسبقة بانهيار المشروع، مقارنة بباقي المشتبه بيهم.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن وصف سامر لنفسه كـ"مستشار بسيط" بسجلات الشركة الرسمية. فيه فرق كبير بين الدور المعلن والدور الفعلي.',
    resultText: 'التناقض واضح: سامر وصف نفسه كمستشار بسيط، لكن سجلات الشركة الرسمية بتثبت ملكيته الفعلية بنسبة 30% كشريك مؤسس، وده تناقض جوهري في وصف دوره الحقيقي في المشروع.',
    resultEvidenceIds: ['samer_ownership_contradiction'],
    statements: [
      { id:'st1', text:'"دوري كان استشاري بسيط في البداية بس، مش شراكة رسمية حقيقية."', source:'سامر — في الاستجواب' },
      { id:'st2', text:'سجلات تأسيس الشركة توضح ملكية سامر الرسمية بنسبة 30%.', source:'دليل: سجلات الشركة' },
      { id:'st3', text:'"أنا حاولت أنقذ المشروع لحد آخر لحظة، وخسرت فلوسي الشخصية فيه."', source:'يحيى — في الاستجواب' },
      { id:'st4', text:'"سامر شخصيًا كان بيدّيني الأرقام والرسايل النهائية."', source:'داليا — في الاستجواب' },
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
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  polygraphPuzzle: {
    enabled: true,
    tabLabel: 'كشف الكذب',
    introText: 'اسأل كل المشتبه بيهم: "هل كنت عارف إن المشروع هينهار قبل ما ينهار فعليًا؟" وراقب مستوى التذبذب على شاشة كشف الكذب.',
    resultText: 'أعلى مستوى تذبذب كان مع سامر، وده بيأكد كذبه في إنكار معرفته المسبقة بانهيار المشروع.',
    question: 'هل كنت عارف إن المشروع هينهار قبل ما ينهار فعليًا؟',
    suspectReadings: {
      financial_manager_yehia: 18,
      samer_victim: 88,
      marketer_dalia: 25,
    },
    truthThreshold: 50,
    correctSuspectId: 'samer_victim',
    resultEvidenceIds: ['polygraph_result_samer'],
  },

  evidenceCombinations: [
    { parts:['samer_ownership_contradiction','samer_offshore_transfer'], resultId:'polygraph_result_samer' },
  ],

  investigationActions: [
    {
      id:'crosscheck_bank_timing', kind:'مراجعة بنكية', label:'قارن توقيت التحويلات الخارجية بتوقيت الانهيار',
      description:'راجع سجلات البنك وقارن توقيت تحويلات سامر الخارجية بتوقيت انهيار المشروع الرسمي.',
      requires:['samer_ownership_contradiction','transfer_access_hint'], resultEvidenceIds:['samer_offshore_transfer'],
      successText:'المراجعة أكدت إن التحويلات الخارجية حصلت قبل الانهيار بأسبوع بالظبط، قبل أي إعلان رسمي عن المشكلة.'
    },
  ],

  correctSuspectId: 'samer_victim',
  conclusiveEvidenceIds: ['samer_ownership_contradiction', 'samer_offshore_transfer', 'polygraph_result_samer', 'dalia_instructions_source'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن سامر هو العقل المدبر؟',
        options: [
          { id:'a', text:'سجلات الشركة أثبتت ملكيته الحقيقية 30% رغم إنكاره + تحويلاته الخارجية المريبة قبل الانهيار + نتيجة كشف الكذب على سؤال معرفته المسبقة' },
          { id:'b', text:'لأنه كان متحمس جدًا لمحاسبة يحيى وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بالمخطط نفسه' },
          { id:'c', text:'لأنه كان غاضب وقت الاستجواب، وده انطباع عاطفي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyfakevictim',
        label:'ليه سامر مثّل دور "الضحية" رغم إنه العقل المدبر؟',
        options: [
          { id:'a', text:'كان الهدف يحوّل الشك بعيدًا عنه ناحية المدير المالي الظاهر، بينما هو نفسه كان يخطط لتهريب الفلوس من البداية عبر صلاحيته الجزئية الخفية' },
          { id:'b', text:'عشان يحمي سمعته الاجتماعية، وده تفسير ممكن بس مش مدعوم بدليل مباشر يفرّقه عن أي مستثمر غاضب حقيقي' },
          { id:'c', text:'عشان يضغط على يحيى يرجع الفلوس، وده تفسير ضعيف لأن التحويلات الخارجية كانت قبل أي محاولة ضغط علني' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الضحية اللي كان المخرج',
      paragraphs:[
        'سامر ماكانش ضحية زي باقي المستثمرين — كان شريك مؤسس خفي بنسبة 30%، استخدم صلاحيته الجزئية عشان يوجّه رسايل التسويق المضللة، وهرّب جزء كبير من الفلوس لحسابات خارجية قبل الانهيار بأسبوع، وبعدين قاد حملة غاضبة ضد المدير المالي عشان يحوّل الشك بعيدًا عنه.',
        'اللي قفل الدائرة كان سجلات الشركة اللي فضحت ملكيته الحقيقية، وتحويلاته الخارجية المريبة، ونتيجة كشف الكذب اللي أكدت معرفته المسبقة بالانهيار القادم.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية سامر، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عنه صفة "الضحية".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: ملكية سامر الحقيقية، تحويلاته الخارجية، نتيجة كشف الكذب، ومصدر تعليمات التسويق، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والعقل المدبر الحقيقي فضل حر بالفلوس المهرّبة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "ثقة عمياء"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant modern investment office with
   empty desks and a closed sign, documentary photography style,
   no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of happy investors in a bright modern office
   receiving good news, celebratory atmosphere, photorealistic, no
   text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a businessman reassuring a concerned
   group of people in an office, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of an empty locked office with a closed sign
   on the door, photorealistic, no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of an angry crowd of people gathered outside
   an office building, photorealistic, no text, no watermark"

   الشخصيات:

   يحيى (yehia.jpg):
   "Photorealistic portrait of a stressed middle-aged Egyptian
   businessman in a suit, office background, photorealistic, no
   text, no watermark"

   سامر (samer.jpg):
   "Photorealistic portrait of a confident well-dressed Egyptian
   businessman, calculating expression, photorealistic, no text, no
   watermark"

   داليا (dalia.jpg):
   "Photorealistic portrait of a professional Egyptian
   businesswoman in marketing attire, photorealistic, no text, no
   watermark"

   أدلة:
   evidence-ownership.jpg: "Photorealistic close-up of official
   company incorporation documents on a desk, photorealistic, no
   text, no watermark"
   evidence-bank.jpg: "Photorealistic close-up of a bank transfer
   statement document, photorealistic, no text, no watermark"
   evidence-polygraph.jpg: "Photorealistic close-up of a polygraph
   machine readout screen with graph lines, photorealistic, no text,
   no watermark"
   ============================================================ */
