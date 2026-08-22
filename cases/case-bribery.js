/* ============================================================
   بيانات قضية: قبول بالواسطة
   قضية فساد إداري — رشاوى لضمان قبول طلبة في كلية طب مرموقة
   بمجموع أقل من الحد المعتاد، وطالبة مستوفية للشروط اتظلمت بسبب التلاعب.
   ============================================================ */

const IMG_BASE_BRIBERY = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/bribery/';

const CASE_BRIBERY = {
  id: 'bribery',
  title: 'قبول بالواسطة',
  caseNo: 'CASE 016',
  subtitle: 'كلية طب خاصة، القاهرة',
  coverImg: IMG_BASE_BRIBERY + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 17,
  teaser: 'طالبة مجموعها فوق المطلوب اتصدمت إنها مش داخلة، وطالب تاني بمجموع أقل دخل مكانها. الكلية بتقول "نظام"، وأنت لازم تلاقي الحقيقة.',

  isPremium: false,
  categories: ['corruption', 'scandal'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_BRIBERY + 'cover.webp',
    heroCaption: 'CASE 016 — بعد إعلان نتيجة القبول بأسبوعين',
    text1: 'كلية طب خاصة مرموقة أعلنت نتيجة قبول الدفعة الجديدة، وطالبة اسمها "ملك" مستوفية شروط القبول ومجموعها أعلى من الحد المعلن اتفاجئت إن اسمها مش موجود في القايمة، بينما طالب تاني بمجموع أقل بكتير دخل الكلية بسهولة. الشك بدأ يدور حوالين وجود رشاوى لضمان قبول طلبة معينين.',
    text2: 'والد ملك رفع شكوى رسمية لمجلس أمناء الكلية، والمجلس طلب منك تحقق بسرعة وسرية، قبل ما الفضيحة تتسرب للإعلام وتضر سمعة الكلية بالكامل، وقبل ما حق ملك يضيع نهائيًا.',
    meta: [
      { label:'المتضررة', value:'ملك — مستوفية الشروط، واترفض ملفها' },
      { label:'الشبهة', value:'رشاوى لضمان قبول طلبة بمجموع أقل' },
      { label:'مكان الحادثة', value:'إدارة القبول والتسجيل بالكلية' },
      { label:'طلب التحقيق', value:'مجلس أمناء الكلية' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — إعلان النتيجة',
      img: IMG_BASE_BRIBERY + 'bribery-scene1.jpg',
      text:'قائمة قبول رسمية معلقة على لوحة إعلانات الكلية، طلبة وأهاليهم بيتجمعوا يدوروا على أسمائهم بحماس وتوتر.'
    },
    {
      scene:'المشهد ٢ — الصدمة',
      img: IMG_BASE_BRIBERY + 'bribery-scene2.jpg',
      text:'ملك بتدور على اسمها في القايمة كذا مرة ومش لاقياه، رغم إن مجموعها مستوفي الحد المعلن وكل أوراقها كاملة. صدمة كبيرة ليها ولعيلتها.'
    },
    {
      scene:'المشهد ٣ — الشك يبدأ',
      img: IMG_BASE_BRIBERY + 'bribery-scene3.jpg',
      text:'والد ملك بيراجع القايمة كاملة، بيلاحظ اسم طالب بمجموع أقل بكتير من ملك دخل الكلية بسهولة. بيبدأ يسأل حوالين الموضوع.'
    },
    {
      scene:'المشهد ٤ — التحقيق الرسمي',
      img: IMG_BASE_BRIBERY + 'bribery-scene4.jpg',
      text:'مجلس أمناء الكلية بيفتح تحقيق داخلي، وعندك وصول لملفات القبول ولجنة اختيار الطلبة كاملة.'
    },
  ],

  suspects: [
    {
      id:'dr_amin', name:'د. أمين', role:'رئيس لجنة القبول بالكلية', img: IMG_BASE_BRIBERY + 'amin.jpg', avatarEmoji:'🎓',
      alibi:'قال إن القبول تم حسب معايير رسمية معلنة ومفيش أي تلاعب.',
      questions:[
        { q:'إزاي بيتم ترتيب أولوية القبول بالظبط؟', unlockId:'admission_criteria',
          a:'"الأساس هو المجموع واستيفاء الشروط. وفي عدد محدود من المقاعد لبرامج منح أو حالات خاصة، بس أي استثناء لازم يبقى بموافقة موثقة من المجلس."' },
        { q:'إيه سبب دخول طالب بمجموع أقل من ملك؟', unlockId:'special_case_flag',
          a:'"لو دخل في نسبة الحالات الخاصة، لازم يكون معاه موافقة رسمية موثقة من المجلس، ده الإجراء المعتمد."' },
        { q:'ممكن نشوف الموافقة الرسمية دي لحالة الطالب ده؟', requires:['admission_list'],
          a:'"المفروض موجودة في الملف، ممكن تراجعوها بأنفسكم مع الإدارة."' },
      ]
    },
    {
      id:'heba_admin', name:'هبة', role:'موظفة إدارة القبول والتسجيل', img: IMG_BASE_BRIBERY + 'heba.jpg', avatarEmoji:'📋',
      alibi:'قالت إنها بس بتنفذ قرارات اللجنة ومالهاش أي صلاحية قرار.',
      questions:[
        { q:'مين اللي بيدخل بيانات القبول النهائية في النظام؟', unlockId:'system_entry_log',
          a:'"أنا اللي بدخّل النتيجة على النظام بعد قرار اللجنة. ماقدرش أضيف حالة من نفسي من غير رقم موافقة وصلاحية مسؤول اللجنة."' },
        { q:'لاحظتي أي تعديل غريب في بيانات القبول؟',
          a:'(بتتردد شوية) "في حالة واحدة كانت فيها موافقة اتضافت متأخر شوية عن باقي الحالات، بس ماكنتش متأكدة لو ده غريب فعلًا."' },
      ]
    },
    {
      id:'ziad_student', name:'زياد', role:'الطالب اللي دخل الكلية بمجموع أقل من ملك', img: IMG_BASE_BRIBERY + 'ziad.jpg', avatarEmoji:'💼',
      alibi:'قال إن دخوله كان قانوني تمامًا حسب حالة خاصة معتمدة.',
      loseMsg:'زياد مجرد طالب استفاد من قرار اتخد من حد تاني في الإدارة، ومفيش أي دليل يوضح إنه هو نفسه دفع أو رتب أي رشوة بشكل مباشر.',
      questions:[
        { q:'إزاي دخلت الكلية بمجموعك؟',
          a:'"أهلي قالولي إن ملفي دخل ضمن استثناء معتمد. أنا ماكنتش طرف في الإجراءات، وكل اللي عرفته إن والدي قال إن الموضوع اتحل."' },
        { q:'أهلك اتصلوا بحد في إدارة الكلية؟', unlockId:'father_connection',
          a:'"معرفش التفاصيل، بس فاكر إن والدي قابل د. أمين أكتر من مرة قبل ظهور النتيجة، وبعد آخر مقابلة قاللي: خلاص مكانك اتضمن."' },
      ]
    },
    {
      id:'ziad_father', name:'مهندس رأفت', role:'والد زياد، رجل أعمال معروف', img: IMG_BASE_BRIBERY + 'raafat.jpg', avatarEmoji:'💰',
      alibi:'قال إنه دفع تبرع رسمي للكلية، وإن التبرع مالوش علاقة مباشرة بقرار قبول ابنه.',
      questions:[
        { q:'إزاي ضمنت مكان ابنك في الكلية؟', unlockId:'donation_claim',
          a:'"دفعت مبلغ على أساس إنه تبرع رسمي لدعم الكلية. اتقاللي إن ده إجراء قانوني ومالوش علاقة بتغيير النتيجة."' },
        { q:'التبرع ده موثق رسميًا في حسابات الكلية؟', unlockId:'donation_missing',
          a:'"المفروض أيوه. د. أمين هو اللي إداني بيانات التحويل وقاللي إن الحساب تابع لجهة بتتعامل مع الكلية."' },
        { q:'راجعنا حسابات الكلية الرسمية، ومفيش أي تبرع مسجل باسمك — الفلوس راحت فين؟', requires:['donation_claim','donation_missing'], closesInterrogation:true,
          a:'(بيسكت شوية) "اكتشفت بعدين إن التحويل مش داخل حسابات الكلية. البيانات جاتلي من جهة اتقاللي إنها بتتعامل مع الإدارة، وبعد التحويل اتقاللي إن ملف زياد اتحسم. ماعنديش ورقة تقول إن ده كان ثمن القبول."' },
      ]
    },
  ],

  evidence: [
    { id:'admission_list', tag:'من قائمة القبول الرسمية', crit:true, title:'قائمة القبول الكاملة', img: IMG_BASE_BRIBERY + 'bribery-list.jpg',
      short:'زياد داخل بمجموع أقل بكتير من ملك',
      full:'قائمة القبول الرسمية بتوضح إن زياد دخل الكلية بمجموع أقل بكتير من ملك، رغم عدم وجود أي منحة أو حالة إنسانية معلنة رسميًا باسمه.',
      unlocked:true, order:1 },

    { id:'admission_criteria', tag:'من استجواب د. أمين', crit:false, title:'معايير القبول الرسمية', img:null,
      short:'نسبة صغيرة مخصصة لحالات خاصة معتمدة من المجلس',
      full:'د. أمين أكد وجود نسبة صغيرة رسمية مخصصة لحالات خاصة، بشرط موافقة موثقة من المجلس.',
      unlocked:false, order:2 },

    { id:'special_case_flag', tag:'من استجواب د. أمين', crit:false, title:'ادعاء وجود موافقة رسمية لحالة زياد', img:null,
      short:'د. أمين قال إن الموافقة "لازم تكون موجودة في الملف"',
      full:'د. أمين أشار لوجود موافقة رسمية لحالة زياد، بس من غير ما يقدر يأكدها بشكل قاطع فورًا.',
      unlocked:false, order:3 },

    { id:'system_entry_log', tag:'من سجل النظام', crit:true, title:'توقيت إضافة موافقة زياد', img: IMG_BASE_BRIBERY + 'bribery-log.jpg',
      short:'الموافقة اتضافت للنظام متأخرة عن باقي الحالات الخاصة',
      full:'سجل النظام بيوضح إن حالة زياد اتضافت بعد إغلاق اجتماع اللجنة، باستخدام حساب د. أمين وصلاحيته الشخصية، ومن غير رقم قرار مجلس صالح في خانة الموافقة.',
      unlocked:false, order:4 },

    { id:'father_connection', tag:'من استجواب زياد', crit:false, title:'علاقات والد زياد الإدارية', img:null,
      short:'والد زياد عنده معارف واسعة في الكلية',
      full:'زياد أكد إن والده قابل د. أمين أكتر من مرة قبل إعلان النتيجة، وإنه رجع من آخر مقابلة وقال إن مكان زياد بقى مضمون.',
      unlocked:false, order:5 },

    { id:'donation_claim', tag:'من استجواب مهندس رأفت', crit:false, title:'ادعاء دفع تبرع رسمي', img:null,
      short:'رأفت قال إنه دفع تبرع رسمي موثق للكلية',
      full:'مهندس رأفت قال في الأول إن المبلغ اللي دفعه كان تبرع رسمي للكلية، وإنه فهم إن التبرع منفصل عن قرار القبول.',
      unlocked:false, order:6 },

    { id:'donation_missing', tag:'من حسابات الكلية', crit:true, title:'التبرع المزعوم غير موجود رسميًا', img: IMG_BASE_BRIBERY + 'bribery-accounts.jpg',
      short:'التحويل مش موجود في حسابات الكلية وراح لجهة مرتبطة بأمين',
      full:'مراجعة حسابات الكلية ما لقتش أي تبرع باسم رأفت. إيصال التحويل اللي قدمه بعد المواجهة رايح لمكتب استشارات خاص، وسجلات الشركة بتوضح إن د. أمين شريك غير معلن في إدارته.',
      unlocked:false, order:7 },

    { id:'contradiction_noted_bribery', tag:'من تحليل التناقضات', crit:true, title:'تناقض بين ادعاء رأفت وحسابات الكلية', img:null,
      short:'قال إن المبلغ تبرع للكلية، لكن التحويل راح لجهة مرتبطة بأمين',
      full:'رأفت وصف المبلغ كتبرع رسمي للكلية، لكن الحسابات ما فيهاش أي تبرع باسمه، وإيصال التحويل بيروح لجهة مرتبطة بد. أمين. كده ادعاء التبرع الرسمي مايركبش مع مسار الفلوس.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن الأقوال دي كويس. اتنين منها بيتعارضوا مع بعض بشكل واضح.',
    resultText: 'التناقض واضح: رأفت قال إن المبلغ تبرع رسمي للكلية، لكن سجلات الكلية مافيهاش أي تبرع باسمه، والتحويل راح لجهة مرتبطة بد. أمين.',
    resultEvidenceIds: ['contradiction_noted_bribery'],
    statements: [
      { id:'st1', text:'"دفعت تبرع رسمي للكلية، حاجة قانونية ومعروفة."', source:'مهندس رأفت — في الاستجواب' },
      { id:'st2', text:'مفيش تبرع باسم رأفت في حسابات الكلية، والتحويل راح لمكتب استشارات مرتبط بد. أمين.', source:'دليل: حسابات الكلية وإيصال التحويل' },
      { id:'st3', text:'"القبول حسب المجموع بالأساس، وفي نسبة صغيرة لحالات خاصة معتمدة."', source:'د. أمين — في الاستجواب' },
      { id:'st4', text:'"أنا اللي بدخّل البيانات بعد ما اللجنة توافق رسميًا."', source:'هبة — في الاستجواب' },
      { id:'st5', text:'"دخلت في حالة خاصة معتمدة، أهلي رتبوا الموضوع كله."', source:'زياد — في الاستجواب' },
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
    introText: 'اربط كل طرف بدوره الحقيقي في القضية بناءً على الأدلة اللي جمعتها.',
    leftItems: [
      { id:'l_amin', text:'د. أمين' },
      { id:'l_heba', text:'هبة' },
      { id:'l_ziad', text:'زياد' },
      { id:'l_raafat', text:'مهندس رأفت' },
    ],
    rightItems: [
      { id:'r_bribe_taker', text:'صاحب الصلاحية النهائية على اعتماد الاستثناء' },
      { id:'r_innocent_executor', text:'موظفة منفذة بحسن نية، مالهاش صلاحية قرار' },
      { id:'r_beneficiary', text:'المستفيد من القرار، بدون تورط مباشر' },
      { id:'r_bribe_giver', text:'صاحب التحويل المالي المشكوك في غرضه' },
    ],
    correctPairs: [
      ['l_amin','r_bribe_taker'],
      ['l_heba','r_innocent_executor'],
      ['l_ziad','r_beneficiary'],
      ['l_raafat','r_bribe_giver'],
    ],
    resultText: 'ربطت الأدوار الإدارية والمالية: أمين صاحب صلاحية الاعتماد، رأفت صاحب التحويل، زياد المستفيد، وهبة منفذة إدخال البيانات. لسه لازم تربط التحويل بالتعديل غير الموثق قبل توجيه الاتهام.',
    resultEvidenceIds: ['donation_missing'],
  },

  evidenceCombinations: [
    { parts:['donation_claim','donation_missing'], resultId:'contradiction_noted_bribery' },
  ],

  correctSuspectId: 'dr_amin',
  conclusiveEvidenceIds: ['system_entry_log', 'donation_missing', 'contradiction_noted_bribery', 'father_connection'],
  conclusiveRequired: 4,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن د. أمين هو المسؤول؟',
        options: [
          { id:'a', text:'إضافة حالة زياد بعد إغلاق اللجنة من حساب أمين + غياب أي قرار مجلس صالح + مسار التحويل لجهة مرتبطة بيه' },
          { id:'b', text:'لأنه رئيس لجنة القبول بس' },
          { id:'c', text:'لأنه تردد وقت الإجابة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyziad',
        label:'ليه زياد مش متهم بنفس درجة د. أمين؟',
        options: [
          { id:'a', text:'هو مستفيد من قرار اتخذه والده وأمين، بدون دليل على تورطه المباشر في ترتيب الرشوة' },
          { id:'b', text:'لأنه طالب وده كافي يبعده عن الشبهة' },
          { id:'c', text:'لأنه اعترف بمكانه بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'حق ملك رجعلها',
      paragraphs:[
        'د. أمين استغل صلاحياته كرئيس لجنة القبول وعدّل حالة زياد بعد إغلاق اللجنة، من غير قرار مجلس صالح. في المقابل، رأفت حوّل مبلغ لجهة مرتبطة بأمين وهو فاهم إن المقابل هو ضمان مكان ابنه.',
        'اللي قفل الدائرة كان سجل النظام، وغياب قرار استثناء صحيح، ومسار التحويل بعيد عن حسابات الكلية. مجلس الأمناء أحال أمين ورأفت للتحقيق، وأعاد مراجعة ملفات القبول المتضررة، ومن ضمنها ملف ملك، بدل اعتبار قبولها نتيجة تلقائية قبل انتهاء المراجعة.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية د. أمين، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام مجلس الأمناء.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: سجل النظام، غياب التبرع، وعلاقات والد زياد، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وحق ملك ضاع بينما الفاعل الحقيقي فضل في منصبه من غير عقاب. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "قبول بالواسطة"

   الغلاف (cover.webp):
   "Photorealistic shot of an official university admission list
   posted on a bulletin board, blurred students in the background,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (bribery-scene1.jpg):
   "Photorealistic wide shot of Egyptian students and parents
   crowding around a university bulletin board, excited and anxious
   expressions, daylight, photorealistic, no text, no watermark"

   المشهد ٢ (bribery-scene2.jpg):
   "Photorealistic close-up of a young woman scanning a printed list
   with a disappointed expression, university hallway background,
   photorealistic, no text, no watermark"

   المشهد ٣ (bribery-scene3.jpg):
   "Photorealistic shot of a concerned middle-aged man pointing at a
   printed document, university corridor setting, daylight,
   photorealistic, no text, no watermark"

   المشهد ٤ (bribery-scene4.jpg):
   "Photorealistic shot of a formal university boardroom meeting table
   with documents spread out, professional lighting, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   د. أمين (amin.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male university
   dean, formal suit, greying hair, glasses, composed authoritative
   expression, sitting in a formal office, institutional lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   هبة (heba.jpg):
   "Photorealistic portrait of a young Egyptian female administrative
   employee, modest professional attire, headscarf, holding a folder
   of documents, focused expression, university office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   زياد (ziad.jpg):
   "Photorealistic portrait of a young Egyptian male medical student,
   casual smart clothing, backpack over one shoulder, uneasy nervous
   expression, university hallway lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   مهندس رأفت (raafat.jpg):
   "Photorealistic portrait of a wealthy middle-aged Egyptian
   businessman, expensive tailored suit, confident commanding
   expression, standing in a formal boardroom, professional
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   دليل قائمة القبول (bribery-list.jpg):
   "Photorealistic close-up of a printed official admission list
   document with names and scores, office lighting, no text, no
   watermark, photorealistic"

   دليل سجل النظام (bribery-log.jpg):
   "Photorealistic close-up of a database admin interface on a
   computer screen showing timestamped entries, dark mode UI, no
   text, no watermark, photorealistic"

   دليل الحسابات (bribery-accounts.jpg):
   "Photorealistic close-up of official financial ledger documents
   and spreadsheets on a desk, office lighting, no text, no
   watermark, photorealistic"
   ============================================================ */
