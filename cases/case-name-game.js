/* ============================================================
   بيانات قضية: لعبة الأسماء
   فتاة بتتلقى رسايل تهديد مجهولة على حساباتها، والمتابعين
   بيتعاطفوا معاها بشكل كبير. لكن مين بيبعت الرسايل دي فعليًا،
   ومين المستفيد الحقيقي من التعاطف ده؟
   ============================================================ */

const IMG_BASE_NAMEGAME = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/name-game/';

const CASE_NAME_GAME = {
  id: 'name-game',
  title: 'لعبة الأسماء',
  caseNo: 'CASE 073',
  subtitle: 'منصات سوشيال ميديا، القاهرة',
  coverImg: IMG_BASE_NAMEGAME + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 48,
  investigationPoints: 23,
  teaser: 'فتاة بتتلقى رسايل تهديد مجهولة على حساباتها بشكل متكرر، والقصة بتنتشر بسرعة وسط تعاطف كبير من المتابعين وحملة تبرعات لدعمها. لكن تتبع الحسابات المجهولة بيكشف إن مين بيبعت الرسايل مش غريب عنها خالص.',

  isPremium: false,
  categories: ['digital', 'scandal', 'social'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_NAMEGAME + 'cover.webp',
    heroCaption: 'CASE 073 — التهديد اللي جه من جوه',
    text1: 'المؤثرة "ياسمين" بدأت تستلم رسايل تهديد مجهولة على حساباتها من حسابات وهمية مختلفة على مدى أسابيع، ونشرت الرسايل دي علنًا. القصة انتشرت بسرعة وسط تعاطف كبير من متابعينها، ووصل الأمر لحملة تبرعات لدعمها "نفسيًا وماديًا".',
    text2: 'صديقتها القديمة "ريم" مش مقتنعة بالقصة بالكامل، لأنها لاحظت تفاصيل غريبة في توقيت الرسايل. طلبت تحقق قبل ما حملة التبرعات دي توصل لهدفها المالي الكامل.',
    meta: [
      { label:'المُبلّغة', value:'ياسمين — مؤثرة على السوشيال ميديا' },
      { label:'موضوع الشك', value:'رسايل تهديد مجهولة من حسابات وهمية' },
      { label:'الأثر', value:'حملة تبرعات نشطة لدعم ياسمين' },
      { label:'طلب التحقيق', value:'ريم، صديقة قديمة لياسمين' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — الرسائل الأولى', img: IMG_BASE_NAMEGAME + 'scene1.jpg',
      text:'ياسمين بتستلم أول رسالة تهديد مجهولة على حسابها، وبتنشرها فورًا مع تعليق قلق لمتابعينها.' },
    { scene:'المشهد ٢ — التصعيد', img: IMG_BASE_NAMEGAME + 'scene2.jpg',
      text:'رسايل تانية بتوصل من حسابات وهمية مختلفة، وياسمين بتوثق كل حاجة وتنشرها بالتفصيل.' },
    { scene:'المشهد ٣ — التعاطف', img: IMG_BASE_NAMEGAME + 'scene3.jpg',
      text:'القصة بتنتشر بسرعة، ومتابعين كتير بيبدأوا حملة تبرعات لمساعدة ياسمين "نفسيًا وماديًا".' },
    { scene:'المشهد ٤ — الشك', img: IMG_BASE_NAMEGAME + 'scene4.jpg',
      text:'ريم بتراجع توقيت الرسايل بعناية، وبتلاحظ نمط غريب بيتكرر كل ما حملة التبرعات تقرّب من هدف مالي جديد.' },
  ],

  suspects: [
    {
      id:'influencer_yasmin', name:'ياسمين', role:'المؤثرة المُبلّغة عن التهديدات', img: IMG_BASE_NAMEGAME + 'yasmin-influencer.jpg', avatarEmoji:'📱',
      alibi:'قالت إنها ضحية فعلية لتهديدات حقيقية من شخص مجهول عايز يأذيها.',
      questions:[
        { q:'إنتِ متأكدة إن الرسايل دي من شخص خارجي؟',
          a:'"طبعًا، أنا مش هعمل حاجة زي دي لنفسي، ده تهديد حقيقي خايفة منه فعلًا."' },
        { q:'ليه حملة التبرعات دايمًا بتزيد كل ما رسالة جديدة توصل؟', unlockId:'donation_timing_hint',
          a:'"الناس بتتعاطف طبيعي كل ما يشوفوا تهديد جديد، ده مش حاجة أنا متحكمة فيها."' },
      ],
      confrontations:{}
    },
    {
      id:'friend_reem', name:'ريم', role:'صديقة قديمة لياسمين، طلبت التحقيق', img: IMG_BASE_NAMEGAME + 'reem.jpg', avatarEmoji:'🔍',
      alibi:'مش موظفة في القصة، بس صديقة قديمة لياسمين لاحظت تفاصيل مقلقة.',
      questions:[
        { q:'إيه اللي خلاكِ تشكي في القصة؟', unlockId:'reem_timing_observation',
          a:'"لاحظت إن كل رسالة جديدة بتوصل بالظبط قبل ما حملة التبرعات توصل لهدف مالي معين بيوم أو اتنين."' },
        { q:'كنتِ عارفة ياسمين قبل شهرتها؟',
          a:'"أيوه، كنا صحاب من زمان قبل ما تبقى مؤثرة، وعارفة إنها كانت بتمر بضغوط مالية قبل الموضوع ده."' },
      ],
      confrontations:{}
    },
    {
      id:'manager_sherif', name:'شريف', role:'مدير أعمال ياسمين والمسؤول عن حساباتها', img: IMG_BASE_NAMEGAME + 'sherif.jpg', avatarEmoji:'💼',
      alibi:'قال إنه مسؤول عن الجانب التجاري بس، ومالوش دخل في محتوى الرسايل أو توقيتها.',
      loseMsg:'شريف فعلًا مسؤول عن الجانب التجاري والتعاقدات بس، وتتبع الحسابات الوهمية أثبت إنها اتنشأت من نفس جهاز ياسمين الشخصي، مش من أي حساب يديره شريف لصالحها. مفيش أي دليل يربطه مباشرة بإنشاء الحسابات المجهولة نفسها.',
      questions:[
        { q:'إنت بتدير حسابات ياسمين، صح؟', unlockId:'sherif_account_access',
          a:'"بدير الجانب التجاري والتعاقدات بس، مش المحتوى الشخصي أو الرسايل اللي بتوصلها."' },
        { q:'استفدت ماديًا من حملة التبرعات؟', requires:['sherif_account_access'],
          a:'"أخد نسبة عادية من أي دخل رسمي للحساب، زي أي تعاقد تجاري، ده جزء من شغلي المعتاد."' },
      ],
      confrontations:{}
    },
    {
      id:'ex_boyfriend_hazem', name:'حازم', role:'صديق سابق لياسمين، انفصلوا بشكل غير ودّي', img: IMG_BASE_NAMEGAME + 'hazem.jpg', avatarEmoji:'😠',
      alibi:'قال إنه ماله دعوة بالموضوع خالص من بعد الانفصال، ومقاطعها تمامًا.',
      questions:[
        { q:'علاقتك بياسمين كانت إزاي قبل الانفصال؟', unlockId:'hazem_breakup_hint',
          a:'"انفصلنا بشكل مش ودي خالص، وهي اتكلمت عني بشكل سلبي قدام متابعينها بعد الانفصال."' },
        { q:'كنت بتتابع حساباتها بعد الانفصال؟',
          a:'"بصراحة أيوه، كنت بتابع من بعيد، بس مبعتلهاش أي رسايل تهديد أو حاجة زي كده."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'threat_messages_log', tag:'من البلاغ الأصلي', crit:false, title:'سجل الرسايل المُبلّغ عنها', img:null,
      short:'سجل رسايل التهديد المجهولة اللي نشرتها ياسمين',
      full:'سجل رسايل التهديد المجهولة اللي وصلت لياسمين من حسابات وهمية مختلفة على مدى أسابيع، ونشرتها علنًا لمتابعيها.',
      unlocked:true, order:1 },

    { id:'donation_timing_hint', tag:'من استجواب ياسمين', crit:false, title:'توقيت الرسايل وحملة التبرعات', img:null,
      short:'ياسمين قللت من أهمية ارتباط توقيت الرسايل بحملة التبرعات',
      full:'ياسمين حاولت تفسّر تزامن الرسايل مع زيادة التبرعات كتعاطف طبيعي بس، من غير أي إشارة لأي ارتباط مقصود.',
      unlocked:false, order:2 },

    { id:'reem_timing_observation', tag:'من استجواب ريم', crit:true, title:'نمط توقيت الرسايل المريب', img: IMG_BASE_NAMEGAME + 'evidence-timeline.jpg',
      short:'كل رسالة جديدة بتوصل قبل وصول حملة التبرعات لهدف مالي',
      full:'ريم لاحظت نمط متكرر: كل رسالة تهديد جديدة كانت بتوصل بالظبط قبل ما حملة التبرعات توصل لهدف مالي معين بيوم أو اتنين، بشكل يصعب اعتباره صدفة.',
      unlocked:false, order:3 },

    { id:'sherif_account_access', tag:'من استجواب شريف', crit:false, title:'نطاق صلاحيات شريف', img:null,
      short:'شريف مسؤول عن الجانب التجاري بس، مش المحتوى الشخصي',
      full:'شريف أكد إن مسؤوليته محصورة في الجانب التجاري والتعاقدات، ومالوش وصول لإدارة المحتوى الشخصي أو الرسايل الواردة.',
      unlocked:false, order:4 },

    { id:'hazem_breakup_hint', tag:'من استجواب حازم', crit:false, title:'انفصال غير ودّي مع ياسمين', img:null,
      short:'حازم أكد انفصاله غير الودّي عن ياسمين وتعليقاتها السلبية عنه',
      full:'حازم أكد إن انفصاله عن ياسمين كان غير ودّي، وإنها تكلمت عنه بشكل سلبي قدام متابعينها بعد الانفصال مباشرة.',
      unlocked:false, order:5 },

    { id:'ip_trace_result', tag:'من تتبع الحسابات', crit:true, title:'مصدر الحسابات الوهمية', img: IMG_BASE_NAMEGAME + 'evidence-ip.jpg',
      short:'كل الحسابات الوهمية اتنشأت من نفس جهاز ياسمين الشخصي',
      full:'تتبع الحسابات الوهمية اللي بعتت رسايل التهديد كشف إنها كلها اتنشأت وسُجّل الدخول ليها من نفس جهاز ياسمين الشخصي، في نفس الأوقات القريبة من نشرها للرسايل.',
      unlocked:false, order:6 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تأكيد ياسمين إن التبرعات "مش حاجة هي متحكمة فيها" بملاحظة ريم الدقيقة عن توقيت الرسايل المرتبط بأهداف التبرعات. فيه تناقض بين الإنكار والنمط الفعلي.',
    resultText: 'التناقض واضح: ياسمين أنكرت أي علاقة بين توقيت الرسايل والتبرعات، لكن النمط اللي رصدته ريم بيوضح تزامن دقيق ومتكرر جدًا يصعب اعتباره صدفة طبيعية.',
    resultEvidenceIds: ['reem_timing_observation'],
    statements: [
      { id:'st1', text:'"الناس بتتعاطف طبيعي كل ما يشوفوا تهديد جديد، ده مش حاجة أنا متحكمة فيها."', source:'ياسمين — في الاستجواب' },
      { id:'st2', text:'كل رسالة جديدة بتوصل بالظبط قبل ما حملة التبرعات توصل لهدف مالي معين.', source:'دليل: ملاحظة ريم على النمط الزمني' },
      { id:'st3', text:'"بدير الجانب التجاري والتعاقدات بس."', source:'شريف — في الاستجواب' },
      { id:'st4', text:'"انفصلنا بشكل مش ودي خالص."', source:'حازم — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  matchPuzzle: {
    enabled: true,
    tabLabel: 'الربط',
    introText: 'اربط كل شخص بموقفه الحقيقي في القضية بناءً على الأدلة اللي جمعتها.',
    leftItems: [
      { id:'l_yasmin', text:'ياسمين' },
      { id:'l_reem', text:'ريم' },
      { id:'l_sherif', text:'شريف' },
      { id:'l_hazem', text:'حازم' },
    ],
    rightItems: [
      { id:'r_fake_victim', text:'أنشأت الحسابات الوهمية بنفسها من جهازها الشخصي' },
      { id:'r_suspicious_observer', text:'لاحظت نمط زمني مريب بين الرسايل والتبرعات' },
      { id:'r_business_only', text:'مسؤول عن الجانب التجاري بس، بلا علاقة بالمحتوى الشخصي' },
      { id:'r_bitter_ex', text:'انفصل بشكل سلبي، لكن مفيش دليل يربطه بالرسايل فعليًا' },
    ],
    correctPairs: [
      ['l_yasmin','r_fake_victim'],
      ['l_reem','r_suspicious_observer'],
      ['l_sherif','r_business_only'],
      ['l_hazem','r_bitter_ex'],
    ],
    resultText: 'ربطت كل حد بموقفه الحقيقي! الصورة الكاملة واضحة دلوقتي: ياسمين هي نفسها اللي كانت بتنشئ الحسابات الوهمية عشان تحافظ على تدفق التعاطف والتبرعات.',
    resultEvidenceIds: ['ip_trace_result'],
  },

  evidenceCombinations: [
    { parts:['donation_timing_hint','reem_timing_observation'], resultId:'ip_trace_result' },
  ],

  investigationActions: [
    {
      id:'trace_ip_addresses', kind:'تتبع رقمي', label:'تتبع عناوين IP للحسابات الوهمية',
      description:'راجع بيانات إنشاء الحسابات الوهمية وحدد مصدرها الرقمي الفعلي.',
      requires:['reem_timing_observation','donation_timing_hint'], resultEvidenceIds:['ip_trace_result'],
      successText:'التتبع الرقمي أكد إن كل الحسابات الوهمية اتنشأت من نفس جهاز ياسمين الشخصي.'
    },
  ],

  correctSuspectId: 'influencer_yasmin',
  conclusiveEvidenceIds: ['ip_trace_result', 'reem_timing_observation', 'donation_timing_hint'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن ياسمين هي اللي بعتت الرسايل لنفسها؟',
        options: [
          { id:'a', text:'تتبع الحسابات أثبت إنها كلها من جهازها الشخصي + نمط التوقيت المتكرر بين الرسايل وأهداف التبرعات + إنكارها لأي ارتباط بينهم' },
          { id:'b', text:'لأنها المستفيدة الوحيدة من التعاطف وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط تقني مباشر' },
          { id:'c', text:'لأنها بدت متوترة وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynothazem',
        label:'ليه حازم كان بريء رغم انفصاله السلبي عن ياسمين؟',
        options: [
          { id:'a', text:'تتبع الحسابات الوهمية أثبت إنها كلها من جهاز ياسمين نفسها، ومفيش أي دليل رقمي يربط حازم بإنشاء أي حساب من الحسابات دي' },
          { id:'b', text:'لأنه اعترف بمتابعتها بصراحة، وده سلوك تعاوني بس مش إثبات مباشر على براءته الكاملة' },
          { id:'c', text:'لأن الانفصال حصل من فترة طويلة، وده افتراض عن الوقت مش نتيجة تحقيق رقمي فعلي' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الضحية اللي كانت المخرجة',
      paragraphs:[
        'ياسمين، وهي تمر بضغوط مالية قبل شهرتها، أنشأت الحسابات الوهمية بنفسها من جهازها الشخصي عشان تولّد تعاطف مستمر من متابعينها وتحافظ على تدفق التبرعات كل ما حملة تقرّب من هدف مالي جديد.',
        'اللي قفل الدائرة كان تتبع الحسابات الوهمية اللي أثبت مصدرها الرقمي الحقيقي، ونمط التوقيت المريب اللي رصدته ريم، وإنكار ياسمين لأي ارتباط بين الرسايل والتبرعات رغم وضوح النمط.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية ياسمين، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عنها صفة "الضحية".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: تتبع الحسابات، نمط التوقيت، وتوقيت التبرعات، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والحقيقة الكاملة فضلت مخفية والتبرعات استمرت تتدفق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "لعبة الأسماء"

   الغلاف (cover.webp):
   "Photorealistic shot of a smartphone screen showing social media
   notifications and messages, dim room lighting, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a young woman looking worried at her
   phone screen, apartment background, photorealistic, no text, no
   watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a woman recording a video message on her
   phone, concerned expression, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a smartphone screen showing a fundraising
   campaign page with donation numbers, photorealistic, no text, no
   watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a woman reviewing a timeline on a laptop
   screen with a thoughtful, suspicious expression, photorealistic,
   no text, no watermark"

   الشخصيات:

   ياسمين (yasmin-influencer.jpg):
   "Photorealistic portrait of a young Egyptian female social media
   influencer, stylish appearance, photorealistic, no text, no
   watermark"

   ريم (reem.jpg):
   "Photorealistic portrait of a young Egyptian woman with a
   thoughtful, analytical expression, photorealistic, no text, no
   watermark"

   شريف (sherif.jpg):
   "Photorealistic portrait of a professional Egyptian businessman
   in smart casual attire, photorealistic, no text, no watermark"

   حازم (hazem.jpg):
   "Photorealistic portrait of a young Egyptian man with a
   frustrated expression, photorealistic, no text, no watermark"

   أدلة:
   evidence-timeline.jpg: "Photorealistic close-up of a laptop
   screen showing a timeline chart with highlighted date markers,
   photorealistic, no text, no watermark"
   evidence-ip.jpg: "Photorealistic close-up of a computer screen
   showing device login records and IP address data, photorealistic,
   no text, no watermark"
   ============================================================ */
