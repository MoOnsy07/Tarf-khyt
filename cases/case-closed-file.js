/* ============================================================
   بيانات قضية: ملف مغلق
   قضية قتل — ضابط شرطة متقاعد بيتقتل وهو بيحاول يفتح من
   جديد قضية قديمة اتقفلت غلط من سنين طويلة.
   ============================================================ */

const IMG_BASE_CLOSEDFILE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/closed-file/';

const CASE_CLOSED_FILE = {
  id: 'closed-file',
  title: 'ملف مغلق',
  caseNo: 'CASE 051',
  subtitle: 'بيت الضابط المتقاعد، حي هادي',
  coverImg: IMG_BASE_CLOSEDFILE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 39,
  investigationPoints: 22,
  teaser: 'ضابط شرطة متقاعد بيتقتل في بيته وهو بيحاول يفتح من جديد قضية قديمة كان مقتنع طول حياته إنها اتقفلت غلط. الملف القديم نفسه هو مفتاح الجريمة الجديدة.',

  isPremium: false,
  categories: ['murder', 'coldcase'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_CLOSEDFILE + 'cover.webp',
    heroCaption: 'CASE 051 — بعد التقاعد بخمس سنين',
    text1: 'الضابط المتقاعد "فتحي" كان مقتنع طول مسيرته إن قضية قتل قديمة اتقفلت غلط قبل ما يتقاعد، وبعد التقاعد فضل يحقق فيها بشكل شخصي. بدأ يجمع أدلة جديدة، وبعد أسبوعين من إعلانه لأصدقائه القدامى إنه قرّب يوصل للحقيقة، اتقتل في بيته.',
    text2: 'ابنته طلبت منك تحقق في مقتل أبوها، وربطه المحتمل بالقضية القديمة اللي كان بيحقق فيها. عندك ملف القضية القديمة كامل، وقائمة الأشخاص المرتبطين بيها من زمان ولسه أحياء.',
    meta: [
      { label:'المجني عليه', value:'فتحي — ضابط شرطة متقاعد' },
      { label:'القضية القديمة', value:'جريمة قتل اتقفلت من سنين كحادثة عادية' },
      { label:'الدافع المحتمل', value:'إعادة فتح القضية القديمة' },
      { label:'طلب التحقيق', value:'ابنة فتحي' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الملف القديم',
      img: IMG_BASE_CLOSEDFILE + 'file-scene1.jpg',
      text:'فتحي بيقعد في مكتبه المنزلي، محاط بمستندات قديمة وصور من قضية اتقفلت من سنين طويلة.'
    },
    {
      scene:'المشهد ٢ — الإعلان',
      img: IMG_BASE_CLOSEDFILE + 'file-scene2.jpg',
      text:'فتحي بيقابل صديق قديم من زمايل الشغل، بيقوله بثقة إنه قرّب يوصل لدليل حاسم في القضية القديمة.'
    },
    {
      scene:'المشهد ٣ — الجريمة',
      img: IMG_BASE_CLOSEDFILE + 'file-scene3.jpg',
      text:'ابنة فتحي بتلاقي أبوها مقتول في مكتبه، والمستندات القديمة اللي كان بيراجعها مبعثرة على الأرض.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_CLOSEDFILE + 'file-scene4.jpg',
      text:'ابنة فتحي بتديك ملف القضية القديمة كامل، وقائمة الأشخاص المرتبطين بيها من زمان.'
    },
  ],

  suspects: [
    {
      id:'old_suspect_hamed', name:'حامد', role:'المشتبه به الأساسي في القضية القديمة', img: IMG_BASE_CLOSEDFILE + 'hamed.jpg', avatarEmoji:'📁',
      alibi:'قال إنه كان في بيته وقت مقتل فتحي.',
      questions:[
        { q:'علاقتك بالقضية القديمة كانت إيه بالظبط؟', unlockId:'hamed_old_case',
          a:'"اتهموني وقتها بس ما ثبتش عليّ حاجة رسميًا، القضية اتقفلت من غير إدانة."' },
        { q:'كنت عارف إن فتحي بيحقق تاني في القضية؟', requires:['hamed_old_case'], unlockId:'hamed_knew_reopening',
          a:'(بيتردد) "سمعت إشاعات، طبعًا ده قلقني، حياتي كلها اتبنت على إن الموضوع ده اتقفل."' },
      ]
    },
    {
      id:'former_colleague_nasser', name:'ناصر', role:'زميل فتحي القديم في الشرطة', img: IMG_BASE_CLOSEDFILE + 'nasser.jpg', avatarEmoji:'👮',
      alibi:'قال إنه كان في اجتماع رسمي وقت مقتل فتحي.',
      questions:[
        { q:'دورك في القضية القديمة كان إيه؟', unlockId:'nasser_old_role',
          a:'"كنت المحقق المسؤول وقتها، وأنا اللي قفلت الملف بقرار رسمي بناءً على الأدلة المتاحة."' },
        { q:'إعادة فتح القضية كانت هتأثر على سمعتك المهنية؟', requires:['nasser_old_role'], unlockId:'nasser_reputation_risk',
          a:'(بيتوتر) "لو طلع إني قفلت القضية غلط، ده كان هيأثر على تقاعدي ومعاشي بشكل كبير."' },
      ]
    },
    {
      id:'victim_family_laila_f', name:'ليلى', role:'أخت ضحية القضية القديمة', img: IMG_BASE_CLOSEDFILE + 'laila_f.jpg', avatarEmoji:'🕯️',
      alibi:'قالت إنها كانت متحمسة جدًا لإعادة فتح القضية، مش ليها مصلحة تأذي فتحي.',
      questions:[
        { q:'علاقتك بفتحي كانت إيه في السنين الأخيرة؟', unlockId:'laila_f_relationship',
          a:'"كان بيساعدني أوصل للحقيقة اللي انحرمت منها لعقود، كنت ممتنة له جدًا."' },
        { q:'كنتِ عارفة تفاصيل الدليل الجديد اللي كان بيجمعه؟', requires:['laila_f_relationship'],
          a:'"شوية تفاصيل بس، كان بيحافظ على السرية لحد ما يتأكد تمامًا."' },
      ]
    },
    {
      id:'hamed_son_tarek_f', name:'طارق', role:'ابن حامد، المشتبه به القديم', img: IMG_BASE_CLOSEDFILE + 'tarek_f.jpg', avatarEmoji:'🔒',
      alibi:'قال إنه كان بره المدينة وقت مقتل فتحي.',
      questions:[
        { q:'علاقتك بأبوك حامد كانت متأثرة بالقضية القديمة؟', unlockId:'tarek_f_family_burden',
          a:'"طول حياتي وأنا عايش تحت ظل شكوك الناس في أبويا، ده دمر سمعة العيلة كلها."' },
        { q:'شاهد أكد إنك كنت في المدينة وقت الجريمة، مش بره زي ما قلت — عايز تفسر؟', requires:['tarek_f_family_burden','hamed_knew_reopening','nasser_reputation_risk'], closesInterrogation:true,
          a:'(بيصمت طويل) "أيوه كنت في المدينة، وروحت لفتحي عشان أقنعه يوقف فتح الملف. اتخانقنا بالكلام، بس سيبته حي ومشيت. لو عندكم دليل غير كده هاتوه."' },
      ]
    },
  ],

  evidence: [
    { id:'old_case_file', tag:'من ملف القضية القديمة', crit:false, title:'ملف القضية القديمة الكامل', img: IMG_BASE_CLOSEDFILE + 'file-old.jpg',
      short:'تفاصيل قضية قتل اتقفلت من سنين طويلة كحادثة عادية',
      full:'الملف القديم بيوضح إن القضية اتقفلت وقتها من غير إدانة واضحة، رغم شكوك كتير حوالين المشتبه به الأساسي حامد.',
      unlocked:true, order:1 },

    { id:'hamed_old_case', tag:'من استجواب حامد', crit:false, title:'اتهام حامد القديم', img:null,
      short:'حامد كان المشتبه به الأساسي بس ما ثبتش عليه حاجة',
      full:'حامد أكد إنه كان المشتبه به الأساسي في القضية القديمة، بس القضية اتقفلت من غير إدانة رسمية.',
      unlocked:false, order:2 },

    { id:'hamed_knew_reopening', tag:'من استجواب حامد', crit:true, title:'قلق حامد من إعادة الفتح', img:null,
      short:'حامد كان قلقان جدًا من إعادة فتح القضية',
      full:'حامد اعترف بقلقه الشديد من إعادة فتح القضية بعد ما بنى حياة كاملة على إغلاقها.',
      unlocked:false, order:3 },

    { id:'nasser_old_role', tag:'من استجواب ناصر', crit:false, title:'دور ناصر في إغلاق القضية', img:null,
      short:'ناصر هو اللي قفل القضية بقرار رسمي وقتها',
      full:'ناصر أكد إنه كان المحقق المسؤول عن القضية القديمة، وإنه هو اللي اتخذ قرار إغلاقها بناءً على الأدلة المتاحة وقتها.',
      unlocked:false, order:4 },

    { id:'nasser_reputation_risk', tag:'من استجواب ناصر', crit:true, title:'خطر على سمعة ناصر المهنية', img:null,
      short:'إعادة الفتح كانت هتأثر على معاش ناصر وسمعته',
      full:'ناصر اعترف إن إعادة فتح القضية وكشف خطأ محتمل في قراره القديم كان هيأثر بشكل خطير على معاشه وسمعته المهنية.',
      unlocked:false, order:5 },

    { id:'laila_f_relationship', tag:'من استجواب ليلى', crit:false, title:'امتنان ليلى لفتحي', img:null,
      short:'ليلى كانت ممتنة جدًا لمساعدة فتحي',
      full:'ليلى أكدت امتنانها الكبير لفتحي على مساعدته المستمرة في محاولة الوصول لحقيقة قضية أختها القديمة.',
      unlocked:false, order:6 },

    { id:'tarek_f_family_burden', tag:'من استجواب طارق', crit:true, title:'عبء العيلة على طارق', img:null,
      short:'طارق عاش طول حياته تحت ظل شكوك القضية القديمة',
      full:'طارق اعترف إنه عاش طول حياته تحت وطأة شكوك الناس في أبوه، وده دمر سمعة العيلة كاملة لعقود.',
      unlocked:false, order:7 },

    { id:'witness_tarek_f_seen', tag:'من شهادة جار فتحي', crit:true, title:'طارق شوهد قريب من بيت فتحي', img: IMG_BASE_CLOSEDFILE + 'file-witness.jpg',
      short:'جار أكد رؤية طارق قريب من بيت فتحي ليلة الجريمة',
      full:'جار فتحي أكد إنه شاف طارق قريب من البيت في نفس ليلة الجريمة، رغم إنه ادّعى إنه كان بره المدينة تمامًا.',
      unlocked:false, order:8 },
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
  audioPuzzle: { enabled:false },

  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق ملف القضية القديمة',
    introText: 'راجع ملاحظات فتحي القديمة والجديدة جنب بعض، وحدد مين من المرتبطين بالقضية القديمة رجع اسمه يظهر بشكل غير معتاد في الأسابيع الأخيرة.',
    resultText: 'ملاحظات فتحي الأخيرة بتبين إن طارق رجع يظهر أكتر من مرة في مسار التحقيق الجديد. دي قرينة تبرر مراجعة تحركاته، مش إدانة لوحدها.',
    ledgerRows: [
      { account:'ملاحظة 1', name:'حامد - المشتبه الأساسي', amount:'قديم', suspicious:false },
      { account:'ملاحظة 2', name:'طارق - زيارات متكررة', amount:'جديد', suspicious:true },
      { account:'ملاحظة 3', name:'ناصر - قرار الإغلاق', amount:'قديم', suspicious:false },
      { account:'ملاحظة 4', name:'ليلى - شاهدة داعمة', amount:'جديد', suspicious:false },
    ],
    correctAccountId: 'ملاحظة 2',
    linkedSuspectId: 'hamed_son_tarek_f',
    resultEvidenceIds: ['tarek_f_family_burden'],
  },

  handwritingPuzzle: {
    enabled: true,
    tabLabel: 'تحليل ملاحظات فتحي',
    introText: 'قارن آخر ملاحظة كتبها فتحي بخط يده المرتجف قبل مقتله مباشرة بعينات خط المشتبه بيهم، ودوّر على أي تلميح لهوية الزائر الأخير.',
    resultText: 'الملاحظة الأخيرة تشير إن فتحي كان مستني زيارة مرتبطة بعيلة حامد قبل الحادثة. لازم تتقارن بالشهادة والتحركات قبل تحديد هوية الزائر.',
    referenceSignature: { angle: 20, pressure: 'heavy', spacing: 'wide' },
    willSignature: { angle: 20, pressure: 'heavy', spacing: 'wide' },
    discrepancyPoints: [],
    correctSuspectId: 'hamed_son_tarek_f',
    resultEvidenceIds: ['witness_tarek_f_seen'],
  },

  evidenceCombinations: [
    { parts:['hamed_knew_reopening','tarek_f_family_burden'], resultId:'tarek_f_family_burden' },
  ],

  correctSuspectId: 'hamed_son_tarek_f',
  conclusiveEvidenceIds: ['tarek_f_family_burden', 'witness_tarek_f_seen', 'hamed_knew_reopening'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن طارق هو الفاعل؟',
        options: [
          { id:'a', text:'شهادة الجار اللي أثبتت وجوده قريب من بيت فتحي ليلة الجريمة + ملاحظات فتحي الأخيرة اللي بتذكر اسمه + عبء العيلة الثقيل اللي عاشه طول حياته بسبب القضية القديمة' },
          { id:'b', text:'لأن أبوه كان المشتبه به الأساسي وده يكفي' },
          { id:'c', text:'لأن ناصر كان أكتر مستفيد من إغلاق القضية' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية طارق الحقيقية؟',
        options: [
          { id:'a', text:'رفض يشوف عيلته تتحطم تاني بشكوك قديمة، فراح يقابل فتحي بنية إقناعه يوقف تحقيقه الجديد، لكن النقاش اتصعّد لعنف غير مخطط له' },
          { id:'b', text:'كان مخطط للقتل من البداية عشان يحمي أبوه' },
          { id:'c', text:'كان بيحاول يساعد فتحي في التحقيق فعليًا' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الملف اللي رفض يفضل مغلق',
      paragraphs:[
        'طارق عاش طول حياته تحت وطأة شكوك الناس في أبوه حامد، والقضية القديمة دمرت سمعة عيلته لعقود. لما عرف إن فتحي قرّب يوصل لدليل حاسم جديد، خاف يشوف العيلة تتحطم تاني، فراح يقابله بنية إقناعه يوقف التحقيق. النقاش اتصعّد لعنف غير مخطط له.',
        'شهادة جار فتحي اللي أثبتت وجود طارق قريب من البيت ليلة الجريمة، وملاحظات فتحي الأخيرة اللي كانت بتذكر اسمه بشكل صريح، وعبء العيلة الثقيل اللي عاشه طارق طول حياته، كلها أدلة حاصرته وكشفت إن القضية القديمة والجديدة مرتبطين ببعض بشكل مأساوي.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية طارق، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: شهادة الجار، ملاحظات فتحي الأخيرة، وعبء العيلة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط تاني',
      paragraphs:[
        'اتهمت {wrongName}، والقضية القديمة فضلت بلا حل، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "ملف مغلق"

   الغلاف (cover.webp):
   "Photorealistic shot of an old home office desk covered with
   scattered case files and photographs, warm desk lamp lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (file-scene1.jpg):
   "Photorealistic shot of an elderly man reviewing old case
   documents at a cluttered desk, warm desk lamp lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (file-scene2.jpg):
   "Photorealistic shot of two elderly men talking seriously at a
   cafe table, natural daylight, photorealistic, no text, no
   watermark"

   المشهد ٣ (file-scene3.jpg):
   "Photorealistic dramatic shot of scattered documents on a home
   office floor, warm dim lighting, forensic evidence photography
   style, no text, no watermark"

   المشهد ٤ (file-scene4.jpg):
   "Photorealistic shot of a woman handing an old case file to an
   investigator in a living room, warm indoor lighting,
   photorealistic, no text, no watermark"

   حامد (hamed.jpg):
   "Photorealistic portrait of an elderly Egyptian man, simple
   casual outfit, guarded anxious expression, sitting in a living
   room, soft natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   ناصر (nasser.jpg):
   "Photorealistic portrait of an elderly Egyptian man, formal
   retired police attire, tense composed expression, standing in an
   office, formal lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   ليلى (laila_f.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman, simple
   formal outfit, sorrowful hopeful expression, sitting in a living
   room, soft natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   طارق (tarek_f.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   outfit, tense burdened expression, standing outside a house,
   natural daylight, candid documentary photography style, no text,
   no watermark, photorealistic"

   دليل الملف القديم (file-old.jpg):
   "Photorealistic close-up of an old worn case file folder with
   yellowed documents and photographs, warm desk lamp lighting, no
   text, no watermark, photorealistic"

   دليل الشاهد (file-witness.jpg):
   "Photorealistic shot of a neighbor watching from a window at
   night, dim street light outside, documentary photography style,
   no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_CLOSED_FILE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'fathy_notes_tarek', tag:'من تدقيق ملف فتحي', crit:true, title:'اسم طارق بيتكرر في الملاحظات', img:null,
    short:'ملاحظات فتحي الجديدة بتكرر اسم طارق أكتر من مرة',
    full:'تدقيق ملف فتحي بيكشف إن اسم طارق ظهر بشكل متكرر في الملاحظات الجديدة، وخصوصًا في الأيام الأخيرة قبل مقتله.', unlocked:false, order:90 });
  addEvidence({ id:'fathy_last_note_tarek', tag:'من آخر ملاحظة لفتحي', crit:true, title:'طارق آخر زائر مذكور', img:null,
    short:'آخر ملاحظة لفتحي بتذكر طارق كآخر شخص كان ناوي يقابله',
    full:'تحليل الملاحظة الأخيرة بخط فتحي بيكشف اسم طارق بشكل صريح كآخر شخص مرتبط بموعد مقابلة قبل الجريمة.', unlocked:false, order:91 });
  c.ledgerAuditPuzzle.resultEvidenceIds = ['fathy_notes_tarek'];
  c.handwritingPuzzle.resultEvidenceIds = ['fathy_last_note_tarek'];
  c.conclusiveEvidenceIds = ['tarek_f_family_burden','witness_tarek_f_seen','fathy_last_note_tarek'];
  setTheory0('شهادة الجار اللي أثبتت وجوده قريب من بيت فتحي + آخر ملاحظة بخط فتحي اللي ذكرت طارق كآخر زائر + دافعه المرتبط بسمعة عيلته والقضية القديمة');
  c.endings.good.paragraphs[1] = 'شهادة الجار اللي أثبتت وجود طارق قرب البيت، وآخر ملاحظة بخط فتحي اللي ذكرته كآخر زائر، والضغط اللي عاشه طول عمره بسبب القضية القديمة، كلها أدلة ربطت الجريمة الجديدة مباشرة بمحاولته وقف إعادة فتح الملف.';
  c.endings.partial.hint = 'اجمع على الأقل 3 أدلة من: وجود طارق قرب البيت، آخر ملاحظة لفتحي، ودافعه العائلي، قبل ما تتهم.';

})();

(() => {
  const s = CASE_CLOSED_FILE.suspects.find(x => x.id === 'hamed_son_tarek_f');
  if (s && !s.questions.some(x => x.q === 'كنت بتتابع فتحي وهو بيراجع القضية القديمة؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'كنت بتتابع فتحي وهو بيراجع القضية القديمة؟', requires:['tarek_f_family_burden'], a:'(بيتردد) "كنت بس عايز أعرف هو وصل لإيه. كل ما كان يقرب من الموضوع كنت بحس إن حياتنا كلها هتبدأ من الصفر تاني."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_CLOSED_FILE;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='ask_fathy_neighbor')) c.investigationActions.push({
    id:'ask_fathy_neighbor', kind:'شاهد خارجي', label:'اسأل جار فتحي عن ليلة الحادثة',
    description:'الشاهد مش من المشتبه بيهم، فشهادته بتتجمع ضمن التحريات الميدانية.',
    requires:['old_case_file'], resultEvidenceIds:['witness_tarek_f_seen'],
    successText:'تم توثيق شهادة الجار وإضافتها لملف القضية.'
  });
})();
