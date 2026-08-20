/* ============================================================
   بيانات قضية: الطبخة الأخيرة
   قضية جريمة قتل بالتسميم في استوديو تصوير برنامج مسابقات طبخ شهير،
   في ليلة تصوير الحلقة النهائية على الهواء.
   ============================================================ */

const IMG_BASE_LASTDISH = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-dish/';

const CASE_LAST_DISH = {
  id: 'last-dish',
  title: 'الطبخة الأخيرة',
  caseNo: 'CASE 010',
  subtitle: 'استوديو برنامج "شيف البلد"، مدينة الإنتاج الإعلامي',
  coverImg: IMG_BASE_LASTDISH + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 32,
  investigationPoints: 20,
  teaser: 'فينالست في برنامج طبخ شهير بيتسمم في ليلة تصوير الحلقة النهائية على الهواء. كل حد في المطبخ كان قادر يوصل للطبق، بس مين كان عنده الدافع الحقيقي؟',

  isPremium: false,
  categories: ['murder', 'thriller'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTDISH + 'cover.webp',
    heroCaption: 'CASE 007 — ليلة الحلقة النهائية، على الهواء مباشرة',
    text1: 'برنامج "شيف البلد" كان بيصور الحلقة النهائية على الهواء، وعادل هو المتسابق الأخير اللي وصل للنهائي. قدّم طبقه قدام لجنة التحكيم، والشيف تامر داق منه على الكاميرا. بعد دقايق قليلة، بدأ يتعب قدام الجمهور ووقع من على كرسيه.',
    text2: 'التصوير اتوقف على طول، والإسعاف وصل بعد دقايق، بس الأطباء أكدوا إن في مادة سامة في الطبق نفسه — مش حساسية ولا أزمة قلبية. المنتج المنفذ للبرنامج، خايف من الفضيحة والقضية، طلب منك تحقق بهدوء قبل ما الخبر يتسرب للإعلام ويحوّل البرنامج لكارثة.',
    meta: [
      { label:'المجني عليه', value:'الشيف تامر — حكم أول في البرنامج' },
      { label:'مكان الحادثة', value:'استوديو التصوير، طاولة التحكيم' },
      { label:'وقت الحادثة', value:'أثناء التصوير المباشر، حوالي 9:40 مساءً' },
      { label:'طلب التحقيق', value:'المنتج المنفذ للبرنامج' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحلقة النهائية',
      img: IMG_BASE_LASTDISH + 'lastdish-scene1.jpg',
      text:'استوديو مضاء بأضواء التصوير، جمهور بيصفق، وعادل واقف قدام طاولة التحكيم بيقدم طبقه الأخير: سمك مشوي بصلصة أعشاب خاصة كان بيحضرها من الصبح.'
    },
    {
      scene:'المشهد ٢ — اللقمة',
      img: IMG_BASE_LASTDISH + 'lastdish-scene2.jpg',
      text:'الشيف تامر بيدوق الطبق قدام الكاميرا زي كل مرة. بعد كام دقيقة وهو لسه على الهوا، يبدأ يحس بدوخة وضيق نفس، وبعدين يقع من على الكرسي قدام الجمهور.'
    },
    {
      scene:'المشهد ٣ — الفوضى',
      img: IMG_BASE_LASTDISH + 'lastdish-scene3.jpg',
      text:'صراخ، كاميرات بتتقفل بسرعة، طاقم الإنتاج بيندفع للمكان. عادل واقف صدمان، والطبق نفسه اتصادر فورًا قبل ما حد يقرب منه تاني.'
    },
    {
      scene:'المشهد ٤ — التحقيق يبدأ',
      img: IMG_BASE_LASTDISH + 'lastdish-scene4.jpg',
      text:'المنتج المنفذ قافل الاستوديو مؤقتًا، ومحدش يقدر يخرج من المبنى لحد ما تحقق. عندك كواليس البرنامج كله تحت عينك — الحكام، المتسابقين، وفريق المطبخ.'
    },
  ],

  suspects: [
    {
      id:'adel', name:'عادل', role:'الفينالست، صاحب الطبق', img: IMG_BASE_LASTDISH + 'adel.jpg', avatarEmoji:'👨‍🍳',
      alibi:'قال إن تحضير الطبق وتقديمه كانوا متصورين، لكن المكونات وزجاجة زيت الأعشاب كانوا في منطقة التجهيز المشتركة وقت الاستراحة.',
      questions:[
        { q:'مين كان قريب من الطبق قبل ما يتقدم؟',
          a:'"أنا اللي ركبت الطبق النهائي قدام الكاميرا، بس المكونات كانت جاهزة من قبلها. آخر حاجة حطيتها كانت شوية من زيت الأعشاب من الزجاجة المشتركة قبل ما الطبق يطلع للتحكيم."' },
        { q:'إنت مش هتستفيد لو الشيف تامر مات، صح؟', unlockId:'motive_note',
          a:'"أبدًا! أنا محتاج أفوز بالمسابقة، مش أخسرها كلها بجريمة! لو حصلت حاجة لتامر، البرنامج كله ممكن يتلغي."' },
        { q:'حد من الفريق كان زعلان منك أو من تامر؟',
          a:'"في شيف تاني كان متأهل قبلي في الموسم اللي فات وطلع بره في اللحظة الأخيرة بقرار من تامر نفسه. سمعت إنه لسه زعلان من الموضوع."' },
      ]
    },
    {
      id:'noha', name:'نهى', role:'الحَكَم التانية في البرنامج', img: IMG_BASE_LASTDISH + 'noha.jpg', avatarEmoji:'🧑‍🍳',
      alibi:'قالت إنها كانت قاعدة جنب تامر طول الوقت وشافت اللي حصل بعينها.',
      questions:[
        { q:'كان في أي خلاف بينك وبين تامر مؤخرًا؟', unlockId:'contract_dispute',
          a:'"أيوه، كان بينّا خلاف كبير. تامر كان ضغط عشان مايتجددليش الموسم الجاي بنفس الشروط، وكان ممكن أخرج من البرنامج خالص. اتخانقنا على الموضوع، بس ده مش معناه إني أقتله."' },
        { q:'لاحظتي حد قريب من الطبق قبل التصوير؟', unlockId:'kitchen_access',
          a:'"منطقة المطبخ كانت مفتوحة لناس كتير وقت الاستراحة. بس أنا شخصيًا ما دخلتش ثلاجة المكونات ولا لمست زجاجة زيت عادل."' },
        { q:'إيه اللي حسيتيه لما تامر وقع؟',
          a:'"اتجمدت. حاولت أساعده بس الوضع كان سريع جدًا وده كان مخيف أوي، صراحة لسه مش مصدقة اللي حصل."' },
      ]
    },
    {
      id:'yehia', name:'يحيى', role:'شيف سابق خرج من المسابقة الموسم اللي فات', img: IMG_BASE_LASTDISH + 'yehia.jpg', avatarEmoji:'😠',
      alibi:'قال إنه كان في الاستوديو كضيف بس مش قريب من المطبخ خالص.',
      loseMsg:'يحيى كان فعلاً زعلان من تامر، بس كل الأدلة بتأكد إنه ماكانش قريب من المطبخ ولا الطبق نفسه في أي لحظة. اتهامه هيكون مبني على دافع بس من غير أي فرصة فعلية.',
      questions:[
        { q:'إنت ليه موجود في الاستوديو أصلاً النهارده؟',
          a:'"جيت أتفرج على الفينال، البرنامج ده كان جزء من حياتي سنة كاملة، حبيت أشوف نهايته حتى لو مش أنا اللي وصلتله."' },
        { q:'سمعنا إنك كنت زعلان من تامر أوي بسبب خروجك من الموسم اللي فات؟',
          a:'"زعلان أيوه، وممكن أكون قلت كلام قاسي وقتها في لايف على السوشيال ميديا. بس ده مايخليش الواحد يقتل حد يا عم."' },
        { q:'اقتربت من المطبخ في أي وقت النهارده؟', unlockId:'yehia_seen_far',
          a:'"لأ خالص، كنت قاعد في الجمهور من الأول، ممكن تسأل أي حد قاعد جنبي."' },
      ]
    },
    {
      id:'mostafa', name:'مصطفى', role:'مسؤول المطبخ والتجهيزات', img: IMG_BASE_LASTDISH + 'mostafa.jpg', avatarEmoji:'🧊',
      alibi:'قال إنه كان مشغول بترتيب أدوات الكواليس وتجهيز منطقة المطبخ وقت التصوير.',
      questions:[
        { q:'مين اللي بيدخل ويخرج من ثلاجة المكونات عادةً؟', unlockId:'fridge_log',
          a:'"أي حد من الفريق ليه صلاحية، بس فيه سجل دخول بالكارت. ممكن تشوفوه بنفسكم."' },
        { q:'لاحظت أي حاجة غريبة في تجهيز طبق عادل؟',
          a:'"قبل التقديم لاحظت إن زجاجة زيت الأعشاب مش في مكانها المعتاد، والغطا كمان كان مقفول بشكل مختلف شوية. خدت بالي بس ماوقفتش التصوير عشان كده."' },
        { q:'إنت كنت لوحدك وقت ما الطبق كان على العربية بره المطبخ؟',
          a:'"مش دايمًا، كنت بدخل وأخرج، مقدرش أقول إني كنت راقبها 100 بالمية طول الوقت."' },
      ]
    },
    {
      id:'salma', name:'سلمى', role:'منتجة منفذة مساعدة، مسؤولة عن جدول التصوير', img: IMG_BASE_LASTDISH + 'salma.jpg', avatarEmoji:'📋',
      alibi:'قالت إنها كانت في غرفة التحكم بتراقب الكاميرات طول الوقت.',
      loseMsg:'سلمى كانت فعلاً في غرفة التحكم، وتسجيلات الكاميرات الداخلية بتأكد وجودها هناك طول الفترة الحرجة. مفيش أي دليل مادي يربطها بالمطبخ أو بالطبق نفسه.',
      questions:[
        { q:'مين اللي حدد توقيت خروج الطبق للتصوير بالظبط؟',
          a:'"أنا اللي بحدد الجدول العام، بس اللي بيحضر الطبق ويطلعه هو الشيف نفسه وفريق المطبخ، مش أنا شخصيًا."' },
        { q:'في أي ضغط شغل غريب حصل قبل الحلقة؟',
          a:'"كان في ضغط عادي بس زي كل حلقة نهائية، محدش كان متضايق بشكل غريب على قد ما أنا شايفة."' },
      ]
    },
  ],

  evidence: [
    { id:'poison_report', tag:'من تقرير الطب الشرعي', crit:true, title:'تحليل المادة السامة', img: IMG_BASE_LASTDISH + 'lastdish-report.jpg',
      short:'مادة سامة من نوع نباتي مركّز اتحطت في صلصة الأعشاب',
      full:'التقرير الأولي بيأكد إن المادة السامة مركّزة ومن أصل نباتي، وإن أعلى تركيز ليها كان في زيت الأعشاب اللي اتحط كلمسة أخيرة على الطبق قبل التقديم. النوع ده ممكن تبدأ أعراضه خلال دقايق، وده متوافق مع توقيت انهيار تامر على الهواء.',
      unlocked:true, order:1 },

    { id:'contract_dispute', tag:'من استجواب نهى', crit:true, title:'خلاف على العقد بين نهى وتامر', img:null,
      short:'تامر كان بيدفع ناحية استبعاد نهى أو تقليل عقدها في الموسم الجديد',
      full:'نهى اعترفت إن تامر كان بيدفع ناحية خروجها من الموسم الجاي أو تجديد عقدها بشروط أسوأ بكتير. الخلاف كان مالي ومهني، وكان ممكن يكلّفها مكانها في البرنامج وعقود إعلانية مرتبطة بظهورها فيه.',
      unlocked:false, order:2 },

    { id:'fridge_log', tag:'من سجل الدخول', crit:true, title:'سجل دخول ثلاجة المكونات', img:null,
      short:'نهى دخلت ثلاجة المكونات قبل التقديم بحوالي نص ساعة',
      full:'سجل الكارت بيوضح إن نهى دخلت ثلاجة المكونات لوحدها قبل تقديم الطبق بحوالي نص ساعة. ده مهم لأنها قالت إنها ما دخلتش الثلاجة أصلًا، وكمان دورها كحَكَم ماكانش محتاج دخول منطقة تخزين مكونات المتسابقين.',
      unlocked:false, order:3 },

    { id:'kitchen_access', tag:'من شهادة نهى', crit:false, title:'المطبخ كان مفتوح للجميع', img:null,
      short:'محدش كان بيراقب المطبخ في ساعة الاستراحة',
      full:'نهى قالت إن منطقة المطبخ كانت مفتوحة لناس كتير وقت الاستراحة. الكلام ده صحيح جزئيًا، لكن ثلاجة المكونات نفسها كانت بتتفتح بالكارت، يعني الدخول ليها متسجل بالاسم والتوقيت.',
      unlocked:false, order:4 },

    { id:'yehia_seen_far', tag:'من شهادة جمهور', crit:false, title:'يحيى كان بعيد عن المطبخ طول الوقت', img:null,
      short:'شهود مؤكدين وجوده في الجمهور فقط',
      full:'أكتر من شخص من الجمهور أكدوا إن يحيى كان قاعد في مكانه طول فترة التصوير قبل الحادثة ومقربش من منطقة المطبخ خالص.',
      unlocked:false, order:5 },

    { id:'motive_note', tag:'من استجواب عادل', crit:false, title:'دافع عادل ضعيف', img:null,
      short:'عادل مالوش أي مصلحة في موت تامر',
      full:'عادل أكد إن فوزه بالمسابقة كان معتمد على استمرار البرنامج نفسه، يعني موت الحكم الأساسي كان هيضره هو شخصيًا أكتر من أي حد. الدافع ضده ضعيف جدًا منطقيًا.',
      unlocked:false, order:6 },

    { id:'oil_bottle_moved', tag:'من شهادة مصطفى', crit:true, partial:true, title:'زجاجة زيت الأعشاب اتحركت من مكانها', img: IMG_BASE_LASTDISH + 'lastdish-oil.jpg',
      short:'زجاجة الزيت اتحركت من مكانها قبل التقديم',
      full:'مصطفى لاحظ قبل التقديم إن زجاجة زيت الأعشاب اللي عادل بيستخدمها كلمسة أخيرة اتحركت من مكانها المعتاد، والغطا كان راكب بشكل مختلف. ملاحظة صغيرة، لكنها بتحدد إن حد تعامل مع الزجاجة قبل ما عادل يستخدمها.',
      unlocked:false, order:7 },

    { id:'noha_prints', tag:'من فحص البصمات', crit:true, title:'بصمات نهى على زجاجة الزيت', img:null,
      short:'بصمات نهى موجودة على الغطا وعنق زجاجة الزيت',
      full:'الفحص الفني لقى بصمات نهى على الغطا وعلى الجزء القريب من عنق الزجاجة، مش مجرد لمسة عابرة على جسمها الخارجي. وده يناقض كلامها إنها ما لمستش الزجاجة أصلًا.',
      unlocked:false, order:8 },

    { id:'contradiction_noted_lastdish', tag:'من تحليل التناقضات', crit:true, title:'تناقض في كلام نهى عن الثلاجة', img:null,
      short:'قالت إنها ما دخلتش الثلاجة، والسجل بيثبت دخولها',
      full:'نهى قالت صراحة إنها ما دخلتش ثلاجة المكونات ولا لمست زجاجة الزيت، لكن سجل الكارت بيثبت دخولها قبل التقديم بنص ساعة، والبصمات بتحط إيدها على نفس الزجاجة اللي ظهر فيها أعلى تركيز للسم.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن كلام نهى بسجل الدخول. فيه تصريح واضح ماينفعش يكون صح مع الدليل.',
    resultText: 'التناقض واضح: نهى قالت إنها ما دخلتش ثلاجة المكونات، لكن سجل الكارت بيثبت دخولها لوحدها قبل تقديم الطبق بنص ساعة.',
    resultEvidenceIds: ['contradiction_noted_lastdish'],
    statements: [
      { id:'st1', text:'"أنا شخصيًا ما دخلتش ثلاجة المكونات ولا لمست زجاجة زيت عادل."', source:'نهى — في الاستجواب' },
      { id:'st2', text:'سجل الكارت بيوضح دخول نهى لثلاجة المكونات لوحدها قبل التصوير بنص ساعة.', source:'دليل: سجل دخول ثلاجة المكونات' },
      { id:'st3', text:'"جيت أتفرج على الفينال، البرنامج ده كان جزء من حياتي سنة كاملة."', source:'يحيى — في الاستجواب' },
      { id:'st4', text:'"كنت أنا وبس اللي بلمس الطبق، بس الطبخة كانت جاهزة من ساعة."', source:'عادل — في الاستجواب' },
      { id:'st5', text:'"كنت في غرفة التحكم بأراقب الكاميرات طول الوقت."', source:'سلمى — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  evidenceCombinations: [
    { parts:['oil_bottle_moved','noha_prints'], resultId:'contradiction_noted_lastdish' },
  ],

  correctSuspectId: 'noha',
  conclusiveEvidenceIds: ['fridge_log', 'oil_bottle_moved', 'noha_prints', 'contract_dispute', 'contradiction_noted_lastdish'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن نهى هي الفاعلة؟',
        options: [
          { id:'a', text:'بصماتها على زجاجة الزيت + سجل دخولها الثلاجة لوحدها + الخلاف المالي مع تامر' },
          { id:'b', text:'لأنها كانت قاعدة جنبه وقت ما وقع' },
          { id:'c', text:'لأنها بكت لما اتسألت' },
        ],
        correctOptionId:'a',
      },
      {
        id:'motive',
        label:'إيه كان الدافع الأساسي عند نهى؟',
        options: [
          { id:'a', text:'تامر كان بيدفع ناحية استبعادها من الموسم الجاي وخسارتها للعقد ومكاسب مرتبطة بالبرنامج' },
          { id:'b', text:'الغيرة من نجاح عادل' },
          { id:'c', text:'مفيش دافع واضح خالص' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyadel',
        label:'ليه عادل كان بريء فعليًا؟',
        options: [
          { id:'a', text:'مالوش أي دافع منطقي — فوزه بيعتمد على استمرار البرنامج نفسه' },
          { id:'b', text:'لأنه كان بعيد عن المطبخ طول اليوم' },
          { id:'c', text:'لأنه اعترف بمكانه بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'السم كان في اللمسة الأخيرة',
      paragraphs:[
        'نهى كانت عارفة إن تامر بيدفع ناحية استبعادها من الموسم الجاي، وإن القرار هيضرب عقدها ووجودها الإعلامي. قبل التقديم دخلت ثلاجة المكونات، عبثت بزجاجة زيت الأعشاب، وبعدها عادل استخدم نفس الزيت كلمسة أخيرة على طبقه قدام الكاميرا من غير ما يعرف إن فيه سم.',
        'الخطة كانت تخلي الشبهة تقع على طبق عادل نفسه، لكن سجل دخول الثلاجة، وبصمات نهى على الغطا وعنق الزجاجة، وتركيز السم في زيت الأعشاب قلبوا الصورة. بعد مواجهتها بكذبتها عن دخول الثلاجة، اعترفت. البرنامج اتوقف لحين انتهاء التحقيق، وعادل اتشال رسميًا من دائرة الشبهة.'
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية نهى، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: سجل دخول الثلاجة، بصمات الزيت، والخلاف على العقد، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعلة الحقيقية فضلت طليقة داخل نفس فريق العمل. الأدلة كانت بتشاور بوضوح ناحية نهى من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الطبخة الأخيرة"

   الغلاف (cover.webp):
   "Photorealistic overhead shot of a TV cooking competition studio set,
   bright stage lighting, a judges' table with an overturned chair,
   a plated gourmet dish abandoned on the counter, dramatic tension,
   documentary photography style, no text, no watermark, photorealistic"

   المشهد ١ (lastdish-scene1.jpg):
   "Photorealistic wide shot of a TV cooking show finale, a young Egyptian
   chef contestant presenting a plated fish dish to judges under bright
   studio lights, audience blurred in background, photorealistic,
   no text, no watermark"

   المشهد ٢ (lastdish-scene2.jpg):
   "Photorealistic dramatic shot of a middle-aged male judge chef in
   distress at a TV studio judging table, hand clutching his throat,
   studio lights, motion blur, photorealistic, no text, no watermark"

   المشهد ٣ (lastdish-scene3.jpg):
   "Photorealistic chaotic scene in a TV studio, crew members rushing,
   cameras being shut off, blurred motion, dramatic lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (lastdish-scene4.jpg):
   "Photorealistic shot of a closed TV production studio at night,
   empty hallway with a 'no exit' sign, security guard silhouette,
   moody lighting, photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   عادل (adel.jpg):
   "Photorealistic portrait of a young Egyptian male chef, white
   chef uniform, exhausted anxious expression, standing in a TV
   cooking studio kitchen, professional TV studio lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   نهى (noha.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female TV
   cooking show judge, chef jacket, composed critical expression,
   standing in a TV studio kitchen, professional TV studio lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   يحيى (yehia.jpg):
   "Photorealistic portrait of a young Egyptian male former chef
   contestant, casual chef-style clothing, bitter resentful
   expression, standing near a TV studio kitchen, professional TV
   studio lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   مصطفى (mostafa.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male kitchen
   staff manager, kitchen uniform, watchful busy expression, standing
   among cooking equipment, professional TV studio lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   سلمى (salma.jpg):
   "Photorealistic portrait of a young Egyptian female assistant
   producer, headset around neck, smart casual production crew
   clothing, stressed focused expression, standing in a TV studio,
   professional TV studio lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل تقرير التسمم (lastdish-report.jpg):
   "Photorealistic close-up of a forensic lab report document with
   chemical analysis charts, a small vial of herb sauce sample next to it,
   clinical lighting, no text, no watermark, photorealistic"

   دليل زجاجة الزيت (lastdish-oil.jpg):
   "Photorealistic close-up of a glass bottle of herb-infused oil on a
   professional kitchen counter, soft studio lighting, shallow depth
   of field, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LAST_DISH;
  c.briefing.heroCaption = 'CASE 010 — ليلة الحلقة النهائية، على الهواء مباشرة';
  c.conclusiveRequired = 4;
  if (c.contradictionPuzzle) {
    c.contradictionPuzzle.resultText = 'نهى قالت إنها ما دخلتش الثلاجة، بينما سجل الكارت يثبت دخولها قبل التقديم بنص ساعة. ده يكسر جزء من روايتها، لكنه لازم يتقارن بالبصمات والدافع وباقي الأدلة.';
  }
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_LAST_DISH;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='inspect_oil_station')) c.investigationActions.push({
    id:'inspect_oil_station', kind:'فحص مسرح', label:'افحص منطقة تجهيز طبق عادل',
    description:'راجع المكونات والأدوات اللي اتلمست قبل خروج الطبق للتحكيم.',
    requires:['poison_report'], resultEvidenceIds:['oil_bottle_moved'],
    successText:'الفحص أثبت إن زجاجة الزيت اتعامل معاها حد قبل التقديم.'
  });
  if (!c.investigationActions.some(a=>a.id==='lift_oil_prints')) c.investigationActions.push({
    id:'lift_oil_prints', kind:'بصمات', label:'ارفع البصمات من زجاجة الزيت',
    description:'بعد ما الزجاجة بقت محل شك، ابعتها للفحص الجنائي بدل انتظار دليل من الاستجواب.',
    requires:['oil_bottle_moved'], resultEvidenceIds:['noha_prints'],
    successText:'نتيجة فحص البصمات وصلت واتضافت لملف القضية.'
  });
})();
