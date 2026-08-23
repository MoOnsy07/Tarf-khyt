/* ============================================================
   بيانات قضية: كواليس البرنامج
   قضية اختفاء/فساد (محتوى للبالغين) — متسابقة في برنامج مواهب
   بتتهم منتج بالتحرش قبل ما تختفي فجأة.
   ============================================================ */

const IMG_BASE_BEHINDSCENES = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/behind-scenes/';

const CASE_BEHIND_SCENES = {
  id: 'behind-scenes',
  title: 'كواليس البرنامج',
  caseNo: 'CASE 039',
  subtitle: 'استوديو تصوير برنامج مواهب تلفزيوني',
  coverImg: IMG_BASE_BEHINDSCENES + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 37,
  investigationPoints: 21,
  teaser: 'متسابقة صاعدة في برنامج مواهب بتوجه اتهام خطير لمنتج البرنامج قبل ما تختفي فجأة من الاستوديو. هل سكتوها عشان الاتهام ده؟',

  isPremium: false,
  categories: ['disappearance', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتناول موضوع اتهامات تحرش في بيئة عمل، بشكل غير صريح ومناسب لجمهور بالغ.',

  briefing: {
    heroImg: IMG_BASE_BEHINDSCENES + 'cover.webp',
    heroCaption: 'CASE 039 — بعد الاتهام بيوم واحد',
    text1: 'المتسابقة الصاعدة "رنا" في برنامج المواهب المشهور وجّهت اتهام خطير لمنتج البرنامج "وليد" بسلوك غير لائق تجاهها في كواليس التصوير. بعد يوم واحد بس من الاتهام، رنا اختفت من الاستوديو ومحدش عرف يوصلها.',
    text2: 'مديرة الإنتاج طلبت منك تحقق بسرية تامة قبل ما القضية تنفجر إعلاميًا. عندك تسجيلات كاميرات الاستوديو، وقائمة فريق العمل اللي كان موجود وقت اختفاء رنا.',
    meta: [
      { label:'الضحية', value:'رنا — متسابقة صاعدة في البرنامج' },
      { label:'الاتهام', value:'سلوك غير لائق من منتج البرنامج' },
      { label:'آخر مكان معروف', value:'كواليس استوديو التصوير' },
      { label:'طلب التحقيق', value:'مديرة الإنتاج' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاتهام',
      img: IMG_BASE_BEHINDSCENES + 'behind-scene1.jpg',
      text:'رنا بتوجه اتهامها لوليد أمام فريق صغير من الإنتاج، أجواء متوترة جدًا في الاستوديو.'
    },
    {
      scene:'المشهد ٢ — رد الفعل',
      img: IMG_BASE_BEHINDSCENES + 'behind-scene2.jpg',
      text:'وليد بينفي الاتهام بشدة، وإدارة البرنامج بتقرر تأجيل أي قرار لحد ما تحقق داخليًا.'
    },
    {
      scene:'المشهد ٣ — الاختفاء',
      img: IMG_BASE_BEHINDSCENES + 'behind-scene3.jpg',
      text:'في اليوم التالي، رنا ماجتش تسجيل الحلقة، وموبايلها طالع مغلق تمامًا من غير أي رد.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_BEHINDSCENES + 'behind-scene4.jpg',
      text:'مديرة الإنتاج بتديك صلاحية تراجع كاميرات الاستوديو وفريق العمل المقرب من رنا.'
    },
  ],

  suspects: [
    {
      id:'producer_walid', name:'وليد', role:'منتج البرنامج، المتهم بالاتهام الأصلي', img: IMG_BASE_BEHINDSCENES + 'walid.jpg', avatarEmoji:'🎬',
      alibi:'قال إنه كان في مكتبه طول الوقت وما اقتربش من رنا خالص بعد الاتهام.',
      questions:[
        { q:'رد فعلك على اتهام رنا كان إيه؟', unlockId:'walid_denial',
          a:'"الاتهام ده باطل تمامًا، ومستعد أثبت براءتي بأي شكل، بس القضية أثرت على سمعتي بشكل كبير."' },
        { q:'حد نصحك تتصرف بشكل معين بعد الاتهام؟', unlockId:'walid_pressure',
          a:'"مديرة الإنتاج قالتلي أهدأ الوضع بأي طريقة قبل ما يوصل للإعلام."' },
      ]
    },
    {
      id:'production_manager_rasha', name:'رشا', role:'مديرة الإنتاج، طلبت التحقيق', img: IMG_BASE_BEHINDSCENES + 'rasha.jpg', avatarEmoji:'📋',
      accusable:true,
      alibi:'قالت إنها كانت في اجتماع طوارئ مع الإدارة العليا طول الوقت.',
      questions:[
        { q:'اتهام رنا كان هيأثر على البرنامج إزاي؟', unlockId:'rasha_stakes',
          a:'"البرنامج جاهز لموسم جديد ضخم بعقود إعلانات كبيرة، فضيحة زي دي كانت هتهدد كل ده."' },
        { q:'حاولتِ تقنعي رنا تسكت عن الموضوع؟', requires:['rasha_stakes'], unlockId:'rasha_silence_attempt',
          a:'(بتتردد) "عرضت عليها تسوية مالية سرية عشان تسحب الاتهام، ده أمر عادي في زي المواقف دي."' },
      ]
    },
    {
      id:'fellow_contestant_yara', name:'يارا', role:'متسابقة منافسة لرنا في البرنامج', img: IMG_BASE_BEHINDSCENES + 'yara.jpg', avatarEmoji:'🎤',
      alibi:'قالت إنها كانت في غرفة الملابس تستعد للحلقة الجاية.',
      questions:[
        { q:'علاقتك برنا كانت تنافسية بشكل كبير؟', unlockId:'yara_rivalry',
          a:'"كنا بنتنافس على نفس المركز في البرنامج، بس علاقتنا كانت محترمة برضو."' },
        { q:'استفدتِ بشكل مباشر من غياب رنا عن الحلقة؟', requires:['yara_rivalry'],
          a:'"صراحة أيوه، أخدت مكانها في الحلقة، بس ده مبررش إني أأذيها."' },
      ]
    },
    {
      id:'security_guard_naguib', name:'نجيب', role:'حارس أمن الاستوديو', img: IMG_BASE_BEHINDSCENES + 'naguib.jpg', avatarEmoji:'🔒',
      alibi:'قال إنه كان بيراقب المدخل الرئيسي طول الليلة.',
      questions:[
        { q:'كاميرات الاستوديو سجلت أي حركة غريبة ليلة اختفاء رنا؟', unlockId:'naguib_footage',
          a:'"في تسجيل بيوضح رشا مديرة الإنتاج بتدخل غرفة رنا الخاصة بعد ساعات العمل الرسمية."' },
        { q:'حد طلب منك تمسح أو تخفي أي جزء من التسجيلات؟', requires:['naguib_footage'], unlockId:'naguib_cover_request',
          a:'(بيتردد) "رشا طلبت مني أأجل رفع تسجيلات ليلة معينة، قالت عشان مراجعة داخلية بس."' },
      ]
    },
  ],

  evidence: [
    { id:'harassment_complaint', tag:'من ملف الشكوى الرسمي', crit:true, title:'شكوى رنا الرسمية', img: IMG_BASE_BEHINDSCENES + 'behind-complaint.jpg',
      short:'شكوى موثقة قدمتها رنا ضد وليد قبل اختفائها بيوم',
      full:'الشكوى الرسمية اللي قدمتها رنا موثقة بالتفصيل، وبتوضح إنها كانت مصممة تكمل الإجراء الرسمي رغم الضغط عليها.',
      unlocked:true, order:1 },

    { id:'walid_denial', tag:'من استجواب وليد', crit:false, title:'نفي وليد للاتهام', img:null,
      short:'وليد بينفي الاتهام بشكل قاطع',
      full:'وليد نفى الاتهام بشكل قاطع، وأكد إن القضية أثرت على سمعته المهنية بشكل كبير.',
      unlocked:false, order:2 },

    { id:'walid_pressure', tag:'من استجواب وليد', crit:false, title:'ضغط من الإدارة', img:null,
      short:'رشا طلبت من وليد يهدّي الوضع بأي طريقة',
      full:'وليد كشف إن رشا نصحته يهدّي الموقف بأي طريقة قبل ما يوصل للإعلام، وده بيوضح رغبتها القوية في السيطرة على القضية.',
      unlocked:false, order:3 },

    { id:'rasha_stakes', tag:'من استجواب رشا', crit:true, title:'مصالح مالية ضخمة', img:null,
      short:'البرنامج مرتبط بعقود إعلانات ضخمة للموسم الجديد',
      full:'رشا اعترفت إن اتهام رنا كان هيهدد عقود إعلانات ضخمة مرتبطة بالموسم الجديد للبرنامج.',
      unlocked:false, order:4 },

    { id:'rasha_silence_attempt', tag:'من استجواب رشا', crit:true, title:'محاولة إسكات مالية', img:null,
      short:'رشا عرضت تسوية مالية سرية على رنا',
      full:'رشا اعترفت إنها عرضت على رنا تسوية مالية سرية عشان تسحب الاتهام، وده يوضح مدى استعدادها للسيطرة على الموقف بأي ثمن.',
      unlocked:false, order:5 },

    { id:'yara_rivalry', tag:'من استجواب يارا', crit:false, title:'تنافس يارا ورنا', img:null,
      short:'يارا اعترفت بالتنافس القوي بينها وبين رنا',
      full:'يارا اعترفت بوجود تنافس قوي بينها وبين رنا على نفس المركز في البرنامج، بس أكدت إن العلاقة كانت محترمة.',
      unlocked:false, order:6 },

    { id:'naguib_footage', tag:'من استجواب نجيب', crit:true, title:'تسجيل دخول رشا لغرفة رنا', img: IMG_BASE_BEHINDSCENES + 'behind-cam.jpg',
      short:'كاميرا بتوضح رشا داخلة غرفة رنا بعد ساعات العمل',
      full:'نجيب كشف عن تسجيل بيوضح رشا داخلة غرفة رنا الخاصة بعد ساعات العمل الرسمية، في توقيت قريب جدًا من اختفائها.',
      unlocked:false, order:7 },

    { id:'naguib_cover_request', tag:'من استجواب نجيب', crit:true, title:'طلب إخفاء تسجيلات', img:null,
      short:'رشا طلبت من نجيب يأجل رفع تسجيلات ليلة معينة',
      full:'نجيب اعترف إن رشا طلبت منه بشكل مباشر يأجل رفع تسجيلات ليلة اختفاء رنا بحجة مراجعة داخلية.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },

  cameraPuzzle: {
    enabled: true,
    tabLabel: 'مراجعة كاميرات الاستوديو',
    introText: 'كاميرات الاستوديو بتغطي من 8 مساءً لحد 12 بالليل. راجع الفترة بعد انتهاء التصوير وحدد أي دخول غير معتاد لغرفة رنا أو منطقة تجهيزاتها.',
    resultText: 'لقيت حركة غير معتادة بعد ساعات العمل: رشا داخلة غرفة رنا حوالي 10:30 مساءً. وجودها هناك يفتح خيط تحقيق، لكنه مش إدانة لوحده.',
    startHour24: 20,
    totalMinutes: 240,
    targetMinutes: 150,
    toleranceMinutes: 10,
    resultEvidenceIds: ['naguib_footage'],
  },

  alibiGridPuzzle: { enabled:false },

  evidenceCombinations: [
    { parts:['rasha_stakes','rasha_silence_attempt'], resultId:'rasha_silence_attempt' },
  ],

  correctSuspectId: 'production_manager_rasha',
  conclusiveEvidenceIds: ['naguib_footage', 'rasha_silence_attempt', 'naguib_cover_request'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن رشا هي الفاعلة؟',
        options: [
          { id:'a', text:'تسجيل كاميرا الاستوديو اللي أثبت دخولها غرفة رنا بعد ساعات العمل + محاولتها الواضحة لإسكات الشكوى بتسوية مالية + طلبها من الحارس يخفي التسجيلات' },
          { id:'b', text:'لأنها مديرة الإنتاج وده يكفي كدافع' },
          { id:'c', text:'لأن وليد هو المتهم الأصلي وده أوضح مشتبه فيه' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية رشا الحقيقية؟',
        options: [
          { id:'a', text:'حاولت تضغط على رنا تسحب الشكوى حماية لمصالح البرنامج المالية الضخمة، ولما رفضت بشدة، حبستها مؤقتًا في مكان بعيد عن الاستوديو لحد ما تقرر تتصرف إزاي' },
          { id:'b', text:'كانت بتحاول تحمي رنا من وليد فعليًا' },
          { id:'c', text:'كانت بتخطط لإيذاء رنا من البداية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'الكاميرا اللي كانت المفروض تتخفي',
      paragraphs:[
        'رشا كانت خايفة إن شكوى رنا تهدد عقود إعلانات ضخمة مرتبطة بالموسم الجديد للبرنامج. حاولت تسكتها بتسوية مالية سرية، ولما رفضت رنا بشدة وأصرّت على استكمال الشكوى رسميًا، قررت رشا تحبسها مؤقتًا في مكان بعيد عن الاستوديو لحد ما تقرر إزاي تتعامل مع الموقف.',
        'تسجيل كاميرا الاستوديو اللي أثبت دخولها غرفة رنا الخاصة بعد ساعات العمل الرسمية، ومحاولتها الواضحة لإسكات الشكوى بمقابل مالي، وطلبها من الحارس يؤجل رفع تسجيلات ليلة معينة، كلها أدلة حاصرتها وأدت لإنقاذ رنا.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية رشا، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: تسجيل الكاميرا، محاولة الإسكات المالي، وطلب إخفاء التسجيلات، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ورنا فضلت في خطر حقيقي والفاعلة الحقيقية فضلت طليقة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "كواليس البرنامج"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty television studio backstage
   area at night, dim equipment lighting, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (behind-scene1.jpg):
   "Photorealistic shot of a tense confrontation in a TV studio
   hallway between a small group of people, dim backstage lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (behind-scene2.jpg):
   "Photorealistic shot of a formal meeting room with tense
   expressions, TV production office setting, warm office lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (behind-scene3.jpg):
   "Photorealistic shot of an empty dressing room chair in a TV
   studio, personal items left behind, dim lighting, quiet
   unsettling atmosphere, photorealistic, no text, no watermark"

   المشهد ٤ (behind-scene4.jpg):
   "Photorealistic shot of a production manager reviewing security
   footage on a monitor in a TV studio office, dim blue monitor
   glow, photorealistic, no text, no watermark"

   وليد (walid.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male TV
   producer, formal business casual outfit, defensive tense
   expression, standing in a studio office, formal office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   رشا (rasha.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female
   production manager, sharp formal outfit, calculating composed
   expression, standing in a TV studio hallway, formal lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   يارا (yara.jpg):
   "Photorealistic portrait of a young Egyptian female singer,
   stylish stage outfit, guarded cautious expression, standing near
   a dressing room mirror, warm dressing room lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   نجيب (naguib.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male security
   guard, simple uniform, watchful nervous expression, standing near
   a studio entrance, dim lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل الشكوى (behind-complaint.jpg):
   "Photorealistic close-up of an official formal complaint document
   on a desk, clinical office lighting, no text, no watermark,
   photorealistic"

   دليل الكاميرا (behind-cam.jpg):
   "Photorealistic security camera style still frame of a woman
   entering a dressing room door at night, grainy surveillance
   footage look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_BEHIND_SCENES;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const rasha = c.suspects.find(s => s.id === 'production_manager_rasha');
  if (rasha && !rasha.questions.some(q => q.closesInterrogation)) rasha.questions.push({
    q:'الكاميرا حاطاكي جوه غرفة رنا، وإنتِ عرضتي عليها فلوس وبعدها طلبتي تأجيل التسجيلات. رنا فين؟',
    requires:['naguib_footage','rasha_silence_attempt','naguib_cover_request'], closesInterrogation:true,
    a:'(بتسكت شوية) "دخلت غرفتها فعلًا عشان أدور على نسخة الشكوى وأفهم هي ناوية تعمل إيه. موضوع اختفائها مالوش علاقة بيا، وأي كلام غير كده محتاج دليل."'
  });
  c.teaser = 'رنا اتهمت منتج البرنامج بسلوك خطير، وتاني يوم اختفت من الكواليس. بين الكاميرات والضغوط اللي حصلت بعد الشكوى، مين كان عنده سبب يخليها تسكت؟';

})();

/* ENDING CONSISTENCY PATCH */
(() => {
  const c=CASE_BEHIND_SCENES;
  c.evidence.push({id:'rasha_hideout_trace',tag:'تتبع سيارة الإنتاج',crit:true,title:'الوصول لمكان احتجاز رنا',img:null,short:'خط سير سيارة الإنتاج قاد لمخزن تابع لشركة رشا',full:'مراجعة GPS سيارة الإنتاج أظهرت توقفها عند مخزن تابع لشركة رشا ليلة الاختفاء. المداهمة عثرت على رنا محتجزة بالداخل.',unlocked:false,order:99});
  c.investigationActions=[...(c.investigationActions||[]),{id:'track_production_car',kind:'تتبع ومداهمة',label:'تتبّع سيارة الإنتاج وداهم المخزن',requires:['naguib_footage','naguib_cover_request'],resultEvidenceIds:['rasha_hideout_trace'],successText:'تم العثور على رنا محتجزة في مخزن تابع لشركة رشا.'}];
  c.conclusiveEvidenceIds=['naguib_footage','naguib_cover_request','rasha_hideout_trace']; c.conclusiveRequired=3;
})();
