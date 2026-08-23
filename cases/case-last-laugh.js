/* ============================================================
   بيانات قضية: ضحكة أخيرة
   قضية قتل بطابع كوميدي/ساخر — كاتب سيناريو كوميدي بيموت في
   بروفة مسرحية بطريقة غريبة تشبه مشهد من نصه بالذات.
   ============================================================ */

const IMG_BASE_LASTLAUGH = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-laugh/';

const CASE_LAST_LAUGH = {
  id: 'last-laugh',
  title: 'ضحكة أخيرة',
  caseNo: 'CASE 053',
  subtitle: 'مسرح صغير، بروفة عرض كوميدي',
  coverImg: IMG_BASE_LASTLAUGH + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 32,
  investigationPoints: 18,
  teaser: 'كاتب سيناريو كوميدي بيموت أثناء بروفة مسرحية بطريقة غريبة جدًا شبه مشهد كتبه هو بنفسه في النص، وسط ضحك الممثلين لحد ما يكتشفوا إنها مش تمثيل.',

  isPremium: false,
  categories: ['murder', 'comedy'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_LASTLAUGH + 'cover.webp',
    heroCaption: 'CASE 053 — بروفة المشهد الأخير',
    text1: 'الكاتب الكوميدي "بهاء" كان بيحضر بروفة مسرحيته الجديدة، وقرر يشارك في مشهد صغير بنفسه كمزحة مع الممثلين. أثناء المشهد، اللي فيه بهاء بياخد "جرعة سم وهمية"، بدأ بهاء يتصرف بشكل غريب فعليًا، والممثلين ضحكوا فاكرين إنه بيمثل بإتقان، لحد ما وقع بجد ومات.',
    text2: 'مخرج المسرحية طلب منك تحقق بسرعة قبل ما القضية تتحول لفضيحة إعلامية غريبة. عندك نسخة من النص المسرحي بالذات، وقائمة فريق العمل اللي كان حاضر البروفة.',
    meta: [
      { label:'المجني عليه', value:'بهاء — كاتب سيناريو كوميدي' },
      { label:'مكان الحادثة', value:'خشبة المسرح أثناء البروفة' },
      { label:'الغرابة', value:'الوفاة شبه مشهد كتبه بهاء بنفسه في النص' },
      { label:'طلب التحقيق', value:'مخرج المسرحية' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — البروفة',
      img: IMG_BASE_LASTLAUGH + 'laugh-scene1.jpg',
      text:'فريق التمثيل بيبروف مشهد كوميدي، بهاء بيقرر يشارك بنفسه في دور صغير كمزحة مع الممثلين.'
    },
    {
      scene:'المشهد ٢ — المشهد',
      img: IMG_BASE_LASTLAUGH + 'laugh-scene2.jpg',
      text:'بهاء بيمثل مشهد "شرب السم الوهمي" من كوباية على المسرح، والممثلين بيضحكوا على أدائه المبالغ فيه.'
    },
    {
      scene:'المشهد ٣ — الانهيار',
      img: IMG_BASE_LASTLAUGH + 'laugh-scene3.jpg',
      text:'بهاء بيبدأ يتصرف بشكل غريب فعليًا، والممثلين لسه فاكرين إنها جزء من الأداء، لحد ما يقع بجد ومايتحركش.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_LASTLAUGH + 'laugh-scene4.jpg',
      text:'مخرج المسرحية بيديك نسخة من النص، وقائمة فريق العمل اللي كان حاضر البروفة.'
    },
  ],

  suspects: [
    {
      id:'director_ihab_l', name:'إيهاب', role:'مخرج المسرحية، طلب التحقيق', img: IMG_BASE_LASTLAUGH + 'ihab_l.jpg', avatarEmoji:'🎭',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'الكوباية اللي استخدمها بهاء كانت جزء من الديكور المعتاد؟',
          a:'"أيوه، دايمًا بنستخدم كوباية فاضية أو مياه عادية في البروفات، مفيش سبب تكون فيها حاجة حقيقية."' },
        { q:'مين كان مسؤول عن ديكور المسرح والأدوات؟', unlockId:'props_responsibility',
          a:'"مسؤول الديكور بيجهز كل حاجة قبل كل بروفة."' },
      ]
    },
    {
      id:'lead_actor_ashraf_l', name:'أشرف', role:'الممثل الرئيسي في المسرحية', img: IMG_BASE_LASTLAUGH + 'ashraf_l.jpg', avatarEmoji:'🎬',
      alibi:'قال إنه كان على المسرح بعيد عن الكوباية طول البروفة.',
      questions:[
        { q:'علاقتك ببهاء كانت مستقرة في الفترة الأخيرة؟', unlockId:'ashraf_l_tension',
          a:'"كان بينا خلاف على تعديلات في النص، بهاء رفض يغير حاجات كنت شايفها مهمة لدوري."' },
        { q:'قربت من الكوباية قبل المشهد؟', requires:['ashraf_l_tension'],
          a:'(بيتردد) "مريت جنب الطاولة بس، ده جزء طبيعي من تحركاتي على المسرح."' },
      ]
    },
    {
      id:'props_manager_walaa', name:'ولاء', role:'مسؤولة الديكور والأدوات', img: IMG_BASE_LASTLAUGH + 'walaa.jpg', avatarEmoji:'🍶',
      alibi:'قالت إنها جهزت كل حاجة حسب البروتوكول المعتاد.',
      questions:[
        { q:'إنتِ اللي جهزتِ كوباية بهاء بالذات؟', unlockId:'walaa_cup_prep',
          a:'"أيوه، بجهزها زي كل بروفة، مياه عادية بس."' },
        { q:'حد قدر يوصل للكوباية بعد ما جهزتيها؟', requires:['walaa_cup_prep'], unlockId:'walaa_access_window',
          a:'"المسرح بيفضل مفتوح للفريق كله قبل البروفة، أي حد كان يقدر يقرب."' },
      ]
    },
    {
      id:'rival_writer_maher', name:'ماهر', role:'كاتب منافس، كان مفروض يكتب نفس المسرحية', img: IMG_BASE_LASTLAUGH + 'maher.jpg', avatarEmoji:'✍️',
      alibi:'قال إنه كان قاعد في الصالة كضيف يتابع البروفة.',
      questions:[
        { q:'إيه اللي حصل بينك وبين بهاء على المسرحية دي؟', unlockId:'maher_rivalry',
          a:'"كان مفروض أنا اللي أكتبها، بس المنتج فضّل نص بهاء في اللحظة الأخيرة، طبعًا زعلت بشدة."' },
        { q:'كنت قريب من المسرح قبل البروفة؟', requires:['maher_rivalry'], unlockId:'maher_seen_backstage_l',
          a:'(بيتردد) "دخلت أسلّم على الفريق بس، زي أي كاتب مهتم بالعرض."' },
      ]
    },
  ],

  evidence: [
    { id:'poisoned_prop_cup', tag:'من مسرح الحادثة', crit:true, title:'كوباية ملوّثة بمادة حقيقية', img: IMG_BASE_LASTLAUGH + 'laugh-cup.jpg',
      short:'مادة سامة حقيقية موجودة في كوباية المشهد بدل المياه العادية',
      full:'التحليل الطبي كشف مادة سامة حقيقية في كوباية المشهد، بدل المياه العادية المستخدمة عادة في البروفات.',
      unlocked:true, order:1 },

    { id:'props_responsibility', tag:'من استجواب إيهاب', crit:false, title:'مسؤولية الديكور', img:null,
      short:'ولاء مسؤولة عن تجهيز كل أدوات المسرح',
      full:'إيهاب أكد إن ولاء هي المسؤولة عن تجهيز كل أدوات وديكور المسرح قبل كل بروفة.',
      unlocked:false, order:2 },

    { id:'ashraf_l_tension', tag:'من استجواب أشرف', crit:false, title:'خلاف على تعديلات النص', img:null,
      short:'أشرف وبهاء في خلاف على تعديلات النص',
      full:'أشرف اعترف بوجود خلاف بينه وبين بهاء على تعديلات في النص كان يشوفها مهمة لدوره.',
      unlocked:false, order:3 },

    { id:'walaa_cup_prep', tag:'من استجواب ولاء', crit:false, title:'ولاء جهزت الكوباية', img:null,
      short:'ولاء أكدت إنها جهزت الكوباية بمياه عادية',
      full:'ولاء أكدت إنها جهزت كوباية بهاء بمياه عادية زي كل بروفة، حسب البروتوكول المعتاد.',
      unlocked:false, order:4 },

    { id:'walaa_access_window', tag:'من استجواب ولاء', crit:true, title:'فترة وصول مفتوحة للمسرح', img:null,
      short:'المسرح مفتوح للفريق كله قبل البروفة',
      full:'ولاء أكدت إن المسرح بيفضل مفتوح لكل الفريق قبل البروفة، وأي حد كان يقدر يقرب من الكوباية.',
      unlocked:false, order:5 },

    { id:'maher_rivalry', tag:'من استجواب ماهر', crit:true, title:'منافسة على كتابة المسرحية', img:null,
      short:'ماهر كان مفروض هو كاتب المسرحية قبل ما ياخدها بهاء',
      full:'ماهر اعترف إنه كان مفروض هو كاتب المسرحية، بس المنتج فضّل نص بهاء في اللحظة الأخيرة.',
      unlocked:false, order:6 },

    { id:'maher_seen_backstage_l', tag:'من شهادة فريق العمل', crit:true, title:'ماهر قريب من الكواليس', img: IMG_BASE_LASTLAUGH + 'laugh-backstage.jpg',
      short:'شاهد أكد وجود ماهر في الكواليس قبل البروفة',
      full:'أحد أفراد الفريق أكد إنه شاف ماهر في الكواليس قبل البروفة بفترة قصيرة، رغم إنه ادّعى إنه كان قاعد في الصالة طول الوقت.',
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
  ledgerAuditPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  polygraphPuzzle: {
    enabled: true,
    tabLabel: 'كشف الكذب',
    introText: 'اسأل كل المشتبه بيهم: "هل قربت من كوباية بهاء قبل المشهد؟" وراقب مستوى التذبذب على شاشة كشف الكذب.',
    resultText: 'أعلى مستوى تذبذب كان مع ماهر، وده بيأكد كذبه في إنكار وجوده قريب من المسرح.',
    question: 'هل قربت من كوباية بهاء قبل المشهد؟',
    suspectReadings: {
      director_ihab_l:    10,
      lead_actor_ashraf_l: 38,
      props_manager_walaa: 25,
      rival_writer_maher:  89,
    },
    truthThreshold: 50,
    correctSuspectId: 'rival_writer_maher',
    resultEvidenceIds: ['maher_seen_backstage_l'],
  },

  evidenceCombinations: [
    { parts:['maher_rivalry','walaa_access_window'], resultId:'maher_seen_backstage_l' },
  ],

  correctSuspectId: 'rival_writer_maher',
  conclusiveEvidenceIds: ['maher_rivalry', 'maher_seen_backstage_l', 'poisoned_prop_cup'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن ماهر هو الفاعل؟',
        options: [
          { id:'a', text:'أعلى مستوى تذبذب في كشف الكذب + شهادة فريق العمل اللي كذّبت حجة غيابه عن الكواليس + دافعه الواضح المرتبط بخسارته فرصة كتابة المسرحية' },
          { id:'b', text:'لأنه كاتب منافس وده يكفي كدافع' },
          { id:'c', text:'لأن أشرف كان له خلاف مع بهاء' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية ماهر الحقيقية؟',
        options: [
          { id:'a', text:'كان عايز ينتقم بشكل رمزي من بهاء بإفساد مشهد من نصه بالذات قدام الفريق كله، بس المادة اللي استخدمها كانت أخطر بكتير من مجرد "إحراج" مقصود' },
          { id:'b', text:'كان ناوي يقتله من البداية عشان ياخد مكانه في كتابة المسرحية' },
          { id:'c', text:'كان بيحاول يوقع ولاء في المشكلة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'المشهد اللي انقلب لجريمة حقيقية',
      paragraphs:[
        'ماهر كان غاضب جدًا لما المنتج فضّل نص بهاء عليه في اللحظة الأخيرة. قرر ينتقم بشكل رمزي بإفساد مشهد "شرب السم الوهمي" من نص بهاء بالذات، عشان يحرجه قدام الفريق كله. لكن المادة اللي استخدمها في الكوباية كانت أخطر بكتير من مجرد إحراج مقصود، وانتهى الأمر بمقتل بهاء.',
        'أعلى مستوى تذبذب في كشف الكذب فضح إنكاره، وشهادة فريق العمل اللي كذّبت حجة غيابه عن الكواليس، ودافعه الواضح المرتبط بخسارته فرصة كتابة المسرحية، كلها أدلة حاصرته وكشفت المفارقة المأساوية وراء "الضحكة الأخيرة".',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية ماهر، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: كشف الكذب، شهادة فريق العمل، ودافعه المهني، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى بهاء فضلت مرتبطة بحادثة غامضة مالهاش تفسير حقيقي، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "ضحكة أخيرة"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty small theater stage during
   rehearsal, script pages scattered on the floor, dim stage
   lighting, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (laugh-scene1.jpg):
   "Photorealistic shot of actors rehearsing a comedic scene on a
   small stage, warm rehearsal lighting, photorealistic, no text, no
   watermark"

   المشهد ٢ (laugh-scene2.jpg):
   "Photorealistic shot of a middle-aged man performing an exaggerated
   comedic scene on stage holding a cup, warm stage lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (laugh-scene3.jpg):
   "Photorealistic dramatic shot of a man collapsing on a rehearsal
   stage floor, actors reacting in confusion nearby, dim stage
   lighting, photorealistic, no text, no watermark"

   المشهد ٤ (laugh-scene4.jpg):
   "Photorealistic shot of a theater director handing a script to an
   investigator backstage, dim backstage lighting, photorealistic,
   no text, no watermark"

   إيهاب (ihab_l.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male theater
   director, smart casual outfit, concerned expression, standing
   backstage, dim theater lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   أشرف (ashraf_l.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male actor,
   casual rehearsal outfit, guarded uncomfortable expression,
   standing on a stage, dim stage lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   ولاء (walaa.jpg):
   "Photorealistic portrait of a young Egyptian female props manager,
   casual practical outfit, nervous attentive expression, standing
   near stage props, dim backstage lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   ماهر (maher.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   playwright, smart casual outfit, resentful calculating
   expression, sitting in an empty theater audience seat, dim house
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   دليل الكوباية (laugh-cup.jpg):
   "Photorealistic close-up of a cup on a small stage table under
   spotlight, forensic evidence photography style, no text, no
   watermark, photorealistic"

   دليل الكواليس (laugh-backstage.jpg):
   "Photorealistic shot of an empty backstage area with theater
   props and costumes, dim atmospheric lighting, no text, no
   watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_LAST_LAUGH;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'maher_polygraph_lie', tag:'من اختبار كشف الكذب', crit:true, title:'ماهر كدب عن وجوده في الكواليس', img:null,
    short:'أعلى تذبذب ظهر عند ماهر لما أنكر وجوده قرب المسرح',
    full:'نتيجة كشف الكذب دعمت شهادة فريق العمل وأظهرت تذبذب قوي عند ماهر لما أنكر دخوله الكواليس قبل البروفة.', unlocked:false, order:90 });
  c.polygraphPuzzle.resultEvidenceIds = ['maher_polygraph_lie'];
  c.conclusiveEvidenceIds = ['maher_rivalry','maher_seen_backstage_l','poisoned_prop_cup'];
  const m=c.suspects.find(s=>s.id==='rival_writer_maher');
  if(m && !m.questions.some(q=>q.closesInterrogation)) m.questions.push({
    q:'فريق المسرح شافك في الكواليس، وكشف الكذب فضح إنكارك، وإنت عندك دافع واضح بعد استبعاد نصك. لمست كوباية المشهد؟',
    requires:['maher_rivalry','maher_seen_backstage_l','maher_polygraph_lie'], closesInterrogation:true,
    a:'(بينزل عينه) "أيوه. كنت عايز أفسد المشهد وأحرجه قدام الفريق، ماكنتش متخيل إن المادة اللي استخدمتها ممكن تقتله."'
  });
  c.endings.partial.hint = 'اجمع على الأقل 3 أدلة من: دافع ماهر، وجوده في الكواليس، ونتيجة كشف الكذب، قبل ما تتهم.';

})();

/* ENDING CONSISTENCY PATCH */
(() => {
  const c=CASE_LAST_LAUGH;
  c.evidence.push({id:'maher_cup_forensics',tag:'فحص جنائي للكوباية',crit:true,title:'أثر ماهر على غطاء السم',img:null,short:'بصمة ماهر وأثر المادة اتجمعوا على الغطاء',full:'الفحص وجد بصمة ماهر على الغطاء الداخلي لعبوة المادة المستخدمة، مع بقايا من نفس السم الموجود في كوباية المشهد.',unlocked:false,order:99});
  c.investigationActions=[...(c.investigationActions||[]),{id:'forensic_prop_cup',kind:'تحليل جنائي',label:'افحص الكوباية وعبوات الكواليس',requires:['poisoned_prop_cup','maher_seen_backstage_l'],resultEvidenceIds:['maher_cup_forensics'],successText:'الفحص ربط ماهر مباشرة بعبوة السم المستخدمة.'}];
  c.conclusiveEvidenceIds=['maher_seen_backstage_l','poisoned_prop_cup','maher_cup_forensics']; c.conclusiveRequired=3;
  c.endings.good.paragraphs[1]='شهادة الفريق أثبتت وجود ماهر في الكواليس، والتحليل أثبت السم في كوباية المشهد، وبصمته مع بقايا المادة على غطاء العبوة ربطته مباشرة بتحضيرها. الأدلة المادية هي اللي حسمت القضية.';
})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LAST_LAUGH;
  if (c.polygraphPuzzle) {
    c.polygraphPuzzle.enabled = false;
    c.polygraphPuzzle.resultEvidenceIds = [];
  }
  c.evidence = c.evidence.filter(e => e.id !== 'maher_polygraph_lie');
  c.evidenceCombinations = [];
  const m = c.suspects.find(s => s.id === 'rival_writer_maher');
  if (m) {
    const q = m.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'إنت اعترفت إنك كنت في الكواليس رغم إنك حاولت تقلل من وجودك هناك، وعندك خلاف واضح مع بهاء. لمست كوباية المشهد؟';
      q.requires = ['maher_rivalry','maher_seen_backstage_l','poisoned_prop_cup'];
      q.a = '(بيتضايق) "كنت في الكواليس فعلًا، بس ما لمستش الكوباية. وجودي هناك وخلافي معاه مش كفاية تقولوا إني سممته."';
    }
  }
  c.conclusiveRequired = 3;
})();
