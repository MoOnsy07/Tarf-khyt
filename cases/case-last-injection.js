/* ============================================================
   بيانات قضية: الحقنة الأخيرة
   مريض بيموت في مستشفى خاص بعد حقنة "روتينية"، والجميع مقتنع
   إنه إهمال طبي. لكن التحليل الجيني للحقنة بيفتح باب لحقيقة
   عائلية مؤلمة أعقد بكتير من مجرد خطأ طبي.
   ============================================================ */

const IMG_BASE_LASTINJECTION = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-injection/';

const CASE_LAST_INJECTION = {
  id: 'last-injection',
  title: 'الحقنة الأخيرة',
  caseNo: 'CASE 068',
  subtitle: 'مستشفى خاص، مدينة نصر، القاهرة',
  coverImg: IMG_BASE_LASTINJECTION + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 54,
  investigationPoints: 26,
  teaser: 'مريض مسنّ بيموت بعد حقنة روتينية في مستشفى خاص، والتقرير الأولي بيقول إهمال طبي بسيط. لكن التحليل الجيني للمحلول المتبقي في الحقنة بيكشف مادة مالهاش علاقة بالعلاج المفروض خالص.',

  isPremium: false,
  categories: ['murder', 'family', 'coldcase'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTINJECTION + 'cover.webp',
    heroCaption: 'CASE 068 — حقنة روتينية، نتيجة مش روتينية',
    text1: 'المريض "فتحي عبد الوهاب"، 72 سنة، مات فجأة بعد حقنة مسكّن روتينية في مستشفى خاص، أثناء فترة نقاهة بعد عملية بسيطة. التقرير الأولي حمّل المسؤولية لخطأ في الجرعة من الممرضة المناوبة.',
    text2: 'ابنته "منى" مش مقتنعة، لأن الممرضة معروفة بدقتها الشديدة من سنين. طلبت تحليل مستقل للمحلول المتبقي في الحقنة قبل ما ملف القضية يتقفل رسميًا كخطأ طبي عادي.',
    meta: [
      { label:'الضحية', value:'فتحي عبد الوهاب — 72 سنة، في فترة نقاهة' },
      { label:'السبب المعلن', value:'خطأ في جرعة حقنة مسكّن' },
      { label:'الرواية الرسمية', value:'إهمال طبي من الممرضة المناوبة' },
      { label:'طلب التحقيق', value:'منى، ابنة الضحية' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — النقاهة', img: IMG_BASE_LASTINJECTION + 'scene1.jpg',
      text:'فتحي في غرفته بالمستشفى بعد عملية بسيطة ناجحة، محاط بعائلته اللي بتزوره بالتناوب كل يوم.' },
    { scene:'المشهد ٢ — الحقنة', img: IMG_BASE_LASTINJECTION + 'scene2.jpg',
      text:'الممرضة بتجهز حقنة المسكّن المعتادة زي كل يوم في نفس الميعاد بالظبط.' },
    { scene:'المشهد ٣ — التدهور المفاجئ', img: IMG_BASE_LASTINJECTION + 'scene3.jpg',
      text:'بعد دقايق من الحقنة، حالة فتحي بتتدهور بسرعة غير متوقعة، والفريق الطبي بيحاول ينقذه من غير جدوى.' },
    { scene:'المشهد ٤ — الشك', img: IMG_BASE_LASTINJECTION + 'scene4.jpg',
      text:'منى واقفة قدام غرفة أبوها فاضية، مش مصدقة إن الممرضة اللي تعرفها من سنين ممكن تغلط بالشكل ده.' },
  ],

  suspects: [
    {
      id:'nurse_hoda', name:'هدى', role:'الممرضة المناوبة المتهمة بالإهمال', img: IMG_BASE_LASTINJECTION + 'hoda.jpg', avatarEmoji:'👩‍⚕️',
      alibi:'قالت إنها جهزت الحقنة بنفس البروتوكول المعتاد اللي بتتبعه كل يوم من غير أي تغيير.',
      loseMsg:'هدى فعلًا جهزت الحقنة بالبروتوكول الصحيح تمامًا، وسجل المخزن بيؤكد إنها ماسحبتش أي مادة غير مصرح بيها. التحليل الجيني للمحلول أثبت وجود مادة مختلفة تمامًا اتضافت للحقنة بعد ما هدى سلمتها، مش أثناء تحضيرها. اتهامها هيكون ظلم واضح لشخص التزم بكل الإجراءات.',
      questions:[
        { q:'إنتِ اللي جهزتِ الحقنة، صح؟',
          a:'"أيوه، بنفس البروتوكول اللي بتبعه كل يوم من سنين، مفيش أي تغيير في الجرعة ولا النوع."' },
        { q:'حد ممكن يكون لمس الحقنة بعد ما جهزتيها؟', unlockId:'injection_handoff_gap',
          a:'"سلمتها للممرض المساعد عشان يوصلها للغرفة، وده إجراء عادي بيحصل كل يوم."' },
      ],
      confrontations:{}
    },
    {
      id:'son_tarek', name:'طارق', role:'ابن الضحية الأكبر، مدير أعمال العائلة', img: IMG_BASE_LASTINJECTION + 'tarek.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في زيارة قصيرة لأبوه الصبح، وخرج قبل موعد الحقنة بساعات.',
      questions:[
        { q:'إزاي كانت علاقتك بأبوك في الفترة الأخيرة؟', unlockId:'tarek_financial_motive',
          a:'"كانت متوترة شوية بسبب خلاف على تقسيم أملاك العائلة، بس ده طبيعي في أي عيلة، مفيش حاجة أكبر من كده."' },
        { q:'كنت عارف إن أبوك كان بيفكر يغيّر توزيع الميراث؟', requires:['tarek_financial_motive'],
          a:'"سمعت إشاعات، بس ماكنتش متأكد. لو حصل ده كان هيأثر على وضعي المالي بشكل كبير فعلًا."' },
      ],
      confrontations:{}
    },
    {
      id:'daughter_mona', name:'منى', role:'ابنة الضحية، طلبت التحقيق', img: IMG_BASE_LASTINJECTION + 'mona.jpg', avatarEmoji:'🕊️',
      alibi:'كانت في بيتها بعيد عن المستشفى وقت الحادثة، بحسب شهادة زوجها.',
      questions:[
        { q:'إزاي كانت حالة أبوكِ النفسية في الفترة الأخيرة؟', unlockId:'father_suffering_hint',
          a:'"كان بيعاني ألم مزمن جدًا بعد العملية، وكان بيقول لينا أكتر من مرة إنه تعبان من الألم ومحتاج يرتاح."' },
        { q:'حد من العيلة كان قلقان بشكل مبالغ فيه على أبوكِ؟', requires:['father_suffering_hint'], unlockId:'sibling_visits_pattern',
          a:'"أخويا الصغير كريم كان بيزوره كل يوم تقريبًا في نفس الميعاد، أكتر من أي حد تاني في العيلة."' },
      ],
      confrontations:{}
    },
    {
      id:'brother_karim', name:'كريم', role:'ابن الضحية الأصغر', img: IMG_BASE_LASTINJECTION + 'karim.jpg', avatarEmoji:'😔',
      alibi:'قال إنه كان بيزور أبوه يوميًا زي عادته، وكان موجود في المستشفى وقت الحادثة.',
      questions:[
        { q:'ليه كنت بتزور أبوك بانتظام أكتر من إخواتك؟', unlockId:'karim_close_bond',
          a:'"أنا أقرب واحد لأبويا، وكنت حاسس إنه محتاج حد يقعد معاه، خصوصًا وهو بيعاني كده."' },
        { q:'أبوك كان بيكلمك عن رغبته في إنهاء معاناته؟', requires:['karim_close_bond'], unlockId:'father_wish_hint',
          a:'(بيتردد) "قال لي أكتر من مرة إنه تعبان جدًا ومش عايز يكمل بالشكل ده، بس ده كلام عادي لحد بيتألم، مش طلب فعلي."' },
        { q:'سجل المستشفى بيوضح دخولك لغرفة أبوك قبل الحقنة بدقايق قليلة في يوم الحادثة تحديدًا — تفسر ده إزاي؟', unlockId:'karim_room_entry', requires:['father_wish_hint'], closesInterrogation:true,
          a:'(بيصمت طويل) "دخلت أسلم عليه زي كل يوم. ماكنتش أتخيل إن الحقنة هتتغير."' },
      ],
      confrontations:{
        injection_handoff_gap:'دخولي الغرفة كان زيارة عادية، مالوش علاقة بالحقنة نفسها.',
        father_wish_hint:'كلامه كان تعبير عن الألم بس، مش طلب حقيقي.',
      }
    },
  ],

  evidence: [
    { id:'initial_medical_report', tag:'من التقرير الطبي', crit:false, title:'التقرير الأولي', img:null,
      short:'التقرير الرسمي بيحمّل المسؤولية لخطأ في جرعة الحقنة',
      full:'التقرير الطبي الأولي بيصنف الوفاة كنتيجة خطأ في جرعة حقنة المسكن، محمّلًا المسؤولية للممرضة المناوبة.',
      unlocked:true, order:1 },

    { id:'injection_handoff_gap', tag:'من استجواب هدى', crit:false, title:'تسليم الحقنة قبل الوصول للغرفة', img:null,
      short:'الحقنة اتسلمت لممرض مساعد قبل ما توصل لغرفة المريض',
      full:'هدى أكدت إنها سلمت الحقنة لممرض مساعد عشان يوصلها لغرفة المريض، وده يفتح فترة زمنية ممكن حد فيها يتلاعب بالمحلول.',
      unlocked:false, order:2 },

    { id:'tarek_financial_motive', tag:'من استجواب طارق', crit:false, title:'خلاف على توزيع الميراث', img:null,
      short:'طارق أكد وجود خلاف عائلي على تقسيم الأملاك',
      full:'طارق اعترف بوجود توتر عائلي بخصوص تقسيم أملاك العائلة، وإن أي تغيير في توزيع الميراث كان هيأثر على وضعه المالي.',
      unlocked:false, order:3 },

    { id:'father_suffering_hint', tag:'من استجواب منى', crit:true, title:'معاناة الأب من الألم المزمن', img:null,
      short:'فتحي كان بيعاني ألم مزمن شديد بعد العملية',
      full:'منى كشفت إن أبوها كان بيعاني ألم مزمن شديد بعد العملية، وكان بيعبّر بشكل متكرر عن تعبه الشديد من الألم.',
      unlocked:false, order:4 },

    { id:'sibling_visits_pattern', tag:'من استجواب منى', crit:false, title:'نمط زيارات كريم المتكرر', img:null,
      short:'كريم كان بيزور أبوه يوميًا في نفس الميعاد تقريبًا',
      full:'منى لاحظت إن كريم كان بيزور أبوه يوميًا وبانتظام لافت، أكتر من أي فرد تاني في العائلة.',
      unlocked:false, order:5 },

    { id:'karim_close_bond', tag:'من استجواب كريم', crit:false, title:'علاقة كريم القريبة بأبوه', img:null,
      short:'كريم أكد إنه أقرب أبناء العائلة لأبوه',
      full:'كريم أكد إن علاقته بأبوه كانت قريبة جدًا، وإنه كان بيحس بمسؤولية خاصة تجاه رعايته خلال فترة مرضه.',
      unlocked:false, order:6 },

    { id:'father_wish_hint', tag:'من استجواب كريم', crit:true, title:'رغبة الأب المتكررة في إنهاء المعاناة', img: IMG_BASE_LASTINJECTION + 'evidence-note.jpg',
      short:'فتحي عبّر لكريم أكتر من مرة عن رغبته في إنهاء معاناته',
      full:'كريم كشف إن أبوه عبّر له أكتر من مرة عن رغبته في إنهاء معاناته من الألم المزمن، بشكل تكرر بما يتجاوز مجرد التعبير العابر عن الألم.',
      unlocked:false, order:7 },

    { id:'karim_room_entry', tag:'من سجل المستشفى', crit:true, title:'دخول كريم للغرفة قبل الحقنة مباشرة', img: IMG_BASE_LASTINJECTION + 'evidence-logbook.jpg',
      short:'سجل الدخول يوضح دخول كريم للغرفة قبل الحقنة بدقايق قليلة',
      full:'سجل دخول الزوار للمستشفى بيوضح دخول كريم لغرفة أبوه قبل موعد الحقنة بدقايق قليلة في يوم الحادثة تحديدًا، بما يتيح له فرصة الوصول للحقنة المسلّمة للممرض المساعد.',
      unlocked:false, order:8 },

    { id:'dna_substance_match', tag:'من التحليل الجيني', crit:true, title:'المادة الحقيقية في الحقنة', img: IMG_BASE_LASTINJECTION + 'evidence-lab.jpg',
      short:'التحليل الجيني للمحلول يكشف مادة غير مصرح بيها إضافية',
      full:'التحليل الجيني للمحلول المتبقي في الحقنة كشف وجود مادة إضافية غير مصرح بيها طبيًا، اتضافت للحقنة بعد تحضيرها الأصلي من هدى.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن كلام كريم عن "كلام عادي لحد بيتألم" بتكرار طلب أبوه الموثق. فيه محاولة تقليل واضحة من حجم الاعتراف.',
    resultText: 'التناقض واضح: كريم حاول يقلل من شأن كلام أبوه بوصفه "كلام عادي"، لكنه نفسه أكد إن أبوه كرر الطلب "أكتر من مرة" — وده مش تعبير عابر، ده نمط متكرر واضح.',
    resultEvidenceIds: ['father_wish_hint'],
    statements: [
      { id:'st1', text:'"ده كلام عادي لحد بيتألم، مش طلب فعلي."', source:'كريم — في الاستجواب' },
      { id:'st2', text:'"قال لي أكتر من مرة إنه تعبان جدًا ومش عايز يكمل بالشكل ده."', source:'كريم — في نفس الاستجواب' },
      { id:'st3', text:'"كان بيعاني ألم مزمن شديد بعد العملية."', source:'منى — في الاستجواب' },
      { id:'st4', text:'"سلمتها لممرض مساعد عشان يوصلها للغرفة."', source:'هدى — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  dnaLabPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الحقنة الجيني',
    introText: 'قارن التركيب الجيني للمادة اللي لقيتها في المحلول المتبقي بالحقنة، بعينات مرجعية من الأدوية المتاحة في المستشفى، عشان تحدد مصدر المادة الحقيقي.',
    resultText: 'التحليل بيوضح إن المادة الموجودة في الحقنة مش من مخزون الأدوية الرسمي للمستشفى خالص — مصدرها دواء يوصف عادة لحالات الألم المزمن الشديد، ومتاح بوصفة طبية عادية برا المستشفى.',
    sampleSequence: ['M', 'O', 'R', 'X', 'C', 'L'],
    suspectSequences: {
      nurse_hoda:    ['S', 'A', 'L', 'X', 'C', 'L'],
      son_tarek:     ['M', 'O', 'R', 'B', 'A', 'N'],
      daughter_mona: ['S', 'A', 'L', 'B', 'A', 'N'],
      brother_karim: ['M', 'O', 'R', 'X', 'C', 'L'],
    },
    correctSuspectId: 'brother_karim',
    resultEvidenceIds: ['dna_substance_match'],
  },

  evidenceCombinations: [
    { parts:['father_wish_hint','karim_room_entry'], resultId:'dna_substance_match' },
  ],

  investigationActions: [
    {
      id:'check_pharmacy_records', kind:'مراجعة صيدلية', label:'راجع سجلات صرف الأدوية خارج المستشفى',
      description:'دوّر على أي وصفة طبية باسم كريم لدواء يتطابق مع المادة المكتشفة في التحليل.',
      requires:['father_wish_hint','karim_room_entry'], resultEvidenceIds:['dna_substance_match'],
      successText:'سجلات الصيدلية أكدت وجود وصفة طبية باسم كريم لنفس نوع الدواء المكتشف في التحليل.'
    },
  ],

  correctSuspectId: 'brother_karim',
  conclusiveEvidenceIds: ['father_wish_hint', 'karim_room_entry', 'dna_substance_match', 'sibling_visits_pattern'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كريم هو اللي غيّر الحقنة؟',
        options: [
          { id:'a', text:'التحليل الجيني حدد مصدر المادة + سجل دخوله للغرفة قبل الحقنة مباشرة + اعترافه بتكرار طلب أبوه لإنهاء معاناته' },
          { id:'b', text:'لأنه كان بيزور أبوه كل يوم وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بلحظة الحقنة نفسها' },
          { id:'c', text:'لأنه كان متأثر وقت الاستجواب، وده انطباع عاطفي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynothoda',
        label:'ليه هدى الممرضة كانت بريئة رغم إنها اللي جهزت الحقنة؟',
        options: [
          { id:'a', text:'التحليل أثبت إن المادة اتضافت بعد ما سلمت الحقنة للممرض المساعد، ومفيش أي دليل يربطها بالمادة المكتشفة نفسها' },
          { id:'b', text:'لأنها بتشتغل من سنين طويلة، وده افتراض عام عن الخبرة مش نتيجة تحقيق فعلي في هذه الحادثة بالذات' },
          { id:'c', text:'لأنها اعترفت بصراحة إنها جهزت الحقنة، وده سلوك تعاوني بس مش إثبات مباشر على براءتها' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الرحمة اللي تحولت لجريمة',
      paragraphs:[
        'كريم، متأثرًا بمعاناة أبوه المزمنة وطلباته المتكررة لإنهائها، أضاف مادة غير مصرح بها للحقنة بعد ما استلمها الممرض المساعد، مستغلًا زيارته اليومية المعتادة. النية كانت رحمة في نظره، لكنها جريمة قتل قانونًا.',
        'اللي قفل الدائرة كان التحليل الجيني اللي حدد مصدر المادة، وسجل دخوله للغرفة قبل الحقنة مباشرة، واعترافه بتكرار طلب أبوه — كل ده رسم صورة كاملة بعيدة تمامًا عن رواية "الإهمال الطبي" الأولى.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كريم، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عنها صفة "الإهمال الطبي".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: رغبة الأب، دخول الغرفة، التحليل الجيني، ونمط الزيارات، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل حر والحقيقة العائلية المؤلمة فضلت مدفونة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الحقنة الأخيرة"

   الغلاف (cover.webp):
   "Photorealistic shot of a quiet private hospital room with an
   empty bed, medical equipment, soft morning light through blinds,
   documentary photography style, no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of an elderly patient in a hospital bed
   surrounded by visiting family members, warm lighting, photorealistic,
   no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a nurse preparing an injection at a
   hospital medication cart, professional focus, photorealistic, no
   text, no watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic dramatic shot of medical staff rushing into a
   hospital room, urgent atmosphere, photorealistic, no text, no
   watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a grieving woman standing outside an
   empty hospital room doorway, somber lighting, photorealistic, no
   text, no watermark"

   الشخصيات:

   هدى (hoda.jpg):
   "Photorealistic portrait of a professional Egyptian nurse in
   uniform, composed and caring expression, hospital background,
   photorealistic, no text, no watermark"

   طارق (tarek.jpg):
   "Photorealistic portrait of a middle-aged Egyptian businessman in
   a suit, serious expression, photorealistic, no text, no watermark"

   منى (mona.jpg):
   "Photorealistic portrait of a concerned middle-aged Egyptian
   woman, hospital hallway background, photorealistic, no text, no
   watermark"

   كريم (karim.jpg):
   "Photorealistic portrait of a young Egyptian man with a sad,
   conflicted expression, hospital background, photorealistic, no
   text, no watermark"

   أدلة:
   evidence-note.jpg: "Photorealistic close-up of a handwritten
   personal note on a nightstand, dim lighting, photorealistic, no
   text, no watermark"
   evidence-logbook.jpg: "Photorealistic close-up of a hospital
   visitor logbook with signed entries and timestamps, photorealistic,
   no text, no watermark"
   evidence-lab.jpg: "Photorealistic close-up of a laboratory
   sample vial with a printed analysis report nearby, photorealistic,
   no text, no watermark"
   ============================================================ */
