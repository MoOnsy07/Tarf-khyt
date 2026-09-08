/* ============================================================
   بيانات قضية: الطابق المحظور
   اقتحام غريب لطابق مكاتب مقفول في شركة كبيرة، والجميع مقتنع
   إنها جاسوسية بين شركات منافسة. لكن اللي كان بيدور عليه
   المقتحم مالوش أي علاقة بأسرار العمل خالص.
   ============================================================ */

const IMG_BASE_FORBIDDENFLOOR = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/forbidden-floor/';

const CASE_FORBIDDEN_FLOOR = {
  id: 'forbidden-floor',
  title: 'الطابق المحظور',
  caseNo: 'CASE 077',
  subtitle: 'مبنى إداري لشركة كبرى، القاهرة الجديدة',
  coverImg: IMG_BASE_FORBIDDENFLOOR + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 53,
  investigationPoints: 25,
  teaser: 'اقتحام غريب بالليل لطابق مكاتب مقفول في شركة كبرى، تحديدًا مكتب رئيس قسم الموارد البشرية. الإدارة مقتنعة إنها جاسوسية صناعية من منافس، لكن اللي كان المقتحم بيدور عليه مالوش أي علاقة بأسرار العمل خالص.',

  isPremium: false,
  categories: ['corporate', 'scandal'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FORBIDDENFLOOR + 'cover.webp',
    heroCaption: 'CASE 077 — اقتحام مالوش علاقة بالشغل',
    text1: 'طابق المكاتب التنفيذية في شركة "أوركيد القابضة" شهد اقتحام غريب بالليل، تحديدًا مكتب "هيثم"، رئيس قسم الموارد البشرية. الأمن أكد عدم اختفاء أي ملفات مالية أو تقنية حساسة، مما دفع الإدارة للاعتقاد إنها محاولة تجسس فاشلة من شركة منافسة.',
    text2: 'مسؤولة الشؤون القانونية "ندى" طلبت تحقيق مستقل، لأنها لاحظت إن الاقتحام كان مركّز بشكل غريب على أرشيف قديم من الشكاوى الداخلية، مش على أي ملفات مالية أو استراتيجية حديثة.',
    meta: [
      { label:'مكان الاقتحام', value:'مكتب رئيس قسم الموارد البشرية' },
      { label:'الملفات المستهدفة', value:'أرشيف قديم من الشكاوى الداخلية' },
      { label:'الشك الأولي', value:'تجسس صناعي من شركة منافسة' },
      { label:'طلب التحقيق', value:'ندى، مسؤولة الشؤون القانونية' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — يوم عمل عادي', img: IMG_BASE_FORBIDDENFLOOR + 'scene1.jpg',
      text:'الطابق التنفيذي مليان بالموظفين خلال ساعات العمل، وهيثم بيدير مكتبه زي أي يوم عادي.' },
    { scene:'المشهد ٢ — بعد انتهاء الدوام', img: IMG_BASE_FORBIDDENFLOOR + 'scene2.jpg',
      text:'المبنى بيفضى تمامًا بعد انتهاء الدوام، وحارس الأمن بيعمل جولاته المعتادة حوالين المكاتب المقفولة.' },
    { scene:'المشهد ٣ — الاقتحام', img: IMG_BASE_FORBIDDENFLOOR + 'scene3.jpg',
      text:'مكتب هيثم بيتفتح بطريقة غير معتادة، وخزانة الملفات القديمة بتبان إنها اتفتشت بعناية.' },
    { scene:'المشهد ٤ — الاكتشاف', img: IMG_BASE_FORBIDDENFLOOR + 'scene4.jpg',
      text:'ندى بتراجع المكتب المقتحم، وبتلاحظ إن الملفات المفقودة كلها من أرشيف الشكاوى القديمة بس.' },
  ],

  suspects: [
    {
      id:'hr_head_haitham', name:'هيثم', role:'رئيس قسم الموارد البشرية، صاحب المكتب المقتحم', img: IMG_BASE_FORBIDDENFLOOR + 'haitham.jpg', avatarEmoji:'🗂️',
      alibi:'قال إنه كان في بيته وقت الاقتحام، ومتضرر هو نفسه من اختفاء ملفاته.',
      questions:[
        { q:'الملفات اللي اختفت كانت إيه بالتحديد؟', unlockId:'files_content_hint',
          a:'"أرشيف قديم لشكاوى داخلية من موظفين، حاجات قديمة من كذا سنة، مش ملفات حساسة تقنيًا أو ماليًا."' },
        { q:'كان فيه شكوى معينة تخصك شخصيًا في الأرشيف ده؟', unlockId:'haitham_complaint_hint',
          a:'"كان فيه شكوى قديمة ضدي من موظفة سابقة، بس اتقفلت إداريًا من زمان وماكانش ليها متابعة."' },
      ],
      confrontations:{}
    },
    {
      id:'competitor_suspect_karim', name:'كريم', role:'موظف سابق انتقل لشركة منافسة، متهم بالتجسس', img: IMG_BASE_FORBIDDENFLOOR + 'karim-suspect.jpg', avatarEmoji:'🕵️',
      alibi:'قال إنه كان في مقر شركته الجديدة وقت الاقتحام، بعيد تمامًا عن مبنى أوركيد.',
      loseMsg:'كريم فعلًا كان في مقر شركته الجديدة وقت الاقتحام، وسجل دخوله موثق بكاميرات مستقلة هناك. مفيش أي دليل رقمي أو مادي يربطه بالوصول لمبنى أوركيد أو بمعرفة محتوى أرشيف الشكاوى القديم تحديدًا. اتهامه كان مبني على افتراض تجسس تجاري عام، مش على أي دليل فعلي.',
      questions:[
        { q:'انتقلت لشركة منافسة مؤخرًا، صح؟',
          a:'"أيوه، فرصة عمل أفضل، ده حقي القانوني، ومالوش أي علاقة بأي اقتحام أو تجسس."' },
        { q:'كان عندك أي معرفة بمحتوى أرشيف الشكاوى القديم؟', unlockId:'karim_no_knowledge',
          a:'"خالص، ده أرشيف داخلي لقسم الموارد البشرية، ماكنتش أعرف تفاصيله حتى وأنا شغال في الشركة."' },
      ],
      confrontations:{}
    },
    {
      id:'legal_officer_nada', name:'ندى', role:'مسؤولة الشؤون القانونية، طلبت التحقيق', img: IMG_BASE_FORBIDDENFLOOR + 'nada.jpg', avatarEmoji:'⚖️',
      alibi:'كانت في بيتها وقت الاقتحام، بعيد عن مبنى الشركة.',
      questions:[
        { q:'إيه اللي خلاكِ تشكي في رواية "التجسس الصناعي"؟', unlockId:'nada_target_suspicion',
          a:'"الملفات المستهدفة كانت كلها من أرشيف الشكاوى القديم بس، مفيش ولا ملف مالي أو استراتيجي واحد اتلمس."' },
        { q:'كنتِ عارفة تفاصيل أي شكوى قديمة معينة في الأرشيف ده؟', requires:['nada_target_suspicion'], unlockId:'nada_specific_complaint_hint',
          a:'"في شكوى قديمة من موظفة سابقة، سلمى، ضد هيثم بخصوص تحرش لفظي، اتقفلت من غير متابعة كافية وقتها."' },
      ],
      confrontations:{}
    },
    {
      id:'former_employee_salma', name:'سلمى', role:'موظفة سابقة، صاحبة الشكوى القديمة', img: IMG_BASE_FORBIDDENFLOOR + 'salma.jpg', avatarEmoji:'📋',
      alibi:'قالت إنها مش موظفة في الشركة من فترة طويلة، ومالهاش أي وصول لمبنى الشركة حاليًا.',
      questions:[
        { q:'كان عندك شكوى قديمة ضد هيثم؟', unlockId:'salma_complaint_confirmed',
          a:'"أيوه، قدمت شكوى تحرش لفظي ضده من فترة، بس الإدارة وقتها قفلت الموضوع من غير عقاب حقيقي."' },
        { q:'حاولتِ تاخدي حقك بطريقة تانية بعد إغلاق الشكوى؟', requires:['salma_complaint_confirmed'], unlockId:'salma_recent_contact',
          a:'"تواصلت مؤخرًا مع محامي عشان أفتح الموضوع تاني بشكل رسمي، وكنت محتاجة نسخة موثقة من الشكوى الأصلية."' },
        { q:'محاميك حاول يوصل لنسخة الشكوى بطريقة غير رسمية؟', requires:['salma_recent_contact'], closesInterrogation:true,
          a:'(بتتردد) "قال لي إنه هيحاول يلاقي طريقة يوثق بيها الموضوع، بس ماقالش لي تفاصيل، وأنا مسؤولة عن قراري بس مش عن كل خطوة اتاخدت."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'break_in_report', tag:'من بلاغ الاقتحام', crit:false, title:'بلاغ اقتحام المكتب', img:null,
      short:'بلاغ رسمي باقتحام مكتب هيثم وسرقة ملفات من الأرشيف القديم',
      full:'البلاغ الرسمي بيوثق اقتحام مكتب هيثم بالليل، واختفاء ملفات محددة من أرشيف الشكاوى الداخلية القديم.',
      unlocked:true, order:1 },

    { id:'files_content_hint', tag:'من استجواب هيثم', crit:false, title:'محتوى الملفات المسروقة', img:null,
      short:'الملفات المسروقة كانت أرشيف شكاوى قديم بس، مش ملفات حساسة',
      full:'هيثم أكد إن الملفات المسروقة كانت أرشيف شكاوى داخلية قديمة، مش ملفات مالية أو تقنية حساسة تستدعي تجسس صناعي.',
      unlocked:false, order:2 },

    { id:'haitham_complaint_hint', tag:'من استجواب هيثم', crit:false, title:'شكوى قديمة تخص هيثم', img:null,
      short:'هيثم أكد وجود شكوى قديمة ضده من موظفة سابقة',
      full:'هيثم اعترف بوجود شكوى قديمة ضده من موظفة سابقة، لكنه أكد إنها اتقفلت إداريًا من زمان من غير متابعة.',
      unlocked:false, order:3 },

    { id:'karim_no_knowledge', tag:'من استجواب كريم', crit:false, title:'عدم معرفة كريم بالأرشيف', img:null,
      short:'كريم أكد عدم معرفته بتفاصيل أرشيف الشكاوى الداخلي',
      full:'كريم أكد إنه ماكانش عارف تفاصيل أرشيف الشكاوى الداخلي حتى وقت عمله في الشركة، وده يضعف نظرية التجسس الصناعي.',
      unlocked:false, order:4 },

    { id:'nada_target_suspicion', tag:'من استجواب ندى', crit:true, title:'استهداف الأرشيف القديم بالتحديد', img:null,
      short:'الملفات المستهدفة كانت كلها من أرشيف الشكاوى، مش ملفات العمل',
      full:'ندى لاحظت إن الملفات المستهدفة في الاقتحام كانت كلها من أرشيف الشكاوى القديم بس، من غير أي لمس لملفات مالية أو استراتيجية حديثة، وده يستبعد نظرية التجسس الصناعي.',
      unlocked:false, order:5 },

    { id:'nada_specific_complaint_hint', tag:'من استجواب ندى', crit:true, title:'شكوى سلمى تحديدًا', img:null,
      short:'شكوى سلمى ضد هيثم بخصوص تحرش لفظي اتقفلت من غير عقاب',
      full:'ندى كشفت إن الشكوى المستهدفة تحديدًا كانت شكوى سلمى، موظفة سابقة، ضد هيثم بخصوص تحرش لفظي، اتقفلت من غير متابعة كافية.',
      unlocked:false, order:6 },

    { id:'salma_complaint_confirmed', tag:'من استجواب سلمى', crit:false, title:'تأكيد سلمى لشكواها القديمة', img:null,
      short:'سلمى أكدت تقديم شكوى تحرش قديمة ضد هيثم',
      full:'سلمى أكدت إنها قدمت شكوى تحرش لفظي ضد هيثم من فترة، لكن الإدارة قفلت الموضوع من غير عقاب حقيقي.',
      unlocked:false, order:7 },

    { id:'salma_recent_contact', tag:'من استجواب سلمى', crit:true, title:'محاولة سلمى إعادة فتح القضية', img:null,
      short:'سلمى تواصلت مع محامي لإعادة فتح الشكوى رسميًا',
      full:'سلمى اعترفت إنها تواصلت مؤخرًا مع محامي عشان تعيد فتح شكواها القديمة بشكل رسمي، وكانت محتاجة نسخة موثقة من الشكوى الأصلية.',
      unlocked:false, order:8 },

    { id:'floor_access_confirmed', tag:'من مخطط الطابق', crit:true, title:'مسار الوصول الليلي للمكتب', img: IMG_BASE_FORBIDDENFLOOR + 'evidence-floorplan.jpg',
      short:'مخطط الطابق يثبت إن الوصول تم عبر مدخل خدمة يعرفه محامي متعاقد سابقًا مع الشركة',
      full:'مخطط الطابق التنفيذي بيوضح مسار وصول عبر مدخل خدمة جانبي، معروف بس للمتعاقدين القانونيين اللي اشتغلوا مع الشركة قبل كده — بما يربط محامي سلمى مباشرة بالقدرة على الوصول للمكتب من غير المرور بأمن المدخل الرئيسي.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تأكيد هيثم إن الشكوى القديمة "اتقفلت من غير متابعة" بتأكيد ندى إن نفس الشكوى دي بالذات كانت هدف الاقتحام المباشر. فيه ربط واضح بيتم تجاهله.',
    resultText: 'التناقض واضح: هيثم حاول يصوّر الشكوى كملف قديم منسي، لكن ندى أكدت إنها كانت الهدف المباشر والوحيد للاقتحام — وده يكشف إن حد كان محتاج يوثقها رسميًا، مش يخفيها.',
    resultEvidenceIds: ['nada_specific_complaint_hint'],
    statements: [
      { id:'st1', text:'"كان فيه شكوى قديمة ضدي، بس اتقفلت إداريًا من زمان وماكانش ليها متابعة."', source:'هيثم — في الاستجواب' },
      { id:'st2', text:'الملفات المستهدفة كانت كلها من أرشيف الشكاوى القديم، تحديدًا شكوى سلمى ضد هيثم.', source:'دليل: ملاحظة ندى على استهداف الأرشيف' },
      { id:'st3', text:'"ماكنتش أعرف تفاصيل أرشيف الشكاوى الداخلي حتى وأنا شغال في الشركة."', source:'كريم — في الاستجواب' },
      { id:'st4', text:'"تواصلت مؤخرًا مع محامي عشان أفتح الموضوع تاني بشكل رسمي."', source:'سلمى — في الاستجواب' },
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
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  floorPlanPuzzle: {
    enabled: true,
    tabLabel: 'مخطط الطابق',
    introText: 'تتبع المسارات الممكنة من مداخل المبنى المختلفة لمكتب هيثم، وحدد مين من المشتبه بيهم كان يقدر يوصل من غير ما يمر بأمن المدخل الرئيسي.',
    resultText: 'المسار بيوضح إن مدخل الخدمة الجانبي معروف بس للمتعاقدين القانونيين السابقين مع الشركة — وده يربط الوصول مباشرة بمحامي سلمى، مش بأي موظف حالي أو منافس تجاري.',
    rooms: ['المدخل الرئيسي', 'مصعد الموظفين', 'مدخل الخدمة الجانبي', 'مكتب هيثم'],
    suspectPaths: {
      hr_head_haitham: ['المدخل الرئيسي', 'مصعد الموظفين', 'مكتب هيثم'],
      competitor_suspect_karim: ['المدخل الرئيسي'],
      legal_officer_nada: ['المدخل الرئيسي', 'مصعد الموظفين'],
      former_employee_salma: ['مدخل الخدمة الجانبي', 'مكتب هيثم'],
    },
    correctSuspectId: 'former_employee_salma',
    resultEvidenceIds: ['floor_access_confirmed'],
  },

  evidenceCombinations: [
    { parts:['salma_recent_contact','nada_specific_complaint_hint'], resultId:'floor_access_confirmed' },
  ],

  investigationActions: [
    {
      id:'check_contractor_records', kind:'مراجعة سجلات المتعاقدين', label:'راجع سجل المتعاقدين القانونيين السابقين للشركة',
      description:'دوّر على أي محامي متعاقد سابقًا مع الشركة له صلة بسلمى أو بقضيتها.',
      requires:['salma_recent_contact','nada_specific_complaint_hint'], resultEvidenceIds:['floor_access_confirmed'],
      successText:'السجلات أكدت وجود محامي متعاقد سابقًا مع الشركة له صلة مباشرة بقضية سلمى.'
    },
  ],

  correctSuspectId: 'former_employee_salma',
  conclusiveEvidenceIds: ['floor_access_confirmed', 'nada_specific_complaint_hint', 'salma_recent_contact', 'salma_complaint_confirmed'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن سلمى (عبر محاميها) وراء الاقتحام؟',
        options: [
          { id:'a', text:'مخطط الطابق حدد مسار وصول معروف بس للمتعاقدين القانونيين + استهداف شكواها تحديدًا دون أي ملف آخر + اعترافها بمحاولة إعادة فتح القضية رسميًا' },
          { id:'b', text:'لأنها موظفة سابقة عندها شكوى قديمة وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بلحظة الاقتحام نفسها' },
          { id:'c', text:'لأنها كانت متوترة وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotkarim',
        label:'ليه كريم كان بريء رغم إنه أول مشتبه فيه بتهمة التجسس؟',
        options: [
          { id:'a', text:'الملفات المستهدفة كانت كلها من أرشيف الشكاوى القديم، مش أي ملف مالي أو استراتيجي يفيد شركة منافسة، وحجة غيابه موثقة بكاميرات مستقلة' },
          { id:'b', text:'لأنه انتقل لشركة منافسة وده افتراض تجسس تجاري عام، مش نتيجة تحقيق فعلي في نوع الملفات المستهدفة تحديدًا' },
          { id:'c', text:'لأنه رفض تهمة التجسس بحدة وقت الاستجواب، وده سلوك دفاعي طبيعي بس مش إثبات مباشر على براءته' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الاقتحام اللي مالوش علاقة بالشغل خالص',
      paragraphs:[
        'سلمى، بمساعدة محاميها اللي كان متعاقد سابقًا مع الشركة ويعرف مدخل الخدمة الجانبي، دبّرت الوصول لمكتب هيثم عشان توثق نسخة رسمية من شكواها القديمة ضده بخصوص التحرش اللفظي، بهدف إعادة فتح القضية قانونيًا بعد ما اتقفلت بلا عقاب.',
        'اللي قفل الدائرة كان مخطط الطابق اللي حدد مسار الوصول المعروف بس للمتعاقدين القانونيين، واستهداف شكواها بالتحديد دون أي ملف عمل تاني، واعترافها بمحاولة إعادة فتح القضية رسميًا.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية سلمى ومحاميها، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي رواية "التجسس الصناعي".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: مخطط الطابق، استهداف الشكوى تحديدًا، ومحاولتها إعادة فتح القضية، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والحقيقة الكاملة عن سبب الاقتحام فضلت مخفية. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الطابق المحظور"

   الغلاف (cover.webp):
   "Photorealistic shot of a dark modern corporate office hallway at
   night with a slightly open office door, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a busy modern corporate office floor
   during working hours, photorealistic, no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a security guard walking through an empty
   dark office building at night, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a ransacked office filing cabinet with
   scattered documents, photorealistic, no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a woman reviewing files in a disturbed
   office with a concerned expression, photorealistic, no text, no
   watermark"

   الشخصيات:

   هيثم (haitham.jpg):
   "Photorealistic portrait of a middle-aged Egyptian corporate HR
   executive in a suit, composed expression, photorealistic, no
   text, no watermark"

   كريم (karim-suspect.jpg):
   "Photorealistic portrait of a young Egyptian businessman in
   smart casual attire, confident expression, photorealistic, no
   text, no watermark"

   ندى (nada.jpg):
   "Photorealistic portrait of a professional Egyptian female legal
   officer, formal attire, photorealistic, no text, no watermark"

   سلمى (salma.jpg):
   "Photorealistic portrait of a determined young Egyptian woman,
   composed expression, photorealistic, no text, no watermark"

   أدلة:
   evidence-floorplan.jpg: "Photorealistic shot of an architectural
   office floor plan blueprint on a desk, photorealistic, no text,
   no watermark"
   ============================================================ */
