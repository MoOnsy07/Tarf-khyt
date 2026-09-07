/* ============================================================
   بيانات قضية: رماد الأرشيف
   حريق يلتهم مبنى تراثي عريق ليلة ما قبل تصويت مصيري على
   هدمه، والجميع مقتنع إن الحريق مؤامرة سياسية حديثة، لكن
   الحقيقة مدفونة في قبو المبنى من عقود.
   ============================================================ */

const IMG_BASE_ARCHIVEFIRE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/archive-fire/';

const CASE_ARCHIVE_FIRE = {
  id: 'archive-fire',
  title: 'رماد الأرشيف',
  caseNo: 'CASE 067',
  subtitle: 'مبنى تراثي عريق، حي وسط البلد التاريخي، القاهرة',
  coverImg: IMG_BASE_ARCHIVEFIRE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 56,
  investigationPoints: 26,
  teaser: 'مبنى تراثي عريق بيحترق ليلة ما قبل تصويت مصيري على هدمه، والجميع مقتنع إن الحريق مؤامرة من طرف في معركة الهدم الحديثة. لكن مخطط المبنى القديم بيكشف إن الحقيقة مدفونة في قبو مهجور من عقود طويلة.',

  isPremium: false,
  categories: ['arson', 'heritage', 'coldcase'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_ARCHIVEFIRE + 'cover.webp',
    heroCaption: 'CASE 067 — الحريق اللي أكل تاريخ نص قرن',
    text1: 'مبنى "قصر الزهور" التراثي، اللي عمره أكتر من مية سنة، احترق بشكل مفاجئ ليلة ما قبل تصويت المجلس المحلي على مصيره — يتحول لمركز تجاري حديث ولا يفضل مبنى أثري محمي. الحريق دمّر جزء كبير من الأرشيف التاريخي في القبو.',
    text2: 'رئيسة جمعية الحفاظ على التراث "عايدة" طلبت تحقيق مستقل، لأن كل الشك وقع فورًا على المستثمر اللي عايز يهدم المبنى. لكن حاسة إن الحريق مركّز بشكل غريب على القبو تحديدًا، مش على باقي المبنى.',
    meta: [
      { label:'المبنى', value:'قصر الزهور — مبنى تراثي، أكتر من 100 سنة' },
      { label:'توقيت الحريق', value:'ليلة ما قبل تصويت المجلس المحلي على هدم المبنى' },
      { label:'الشك الأولي', value:'مؤامرة من طرف في معركة الهدم الحديثة' },
      { label:'طلب التحقيق', value:'عايدة، رئيسة جمعية الحفاظ على التراث' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — قبل التصويت', img: IMG_BASE_ARCHIVEFIRE + 'scene1.jpg',
      text:'مجلس محلي متوتر، طرفين متعارضين: جمعية الحفاظ على التراث اللي عايزة تحمي المبنى، ومستثمر عقاري كبير عايز يهدمه ويبني مكانه مركز تجاري.' },
    { scene:'المشهد ٢ — الليلة الحاسمة', img: IMG_BASE_ARCHIVEFIRE + 'scene2.jpg',
      text:'المبنى فاضي وقت متأخر بالليل، إلا من حارس أمن واحد بيعمل جولته المعتادة حوالين الطوابق.' },
    { scene:'المشهد ٣ — الحريق', img: IMG_BASE_ARCHIVEFIRE + 'scene3.jpg',
      text:'دخان كثيف بيبدأ يطلع من ناحية القبو، ويتحول بسرعة لحريق ضخم بيلتهم جزء كبير من الأرشيف التاريخي المحفوظ هناك.' },
    { scene:'المشهد ٤ — بعد الحريق', img: IMG_BASE_ARCHIVEFIRE + 'scene4.jpg',
      text:'المبنى محروق جزئيًا، والتصويت المصيري اتأجل. عايدة واقفة قدام الأنقاض حاسة إن فيه حاجة مخفية أكبر من مجرد معركة هدم.' },
  ],

  suspects: [
    {
      id:'sameh_investor', name:'سامح', role:'المستثمر العقاري صاحب مشروع الهدم', img: IMG_BASE_ARCHIVEFIRE + 'sameh.jpg', avatarEmoji:'🏢',
      alibi:'قال إنه كان في عشاء عمل مع شركاء ماليين وقت الحريق، بعيد تمامًا عن المبنى.',
      loseMsg:'سامح هو أوضح "مستفيد" ظاهري من تدمير المبنى، لكن الحريق فعليًا ضرّه — أجّل التصويت اللي كان في صالحه أصلًا. مفيش أي دليل يربطه بالوصول لمنطقة القبو أو بمعرفة محتوياته التاريخية، وحجة غيابه موثقة بشهادات مستقلة. اتهامه هيكون مبني على افتراض ظاهري بس من غير أي دليل مادي فعلي.',
      questions:[
        { q:'إنت أكتر واحد كان هيستفيد من تدمير المبنى، صح؟',
          a:'"الحريق ضرني أكتر ما نفعني، التصويت كان هيبقى في صالحي أصلًا، ودلوقتي كل حاجة اتأجلت."' },
        { q:'كان عندك أي معرفة بمحتويات القبو؟', unlockId:'investor_knew_archive',
          a:'"سمعت إن فيه أرشيف قديم هناك، بس ماكنتش مهتم بتفاصيله، أنا مهتم بالأرض مش بالورق القديم."' },
      ],
      confrontations:{}
    },
    {
      id:'aida_heritage', name:'عايدة', role:'رئيسة جمعية الحفاظ على التراث', img: IMG_BASE_ARCHIVEFIRE + 'aida.jpg', avatarEmoji:'📜',
      alibi:'كانت في مكتب الجمعية بعيد عن المبنى وقت الحريق، بحسب شهادة زملائها.',
      questions:[
        { q:'ليه حاسة إن الحريق مش مجرد مؤامرة هدم عادية؟', unlockId:'fire_focused_basement',
          a:'"الحريق كان مركّز بشكل غريب على القبو تحديدًا، مش منتشر في المبنى كله زي ما تتوقع من حريق عشوائي."' },
        { q:'إيه اللي كان محفوظ في القبو بالظبط؟', unlockId:'archive_contents_hint', requires:['fire_focused_basement'],
          a:'"أرشيف قديم جدًا، وثائق ملكية، سجلات موظفين، وملفات من فترة الستينات والسبعينات. حاجات قديمة جدًا ومنسية."' },
      ],
      confrontations:{}
    },
    {
      id:'guard_farouk', name:'فاروق', role:'حارس أمن المبنى منذ أكثر من 30 سنة', img: IMG_BASE_ARCHIVEFIRE + 'farouk.jpg', avatarEmoji:'🔦',
      alibi:'قال إنه كان في جولته المعتادة في الطابق العلوي وقت اندلاع الحريق.',
      questions:[
        { q:'إنت أقدم موظف في المبنى، صح؟', unlockId:'farouk_long_tenure',
          a:'"أيوه، شغال هنا من زمان جدًا، من قبل ما المبنى يتحول لمقر إداري حتى."' },
        { q:'لاحظت أي حد غريب حوالين القبو قبل الحريق؟', unlockId:'farouk_saw_someone', requires:['farouk_long_tenure'],
          a:'"شفت حد بيدخل باب القبو الجانبي قبل الحريق بساعة تقريبًا، بس مفكرتش تاخد بالي، المكان ده مالوش زوار عادة."' },
        { q:'إنت كنت عارف حاجة عن محتويات الأرشيف القديم؟', requires:['farouk_saw_someone'],
          a:'"سمعت كلام قديم عن حادثة غريبة حصلت في السبعينات، بس محدش بيتكلم فيها، وأنا مش حابب أدخل في الموضوع ده."' },
      ],
      confrontations:{}
    },
    {
      id:'nabila_descendant', name:'نبيلة', role:'حفيدة مدير المبنى السابق في السبعينات', img: IMG_BASE_ARCHIVEFIRE + 'nabila.jpg', avatarEmoji:'👵',
      alibi:'قالت إنها كانت في بيتها بعيد تمامًا عن المبنى وقت الحريق.',
      loseMsg:null,
      questions:[
        { q:'ليه إنتِ مهتمة بمصير المبنى ده بالتحديد؟', unlockId:'nabila_family_link',
          a:'"جدي كان مدير المبنى في السبعينات، ودايمًا كان قلقان بشكل غريب من فكرة إن حد يفتح القبو أو يراجع الأرشيف القديم."' },
        { q:'جدك ذكرلك أي تفاصيل عن اللي حصل زمان؟', unlockId:'grandfather_secret', requires:['nabila_family_link'],
          a:'"قبل ما يموت، قال لي إن فيه موظف قديم اختفى فجأة في السبعينات وإن الموضوع اتغطى وقتها، بس ماكملش الكلام."' },
        { q:'كنتِ عارفة إن فيه وثائق عن الموضوع ده لسه محفوظة في القبو؟', requires:['grandfather_secret'], closesInterrogation:true,
          a:'(بتتردد) "سمعت إن الملفات القديمة لسه موجودة هناك، بس أنا نفسي ماكنتش عارفة تفاصيلها بالظبط."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'fire_department_report', tag:'من تقرير الإطفاء', crit:false, title:'تقرير الحريق الأولي', img:null,
      short:'تقرير مبدئي بيوضح إن الحريق بدأ من ناحية القبو',
      full:'تقرير الدفاع المدني الأولي بيوضح إن الحريق اندلع من ناحية القبو وانتشر جزئيًا لباقي المبنى، من غير تحديد سبب واضح للاشتعال.',
      unlocked:true, order:1 },

    { id:'investor_knew_archive', tag:'من استجواب سامح', crit:false, title:'معرفة سطحية بمحتويات القبو', img:null,
      short:'سامح كان عارف بوجود أرشيف قديم لكن مش مهتم بتفاصيله',
      full:'سامح أكد إنه كان عارف بوجود أرشيف قديم في القبو، لكنه أكد عدم اهتمامه بتفاصيله، مركّزًا فقط على قيمة الأرض نفسها.',
      unlocked:false, order:2 },

    { id:'fire_focused_basement', tag:'من استجواب عايدة', crit:true, title:'تركّز الحريق في منطقة القبو', img: IMG_BASE_ARCHIVEFIRE + 'evidence-basement.jpg',
      short:'الحريق كان مركّز بشكل غير طبيعي على منطقة القبو تحديدًا',
      full:'عايدة لاحظت إن نمط انتشار الحريق كان غير طبيعي — مركّز بشكل مكثف على منطقة القبو تحديدًا، بدل الانتشار العشوائي المتوقع من حريق يستهدف تدمير المبنى ككل.',
      unlocked:false, order:3 },

    { id:'archive_contents_hint', tag:'من استجواب عايدة', crit:false, title:'محتويات الأرشيف القديم', img:null,
      short:'القبو كان فيه وثائق ملكية وسجلات موظفين من الستينات والسبعينات',
      full:'عايدة أكدت إن القبو كان يحتوي على أرشيف قديم جدًا يشمل وثائق ملكية وسجلات موظفين من فترة الستينات والسبعينات.',
      unlocked:false, order:4 },

    { id:'farouk_long_tenure', tag:'من استجواب فاروق', crit:false, title:'خبرة فاروق الطويلة في المبنى', img:null,
      short:'فاروق شغال في المبنى منذ أكثر من 30 سنة',
      full:'فاروق أكد إنه شغال حارس أمن في المبنى منذ أكثر من 30 سنة، مما يجعله شاهدًا محتملًا على أحداث قديمة كتير.',
      unlocked:false, order:5 },

    { id:'farouk_saw_someone', tag:'من استجواب فاروق', crit:true, title:'شخص غريب عند باب القبو', img: IMG_BASE_ARCHIVEFIRE + 'evidence-doorway.jpg',
      short:'فاروق شاف حد بيدخل باب القبو الجانبي قبل الحريق بساعة',
      full:'فاروق شهد إنه شاف شخصًا بيدخل باب القبو الجانبي قبل اندلاع الحريق بساعة تقريبًا، في وقت المبنى مفروض يكون فاضي من الزوار.',
      unlocked:false, order:6 },

    { id:'nabila_family_link', tag:'من استجواب نبيلة', crit:false, title:'صلة نبيلة العائلية بالمبنى', img:null,
      short:'جد نبيلة كان مدير المبنى في السبعينات',
      full:'نبيلة كشفت إن جدها كان مدير المبنى في فترة السبعينات، وكان دايمًا قلقان بشكل غريب من فكرة فتح القبو أو مراجعة الأرشيف القديم.',
      unlocked:false, order:7 },

    { id:'grandfather_secret', tag:'من استجواب نبيلة', crit:true, title:'سر جد نبيلة القديم', img: IMG_BASE_ARCHIVEFIRE + 'evidence-oldrecord.jpg',
      short:'موظف قديم اختفى في السبعينات والموضوع اتغطى وقتها',
      full:'نبيلة كشفت إن جدها اعترف قبل وفاته بوجود موظف قديم اختفى فجأة في فترة السبعينات، وإن الموضوع اتغطى رسميًا وقتها من غير أي تحقيق حقيقي.',
      unlocked:false, order:8 },

    { id:'hidden_route_confirmed', tag:'من مخطط المبنى', crit:true, title:'مسار الوصول الخفي للقبو', img: IMG_BASE_ARCHIVEFIRE + 'evidence-floorplan.jpg',
      short:'مخطط المبنى يثبت إن نبيلة كانت تعرف مسار وصول قديم غير معروف للعامة',
      full:'مخطط المبنى القديم بيوضح مسار وصول جانبي قديم للقبو، معروف بس لعائلة إدارة المبنى القدامى، وده يربط نبيلة مباشرة بالقدرة على الوصول للأرشيف من غير ما يلاحظها حد.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن الافتراض الأول إن الحريق "مؤامرة هدم" بتصريح سامح نفسه عن الضرر اللي لحقه من الحريق. فيه تناقض بين الدافع المفترض والمستفيد الفعلي.',
    resultText: 'التناقض واضح: لو الحريق كان مؤامرة لصالح الهدم، سامح هو اللي كان المفروض يستفيد، لكنه أكد إن التصويت كان أصلًا في صالحه، والحريق أجّل كل حاجة وضرّه بدل ما ينفعه — ده يفكك نظرية "مؤامرة الهدم" من أساسها.',
    resultEvidenceIds: ['fire_focused_basement'],
    statements: [
      { id:'st1', text:'"الحريق ضرني أكتر ما نفعني، التصويت كان هيبقى في صالحي أصلًا، ودلوقتي كل حاجة اتأجلت."', source:'سامح — في الاستجواب' },
      { id:'st2', text:'الحريق كان مركّز بشكل غير طبيعي على منطقة القبو تحديدًا، مش منتشر في المبنى ككل.', source:'دليل: تركّز الحريق' },
      { id:'st3', text:'"سمعت إن فيه أرشيف قديم هناك، بس ماكنتش مهتم بتفاصيله."', source:'سامح — في الاستجواب' },
      { id:'st4', text:'"شفت حد بيدخل باب القبو الجانبي قبل الحريق بساعة تقريبًا."', source:'فاروق — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  floorPlanPuzzle: {
    enabled: true,
    tabLabel: 'مخطط المبنى',
    introText: 'تتبع المسارات الممكنة من مدخل المبنى الرئيسي للقبو، وحدد مين من المشتبه بيهم كان يقدر يوصل من غير ما يمر بحارس الأمن في جولته المعتادة.',
    resultText: 'المسار بيوضح إن نبيلة، من خلال معرفتها العائلية القديمة بالمبنى، كانت الوحيدة اللي تعرف الممر الجانبي القديم اللي بيوصل للقبو مباشرة من غير المرور بمسار جولة فاروق المعتادة.',
    rooms: ['المدخل الرئيسي', 'الدرج الرئيسي', 'الممر الجانبي القديم', 'باب القبو'],
    suspectPaths: {
      sameh_investor:  ['المدخل الرئيسي'],
      aida_heritage:    ['المدخل الرئيسي', 'الدرج الرئيسي'],
      guard_farouk:     ['المدخل الرئيسي', 'الدرج الرئيسي', 'باب القبو'],
      nabila_descendant:['المدخل الرئيسي', 'الممر الجانبي القديم', 'باب القبو'],
    },
    correctSuspectId: 'nabila_descendant',
    resultEvidenceIds: ['hidden_route_confirmed'],
  },

  evidenceCombinations: [
    { parts:['grandfather_secret','farouk_saw_someone'], resultId:'hidden_route_confirmed' },
  ],

  investigationActions: [
    {
      id:'search_old_property_records', kind:'بحث في السجلات', label:'راجع سجلات ملكية المبنى من فترة السبعينات',
      description:'دوّر على أي وثائق قديمة تخص حادثة اختفاء الموظف اللي ذكرتها نبيلة.',
      requires:['grandfather_secret','archive_contents_hint'], resultEvidenceIds:['hidden_route_confirmed'],
      successText:'السجلات القديمة أكدت وجود ملف مفقود يخص موظف اختفى في السبعينات، بنفس الفترة اللي ذكرتها نبيلة.'
    },
  ],

  correctSuspectId: 'nabila_descendant',
  conclusiveEvidenceIds: ['grandfather_secret', 'farouk_saw_someone', 'hidden_route_confirmed', 'fire_focused_basement'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن نبيلة هي الفاعلة؟',
        options: [
          { id:'a', text:'مخطط المبنى أثبت إنها الوحيدة اللي تعرف الممر الجانبي القديم للقبو + شهادة فاروق على دخول شخص قبل الحريق + سرها العائلي عن حادثة السبعينات' },
          { id:'b', text:'لأنها حفيدة مدير المبنى القديم وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بليلة الحريق نفسها' },
          { id:'c', text:'لأنها كانت متوترة وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotinvestor',
        label:'ليه سامح المستثمر ماكانش الفاعل رغم إنه أكتر واحد بيبان إنه المستفيد؟',
        options: [
          { id:'a', text:'الحريق فعليًا ضره لأنه أجّل التصويت اللي كان في صالحه، ومفيش أي دليل يربطه بالوصول لمنطقة القبو أو بمعرفة محتوياته القديمة' },
          { id:'b', text:'لأنه مستثمر عقاري وده يخليه مشبوه تلقائيًا، وده افتراض عام مش نتيجة تحقيق فعلي' },
          { id:'c', text:'لأنه رفض يتكلم كتير في الاستجواب، وده سلوك طبيعي مش دليل على تورطه' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الرماد اللي كشف سر نص قرن',
      paragraphs:[
        'نبيلة مش لها علاقة بمعركة الهدم الحديثة خالص. الحريق كان محاولة لتدمير أرشيف قديم يخص حادثة اختفاء موظف في السبعينات، كان جدها متورط في التغطية عليها. لما حست إن التصويت الجديد ممكن يفتح المبنى لمراجعة كاملة تكشف الأرشيف القديم، قررت تدمّر الأدلة قبل ما حد يوصلها.',
        'اللي قفل الدائرة كان مخطط المبنى اللي أثبت معرفتها بالممر السري، وشهادة فاروق على دخول شخص للقبو قبل الحريق، واعترافها بسر جدها القديم اللي وفّر الدافع الحقيقي البعيد كل البعد عن معركة الهدم الظاهرة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية نبيلة، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي رواية "مؤامرة الهدم".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: سر الجد، شهادة فاروق، مسار المبنى الخفي، وتركّز الحريق في القبو، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعلة الحقيقية فضلت حرة والسر القديم فضل مدفون تحت الرماد. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "رماد الأرشيف"

   الغلاف (cover.webp):
   "Photorealistic shot of a historic ornate building facade
   partially damaged by fire smoke stains, dramatic evening
   lighting, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a tense local council meeting room with
   two opposing groups arguing, photorealistic, no text, no
   watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of an elderly security guard walking through
   a dimly lit historic building hallway at night with a flashlight,
   photorealistic, no text, no watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic dramatic shot of thick smoke rising from a
   basement stairwell in a historic building at night, photorealistic,
   no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a partially burned historic building
   exterior in daylight, a woman standing looking at the damage,
   photorealistic, no text, no watermark"

   الشخصيات:

   سامح (sameh.jpg):
   "Photorealistic portrait of a wealthy middle-aged Egyptian real
   estate investor in a suit, confident expression, photorealistic,
   no text, no watermark"

   عايدة (aida.jpg):
   "Photorealistic portrait of a determined Egyptian woman in her
   50s, heritage preservation activist, standing near an old
   building, photorealistic, no text, no watermark"

   فاروق (farouk.jpg):
   "Photorealistic portrait of an elderly Egyptian male security
   guard in uniform, weathered kind face, photorealistic, no text,
   no watermark"

   نبيلة (nabila.jpg):
   "Photorealistic portrait of an elderly Egyptian woman with a
   composed but guarded expression, traditional attire, photorealistic,
   no text, no watermark"

   أدلة:
   evidence-basement.jpg: "Photorealistic shot of a burned basement
   archive room with charred paper documents, photorealistic, no
   text, no watermark"
   evidence-doorway.jpg: "Photorealistic shot of an old side
   basement doorway in a historic building, dim lighting,
   photorealistic, no text, no watermark"
   evidence-oldrecord.jpg: "Photorealistic close-up of a yellowed
   old personnel file document from the 1970s, photorealistic, no
   text, no watermark"
   evidence-floorplan.jpg: "Photorealistic shot of an old
   architectural building blueprint on a table, photorealistic, no
   text, no watermark"
   ============================================================ */
