/* ============================================================
   بيانات قضية: الجون اللي ما اتحسبش
   قضية قتل — حكم كورة بيموت في أوضة الـVAR بعد نهائي كأس، وكل
   الشبهة على لاعب سجل الجون الحاسم، بس الحقيقة شبكة رهانات
   على تفاصيل صغيرة جوه الماتش.
   ============================================================ */

const IMG_BASE_VAR = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/var-conspiracy/';

const CASE_VAR_CONSPIRACY = {
  id: 'var-conspiracy',
  title: 'الجون اللي ما اتحسبش',
  caseNo: 'CASE 020',
  subtitle: 'استاد كبير، ليلة نهائي الكأس',
  coverImg: IMG_BASE_VAR + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'حكم كورة بيموت في أوضة الـVAR بعد نهائي كأس، وكل الشبهة على اللاعب اللي سجل الجون الحاسم. الحقيقة شبكة رهانات على تفاصيل صغيرة محدش كان واخد باله منها.',

  isPremium: false,
  categories: ['sports', 'murder'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_VAR + 'cover.webp',
    heroCaption: 'CASE 020 — بعد النهائي بساعتين',
    text1: 'قبل نهائي كأس مهم جدًا، حكم الماتش الرئيسي بيتلاقى ميت في أوضة الـVAR بعد صافرة النهاية بحوالي ساعة وربع. الشبهة الأولى بتروح للاعب اللي سجل الجون الحاسم اللي الحكم كان لغاه في الأول قبل ما يراجعه بالـVAR ويحتسبه. الغريب إن تسجيل الشاشة التقني لمحطة الـVAR بعد الماتش فيه فجوة 17 ثانية اتحذفت وقت ما الحكم رجع يراجع سجلات البيانات.',
    text2: 'قبل موته بشوية، الحكم بعت رسالة غريبة لصديق قديم: "الماتش ده متباع… بس مش بالطريقة اللي فاكرينها." اتحاد الكرة طلب منك تحقق بسرعة وسرية تامة، قبل ما الفضيحة تنفجر وتهدد مصداقية البطولة كلها.',
    meta: [
      { label:'المجني عليه', value:'الحكم الرئيسي — نهائي الكأس' },
      { label:'مكان الحادثة', value:'أوضة الـVAR، بعد الماتش' },
      { label:'الدليل الغامض', value:'فجوة 17 ثانية في تسجيل الـVAR' },
      { label:'طلب التحقيق', value:'اتحاد الكرة، بسرية تامة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الجون الحاسم',
      img: IMG_BASE_VAR + 'var-scene1.jpg',
      text:'الدقيقة 88، اللاعب بيسجل جون، الحكم بيلغيه أول وهلة، وبعدين بيراجعه بالـVAR ويحتسبه. الملعب بينفجر فرحة وغضب في نفس الوقت.'
    },
    {
      scene:'المشهد ٢ — الرسالة الغريبة',
      img: IMG_BASE_VAR + 'var-scene2.jpg',
      text:'بعد الماتش بحوالي 40 دقيقة، الحكم بيرجع أوضة الـVAR يراجع سجلات البيانات، ويبعت لصديقه رسالة: «الماتش متباع... بس مش بالطريقة اللي فاكرينها».'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_VAR + 'var-scene3.jpg',
      text:'موظف نظافة بيلاقي الحكم ميت في أوضة الـVAR الفاضية، والشاشات لسه شغالة على آخر ريبلاي شافه قبل موته.'
    },
    {
      scene:'المشهد ٤ — التحقيق السري',
      img: IMG_BASE_VAR + 'var-scene4.jpg',
      text:'اتحاد الكرة بيقفل الموضوع تمامًا عن الإعلام، وعندك وصول لتسجيلات الماتش كاملة وكل اللي كان قريب من غرفة الـVAR.'
    },
  ],

  suspects: [
    {
      id:'yassin_player', name:'ياسين', role:'اللاعب اللي سجل الجون الحاسم', img: IMG_BASE_VAR + 'yassin.jpg', avatarEmoji:'⚽',
      alibi:'قال إنه كان في احتفال الفريق بعد الماتش طول الوقت، وسط عشرات الشهود.',
      questions:[
        { q:'إيه اللي حصل بالظبط لما الحكم راجع الجون بالـVAR؟',
          a:'"استنيت زي أي حد، اتخنقت جدًا لما لغاه في الأول، وبعدين لما احتسبه حسيت بعدالة، مش بشك في نزاهته."' },
        { q:'كنت قريب من أوضة الـVAR بعد الماتش؟',
          a:'"أبدًا، كنت في غرفة الملابس واحتفال الفريق طول الوقت، فيه كاميرات ومعاي الفريق كله."' },
      ]
    },
    {
      id:'coach_hazem', name:'الكابتن حازم', role:'مدرب الفريق المنافس', img: IMG_BASE_VAR + 'hazem.jpg', avatarEmoji:'📋',
      alibi:'قال إنه كان في غرفة المؤتمر الصحفي بعد الماتش طول الوقت.',
      loseMsg:'الكابتن حازم كان فعلًا مشغول بالمؤتمر الصحفي بعد الماتش أمام عشرات الصحفيين، ومفيش أي دليل يربطه بأوضة الـVAR أو بأي شبكة رهانات.',
      questions:[
        { q:'إحساسك إيه لما الحكم لغى الجون الأول ثم احتسبه؟',
          a:'"طبيعي أزعل، ده قرار غيّر مصير الماتش، بس ده جزء من اللعبة، مش هقتل حكم عشان قرار تحكيمي."' },
        { q:'كنت قريب من غرفة الـVAR في أي وقت؟',
          a:'"لأ خالص، كنت في المؤتمر الصحفي بعد الماتش مباشرة، ممكن أي صحفي يأكد كلامي."' },
      ]
    },
    {
      id:'mostafa_var_official', name:'مصطفى', role:'مسؤول تقنية الـVAR في الماتش', img: IMG_BASE_VAR + 'mostafa.jpg', avatarEmoji:'🖥️',
      alibi:'قال إنه كان بيقفل الأجهزة بعد الماتش زي أي إجراء عادي.',
      questions:[
        { q:'إزاي ممكن يحصل فجوة 17 ثانية في تسجيل الـVAR؟', unlockId:'var_gap_explained',
          a:'"من الناحية التقنية، ده صعب يحصل بالصدفة، لازم يكون حد وصل للنظام وعدّل التسجيل يدويًا."' },
        { q:'مين غيرك عنده وصول لنظام الـVAR؟', unlockId:'var_access_list',
          a:'"أنا والحكم عندنا صلاحية الإدارة الكاملة. رامي عنده وصول قراءة محدود للبيانات عشان شغله، لكن ما ينفعش يعدل تسجيلات أو سجلات."' },
        { q:'كنت في الأوضة وقت ما الحكم اتقتل؟',
          a:'"دخلت أقفل الأجهزة بعد ما هو خرج، وماكنش موجود وقتها، خرجت بعد كام دقيقة بس."' },
      ]
    },
    {
      id:'ramy_data_feed', name:'رامي', role:'مسؤول تغذية بيانات الماتش لشركات الإحصائيات', img: IMG_BASE_VAR + 'ramy.jpg', avatarEmoji:'📡',
      alibi:'قال إن شغله بس تقني، بيبعت بيانات الماتش لحظة بلحظة لشركات عالمية.',
      questions:[
        { q:'شغلك بالظبط إيه في الماتش؟', unlockId:'data_feed_role',
          a:'"أنا بابعت بيانات لحظية — كروت، ركنيات، وقرارات VAR — لشركات إحصائيات. الفيد الداخلي بيوصلني المعلومة قبل البث العام بثواني، وده حساس جدًا."' },
        { q:'الحكم اكتشف حاجة في شغلك؟', unlockId:'betting_network_hint',
          a:'(بيتلعثم) "معرفش عن أي حاجة، أنا بس بابعت بيانات رسمية معتمدة."' },
        { q:'رسالة الحكم بتقول "الماتش متباع بس مش بالطريقة اللي فاكرينها" — إنت فاهم قصده إيه؟', requires:['betting_network_hint','var_access_list'],
          a:'(بيصمت) "يمكن يقصد إن مفيش تلاعب في النتيجة، بس في تلاعب في تفاصيل تانية... زي توقيت قرارات معينة."' },
        { q:'الكاميرا حطتك في أوضة الـVAR الساعة 11:47، وسجل النظام بيقول إن صلاحية الإدارة اتفعلت من لابتوبك وقت حذف الـ17 ثانية، وبيانات الرهانات متطابقة مع الفيد اللي كنت بتبيعه — تفسر ده إزاي؟', requires:['var_camera_footage','admin_token_trace','betting_data_proof'], closesInterrogation:true,
          a:'(بينهار) "كنت ببيع إشارات من الفيد الداخلي قبل ما توصل للبث العام لشبكة مراهنات. الحكم اكتشف النمط ورجع يراجع السجلات. دخلت أواجهه وحاولت أمسح الجزء اللي يثبت وصولي للنظام. حصلت مشادة وانتهت بموته. ماكانش فيه اتفاق على نتيجة الماتش نفسها."' },
      ]
    },
  ],

  evidence: [
    { id:'var_recording_gap', tag:'من تسجيل الـVAR', crit:true, title:'فجوة 17 ثانية في تسجيل شاشة محطة الـVAR', img: IMG_BASE_VAR + 'var-gap.jpg', unlocksCamera:true,
      short:'17 ثانية من تسجيل شاشة المحطة بعد الماتش اتحذفت يدويًا',
      full:'تسجيل الشاشة التقني لمحطة الـVAR فيه 17 ثانية مفقودة من جلسة المراجعة اللي فتحها الحكم بعد الماتش. سجل الملف يبين تعديلًا يدويًا، مش انقطاعًا تلقائيًا.',
      unlocked:true, order:1 },

    { id:'var_gap_explained', tag:'من استجواب مصطفى', crit:false, title:'تفسير تقني للفجوة', img:null,
      short:'الفجوة محتاجة تدخل يدوي متعمد',
      full:'مصطفى أكد إن فجوة زي دي مستحيل تحصل بالصدفة، ولازم يكون حد وصل للنظام وعدّل التسجيل يدويًا.',
      unlocked:false, order:2 },

    { id:'var_access_list', tag:'من استجواب مصطفى', crit:false, title:'قائمة المصرح لهم بالوصول للـVAR', img:null,
      short:'مصطفى والحكم بس عندهم الوصول الكامل رسميًا',
      full:'مصطفى والحكم الرئيسي هما الوحيدين المصرح لهم رسميًا بالوصول الكامل لنظام الـVAR.',
      unlocked:false, order:3 },

    { id:'data_feed_role', tag:'من استجواب رامي', crit:false, title:'دور رامي في تغذية البيانات', img:null,
      short:'رامي بيبعت بيانات لحظية لقرارات الحكم لشركات إحصائيات',
      full:'رامي أكد دوره في إرسال بيانات لحظية دقيقة عن قرارات الحكم وتوقيتاتها لشركات إحصائيات عالمية.',
      unlocked:false, order:4 },

    { id:'betting_network_hint', tag:'من رسالة الحكم', crit:true, title:'رسالة الحكم الغامضة', img:null,
      short:'"الماتش متباع بس مش بالطريقة اللي فاكرينها"',
      full:'رسالة الحكم الأخيرة بتوحي بوجود تلاعب مختلف تمامًا عن تلاعب نتيجة الماتش نفسها — تلاعب في تفاصيل صغيرة زي توقيتات القرارات.',
      unlocked:false, order:5 },

    { id:'var_camera_footage', tag:'من تحليل كاميرات الأوضة', crit:true, title:'تسجيل كاميرا خارج أوضة الـVAR', img: IMG_BASE_VAR + 'var-cam.jpg',
      short:'رامي ظاهر بيدخل أوضة الـVAR في التوقيت الحرج',
      full:'كاميرا الممر بتظهر رامي داخل أوضة الـVAR الساعة 11:47 وخارج 11:56. تقرير الوفاة يحط الحادثة في نفس النافذة، ومحدش غيره ظهر داخل الأوضة بين رجوع الحكم واكتشافه.',
      unlocked:false, order:6 },

    { id:'betting_data_proof', tag:'من تحليل بيانات الرهان', crit:true, title:'رهانات ضخمة على توقيت مراجعة الـVAR', img:null,
      short:'مبالغ رهان ضخمة اتحطت على توقيت مراجعة معينة بالظبط',
      full:'تحليل سجلات الجهة الخارجية يبين رهانات متكررة على أحداث فرعية اتنفذت بعد وصول إشارات من حساب مرتبط برامي وقبل تحديث البث العام بثواني. النمط يتطابق مع توقيتات الفيد الداخلي اللي كان مسؤول عنه.',
      unlocked:false, order:7 },

    { id:'admin_token_trace', tag:'من سجل أمان محطة الـVAR', crit:true, title:'صلاحية التعديل اتفعلت من لابتوب رامي', img:null,
      short:'جلسة إدارة مؤقتة اتفعلت من جهاز رامي وقت حذف الـ17 ثانية',
      full:'سجل الأمان يبين إن رمز إدارة مؤقت اتفعل على محطة الـVAR من لابتوب رامي الساعة 11:49، وبعدها مباشرة حصل تعديل ملف تسجيل الشاشة. حسابه العادي كان قراءة فقط، فالسجل يربط عملية الحذف بجهازه.',
      unlocked:false, order:8 },

  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  cameraPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الكاميرات',
    introText: 'كاميرا الممر بتغطي من 10 مساءً لحد 12 بالليل. دوّر على دخول رامي بعد ما الحكم رجع يراجع السجلات — حوالي 11:47.',
    resultText: 'وصلت للحظة الصح: رامي بيدخل أوضة الـVAR الساعة 11:47 ويخرج 11:56، وهي نفس نافذة حذف التسجيل وتقدير وقت الوفاة.',
    startHour24: 22,
    totalMinutes: 120,
    targetMinutes: 107,
    toleranceMinutes: 8,
    resultEvidenceIds: ['var_camera_footage'],
  },

  evidenceCombinations: [
    { parts:['data_feed_role','betting_network_hint'], resultId:'betting_data_proof' },
    { parts:['var_gap_explained','var_camera_footage'], resultId:'admin_token_trace' },
  ],

  correctSuspectId: 'ramy_data_feed',
  conclusiveEvidenceIds: ['var_camera_footage', 'betting_data_proof', 'admin_token_trace', 'var_gap_explained'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن رامي هو الفاعل؟',
        options: [
          { id:'a', text:'الكاميرا حطته جوه الأوضة وقت الوفاة + سجل الأمان ربط حذف التسجيل بلابتوبه + نمط الرهانات طابق الفيد الداخلي اللي كان مسؤول عنه' },
          { id:'b', text:'لأنه مسؤول بيانات وده بيخليه مشتبه تلقائيًا' },
          { id:'c', text:'لأنه اتلعثم أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت طبيعة "الفساد" الحقيقية في الماتش؟',
        options: [
          { id:'a', text:'النتيجة نفسها ما اتثبتش فيها تلاعب؛ الفساد كان في تسريب إشارات من الفيد الداخلي قبل البث العام لاستغلالها في رهانات على أحداث صغيرة' },
          { id:'b', text:'اللاعب ياسين كان متفق مع الحكم على النتيجة' },
          { id:'c', text:'المدرب حازم كان بيدفع للحكم مباشرة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الفساد كان في التفاصيل مش في النتيجة',
      paragraphs:[
        'رامي كان بيسرب إشارات من الفيد الداخلي قبل ما تظهر في البث العام، وبيبيعها لشبكة تستغل فارق الثواني في رهانات على أحداث صغيرة. الحكم لاحظ النمط ورجع يراجع السجلات بعد الماتش، فدخل رامي يواجهه ويحاول يمسح الدليل، وخلال المواجهة حصلت الجريمة.',
        'اللي قفل الدائرة كان كاميرا الممر، وسجل الأمان اللي ربط صلاحية التعديل بلابتوب رامي، وتحليل تدفق البيانات والرهانات. الملف اتحال لتحقيق رسمي مع مراجعة مستقلة لإجراءات حماية بيانات الماتش، بدل اختزال القضية في قرار تحكيمي مثير للجدل.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية رامي، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: تفسير الفجوة، كاميرا الممر، وبيانات الرهانات، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق وسط دايرة كورة كبيرة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الجون اللي ما اتحسبش"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty VAR review room in a stadium at
   night, multiple monitors glowing with a paused football replay,
   dramatic tense atmosphere, documentary photography style, no text,
   no watermark, photorealistic"

   المشهد ١ (var-scene1.jpg):
   "Photorealistic wide shot of a football stadium at night, players
   celebrating a goal, bright stadium floodlights, crowd cheering,
   photorealistic, no text, no watermark"

   المشهد ٢ (var-scene2.jpg):
   "Photorealistic close-up of a referee's hand holding a phone
   typing a message in a locker room hallway, dim lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (var-scene3.jpg):
   "Photorealistic shot of a stadium VAR review room with glowing
   monitors, an overturned chair, empty and quiet, dramatic low
   lighting, photorealistic, no text, no watermark"

   المشهد ٤ (var-scene4.jpg):
   "Photorealistic shot of an empty stadium corridor at night with
   security tape near a door, dim emergency lighting, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   ياسين (yassin.jpg):
   "Photorealistic portrait of a young athletic Egyptian male
   football player, team match kit, tense guarded expression,
   standing on a stadium pitch, stadium floodlight lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   الكابتن حازم (hazem.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male football
   coach, team tracksuit, frustrated intense expression, standing on
   a stadium sideline, stadium floodlight lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   مصطفى (mostafa.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male VAR
   technical official, headset, formal officiating attire, focused
   nervous expression, sitting in a VAR control room, screen glow
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   رامي (ramy.jpg):
   "Photorealistic portrait of a young Egyptian male data analyst,
   casual smart clothing, holding a laptop, sharp calculating
   expression, sitting in a stadium media room, screen glow lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل تسجيل الـVAR (var-gap.jpg):
   "Photorealistic close-up of a video editing timeline interface
   showing a highlighted missing gap in footage, dark mode UI, no
   text, no watermark, photorealistic"

   دليل الكاميرا (var-cam.jpg):
   "Photorealistic security camera style still frame of a dim stadium
   corridor with a man's silhouette entering a door, grainy
   surveillance footage look, no text, no watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_VAR_CONSPIRACY;
  if (c.cameraPuzzle) {
    c.cameraPuzzle.introText = 'راجع كاميرا الممر من 10 مساءً لحد 12، وحدد أي دخول لأوضة الـVAR بعد رجوع الحكم لمراجعة السجلات.';
    c.cameraPuzzle.resultText = 'التسجيل يكشف دخول رامي أوضة الـVAR الساعة 11:47 وخروجه 11:56. ده يثبت وجوده في النافذة الحرجة، لكنه مش إدانة لوحده.';
  }
  c.evidenceCombinations = [];
  const ev = id => c.evidence.find(e => e.id === id);
  if (!ev('betting_data_proof')) {
    // already present in most builds; safeguard only
  }
  const r = c.suspects.find(s => s.id === 'ramy_data_feed');
  if (r) {
    if (!r.questions.some(q => q.unlockId === 'betting_data_proof')) {
      r.questions.push({
        q:'تحليل توقيت الرهانات متطابق مع إشارات الفيد الداخلي اللي كنت مسؤول عنها. تفسر التطابق؟',
        requires:['data_feed_role','betting_network_hint'],
        unlockId:'betting_data_proof',
        a:'(بيتوتر) "أنا مسؤول عن الفيد، لكن أكتر من نظام بياخد منه بيانات. التطابق محتاج يثبت مين سربها فعلًا."'
      });
    }
    if (!r.questions.some(q => q.unlockId === 'admin_token_trace')) {
      r.questions.push({
        q:'سجل الأمان ربط جلسة الإدارة المؤقتة بجهازك وقت حذف الـ17 ثانية. ليه جهازك؟',
        requires:['var_camera_footage','var_gap_explained'],
        unlockId:'admin_token_trace',
        a:'(بيصمت) "الجهاز كان متوصل بالنظام، لكن لازم تثبتوا إني أنا اللي فعّلت الجلسة مش مجرد إن العملية خرجت منه."'
      });
    }
    const q = r.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت طويل) "الأدلة بتثبت إني كنت جوه الأوضة وإن جهازي اتستخدم. لكن مش هاعترف بالجريمة قبل ما تثبتوا إيه حصل في المواجهة نفسها."';
    }
  }
  c.conclusiveEvidenceIds = ['var_camera_footage','betting_data_proof','admin_token_trace','var_gap_explained'];
  c.conclusiveRequired = 4;
})();
