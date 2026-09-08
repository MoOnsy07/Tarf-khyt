/* ============================================================
   بيانات قضية: دقائق قبل الانفجار
   انفجار في مصنع كيماويات بيسيب إصابات وضرر كبير، والشك بيقع
   على منافس تجاري. لكن إعادة بناء خط الأحداث بتكشف إن القرار
   المميت اتخد من جوه المصنع نفسه.
   ============================================================ */

const IMG_BASE_BLASTMINUTES = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/blast-minutes/';

const CASE_BLAST_MINUTES = {
  id: 'blast-minutes',
  title: 'دقائق قبل الانفجار',
  caseNo: 'CASE 074',
  subtitle: 'مصنع كيماويات صناعي، منطقة العاشر من رمضان',
  coverImg: IMG_BASE_BLASTMINUTES + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 55,
  investigationPoints: 26,
  teaser: 'انفجار مفاجئ في خط إنتاج بمصنع كيماويات بيسيب إصابات وضرر مادي كبير. الشركة بتتهم منافس تجاري بالتخريب المتعمد، لكن إعادة بناء دقائق الليلة بالتفصيل بتكشف إن القرار المميت اتخد من جوه المصنع نفسه، مش من برا.',

  isPremium: false,
  categories: ['accident', 'corruption', 'coldcase'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_BLASTMINUTES + 'cover.webp',
    heroCaption: 'CASE 074 — القرار اللي سبق الانفجار بدقايق',
    text1: 'مصنع "كيمتك" للمواد الكيماوية شهد انفجار مفاجئ في أحد خطوط الإنتاج، أدى لإصابة عدد من العمال وضرر مادي كبير. الإدارة العليا اتهمت فورًا شركة منافسة بمحاولة تخريب متعمدة لضرب سمعة المصنع.',
    text2: 'مهندس السلامة الصناعية "منير" مش مقتنع بالرواية دي، لأنه لاحظ حاجات غريبة في سجلات الصيانة قبل الحادثة. طلب منك تعيد بناء خط الأحداث بالدقيقة قبل ما التحقيق الرسمي يتقفل باتهام طرف خارجي.',
    meta: [
      { label:'المصنع', value:'كيمتك — مصنع مواد كيماوية صناعية' },
      { label:'الحادثة', value:'انفجار في خط إنتاج، إصابات وضرر مادي' },
      { label:'الاتهام الأولي', value:'تخريب متعمد من شركة منافسة' },
      { label:'طلب التحقيق', value:'منير، مهندس السلامة الصناعية' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — ليلة العمل', img: IMG_BASE_BLASTMINUTES + 'scene1.jpg',
      text:'خط الإنتاج شغال بكامل طاقته لتلبية طلبية عاجلة كبيرة، والعمال في نوبة ليلية مكثفة.' },
    { scene:'المشهد ٢ — تحذير مسبق', img: IMG_BASE_BLASTMINUTES + 'scene2.jpg',
      text:'مهندس مناوب بيلاحظ ارتفاع غير طبيعي في ضغط أحد الخزانات، ويحاول يبلّغ المسؤول عن الوردية.' },
    { scene:'المشهد ٣ — الانفجار', img: IMG_BASE_BLASTMINUTES + 'scene3.jpg',
      text:'انفجار مفاجئ يهز جزء من خط الإنتاج، والعمال بيجروا للخروج وسط الدخان والفوضى.' },
    { scene:'المشهد ٤ — التحقيق', img: IMG_BASE_BLASTMINUTES + 'scene4.jpg',
      text:'منير بيراجع سجلات الصيانة والتشغيل بحثًا عن تفسير حقيقي لما حصل قبل الانفجار بدقايق.' },
  ],

  suspects: [
    {
      id:'production_manager_gamal', name:'جمال', role:'مدير الإنتاج المسؤول عن الوردية', img: IMG_BASE_BLASTMINUTES + 'gamal.jpg', avatarEmoji:'🏭',
      alibi:'قال إنه كان بيتابع سير العمل بشكل طبيعي، ومالوش أي قرار غير معتاد في الوردية دي.',
      questions:[
        { q:'كان فيه ضغط عليك لزيادة الإنتاج قبل الحادثة؟', unlockId:'production_pressure_hint',
          a:'"أيوه، كان فيه طلبية عاجلة كبيرة، والإدارة كانت ضاغطة نخلص في وقت قياسي."' },
        { q:'استلمت أي تحذير عن ارتفاع الضغط في الخزانات؟', unlockId:'gamal_warning_received',
          a:'"استلمت ملاحظة من مهندس مناوب، بس قيّمتها كحاجة عادية مش طارئة."' },
        { q:'صمّام الأمان كان شغال وقت الحادثة؟', requires:['gamal_warning_received'], unlockId:'safety_valve_bypassed', closesInterrogation:true,
          a:'(بيتردد) "أمرت بتعطيله مؤقتًا عشان الإنتاج ميتأخرش، كانت المفروض تكون خطوة مؤقتة بس."' },
      ],
      confrontations:{}
    },
    {
      id:'safety_engineer_mounir', name:'منير', role:'مهندس السلامة الصناعية، طلب التحقيق', img: IMG_BASE_BLASTMINUTES + 'mounir.jpg', avatarEmoji:'🦺',
      alibi:'كان في مكتبه بعيد عن خط الإنتاج وقت الانفجار.',
      questions:[
        { q:'إيه اللي خلاك تشك في رواية "التخريب الخارجي"؟', unlockId:'mounir_maintenance_suspicion',
          a:'"سجلات الصيانة فيها فجوة غريبة، صمام الأمان الرئيسي مسجل إنه اتفحص، بس بيانات التشغيل بتقول إنه كان متعطل فعليًا."' },
        { q:'مين المسؤول عن قرارات تشغيل صمامات الأمان؟', requires:['mounir_maintenance_suspicion'],
          a:'"مدير الإنتاج هو الوحيد اللي عنده صلاحية يعطّل أو يشغّل الصمامات دي، مش أي حد تاني."' },
      ],
      confrontations:{}
    },
    {
      id:'competitor_rep_ali', name:'علي', role:'ممثل شركة منافسة، متهم بالتخريب', img: IMG_BASE_BLASTMINUTES + 'ali.jpg', avatarEmoji:'🏢',
      alibi:'قال إنه كان في مدينة تانية تمامًا وقت الحادثة، بعيد عن المصنع خالص.',
      loseMsg:'علي فعلًا كان في مدينة تانية موثقة بسجلات فندق وشهادات مستقلة وقت الحادثة، ومفيش أي دليل رقمي أو مادي يربطه بالوصول لخط الإنتاج أو معدات المصنع. اتهامه كان مبني على منافسة تجارية عادية، مش على أي دليل فعلي.',
      questions:[
        { q:'شركتك في منافسة تجارية مع كيمتك، صح؟',
          a:'"أيوه، منافسة عادية في السوق، بس ده مش يعني إننا هنلجأ للتخريب. ده اتهام خطير من غير أي دليل."' },
        { q:'كان عندك أي وصول لخط الإنتاج أو معدات المصنع؟', unlockId:'ali_no_access',
          a:'"خالص، محدش من شركتنا له أي وصول لمنشآت كيمتك، ده غير منطقي أصلًا."' },
      ],
      confrontations:{}
    },
    {
      id:'worker_sayed', name:'سيد', role:'المهندس المناوب اللي حذّر من ارتفاع الضغط', img: IMG_BASE_BLASTMINUTES + 'sayed.jpg', avatarEmoji:'⚠️',
      alibi:'قال إنه كان في محطة المراقبة يتابع القراءات وقت الانفجار.',
      questions:[
        { q:'إنت اللي حذّرت من ارتفاع الضغط، صح؟', unlockId:'sayed_warning_confirmed',
          a:'"أيوه، لاحظت ارتفاع غير طبيعي في الضغط وبلّغت جمال فورًا، بس حسيت إن الموضوع اتاخد بجدية أقل من اللازم."' },
        { q:'إيه رد فعل جمال بالظبط لما بلّغته؟', requires:['sayed_warning_confirmed'],
          a:'"قال لي هيتصرف، بس محسيتش إن في أي إجراء فعلي اتخد بعدها. الوردية كملت عادي."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'blast_incident_report', tag:'من تقرير الحادثة', crit:false, title:'التقرير الأولي للانفجار', img:null,
      short:'التقرير الأولي يشير لاحتمال تخريب خارجي',
      full:'التقرير الأولي للانفجار بيشير لاحتمال تخريب متعمد من طرف خارجي، بناءً على توقيت الحادثة القريب من إعلان صفقة كبيرة للمصنع.',
      unlocked:true, order:1 },

    { id:'production_pressure_hint', tag:'من استجواب جمال', crit:false, title:'ضغط الإنتاج قبل الحادثة', img:null,
      short:'كان فيه ضغط كبير من الإدارة لزيادة الإنتاج بسرعة',
      full:'جمال أكد وجود ضغط كبير من الإدارة العليا لتلبية طلبية عاجلة كبيرة في وقت قياسي، قبل الحادثة مباشرة.',
      unlocked:false, order:2 },

    { id:'mounir_maintenance_suspicion', tag:'من استجواب منير', crit:true, title:'فجوة في سجلات الصيانة', img: IMG_BASE_BLASTMINUTES + 'evidence-maintenance-log.jpg',
      short:'سجلات الصيانة توثق فحص صمام الأمان رغم إنه كان متعطل فعليًا',
      full:'منير كشف فجوة خطيرة في سجلات الصيانة: صمام الأمان الرئيسي موثق إنه اتفحص وشغال، لكن بيانات التشغيل الفعلية بتوضح إنه كان متعطل وقت الحادثة.',
      unlocked:false, order:3 },

    { id:'gamal_warning_received', tag:'من استجواب جمال', crit:false, title:'استلام جمال لتحذير مسبق', img:null,
      short:'جمال استلم تحذير من مهندس مناوب قبل الانفجار',
      full:'جمال اعترف إنه استلم ملاحظة تحذيرية من مهندس مناوب بخصوص ارتفاع الضغط، لكنه قيّمها كحاجة عادية مش طارئة.',
      unlocked:false, order:4 },

    { id:'ali_no_access', tag:'من استجواب علي', crit:false, title:'عدم وصول المنافس للمنشأة', img:null,
      short:'الشركة المنافسة ماكانش عندها أي وصول لمعدات المصنع',
      full:'علي أكد إن شركته ماكانش عندها أي وصول لخط الإنتاج أو معدات مصنع كيمتك، سواء بشكل مباشر أو غير مباشر.',
      unlocked:false, order:5 },

    { id:'sayed_warning_confirmed', tag:'من استجواب سيد', crit:true, title:'تأكيد تحذير سيد المسبق', img:null,
      short:'سيد أكد إنه بلّغ جمال عن ارتفاع الضغط قبل الانفجار',
      full:'سيد أكد إنه لاحظ ارتفاع غير طبيعي في ضغط الخزان وبلّغ جمال فورًا، لكن محسّش بإجراء فعلي اتخد استجابة لتحذيره.',
      unlocked:false, order:6 },

    { id:'safety_valve_bypassed', tag:'من اعتراف جمال', crit:true, title:'تعطيل صمام الأمان بأمر مباشر', img: IMG_BASE_BLASTMINUTES + 'evidence-valve.jpg',
      short:'جمال اعترف بأمره بتعطيل صمام الأمان مؤقتًا لتجنب تأخير الإنتاج',
      full:'جمال اعترف إنه أمر بتعطيل صمام الأمان الرئيسي مؤقتًا عشان الإنتاج ميتأخرش عن الطلبية العاجلة، وده القرار اللي أدى مباشرة للانفجار.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن تأكيد جمال إنه "ماله أي قرار غير معتاد في الوردية" بأمره اللاحق بتعطيل صمام الأمان. فيه تناقض واضح بين الإنكار الأولي والاعتراف اللاحق.',
    resultText: 'التناقض واضح: جمال أنكر في البداية أي قرار غير معتاد، لكنه اعترف لاحقًا بأمره المباشر بتعطيل صمام الأمان — وده قرار غير معتاد بامتياز، ومخالف صريح لإجراءات السلامة.',
    resultEvidenceIds: ['safety_valve_bypassed'],
    statements: [
      { id:'st1', text:'"كنت بتابع سير العمل بشكل طبيعي، ومالوش أي قرار غير معتاد في الوردية."', source:'جمال — أول الاستجواب' },
      { id:'st2', text:'"أمرت بتعطيله مؤقتًا عشان الإنتاج ميتأخرش."', source:'جمال — لاحقًا في نفس الاستجواب' },
      { id:'st3', text:'"لاحظت ارتفاع غير طبيعي في الضغط وبلّغت جمال فورًا."', source:'سيد — في الاستجواب' },
      { id:'st4', text:'"محدش من شركتنا له أي وصول لمنشآت كيمتك."', source:'علي — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
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

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث',
    introText: 'رتب أحداث الوردية الليلية بالترتيب الصح، من بداية العمل لحد الانفجار، عشان توضح اللحظة اللي اتخد فيها القرار المميت.',
    events: [
      { id:'e1', text:'الوردية الليلية بتبدأ، خط الإنتاج شغال بكامل طاقته لتلبية الطلبية العاجلة.' },
      { id:'e2', text:'سيد بيلاحظ ارتفاع غير طبيعي في ضغط أحد الخزانات، ويبلّغ جمال فورًا.' },
      { id:'e3', text:'جمال بيقيّم التحذير كحاجة عادية، ويأمر بتعطيل صمام الأمان مؤقتًا عشان الإنتاج ميتأخرش.' },
      { id:'e4', text:'الضغط بيستمر في الارتفاع من غير أي تدخل تاني، والوردية بتكمل عادي.' },
      { id:'e5', text:'الانفجار بيحصل في خط الإنتاج، ويسيب إصابات وضرر مادي كبير.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'رتبت الأحداث صح. المسار بقى واضح: التحذير المبكر من سيد اتقيّم بشكل خاطئ، وقرار تعطيل صمام الأمان هو اللي فتح الطريق مباشرة للانفجار، مش أي تخريب خارجي.',
    resultEvidenceIds: ['safety_valve_bypassed'],
  },

  evidenceCombinations: [
    { parts:['mounir_maintenance_suspicion','gamal_warning_received'], resultId:'safety_valve_bypassed' },
  ],

  investigationActions: [
    {
      id:'crosscheck_valve_logs', kind:'مراجعة سجلات المعدات', label:'قارن سجل صيانة الصمام ببيانات التشغيل الفعلية',
      description:'راجع الفرق بين ما هو موثق في سجل الصيانة وما تسجله بيانات التشغيل الحقيقية.',
      requires:['mounir_maintenance_suspicion','sayed_warning_confirmed'], resultEvidenceIds:['safety_valve_bypassed'],
      successText:'المراجعة أكدت التناقض بين سجل الصيانة الموثق وبيانات التشغيل الفعلية للصمام.'
    },
  ],

  correctSuspectId: 'production_manager_gamal',
  conclusiveEvidenceIds: ['safety_valve_bypassed', 'mounir_maintenance_suspicion', 'sayed_warning_confirmed'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن جمال هو المسؤول عن الانفجار؟',
        options: [
          { id:'a', text:'اعترافه المباشر بأمره بتعطيل صمام الأمان + فجوة سجلات الصيانة اللي كشفها منير + تأكيد سيد لتحذيره المبكر اللي اتجوهر' },
          { id:'b', text:'لأنه مدير الإنتاج المسؤول عن الوردية وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير اعتراف مباشر بالقرار نفسه' },
          { id:'c', text:'لأنه كان متوتر وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotali',
        label:'ليه علي (ممثل الشركة المنافسة) كان بريء رغم إنه أول مشتبه فيه؟',
        options: [
          { id:'a', text:'حجة غيابه موثقة بسجلات مستقلة، ومفيش أي دليل يربطه بالوصول لخط الإنتاج أو معدات المصنع من قريب أو بعيد' },
          { id:'b', text:'لأنه ممثل شركة منافسة وده افتراض تجاري عام، مش نتيجة تحقيق فعلي في تحركاته الحقيقية ليلة الحادثة' },
          { id:'c', text:'لأنه رفض الاتهام بحدة وقت الاستجواب، وده سلوك دفاعي طبيعي بس مش إثبات مباشر على براءته' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'القرار اللي كلّف أكتر من الوقت',
      paragraphs:[
        'جمال، تحت ضغط الإدارة لتلبية طلبية عاجلة، أمر بتعطيل صمام الأمان الرئيسي مؤقتًا بعد ما استلم تحذير من سيد عن ارتفاع الضغط، ظنًا منه إنها خطوة مؤقتة آمنة. القرار ده أدى مباشرة للانفجار، مش أي تخريب من منافس خارجي.',
        'اللي قفل الدائرة كان اعترافه المباشر بتعطيل الصمام، وفجوة سجلات الصيانة اللي كشفها منير، وتأكيد سيد لتحذيره المبكر اللي اتجوهر من غير إجراء فعلي.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية جمال، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي رواية "التخريب الخارجي".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: اعتراف تعطيل الصمام، فجوة سجلات الصيانة، وتحذير سيد المسبق، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والمسؤول الحقيقي فضل يدير الوردية وكأن حاجة ماحصلتش. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "دقائق قبل الانفجار"

   الغلاف (cover.webp):
   "Photorealistic shot of an industrial chemical factory exterior
   at night with warning lights, documentary photography style, no
   text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of workers operating a busy industrial
   production line at night, photorealistic, no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of an engineer looking concerned at a
   pressure gauge control panel, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic dramatic shot of workers running from smoke and
   debris after an industrial explosion, photorealistic, no text, no
   watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a safety engineer reviewing maintenance
   documents at a desk with factory windows in background,
   photorealistic, no text, no watermark"

   الشخصيات:

   جمال (gamal.jpg):
   "Photorealistic portrait of a middle-aged Egyptian factory
   production manager, hard hat, stressed expression, photorealistic,
   no text, no watermark"

   منير (mounir.jpg):
   "Photorealistic portrait of a professional Egyptian safety
   engineer, hard hat and safety vest, photorealistic, no text, no
   watermark"

   علي (ali.jpg):
   "Photorealistic portrait of a confident Egyptian businessman in a
   suit, photorealistic, no text, no watermark"

   سيد (sayed.jpg):
   "Photorealistic portrait of a young Egyptian factory engineer in
   a safety vest, concerned expression, photorealistic, no text, no
   watermark"

   أدلة:
   evidence-maintenance-log.jpg: "Photorealistic close-up of an
   industrial maintenance logbook with checkmarks and timestamps,
   photorealistic, no text, no watermark"
   evidence-valve.jpg: "Photorealistic close-up of an industrial
   safety valve control mechanism, photorealistic, no text, no
   watermark"
   ============================================================ */
