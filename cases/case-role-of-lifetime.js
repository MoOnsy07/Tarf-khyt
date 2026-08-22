/* ============================================================
   بيانات قضية: دور العمر
   قضية محاولة قتل — ممثل بياخد بطولة مسلسل عن شخصية حقيقية
   "متوفية"، ويكتشف إنها حية فعلًا وبتدير كل حاجة من الخفاء.
   كاتبة المسلسل بتبعتله رسائل مشفرة جوه تعديلات السيناريو.
   ============================================================ */

const IMG_BASE_ROLE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/role-of-lifetime/';

const CASE_ROLE_OF_LIFETIME = {
  id: 'role-of-lifetime',
  title: 'دور العمر',
  caseNo: 'CASE 028',
  subtitle: 'استوديو تصوير مسلسل تاريخي، مدينة الإنتاج الإعلامي',
  coverImg: IMG_BASE_ROLE + 'cover.webp',
  difficulty: 'صعبة جدًا',
  estMinutes: 40,
  investigationPoints: 22,
  teaser: 'ممثل باخد بطولة مسلسل عن شخصية حقيقية "متوفية"، ويكتشف إنها حية فعلاً وبتدير كل حاجة من الخفاء. رسائل مشفرة جوه السيناريو بتهدده بمحاولة قتل حقيقية.',

  isPremium: false,
  categories: ['thriller', 'drama'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_ROLE + 'cover.webp',
    heroCaption: 'CASE 028 — بعد أول أسبوع تصوير',
    text1: 'الممثل الكبير "أنور رشدي" ياخد بطولة مسلسل عن حياة شخصية عامة حقيقية اسمها "الدكتور راغب"، اللي المفروض إنه اتوفى من سنين. بعد أول أسبوع تصوير بس، أنور بيستلم فيديوهات مجهولة المصدر بتثبت إن الدكتور راغب لسه حي فعليًا، عكس اللي الناس كلها فاكراه. بعدها بأيام، أنور بيتعرض لمحاولة أذية في لوكيشن التصوير نفسه.',
    text2: 'المخرج مش عارف يصدق ولا يكذب، وطلب منك تحقق بسرعة وسرية تامة. الغريب إن كاتب المسلسل بدأ يعمل تعديلات صغيرة جدًا وغريبة في كل نسخة من السيناريو — تعديلات محدش واخد باله منها غير إنك لاحظت نمط مريب فيها.',
    meta: [
      { label:'الضحية المحتملة', value:'أنور رشدي — بطل المسلسل' },
      { label:'الغموض الأول', value:'فيديوهات تثبت إن الشخصية "المتوفاة" حية' },
      { label:'الحادثة', value:'محاولة أذية في لوكيشن التصوير' },
      { label:'طلب التحقيق', value:'مخرج المسلسل' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — بداية التصوير',
      img: IMG_BASE_ROLE + 'role-scene1.jpg',
      text:'أنور بيبدأ تصوير أول مشاهده كبطل المسلسل، حماس كبير من كل الطاقم، ده أهم دور في مسيرته المهنية بالكامل.'
    },
    {
      scene:'المشهد ٢ — الفيديوهات الغامضة',
      img: IMG_BASE_ROLE + 'role-scene2.jpg',
      text:'أنور بيستلم فيديوهات مجهولة على بريده الإلكتروني، بتوضح شخص يشبه الدكتور راغب "المتوفى" وهو حي وبيتحرك بحرية في مكان مجهول.'
    },
    {
      scene:'المشهد ٣ — المحاولة',
      img: IMG_BASE_ROLE + 'role-scene3.jpg',
      text:'أثناء تصوير مشهد خطر في اللوكيشن، معدة كان المفروض تكون مؤمّنة بالكامل بتفشل فجأة وتعرّض أنور لخطر حقيقي، ينجو بالصدفة بس.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_ROLE + 'role-scene4.jpg',
      text:'المخرج بيديك وصول لكل نسخ السيناريو المتتالية، وبتلاحظ نمط غريب: أول كلمة من كل مشهد معدل بتفرق شوية عن باقي الجمل من حولها.'
    },
  ],

  suspects: [
    {
      id:'writer_dalia', name:'داليا', role:'كاتبة السيناريو', img: IMG_BASE_ROLE + 'dalia.jpg', avatarEmoji:'✍️',
      accusable:false,
      alibi:'مش متهمة، هي اللي كانت بتحاول توصل رسالة تحذير من غير ما المنتج يكتشف.',
      questions:[
        { q:'ليه بتعملي تعديلات صغيرة غريبة في السيناريو؟', unlockId:'writer_admits_cipher',
          a:'"كنت خايفة أوضح كلامي بشكل مباشر، فحاولت أوصل رسالة مشفرة لأنور من خلال أول كلمة في كل مشهد معدل، عشان محدش يشك في الموضوع."' },
        { q:'إيه اللي عرفتيه بالظبط عن الدكتور راغب؟', unlockId:'writer_knows_truth',
          a:'"لقيت مستندات وصور حديثة خلتني أصدق إنه ممكن يكون لسه حي. ماعرفتش هويته الحالية، بس فهمت إن حد قريب من التصوير بيراقب كل خطوة."' },
      ],
      confrontations:{
        writer_admits_cipher:'أيوه، كنت بحاول أوصل تحذير لأنور من غير ما حد يلاحظ.',
        writer_knows_truth:'أنا عرفت إن الدكتور راغب لسه حي، وحاولت أحذر بيه بس محدش صدقني.',
        decoded_message:'الرسالة دي كانت تحذير حقيقي مني لأنور، مقصدتش أي أذى.'
      }
    },
    {
      id:'producer_hesham', name:'المنتج هشام', role:'المنتج المنفذ للمسلسل', img: IMG_BASE_ROLE + 'hesham.jpg', avatarEmoji:'💼',
      alibi:'قال إن هدفه الوحيد إنجاح المسلسل، ومالوش أي مصلحة في أذية بطله.',
      loseMsg:'المنتج هشام مصلحته المباشرة في نجاح أنور واستمرار التصوير بسلام، ومفيش أي دليل يربطه بالفيديوهات المجهولة أو بمحاولة الأذية في اللوكيشن.',
      questions:[
        { q:'كنت عارف إن الدكتور راغب لسه حي؟',
          a:'"لأ خالص، كل المصادر الرسمية بتأكد وفاته من سنين، ده كان جزء من بحثنا قبل بداية المشروع."' },
        { q:'حد ضغط عليك توقف المشروع؟', unlockId:'production_pressure',
          a:'"سمعت تهديدات غامضة من جهة مجهولة تطلب مننا نوقف التصوير، بس ماخدتهاش بجدية كافية وقتها."' },
      ],
      confrontations:{
        writer_admits_cipher:'داليا حاولت تحذرني، بس أنا ماكنتش فاهم قصدها وقتها.',
        production_pressure:'التهديدات دي جتني من جهة مجهولة، وأنا اتضغطت أوقف المشروع.'
      }
    },
    {
      id:'son_yehia', name:'يحيى', role:'الابن الرسمي للدكتور راغب "المتوفى"', img: IMG_BASE_ROLE + 'yehia.jpg', avatarEmoji:'😰',
      alibi:'قال إنه هو نفسه مصدوم من فكرة إن أبوه ممكن يكون حي.',
      loseMsg:'يحيى نفسه ضحية خداع طويل من والده، وصدمته حقيقية تمامًا. مفيش أي دليل يربطه بمحاولة الأذية أو بمعرفته المسبقة بحقيقة الموضوع.',
      questions:[
        { q:'إحساسك إيه لما شفت فيديوهات تقول إن أبوك حي؟',
          a:'"اتصدمت جدًا، عشت حياتي كلها معتقد إنه اتوفى، لو ده صحيح فده معناه إنه خدعنا كلنا لسنين طويلة."' },
        { q:'وافقت على المشروع من الأول ليه؟',
          a:'"حبيت أخلد ذكراه بطريقة محترمة، مكنتش أعرف إن في حاجة مخفية بالشكل ده."' },
      ]
    },
    {
      id:'journalist_kareem', name:'الصحفي كريم', role:'صحفي بيغطي كواليس المسلسل', img: IMG_BASE_ROLE + 'kareem.jpg', avatarEmoji:'📰',
      alibi:'قال إنه بس بيعمل شغله الصحفي العادي، بيقابل الطاقم ويكتب تقارير كواليس.',
      questions:[
        { q:'إزاي وصلت لمعلومات عن الدكتور راغب محدش يعرفها؟', unlockId:'kareem_deep_knowledge',
          a:'(بيتردد) "مصادر صحفية قديمة، بحثت كتير في الموضوع ده، ده جزء من شغلي المهني."' },
        { q:'كنت في اللوكيشن وقت فشل المعدة اللي عرّضت أنور للخطر؟', unlockId:'kareem_present_incident',
          a:'"كنت هناك أغطي كواليس التصوير، زي أي يوم تصوير عادي."' },
        { q:'معرفتك التفصيلية بحياة الدكتور راغب الشخصية غريبة جدًا لصحفي عادي — عندك تفسير؟', requires:['kareem_deep_knowledge','writer_knows_truth'],
          a:'(بيصمت لحظة) "أنا... قريب جدًا من الموضوع أكتر مما تتخيل."' },
        { q:'رسالة داليا حذرت من كريم بالاسم، وبيانات الفيديوهات بترجع لجهازك، وكاميرا الكواليس لقطتك عند معدة الأمان قبل ما تتعطل — تفسر ده إزاي؟', requires:['decoded_message','video_metadata_link','rig_tamper_footage'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "أنا راغب. عشت سنين باسم كريم بعد ما زورت وفاتي. لما المسلسل قرب من حاجات كنت مخبيها، بعثت الفيديوهات الأول عشان أخوفهم يوقفوا. ولما ماوقفوش، عبثت بمعدة الأمان عشان يتعطل التصوير. ماكانش قصدي أنور يموت، بس أنا اللي عرّضته للخطر."' },
      ],
      confrontations:{
        writer_knows_truth:'أنا معرفش حاجة عن الدكتور راغب أكتر من أي صحفي تاني.',
        kareem_deep_knowledge:'معرفتي بحياة الدكتور راغب جت من بحث صحفي طويل، ده شغلي.',
        kareem_present_incident:'كنت موجود في اللوكيشن عشان تغطية صحفية عادية، مش أكتر.',
        decoded_message:'الرسالة دي بتاعة داليا وأنور، أنا مالوش دخل فيها.',
        video_metadata_link:'ممكن جهازي استخدمه حد تاني من غير علمي، ده بيحصل كتير.',
        rig_tamper_footage:'كنت واقف قريب من المعدة بس عشان أصوّر، مش عشان أعطلها.'
      }
    },
  ],

  evidence: [
    { id:'mystery_videos', tag:'من الفيديوهات المجهولة', crit:true, title:'فيديوهات تثبت إن الدكتور راغب حي', img: IMG_BASE_ROLE + 'role-video.jpg', unlocksCipher:true,
      short:'شخص يشبه الدكتور راغب ظاهر حي وبيتحرك بحرية',
      full:'الفيديوهات المجهولة بتوضح شخص يشبه الدكتور راغب "المتوفى" بشكل مقنع جدًا، حي وبيتحرك بحرية في مكان مجهول.',
      unlocked:true, order:1 },

    { id:'writer_admits_cipher', tag:'من استجواب داليا', crit:false, title:'اعتراف داليا بالرسالة المشفرة', img:null,
      short:'كانت بتحاول توصل تحذير من غير ما المنتج يكتشف',
      full:'داليا اعترفت إنها كانت بتحاول توصل رسالة تحذير لأنور من خلال أول كلمة في كل مشهد معدل في السيناريو.',
      unlocked:false, order:2 },

    { id:'writer_knows_truth', tag:'من استجواب داليا', crit:true, title:'معرفة داليا بحقيقة الدكتور راغب', img:null,
      short:'عرفت إنه لسه حي وبيراقب المشروع من بعيد',
      full:'داليا أكدت معرفتها إن الدكتور راغب لسه حي وبيراقب المشروع كله من بعيد تحت هوية تانية.',
      unlocked:false, order:3 },

    { id:'production_pressure', tag:'من استجواب المنتج هشام', crit:false, title:'تهديدات غامضة لإيقاف التصوير', img:null,
      short:'جهة مجهولة طلبت إيقاف المشروع',
      full:'المنتج هشام أكد استلامه تهديدات غامضة من جهة مجهولة تطلب إيقاف التصوير، من غير أي تفاصيل واضحة عن مصدرها.',
      unlocked:false, order:4 },

    { id:'kareem_deep_knowledge', tag:'من استجواب الصحفي كريم', crit:true, title:'معرفة كريم التفصيلية الغريبة', img:null,
      short:'معرفة عميقة جدًا بحياة الدكتور راغب الشخصية لصحفي عادي',
      full:'كريم أظهر معرفة تفصيلية غريبة جدًا بحياة الدكتور راغب الشخصية، أعمق بكتير من أي بحث صحفي عادي.',
      unlocked:false, order:5 },

    { id:'kareem_present_incident', tag:'من استجواب الصحفي كريم', crit:true, title:'وجود كريم وقت حادثة اللوكيشن', img:null,
      short:'كان موجود في اللوكيشن وقت فشل المعدة',
      full:'كريم أكد وجوده في اللوكيشن كصحفي وقت حادثة فشل المعدة اللي عرّضت أنور للخطر.',
      unlocked:false, order:6 },

    { id:'decoded_message', tag:'من فك الشفرة', crit:true, title:'الرسالة المفكوكة من تعديلات السيناريو', img: IMG_BASE_ROLE + 'role-decoded.jpg',
      short:'رسالة تحذير مباشرة من داليا لأنور',
      full:'بعد فك شفرة أول كلمة من كل مشهد معدل، ظهرت رسالة تحذير واضحة من داليا لأنور عن خطر حقيقي محيط بيه.',
      unlocked:false, order:7 },

    { id:'writing_style_match', tag:'من تحليل أسلوب الكتابة', crit:true, title:'تطابق أسلوب كريم مع كتابات الدكتور راغب القديمة', img: IMG_BASE_ROLE + 'role-writing.jpg',
      short:'تشابه شبه كامل في أسلوب اللغة والتعبير',
      full:'تحليل أسلوب كتابة كريم بيكشف تشابه قوي جدًا مع كتابات راغب القديمة في تراكيب لغوية نادرة ومتكررة. ده دليل مساعد على الهوية، لكنه مش كفاية لوحده من غير بقية الأدلة الرقمية والشخصية.',
      unlocked:false, order:8 },

    { id:'video_metadata_link', tag:'من تحليل مصدر الفيديوهات', crit:true, title:'مصدر الفيديوهات مرتبط بجهاز كريم', img:null,
      short:'نسخ الفيديو اتجهزت واترفعت من جهاز بنفس بصمة جهاز كريم الصحفي',
      full:'تحليل بيانات النسخ وسجل منصة الرفع بيربط تجهيز الفيديوهات بجهاز له نفس بصمة النظام والمتصفح المسجلة لجهاز كريم وقت رفع تقاريره الصحفية. ده يربطه بمصدر الفيديوهات المجهولة.',
      unlocked:false, order:9 },

    { id:'rig_tamper_footage', tag:'من كاميرا الكواليس', crit:true, title:'كريم عند معدة الأمان قبل العطل', img:null,
      short:'كاميرا خلفية بتظهر كريم وحده عند المعدة قبل فشلها بدقايق',
      full:'كاميرا خدمة جانبية بتظهر كريم واقف عند نقطة تثبيت معدة الأمان قبل المشهد بدقايق، وبعدها فحص الفريق لقى جزء التثبيت متفك عمدًا. مفيش سبب صحفي يخليه يلمس المعدة.',
      unlocked:false, order:10 },

  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },

  cipherPuzzle: {
    enabled: true,
    tabLabel: 'فك الشفرة',
    introText: 'دي 4 مقتطفات من نسخ متتالية للسيناريو، كل واحد فيهم اتعدّل بشكل بسيط. اختار الكلمة الأولى الحقيقية اللي اتحطت في كل تعديل (مش الكلمة الأصلية القديمة) عشان تفك الرسالة المخفية.',
    fragments: [
      {
        id:'f1',
        context:'المشهد 3، نسخة معدّلة: "[___] خطوة قبل ما تدخل المكان لوحدك..."',
        options: [
          {id:'o1a', text:'كان'},
          {id:'o1b', text:'خد'},
          {id:'o1c', text:'ربما'},
        ],
        correctOptionId:'o1b',
      },
      {
        id:'f2',
        context:'المشهد 7، نسخة معدّلة: "[___] لأن حد من الكواليس بيراقب تحركاتك..."',
        options: [
          {id:'o2a', text:'كريم'},
          {id:'o2b', text:'شايف'},
          {id:'o2c', text:'بالك'},
        ],
        correctOptionId:'o2c',
      },
      {
        id:'f3',
        context:'المشهد 11، نسخة معدّلة: "[___] الشخص اللي بيسأل أسئلة زيادة عن الماضي..."',
        options: [
          {id:'o3a', text:'من'},
          {id:'o3b', text:'وقف'},
          {id:'o3c', text:'اتفرج'},
        ],
        correctOptionId:'o3a',
      },
      {
        id:'f4',
        context:'المشهد 15، نسخة معدّلة: "[___] موجود تقريبًا في كل يوم تصوير..."',
        options: [
          {id:'o4a', text:'كريم'},
          {id:'o4b', text:'اقرأ'},
          {id:'o4c', text:'انسى'},
        ],
        correctOptionId:'o4a',
      },
    ],
    decodedMessage: 'خد بالك من كريم',
    resultText: 'فكيت الشفرة: «خد بالك من كريم». داليا ماكانتش عارفة هويته الحقيقية، لكنها لاحظت إنه الشخص المشترك بين التهديدات وأسئلة الكواليس وحاولت تحذر أنور من غير ما تلفت انتباهه.',
    resultEvidenceIds: ['decoded_message'],
  },

  evidenceCombinations: [
    { parts:['kareem_deep_knowledge','decoded_message'], resultId:'video_metadata_link' },
    { parts:['kareem_present_incident','video_metadata_link'], resultId:'rig_tamper_footage' },
  ],

  correctSuspectId: 'journalist_kareem',
  conclusiveEvidenceIds: ['decoded_message', 'video_metadata_link', 'rig_tamper_footage', 'writing_style_match'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن الصحفي كريم هو الدكتور راغب نفسه؟',
        options: [
          { id:'a', text:'رسالة داليا حذرت من كريم + مصدر الفيديوهات رجع لجهازه + تشابه أسلوب كتابته مع راغب + كاميرا الكواليس ربطته بمحاولة التعطيل' },
          { id:'b', text:'لأنه صحفي وده مريب تلقائيًا' },
          { id:'c', text:'لأنه كان موجود في اللوكيشن' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت الحقيقة الكاملة عن "وفاة" الدكتور راغب؟',
        options: [
          { id:'a', text:'راغب زوّر وفاته وعاش بهوية كريم، ولما المسلسل قرب من تفاصيل كان مخبيها حاول يوقف التصوير، ثم عبث بمعدة الأمان وعرّض أنور للخطر' },
          { id:'b', text:'الدكتور راغب مات فعلًا، والصحفي بس شبهه' },
          { id:'c', text:'ابنه يحيى هو اللي دبّر كل حاجة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الشخصية "المتوفاة" كانت بتدير كل حاجة',
      paragraphs:[
        'راغب كان عايش من سنين تحت هوية كريم. بدأ بإرسال الفيديوهات والتهديدات عشان يوقف المشروع، ولما التصوير استمر عبث بمعدة الأمان في اللوكيشن وعرّض أنور لخطر حقيقي.',
        'اللي ربط كريم بالقصة كان مصدر الفيديوهات، ورسالة داليا المشفرة «خد بالك من كريم»، وتشابه أسلوب الكتابة. أما محاولة الأذية نفسها فاتقفلت بكاميرا الكواليس وفحص معدة الأمان. التصوير اتوقف لحين مراجعة السلامة، وبدأ تحقيق رسمي في هوية راغب ومسؤوليته عن تعريض أنور للخطر.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كريم، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: معرفته التفصيلية، الرسالة المفكوكة، وتطابق أسلوب الكتابة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والحقيقة الكاملة عن "وفاة" الدكتور راغب فضلت مخفية، وأنور فضل في خطر حقيقي. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "دور العمر"

   الغلاف (cover.webp):
   "Photorealistic shot of a film script on a desk with subtle
   handwritten annotations, a laptop showing a video paused mid-frame,
   dramatic desk lamp lighting, documentary photography style, no
   text, no watermark, photorealistic"

   المشهد ١ (role-scene1.jpg):
   "Photorealistic shot of a period drama film set with historical
   costumes and set decoration, crew working around cameras, warm
   lighting, photorealistic, no text, no watermark"

   المشهد ٢ (role-scene2.jpg):
   "Photorealistic close-up of a laptop screen showing an email with
   an unknown video attachment, dim room lighting, photorealistic, no
   text, no watermark"

   المشهد ٣ (role-scene3.jpg):
   "Photorealistic dramatic shot of a film set stunt rig malfunction
   moment, crew rushing in concern, dramatic lighting, photorealistic,
   no text, no watermark"

   المشهد ٤ (role-scene4.jpg):
   "Photorealistic shot of a film production office with printed
   script pages spread on a table, focused lighting, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   داليا (dalia.jpg):
   "Photorealistic portrait of a professional young Egyptian female
   screenwriter, smart casual clothing, holding a laptop, focused
   thoughtful expression, standing on a TV drama set, film set
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   المنتج هشام (hesham.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male TV
   executive producer, business casual attire, confident
   authoritative expression, standing on a TV drama set, film set
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   يحيى (yehia.jpg):
   "Photorealistic portrait of a young Egyptian man, formal mourning
   attire, distressed grieving expression, standing near a film set,
   film set lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   الصحفي كريم (kareem.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   journalist, casual smart clothing, glasses, holding a notebook,
   inquisitive sharp expression, standing on a film set, film set
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   دليل الفيديو (role-video.jpg):
   "Photorealistic still frame from a grainy unknown video showing a
   distant figure of an older man in an unfamiliar location, mysterious
   atmosphere, no text, no watermark, photorealistic"

   دليل الرسالة المفكوكة (role-decoded.jpg):
   "Photorealistic close-up of a script page with certain words subtly
   circled in pencil, desk lamp lighting, no text, no watermark,
   photorealistic"

   دليل تحليل الكتابة (role-writing.jpg):
   "Photorealistic close-up of two printed text documents side by side
   with highlighted matching phrases, forensic analysis style, no
   text, no watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_ROLE_OF_LIFETIME;
  const k = c.suspects.find(s => s.id === 'journalist_kareem');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت وقت طويل) "أنا أعرف تفاصيل عن راغب أكتر مما قلت، والفيديوهات مرتبطة بجهازي فعلًا. لكن هوية راغب ومحاولة تعطيل التصوير حاجتين مختلفتين، ولازم تثبتوا إن أنا اللي عبثت بالمعدة."';
    }
  }
  if (c.cipherPuzzle) {
    c.cipherPuzzle.resultText = 'الرسالة المشفرة تكشف إن داليا كانت بتحاول تحذر أنور من شخص قريب من ملف راغب. الرسالة توجه التحقيق، لكنها مش اعتراف ولا دليل قتل.';
  }
  c.conclusiveEvidenceIds = ['decoded_message','video_metadata_link','rig_tamper_footage','writing_style_match'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_ROLE_OF_LIFETIME;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='compare_writing_style')) c.investigationActions.push({
    id:'compare_writing_style', kind:'تحليل نصي', label:'قارن أسلوب الكتابة بالملفات القديمة',
    description:'بعد فك الرسالة وجمع نماذج كافية، قارن الصياغة بأسلوب الدكتور راغب القديم.',
    requires:['decoded_message','kareem_deep_knowledge'], resultEvidenceIds:['writing_style_match'],
    successText:'المقارنة النصية طلعت بنتيجة قابلة للإضافة كدليل.'
  });
})();
