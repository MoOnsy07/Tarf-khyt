/* ============================================================
   بيانات قضية: آخر مكالمة
   قضية قتل — راجل أعمال بيتلاقى ميت في عربيته، وآخر مكالمة عنده
   مركّبة من تسجيلات قديمة بصوت بنته. هو نفسه جهزها كجزء من خطة
   ابتزاز ضدها، والقاتل الحقيقي استغلها بعد كده.
   ============================================================ */

const IMG_BASE_LASTCALL = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-call/';

const CASE_LAST_CALL = {
  id: 'last-call',
  title: 'آخر مكالمة',
  caseNo: 'CASE 029',
  subtitle: 'موقف سيارات خاص، القاهرة الجديدة',
  coverImg: IMG_BASE_LASTCALL + 'cover.webp',
  difficulty: 'صعبة جدًا',
  estMinutes: 40,
  investigationPoints: 22,
  teaser: 'رجل أعمال بيتلاقى ميت في عربيته، وآخر مكالمة عنده صوت بنته اللي مركّبة من تسجيلات قديمة. هو نفسه جهزها كخطة ابتزاز، لكن حد تاني استغلها عشان يقتله.',

  isPremium: false,
  categories: ['murder', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTCALL + 'cover.webp',
    heroCaption: 'CASE 029 — آخر مكالمة، 14 دقيقة',
    text1: 'راجل أعمال، "فؤاد"، بيتلاقى ميت في عربيته في موقف سيارات خاص. على موبايله ظاهر إدخال في تطبيق تسجيل المكالمات مدته 14 دقيقة باسم بنته "منة"، اللي بينهم مشاكل عائلية من سنين، ومعاه ملف صوتي بصوتها. منة بتقسم إنها ماكلمتوش الليلة دي، فالدليل الظاهري بيحطها في موقف صعب جدًا.',
    text2: 'لكن محامي منة لاحظ حاجة غريبة جدًا في الملف الصوتي: صوت أذان بيتكرر بنفس النغمة بالظبط، وكلاكس عربية بنفس الصوت في جزئين مختلفين من المكالمة. طلب منك تحقق بعناية فائقة، عشان تفهم هل التسجيل ده حقيقي فعلًا ولا مركّب من قطع مختلفة.',
    meta: [
      { label:'المجني عليه', value:'فؤاد — رجل أعمال' },
      { label:'المتهمة الأولى', value:'منة — ابنته، خلافات عائلية قديمة' },
      { label:'الدليل المريب', value:'تكرار أصوات خلفية في أجزاء مختلفة من المكالمة' },
      { label:'طلب التحقيق', value:'محامي منة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — ليلة عادية',
      img: IMG_BASE_LASTCALL + 'lastcall-scene1.jpg',
      text:'فؤاد بيركب عربيته بعد اجتماع عمل متأخر، بيتصل بحد على تليفونه وهو ماشي في موقف السيارات الخاص شبه الفاضي.'
    },
    {
      scene:'المشهد ٢ — المكالمة',
      img: IMG_BASE_LASTCALL + 'lastcall-scene2.jpg',
      text:'ملف صوتي مدته 14 دقيقة ظاهر جوه تطبيق تسجيل المكالمات باسم منة، وفيه نقاش عائلي بصوتها وصوت فؤاد كأنه حصل الليلة دي.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_LASTCALL + 'lastcall-scene3.jpg',
      text:'حارس الموقف بيلاقي فؤاد ميت في عربيته الصبح. الموبايل موجود جنبه، وتطبيق تسجيل المكالمات مفتوح على ملف باسم منة.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_LASTCALL + 'lastcall-scene4.jpg',
      text:'محامي منة بيديك نسخة من الملف، وسجل الهاتف، وبيطلب بيانات شركة الاتصالات عشان تقارن بينهم قبل ما الاستنتاج الظاهري يتحول لاتهام.'
    },
  ],

  suspects: [
    {
      id:'mennat_daughter', name:'منة', role:'ابنة فؤاد، بينهم خلافات قديمة', img: IMG_BASE_LASTCALL + 'mennat.jpg', avatarEmoji:'😨',
      alibi:'قالت إنها ماكلمتوش الليلة دي، وكانت في بيتها. بيانات شركة الاتصالات على خطها ما فيهاش مكالمة مع فؤاد في التوقيت المزعوم.',
      questions:[
        { q:'إزاي بتفسري وجود ملف بصوتك ظاهر كتسجيل مكالمة عند أبوك؟', unlockId:'daughter_confusion',
          a:'"معنديش تفسير، أنا متأكدة إني ماكلمتوش أبويا الليلة دي، الصوت ده يمكن يبقى صوتي بس مش من مكالمة حقيقية حصلت فعلًا."' },
        { q:'إيه طبيعة الخلاف بينك وبين أبوك؟', unlockId:'family_dispute',
          a:'"خلاف قديم على ميراث أمي، مستمر من سنين، وكل محاولة تصالح بتفشل من ساعتها."' },
      ],
      confrontations:{
        call_log_official:'الملف ده... مش صوتي، ده مركّب من كلام قديم، أنا متأكدة.',
        daughter_confusion:'معنديش تفسير للتسجيل ده، أنا ماكلمتش بابا الليلة دي خالص.',
        family_dispute:'الخلاف ده قديم بيننا، بس ده ملوش علاقة بموته.',
        seif_knew_family:'بابا كان بيهددني بتسجيلات قديمة، وسيف كان عارف بالخطة دي.',
        recordings_archive:'بابا كان محتفظ بتسجيلات قديمة ليا، حاجة كانت بتضايقني أوي.',
        fuad_prepared_it:'بابا نفسه جهّز الأرشيف ده، مش أنا ولا حد تاني.'
      }
    },
    {
      id:'lawyer_tamer', name:'المحامي تامر', role:'محامي منة، طلب التحقيق', img: IMG_BASE_LASTCALL + 'tamer.jpg', avatarEmoji:'⚖️',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاك مش مقتنع بالتسجيل زي ما هو؟',
          a:'"صوت الأذان بيتكرر بنفس النغمة بالظبط في جزئين مختلفين، وده تقريبًا مستحيل يحصل في مكالمة حقيقية واحدة."' },
        { q:'راجعت تفاصيل تانية في التسجيل؟', unlockId:'car_horn_repeat',
          a:'"أيوه، كلاكس عربية بنفس الصوت بالظبط بيتكرر برضه في جزئين مختلفين، ده دليل قوي على إن التسجيل مركّب."' },
      ],
      confrontations:{
        car_horn_repeat:'الكلاكس ده... يمكن يبقى صدفة، عربيات كتير بيبقى صوتها متشابه.'
      }
    },
    {
      id:'business_partner_seif', name:'سيف', role:'شريك فؤاد في الأعمال', img: IMG_BASE_LASTCALL + 'seif.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في بيته طول الليلة، بعيد تمامًا عن الموقف.',
      questions:[
        { q:'إيه علاقتك بفؤاد التجارية؟', unlockId:'partnership_conflict',
          a:'"شركاء من سنين، بس كان في خلاف مالي كبير مؤخرًا على تقييم حصة كل واحد فينا في الشركة."' },
        { q:'كنت عارف بخلاف فؤاد مع بنته؟', unlockId:'seif_knew_family',
          a:'"أيوه، فؤاد كان بيحكيلي عن الموضوع كتير، حتى قال لي مرة إنه فكر يستخدم تسجيلات قديمة لبنته عشان يضغط عليها في موضوع الميراث."' },
        { q:'قلت إنك كنت في البيت، لكن سجل بوابة الجراج بيحط عربيتك جوه وقت الوفاة — تفسر ده إزاي؟', requires:['parking_entry_log','forensic_report'], closesInterrogation:true,
          a:'(بيسكت لحظة) "عديت عليه فعلًا عشان نكمل كلام الشراكة... بس لما مشيت كان لسه عايش. معرفش إيه اللي حصل بعدي."' },
      ],
      confrontations:{
        forensic_report:'التوقيت ده صحيح، أنا كنت هناك فعلاً، بس مش زي ما إنتوا فاكرين.',
        parking_entry_log:'دخلت الجراج فعلاً، بس كنت باخد حاجة من العربية بس.',
        partnership_conflict:'الخلاف على الحصص كان موجود، بس مكنش وصل لحد إننا نتخانق.',
        seif_knew_family:'فؤاد قالي عن خطته مع منة، بس أنا ماكنتش موافق عليها أصلاً.'
      }
    },
    {
      id:'assistant_rasha', name:'رشا', role:'سكرتيرة فؤاد الشخصية', img: IMG_BASE_LASTCALL + 'rasha.jpg', avatarEmoji:'📁',
      alibi:'قالت إنها بس بتنظم مواعيده، ومالهاش أي علاقة بحياته الشخصية.',
      questions:[
        { q:'كنتِ عارفة بموضوع التسجيلات القديمة لمنة؟', unlockId:'recordings_archive',
          a:'"أيوه، فؤاد كان محتفظ بأرشيف قديم من تسجيلات مكالمات مع بنته من سنين، كان بيقول إنه بيحتفظ بيها للذكرى بس."' },
        { q:'ليه تحتفظي بمعلومة زي دي من غير ما تقوليها؟',
          a:'"ماحسيتش إنها مهمة وقتها، دي حياته الشخصية، مش شغلي أتدخل فيها."' },
      ],
      confrontations:{
        parking_entry_log:'أنا شفت عربية سيف بس، ماكنتش متابعة كل تفاصيل توقيتها.',
        recordings_archive:'فؤاد كان محتفظ بأرشيف قديم فعلاً، أنا كنت عارفة بوجوده بس.'
      }
    },
  ],

  evidence: [
    { id:'forensic_report', tag:'من تقرير الطب الشرعي', crit:true, title:'توقيت وسبب الوفاة', img:null,
      short:'الوفاة حصلت داخل العربية حوالي 11:25 بعد إصابة قوية بالرأس',
      full:'التقرير يحدد الوفاة تقريبًا بين 11:20 و11:30 مساءً، نتيجة إصابة قوية بالرأس أثناء وجود فؤاد داخل العربية. مفيش ما يشير إن الوفاة حصلت أثناء مكالمة هاتفية حقيقية.',
      unlocked:true, order:0 },

    { id:'parking_entry_log', tag:'من سجل بوابة الجراج', crit:true, title:'عربية سيف دخلت الجراج وقت الوفاة', img:null,
      short:'عربية سيف دخلت 11:12 وخرجت 11:34 رغم قوله إنه كان في البيت',
      full:'نظام بوابة الجراج سجل لوحة عربية سيف داخلة الساعة 11:12 وخارجة 11:34، وهي نفس الفترة اللي حددها الطب الشرعي للوفاة. ده يكسر أليبيه ويحطه في مكان الجريمة.',
      unlocked:false, order:10 },

    { id:'call_log_official', tag:'من سجل الهاتف', crit:true, title:'سجل المكالمة الظاهر على هاتف فؤاد', img: IMG_BASE_LASTCALL + 'lastcall-log.jpg', unlocksAudio:true,
      short:'ملف 14 دقيقة ظاهر باسم منة داخل تطبيق تسجيل المكالمات',
      full:'تطبيق تسجيل المكالمات على موبايل فؤاد بيعرض ملف مدته 14 دقيقة باسم منة، لكن ده سجل محلي على الهاتف، مش إثبات من شركة الاتصالات إن مكالمة حصلت فعلًا.',
      unlocked:true, order:1 },

    { id:'daughter_confusion', tag:'من استجواب منة', crit:false, title:'حيرة منة من التسجيل', img:null,
      short:'ماعندهاش تفسير لوجود صوتها في مكالمة تقول إنها ماحصلتش',
      full:'منة أكدت إنها ما اتصلتش بوالدها في الليلة دي. مراجعة بيانات خطها من شركة الاتصالات ما أظهرتش أي مكالمة بينها وبين فؤاد في التوقيت المزعوم، وده بيخلّي سجل الهاتف نفسه محل شك.',
      unlocked:false, order:2 },

    { id:'family_dispute', tag:'من استجواب منة', crit:false, title:'خلاف الميراث القديم', img:null,
      short:'خلاف مستمر من سنين على ميراث الأم',
      full:'منة أكدت خلاف قديم ومستمر مع والدها على ميراث والدتها، من غير أي محاولة تصالح ناجحة.',
      unlocked:false, order:3 },

    { id:'car_horn_repeat', tag:'من استجواب المحامي تامر', crit:false, title:'ملاحظة تكرار الكلاكس', img:null,
      short:'صوت كلاكس مطابق بيتكرر في جزئين مختلفين',
      full:'المحامي تامر لاحظ صوت كلاكس عربية مطابق تمامًا بيتكرر في جزئين مختلفين من التسجيل، علامة على تركيب غير طبيعي.',
      unlocked:false, order:4 },

    { id:'partnership_conflict', tag:'من استجواب سيف', crit:true, title:'خلاف مالي بين سيف وفؤاد', img:null,
      short:'خلاف كبير على تقييم حصص الشركة',
      full:'سيف اعترف بخلاف مالي كبير مع فؤاد على تقييم حصص الشركة، خلاف كان لسه مفتوح ومحدش حسمه.',
      unlocked:false, order:5 },

    { id:'seif_knew_family', tag:'من استجواب سيف', crit:true, title:'معرفة سيف بخطة فؤاد للتسجيلات', img:null,
      short:'فؤاد أخبره بنيته يستخدم تسجيلات قديمة لبنته للضغط عليها',
      full:'سيف اعترف إن فؤاد أخبره بخطته يستخدم تسجيلات قديمة لبنته منة كأداة ضغط في خلاف الميراث.',
      unlocked:false, order:6 },

    { id:'recordings_archive', tag:'من استجواب رشا', crit:true, title:'أرشيف فؤاد من التسجيلات القديمة', img: IMG_BASE_LASTCALL + 'lastcall-archive.jpg',
      short:'فؤاد كان محتفظ بأرشيف مكالمات قديمة مع منة',
      full:'رشا أكدت إن فؤاد كان محتفظ بأرشيف طويل من تسجيلات مكالماته القديمة مع منة، كان بيحتفظ بيها من غير سبب واضح لسنين.',
      unlocked:false, order:7 },

    { id:'audio_composite_proof', tag:'من التحليل الصوتي', crit:true, title:'إثبات تركيب التسجيل من مقاطع مختلفة', img: IMG_BASE_LASTCALL + 'lastcall-wave.jpg',
      short:'مقطع أذان وكلاكس مطابقين حرفيًا في توقيتين مختلفين',
      full:'التحليل الصوتي بيثبت إن أصوات خلفية بعينها متكررة حرفيًا في مواضع مختلفة، مع فواصل تحرير بين الجمل. الملف متجمع من تسجيلات أقدم، ومش مكالمة واحدة حصلت في الليلة دي.',
      unlocked:false, order:8 },

    { id:'fuad_prepared_it', tag:'من تحليل إضافي', crit:true, title:'فؤاد نفسه جهّز التسجيل المركّب', img:null,
      short:'التسجيل اتجمع من أرشيف فؤاد الشخصي قبل موته',
      full:'تواريخ الملفات على لابتوب فؤاد ورسالة مسودة عنده بتوضح إنه هو اللي بدأ يجمع التسجيل من أرشيفه القديم قبل موته بأيام عشان يستخدمه كورقة ضغط على منة في خلاف الميراث. الملف كان جاهز قبل الجريمة.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  audioPuzzle: {
    enabled: true,
    tabLabel: 'تحليل صوتي',
    introText: 'حلل الملف الصوتي ودوّر على أصوات خلفية بتتكرر بشكل مطابق في مواضع مختلفة. لو لقيتها، ده معناه إن الملف اتجمع من تسجيلات أقدم.',
    duplicateSourceRange: [20, 40],
    duplicateTargetRange: [95, 115],
    matchStart: 95,
    matchEnd: 115,
    resultText: 'وصلت للمقطع الصح. التكرار مطابق بشكل ما يحصلش طبيعي في مكالمة واحدة، ومع فواصل التحرير بقى واضح إن الملف مركب من تسجيلات قديمة.',
    resultEvidenceIds: ['audio_composite_proof'],
  },

  evidenceCombinations: [
    { parts:['recordings_archive','audio_composite_proof'], resultId:'fuad_prepared_it' },
    { parts:['partnership_conflict','seif_knew_family'], resultId:'parking_entry_log' },
  ],

  correctSuspectId: 'business_partner_seif',
  conclusiveEvidenceIds: ['partnership_conflict', 'seif_knew_family', 'fuad_prepared_it', 'forensic_report', 'parking_entry_log'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن سيف هو الفاعل؟',
        options: [
          { id:'a', text:'خلافه المالي + دخوله الجراج في توقيت الوفاة رغم إنكاره + معرفته بالتسجيل الجاهز اللي فؤاد كان مجهزه' },
          { id:'b', text:'لأنه شريك في الأعمال وده كافي' },
          { id:'c', text:'لأنه بدا هادئ جدًا أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت الحقيقة الكاملة عن التسجيل الغريب؟',
        options: [
          { id:'a', text:'فؤاد نفسه جهّز التسجيل المركّب من أرشيفه الشخصي كأداة ضغط على منة في خلاف الميراث، لكن سيف، اللي كان عارف بالخطة، استغل التسجيل الجاهز بعد الجريمة عشان يوجه التحقيق ناحيتها' },
          { id:'b', text:'منة نفسها فبركت التسجيل عشان تغطي على نفسها' },
          { id:'c', text:'التسجيل كان حقيقي 100% ومفيش أي تلاعب فيه' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة كانت في التكرار الصوتي',
      paragraphs:[
        'فؤاد نفسه كان مجهز الملف المركب من تسجيلات قديمة لمنة عشان يضغط عليها في خلاف الميراث. سيف كان عارف بوجود الملف، وفي ليلة الجريمة دخل الجراج في التوقيت اللي حدده الطب الشرعي رغم إنه قال إنه في البيت. بعد وفاة فؤاد، استغل الملف الجاهز وتركه ظاهر على الهاتف كأنه آخر مكالمة مع منة.',
        'التحليل الصوتي برّأ منة من فكرة المكالمة الحقيقية، لكن اللي ربط سيف بالجريمة نفسها كان سجل دخول الجراج وتوقيت الوفاة، مع دافعه ومعرفته السابقة بالملف. كده اتفصل دليل التزييف عن دليل القتل بدل ما مجرد معرفة سيف بالخطة تتحول لوحدها لإثبات ضده.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية سيف، ومنة في طريقها للتبريءة، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: خلافه المالي، معرفته بخطة فؤاد، والتحليل الصوتي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ومنة فضلت تحت اتهام مالوش أساس، بينما الفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "آخر مكالمة"

   الغلاف (cover.webp):
   "Photorealistic shot of a luxury car parked alone in a dim
   underground parking garage at night, phone screen glowing faintly
   through the window, moody atmosphere, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (lastcall-scene1.jpg):
   "Photorealistic shot of a middle-aged Egyptian businessman walking
   through a nearly empty parking garage at night, phone to his ear,
   dim overhead lighting, photorealistic, no text, no watermark"

   المشهد ٢ (lastcall-scene2.jpg):
   "Photorealistic close-up of a man sitting in a car at night, phone
   held to ear, tense expression, dashboard glow lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (lastcall-scene3.jpg):
   "Photorealistic shot of a parking garage security guard discovering
   a parked car in the early morning light, concerned expression,
   photorealistic, no text, no watermark"

   المشهد ٤ (lastcall-scene4.jpg):
   "Photorealistic shot of a lawyer's office desk with a laptop
   showing an audio waveform and printed phone records, professional
   lighting, photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   منة (mennat.jpg):
   "Photorealistic portrait of a young Egyptian woman, formal
   business attire, distressed grieving expression, sitting in a
   modern office, soft indoor lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   المحامي تامر (tamer.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male lawyer,
   formal suit, composed professional expression, sitting in an
   office with documents, soft indoor lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سيف (seif.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male business
   partner, formal attire, guarded calculating expression, standing
   in a private office, soft indoor lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   رشا (rasha.jpg):
   "Photorealistic portrait of a professional Egyptian female
   secretary, formal office attire, headscarf, composed watchful
   expression, sitting at a reception desk, soft indoor lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل سجل المكالمة (lastcall-log.jpg):
   "Photorealistic close-up of a phone company call log printout on a
   desk, office lighting, no text, no watermark, photorealistic"

   دليل الأرشيف (lastcall-archive.jpg):
   "Photorealistic close-up of an old smartphone with a folder of
   saved audio recordings visible on screen, soft lighting, no text,
   no watermark, photorealistic"

   دليل الموجة الصوتية (lastcall-wave.jpg):
   "Photorealistic close-up of an audio waveform editing interface on
   a computer screen showing two highlighted matching segments, dark
   mode UI, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LAST_CALL;
  c.evidenceCombinations = [
    { parts:['recordings_archive','audio_composite_proof'], resultId:'fuad_prepared_it' }
  ];
  const r = c.suspects.find(s => s.id === 'assistant_rasha');
  if (r) {
    const q = r.questions.find(q => !q.unlockId && !q.requires);
    if (q) {
      q.q = 'ممكن نراجع سجل بوابة الجراج في توقيت الوفاة؟';
      q.unlockId = 'parking_entry_log';
      q.a = '"أيوه، الإدارة عندها سجل آلي للبوابة. هطلعهولكم، لأنه أدق من ذاكرة أي شاهد."';
    }
  }
  c.conclusiveEvidenceIds = ['partnership_conflict','fuad_prepared_it','forensic_report','parking_entry_log'];
  c.conclusiveRequired = 4;
})();
