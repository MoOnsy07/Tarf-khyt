/* ============================================================
   بيانات قضية: خطوبة مؤجلة
   قضية اختفاء — عريس بيختفي ليلة الخطوبة من غير أي أثر،
   قدام عيلته وعيلة العروسة المنتظرين في الصالة.
   ============================================================ */

const IMG_BASE_POSTPONEDENGAGEMENT = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/postponed-engagement/';

const CASE_POSTPONED_ENGAGEMENT = {
  id: 'postponed-engagement',
  title: 'خطوبة مؤجلة',
  caseNo: 'CASE 058',
  subtitle: 'بيت العروسة، ليلة الخطوبة',
  coverImg: IMG_BASE_POSTPONEDENGAGEMENT + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 19,
  teaser: 'عريس بيختفي فجأة قبل إعلان خطوبته، وسط عيلته وعيلة العروسة المنتظرين في الصالة، من غير أي رسالة أو تفسير واضح.',

  isPremium: false,
  categories: ['disappearance', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_POSTPONEDENGAGEMENT + 'cover.webp',
    heroCaption: 'CASE 058 — ليلة الخطوبة',
    text1: 'كان فاضل شوية على إعلان خطوبة معتز وهنا في بيت عيلتها، وفجأة اختفى معتز بعد ما قال إنه نازل يستنشق هوا لدقايق قدام العمارة. موبايله كان معاه وبقى مغلق، والعيلتان استنوا ساعة قبل ما يبلغوا.',
    text2: 'هنا طلبت منك تحقق بسرعة. آخر رسالة من معتز موجودة على موبايل تامر، صديقه، وعندك قائمة بالأشخاص اللي ضغطوا عليه قبل الحفل. المطلوب تعرف خرج مع مين وتوصل له قبل ما يتأذى.',
    meta: [
      { label:'المختفي', value:'معتز — العريس' },
      { label:'آخر مكان معروف', value:'قدام عمارة هنا مباشرة' },
      { label:'التوقيت', value:'قبل إعلان الخطوبة بدقايق' },
      { label:'طلب التحقيق', value:'هنا، العروسة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاستعدادات',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene1.jpg',
      text:'بيت هنا مزين بأناقة، العائلتان مجتمعتان، والجميع منتظر لحظة إعلان الخطوبة وتبادل الدبل.'
    },
    {
      scene:'المشهد ٢ — الخروج',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene2.jpg',
      text:'معتز بيعتذر للحاضرين ويقول إنه هينزل يستنشق هوا لدقايق قبل الحفل، ويمشي لوحده لبره العمارة.'
    },
    {
      scene:'المشهد ٣ — القلق',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene3.jpg',
      text:'الوقت بيعدي، معتز ما يرجعش، وموبايله طالع مغلق. الحاضرين بيبدأوا يقلقوا ويدوروا عليه في الشارع.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-scene4.jpg',
      text:'تامر بيديك موبايله، وعليه آخر رسالة وصلته من معتز قبل اختفائه. بعدها تبدأ تراجع كاميرات العمارة وتسأل البواب.'
    },
  ],

  suspects: [
    {
      id:'exgirlfriend_dalia_p', name:'داليا', role:'صديقة سابقة لمعتز', img: IMG_BASE_POSTPONEDENGAGEMENT + 'dalia_p.jpg', avatarEmoji:'💔',
      alibi:'قالت إنها ماكانتش موجودة في الاحتفال أصلاً، ولا قريبة من المكان.',
      questions:[
        { q:'علاقتك بمعتز خلصت إزاي؟', unlockId:'dalia_p_breakup',
          a:'"خلصت بشكل مفاجئ من ناحيته، لسه متأثرة من الطريقة اللي حصل بيها."' },
        { q:'كنتِ بتتواصلي معاه قبل الخطوبة دي؟', requires:['dalia_p_breakup'], unlockId:'dalia_p_contact',
          a:'(بتتردد) "بعتله رسالة قبل الاحتفال بيوم، سألته لو متأكد من قراره."' },
      ]
    },
    {
      id:'best_man_tamer_p', name:'تامر', role:'أعز أصدقاء معتز', img: IMG_BASE_POSTPONEDENGAGEMENT + 'tamer_p.jpg', avatarEmoji:'🤵',
      alibi:'قال إنه كان جوه الاحتفال طول الوقت، معاه أفراد العيلة.',
      questions:[
        { q:'معتز كان بيتصرف طبيعي قبل ما يخرج؟', unlockId:'tamer_p_behavior',
          a:'"كان متوتر شوية، بس ده طبيعي في يوم زي ده، مفيش حاجة غريبة لفتت نظري."' },
        { q:'قالك حاجة عن نيته يخرج بره؟', requires:['tamer_p_behavior'], unlockId:'tamer_p_confession',
          a:'(بيتردد) "قالي إنه لازم يكلم حد مهم قبل الحفل، ما قالش مين بالظبط."' },
      ]
    },
    {
      id:'brides_father_sameh_p', name:'سامح', role:'والد هنا، العروسة', img: IMG_BASE_POSTPONEDENGAGEMENT + 'sameh_p.jpg', avatarEmoji:'👔',
      alibi:'قال إنه كان مستقبل الضيوف داخل الشقة طول الوقت.',
      questions:[
        { q:'كانت عندك أي تحفظات على معتز كعريس لابنتك؟', unlockId:'sameh_p_reservations',
          a:'"صراحة، كان عندي شكوك في وضعه المالي، طلبت منه توضيحات قبل الخطوبة."' },
        { q:'كلمت معتز بشكل خاص قبل الحفل؟', requires:['sameh_p_reservations'], unlockId:'sameh_p_private_talk',
          a:'(بيتردد) "قابلته لحظة قبل ما ينزل، ذكرته بالتوضيحات اللي طلبتها، بس مقصدتش أضغط عليه."' },
      ]
    },
    {
      id:'debt_collector_hassan_p', name:'حسن', role:'شخص معتز مديون له بمبلغ كبير', img: IMG_BASE_POSTPONEDENGAGEMENT + 'hassan_p.jpg', avatarEmoji:'💰',
      alibi:'قال إنه ماكانش قريب من مكان الاحتفال خالص.',
      questions:[
        { q:'علاقتك بمعتز كانت إيه؟', unlockId:'hassan_p_debt',
          a:'"مديون ليّ بمبلغ كبير من مشروع فشل، كان لازم يسدد قبل الخطوبة."' },
        { q:'كنت متصل بيه في يوم الاحتفال؟', requires:['hassan_p_debt'],
          a:'(بيتردد) "اتصلت بيه أذكره بالموعد النهائي للسداد، كان متوتر جدًا في المكالمة."' },
        { q:'الكاميرا صورت عربيتك، ومعتز اتلاقى في المخزن المرتبط بيك — عايز تفسر؟', requires:['hassan_p_vehicle_camera','moutaz_rescued_verified_v2'], closesInterrogation:true,
          a:'(بيصمت طويل) "قابلته عشان حقي. ركب معايا نتكلم، ولما رفض يدبر الفلوس منعته يمشي وخدته للمخزن القديم. ماكنتش ناوي أأذيه."' },
      ]
    },
  ],

  evidence: [
    { id:'last_text_message', tag:'من موبايل معتز', crit:false, title:'آخر رسالة من معتز', img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-text.jpg',
      short:'رسالة على موبايل تامر بتقول "نازل أستنشق هوا وأرجع حالاً"',
      full:'آخر رسالة وصلت لتامر من معتز بتقول إنه نازل يستنشق هوا ويرجع حالاً. موبايل معتز نفسه كان معاه واُغلق بعد خروجه.',
      unlocked:true, order:1 },

    { id:'dalia_p_breakup', tag:'من استجواب داليا', crit:false, title:'انفصال داليا ومعتز', img:null,
      short:'داليا انفصلت عن معتز بشكل مفاجئ',
      full:'داليا اعترفت بانفصالها المفاجئ عن معتز، وإنها لسه متأثرة من الطريقة اللي حصل بيها الانفصال.',
      unlocked:false, order:2 },

    { id:'dalia_p_contact', tag:'من استجواب داليا', crit:false, title:'رسالة داليا الأخيرة', img:null,
      short:'داليا بعتت رسالة لمعتز قبل الاحتفال بيوم',
      full:'داليا اعترفت بإرسال رسالة لمعتز قبل الاحتفال بيوم واحد، بتسأله لو متأكد من قراره الزواج.',
      unlocked:false, order:3 },

    { id:'tamer_p_behavior', tag:'من استجواب تامر', crit:false, title:'توتر معتز الطبيعي', img:null,
      short:'معتز كان متوتر بشكل طبيعي زي أي عريس',
      full:'تامر أكد إن توتر معتز كان طبيعي في يوم زي ده، من غير أي علامات غير عادية واضحة.',
      unlocked:false, order:4 },

    { id:'tamer_p_confession', tag:'من استجواب تامر', crit:true, title:'نية معتز للتواصل مع حد', img:null,
      short:'معتز كان لازم يكلم حد مهم قبل الحفل',
      full:'تامر كشف إن معتز قاله إنه لازم يكلم حد مهم قبل الحفل، من غير ما يحدد هوية الشخص ده.',
      unlocked:false, order:5 },

    { id:'sameh_p_reservations', tag:'من استجواب سامح', crit:true, title:'شكوك سامح المالية', img:null,
      short:'سامح كان عنده شكوك في الوضع المالي لمعتز',
      full:'سامح اعترف بوجود شكوك في الوضع المالي لمعتز، وطلب منه توضيحات قبل الخطوبة.',
      unlocked:false, order:6 },

    { id:'sameh_p_private_talk', tag:'من استجواب سامح', crit:false, title:'لقاء سامح الأخير بمعتز', img:null,
      short:'سامح قابل معتز لحظة قبل ما ينزل',
      full:'سامح أكد إنه قابل معتز لحظة قبل ما ينزل، وذكّره بالتوضيحات المالية المطلوبة منه.',
      unlocked:false, order:7 },

    { id:'hassan_p_debt', tag:'من استجواب حسن', crit:true, title:'دين معتز الكبير', img:null,
      short:'معتز مديون لحسن بمبلغ كبير من مشروع فاشل',
      full:'حسن اعترف إن معتز مديون له بمبلغ كبير من مشروع تجاري فشل، وكان لازم يسدد قبل الخطوبة.',
      unlocked:false, order:8 },

    { id:'hassan_p_pressure_call', tag:'من سجل مكالمات معتز', crit:true, title:'مكالمة ضغط من حسن', img: IMG_BASE_POSTPONEDENGAGEMENT + 'engagement-call.jpg',
      short:'حسن اتصل بمعتز في يوم الاحتفال يذكره بالسداد',
      full:'سجل المكالمات بيوضح اتصال من حسن لمعتز في نفس يوم الاحتفال، بيذكره بموعد نهائي للسداد.',
      unlocked:false, order:9 },

    { id:'hassan_p_location_witness', tag:'تحريات ميدانية', crit:true, title:'شهادة بواب العمارة', img:null,
      short:'البواب شاف معتز بيتكلم مع حسن قدام العمارة',
      full:'البواب أكد إنه شاف معتز واقف مع حسن بجوار عربية رمادية بعد خروجه بدقايق، رغم إن حسن أنكر وجوده في المنطقة.',
      unlocked:false, order:10 },

    { id:'hassan_p_vehicle_camera', tag:'كاميرا العمارة المقابلة', crit:true, title:'عربية حسن في الكاميرا', img:null,
      short:'الكاميرا سجلت معتز وهو بيركب عربية حسن',
      full:'كاميرا العمارة المقابلة سجلت رقم عربية حسن ومعتز بيركب بجواره. العربية تحركت فورًا ناحية الطريق الزراعي.',
      unlocked:false, order:11 },

    { id:'vehicle_last_camera', tag:'كاميرات الطريق', crit:true, title:'آخر ظهور للعربية', img:null,
      short:'العربية اختفت من الكاميرات عند مدخل المنطقة الصناعية',
      full:'تتبع كاميرات الطريق وضع عربية حسن عند مدخل المنطقة الصناعية، لكن المنطقة فيها عدة مخازن ومفيش تصوير داخلي يحدد أي واحد منها.',
      unlocked:false, order:12 },

    { id:'hassan_warehouse_registry', tag:'سجل الملكية والتأجير', crit:true, title:'مخزن مرتبط بحسن', img:null,
      short:'سجل الإيجارات كشف مخزنًا قديمًا باسم شريك سابق لحسن',
      full:'مراجعة عقود المخازن داخل المنطقة كشفت إن حسن كان ضامنًا لعقد مخزن قديم مسجل باسم شريك سابق. المعلومة تحدد مشتبهًا في المكان، لكنها لا تثبت وجود معتز داخله.',
      unlocked:false, order:13 },

    { id:'warehouse_live_signal', tag:'تحريات فنية', crit:true, title:'إشارة هاتف داخل المخزن', img:null,
      short:'آخر اتصال لموبايل معتز بالشبكة خرج من محيط المخزن',
      full:'طلب تحديد النطاق الفني أظهر إن موبايل معتز اتصل بالشبكة لثوانٍ من محيط المخزن المرتبط بحسن. دي أول قرينة مباشرة تسمح بطلب إذن المداهمة.',
      unlocked:false, order:14 },

    { id:'moutaz_rescued_verified_v2', tag:'نتيجة المداهمة', crit:true, title:'العثور على معتز وإنقاذه', img:null,
      short:'المداهمة عثرت على معتز محتجزًا داخل المخزن',
      full:'بعد اكتمال قرائن السيارة والملكية وإشارة الهاتف، تمت مداهمة المخزن. عُثر على معتز حيًا، وأكد إن حسن منعه من المغادرة بعد خلاف الدين.',
      unlocked:false, order:15 },
  ],

  investigationActions: [
    {
      id:'engagement_check_call_records', kind:'فحص رقمي', label:'اطلب سجل مكالمات معتز',
      description:'راجع الاتصالات الواردة قبل اختفاء معتز بدل الاعتماد على أقوال المشتبهين.',
      resultEvidenceIds:['hassan_p_pressure_call'],
      successText:'السجل أثبت مكالمة ضغط من حسن قبل خروج معتز بوقت قصير.'
    },
    {
      id:'engagement_question_doorman', kind:'تحريات', label:'اسأل بواب العمارة',
      description:'اعرف مين كان واقف قدام العمارة وقت خروج معتز.',
      resultEvidenceIds:['hassan_p_location_witness'],
      successText:'البواب أكد وجود حسن وعربيته قدام العمارة.'
    },
    {
      id:'engagement_review_camera', kind:'كاميرات', label:'راجع كاميرا العمارة المقابلة',
      description:'راجع توقيت خروج معتز واتجاه العربية اللي غادرت بالمكان.',
      requires:['hassan_p_location_witness'],
      resultEvidenceIds:['hassan_p_vehicle_camera'],
      successText:'الكاميرا أثبتت إن معتز ركب عربية حسن وسجلت رقمها واتجاهها.'
    },
    {
      id:'engagement_track_vehicle_route_v2', kind:'تتبع كاميرات', label:'تتبّع خط سير العربية',
      description:'راجع كاميرات الطريق وحدد آخر نقطة ظهرت فيها العربية. الخطوة دي لا تحدد مكان معتز وحدها.',
      requires:['hassan_p_vehicle_camera'],
      resultEvidenceIds:['vehicle_last_camera'],
      successText:'العربية اختفت من التغطية عند مدخل المنطقة الصناعية.'
    },
    {
      id:'engagement_check_warehouse_registry_v2', kind:'تحريات ملكية', label:'راجع سجلات مخازن المنطقة',
      description:'ضيّق نطاق البحث من عشرات المخازن إلى الأماكن المرتبطة بحسن أو شركائه.',
      requires:['vehicle_last_camera','hassan_p_debt'],
      resultEvidenceIds:['hassan_warehouse_registry'],
      successText:'ظهر مخزن قديم مرتبط بعقد كان حسن ضامنًا له.'
    },
    {
      id:'engagement_trace_phone_signal_v2', kind:'تتبع فني', label:'اطلب نطاق آخر إشارة لهاتف معتز',
      description:'قارن آخر اتصال للشبكة بموقع المخزن قبل طلب إذن المداهمة.',
      requires:['hassan_warehouse_registry','hassan_p_pressure_call'],
      resultEvidenceIds:['warehouse_live_signal'],
      successText:'آخر إشارة للهاتف خرجت من محيط المخزن المرتبط بحسن.'
    },
    {
      id:'engagement_raid_verified_warehouse_v2', kind:'مداهمة', label:'استصدر إذنًا وداهم المخزن',
      description:'المداهمة لا تتاح إلا بعد اكتمال مسار السيارة، رابط الملكية، وإشارة الهاتف.',
      requires:['vehicle_last_camera','hassan_warehouse_registry','warehouse_live_signal'],
      resultEvidenceIds:['moutaz_rescued_verified_v2'],
      successText:'تم العثور على معتز وإنقاذه بعد اكتمال سلسلة التتبع.'
    },
  ],

  contradictionPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  alibiGridPuzzle: {
    enabled: false,
    tabLabel: 'جدول مواقع الليلة',
    introText: 'قارن أقوال كل المشتبه بيهم عن أماكنهم في فترة اختفاء معتز، ودوّر على التناقض اللي بيكشف الكذب.',
    resultText: 'لقيت التناقض! حسن قال إنه بعيد تمامًا، لكن شهادة البواب وضعته قدام العمارة في فترة الاختفاء.',
    timeSlots: ['قبل الخروج', 'لحظة الخروج', 'فترة الاختفاء', 'وقت البلاغ'],
    suspectClaims: {
      exgirlfriend_dalia_p:  ['بعيد تمامًا', 'بعيد تمامًا', 'بعيد تمامًا', 'بعيد تمامًا'],
      best_man_tamer_p:      ['جوه الاحتفال', 'جوه الاحتفال', 'جوه الاحتفال', 'جوه الاحتفال'],
      brides_father_sameh_p: ['يستقبل ضيوف', 'يستقبل ضيوف', 'يستقبل ضيوف', 'يستقبل ضيوف'],
      debt_collector_hassan_p: ['قال: بعيد', 'قال: بعيد', 'البواب: قرب العمارة', 'قال: بعيد'],
    },
    contradictionSlotIndex: 2,
    contradictingSuspectId: 'debt_collector_hassan_p',
    resultEvidenceIds: ['hassan_p_location_witness'],
  },

  evidenceCombinations: [],

  correctSuspectId: 'debt_collector_hassan_p',
  conclusiveEvidenceIds: ['hassan_p_vehicle_camera', 'warehouse_live_signal', 'moutaz_rescued_verified_v2'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن حسن هو المسؤول عن اختفاء معتز؟',
        options: [
          { id:'a', text:'شهادة البواب وضعت حسن أمام العمارة، والكاميرا سجلت معتز داخل عربيته، وتتبع العربية قاد لمكان احتجازه' },
          { id:'b', text:'لأنه دائن لمعتز وده يكفي كدافع' },
          { id:'c', text:'لأن داليا كانت صديقته السابقة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي حصل فعليًا قدام العمارة؟',
        options: [
          { id:'a', text:'حسن قابل معتز قبل الخطوبة بسبب الدين، وبعد ما ركب معتز معاه ومنعه من النزول، أخده لمخزن قديم لإجباره على تدبير الفلوس' },
          { id:'b', text:'معتز هرب بإرادته من الزواج بسبب الضغط المالي' },
          { id:'c', text:'داليا كانت وراء اختفائه بدافع الغيرة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'الخطوبة اللي كشفت الدين',
      paragraphs:[
        'معتز كان مديون لحسن بمبلغ كبير من مشروع فشل. حسن قابله قدام العمارة قبل إعلان الخطوبة، وبعد ما ركب معتز عربيته للنقاش، منعه من النزول وأخده لمخزن قديم لإجباره على تدبير الفلوس.',
        'شهادة البواب كسرت كذبة حسن، والكاميرا سجلت رقم عربيته ومعتز بداخلها، ثم قاد التتبع للمخزن. المداهمة أنقذت معتز، وشهادته أكدت واقعة الاحتجاز.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية حسن، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'ما تكتفيش بالدافع والمكالمة. هات شهادة البواب، راجع الكاميرا، واتبع العربية لحد مكان معتز قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ومعتز فضل في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "خطوبة مؤجلة"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant living room decorated for an
   engagement ceremony, empty chairs facing each other, warm ambient
   lighting, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (engagement-scene1.jpg):
   "Photorealistic wide shot of two families gathered in a decorated
   living room for an engagement ceremony, warm ambient lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (engagement-scene2.jpg):
   "Photorealistic shot of a young man in a formal suit walking out
   of an apartment building at dusk, natural lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (engagement-scene3.jpg):
   "Photorealistic shot of worried family members searching a street
   outside an apartment building at dusk, natural lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (engagement-scene4.jpg):
   "Photorealistic shot of a woman in an elegant dress handing a
   phone to an investigator in a living room, warm indoor lighting,
   photorealistic, no text, no watermark"

   داليا (dalia_p.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual outfit,
   sorrowful guarded expression, sitting in a living room, soft
   natural lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   تامر (tamer_p.jpg):
   "Photorealistic portrait of a young Egyptian man in a formal suit,
   worried concerned expression, standing in a decorated living room,
   warm ambient lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   سامح (sameh_p.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, formal
   outfit, composed guarded expression, standing in a decorated
   living room, warm ambient lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   حسن (hassan_p.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   sharp outfit, tense calculating expression, standing outside an
   apartment building, dusk lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل الرسالة (engagement-text.jpg):
   "Photorealistic close-up of a smartphone screen showing a text
   message conversation, soft phone glow lighting, no text, no
   watermark, photorealistic"

   دليل المكالمة (engagement-call.jpg):
   "Photorealistic close-up of a smartphone screen showing a call log
   with a highlighted entry, soft phone glow lighting, no text, no
   watermark, photorealistic"
   ============================================================ */
