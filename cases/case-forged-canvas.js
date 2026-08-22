/* ============================================================
   بيانات قضية: اللوحة المزيفة
   قضية قتل صاحب جاليري فني في ليلة افتتاح معرض بيضم لوحة أثرية
   نادرة، بعد ما اكتشف إنها مزوّرة.
   ============================================================ */

const IMG_BASE_FORGED = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/forged-canvas/';

const CASE_FORGED_CANVAS = {
  id: 'forged-canvas',
  title: 'اللوحة المزيفة',
  caseNo: 'CASE 008',
  subtitle: 'جاليري "الأفق"، وسط البلد، القاهرة',
  coverImg: IMG_BASE_FORGED + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 21,
  teaser: 'صاحب جاليري بيتقتل ليلة افتتاح معرض بيضم لوحة أثرية نادرة، بعد ما اكتشف إنها مزوّرة. مين في دايرة معرفته كان مستعد يقتل عشان يخبي السر ده؟',

  isPremium: false,
  categories: ['murder', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FORGED + 'cover.webp',
    heroCaption: 'CASE 008 — ليلة افتتاح المعرض',
    text1: 'صاحب جاليري "الأفق"، "منير رشدي"، كان بيفتتح أهم معرض في تاريخ الجاليري: لوحة أثرية نادرة قال إنه لقاها في مزاد خاص بره مصر. قبل الافتتاح بساعة، اتصل بمساعدته وهو متوتر جدًا وقال له "اللوحة مش أصلية... لازم نوقف كل حاجة دلوقتي".',
    text2: 'بعد نص ساعة، لقوا منير مقتول في مكتبه الخاص جوه الجاليري. الباب كان مقفول ومحدش بيرد، ولما الأمن فتحه بمفتاح الطوارئ لقوه واقع جوه. اللوحة نفسها كانت اتشالت من القاعة قبلها بدقايق عشان منير يفحصها في مكتبه، وبعد الجريمة اختفت هي كمان. المحقق المسؤول عن أمن المعرض طلب منك تدخل قبل ما الشرطة الرسمية توصل، عشان تفهم اللي حصل من جوه دايرة الفن الضيقة دي.',
    meta: [
      { label:'المجني عليه', value:'منير رشدي — صاحب جاليري الأفق' },
      { label:'مكان الحادثة', value:'مكتب منير الخاص، جوه الجاليري' },
      { label:'وقت الحادثة التقريبي', value:'قبل الافتتاح بحوالي 25 دقيقة' },
      { label:'الدليل المفقود', value:'اللوحة الأثرية نفسها' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — التحضير للافتتاح',
      img: IMG_BASE_FORGED + 'forged-scene1.jpg',
      text:'جاليري فني أنيق، ضيوف بيتجمعوا في القاعة الرئيسية، واللوحة الأثرية معلقة في مكان مضاء بشكل خاص وسط اهتمام واضح من كل الحاضرين.'
    },
    {
      scene:'المشهد ٢ — المكالمة الأخيرة',
      img: IMG_BASE_FORGED + 'forged-scene2.jpg',
      text:'منير بيتصل بمساعده من مكتبه، صوته مرتجف: "اللوحة مش أصلية، اكتشفت الموضوع دلوقتي بس، لازم نوقف كل حاجة." المكالمة بتتقطع فجأة.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_FORGED + 'forged-scene3.jpg',
      text:'الباب مقفول ومحدش بيرد. الأمن بيفتحه بمفتاح الطوارئ، يلاقوا منير على الأرض والمكتب مقلوب كأن حصلت مشادة. واللوحة اللي كان دخلها المكتب عشان يفحصها اختفت هي كمان.'
    },
    {
      scene:'المشهد ٤ — التحقيق يبدأ',
      img: IMG_BASE_FORGED + 'forged-scene4.jpg',
      text:'كل الضيوف اتمنعوا من الخروج لحد ما التحقيق يخلص. عندك دايرة صغيرة من الناس اللي كانوا قريبين من منير ومن اللوحة الليلة دي.'
    },
  ],

  suspects: [
    {
      id:'nadia', name:'نادية', role:'مساعدة منير الشخصية ومديرة الجاليري', img: IMG_BASE_FORGED + 'nadia.jpg', avatarEmoji:'🖼️',
      alibi:'قالت إنها كانت بتستقبل الضيوف في القاعة الرئيسية وقت المكالمة.',
      questions:[
        { q:'إيه اللي قاله منير بالظبط في المكالمة؟', unlockId:'call_log',
          a:'"قال إن اللوحة مش أصلية واكتشف الموضوع دلوقتي بس، وطلب مني أوقف الافتتاح فورًا. حسيت إنه خايف من حاجة أكبر من مجرد تزوير عادي."' },
        { q:'مين غيرك كان يعرف تفاصيل مصدر اللوحة؟', unlockId:'source_docs',
          a:'"أنا ومنير بس كنا عارفين تفاصيل المصدر بدقة. باقي الفريق كانوا عارفين إن فيه لوحة نادرة بس مش أكتر من كده."' },
        { q:'ليه محدش سمعك أو شافك قريبة من المكتب؟',
          a:'"كنت في القاعة طول الوقت باستقبل الضيوف. تقدر تسأل أي حد من الحاضرين، ناس كتير شافوني هناك."' },
      ],
      confrontations:{
        call_log:'منير قالي إن اللوحة مزوّرة فعلاً قبل ما يموت بدقايق، وأنا لسه في صدمة.',
        source_docs:'المصدر ده كان معروف زمان، بس معرفش إن اللوحة دي مزوّرة.'
      }
    },
    {
      id:'karim', name:'كريم', role:'مقيّم فني مستقل، جه خصيصًا لتقييم اللوحة', img: IMG_BASE_FORGED + 'karim.jpg', avatarEmoji:'🔍',
      alibi:'قال إنه كان في مكتبة الجاليري بيراجع أوراق قديمة عن اللوحة.',
      questions:[
        { q:'إنت اللي كشفت إن اللوحة مزوّرة، صح؟', unlockId:'expert_report',
          a:'"أيوه، قلت لمنير من ساعتين تقريبًا إن فيه شكوك قوية في أصالة اللوحة، وطلبت منه ياخد قراره بنفسه قبل الافتتاح."' },
        { q:'استفدت إيه من كشف التزوير ده؟',
          a:'"سمعتي المهنية، أنا معروف بدقتي في التقييم، لو سكت وطلعت اللوحة مزوّرة بعدين، ده كان هيدمر اسمي في السوق كله."' },
        { q:'قربت من مكتب منير في الساعة الأخيرة؟',
          a:'"لأ، فضلت في مكتبة الجاليري أراجع أوراق المصدر وسلسلة ملكية اللوحة عشان أوثّق تقريري."' },
      ],
      confrontations:{
        expert_report:'أنا أبلغت منير بشكوكي قبل الافتتاح، وده كان شغلي بالظبط.'
      }
    },
    {
      id:'laila', name:'ليلى', role:'جامعة لوحات ومشترية محتملة كانت مهتمة باللوحة', img: IMG_BASE_FORGED + 'laila.jpg', avatarEmoji:'💼',
      alibi:'قالت إنها كانت بتتفرج على أعمال تانية في القاعة الجانبية.',
      loseMsg:'ليلى كانت فعلاً مهتمة باللوحة وحصل بينها وبين منير خلاف بسيط على السعر، بس مفيش أي دليل مادي يربطها بمكتبه وقت الجريمة، والشهود بيأكدوا وجودها في القاعة الجانبية طول الوقت.',
      questions:[
        { q:'كنتِ ناوية تشتري اللوحة؟',
          a:'"أيوه، كنت مستعدة أدفع مبلغ كبير جدًا، اللوحة دي كانت هتكمل مجموعتي الخاصة بشكل مثالي."' },
        { q:'اتخانقتي مع منير على السعر؟', unlockId:'price_dispute',
          a:'"كان في نقاش حاد شوية على السعر النهائي، بس ده بيحصل عادي في عالم المزادات، مفيش داعي نوصله لمستوى الجريمة."' },
        { q:'حد شافك بره القاعة الرئيسية؟',
          a:'"أيوه، كنت بتكلم مع أكتر من ضيف في القاعة الجانبية، ممكن يأكدوا كلامي بسهولة."' },
      ],
      confrontations:{
        price_dispute:'الخلاف ده كان على السعر بس، نقاش تجاري عادي مافيهوش عداوة.'
      }
    },
    {
      id:'sherif', name:'شريف', role:'شريك منير القديم في الجاليري، خرج من الشراكة من سنتين', img: IMG_BASE_FORGED + 'sherif.jpg', avatarEmoji:'🥃',
      alibi:'قال إنه جه كضيف يشوف اللوحة، وأكد إنه ماقربش من مكتب منير وقت الليلة دي.',
      questions:[
        { q:'ليه خرجت من الشراكة مع منير أصلاً؟', unlockId:'old_partnership',
          a:'"خلاف مالي كبير على أرباح الجاليري، منير استحوذ على معظم الحصص بطريقة حسيتها مش عادلة وقتها، وطلعت من غير ما آخد حقي بالكامل."' },
        { q:'ليه إنت هنا الليلة أصلًا؟',
          a:'"جيت أشوف اللوحة، سمعت إنها استثنائية. فضلت وسط الضيوف وماقربتش من مكتب منير خالص."' },
        { q:'مصدر اللوحة ده مألوف بالنسبالك من أيامك مع منير؟', requires:['source_docs'],
          a:'"الاسم مألوف للأسف. المورد ده اتعامل مع الجاليري زمان وأنا شريك، بس أنا قطعت علاقتي بالموضوع من وقتها."' },
        { q:'إنت قلت إنك ماقربتش من مكتب منير، بس الكاميرا لقطتك داخله ناحية المكتب وقت انقطاع المكالمة — تفسر ده إزاي؟', requires:['old_partnership','source_docs','internal_cam'], closesInterrogation:true,
          a:'(بيسكت لحظة، وبيبص بعيد) "دخلت أتكلم معاه دقايق... بس ده مش معناه إني قتلته. كنت عايز أعرف هو ناوي يعمل إيه بالمصدر القديم."' },
      ],
      confrontations:{
        source_docs:'الشبكة دي كانت معروفة زمان، بس أنا ماتعاملتش معاها بنفسي.',
        old_partnership:'خرجت من الشراكة بخلاف مالي فعلاً، بس ده كان من سنتين وخلص.',
        internal_cam:'كنت جاي أسلّم على منير بس، مقصدتش أي حاجة تانية.',
        contradiction_noted_forged:'كنت قريب من المكتب فعلاً، بس مش زي ما إنت فاكر خالص.'
      }
    },
    {
      id:'basma', name:'بسمة', role:'مسؤولة أمن الجاليري ليلة الافتتاح', img: IMG_BASE_FORGED + 'basma.jpg', avatarEmoji:'🔐',
      alibi:'قالت إنها كانت بتراقب المدخل الرئيسي طول الليلة.',
      loseMsg:'بسمة كانت فعلاً على المدخل الرئيسي حسب كاميرات الجاليري، ومفيش أي لحظة اتحركت فيها من مكانها في التوقيت الحرج. مفيش أي دليل مادي يربطها بالمكتب أو باللوحة المفقودة.',
      questions:[
        { q:'شفتي حد بيدخل أو بيخرج من مكتب منير وقت الحادثة؟',
          a:'"مقدرتش أراقب المكتب مباشرة، أنا كنت على المدخل الرئيسي طول الوقت، ده كان مسؤوليتي الأساسية."' },
        { q:'فيه كاميرات جوه الجاليري نفسها؟', unlockId:'internal_cam',
          a:'"أيوه، فيه كاميرا في الممر المؤدي لمكتب منير، ممكن تراجعوها بنفسكم."' },
      ],
      confrontations:{
        internal_cam:'أنا مسؤولة الأمن، شفت شريف في الممر بس ماشكيتش في حاجة.'
      }
    },
  ],

  evidence: [
    { id:'call_log', tag:'من سجل المكالمات', crit:true, title:'آخر مكالمة لمنير قبل موته', img: IMG_BASE_FORGED + 'forged-phonelog.jpg',
      short:'منير أخبر نادية إن اللوحة مزوّرة قبل موته بدقايق',
      full:'سجل المكالمات بيأكد اتصال منير بنادية قبل الحادثة بحوالي 10 دقايق بس، وبيتوافق تمامًا مع وصفها للمكالمة.',
      unlocked:true, order:1 },

    { id:'expert_report', tag:'من تقرير كريم', crit:false, title:'تقرير أولي بشكوك في أصالة اللوحة', img:null,
      short:'كريم أبلغ منير بشكوكه قبل الافتتاح بساعتين',
      full:'كريم كتب ملاحظات أولية عن أسباب شكه في أصالة اللوحة وسلمها لمنير قبل الحادثة بوقت كافي. بعد التقرير، منير طلب إن اللوحة تتشال مؤقتًا من القاعة وتدخل مكتبه عشان يفحص أوراقها بعيد عن الضيوف.',
      unlocked:false, order:2 },

    { id:'source_docs', tag:'من أوراق الجاليري', crit:true, title:'مستندات مصدر اللوحة الأصلي', img: IMG_BASE_FORGED + 'forged-docs.jpg',
      short:'المصدر مرتبط بشبكة مشبوهة قديمة كانت معروفة زمان',
      full:'المستندات بتوضح إن المورد الحالي مستخدم نفس شركة الوساطة والبيانات اللي ظهرت في صفقات قديمة أيام شراكة شريف ومنير. نادية ومنير بس كانوا عارفين تفاصيل الصفقة الحالية، لكن اسم المورد القديم كان معروف لشريف من وقت الشراكة.',
      unlocked:false, order:3 },

    { id:'old_partnership', tag:'من استجواب شريف', crit:true, title:'خلاف الشراكة القديم', img:null,
      short:'شريف خرج من الجاليري بخلاف مالي كبير مع منير',
      full:'شريف اعترف بخلاف مالي عميق مع منير قبل سنتين، مرتبط بطريقة استحواذه على حصص الجاليري.',
      unlocked:false, order:4 },

    { id:'price_dispute', tag:'من استجواب ليلى', crit:false, title:'خلاف سعر بسيط بين ليلى ومنير', img:null,
      short:'نقاش تجاري عادي على السعر، مش خلاف عميق',
      full:'ليلى أكدت إن الخلاف كان مجرد نقاش سعر عادي في عالم المزادات، ومفيش أي عداوة شخصية حقيقية بينها وبين منير.',
      unlocked:false, order:5 },

    { id:'internal_cam', tag:'من كاميرات الجاليري', crit:true, title:'تسجيل الممر المؤدي لمكتب منير', img: IMG_BASE_FORGED + 'forged-cam.jpg',
      short:'شريف ظاهر في الممر قبل الحادثة بدقايق قليلة',
      full:'كاميرا الممر بتوضح شريف ماشي ناحية مكتب منير الساعة 8:35، وبعدها بيختفي من زاوية الكاميرا عند باب المكتب. ده عكس كلامه إنه فضل وسط الضيوف وماقربش من المكتب.',
      unlocked:false, order:6 },

    { id:'canvas_fragment', tag:'من مسرح الجريمة', crit:true, partial:true, title:'قطعة قماش ممزقة من إطار اللوحة', img: IMG_BASE_FORGED + 'forged-fragment.jpg',
      short:'اتلاقت عند ممر الخدمة وبتحدد طريق خروج اللوحة',
      full:'قطعة صغيرة من بطانة ظهر إطار اللوحة اتلاقت عند ممر الخدمة الجانبي المتصل بمنطقة مكتب منير. بعد ما اللوحة دخلت المكتب للفحص، الأثر ده بيرجّح إنها خرجت من ممر الخدمة بدل ما ترجع للقاعة قدام الضيوف.',
      unlocked:false, order:7 },

    { id:'contradiction_noted_forged', tag:'من تحليل التناقضات', crit:true, title:'تناقض في كلام شريف عن علاقته بالجاليري', img:null,
      short:'قال إنه ماقربش من المكتب، والكاميرا بتقول العكس',
      full:'شريف قال بوضوح إنه فضل وسط الضيوف وماقربش من مكتب منير، لكن كاميرا الممر بتوضحه متجه ناحية المكتب في نفس التوقيت الحرج.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن كلام شريف بتسجيل الكاميرا. فيه تصريح واضح مش راكب مع اللي حصل.',
    resultText: 'التناقض واضح: شريف قال إنه فضل وسط الضيوف وماقربش من مكتب منير، لكن الكاميرا بتوضحه رايح ناحية المكتب في نفس دقيقة انقطاع المكالمة.',
    resultEvidenceIds: ['contradiction_noted_forged'],
    statements: [
      { id:'st1', text:'"فضلت وسط الضيوف وماقربتش من مكتب منير خالص."', source:'شريف — في الاستجواب' },
      { id:'st2', text:'كاميرا الممر بتوضح شريف بيدخل ناحية مكتب منير قبل انقطاع المكالمة مباشرة.', source:'دليل: تسجيل الممر' },
      { id:'st3', text:'"كنت في المكتبة أراجع أوراق النسب والمصدر."', source:'كريم — في الاستجواب' },
      { id:'st4', text:'"كنت بستقبل ضيوف مهمين في القاعة الرئيسية طول الوقت."', source:'نادية — في الاستجواب' },
      { id:'st5', text:'"كنت بتكلم مع أكتر من ضيف في القاعة الجانبية."', source:'ليلى — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },

  cameraPuzzle: {
    enabled:true,
    introText:'سجل كاميرا الممر الداخلي بيغطي من الساعة 7 مساءً لحد 10 بالليل. دوّر على اللحظة اللي شريف ظاهر فيها بيدخل ناحية مكتب منير — قريب من توقيت انقطاع المكالمة (حوالي 8:35 مساءً).',
    resultText:'ظبطت اللحظة الصح. التسجيل بيوضح شريف بيدخل ناحية المكتب الساعة 8:35 مساءً بالظبط، نفس دقيقة انقطاع مكالمة منير مع نادية.',
    startHour24: 19,
    totalMinutes: 180,
    targetMinutes: 95,
    toleranceMinutes: 8,
    resultEvidenceIds: ['internal_cam'],
  },

  evidenceCombinations: [
    { parts:['old_partnership','internal_cam'], resultId:'contradiction_noted_forged' },
  ],

  correctSuspectId: 'sherif',
  conclusiveEvidenceIds: ['old_partnership', 'source_docs', 'internal_cam', 'canvas_fragment', 'contradiction_noted_forged'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إيه اللي خلّى شريف المشتبه الأقوى؟',
        options: [
          { id:'a', text:'الكاميرا حطته عند المكتب + أوراق المصدر ربطته بالمورد القديم + أثر اللوحة حدد طريق خروجها' },
          { id:'b', text:'لأنه كان حزين في الافتتاح' },
          { id:'c', text:'لأنه اشترى تذكرة دخول متأخرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'contradiction',
        label:'إيه اللي فضحه فعليًا؟',
        options: [
          { id:'a', text:'اعترافه المباشر بالسرقة' },
          { id:'b', text:'التناقض بين كلامه إنه بعيد عن الإدارة، وظهوره في الممر المؤدي للمكتب وقت الحادثة' },
          { id:'c', text:'شهادة بسمة على المدخل' },
        ],
        correctOptionId:'b',
      },
      {
        id:'whylaila',
        label:'ليه ليلى كانت بريئة فعليًا؟',
        options: [
          { id:'a', text:'خلافها كان مجرد نقاش سعر عادي، والشهود أكدوا وجودها في القاعة الجانبية طول الوقت' },
          { id:'b', text:'لأنها مشترية غنية ومحدش هيشك فيها' },
          { id:'c', text:'لأنها اعترفت بمكانها بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة طلعت من الممر',
      paragraphs:[
        'شريف كان عارف المورد القديم من أيام شراكته مع منير، والمستندات ربطت الصفقة الجديدة بنفس شبكة الوساطة القديمة. لما عرف إن منير اكتشف التزوير وناوي يفتح الملف كله، راح له المكتب رغم إنه أنكر ده. المواجهة اتصاعدت وانتهت بمقتل منير، وبعدها شريف أخد اللوحة عشان يبعد أهم دليل عن مصدر الصفقة.',
        'اللي حاصره كان تسجيل الممر، ومستندات المصدر، وأثر بطانة الإطار عند ممر الخدمة. بعد مواجهته بكذبه عن قربه من المكتب، اعترف بالمواجهة ودلّهم على اللوحة اللي كان مخبيها في عربيته قبل ما يقدر يخرج من الجاليري.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية شريف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: كاميرا الممر، خلاف الشراكة القديم، ومستندات مصدر اللوحة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي هرب باللوحة وفضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "اللوحة المزيفة"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant art gallery interior at night,
   a single dramatically lit empty spot on the wall where a painting
   used to hang, cordoned off with tape, moody atmosphere,
   documentary photography style, no text, no watermark, photorealistic"

   المشهد ١ (forged-scene1.jpg):
   "Photorealistic wide shot of an upscale art gallery opening event,
   well-dressed guests mingling, a rare antique painting illuminated
   under a spotlight on the main wall, warm ambient lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (forged-scene2.jpg):
   "Photorealistic close-up of a worried middle-aged man on a phone call
   in a dimly lit private office, tense expression, desk lamp lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (forged-scene3.jpg):
   "Photorealistic shot of a private office in disarray, overturned
   chair, papers scattered on the floor, a locked door slightly ajar,
   dramatic low lighting, photorealistic, no text, no watermark"

   المشهد ٤ (forged-scene4.jpg):
   "Photorealistic shot of a gallery entrance at night with security
   tape and a guard standing watch, guests waiting outside, moody blue
   lighting, photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   نادية (nadia.jpg):
   "Photorealistic portrait of a professional Egyptian female gallery
   manager, elegant formal wear, composed guarded expression,
   standing in an art gallery, professional gallery event lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   كريم (karim.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male art
   appraiser, formal attire, glasses, meticulous studious expression,
   examining an artwork closely, gallery lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   ليلى (laila.jpg):
   "Photorealistic portrait of a wealthy Egyptian female art
   collector, elegant evening wear, jewelry, confident refined
   expression, standing in a gallery, professional gallery event
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   شريف (sherif.jpg):
   "Photorealistic portrait of an older Egyptian man in a formal suit,
   greying hair, resentful bitter expression, standing in a gallery
   hallway, dim professional lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   بسمة (basma.jpg):
   "Photorealistic portrait of a young Egyptian female security guard,
   formal security uniform, alert vigilant expression, standing near
   a gallery entrance at night, moody blue lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل سجل المكالمات (forged-phonelog.jpg):
   "Photorealistic close-up of a smartphone screen showing a call log
   with a recent missed call entry, held in hand, soft indoor lighting,
   no text, no watermark, photorealistic"

   دليل مستندات المصدر (forged-docs.jpg):
   "Photorealistic close-up of old provenance documents and certificates
   for an artwork, spread on a wooden desk, warm desk lamp lighting,
   no text, no watermark, photorealistic"

   دليل الكاميرا (forged-cam.jpg):
   "Photorealistic security camera style still frame of a dim gallery
   hallway with a man's silhouette walking toward a door, grainy
   surveillance footage look, no text, no watermark, photorealistic"

   دليل قطعة القماش (forged-fragment.jpg):
   "Photorealistic close-up of a small torn piece of canvas fabric with
   gilded frame edge, lying on a marble floor near a doorway, forensic
   evidence photography style, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_FORGED_CANVAS;
  c.conclusiveRequired = 4;
  const s = c.suspects.find(x => x.id === 'sherif');
  if (s) {
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت لحظة) "دخلت أكلمه فعلًا وكنت عايز أعرف هيعمل إيه مع المورد القديم. لكن لما خرجت كان منير حي. وجودي عند المكتب يثبت إني كذبت في مكاني، مش إني قتلته."';
    }
  }
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_FORGED_CANVAS;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='inspect_canvas_frame')) c.investigationActions.push({
    id:'inspect_canvas_frame', kind:'فحص مسرح', label:'افحص إطار اللوحة ومحيط المكتب',
    description:'الفحص المادي للإطار ممكن يطلع أثر ما يبانش في الاستجوابات.',
    requires:['expert_report'], resultEvidenceIds:['canvas_fragment'],
    successText:'تم العثور على أثر مادي من إطار اللوحة وتوثيقه.'
  });
})();
