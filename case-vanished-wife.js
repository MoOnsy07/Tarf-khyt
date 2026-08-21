/* ============================================================
   بيانات قضية: اختفاء منى
   قضية +18 — زوجة اختفت فجأة من بيتها، والتحقيق بيكشف خلفية
   سيطرة وتحكم داخل الزواج. مفيش أي مشاهد عنف مباشرة، التركيز
   على الوصول للحقيقة والتأكد من أمان منى.
   ============================================================ */

const IMG_BASE_VANISHED = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/vanished-wife/';

const CASE_VANISHED_WIFE = {
  id: 'vanished-wife',
  title: 'اختفاء منى',
  caseNo: 'CASE 015',
  subtitle: 'حي سكني هادئ، الإسكندرية',
  coverImg: IMG_BASE_VANISHED + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 38,
  investigationPoints: 21,
  teaser: 'زوجة اختفت فجأة من بيتها من غير أي أثر واضح. التحقيق بيكشف خلفية سيطرة وتحكم كانت مخبية ورا واجهة زواج طبيعي، وأمانها على المحك.',

  isPremium: false,
  categories: ['disappearance', 'social'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتعامل مع موضوع اختفاء زوجة وسط خلفية سيطرة وتحكم داخل العلاقة الزوجية، من غير أي مشاهد عنف مباشرة أو تفاصيل صريحة. التركيز بالكامل على التحقيق والوصول للحقيقة والتأكد من أمان الشخص المختفي. لو الموضوع حساس بالنسبالك دلوقتي، تقدر تسيب القضية دي وترجع لها وقت تاني.',

  briefing: {
    heroImg: IMG_BASE_VANISHED + 'cover.webp',
    heroCaption: 'CASE 015 — صبح يوم عادي، بيت فاضي',
    text1: '"منى"، متجوزة من ثلاث سنين، اختفت فجأة من بيتها من غير أي إنذار. زوجها "شريف" بلّغ الشرطة وهو في حالة قلق ظاهري شديد، وقال إنها خرجت الصبح للسوق وماعادتش. عيلتها هي نفسها مش عارفة حاجة، وآخر ما سمعوه منها كان اطمئنان عادي بالتليفون.',
    text2: 'أخت منى، "دينا"، حسّت إن في حاجة مش متسقة في كلام شريف من أول لحظة، ومش قادرة تحدد إيه بالظبط. طلبت منك تحقق بهدوء وسرعة، عشان تتأكد إن أختها بخير، وتفهم الحقيقة الكاملة وراء اختفائها المفاجئ.',
    meta: [
      { label:'المختفية', value:'منى — 29 سنة، متجوزة من 3 سنين' },
      { label:'آخر ظهور', value:'صبح يوم الاختفاء، حسب كلام الزوج' },
      { label:'المُبلّغ', value:'شريف — الزوج' },
      { label:'طلب التحقيق', value:'دينا، أخت منى' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — صبح عادي',
      img: IMG_BASE_VANISHED + 'vanished-scene1.jpg',
      text:'شقة سكنية هادئة، منى بتودع شريف الصبح وهو رايح شغله، حسب كلامه، وبتقوله هتنزل السوق بعدها بشوية.'
    },
    {
      scene:'المشهد ٢ — القلق يبدأ',
      img: IMG_BASE_VANISHED + 'vanished-scene2.jpg',
      text:'الضهر، دينا بتتصل بمنى زي كل يوم، محدش بيرد. بعد ساعات، شريف بيتصل بدينا نفسها يسألها لو شافت منى، وصوته قلقان بشكل واضح.'
    },
    {
      scene:'المشهد ٣ — البلاغ',
      img: IMG_BASE_VANISHED + 'vanished-scene3.jpg',
      text:'شريف بيبلغ الشرطة رسميًا، ودينا بتوصل البيت تلاقي حاجات منى الشخصية كلها موجودة، حتى شنطتها الكبيرة وموبايلها الرئيسي اللي كانت بتاخده معاها عادةً.'
    },
    {
      scene:'المشهد ٤ — التحقيق يبدأ',
      img: IMG_BASE_VANISHED + 'vanished-scene4.jpg',
      text:'دينا بتديك موبايل منى القديم اللي لقته في درج مقفول. الموبايل الرئيسي نفسه موجود في البيت، ودي أول تفصيلة مش راكبة مع كلام شريف إنه اختفى معاها.'
    },
  ],

  suspects: [
    {
      id:'sherif_husband', name:'شريف', role:'زوج منى', img: IMG_BASE_VANISHED + 'sherif.jpg', avatarEmoji:'😟',
      alibi:'قال إنه كان في شغله طول اليوم وماعندوش أي فكرة عن سبب اختفائها.',
      questions:[
        { q:'إزاي كانت علاقتك بمنى في الفترة الأخيرة؟', unlockId:'control_pattern',
          a:'"طبيعية زي أي زواج، ممكن يكون في اختلافات بسيطة أحيانًا، بس مفيش حاجة غريبة أو خطيرة."' },
        { q:'كانت منى بتخرج البيت بحرية زي أي حد؟', unlockId:'restricted_movement',
          a:'"أنا بس بحب أطمن عليها، بحبها كتير وخايف عليها، مش تحكم، ده اهتمام طبيعي من راجل بيحب مراته."' },
        { q:'موبايلها الرئيسي فين دلوقتي؟', requires:['old_phone'],
          a:'"مش عارف، آخر حاجة كنت فاهمها إن موبايلها كان معاها لما خرجت، وده اللي خلاني أقلق."' },
        { q:'قلت إن موبايلها الرئيسي خرج معاها، لكنه اتلاقى في البيت، والموبايل القديم فيه رسائل بتقول إنها كانت بتخطط تبعد عنك — ليه كلامك عن يوم اختفائها مش دقيق؟', requires:['main_phone_found','travel_plan_messages'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "كنت خايف إنها تكون سابتني فعلًا. لما لقيت الموبايل في البيت ما قلتش لحد، لأني خفت الناس تفسر ده إنها خرجت بإرادتها. كنت بحاول أتحكم في تحركاتها قبل كده عشان ما توصلش لقرار زي ده."' },
      ]
    },
    {
      id:'dina_sister', name:'دينا', role:'أخت منى، طلبت التحقيق', img: IMG_BASE_VANISHED + 'dina.jpg', avatarEmoji:'💙',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاكي حاسة إن في حاجة غلط في كلام شريف؟',
          a:'"صوته وقت ما اتصل بيا كان فيه حاجة غريبة، مش قلق طبيعي، حسيته أقرب لخوف من حاجة تانية خالص."' },
        { q:'منى كانت بتتصرف مختلف الفترة الأخيرة؟', unlockId:'behavior_change',
          a:'"أيوه، كانت بتتجنب الخروج معايا لوحدنا، وكانت دايمًا بتقول إن شريف بيتصل عليها كل شوية يسأل هي فين."' },
      ]
    },
    {
      id:'amm_saber', name:'عم صابر', role:'بواب العمارة', img: IMG_BASE_VANISHED + 'saber.jpg', avatarEmoji:'🚪',
      alibi:'قال إنه شاف منى نازلة الصبح لوحدها، عادي زي كل يوم.',
      loseMsg:'عم صابر بس شاف منى نازلة الصبح زي كل يوم عادي، ومفيش أي دليل يربطه بالموضوع من قريب أو بعيد.',
      questions:[
        { q:'شفت منى تنزل امتى بالظبط؟', unlockId:'lobby_time',
          a:'"شفتها نازلة الساعة تسعة الصبح تقريبًا، لوحدها، وماشية عادي زي كل يوم، معاها شنطة صغيرة."' },
        { q:'لاحظت حاجة غريبة في تصرفاتها؟',
          a:'"ولا حاجة، بس كانت ماشية بخطوات سريعة شوية، حسيتها مستعجلة أكتر من العادي."' },
      ]
    },
    {
      id:'yara_friend', name:'يارا', role:'صديقة مقربة لمنى', img: IMG_BASE_VANISHED + 'yara.jpg', avatarEmoji:'🤝',
      alibi:'قالت إنها آخر مرة كلمت منى كانت من كذا يوم، ومحدش يعرف مكانها.',
      questions:[
        { q:'منى كلمتك في حاجة مؤخرًا؟', unlockId:'shelter_hint',
          a:'"كلمتني من أسبوعين تقريبًا، وسألتني إذا كنت أعرف حد يقدر يساعدها تبدأ من جديد بعيد عن الموضوع كله، من غير ما توضح أكتر."' },
        { q:'كانت خايفة من حاجة معينة؟',
          a:'"حسيت إنها خايفة من شريف نفسه، بس ماقالتليش تفاصيل، كانت حذرة جدًا وهي بتتكلم."' },
      ]
    },
  ],

  evidence: [
    { id:'old_phone', tag:'من درج مقفول', crit:true, title:'موبايل منى القديم', img: IMG_BASE_VANISHED + 'vanished-phone.jpg', unlocksCodeLock:true,
      short:'موبايل قديم مقفول برقم سري، ممكن يكون فيه إجابات',
      full:'موبايل قديم لمنى، لقته دينا مخبأ في درج مقفول في غرفة النوم، مقفول برقم سري من 4 أرقام.',
      unlocked:true, order:1 },

    { id:'control_pattern', tag:'من استجواب شريف', crit:false, title:'وصف شريف للعلاقة', img:null,
      short:'وصفها بأنها "طبيعية"، بس بتردد ملحوظ',
      full:'شريف وصف العلاقة بأنها طبيعية، لكن كلامه عن المتابعة المستمرة لتحركات منى وشهادة دينا ويارا بيرسموا نمط تحكم أوضح من الوصف اللي قدمه.',
      unlocked:false, order:2 },

    { id:'restricted_movement', tag:'من استجواب شريف', crit:true, title:'تبرير شريف لمراقبة تحركاتها', img:null,
      short:'وصف مراقبته المستمرة بأنها "اهتمام" مش تحكم',
      full:'شريف برر مراقبته المستمرة لتحركات منى بأنها "اهتمام واطمئنان"، رغم إن نمط الأسئلة والتوقيت بيوحي بتحكم أعمق من مجرد قلق عادي.',
      unlocked:false, order:3 },

    { id:'behavior_change', tag:'من استجواب دينا', crit:true, title:'تغيّر ملحوظ في تصرفات منى', img:null,
      short:'منى بدأت تتجنب الخروج لوحدها وتتحدث عن مراقبة مستمرة',
      full:'دينا أكدت تغيّر ملحوظ في تصرفات منى آخر فترة، خصوصًا تجنبها الخروج بحرية وحديثها المتكرر عن مراقبة شريف المستمرة لها.',
      unlocked:false, order:4 },

    { id:'lobby_time', tag:'من شهادة عم صابر', crit:false, title:'توقيت خروج منى الصبح', img:null,
      short:'خرجت الساعة 9 صباحًا لوحدها، بخطوات سريعة',
      full:'عم صابر أكد خروج منى الساعة 9 صباحًا لوحدها، بخطوات سريعة عن المعتاد، ومعاها شنطة صغيرة.',
      unlocked:false, order:5 },

    { id:'shelter_hint', tag:'من استجواب يارا', crit:true, title:'طلب منى مساعدة "تبدأ من جديد"', img:null,
      short:'منى سألت يارا عن جهة ممكن تساعدها تبعد عن الموضوع كله',
      full:'يارا أكدت إن منى اتصلت بيها من أسبوعين تسأل عن جهة تقدر تساعدها "تبدأ من جديد"، من غير ما توضح تفاصيل، بس بصوت خايف وحذر.',
      unlocked:false, order:6 },

    { id:'travel_plan_messages', tag:'من موبايل منى القديم', crit:true, title:'رسائل تخطيط للرحيل', img: IMG_BASE_VANISHED + 'vanished-messages.jpg',
      short:'رسائل بتوضح إن منى كانت بتخطط تسيب البيت بأمان من أسابيع',
      full:'الموبايل القديم بعد فك تشفيره كشف رسائل بين منى وجهة دعم متخصصة، بتوضح إنها كانت بتخطط بهدوء من أسابيع عشان تسيب البيت بأمان، بمساعدة يارا ودينا لاحقًا.',
      unlocked:false, order:7 },

    { id:'main_phone_found', tag:'من تفتيش البيت', crit:true, title:'موبايل منى الرئيسي كان في البيت', img:null,
      short:'الموبايل اللي شريف قال إنه خرج معاها اتلاقى في الدولاب داخل البيت',
      full:'موبايل منى الرئيسي اتلاقى داخل الدولاب. شريف كان قال في البداية إنه فاهم إن الموبايل خرج معاها، لكنه اعترف لاحقًا إنه شافه في البيت وما ذكرش المعلومة.',
      unlocked:false, order:8 },

    { id:'safe_confirmation', tag:'من جهة الدعم', crit:true, title:'تأكيد إن منى آمنة', img:null,
      short:'بموافقة منى، جهة الدعم أكدت لدينا إنها آمنة من غير كشف مكانها',
      full:'بعد التحقق من رسائل الخطة، جهة الدعم وافقت — بموافقة منى — تبعت تأكيدًا مختصرًا لدينا إن منى وصلت لمكان آمن وإنها لا تريد مشاركة موقعها حاليًا.',
      unlocked:false, order:9 },

  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن كلام شريف عن موبايل منى باللي اتلاقى فعلًا في البيت.',
    resultText: 'شريف قال إنه كان فاهم إن الموبايل الرئيسي خرج مع منى، لكن الموبايل اتلاقى جوه البيت، وهو اعترف إنه شافه وما ذكرش المعلومة. ده ما يثبتش إنه خطفها، لكنه يثبت إنه أخفى تفصيلة مهمة عن اختفائها.',
    resultEvidenceIds: ['main_phone_found'],
    statements: [
      { id:'st1', text:'"كنت فاهم إن موبايلها كان معاها لما خرجت."', source:'شريف — في الاستجواب' },
      { id:'st2', text:'موبايل منى الرئيسي اتلاقى داخل البيت، وشريف اعترف إنه كان عارف بوجوده.', source:'دليل: تفتيش البيت' },
      { id:'st3', text:'"شفتها نازلة الساعة تسعة الصبح."', source:'عم صابر' },
      { id:'st4', text:'"سألتني عن جهة تساعدها تبدأ من جديد."', source:'يارا' },
    ],
    correctPair: ['st1','st2'],
  },
  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },

  codeLockPuzzle: {
    enabled: true,
    tabLabel: 'فك تشفير الموبايل القديم',
    introText: 'الموبايل مقفول بكود 4 أرقام. دينا فاكرة إن عيد ميلاد أمهم كان 15 مارس. وفي ورقة قديمة جوه جراب الموبايل منى كاتبة قاعدة لنفسها: «في الأكواد بحط الشهر الأول وبعده اليوم». اجمع الخيطين.',
    code: '0315',
    hint: 'الشهر الأول، وبعده اليوم: مارس ثم 15',
    wrongMsg: '✗ الرقم غلط، فكر في التلميح تاني.',
    resultText: 'اتفتح الموبايل. الرسائل بتوضح إن منى كانت بتخطط من أسابيع تخرج لمكان آمن بمساعدة جهة دعم، وإن اختفائها كان خطوة مرتبة مش حادثًا عشوائيًا.',
    resultEvidenceIds: ['travel_plan_messages'],
  },

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث',
    introText: 'رتب أحداث اليوم اللي اختفت فيه منى بالترتيب الصح، عشان توضح الصورة الكاملة لخطتها.',
    events: [
      { id:'e1', text:'منى بتودع شريف الصبح وهو رايح شغله زي كل يوم.' },
      { id:'e2', text:'منى بتنزل من العمارة الساعة 9 صباحًا بخطوات سريعة، معاها شنطة صغيرة.' },
      { id:'e3', text:'منى بتوصل لمكان آمن رتبته مسبقًا مع جهة دعم متخصصة.' },
      { id:'e4', text:'دينا بتحاول تتصل بمنى الضهر، محدش بيرد على الموبايل الرئيسي.' },
      { id:'e5', text:'شريف بيبلغ الشرطة رسميًا في المساء، بصوت قلق ظاهري.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'رتبت الأحداث صح: منى خرجت في موعد مرتب، وصلت لجهة دعم، وبعدها دينا وشريف اكتشفوا غيابها. توقيت البلاغ لوحده مش دليل على جريمة، لكن باقي الأدلة بتوضح سبب خروجها.',
    resultEvidenceIds: ['lobby_time'],
  },

  evidenceCombinations: [
    { parts:['restricted_movement','behavior_change'], resultId:'shelter_hint' },
    { parts:['shelter_hint','travel_plan_messages'], resultId:'safe_confirmation' },
    { parts:['lobby_time','old_phone'], resultId:'main_phone_found' },
  ],

  correctSuspectId: 'sherif_husband',
  conclusiveEvidenceIds: ['main_phone_found', 'restricted_movement', 'travel_plan_messages', 'safe_confirmation'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إيه اللي كشف حقيقة الموقف؟',
        options: [
          { id:'a', text:'نمط التحكم + كذب شريف عن الموبايل + رسائل خطة الخروج + تأكيد جهة الدعم إن منى آمنة' },
          { id:'b', text:'لأن شريف بلّغ الشرطة متأخر شوية' },
          { id:'c', text:'لأن عم صابر شافها نازلة بسرعة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whatactually',
        label:'إيه اللي حصل فعليًا؟',
        options: [
          { id:'a', text:'منى خططت بهدوء وأمان لترك بيت فيه تحكم وسيطرة مستمرة من زوجها، بمساعدة صديقتها وجهة دعم متخصصة' },
          { id:'b', text:'منى اتخطفت من حد غريب' },
          { id:'c', text:'منى نسيت موبايلها وتاهت بالصدفة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'SAFE', badgeLabel:'CASE CLOSED — SHE IS SAFE', title:'منى بخير، والحقيقة اتكشفت',
      paragraphs:[
        'منى ماكانتش مختطفة؛ كانت بتخطط من أسابيع تخرج من العلاقة وتوصل لمكان آمن بمساعدة جهة دعم. التحقيق كشف كمان إن شريف كان بيتابع تحركاتها بشكل متكرر، وإنه أخفى في الأول حقيقة إن موبايلها الرئيسي موجود في البيت لأنه خاف يتفهم خروجها على إنه قرار منها.',
        'بموافقة منى، جهة الدعم أكدت لدينا إنها بخير من غير ما تكشف مكانها. منى فضلت صاحبة القرار في إذا كانت هتتواصل مع مين وإمتى، والعيلة عرفت إن المطلوب احترام أمانها واختياراتها بدل محاولة إجبارها ترجع.'
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE REOPENED — MORE EVIDENCE NEEDED', title:'الشك في مكانه الصح، بس الصورة لسه مش كاملة',
      paragraphs:[
        'التحقيق بيتجه صح ناحية فهم حقيقة الموقف، بس الأدلة اللي جمعتها لسه مش كافية تأكد الصورة الكاملة قدام العيلة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: تبرير شريف للمراقبة، تغيّر تصرفات منى، وطلبها مساعدة يارا، قبل ما تقدّم استنتاجك النهائي.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONG CONCLUSION', title:'القضية اتقفلت بفهم غلط',
      paragraphs:[
        'وصلت لاستنتاج غلط عن {wrongName}، والحقيقة الكاملة عن موقف منى فضلت غير واضحة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "اختفاء منى"

   الغلاف (cover.webp):
   "Photorealistic shot of a quiet modest apartment interior, an
   empty coat rack by the door, soft morning light through curtains,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (vanished-scene1.jpg):
   "Photorealistic shot of an Egyptian couple at their apartment door
   in the morning, one leaving for work, warm morning light,
   photorealistic, no text, no watermark"

   المشهد ٢ (vanished-scene2.jpg):
   "Photorealistic close-up of a woman's hand holding a phone showing
   unanswered call attempts, worried expression blurred in
   background, soft daylight, photorealistic, no text, no watermark"

   المشهد ٣ (vanished-scene3.jpg):
   "Photorealistic shot of a woman standing in an empty bedroom
   looking at a closet, a small bag and personal items visible,
   pensive atmosphere, soft window light, photorealistic, no text,
   no watermark"

   المشهد ٤ (vanished-scene4.jpg):
   "Photorealistic close-up of an old smartphone on a wooden dresser
   inside an open drawer, soft indoor lighting, photorealistic, no
   text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   شريف (sherif.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, collared
   shirt, worried defensive expression, standing in a residential
   apartment, soft natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دينا (dina.jpg):
   "Photorealistic portrait of a young Egyptian woman, modest casual
   clothing, headscarf, concerned protective expression, standing in
   a residential building hallway, soft natural lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   عم صابر (saber.jpg):
   "Photorealistic portrait of an older Egyptian male building
   doorman, simple traditional galabeya, watchful weathered
   expression, standing at a building entrance, soft natural
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   يارا (yara.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual modest
   clothing, headscarf, worried sincere expression, standing in a
   residential neighborhood, soft natural lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل الموبايل (vanished-phone.jpg):
   "Photorealistic close-up of an old smartphone with a lock screen
   PIN pad visible, resting on a wooden surface, soft lighting, no
   text, no watermark, photorealistic"

   دليل الرسائل (vanished-messages.jpg):
   "Photorealistic close-up of a phone messaging app interface with
   generic text bubbles, screen glow in dim room, no text, no
   watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_VANISHED_WIFE;
  c.evidenceCombinations = [];
  const s = c.suspects.find(x => x.id === 'sherif_husband');
  if (s) {
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "أيوه ماقلتش إن الموبايل كان في البيت. كنت خايف تكون سابتني، وخايف الناس تعرف حجم المشاكل بينا. ده يثبت إني أخفيت معلومات، مش إني أذيتها."';
    }
  }
  c.conclusiveEvidenceIds = ['main_phone_found','restricted_movement','travel_plan_messages','safe_confirmation'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_VANISHED_WIFE;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='confirm_safety_privately')) c.investigationActions.push({
    id:'confirm_safety_privately', kind:'تحقق آمن', label:'اطلب تأكيد أمان منى من جهة الدعم',
    description:'بعد ما تثبت خطة الرحيل، اطلب تأكيدًا يحافظ على خصوصيتها من غير كشف مكانها.',
    requires:['travel_plan_messages','shelter_hint'], resultEvidenceIds:['safe_confirmation'],
    successText:'وصل تأكيد مختصر إن منى آمنة من غير كشف موقعها.'
  });
})();
