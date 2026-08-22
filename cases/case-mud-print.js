/* ============================================================
   بيانات قضية: بصمة في الوحل
   قضية قتل غامضة — جثة بتتلاقي في ورشة نجارة قديمة، وبصمة
   واضحة على أداة الجريمة بتخص شخص ميت من سنة كاملة.
   ============================================================ */

const IMG_BASE_MUDPRINT = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/mud-print/';

const CASE_MUD_PRINT = {
  id: 'mud-print',
  title: 'بصمة في الوحل',
  caseNo: 'CASE 033',
  subtitle: 'ورشة نجارة قديمة، أطراف المدينة',
  coverImg: IMG_BASE_MUDPRINT + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 34,
  investigationPoints: 19,
  teaser: 'جثة بتتلاقي في ورشة نجارة مهجورة نص الليل، وبصمة واضحة على المطرقة اللي قتلته بتخص رجل ميت من سنة كاملة. إزاي بصمة ميت تظهر على أداة جريمة حديثة؟',

  isPremium: false,
  categories: ['murder', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_MUDPRINT + 'cover.webp',
    heroCaption: 'CASE 033 — ورشة النجارة، الليل',
    text1: 'صاحب ورشة النجارة "فتحي" اتلاقى مقتول جوه ورشته بمطرقة نجارة قديمة. المطرقة كانت عليها بصمة واضحة، بس لما فحصوها لقوا إنها بصمة "سيد"، النجار القديم اللي كان شغال في نفس الورشة، ومات من حادثة سيارة من سنة كاملة.',
    text2: 'المحقق المسؤول محتار: إما إن حد لبس قفاز عليه بصمة سيد المحفوظة من قبل (وده يفتح احتمال تلاعب متعمد)، أو إن الوفاة القديمة نفسها مش حقيقية زي ما الجميع فاكر. طلب منك تحقق في الموضوع بحرص شديد قبل ما يتصعّد لقضية أعقد بكتير.',
    meta: [
      { label:'المجني عليه', value:'فتحي — صاحب ورشة النجارة' },
      { label:'أداة الجريمة', value:'مطرقة نجارة عليها بصمة رجل ميت رسميًا' },
      { label:'الغموض', value:'بصمة سيد اللي مات من سنة' },
      { label:'مكان الحادثة', value:'ورشة النجارة القديمة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الليلة الأخيرة',
      img: IMG_BASE_MUDPRINT + 'mudprint-scene1.jpg',
      text:'فتحي بيقفل ورشته على غير عادته بعد نص الليل، ضوء واحد ضعيف مضاء جوه الورشة المزدحمة بأدوات النجارة.'
    },
    {
      scene:'المشهد ٢ — الاكتشاف',
      img: IMG_BASE_MUDPRINT + 'mudprint-scene2.jpg',
      text:'صباح اليوم التالي، عامل الورشة بيلاقي فتحي مقتول على الأرض، جنبه مطرقة نجارة قديمة ملطخة بالدم.'
    },
    {
      scene:'المشهد ٣ — البصمة الغريبة',
      img: IMG_BASE_MUDPRINT + 'mudprint-scene3.jpg',
      text:'فحص المطرقة بيكشف بصمة واضحة، والمقارنة بسجلات قديمة بتوضح إنها بصمة سيد، نجار قديم اتوفى من سنة في حادثة سيارة.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_MUDPRINT + 'mudprint-scene4.jpg',
      text:'المحقق بيراجع سجلات الورشة القديمة وقائمة الناس اللي كانوا قريبين من سيد ومن فتحي في نفس الوقت.'
    },
  ],

  suspects: [
    {
      id:'worker_amir', name:'أمير', role:'عامل في الورشة، اكتشف الجثة', img: IMG_BASE_MUDPRINT + 'amir.jpg', avatarEmoji:'🔨',
      alibi:'قال إنه كان في بيته وجه الورشة الصبح عادي زي كل يوم.',
      questions:[
        { q:'إنت اتعاملت مع أدوات سيد القديمة قبل كده؟', unlockId:'amir_old_tools',
          a:'"أيوه، الأدوات القديمة لسه موجودة في الورشة، بنستخدمها لحد دلوقتي."' },
        { q:'كان عندك مشكلة شخصية مع فتحي؟', unlockId:'amir_grudge',
          a:'(بيتردد) "فتحي كان بيماطلني في مرتبي من فترة، بس مش سبب أوصله لده."' },
      ]
    },
    {
      id:'widow_samia', name:'سامية', role:'أرملة سيد، النجار المتوفى', img: IMG_BASE_MUDPRINT + 'samia.jpg', avatarEmoji:'🖤',
      alibi:'قالت إنها كانت في بيتها طول الليلة اللي فتحي اتقتل فيها.',
      questions:[
        { q:'ليه محتفظة بأدوات جوزك القديمة؟', unlockId:'samia_gloves',
          a:'"عندي صندوق من حاجاته القديمة، فيه قفاز نجارة كان بيلبسه دايمًا، احتفظت بيه كذكرى."' },
        { q:'فتحي كان مسؤول بشكل أو بآخر عن حادثة سيد؟', unlockId:'samia_accusation',
          a:'(بتغضب) "فتحي كان بيدّي سيد شغل خطر بمعدات قديمة عشان يوفر فلوس، وأنا متأكدة إن ده السبب في وفاته."' },
      ]
    },
    {
      id:'business_partner_ihab', name:'إيهاب', role:'شريك فتحي في الورشة', img: IMG_BASE_MUDPRINT + 'ihab.jpg', avatarEmoji:'📐',
      alibi:'قال إنه كان مسافر خارج المدينة وقت الجريمة.',
      questions:[
        { q:'علاقتك بفتحي كانت مستقرة؟', unlockId:'ihab_dispute',
          a:'"كان بينا خلاف على تقسيم الأرباح من فترة، بس كنا في طريقنا نحله."' },
        { q:'إنت عارف حد كان يقدر يوصل لأدوات سيد القديمة غير أمير؟', requires:['ihab_dispute'],
          a:'"الصندوق ده كان معروف للجميع تقريبًا، مقفول بس مش بشكل صعب يتفتح."' },
      ]
    },
    {
      id:'apprentice_bassel', name:'باسل', role:'صبي نجار كان بيتدرب مع سيد قبل وفاته', img: IMG_BASE_MUDPRINT + 'bassel.jpg', avatarEmoji:'🪚',
      alibi:'قال إنه كان في بيت خالته، بره المدينة، وقت الجريمة.',
      questions:[
        { q:'علاقتك بسيد كانت إيه بالظبط؟', unlockId:'bassel_bond',
          a:'"سيد كان بمثابة أب تاني ليّ، علّمني كل حاجة أعرفها في النجارة. موته أثر فيّا بشكل كبير."' },
        { q:'شاهد أكد إنك كنت في المدينة مش في بيت خالتك زي ما قلت — عايز تفسر؟', requires:['bassel_bond','samia_gloves','amir_old_tools'], closesInterrogation:true,
          a:'(بيبكي) "فتحي كان السبب في موت سيد وهرب من المسؤولية بفلوسه. أخدت قفاز سيد من صندوق سامية من غير ما تعرف، لبسته، وقابلت فتحي عشان أواجهه بس الأمور خرجت عن السيطرة."' },
      ]
    },
  ],

  evidence: [
    { id:'hammer_fingerprint', tag:'من مسرح الجريمة', crit:true, title:'بصمة على المطرقة', img: IMG_BASE_MUDPRINT + 'mudprint-hammer.jpg',
      short:'بصمة واضحة تخص رجل متوفى رسميًا من سنة',
      full:'البصمة على المطرقة بتتطابق مع سجلات قديمة لسيد، النجار المتوفى، وده بيفتح احتمال إن حد استخدم قفاز عليه بصمته المحفوظة.',
      unlocked:true, order:1 },

    { id:'amir_old_tools', tag:'من استجواب أمير', crit:false, title:'الأدوات القديمة لسه مستخدمة', img:null,
      short:'أدوات سيد القديمة لسه موجودة ومستخدمة في الورشة',
      full:'أمير أكد إن أدوات سيد القديمة لسه موجودة في الورشة ومستخدمة بشكل عادي حتى بعد وفاته.',
      unlocked:false, order:2 },

    { id:'amir_grudge', tag:'من استجواب أمير', crit:false, title:'خلاف على المرتب', img:null,
      short:'فتحي كان بيماطل أمير في مرتبه',
      full:'أمير اعترف إن فتحي كان بيماطله في صرف مرتبه من فترة، وده كان سبب توتر بسيط بينهم.',
      unlocked:false, order:3 },

    { id:'samia_gloves', tag:'من استجواب سامية', crit:true, title:'قفاز سيد المحتفظ به', img: IMG_BASE_MUDPRINT + 'mudprint-glove.jpg',
      short:'سامية عندها قفاز نجارة كان بيلبسه سيد دايمًا',
      full:'سامية كشفت إنها محتفظة بصندوق من حاجات سيد الشخصية، من ضمنها قفاز نجارة كان بيلبسه باستمرار، وده ممكن يكون مصدر البصمة الغريبة.',
      unlocked:false, order:4 },

    { id:'samia_accusation', tag:'من استجواب سامية', crit:false, title:'اتهام سامية لفتحي', img:null,
      short:'سامية بتحمّل فتحي مسؤولية وفاة سيد',
      full:'سامية متأكدة إن فتحي كان مسؤول جزئيًا عن وفاة سيد بسبب معدات قديمة خطرة كان بيوفرها عشان يقلل مصاريف.',
      unlocked:false, order:5 },

    { id:'ihab_dispute', tag:'من استجواب إيهاب', crit:false, title:'خلاف مالي بين الشركاء', img:null,
      short:'خلاف بسيط على تقسيم أرباح الورشة',
      full:'إيهاب اعترف بوجود خلاف بسيط بينه وبين فتحي على تقسيم الأرباح، بس أكد إنهم كانوا في طريقهم لحله.',
      unlocked:false, order:6 },

    { id:'bassel_bond', tag:'من استجواب باسل', crit:true, title:'ارتباط باسل بسيد', img:null,
      short:'باسل كان قريب جدًا من سيد كأب روحي',
      full:'باسل كشف عن علاقة عميقة بينه وبين سيد، اللي كان بمثابة أب تاني له وعلّمه مهنة النجارة بالكامل.',
      unlocked:false, order:7 },

    { id:'bassel_seen_city', tag:'من شهادة جار', crit:true, title:'باسل شوهد في المدينة', img: IMG_BASE_MUDPRINT + 'mudprint-witness.jpg',
      short:'جار أكد رؤية باسل في المدينة رغم زعمه السفر',
      full:'جار للورشة أكد إنه شاف باسل في المدينة نفس ليلة الجريمة، رغم إنه ادّعى إنه كان في بيت خالته بره المدينة.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم جديد: dnaLabPuzzle
     نفس فكرة مطابقة الشرايط الجينية، لكن هنا اللاعب بيقارن بين
     "بصمة القفاز الجلدي" (بصمة سيد القديمة المحفوظة) و"أثر عرق
     حديث" جوه القفاز نفسه، عشان يثبت إن لابس القفاز شخص حي
     مختلف تمامًا عن صاحب البصمة الأصلية.
     ============================================================ */
  dnaLabPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الأثر الجيني',
    introText: 'قارن بين بصمة سيد القديمة المسجلة في الأرشيف، وأثر العرق الحديث الموجود جوه القفاز نفسه، عشان تثبت إن لابس القفاز مش سيد.',
    resultText: 'الأثر الجيني الحديث جوه القفاز بيتطابق مع باسل، مش مع سيد. يبقى حد حي لبس القفاز عشان يخبي هويته الحقيقية.',
    sampleSequence: ['G', 'C', 'A', 'T', 'G', 'C'],
    suspectSequences: {
      worker_amir:          ['G', 'C', 'A', 'A', 'G', 'C'],
      widow_samia:          ['G', 'A', 'A', 'T', 'G', 'C'],
      business_partner_ihab:['G', 'C', 'T', 'T', 'G', 'C'],
      apprentice_bassel:    ['G', 'C', 'A', 'T', 'G', 'C'],
    },
    correctSuspectId: 'apprentice_bassel',
    resultEvidenceIds: ['bassel_seen_city'],
  },

  evidenceCombinations: [
    { parts:['samia_gloves','bassel_bond'], resultId:'bassel_seen_city' },
  ],

  correctSuspectId: 'apprentice_bassel',
  conclusiveEvidenceIds: ['bassel_bond', 'bassel_seen_city', 'samia_gloves'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن باسل هو الفاعل؟',
        options: [
          { id:'a', text:'الأثر الجيني الحديث جوه القفاز اللي أثبت إنه مش سيد + شهادة الجار اللي كذّبت حجة غيابه + ارتباطه العاطفي العميق بسيد' },
          { id:'b', text:'لأنه كان صبي نجار عادي وده مريب' },
          { id:'c', text:'لأن سامية هي المشتبه فيها الأساسية' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت حقيقة بصمة سيد على المطرقة؟',
        options: [
          { id:'a', text:'باسل أخد قفاز سيد القديم من صندوق سامية من غير علمها، ولبسه وهو بيواجه فتحي، فظهرت بصمة سيد على أداة الجريمة رغم إنه مات فعلاً من سنة' },
          { id:'b', text:'سيد كان لسه حي وزوّر موته' },
          { id:'c', text:'البصمة كانت مزوّرة بالكامل من غير أي علاقة بالقفاز' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'بصمة ميت، يد حية',
      paragraphs:[
        'باسل، اللي كان بمثابة ابن روحي لسيد، فضل يعتقد إن فتحي هو المسؤول عن وفاة أستاذه بسبب معدات خطرة قديمة كان بيوفرها لتقليل المصاريف. أخد قفاز سيد الشخصي من صندوق سامية من غير علمها، وقابل فتحي عشان يواجهه بالموضوع، لكن المواجهة اتحولت لعنف قاتل.',
        'الأثر الجيني الحديث اللي اتلاقى جوه القفاز أثبت إن لابسه مش سيد رغم البصمة القديمة، وشهادة الجار اللي كذّبت حجة غياب باسل، وارتباطه العاطفي العميق بسيد، كلها أدلة حاصرته وكشفت الحقيقة وراء اللغز الغريب.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية باسل، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: الأثر الجيني الحديث، شهادة الجار، وارتباطه بسيد، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسمعة سيد فضلت مرتبطة بلغز مش حقيقي، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "بصمة في الوحل"

   الغلاف (cover.webp):
   "Photorealistic shot of an old dim carpentry workshop at night,
   wood shavings on the floor, a single hanging light bulb,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (mudprint-scene1.jpg):
   "Photorealistic shot of a middle-aged Egyptian man closing a
   carpentry workshop late at night, dim single light, quiet
   unsettling atmosphere, photorealistic, no text, no watermark"

   المشهد ٢ (mudprint-scene2.jpg):
   "Photorealistic dramatic shot of a carpentry workshop floor with
   scattered wood tools, dim morning light through a dusty window,
   photorealistic, no text, no watermark"

   المشهد ٣ (mudprint-scene3.jpg):
   "Photorealistic close-up of a forensic investigator dusting an
   old hammer for fingerprints on a workbench, clinical lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (mudprint-scene4.jpg):
   "Photorealistic shot of an investigator reviewing old workshop
   records at a cluttered desk, warm desk lamp lighting,
   photorealistic, no text, no watermark"

   أمير (amir.jpg):
   "Photorealistic portrait of a young Egyptian male carpenter,
   simple work clothes covered in sawdust, tired guarded
   expression, standing in a workshop, warm workshop lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   سامية (samia.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman in
   mourning clothes, sorrowful composed expression, sitting in a
   modest living room, soft window lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   إيهاب (ihab.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male business
   owner, smart casual outfit, guarded calculating expression,
   standing in a workshop office, natural lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   باسل (bassel.jpg):
   "Photorealistic portrait of a young Egyptian male apprentice
   carpenter, simple work clothes, sorrowful intense expression,
   standing near carpentry tools, warm workshop lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل المطرقة (mudprint-hammer.jpg):
   "Photorealistic close-up of an old bloodstained carpentry hammer
   on a workshop floor, forensic evidence photography style, dim
   lighting, no text, no watermark, photorealistic"

   دليل القفاز (mudprint-glove.jpg):
   "Photorealistic close-up of an old worn leather work glove inside
   a small memory box, soft nostalgic lighting, no text, no
   watermark, photorealistic"

   دليل الشاهد (mudprint-witness.jpg):
   "Photorealistic shot of a neighbor peeking through a window
   curtain at night, dim street light outside, documentary
   photography style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_MUD_PRINT;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'bassel_dna_in_glove', tag:'من تحليل الـDNA', crit:true, title:'DNA باسل جوه قفاز سيد', img:null,
    short:'الأثر الجيني الحديث داخل القفاز بيرجع لباسل مش لسيد',
    full:'تحليل الأثر الجيني الحديث داخل القفاز القديم كشف تطابقه مع باسل، وده يفسر إزاي ظهرت بصمة سيد على أداة جريمة حصلت بعد وفاته بسنة.', unlocked:false, order:90 });
  c.dnaLabPuzzle.resultEvidenceIds = ['bassel_dna_in_glove'];
  c.conclusiveEvidenceIds = ['bassel_dna_in_glove','bassel_seen_city','samia_gloves'];
  const b=c.suspects.find(s=>s.id==='apprentice_bassel'); if(b){const q=b.questions.find(q=>q.closesInterrogation); if(q) q.requires=['bassel_dna_in_glove','bassel_seen_city','samia_gloves'];}
  setTheory0('الـDNA الحديث جوه قفاز سيد اللي طابق باسل + شهادة الجار اللي أثبتت وجوده في المدينة + وجود قفاز سيد أصلًا ضمن حاجاته المحفوظة عند سامية');
  c.endings.partial.hint = 'اجمع على الأقل 3 أدلة من: DNA باسل داخل القفاز، وجوده في المدينة، والقفاز القديم المحفوظ، قبل ما تتهم.';

})();

(() => {
  const s = CASE_MUD_PRINT.suspects.find(x => x.id === 'apprentice_bassel');
  if (s && !s.questions.some(x => x.q === 'دخلت عند سامية أو شفت حاجات سيد القديمة قريب؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'دخلت عند سامية أو شفت حاجات سيد القديمة قريب؟', requires:['bassel_bond','samia_gloves'], a:'"زرتها كذا مرة، والصندوق كان موجود. بس ماخدتش حاجة منه... على حد ما فاكر."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_MUD_PRINT;
  c.evidenceCombinations = [];
  const b = c.suspects.find(s => s.id === 'apprentice_bassel');
  if (b) {
    const q = b.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتأثر) "كنت في المدينة فعلًا وزرت سامية قبلها، وعارف مكان حاجات سيد القديمة. لكن ده كله ما يثبتش إني استخدمت القفاز أو قتلت فتحي."';
    }
  }
  c.conclusiveEvidenceIds = ['bassel_dna_in_glove','bassel_seen_city','samia_gloves'];
  c.conclusiveRequired = 3;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_MUD_PRINT;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='trace_bassel_city')) c.investigationActions.push({
    id:'trace_bassel_city', kind:'تحريات حركة', label:'راجع شهود وصول باسل للمدينة',
    description:'تحقق من رواية السفر من خلال شهود ومحطات الحركة بدل الاعتماد على كلامه فقط.',
    requires:['bassel_bond'], resultEvidenceIds:['bassel_seen_city'],
    successText:'التحريات وثقت حركة باسل في المدينة خلال الفترة المهمة.'
  });
})();
