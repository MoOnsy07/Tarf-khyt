/* ============================================================
   بيانات قضية: العزبة القديمة
   قضية قتل — عيلة كبيرة بتتجمع لقراءة وصية جد ميت في عزبة
   قديمة، وواحد من الورثة بيتسمم أثناء العشاء.
   ============================================================ */

const IMG_BASE_OLDESTATE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/old-estate/';

const CASE_OLD_ESTATE = {
  id: 'old-estate',
  title: 'العزبة القديمة',
  caseNo: 'CASE 037',
  subtitle: 'عزبة العيلة القديمة، الريف',
  coverImg: IMG_BASE_OLDESTATE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 40,
  investigationPoints: 23,
  price: '25 جنيه',
  oldPrice: '50 جنيه',
  discountLabel: 'خصم 50%',
  teaser: 'عيلة كبيرة بتتجمع في عزبة قديمة لقراءة وصية الجد المتوفى، وأثناء عشاء العائلة بيتسمم واحد من الورثة الرئيسيين. مين من العيلة كان مستعد يقتل عشان الميراث؟',

  isPremium: true,
  premiumTier: 'A',
  categories: ['murder', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_OLDESTATE + 'cover.webp',
    heroCaption: 'CASE 037 — ليلة قراءة الوصية',
    text1: 'عيلة "الشريف" اتجمعت كلها في عزبة الجد القديمة عشان يسمعوا قراءة وصيته رسميًا. أثناء عشاء العائلة بعد القراءة، الابن الأكبر "وليد" بدأ يحس بدوخة شديدة وانهار على الطاولة قدام الجميع.',
    text2: 'الفحص الطبي كشف مادة سامة في طعامه بالذات، رغم إن كل العيلة أكلت من نفس الأطباق. المحامي المسؤول عن الوصية طلب منك تحقق بسرعة قبل ما يتصاعد الموقف وسط عيلة أصلًا متوترة بسبب توزيع الميراث.',
    meta: [
      { label:'الضحية', value:'وليد — الابن الأكبر والوريث الرئيسي' },
      { label:'مكان الحادثة', value:'صالة الطعام في العزبة القديمة' },
      { label:'الدافع المحتمل', value:'توزيع ميراث الجد الضخم' },
      { label:'طلب التحقيق', value:'محامي العائلة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قراءة الوصية',
      img: IMG_BASE_OLDESTATE + 'estate-scene1.jpg',
      text:'العيلة كلها مجتمعة في صالة العزبة القديمة، المحامي بيقرأ الوصية بصوت رسمي، وتعبيرات الوجوه بتتغير مع كل بند.'
    },
    {
      scene:'المشهد ٢ — عشاء متوتر',
      img: IMG_BASE_OLDESTATE + 'estate-scene2.jpg',
      text:'العيلة بتجلس على مائدة العشاء بعد القراءة، أجواء متوترة رغم محاولة الجميع التظاهر بالطبيعية.'
    },
    {
      scene:'المشهد ٣ — الانهيار',
      img: IMG_BASE_OLDESTATE + 'estate-scene3.jpg',
      text:'وليد بيبدأ يحس بدوخة شديدة فجأة، وينهار على الطاولة وسط ذعر باقي أفراد العيلة.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_OLDESTATE + 'estate-scene4.jpg',
      text:'محامي العائلة بيديك نسخة من الوصية وقائمة أفراد العيلة اللي كانوا حاضرين العشاء.'
    },
  ],

  suspects: [
    {
      id:'sister_dalia', name:'داليا', role:'أخت وليد الصغرى', img: IMG_BASE_OLDESTATE + 'dalia.jpg', avatarEmoji:'🍽️',
      alibi:'قالت إنها كانت بتساعد في تقديم الأطباق طول العشاء.',
      questions:[
        { q:'نصيبك من الميراث كان عادل في رأيك؟', unlockId:'dalia_share',
          a:'"وليد أخد نصيب الأسد كالعادة، أنا اتعودت على كده من زمان."' },
        { q:'إنتِ اللي قدّمتِ طبق وليد بالذات؟', unlockId:'dalia_serving',
          a:'"أيوه، كنت بوزع الأطباق على الجميع، مفيش حاجة غريبة في كده."' },
      ]
    },
    {
      id:'cousin_marwan', name:'مروان', role:'ابن عم وليد، مدير أعمال العزبة', img: IMG_BASE_OLDESTATE + 'marwan.jpg', avatarEmoji:'📜',
      alibi:'قال إنه كان قاعد بعيد عن وليد طول العشاء.',
      questions:[
        { q:'وضعك المالي مرتبط بشكل أو بآخر بإدارة العزبة؟', unlockId:'marwan_debt',
          a:'"أنا مديون بشكل كبير من استثمار فاشل، وكنت مستني نصيبي من الوصية يساعدني أخرج من الأزمة."' },
        { q:'وليد كان عارف حاجة عن سوء إدارتك لأموال العزبة؟', requires:['marwan_debt'], unlockId:'marwan_mismanagement',
          a:'(بيتردد) "كان بدأ يسأل أسئلة كتير عن الحسابات، بس ده جزء طبيعي من شغله كوريث رئيسي."' },
      ]
    },
    {
      id:'widow_samira', name:'سميرة', role:'زوجة الجد الثانية، ليها نصيب في الوصية', img: IMG_BASE_OLDESTATE + 'samira.jpg', avatarEmoji:'👵',
      alibi:'قالت إنها كانت قاعدة في طرف الطاولة بعيد عن وليد.',
      questions:[
        { q:'علاقتك بوليد كانت مستقرة؟', unlockId:'samira_tension',
          a:'"وليد دايمًا كان شاكك في نيتي من الزواج بجده، وكان بيحاول يقلل نصيبي من الوصية."' },
        { q:'إنتِ من حضّرت أي طبق في العشاء ده؟', requires:['samira_tension'],
          a:'"لأ، أنا بس ضيفة زي الباقي، ما دخلتش المطبخ خالص."' },
      ]
    },
    {
      id:'nephew_youssef_o', name:'يوسف', role:'ابن أخت الجد، محروم من الوصية رسميًا', img: IMG_BASE_OLDESTATE + 'youssef_o.jpg', avatarEmoji:'🍷',
      alibi:'قال إنه كان بيصب المشروبات للعيلة طول العشاء.',
      questions:[
        { q:'حسّيت بالظلم لما عرفت إنك محروم من الوصية؟', unlockId:'youssef_o_exclusion',
          a:'"طبعًا، خدمت الجد سنين طويلة قبل ما يموت، والوصية ماذكرتنيش خالص."' },
        { q:'شاهد أكد إنك اقتربت من طبق وليد قبل ما يوزع — عايز تفسر؟', requires:['youssef_o_exclusion','marwan_mismanagement','dalia_serving'], closesInterrogation:true,
          a:'(بيصمت طويل) "قربت بس عشان أصب له مشروب زيادة، مقصدش أأذيه بالطريقة دي، كنت بس عايز يحس بجزء بسيط من الألم اللي حسيته أنا لما استبعدوني."' },
      ]
    },
  ],

  evidence: [
    { id:'poisoned_plate', tag:'من التحليل الطبي', crit:true, title:'طبق وليد الملوّث', img: IMG_BASE_OLDESTATE + 'estate-plate.jpg',
      short:'مادة سامة موجودة في طبق وليد بالذات دون باقي العيلة',
      full:'التحليل الطبي كشف مادة سامة موجودة في طبق وليد بالذات، رغم إن باقي العيلة أكلت من نفس الأطباق العامة، وده بيوضح إن الاستهداف كان شخصي ومباشر.',
      unlocked:true, order:1 },

    { id:'dalia_share', tag:'من استجواب داليا', crit:false, title:'شكوى داليا من نصيبها', img:null,
      short:'داليا مستاءة من نصيب وليد الأكبر في الميراث',
      full:'داليا اعترفت باستيائها من نصيب وليد الأكبر في الوصية مقارنة بنصيبها، بس بشكل عادي مش استثنائي.',
      unlocked:false, order:2 },

    { id:'dalia_serving', tag:'من استجواب داليا', crit:false, title:'داليا وزّعت الأطباق', img:null,
      short:'داليا أكدت إنها هي اللي وزعت الأطباق على الجميع',
      full:'داليا أكدت إنها هي المسؤولة عن توزيع الأطباق على أفراد العيلة، بس ده جزء من دورها المعتاد في تجمعات العيلة.',
      unlocked:false, order:3 },

    { id:'marwan_debt', tag:'من استجواب مروان', crit:false, title:'ديون مروان المالية', img:null,
      short:'مروان مديون بشكل كبير من استثمار فاشل',
      full:'مروان اعترف بمديونية كبيرة نتيجة استثمار فاشل، وكان محتاج نصيبه من الوصية بشكل عاجل.',
      unlocked:false, order:4 },

    { id:'marwan_mismanagement', tag:'من استجواب مروان', crit:true, title:'شكوك وليد في إدارة الحسابات', img:null,
      short:'وليد كان بدأ يسأل عن سوء إدارة مروان لأموال العزبة',
      full:'مروان اعترف إن وليد كان بدأ يسأل أسئلة تفصيلية عن إدارته لحسابات العزبة، وده كان مؤشر خطر على اكتشاف تلاعبه المالي.',
      unlocked:false, order:5 },

    { id:'samira_tension', tag:'من استجواب سميرة', crit:false, title:'توتر بين وليد وسميرة', img:null,
      short:'وليد كان بيحاول يقلل نصيب سميرة من الوصية',
      full:'سميرة اعترفت بوجود توتر مستمر بينها وبين وليد بخصوص شرعية نصيبها من ميراث زوجها.',
      unlocked:false, order:6 },

    { id:'youssef_o_exclusion', tag:'من استجواب يوسف', crit:true, title:'استبعاد يوسف من الوصية', img:null,
      short:'يوسف محروم تمامًا من الوصية رغم خدمته الطويلة للجد',
      full:'يوسف كشف عن شعوره العميق بالظلم لكونه محروم تمامًا من الوصية رغم سنين طويلة من خدمة الجد قبل وفاته.',
      unlocked:false, order:7 },

    { id:'witness_youssef_near_plate', tag:'من شهادة قريب', crit:true, title:'يوسف قريب من طبق وليد', img: IMG_BASE_OLDESTATE + 'estate-witness.jpg',
      short:'قريب أكد رؤية يوسف قريب من طبق وليد قبل التقديم',
      full:'أحد أفراد العيلة أكد إنه شاف يوسف يقترب من طبق وليد بشكل مباشر تحت ذريعة صب المشروبات، قبل ما الطبق يتقدم له.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },

  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق حسابات العزبة',
    introText: 'راجع كشف حسابات إدارة العزبة اللي كان بيشرف عليها مروان، ودوّر على التلاعب اللي كان وليد بدأ يكتشفه.',
    resultText: 'لقيت التلاعب! مروان كان بيحوّل جزء من دخل العزبة لحساب شخصي على مدار سنة كاملة.',
    ledgerRows: [
      { account:'صيانة العزبة', name:'فواتير موثقة', amount:'85,000', suspicious:false },
      { account:'حساب شخصي مروان', name:'تحويلات غير موثقة', amount:'220,000', suspicious:true },
      { account:'رواتب العمال', name:'كشوف موثقة', amount:'60,000', suspicious:false },
      { account:'صندوق الطوارئ', name:'رصيد ثابت', amount:'50,000', suspicious:false },
    ],
    correctAccountId: 'حساب شخصي مروان',
    linkedSuspectId: 'cousin_marwan',
    resultEvidenceIds: ['marwan_mismanagement'],
  },

  evidenceCombinations: [
    { parts:['youssef_o_exclusion','dalia_serving'], resultId:'witness_youssef_near_plate' },
  ],

  correctSuspectId: 'nephew_youssef_o',
  conclusiveEvidenceIds: ['youssef_o_exclusion', 'witness_youssef_near_plate', 'poisoned_plate'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن يوسف هو الفاعل؟',
        options: [
          { id:'a', text:'شهادة قريب أكدت اقترابه المباشر من طبق وليد + شعوره العميق بالظلم من استبعاده الكامل من الوصية + كونه المسؤول عن تقديم المشروبات والأطباق' },
          { id:'b', text:'لأنه محروم من الوصية وده يكفي كدافع' },
          { id:'c', text:'لأن مروان مديون وده أوضح دافع' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية يوسف الحقيقية؟',
        options: [
          { id:'a', text:'ماكنش ناوي يقتل وليد؛ كان عايز يوريه جزء بسيط من الألم اللي حسّه هو من الاستبعاد، لكن الجرعة كانت أقوى بكتير من اللي توقعها' },
          { id:'b', text:'كان مخطط للقتل من البداية عشان ياخد نصيب في الوصية' },
          { id:'c', text:'كان بيحاول يوقع مروان في المشكلة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'وريث الظل كشف نفسه',
      paragraphs:[
        'يوسف، ابن أخت الجد، خدم العيلة سنين طويلة قبل وفاة الجد، لكن الوصية استبعدته تمامًا. حاول يعبّر عن ألمه العميق بطريقة خطيرة، فوضع مادة مؤذية في طبق وليد أثناء تقديمه المشروبات، بنية إيذاء بسيط مش قتل فعلي، لكن الجرعة كانت أقوى بكتير من اللي توقعها.',
        'شهادة أحد أفراد العيلة اللي أكدت اقترابه المباشر من طبق وليد، وشعوره العميق بالظلم من استبعاده الكامل من الوصية، وكونه المسؤول المباشر عن تقديم المشروبات، كلها أدلة حاصرته وكشفت الحقيقة وراء مأساة عشاء العائلة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية يوسف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: شهادة اقترابه من الطبق، استبعاده من الوصية، وحالة السم في الطبق، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والعيلة فضلت ممزقة بالشك المتبادل، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "العزبة القديمة"

   الغلاف (cover.webp):
   "Photorealistic shot of an old countryside estate mansion at
   dusk, warm dining room lights visible through windows,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (estate-scene1.jpg):
   "Photorealistic wide shot of a large Egyptian family gathered in
   an old estate living room, a lawyer reading documents aloud,
   warm formal lighting, photorealistic, no text, no watermark"

   المشهد ٢ (estate-scene2.jpg):
   "Photorealistic shot of a formal family dinner table in an old
   estate dining room, tense atmosphere despite warm lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (estate-scene3.jpg):
   "Photorealistic dramatic shot of a man collapsing at a dinner
   table, family members reacting in shock, warm dining room
   lighting, photorealistic, no text, no watermark"

   المشهد ٤ (estate-scene4.jpg):
   "Photorealistic shot of a lawyer handing documents to an
   investigator in an old estate study room, warm desk lamp
   lighting, photorealistic, no text, no watermark"

   داليا (dalia.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman, elegant
   formal outfit, composed guarded expression, standing in a dining
   room, warm lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   مروان (marwan.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, formal
   business casual outfit, nervous calculating expression, standing
   in an estate study room, warm lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سميرة (samira.jpg):
   "Photorealistic portrait of an elderly Egyptian woman, elegant
   traditional formal outfit, composed dignified expression, sitting
   in a living room armchair, warm lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   يوسف (youssef_o.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, simple
   formal outfit, sorrowful guarded expression, standing near a
   dining table, warm dining room lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل الطبق (estate-plate.jpg):
   "Photorealistic close-up of a dinner plate with food residue
   under forensic examination light, evidence photography style, no
   text, no watermark, photorealistic"

   دليل الشاهد (estate-witness.jpg):
   "Photorealistic shot of a family member watching quietly from a
   dining room doorway, warm dim lighting, documentary photography
   style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_OLD_ESTATE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'marwan_money_trail', tag:'من تدقيق حسابات العزبة', crit:false, title:'تلاعب مروان المالي اتثبت', img:null,
    short:'التدقيق كشف تحويلات من دخل العزبة لحساب شخصي باسم مروان',
    full:'مراجعة الحسابات أثبتت إن مروان كان بيحوّل جزء من دخل العزبة لحسابه الشخصي. التلاعب ده حقيقي، لكنه خط منفصل عن تسميم وليد.', unlocked:false, order:90 });
  c.ledgerAuditPuzzle.resultEvidenceIds = ['marwan_money_trail'];
  const y=c.suspects.find(s=>s.id==='nephew_youssef_o'); if(y){const q=y.questions.find(q=>q.closesInterrogation); if(q) q.requires=['youssef_o_exclusion','witness_youssef_near_plate','poisoned_plate'];}

})();

(() => {
  const s = CASE_OLD_ESTATE.suspects.find(x => x.id === 'nephew_youssef_o');
  if (s && !s.questions.some(x => x.q === 'وقت تقديم الأكل، كنت بتتحرك بين الأطباق بنفسك؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'وقت تقديم الأكل، كنت بتتحرك بين الأطباق بنفسك؟', requires:['youssef_o_exclusion'], a:'"كنت بساعد في المشروبات وأتحرك حوالين السفرة، بس داليا هي اللي كانت مسؤولة عن توزيع الأطباق."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_OLD_ESTATE;
  c.evidenceCombinations = [];
  const y = c.suspects.find(s => s.id === 'nephew_youssef_o');
  if (y) {
    const q = y.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "قربت من طبق وليد فعلًا وأنا بساعد على السفرة، وكنت غضبان من الوصية. لكن ده مش اعتراف إني حطيت السم. لازم تثبتوا التلوث ومسار وصولي للطبق."';
    }
  }
  c.conclusiveEvidenceIds = ['youssef_o_exclusion','witness_youssef_near_plate','poisoned_plate'];
  c.conclusiveRequired = 3;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_OLD_ESTATE;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='ask_dinner_witness')) c.investigationActions.push({
    id:'ask_dinner_witness', kind:'شاهد خارجي', label:'اسأل الحاضرين عن حركة الأطباق',
    description:'راجع مين اتحرك حوالين طبق وليد قبل التقديم.',
    requires:['poisoned_plate'], resultEvidenceIds:['witness_youssef_near_plate'],
    successText:'تم توثيق شهادة أحد الحاضرين عن حركة الأطباق.'
  });
})();
