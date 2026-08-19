/* ============================================================
   بيانات قضية: تبرعات في الهوا
   قضية اختلاس — جمعية خيرية بتجمع تبرعات لمرضى محتاجين، وجزء
   كبير من الفلوس مش واصل للمرضى فعليًا.
   ============================================================ */

const IMG_BASE_CHARITY = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/charity-funds/';

const CASE_CHARITY_FUNDS = {
  id: 'charity-funds',
  title: 'تبرعات في الهوا',
  caseNo: 'CASE 019',
  subtitle: 'جمعية "أمل" الخيرية، الإسكندرية',
  coverImg: IMG_BASE_CHARITY + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 17,
  teaser: 'جمعية خيرية جمعت تبرعات بالملايين لمرضى محتاجين، لكن المرضى مش واخدين حاجة تقريبًا. الفلوس راحت فين، ومين اللي بيستفيد فعلاً؟',

  isPremium: false,
  categories: ['corruption', 'fraud'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_CHARITY + 'cover.webp',
    heroCaption: 'CASE 019 — بعد حملة تبرعات ناجحة جدًا',
    text1: 'جمعية "أمل" الخيرية عملت حملة تبرعات كبيرة لعلاج أطفال مرضى بالسرطان، وجمعت مبلغ ضخم في وقت قصير بفضل انتشار الحملة على السوشيال ميديا. بعد شهرين، عيلة أحد الأطفال اشتكت إنها لسه مستنية تحويل مبلغ العلاج المتفق عليه من غير أي رد واضح.',
    text2: 'متطوعة قديمة في الجمعية، "سارة"، بدأت تلاحظ تناقضات في الأرقام المعلنة عن التبرعات مقابل المصروفات الفعلية. طلبت منك تحقق بهدوء قبل ما تتهم حد رسميًا، عشان تتأكد إن فلوس المرضى فعلًا وصلتهم أو لأ.',
    meta: [
      { label:'الجمعية', value:'جمعية أمل الخيرية' },
      { label:'المبلغ اللي اتجمع', value:'حوالي 8 ملايين جنيه من حملة تبرعات واحدة' },
      { label:'الشكوى', value:'تأخر تحويل مبلغ علاج طفل مريض' },
      { label:'طلب التحقيق', value:'سارة — متطوعة قديمة في الجمعية' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحملة الناجحة',
      img: IMG_BASE_CHARITY + 'charity-scene1.jpg',
      text:'حملة تبرعات على السوشيال ميديا بتنتشر بسرعة، فيديوهات لأطفال مرضى، ومبالغ كبيرة بتتجمع في أيام قليلة بفضل تعاطف الناس الواسع.'
    },
    {
      scene:'المشهد ٢ — الشكوى الأولى',
      img: IMG_BASE_CHARITY + 'charity-scene2.jpg',
      text:'عيلة طفل مريض بتتصل بالجمعية تسأل عن موعد تحويل مبلغ العلاج، وبتاخد ردود عامة ومماطلة غير مقنعة.'
    },
    {
      scene:'المشهد ٣ — الشك يكبر',
      img: IMG_BASE_CHARITY + 'charity-scene3.jpg',
      text:'سارة، بحكم خبرتها كمتطوعة قديمة، بتراجع الأرقام المعلنة للتبرعات مقابل قوائم الحالات اللي اتصرف عليها فعلًا، وبتلاقي فجوة كبيرة.'
    },
    {
      scene:'المشهد ٤ — التحقيق الهادئ',
      img: IMG_BASE_CHARITY + 'charity-scene4.jpg',
      text:'سارة بتطلب تحقيق داخلي هادئ قبل ما توصل الشكوى للإعلام وتضر سمعة الجمعية والمرضى اللي محتاجينها فعلًا في المستقبل.'
    },
  ],

  suspects: [
    {
      id:'hisham_founder', name:'هشام', role:'مؤسس ورئيس مجلس إدارة الجمعية', img: IMG_BASE_CHARITY + 'hisham.jpg', avatarEmoji:'🏢',
      alibi:'قال إن كل الفلوس بتتصرف حسب الأولويات الطبية للحالات الأصعب أولًا.',
      questions:[
        { q:'ليه في تأخير في تحويل مبلغ الطفل المريض ده بالذات؟', unlockId:'priority_excuse',
          a:'"في حالات تانية كانت أصعب واحتاجت الأولوية، الفلوس مش بتتوزع بالترتيب اللي الناس بتتبرع بيه، بتتوزع حسب شدة الحالة."' },
        { q:'ممكن نشوف قائمة الحالات اللي اتصرفلها فلوس فعليًا الشهرين اللي فاتوا؟', unlockId:'spending_list',
          a:'"أكيد، القائمة موجودة عند المحاسب، مفيش أي حاجة نخبيها."' },
        { q:'نسبة كبيرة من التبرعات مش موجود ليها أي أثر في قائمة الصرف الفعلية — عندك تفسير؟', requires:['spending_list','priority_excuse'], closesInterrogation:true,
          a:'(بيصمت لحظة) "جزء من الفلوس اتحول لشركة خدمات طبية عشان نحجز أسعار أجهزة وعلاج مقدم. الموضوع إداري، مش اختلاس."' },
      ]
    },
    {
      id:'sara_volunteer', name:'سارة', role:'متطوعة قديمة، طلبت التحقيق', img: IMG_BASE_CHARITY + 'sara.jpg', avatarEmoji:'📊',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاكي تشكي في الأرقام؟',
          a:'"راجعت التبرعات المعلنة مقابل قوائم المرضى المتصرفلهم، ولقيت فجوة كبيرة جدًا مش منطقية خالص."' },
        { q:'مين بيتحكم في حسابات الجمعية فعليًا؟', unlockId:'account_access',
          a:'"هشام عنده صلاحية الاعتماد النهائي للتحويلات الكبيرة، والمحاسب بيسجلها بعد التنفيذ. المشكلة إن مفيش توقيع تاني إلزامي على التحويلات دي."' },
      ]
    },
    {
      id:'mahmoud_accountant', name:'محمود', role:'محاسب الجمعية', img: IMG_BASE_CHARITY + 'mahmoud.jpg', avatarEmoji:'🧮',
      alibi:'قال إنه بس بيسجل حركة الفلوس حسب تعليمات هشام المباشرة.',
      loseMsg:'محمود كان بس بينفذ تعليمات هشام المباشرة في التسجيل المحاسبي، ومفيش أي دليل يوضح إنه كان له صلاحية قرار مستقلة أو استفاد شخصيًا من أي مبلغ.',
      questions:[
        { q:'مين اللي بيحدد أولوية صرف الفلوس على الحالات؟',
          a:'"هشام شخصيًا، أنا بس بسجل القرارات بعد ما تتاخد، مالياش أي صلاحية اختيار."' },
        { q:'لاحظت أي تحويل غريب في الحسابات؟', unlockId:'transfer_note',
          a:'(بيتردد) "في تحويل كبير لشركة خدمات طبية اسمها النور، بس ما لقيتش فواتير علاج أو أجهزة قدامه في ملفات الحالات. لما سألت، هشام قاللي ده حجز سيولة."' },
      ]
    },
    {
      id:'laila_marketing', name:'ليلى', role:'مسؤولة التسويق والحملات الإعلانية للجمعية', img: IMG_BASE_CHARITY + 'laila.jpg', avatarEmoji:'📢',
      alibi:'قالت إن دورها بس تصميم المحتوى ونشر الحملات، مالهاش أي علاقة بالحسابات.',
      loseMsg:'ليلى كانت مسؤولة عن التسويق بس، ومفيش أي صلاحية مالية أو وصول للحسابات البنكية للجمعية. اتهامها هيكون ظلم إضافي من غير أي دليل حقيقي.',
      questions:[
        { q:'إنتِ عارفة إن فيه تأخير في صرف بعض الحالات؟',
          a:'"سمعت شكاوى من بعيد، بس مش شغلي، أنا بس مسؤولة عن الحملات والمحتوى الإعلاني."' },
        { q:'الأرقام اللي بتنشريها في الحملات دقيقة؟',
          a:'"بننشر الأرقام اللي بتوصلنا من الإدارة المالية مباشرة، مش من عندي، أنا بس بصممها بشكل جذاب."' },
      ]
    },
  ],

  evidence: [
    { id:'donation_totals', tag:'من إعلانات الحملة', crit:true, title:'إجمالي التبرعات المعلن', img: IMG_BASE_CHARITY + 'charity-totals.jpg',
      short:'8 ملايين جنيه معلنة رسميًا خلال الحملة',
      full:'الحملة أعلنت رسميًا عن جمع 8 ملايين جنيه من المتبرعين خلال أسابيع قليلة بس.',
      unlocked:true, order:1 },

    { id:'priority_excuse', tag:'من استجواب هشام', crit:false, title:'تبرير هشام لترتيب الأولويات', img:null,
      short:'ادعى إن التوزيع حسب شدة الحالة مش ترتيب التبرع',
      full:'هشام برر التأخير بترتيب أولويات طبي، من غير ما يقدم دليل واضح على وجود حالات أصعب فعليًا.',
      unlocked:false, order:2 },

    { id:'spending_list', tag:'من سجلات الجمعية', crit:true, title:'قائمة الصرف الفعلية', img: IMG_BASE_CHARITY + 'charity-spending.jpg',
      short:'مبلغ الصرف الفعلي أقل بكتير من إجمالي التبرعات',
      full:'قائمة الصرف الفعلية على المرضى بتوضح إن المبلغ المصروف فعليًا أقل بكتير من إجمالي التبرعات المعلنة، بفارق كبير مش مبرر.',
      unlocked:false, order:3 },

    { id:'account_access', tag:'من استجواب سارة', crit:false, title:'صلاحية هشام الكاملة على الحساب', img:null,
      short:'هشام عنده صلاحية الاعتماد النهائي على التحويلات الكبيرة',
      full:'سارة أكدت إن هشام يقدر يعتمد التحويلات الكبيرة من الحساب الرئيسي من غير توقيع ثانٍ إلزامي، وده يخليه صاحب القرار النهائي في مسار المبالغ الكبيرة.',
      unlocked:false, order:4 },

    { id:'transfer_note', tag:'من استجواب محمود', crit:true, title:'تحويل غير معتاد لحساب خارج القائمة', img:null,
      short:'تحويل كبير لشركة خدمات طبية من غير فواتير مقابلة',
      full:'محمود لاحظ تحويل مالي كبير لشركة اسمها النور للخدمات الطبية، لكن ملفات الجمعية ما فيهاش فواتير علاج أو أجهزة تبرر المبلغ. هشام وصف التحويل بأنه حجز سيولة مؤقت.',
      unlocked:false, order:5 },

    { id:'personal_account_link', tag:'من تحليل مالي', crit:true, title:'شركة التحويل مرتبطة بهشام من ورا الجمعية', img: IMG_BASE_CHARITY + 'charity-transfer.jpg',
      short:'الشركة المستلمة يديرها قريب لهشام وهو مفوض بالتوقيع فيها',
      full:'مراجعة السجل التجاري وكشوف التحويل بتوضح إن شركة النور مملوكة لقريب لهشام، وإن هشام نفسه مفوض بالتوقيع على حسابها. مفيش عقود توريد حقيقية تبرر المبلغ اللي خرج من الجمعية.',
      unlocked:false, order:6 },

    { id:'contradiction_noted_charity', tag:'من تحليل التناقضات', crit:true, title:'تناقض في تبرير هشام لمسار الفلوس', img:null,
      short:'قال إن الفلوس للحالات والعلاج، لكن مبلغ كبير راح لشركة مرتبطة بيه من غير فواتير',
      full:'هشام برر التأخير بأولويات طبية وحجز أسعار علاج، لكن التحويل الكبير راح لشركة مرتبطة بيه من غير عقود أو فواتير مقابلة. كلامه عن مسار الفلوس مش متوافق مع المستندات.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن الأقوال دي كويس. اتنين منها بيتعارضوا مع بعض بشكل واضح.',
    resultText: 'التناقض واضح: هشام قال إن المبلغ راح لخدمة الحالات وحجز العلاج، لكن الفلوس وصلت لشركة مرتبطة بيه من غير عقد أو فاتورة تبررها.',
    resultEvidenceIds: ['contradiction_noted_charity'],
    statements: [
      { id:'st1', text:'"الفلوس مش بتتوزع بالترتيب، بتتوزع حسب شدة الحالة."', source:'هشام — في الاستجواب' },
      { id:'st2', text:'التحويل الكبير راح لشركة مرتبطة بهشام، ومفيش عقد أو فواتير علاج مقابلة.', source:'دليل: التحليل المالي والسجل التجاري' },
      { id:'st3', text:'"أنا بس بسجل القرارات بعد ما تتاخد، مالياش أي صلاحية اختيار."', source:'محمود — في الاستجواب' },
      { id:'st4', text:'"بننشر الأرقام اللي بتوصلنا من الإدارة المالية مباشرة."', source:'ليلى — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث',
    introText: 'رتب أحداث القضية بالترتيب الصح، من إطلاق الحملة لحد اكتشاف التحويل المشبوه.',
    events: [
      { id:'e1', text:'الجمعية بتطلق حملة التبرعات وتجمع 8 ملايين جنيه خلال أسابيع.' },
      { id:'e2', text:'عيلة الطفل المريض بتشتكي من تأخير غير مبرر في تحويل مبلغ العلاج.' },
      { id:'e3', text:'محمود بيلاحظ تحويل مالي كبير لشركة خدمات طبية من غير فواتير مقابلة.' },
      { id:'e4', text:'سارة بتراجع الأرقام المعلنة مقابل قائمة الصرف الفعلية وتلاقي فجوة كبيرة.' },
      { id:'e5', text:'مراجعة الشركة المستلمة تكشف إنها مرتبطة بهشام وإنه مفوض بالتوقيع على حسابها.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'رتبت الأحداث صح. الفجوة ماكانتش مجرد تأخير إداري: مبلغ كبير خرج لشركة مرتبطة بهشام من غير مستندات خدمة حقيقية تبرره.',
    resultEvidenceIds: ['personal_account_link'],
  },

  evidenceCombinations: [
    { parts:['spending_list','transfer_note'], resultId:'contradiction_noted_charity' },
  ],

  correctSuspectId: 'hisham_founder',
  conclusiveEvidenceIds: ['spending_list', 'transfer_note', 'personal_account_link', 'contradiction_noted_charity'],
  conclusiveRequired: 4,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن هشام هو المسؤول؟',
        options: [
          { id:'a', text:'صلاحية هشام في اعتماد التحويلات + شركة مرتبطة بيه استلمت مبلغ كبير + مفيش عقود أو فواتير تبرر التحويل' },
          { id:'b', text:'لأنه مؤسس الجمعية بس' },
          { id:'c', text:'لأنه صمت لحظة قبل الإجابة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whylaila',
        label:'ليه ليلى كانت بريئة فعليًا؟',
        options: [
          { id:'a', text:'دورها تسويقي بحت، ومفيش أي صلاحية مالية أو وصول للحسابات البنكية' },
          { id:'b', text:'لأنها بتصمم الحملات وده بيبعدها عن الشبهة' },
          { id:'c', text:'لأنها اعترفت بمكانها بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'فلوس المرضى رجعت لمكانها الصح',
      paragraphs:[
        'هشام استغل صلاحية الاعتماد على التحويلات الكبيرة ووجّه جزء من تبرعات الجمعية لشركة خدمات طبية مرتبطة بعيلته وهو نفسه مفوض بالتوقيع على حسابها، من غير عقود أو فواتير حقيقية تبرر المبلغ، بينما حالات علاج كانت مستنية الصرف.',
        'اللي فضحه كان ربط الشركة المستلمة بيه، وغياب أي مستندات توريد، والفجوة بين اللي اتجمع واللي اتصرف فعلًا. الحسابات اتجمدت للمراجعة، واتبدأت إجراءات لاسترداد المبالغ محل الشبهة وتوجيهها للحالات المستحقة، وهشام اتحال لتحقيق مالي رسمي.'
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية هشام، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: قائمة الصرف، التحويل المشبوه، والتحليل المالي، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والمسؤول الحقيقي فضل في منصبه من غير مساءلة، ومرضى محتاجين فضلوا من غير علاج. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "تبرعات في الهوا"

   الغلاف (cover.webp):
   "Photorealistic shot of a donation collection box on a desk next
   to a laptop showing a financial spreadsheet, soft office lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (charity-scene1.jpg):
   "Photorealistic shot of a small charity office with volunteers
   working on a social media campaign on laptops, warm lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (charity-scene2.jpg):
   "Photorealistic shot of a worried Egyptian family on a phone call
   in a modest living room, soft daylight, photorealistic, no text,
   no watermark"

   المشهد ٣ (charity-scene3.jpg):
   "Photorealistic close-up of a woman reviewing financial documents
   and spreadsheets at a desk, focused expression, soft indoor
   lighting, photorealistic, no text, no watermark"

   المشهد ٤ (charity-scene4.jpg):
   "Photorealistic shot of a small charity office meeting room with
   documents on the table, serious atmosphere, soft lighting,
   photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   هشام (hisham.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male charity
   founder, formal shirt, warm but guarded expression, sitting in a
   modest charity office, soft office lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سارة (sara.jpg):
   "Photorealistic portrait of a young Egyptian female volunteer,
   modest casual clothing, headscarf, earnest concerned expression,
   standing in a charity office, soft indoor lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   محمود (mahmoud.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   accountant, formal shirt, glasses, cautious reserved expression,
   sitting at a desk with financial documents, office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   ليلى (laila.jpg):
   "Photorealistic portrait of a young Egyptian female marketing
   professional, trendy modest professional attire, holding a phone,
   confident energetic expression, charity office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل إجمالي التبرعات (charity-totals.jpg):
   "Photorealistic close-up of a social media campaign dashboard
   showing a large donation total number, screen glow, no text, no
   watermark, photorealistic"

   دليل قائمة الصرف (charity-spending.jpg):
   "Photorealistic close-up of a printed financial spending list
   document on a desk, office lighting, no text, no watermark,
   photorealistic"

   دليل التحويل (charity-transfer.jpg):
   "Photorealistic close-up of a bank transfer statement on a computer
   screen, highlighted transaction row, dark mode UI, no text, no
   watermark, photorealistic"
   ============================================================ */
