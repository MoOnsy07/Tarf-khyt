/* ============================================================
   بيانات قضية: ليلة من غير شاهد
   قضية +18 جادة، من غير أي محتوى صريح — شاب متهم باعتداء حصل
   في حفلة خطوبة. لازم تثبت البراءة والجريمة الحقيقية مع بعض،
   مش تلاقي مشتبه بديل بس.
   ============================================================ */

const IMG_BASE_NOWITNESS = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/no-witness-night/';

const CASE_NO_WITNESS_NIGHT = {
  id: 'no-witness-night',
  title: 'ليلة من غير شاهد',
  caseNo: 'CASE 024',
  subtitle: 'قاعة أفراح، مدينة نصر',
  coverImg: IMG_BASE_NOWITNESS + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 38,
  investigationPoints: 21,
  teaser: 'شاب متهم باعتداء حصل في حفلة خطوبة، وشاهدة بتأكد إنها شافته خارج من مكان الحادثة. المشكلة إن قريب العريس بيشبهه بشكل ملحوظ.',

  isPremium: false,
  categories: ['mystery', 'drama'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتعامل مع اتهام باعتداء حصل في حفلة خطوبة، من غير أي وصف صريح للحادثة نفسها. التركيز بالكامل على التحقيق في دقة الأدلة والوصول للفاعل الحقيقي، وعلى إثبات براءة شخص اتهم ظلمًا بسبب خطأ في توقيت كاميرا. لو الموضوع حساس بالنسبالك دلوقتي، تقدر تسيب القضية دي وترجع لها وقت تاني.',

  briefing: {
    heroImg: IMG_BASE_NOWITNESS + 'cover.webp',
    heroCaption: 'CASE 024 — بعد حفلة الخطوبة بساعات',
    text1: 'شاب اسمه "عصام" بيتقبض عليه بعد اتهامه بحادثة اعتداء حصلت في حفلة خطوبة. الشهادة الأساسية ضده جاية من شاهدة قالت إنها شافت شخص افتكرته عصام خارج من ناحية مكان الحادثة، وكاميرا الممر بدت كأنها بتأكد كلامها. المشكلة الوحيدة: ساعة كاميرا المكان اتضح إنها متقدمة 11 دقيقة عن التوقيت الحقيقي.',
    text2: 'محامي عصام مش مقتنع تمامًا بالقصة زي ما هي، وطلب منك تحقق بحذر شديد قبل ما القضية توصل للمحكمة. المهمة صعبة: لازم تثبت إن عصام مش الفاعل، وفي نفس الوقت توصل لمين هو الفاعل الحقيقي — مش بس تلاقي مشتبه بديل من غير دليل قاطع.',
    meta: [
      { label:'المتهم ظلمًا', value:'عصام — حاضر الحفلة' },
      { label:'الحادثة', value:'اعتداء حصل في حفلة خطوبة' },
      { label:'الخلل التقني', value:'ساعة كاميرا المكان متقدمة 11 دقيقة' },
      { label:'طلب التحقيق', value:'محامي عصام' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحفلة',
      img: IMG_BASE_NOWITNESS + 'nowitness-scene1.jpg',
      text:'قاعة أفراح مزدحمة، موسيقى وضحك، عصام موجود بين المدعوين زي أي حد تاني، وفيه شخص تاني في القاعة شبهه بشكل ملحوظ.'
    },
    {
      scene:'المشهد ٢ — الحادثة',
      img: IMG_BASE_NOWITNESS + 'nowitness-scene2.jpg',
      text:'في وقت متأخر من الحفلة، بتحصل حادثة اعتداء في ركن هادئ بعيد عن الأنظار. محدش شاف اللحظة نفسها بوضوح.'
    },
    {
      scene:'المشهد ٣ — الشهادة',
      img: IMG_BASE_NOWITNESS + 'nowitness-scene3.jpg',
      text:'شاهد بيأكد إنه شاف عصام خارج من ناحية مكان الحادثة في نفس التوقيت المسجل على كاميرا المكان.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_NOWITNESS + 'nowitness-scene4.jpg',
      text:'محامي عصام بيديك كل حاجة: تسجيلات الكاميرا، رسائل قبل الحادث، سجلات أوبر، وشهادات ضيوف تانيين.'
    },
  ],

  suspects: [
    {
      id:'essam_accused', name:'عصام', role:'المتهم الأساسي، حاضر الحفلة', img: IMG_BASE_NOWITNESS + 'essam.jpg', avatarEmoji:'😔',
      alibi:'قال إنه كان في القاعة، لكنه خرج قبل الحادثة بشوية وركب أوبر لبيته.',
      questions:[
        { q:'ممكن تحكيلنا اللي حصل من وجهة نظرك؟',
          a:'"كنت في الحفلة زي أي حد، وقبل الحادثة بشوية حسيت إني تعبان وقررت أمشي بدري. ركبت أوبر ورجعت البيت."' },
        { q:'حد يقدر يأكد وقت خروجك من القاعة؟', unlockId:'uber_receipt',
          a:'"أيوه، عندي إيصال أوبر بيوضح وقت الرحلة، ده الدليل الوحيد اللي معايا."' },
        { q:'حد كان شبهك في الحفلة؟',
          a:'"أيوه فعلًا، في واحد من أقارب العريس شبهي بشكل غريب، اتلخبطوا بينا كذا مرة الليلة دي بالذات."' },
      ],
      confrontations:{
        uber_receipt:'الرحلة دي بتثبت إني كنت بعيد عن القاعة، ده اللي حصل بالظبط.',
        jacket_fight:'كانت خناقة بسيطة على الجاكيتات، حاجة عادية مش أكتر.',
        clock_offset_confirmed:'لو الساعة كانت غلط، يبقى التوقيت اللي بيتهموني بيه غلط برضو.',
        jacket_seen_on_cam:'الجاكيت بتاعي فعلاً، بس أنا مابسهوش حد يلبسه غيري.'
      }
    },
    {
      id:'kareem_lookalike', name:'كريم', role:'قريب العريس، بيشبه عصام بشكل ملحوظ', img: IMG_BASE_NOWITNESS + 'kareem.jpg', avatarEmoji:'🕴️',
      alibi:'قال إنه كان في القاعة طول الوقت زي أي مدعو تاني.',
      questions:[
        { q:'إيه اللي حصل بينك وبين عصام الليلة دي؟', unlockId:'jacket_fight',
          a:'"حصل شد كلام وخناقة بسيطة بينا، وجاكيت عصام وقع على كرسي قريب. بعد كده كل واحد راح لحاله."' },
        { q:'كنت قريب من مكان الحادثة وقت حصولها؟',
          a:'"كنت وسط الناس أغلب الوقت، وماقربتش من الركن الهادي اللي حصلت فيه الواقعة."' },
        { q:'في التسجيل الشخص لابس جاكيت عصام، لكن الجزمة والسوار اللي ظاهرين نفس اللي كنت لابسهم في صور الحفلة — تفسر ده إزاي؟', requires:['jacket_fight','jacket_seen_on_cam'],
          a:'(بيتردد) "ممكن أكون لبسته بالغلط بعد الخناقة... المكان كان زحمة ومش فاكر التفاصيل بالظبط."' },
        { q:'إيصال أوبر بيحط عصام بعيد عن القاعة وقت الواقعة، وبعد تصحيح الساعة الكاميرا بتصورك إنت بجاكيته خارج من الممر بعدها مباشرة — لسه هتقول إنك ماقربتش من المكان؟', requires:['uber_receipt','clock_offset_confirmed','jacket_seen_on_cam'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "أيوه... أنا اللي كنت في المكان. بعد اللي حصل خفت، خدت جاكيت عصام من على الكرسي وخرجت بيه عشان اللي يشوفني يفتكرني هو. اللي حصل مسؤوليتي، وعصام مالوش ذنب."' },
      ],
      confrontations:{
        uber_receipt:'الرحلة دي بتاعة عصام، مش بتاعتي أنا.',
        jacket_fight:'الخناقة كانت بسيطة، ولخبطنا الجاكيتات وقتها من غير قصد.',
        clock_offset_confirmed:'أنا معرفش حاجة عن فرق التوقيت ده، أنا بس كنت في الحفلة عادي.',
        jacket_seen_on_cam:'الجزمة والسوار دول ممكن يبقوا شبه حاجتي بس مش بالضرورة أنا.'
      }
    },
    {
      id:'yara_witness', name:'يارا', role:'شاهدة، أكدت رؤية عصام خارج من مكان الحادثة', img: IMG_BASE_NOWITNESS + 'yara.jpg', avatarEmoji:'👀',
      alibi:'قالت إنها متأكدة من اللي شافته، وإنها ما اتلخبطتش في الشخص.',
      loseMsg:'يارا شافت شخص فعليًا خارج من ناحية مكان الحادثة، بس التشابه الكبير بين عصام وكريم واللبس المتبادل للجاكيت خلاها تتلخبط في تحديد الشخص، من غير أي قصد أو دافع منها.',
      questions:[
        { q:'إزاي كنتِ متأكدة إن اللي شفتيه هو عصام بالظبط؟',
          a:'"شفت الجاكيت اللي كان لابسه، وحسيت إنه هو من الشكل العام، الإضاءة ماكانتش قوية أوي بس كنت متأكدة وقتها."' },
        { q:'الساعة اللي شفتي فيها الشخص ده بتتطابق مع كاميرا المكان؟', unlockId:'clock_offset_raw',
          a:'"أنا حددت الوقت من ساعة الكاميرا نفسها اللي كانت شغالة في نفس الممر، مقدرتش أتأكد من دقتها."' },
      ],
      confrontations:{
        clock_offset_raw:'أنا حددت التوقيت من ساعة الكاميرا زي ما شفتها، مكنتش أعرف إنها غلط.'
      }
    },
    {
      id:'lawyer_nour', name:'المحامي نور', role:'محامي عصام، طلب التحقيق', img: IMG_BASE_NOWITNESS + 'nour.jpg', avatarEmoji:'⚖️',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاك مش مقتنع بالقصة زي ما هي؟',
          a:'"التوقيتات مش متطابقة تمامًا، وحسيت إن في تفاصيل ناقصة في القصة، خصوصًا موضوع الساعة."' },
        { q:'راجعت كاميرات المكان بنفسك؟', unlockId:'camera_maintenance_log',
          a:'"أيوه، ولقيت سجل صيانة بيوضح إن ساعة الكاميرا اتظبطت غلط بعد آخر صيانة، بفارق تقريبًا 11 دقيقة."' },
      ],
      confrontations:{
        camera_maintenance_log:'الساعة دي كانت غلط فعلاً، وده اللي خلاني أطلب التحقيق من الأول.'
      }
    },
  ],

  evidence: [
    { id:'uber_receipt', tag:'من إيصال أوبر عصام', crit:true, title:'إيصال رحلة عصام', img: IMG_BASE_NOWITNESS + 'nowitness-receipt.jpg',
      short:'الرحلة بدأت قبل الواقعة، وبيانات المسار بتحط عصام بعيد عن القاعة وقتها',
      full:'إيصال الرحلة وبيانات مسار العربية بيأكدوا إن عصام ركب الساعة 10:31، وقبل التوقيت الحقيقي للواقعة كان بالفعل بعيد عن القاعة بعدة كيلومترات. ده أليبي مستقل عن ساعة كاميرا المكان.',
      unlocked:true, order:1 },

    { id:'camera_maintenance_log', tag:'من سجل صيانة الكاميرات', crit:true, title:'خطأ ضبط ساعة الكاميرا', img: IMG_BASE_NOWITNESS + 'nowitness-cammaint.jpg',
      short:'ساعة كاميرا الممر اتظبطت غلط بفارق 11 دقيقة',
      full:'سجل الصيانة الرسمي بيوضح إن ساعة كاميرا الممر اتظبطت غلط بعد آخر صيانة، بفارق 11 دقيقة تحديدًا عن التوقيت الحقيقي.',
      unlocked:false, order:2 },

    { id:'clock_offset_raw', tag:'من استجواب يارا', crit:false, title:'اعتماد يارا على ساعة الكاميرا', img:null,
      short:'حددت التوقيت من ساعة كاميرا الممر نفسها',
      full:'يارا اعتمدت على ساعة كاميرا الممر لتحديد التوقيت اللي شافت فيه الشخص، من غير أي طريقة تحقق إضافية.',
      unlocked:false, order:3 },

    { id:'jacket_fight', tag:'من استجواب كريم', crit:true, title:'خناقة وتلخبط الجاكيتات', img:null,
      short:'خناقة بسيطة بين عصام وكريم قبل الحادثة، اتلخبطت فيها الجاكيتات',
      full:'كريم اعترف بخناقة بسيطة مع عصام قبل الحادثة، اتلخبطت فيها الجاكيتات بينهم أثناء الشد والجذب.',
      unlocked:false, order:4 },

    { id:'clock_offset_confirmed', tag:'من مقارنة التوقيتات', crit:true, title:'التوقيت الحقيقي بعد تصحيح الفارق', img: IMG_BASE_NOWITNESS + 'nowitness-clock.jpg', unlocksTimeline:true,
      short:'توقيت الكاميرا 10:54 يساوي 10:43 فعليًا بعد تصحيح فرق الـ11 دقيقة',
      full:'سجل الصيانة والمقارنة بساعة نظام مستقلة بيأكدوا إن الكاميرا متقدمة 11 دقيقة. اللقطة المكتوب عليها 10:54 حصلت فعليًا 10:43، بعد الواقعة مباشرة، في وقت كان عصام فيه بالفعل بعيد عن القاعة حسب مسار أوبر.',
      unlocked:false, order:5 },

    { id:'jacket_seen_on_cam', tag:'من تسجيل الكاميرا', crit:true, title:'تفاصيل خارج الجاكيت بتحدد الشخص', img: IMG_BASE_NOWITNESS + 'nowitness-jacket.jpg',
      short:'الجاكيت لعصام، لكن الجزمة والسوار الظاهرين في اللقطة يخصوا كريم',
      full:'الفيديو بيبين الشخص لابس جاكيت عصام فعلًا، وده سبب الالتباس. لكن الجزمة البيضاء والسوار الأسود ظاهرين بوضوح، وصور الحفلة قبل الخناقة بتثبت إن كريم هو اللي كان لابسهم، بينما عصام كان لابس جزمة غامقة ومن غير السوار.',
      unlocked:false, order:6 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن كلام كريم باللقطة بعد ما تصحح توقيتها وتراجع تفاصيل الشخص الظاهرة فيها.',
    resultText: 'التناقض واضح: كريم قال إنه ماقربش من الركن الهادي، لكن بعد تصحيح الساعة اللقطة بتحطه خارج من نفس الممر بعد الواقعة، والجزمة والسوار بيحددوه هو رغم إنه لابس جاكيت عصام.',
    resultEvidenceIds: ['jacket_seen_on_cam'],
    statements: [
      { id:'st1', text:'"ماقربتش من الركن الهادي اللي حصلت فيه الواقعة."', source:'كريم — في الاستجواب' },
      { id:'st2', text:'بعد تصحيح الساعة، اللقطة بتظهر شخصًا خارج من الممر بجاكيت عصام لكن بجزمة وسوار كريم.', source:'دليل: الكاميرا ومقارنة صور الحفلة' },
      { id:'st3', text:'"خرجت قبل الحادثة بشوية وركبت أوبر لبيتي."', source:'عصام — في الاستجواب' },
      { id:'st4', text:'"كان في خناقة بسيطة، اتلخبطت الجاكيتات بينا."', source:'كريم — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث المصحح',
    introText: 'رتب الأحداث بالترتيب الصح، مع الأخذ في الاعتبار إن ساعة الكاميرا متقدمة 11 دقيقة عن التوقيت الحقيقي.',
    events: [
      { id:'e1', text:'عصام وكريم بيتخانقوا خناقة بسيطة وتتلخبط الجاكيتات بينهم.' },
      { id:'e2', text:'عصام بيخرج من القاعة ويركب أوبر لبيته، قبل الحادثة الفعلية.' },
      { id:'e3', text:'حادثة الاعتداء بتحصل في الركن الهادئ من القاعة.' },
      { id:'e4', text:'كريم بيخرج من ناحية مكان الحادثة لابس جاكيت عصام، وكاميرا الممر بتصوره.' },
      { id:'e5', text:'يارا بتشوف التسجيل وتفتكر إن الشخص المصوّر هو عصام.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'رتبت الأحداث صح بعد تصحيح فارق الساعة! الصورة الكاملة واضحة دلوقتي: عصام كان خرج فعلًا قبل الحادثة، وكريم هو اللي ظهر بعدها لابس نفس الجاكيت.',
    resultEvidenceIds: ['clock_offset_confirmed'],
  },

  evidenceCombinations: [
    { parts:['jacket_fight','camera_maintenance_log'], resultId:'clock_offset_confirmed' },
  ],

  correctSuspectId: 'kareem_lookalike',
  conclusiveEvidenceIds: ['uber_receipt', 'camera_maintenance_log', 'clock_offset_confirmed', 'jacket_seen_on_cam'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كريم هو الفاعل الحقيقي؟',
        options: [
          { id:'a', text:'أليبي أوبر أثبت إن عصام بعيد + تصحيح فرق الساعة + الجزمة والسوار في اللقطة حددوا كريم رغم جاكيت عصام' },
          { id:'b', text:'لأنه شبه عصام بس' },
          { id:'c', text:'لأنه تردد أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyessam',
        label:'إزاي اتأكدت من براءة عصام الكاملة؟',
        options: [
          { id:'a', text:'إيصال الأوبر اللي أثبت خروجه قبل الحادثة + إعادة بناء الخط الزمني بعد تصحيح فارق الساعة' },
          { id:'b', text:'لأنه بدا صادق أثناء الاستجواب' },
          { id:'c', text:'لأنه أول من أشار للتشابه بينه وبين كريم' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'عدالة', badgeLabel:'القضية اتقفلت — العدالة انتصرت', title:'البراءة والحقيقة مع بعض',
      paragraphs:[
        'عصام كان خرج من الحفلة قبل الواقعة فعلًا، وبيانات رحلة أوبر بتحطه بعيد عن القاعة وقتها. خطأ ساعة الكاميرا خلّى يارا تربط اللقطة بالتوقيت الغلط، وجاكيت عصام خلّاها تفتكر إن الشخص المصوّر هو عصام.',
        'بعد تصحيح الساعة، الجزمة والسوار الظاهرين في اللقطة طابقوا كريم من صور الحفلة، رغم إنه كان لابس جاكيت عصام. ومع أليبي أوبر، بقت البراءة وهوية الشخص اللي خرج من الممر مبنيين على أدلة مستقلة، مش على الشبه أو شهادة واحدة.'
      ]
    },
    partial: {
      stamp:'معلّقة', badgeLabel:'القضية اتفتحت تاني — محتاجة أدلة أكتر', title:'الشك في مكانه الصح، بس الملف لسه مفتوح',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كريم، وعصام في طريقه للتبريءة، بس الأدلة اللي جمعتها لسه مش كافية تقفل القضية رسميًا قدام المحكمة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: سجل صيانة الكاميرا، اعتراف كريم بالخناقة، وتصحيح التوقيت، قبل ما تقدّم الاتهام النهائي.'
    },
    bad: {
      stamp:'ظلم', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وعصام فضل تحت اتهام مالوش أساس حقيقي، بينما الفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "ليلة من غير شاهد"

   الغلاف (cover.webp):
   "Photorealistic shot of a dim wedding hall hallway at night with a
   security camera mounted on the wall, moody atmosphere, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (nowitness-scene1.jpg):
   "Photorealistic wide shot of a crowded Egyptian engagement party
   in a decorated hall, warm festive lighting, blurred guests dancing,
   photorealistic, no text, no watermark"

   المشهد ٢ (nowitness-scene2.jpg):
   "Photorealistic shot of a quiet dim corner of a wedding hall away
   from the main crowd, empty, moody lighting, photorealistic, no
   text, no watermark"

   المشهد ٣ (nowitness-scene3.jpg):
   "Photorealistic shot of a woman standing in a hallway looking
   thoughtfully toward a security camera on the wall, dim lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (nowitness-scene4.jpg):
   "Photorealistic shot of a lawyer's office desk with case documents
   and a laptop showing security footage, professional lighting,
   photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   عصام (essam.jpg):
   "Photorealistic portrait of a young Egyptian man, formal wedding
   guest attire, worried defensive expression, standing in a wedding
   hall, warm event lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   كريم (kareem.jpg):
   "Photorealistic portrait of a young Egyptian man closely resembling
   another guest, formal wedding attire, nervous evasive expression,
   standing near a wedding hall exit, warm event lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   يارا (yara.jpg):
   "Photorealistic portrait of a young Egyptian woman, elegant
   evening dress, uncertain hesitant expression, standing in a
   wedding hall, warm event lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   المحامي نور (nour.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male lawyer,
   formal suit, composed professional expression, standing in a
   wedding hall corridor, warm event lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل إيصال الأوبر (nowitness-receipt.jpg):
   "Photorealistic close-up of a ride-hailing app receipt screen on a
   smartphone, soft lighting, no text, no watermark, photorealistic"

   دليل سجل الصيانة (nowitness-cammaint.jpg):
   "Photorealistic close-up of a security camera maintenance log
   document on a clipboard, office lighting, no text, no watermark,
   photorealistic"

   دليل الساعة المصححة (nowitness-clock.jpg):
   "Photorealistic close-up of a split-screen comparison of two clock
   readings on a computer monitor, dark mode UI, no text, no
   watermark, photorealistic"

   دليل الجاكيت (nowitness-jacket.jpg):
   "Photorealistic close-up comparison of two similar dark suit
   jackets side by side, subtle button and sleeve differences visible,
   forensic evidence photography style, no text, no watermark,
   photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_NO_WITNESS_NIGHT;
  const k = c.suspects.find(s => s.id === 'kareem_lookalike');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "أنا اللي كنت لابس جاكيت عصام وخرجت من الممر، وده كان تصرف جبان مني لأني خفت من الشبهة. لكن تحديد اللي حصل جوه المكان لازم يعتمد على باقي الأدلة، مش الجاكيت لوحده."';
    }
  }
  c.conclusiveEvidenceIds = ['uber_receipt','camera_maintenance_log','clock_offset_confirmed','jacket_seen_on_cam'];
  c.conclusiveRequired = 4;
})();
