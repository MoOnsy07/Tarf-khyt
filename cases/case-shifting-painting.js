/* ============================================================
   بيانات قضية: اللوحة اللي بتتغير
   قضية قتل — جامع لوحات بيلاحظ تغيّر تدريجي في تفاصيل لوحة
   اشتراها، وقبل ما يفضح الموضوع بيتقتل. الحقيقة: لوحة أقدم
   وأثمن مخبأة تحتها.
   ============================================================ */

const IMG_BASE_PAINTING = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/shifting-painting/';

const CASE_SHIFTING_PAINTING = {
  id: 'shifting-painting',
  title: 'اللوحة اللي بتتغير',
  caseNo: 'CASE 026',
  subtitle: 'مخزن مجموعة فنية خاصة، الزمالك',
  coverImg: IMG_BASE_PAINTING + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'جامع لوحات بيلاحظ تغيّر تدريجي في تفاصيل لوحة اشتراها، وقبل ما يفضح الموضوع بيتقتل. لوحة أقدم وأثمن مخبأة تحت السطح، وحد مستعد يقتل عشانها.',

  isPremium: false,
  categories: ['murder', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_PAINTING + 'cover.webp',
    heroCaption: 'CASE 026 — بعد شراء اللوحة بأسبوع',
    text1: 'جامع لوحات معروف، "منصور"، اشترى لوحة بملايين في مزاد خاص. بعد أسبوع، لاحظ إن تفاصيل صغيرة بدأت تظهر بشكل مختلف عن صور يوم المزاد — مناطق من الخلفية بقت أشف شوية وخطوط فرشاة قديمة بدأت تبان من تحت السطح. قبل ما يفضح الموضوع رسميًا، اتلاقى ميت في مخزن مجموعته الخاصة.',
    text2: 'ابن منصور طلب منك تحقق بهدوء، عشان تفهم إيه اللي كان بيحصل في اللوحة دي بالظبط، وإزاي ده وصل لجريمة قتل. القضية معقدة أكتر من مجرد "لوحة أصلية ولوحة مزيفة" — في حاجة تانية بتحصل تحت السطح حرفيًا.',
    meta: [
      { label:'المجني عليه', value:'منصور — جامع لوحات معروف' },
      { label:'مكان الحادثة', value:'مخزن المجموعة الفنية الخاصة' },
      { label:'الغموض', value:'تغيّر تدريجي في تفاصيل اللوحة بعد الشراء' },
      { label:'طلب التحقيق', value:'ابن منصور' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — المزاد',
      img: IMG_BASE_PAINTING + 'painting-scene1.jpg',
      text:'قاعة مزاد فاخرة، منصور بيشتري لوحة بملايين وسط تصفيق الحاضرين، صور اللوحة موثقة رسميًا وقت البيع.'
    },
    {
      scene:'المشهد ٢ — الملاحظة الأولى',
      img: IMG_BASE_PAINTING + 'painting-scene2.jpg',
      text:'بعد أسبوع، منصور بيقارن اللوحة بالصور الرسمية، ويلاحظ إن أجزاء من الطبقة العلوية بقت أشف، وبدأت تكشف خطوط فرشاة مش موجودة بوضوح يوم المزاد.'
    },
    {
      scene:'المشهد ٣ — التحقيق الشخصي',
      img: IMG_BASE_PAINTING + 'painting-scene3.jpg',
      text:'منصور بيتواصل مع خبير ترميم يثق فيه. فحص الـUV وتحليل طبقات اللون يكشفوا إن الطبقة الظاهرة حديثة نسبيًا وغير مستقرة، وتحتها عمل أقدم وأهم بكتير.'
    },
    {
      scene:'المشهد ٤ — الجريمة',
      img: IMG_BASE_PAINTING + 'painting-scene4.jpg',
      text:'قبل ما منصور يقدر يوضح اكتشافه لحد، بيتلاقى ميت في مخزن مجموعته. اللوحة نفسها موجودة مكانها، لكن حد دخل المخزن قبله.'
    },
  ],

  suspects: [
    {
      id:'restorer_fady', name:'فادي', role:'خبير ترميم لوحات، فحص اللوحة لمنصور', img: IMG_BASE_PAINTING + 'fady.jpg', avatarEmoji:'🎨',
      alibi:'قال إنه كان في ورشته الخاصة طول الوقت، بعيد تمامًا عن المخزن.',
      questions:[
        { q:'إيه اللي لقيته لما فحصت اللوحة تحت الـUV؟', unlockId:'uv_discovery',
          a:'"لقيت طبقة رسم أقدم كاملة تحت السطح الظاهر. الطبقة الحديثة فوقها بدأت تبقى شفافة في أجزاء بسبب عدم استقرار موادها، وده اللي خلّى منصور يحس إن اللوحة بتتغير."' },
        { q:'قلت لمنصور بالاكتشاف ده؟',
          a:'"أيوه، قلت له كل التفاصيل، وكان متحمس جدًا يوثق الاكتشاف رسميًا قبل ما يعلنه."' },
        { q:'حد تاني كان عارف بالاكتشاف ده غيرك وغير منصور؟', unlockId:'restoration_leak',
          a:'"للأسف أيوه، مساعدي القديم كان معايا في الفحص، مش متأكد لو سرّب الموضوع لحد."' },
      ],
      confrontations:{
        uv_discovery:'الطبقة دي لقيتها بالفحص العادي، ده شغلي واكتشاف حقيقي.',
        restoration_leak:'مساعدي كان حاضر الفحص فعلاً، بس ده طبيعي في شغل الترميم.',
        auction_source:'المصدر ده جالي من دار المزاد، أنا بس فاحص اللوحة مش مصدرها.',
        ramy_present:'رامي شاف الاكتشاف زي أي مساعد بيشتغل معايا، مفيش سرية في كده.'
      }
    },
    {
      id:'auction_house_layla', name:'ليلى', role:'صاحبة دار المزاد اللي باعت اللوحة', img: IMG_BASE_PAINTING + 'layla.jpg', avatarEmoji:'💼',
      alibi:'قالت إنها كانت في اجتماع عمل خارج القاهرة وقت الحادثة.',
      loseMsg:'ليلى كانت فعلًا خارج القاهرة في اجتماع عمل موثق بشهود وفواتير سفر، ومفيش أي دليل يربطها مباشرة بالمخزن وقت الجريمة.',
      questions:[
        { q:'كنتِ عارفة بوجود طبقة رسم تحت اللوحة؟',
          a:'"لأ خالص، لو كنت عارفة كنت بعتها بسعر مختلف تمامًا، ده اكتشاف يغير قيمة اللوحة بشكل جذري."' },
        { q:'مصدر اللوحة الأصلي فين؟', unlockId:'auction_source',
          a:'"جاتلنا من ورثة عيلة قديمة، بيعوا مجموعة كاملة، محدش وقتها فحصها بدقة الفحص اللي عمله فادي."' },
      ],
      confrontations:{
        auction_source:'اللوحة دي جتنا من مجموعة عيلة قديمة، من غير أي شبهة وقتها.'
      }
    },
    {
      id:'assistant_ramy', name:'رامي', role:'مساعد فادي القديم في الترميم', img: IMG_BASE_PAINTING + 'ramy.jpg', avatarEmoji:'🖌️',
      alibi:'قال إنه كان في ورشة تانية شغال في مشروع مختلف تمامًا.',
      questions:[
        { q:'كنت موجود وقت فحص فادي للوحة؟', unlockId:'ramy_present',
          a:'"أيوه، كنت مساعده وقتها، شفت الاكتشاف بعيني قبل ما فادي يبلغ منصور بيه رسميًا."' },
        { q:'قلت لحد تاني بالاكتشاف ده؟', requires:['ramy_present'],
          a:'(بيتردد) "قلت لجامع لوحات تاني أعرفه، حسيته ممكن يهتم بالموضوع من الناحية المهنية بس."' },
        { q:'الجامع ده اسمه إيه؟', requires:['ramy_present','restoration_leak'],
          a:'"جامع اسمه حسام، بيشتغل مستقل، عنده شبكة علاقات واسعة في سوق اللوحات النادرة."' },
      ],
      confrontations:{
        restoration_leak:'أنا كنت حاضر الفحص عشان شغلي، مش عشان أسرّب حاجة.',
        ramy_present:'شفت الاكتشاف زي أي مساعد، بس ماقلتش لحد قبل الإعلان الرسمي.'
      }
    },
    {
      id:'hossam_collector', name:'حسام', role:'جامع لوحات مستقل، عنده شبكة واسعة في السوق', img: IMG_BASE_PAINTING + 'hossam.jpg', avatarEmoji:'🖼️',
      alibi:'قال إنه ماقابلش منصور وماقربش من مخزنه في يوم الحادثة.',
      questions:[
        { q:'سمعت عن اكتشاف رامي بخصوص اللوحة؟', unlockId:'hossam_heard',
          a:'(بيتردد) "سمعت كلام عام عن اكتشاف تحت لوحة، بس ماكنتش أعرف إنها لوحة منصور ولا رحت له بسببها."' },
        { q:'إيه خطتك لو الاكتشاف ده كان حقيقي؟',
          a:'"طبعًا كنت هحاول أشتريها بأي سعر، ده اكتشاف بيغير قيمة اللوحة بملايين إضافية."' },
        { q:'كنت قريب من مخزن منصور في يوم الحادثة؟', requires:['hossam_heard'],
          a:'(بيتردد) "عديت من المنطقة فعلًا، بس ما دخلتش المخزن وما قابلتش منصور."' },
        { q:'بصمتك على الباب، والكاميرا بتظهرك داخل للمخزن، وألياف من جاكيتك اتلاقت عند مكان المشادة — لسه هتقول إنك ماقابلتش منصور؟', requires:['fingerprint_door','nearby_shop_video','coat_fiber_match'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "جيت أقنعه يبيعلي اللوحة قبل الإعلان. رفض وطردني، وحصلت مشادة خرجت عن السيطرة. أنا كذبت لما قلت إني ما دخلتش."' },
      ],
      confrontations:{
        hossam_heard:'سمعت إشاعة عن اكتشاف من مصدر بعيد، زي أي حد في السوق ده.',
        fingerprint_door:'بصمتي على الباب ده يمكن كنت هناك زيارة عادية قبل كده.',
        nearby_shop_video:'كنت قريب من المخزن بس، مش دليل إني دخلته وقت الجريمة.',
        coat_fiber_match:'الألياف دي ممكن تبقى من جاكيت شبه بتاعي، كتير عندهم نفس القماش.',
        contradiction_noted_painting:'دخلت المخزن مرة واحدة بس، ومقصدتش أي أذى خالص.'
      }
    },
  ],

  evidence: [
    { id:'uv_discovery', tag:'من فحص فادي', crit:true, title:'اكتشاف طبقة رسم مخفية', img: IMG_BASE_PAINTING + 'painting-uv.jpg',
      short:'طبقة رسم قديمة أثمن تحت اللوحة الظاهرة',
      full:'فحص الـUV وتحليل طبقات اللون بيكشفوا عملًا أقدم تحت الطبقة الظاهرة. الطبقة الحديثة فوقه اتعملت بمواد غير مستقرة وبدأت تبقى شفافة في مناطق صغيرة، وده يفسر ليه تفاصيل من العمل القديم بدأت تظهر تدريجيًا بعد الشراء.',
      unlocked:true, order:1 },

    { id:'restoration_leak', tag:'من استجواب فادي', crit:false, title:'تسريب محتمل للاكتشاف', img:null,
      short:'مساعد فادي كان حاضر الفحص',
      full:'فادي أكد إن مساعده رامي كان حاضر الفحص، وأشار لاحتمال تسريب الموضوع منه.',
      unlocked:false, order:2 },

    { id:'auction_source', tag:'من استجواب ليلى', crit:false, title:'مصدر اللوحة الأصلي', img:null,
      short:'من مجموعة عيلة قديمة، من غير فحص دقيق سابق',
      full:'ليلى أكدت إن مصدر اللوحة من مجموعة عيلة قديمة اتباعت من غير فحص دقيق سابق زي فحص فادي.',
      unlocked:false, order:3 },

    { id:'ramy_present', tag:'من استجواب رامي', crit:true, title:'حضور رامي للاكتشاف', img:null,
      short:'رامي شاف الاكتشاف بعينه قبل الإعلان الرسمي',
      full:'رامي اعترف إنه شاف اكتشاف طبقة الرسم المخفية بعينه، قبل ما فادي يبلغ منصور بيها رسميًا.',
      unlocked:false, order:4 },

    { id:'hossam_heard', tag:'من استجواب حسام', crit:true, title:'حسام سمع عن الاكتشاف', img:null,
      short:'سمع إشاعة عن الاكتشاف من مصدر غير مباشر',
      full:'حسام اعترف، بشكل متردد، إنه سمع إشاعة عن اكتشاف اللوحة قبل الجريمة بوقت قصير.',
      unlocked:false, order:5 },

    { id:'fingerprint_door', tag:'من فحص باب المخزن', crit:true, title:'بصمة حسام على باب المخزن الخلفي', img: IMG_BASE_PAINTING + 'painting-print.jpg',
      short:'بصمة واضحة على مقبض الباب الخلفي للمخزن',
      full:'فحص الأدلة الجنائية بيوضح بصمة واضحة لحسام على مقبض الباب الخلفي لمخزن منصور.',
      unlocked:false, order:6 },

    { id:'nearby_shop_video', tag:'من كاميرا محل مجاور', crit:true, title:'حسام قريب من المخزن وقت الجريمة', img: IMG_BASE_PAINTING + 'painting-cam.jpg',
      short:'ظاهر على كاميرا محل قريب في توقيت الجريمة بالظبط',
      full:'كاميرا محل مجاور للمخزن بتوضح حسام في المنطقة في نفس توقيت الجريمة بالظبط.',
      unlocked:false, order:7 },

    { id:'coat_fiber_match', tag:'من فحص مكان المشادة', crit:true, title:'ألياف جاكيت حسام عند الرف المكسور', img:null,
      short:'ألياف ممزقة من نفس قماش جاكيت حسام اتلاقت على حافة معدنية داخل المخزن',
      full:'فحص الحافة المعدنية لرف مكسور جنب مكان سقوط منصور لقى ألياف مطابقة لقماش جاكيت حسام، وكاميرا المحل بتظهر في جاكيته قطعًا جديدًا في نفس الجانب بعد خروجه من المخزن.',
      unlocked:false, order:8 },

    { id:'contradiction_noted_painting', tag:'من تحليل التناقضات', crit:true, title:'تناقض في كلام حسام عن علاقته بمنصور', img:null,
      short:'قال إنه ما دخلش المخزن، لكن البصمة والكاميرا وألياف الجاكيت تثبت العكس',
      full:'حسام قال إنه ما دخلش مخزن منصور، لكن بصمته على المقبض، والكاميرا اللي بتظهر دخوله، وألياف من جاكيته عند رف اتكسر أثناء المشادة، كلهم يناقضوا كلامه بشكل مباشر.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن الأقوال دي كويس. اتنين منها بيتعارضوا مع بعض بشكل واضح.',
    resultText: 'التناقض واضح: حسام قال إنه ما دخلش المخزن وماقابلش منصور، لكن البصمة والكاميرا وألياف الجاكيت بتحطه جوه مكان المشادة في توقيت الجريمة.',
    resultEvidenceIds: ['contradiction_noted_painting'],
    statements: [
      { id:'st1', text:'"عديت من المنطقة، بس ما دخلتش المخزن وما قابلتش منصور."', source:'حسام — في الاستجواب' },
      { id:'st2', text:'البصمة والكاميرا وألياف من جاكيت حسام بتثبت دخوله المخزن ووجوده عند مكان المشادة.', source:'دليل: الباب والكاميرا وفحص الألياف' },
      { id:'st3', text:'"لو كنت عارفة كنت بعتها بسعر مختلف تمامًا."', source:'ليلى — في الاستجواب' },
      { id:'st4', text:'"كنت مساعده وقتها، شفت الاكتشاف بعيني."', source:'رامي — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  matchPuzzle: {
    enabled: true,
    tabLabel: 'الربط',
    introText: 'اربط كل شخص بموقفه الحقيقي في القضية بناءً على الأدلة اللي جمعتها.',
    leftItems: [
      { id:'l_fady', text:'فادي' },
      { id:'l_layla', text:'ليلى' },
      { id:'l_ramy', text:'رامي' },
      { id:'l_hossam', text:'حسام' },
    ],
    rightItems: [
      { id:'r_discoverer', text:'مكتشف طبقة الرسم المخفية، بحسن نية' },
      { id:'r_innocent_source', text:'بائعة اللوحة، مالهاش أي علم بالاكتشاف' },
      { id:'r_leak_source', text:'مصدر تسريب الاكتشاف لطرف خارجي' },
      { id:'r_culprit', text:'الفاعل، حاول يشتري السر قبل ما يتصاعد الموقف لجريمة' },
    ],
    correctPairs: [
      ['l_fady','r_discoverer'],
      ['l_layla','r_innocent_source'],
      ['l_ramy','r_leak_source'],
      ['l_hossam','r_culprit'],
    ],
    resultText: 'ربطت كل حد بموقفه الحقيقي! الصورة الكاملة واضحة دلوقتي: فادي اكتشف السر بحسن نية، رامي سرّبه من غير ما يقصد ضرر، وحسام استغل التسريب ده لحد ما وصل لجريمة قتل.',
    resultEvidenceIds: ['fingerprint_door'],
  },

  evidenceCombinations: [
    { parts:['ramy_present','hossam_heard'], resultId:'nearby_shop_video' },
    { parts:['fingerprint_door','nearby_shop_video'], resultId:'coat_fiber_match' },
  ],

  correctSuspectId: 'hossam_collector',
  conclusiveEvidenceIds: ['fingerprint_door', 'nearby_shop_video', 'coat_fiber_match', 'contradiction_noted_painting'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن حسام هو الفاعل؟',
        options: [
          { id:'a', text:'بصمته على الباب + الكاميرا أثبتت دخوله + ألياف جاكيته اتلاقت عند مكان المشادة' },
          { id:'b', text:'لأنه جامع لوحات وده كافي' },
          { id:'c', text:'لأنه تردد أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت الحقيقة الكاملة عن "اللوحة اللي بتتغير"؟',
        options: [
          { id:'a', text:'اللوحة ما اتبدلتش؛ طبقة حديثة غير مستقرة كانت بتغطي عملًا أقدم وأثمن، ومع الوقت أجزاء منها بدأت تكشف اللي تحتها' },
          { id:'b', text:'اللوحة كلها مزيفة من الأساس' },
          { id:'c', text:'اللوحة اتسرقت واستبدلت بنسخة مطابقة تمامًا' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة كانت تحت السطح حرفيًا',
      paragraphs:[
        'حسام عرف من رامي إن تحت اللوحة عملًا أقدم وأثمن، وراح لمنصور قبل الإعلان الرسمي عشان يحاول يشتريها بسرعة. منصور رفض، وحصلت مشادة انتهت بوفاته، وبعدها حسام أنكر إنه دخل المخزن أصلًا.',
        'البصمة والكاميرا أثبتوا دخوله، وألياف جاكيته عند الرف المكسور ربطته بمكان المشادة. أما لغز تغيّر اللوحة فاتفسر بتحليل الطبقات: العمل ماكانش بيتبدل، لكن طبقة حديثة غير مستقرة بدأت تبقى شفافة وتكشف لوحة أقدم تحتها. اللوحة اتحفظت كدليل واتعمل لها توثيق فني مستقل.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية حسام، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: بصمة الباب، كاميرا المحل، واعترافه بسماعه عن الاكتشاف، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق وسط سوق اللوحات النادرة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "اللوحة اللي بتتغير"

   الغلاف (cover.webp):
   "Photorealistic shot of a framed painting under UV light revealing
   a faint hidden layer beneath the visible surface, dark art storage
   room, dramatic lighting, documentary photography style, no text,
   no watermark, photorealistic"

   المشهد ١ (painting-scene1.jpg):
   "Photorealistic shot of an elegant art auction house interior, a
   painting on display, well-dressed bidders, warm lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (painting-scene2.jpg):
   "Photorealistic close-up of a man comparing a painting to a
   printed photo, magnifying glass in hand, focused expression, soft
   lighting, photorealistic, no text, no watermark"

   المشهد ٣ (painting-scene3.jpg):
   "Photorealistic shot of a painting under ultraviolet light
   revealing hidden brushstrokes, art restoration studio setting, no
   text, no watermark, photorealistic"

   المشهد ٤ (painting-scene4.jpg):
   "Photorealistic shot of a private art storage room with covered
   paintings, dim lighting, quiet tense atmosphere, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   فادي (fady.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male art
   restoration expert, formal smart attire, glasses, meticulous
   focused expression, examining a painting closely, gallery
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   ليلى (layla.jpg):
   "Photorealistic portrait of a professional Egyptian female auction
   house owner, elegant formal attire, composed shrewd expression,
   standing in an art gallery, gallery lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   رامي (ramy.jpg):
   "Photorealistic portrait of a young Egyptian male restoration
   assistant, casual work attire, nervous evasive expression,
   standing in an art restoration workshop, warm workshop lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   حسام (hossam.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   independent art collector, smart casual attire, confident
   well-connected expression, standing in an art gallery, gallery
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   دليل الأشعة (painting-uv.jpg):
   "Photorealistic close-up of a painting examined under UV light
   showing a hidden layer of brushstrokes, art lab setting, no text,
   no watermark, photorealistic"

   دليل البصمة (painting-print.jpg):
   "Photorealistic close-up of a fingerprint on a door handle, dusted
   for forensic analysis, dim lighting, no text, no watermark,
   photorealistic"

   دليل الكاميرا (painting-cam.jpg):
   "Photorealistic security camera style still frame of a man
   standing near a storage building entrance at dusk, grainy
   surveillance footage look, no text, no watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_SHIFTING_PAINTING;
  c.evidenceCombinations = [];
  if (c.matchPuzzle) {
    c.matchPuzzle.rightItems = c.matchPuzzle.rightItems.map(x =>
      x.id === 'r_culprit' ? {...x, text:'الشخص اللي عنده أقوى دافع للوصول للوحة بعد تسريب الاكتشاف'} : x
    );
    c.matchPuzzle.resultText = 'الربط يوضح الأدوار والدوافع: فادي اكتشف الطبقة، رامي سرّب المعلومة، وحسام كان عنده مصلحة واضحة في الوصول للوحة. تحديد القاتل نفسه محتاج الأدلة المادية.';
    c.matchPuzzle.resultEvidenceIds = [];
  }
  const h = c.suspects.find(s => s.id === 'hossam_collector');
  if (h) {
    if (!h.questions.some(q => q.unlockId === 'nearby_shop_video')) {
      h.questions.push({
        q:'راجعت كاميرا محل قريب من المخزن، وهي بتظهر عربية شبه عربيتك في التوقيت الحرج. كنت هناك؟',
        requires:['hossam_heard'],
        unlockId:'nearby_shop_video',
        a:'(بيتردد) "عديت من المنطقة فعلًا، بس ده مش معناه إني دخلت المخزن."'
      });
    }
    if (!h.questions.some(q => q.unlockId === 'coat_fiber_match')) {
      h.questions.push({
        q:'الألياف اللي اتجمعت من الرف المكسور مطابقة لنوع قماش جاكيتك. تفسر وجودها؟',
        requires:['nearby_shop_video','fingerprint_door'],
        unlockId:'coat_fiber_match',
        a:'(بيتوتر) "لو كنت قربت من المكان قبل كده ممكن ألياف تنتقل، لكن ده مش اعتراف بالجريمة."'
      });
    }
    const q = h.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "جيت أكلمه عن اللوحة فعلًا وكذبت في موضوع دخولي. حصل بينا خلاف، لكن أنا مش هاعترف إني قتلته لمجرد إن الأدلة بتثبت وجودي."';
    }
  }
  c.conclusiveEvidenceIds = ['fingerprint_door','nearby_shop_video','coat_fiber_match','hossam_heard'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_SHIFTING_PAINTING;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='lift_backdoor_print')) c.investigationActions.push({
    id:'lift_backdoor_print', kind:'بصمات', label:'ارفع البصمات من باب المخزن الخلفي',
    description:'بعد إثبات الحركة قرب المخزن، افحص نقطة الدخول نفسها بحثًا عن أثر مادي.',
    requires:['nearby_shop_video'], resultEvidenceIds:['fingerprint_door'],
    successText:'فحص الباب الخلفي طلع ببصمة قابلة للمقارنة.'
  });
})();
