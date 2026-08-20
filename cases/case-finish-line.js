/* ============================================================
   بيانات قضية: خط النهاية
   قضية قتل رياضي — عداء بيموت أثناء سباق ماراثون بجرعة
   منشطات مغلوطة، بس هو أصلاً معروف برفضه المنشطات.
   ============================================================ */

const IMG_BASE_FINISHLINE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/finish-line/';

const CASE_FINISH_LINE = {
  id: 'finish-line',
  title: 'خط النهاية',
  caseNo: 'CASE 040',
  subtitle: 'ماراثون المدينة السنوي',
  coverImg: IMG_BASE_FINISHLINE + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 31,
  investigationPoints: 18,
  teaser: 'عداء محترف بينهار ويموت على بعد أمتار من خط النهاية في ماراثون المدينة الكبير، والتحليل يكشف جرعة منشطات قاتلة رغم إن العداء ده معروف برفضه القاطع لأي مادة محظورة.',

  isPremium: false,
  categories: ['murder', 'sports'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FINISHLINE + 'cover.webp',
    heroCaption: 'CASE 040 — على بعد أمتار من الفوز',
    text1: 'العداء "منير" كان على وشك الفوز بماراثون المدينة السنوي، وعلى بعد أمتار قليلة من خط النهاية انهار فجأة ومات. الفحص الطبي كشف جرعة منشطات قوية في دمه.',
    text2: 'المشكلة إن منير معروف بمواقفه القوية ضد المنشطات، وكان بيرفض حتى المكملات الغذائية العادية بدون إشراف طبي مباشر. مدربه طلب منك تحقق قبل ما سمعته الرياضية تتلطخ بتهمة مالهاش أساس.',
    meta: [
      { label:'المجني عليه', value:'منير — عداء محترف' },
      { label:'الاتهام الأولي', value:'تعاطي منشطات محظورة' },
      { label:'التناقض', value:'منير معروف برفضه القاطع للمنشطات' },
      { label:'طلب التحقيق', value:'مدرب منير' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — السباق',
      img: IMG_BASE_FINISHLINE + 'finish-scene1.jpg',
      text:'منير في المقدمة بوضوح، الجمهور بيشجعه بحماس وهو قريب جدًا من تحقيق أفضل نتيجة في مسيرته.'
    },
    {
      scene:'المشهد ٢ — الانهيار',
      img: IMG_BASE_FINISHLINE + 'finish-scene2.jpg',
      text:'على بعد أمتار من خط النهاية، منير بيبدأ يترنح بشكل غريب، وينهار فجأة أمام أنظار الجميع.'
    },
    {
      scene:'المشهد ٣ — الفحص الطبي',
      img: IMG_BASE_FINISHLINE + 'finish-scene3.jpg',
      text:'الفريق الطبي الطارئ بيكشف جرعة منشطات قوية جدًا في دم منير، أعلى بكتير من أي جرعة تحسين أداء عادية.',
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_FINISHLINE + 'finish-scene4.jpg',
      text:'مدرب منير بيديك صلاحية تراجع زجاجات المياه والمكملات اللي كان بيستخدمها أثناء التدريب والسباق.'
    },
  ],

  suspects: [
    {
      id:'runner_up_khaled_f', name:'خالد', role:'العداء الثاني في السباق', img: IMG_BASE_FINISHLINE + 'khaled_f.jpg', avatarEmoji:'🏃',
      alibi:'قال إنه كان مركز في السباق طول الوقت زي أي عداء تاني.',
      questions:[
        { q:'إحساسك إيه لما منير كان في المقدمة؟',
          a:'"كنت عايز أفوز طبعًا، بس ده جزء طبيعي من المنافسة، مفيش أي حاجة شخصية."' },
        { q:'كنت قريب من زجاجات المياه بتاعة منير في أي وقت؟', unlockId:'khaled_f_bottle_access',
          a:'"كل العدائين بيمروا على نفس منطقة المياه، مفيش حاجة استثنائية في كده."' },
      ]
    },
    {
      id:'coach_ali_f', name:'المدرب علي', role:'مدرب منير، طلب التحقيق', img: IMG_BASE_FINISHLINE + 'ali_f.jpg', avatarEmoji:'📋',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاك مش مقتنع بتهمة المنشطات؟',
          a:'"منير كان بيرفض حتى الفيتامينات العادية من غير إشراف الدكتور، حذر جدًا من أي حاجة تدخل جسمه."' },
        { q:'مين بيتحكم في زجاجات المياه أثناء السباق؟', unlockId:'water_station_protocol',
          a:'"محطات المياه على طول المسار بيجهزها متطوعين، بس زجاجة منير الشخصية كانت بتتجهز في المعسكر."' },
      ]
    },
    {
      id:'nutritionist_heba', name:'هبة', role:'أخصائية تغذية الفريق', img: IMG_BASE_FINISHLINE + 'heba.jpg', avatarEmoji:'🧪',
      alibi:'قالت إنها جهزت المكملات حسب البروتوكول المعتاد فقط.',
      questions:[
        { q:'إنتِ المسؤولة عن تجهيز مكملات منير؟', unlockId:'heba_supplement_prep',
          a:'"أيوه، بجهزها بعناية شديدة خصوصًا مع منير لأنه حساس جدًا من أي إضافات."' },
        { q:'حد قدر يتلاعب في المكملات بعد ما تجهزيها؟', requires:['heba_supplement_prep'],
          a:'"بتتحط في تلاجة صغيرة في المعسكر، مش مقفولة بشكل صارم."' },
      ]
    },
    {
      id:'sponsor_rep_tamer_f', name:'تامر', role:'ممثل الجهة الراعية للسباق', img: IMG_BASE_FINISHLINE + 'tamer_f.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في منطقة كبار الشخصيات طول السباق.',
      questions:[
        { q:'إيه مصلحتك في نتيجة السباق ده؟', unlockId:'tamer_f_sponsorship',
          a:'"عندي صفقة رعاية ضخمة مع عداء تاني، بس مشروطة إنه يظهر كأفضل عداء في المدينة السنة دي."' },
        { q:'خالد كان جزء من صفقة الرعاية دي؟', requires:['tamer_f_sponsorship'],
          a:'(بيتردد) "أيوه، خالد هو العداء اللي عندي معاه الصفقة، بس ده مالوش علاقة بموت منير."' },
        { q:'شاهد أكد إنك دخلت منطقة المعسكر قبل السباق، مش قاعد في منطقة كبار الشخصيات زي ما قلت — عايز تفسر؟', requires:['tamer_f_sponsorship','water_station_protocol','heba_supplement_prep'], closesInterrogation:true,
          a:'(بيسكت) "دخلت أتأكد إن منير هيتعب في السباق عشان خالد ياخد الفرصة. حطيت كمية من مادة كنت فاكرها هتخليه يحس بتعب بسيط بس، مش موت."' },
      ]
    },
  ],

  evidence: [
    { id:'doping_report_f', tag:'من التحليل الطبي', crit:true, title:'جرعة منشطات خطيرة', img: IMG_BASE_FINISHLINE + 'finish-report.jpg',
      short:'مادة محظورة بتركيز خطير وغير منطقي كاستخدام رياضي',
      full:'التحليل الطبي كشف مادة محظورة بتركيز خطير جدًا، وبقايا من نفس المادة في زجاجة منير الشخصية.',
      unlocked:true, order:1 },

    { id:'khaled_f_bottle_access', tag:'من استجواب خالد', crit:false, title:'وصول خالد العام للمياه', img:null,
      short:'وصول عادي زي أي عداء آخر لمحطات المياه',
      full:'خالد أكد وصوله العام لمحطات المياه زي أي عداء تاني، من غير أي تفصيل مريب مباشر.',
      unlocked:false, order:2 },

    { id:'water_station_protocol', tag:'من استجواب المدرب علي', crit:false, title:'بروتوكول زجاجة منير الخاصة', img:null,
      short:'زجاجة منير الشخصية بتتجهز في المعسكر مش على المسار',
      full:'المدرب أكد إن زجاجة منير الشخصية بتتجهز بشكل خاص في المعسكر، منفصلة عن محطات المياه العامة على المسار.',
      unlocked:false, order:3 },

    { id:'heba_supplement_prep', tag:'من استجواب هبة', crit:true, title:'تفاصيل تجهيز المكملات', img:null,
      short:'المكملات بتتحط في تلاجة مش مقفولة بصرامة في المعسكر',
      full:'هبة أكدت إن المكملات والزجاجات الشخصية بتتحط في تلاجة صغيرة في المعسكر من غير قفل صارم، يعني أي حد من المحيطين يقدر يوصلها.',
      unlocked:false, order:4 },

    { id:'tamer_f_sponsorship', tag:'من استجواب تامر', crit:true, title:'صفقة رعاية مشروطة', img:null,
      short:'صفقة تامر مشروطة بفوز خالد بالسباق',
      full:'تامر اعترف إن صفقة الرعاية الضخمة بتاعته مشروطة بظهور خالد كأفضل عداء في المدينة السنة دي، وده كان مستحيل طول ما منير في المقدمة.',
      unlocked:false, order:5 },

    { id:'tamer_f_seen_camp', tag:'من شهادة عابرة', crit:true, title:'تامر قريب من المعسكر', img: IMG_BASE_FINISHLINE + 'finish-cam.jpg',
      short:'شاهد أكد وجود تامر قريب من منطقة المعسكر قبل السباق',
      full:'أحد المتطوعين أكد إنه شاف تامر قريب من منطقة المعسكر قبل السباق بوقت قصير، رغم إن مكانه الطبيعي كممثل رعاية كان بعيد عن منطقة زجاجات المياه.',
      unlocked:false, order:6 },
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
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },

  dnaLabPuzzle: {
    enabled: true,
    tabLabel: 'تحليل أثر المادة',
    introText: 'قارن التركيب الكيميائي للمادة الموجودة في زجاجة منير مع عينات موجودة في حوزة كل مشتبه فيه، ودوّر على التطابق.',
    resultText: 'التركيب الكيميائي بيتطابق مع عينة موجودة في حقيبة تامر الشخصية.',
    sampleSequence: ['X', 'Y', 'Z', 'X', 'Y'],
    suspectSequences: {
      runner_up_khaled_f: ['X', 'Y', 'X', 'X', 'Y'],
      coach_ali_f:        ['X', 'Z', 'Z', 'X', 'Y'],
      nutritionist_heba:  ['Y', 'Y', 'Z', 'X', 'Y'],
      sponsor_rep_tamer_f:['X', 'Y', 'Z', 'X', 'Y'],
    },
    correctSuspectId: 'sponsor_rep_tamer_f',
    resultEvidenceIds: ['tamer_f_seen_camp'],
  },

  evidenceCombinations: [
    { parts:['tamer_f_sponsorship','water_station_protocol'], resultId:'tamer_f_seen_camp' },
  ],

  correctSuspectId: 'sponsor_rep_tamer_f',
  conclusiveEvidenceIds: ['tamer_f_sponsorship', 'tamer_f_seen_camp', 'heba_supplement_prep'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن تامر هو الفاعل؟',
        options: [
          { id:'a', text:'التركيب الكيميائي المتطابق مع عينة في حقيبته + شهادة المتطوع اللي أثبتت وجوده قريب من المعسكر + صفقة رعايته المشروطة بفوز خالد' },
          { id:'b', text:'لأنه ممثل رعاية وده يكفي كدافع' },
          { id:'c', text:'لأن خالد كان المنافس الأوضح' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية تامر الحقيقية؟',
        options: [
          { id:'a', text:'ماكنش ناوي يقتله؛ كان عايز يضعفه بس عشان خالد يفوز، لكن استخدم كمية أكبر بكتير من اللي كان يتوقع تأثيرها' },
          { id:'b', text:'كان ناوي يقتله من البداية عشان مصلحة الصفقة' },
          { id:'c', text:'كان بيحاول يحسن أداء منير بالغلط' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الحقيقة أبعد من تهمة المنشطات',
      paragraphs:[
        'تامر كان تحت ضغط صفقة رعاية ضخمة مشروطة بفوز خالد، العداء اللي عنده معاه اتفاق. خطته ماكانتش قتل منير؛ كان عايز يضعف أداءه بس عشان خالد ياخد الفرصة، لكنه استخدم كمية أخطر بكتير من اللي توقعها.',
        'التركيب الكيميائي المتطابق مع عينة في حقيبته، وشهادة متطوع أكدت وجوده قريب من المعسكر قبل السباق، ودافعه المرتبط بصفقة الرعاية، كلها أدلة حاصرته وأثبتت مسؤوليته عن وفاة منير رغم عدم نيته الأصلية للقتل.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية تامر، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: التطابق الكيميائي، شهادة المتطوع، وصفقة الرعاية، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسمعة منير فضلت ملطخة بتهمة مالهاش أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "خط النهاية"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty marathon finish line at dusk,
   scattered water bottles on the ground, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (finish-scene1.jpg):
   "Photorealistic wide shot of marathon runners racing through a
   city street, leading runner slightly ahead, daylight, cheering
   crowd, photorealistic, no text, no watermark"

   المشهد ٢ (finish-scene2.jpg):
   "Photorealistic dramatic shot of a runner collapsing near a
   marathon finish line, shocked bystanders nearby, daylight,
   photorealistic, no text, no watermark"

   المشهد ٣ (finish-scene3.jpg):
   "Photorealistic shot of medical staff attending to a collapsed
   runner near a finish line, daylight, urgent atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٤ (finish-scene4.jpg):
   "Photorealistic shot of an athletic training camp area with
   water bottles and coolers, daylight, quiet atmosphere,
   photorealistic, no text, no watermark"

   خالد (khaled_f.jpg):
   "Photorealistic portrait of a young athletic Egyptian male
   runner, athletic race outfit, competitive guarded expression,
   standing near a running track, daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   المدرب علي (ali_f.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male athletic
   coach, sports tracksuit, serious authoritative expression,
   standing at a training camp, daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   هبة (heba.jpg):
   "Photorealistic portrait of a young Egyptian female sports
   nutritionist, professional athletic wear, focused careful
   expression, standing near supplement coolers, daylight, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   تامر (tamer_f.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male sponsor
   representative, sharp business casual attire, calculating
   confident expression, standing near a VIP area at a sports
   event, daylight, candid documentary photography style, no text,
   no watermark, photorealistic"

   دليل التقرير الطبي (finish-report.jpg):
   "Photorealistic close-up of a medical toxicology report document
   with charts, clinical lighting, no text, no watermark,
   photorealistic"

   دليل الكاميرا (finish-cam.jpg):
   "Photorealistic security camera style still frame of a man near
   an athletic training camp cooler at daylight, grainy
   surveillance footage look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_FINISH_LINE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'tamer_f_chemical_match', tag:'من تحليل المادة', crit:true, title:'المادة اتطابقت مع عينة تامر', img:null,
    short:'التركيب الكيميائي في زجاجة منير مطابق لعينة في حقيبة تامر',
    full:'تحليل المادة كشف تطابق كامل بين العينة الموجودة في زجاجة منير وعينة محفوظة داخل حقيبة تامر الشخصية.', unlocked:false, order:90 });
  c.dnaLabPuzzle.resultEvidenceIds = ['tamer_f_chemical_match'];
  c.conclusiveEvidenceIds = ['tamer_f_sponsorship','tamer_f_seen_camp','tamer_f_chemical_match'];
  const t=c.suspects.find(s=>s.id==='sponsor_rep_tamer_f'); if(t){const q=t.questions.find(q=>q.closesInterrogation); if(q) q.requires=['tamer_f_sponsorship','tamer_f_seen_camp','tamer_f_chemical_match'];}
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: صفقة الرعاية، وجود تامر قرب المعسكر، والتطابق الكيميائي، قبل ما تتهم.';

})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_FINISH_LINE;
  if (c.dnaLabPuzzle) {
    c.dnaLabPuzzle.resultText = 'التركيب الكيميائي للمادة في زجاجة منير مطابق لعينة موجودة ضمن متعلقات تامر. التطابق يربطه بالمادة، لكنه محتاج دافع وربط بالواقعة نفسها.';
    c.dnaLabPuzzle.resultEvidenceIds = ['tamer_f_chemical_match'];
  }
  c.evidenceCombinations = [];
  const t = c.suspects.find(s => s.id === 'sponsor_rep_tamer_f');
  if (t) {
    const q = t.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'العينة اللي في متعلقاتك مطابقة للمادة الموجودة في زجاجة منير، وعندك مصلحة مباشرة في فوز خالد. تفسر التطابق إزاي؟';
      q.requires = ['tamer_f_sponsorship','tamer_f_chemical_match'];
      q.a = '(بيتوتر) "العينة دي ممكن تكون وصلت لحاجتي من تجهيزات المعسكر أو من حد تاني. أنا ماحطتش حاجة في زجاجة منير، ومش هاعترف بحاجة لمجرد التطابق."';
    }
  }
  c.conclusiveEvidenceIds = ['doping_report_f','tamer_f_sponsorship','tamer_f_chemical_match'];
  c.conclusiveRequired = 3;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_FINISH_LINE;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='ask_camp_volunteers')) c.investigationActions.push({
    id:'ask_camp_volunteers', kind:'شهود المعسكر', label:'اسأل متطوعي منطقة المياه',
    description:'راجع مين اتشاف قريب من منطقة تجهيز الزجاجات قبل السباق.',
    requires:['water_station_protocol'], resultEvidenceIds:['tamer_f_seen_camp'],
    successText:'تم تثبيت شهادة متطوع من المعسكر وإضافتها للأدلة.'
  });
})();
