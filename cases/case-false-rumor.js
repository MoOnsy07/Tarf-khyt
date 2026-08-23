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
  subtitle: 'قرية بياض العرب، مركز بني سويف',
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
        { q:'حد يقدر يأكد إنك كنتِ في المدينة؟', unlockId:'aunt_lead',
          a:'"خالتي معايا طول اليوم، وممكن كمان أوريكم رسائل واتساب بيني وبينها في نفس التوقيت."' },
        { q:'في حد في القرية ممكن يكون عايز يضرك؟',
          a:'"خالد كان خاطب ياسمين قبلي لفترة قصيرة وانفصلوا. من ساعة ما اتخطبنا وأنا حاسة إنها متضايقة مني، بس ماعنديش دليل إنها تعمل حاجة زي دي."' },
      ],
      confrontations:{
        aunt_lead:'ده اللي قلتلكم عليه؛ خالتي والرسائل يقدروا يثبتوا كلامي.',
        aunt_testimony:'الحمد لله إنكم اتأكدتوا منها بنفسكم بدل ما تصدقوا كلامي لمجرد إني قلته.',
        jealousy_note:'أنا كنت حاسة إنها متضايقة، بس ده لوحده ما يخلّينيش أتهمها.',
        photo_analysis:'التحليل ده أهم حاجة بالنسبة لي؛ بيثبت إن الصورة مش لحظة حقيقية حصلت أصلًا.',
        sender_line_record:'أنا ماعرفش حاجة عن الرقم، بس لو السجل صحيح لازم تسألوها هي.',
        contradiction_noted_rumor:'أنا عايزة الحقيقة تتثبت بالأدلة، مش بمجرد الشك فيها.'
      }
    },
    {
      id:'yasmin_ex', name:'ياسمين', role:'خطيبة سابقة لخطيب سلمى، اتخطبوا لمدة قصيرة وانفصلوا', img: IMG_BASE_RUMOR + 'yasmin.jpg', avatarEmoji:'📸',
      alibi:'قالت إنها كانت في القرية طول اليوم زي أي حد، مالهاش أي علاقة بالصورة.',
      questions:[
        { q:'حسيتي بإيه لما خالد اتخطب لسلمى بعد ما خطوبتكم انتهت؟', unlockId:'jealousy_note',
          a:'"أكيد الموضوع ضايقني في الأول، بس خطوبتنا انتهت. ده مش دليل إني أفبرك صورة لحد."' },
        { q:'عندك خلفية في تعديل الصور؟', unlockId:'photo_skill',
          a:'(بتتردد) "بشتغل شوية تصميم على الموبايل، حاجة بسيطة للتسلية بس."' },
        { q:'التحليل الفني لقى إن جزء من الخلفية جاي من صورة قديمة كانت متداولة في نطاق ضيق. الصورة دي كانت عندك؟', requires:['photo_skill','photo_analysis'],
          a:'(بتتردد) "أيوه الصورة الأصلية كانت عندي، بس كنت باعتاها لكذا حد قريب مني. وجودها عندي مش معناه إني أنا اللي ركبت الصورة."' },
        { q:'سجل الخط بيقول إن الرقم اللي بعت أول نسخة اتفعل على جهاز مرتبط بخطك الأساسي وقت الإرسال. تفسري ده إزاي؟', requires:['photo_skill','jealousy_note','source_trace','photo_analysis','sender_line_record'], unlockId:'yasmin_denial', closesInterrogation:true,
          a:'(بتتوتر) "الخط اتسجل باسمي فعلًا، بس مش أنا اللي استخدمته وقت الرسالة. ممكن حد يكون وصل له. أنا ما بعتش الصورة."' },
      ],
      confrontations:{
        jealousy_note:'أنا اعترفت إني كنت زعلانة، بس ده مش دليل إني ركبت صورة.',
        photo_skill:'أنا شغلي فعلاً في التصميم، بس ده ما يخليش كل تركيب صورة ليّا.',
        source_trace:'رقم جديد؟ معرفوش، ومش معنى إنه ظهر قبل النشر إن ليّا علاقة بيه.',
        photo_analysis:'الخلفية دي كانت في صورة عندي فعلًا، بس أنا شاركتها مع ناس قريبين قبل كده.',
        sender_line_record:'الخط باسمي، بس أنا بنكر إني استخدمته لإرسال الصورة. التسجيل باسم حد مش كفاية لوحده.',
        yasmin_denial:'أنا قلت اللي عندي: الخط باسمي، بس مش أنا اللي استخدمته وقت الرسالة.',
        contradiction_noted_rumor:'أنا فاهمة إن السجل بيخلّي كلامي مش مقنع، بس لسه بقول إني ما بعتش الصورة.'
      }
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
      ],
      confrontations:{
        source_trace:'أيوه دي الرسالة الأصلية اللي وصلتلي من الرقم الجديد، ولسه موجودة على موبايلي.',
        sender_line_record:'أنا ماعرفش صاحبة الرقم شخصيًا؛ أنا أقدر أأكد بس إن نفس الرقم هو اللي بعتلي أول نسخة.',
        photo_analysis:'أنا ماحللتش الصورة قبل ما أنشرها، وده كان غلط مني.',
        contradiction_noted_rumor:'أنا شهادتي عن الاستلام والنشر بس؛ السجل الرقمي هو اللي يحدد مصدر الرقم.'
      }
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
      ],
      confrontations:{
        aunt_testimony:'لو حجة غياب سلمى اتأكدت فعلًا، يبقى الصورة نفسها لازم تتراجع من الأساس.',
        photo_analysis:'كده واضح إن الصورة مش لقطة حقيقية زي ما ناس كتير افتكرت.',
        sender_line_record:'أنا ماليش علاقة بالرقم ده، ولو السجل بيربطه بياسمين لازم التحقيق يكمل في المسار ده.',
        jealousy_note:'أنا عارف إن انتهاء خطوبتي القديمة كان صعب، بس ماينفعش أحكم على حد بالدافع بس.',
        contradiction_noted_rumor:'التناقض قوي، بس أنا عايز القرار يبقى مبني على الملف كامل.'
      }
    },
  ],

  evidence: [
    { id:'fake_photo', tag:'من جروب النساء', crit:true, title:'الصورة المنتشرة', img: IMG_BASE_RUMOR + 'rumor-photo.jpg',
      short:'صورة بتوحي بلقاء سري، لكن فيها تفاصيل غريبة في الإضاءة والظلال',
      full:'الصورة المنتشرة فيها اختلافات واضحة في اتجاه الإضاءة وحواف القص والظلال. ده يخلّي احتمال التلاعب الرقمي قوي، لكنه لسه محتاج تحليل فني يثبت طريقة التركيب.',
      unlocked:true, order:1 },

    { id:'aunt_lead', tag:'من استجواب سلمى', crit:false, title:'خيط خالة سلمى', img:null,
      short:'سلمى بتقول إن خالتها كانت معاها طول اليوم وعندها رسائل بالتوقيت',
      full:'سلمى ذكرت إن خالتها تقدر تأكد وجودها في المدينة، وإن بينهم رسائل واتساب مؤرخة بنفس اليوم. ده خيط محتاج تحقق مستقل، مش إثبات لوحده.',
      unlocked:false, order:2 },

    { id:'aunt_testimony', tag:'من تحقق مستقل', crit:true, title:'شهادة الخالة والرسائل', img:null,
      short:'الخالة أكدت وجود سلمى، والرسائل المؤرخة تدعم حجة الغياب',
      full:'بعد التواصل مع خالة سلمى ومراجعة الرسائل الأصلية على الهاتف، اتأكد إن سلمى كانت معاها في المدينة خلال توقيت الصورة المزعوم. الشهادة والرسائل متسقة مع بعض.',
      unlocked:false, order:3 },

    { id:'jealousy_note', tag:'من استجواب ياسمين', crit:false, title:'دافع محتمل عند ياسمين', img:null,
      short:'ياسمين اعترفت إن خطوبة خالد بسلمى ضايقتها في البداية',
      full:'ياسمين اعترفت إن خبر خطوبة خالد بسلمى ضايقها بعد انتهاء خطوبتها القديمة منه. ده يثبت دافع محتمل فقط، ومش دليل على الفبركة.',
      unlocked:false, order:4 },

    { id:'photo_skill', tag:'من استجواب ياسمين', crit:false, title:'خبرة ياسمين في تعديل الصور', img:null,
      short:'ياسمين عندها خبرة فعلية في تطبيقات التصميم وتعديل الصور',
      full:'ياسمين اعترفت إنها بتستخدم تطبيقات تصميم وتعديل صور بشكل مستمر. ده يثبت القدرة التقنية، لكنه لوحده ما يثبتش إنها صاحبة الصورة المفبركة.',
      unlocked:false, order:5 },

    { id:'source_trace', tag:'من هاتف روان', crit:false, title:'أول رسالة وصلت لروان', img:null,
      short:'النسخة الأولى وصلت لروان في رسالة خاصة من رقم جديد غير محفوظ',
      full:'روان احتفظت بالرسالة الأصلية. فحصها بيأكد إن الصورة وصلتلها من رقم جديد قبل ما تنتشر في الجروبات. الرقم نفسه لسه محتاج تتبع مستقل.',
      unlocked:false, unlocksMatch:true, order:6 },

    { id:'photo_analysis', tag:'من تحليل فني', crit:true, title:'تحليل تقني يثبت التركيب', img: IMG_BASE_RUMOR + 'rumor-analysis.jpg',
      short:'الصورة مركبة من أكثر من مصدر، والخلفية مأخوذة من صورة غير منشورة للعامة',
      full:'التحليل الفني يثبت إن وش سلمى مأخوذ من صورة قديمة منشورة لها، بينما جزء الخلفية مأخوذ من صورة أخرى لم تكن منشورة للعامة وقت انتشار الصورة المفبركة. التحليل يثبت الفبركة ويضيّق دائرة من كان يملك المادة الأصلية، لكنه لا يحدد الفاعل وحده.',
      unlocked:false, order:7 },

    { id:'sender_line_record', tag:'من تتبع رسمي للرقم', crit:true, title:'سجل تفعيل رقم المرسل', img:null,
      short:'الرقم الجديد مسجل باسم ياسمين واتفعّل على جهاز مرتبط بخطها الأساسي وقت الإرسال',
      full:'بعد طلب بيانات الخط عبر الإجراء الرسمي، ظهر إن الرقم الجديد مسجل باسم ياسمين، وإن الشريحة اتفعلت وقت الإرسال على جهاز سبق ربطه بخطها الأساسي. ده ارتباط رقمي قوي بمصدر الرسالة، لكنه يفضل محتاج يتقارن بأقوالها وباقي الأدلة.',
      unlocked:false, order:8 },

    { id:'yasmin_denial', tag:'من مواجهة ياسمين', crit:false, title:'إنكار ياسمين استخدام الرقم', img:null,
      short:'ياسمين أقرت إن الخط باسمها لكنها نفت إنها استخدمته وقت إرسال الصورة',
      full:'بعد مواجهتها بسجل الخط، ياسمين أقرت إن الرقم مسجل باسمها لكنها قالت إن حد تاني ممكن يكون استخدمه. الإنكار ده بقى قابل للمقارنة مع سجل تفعيل الشريحة على جهازها ومع مصدر الخلفية الخاصة.',
      unlocked:false, unlocksContradiction:true, order:9 },

    { id:'contradiction_noted_rumor', tag:'من تحليل التناقضات', crit:true, title:'تناقض إنكار ياسمين مع السجل الرقمي', img:null,
      short:'تنكر استخدام الرقم، بينما سجل التفعيل يربط الشريحة بجهازها وقت الإرسال',
      full:'ياسمين قالت إن حد تاني ممكن يكون استخدم الرقم، لكن سجل التفعيل يربط الشريحة بجهاز سبق استخدامه بخطها الأساسي في توقيت الإرسال، بالتزامن مع استخدام خلفية من صورة خاصة كانت عندها. الإنكار ما بقاش متسق مع المسار الرقمي.',
      unlocked:false, order:10 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن إنكار ياسمين بسجل تفعيل رقم المرسل. اختار الجملتين اللي ما ينفعوش يكونوا صح مع بعض.',
    resultText: 'التناقض واضح: ياسمين بتقول إن حد تاني استخدم الرقم، لكن سجل التفعيل بيربط الشريحة بجهازها في توقيت الإرسال، ومعانا كمان خلفية مأخوذة من صورة خاصة كانت عندها.',
    resultEvidenceIds: ['contradiction_noted_rumor'],
    statements: [
      { id:'st1', text:'"الخط اتسجل باسمي، بس مش أنا اللي استخدمته وقت الرسالة. ممكن حد يكون وصل له."', source:'ياسمين — بعد المواجهة' },
      { id:'st2', text:'سجل التفعيل يربط الشريحة الجديدة بجهاز سبق استخدامه بخط ياسمين الأساسي في توقيت إرسال أول نسخة.', source:'دليل: سجل تفعيل رقم المرسل' },
      { id:'st3', text:'الخالة أكدت وجود سلمى في المدينة، والرسائل المؤرخة تدعم نفس التوقيت.', source:'دليل: شهادة الخالة والرسائل' },
      { id:'st4', text:'"وصلتلي الأول في رسالة خاصة من رقم جديد مش محفوظ."', source:'روان — في الاستجواب' },
      { id:'st5', text:'التحليل الفني يثبت إن الصورة مركبة من أكثر من مصدر.', source:'دليل: التحليل التقني' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },

  investigationActions: [
    {
      id:'verify_aunt_alibi',
      kind:'تحريات',
      label:'التواصل مع الخالة ومراجعة الرسائل',
      description:'تحقق من كلام سلمى من مصدر مستقل بدل ما تعتمد على روايتها وحدها.',
      requires:['aunt_lead'],
      resultEvidenceIds:['aunt_testimony'],
      successText:'الخالة أكدت وجود سلمى، والرسائل الأصلية متسقة مع توقيت حجة الغياب.',
      score:5,
    },
    {
      id:'analyze_rumor_photo',
      kind:'فحص رقمي',
      label:'إجراء تحليل فني للصورة',
      description:'افحص حواف القص والظلال ومصادر الصورة لتعرف هل هي أصلية ولا مركبة.',
      requires:['fake_photo'],
      resultEvidenceIds:['photo_analysis'],
      successText:'التحليل أثبت إن الصورة مركبة، وإن الخلفية مأخوذة من صورة لم تكن منشورة للعامة.',
      score:6,
    },
    {
      id:'trace_sender_number',
      kind:'تحريات رقمية',
      label:'طلب بيانات رقم المرسل وتتبع التفعيل',
      description:'تتبع الرقم الجديد اللي أرسل أول نسخة لروان من خلال الإجراء الرسمي المتاح في ملف القضية.',
      requires:['source_trace'],
      resultEvidenceIds:['sender_line_record'],
      successText:'سجل الخط ربط الرقم الجديد بياسمين وبجهاز سبق استخدامه بخطها الأساسي وقت الإرسال.',
      score:6,
    },
  ],

  matchPuzzle: {
    enabled: true,
    tabLabel: 'الربط',
    introText: 'اربط كل شخص بالمعلومة اللي اتأكدت منها لحد دلوقتي. الربط هنا ينظم الملف فقط ومش هيطلعلك اسم الفاعل.',
    leftItems: [
      { id:'l_salma', text:'سلمى' },
      { id:'l_yasmin', text:'ياسمين' },
      { id:'l_rawan', text:'روان' },
      { id:'l_khaled', text:'خالد' },
    ],
    rightItems: [
      { id:'r_alibi_claim', text:'عندها حجة غياب محتاجة/اتعمل لها تحقق مستقل' },
      { id:'r_skill_motive', text:'عندها خبرة تعديل صور ودافع شخصي محتمل، من غير حسم الفاعل' },
      { id:'r_first_spreader', text:'استلمت أول نسخة من رقم جديد ثم نشرتها من غير تحقق' },
      { id:'r_family_pressure', text:'واقع تحت ضغط عائلي ومفيش دليل تقني بيربطه بالفبركة' },
    ],
    correctPairs: [
      ['l_salma','r_alibi_claim'],
      ['l_yasmin','r_skill_motive'],
      ['l_rawan','r_first_spreader'],
      ['l_khaled','r_family_pressure'],
    ],
    resultText: 'رتبت أدوار الناس صح من غير ما تقفز للنتيجة: سلمى عندها حجة غياب، ياسمين عندها دافع وقدرة تقنية فقط، روان مرحلة نشر، وخالد تحت ضغط عائلي.',
    resultEvidenceIds: [],
  },

  evidenceCombinations: [],

  correctSuspectId: 'yasmin_ex',
  conclusiveEvidenceIds: ['aunt_testimony', 'photo_analysis', 'sender_line_record', 'contradiction_noted_rumor'],
  conclusiveRequired: 4,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن ياسمين هي المصدر؟',
        options: [
          { id:'a', text:'التحليل أثبت الفبركة + سجل الرقم ربط الإرسال بجهازها + الخلفية من صورة خاصة + عندها دافع وقدرة تقنية' },
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
      stamp:'عدالة', badgeLabel:'القضية اتقفلت — العدالة انتصرت', title:'الحقيقة وصلت قبل ما يفوت الأوان',
      paragraphs:[
        'صح! ياسمين كانت لسه محتقنة من فسخ خطوبتها القديمة وشافت سلمى سعيدة بحاجة هي خسرتها، فقررت تنتقم بتفبرك صورة مركّبة من صورها الشخصية القديمة عشان تدمر خطوبة سلمى قبل عقد القران.',
        'اللي حسم الملف كان اجتماع أربع نقاط: حجة غياب سلمى الموثقة، إثبات إن الصورة مركبة، سجل الرقم اللي ربط أول إرسال بجهاز ياسمين، والتناقض بين إنكارها والسجل الرقمي. رضوان وقف أي تصرف متسرع، وسلمى اتأكدت براءتها قدام العيلتين. قرار إكمال عقد القران فضل قرار سلمى وخالد بعد ما هديت الأزمة، مش نتيجة مفروضة من التحقيق.'
      ]
    },
    partial: {
      stamp:'معلّقة', badgeLabel:'القضية اتفتحت تاني — محتاجة أدلة أكتر', title:'الشك في مكانه الصح، بس الملف لسه مفتوح',
      paragraphs:[
        'التحقيق بيتجه صح ناحية ياسمين، وسلمى اتبرأت من الشبهة رسميًا في الوقت الحالي. بس الأدلة اللي جمعتها لسه مش كافية تقفل القضية رسميًا قدام كبار العيلتين.',
      ],
      hint:'عشان تقفل القضية نهائيًا، لازم تدعم اتهامك بالأربع أدلة الحاسمة: شهادة الخالة والرسائل، التحليل الفني للصورة، سجل تفعيل رقم المرسل، والتناقض بين إنكار ياسمين والسجل الرقمي.'
    },
    bad: {
      stamp:'ظلم', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
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
