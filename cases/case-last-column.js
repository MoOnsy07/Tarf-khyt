/* ============================================================
   بيانات قضية: العمود الأخير
   صحفي معروف بموته فجأة في مكتبه، والجميع فاكر إنه ضحية بريئة
   كانت هتفضح فساد كبير. لكن رسالة مشفرة سايبها ورا ظهره بتقلب
   القصة كلها رأسًا على عقب.
   ============================================================ */

const IMG_BASE_LASTCOLUMN = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-column/';

const CASE_LAST_COLUMN = {
  id: 'last-column',
  title: 'العمود الأخير',
  caseNo: 'CASE 064',
  subtitle: 'مكتب جريدة مستقلة، وسط البلد، القاهرة',
  coverImg: IMG_BASE_LASTCOLUMN + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 58,
  investigationPoints: 27,
  teaser: 'صحفي استقصائي معروف بيتلاقى ميت في مكتبه ليلة قبل نشر تحقيق كبير عن فساد شركة مقاولات ضخمة. الجميع مقتنع إنه ضحية التحقيق نفسه، لكن رسالة مشفرة سايبها بتفتح باب لحقيقة تانية خالص.',

  isPremium: false,
  categories: ['murder', 'corruption', 'media'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTCOLUMN + 'cover.webp',
    heroCaption: 'CASE 064 — العمود اللي ماتنشرش أبدًا',
    text1: 'الصحفي "طارق نصر" كان على وشك نشر تحقيق استقصائي كبير عن فساد في شركة "النيل للمقاولات"، لكنه اتلاقى ميت في مكتبه ليلة النشر المفترضة. الشرطة صنّفتها كجلطة قلبية مفاجئة بسبب ضغط العمل.',
    text2: 'رئيسة التحرير "سلمى" مش مقتنعة، ولقيت في درج مكتبه رسالة مكتوبة بشفرة غريبة، وكأن طارق كان بيحاول يوصل خبر مهم لحد معين قبل ما يموت. طلبت منك تحقق قبل ما القضية تتقفل كموت طبيعي.',
    meta: [
      { label:'الضحية', value:'طارق نصر — صحفي استقصائي، 15 سنة خبرة' },
      { label:'التحقيق المعلّق', value:'فساد مالي في شركة النيل للمقاولات' },
      { label:'الرواية الرسمية', value:'وفاة طبيعية نتيجة جلطة قلبية' },
      { label:'طلب التحقيق', value:'سلمى، رئيسة تحرير الجريدة' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — ليلة قبل النشر', img: IMG_BASE_LASTCOLUMN + 'scene1.jpg',
      text:'مكتب الجريدة فاضي إلا من طارق، قاعد قدام شاشته بيراجع آخر تعديلات على التحقيق قبل النشر الرسمي في الصبح.' },
    { scene:'المشهد ٢ — مكالمة غريبة', img: IMG_BASE_LASTCOLUMN + 'scene2.jpg',
      text:'تليفون طارق بيرن، وهو بيرد بصوت متوتر وبيقفل بسرعة. بعدها بدقايق بيكتب حاجة على ورقة صغيرة ويحطها في الدرج.' },
    { scene:'المشهد ٣ — الصباح', img: IMG_BASE_LASTCOLUMN + 'scene3.jpg',
      text:'الفريق بيوصل الجريدة الصبح يلاقوا طارق ميت على مكتبه. مفيش أي علامات عنف ظاهرة، وكل حاجة شكلها طبيعي.' },
    { scene:'المشهد ٤ — التحقيق يبدأ', img: IMG_BASE_LASTCOLUMN + 'scene4.jpg',
      text:'سلمى بتلاقي الورقة المشفرة في الدرج وهي بتراجع متعلقاته، وبتحس إن القصة أعقد بكتير من مجرد جلطة قلبية.' },
  ],

  suspects: [
    {
      id:'nabil_contractor', name:'نبيل', role:'صاحب شركة النيل للمقاولات، موضوع التحقيق', img: IMG_BASE_LASTCOLUMN + 'nabil.jpg', avatarEmoji:'🏗️',
      alibi:'قال إنه كان في اجتماع عمل خارج القاهرة ليلة الوفاة، بعيد تمامًا عن مكتب الجريدة.',
      questions:[
        { q:'كنت عارف إن طارق بينشر تحقيق عنك؟',
          a:'"سمعت شائعات، بس محدش أكدلي حاجة رسمية. لو كان في تحقيق فعلي كان المفروض حد يكلمني."' },
        { q:'فيه أي اتصال مباشر بينك وبين طارق قبل وفاته؟', unlockId:'nabil_call_log',
          a:'"مكلمتوش خالص. اتصالات الشركة كلها بتمر على المكتب القانوني بتاعنا، مش أنا شخصيًا."' },
        { q:'سجل الاتصالات بيوضح مكالمة من رقمك الشخصي لطارق قبل وفاته بساعة، تفسر ده إزاي؟', requires:['nabil_call_log'],
          a:'(بيتلعثم) "ممكن يكون حد استخدم خطي، أنا مش فاكر أي مكالمة زي دي خالص."' },
      ],
      confrontations:{
        nabil_call_log:'مكلمتوش، ودي أول مرة أسمع عن اتصال زي ده.',
      }
    },
    {
      id:'selma_editor', name:'سلمى', role:'رئيسة تحرير الجريدة', img: IMG_BASE_LASTCOLUMN + 'selma.jpg', avatarEmoji:'📰',
      alibi:'كانت في بيتها بعيد عن الجريدة وقت الوفاة، بحسب سجل دخولها للمبنى.',
      questions:[
        { q:'إنتِ عارفة تفاصيل التحقيق اللي طارق كان شغال عليه؟', unlockId:'editor_knew_content',
          a:'"طبعًا، أنا اللي راجعت معاه المسودة الأخيرة قبل النشر. كان تحقيق قوي جدًا عن فساد مالي في شركة النيل."' },
        { q:'كان فيه أي ضغط عليكِ إنكِ توقفي النشر؟', unlockId:'editor_pressure',
          a:'"جالي مكالمة من محامي الشركة يهددني بدعوى قضائية لو نشرنا، بس رفضت أوقف الموضوع."' },
        { q:'طارق كان اتصرف بشكل غريب في الفترة الأخيرة؟', unlockId:'tarek_odd_behavior',
          a:'"كان متحفظ أكتر من العادة، وكان بيقول لي إن فيه حاجة محتاج يتأكد منها بنفسه قبل النشر النهائي."' },
      ],
      confrontations:{
        tarek_odd_behavior:'ده كان تحفظ عادي قبل نشر أي تحقيق كبير، مفيش حاجة غريبة فيه.',
      }
    },
    {
      id:'adel_source', name:'عادل', role:'المصدر السري داخل شركة النيل للمقاولات', img: IMG_BASE_LASTCOLUMN + 'adel.jpg', avatarEmoji:'🕵️',
      alibi:'قال إنه ماكنش شايف طارق شخصيًا من فترة طويلة، وكل تواصلهم كان بمصادر مشفرة عن بعد.',
      loseMsg:'عادل كان فعلًا المصدر السري اللي بيمد طارق بالمعلومات، لكن مفيش أي دليل مادي يربطه بمكتب الجريدة ليلة الوفاة، وشهادته متطابقة مع سجلات الاتصال المشفرة. اتهامه هيكون بلا أساس.',
      questions:[
        { q:'إنت اللي كنت بتمد طارق بمعلومات عن الشركة، صح؟', unlockId:'adel_confirmed_source',
          a:'"أيوه، كنت خايف على وظيفتي، فكل تواصلنا كان بطريقة غير مباشرة ومشفرة."' },
        { q:'آخر معلومة بعتهالك كانت إيه؟', requires:['adel_confirmed_source'],
          a:'"بعتله إن فيه حد من جوه الشركة بيهدد يوصل له مباشرة، ونصحته يحترس قبل النشر."' },
      ],
      confrontations:{}
    },
    {
      id:'lawyer_ramez', name:'رامز', role:'المحامي الشخصي لطارق ومستشاره القانوني', img: IMG_BASE_LASTCOLUMN + 'ramez.jpg', avatarEmoji:'⚖️',
      alibi:'قال إنه كان بيراجع مستندات قانونية في مكتبه الخاص وقت الوفاة، بعيد عن مقر الجريدة.',
      loseMsg:'رامز فعلًا لاحظ إن مسار التهديد القانوني كان غريب، لكنه لاحظه ونبّه عليه بنفسه — ده سلوك محامٍ حريص مش متورط. مفيش أي دليل رقمي أو مادي يربطه بمكتب الجريدة ليلة الوفاة، ولا بأي تواصل مباشر مع طارق يتجاوز حدود الاستشارة القانونية العادية. اتهامه هيكون تخمين بلا أساس.',
      questions:[
        { q:'طارق كان استشارك في حاجة قبل وفاته؟', unlockId:'ramez_legal_warning',
          a:'"استشارني في موضوع تهديد بدعوى قضائية من شركة النيل، ونصحته يوثق كل حاجة كتابيًا."' },
        { q:'كنت عارف تفاصيل التحقيق اللي كان بيشتغل عليه؟',
          a:'"عارف الخطوط العريضة بس، طارق ماكنش بيشارك التفاصيل الكاملة غير مع سلمى."' },
        { q:'ليه المحامي بتاع شركة النيل هدد طارق مباشرة مش من خلالك إنت؟', unlockId:'lawyer_contradiction', requires:['ramez_legal_warning', 'editor_pressure'], closesInterrogation:true,
          a:'(بيصمت لحظة) "دي حاجة كنت مستغرب منها برضه، مش الطريقة القانونية المعتادة للتعامل."' },
      ],
      confrontations:{
        editor_pressure:'التهديد ده كان من محامي الشركة مباشرة، مش من خلالي أنا.',
      }
    },
  ],

  evidence: [
    { id:'medical_report', tag:'من التقرير الطبي', crit:false, title:'التقرير الطبي الأولي', img:null,
      short:'التقرير الرسمي بيوصف الوفاة كجلطة قلبية طبيعية',
      full:'التقرير الطبي الأولي بيصنف وفاة طارق كجلطة قلبية مفاجئة، من غير أي إشارة لتسمم أو عنف مادي ظاهر.',
      unlocked:true, order:1 },

    { id:'nabil_call_log', tag:'من سجل الاتصالات', crit:true, title:'مكالمة من رقم نبيل الشخصي', img: IMG_BASE_LASTCOLUMN + 'evidence-call-log.jpg',
      short:'سجل الاتصالات يوضح مكالمة من رقم نبيل الشخصي لطارق قبل وفاته بساعة',
      full:'سجل شركة الاتصالات بيوضح مكالمة صادرة من رقم نبيل الشخصي لهاتف طارق، قبل وفاته بساعة واحدة بالظبط، رغم إنكاره الكامل لأي تواصل مباشر.',
      unlocked:false, order:2 },

    { id:'editor_knew_content', tag:'من استجواب سلمى', crit:false, title:'تفاصيل التحقيق المعلّق', img:null,
      short:'سلمى راجعت مسودة التحقيق الكاملة عن فساد شركة النيل',
      full:'سلمى أكدت إنها راجعت المسودة النهائية لتحقيق طارق عن فساد مالي في شركة النيل للمقاولات قبل موعد النشر المقرر.',
      unlocked:false, order:3 },

    { id:'editor_pressure', tag:'من استجواب سلمى', crit:false, title:'تهديد قانوني قبل النشر', img:null,
      short:'محامي شركة النيل هدد سلمى بدعوى قضائية لو التحقيق اتنشر',
      full:'سلمى شهدت إنها استلمت تهديد مباشر من محامي شركة النيل بدعوى قضائية لو التحقيق اتنشر، لكنها رفضت توقف النشر.',
      unlocked:false, order:4 },

    { id:'tarek_odd_behavior', tag:'من استجواب سلمى', crit:false, title:'تصرف طارق الغريب قبل الوفاة', img:null,
      short:'طارق كان متحفظ وعايز يتأكد من حاجة بنفسه قبل النشر',
      full:'سلمى لاحظت إن طارق كان متحفظ أكتر من العادة في الأيام الأخيرة، وكان بيقول إن فيه حاجة عايز يتأكد منها شخصيًا قبل النشر النهائي.',
      unlocked:false, order:5 },

    { id:'adel_confirmed_source', tag:'من استجواب عادل', crit:false, title:'هوية المصدر السري', img:null,
      short:'عادل أكد إنه المصدر السري اللي كان بيمد طارق بالمعلومات',
      full:'عادل اعترف إنه كان المصدر السري داخل شركة النيل اللي بيمد طارق بمعلومات عن الفساد المالي، عبر قنوات تواصل غير مباشرة ومشفرة.',
      unlocked:false, order:6 },

    { id:'ramez_legal_warning', tag:'من استجواب رامز', crit:false, title:'استشارة قانونية قبل الوفاة', img:null,
      short:'طارق استشار رامز بخصوص تهديد قانوني من شركة النيل',
      full:'رامز أكد إن طارق استشاره بخصوص تهديد بدعوى قضائية من شركة النيل، ونصحه يوثق كل تواصله كتابيًا احتياطًا.',
      unlocked:false, order:7 },

    { id:'lawyer_contradiction', tag:'من تحليل التناقضات', crit:true, title:'تناقض في مسار التهديد القانوني', img:null,
      short:'التهديد جه مباشرة من نبيل شخصيًا، مش عبر القنوات القانونية المعتادة',
      full:'التهديد القانوني لسلمى المفروض يجي من خلال محامي الشركة رسميًا، لكن سجل الاتصالات بيوضح إن نبيل نفسه اتصل بطارق مباشرة، وده يكسر رواية "التعامل القانوني الرسمي" ويشاور على تدخل شخصي مباشر من نبيل.',
      unlocked:false, order:8 },

    { id:'decoded_warning', tag:'من فك الشفرة', crit:true, title:'الرسالة المشفرة الحقيقية', img: IMG_BASE_LASTCOLUMN + 'evidence-cipher.jpg',
      short:'الرسالة المشفرة بتكشف إن طارق كان بيهدد نبيل شخصيًا، مش العكس',
      full:'فك شفرة الرسالة كشف إن طارق ماكانش بس بيحقق في فساد الشركة — كان بيهدد نبيل بنشر تفاصيل شخصية إضافية إلا لو دفعله مبلغ مالي كبير مقابل "تأجيل" النشر، وده يقلب صورة "الصحفي الضحية" رأسًا على عقب.',
      unlocked:false, order:9 },

    { id:'toxicology_reexam', tag:'من إعادة الفحص الطبي الشرعي', crit:true, title:'مادة مؤثرة على القلب في عينة الدم', img: IMG_BASE_LASTCOLUMN + 'evidence-toxicology.jpg',
      short:'إعادة الفحص تكشف مادة غير موصوفة طبيًا في دم طارق تسبب جلطة مفتعلة',
      full:'إعادة الفحص الطبي الشرعي على عينة دم طارق كشفت وجود مادة مؤثرة على القلب مش موصوفة له طبيًا خالص، قادرة تسبب جلطة قلبية مفتعلة تُحاكي الموت الطبيعي — وده يستبعد رواية "الوفاة الطبيعية" نهائيًا.',
      unlocked:false, order:10 },

    { id:'building_entry_log', tag:'من سجل زوار المبنى', crit:true, title:'دخول نبيل الفعلي لمبنى الجريدة', img: IMG_BASE_LASTCOLUMN + 'evidence-entrylog.jpg',
      short:'سجل الاستقبال مسجّل فيه اسم "نبيل" بوضوح، وكاميرا اللوبي تؤكد دخوله شخصيًا ليلة الوفاة',
      full:'سجل زوار مبنى الجريدة مكتوب فيه اسم "نبيل" بخط واضح في خانة الزائر، وكاميرا اللوبي بتؤكد دخوله شخصيًا في نفس الليلة، بعد المكالمة بساعة تقريبًا، رغم ادّعائه إنه كان خارج القاهرة تمامًا — ده أول دليل يثبت وجوده الفعلي في المبنى، مش بس اتصاله.',
      unlocked:false, order:11 },

    { id:'office_cup_trace', tag:'من مسرح الجريمة', crit:true, title:'أثر المادة على كوب مكتب طارق', img: IMG_BASE_LASTCOLUMN + 'evidence-cup.jpg',
      short:'كوب في مكتب طارق يحمل أثر نفس المادة وبصمات نبيل',
      full:'كوب قهوة اتلقى في سلة مهملات مكتب طارق من نفس ليلة الوفاة، وتحليله كشف أثر لنفس المادة المكتشفة في الفحص الطبي، مع بصمات نبيل عليه — ده بيربط نبيل مباشرة بمكان وطريقة الوفاة، مش بس بالدافع والاتصال.',
      unlocked:false, order:12 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن رواية سلمى عن مصدر التهديد القانوني (محامي الشركة رسميًا) بسجل الاتصالات اللي بيوضح مين اتصل فعليًا بطارق. فيه تصريح واضح مش متوافق مع الدليل.',
    resultText: 'التناقض واضح: التهديد المفروض ييجي من محامي الشركة رسميًا حسب رواية سلمى، لكن سجل الاتصالات بيثبت مكالمة من رقم نبيل الشخصي لطارق قبل وفاته بساعة — وده يكسر رواية "التعامل القانوني الرسمي" ويشاور على تدخل شخصي مباشر من نبيل.',
    resultEvidenceIds: ['lawyer_contradiction'],
    statements: [
      { id:'st1', text:'"جالي مكالمة من محامي الشركة يهددني بدعوى قضائية لو نشرنا."', source:'سلمى — في الاستجواب' },
      { id:'st2', text:'سجل الاتصالات يوضح مكالمة من رقم نبيل الشخصي لطارق قبل وفاته بساعة.', source:'دليل: سجل الاتصالات' },
      { id:'st3', text:'"استشارني في موضوع تهديد بدعوى قضائية من شركة النيل."', source:'رامز — في الاستجواب' },
      { id:'st4', text:'"كنت خايف على وظيفتي، فكل تواصلنا كان بطريقة غير مباشرة ومشفرة."', source:'عادل — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  cipherPuzzle: {
    enabled: true,
    tabLabel: 'فك الشفرة',
    introText: 'دي 4 مقتطفات من الرسالة المشفرة اللي طارق كتبها قبل وفاته. اختار الكلمة الحقيقية اللي كانت مخفية ورا كل رمز عشان تفك الرسالة الكاملة.',
    fragments: [
      {
        id:'f1',
        context:'الرمز الأول: "[___] المدة اللي طلبتها انتهت..."',
        options: [
          { id:'o1a', text:'انتظر' },
          { id:'o1b', text:'يا نبيل' },
          { id:'o1c', text:'ربما' },
        ],
        correctOptionId:'o1b',
      },
      {
        id:'f2',
        context:'الرمز الثاني: "[___] النشر هيتأجل بس مش هيتوقف..."',
        options: [
          { id:'o2a', text:'المبلغ' },
          { id:'o2b', text:'الوقت' },
          { id:'o2c', text:'القرار' },
        ],
        correctOptionId:'o2a',
      },
      {
        id:'f3',
        context:'الرمز الثالث: "[___] مش هيكون كافي المرة الجاية..."',
        options: [
          { id:'o3a', text:'اللي اتفقنا عليه' },
          { id:'o3b', text:'الوقت المحدد' },
          { id:'o3c', text:'التحقيق' },
        ],
        correctOptionId:'o3a',
      },
      {
        id:'f4',
        context:'الرمز الرابع: "[___] لو رفضت هننشر كل حاجة زي ما هي..."',
        options: [
          { id:'o4a', text:'وتذكر' },
          { id:'o4b', text:'وبعدين' },
          { id:'o4c', text:'وياريت' },
        ],
        correctOptionId:'o4a',
      },
    ],
    decodedMessage: 'يا نبيل المبلغ اللي اتفقنا عليه مش هيكون كافي المرة الجاية، وتذكر لو رفضت هننشر كل حاجة زي ما هي',
    resultText: 'فكيت الشفرة: طارق كان بيهدد نبيل بطلب مبلغ إضافي مقابل تأجيل النشر، مش مجرد صحفي بيحقق بحيادية. ده يفتح احتمال إن نبيل قتله عشان يوقف الابتزاز نهائيًا، مش عشان يمنع تحقيق صحفي عادي.',
    resultEvidenceIds: ['decoded_warning'],
  },

  evidenceCombinations: [
    { parts:['nabil_call_log','decoded_warning'], resultId:'lawyer_contradiction' },
  ],

  investigationActions: [
    {
      id:'crosscheck_legal_channel', kind:'مراجعة قانونية', label:'قارن مسار التهديد القانوني الرسمي بسجل الاتصالات',
      description:'راجع مع رامز هل التهديد القانوني كان بيمر فعلًا من خلال المحامي الرسمي للشركة أو لا.',
      requires:['ramez_legal_warning','editor_pressure'], resultEvidenceIds:['lawyer_contradiction'],
      successText:'رامز أكد إن التهديد الرسمي كان المفروض يمر من مكتبه القانوني، مش مكالمة شخصية مباشرة من نبيل.'
    },
    {
      id:'request_toxicology_reexam', kind:'طلب فحص طبي', label:'اطلب إعادة فحص طبي شرعي على عينة دم طارق',
      description:'التقرير الأولي بيقول جلطة طبيعية بس — اطلب فحص أعمق بعد ما جمعت دافع واتصال مباشر من نبيل.',
      requires:['lawyer_contradiction','decoded_warning'], resultEvidenceIds:['toxicology_reexam'],
      successText:'الفحص الشرعي الإضافي كشف مادة مؤثرة على القلب في دم طارق، مش موصوفة له طبيًا خالص.'
    },
    {
      id:'check_building_entry', kind:'مراجعة سجل الزوار', label:'راجع سجل زوار المبنى وكاميرا اللوبي ليلة الوفاة',
      description:'المكالمة أثبتت اتصال بس، مش وجود فعلي — تأكد هل نبيل دخل المبنى فعليًا بعد المكالمة أو لا.',
      requires:['toxicology_reexam'], resultEvidenceIds:['building_entry_log'],
      successText:'سجل الزوار وكاميرا اللوبي أكدوا دخول نبيل شخصيًا للمبنى بعد المكالمة بساعة تقريبًا.'
    },
    {
      id:'search_office_for_trace', kind:'تفتيش مسرح الجريمة', label:'فتّش مكتب طارق بحثًا عن أثر مادي للمادة المكتشفة',
      description:'بما إن نبيل دخل المبنى فعليًا، فتّش المكتب نفسه بحثًا عن أي أثر للمادة اللي ظهرت في الفحص الطبي.',
      requires:['building_entry_log'], resultEvidenceIds:['office_cup_trace'],
      successText:'كوب قهوة في سلة مهملات المكتب حمل أثر نفس المادة، مع بصمات نبيل عليه.'
    },
  ],

  correctSuspectId: 'nabil_contractor',
  conclusiveEvidenceIds: ['toxicology_reexam', 'building_entry_log', 'office_cup_trace', 'lawyer_contradiction'],
  conclusiveRequired: 4,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن نبيل هو الفاعل؟',
        options: [
          { id:'a', text:'الفحص الطبي الشرعي كشف مادة مؤثرة على القلب في دم طارق + سجل زوار المبنى وكاميرا اللوبي اللي أثبتوا دخوله الفعلي + أثر نفس المادة على كوب في مكتبه يحمل بصمات نبيل' },
          { id:'b', text:'لأنه صاحب الشركة موضوع التحقيق وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بلحظة الوفاة' },
          { id:'c', text:'لأنه كان متوتر وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whytarek',
        label:'ليه طارق ماكانش الضحية البريئة اللي الجميع فاكرها؟',
        options: [
          { id:'a', text:'الرسالة المشفرة كشفت إنه كان بيطلب مبلغ مالي إضافي مقابل تأجيل النشر، وده يحوله من صحفي محايد لمبتز مباشر لنبيل' },
          { id:'b', text:'لأنه كان متحفظ في الأيام الأخيرة، وده سلوك طبيعي قبل نشر أي تحقيق كبير مش دليل على ابتزاز' },
          { id:'c', text:'لأن عادل قال إنه كان خايف على وظيفته، وده مالوش علاقة مباشرة بسلوك طارق نفسه' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'العمود اللي كشف كاتبه',
      paragraphs:[
        'طارق ماكانش بس صحفي بيفضح فساد نبيل — كان بيستغل المعلومات اللي وصلته من عادل عشان يبتز نبيل شخصيًا، طالبًا مبلغ مالي إضافي مقابل تأجيل النشر. لما نبيل زاره في مكتبه بحجة "التفاوض"، دس مادة مؤثرة على القلب في كوب قهوته، مصمّمة تحاكي جلطة طبيعية.',
        'اللي قفل الدائرة كان الفحص الطبي الشرعي الإضافي اللي كشف المادة في دم طارق، وسجل زوار المبنى وكاميرا اللوبي اللي أثبتوا دخوله الفعلي بعد المكالمة بساعة، وأثر نفس المادة على كوب القهوة في مكتب طارق اللي حمل بصمات نبيل.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية نبيل، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عنها صفة "وفاة طبيعية".',
      ],
      hint:'لازم تجمع كل الأدلة الأربعة: الفحص الطبي الشرعي، دخوله الفعلي للمبنى، أثر الكوب، والتناقض في مسار التهديد القانوني، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق يدير شركته وكأن حاجة ماحصلتش. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "العمود الأخير"

   الغلاف (cover.webp):
   "Photorealistic shot of a dimly lit newspaper office desk at
   night, computer screen glowing with an unfinished article, empty
   chair, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a journalist working late alone in an
   empty newsroom, desk lamp lighting, focused expression,
   photorealistic, no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a man on a phone call looking tense,
   writing a note on paper at a desk, dim office lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a newsroom in the morning, colleagues
   gathered with concerned expressions around a desk, photorealistic,
   no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a woman going through a desk drawer,
   finding a small folded note, newsroom background, photorealistic,
   no text, no watermark"

   الشخصيات:

   نبيل (nabil.jpg):
   "Photorealistic portrait of a wealthy middle-aged Egyptian
   businessman in a tailored suit, confident and composed
   expression, office background, photorealistic, no text, no
   watermark"

   سلمى (selma.jpg):
   "Photorealistic portrait of a determined Egyptian female
   newspaper editor-in-chief, professional attire, standing in a
   newsroom, photorealistic, no text, no watermark"

   عادل (adel.jpg):
   "Photorealistic portrait of a nervous middle-aged Egyptian male
   office employee, cautious expression, corporate office
   background, photorealistic, no text, no watermark"

   رامز (ramez.jpg):
   "Photorealistic portrait of a professional Egyptian male lawyer
   in a suit, holding legal documents, office background,
   photorealistic, no text, no watermark"

   أدلة:
   evidence-call-log.jpg: "Photorealistic close-up of a phone call
   log screen showing a highlighted incoming call entry with
   timestamp, photorealistic, no text, no watermark"
   evidence-cipher.jpg: "Photorealistic close-up of a handwritten
   note with coded symbols and words, dim desk lighting,
   photorealistic, no text, no watermark"
   ============================================================ */
