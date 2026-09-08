/* ============================================================
   بيانات قضية: التوقيع المزوّر
   رجل أعمال مسنّ بيموت ويسيب وصية بتوزيع أملاكه، لكن أحد
   الأبناء بيلاحظ حاجة غريبة في التوقيع. القضية مش مين زوّر
   الوصية بس — لكن مين استخدم التزوير ده لمصلحته.
   ============================================================ */

const IMG_BASE_FORGEDSIGNATURE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/forged-signature/';

const CASE_FORGED_SIGNATURE = {
  id: 'forged-signature',
  title: 'التوقيع المزوّر',
  caseNo: 'CASE 070',
  subtitle: 'فيلا عائلية، المعادي، القاهرة',
  coverImg: IMG_BASE_FORGEDSIGNATURE + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 50,
  investigationPoints: 24,
  teaser: 'رجل أعمال مسنّ بيموت ويسيب وصية بتوزيع أملاكه على أبنائه، لكن أحد الأبناء بيلاحظ إن بند إضافي في آخر صفحة مختلف شوية عن أسلوب توقيع أبوه المعتاد. مين زوّر البند ده، ومين استفاد منه فعليًا؟',

  isPremium: false,
  categories: ['fraud', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FORGEDSIGNATURE + 'cover.webp',
    heroCaption: 'CASE 070 — بند إضافي مالوش مكان',
    text1: 'رجل الأعمال "سعيد الفقي" مات بعد مرض طويل، سايب وصية موزّعة أملاكه على أبنائه التلاتة بالتساوي، حسب ما كان متفق عليه من زمان. لكن ابنته الصغرى "ياسمين" لاحظت بند إضافي في آخر صفحة بيغيّر التوزيع لصالح واحد من إخواتها.',
    text2: 'ياسمين مش متأكدة لو أبوها فعلًا غيّر رأيه في آخر لحظة، ولا حد تلاعب بالوصية بعد وفاته. طلبت تحليل خط اليد قبل ما المحكمة تعتمد الوصية بالشكل النهائي ده.',
    meta: [
      { label:'المتوفى', value:'سعيد الفقي — رجل أعمال متقاعد' },
      { label:'موضوع الشك', value:'بند إضافي في آخر صفحة من الوصية' },
      { label:'التوزيع المتفق عليه سابقًا', value:'بالتساوي بين الأبناء التلاتة' },
      { label:'طلب التحقيق', value:'ياسمين، الابنة الصغرى' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — الوصية القديمة', img: IMG_BASE_FORGEDSIGNATURE + 'scene1.jpg',
      text:'سعيد جالس مع محاميه الشخصي فؤاد قبل مرضه بسنين، بيوقع على وصية بتوزيع الأملاك بالتساوي بين أبنائه التلاتة.' },
    { scene:'المشهد ٢ — المرض', img: IMG_BASE_FORGEDSIGNATURE + 'scene2.jpg',
      text:'في الشهور الأخيرة من مرضه، سعيد بيقعد في غرفته أغلب الوقت، وأولاده بيتناوبوا على زيارته.' },
    { scene:'المشهد ٣ — الوفاة', img: IMG_BASE_FORGEDSIGNATURE + 'scene3.jpg',
      text:'سعيد بيموت بعد صراع طويل مع المرض، والعائلة بتتجمع لقراءة الوصية الرسمية.' },
    { scene:'المشهد ٤ — الاكتشاف', img: IMG_BASE_FORGEDSIGNATURE + 'scene4.jpg',
      text:'ياسمين بتلاحظ إن آخر صفحة في الوصية فيها بند إضافي غريب، بتوقيع شكله مختلف شوية عن باقي الصفحات.' },
  ],

  suspects: [
    {
      id:'lawyer_fouad', name:'فؤاد', role:'المحامي الشخصي لسعيد منذ سنين', img: IMG_BASE_FORGEDSIGNATURE + 'fouad.jpg', avatarEmoji:'⚖️',
      alibi:'قال إن الوصية بالكامل، بما فيها البند الأخير، وقّعها سعيد بنفسه في مكتبه قبل وفاته بأسابيع قليلة.',
      questions:[
        { q:'إنت وثّقت الوصية بالكامل، صح؟',
          a:'"أيوه، بما فيها آخر صفحة. سعيد جه بنفسه ووقّع قدامي، ماكانش في أي حد تاني في الاجتماع."' },
        { q:'مين كان معاك في المكتب وقت التوقيع النهائي؟', unlockId:'assistant_present_hint',
          a:'"مساعدتي الجديدة، رنا، كانت بتجهز الأوراق في المكتب، بس ماكانتش موجودة وقت التوقيع الفعلي."' },
      ],
      confrontations:{}
    },
    {
      id:'assistant_rana', name:'رنا', role:'مساعدة المحامي فؤاد', img: IMG_BASE_FORGEDSIGNATURE + 'rana.jpg', avatarEmoji:'📝',
      alibi:'قالت إنها كانت بس بتجهز الأوراق وطباعة المستندات، ومالهاش أي دخل في محتوى الوصية.',
      questions:[
        { q:'إنتِ اللي طبعتِ صفحات الوصية؟', unlockId:'rana_typed_pages',
          a:'"أيوه، أنا بطبع كل المستندات في المكتب، ده جزء من شغلي العادي."' },
        { q:'كان عندك وصول لأرشيف توقيعات سعيد القديمة؟', requires:['rana_typed_pages'], unlockId:'rana_archive_access',
          a:'"أيوه، الأرشيف مفتوح لكل الموظفين اللي بيشتغلوا على ملفات العملاء القدامى، مش حاجة سرية."' },
        { q:'إنتِ كنتِ على علاقة بأحد أبناء سعيد؟', requires:['rana_archive_access'], unlockId:'rana_relationship_hint', closesInterrogation:true,
          a:'(بتتردد) "أنا وعمر... كنا بنتقابل من فترة، بس ده مالوش علاقة بالوصية خالص."' },
      ],
      confrontations:{}
    },
    {
      id:'son_omar', name:'عمر', role:'الابن الأكبر، المستفيد من البند الإضافي', img: IMG_BASE_FORGEDSIGNATURE + 'omar.jpg', avatarEmoji:'👔',
      alibi:'قال إنه ماكانش عارف بالبند الإضافي خالص، وإن الوصية فاجأته زي إخواته بالظبط.',
      loseMsg:'عمر فعلًا فوجئ بالبند الإضافي زي إخواته، وتحليل خط اليد أثبت إن التزوير مش من صنعه، ومفيش أي دليل يربطه مباشرة بمكتب المحامي وقت تحرير البند. استفادته من البند لا تعني تورطه في تزويره — دي نقطة أساسية في أي تحقيق مالي.',
      questions:[
        { q:'إنت المستفيد الأكبر من البند الإضافي، صح؟',
          a:'"أيوه، بس أنا نفسي اتفاجئت لما سمعت الوصية. ماكنتش أتوقع أبويا يغيّر رأيه من غير ما يقولي."' },
        { q:'كنت على علاقة بحد في مكتب المحامي؟', unlockId:'omar_rana_relationship',
          a:'"أنا وموظفة في المكتب كنا بنتقابل، بس ده كان قبل وفاة أبويا بفترة طويلة، ومالوش علاقة بالوصية."' },
      ],
      confrontations:{
        rana_relationship_hint:'رنا كانت بتعرف حياتي الشخصية، بس ده ما يعنيش إننا اتفقنا على حاجة.',
      }
    },
    {
      id:'daughter_yasmin', name:'ياسمين', role:'الابنة الصغرى، طلبت التحقيق', img: IMG_BASE_FORGEDSIGNATURE + 'yasmin.jpg', avatarEmoji:'🔍',
      alibi:'ماكانتش متواجدة في مكتب المحامي وقت توقيع أي جزء من الوصية.',
      questions:[
        { q:'إيه اللي خلاكِ تشكي في البند الإضافي؟', unlockId:'signature_anomaly_hint',
          a:'"توقيع أبويا في آخر صفحة شكله مختلف شوية عن باقي الصفحات، زاوية الخط والمسافات بين الحروف مش زي المعتاد."' },
        { q:'أبوكِ كان اتكلم معاكِ عن نيته يغيّر الوصية؟',
          a:'"لأ خالص، آخر مرة اتكلمنا كان لسه متمسك بالتوزيع بالتساوي زي ما اتفقوا عليه من زمان."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'will_document', tag:'من المستند الرسمي', crit:false, title:'نسخة الوصية الرسمية', img:null,
      short:'الوصية موزّعة الأملاك بالتساوي، ماعدا بند إضافي في آخر صفحة',
      full:'الوصية الرسمية موزّعة الأملاك بالتساوي بين الأبناء التلاتة، ماعدا بند إضافي في آخر صفحة بيميل التوزيع لصالح الابن الأكبر عمر.',
      unlocked:true, order:1 },

    { id:'signature_anomaly_hint', tag:'من استجواب ياسمين', crit:false, title:'اختلاف ملحوظ في التوقيع', img: IMG_BASE_FORGEDSIGNATURE + 'evidence-signature.jpg',
      short:'توقيع البند الإضافي مختلف شوية عن باقي توقيعات الوصية',
      full:'ياسمين لاحظت اختلاف واضح في زاوية الخط والمسافات بين الحروف في توقيع البند الإضافي، مقارنة بباقي توقيعات الوصية.',
      unlocked:false, order:2 },

    { id:'assistant_present_hint', tag:'من استجواب فؤاد', crit:false, title:'وجود رنا في المكتب', img:null,
      short:'رنا كانت في المكتب أثناء تحضير المستندات لكن مش وقت التوقيع الفعلي',
      full:'فؤاد أكد إن مساعدته رنا كانت موجودة في المكتب أثناء تحضير المستندات، لكنها ماكانتش موجودة وقت التوقيع الفعلي المزعوم.',
      unlocked:false, order:3 },

    { id:'rana_typed_pages', tag:'من استجواب رنا', crit:false, title:'رنا هي اللي طبعت الصفحات', img:null,
      short:'رنا أكدت إنها اللي طبعت كل صفحات الوصية بما فيها الأخيرة',
      full:'رنا أكدت إنها المسؤولة عن طباعة كل مستندات المكتب، بما فيها الصفحة الأخيرة من الوصية اللي فيها البند المشكوك فيه.',
      unlocked:false, order:4 },

    { id:'rana_archive_access', tag:'من استجواب رنا', crit:false, title:'وصول رنا لأرشيف التوقيعات', img:null,
      short:'رنا كان عندها وصول كامل لأرشيف توقيعات العملاء القدامى',
      full:'رنا أكدت إن عندها وصول كامل لأرشيف توقيعات العملاء القدامى بما فيهم سعيد، بحكم طبيعة شغلها في المكتب.',
      unlocked:false, order:5 },

    { id:'rana_relationship_hint', tag:'من استجواب رنا', crit:true, title:'علاقة رنا بعمر', img:null,
      short:'رنا كانت على علاقة عاطفية مع عمر، المستفيد من البند الإضافي',
      full:'رنا اعترفت بوجود علاقة عاطفية بينها وبين عمر، الابن الأكبر والمستفيد الوحيد من البند الإضافي المشكوك فيه في الوصية.',
      unlocked:false, order:6 },

    { id:'omar_rana_relationship', tag:'من استجواب عمر', crit:false, title:'تأكيد عمر للعلاقة', img:null,
      short:'عمر أكد علاقته برنا لكن قال إنها انتهت قبل الوفاة',
      full:'عمر أكد وجود علاقة عاطفية سابقة مع رنا، لكنه ادّعى إنها انتهت قبل وفاة أبوه بفترة طويلة ومالهاش علاقة بالوصية.',
      unlocked:false, order:7 },

    { id:'handwriting_analysis_result', tag:'من تحليل خط اليد', crit:true, title:'نتيجة تحليل التوقيع', img: IMG_BASE_FORGEDSIGNATURE + 'evidence-handwriting.jpg',
      short:'التحليل يكشف إن التزوير بدقة عالية توحي بوصول لأرشيف التوقيعات الأصلية',
      full:'تحليل خط اليد المتخصص كشف إن توقيع البند الإضافي مزوّر بدقة عالية جدًا، بأسلوب يوحي بوصول مباشر لأرشيف توقيعات سعيد الحقيقية القديمة — مش تقليد عشوائي من الذاكرة.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تأكيد فؤاد إن سعيد وقّع الوصية "بالكامل" بنفسه، بشهادة رنا عن غياب فؤاد وقت التوقيع الفعلي المزعوم.',
    resultText: 'التناقض واضح: فؤاد أكد إن التوقيع حصل قدامه مباشرة، لكن التفاصيل الفعلية بتوضح إن رنا كانت الوحيدة الموجودة فعليًا في اللحظات الحرجة اللي تحرر فيها البند الإضافي.',
    resultEvidenceIds: ['assistant_present_hint'],
    statements: [
      { id:'st1', text:'"سعيد جه بنفسه ووقّع قدامي، ماكانش في أي حد تاني في الاجتماع."', source:'فؤاد — في الاستجواب' },
      { id:'st2', text:'"مساعدتي الجديدة، رنا، كانت بتجهز الأوراق في المكتب."', source:'فؤاد — في نفس الاستجواب' },
      { id:'st3', text:'"توقيع أبويا في آخر صفحة شكله مختلف شوية عن باقي الصفحات."', source:'ياسمين — في الاستجواب' },
      { id:'st4', text:'"أنا نفسي اتفاجئت لما سمعت الوصية."', source:'عمر — في الاستجواب' },
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
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  handwritingPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الخط',
    introText: 'قارن توقيع سعيد المرجعي الموثق من الأرشيف بتوقيع البند الإضافي في آخر صفحة، وحدد نقاط الاختلاف الدقيقة اللي بتكشف التزوير.',
    resultText: 'التحليل بيوضح تطابق أسلوب التزوير مع دقة عالية توحي بشخص عنده وصول واسع لأرشيف توقيعات سعيد الحقيقية — رنا.',
    referenceSignature: { angle: 12, pressure: 'light', spacing: 'wide' },
    willSignature: { angle: 19, pressure: 'medium', spacing: 'narrow' },
    discrepancyPoints: ['angle', 'pressure', 'spacing'],
    correctSuspectId: 'assistant_rana',
    resultEvidenceIds: ['handwriting_analysis_result'],
  },

  evidenceCombinations: [
    { parts:['rana_relationship_hint','handwriting_analysis_result'], resultId:'handwriting_analysis_result' },
  ],

  investigationActions: [
    {
      id:'check_archive_logs', kind:'مراجعة سجلات الأرشيف', label:'راجع سجل دخول رنا لأرشيف التوقيعات',
      description:'دوّر على أي دخول لملف سعيد في الأرشيف قبل تاريخ تحرير البند الإضافي مباشرة.',
      requires:['rana_archive_access','rana_relationship_hint'], resultEvidenceIds:['handwriting_analysis_result'],
      successText:'سجل الأرشيف أكد دخول رنا لملف توقيعات سعيد قبل تاريخ تحرير البند الإضافي بأيام قليلة.'
    },
  ],

  correctSuspectId: 'assistant_rana',
  conclusiveEvidenceIds: ['rana_relationship_hint', 'handwriting_analysis_result', 'rana_archive_access', 'assistant_present_hint'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن رنا هي اللي زوّرت البند؟',
        options: [
          { id:'a', text:'تحليل خط اليد أثبت التزوير بدقة توحي بوصول للأرشيف + علاقتها بعمر المستفيد + وصولها الموثق لأرشيف التوقيعات القديمة' },
          { id:'b', text:'لأنها موظفة بسيطة وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بلحظة التزوير نفسها' },
          { id:'c', text:'لأنها كانت متوترة وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotomar',
        label:'ليه عمر كان بريء رغم إنه المستفيد الوحيد من التزوير؟',
        options: [
          { id:'a', text:'تحليل خط اليد أثبت إن التزوير نفسه مش من صنعه، ومفيش أي دليل يربطه مباشرة بمكتب المحامي وقت تحرير البند المزوّر' },
          { id:'b', text:'لأنه استفاد من البند وده كافي لبراءته تلقائيًا، وده افتراض عكسي خاطئ — الاستفادة مالهاش علاقة بالتنفيذ' },
          { id:'c', text:'لأنه اعترف بعلاقته برنا بصراحة، وده سلوك تعاوني بس مش إثبات مباشر على براءته الكاملة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'التوقيع اللي فضح صاحبته',
      paragraphs:[
        'رنا استغلت وصولها لأرشيف توقيعات سعيد القديمة عشان تزوّر بند إضافي في الوصية لصالح عمر، حبيبها، بعد وفاة سعيد مباشرة وقبل تسليم الوصية للمحكمة. التزوير كان دقيق جدًا، لكن مش كافي يخدع تحليل خط اليد المتخصص.',
        'اللي قفل الدائرة كان تحليل خط اليد اللي أثبت التزوير، وعلاقتها بعمر اللي وفّرت الدافع، ووصولها الموثق لأرشيف التوقيعات القديمة اللي فسّر الدقة العالية في التزوير.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية رنا، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتثبت التزوير قانونيًا.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: علاقتها بعمر، تحليل الخط، وصولها للأرشيف، وغياب فؤاد وقت التوقيع الفعلي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعلة الحقيقية فضلت تعمل في نفس المكتب وكأن حاجة ماحصلتش. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "التوقيع المزوّر"

   الغلاف (cover.webp):
   "Photorealistic shot of a legal document with a signature page
   under a magnifying glass on a wooden desk, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of an elderly Egyptian businessman signing
   documents with a lawyer in a formal office, photorealistic, no
   text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of an elderly sick man resting in a bedroom,
   family visiting, soft lighting, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a family gathered somberly for a will
   reading in a living room, photorealistic, no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic close-up shot of a woman examining a legal
   document page with a concerned expression, photorealistic, no
   text, no watermark"

   الشخصيات:

   فؤاد (fouad.jpg):
   "Photorealistic portrait of an experienced Egyptian male lawyer
   in his 60s, formal attire, office background, photorealistic, no
   text, no watermark"

   رنا (rana.jpg):
   "Photorealistic portrait of a young Egyptian female legal
   assistant, professional attire, office background, photorealistic,
   no text, no watermark"

   عمر (omar.jpg):
   "Photorealistic portrait of a middle-aged Egyptian businessman in
   a suit, confident expression, photorealistic, no text, no
   watermark"

   ياسمين (yasmin.jpg):
   "Photorealistic portrait of a determined young Egyptian woman,
   thoughtful expression, photorealistic, no text, no watermark"

   أدلة:
   evidence-signature.jpg: "Photorealistic close-up of two
   handwritten signatures on paper being compared side by side,
   photorealistic, no text, no watermark"
   evidence-handwriting.jpg: "Photorealistic close-up of a forensic
   handwriting analysis report with signature overlays,
   photorealistic, no text, no watermark"
   ============================================================ */
