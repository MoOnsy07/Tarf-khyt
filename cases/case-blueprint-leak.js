/* ============================================================
   بيانات قضية: التسريب
   شركة ناشئة بتحضر لإطلاق منتج تقني ثوري، وقبل الإطلاق بيوم
   واحد، المخطط الكامل للمنتج بيتسرب على الإنترنت. الجميع فاكر
   إنها جاسوسية من منافس، لكن الحقيقة أعقد بكتير.
   ============================================================ */

const IMG_BASE_BLUEPRINTLEAK = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/blueprint-leak/';

const CASE_BLUEPRINT_LEAK = {
  id: 'blueprint-leak',
  title: 'التسريب',
  caseNo: 'CASE 066',
  subtitle: 'شركة ناشئة للتكنولوجيا، الحي التكنولوجي، القاهرة الجديدة',
  coverImg: IMG_BASE_BLUEPRINTLEAK + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 57,
  investigationPoints: 27,
  teaser: 'شركة ناشئة على وشك إطلاق منتج تقني ثوري بعد سنتين شغل، وقبل الإطلاق بيوم واحد، المخطط الكامل بيتسرب على الإنترنت. الجميع مقتنع إنها جاسوسية صناعية من منافس، لكن التحقيق بيكشف إن السبب الحقيقي أقرب بكتير مما تتخيل.',

  isPremium: false,
  categories: ['fraud', 'tech', 'corporate'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_BLUEPRINTLEAK + 'cover.webp',
    heroCaption: 'CASE 066 — المخطط اتسرب قبل الإطلاق بيوم',
    text1: 'شركة "نوفا تك" الناشئة كانت على وشك إطلاق جهاز تقني ثوري بعد سنتين من التطوير السري، لكن المخطط الكامل للمنتج ظهر فجأة على منتدى تقني عام، قبل موعد الإطلاق الرسمي بيوم واحد بالظبط.',
    text2: 'رئيسة مجلس الإدارة "منى" طلبت تحقيق داخلي عاجل، لأن الشك الأول وقع على منافس صناعي كبير حاول قبل كده يشتري الشركة. لكن حاسة إن فيه حاجة تانية مختفية وراء القصة دي.',
    meta: [
      { label:'الشركة', value:'نوفا تك — شركة ناشئة للأجهزة التقنية' },
      { label:'المنتج المسرّب', value:'مخطط جهاز تقني ثوري، سرّي لمدة سنتين' },
      { label:'الشك الأولي', value:'جاسوسية صناعية من منافس كبير' },
      { label:'طلب التحقيق', value:'منى، رئيسة مجلس الإدارة' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — قبل الإطلاق', img: IMG_BASE_BLUEPRINTLEAK + 'scene1.jpg',
      text:'مكتب نوفا تك مليان حماس، الفريق بيجهز آخر التفاصيل لإطلاق المنتج غدًا، والجميع متحمس لسنتين شغل هيشوفوا نتيجتهم أخيرًا.' },
    { scene:'المشهد ٢ — الاكتشاف', img: IMG_BASE_BLUEPRINTLEAK + 'scene2.jpg',
      text:'مهندس بيلاحظ فجأة إن المخطط الكامل للمنتج ظاهر على منتدى تقني عام، بكل التفاصيل السرية اللي محدش المفروض يشوفها.' },
    { scene:'المشهد ٣ — الصدمة', img: IMG_BASE_BLUEPRINTLEAK + 'scene3.jpg',
      text:'الفريق كله في حالة ذعر، والمستثمرون بدأوا يتصلوا بأسئلة قلقة عن مستقبل الإطلاق والشركة.' },
    { scene:'المشهد ٤ — التحقيق يبدأ', img: IMG_BASE_BLUEPRINTLEAK + 'scene4.jpg',
      text:'منى بتجمع فريق الإدارة العليا في اجتماع طارئ، وبتطلب تحقيق كامل قبل ما الموضوع يتفاقم أكتر.' },
  ],

  suspects: [
    {
      id:'youssef_ceo', name:'يوسف', role:'الرئيس التنفيذي ومؤسس الشركة', img: IMG_BASE_BLUEPRINTLEAK + 'youssef.jpg', avatarEmoji:'👔',
      alibi:'قال إنه كان في اجتماع مع مستثمرين خارج المكتب وقت التسريب، وماكانش قريب من أي جهاز فيه المخطط.',
      questions:[
        { q:'إنت أكتر واحد كان هيتضرر من التسريب، صح؟',
          a:'"طبعًا! ده مشروع عمري، خسرت فيه سنتين وكل مدخراتي الشخصية تقريبًا. التسريب ده كارثة عليّ أنا الأول."' },
        { q:'كان فيه أي مشاكل تقنية في المنتج قبل الإطلاق؟',
          a:'"زي أي منتج جديد، فيه تفاصيل بسيطة بنراجعها، بس مفيش حاجة تمنع الإطلاق."' },
        { q:'مين غيرك عنده صلاحية كاملة على ملفات المخطط السرية؟', unlockId:'ceo_full_access',
          a:'"أنا بس عندي صلاحية كاملة على كل النسخ، حتى المدير التقني معاه نسخة محدودة بس."' },
        { q:'سجل الشركة التأمينية بيوضح إنك رفعت طلب تعويض ضخم بسبب "سرقة ملكية فكرية" يوم التسريب نفسه — تفسر ده إزاي؟', unlockId:'insurance_claim_filed', requires:['ceo_full_access'], closesInterrogation:true,
          a:'(بيصمت لحظة) "ده إجراء طبيعي لحماية حقوق الشركة، مفيش حاجة غريبة في تقديم مطالبة تأمينية."' },
      ],
      confrontations:{
        ceo_full_access:'الصلاحية الكاملة عندي طبيعية، أنا المؤسس والمسؤول الأول.',
        technical_flaw_report:'التقرير ده مبالغ فيه، المشاكل كانت بسيطة جدًا.',
      }
    },
    {
      id:'mona_chairwoman', name:'منى', role:'رئيسة مجلس الإدارة', img: IMG_BASE_BLUEPRINTLEAK + 'mona.jpg', avatarEmoji:'📊',
      alibi:'كانت في مكتبها بتراجع تقارير مالية طول اليوم، بحسب سجل الدخول للمبنى.',
      questions:[
        { q:'ليه طلبتِ تحقيق داخلي بدل ما تسيبي الأمر للشرطة مباشرة؟', unlockId:'chairwoman_suspicion',
          a:'"لأني حاسة إن فيه حاجة مش مظبوطة في القصة من الأول، والشك في منافس خارجي بسيط جدًا ومريح أكتر من اللازم."' },
        { q:'كان فيه أي تقرير تقني مقلق قبل الإطلاق؟', unlockId:'technical_flaw_report',
          a:'"فريق الجودة رفع تقرير قبل الإطلاق بأسبوع بيحذر من مشكلة أمان خطيرة في المنتج، بس محدش اهتم بيه رسميًا."' },
      ],
      confrontations:{}
    },
    {
      id:'tarek_cto', name:'طارق', role:'المدير التقني (CTO)', img: IMG_BASE_BLUEPRINTLEAK + 'tarek.jpg', avatarEmoji:'💻',
      alibi:'قال إنه كان شغال من البيت على نسخته المحدودة من المخطط وقت التسريب.',
      loseMsg:'طارق كان أكتر واحد قلقان من العيب الأمني، وده بالظبط اللي يخليه يبان مشبوه — كان ممكن "يسرّب" المخطط بنفسه عشان يوقف الإطلاق. لكن تحليل لابتوب يوسف الشخصي هو اللي أثبت مصدر الرفع الفعلي، ومفيش أي أثر رقمي يربط طارق بحساب الرفع المجهول على المنتدى. صراحته في الاعتراف بالعيب كانت شهادة، مش جريمة.',
      questions:[
        { q:'إنت كتبت تقرير المشكلة التقنية اللي منى ذكرتها؟', unlockId:'cto_confirmed_flaw', requires:['technical_flaw_report'],
          a:'"أيوه، كتبت تقرير مفصل بيوضح إن فيه عيب أمان جوهري في المنتج ممكن يعرّض المستخدمين لخطر حقيقي. رفعته ليوسف مباشرة."' },
        { q:'يوسف تصرف إزاي لما استلم التقرير؟', requires:['cto_confirmed_flaw'],
          a:'"تجاهله تمامًا، قال لي إن الإطلاق مش هيتأجل تحت أي ظرف، والمستثمرين مستنيين نتيجة."' },
        { q:'إنت من نقل النسخة السرية للمنتدى؟',
          a:'"لأ خالص، أنا كنت خايف على سمعتي المهنية أكتر من أي حد، مليش أي مصلحة أنشر المخطط بنفسي."' },
      ],
      confrontations:{
        insurance_claim_filed:'ده تصرف يوسف الشخصي، أنا مش داخل فيه خالص.',
      }
    },
    {
      id:'sara_competitor', name:'سارة', role:'ممثلة شركة منافسة كانت بتحاول شراء الشركة', img: IMG_BASE_BLUEPRINTLEAK + 'sara.jpg', avatarEmoji:'🏢',
      alibi:'قالت إنها كانت في اجتماع خارجي بعيد تمامًا عن مكتب نوفا تك وقت التسريب.',
      loseMsg:'سارة كانت فعلًا في اجتماع خارجي موثق وقت التسريب، ومفيش أي دليل رقمي يربطها بنشر المخطط أو بالوصول لملفاته السرية. اتهامها هيكون مبني على شك ظاهري بس من غير أي دليل مادي.',
      questions:[
        { q:'شركتك حاولت تشتري نوفا تك قبل كده، صح؟',
          a:'"أيوه، عرضنا عليهم صفقة استحواذ كويسة، لكن يوسف رفض بشكل قاطع. ده قرار تجاري عادي."' },
        { q:'كان عندك أي وصول لملفات المخطط السرية؟', unlockId:'sara_no_access',
          a:'"خالص، حتى في مفاوضات الاستحواذ ماكانش مسموح لنا نشوف تفاصيل المخطط الكاملة."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'leak_forum_post', tag:'من المنتدى التقني', crit:false, title:'منشور التسريب على المنتدى', img: IMG_BASE_BLUEPRINTLEAK + 'evidence-forum.jpg',
      short:'المخطط الكامل ظهر على منتدى تقني عام قبل الإطلاق بيوم',
      full:'منشور على منتدى تقني عام يحتوي على المخطط الكامل للمنتج بكل تفاصيله السرية، اتنشر قبل موعد الإطلاق الرسمي بيوم واحد بالظبط.',
      unlocked:true, order:1 },

    { id:'ceo_full_access', tag:'من استجواب يوسف', crit:false, title:'صلاحية الوصول الكاملة', img:null,
      short:'يوسف هو الوحيد اللي معاه صلاحية كاملة على كل نسخ المخطط',
      full:'يوسف أكد إنه الوحيد في الشركة اللي معاه صلاحية كاملة على كل نسخ ملفات المخطط السرية، بينما باقي الفريق معاهم نسخ محدودة بس.',
      unlocked:false, order:2 },

    { id:'chairwoman_suspicion', tag:'من استجواب منى', crit:false, title:'شك منى في رواية الجاسوسية', img:null,
      short:'منى حاسة إن الشك في منافس خارجي بسيط ومريح أكتر من اللازم',
      full:'منى عبّرت عن شكها في رواية "الجاسوسية الصناعية" لأنها بسيطة ومريحة بشكل غير طبيعي، وطلبت تحقيق داخلي شامل بدل التسليم بيها مباشرة.',
      unlocked:false, order:3 },

    { id:'technical_flaw_report', tag:'من استجواب منى', crit:true, title:'تقرير عيب أمان خطير', img: IMG_BASE_BLUEPRINTLEAK + 'evidence-report.jpg',
      short:'فريق الجودة حذر من عيب أمان خطير في المنتج قبل الإطلاق بأسبوع',
      full:'منى كشفت إن فريق الجودة رفع تقرير رسمي قبل الإطلاق بأسبوع بيحذر من عيب أمان جوهري في المنتج، لكن التقرير اتجوهر رسميًا من الإدارة العليا.',
      unlocked:false, order:4 },

    { id:'cto_confirmed_flaw', tag:'من استجواب طارق', crit:true, title:'تأكيد العيب التقني الخطير', img:null,
      short:'طارق أكد إن العيب الأمني حقيقي وإن يوسف تجاهله عمدًا',
      full:'طارق أكد إنه هو كاتب التقرير الأصلي، وإن العيب الأمني حقيقي وخطير على المستخدمين، وإن يوسف تجاهل التحذير بشكل كامل وأصر على المضي في الإطلاق.',
      unlocked:false, order:5 },

    { id:'sara_no_access', tag:'من استجواب سارة', crit:false, title:'عدم وصول المنافس للمخطط', img:null,
      short:'الشركة المنافسة ماكانش عندها وصول لتفاصيل المخطط الكاملة',
      full:'سارة أكدت إن شركتها المنافسة ماكانش عندها أي وصول لتفاصيل المخطط الكاملة، حتى أثناء مفاوضات الاستحواذ السابقة.',
      unlocked:false, order:6 },

    { id:'insurance_claim_filed', tag:'من سجلات التأمين', crit:true, title:'مطالبة تأمينية مشبوهة', img: IMG_BASE_BLUEPRINTLEAK + 'evidence-insurance.jpg',
      short:'يوسف رفع مطالبة تأمينية ضخمة يوم التسريب نفسه',
      full:'سجلات شركة التأمين بتوضح إن يوسف رفع مطالبة تعويض ضخمة بسبب "سرقة ملكية فكرية" في نفس يوم التسريب بالظبط، قبل ما التحقيق الرسمي حتى يبدأ.',
      unlocked:false, order:7 },

    { id:'leak_source_traced', tag:'من فك تشفير اللابتوب', crit:true, title:'مصدر التسريب الحقيقي', img: IMG_BASE_BLUEPRINTLEAK + 'evidence-laptop.jpg',
      short:'لابتوب يوسف الشخصي هو مصدر رفع الملف على المنتدى',
      full:'تحليل لابتوب يوسف الشخصي كشف إنه هو نفسه اللي رفع نسخة المخطط الكاملة على المنتدى التقني، مستخدمًا حساب مجهول، قبل موعد الإطلاق بساعات قليلة.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تصريح يوسف الأول عن "تفاصيل بسيطة" بتأكيد طارق للعيب الأمني الخطير. فيه تناقض واضح في وصف نفس المشكلة.',
    resultText: 'التناقض واضح: يوسف قلل من شأن المشكلة التقنية ووصفها بـ"تفاصيل بسيطة"، بينما طارق (المدير التقني) أكد إنها عيب أمان جوهري وخطير هدد فيه المستخدمين مباشرة. الفرق الكبير في الوصف يشاور على تجاهل متعمد مش نسيان بسيط.',
    resultEvidenceIds: ['technical_flaw_report'],
    statements: [
      { id:'st1', text:'"زي أي منتج جديد، فيه تفاصيل بسيطة بنراجعها، بس مفيش حاجة تمنع الإطلاق."', source:'يوسف — في الاستجواب' },
      { id:'st2', text:'"العيب الأمني حقيقي وخطير على المستخدمين، ويوسف تجاهل التحذير بشكل كامل."', source:'طارق — في الاستجواب' },
      { id:'st3', text:'"حاسة إن الشك في منافس خارجي بسيط ومريح أكتر من اللازم."', source:'منى — في الاستجواب' },
      { id:'st4', text:'"حتى في مفاوضات الاستحواذ ماكانش مسموح لنا نشوف تفاصيل المخطط الكاملة."', source:'سارة — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  codeLockPuzzle: {
    enabled: true,
    tabLabel: 'فك تشفير لابتوب يوسف',
    introText: 'لابتوب يوسف الشخصي مقفول بكود 4 أرقام. عندك خيطين منفصلين: تاريخ تأسيس الشركة كان في شهر 3، وآخر رقمين من رقم براءة الاختراع بينتهوا بـ 47. على ورقة صغيرة جنب اللابتوب مكتوب: «شهر التأسيس، وبعده آخر رقمين من براءة الاختراع».',
    code: '0347',
    hint: 'اجمع رقم شهر تأسيس الشركة مع آخر رقمين من رقم براءة الاختراع',
    wrongMsg: '✗ الرقم غلط، فكر في التلميح تاني.',
    resultText: 'اتفتح اللابتوب. لقيت رسائل بتوضح إن يوسف كان عارف بعيب الأمان الخطير من زمان، ومعاها سجل رفع ملف على المنتدى التقني من حساب مجهول قبل الإطلاق بساعات قليلة.',
    resultEvidenceIds: ['leak_source_traced'],
  },

  evidenceCombinations: [
    { parts:['technical_flaw_report','cto_confirmed_flaw'], resultId:'insurance_claim_filed' },
  ],

  investigationActions: [
    {
      id:'crosscheck_insurance_timing', kind:'مراجعة مالية', label:'قارن توقيت المطالبة التأمينية بتوقيت التسريب',
      description:'راجع سجلات شركة التأمين وقارن توقيت تقديم المطالبة بتوقيت نشر المخطط على المنتدى.',
      requires:['ceo_full_access','technical_flaw_report'], resultEvidenceIds:['insurance_claim_filed'],
      successText:'المراجعة أكدت إن المطالبة التأمينية اتقدمت في نفس ساعات التسريب تقريبًا، قبل أي تحقيق رسمي.'
    },
  ],

  correctSuspectId: 'youssef_ceo',
  conclusiveEvidenceIds: ['insurance_claim_filed', 'leak_source_traced', 'cto_confirmed_flaw', 'technical_flaw_report'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن يوسف هو الفاعل؟',
        options: [
          { id:'a', text:'لابتوبه الشخصي أثبت إنه مصدر رفع الملف + تجاهله المتعمد لتقرير العيب الأمني الخطير + مطالبته التأمينية المشبوهة في نفس يوم التسريب' },
          { id:'b', text:'لأنه الرئيس التنفيذي وأكتر واحد عنده صلاحية وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بالتسريب نفسه' },
          { id:'c', text:'لأنه كان متوتر وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whymotive',
        label:'ليه يوسف سرّب منتجه هو بنفسه؟',
        options: [
          { id:'a', text:'كان عارف إن المنتج فيه عيب أمان خطير هيسبب فضيحة وخسارة فادحة بعد الإطلاق، فسرّبه بنفسه عشان يوقف الإطلاق ويحصل على تعويض تأميني ضخم بدل خسارة مضمونة' },
          { id:'b', text:'عشان يضر بمنافسته سارة، رغم إن مفيش دليل يربط التسريب بأي هدف يخص شركتها تحديدًا' },
          { id:'c', text:'عشان يلفت الانتباه الإعلامي للمنتج، وده تفسير مش منطقي لأنه بيدمر فرصة الإطلاق نفسها' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'التسريب اللي أنقذ صاحبه من الكارثة',
      paragraphs:[
        'يوسف كان عارف من تقرير طارق إن المنتج فيه عيب أمان خطير هيسبب كارثة وفضيحة بعد الإطلاق. بدل ما يواجه خسارة مؤكدة وانهيار سمعة الشركة، سرّب المخطط بنفسه من حساب مجهول، ورفع مطالبة تأمينية ضخمة بدعوى "سرقة ملكية فكرية" في نفس اليوم.',
        'اللي قفل الدائرة كان تحليل لابتوبه الشخصي اللي أثبت مصدر التسريب، وتجاهله الموثق لتحذير طارق، وتوقيت المطالبة التأمينية المريب اللي سبق أي تحقيق رسمي.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية يوسف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي رواية "الجاسوسية الصناعية".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: المطالبة التأمينية، مصدر التسريب في اللابتوب، تأكيد طارق، وتقرير العيب الأمني، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل يدير شركته وكأن حاجة ماحصلتش. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "التسريب"

   الغلاف (cover.webp):
   "Photorealistic shot of a modern tech startup office at night,
   empty desks with glowing monitors showing code and blueprints,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of an excited young tech team working late
   in a modern office preparing for a product launch, photorealistic,
   no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a shocked engineer looking at a laptop
   screen showing a forum post, office background, photorealistic,
   no text, no watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a tech office in chaos, employees on
   phone calls looking worried, photorealistic, no text, no
   watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a tense emergency meeting in a modern
   glass conference room, photorealistic, no text, no watermark"

   الشخصيات:

   يوسف (youssef.jpg):
   "Photorealistic portrait of a young Egyptian male tech startup
   CEO, smart casual attire, confident but tense expression, modern
   office background, photorealistic, no text, no watermark"

   منى (mona.jpg):
   "Photorealistic portrait of a professional Egyptian businesswoman
   in her 40s, formal attire, sharp analytical expression, boardroom
   background, photorealistic, no text, no watermark"

   طارق (tarek.jpg):
   "Photorealistic portrait of a young Egyptian male software
   engineer, casual tech attire, glasses, thoughtful expression,
   office background, photorealistic, no text, no watermark"

   سارة (sara.jpg):
   "Photorealistic portrait of a confident Egyptian businesswoman in
   formal corporate attire, photorealistic, no text, no watermark"

   أدلة:
   evidence-forum.jpg: "Photorealistic close-up of a laptop screen
   showing a tech forum post with a technical blueprint diagram,
   photorealistic, no text, no watermark"
   evidence-report.jpg: "Photorealistic close-up of a printed
   technical safety report document on a desk, photorealistic, no
   text, no watermark"
   evidence-insurance.jpg: "Photorealistic close-up of an insurance
   claim document form on a desk, photorealistic, no text, no
   watermark"
   evidence-laptop.jpg: "Photorealistic close-up of a laptop screen
   showing an upload history log, dark mode interface,
   photorealistic, no text, no watermark"
   ============================================================ */
