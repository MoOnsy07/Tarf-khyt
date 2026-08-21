/* ============================================================
   بيانات قضية: الجرس الأخير
   قضية قتل/فساد — مدرّس بيموت في فسحة المدرسة بعد ما يهدد
   يفضح شبكة غش منظمة في امتحانات الثانوية العامة.
   ============================================================ */

const IMG_BASE_LASTBELL = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-bell/';

const CASE_LAST_BELL = {
  id: 'last-bell',
  title: 'الجرس الأخير',
  caseNo: 'CASE 048',
  subtitle: 'مدرسة ثانوية حكومية',
  coverImg: IMG_BASE_LASTBELL + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 33,
  investigationPoints: 19,
  teaser: 'مدرّس رياضيات بيكتشف شبكة غش منظمة بتسرّب امتحانات الثانوية العامة مقابل فلوس، وبعد ما يهدد يبلغ عنها، بيتلاقى مقتول في فسحة المدرسة.',

  isPremium: false,
  categories: ['murder', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTBELL + 'cover.webp',
    heroCaption: 'CASE 048 — فسحة الظهر',
    text1: 'المدرّس "سعد" لاحظ نمط غريب في نتائج امتحانات تجريبية لمجموعة معينة من الطلاب، وبعد تحقيقه الشخصي اكتشف شبكة منظمة بتسرّب أسئلة الامتحانات الفعلية مقابل مبالغ كبيرة. هدد إنه هيبلغ الإدارة التعليمية رسميًا.',
    text2: 'بعد يومين من التهديد، سعد اتلاقى مقتول في فسحة المدرسة خلال وقت الظهر المزدحم. مدير المدرسة طلب منك تحقق بسرعة وسرية قبل ما الفضيحة تتسرب وتؤثر على سمعة المدرسة قبل موسم الامتحانات.',
    meta: [
      { label:'المجني عليه', value:'سعد — مدرّس رياضيات' },
      { label:'الاكتشاف', value:'شبكة تسريب امتحانات منظمة' },
      { label:'مكان الحادثة', value:'فسحة المدرسة، وقت الظهر' },
      { label:'طلب التحقيق', value:'مدير المدرسة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاكتشاف',
      img: IMG_BASE_LASTBELL + 'bell-scene1.jpg',
      text:'سعد بيراجع نتائج امتحانات تجريبية في مكتبه، ويلاحظ نمط غريب في إجابات مجموعة معينة من الطلاب.'
    },
    {
      scene:'المشهد ٢ — التهديد',
      img: IMG_BASE_LASTBELL + 'bell-scene2.jpg',
      text:'سعد بيقابل مدير المدرسة ويهدده إنه هيبلغ الإدارة التعليمية عن شبكة التسريب لو محدش تعامل مع الموضوع.'
    },
    {
      scene:'المشهد ٣ — الفسحة',
      img: IMG_BASE_LASTBELL + 'bell-scene3.jpg',
      text:'فسحة الظهر مزدحمة بالطلاب، سعد بيمشي في فناء المدرسة، وبعد شوية بيتلاقى مقتول في زاوية هادية.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_LASTBELL + 'bell-scene4.jpg',
      text:'مدير المدرسة بيديك صلاحية تراجع سجلات الدرجات المشبوهة، وقائمة أعضاء الهيئة التدريسية القريبين من سعد.'
    },
  ],

  suspects: [
    {
      id:'principal_gamal_l', name:'جمال', role:'مدير المدرسة، طلب التحقيق', img: IMG_BASE_LASTBELL + 'gamal_l.jpg', avatarEmoji:'🏫',
      accusable:true,
      alibi:'قال إنه كان في مكتبه طول وقت الفسحة.',
      questions:[
        { q:'تهديد سعد كان هيأثر عليك إزاي؟',
          a:'"كان هيدمر سمعة المدرسة كلها لو انكشف قبل الامتحانات، وممكن يوصل لتحقيق رسمي معايا شخصيًا."' },
        { q:'كان عندك دخل من شبكة التسريب دي؟', unlockId:'gamal_l_involvement',
          a:'(بيتردد) "كنت عارف بوجودها، وبصراحة كنت بستفيد ماليًا من غض الطرف عنها."' },
      ]
    },
    {
      id:'teacher_wael', name:'وائل', role:'مدرّس آخر، مسؤول فعلي عن شبكة التسريب', img: IMG_BASE_LASTBELL + 'wael.jpg', avatarEmoji:'📄',
      alibi:'قال إنه كان في الفصل بيصحح كراسات طول الفسحة.',
      questions:[
        { q:'علاقتك بسعد كانت مستقرة في الفترة الأخيرة؟', unlockId:'wael_tension',
          a:'"كان بينا توتر بسبب أسئلة كتير كان بيسألها عن نتائج بعض الطلاب."' },
        { q:'إنت المسؤول عن تسريب الأسئلة؟', requires:['wael_tension'], unlockId:'wael_scheme',
          a:'(بيتلعثم) "كنت بساعد بعض أولياء الأمور مقابل مبلغ، كنت محتاج الفلوس دي بشدة."' },
      ]
    },
    {
      id:'parent_hoda', name:'هدى', role:'ولية أمر طالب، دفعت مبالغ كبيرة للتسريب', img: IMG_BASE_LASTBELL + 'hoda.jpg', avatarEmoji:'👜',
      alibi:'قالت إنها كانت في زيارة قصيرة للمدرسة وقت الفسحة عشان تسلم مستندات.',
      questions:[
        { q:'ليه كنتِ في المدرسة وقت الفسحة بالذات؟', unlockId:'hoda_presence',
          a:'"جيت أسلم مستندات لابني، توقيت عادي، مفيش أي حاجة غريبة."' },
        { q:'دفعتِ فلوس لحد في المدرسة عشان تساعدي ابنك في الامتحانات؟', requires:['hoda_presence'], unlockId:'hoda_payment',
          a:'(بتتردد) "دفعت مبلغ لوائل عشان يساعد ابني، خفت مستقبله يضيع بسبب امتحان واحد."' },
      ]
    },
    {
      id:'janitor_am_rateb', name:'عم راتب', role:'فراش المدرسة القديم', img: IMG_BASE_LASTBELL + 'am_rateb.jpg', avatarEmoji:'🧹',
      alibi:'قال إنه كان بينظف الفناء زي كل يوم.',
      questions:[
        { q:'لاحظت أي حاجة غريبة وقت الفسحة؟', unlockId:'rateb_observation',
          a:'"شفت وائل بيتكلم مع سعد بشكل متوتر جدًا في زاوية هادية قبل الحادثة بدقايق."' },
        { q:'شفت حد بيلمس أو يقرب من مكان الحادثة بعد كده؟', requires:['rateb_observation'],
          a:'"لأ، الفسحة كانت مزدحمة جدًا، صعب أراقب كل حاجة."' },
      ]
    },
  ],

  evidence: [
    { id:'exam_pattern_records', tag:'من سجلات الدرجات', crit:true, title:'نمط غريب في الدرجات', img: IMG_BASE_LASTBELL + 'bell-records.jpg',
      short:'نتائج امتحانات تجريبية بنمط إجابات متطابق لمجموعة طلاب',
      full:'سجلات الدرجات بتوضح نمط إجابات متطابق بشكل غير طبيعي لمجموعة معينة من الطلاب، وده كان أساس اكتشاف سعد للشبكة.',
      unlocked:true, order:1 },

    { id:'gamal_l_involvement', tag:'من استجواب جمال', crit:true, title:'تورط جمال المالي', img:null,
      short:'جمال كان عارف بالشبكة ومستفيد ماليًا منها',
      full:'جمال اعترف بمعرفته بشبكة التسريب واستفادته الشخصية ماليًا من غض الطرف عنها.',
      unlocked:false, order:2 },

    { id:'wael_tension', tag:'من استجواب وائل', crit:false, title:'توتر بين وائل وسعد', img:null,
      short:'وائل وسعد كانوا في توتر بسبب أسئلة متكررة',
      full:'وائل اعترف بوجود توتر بينه وبين سعد بسبب أسئلة متكررة كان سعد بيسألها عن نتائج بعض الطلاب.',
      unlocked:false, order:3 },

    { id:'wael_scheme', tag:'من استجواب وائل', crit:true, title:'اعتراف وائل بالتسريب', img:null,
      short:'وائل معترف إنه مسؤول عن شبكة التسريب مقابل فلوس',
      full:'وائل اعترف إنه المسؤول الفعلي عن شبكة تسريب الأسئلة مقابل مبالغ مالية من أولياء الأمور.',
      unlocked:false, order:4 },

    { id:'hoda_presence', tag:'من استجواب هدى', crit:false, title:'وجود هدى وقت الحادثة', img:null,
      short:'هدى كانت في المدرسة وقت الفسحة لتسليم مستندات',
      full:'هدى أكدت وجودها في المدرسة وقت الفسحة لتسليم مستندات لابنها، بشكل يبدو عادي في الظاهر.',
      unlocked:false, order:5 },

    { id:'hoda_payment', tag:'من استجواب هدى', crit:false, title:'دفعة مالية لوائل', img:null,
      short:'هدى دفعت مبلغ لوائل عشان يساعد ابنها',
      full:'هدى اعترفت بدفع مبلغ مالي لوائل عشان يساعد ابنها في الامتحانات، بس أنكرت أي علاقة بمقتل سعد.',
      unlocked:false, order:6 },

    { id:'rateb_observation', tag:'من استجواب عم راتب', crit:true, title:'نقاش متوتر بين وائل وسعد', img: IMG_BASE_LASTBELL + 'bell-witness.jpg',
      short:'عم راتب شاف وائل وسعد بيتناقشوا بتوتر قبل الحادثة بدقايق',
      full:'عم راتب أكد إنه شاف وائل وسعد بيتناقشوا بشكل متوتر جدًا في زاوية هادية من فناء المدرسة قبل الحادثة بدقايق قليلة.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق مدفوعات مشبوهة',
    introText: 'راجع سجل تحويلات مالية صغيرة متكررة لأولياء أمور مختلفين، ودوّر على الحساب اللي بيستقبل كل المبالغ دي وبيربطهم بشبكة التسريب.',
    resultText: 'لقيت الحساب! كل المبالغ بتتجمع في حساب شخصي باسم وائل، مدرّس المدرسة.',
    ledgerRows: [
      { account:'حساب أ', name:'دفعة ولي أمر 1', amount:'3,000', suspicious:true },
      { account:'حساب ب', name:'مصاريف مدرسية عادية', amount:'500', suspicious:false },
      { account:'حساب ج', name:'دفعة ولي أمر 2', amount:'3,500', suspicious:true },
      { account:'حساب د', name:'رسوم أنشطة', amount:'200', suspicious:false },
    ],
    correctAccountId: 'حساب أ',
    linkedSuspectId: 'teacher_wael',
    resultEvidenceIds: ['wael_scheme'],
  },

  evidenceCombinations: [
    { parts:['hoda_payment','wael_tension'], resultId:'rateb_observation' },
  ],

  correctSuspectId: 'teacher_wael',
  conclusiveEvidenceIds: ['wael_scheme', 'rateb_observation', 'exam_pattern_records'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن وائل هو الفاعل؟',
        options: [
          { id:'a', text:'اعترافه بإدارة شبكة التسريب + شهادة عم راتب اللي أكدت نقاشهم المتوتر قبل الحادثة بدقايق + نمط الدرجات المشبوه اللي كشفه سعد أصلاً' },
          { id:'b', text:'لأنه مدرّس زميل وده يكفي كدافع' },
          { id:'c', text:'لأن جمال مدير المدرسة كان مستفيد أكتر ماليًا' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية وائل الحقيقية؟',
        options: [
          { id:'a', text:'حاول يقنع سعد يسكت عن الاكتشاف في نقاش أخير خلال الفسحة، لكن سعد رفض بشدة وأصرّ على الإبلاغ، والموقف اتصعّد فجأة لعنف قاتل غير مخطط له' },
          { id:'b', text:'كان مخطط لقتله من البداية عشان يحمي مصدر دخله' },
          { id:'c', text:'كان بيحاول يحمي جمال المدير بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الجرس اللي فضح الشبكة',
      paragraphs:[
        'وائل كان بيدير شبكة تسريب امتحانات مقابل مبالغ كبيرة من أولياء الأمور، بعلم مدير المدرسة اللي كان بياخد نصيب من الأرباح مقابل غض الطرف. لما سعد اكتشف النمط الغريب في الدرجات وهدد بالإبلاغ، حاول وائل يقنعه يسكت في نقاش أخير خلال فسحة الظهر، لكن سعد رفض بشدة، والموقف اتصعّد فجأة.',
        'اعتراف وائل بإدارته لشبكة التسريب، وشهادة عم راتب اللي أكدت نقاشهم المتوتر قبل الحادثة بدقايق قليلة، ونمط الدرجات المشبوه اللي كشفه سعد أصلاً، كلها أدلة حاصرته وأثبتت مسؤوليته الكاملة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية وائل، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: اعترافه بالشبكة، شهادة عم راتب، ونمط الدرجات، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى سعد فضلت مرتبطة بجريمة مالهاش فاعل حقيقي معروف، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الجرس الأخير"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty school courtyard at midday,
   scattered papers on the ground, documentary photography style,
   no text, no watermark, photorealistic"

   المشهد ١ (bell-scene1.jpg):
   "Photorealistic shot of a teacher reviewing exam papers at a desk
   in a classroom, focused concerned expression, daylight,
   photorealistic, no text, no watermark"

   المشهد ٢ (bell-scene2.jpg):
   "Photorealistic shot of a tense conversation between two men in a
   school principal's office, formal office lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (bell-scene3.jpg):
   "Photorealistic wide shot of a crowded school courtyard during
   recess, students in the background, daylight, photorealistic, no
   text, no watermark"

   المشهد ٤ (bell-scene4.jpg):
   "Photorealistic shot of a school principal handing documents to
   an investigator in an office, formal daylight office lighting,
   photorealistic, no text, no watermark"

   جمال (gamal_l.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male school
   principal, formal suit, authoritative nervous expression,
   standing in a school office, formal lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   وائل (wael.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male teacher,
   formal casual outfit, guarded evasive expression, standing in a
   classroom, daylight, candid documentary photography style, no
   text, no watermark, photorealistic"

   هدى (hoda.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman, elegant
   formal outfit, anxious guarded expression, standing in a school
   hallway, daylight, candid documentary photography style, no text,
   no watermark, photorealistic"

   عم راتب (am_rateb.jpg):
   "Photorealistic portrait of an elderly Egyptian male school
   janitor, simple work uniform, watchful humble expression,
   standing in a school courtyard with a broom, daylight, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل السجلات (bell-records.jpg):
   "Photorealistic close-up of exam score records on paper with
   highlighted matching patterns, clinical office lighting, no text,
   no watermark, photorealistic"

   دليل الشاهد (bell-witness.jpg):
   "Photorealistic shot of an elderly janitor watching quietly from
   a school courtyard corner, daylight, documentary photography
   style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_LAST_BELL;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'wael_money_trail', tag:'من تدقيق الحسابات', crit:true, title:'الفلوس بتوصل لحساب وائل', img:null,
    short:'المدفوعات المرتبطة بالتسريب بتتجمع في حساب شخصي باسم وائل',
    full:'تدقيق المدفوعات كشف إن المبالغ الخارجة من أولياء الأمور بتتجمع في حساب شخصي باسم وائل، وده بيربطه ماليًا بالشبكة بشكل مباشر.', unlocked:false, order:90 });
  c.ledgerAuditPuzzle.resultEvidenceIds = ['wael_money_trail'];
  c.conclusiveEvidenceIds = ['wael_scheme','rateb_observation','wael_money_trail'];
  const w=c.suspects.find(s=>s.id==='teacher_wael');
  if(w && !w.questions.some(q=>q.closesInterrogation)) w.questions.push({
    q:'المدفوعات بتوصل لحسابك، وعم راتب شافك بتواجه سعد قبل الحادثة بدقايق. حصل إيه بينكم؟',
    requires:['wael_scheme','rateb_observation','wael_money_trail'], closesInterrogation:true,
    a:'(بيسكت) "حاولت أقنع سعد يأجل البلاغ ويديني فرصة أقفل الموضوع. هو رفض وأصر يطلع للمديرية، والنقاش اتصعّد في لحظة ماكنتش مخطط لها."'
  });
  setTheory0('تدقيق الحسابات اللي وصل فلوس الشبكة لحساب وائل + شهادة عم راتب على المواجهة قبل الحادثة + اعتراف وائل نفسه بإدارة التسريب');
  c.endings.good.paragraphs[1] = 'مسار الفلوس اللي وصل مباشرة لحساب وائل، وشهادة عم راتب على المواجهة اللي حصلت قبل الحادثة بدقايق، واعتراف وائل بإدارة شبكة التسريب، حوّلوا القضية من شبهة غش لمواجهة مثبتة انتهت بالجريمة.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: مسار الفلوس، اعتراف وائل بالشبكة، وشهادة عم راتب، قبل ما تتهم.';

})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LAST_BELL;
  c.evidenceCombinations = [];
  const w = c.suspects.find(s => s.id === 'teacher_wael');
  if (w) {
    const q = w.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "اتخانقنا فعلًا لأني كنت عايزه يأجل البلاغ، لكن سيبته ومشيت. الفلوس والشجار يثبتوا إني متورط في شبكة التسريب، مش إنهم يثبتوا القتل لوحدهم."';
    }
  }
  if (c.evidence.some(e => e.id === 'wael_money_trail')) {
    c.conclusiveEvidenceIds = ['wael_scheme','rateb_observation','wael_money_trail','exam_pattern_records'];
    c.conclusiveRequired = 4;
  } else {
    c.conclusiveEvidenceIds = ['wael_scheme','rateb_observation','exam_pattern_records'];
    c.conclusiveRequired = 3;
  }
})();
