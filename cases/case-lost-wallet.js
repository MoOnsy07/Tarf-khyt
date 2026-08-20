/* ============================================================
   بيانات قضية: المحفظة المفقودة
   قضية نصب مالي — شاب استثمر مدخرات عيلته كلها في مشروع عملة
   رقمية جديدة، والمشروع اختفى بين ليلة وضحاها.
   ============================================================ */

const IMG_BASE_WALLET = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/lost-wallet/';

const CASE_LOST_WALLET = {
  id: 'lost-wallet',
  title: 'المحفظة المفقودة',
  caseNo: 'CASE 012',
  subtitle: 'مكتب استثماري صغير، مدينة نصر، القاهرة',
  coverImg: IMG_BASE_WALLET + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 18,
  teaser: 'شاب استثمر مدخرات عيلته كلها في مشروع عملة رقمية واعد، والمشروع اختفى بين ليلة وضحاها مع كل الفلوس. مين من الشركاء الثلاثة كان بيخطط للهروب؟',

  isPremium: false,
  categories: ['fraud', 'scandal'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_WALLET + 'cover.webp',
    heroCaption: 'CASE 010 — بعد اختفاء 40 مليون جنيه',
    text1: 'مشروع عملة رقمية محلي جديد اسمه "نايل كوين" جمع فلوس من مئات المستثمرين خلال أسابيع قليلة، ووعد بعائد ضخم في وقت قصير جدًا. فجأة، الموقع الرسمي وقع، والمحفظة الرئيسية للمشروع اتصفّت تقريبًا بالكامل، ومؤسس المشروع اختفى.',
    text2: 'أحد الضحايا، "يوسف"، استثمر مدخرات عيلته كلها وجه يطلب مساعدتك قبل ما يبلغ الشرطة الرسمية، عشان يفهم مين فعلًا وراء الموضوع من جوه فريق العمل الصغير، قبل ما الأدلة الرقمية تضيع للأبد.',
    meta: [
      { label:'الضحية الرئيسية', value:'يوسف — مستثمر خسر مدخرات عيلته' },
      { label:'المبلغ المفقود', value:'حوالي 40 مليون جنيه من مستثمرين مختلفين' },
      { label:'وقت الاختفاء', value:'ليلة واحدة، من غير أي إنذار مسبق' },
      { label:'طلب التحقيق', value:'يوسف، نيابة عن باقي الضحايا' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قبل الانهيار',
      img: IMG_BASE_WALLET + 'wallet-scene1.jpg',
      text:'مكتب صغير أنيق، شاشات مليانة بيانات تداول، وفريق عمل صغير متحمس بيروّج لمشروع "نايل كوين" على السوشيال ميديا بشكل مكثف.'
    },
    {
      scene:'المشهد ٢ — الانهيار المفاجئ',
      img: IMG_BASE_WALLET + 'wallet-scene2.jpg',
      text:'في منتصف الليل، الموقع الرسمي بيقع فجأة، وحسابات السوشيال ميديا بتتقفل واحد ورا التاني. سجل البلوكتشين يبين تحويل أغلب الرصيد من المحفظة الرئيسية لعنوان خارجي جديد.'
    },
    {
      scene:'المشهد ٣ — الصدمة',
      img: IMG_BASE_WALLET + 'wallet-scene3.jpg',
      text:'يوسف بيحاول يتواصل مع المؤسس على كل الأرقام والحسابات، محدش بيرد. جروب المستثمرين على واتساب بيتحول لحالة هلع كاملة.'
    },
    {
      scene:'المشهد ٤ — التحقيق يبدأ',
      img: IMG_BASE_WALLET + 'wallet-scene4.jpg',
      text:'المكتب لسه موجود جسديًا، والفريق الصغير لسه في القاهرة. عندك فرصة تحقق من جوه قبل ما أي حد يهرب فعليًا.'
    },
  ],

  suspects: [
    {
      id:'omar', name:'عمر', role:'المؤسس المعلن للمشروع، الوجه العام', img: IMG_BASE_WALLET + 'omar.jpg', avatarEmoji:'📱',
      alibi:'قال إنه هو كمان ضحية، ومحفظته الشخصية اتخترقت زي باقي المستثمرين.',
      questions:[
        { q:'إنت المؤسس الرسمي، ليه مش قادر توصل لأموال المشروع؟',
          a:'"أنا صدمت زيكم بالظبط! أنا كان عندي صلاحية متابعة ومراجعة، لكن مفتاح التوقيع الفعلي للمعاملات كان مع شريكي التقني مالك، وأنا كمان خسرت جزء كبير من فلوسي في المشروع."' },
        { q:'مين تاني كان عنده صلاحية على المحفظة الرئيسية؟', unlockId:'wallet_access',
          a:'"مالك، شريكي التقني، هو اللي بنى النظام وكان معاه وسيلة التوقيع على التحويلات من المحفظة الرئيسية."' },
        { q:'ليه كل حسابات السوشيال ميديا اتقفلت مرة واحدة بالظبط؟',
          a:'"معرفش صراحة، أنا معايا صلاحية على جزء بس مش على كل حاجة، مالك هو اللي كان بيدير الجانب التقني بالكامل."' },
      ]
    },
    {
      id:'malak', name:'مالك', role:'الشريك التقني، مطور النظام والمحفظة الرقمية', img: IMG_BASE_WALLET + 'malak.jpg', avatarEmoji:'💻',
      alibi:'قال إنه كان نايم البيت وقت ما المحفظة اتفرغت وماكانش متابع خالص.',
      questions:[
        { q:'إنت اللي كتبت كود المحفظة، صح؟', unlockId:'private_key_log',
          a:'"أيوه، أنا بنيت النظام، ومفتاح التوقيع كان محفوظ على جهاز أمان مخصص عندي. أي تحويل كبير لازم يتوقع من الجهاز ده."' },
        { q:'مين قدر يستخدم المفتاح ده غيرك؟',
          a:'"محدش غيري كان المفروض يقدر يوقع تحويل من المحفظة الرئيسية، والجهاز كان معايا طول الوقت."' },
        { q:'سجل جهاز التوقيع بيوضح إن التحويل الكبير اتوقع بالمفتاح بتاعك قبل الانهيار بدقايق — تفسر ده إزاي؟', requires:['private_key_log'],
          a:'"أنا راجعت الأرصدة، لكن ما وقعتش أي تحويل خارجي. لو فيه توقيع بالمفتاح بتاعي يبقى لازم نفهم الجهاز حصل له إيه."' },
      ]
    },
    {
      id:'reem', name:'ريم', role:'مسؤولة التسويق والسوشيال ميديا للمشروع', img: IMG_BASE_WALLET + 'reem.jpg', avatarEmoji:'📢',
      alibi:'قالت إنها كانت بتجهز محتوى الحملة الإعلانية للأسبوع الجاي وقت الانهيار.',
      loseMsg:'ريم كانت فعلًا مسؤولة عن التسويق بس، ومفيش أي صلاحية تقنية أو مالية ليها على المحفظة الرقمية نفسها. اتهامها هيكون مبني على شكوك سطحية بس من غير أي دليل مادي حقيقي.',
      questions:[
        { q:'كنتِ عارفة إن المشروع كان غير مضمون؟',
          a:'"أنا كنت بروّج للمشروع زي ما اتقال لي، ماكنتش عارفة أي تفاصيل تقنية عن أمان النظام من جوه."' },
        { q:'ليه الحسابات اتقفلت فجأة كلها مرة واحدة؟',
          a:'"دي مش صلاحياتي، أنا بس بجهز المحتوى، حد تاني معاه الصلاحيات الإدارية على الحسابات نفسها."' },
      ]
    },
    {
      id:'hazem', name:'حازم', role:'مستثمر أول في المشروع، صديق قديم لعمر ومالك', img: IMG_BASE_WALLET + 'hazem.jpg', avatarEmoji:'🤔',
      alibi:'قال إنه استثمر برضه فلوس كتير وخسرها زي أي حد تاني.',
      questions:[
        { q:'إنت عرفت عن المشروع ده إزاي أصلًا؟', unlockId:'early_exit',
          a:'"عمر ومالك أصحابي من زمان، عرضوا عليّ الفرصة من الأول قبل ما تتعلن رسميًا للناس."' },
        { q:'سحبت أي فلوس من المشروع قبل الانهيار؟', requires:['early_exit'],
          a:'(بيتردد) "سحبت جزء بسيط، حاجة عادية، مكسب أولي، مفيش حاجة غريبة في الموضوع."' },
        { q:'السجل بيوضح إنك سحبت 80% من استثمارك الأصلي قبل الانهيار بيوم واحد بالظبط — عندك تفسير؟', unlockId:'hazem_withdrawal', requires:['early_exit','wallet_access'], closesInterrogation:true,
          a:'(بيصمت لحظة) "مالك قال لي إن فيه مشكلة تقنية جاية، ونصحني أسحب جزء كبير بسرعة قبل أي حد تاني يعرف."' },
      ]
    },
  ],

  evidence: [
    { id:'blockchain_trace', tag:'من سجل البلوكتشين', crit:true, title:'تتبع حركة المحفظة الرئيسية', img: IMG_BASE_WALLET + 'wallet-blockchain.jpg',
      short:'المحفظة اتفرغت بمعاملة واحدة كبيرة قبل الانهيار بدقايق',
      full:'سجل البلوكتشين العام بيوضح إن المحفظة الرئيسية اتفرغت بمعاملة واحدة ضخمة، لحساب خارجي جديد، قبل انهيار الموقع بدقايق معدودة بس.',
      unlocked:true, order:1 },

    { id:'wallet_access', tag:'من استجواب عمر', crit:false, title:'صلاحيات المحفظة الرئيسية', img:null,
      short:'مالك هو الوحيد اللي معاه مفتاح التوقيع على التحويلات',
      full:'عمر أكد إن صلاحياته كانت للمتابعة والإدارة، بينما مفتاح التوقيع الفعلي على تحويلات المحفظة الرئيسية موجود على جهاز أمان تحت مسؤولية مالك.',
      unlocked:false, order:2 },

    { id:'private_key_log', tag:'من سجلات النظام', crit:true, title:'توقيع التحويل النهائي بمفتاح مالك', img: IMG_BASE_WALLET + 'wallet-log.jpg',
      short:'سجل جهاز الأمان يثبت إن التحويل النهائي اتوقع بمفتاح مالك',
      full:'سجل جهاز التوقيع الداخلي بيربط المعاملة اللي صفّت رصيد المحفظة بتوقيع صادر من مفتاح مالك وفي نفس توقيت التحويل على البلوكتشين. مالك أنكر إنه وقّع أي تحويل خارجي.',
      unlocked:false, order:3 },

    { id:'early_exit', tag:'من استجواب حازم', crit:false, title:'حازم عرف عن المشروع مبكرًا', img:null,
      short:'حازم كان من أوائل المستثمرين، معرفة مباشرة من عمر ومالك',
      full:'حازم اعترف إنه عرف عن المشروع مباشرة من عمر ومالك قبل الإعلان الرسمي، ده بيوضح علاقة ثقة قريبة بينهم التلاتة.',
      unlocked:false, order:4 },

    { id:'reem_no_access', tag:'من استجواب ريم', crit:false, title:'ريم مالهاش صلاحيات تقنية', img:null,
      short:'دورها تسويقي بحت، مفيش صلاحية مالية أو تقنية',
      full:'ريم أكدت إن دورها في المشروع كان تسويقي بحت، ومفيش أي صلاحية مالية أو تقنية ليها على المحفظة أو الحسابات الإدارية.',
      unlocked:false, order:5 },

    { id:'hazem_withdrawal', tag:'من سجل السحب', crit:true, title:'سحب حازم الكبير قبل الانهيار', img: IMG_BASE_WALLET + 'wallet-withdrawal.jpg',
      short:'حازم سحب 80% من استثماره قبل الانهيار بيوم واحد',
      full:'سجل المعاملات الداخلي بيوضح إن حازم سحب نسبة كبيرة جدًا من استثماره قبل الانهيار العام بيوم واحد بالظبط، وده مش تصرف عادي لمستثمر مش عارف حاجة.',
      unlocked:false, order:6 },

    { id:'external_wallet_id', tag:'من تحليل تقني', crit:true, title:'مسار الأموال بعد العنوان الخارجي', img:null,
      short:'جزء من الأموال وصل لمنصة تداول بحساب موثق باسم مالك',
      full:'البلوكتشين لوحده ما يحددش صاحب العنوان الخارجي، لكن تتبع الحركة بيبين إن جزء من الرصيد اتنقل بعد كده لمنصة تداول مركزية. بيانات الحساب الموثقة لدى المنصة باسم مالك، وده بيربطه بمسار الأموال بشكل مباشر.',
      unlocked:false, order:7 },

    { id:'contradiction_noted_wallet', tag:'من تحليل التناقضات', crit:true, title:'تناقض في كلام مالك عن دخوله للنظام', img:null,
      short:'أنكر توقيع أي تحويل، لكن سجل جهاز الأمان يثبت توقيع المعاملة بمفتاحه',
      full:'مالك قال إنه راجع الأرصدة فقط وما وقّعش أي تحويل خارجي، لكن سجل جهاز الأمان يثبت إن المعاملة النهائية اتوقعت بالمفتاح الموجود تحت مسؤوليته. ده تناقض مباشر، مش مجرد توقيت مريب.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن نفي مالك بسجل جهاز التوقيع. فيه تصريح واضح مش متوافق مع الدليل.',
    resultText: 'التناقض واضح: مالك قال إنه ما وقّعش أي تحويل خارجي، لكن سجل جهاز الأمان بيربط المعاملة النهائية بمفتاح التوقيع الموجود تحت مسؤوليته.',
    resultEvidenceIds: ['contradiction_noted_wallet'],
    statements: [
      { id:'st1', text:'"راجعت الأرصدة، لكن ما وقعتش أي تحويل خارجي."', source:'مالك — في الاستجواب' },
      { id:'st2', text:'سجل جهاز التوقيع يثبت إن المعاملة النهائية اتوقعت بالمفتاح الموجود تحت مسؤولية مالك.', source:'دليل: سجل جهاز الأمان' },
      { id:'st3', text:'"أنا صدمت زيكم بالظبط! محفظتي الشخصية اتفرغت هي التانية."', source:'عمر — في الاستجواب' },
      { id:'st4', text:'"أنا كنت بروّج للمشروع زي ما اتقال لي."', source:'ريم — في الاستجواب' },
      { id:'st5', text:'"سحبت جزء بسيط، حاجة عادية، مكسب أولي."', source:'حازم — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },

  codeLockPuzzle: {
    enabled: true,
    tabLabel: 'فك تشفير اللابتوب',
    introText: 'لابتوب مالك مقفول بكود 4 أرقام. عندك خيطين منفصلين: ملف الموارد البشرية بيقول إنه اتخرج سنة 2017، وبطاقة جهاز الأمان بتاعه رقمها بينتهي بـ08. وعلى ورقة جنب اللابتوب مكتوب: «آخر رقمين من سنة التخرج، وبعدهم آخر رقمين من البادج».',
    code: '1708',
    hint: 'اجمع آخر رقمين من سنة التخرج مع آخر رقمين من بطاقة جهاز الأمان',
    wrongMsg: '✗ الرقم غلط، فكر في التلميح تاني.',
    resultText: 'اتفتح اللابتوب. لقيت محادثات بتوضح إن مالك كان مخطط لنقل الرصيد قبل الانهيار، ومعاها بيانات حساب على منصة تداول بتتوافق مع مسار جزء من الأموال.',
    resultEvidenceIds: ['external_wallet_id'],
  },
  matchPuzzle: { enabled:false },

  evidenceCombinations: [
    { parts:['private_key_log','external_wallet_id'], resultId:'contradiction_noted_wallet' },
  ],

  correctSuspectId: 'malak',
  conclusiveEvidenceIds: ['private_key_log', 'hazem_withdrawal', 'external_wallet_id', 'contradiction_noted_wallet'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن مالك هو الفاعل؟',
        options: [
          { id:'a', text:'التحويل اتوقع بمفتاحه + جزء من الأموال وصل لحساب تداول موثق باسمه + حازم أكد إن مالك حذره قبل الانهيار' },
          { id:'b', text:'لأنه الشريك التقني وده كافي وحده' },
          { id:'c', text:'لأنه ماردش على مكالمات يوسف' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyomar',
        label:'ليه عمر كان بريء فعليًا؟',
        options: [
          { id:'a', text:'عمر ماكانش معاه مفتاح التوقيع، ومفيش دليل في السجلات إنه وقّع التحويل أو استقبل جزء من الأموال؛ خسارته الشخصية لوحدها مش دليل براءة' },
          { id:'b', text:'لأنه الوجه العام وده بيبعده عن الشبهة' },
          { id:'c', text:'لأنه اعترف بمكانه بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الخيط الرقمي وصل لصاحبه',
      paragraphs:[
        'مالك كان مخطط لنقل رصيد المشروع قبل الانهيار. التحويل النهائي اتوقع بالمفتاح الموجود تحت مسؤوليته، وحازم أكد إن مالك حذره قبلها عشان يسحب جزء كبير من فلوسه. بعد كده اتحرك جزء من الرصيد لمنصة تداول بحساب موثق باسم مالك.',
        'اللي قفل الدائرة كان سجل التوقيع، وتتبع الأموال للمنصة، ومحادثات اللابتوب، وشهادة حازم. البلوكتشين وحده ما كشفش هوية صاحب العنوان؛ الربط الحقيقي حصل لما الأموال وصلت لجهة عندها حساب موثق.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية مالك، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة الاقتصادية.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: سجلات النظام، سحب حازم، والحساب الخارجي، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق بالفلوس المسروقة. الأدلة الرقمية كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "المحفظة المفقودة"

   الغلاف (cover.webp):
   "Photorealistic shot of a small modern office with multiple
   computer screens showing crashed trading charts and a red 'error'
   message, empty desk chairs, dramatic blue screen glow lighting,
   documentary photography style, no text, no watermark, photorealistic"

   المشهد ١ (wallet-scene1.jpg):
   "Photorealistic shot of a small startup office, young Egyptian team
   working excitedly at desks with trading screens showing green charts,
   energetic atmosphere, photorealistic, no text, no watermark"

   المشهد ٢ (wallet-scene2.jpg):
   "Photorealistic close-up of a computer screen at night showing a
   crashed website error page and a plummeting red financial chart,
   dark room, screen glow lighting, photorealistic, no text, no watermark"

   المشهد ٣ (wallet-scene3.jpg):
   "Photorealistic shot of a young man staring at his phone in panic
   at night, dim room lighting, worried expression, photorealistic,
   no text, no watermark"

   المشهد ٤ (wallet-scene4.jpg):
   "Photorealistic shot of a small office at night with empty desks
   and glowing computer screens, quiet and tense atmosphere,
   photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   عمر (omar.jpg):
   "Photorealistic portrait of a young Egyptian male startup founder,
   casual smart clothes, charismatic polished public-facing
   expression, standing in a modern tech office, modern office
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   مالك (malak.jpg):
   "Photorealistic portrait of a young Egyptian male software
   developer, casual clothes, headphones around neck, focused
   introverted expression, sitting at a desk with multiple monitors,
   screen glow lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   ريم (reem.jpg):
   "Photorealistic portrait of a young Egyptian female social media
   marketer, trendy modest professional attire, holding a phone,
   energetic confident expression, modern office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   حازم (hazem.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male investor,
   smart casual business attire, calm scrutinizing expression,
   sitting in a modern office, modern office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل البلوكتشين (wallet-blockchain.jpg):
   "Photorealistic close-up of a computer screen showing blockchain
   transaction data and wallet addresses, clean UI, screen glow
   lighting, no text, no watermark, photorealistic"

   دليل سجل النظام (wallet-log.jpg):
   "Photorealistic close-up of a server log terminal screen with
   timestamped entries, dark mode interface, no text, no watermark,
   photorealistic"

   دليل السحب (wallet-withdrawal.jpg):
   "Photorealistic close-up of a financial transaction history screen
   on a laptop, highlighted withdrawal entry, soft indoor lighting,
   no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LOST_WALLET;
  c.briefing.heroCaption = 'CASE 012 — بعد اختفاء 40 مليون جنيه';
  c.conclusiveRequired = 4;
  const h = c.suspects.find(s => s.id === 'hazem');
  if (h) {
    const q = h.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيصمت) "مالك لمحلي إن فيه مشكلة تقنية ممكن تحصل ونصحني أقلل مخاطرتي. أنا سحبت فلوسي، بس ماكنتش عارف إن المشروع كله هينهار الليلة دي."';
    }
  }
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_LOST_WALLET;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='audit_reem_permissions')) c.investigationActions.push({
    id:'audit_reem_permissions', kind:'مراجعة صلاحيات', label:'راجع صلاحيات ريم التقنية',
    description:'قارن أسماء الفريق بقائمة الوصول الفعلية للمحفظة والنظام.',
    requires:['wallet_access'], resultEvidenceIds:['reem_no_access'],
    successText:'مراجعة الصلاحيات حددت بدقة حدود وصول ريم للنظام.'
  });
})();
