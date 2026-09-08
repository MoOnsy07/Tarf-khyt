/* ============================================================
   بيانات قضية: ليلة ما قبل الفرح
   عروسة بتختفي في ليلة فرحها من نادي ريفي فاخر، والجميع مقتنع
   إنها هربت من الزواج، لكن التحقيق بيكشف إنها كانت بتهرب من
   حاجة أخطر بكتير من مجرد خوف من الارتباط.
   ============================================================ */

const IMG_BASE_RUNAWAYBRIDE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/runaway-bride/';

const CASE_RUNAWAY_BRIDE = {
  id: 'runaway-bride',
  title: 'ليلة ما قبل الفرح',
  caseNo: 'CASE 065',
  subtitle: 'نادي ريفي فاخر، طريق الفيوم، الجيزة',
  coverImg: IMG_BASE_RUNAWAYBRIDE + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 52,
  investigationPoints: 24,
  teaser: 'عروسة بتختفي فجأة قبل حفل فرحها بساعتين من نادي ريفي فاخر، وسط 200 مدعو وكاميرات مراقبة في كل مكان. الجميع مقتنع إنها هربت خوفًا من الزواج، لكن جدول تحركات الليلة بيكشف حاجة تانية خالص.',

  isPremium: false,
  categories: ['disappearance', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_RUNAWAYBRIDE + 'cover.webp',
    heroCaption: 'CASE 065 — العروسة اختفت قبل الفرح بساعتين',
    text1: 'العروسة "نور" اختفت فجأة من غرفة الاستعداد في نادي ريفي فاخر، قبل حفل فرحها بساعتين بالظبط، وسط 200 مدعو وكاميرات مراقبة في كل مكان. العائلة افترضت إنها هربت خوفًا من الزواج بسبب ضغوط الأهل.',
    text2: 'العريس "كريم" مش مقتنع بالرواية دي، لأن نور كانت متحمسة جدًا للفرح آخر مرة اتكلموا فيها. طلب منك تحقق في تحركات الليلة بالكامل قبل ما العائلة تقفل الموضوع كـ"هروب عاطفي" عادي.',
    meta: [
      { label:'المفقودة', value:'نور — العروسة، 26 سنة' },
      { label:'مكان الاختفاء', value:'غرفة استعداد العروسة، نادي ريفي فاخر' },
      { label:'الرواية العائلية', value:'هروب عاطفي بسبب خوف من الزواج' },
      { label:'طلب التحقيق', value:'كريم، العريس' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — التحضيرات', img: IMG_BASE_RUNAWAYBRIDE + 'scene1.jpg',
      text:'نور قاعدة في غرفة الاستعداد وسط صديقاتها ومكياج وفستان أبيض، والحفل هيبدأ بعد ساعتين بالظبط.' },
    { scene:'المشهد ٢ — مكالمة مقلقة', img: IMG_BASE_RUNAWAYBRIDE + 'scene2.jpg',
      text:'نور بتستلم مكالمة تليفون، ووشها بيتغير فجأة. بتقول لصديقاتها إنها محتاجة تاخد نفس شوية وتخرج من الغرفة لوحدها.' },
    { scene:'المشهد ٣ — الاختفاء', img: IMG_BASE_RUNAWAYBRIDE + 'scene3.jpg',
      text:'بعد نص ساعة، صديقاتها بيدخلوا يلاقوا الغرفة فاضية، وفستان الفرح متروك على الكرسي، ونور مالهاش أثر.' },
    { scene:'المشهد ٤ — الفوضى', img: IMG_BASE_RUNAWAYBRIDE + 'scene4.jpg',
      text:'المدعوين بيتجمعوا في حالة ذهول، والعائلة بتحاول تستوعب الموقف وسط شائعات إنها هربت من الزواج.' },
  ],

  suspects: [
    {
      id:'kareem_groom', name:'كريم', role:'العريس', img: IMG_BASE_RUNAWAYBRIDE + 'kareem-groom.jpg', avatarEmoji:'🤵',
      alibi:'كان مع أصحابه في الجزء التاني من النادي طول الوقت، بحسب شهادات متعددة.',
      questions:[
        { q:'كان فيه أي مشاكل بينك وبين نور قبل الفرح؟',
          a:'"لأ خالص، كانت متحمسة جدًا. اتكلمنا الصبح وكل حاجة كانت تمام."' },
        { q:'حد ممكن يكون عايز يأذيها أو يوقف الفرح؟', unlockId:'business_partner_threat',
          a:'"عندي شريك عمل قديم، وليد، كان عنده خلاف مالي كبير معايا، وهدد أكتر من مرة إنه هيخربلي حياتي."' },
      ],
      confrontations:{}
    },
    {
      id:'waleed_partner', name:'وليد', role:'شريك عمل سابق للعريس', img: IMG_BASE_RUNAWAYBRIDE + 'waleed.jpg', avatarEmoji:'💼',
      alibi:'قال إنه ماكانش موجود في الفرح خالص، وكان في مدينة تانية وقت الحفل.',
      questions:[
        { q:'إنت كنت موجود في الفرح ولا لأ؟', unlockId:'waleed_presence_denied',
          a:'"لأ، أنا ماكنتش موجود خالص، كنت في الإسكندرية في شغل. مالوش علاقة بيّا الموضوع ده."' },
        { q:'كان عندك خلاف مالي مع كريم؟', unlockId:'financial_dispute_confirmed',
          a:'"أيوه، كريم مديني مبلغ كبير من شراكة قديمة ورفض يرجعهولي، وده أثر على وضعي المالي بشكل كبير."' },
        { q:'كاميرات مدخل النادي بتوضح دخول عربيتك الساعة تسعة بالليل — تفسر ده إزاي؟', unlockId:'waleed_car_seen', requires:['waleed_presence_denied'], closesInterrogation:true,
          a:'(بيتلعثم) "ممكن يكون حد استعار عربيتي، أنا فعلًا ماكنتش هناك بنفسي."' },
      ],
      confrontations:{
        waleed_presence_denied:'أنا مش فاكر عربيتي كانت فين بالظبط الليلة دي.',
      }
    },
    {
      id:'nour_friend_dina', name:'دينا', role:'صديقة العروسة المقربة وشاهدة العروس', img: IMG_BASE_RUNAWAYBRIDE + 'dina.jpg', avatarEmoji:'👗',
      alibi:'كانت في غرفة الاستعداد مع نور طول الوقت لحد لحظة اختفائها.',
      questions:[
        { q:'إيه اللي حصل بالظبط قبل ما نور تختفي؟', unlockId:'phone_call_witnessed',
          a:'"استلمت مكالمة وشها اتغير فجأة، وقالت إنها هتاخد نفس وتخرج لوحدها لدقايق. ده آخر مرة شفتها فيها."' },
        { q:'عرفتِ مين كان بيكلمها؟', requires:['phone_call_witnessed'],
          a:'"مشفتش الرقم، بس سمعتها تقول اسم \'وليد\' بصوت واطي قبل ما تقفل."' },
        { q:'نور كانت خايفة من حاجة معينة قبل الفرح؟', unlockId:'nour_had_suspicion',
          a:'"قالت لي قبلها بيومين إنها لاقت أوراق غريبة في مكتب كريم بتخص شراكة قديمة، وحسيت إن فيه حاجة مش مظبوطة."' },
      ],
      confrontations:{}
    },
    {
      id:'father_hassan', name:'حسن', role:'والد العروسة', img: IMG_BASE_RUNAWAYBRIDE + 'hassan.jpg', avatarEmoji:'👨' ,
      alibi:'كان مشغول باستقبال المدعوين في الصالة الرئيسية طول الوقت.',
      loseMsg:'حسن كان فعلًا مشغول باستقبال المدعوين طول الوقت، وشهادات متعددة من الضيوف بتأكد وجوده في الصالة الرئيسية. مفيش أي دليل يربطه بمكالمة التهديد أو باختفاء نور.',
      questions:[
        { q:'لاحظت أي حاجة غريبة على نور قبل اختفائها؟',
          a:'"كانت متحمسة زي أي عروسة، ماشفتش عليها أي قلق قبل ما تدخل غرفة الاستعداد."' },
        { q:'إنت كنت عارف حاجة عن خلاف كريم المالي؟', unlockId:'father_knew_dispute',
          a:'"سمعت إشاعات عن مشكلة مالية قديمة، بس ماكنتش أعرف تفاصيلها ولا فكرت إنها ممكن توصل لده."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'missing_person_report', tag:'من بلاغ الاختفاء', crit:false, title:'بلاغ اختفاء العروسة', img:null,
      short:'بلاغ رسمي بغياب نور من مكان الحفل بشكل مفاجئ',
      full:'البلاغ الرسمي بيوثق اختفاء نور من غرفة الاستعداد قبل الحفل بساعتين، من غير أي أثر واضح للخروج من النادي.',
      unlocked:true, order:1 },

    { id:'business_partner_threat', tag:'من استجواب كريم', crit:false, title:'تهديد شريك عمل سابق', img:null,
      short:'وليد هدد كريم أكتر من مرة بسبب خلاف مالي',
      full:'كريم أكد إن شريكه السابق وليد كان عنده خلاف مالي كبير معاه، وهدده أكتر من مرة إنه هيخربله حياته.',
      unlocked:false, order:2 },

    { id:'waleed_presence_denied', tag:'من استجواب وليد', crit:false, title:'إنكار الحضور في الفرح', img:null,
      short:'وليد أنكر وجوده في مكان الفرح تمامًا',
      full:'وليد أكد إنه ماكانش موجود في الفرح خالص، وقال إنه كان في مدينة تانية وقت الحفل.',
      unlocked:false, order:3 },

    { id:'financial_dispute_confirmed', tag:'من استجواب وليد', crit:false, title:'تأكيد الخلاف المالي', img:null,
      short:'وليد أكد إن كريم مديّنه مبلغ كبير من شراكة قديمة',
      full:'وليد اعترف إن كريم مديّنه مبلغ مالي كبير من شراكة عمل قديمة ورفض يرجعهوله، وده أثر على وضعه المالي بشكل كبير.',
      unlocked:false, order:4 },

    { id:'phone_call_witnessed', tag:'من استجواب دينا', crit:false, title:'مكالمة مقلقة قبل الاختفاء', img:null,
      short:'دينا شافت نور بتستلم مكالمة غيّرت حالتها المزاجية فجأة',
      full:'دينا شهدت إن نور استلمت مكالمة تليفون غيّرت وشها فجأة، وطلبت تخرج تاخد نفس لوحدها قبل اختفائها مباشرة.',
      unlocked:false, order:5 },

    { id:'nour_had_suspicion', tag:'من استجواب دينا', crit:true, title:'شك نور في شراكة كريم القديمة', img: IMG_BASE_RUNAWAYBRIDE + 'evidence-papers.jpg',
      short:'نور لقت أوراق غريبة في مكتب كريم بتخص شراكة قديمة',
      full:'دينا كشفت إن نور لقت أوراق غريبة في مكتب كريم قبل الفرح بيومين، بتخص شراكة عمل قديمة، وحسّت إن فيه حاجة مش مظبوطة في الموضوع.',
      unlocked:false, order:6 },

    { id:'father_knew_dispute', tag:'من استجواب حسن', crit:false, title:'معرفة عامة بالخلاف المالي', img:null,
      short:'حسن سمع إشاعات عن مشكلة مالية قديمة لكريم',
      full:'حسن أكد إنه سمع إشاعات عامة عن مشكلة مالية قديمة تخص كريم، لكنه ماكنش يعرف التفاصيل ولا فكر إنها ممكن توصل لتهديد فعلي.',
      unlocked:false, order:7 },

    { id:'waleed_car_seen', tag:'من كاميرات المدخل', crit:false, title:'عربية وليد عند مدخل النادي', img: IMG_BASE_RUNAWAYBRIDE + 'evidence-car.jpg',
      short:'كاميرا المدخل صورت عربية وليد داخلة النادي الساعة تسعة بالليل',
      full:'كاميرا مراقبة مدخل النادي صورت عربية مسجلة باسم وليد وهي داخلة وقت الحفل، رغم إنكاره الكامل لوجوده في المكان. الكاميرا لوحدها بتثبت وجود العربية بس، لازم دليل يثبت مين كان بيسوقها فعليًا.',
      unlocked:false, order:8 },

    { id:'gas_station_id', tag:'من محطة بنزين قريبة', crit:true, title:'موظف المحطة يتعرف على وليد شخصيًا', img: IMG_BASE_RUNAWAYBRIDE + 'evidence-gasstation.jpg',
      short:'كاميرا المحطة صورت وجه وليد بوضوح وهو ينزل من نفس العربية',
      full:'كاميرا محطة بنزين على بعد دقايق من النادي صورت وجه وليد بوضوح وهو ينزل من العربية ويشتري سجاير قبل الحفل بساعة تقريبًا، وموظف المحطة أكد إنه تعامل معاه شخصيًا وقتها. ده بيربط وليد نفسه بالعربية، مش بس رقم لوحتها.',
      unlocked:false, order:9 },

    { id:'nour_voice_note', tag:'من نسخة احتياطية لهاتف نور', crit:true, title:'رسالة نور الصوتية عن التهديد', img: IMG_BASE_RUNAWAYBRIDE + 'evidence-voicenote.jpg',
      short:'رسالة صوتية سجلتها نور بنفسها بتشرح تهديد وليد المباشر',
      full:'نسخة احتياطية من هاتف نور فيها رسالة صوتية سجلتها بنفسها قبل اختفائها بساعات، بتشرح فيها إن وليد هددها مباشرة إنه لو الفرح كمل هيأذي كريم بسبب الخلاف المالي. بتقول في آخر الرسالة إنها "هتروح لحد تثق فيه لحد ما الأمور تهدى"، من غير ما تحدد مكانها بالظبط.',
      unlocked:false, order:10 },

    { id:'nour_hiding_location', tag:'من تحقيق ميداني', crit:true, title:'مكان اختباء نور', img: IMG_BASE_RUNAWAYBRIDE + 'evidence-hideout.jpg',
      short:'نور مختبئة بأمان في بيت خالتها بعد ما هربت من التهديد',
      full:'التحقيق الميداني كشف إن نور مش مفقودة أو مخطوفة — هربت بنفسها بعد تهديد وليد المباشر، فقررت تختفي مؤقتًا عشان تحمي خطيبها وتجمع أدلة ضد وليد بمساعدة خالتها.',
      unlocked:false, order:11 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن إنكار وليد الأول لوجوده في الفرح بتصريحه اللاحق في نفس الاستجواب. فيه تراجع مريب من نفي قاطع لتبرير مهزوز.',
    resultText: 'التناقض واضح: وليد أنكر وجوده في الفرح تمامًا في البداية، لكن لما واجهته بدليل العربية بدأ يبرر بدل ما يكرر النفي القاطع — وده سلوك شخص بيغطي على وجوده الفعلي، مش شخص بريء متأكد من مكانه.',
    resultEvidenceIds: ['waleed_presence_denied'],
    statements: [
      { id:'st1', text:'"لأ، أنا ماكنتش موجود خالص، كنت في الإسكندرية في شغل. مالوش علاقة بيّا الموضوع ده."', source:'وليد — أول الاستجواب' },
      { id:'st2', text:'"ممكن يكون حد استعار عربيتي، أنا فعلًا ماكنتش هناك بنفسي."', source:'وليد — بعد مواجهته بدليل العربية' },
      { id:'st3', text:'"كنت مع أصحابي في صالة الرجال طول الوقت."', source:'كريم — في الاستجواب' },
      { id:'st4', text:'"سمعتها تقول اسم \'وليد\' بصوت واطي قبل ما تقفل."', source:'دينا — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  alibiGridPuzzle: {
    enabled: true,
    tabLabel: 'جدول الحجج الزمنية',
    introText: 'قارن أقوال كل شخص عن مكانه وقت اختفاء نور (من 8 لـ 10 بالليل) بالأدلة المؤكدة، ودوّر على أي تناقض بين الحجة المعلنة والدليل الفعلي.',
    resultText: 'الجدول بيوضح إن وليد هو الوحيد اللي حجته (خارج القاهرة تمامًا) بتتناقض تمامًا مع دليل مستقل — كاميرا المدخل اللي صورت عربيته داخل النادي في نفس التوقيت.',
    people: [
      { id:'kareem_groom', name:'كريم', claim:'مع أصحابه في صالة الرجال، 8-10 مساءً' },
      { id:'waleed_partner', name:'وليد', claim:'في الإسكندرية للشغل، طول الليلة' },
      { id:'father_hassan', name:'حسن', claim:'في الصالة الرئيسية يستقبل الضيوف، 8-10 مساءً' },
      { id:'nour_friend_dina', name:'دينا', claim:'مع نور في غرفة الاستعداد لحد اختفائها' },
    ],
    verifiedSlots: {
      kareem_groom: 'شهادات متعددة من ضيوف تؤكد وجوده في صالة الرجال طول الفترة',
      waleed_partner: 'كاميرا مدخل النادي صورت عربيته داخلة الساعة 9 مساءً',
      father_hassan: 'شهادات متعددة من ضيوف تؤكد استقباله في الصالة الرئيسية',
      nour_friend_dina: 'كاميرا ممر غرفة الاستعداد تؤكد وجودها هناك طول الفترة',
    },
    contradictionSuspectId: 'waleed_partner',
    resultEvidenceIds: ['waleed_car_seen'],
  },

  evidenceCombinations: [
    { parts:['business_partner_threat','financial_dispute_confirmed'], resultId:'waleed_presence_denied' },
  ],

  investigationActions: [
    {
      id:'check_gas_station', kind:'تحقيق ميداني', label:'راجع محطات البنزين القريبة من النادي',
      description:'دوّر على أي شاهد يقدر يتعرف على سواق عربية وليد شخصيًا، مش بس رقم اللوحة.',
      requires:['waleed_car_seen'], resultEvidenceIds:['gas_station_id'],
      successText:'موظف محطة بنزين قريبة أكد إنه شاف وليد شخصيًا ينزل من العربية قبل الحفل بساعة تقريبًا.'
    },
    {
      id:'recover_phone_backup', kind:'تحقيق رقمي', label:'استرجع نسخة احتياطية من هاتف نور',
      description:'دوّر على أي رسالة أو تسجيل سجلته نور بنفسها قبل اختفائها يوضح سبب هروبها الحقيقي.',
      requires:['gas_station_id','financial_dispute_confirmed'], resultEvidenceIds:['nour_voice_note'],
      successText:'النسخة الاحتياطية كشفت رسالة صوتية سجلتها نور بنفسها بتشرح تهديد وليد المباشر.'
    },
    {
      id:'search_relatives_homes', kind:'تحقيق ميداني', label:'راجع بيوت الأقارب القريبين من نور',
      description:'اسأل عن أي قريب ممكن نور تكون لجأت له وقت الأزمة، خصوصًا لو محتاجة مكان آمن سريع.',
      requires:['nour_voice_note'], resultEvidenceIds:['nour_hiding_location'],
      successText:'التحقيق الميداني قاد لبيت خالة نور، حيث تبين إنها مختبئة هناك بأمان.'
    },
  ],

  correctSuspectId: 'waleed_partner',
  conclusiveEvidenceIds: ['gas_station_id', 'nour_voice_note', 'financial_dispute_confirmed', 'nour_hiding_location'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي فهمت حقيقة الموقف؟',
        options: [
          { id:'a', text:'موظف محطة البنزين تعرّف على وليد شخصيًا مش بس عربيته + رسالة نور الصوتية اللي شرحت التهديد بصوتها هي + الخلاف المالي اللي وفّر الدافع' },
          { id:'b', text:'لأن نور اختفت فجأة وده كافي لافتراض إنها هربت من الزواج، بس ده افتراض عام مش نتيجة تحقيق فعلي' },
          { id:'c', text:'لأن العائلة قالت إنها هروب عاطفي، وده تصريح عائلي مش دليل مادي مستقل' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynournotvictim',
        label:'ليه نور مش "ضحية اختطاف" زي ما ممكن يتوقع حد؟',
        options: [
          { id:'a', text:'التحقيق الميداني أثبت إنها مختبئة بأمان بمحض إرادتها في بيت خالتها، بعد ما هربت بنفسها لحماية خطيبها من تهديد مباشر' },
          { id:'b', text:'لأن محدش شافها بعد الاختفاء، وده غياب دليل مش إثبات إنها آمنة أو هربت بإرادتها' },
          { id:'c', text:'لأن دينا قالت إنها كانت متحمسة للفرح، وده مالوش علاقة مباشرة بمكانها الفعلي بعد الاختفاء' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة بتهمة التهديد', title:'العروسة اللي هربت عشان تحمي مش عشان تهرب',
      paragraphs:[
        'نور ماكانتش هاربة من الزواج — كانت بتحمي كريم من تهديد مباشر من وليد، اللي هددها إنه لو الفرح كمل هيأذي كريم بسبب خلاف مالي قديم بينهم. سجّلت رسالة صوتية بنفسها بتشرح التهديد من غير ما تكشف مكانها بالتحديد، والتحقيق الميداني هو اللي قاد لبيت خالتها اللي كانت مختبئة فيه.',
        'اللي قفل الدائرة كان تعرّف موظف محطة البنزين على وليد شخصيًا (مش بس عربيته)، ورسالة نور الصوتية اللي شرحت التهديد بصوتها هي مباشرة، والخلاف المالي اللي وفّر الدافع الحقيقي.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية وليد، بس الأدلة اللي جمعتها لسه مش كفاية تأكد القصة كاملة وتحدد مكان نور بشكل قاطع.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: تعرّف موظف المحطة، رسالة نور الصوتية، والخلاف المالي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسط ارتباك العائلة والحقيقة الفعلية فضلت مجهولة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "ليلة ما قبل الفرح"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant countryside wedding venue at
   dusk, decorated empty chairs and flowers, no guests visible,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a bride getting ready in a bridal suite,
   friends helping with makeup and dress, joyful atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a bride looking worried while on a phone
   call, bridal suite background, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of an empty bridal suite with a wedding dress
   left on a chair, dramatic lighting, photorealistic, no text, no
   watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of wedding guests standing around confused
   and concerned at an outdoor venue, photorealistic, no text, no
   watermark"

   الشخصيات:

   كريم العريس (kareem-groom.jpg):
   "Photorealistic portrait of a young Egyptian groom in a formal
   suit, worried expression, wedding venue background,
   photorealistic, no text, no watermark"

   وليد (waleed.jpg):
   "Photorealistic portrait of a middle-aged Egyptian businessman,
   tense expression, formal attire, photorealistic, no text, no
   watermark"

   دينا (dina.jpg):
   "Photorealistic portrait of a young Egyptian woman in a bridesmaid
   dress, concerned expression, photorealistic, no text, no
   watermark"

   حسن (hassan.jpg):
   "Photorealistic portrait of an older Egyptian father figure in
   formal wedding attire, composed expression, photorealistic, no
   text, no watermark"

   أدلة:
   evidence-papers.jpg: "Photorealistic close-up of scattered
   business partnership documents on a desk, photorealistic, no
   text, no watermark"
   evidence-car.jpg: "Photorealistic close-up of a security camera
   monitor showing a car entering a venue gate at night,
   photorealistic, no text, no watermark"
   evidence-hideout.jpg: "Photorealistic shot of a modest quiet home
   living room at night, a single lit lamp, photorealistic, no text,
   no watermark"
   ============================================================ */
