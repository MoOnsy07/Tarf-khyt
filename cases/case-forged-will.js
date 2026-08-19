/* ============================================================
   بيانات قضية: الوصية المزورة
   قضية تزوير — محامي بيكتشف توقيع مزور في وصية عميل ميت
   حديثًا، وسط عيلة مستعجلة على تقسيم الميراث.
   ============================================================ */

const IMG_BASE_FORGEDWILL = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/forged-will/';

const CASE_FORGED_WILL = {
  id: 'forged-will',
  title: 'الوصية المزورة',
  caseNo: 'CASE 041',
  subtitle: 'مكتب محاماة، وسط البلد',
  coverImg: IMG_BASE_FORGEDWILL + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 34,
  investigationPoints: 19,
  teaser: 'محامي بيراجع وصية عميل ميت حديثًا، ويلاحظ تفاصيل صغيرة في التوقيع بتوحي بالتزوير. مين من الورثة كان مستعد يزوّر توقيع أبوه عشان ياخد نصيب أكبر؟',

  isPremium: false,
  categories: ['forgery', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FORGEDWILL + 'cover.webp',
    heroCaption: 'CASE 041 — قبل قراءة الوصية بيوم',
    text1: 'المحامي "سليم" كان بيراجع وصية العميل "فؤاد" اللي توفي حديثًا، قبل قراءتها رسميًا للعيلة. لاحظ إن التوقيع في آخر صفحة فيه اختلافات طفيفة جدًا عن باقي توقيعات فؤاد في مستندات قديمة.',
    text2: 'سليم طلب منك تحقق بسرعة وسرية قبل ما يقدم الوصية رسميًا للمحكمة، عشان ما يتسببش في توزيع ميراث بناءً على مستند مزوّر. عندك نسخ من توقيعات فؤاد القديمة، وقائمة الورثة المحتملين.',
    meta: [
      { label:'المتوفى', value:'فؤاد — صاحب الوصية' },
      { label:'الشك', value:'التوقيع في آخر صفحة مختلف بشكل طفيف' },
      { label:'الدليل المحوري', value:'مستندات توقيع قديمة للمقارنة' },
      { label:'طلب التحقيق', value:'سليم، محامي العائلة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — المراجعة',
      img: IMG_BASE_FORGEDWILL + 'will-scene1.jpg',
      text:'سليم بيراجع مستندات الوصية بعناية في مكتبه، ضوء المصباح على الورق بيبرز تفاصيل التوقيع.'
    },
    {
      scene:'المشهد ٢ — الشك',
      img: IMG_BASE_FORGEDWILL + 'will-scene2.jpg',
      text:'سليم بيحط توقيع الوصية جنب توقيعات قديمة لفؤاد، ويلاحظ اختلافات طفيفة في زاوية الحروف.'
    },
    {
      scene:'المشهد ٣ — القرار',
      img: IMG_BASE_FORGEDWILL + 'will-scene3.jpg',
      text:'سليم بيقرر يأجل تقديم الوصية للمحكمة ويبدأ يجمع كل المستندات القديمة اللي فيها توقيع فؤاد.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_FORGEDWILL + 'will-scene4.jpg',
      text:'سليم بيديك ملف كامل من مستندات فؤاد القديمة، وقائمة الورثة اللي كانوا قريبين منه في آخر أيامه.'
    },
  ],

  suspects: [
    {
      id:'elder_son_karim_w', name:'كريم', role:'الابن الأكبر لفؤاد', img: IMG_BASE_FORGEDWILL + 'karim_w.jpg', avatarEmoji:'✍️',
      alibi:'قال إنه كان مسافر خارج البلد وقت كتابة الوصية.',
      questions:[
        { q:'علاقتك بأبوك كانت مستقرة في آخر أيامه؟', unlockId:'karim_w_estranged',
          a:'"كان بينا خلاف قديم على قرارات مهنية، بس كنا في طريقنا نتصالح."' },
        { q:'نصيبك في الوصية كان أقل من المتوقع؟', requires:['karim_w_estranged'],
          a:'(بيتردد) "أقل بكتير من إخواتي، وده فاجأني صراحة."' },
      ]
    },
    {
      id:'younger_daughter_rana_w', name:'رنا', role:'الابنة الصغرى لفؤاد', img: IMG_BASE_FORGEDWILL + 'rana_w.jpg', avatarEmoji:'📝',
      alibi:'قالت إنها كانت بترعى أبوها في آخر أيامه، فكانت قريبة منه معظم الوقت.',
      questions:[
        { q:'إنتِ كنتِ آخر واحدة قريبة من أبوكِ؟', unlockId:'rana_w_closeness',
          a:'"أيوه، كنت بقعد معاه ساعات طويلة، هو كان بيثق فيا أكتر من إخواتي."' },
        { q:'شفتِ حد بيوقّع أي مستندات مع أبوكِ في آخر أسبوعين؟', requires:['rana_w_closeness'], unlockId:'rana_w_paperwork_seen',
          a:'"شفت المحاسب بتاعه بيجيله كذا مرة بمستندات، بس ماعرفتش تفاصيل."' },
      ]
    },
    {
      id:'accountant_sherif_w', name:'شريف', role:'محاسب فؤاد الشخصي', img: IMG_BASE_FORGEDWILL + 'sherif_w.jpg', avatarEmoji:'📊',
      alibi:'قال إنه كان بيساعد فؤاد في أوراقه المالية العادية بس.',
      questions:[
        { q:'علاقتك بفؤاد كانت مالية بحتة؟', unlockId:'sherif_w_relationship',
          a:'"أيوه، كنت بدير حساباته وأساعده في الأوراق الرسمية من سنين."' },
        { q:'كان عندك وصول لتوقيعات فؤاد القديمة كمرجع؟', requires:['sherif_w_relationship'], unlockId:'sherif_w_signature_access',
          a:'(بيتردد) "طبيعي، عندي أرشيف كامل من مستنداته الموقعة على مدار سنين."' },
      ]
    },
    {
      id:'family_friend_nabil', name:'نبيل', role:'صديق مقرب لفؤاد، شاهد على الوصية رسميًا', img: IMG_BASE_FORGEDWILL + 'nabil.jpg', avatarEmoji:'🖋️',
      alibi:'قال إنه كان شاهد رسمي على توقيع الوصية زي ما هو مطلوب قانونيًا.',
      questions:[
        { q:'إنت فعلاً شفت فؤاد بيوقع الوصية بنفسه؟', unlockId:'nabil_witness_claim',
          a:'"أيوه، كنت واقف جنبه لما وقّع، شفته بعيني."' },
        { q:'استفدت ماليًا من التوقيع على الوصية دي؟', requires:['nabil_witness_claim','sherif_w_signature_access','rana_w_paperwork_seen'], closesInterrogation:true,
          a:'(بيسكت طويل) "شريف عرض عليّ مبلغ كبير عشان أشهد على وصية مزورة كتبها هو، وأنا وقعت كشاهد كاذب. مقصدش أضر بحد بالطريقة دي."' },
      ]
    },
  ],

  evidence: [
    { id:'signature_discrepancy', tag:'من مقارنة سليم', crit:true, title:'اختلاف طفيف في التوقيع', img: IMG_BASE_FORGEDWILL + 'will-signature.jpg',
      short:'زاوية الحروف في توقيع الوصية مختلفة عن التوقيعات القديمة',
      full:'سليم لاحظ اختلافات طفيفة جدًا في زاوية وضغط القلم بين توقيع الوصية وتوقيعات فؤاد القديمة الموثقة.',
      unlocked:true, order:1 },

    { id:'karim_w_estranged', tag:'من استجواب كريم', crit:false, title:'خلاف كريم مع فؤاد', img:null,
      short:'خلاف قديم على قرارات مهنية بين كريم وأبوه',
      full:'كريم اعترف بوجود خلاف قديم مع أبوه على قرارات مهنية، بس أكد إنهم كانوا في طريقهم للتصالح.',
      unlocked:false, order:2 },

    { id:'rana_w_closeness', tag:'من استجواب رنا', crit:false, title:'قرب رنا من أبوها', img:null,
      short:'رنا كانت أقرب الأبناء لفؤاد في آخر أيامه',
      full:'رنا أكدت إنها كانت الأقرب لأبوها في آخر أيامه، وإنه كان بيثق فيها أكتر من إخواتها.',
      unlocked:false, order:3 },

    { id:'rana_w_paperwork_seen', tag:'من استجواب رنا', crit:false, title:'زيارات المحاسب المتكررة', img:null,
      short:'رنا شافت شريف بيجي بمستندات كذا مرة',
      full:'رنا أكدت إنها شافت شريف المحاسب بيجي لأبوها بمستندات كذا مرة في آخر أسبوعين قبل وفاته.',
      unlocked:false, order:4 },

    { id:'sherif_w_relationship', tag:'من استجواب شريف', crit:false, title:'علاقة شريف المالية بفؤاد', img:null,
      short:'شريف كان بيدير حسابات فؤاد من سنين',
      full:'شريف أكد إنه كان مسؤول عن إدارة حسابات فؤاد المالية والأوراق الرسمية من سنين طويلة.',
      unlocked:false, order:5 },

    { id:'sherif_w_signature_access', tag:'من استجواب شريف', crit:true, title:'أرشيف توقيعات فؤاد', img:null,
      short:'شريف عنده أرشيف كامل من توقيعات فؤاد القديمة',
      full:'شريف اعترف بامتلاكه أرشيف كامل من مستندات فؤاد الموقعة على مدار سنين، وده كان بيديه القدرة على تقليد توقيعه بدقة.',
      unlocked:false, order:6 },

    { id:'nabil_witness_claim', tag:'من استجواب نبيل', crit:false, title:'شهادة نبيل الرسمية', img:null,
      short:'نبيل بيدّعي إنه شاف فؤاد بيوقع بنفسه',
      full:'نبيل أكد إنه كان شاهد رسمي على توقيع فؤاد للوصية، وإنه شافه بيوقعها بنفسه.',
      unlocked:false, order:7 },

    { id:'handwriting_analysis_w', tag:'من تحليل خبير خطوط', crit:true, title:'تحليل خبير الخطوط', img: IMG_BASE_FORGEDWILL + 'will-analysis.jpg',
      short:'خبير الخطوط بيأكد إن التوقيع مقلّد باحترافية عالية',
      full:'تحليل خبير الخطوط أكد إن توقيع الوصية مقلّد باحترافية عالية جدًا، بأسلوب بيتماشى مع شخص عنده وصول كبير لأرشيف توقيعات حقيقية.',
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
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم جديد: handwritingPuzzle
     اللاعب بيقارن بصريًا بين عينة خط توقيع أصلية وعينة من
     الوصية، وبيحدد أوجه الاختلاف الدقيقة (زاوية الحروف، ضغط
     القلم، مسافة التباعد) عشان يثبت التزوير.
     ============================================================ */
  handwritingPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الخط',
    introText: 'قارن توقيع الوصية بتوقيعات فؤاد القديمة الموثقة، وحدد نقاط الاختلاف الدقيقة اللي بتكشف التزوير.',
    resultText: 'التحليل بيوضح تطابق أسلوب التزوير مع دقة عالية توحي بشخص عنده وصول واسع لأرشيف توقيعات فؤاد الحقيقية — شريف.',
    referenceSignature: { angle: 15, pressure: 'medium', spacing: 'wide' },
    willSignature: { angle: 22, pressure: 'heavy', spacing: 'narrow' },
    discrepancyPoints: ['angle', 'pressure', 'spacing'],
    correctSuspectId: 'accountant_sherif_w',
    resultEvidenceIds: ['handwriting_analysis_w'],
  },

  evidenceCombinations: [
    { parts:['sherif_w_signature_access','rana_w_paperwork_seen'], resultId:'handwriting_analysis_w' },
  ],

  correctSuspectId: 'accountant_sherif_w',
  conclusiveEvidenceIds: ['sherif_w_signature_access', 'handwriting_analysis_w', 'signature_discrepancy'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن شريف هو الفاعل؟',
        options: [
          { id:'a', text:'تحليل خبير الخطوط اللي أثبت احترافية التزوير + أرشيفه الواسع لتوقيعات فؤاد الحقيقية + زياراته المتكررة بمستندات في آخر أسبوعين' },
          { id:'b', text:'لأنه محاسب فؤاد وده يكفي كدافع' },
          { id:'c', text:'لأن كريم كان أكتر مستفيد محتمل' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت خطة شريف الحقيقية؟',
        options: [
          { id:'a', text:'زوّر وصية بالكامل بتوزيع نصيب أكبر لنفسه كـ"مكافأة" مخفية في بند غير واضح، واستغل ثقة نبيل عشان يشهد كشاهد رسمي كاذب مقابل مبلغ مالي' },
          { id:'b', text:'كان بيحاول يساعد رنا تاخد نصيب أكبر' },
          { id:'c', text:'كان بينفذ تعليمات فؤاد الحقيقية بس بطريقة غير رسمية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'التوقيع المقلّد فضح نفسه',
      paragraphs:[
        'شريف، محاسب فؤاد الشخصي، كان عنده وصول كامل لأرشيف توقيعاته على مدار سنين. استغل ثقة فؤاد وقرب رنا منه في آخر أيامه عشان يزوّر وصية جديدة بنصيب مخفي لنفسه، واستأجر نبيل كشاهد رسمي كاذب مقابل مبلغ مالي.',
        'تحليل خبير الخطوط اللي أثبت احترافية التزوير العالية، وأرشيفه الواسع من توقيعات فؤاد الحقيقية، وزياراته المتكررة بمستندات في آخر أسبوعين قبل الوفاة، كلها أدلة حاصرته وأثبتت مسؤوليته عن الوصية المزورة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية شريف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام المحكمة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: تحليل الخط، أرشيف التوقيعات، وزياراته المتكررة، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والوصية المزورة اتنفذت رسميًا، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الوصية المزورة"

   الغلاف (cover.webp):
   "Photorealistic close-up of an old legal will document with a
   pen resting on a signature line, warm desk lamp lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (will-scene1.jpg):
   "Photorealistic shot of a lawyer reviewing legal documents at a
   cluttered desk, warm desk lamp lighting, photorealistic, no
   text, no watermark"

   المشهد ٢ (will-scene2.jpg):
   "Photorealistic close-up of two documents with signatures placed
   side by side under a magnifying glass, clinical desk lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (will-scene3.jpg):
   "Photorealistic shot of a lawyer organizing a stack of old
   documents in a filing cabinet, warm office lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (will-scene4.jpg):
   "Photorealistic shot of a lawyer handing a folder of documents to
   an investigator in an office, formal office lighting,
   photorealistic, no text, no watermark"

   كريم (karim_w.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, formal
   business attire, guarded uncomfortable expression, standing in
   an office, formal lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   رنا (rana_w.jpg):
   "Photorealistic portrait of a young Egyptian woman, simple formal
   outfit, sorrowful composed expression, sitting in a living room,
   soft natural lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   شريف (sherif_w.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   accountant, formal office attire, calculating nervous
   expression, standing near a filing cabinet, office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   نبيل (nabil.jpg):
   "Photorealistic portrait of an elderly Egyptian man, formal
   traditional outfit, uneasy guilty expression, sitting in an
   office chair, warm lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل التوقيع (will-signature.jpg):
   "Photorealistic extreme close-up of two ink signatures compared
   side by side on paper, forensic evidence photography style, no
   text, no watermark, photorealistic"

   دليل التحليل (will-analysis.jpg):
   "Photorealistic close-up of a handwriting analysis report with
   angle measurement overlays on a signature, clinical lab
   lighting, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_FORGED_WILL;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'nabil_paid_by_sherif', tag:'من اعتراف نبيل', crit:true, title:'شريف دفع لنبيل مقابل الشهادة', img:null,
    short:'نبيل اعترف إن شريف دفع له عشان يشهد على الوصية المزورة',
    full:'نبيل اعترف إن شريف عرض عليه مبلغ مالي مقابل توقيعه كشاهد على وصية ماشفش فؤاد بيوقعها أصلًا.', unlocked:false, order:90 });
  const n=c.suspects.find(s=>s.id==='family_friend_nabil'); if(n){const q=n.questions.find(q=>q.closesInterrogation); if(q) q.unlockId='nabil_paid_by_sherif';}
  c.conclusiveEvidenceIds = ['sherif_w_signature_access','handwriting_analysis_w','nabil_paid_by_sherif'];
  const sh=c.suspects.find(s=>s.id==='accountant_sherif_w');
  if(sh && !sh.questions.some(q=>q.closesInterrogation)) sh.questions.push({
    q:'تحليل الخط أثبت التزوير، وإنت الوحيد اللي عندك أرشيف التوقيعات، ونبيل اعترف إنك دفعت له عشان يشهد. هتفسر ده إزاي؟',
    requires:['sherif_w_signature_access','handwriting_analysis_w','nabil_paid_by_sherif'], closesInterrogation:true,
    a:'(بيسكت طويل) "زوّرت الوصية ورتبت مع نبيل يشهد عليها. كنت فاكر إن التفاصيل هتعدي وسط الورق القديم ومحدش هيراجع التوقيع بالدقة دي."'
  });
  setTheory0('تحليل الخط اللي أثبت التزوير + أرشيف شريف الواسع من توقيعات فؤاد + اعتراف نبيل إن شريف دفع له عشان يشهد على الوصية');
  c.endings.good.paragraphs[1] = 'تحليل خبير الخطوط، ووصول شريف الكامل لأرشيف توقيعات فؤاد، واعتراف نبيل إنه قبض منه مقابل الشهادة الكاذبة، عملوا سلسلة إثبات مباشرة بدل مجرد الشك في مين كان قريب من المستندات.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: تحليل الخط، أرشيف التوقيعات، واعتراف نبيل بالدفع، قبل ما تتهم.';

})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_FORGED_WILL;
  const n = c.suspects.find(s => s.id === 'family_friend_nabil');
  if (n) {
    const q = n.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت طويل) "أخدت فلوس عشان أمضي كشاهد على ورقة أنا ما شفتش فؤاد بيوقعها. الشخص اللي رتب الموضوع كان عنده وصول لملفات التوقيعات، لكن لازم تثبتوا هويته من الأدلة مش من كلامي لوحده."';
    }
  }
  const ev = c.evidence.find(e => e.id === 'nabil_paid_by_sherif');
  if (ev) {
    ev.title = 'نبيل تقاضى مالًا مقابل شهادة كاذبة';
    ev.short = 'نبيل اعترف إنه أخذ مبلغًا ليشهد على وصية لم ير فؤاد يوقعها';
    ev.full = 'نبيل اعترف إنه تلقى مبلغًا مقابل توقيعه كشاهد على وصية لم يشاهد فؤاد يوقعها. الاعتراف يثبت وجود ترتيب داخلي للتزوير، لكنه لا يكفي وحده لتحديد المدبر.';
  }
  const sh = c.suspects.find(s => s.id === 'accountant_sherif_w');
  if (sh) {
    const q = sh.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتوتر) "أنا عندي وصول للأرشيف فعلًا، وده جزء من شغلي. لكن تحليل الخط واعتراف نبيل ما يثبتوش إني أنا اللي كتبت الوصية من غير رابط مباشر إضافي."';
    }
  }
  c.conclusiveEvidenceIds = ['sherif_w_signature_access','handwriting_analysis_w','nabil_paid_by_sherif','signature_discrepancy'];
  c.conclusiveRequired = 4;
})();
