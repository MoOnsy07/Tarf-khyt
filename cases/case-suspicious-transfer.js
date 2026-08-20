/* ============================================================
   بيانات قضية: تحويل مشبوه
   قضية اختفاء وفساد مالي — محاسب بنك بيكتشف تحويلات غريبة
   قبل ما يختفي فجأة من غير أثر.
   ============================================================ */

const IMG_BASE_SUSTRANSFER = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/suspicious-transfer/';

const CASE_SUSPICIOUS_TRANSFER = {
  id: 'suspicious-transfer',
  title: 'تحويل مشبوه',
  caseNo: 'CASE 032',
  subtitle: 'فرع بنك مركزي، وسط البلد، القاهرة',
  coverImg: IMG_BASE_SUSTRANSFER + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'محاسب بنك بيكتشف تحويلات مالية غريبة بمبالغ ضخمة، وبعد يومين بيختفي فجأة من غير أي أثر. هل اكتشافه هو اللي كان السبب في اختفائه؟',

  isPremium: false,
  categories: ['disappearance', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_SUSTRANSFER + 'cover.webp',
    heroCaption: 'CASE 032 — يومين قبل الاختفاء',
    text1: 'المحاسب "هيثم" كان بيراجع كشوف حسابات دورية في فرع البنك، ولاحظ تحويلات مالية بمبالغ ضخمة لحسابات وهمية على مدار شهور. قبل ما يقدر يبلغ رسميًا، اختفى فجأة من غير أي أثر، وموبايله وعربيته اتلاقوا في مكانهم العادي.',
    text2: 'مديره المباشر طلب منك تحقق في اختفائه بهدوء قبل ما يتحول لقضية رسمية تفتح ملفات البنك كله للتدقيق. عندك كشوف الحسابات اللي كان بيراجعها، وقائمة صغيرة من الناس اللي كانوا عارفين إنه لاحظ حاجة غريبة.',
    meta: [
      { label:'الضحية', value:'هيثم — محاسب في فرع البنك' },
      { label:'آخر مكان معروف', value:'مكتبه في فرع البنك' },
      { label:'الدليل المحوري', value:'كشوف تحويلات لحسابات وهمية' },
      { label:'طلب التحقيق', value:'مديره المباشر في الفرع' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاكتشاف',
      img: IMG_BASE_SUSTRANSFER + 'transfer-scene1.jpg',
      text:'هيثم بيراجع كشوف حسابات في مكتبه المضاء بضوء الشاشة بس، ولاحظ نمط تحويلات غريب بيتكرر كل شهر تقريبًا.'
    },
    {
      scene:'المشهد ٢ — القلق',
      img: IMG_BASE_SUSTRANSFER + 'transfer-scene2.jpg',
      text:'هيثم بيتصل بصديق مقرب ويقوله إنه لقى حاجة خطيرة في الحسابات، وإنه هيبلغ الإدارة العليا قريب.'
    },
    {
      scene:'المشهد ٣ — الاختفاء',
      img: IMG_BASE_SUSTRANSFER + 'transfer-scene3.jpg',
      text:'في الصبح، هيثم ما جاش الشغل. عربيته لقوها في الجراج، وموبايله في بيته، لكن هو مش موجود في أي مكان.'
    },
    {
      scene:'المشهد ٤ — بداية التحقيق',
      img: IMG_BASE_SUSTRANSFER + 'transfer-scene4.jpg',
      text:'مدير الفرع بيديك صلاحية تراجع كشوف الحسابات اللي كان هيثم شغال عليها، وقائمة زملائه المقربين.'
    },
  ],

  suspects: [
    {
      id:'manager_khaled', name:'خالد', role:'مدير الفرع، طلب التحقيق', img: IMG_BASE_SUSTRANSFER + 'khaled.jpg', avatarEmoji:'🏦',
      alibi:'قال إنه كان في اجتماع إدارة عليا وقت اختفاء هيثم.',
      questions:[
        { q:'هيثم كلمك عن اكتشافه قبل ما يختفي؟', unlockId:'khaled_denial',
          a:'"لأ، أول ما سمعت كان من زميله. لو كان بلّغني كنت هبدأ تحقيق فوري."' },
        { q:'مين غيرك كان عنده صلاحية يشوف نفس الكشوف اللي هيثم كان بيراجعها؟', unlockId:'ledger_access_list',
          a:'"صلاحية كاملة، أنا ونائبي بس. صلاحية جزئية، فيه كذا موظف تاني."' },
      ]
    },
    {
      id:'deputy_mona', name:'منى', role:'نائبة مدير الفرع', img: IMG_BASE_SUSTRANSFER + 'mona.jpg', avatarEmoji:'📊',
      alibi:'قالت إنها كانت في اجتماع مع خالد نفسه وقت اختفاء هيثم.',
      questions:[
        { q:'كنتِ عارفة إن هيثم لاحظ تحويلات غريبة؟', unlockId:'mona_awareness',
          a:'"سمعت منه إشاعة بسيطة، بس ماخدتش الموضوع بجدية وقتها."' },
        { q:'اسمك ظهر في كشف الحسابات اللي هيثم كان بيراجعه — عايزة تفسري؟', unlockId:'mona_ledger_link',
          a:'(بتتردد) "أنا بموافق على تحويلات كتيرة يوميًا، طبيعي اسمي يظهر، مش معناها إني عارفة بأي تلاعب."' },
      ]
    },
    {
      id:'friend_youssef', name:'يوسف', role:'صديق مقرب لهيثم، آخر من كلمه', img: IMG_BASE_SUSTRANSFER + 'youssef.jpg', avatarEmoji:'📞',
      alibi:'قال إنه كان في بيته طول الليلة اللي فيها هيثم اختفى.',
      questions:[
        { q:'هيثم قالك تفاصيل عن اللي لقاه؟', unlockId:'youssef_details',
          a:'"قالي إنه لقى تحويلات لحسابات وهمية بمبالغ كبيرة، وإنه شكك في نائبة المدير بالذات."' },
        { q:'إنت بلغت حد بالمعلومة دي بعد اختفاء هيثم؟', requires:['youssef_details'],
          a:'"لأ، خفت أتورط، فسكتّ لحد ما بدأتوا التحقيق."' },
      ]
    },
    {
      id:'clerk_sameh', name:'سامح', role:'موظف صرف في نفس الفرع', img: IMG_BASE_SUSTRANSFER + 'sameh.jpg', avatarEmoji:'💳',
      alibi:'قال إنه كان في إجازة مرضية وقت اختفاء هيثم.',
      questions:[
        { q:'ليه اسمك ظاهر في سجل دخول المبنى ليلة الاختفاء رغم إنك في إجازة؟', unlockId:'sameh_present',
          a:'(بيتلعثم) "دخلت أجيب حاجاتي بس، ماكنتش هفضل."' },
        { q:'الحسابات الوهمية اللي هيثم اكتشفها بتوصل لحساب مسجل باسم قريبك — عايز تفسر؟', requires:['sameh_present','mona_ledger_link','ledger_access_list'], closesInterrogation:true,
          a:'(بيسكت طويل) "كنت بحوّل مبالغ صغيرة على مدار وقت طويل من حسابات راكدة، هيثم لاحظ الموضوع. قابلته الليلة دي أقنعه ياخد نصيب ويسكت، رفض، وحبسته في مخزن قديم لحد ما أقرر أعمل إيه."' },
      ]
    },
  ],

  evidence: [
    { id:'ledger_pattern', tag:'من كشوف الحسابات', crit:true, title:'نمط تحويلات غريب', img: IMG_BASE_SUSTRANSFER + 'transfer-ledger.jpg',
      short:'تحويلات شهرية صغيرة لحسابات وهمية على مدار شهور',
      full:'الكشوف بتوضح نمط تحويلات صغيرة نسبيًا بس متكررة كل شهر لحسابات مفيهاش أي نشاط حقيقي، بمجموع كبير على المدى الطويل.',
      unlocked:true, order:1 },

    { id:'khaled_denial', tag:'من استجواب خالد', crit:false, title:'خالد ينفي علمه', img:null,
      short:'خالد قال إنه ما كانش عارف باكتشاف هيثم',
      full:'خالد نفى إن هيثم كلمه مباشرة عن اكتشافه، وأكد إنه لو كان عرف كان بدأ تحقيق فوري.',
      unlocked:false, order:2 },

    { id:'ledger_access_list', tag:'من استجواب خالد', crit:false, title:'قائمة أصحاب الصلاحية', img:null,
      short:'عدد محدود من الموظفين له صلاحية كاملة على الكشوف',
      full:'خالد أكد إن الصلاحية الكاملة على الكشوف محصورة فيه هو ونائبته منى، مع صلاحية جزئية لموظفين تانيين.',
      unlocked:false, order:3 },

    { id:'mona_awareness', tag:'من استجواب منى', crit:false, title:'منى سمعت إشاعة', img:null,
      short:'منى قالت إنها سمعت إشاعة بسيطة بس ماخدتهاش بجدية',
      full:'منى اعترفت إنها سمعت من هيثم إشاعة بسيطة عن تحويلات غريبة، بس قالت إنها ماخدتش الموضوع بجدية وقتها.',
      unlocked:false, order:4 },

    { id:'mona_ledger_link', tag:'من كشوف الحسابات', crit:false, title:'اسم منى في الكشوف', img:null,
      short:'اسم منى ظاهر في كشف الحسابات كموافقة روتينية',
      full:'اسم منى ظهر في كشف الحسابات كموافِقة على تحويلات يومية، بس ده جزء من شغلها العادي ومش دليل قاطع على تورطها.',
      unlocked:false, order:5 },

    { id:'youssef_details', tag:'من استجواب يوسف', crit:true, title:'تفاصيل شكوك هيثم', img:null,
      short:'هيثم كان بيشك في نائبة المدير قبل اختفائه',
      full:'يوسف كشف إن هيثم قاله قبل اختفائه إنه لقى تحويلات لحسابات وهمية وإنه بيشك في نائبة المدير بالذات، بس التحقيق كشف بعدين إن الشك ده مكنش دقيق.',
      unlocked:false, order:6 },

    { id:'sameh_present', tag:'من سجل دخول المبنى', crit:true, title:'حضور سامح رغم الإجازة', img: IMG_BASE_SUSTRANSFER + 'transfer-cam.jpg',
      short:'سجل الدخول بيوضح حضور سامح ليلة الاختفاء رغم إجازته',
      full:'سجل دخول المبنى بيوضح إن سامح دخل الفرع ليلة اختفاء هيثم بالظبط، رغم إنه كان مفروض في إجازة مرضية.',
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

  /* ============================================================
     ميكانيزم جديد: ledgerAuditPuzzle
     اللاعب بيدوّر في جدول تحويلات مالية طويل عن الصفوف اللي
     فيها تلاعب واضح (حسابات وهمية، مبالغ متكررة بنمط مريب)،
     ولازم يحدد الحساب اللي بيربط التلاعب بالمشتبه به الحقيقي.
     ============================================================ */
  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق الحسابات',
    introText: 'راجع كشف التحويلات وحدد الحساب الوهمي اللي بيتكرر بنمط مريب كل شهر ومسجل باسم قريب لأحد المشتبه بيهم.',
    resultText: 'لقيت الحساب الوهمي! الحساب رقم 4471 مسجل باسم قريب سامح، وده بيربطه مباشرة بالتلاعب في الكشوف.',
    ledgerRows: [
      { account:'2210', name:'شركة النور للتجارة', amount:'12,500', suspicious:false },
      { account:'4471', name:'محمود سامح فتحي', amount:'3,200', suspicious:true },
      { account:'8890', name:'مؤسسة الأمل', amount:'45,000', suspicious:false },
      { account:'1123', name:'عميل فردي', amount:'900', suspicious:false },
    ],
    correctAccountId: '4471',
    linkedSuspectId: 'clerk_sameh',
    resultEvidenceIds: ['sameh_present'],
  },

  evidenceCombinations: [
    { parts:['youssef_details','ledger_access_list'], resultId:'sameh_present' },
  ],

  correctSuspectId: 'clerk_sameh',
  conclusiveEvidenceIds: ['sameh_present', 'ledger_pattern', 'youssef_details'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن سامح هو الفاعل؟',
        options: [
          { id:'a', text:'الحساب الوهمي المسجل باسم قريبه + حضوره في المبنى رغم إجازته + دافعه المالي الواضح' },
          { id:'b', text:'لأنه موظف صرف وده يكفي' },
          { id:'c', text:'لأن منى كانت مشكوك فيها الأول' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت خطة سامح الحقيقية؟',
        options: [
          { id:'a', text:'كان بيسرق مبالغ صغيرة من حسابات راكدة على مدار وقت طويل، ولما هيثم اكتشفه حاول يشتريه بالسكوت، ولما رفض حبسه بدل ما يقتله' },
          { id:'b', text:'كان مخطط يخطف هيثم من البداية' },
          { id:'c', text:'كان بيحاول يوقع منى في المشكلة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — RESCUE', title:'كشف حساب واحد كفى',
      paragraphs:[
        'سامح كان بيسرق مبالغ صغيرة من حسابات عملاء راكدة على مدار شهور طويلة، بحيث محدش يلاحظ. لما هيثم اكتشف النمط أثناء مراجعته الدورية، حاول سامح يقنعه ياخد نصيب من المبلغ ويسكت. لما هيثم رفض بشدة وهدده بالإبلاغ، حبسه سامح في مخزن قديم تابع للفرع عشان يكسب وقت يفكر فيه.',
        'الحساب الوهمي المسجل باسم قريب سامح، وحضوره الفعلي في المبنى ليلة الاختفاء رغم إجازته المرضية، ودافعه المالي الواضح، كلها أدلة أدت لإنقاذ هيثم قبل ما يتصاعد الموقف لأسوأ من كده.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية سامح، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: الحساب الوهمي، حضوره رغم الإجازة، ونمط الكشوف، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وهيثم فضل في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "تحويل مشبوه"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty bank office at night, a computer
   screen glowing with financial spreadsheet data, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (transfer-scene1.jpg):
   "Photorealistic shot of a middle-aged Egyptian male accountant
   reviewing financial documents at a desk lit only by a computer
   screen, focused worried expression, photorealistic, no text, no
   watermark"

   المشهد ٢ (transfer-scene2.jpg):
   "Photorealistic close-up of a worried man talking on a phone in
   a dim office at night, tense expression, photorealistic, no
   text, no watermark"

   المشهد ٣ (transfer-scene3.jpg):
   "Photorealistic shot of an empty bank parking garage with a
   single car parked, dim lighting, quiet unsettling atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٤ (transfer-scene4.jpg):
   "Photorealistic shot of a bank manager's office with stacks of
   financial ledgers on the desk, formal office lighting,
   photorealistic, no text, no watermark"

   خالد (khaled.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male bank
   branch manager, formal suit, authoritative composed expression,
   standing in a bank office, formal office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   منى (mona.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female deputy
   bank manager, formal professional attire, composed guarded
   expression, standing near a bank desk, office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   يوسف (youssef.jpg):
   "Photorealistic portrait of a young Egyptian male, casual smart
   outfit, worried concerned expression, sitting in a cafe, natural
   window lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   سامح (sameh.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male bank
   clerk, simple formal outfit, nervous evasive expression, standing
   near a bank counter, fluorescent office lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل الكشوف (transfer-ledger.jpg):
   "Photorealistic close-up of a financial ledger printout with
   highlighted suspicious transaction rows, clinical office
   lighting, no text, no watermark, photorealistic"

   دليل الكاميرا (transfer-cam.jpg):
   "Photorealistic security camera style still frame of a man
   entering a bank building at night, grainy surveillance footage
   look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_SUSPICIOUS_TRANSFER;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'sameh_fake_account_link', tag:'من تدقيق الحسابات', crit:true, title:'الحساب الوهمي باسم قريب سامح', img:null,
    short:'الحساب 4471 مسجل باسم قريب سامح وداخل في نمط التحويلات المشبوه',
    full:'تدقيق الحسابات كشف إن الحساب الوهمي رقم 4471 مسجل باسم قريب سامح، وبيتلقى التحويلات المتكررة اللي هيثم كان بيتتبعها.', unlocked:false, order:90 });
  c.ledgerAuditPuzzle.resultEvidenceIds = ['sameh_fake_account_link'];
  c.conclusiveEvidenceIds = ['sameh_present','ledger_pattern','sameh_fake_account_link'];
  const s=c.suspects.find(s=>s.id==='clerk_sameh'); if(s){const q=s.questions.find(q=>q.closesInterrogation); if(q) q.requires=['sameh_present','ledger_pattern','sameh_fake_account_link'];}
  setTheory0('الحساب الوهمي المسجل باسم قريب سامح + حضوره في الفرع رغم إجازته + نمط التحويلات الصغيرة المتكررة اللي هيثم اكتشفه');
  c.endings.good.paragraphs[1] = 'الحساب الوهمي المسجل باسم قريب سامح، وسجل دخوله للفرع ليلة الاختفاء رغم إجازته، ونمط التحويلات المتكرر اللي هيثم اكتشفه، كلها أدلة ربطت سامح بالتلاعب وباختفاء هيثم في نفس الوقت.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: حضور سامح، نمط التحويلات، والحساب الوهمي المرتبط بقريبه، قبل ما تتهم.';

})();

(() => {
  const s = CASE_SUSPICIOUS_TRANSFER.suspects.find(x => x.id === 'clerk_sameh');
  if (s && !s.questions.some(x => x.q === 'صلاحياتك في الفرع كانت تسمحلك تشوف الحسابات الراكدة والتحويلات الداخلية؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'صلاحياتك في الفرع كانت تسمحلك تشوف الحسابات الراكدة والتحويلات الداخلية؟', requires:['sameh_present'], a:'"كموظف صرف عندي وصول لجزء من البيانات، لكن مش معنى كده إني أقدر أعمل تحويلات بالشكل اللي هيثم كان بيتكلم عنه."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_SUSPICIOUS_TRANSFER;
  const ev = id => c.evidence.find(e => e.id === id);
  if (!ev('sameh_ledger_link')) {
    c.evidence.push({
      id:'sameh_ledger_link', tag:'من تدقيق الحسابات', crit:true,
      title:'الحساب الوهمي مرتبط بقريب سامح', img:null,
      short:'الحساب المشبوه 4471 مسجل باسم قريب مباشر لسامح',
      full:'التدقيق كشف إن الحساب الوهمي المتكرر في التحويلات مسجل باسم قريب مباشر لسامح. ده يربطه بمسار الأموال بشكل مستقل عن مجرد وجوده في المبنى.',
      unlocked:false, order:90
    });
  }
  if (c.ledgerAuditPuzzle) {
    c.ledgerAuditPuzzle.resultText = 'الحساب 4471 مرتبط بقريب سامح، وده يربطه مباشرة بمسار التحويلات المشبوهة.';
    c.ledgerAuditPuzzle.resultEvidenceIds = ['sameh_ledger_link'];
  }
  c.evidenceCombinations = [];
  const s = c.suspects.find(x => x.id === 'clerk_sameh');
  if (s) {
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'اسم قريبك ظاهر على الحساب الوهمي، وسجل الدخول يثبت وجودك رغم الإجازة. قابلت هيثم الليلة دي؟';
      q.requires = ['sameh_present','sameh_ledger_link','ledger_pattern'];
      q.a = '(بيسكت) "قابلته واتكلمنا عن اللي اكتشفه، آه. لكن أنا مش هاعترف بمكانه أو إني أجبرته على حاجة من غير دليل مباشر."';
    }
  }
  c.conclusiveEvidenceIds = ['ledger_pattern','sameh_present','sameh_ledger_link','youssef_details'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_SUSPICIOUS_TRANSFER;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='trace_fake_account')) c.investigationActions.push({
    id:'trace_fake_account', kind:'تتبع مالي', label:'تتبع بيانات الحساب الوهمي',
    description:'قارن بيانات الحساب الوهمي بعلاقات أصحاب الصلاحيات في الشركة.',
    requires:['sameh_present','ledger_access_list'], resultEvidenceIds:['sameh_fake_account_link'],
    successText:'التتبع طلع بربط مهم بين الحساب الوهمي ودائرة سامح.'
  });
})();
