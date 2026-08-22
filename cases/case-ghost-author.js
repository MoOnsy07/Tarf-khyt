/* ============================================================
   بيانات قضية: القلم الخفي
   قضية وفاة روائي مشهور فجأة قبل حفل توقيع أهم رواياته، واكتشاف
   إن وراء نجاحه سر كبير محدش كان يعرفه.
   ============================================================ */

const IMG_BASE_GHOST = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/ghost-author/';

const CASE_GHOST_AUTHOR = {
  id: 'ghost-author',
  title: 'القلم الخفي',
  caseNo: 'CASE 009',
  subtitle: 'دار نشر "المدى"، الزمالك، القاهرة',
  coverImg: IMG_BASE_GHOST + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 40,
  investigationPoints: 22,
  teaser: 'روائي مشهور بيموت فجأة قبل حفل توقيع أهم رواياته. وراء نجاحه سر كبير محدش كان يعرفه — ومين اللي كان مستعد يقتل عشان السر ده يفضل مدفون؟',

  isPremium: false,
  categories: ['murder', 'drama'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_GHOST + 'cover.webp',
    heroCaption: 'CASE 009 — ليلة حفل توقيع "الفصل الأخير"',
    text1: 'الروائي الشهير "وليد سامي" كان مستعد لحفل توقيع روايته الجديدة "الفصل الأخير"، اللي المفروض تكون أنجح أعماله على الإطلاق. قبل الحفل بساعة، لقوه ميت في مكتبه فوق دار النشر، من غير أي علامة عنف واضحة على الجسم.',
    text2: 'الطبيب الشرعي الأولي أشار لاحتمال تسمم بمادة بطيئة المفعول اتحطت في مشروبه المفضل. رئيسة دار النشر خايفة من فضيحة تدمر سمعة الدار، فطلبت منك تحقق بسرعة وبهدوء قبل ما الخبر يوصل للإعلام، خصوصًا إن في إشاعات قديمة عن إن وليد مش هو اللي بيكتب رواياته بنفسه.',
    meta: [
      { label:'المجني عليه', value:'وليد سامي — روائي مشهور' },
      { label:'مكان الحادثة', value:'مكتب وليد الخاص، دار نشر المدى' },
      { label:'وقت الحادثة التقريبي', value:'قبل الحفل بساعة تقريبًا' },
      { label:'خيط مهم', value:'إشاعات قديمة عن وجود كاتب شبح وراء نجاحه' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قبل الحفل',
      img: IMG_BASE_GHOST + 'ghost-scene1.jpg',
      text:'دار نشر أنيقة، القاعة تحت مجهزة للحفل، وضيوف بيتجمعوا بالتدريج. وليد فوق في مكتبه، بيراجع خطابه الأخير قبل ما ينزل للجمهور.'
    },
    {
      scene:'المشهد ٢ — الاكتشاف',
      img: IMG_BASE_GHOST + 'ghost-scene2.jpg',
      text:'سكرتيرته بتدخل المكتب تفكّره بالوقت، تلاقيه واقع على مكتبه، وكوباية الشاي المفضلة عنده لسه فيها بقايا مشروب دافئ جنبه.'
    },
    {
      scene:'المشهد ٣ — الصدمة تنتشر',
      img: IMG_BASE_GHOST + 'ghost-scene3.jpg',
      text:'الخبر بينتشر في دار النشر بسرعة، الحفل بيتلغي فورًا، وبيطلبوا من الضيوف يستنوا في القاعة تحت لحد ما الصورة تتضح.'
    },
    {
      scene:'المشهد ٤ — سر قديم',
      img: IMG_BASE_GHOST + 'ghost-scene4.jpg',
      text:'وانت بتفتش مكتبه، بتلاقي مسودة قديمة لرواية "الفصل الأخير" بخط إيد مختلف تمامًا عن خط وليد نفسه — أول خيط يفتح باب سر أكبر بكتير من مجرد جريمة قتل عادية.'
    },
  ],

  suspects: [
    {
      id:'nourhan', name:'نورهان', role:'سكرتيرة وليد الشخصية، أول اللي لقته', img: IMG_BASE_GHOST + 'nourhan.jpg', avatarEmoji:'📝',
      alibi:'قالت إنها كانت بره المكتب بتجهز أوراق الحفل قبل ما تدخل تفكّره.',
      questions:[
        { q:'إزاي لقيتيه بالظبط؟',
          a:'"دخلت أفكّره بالوقت، لقيته واقع على مكتبه من غير حركة، وكوباية الشاي بتاعته لسه دافية جنبه. اتصلت بالإسعاف على طول."' },
        { q:'مين اللي جهّزلوه الشاي عادةً؟', unlockId:'tea_habit',
          a:'"أنا اللي عملتله الشاي قبل ما أدخل ألاقيه، زي كل مرة. بس هو دايمًا بيحليه من برطمان العسل الصغير اللي على مكتبه، والبرطمان كان موجود من قبل ما أعمل الشاي."' },
        { q:'كنتِ عارفة حاجة عن إشاعات الكاتب الشبح؟', unlockId:'ghostwriter_rumor',
          a:'"سمعت الإشاعة دي زي أي حد، بس محدش أكدها رسميًا، ووليد كان دايمًا بينفيها بشكل قاطع."' },
      ],
      confrontations:{
        tea_habit:'أنا حضّرت الشاي زي كل يوم، معرفش حاجة عن العسل خالص.',
        ghostwriter_rumor:'الإشاعة دي سمعتها زي أي حد في الوسط، بس محدش أكدها.'
      }
    },
    {
      id:'hassan', name:'حسن', role:'روائي شاب مغمور، اتهم قديمًا وليد بسرقة أفكاره', img: IMG_BASE_GHOST + 'hassan.jpg', avatarEmoji:'✍️',
      alibi:'قال إنه جه للحفل كضيف عادي بس ماقربش من مكتب وليد خالص.',
      questions:[
        { q:'إيه علاقتك بوليد بالظبط؟', unlockId:'old_accusation',
          a:'"من كام سنة اتهمته إنه استخدم فكرة رواية بعتهاله من غير إذني. هو أنكر وقتها، والموضوع فضل معلق من غير دليل يحسمه."' },
        { q:'ليه إنت هنا الليلة أصلًا؟',
          a:'"جيت أشوف رد فعل الناس على روايته الجديدة، حبيت أتأكد بنفسي هل هو استمر في نفس الأسلوب اللي اتهمته بسرقته ولا لأ."' },
        { q:'قربت من فوق، من مكتبه؟',
          a:'"لأ خالص، فضلت تحت في القاعة طول الوقت، ممكن تسأل أي ضيف تاني."' },
      ],
      confrontations:{
        old_accusation:'الاتهام ده قديم واتنفى رسميًا، مالوش علاقة بموت وليد.'
      }
    },
    {
      id:'mona_editor', name:'منى', role:'رئيسة تحرير دار النشر ومسؤولة مباشرة عن وليد', img: IMG_BASE_GHOST + 'mona.jpg', avatarEmoji:'📚',
      alibi:'قالت إنها كانت في مكتبها بتراجع نسخة أخيرة من الرواية.',
      questions:[
        { q:'إنتِ أول واحدة اكتشفتي مسودة الكاتب الشبح، صح؟', unlockId:'ghostwriter_manuscript',
          a:'"للأسف أيوه، لقيت مسودة قديمة بخط مختلف تمامًا عن خط وليد من كذا شهر، وحسّيت إنها حاجة خطيرة، بس محسمتش الموضوع لحد دلوقتي."' },
        { q:'ليه سكتي عن الاكتشاف ده كل المدة دي؟',
          a:'"خايفة على سمعة الدار كلها. لو الخبر ده طلع، ده كان هيدمر مكانة وليد ودار النشر مع بعض في وقت واحد."' },
        { q:'كنتِ عارفة مين الكاتب الشبح الحقيقي؟', unlockId:'ghost_identity',
          a:'"حاولت أعرف من غير ما أفتح الموضوع رسميًا، ولقيت خيوط بسيطة بتوصل لشخص قريب جدًا من وليد نفسه."' },
      ],
      confrontations:{
        ghostwriter_manuscript:'المسودة دي لقيتها في أوراق وليد، والخط مختلف فعلاً عن خطه.',
        ghost_identity:'وصلت لاسم سامح من خيوط بسيطة، بس محتاجة تأكيد أكتر.'
      }
    },
    {
      id:'tarek', name:'طارق', role:'أخو وليد الأصغر، بيشتغل مدير أعماله', img: IMG_BASE_GHOST + 'tarek.jpg', avatarEmoji:'💰',
      alibi:'قال إنه كان بينظم استقبال الضيوف تحت في القاعة طول الوقت.',
      loseMsg:'طارق كان فعلاً منشغل بتنظيم الحفل تحت في القاعة، وأكتر من ضيف أكدوا وجوده هناك طول الفترة الحرجة. مفيش أي دليل مادي يربطه بمكتب وليد أو بالشاي نفسه.',
      questions:[
        { q:'إيه فايدتك من نجاح "الفصل الأخير"؟',
          a:'"أنا مدير أعماله، نسبتي من الأرباح كانت هتزيد جدًا مع نجاح الرواية دي. موته دلوقتي ضرني ماليًا جدًا، مش العكس."' },
        { q:'كنت عارف بموضوع الكاتب الشبح؟',
          a:'"سمعت شائعات زي أي حد، بس وليد ماكنش بيتكلم معايا عن التفاصيل التقنية للكتابة، أنا شغلي كان الجانب المالي بس."' },
      ]
    },
    {
      id:'sameh_writer', name:'سامح', role:'كاتب حر، اشتغل سرًا مع وليد في رواياته', img: IMG_BASE_GHOST + 'sameh.jpg', avatarEmoji:'🖊️',
      alibi:'قال إنه ما دخلش دار النشر خالص يوم الحفل، وإنه كان في بيته من العصر.',
      questions:[
        { q:'إنت شغال إيه بالظبط؟',
          a:'"كاتب حر وبشتغل على مشاريع مختلفة. ومادخلتش دار النشر أصلًا النهارده، لو ده اللي بتسأل عليه."' },
        { q:'اشتغلت مع وليد قبل كده؟', unlockId:'sameh_past_work',
          a:'(بيتردد) "من زمان، حاجة بسيطة، مساعدة في التحرير بس، مش أكتر من كده."' },
        { q:'مسودة "الفصل الأخير" القديمة دي خط إيد مين؟', requires:['ghostwriter_manuscript'],
          a:'(بيبعد نظره) "معرفش، أنا مليش دعوة بيها."' },
        { q:'حللنا الخط بتاعك، وبيتطابق مع مسودة "الفصل الأخير" — عندك تفسير؟', requires:['sameh_past_work','ghostwriter_manuscript'],
          a:'(بيهدى فجأة) "أيوه أنا كاتبها. وليد وعدني بنسبة من الروايات اللي بعدها، وبعدين بدأ يبعدني ويدّعي إن كل حاجة فكره هو."' },
        { q:'قلت إنك ماجتش الدار النهارده، بس سجل الاستقبال بيحطك هنا العصر، ونفس السم موجود في برطمان العسل اللي على مكتب وليد — تفسر ده إزاي؟', requires:['tea_habit','handwriting_match'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "جيت أقابله قبل الحفل... كنت عايز حقي واسمي يرجعوا. لما رفض وهدد إنه يقطع كل حاجة نهائي، سيبت السم في العسل قبل ما أمشي. كنت عارف إنه هيستخدمه في شايه بعدين."' },
      ],
      confrontations:{
        tea_habit:'أنا معرفش حاجة عن العسل ولا الشاي، أنا مش سكرتيره أصلاً.',
        ghostwriter_manuscript:'المسودة دي ممكن تكون بخطي، بس ده كان شغل تحريري بس مش أكتر.',
        sameh_past_work:'ساعدته تحريريًا زمان، حاجة بسيطة ومفيش داعي نكبرها.',
        handwriting_match:'خطي بيشبه خطوط كتير، ده مش دليل قاطع إني كتبت المسودة دي.',
        ghost_identity:'منى بتحاول تلصق فيا حاجة أنا مالوش دعوة بيها.',
        contradiction_noted_ghost:'جيت الدار قبل الوفاة فعلاً، بس كان لسبب تاني خالص.'
      }
    },
  ],

  evidence: [
    { id:'poison_tea', tag:'من تقرير الطب الشرعي', crit:true, title:'أثر مادة سامة بطيئة في الشاي', img: IMG_BASE_GHOST + 'ghost-teareport.jpg',
      short:'مادة سامة بطيئة المفعول اتحطت في كوباية الشاي',
      full:'التقرير الأولي بيأكد وجود مادة سامة بطيئة المفعول في بقايا الشاي. نفس المادة ظهرت بتركيز أعلى في برطمان العسل الصغير اللي وليد بيستخدمه دايمًا، وده معناه إن السم ما اتحطش في الكوباية وقت تحضيرها، لكنه كان موجود في العسل من قبلها.',
      unlocked:true, order:1 },

    { id:'tea_habit', tag:'من استجواب نورهان وسجل الاستقبال', crit:true, title:'العسل اتلوث قبل تحضير الشاي', img:null,
      short:'نورهان عملت الشاي، لكن السم كان موجود في عسل وليد من قبلها',
      full:'نورهان أكدت إنها هي اللي عملت الشاي، وإن وليد حلّاه من برطمان العسل الموجود على مكتبه. سجل الاستقبال بيكشف إن سامح دخل دار النشر عصر يوم الحفل لمدة قصيرة، رغم إنه قال إنه ماجاش خالص. الزيارة دي حصلت قبل تحضير الشاي بوقت كافي.',
      unlocked:false, order:2 },

    { id:'ghostwriter_rumor', tag:'من إشاعات قديمة', crit:false, title:'إشاعة قديمة عن الكاتب الشبح', img:null,
      short:'إشاعة معروفة في الوسط الأدبي من سنين، محدش أكدها رسميًا',
      full:'الإشاعة دي كانت موجودة في الوسط الأدبي من فترة طويلة، بس محدش قدر يثبتها رسميًا لحد اللحظة دي.',
      unlocked:false, order:3 },

    { id:'ghostwriter_manuscript', tag:'من تفتيش المكتب', crit:true, title:'مسودة قديمة بخط مختلف', img: IMG_BASE_GHOST + 'ghost-manuscript.jpg',
      short:'مسودة "الفصل الأخير" بخط إيد مختلف تمامًا عن خط وليد',
      full:'مسودة قديمة موجودة في درج مقفول جوه مكتب وليد، بخط إيد مختلف تمامًا عن خط وليد المعروف، وبتحتوي على نفس أحداث "الفصل الأخير" بالظبط.',
      unlocked:false, order:4 },

    { id:'old_accusation', tag:'من استجواب حسن', crit:false, title:'اتهام حسن القديم لوليد', img:null,
      short:'اتهام قديم بسرقة فكرة رواية، اتنفى رسميًا وقتها',
      full:'حسن اتهم وليد قديمًا بسرقة فكرة رواية، ووليد نفى الاتهام ده رسميًا وقتها ومفيش أي دليل قوي أثبته.',
      unlocked:false, order:5 },

    { id:'sameh_past_work', tag:'من استجواب سامح', crit:true, title:'اعتراف جزئي بعمل قديم مع وليد', img:null,
      short:'سامح اعترف بمساعدة تحريرية قديمة، بشكل مبهم',
      full:'سامح اعترف بشكل متردد إنه ساعد وليد في التحرير زمان، من غير تفاصيل واضحة عن طبيعة الشغل الحقيقية.',
      unlocked:false, order:6 },

    { id:'handwriting_match', tag:'من تحليل خط اليد', crit:true, title:'تطابق خط اليد بين سامح والمسودة', img: IMG_BASE_GHOST + 'ghost-handwriting.jpg',
      short:'خط سامح بيتطابق تمامًا مع مسودة "الفصل الأخير" القديمة',
      full:'تحليل خط اليد بيوضح تطابق شبه كامل بين خط سامح المعروف وخط مسودة "الفصل الأخير" القديمة الملاقاة في مكتب وليد.',
      unlocked:false, order:7 },

    { id:'ghost_identity', tag:'من تحقيقات منى', crit:true, title:'خيوط منى توصل لهوية الكاتب الشبح', img:null,
      short:'منى وصلت لاسم سامح كمرشح قوي للكاتب الشبح',
      full:'منى، بمحاولاتها الشخصية لفهم الموضوع قبل الجريمة، وصلت لخيوط بتشاور بقوة على سامح كمرشح رئيسي للكاتب الشبح الحقيقي وراء نجاح وليد.',
      unlocked:false, order:8 },

    { id:'contradiction_noted_ghost', tag:'من تحليل التناقضات', crit:true, title:'تناقض في كلام سامح عن علاقته بوليد', img:null,
      short:'قال إنه ماجاش الدار، لكن سجل الاستقبال بيحطه هناك قبل الوفاة',
      full:'سامح قال إنه ما دخلش دار النشر يوم الحفل، لكن سجل الاستقبال بيثبت دخوله عصرًا. مع وجود السم في عسل وليد من قبل تحضير الشاي، الزيارة اللي حاول يخبيها بقت جزء مباشر من طريقة الجريمة.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن أليبي سامح بسجل الاستقبال. فيه كلام واضح ماينفعش يكون صح.',
    resultText: 'التناقض واضح: سامح قال إنه ما دخلش دار النشر يوم الحفل، لكن سجل الاستقبال بيثبت إنه كان هناك عصرًا قبل الوفاة. هو خبّى زيارة مهمة جدًا من التحقيق.',
    resultEvidenceIds: ['contradiction_noted_ghost'],
    statements: [
      { id:'st1', text:'"مادخلتش دار النشر أصلًا النهارده."', source:'سامح — في الاستجواب' },
      { id:'st2', text:'سجل الاستقبال بيثبت دخول سامح دار النشر عصر يوم الحفل.', source:'دليل: سجل الزيارة' },
      { id:'st3', text:'"دخلت أفكّره بالوقت، لقيته واقع على مكتبه."', source:'نورهان — في الاستجواب' },
      { id:'st4', text:'"جيت أشوف رد فعل الناس على روايته الجديدة."', source:'حسن — في الاستجواب' },
      { id:'st5', text:'"كنت بينظم استقبال الضيوف تحت في القاعة طول الوقت."', source:'طارق — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  evidenceCombinations: [
    { parts:['sameh_past_work','ghostwriter_manuscript'], resultId:'handwriting_match' },
  ],

  correctSuspectId: 'sameh_writer',
  conclusiveEvidenceIds: ['poison_tea', 'tea_habit', 'handwriting_match', 'ghost_identity', 'contradiction_noted_ghost'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي ربطت سامح بالجريمة نفسها، مش بس بسر الكاتب الشبح؟',
        options: [
          { id:'a', text:'كذب في أليبيه + زيارته قبل الوفاة + السم الموجود في عسل وليد + تطابق خطه مع المسودة' },
          { id:'b', text:'لأنه ماجاش الحفل خالص' },
          { id:'c', text:'لأنه كاتب مغمور محدش يعرفه' },
        ],
        correctOptionId:'a',
      },
      {
        id:'motive',
        label:'إيه كان الدافع الحقيقي وراء الجريمة؟',
        options: [
          { id:'a', text:'وليد وعد سامح بنسبة من أرباح الروايات الجاية، وبعدين قرر يقطع علاقته بيه ويدّعي إن كل حاجة فكره هو' },
          { id:'b', text:'خلاف شخصي بسيط على مواعيد التسليم' },
          { id:'c', text:'غيرة سامح من شهرة وليد بس' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyhassan',
        label:'ليه حسن كان بريء فعليًا؟',
        options: [
          { id:'a', text:'اتهامه القديم كان بلا دليل قوي، ومفيش أي دليل مادي يربطه بمكتب وليد أو بالشاي نفسه' },
          { id:'b', text:'لأنه روائي مغمور ومحدش هيصدقه لو اتهم' },
          { id:'c', text:'لأنه اعترف بمكانه في الحفل بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة وراء كل الكلمات',
      paragraphs:[
        'سامح كان الكاتب الشبح الحقيقي وراء جزء كبير من نجاح وليد. يوم الحفل راح له دار النشر عصرًا رغم إنه أنكر الزيارة، وحصلت بينهم مواجهة أخيرة على حقه واسمه. قبل ما يمشي، حط المادة السامة في برطمان العسل اللي وليد بيستخدمه في شايه، وهو عارف إن السم بطيء المفعول وإن نورهان هتعمل الشاي بعدين بشكل طبيعي.',
        'تطابق خط اليد كشف الدافع والسر القديم، لكن اللي ربطه بالجريمة فعلًا كان سجل زيارته اللي حاول يخبيها، ووجود السم في العسل قبل تحضير الشاي. لما اتواجه بالسلسلة كاملة، اعترف إنه استغل عادة وليد اليومية عشان الجريمة تحصل بعد ما يكون هو مشي.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية سامح، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: المسودة القديمة، تحليل خط اليد، واعترافه الجزئي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق وسره معاه. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "القلم الخفي"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant publishing house office at
   dusk, an empty writer's desk with a half-finished cup of tea and
   scattered manuscript pages, warm desk lamp lighting, moody
   atmosphere, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (ghost-scene1.jpg):
   "Photorealistic shot of a book launch event setup in an elegant
   hall, rows of chairs, a stage with a podium and book display,
   warm ambient lighting, no people visible yet, photorealistic,
   no text, no watermark"

   المشهد ٢ (ghost-scene2.jpg):
   "Photorealistic shot of a middle-aged man slumped over a wooden
   desk in a private office, a teacup beside him, dim warm lighting,
   dramatic composition, photorealistic, no text, no watermark"

   المشهد ٣ (ghost-scene3.jpg):
   "Photorealistic shot of shocked people gathered in a hallway
   outside an office door, blurred motion, dim indoor lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (ghost-scene4.jpg):
   "Photorealistic close-up of an old handwritten manuscript page on
   a wooden desk under lamp light, different handwriting style
   visible, mysterious atmosphere, photorealistic, no text, no
   watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   نورهان (nourhan.jpg):
   "Photorealistic portrait of a young Egyptian female secretary,
   formal office attire, headscarf, shocked distressed expression,
   standing in a publishing office, warm indoor office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   حسن (hassan.jpg):
   "Photorealistic portrait of a young Egyptian male novelist, casual
   intellectual clothing, glasses, bitter resentful expression,
   sitting in a modest study, warm desk lamp lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   منى (mona.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female
   publishing editor-in-chief, formal professional attire, composed
   authoritative expression, sitting in a publishing house office,
   warm indoor lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   طارق (tarek.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man in a
   business suit, confident calculating expression, standing in a
   publishing office, professional lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سامح (sameh.jpg):
   "Photorealistic portrait of a reserved Egyptian male writer,
   casual modest clothing, nervous evasive expression, sitting in a
   dim study, warm desk lamp lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل تقرير الشاي (ghost-teareport.jpg):
   "Photorealistic close-up of a forensic lab report with a teacup
   sample beside it, clinical lighting, no text, no watermark,
   photorealistic"

   دليل المسودة (ghost-manuscript.jpg):
   "Photorealistic close-up of an old handwritten manuscript with
   visible different handwriting, aged paper texture, desk lamp
   lighting, no text, no watermark, photorealistic"

   دليل خط اليد (ghost-handwriting.jpg):
   "Photorealistic close-up comparison of two handwriting samples side
   by side on a desk, magnifying glass nearby, forensic analysis
   style, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_GHOST_AUTHOR;
  const s = c.suspects.find(x => x.id === 'sameh_writer');
  if (s) {
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "جيت أقابله فعلًا عشان أطالب بحقي واسمي، واتخانقنا بالكلام. موضوع السم في العسل خطير، لكن وجودي هنا وكوني الكاتب الحقيقي مش معناه إني حطيته."';
    }
  }
  c.conclusiveRequired = 4;
})();
