/* ============================================================
   بيانات قضية: باب 307
   قضية +18 — سيدة بتتعرض لإصابة خطيرة في غرفة فندق، وزوجها
   مختفي. كل حاجة بتشاور لخناقة زوجية، لكن كارت الفندق بيكشف
   إن حد تاني دخل الغرفة بعد خروجه.
   ============================================================ */

const IMG_BASE_ROOM307 = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/room-307/';

const CASE_ROOM_307 = {
  id: 'room-307',
  title: 'باب 307',
  caseNo: 'CASE 025',
  subtitle: 'فندق وسط البلد، القاهرة',
  coverImg: IMG_BASE_ROOM307 + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 37,
  investigationPoints: 21,
  teaser: 'سيدة بتتعرض لإصابة خطيرة في غرفة فندق، وزوجها مختفي. كل حاجة بتشاور لخناقة زوجية، لكن كارت الفندق بيكشف إن حد تاني دخل الغرفة بعد ما هو خرج.',

  isPremium: false,
  categories: ['mystery', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتعامل مع موضوع إصابة خطيرة لسيدة داخل غرفة فندق، في سياق فيه خلفية خناقات زوجية سابقة. مفيش أي وصف صريح للحادثة نفسها — التركيز بالكامل على تحليل الأدلة التقنية والوصول للفاعل الحقيقي، وعلى عدم الحكم على أي طرف بناءً على تاريخه الشخصي بس. لو الموضوع حساس بالنسبالك دلوقتي، تقدر تسيب القضية دي وترجع لها وقت تاني.',

  briefing: {
    heroImg: IMG_BASE_ROOM307 + 'cover.webp',
    heroCaption: 'CASE 025 — غرفة 307، مساء يوم عادي',
    text1: '"هالة"، سيدة متجوزة، بتتلاقى مصابة إصابة خطيرة في غرفتها بفندق وسط البلد، وزوجها "عمرو" مختفي من مكان الحادثة. كل حاجة في الظاهر بتشاور لخناقة زوجية: رسائل تهديد قديمة بينهم، خناقات معروفة في الماضي، وبصمات عمرو موجودة في الأوضة طبيعي لأنه كان نازل معاها في نفس الغرفة.',
    text2: 'لكن سجل كارت الفندق بيكشف تفصيلة غريبة: باب الغرفة اتفتح تاني بعد خروج عمرو منها بـ18 دقيقة، بكارت موظف من الفندق نفسه. أخت هالة طلبت منك تحقق بعناية، عشان توصل للحقيقة الكاملة، مش بس تحكم على عمرو بناءً على تاريخه معاها.',
    meta: [
      { label:'المصابة', value:'هالة — سيدة متجوزة' },
      { label:'الزوج المختفي', value:'عمرو' },
      { label:'التفصيلة الغريبة', value:'دخول تاني للغرفة بكارت موظف بعد خروج الزوج بـ18 دقيقة' },
      { label:'طلب التحقيق', value:'أخت هالة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قبل الحادثة',
      img: IMG_BASE_ROOM307 + 'room307-scene1.jpg',
      text:'هالة وعمرو بيوصلوا الفندق في زيارة عمل قصيرة، جو متوتر شوية بينهم واضح من نظرة الاستقبال.'
    },
    {
      scene:'المشهد ٢ — الخروج',
      img: IMG_BASE_ROOM307 + 'room307-scene2.jpg',
      text:'عمرو بيخرج من الغرفة بعد خناقة صوتها وصل للممر، ويمشي من الفندق بسرعة من غير ما يرجع.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_ROOM307 + 'room307-scene3.jpg',
      text:'موظف تنظيف بيلاقي هالة مصابة إصابة خطيرة في الغرفة بعد الموعد المحدد للتنظيف، وبيبلغ إدارة الفندق فورًا.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_ROOM307 + 'room307-scene4.jpg',
      text:'أخت هالة بتديك سجل كارت الفندق، رسائل تهديد قديمة بين هالة وعمرو، وتفاصيل عن شركة هالة اللي هي شريكة فيها.'
    },
  ],

  suspects: [
    {
      id:'amr_husband', name:'عمرو', role:'زوج هالة', img: IMG_BASE_ROOM307 + 'amr.jpg', avatarEmoji:'😟',
      alibi:'قال إنه خرج من الغرفة بعد خناقة عادية وسابها بخير تمامًا.',
      questions:[
        { q:'إزاي كانت الخناقة اللي حصلت في الغرفة؟', unlockId:'fight_admission',
          a:'"خناقة عادية على مصاريف، ارتفع الصوت شوية، بس أنا خرجت وسبتها بخير، ماكانش في أي إصابة وقتها."' },
        { q:'حد يقدر يأكد إنك سبتها بخير؟', unlockId:'lobby_camera_amr',
          a:'"ممكن كاميرات اللوبي تأكد وقت خروجي، أنا خرجت وماكنش عندي أي سبب أرجع تاني."' },
        { q:'كان بينكم خناقات قديمة موثقة؟',
          a:'"للأسف أيوه، زواجنا كان صعب الفترة الأخيرة، بس ده مايخليش الواحد يوصل لحد أذية حد."' },
      ],
      confrontations:{
        keycard_log:'أنا خرجت من الفندق تمامًا، الدخول التاني ده مش أنا.',
        fight_admission:'أيوه اتخانقنا على المصاريف، بس ده كان قبل ما أمشي بساعة.',
        lobby_camera_amr:'الكاميرا واضحة، أنا خرجت من الفندق فعلاً ومارجعتش.',
        room_service_call:'هالة كانت بخير لما مشيت، ده اللي بيثبته اتصالها بخدمة الغرف.'
      }
    },
    {
      id:'dina_sister', name:'دينا', role:'أخت هالة، طلبت التحقيق', img: IMG_BASE_ROOM307 + 'dina.jpg', avatarEmoji:'💙',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاكي مش مقتنعة إن عمرو هو الفاعل بس؟',
          a:'"هالة كانت عندها ملف كامل عن ابتزاز داخل شركتها، كانت خايفة جدًا من حاجة تانية غير عمرو الفترة الأخيرة."' },
        { q:'هالة كانت تعمل إيه في الشركة بالضبط؟', unlockId:'blackmail_file_hint',
          a:'"شريكة في شركة استيراد، وكانت اكتشفت تلاعب في الحسابات من حد داخل الشركة، وبتجمع أدلة عن الموضوع."' },
      ],
      confrontations:{
        blackmail_file_hint:'هالة كانت بتجمع أدلة عن تلاعب مالي، عشان كده طلبت التحقيق في اختفائها.'
      }
    },
    {
      id:'walid_manager', name:'وليد', role:'مدير عام شركة هالة', img: IMG_BASE_ROOM307 + 'walid.jpg', avatarEmoji:'💼',
      alibi:'قال إنه معندوش أي علاقة بموضوع الفندق أصلًا، وكان في اجتماع عمل وقت الحادثة.',
      questions:[
        { q:'إيه علاقتك بهالة في الشركة؟', unlockId:'financial_dispute',
          a:'"شركاء في الشركة، بس كان في خلاف مؤخرًا على تحويلات مالية غريبة اكتشفتها في الحسابات، اتهمتني إني وراها بشكل غير مباشر."' },
        { q:'كنت عارف إنها هتكون في الفندق ده الليلة؟',
          a:'"معرفش تفاصيل جدولها الشخصي، بس ممكن يكون حد من الشركة عارف."' },
      ],
      confrontations:{
        financial_dispute:'الخلاف ده كان على تحويلات إدارية عادية، مش حاجة تستاهل كل ده.',
        sayed_call_source:'اتصلت بسيد فعلاً، بس عشان طلب رسمي بس مش أكتر من كده.',
        corridor_camera_walid:'أنا رحت أسلّم عليها بس، وخرجت لوحدي بعد كده عادي.'
      }
    },
    {
      id:'sayed_employee', name:'سيد', role:'موظف استقبال في الفندق', img: IMG_BASE_ROOM307 + 'sayed.jpg', avatarEmoji:'🔑',
      alibi:'قال إنه فتح الغرفة بكارته لمندوب قال إنه جاي من شركة هالة، لكنه رجع للاستقبال والمندوب فضل جوه.',
      questions:[
        { q:'ليه دخلت غرفة 307 بعد خروج عمرو بـ18 دقيقة؟', unlockId:'keycard_reason',
          a:'"جالي اتصال من واحد قال إنه من شركة هالة وإن مندوب جاي يسلّم ظرف مهم. لما الراجل وصل، خدته لحد 307 وفتحت له بكارتي، وبعدها رجعت الاستقبال."' },
        { q:'الطلب ده جالك إزاي بالظبط؟', unlockId:'sayed_call_source',
          a:'"مكالمة على خط الاستقبال من راجل معاه اسم هالة ورقم الحجز. بعدها بدقايق وصل شخص قال إنه المندوب المقصود."' },
        { q:'كاميرا الممر بتبين إن الشخص اللي دخل معاك هو وليد، وهو نفسه كان قايل إنه في اجتماع بعيد عن الفندق — اتعرفت عليه وقتها؟', requires:['sayed_call_source','corridor_camera_walid'], closesInterrogation:true,
          a:'(بيبص للصورة) "أيوه، ده نفس الراجل. أنا ماكنتش أعرفه، والموضوع اتقدملي كأنه تسليم مستندات رسمي. فتحت الباب ومشيت، وهو فضل جوه."' },
      ],
      confrontations:{
        keycard_log:'دخلت الغرفة تاني عشان طلب رسمي، مفيش داعي نكبر الموضوع.',
        keycard_reason:'قالولي إني أسلّم ظرف مستندات، وده اللي عملته بالظبط.',
        sayed_call_source:'المكالمة جاتلي من وليد نفسه، هو اللي طلب مني أدخل.',
        corridor_camera_walid:'وليد كان معايا في الممر فعلاً، وأنا خرجت الأول بعد ما سلّمت الظرف.'
      }
    },
  ],

  evidence: [
    { id:'keycard_log', tag:'من سجل كارت الفندق', crit:true, title:'سجل دخول وخروج الغرفة', img: IMG_BASE_ROOM307 + 'room307-keycard.jpg', unlocksTimeline:true,
      short:'دخول تاني للغرفة بعد خروج عمرو بـ18 دقيقة بكارت موظف',
      full:'سجل كارت الفندق بيوضح دخول تاني للغرفة بعد خروج عمرو بـ18 دقيقة بالظبط، باستخدام كارت موظف الاستقبال سيد.',
      unlocked:true, order:1 },

    { id:'fight_admission', tag:'من استجواب عمرو', crit:false, title:'اعتراف عمرو بالخناقة', img:null,
      short:'اعترف بخناقة على مصاريف قبل خروجه',
      full:'عمرو اعترف بخناقة على مصاريف قبل خروجه من الغرفة، لكنه أكد إنه سابها بخير تمامًا وقتها.',
      unlocked:false, order:2 },

    { id:'lobby_camera_amr', tag:'من كاميرات اللوبي', crit:true, title:'خروج عمرو المؤكد', img:null,
      short:'كاميرات اللوبي بتأكد خروج عمرو من الفندق تمامًا',
      full:'كاميرات اللوبي بتؤكد خروج عمرو من الفندق نهائيًا في التوقيت اللي قاله بالظبط، ومفيش أي عودة له بعد كده.',
      unlocked:false, order:3 },

    { id:'blackmail_file_hint', tag:'من استجواب دينا', crit:false, title:'ملف الابتزاز عند هالة', img:null,
      short:'هالة كانت بتجمع أدلة عن تلاعب مالي داخل الشركة',
      full:'دينا أكدت إن هالة كانت بتجمع أدلة عن تلاعب مالي داخل شركتها، وكانت خايفة جدًا الفترة الأخيرة.',
      unlocked:false, order:4 },

    { id:'financial_dispute', tag:'من استجواب وليد', crit:true, title:'خلاف مالي بين وليد وهالة', img:null,
      short:'خلاف على تحويلات مالية غريبة اكتشفتها هالة',
      full:'وليد اعترف بخلاف مالي حقيقي مع هالة على تحويلات غريبة اكتشفتها في حسابات الشركة، واتهمته بشكل غير مباشر.',
      unlocked:false, order:5 },

    { id:'keycard_reason', tag:'من استجواب سيد', crit:false, title:'تبرير سيد لدخوله الغرفة', img:null,
      short:'ادعى تسليم ظرف مستندات بناءً على مكالمة تليفونية',
      full:'سيد برر دخوله الغرفة بطلب هاتفي لتسليم ظرف مستندات، بدا له رسميًا تمامًا في وقتها.',
      unlocked:false, order:6 },

    { id:'sayed_call_source', tag:'من سجل مكالمات الفندق', crit:true, title:'مصدر المكالمة اللي طلبت من سيد يدخل', img: IMG_BASE_ROOM307 + 'room307-calllog.jpg',
      short:'رقم المتصل مسجل باسم وليد شخصيًا',
      full:'سجل مكالمات الفندق بيوضح إن الرقم اللي طلب من سيد يدخل الغرفة مسجل باسم وليد شخصيًا، مش أي جهة رسمية من شركة هالة.',
      unlocked:false, order:7 },

    { id:'room_service_call', tag:'من سجل خدمة الغرف', crit:true, title:'هالة كانت بخير بعد خروج عمرو', img:null,
      short:'بعد خروج عمرو بسبع دقايق هالة كلمت خدمة الغرف بنفسها وطلبت مية',
      full:'تسجيل خدمة الغرف يثبت إن هالة اتصلت بعد خروج عمرو بسبع دقايق، واتكلمت بشكل طبيعي وطلبت زجاجة مية. ده دليل زمني مستقل إنها ما كانتش مصابة وقت خروجه.',
      unlocked:false, order:8 },

    { id:'corridor_camera_walid', tag:'من كاميرا ممر الدور', crit:true, title:'وليد دخل مع سيد وخرج لوحده', img:null,
      short:'الكاميرا بتظهر وليد ماشي مع سيد للغرفة، ثم خارج من الممر لوحده بعد دقائق',
      full:'كاميرا الممر بتظهر سيد وهو بيفتح باب 307 لرجل اتعرف عليه لاحقًا إنه وليد. سيد يرجع ناحية المصعد بعد ثواني، بينما وليد يفضل جوه ويظهر خارج لوحده بعد عدة دقائق.',
      unlocked:false, order:9 },

  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن الأقوال دي كويس. اتنين منها بيتعارضوا مع بعض بشكل واضح.',
    resultText: 'التناقض واضح: وليد قال إنه ماكانش له علاقة بالفندق وكان في اجتماع، لكن المكالمة خرجت من خطه وكاميرا الممر بتظهره داخل ناحية غرفة 307 في نفس الفترة.',
    resultEvidenceIds: ['sayed_call_source'],
    statements: [
      { id:'st1', text:'"معنديش أي علاقة بموضوع الفندق أصلًا."', source:'وليد — في الاستجواب' },
      { id:'st2', text:'المكالمة خرجت من خط وليد، وكاميرا الممر تظهره داخل الفندق متجهًا لغرفة 307.', source:'دليل: سجل المكالمات وكاميرا الممر' },
      { id:'st3', text:'"خرجت وسبتها بخير تمامًا، ماكانش في أي إصابة وقتها."', source:'عمرو — في الاستجواب' },
      { id:'st4', text:'"معنديش أي علاقة بموضوع الفندق أصلًا."', source:'وليد — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث',
    introText: 'رتب أحداث الليلة بالترتيب الصح، عشان توضح إن الإصابة حصلت بعد خروج عمرو مش قبله.',
    events: [
      { id:'e1', text:'عمرو وهالة بيتخانقوا في الغرفة على مصاريف.' },
      { id:'e2', text:'عمرو بيخرج من الغرفة ومن الفندق نهائيًا، حسب كاميرات اللوبي.' },
      { id:'e3', text:'هالة بتطلب مية من خدمة الغرف بعد خروج عمرو بسبع دقايق، وصوتها طبيعي.' },
      { id:'e4', text:'سيد بيفتح الغرفة بكارته لوليد بعد خروج عمرو بـ18 دقيقة، ثم يرجع للاستقبال ووليد يفضل جوه.' },
      { id:'e5', text:'وليد بيخرج من الممر لوحده، وبعدها موظف التنظيف بيلاقي هالة مصابة.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'الترتيب بقى واضح: هالة كانت بخير بعد خروج عمرو، وبعدها سيد فتح الباب لوليد ورجع للاستقبال، ووليد فضل جوه لحد ما ظهر خارج الممر لوحده قبل اكتشاف الإصابة.',
    resultEvidenceIds: ['keycard_reason'],
  },

  evidenceCombinations: [
    { parts:['lobby_camera_amr','keycard_log'], resultId:'room_service_call' },
    { parts:['sayed_call_source','keycard_reason'], resultId:'corridor_camera_walid' },
  ],

  correctSuspectId: 'walid_manager',
  conclusiveEvidenceIds: ['room_service_call', 'financial_dispute', 'sayed_call_source', 'corridor_camera_walid'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن وليد هو المسؤول الحقيقي؟',
        options: [
          { id:'a', text:'هالة كانت بخير بعد خروج عمرو + المكالمة خرجت من خط وليد + كاميرا الممر أثبتت دخوله وبقاءه في الغرفة' },
          { id:'b', text:'لأنه مدير الشركة وده كافي' },
          { id:'c', text:'لأنه رفض الإجابة في الأول' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyamr',
        label:'إزاي اتأكدت إن عمرو مش الفاعل رغم تاريخه معاها؟',
        options: [
          { id:'a', text:'كاميرات اللوبي أثبتت خروجه، وبعدها هالة كلمت خدمة الغرف بنفسها، ثم حصل دخول جديد للغرفة من غير رجوع عمرو' },
          { id:'b', text:'لأنه بدا صادق أثناء الاستجواب' },
          { id:'c', text:'لأن دينا دافعت عنه' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة أبعد من الخناقة الزوجية',
      paragraphs:[
        'وليد كان خايف من الملف المالي اللي هالة بتجمعه، واستغل خناقتها مع عمرو كغطاء جاهز. اتصل بالاستقبال ورتب دخوله على إنه مندوب من الشركة. سيد فتح له باب 307 بحسن نية ورجع للاستقبال، بينما وليد فضل وحده مع هالة في الفترة اللي حصلت فيها الإصابة.',
        'اللي برّأ عمرو من واقعة الليلة كان اتصال هالة بخدمة الغرف بعد خروجه. واللي ربط وليد بالفعل كان سجل المكالمة وكاميرا الممر اللي أظهرت دخوله وبقاءه في الغرفة. كده التحقيق اتبنى على أحداث الليلة نفسها، مش على تاريخ العلاقة الزوجية.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية وليد، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: خلافه المالي، سجل المكالمات، وكاميرات اللوبي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName} بناءً على تاريخه الشخصي بس، بينما المسؤول الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "باب 307"

   الغلاف (cover.webp):
   "Photorealistic shot of a hotel room door with a number plate,
   slightly ajar, dim hallway lighting, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (room307-scene1.jpg):
   "Photorealistic shot of a couple checking into an upscale hotel
   lobby, tense body language, warm ambient lighting, photorealistic,
   no text, no watermark"

   المشهد ٢ (room307-scene2.jpg):
   "Photorealistic shot of a man walking quickly through a hotel
   hallway toward an elevator, dim lighting, photorealistic, no text,
   no watermark"

   المشهد ٣ (room307-scene3.jpg):
   "Photorealistic shot of a hotel housekeeping cart in a hallway
   outside a partially open door, dim lighting, photorealistic, no
   text, no watermark"

   المشهد ٤ (room307-scene4.jpg):
   "Photorealistic shot of a hotel security office with monitors
   showing hallway camera feeds, professional lighting, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   عمرو (amr.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, business
   attire, worried anxious expression, standing in a hotel lobby,
   professional hotel lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دينا (dina.jpg):
   "Photorealistic portrait of a professional Egyptian woman, formal
   business attire, concerned protective expression, standing in a
   hotel corridor, professional hotel lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   وليد (walid.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male company
   manager, formal suit, composed guarded expression, standing in a
   hotel lobby, professional hotel lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سيد (sayed.jpg):
   "Photorealistic portrait of a young Egyptian male hotel
   receptionist, formal hotel uniform, alert professional expression,
   standing behind a hotel front desk, professional hotel lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل سجل الكارت (room307-keycard.jpg):
   "Photorealistic close-up of a hotel keycard access log on a
   computer screen showing timestamped entries, dark mode UI, no
   text, no watermark, photorealistic"

   دليل سجل المكالمات (room307-calllog.jpg):
   "Photorealistic close-up of a hotel phone system call log
   printout, office lighting, no text, no watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_ROOM_307;
  c.evidenceCombinations = [];
  const s = c.suspects.find(x => x.id === 'hotel_reception_sayed');
  if (s) {
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيبص للصورة) "أيوه، ده نفس الراجل اللي دخلته باعتباره مندوب شركة. أنا فتحت الباب ومشيت. التعرف عليه يثبت دخوله، لكن أنا ما شفتش اللي حصل جوه."';
    }
  }
  const w = c.suspects.find(x => x.id === 'walid_manager');
  if (w) {
    const q = w.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتوتر) "كنت في الفندق فعلًا وقابلت هالة في موضوع الشركة. كذبت عشان ما أدخلش نفسي في المشكلة الزوجية، لكن وجودي هناك لوحده مش معناه إني اعتديت عليها."';
    }
  }
  c.conclusiveEvidenceIds = ['room_service_call','financial_dispute','sayed_call_source','corridor_camera_walid'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_ROOM_307;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='check_room_service_log')) c.investigationActions.push({
    id:'check_room_service_log', kind:'سجل فندقي', label:'راجع سجل خدمة الغرف',
    description:'ثبت التوقيت من سجل مستقل بدل الاعتماد على أقوال الموجودين.',
    requires:['keycard_log'], resultEvidenceIds:['room_service_call'],
    successText:'تمت مطابقة مكالمة خدمة الغرف مع توقيتات الدخول والخروج.'
  });
  if (!c.investigationActions.some(a=>a.id==='review_corridor_camera')) c.investigationActions.push({
    id:'review_corridor_camera', kind:'كاميرات', label:'راجع كاميرا ممر الدور',
    description:'حدد مين دخل وخرج في الفترة اللي حوالين دخول سيد للغرفة.',
    requires:['keycard_reason'], resultEvidenceIds:['corridor_camera_walid'],
    successText:'تم استخراج اللقطة المطلوبة من كاميرا الممر.'
  });
})();
