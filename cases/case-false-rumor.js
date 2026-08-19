/* ============================================================
   بيانات قضية: الوشاية
   قضية +18 — اتهام ظالم لفتاة مخطوبة بصورة مفبركة بتوحي بعلاقة
   سرية، وخطر حقيقي على أمانها واستقرار خطوبتها لو محدش كشف
   الحقيقة بسرعة. مفيش أي محتوى صريح، التركيز بالكامل على
   التحقيق وتبريءتها وإيقاف أي تصرف متسرع من العيلة.
   ============================================================ */

const IMG_BASE_RUMOR = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/false-rumor/';

const CASE_FALSE_RUMOR = {
  id: 'false-rumor',
  title: 'الوشاية',
  caseNo: 'CASE 014',
  subtitle: 'قرية بني سويف، صعيد مصر',
  coverImg: IMG_BASE_RUMOR + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'صورة مفبركة انتشرت في جروب نساء القرية وقلبت الدنيا على فتاة مخطوبة. خطوبتها وأمانها على المحك، ولازم توصل للحقيقة قبل ما العيلة تتصرف بسرعة.',

  isPremium: false,
  categories: ['social', 'drama'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتعامل مع موضوع اتهام ظالم لفتاة بناءً على صورة مفبركة، في سياق عائلي محافظ فيه خطر حقيقي على أمانها واستقرارها لو الاتهام فضل قايم. مفيش أي محتوى صريح أو مشاهد عنف — التركيز بالكامل على التحقيق وكشف الحقيقة وحماية الفتاة من ظلم مالوش أي أساس. لو الموضوع حساس بالنسبالك دلوقتي، تقدر تسيب القضية دي وترجع لها وقت تاني.',

  briefing: {
    heroImg: IMG_BASE_RUMOR + 'cover.webp',
    heroCaption: 'CASE 014 — قبل عقد القران بأسبوع',
    text1: '"سلمى"، فتاة فاضل أسبوع على عقد قرانها الرسمي، اتفبركت لها صورة بتوحي إنها بتقابل شاب غريب سرًا بعيد عن عيلتها. الصورة انتشرت في القرية بسرعة، وعيلة خطيبها هددت تفسخ الخطوبة، وعيلتها هي نفسها في حالة غضب شديد وخايفة على "سمعة البيت".',
    text2: 'أخو سلمى الكبير، "رضوان"، رغم غضبه الأولي، حس إن في حاجة غلط في القصة كلها ومش مقتنع تمامًا، فقرر يستنى قبل ما ياخد أي قرار متسرع ويطلب منك تحقق بسرعة وبدقة. قدامك أيام معدودة قبل ما الموقف يخرج عن السيطرة تمامًا.',
    meta: [
      { label:'المتهمة ظلمًا', value:'سلمى — فتاة مخطوبة' },
      { label:'الاتهام', value:'صورة مفبركة توحي بلقاء سري' },
      { label:'المهلة', value:'أيام معدودة قبل عقد القران' },
      { label:'طلب التحقيق', value:'رضوان، أخو سلمى الكبير' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الصورة تظهر',
      img: IMG_BASE_RUMOR + 'rumor-scene1.jpg',
      text:'صورة بتوضح فتاة تشبه سلمى وشاب غريب واقفين قريبين من بعض في مكان بعيد عن القرية، بتوصل لجروب نساء القرية على واتساب وتنتشر بسرعة رهيبة.'
    },
    {
      scene:'المشهد ٢ — الصدمة العائلية',
      img: IMG_BASE_RUMOR + 'rumor-scene2.jpg',
      text:'عيلة سلمى في حالة غضب وصدمة، وعيلة خطيبها بترسل تهدد بفسخ الخطوبة رسميًا لو الموضوع ماتوضحش بسرعة.'
    },
    {
      scene:'المشهد ٣ — سلمى بتدافع عن نفسها',
      img: IMG_BASE_RUMOR + 'rumor-scene3.jpg',
      text:'سلمى بتقسم إنها كانت في بيت خالتها في المدينة القريبة طول اليوم، وإنها ماتعرفش الشاب اللي في الصورة خالص. محدش مصدقها غير أخوها رضوان.',
    },
    {
      scene:'المشهد ٤ — سباق ضد الوقت',
      img: IMG_BASE_RUMOR + 'rumor-scene4.jpg',
      text:'رضوان بيدّيك مهلة قصيرة تحقق فيها، قبل ما عيلته تتصرف بناءً على غضبها بدل ما تستنى الحقيقة.'
    },
  ],

  suspects: [
    {
      id:'salma_girl', name:'سلمى', role:'الفتاة المتهمة ظلمًا', img: IMG_BASE_RUMOR + 'salma.jpg', avatarEmoji:'😢',
      accusable:false,
      alibi:'قالت إنها كانت في بيت خالتها في المدينة القريبة يوم الصورة المزعومة، مش في القرية أصلًا.',
      questions:[
        { q:'ممكن تحكيلنا اللي حصل من وجهة نظرك؟',
          a:'"أنا صدمت زي أي حد لما شفت الصورة دي. أنا ماخرجتش من بيت خالتي في المدينة طول اليوم ده، ومش عارفة الشاب ده أصلًا في حياتي."' },
        { q:'حد يقدر يأكد إنك كنتِ في المدينة؟', unlockId:'aunt_testimony',
          a:'"خالتي معايا طول اليوم، وممكن كمان أوريكم رسائل واتساب بيني وبينها في نفس التوقيت."' },
        { q:'في حد في القرية ممكن يكون عايز يضرك؟',
          a:'"خالد كان خاطب ياسمين قبلي لفترة قصيرة وانفصلوا. من ساعة ما اتخطبنا وأنا حاسة إنها متضايقة مني، بس ماعنديش دليل إنها تعمل حاجة زي دي."' },
      ]
    },
    {
      id:'yasmin_ex', name:'ياسمين', role:'خطيبة سابقة لخطيب سلمى، اتخطبوا لمدة قصيرة وانفصلوا', img: IMG_BASE_RUMOR + 'yasmin.jpg', avatarEmoji:'📸',
      alibi:'قالت إنها كانت في القرية طول اليوم زي أي حد، مالهاش أي علاقة بالصورة.',
      questions:[
        { q:'حسيتي بإيه لما خالد اتخطب لسلمى بعد ما خطوبتكم انتهت؟', unlockId:'jealousy_note',
          a:'"أكيد الموضوع ضايقني في الأول، بس خطوبتنا انتهت. ده مش دليل إني أفبرك صورة لحد."' },
        { q:'عندك خلفية في تعديل الصور؟', unlockId:'photo_skill',
          a:'(بتتردد) "بشتغل شوية تصميم على الموبايل، حاجة بسيطة للتسلية بس."' },
        { q:'جزء من خلفية الصورة المفبركة مطابق لصورة قديمة عندك ما كانتش منشورة للعامة وقتها.', requires:['photo_skill'],
          a:'(بتتردد) "الصورة دي قديمة فعلًا، بس كنت باعتاها لناس قريبين مني. ده لسه مايثبتش إني اللي ركبت الصورة."' },
        { q:'أول نسخة اتبعتت لروان جاية من رقم جديد مربوط ببيانات استرداد تخصك، والخلفية مأخوذة من صورة خاصة عندك — تفسري ده إزاي؟', requires:['photo_skill','jealousy_note','source_trace','photo_analysis'], closesInterrogation:true,
          a:'(بتسكت شوية) "أيوه... أنا اللي ركبتها وبعتها من رقم جديد. كنت عايزة أخوفها وأبوّظ الخطوبة، وماحسبتش إن الموضوع هينتشر بالشكل ده."' },
      ]
    },
    {
      id:'rawan_neighbor', name:'روان', role:'جارة العيلة، أول من نشرت الصورة على جروب النساء', img: IMG_BASE_RUMOR + 'rawan.jpg', avatarEmoji:'📱',
      alibi:'قالت إنها استلمت الصورة من حد تاني ونشرتها بحسن نية عشان تحذر العيلة.',
      loseMsg:'روان غلطت لما نشرت صورة حساسة من غير ما تتأكد، لكن الدليل الرقمي بيبين إنها استلمتها من رقم تاني قبل النشر. مفيش دليل إنها هي اللي فبركت الصورة.',
      questions:[
        { q:'استلمتي الصورة من مين بالظبط؟', unlockId:'source_trace',
          a:'"وصلتلي الأول في رسالة خاصة من رقم جديد مش محفوظ، وبعدها بدأت تلف في الجروبات. الرسالة الأصلية لسه موجودة عندي."' },
        { q:'ليه نشرتيها من غير ما تتأكدي؟',
          a:'"حسيت إن ده واجبي أحذر العيلة، ماكنش قصدي أضر حد، بس الموضوع خرج عن السيطرة بسرعة."' },
      ]
    },
    {
      id:'khaled_fiance', name:'خالد', role:'خطيب سلمى نفسه', img: IMG_BASE_RUMOR + 'khaled.jpg', avatarEmoji:'💍',
      alibi:'قال إنه هو نفسه مصدوم من الصورة وعيلته هي اللي ضغطت عليه يفسخ الخطوبة.',
      loseMsg:'خالد نفسه ضحية ضغط عائلي وموقفه صعب، بس مفيش أي دليل يربطه هو شخصيًا بتفبرك الصورة أو نشرها. لو حصل تركيز الشك عليه، الموضوع هيبعّد التحقيق عن الفاعلة الحقيقية.',
      questions:[
        { q:'إنت مقتنع إن الصورة حقيقية؟',
          a:'"صراحة لأ، سلمى مش كده، بس عيلتي ضاغطة عليّ جدًا وأنا محتار أعمل إيه."' },
        { q:'حد من حواليك ممكن يكون له مصلحة يفسخ خطوبتك؟',
          a:'"مش عارف صراحة، معنديش أي فكرة مين ممكن يكون وراها."' },
      ]
    },
  ],

  evidence: [
    { id:'fake_photo', tag:'من جروب النساء', crit:true, title:'الصورة المنتشرة', img: IMG_BASE_RUMOR + 'rumor-photo.jpg',
      short:'صورة بتوحي بلقاء سري، لكن فيها تفاصيل غريبة في الإضاءة والظلال',
      full:'الصورة المنتشرة فيها تفاصيل غريبة جدًا في اتجاه الإضاءة والظلال، بشكل بيوحي بتعديل رقمي مش صورة أصلية ملتقطة في لحظة واحدة.',
      unlocked:true, order:1 },

    { id:'aunt_testimony', tag:'من شهادة الخالة', crit:true, title:'شهادة خالة سلمى', img:null,
      short:'سلمى كانت في بيت خالتها في المدينة طول اليوم المزعوم',
      full:'خالة سلمى أكدت وجودها معاها في المدينة طول اليوم المزعوم، ورسائل واتساب بينهم بتؤكد نفس التوقيت.',
      unlocked:false, order:2 },

    { id:'jealousy_note', tag:'من استجواب ياسمين', crit:false, title:'غيرة ياسمين المعلنة', img:null,
      short:'ياسمين اعترفت بزعلها من خطوبة سلمى لخطيبها السابق',
      full:'ياسمين اعترفت بمشاعر زعل حقيقية من خطوبة سلمى لخطيبها السابق، ده بيديها دافع نفسي واضح.',
      unlocked:false, order:3 },

    { id:'photo_skill', tag:'من استجواب ياسمين', crit:true, title:'خبرة ياسمين في تصميم الصور', img:null,
      short:'ياسمين عندها خبرة فعلية في تطبيقات تصميم وتعديل الصور',
      full:'ياسمين اعترفت إنها بتستخدم تطبيقات تصميم وتعديل صور بشكل مستمر. ده يثبت القدرة التقنية، لكنه لوحده ما يثبتش إنها صاحبة الصورة المفبركة.',
      unlocked:false, order:4 },

    { id:'source_trace', tag:'من استجواب روان', crit:true, title:'مصدر انتشار الصورة الأول', img:null,
      short:'أول نسخة وصلت لروان من رقم جديد، وبيانات الاسترداد بتربطه بياسمين',
      full:'مراجعة الرسالة الأصلية على موبايل روان بتبين إن الصورة وصلتلها من رقم جديد قبل انتشارها في الجروبات. بيانات استرداد الحساب المرتبط بالرقم بتوصل لبريد قديم مستخدم باسم ياسمين.',
      unlocked:false, order:5 },

    { id:'photo_analysis', tag:'من تحليل تقني للصورة', crit:true, title:'تحليل تقني يثبت التركيب', img: IMG_BASE_RUMOR + 'rumor-analysis.jpg',
      short:'وش سلمى من صورة عامة، والخلفية من صورة خاصة كانت عند ياسمين',
      full:'التحليل التقني يثبت إن وش سلمى مأخوذ من صورة قديمة منشورة لها، بينما جزء الخلفية جاي من صورة أخرى كانت محفوظة عند ياسمين ومش منشورة للعامة وقت انتشار الصورة المفبركة. ده يضيّق مصدر التركيب بشكل كبير.',
      unlocked:false, order:6 },

    { id:'contradiction_noted_rumor', tag:'من تحليل التناقضات', crit:true, title:'تناقض في كلام ياسمين عن خلفية الصورة', img:null,
      short:'قالت إن الصورة الخاصة كانت عند كذا حد، لكن رقم الإرسال نفسه مربوط بيها',
      full:'ياسمين قالت إن وجود جزء من صورتها القديمة ممكن يكون بسبب إنها كانت بعتها لناس قريبين منها، لكن مصدر أول رسالة لروان طلع مربوط ببيانات استرداد تخص ياسمين نفسها. هنا التبرير ما بقاش راكب مع مسار النشر.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تبرير ياسمين بمصدر أول رسالة. فيه كلام مش راكب مع الدليل الرقمي.',
    resultText: 'التناقض واضح: ياسمين قالت إن الصورة الخاصة ممكن تكون وصلت لحد تاني، لكن أول رقم أرسل النسخة لروان مربوط ببيانات استرداد تخصها هي.',
    resultEvidenceIds: ['contradiction_noted_rumor'],
    statements: [
      { id:'st1', text:'"الصورة القديمة دي كنت باعتاها لناس قريبين مني، فممكن حد غيري يكون استخدمها."', source:'ياسمين — في الاستجواب' },
      { id:'st2', text:'أول رقم أرسل الصورة لروان مربوط ببيانات استرداد تخص ياسمين، والخلفية مأخوذة من صورتها الخاصة.', source:'دليل: مصدر الرسالة والتحليل التقني' },
      { id:'st3', text:'"خالتي معايا طول اليوم، وممكن أوريكم رسائل واتساب."', source:'سلمى — في الاستجواب' },
      { id:'st4', text:'"حسيت إن ده واجبي أحذر العيلة."', source:'روان — في الاستجواب' },
      { id:'st5', text:'"صراحة لأ، سلمى مش كده، بس عيلتي ضاغطة عليّ جدًا."', source:'خالد — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },

  matchPuzzle: {
    enabled: true,
    tabLabel: 'الربط',
    introText: 'اربط كل شخص بموقفه الحقيقي من القضية بناءً على الأدلة اللي جمعتها.',
    leftItems: [
      { id:'l_salma', text:'سلمى' },
      { id:'l_yasmin', text:'ياسمين' },
      { id:'l_rawan', text:'روان' },
      { id:'l_khaled', text:'خالد' },
    ],
    rightItems: [
      { id:'r_innocent_alibi', text:'بريئة تمامًا، عندها حجة غياب موثقة' },
      { id:'r_source', text:'مصدر الصورة المفبركة ومسار الإرسال الأول بيرجع لها' },
      { id:'r_unknowing_spreader', text:'ناشرة بحسن نية، مش المصدر الأصلي' },
      { id:'r_pressured', text:'تحت ضغط عائلي، مالوش علاقة بالتفبرك' },
    ],
    correctPairs: [
      ['l_salma','r_innocent_alibi'],
      ['l_yasmin','r_source'],
      ['l_rawan','r_unknowing_spreader'],
      ['l_khaled','r_pressured'],
    ],
    resultText: 'ربطت كل حد بموقفه الحقيقي: سلمى بريئة من الاتهام، ياسمين هي مصدر التركيب والإرسال الأول، روان ساهمت في نشره من غير تحقق، وخالد مالوش علاقة بالتفبرك.',
    resultEvidenceIds: ['photo_analysis'],
  },

  evidenceCombinations: [
    { parts:['source_trace','photo_analysis'], resultId:'contradiction_noted_rumor' },
  ],

  correctSuspectId: 'yasmin_ex',
  conclusiveEvidenceIds: ['aunt_testimony', 'source_trace', 'photo_analysis', 'contradiction_noted_rumor'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن ياسمين هي المصدر؟',
        options: [
          { id:'a', text:'مسار أول رسالة مربوط بيها + الخلفية جاية من صورة خاصة عندها + التحليل أثبت التركيب + عندها دافع واضح' },
          { id:'b', text:'لأنها خطيبة سابقة لخطيب سلمى بس' },
          { id:'c', text:'لأنها اتلعثمت أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whysalma',
        label:'إزاي اتأكدت من براءة سلمى الكاملة؟',
        options: [
          { id:'a', text:'شهادة خالتها الموثقة برسائل واتساب، وإثبات إن الصورة كلها مركّبة رقميًا' },
          { id:'b', text:'لأنها بكت أثناء الاستجواب' },
          { id:'c', text:'لأنها بنت طيبة معروفة في القرية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'JUSTICE', badgeLabel:'CASE CLOSED — JUSTICE SERVED', title:'الحقيقة وصلت قبل ما يفوت الأوان',
      paragraphs:[
        'صح! ياسمين كانت لسه محتقنة من فسخ خطوبتها القديمة وشافت سلمى سعيدة بحاجة هي خسرتها، فقررت تنتقم بتفبرك صورة مركّبة من صورها الشخصية القديمة عشان تدمر خطوبة سلمى قبل عقد القران.',
        'اللي ربط الصورة بياسمين فعلًا كان مسار أول رسالة، مع الخلفية المأخوذة من صورة خاصة عندها والتحليل الفني للتركيب. رضوان وقف أي تصرف متسرع، وسلمى اتأكدت براءتها قدام العيلتين. قرار إكمال عقد القران فضل قرار سلمى وخالد بعد ما هديت الأزمة، مش نتيجة مفروضة من التحقيق.'
      ]
    },
    partial: {
      stamp:'PENDING', badgeLabel:'CASE REOPENED — MORE EVIDENCE NEEDED', title:'الشك في مكانه الصح، بس الملف لسه مفتوح',
      paragraphs:[
        'التحقيق بيتجه صح ناحية ياسمين، وسلمى اتبرأت من الشبهة رسميًا في الوقت الحالي. بس الأدلة اللي جمعتها لسه مش كافية تقفل القضية رسميًا قدام كبار العيلتين.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: شهادة الخالة، خبرة ياسمين التقنية، والتحليل الفني للصورة، قبل ما تقدّم الاتهام النهائي.'
    },
    bad: {
      stamp:'INJUSTICE', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسلمى فضلت تحت ظلم مالوش أي أساس حقيقي. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الوشاية"

   الغلاف (cover.webp):
   "Photorealistic shot of a smartphone screen showing a WhatsApp
   group chat interface glowing in a dim room, blurred photo thumbnail
   visible, tense atmosphere, documentary photography style, no text,
   no watermark, photorealistic"

   المشهد ١ (rumor-scene1.jpg):
   "Photorealistic shot of several Egyptian rural women looking at a
   phone screen together with concerned expressions, warm indoor
   lighting, photorealistic, no text, no watermark"

   المشهد ٢ (rumor-scene2.jpg):
   "Photorealistic shot of a tense family gathering in a modest rural
   Egyptian living room, worried expressions, warm lamp lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (rumor-scene3.jpg):
   "Photorealistic shot of a young Egyptian woman in modest dress
   sitting alone, distressed expression, soft window light, respectful
   composition, photorealistic, no text, no watermark"

   المشهد ٤ (rumor-scene4.jpg):
   "Photorealistic shot of a young Egyptian man standing outside a
   rural house at dusk, thoughtful expression, warm golden hour
   lighting, photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   سلمى (salma.jpg):
   "Photorealistic portrait of a young Egyptian rural woman, modest
   traditional dress, headscarf, hurt but dignified expression,
   standing outside a village house, warm daylight, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   ياسمين (yasmin.jpg):
   "Photorealistic portrait of a young Egyptian woman, modest casual
   dress, headscarf, holding a phone, slightly anxious guarded
   expression, warm rural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   روان (rawan.jpg):
   "Photorealistic portrait of a middle-aged Egyptian rural woman
   neighbor, modest traditional dress, headscarf, curious gossiping
   expression, standing in a village alley, warm daylight, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   خالد (khaled.jpg):
   "Photorealistic portrait of a young Egyptian man, casual shirt,
   thoughtful uneasy expression, standing outside a rural house at
   dusk, warm golden hour lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل الصورة المفبركة (rumor-photo.jpg):
   "Photorealistic image showing subtle digital editing artifacts,
   mismatched lighting and shadows between a foreground figure and
   background, forensic analysis style, no text, no watermark,
   photorealistic"

   دليل التحليل التقني (rumor-analysis.jpg):
   "Photorealistic close-up of a photo editing software interface on
   a laptop screen showing layer analysis and highlighted mismatched
   pixels, dark mode UI, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_FALSE_RUMOR;
  const y = c.suspects.find(s => s.id === 'yasmin_ex');
  if (y) {
    const q = y.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بتتوتر) "الصورة القديمة فعلًا عندي، والرقم ده اتستخدم قبل كده في حاجات تخصني، بس ده مش اعتراف إني أنا اللي ركبت الصورة أو بعتها. أثبتوا مين كان ماسك الرقم وقتها."';
    }
  }
  c.conclusiveRequired = 4;
  if (c.matchPuzzle) {
    const item = c.matchPuzzle.rightItems?.find(x => x.id === 'r_source');
    if (item) item.text = 'أقوى ارتباط تقني بمصدر الصورة';
    c.matchPuzzle.resultText = 'الربط بيحط ياسمين عند أقوى مسار تقني للصورة، وروان عند مرحلة النشر، وسلمى خارج مكان الصورة أصلًا. النتيجة تقوّي الاشتباه لكنها ما تستبدلش باقي الأدلة.';
  }
})();
