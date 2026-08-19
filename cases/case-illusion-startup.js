/* ============================================================
   بيانات قضية: مشروع الوهم
   قضية نصب مالي — شركة ناشئة بتدفع عوائد قديمة من فلوس مستثمرين
   جدد بدل ما يكون عندها نشاط حقيقي: مخطط بونزي متغطي في شكل ستارت أب.
   ============================================================ */

const IMG_BASE_PONZI = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/illusion-startup/';

const CASE_ILLUSION_STARTUP = {
  id: 'illusion-startup',
  title: 'مشروع الوهم',
  caseNo: 'CASE 017',
  subtitle: 'حاضنة أعمال ناشئة، السادس من أكتوبر',
  coverImg: IMG_BASE_PONZI + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 28,
  investigationPoints: 16,
  teaser: 'شركة ناشئة بتدفع عوائد ضخمة للمستثمرين القدام من فلوس مستثمرين جداد، من غير أي نشاط حقيقي ورا الستارة. مخطط بونزي كلاسيكي متغطي بلبس ستارت أب عصري.',

  isPremium: false,
  categories: ['fraud'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_PONZI + 'cover.webp',
    heroCaption: 'CASE 017 — اجتماع المستثمرين الطارئ',
    text1: 'شركة ناشئة اسمها "لوجيستيكا" وعدت بتطبيق توصيل ثوري هيغير السوق، وجمعت استثمارات من عشرات الأفراد بعائد شهري ثابت ومرتفع بشكل غير منطقي. فجأة، العائدات الشهرية توقفت، والمؤسس اختفى عن الرد على أي حد.',
    text2: 'واحدة من المستثمرات، "دنيا"، حسّت من الأول إن العائد المرتفع ده غريب، بس دخلت زي أي حد تاني. طلبت منك تحقق قبل ما باقي فلوس المستثمرين تضيع نهائيًا، وتفهم هل المشروع كان نصب من الأول ولا مجرد فشل تجاري عادي.',
    meta: [
      { label:'الشركة', value:'لوجيستيكا — شركة توصيل ناشئة' },
      { label:'المبلغ المشكوك فيه', value:'حوالي 15 مليون جنيه من عشرات المستثمرين' },
      { label:'العلامة المحذرة', value:'عائد شهري ثابت غير منطقي' },
      { label:'طلب التحقيق', value:'دنيا — مستثمرة قلقانة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — العرض التقديمي',
      img: IMG_BASE_PONZI + 'ponzi-scene1.jpg',
      text:'قاعة اجتماعات في حاضنة أعمال، المؤسس "باسل" بيقدم عرض تقديمي حماسي عن تطبيق توصيل ثوري، ومستثمرين متحمسين بيوقعوا عقود سريعة.'
    },
    {
      scene:'المشهد ٢ — العائدات المريبة',
      img: IMG_BASE_PONZI + 'ponzi-scene2.jpg',
      text:'كل شهر، المستثمرين بياخدوا عائد ثابت وعالي بشكل غير منطقي لسوق ناشئ. دنيا بتلاحظ إن التطبيق نفسه لسه مش شغال فعليًا على أرض الواقع.'
    },
    {
      scene:'المشهد ٣ — التوقف المفاجئ',
      img: IMG_BASE_PONZI + 'ponzi-scene3.jpg',
      text:'شهر بيعدي من غير أي عائد. باسل بيبرر بمشاكل تقنية مؤقتة. الشهر اللي بعده، محدش بيقدر يوصله خالص.'
    },
    {
      scene:'المشهد ٤ — اجتماع الطوارئ',
      img: IMG_BASE_PONZI + 'ponzi-scene4.jpg',
      text:'المستثمرين بيتجمعوا في اجتماع طارئ، وباسل نفسه مش موجود. عندك فرصة تحقق من جوه فريق الشركة الصغير قبل ما أي دليل يضيع.'
    },
  ],

  suspects: [
    {
      id:'basel_founder', name:'باسل', role:'المؤسس المعلن للشركة', img: IMG_BASE_PONZI + 'basel.jpg', avatarEmoji:'📊',
      alibi:'مش موجود للاستجواب المباشر، بس سجلاته وتصريحاته السابقة متاحة للمراجعة.',
      questions:[
        { q:'إزاي كان بيقدر يدفع عائد شهري ثابت وعالي بشكل غير منطقي؟', unlockId:'return_source',
          a:'(من تصريح قديم مسجل) "الأرباح جاية من نمو سريع في السوق، إحنا واثقين في النموذج بشكل كامل."' },
        { q:'التطبيق كان شغال فعليًا على أرض الواقع؟', unlockId:'app_status',
          a:'(من تصريح قديم) "التطبيق في مرحلة تجريبية متقدمة، هيتم إطلاقه رسميًا قريب جدًا."' },
      ]
    },
    {
      id:'donia_investor', name:'دنيا', role:'مستثمرة، طلبت التحقيق', img: IMG_BASE_PONZI + 'donia.jpg', avatarEmoji:'💼',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاكي تشكي من الأول؟',
          a:'"العائد كان عالي بشكل مش منطقي لسوق لسه بادئ، وكل ما سألت عن تفاصيل تقنية أكتر، كنت بلاقي إجابات عامة جدًا."' },
        { q:'حد تاني من فريق الشركة كنتِ بتتعاملي معاه؟', unlockId:'ops_manager_hint',
          a:'"كريم، مسؤول العمليات، هو اللي كان بيرد على أغلب أسئلتي التقنية، مش باسل نفسه."' },
      ]
    },
    {
      id:'karim_ops', name:'كريم', role:'مسؤول العمليات، الوجه الإداري اليومي للشركة', img: IMG_BASE_PONZI + 'karim.jpg', avatarEmoji:'📱',
      alibi:'قال إنه بس موظف منفذ، والقرارات المالية كلها كانت من باسل.',
      questions:[
        { q:'كنت عارف إن العائدات مالهاش مصدر حقيقي؟', unlockId:'karim_knew',
          a:'(بيتردد) "بصراحة، كان في شكوك عندي من فترة، بس باسل كان بيأكد إن كل حاجة تحت السيطرة."' },
        { q:'كنت بترد على أسئلة المستثمرين التقنية إزاي من غير معلومات حقيقية؟',
          a:'"باسل كان بيديني إجابات جاهزة أرد بيها، أنا كنت بنقل كلامه بس مش بخترع حاجة من عندي."' },
      ]
    },
    {
      id:'mariam_accountant', name:'مريم', role:'محاسبة الشركة', img: IMG_BASE_PONZI + 'mariam.jpg', avatarEmoji:'🧮',
      alibi:'قالت إنها بس بتسجل حركة الفلوس اللي بتوصلها من باسل مباشرة.',
      loseMsg:'مريم كانت بس بتنفذ تسجيل محاسبي حسب تعليمات باسل المباشرة، ومفيش أي دليل إنها كانت عارفة بطبيعة النظام الهرمي أو شاركت في تصميمه.',
      questions:[
        { q:'مصدر الفلوس اللي بتدخلي بيها العائدات الشهرية إيه؟', unlockId:'payment_source',
          a:'"بتيجي من حساب الشركة الرئيسي، أنا بس بوزعها على المستثمرين حسب تعليمات باسل، مش بتتبع مصدرها الأصلي."' },
        { q:'لاحظتي نمط غريب في حركة الفلوس؟',
          a:'"صراحة أيوه، فلوس مستثمرين جدد كانت بتدخل وبتتحول بسرعة لعائدات مستثمرين قدام، بس ماكنتش متأكدة لو ده طبيعي في مجال زي ده."' },
      ]
    },
  ],

  evidence: [
    { id:'financial_records', tag:'من سجلات الشركة المالية', crit:true, title:'حركة الأموال الكاملة', img: IMG_BASE_PONZI + 'ponzi-records.jpg', unlocksCodeLock:true,
      short:'سجلات مالية مشفرة على لابتوب باسل الشخصي',
      full:'لابتوب باسل الشخصي فيه سجلات مالية كاملة للشركة، مقفول برقم سري من 4 أرقام.',
      unlocked:true, order:1 },

    { id:'return_source', tag:'من تصريحات باسل القديمة', crit:false, title:'ادعاء باسل عن مصدر الأرباح', img:null,
      short:'ادعى نمو سريع في السوق كمصدر للأرباح',
      full:'باسل قال إن العائد جاي من نمو النشاط، لكن عقد المستثمرين الدعائي كان بيوعد بعائد ثابت 8% شهريًا تقريبًا، من غير كشف مالي يشرح مصدره.',
      unlocked:false, order:2 },

    { id:'app_status', tag:'من تصريحات باسل القديمة', crit:true, title:'ادعاء وجود تطبيق جاهز تقريبًا', img:null,
      short:'ادعى إن التطبيق "في مرحلة تجريبية متقدمة"',
      full:'باسل ادعى إن التطبيق في مرحلة تجريبية متقدمة. أوراق تأسيس الشركة بتوضح إنها اتسجلت رسميًا سنة 2021، ومع كده مفيش سجل تشغيل فعلي أو طلبات توصيل حقيقية بالحجم اللي يبرر العوائد.',
      unlocked:false, order:3 },

    { id:'ops_manager_hint', tag:'من استجواب دنيا', crit:false, title:'دور كريم في التواصل مع المستثمرين', img:null,
      short:'كريم كان الوسيط الرئيسي مع المستثمرين',
      full:'دنيا أكدت إن كريم هو اللي كان بيرد على أغلب الأسئلة التقنية للمستثمرين، مش باسل مباشرة.',
      unlocked:false, order:4 },

    { id:'karim_knew', tag:'من استجواب كريم', crit:false, title:'اعتراف جزئي بشكوك كريم', img:null,
      short:'كريم اعترف بشكوك سابقة تجاهلها',
      full:'كريم اعترف بشكل متردد بوجود شكوك سابقة عنده حول مصدر العائدات، لكنه تجاهلها بناءً على تأكيدات باسل.',
      unlocked:false, order:5 },

    { id:'payment_source', tag:'من استجواب مريم', crit:true, title:'نمط تحويل الفلوس', img:null,
      short:'فلوس مستثمرين جدد بتتحول مباشرة لعائدات مستثمرين قدام',
      full:'مريم وصفت نمط واضح لمخطط بونزي: مبالغ داخلة من مستثمرين جدد كانت بتخرج بعدها كعوائد لمستثمرين أقدم، من غير مصدر تشغيل مستقل يفسر المدفوعات.',
      unlocked:false, order:6 },

    { id:'no_real_revenue', tag:'من فك تشفير السجلات', crit:true, title:'غياب أي دخل حقيقي من التطبيق', img: IMG_BASE_PONZI + 'ponzi-decrypted.jpg',
      short:'السجلات المفكوكة بتوضح صفر دخل فعلي من عمليات توصيل حقيقية',
      full:'بعد فتح سجلات باسل، مفيش دخل تشغيلي يُذكر من عمليات توصيل، بينما حركة الحسابات بتبين إن دفعات المستثمرين الجدد كانت المصدر الأساسي للعوائد القديمة. رسائل داخلية من باسل بتوضح إنه كان متابع التدفقات دي ومصرّ على استمرار جمع أموال جديدة لتغطية المدفوعات.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  matchPuzzle: { enabled:false },

  codeLockPuzzle: {
    enabled: true,
    tabLabel: 'فك تشفير سجلات باسل',
    introText: 'لابتوب باسل مقفول بكود 4 أرقام. عندك خيطين: أوراق الشركة بتقول إن لوجيستيكا اتأسست سنة 2021، وعقد المستثمرين القديم كان بيوعد بعائد شهري 8%. ملاحظة على جراب اللابتوب مكتوب فيها: «آخر رقمين من سنة البداية، وبعدهم العائد برقمين».',
    code: '2108',
    hint: 'استخدم آخر رقمين من سنة التأسيس، وبعدهم نسبة العائد بصيغة رقمين',
    wrongMsg: '✗ الرقم غلط، جرب تاني.',
    resultText: 'اتفتحت السجلات. حركة الفلوس بتبين إن العوائد القديمة كانت بتتدفع أساسًا من أموال مستثمرين جدد، ومفيش نشاط توصيل بالحجم اللي يفسر المدفوعات.',
    resultEvidenceIds: ['no_real_revenue'],
  },

  evidenceCombinations: [
    { parts:['app_status','payment_source'], resultId:'no_real_revenue' },
  ],

  correctSuspectId: 'basel_founder',
  conclusiveEvidenceIds: ['return_source', 'app_status', 'payment_source', 'no_real_revenue'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن باسل هو المسؤول الأساسي؟',
        options: [
          { id:'a', text:'وعد بعائد ثابت من غير مصدر واضح + مفيش تشغيل فعلي كفاية + السجلات بتبين دفع عوائد قديمة من أموال مستثمرين جدد' },
          { id:'b', text:'لأنه اختفى بعد التوقف عن العائدات' },
          { id:'c', text:'لأنه المؤسس وده كافي' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whykarim',
        label:'ليه كريم مش متهم بنفس درجة باسل؟',
        options: [
          { id:'a', text:'الأدلة بتثبت إنه تجاهل علامات خطر ونقل كلام باسل، لكن مفيش دليل في الملف إنه صمم تدفق الأموال أو أصدر أوامر الدفع بنفسه' },
          { id:'b', text:'لأنه موظف وده يبعده عن الشبهة' },
          { id:'c', text:'لأنه اعترف بمكانه بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الوهم انكشف',
      paragraphs:[
        'باسل قدّم لوجيستيكا كاستثمار في شركة توصيل، لكن السجلات كشفت مخطط بونزي: العوائد اللي بتوصل للمستثمرين الأقدم كانت جاية أساسًا من أموال مستثمرين جدد، بينما النشاط الحقيقي للتطبيق ماكانش بيولد دخل قريب من الأرقام المعلنة.',
        'اللي أثبت إن الموضوع مش مجرد فشل تجاري كان نمط التحويلات نفسه، وغياب دخل تشغيلي كافي، ورسائل باسل الداخلية اللي بتربط استمرار العوائد بدخول مستثمرين جدد. المستثمرين بقى معاهم ملف مالي واضح يقدروا يقدموه للجهات المختصة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية باسل، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة الاقتصادية.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: ادعاء التطبيق، نمط تحويل الفلوس، والسجلات المفكوكة، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والمسؤول الحقيقي فضل طليق بفلوس المستثمرين. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "مشروع الوهم"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty modern startup office meeting
   room, an unattended laptop on a glass table showing a financial
   dashboard, soft office lighting, documentary photography style,
   no text, no watermark, photorealistic"

   المشهد ١ (ponzi-scene1.jpg):
   "Photorealistic shot of a confident young Egyptian man presenting
   to investors in a modern startup meeting room, projector screen
   with growth charts, energetic lighting, photorealistic, no text,
   no watermark"

   المشهد ٢ (ponzi-scene2.jpg):
   "Photorealistic close-up of a smartphone banking app showing a
   monthly deposit notification, soft indoor lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (ponzi-scene3.jpg):
   "Photorealistic shot of a woman looking concerned at her phone,
   checking for messages, soft daylight, photorealistic, no text, no
   watermark"

   المشهد ٤ (ponzi-scene4.jpg):
   "Photorealistic shot of a tense small group of investors gathered
   in a startup office meeting room, empty chair at the head of the
   table, photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   باسل (basel.jpg):
   "Photorealistic portrait of a confident young Egyptian male startup
   founder, smart casual clothes, charismatic polished expression,
   standing in a modern startup office, modern office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دنيا (donia.jpg):
   "Photorealistic portrait of a professional young Egyptian female
   investor, sharp business attire, sharp scrutinizing expression,
   sitting in a modern office, modern office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   كريم (karim.jpg):
   "Photorealistic portrait of a young Egyptian male operations
   manager, smart casual clothes, holding a phone, busy stressed
   expression, standing in a startup office, modern office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   مريم (mariam.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female
   accountant, formal professional attire, headscarf, cautious
   meticulous expression, sitting at a desk with a laptop, modern
   office lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   دليل السجلات المالية (ponzi-records.jpg):
   "Photorealistic close-up of a laptop screen showing a financial
   spreadsheet dashboard, soft glow lighting, no text, no watermark,
   photorealistic"

   دليل السجلات المفكوكة (ponzi-decrypted.jpg):
   "Photorealistic close-up of a computer screen showing a financial
   flow chart diagram with circular arrows between accounts, dark
   mode UI, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_ILLUSION_STARTUP;
  c.conclusiveRequired = 4;
  if (c.codeLockPuzzle) {
    c.codeLockPuzzle.resultText = 'السجلات بتوضح إن مدفوعات المستثمرين الجدد كانت المصدر الأساسي للعوائد القديمة، بينما نشاط التوصيل الحقيقي محدود جدًا. ده يثبت نمط مالي هرمي ويحتاج ربطه بصاحب القرار.';
  }
})();
