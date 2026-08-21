/* ============================================================
   بيانات قضية: ليلة الافتتاح
   قضية قتل بطابع كوميدي/ساخر — ممثل ستاند أب بيموت فجأة على
   المسرح في أول عرض له، وسط جمهور مش فاهم لو ده جزء من العرض.
   ============================================================ */

const IMG_BASE_OPENINGNIGHT = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/opening-night/';

const CASE_OPENING_NIGHT = {
  id: 'opening-night',
  title: 'ليلة الافتتاح',
  caseNo: 'CASE 034',
  subtitle: 'مسرح صغير، وسط البلد، ليلة العرض الأول',
  coverImg: IMG_BASE_OPENINGNIGHT + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 17,
  teaser: 'ممثل ستاند أب كوميدي بينهار وبيموت فوق المسرح في نص أول عرض له، والجمهور فاكر إن ده جزء من الفقرة لحد ما بقى متأخر جدًا.',

  isPremium: false,
  categories: ['murder', 'comedy'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_OPENINGNIGHT + 'cover.webp',
    heroCaption: 'CASE 034 — أول عرض ستاند أب لسامر',
    text1: 'الكوميديان الصاعد "سامر" كان بيقدم أول عرض ستاند أب له في مسرح صغير وسط البلد، والصالة كانت كاملة العدد. في نص فقرته، سامر بدأ يتلعثم ويترنح، والجمهور ضحك فاكر إنها جزء من العرض، لحد ما وقع فعليًا وماتحركش تاني.',
    text2: 'الفحص الطبي الأولي كشف مادة سامة في كوباية المياه اللي كان بيشرب منها على المسرح. المخرج طلب منك تحقق بسرعة قبل ما القضية تتسرب للإعلام وتبوظ سمعة المسرح كله في أول ليلة افتتاح له.',
    meta: [
      { label:'المجني عليه', value:'سامر — كوميديان ستاند أب صاعد' },
      { label:'مكان الحادثة', value:'خشبة المسرح أثناء العرض' },
      { label:'الدليل المحوري', value:'كوباية مياه ملوّثة بمادة سامة' },
      { label:'طلب التحقيق', value:'مخرج المسرح' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قبل العرض',
      img: IMG_BASE_OPENINGNIGHT + 'opening-scene1.jpg',
      text:'سامر بيسخّن صوته خلف الكواليس، متوتر بس متحمس، الصالة بتمتلئ بالجمهور تدريجيًا.'
    },
    {
      scene:'المشهد ٢ — منتصف العرض',
      img: IMG_BASE_OPENINGNIGHT + 'opening-scene2.jpg',
      text:'سامر واقف على المسرح بيقدم فقرته، بياخد رشفة من كوباية المياه الموجودة على الترابيزة الصغيرة جنبه.'
    },
    {
      scene:'المشهد ٣ — الانهيار',
      img: IMG_BASE_OPENINGNIGHT + 'opening-scene3.jpg',
      text:'سامر بيبدأ يتلعثم بشكل غريب، الجمهور بيضحك فاكر إنها فقرة كوميدية، لحد ما بيقع فجأة على الأرض.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_OPENINGNIGHT + 'opening-scene4.jpg',
      text:'المخرج بيدّيك صلاحية تراجع كواليس المسرح، والناس اللي كانوا قريبين من كوباية المياه قبل العرض.'
    },
  ],

  suspects: [
    {
      id:'director_hisham', name:'هشام', role:'مخرج المسرح، طلب التحقيق', img: IMG_BASE_OPENINGNIGHT + 'hisham.jpg', avatarEmoji:'🎭',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'سامر كان أول ظهور له في مسرحك؟',
          a:'"أيوه، راهنت عليه كموهبة جديدة، كان متحمس جدًا للعرض ده."' },
        { q:'مين كان مسؤول عن تجهيز أدوات المسرح والكوباية؟', unlockId:'stage_setup_list',
          a:'"مساعد المسرح بيجهز كل حاجة قبل العرض بساعة تقريبًا."' },
      ]
    },
    {
      id:'rival_comedian_gehad', name:'جهاد', role:'كوميديان منافس، كان مفروض هو الأساسي في العرض', img: IMG_BASE_OPENINGNIGHT + 'gehad.jpg', avatarEmoji:'🎤',
      alibi:'قال إنه كان قاعد في الصالة زي أي متفرج عادي.',
      questions:[
        { q:'إيه اللي حصل بينك وبين سامر قبل العرض؟', unlockId:'gehad_rivalry',
          a:'"كان مفروض أنا اللي هقدم العرض ده، بس المخرج فضّل سامر في اللحظة الأخيرة. طبعًا زعلت، بس مش سبب أوصله لحد القتل."' },
        { q:'كنت قريب من الكواليس قبل العرض؟', unlockId:'gehad_seen_backstage',
          a:'(بيتردد) "دخلت أسلّم على سامر بالتوفيق بس، زي أي زميل."' },
      ]
    },
    {
      id:'stage_assistant_dina', name:'دينا', role:'مساعدة المسرح، مسؤولة عن التجهيزات', img: IMG_BASE_OPENINGNIGHT + 'dina.jpg', avatarEmoji:'🥤',
      alibi:'قالت إنها جهزت كل حاجة قبل العرض بساعة والتزمت بالبروتوكول المعتاد.',
      questions:[
        { q:'إنتِ اللي حطيتِ كوباية المياه على المسرح؟', unlockId:'dina_cup_prep',
          a:'"أيوه، بجهزها زي كل مرة وبحطها في نفس المكان قبل ما الجمهور يدخل."' },
        { q:'حد كان يقدر يوصل للكوباية بعد ما جهزتيها؟', requires:['dina_cup_prep'], unlockId:'cup_access_window',
          a:'"المسرح فاضي بعد التجهيز لحد ما العرض يبدأ، أي حد من طاقم المسرح كان يقدر يدخل."' },
      ]
    },
    {
      id:'manager_tarek_o', name:'طارق', role:'مدير أعمال سامر', img: IMG_BASE_OPENINGNIGHT + 'tarek_o.jpg', avatarEmoji:'📋',
      alibi:'قال إنه كان بره المسرح بيستقبل ضيوف مهمين.',
      questions:[
        { q:'علاقتك بسامر كانت مستقرة ماليًا؟', unlockId:'tarek_o_contract',
          a:'"كان في عقد جديد هيوقعه بعد العرض، عقد أفضل مع وكالة تانية غيري."' },
        { q:'شاهد أكد إنك دخلت الكواليس قبل العرض بدقايق، رغم إنك قلت كنت بره — عايز تفسر؟', requires:['tarek_o_contract','gehad_seen_backstage','cup_access_window'], closesInterrogation:true,
          a:'(بيسكت) "سامر كان هيسيبني لوكيل تاني بعد العرض ده، وده كان هيدمر شغلي. دخلت أحاول أقنعه يفضل معايا، حطيت حاجة في كوبايته بس كنت متوقع تأثير بسيط يخليه يأجل العرض مش يموت."' },
      ]
    },
  ],

  evidence: [
    { id:'poisoned_water_cup', tag:'من مسرح الحادثة', crit:true, title:'كوباية مياه ملوّثة', img: IMG_BASE_OPENINGNIGHT + 'opening-cup.jpg',
      short:'مادة سامة موجودة في كوباية المياه اللي كان بيشرب منها',
      full:'التحليل الطبي كشف مادة سامة بتركيز معين في كوباية المياه اللي كان سامر بيشرب منها فوق المسرح، وهي سبب انهياره المفاجئ.',
      unlocked:true, order:1 },

    { id:'stage_setup_list', tag:'من استجواب هشام', crit:false, title:'مسؤولية التجهيز', img:null,
      short:'مساعدة المسرح مسؤولة عن تجهيز أدوات المسرح',
      full:'هشام أكد إن دينا، مساعدة المسرح، هي المسؤولة عن تجهيز كل أدوات العرض بما فيها كوباية المياه.',
      unlocked:false, order:2 },

    { id:'gehad_rivalry', tag:'من استجواب جهاد', crit:false, title:'منافسة على الدور الرئيسي', img:null,
      short:'جهاد كان مفروض هو نجم العرض قبل ما ياخده سامر',
      full:'جهاد اعترف إنه كان مفروض هو الكوميديان الأساسي في العرض، بس المخرج فضّل سامر في اللحظة الأخيرة، وده سبب استياءه.',
      unlocked:false, order:3 },

    { id:'gehad_seen_backstage', tag:'من شهادة زميل', crit:false, title:'جهاد قريب من الكواليس', img:null,
      short:'زميل أكد وجود جهاد في الكواليس قبل العرض',
      full:'زميل في المسرح أكد إنه شاف جهاد في الكواليس قبل العرض بفترة قصيرة، بس من غير أي دليل مباشر يربطه بالكوباية.',
      unlocked:false, order:4 },

    { id:'dina_cup_prep', tag:'من استجواب دينا', crit:false, title:'دينا جهزت الكوباية', img:null,
      short:'دينا أكدت إنها جهزت الكوباية بنفسها زي المعتاد',
      full:'دينا أكدت إنها جهزت كوباية المياه بنفسها زي كل عرض، والتزمت بنفس البروتوكول المعتاد.',
      unlocked:false, order:5 },

    { id:'cup_access_window', tag:'من استجواب دينا', crit:true, title:'فترة وصول مفتوحة', img: IMG_BASE_OPENINGNIGHT + 'opening-backstage.jpg',
      short:'المسرح كان فاضي لفترة بعد التجهيز وقبل العرض',
      full:'دينا أكدت وجود فترة زمنية كان فيها المسرح فاضي بعد ما جهزت كل حاجة وقبل ما الجمهور يدخل، وأي حد من طاقم المسرح كان يقدر يدخل ويلوّث الكوباية.',
      unlocked:false, order:6 },

    { id:'tarek_o_contract', tag:'من استجواب طارق', crit:true, title:'عقد جديد مهدد', img:null,
      short:'سامر كان هيوقع عقد مع وكيل أعمال تاني',
      full:'طارق اعترف إن سامر كان هيوقع بعد العرض عقد جديد مع وكالة تانية، وده كان هيأثر بشكل كبير على دخله الشخصي.',
      unlocked:false, order:7 },
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
  ledgerAuditPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم جديد: polygraphPuzzle
     اللاعب بيسأل كل مشتبه فيه نفس السؤال، وشاشة كشف كذب بتوضح
     مستوى تذبذب واضح لكل إجابة. اللاعب لازم يحدد مين إجابته
     فيها أعلى مستوى تذبذب يدل على كذب.
     ============================================================ */
  polygraphPuzzle: {
    enabled: true,
    tabLabel: 'كشف الكذب',
    introText: 'اسأل كل المشتبه بيهم نفس السؤال: "هل لمست كوباية سامر قبل العرض؟" وراقب مستوى التذبذب على شاشة كشف الكذب لكل إجابة.',
    resultText: 'أعلى مستوى تذبذب كان مع طارق، وده بيأكد كذبه في إنكار وصوله للكوباية.',
    question: 'هل لمست كوباية سامر قبل العرض؟',
    suspectReadings: {
      director_hisham:        18,
      rival_comedian_gehad:   35,
      stage_assistant_dina:   22,
      manager_tarek_o:        87,
    },
    truthThreshold: 50,
    correctSuspectId: 'manager_tarek_o',
    resultEvidenceIds: ['tarek_o_contract'],
  },

  evidenceCombinations: [
    { parts:['tarek_o_contract','cup_access_window'], resultId:'gehad_seen_backstage' },
  ],

  correctSuspectId: 'manager_tarek_o',
  conclusiveEvidenceIds: ['tarek_o_contract', 'cup_access_window', 'poisoned_water_cup'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن طارق هو الفاعل؟',
        options: [
          { id:'a', text:'أعلى مستوى تذبذب في كشف الكذب + فترة الوصول المفتوحة للكوباية + دافعه المالي الواضح المرتبط بالعقد الجديد' },
          { id:'b', text:'لأنه مدير أعماله وده يكفي' },
          { id:'c', text:'لأن جهاد كان المنافس الأوضح' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية طارق الحقيقية؟',
        options: [
          { id:'a', text:'ماكنش ناوي يقتله؛ كان عايز يأثر عليه بشكل بسيط يخليه يأجل توقيع العقد الجديد، لكن الجرعة كانت أقوى بكتير من اللي توقعها' },
          { id:'b', text:'كان ناوي يقتله من البداية عشان الغيرة المهنية' },
          { id:'c', text:'كان بيحاول يساعده يستعد للعرض بمكمل غذائي' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'العرض اللي ما خلصش',
      paragraphs:[
        'طارق كان خايف إن سامر يسيبه لوكيل أعمال تاني بعد نجاح العرض، وده كان هيدمر دخله ومكانته. حاول يأثر على سامر بمادة خفيفة تخليه يأجل توقيع العقد الجديد، لكن الجرعة اللي استخدمها كانت أقوى بكتير من اللي توقعها.',
        'أعلى مستوى تذبذب في كشف الكذب فضح إنكاره، وفترة الوصول المفتوحة للكوباية اللي أكدتها دينا، ودافعه المالي الواضح المرتبط بالعقد الجديد، كلها أدلة حاصرته وأثبتت مسؤوليته عن مأساة أول عرض لسامر.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية طارق، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: كشف الكذب، فترة الوصول للكوباية، ودافعه المالي، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى سامر فضلت مرتبطة بتهمة مالهاش أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "ليلة الافتتاح"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty small theater stage at night, a
   single microphone stand and a spotlight, a water cup on a small
   table, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (opening-scene1.jpg):
   "Photorealistic shot of a young Egyptian male comedian warming up
   backstage before a show, nervous excited expression, dim
   backstage lighting, photorealistic, no text, no watermark"

   المشهد ٢ (opening-scene2.jpg):
   "Photorealistic shot of a comedian performing on a small stage
   under a spotlight, holding a microphone, audience silhouettes in
   the foreground, photorealistic, no text, no watermark"

   المشهد ٣ (opening-scene3.jpg):
   "Photorealistic dramatic shot of a comedian collapsing on a stage
   floor under a spotlight, scattered stage props, photorealistic,
   no text, no watermark"

   المشهد ٤ (opening-scene4.jpg):
   "Photorealistic shot of a theater director reviewing backstage
   footage on a small monitor, dim backstage lighting,
   photorealistic, no text, no watermark"

   هشام (hisham.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male theater
   director, smart casual outfit, concerned authoritative
   expression, standing backstage, dim theater lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   جهاد (gehad.jpg):
   "Photorealistic portrait of a young Egyptian male comedian,
   casual stylish outfit, guarded slightly resentful expression,
   sitting in an empty theater audience seat, dim house lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دينا (dina.jpg):
   "Photorealistic portrait of a young Egyptian female stage
   assistant, casual practical outfit, nervous attentive
   expression, standing backstage near stage props, dim backstage
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   طارق (tarek_o.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male talent
   manager, sharp business casual attire, calculating nervous
   expression, standing in a theater lobby, warm lobby lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل الكوباية (opening-cup.jpg):
   "Photorealistic close-up of a water cup on a small stage table
   under spotlight, forensic evidence photography style, no text,
   no watermark, photorealistic"

   دليل الكواليس (opening-backstage.jpg):
   "Photorealistic shot of an empty backstage area with theater
   props and costumes, dim atmospheric lighting, no text, no
   watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_OPENING_NIGHT;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'tarek_o_polygraph_lie', tag:'من اختبار كشف الكذب', crit:true, title:'طارق كدب عن دخوله الكواليس', img:null,
    short:'كشف الكذب دعم الشهادة اللي بتحط طارق في الكواليس قبل العرض',
    full:'نتيجة كشف الكذب أظهرت تذبذب قوي عند طارق لما أنكر وصوله للكواليس والكوباية قبل العرض.', unlocked:false, order:90 });
  c.polygraphPuzzle.resultEvidenceIds = ['tarek_o_polygraph_lie'];
  c.conclusiveEvidenceIds = ['tarek_o_contract','gehad_seen_backstage','tarek_o_polygraph_lie'];
  const t=c.suspects.find(s=>s.id==='manager_tarek_o'); if(t){const q=t.questions.find(q=>q.closesInterrogation); if(q) q.requires=['tarek_o_contract','gehad_seen_backstage','cup_access_window'];}
  setTheory0('كشف الكذب اللي فضح إنكار طارق + شهادة جهاد اللي حطته في الكواليس قبل العرض + دافعه المالي بسبب عقد سامر الجديد');
  c.endings.good.paragraphs[1] = 'كشف الكذب اللي فضح إنكار طارق، وشهادة جهاد اللي أثبتت دخوله الكواليس قبل العرض، ودافعه المالي المباشر المرتبط بعقد سامر الجديد، كلها أدلة حاصرته بدل الاعتماد على مجرد إن الكوباية كانت متاحة لأكتر من شخص.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: عقد سامر الجديد، شهادة دخول طارق للكواليس، ونتيجة كشف الكذب، قبل ما تتهم.';

})();

(() => {
  const s = CASE_OPENING_NIGHT.suspects.find(x => x.id === 'manager_tarek_o');
  if (s && !s.questions.some(x => x.q === 'دخلت الكواليس قبل بداية العرض؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'دخلت الكواليس قبل بداية العرض؟', requires:['tarek_o_contract'], a:'"لأ، فضلت بره أتابع التنظيم. ماكانش عندي سبب أدخل عند سامر قبل ما يطلع المسرح."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_OPENING_NIGHT;
  if (c.polygraphPuzzle) {
    c.polygraphPuzzle.enabled = false;
    const bad = c.polygraphPuzzle.resultEvidenceIds || [];
    c.evidence = c.evidence.filter(e => !bad.includes(e.id));
    c.polygraphPuzzle.resultEvidenceIds = [];
  }
  c.evidenceCombinations = [];
  const t = c.suspects.find(s => s.id === 'manager_tarek_o');
  if (t) {
    const q = t.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "دخلت الكواليس فعلًا عشان أكلمه عن العقد قبل العرض، لكن ماحطتش حاجة في الكوباية. وجودي هناك ودافعي المالي يخلوني مشتبه، مش مذنب تلقائيًا."';
    }
  }
  c.conclusiveEvidenceIds = ['tarek_o_contract','cup_access_window','poisoned_water_cup'];
  c.conclusiveRequired = 3;
})();
