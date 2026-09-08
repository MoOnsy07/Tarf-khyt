/* ============================================================
   بيانات قضية: المعرض المسروق
   لوحة أثرية بتتسرق من معرض فني في الليل، والشك بيقع على
   حارس الأمن. لكن قفل الخزنة السرية بيكشف حاجة محدش كان
   متوقعها عن صاحب المعرض نفسه.
   ============================================================ */

const IMG_BASE_STOLENGALLERY = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/stolen-gallery/';

const CASE_STOLEN_GALLERY = {
  id: 'stolen-gallery',
  title: 'المعرض المسروق',
  caseNo: 'CASE 076',
  subtitle: 'معرض فني خاص، الزمالك، القاهرة',
  coverImg: IMG_BASE_STOLENGALLERY + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 50,
  investigationPoints: 24,
  teaser: 'لوحة أثرية نادرة بتتسرق من معرض فني خاص في نص الليل، من غير أي أثر لاقتحام واضح. الشك بيقع فورًا على حارس الأمن المناوب، لكن قفل الخزنة السرية للمعرض بيكشف حاجة عن صاحب المعرض نفسه محدش كان يتخيلها.',

  isPremium: false,
  categories: ['fraud', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_STOLENGALLERY + 'cover.webp',
    heroCaption: 'CASE 076 — اللوحة اختفت من غير اقتحام',
    text1: 'لوحة أثرية نادرة قيمتها الفنية والمادية كبيرة جدًا، اختفت من معرض "آفاق" الفني الخاص في نص الليل، من غير أي أثر واضح لاقتحام أو كسر. الشك وقع فورًا على حارس الأمن المناوب "سيد" باعتباره الشخص الوحيد اللي كان موجود وقت الحادثة.',
    text2: 'مساعدة صاحب المعرض "نادين" مش مقتنعة بالرواية دي، لأن نظام الإنذار ماكانش شغال بشكل غريب وقت السرقة. طلبت تحقق قبل ما شركة التأمين تدفع تعويض ضخم لصاحب المعرض بناءً على رواية السرقة الرسمية.',
    meta: [
      { label:'المسروقة', value:'لوحة أثرية نادرة، قيمة عالية' },
      { label:'مكان السرقة', value:'معرض آفاق الفني، من غير أثر اقتحام' },
      { label:'المتهم الأول', value:'حارس الأمن المناوب' },
      { label:'طلب التحقيق', value:'نادين، مساعدة صاحب المعرض' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — قبل الإغلاق', img: IMG_BASE_STOLENGALLERY + 'scene1.jpg',
      text:'المعرض بيقفل أبوابه بعد يوم عادي من الزيارات، واللوحة الأثرية معلقة في مكانها المعتاد وسط إجراءات أمان مشددة.' },
    { scene:'المشهد ٢ — الليل', img: IMG_BASE_STOLENGALLERY + 'scene2.jpg',
      text:'الحارس سيد بيعمل جولته المعتادة حوالين المعرض المظلم، ونظام الإنذار مفروض يكون شغال بالكامل.' },
    { scene:'المشهد ٣ — الاكتشاف', img: IMG_BASE_STOLENGALLERY + 'scene3.jpg',
      text:'الصباح، الفريق بيوصل يلاقوا مكان اللوحة فاضي، من غير أي كسر في الأبواب أو النوافذ.' },
    { scene:'المشهد ٤ — التحقيق', img: IMG_BASE_STOLENGALLERY + 'scene4.jpg',
      text:'نادين بتراجع سجلات نظام الإنذار، وبتلاحظ إنه كان متوقف في وقت غريب قبل السرقة مباشرة.' },
  ],

  suspects: [
    {
      id:'security_sayed_gallery', name:'سيد', role:'حارس الأمن المناوب ليلة السرقة', img: IMG_BASE_STOLENGALLERY + 'sayed-guard.jpg', avatarEmoji:'🔦',
      alibi:'قال إنه عمل جولته المعتادة زي كل ليلة، وماشافش أي حاجة غريبة قبل الصباح.',
      loseMsg:'سيد فعلًا عمل جولاته المعتادة بشكل طبيعي، وكاميرا مدخل المعرض بتؤكد إنه ماخرجش من موقعه المعتاد طول الليلة. اللي أطفأ نظام الإنذار كان شخص عنده صلاحية إدارية على النظام نفسه، مش الحارس العادي. اتهامه هيكون تصيّد لأقرب شخص للموقع، مش نتيجة تحقيق فعلي.',
      questions:[
        { q:'إنت كنت المسؤول الوحيد عن الأمن ليلة السرقة؟',
          a:'"أيوه، عملت جولاتي المعتادة زي كل ليلة، وماشفتش أي حاجة غريبة قبل الصباح."' },
        { q:'نظام الإنذار كان شغال طول الليلة؟', unlockId:'alarm_system_question',
          a:'"على حد علمي كان شغال، أنا مالوش صلاحية أتحكم فيه، ده بيتحكم فيه من مكتب الإدارة بس."' },
      ],
      confrontations:{}
    },
    {
      id:'gallery_owner_fathi', name:'فتحي', role:'صاحب المعرض، مؤمّن على اللوحة بمبلغ كبير', img: IMG_BASE_STOLENGALLERY + 'fathi.jpg', avatarEmoji:'🖼️',
      alibi:'قال إنه كان في بيته وقت السرقة، بعيد تمامًا عن المعرض.',
      questions:[
        { q:'اللوحة كانت مؤمّن عليها بمبلغ كبير؟', unlockId:'insurance_value_hint',
          a:'"أيوه، تأمين طبيعي على أي قطعة فنية بقيمة عالية زي دي، ده إجراء معتاد في مجال الفن."' },
        { q:'كان عندك أي مشاكل مالية في الفترة الأخيرة؟', requires:['insurance_value_hint'], unlockId:'fathi_financial_trouble',
          a:'"المعرض كان بيمر بفترة صعبة ماديًا، بس ده مش سبب أعمل حاجة غير قانونية."' },
        { q:'مين غيرك عنده صلاحية إدارية على نظام الإنذار؟', requires:['fathi_financial_trouble'], unlockId:'fathi_alarm_access',
          a:'"أنا بس عندي الصلاحية الكاملة على نظام الإنذار، حتى نادين معاها صلاحية محدودة أقل مني."' },
      ],
      confrontations:{}
    },
    {
      id:'assistant_nadine', name:'نادين', role:'مساعدة صاحب المعرض، طلبت التحقيق', img: IMG_BASE_STOLENGALLERY + 'nadine.jpg', avatarEmoji:'🔍',
      alibi:'كانت في بيتها وقت السرقة، بعيد عن المعرض تمامًا.',
      questions:[
        { q:'إيه اللي خلاكِ تشكي في رواية السرقة؟', unlockId:'nadine_alarm_suspicion',
          a:'"سجلات نظام الإنذار بتوضح إنه اتوقف لمدة ساعة كاملة قبل السرقة، وده مش عطل عشوائي، ده تعطيل مقصود."' },
        { q:'مين له صلاحية يوقف نظام الإنذار بالشكل ده؟', requires:['nadine_alarm_suspicion'],
          a:'"فتحي بس هو اللي معاه الصلاحية الكاملة على النظام، أنا معايا صلاحية محدودة جدًا."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'theft_report', tag:'من بلاغ السرقة', crit:false, title:'بلاغ سرقة اللوحة الأثرية', img:null,
      short:'بلاغ رسمي باختفاء اللوحة من غير أثر اقتحام واضح',
      full:'البلاغ الرسمي بيوثق اختفاء اللوحة الأثرية من المعرض ليلًا، من غير أي أثر واضح للاقتحام أو كسر الأبواب والنوافذ.',
      unlocked:true, order:1 },

    { id:'alarm_system_question', tag:'من استجواب سيد', crit:false, title:'صلاحية التحكم في الإنذار', img:null,
      short:'الحارس مالوش صلاحية التحكم في نظام الإنذار',
      full:'سيد أكد إنه مالوش أي صلاحية للتحكم في نظام الإنذار، وإن التحكم فيه بيتم من مكتب الإدارة بس.',
      unlocked:false, order:2 },

    { id:'insurance_value_hint', tag:'من استجواب فتحي', crit:false, title:'قيمة التأمين على اللوحة', img:null,
      short:'اللوحة كانت مؤمّن عليها بمبلغ كبير',
      full:'فتحي أكد إن اللوحة كانت مؤمّن عليها بمبلغ مالي كبير، وصفه كإجراء طبيعي في مجال الأعمال الفنية.',
      unlocked:false, order:3 },

    { id:'fathi_financial_trouble', tag:'من استجواب فتحي', crit:true, title:'أزمة مالية في المعرض', img:null,
      short:'المعرض كان بيمر بفترة مالية صعبة قبل السرقة',
      full:'فتحي اعترف إن المعرض كان بيمر بفترة مالية صعبة قبل السرقة، رغم تأكيده إن ده مش سبب لأي تصرف غير قانوني.',
      unlocked:false, order:4 },

    { id:'nadine_alarm_suspicion', tag:'من استجواب نادين', crit:true, title:'تعطيل نظام الإنذار المقصود', img: IMG_BASE_STOLENGALLERY + 'evidence-alarm-log.jpg',
      short:'نظام الإنذار اتعطل لمدة ساعة كاملة قبل السرقة مباشرة',
      full:'نادين كشفت إن سجلات نظام الإنذار بتوضح تعطيله لمدة ساعة كاملة قبل السرقة مباشرة، بشكل يستبعد أي عطل عشوائي ويشاور على تدخل مقصود.',
      unlocked:false, order:5 },

    { id:'fathi_alarm_access', tag:'من استجواب فتحي', crit:false, title:'صلاحية فتحي الحصرية على الإنذار', img:null,
      short:'فتحي هو الوحيد اللي معاه الصلاحية الكاملة على نظام الإنذار',
      full:'فتحي أكد إنه الوحيد اللي معاه الصلاحية الإدارية الكاملة للتحكم في نظام الإنذار، حتى نادين معاها صلاحية محدودة أقل منه.',
      unlocked:false, order:6 },

    { id:'safe_confession_found', tag:'من فك تشفير الخزنة', crit:true, title:'اعتراف فتحي المخفي في الخزنة', img: IMG_BASE_STOLENGALLERY + 'evidence-safe.jpg',
      short:'رسائل في الخزنة السرية تثبت خطة فتحي لتهريب اللوحة',
      full:'خزنة فتحي السرية في مكتبه كانت فيها رسائل ومراسلات بتوضح خطته لتهريب اللوحة بنفسه وبيعها سريًا لمشتري خاص، بعد ما يحصل على مبلغ التأمين الكامل من الشركة كمان.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تأكيد فتحي إن تأمين اللوحة "إجراء طبيعي بس" بأزمته المالية اللي اعترف بيها لاحقًا. فيه دافع واضح بيتجاهله في وصفه الأول.',
    resultText: 'التناقض واضح: فتحي وصف التأمين كإجراء تجاري عادي، لكنه اعترف بعد كده بأزمة مالية حقيقية في المعرض — وده يحوّل التأمين من "إجراء عادي" لدافع مالي واضح للتخلص من اللوحة بطريقة مربحة.',
    resultEvidenceIds: ['fathi_financial_trouble'],
    statements: [
      { id:'st1', text:'"تأمين طبيعي على أي قطعة فنية بقيمة عالية زي دي، ده إجراء معتاد."', source:'فتحي — أول الاستجواب' },
      { id:'st2', text:'"المعرض كان بيمر بفترة صعبة ماديًا."', source:'فتحي — لاحقًا في نفس الاستجواب' },
      { id:'st3', text:'"عملت جولاتي المعتادة زي كل ليلة."', source:'سيد — في الاستجواب' },
      { id:'st4', text:'"سجلات نظام الإنذار بتوضح إنه اتوقف لمدة ساعة كاملة."', source:'نادين — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  codeLockPuzzle: {
    enabled: true,
    tabLabel: 'فك تشفير خزنة فتحي',
    introText: 'خزنة فتحي السرية في مكتبه مقفولة بكود 4 أرقام. عندك خيطين منفصلين: سنة افتتاح المعرض كانت 2018، وآخر رقمين من رقم قطعة اللوحة المسجلة في كتالوج المعرض بينتهوا بـ 56. على ورقة صغيرة جنب الخزنة مكتوب: «سنة الافتتاح، وبعدها آخر رقمين من رقم القطعة».',
    code: '1856',
    hint: 'اجمع آخر رقمين من سنة افتتاح المعرض مع آخر رقمين من رقم قطعة اللوحة في الكتالوج',
    wrongMsg: '✗ الرقم غلط، فكر في التلميح تاني.',
    resultText: 'اتفتحت الخزنة. لقيت مراسلات بتوضح خطة فتحي لتهريب اللوحة بنفسه وبيعها لمشتري خاص، بعد ما ياخد مبلغ التأمين الكامل من شركة التأمين كمان.',
    resultEvidenceIds: ['safe_confession_found'],
  },

  evidenceCombinations: [
    { parts:['fathi_financial_trouble','fathi_alarm_access'], resultId:'safe_confession_found' },
  ],

  investigationActions: [
    {
      id:'check_buyer_contacts', kind:'تحقيق مالي', label:'راجع اتصالات فتحي مع تجار فن مستقلين',
      description:'دوّر على أي تواصل مريب بين فتحي وتجار فن خارج القنوات الرسمية المعتادة.',
      requires:['fathi_financial_trouble','nadine_alarm_suspicion'], resultEvidenceIds:['safe_confession_found'],
      successText:'التحقيق كشف تواصل مريب بين فتحي وتاجر فن مستقل قبل السرقة بأسابيع قليلة.'
    },
  ],

  correctSuspectId: 'gallery_owner_fathi',
  conclusiveEvidenceIds: ['safe_confession_found', 'nadine_alarm_suspicion', 'fathi_alarm_access', 'fathi_financial_trouble'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن فتحي هو اللي دبّر السرقة؟',
        options: [
          { id:'a', text:'الخزنة السرية كشفت خطته الكاملة لتهريب اللوحة وبيعها + صلاحيته الحصرية على نظام الإنذار المعطّل + أزمته المالية اللي وفّرت الدافع' },
          { id:'b', text:'لأنه صاحب المعرض وأمّن على اللوحة وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بتعطيل الإنذار نفسه' },
          { id:'c', text:'لأنه كان هادئ جدًا وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotsayed',
        label:'ليه الحارس سيد كان بريء رغم إنه الشخص الوحيد الموجود وقت السرقة؟',
        options: [
          { id:'a', text:'كاميرا مدخل المعرض أثبتت إنه ماخرجش من موقعه المعتاد طول الليلة، ومفيش أي صلاحية له على نظام الإنذار المعطّل أصلًا' },
          { id:'b', text:'لأنه حارس بسيط ومالوش دافع مالي واضح، وده افتراض عام عن الدافع مش نتيجة تحقيق فعلي في تحركاته' },
          { id:'c', text:'لأنه تعاون في الاستجواب بصراحة، وده سلوك متعاون بس مش إثبات مباشر على براءته الكاملة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'اللوحة اللي سرقها صاحبها',
      paragraphs:[
        'فتحي، تحت ضغط أزمة مالية حقيقية في معرضه، استغل صلاحيته الحصرية على نظام الإنذار عشان يعطّله لمدة ساعة ويهرّب اللوحة بنفسه، بهدف بيعها سريًا لمشتري خاص والحصول على مبلغ التأمين الكامل من شركة التأمين في نفس الوقت.',
        'اللي قفل الدائرة كان الخزنة السرية اللي كشفت خطته الكاملة، وصلاحيته الحصرية على نظام الإنذار المعطّل، وأزمته المالية اللي وفّرت الدافع الحقيقي البعيد عن أي "سرقة خارجية" ظاهرة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية فتحي، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي رواية "السرقة الخارجية".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: اعتراف الخزنة، صلاحية الإنذار الحصرية، والأزمة المالية، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل يدير معرضه وكأن حاجة ماحصلتش. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "المعرض المسروق"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant art gallery interior at night
   with an empty frame on the wall where a painting used to hang,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of an art gallery closing for the night,
   staff locking up, painting displayed on wall, photorealistic, no
   text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a security guard walking through a dark
   art gallery with a flashlight, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of gallery staff shocked looking at an empty
   picture frame on a wall, photorealistic, no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a woman reviewing security system logs on
   a computer screen in an office, photorealistic, no text, no
   watermark"

   الشخصيات:

   سيد الحارس (sayed-guard.jpg):
   "Photorealistic portrait of a middle-aged Egyptian security
   guard in uniform, composed expression, photorealistic, no text,
   no watermark"

   فتحي (fathi.jpg):
   "Photorealistic portrait of a sophisticated older Egyptian art
   gallery owner, elegant attire, composed expression, photorealistic,
   no text, no watermark"

   نادين (nadine.jpg):
   "Photorealistic portrait of a professional young Egyptian woman
   in gallery attire, thoughtful expression, photorealistic, no
   text, no watermark"

   أدلة:
   evidence-alarm-log.jpg: "Photorealistic close-up of a security
   alarm system control panel screen showing a log with a
   highlighted gap, photorealistic, no text, no watermark"
   evidence-safe.jpg: "Photorealistic close-up of an open wall safe
   with documents inside, photorealistic, no text, no watermark"
   ============================================================ */
