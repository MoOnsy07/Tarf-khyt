/* ============================================================
   بيانات قضية: مفتاح الخزنة
   قضية سرقة — سرقة مجوهرات نادرة من متحف خاص وسط حفلة مزاد
   علني، وسط عشرات المدعوين والحراسة المشددة.
   ============================================================ */

const IMG_BASE_VAULTKEY = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/vault-key/';

const CASE_VAULT_KEY = {
  id: 'vault-key',
  title: 'مفتاح الخزنة',
  caseNo: 'CASE 035',
  subtitle: 'متحف خاص، حفلة مزاد علني',
  coverImg: IMG_BASE_VAULTKEY + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 20,
  teaser: 'مجموعة مجوهرات أثرية نادرة بتتسرق من خزنة متحف خاص وسط حفلة مزاد فاخرة، رغم كاميرات وحراسة مشددة. مين من المدعوين المميزين قدر يوصل للخزنة؟',

  isPremium: false,
  categories: ['theft', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_VAULTKEY + 'cover.webp',
    heroCaption: 'CASE 035 — منتصف حفلة المزاد',
    text1: 'متحف خاص كان بيستضيف حفلة مزاد علني فاخرة لمجموعة مجوهرات أثرية نادرة قبل ما تتباع رسميًا. في منتصف الحفلة، مدير المتحف اكتشف إن الخزنة اللي فيها أثمن قطعة في المجموعة فاضية تمامًا.',
    text2: 'الغريب إن الخزنة مالهاش غير مفتاح واحد أصلي، وكود رقمي معروف لعدد محدود جدًا من الناس. المدير طلب منك تحقق بسرية تامة قبل ما الفضيحة توصل للصحافة وتدمر سمعة المتحف قبل المزاد الرسمي.',
    meta: [
      { label:'القطعة المسروقة', value:'قلادة أثرية نادرة من المجموعة' },
      { label:'مكان الحادثة', value:'خزنة المتحف الخاصة' },
      { label:'الغموض', value:'مفتاح وكود معروفين لعدد محدود جدًا' },
      { label:'طلب التحقيق', value:'مدير المتحف' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحفلة تبدأ',
      img: IMG_BASE_VAULTKEY + 'vault-scene1.jpg',
      text:'صالة المتحف مزينة بأناقة، ضيوف بيتجولوا بين القطع المعروضة، وحراس بلبس رسمي واقفين عند كل زاوية.'
    },
    {
      scene:'المشهد ٢ — الإعلان عن المزاد',
      img: IMG_BASE_VAULTKEY + 'vault-scene2.jpg',
      text:'مدير المتحف بيقدّم القلادة الأثرية للحضور قبل ما ترجع للخزنة استعدادًا للمزاد الرسمي بعد ساعة.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_VAULTKEY + 'vault-scene3.jpg',
      text:'المدير بيفتح الخزنة قبل بداية المزاد بدقايق، يلاقيها فاضية تمامًا من غير أي أثر اقتحام واضح.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_VAULTKEY + 'vault-scene4.jpg',
      text:'الحراسة بتوقف الحفلة بهدوء، ومدير المتحف بيديك صلاحية تراجع مخطط الحركة داخل المتحف والمدعوين المميزين.'
    },
  ],

  suspects: [
    {
      id:'museum_director_nadia', name:'نادية', role:'مديرة المتحف، طلبت التحقيق', img: IMG_BASE_VAULTKEY + 'nadia.jpg', avatarEmoji:'🏛️',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'مين غيرك عنده وصول للخزنة؟', unlockId:'vault_access_names',
          a:'"أنا ورئيس الأمن بس عندنا الكود، ومفتاح احتياطي واحد في درج مكتبي المقفول."' },
        { q:'حد من الضيوف كان مهتم بشكل غير عادي بالقلادة؟', unlockId:'collector_interest',
          a:'"فيه جامع تحف معروف كان بيسأل أسئلة كتيرة عن تفاصيل القلادة وتاريخها."' },
      ]
    },
    {
      id:'security_chief_omar', name:'عمر', role:'رئيس أمن المتحف', img: IMG_BASE_VAULTKEY + 'omar.jpg', avatarEmoji:'🛡️',
      alibi:'قال إنه كان بيراقب الحفلة من غرفة المراقبة طول الوقت.',
      questions:[
        { q:'الكاميرات سجلت أي حد قريب من الخزنة؟', unlockId:'camera_blindspot',
          a:'"فيه زاوية عمياء صغيرة قريبة من باب الخزنة، من زمان بنقول نصلحها بس محصلش."' },
        { q:'إنت شخصيًا اقتربت من الخزنة في وقت الحفلة؟', unlockId:'omar_near_vault',
          a:'(بيتردد) "قربت أتأكد من الإغلاق مرة واحدة بس، ده جزء من شغلي العادي."' },
      ]
    },
    {
      id:'collector_faris', name:'فارس', role:'جامع تحف معروف، من كبار المدعوين', img: IMG_BASE_VAULTKEY + 'faris.jpg', avatarEmoji:'💎',
      alibi:'قال إنه كان بيتكلم مع ضيوف تانيين طول الوقت في الصالة الرئيسية.',
      questions:[
        { q:'اهتمامك بالقلادة كان بسبب إيه بالظبط؟', unlockId:'faris_obsession',
          a:'"دايمًا مهتم بالقطع النادرة دي، القلادة دي بالذات كانت هتكمل مجموعتي الخاصة اللي بجمعها من سنين."' },
        { q:'شاهد أكد إنك ابتعدت عن الصالة الرئيسية لمدة عشر دقايق تقريبًا — عايز تفسر؟', requires:['faris_obsession'], unlockId:'faris_absence',
          a:'(بيتلعثم) "خرجت أتنفس هواء بس، الزحمة كانت خانقة."' },
      ]
    },
    {
      id:'assistant_laila', name:'ليلى', role:'مساعدة مديرة المتحف', img: IMG_BASE_VAULTKEY + 'laila.jpg', avatarEmoji:'📁',
      alibi:'قالت إنها كانت بتساعد في تنظيم قائمة المزايدين طول الحفلة.',
      questions:[
        { q:'كان عندك وصول لأي معلومات عن كود الخزنة؟', unlockId:'laila_code_knowledge',
          a:'"شفت نادية بتدخل الكود مرة، مش متعمدة، بس افتكرته."' },
        { q:'وضعك المالي كان محتاج مساعدة في الفترة الأخيرة؟', requires:['laila_code_knowledge','faris_absence','vault_access_names'], closesInterrogation:true,
          a:'(بتبكي) "كنت مديونة بشكل خطير، فارس عرض عليّ فلوس كبيرة مقابل الكود، وافقت وهو اللي نفذ السرقة الفعلية في الزاوية العمياء، أنا بس ديته الكود."' },
      ]
    },
  ],

  evidence: [
    { id:'empty_vault', tag:'من مسرح السرقة', crit:true, title:'خزنة فاضية من غير اقتحام', img: IMG_BASE_VAULTKEY + 'vault-empty.jpg',
      short:'الخزنة فاضية من غير أي أثر اقتحام أو كسر',
      full:'الخزنة اتفتحت بالكود الصحيح من غير أي أثر اقتحام أو كسر، وده بيأكد إن السارق كان عنده معرفة مسبقة بالكود.',
      unlocked:true, order:1 },

    { id:'vault_access_names', tag:'من استجواب نادية', crit:false, title:'قائمة أصحاب الوصول للخزنة', img:null,
      short:'عدد محدود جدًا من الناس عندهم الكود',
      full:'نادية أكدت إن الكود معروف ليها ولرئيس الأمن بس، مع مفتاح احتياطي في درجها المقفول.',
      unlocked:false, order:2 },

    { id:'collector_interest', tag:'من استجواب نادية', crit:false, title:'اهتمام غير عادي من فارس', img:null,
      short:'فارس كان بيسأل أسئلة كتيرة عن القلادة',
      full:'نادية أكدت إن فارس كان مهتم بشكل ملحوظ بتفاصيل القلادة وتاريخها أكتر من أي ضيف تاني.',
      unlocked:false, order:3 },

    { id:'camera_blindspot', tag:'من استجواب عمر', crit:true, title:'زاوية عمياء قريبة من الخزنة', img: IMG_BASE_VAULTKEY + 'vault-cam.jpg',
      short:'زاوية صغيرة مش مغطاة بالكاميرا قريبة من باب الخزنة',
      full:'عمر اعترف بوجود زاوية عمياء صغيرة قريبة من باب الخزنة مش مغطاة بالكاميرا، وده كان بيتيح لحد يتحرك من غير ما يتصور بوضوح.',
      unlocked:false, order:4 },

    { id:'omar_near_vault', tag:'من استجواب عمر', crit:false, title:'عمر اقترب من الخزنة', img:null,
      short:'عمر أكد اقترابه من الخزنة مرة واحدة أثناء الحفلة',
      full:'عمر أكد إنه اقترب من الخزنة مرة واحدة بس أثناء الحفلة للتأكد من الإغلاق، وده جزء طبيعي من شغله.',
      unlocked:false, order:5 },

    { id:'faris_obsession', tag:'من استجواب فارس', crit:false, title:'هوس فارس بالقلادة', img:null,
      short:'فارس معترف بشغفه الشخصي بالقطعة',
      full:'فارس اعترف إن القلادة كانت هتكمل مجموعته الشخصية النادرة اللي بيجمعها من سنين طويلة.',
      unlocked:false, order:6 },

    { id:'faris_absence', tag:'من شهادة ضيف', crit:true, title:'غياب فارس المؤقت', img:null,
      short:'فارس اختفى من الصالة الرئيسية لمدة عشر دقايق تقريبًا',
      full:'ضيف تاني أكد إن فارس اختفى من الصالة الرئيسية لمدة عشر دقايق تقريبًا في وقت قريب من اكتشاف السرقة، رغم إنه ادّعى إنه كان موجود طول الوقت.',
      unlocked:false, order:7 },

    { id:'laila_code_knowledge', tag:'من استجواب ليلى', crit:true, title:'ليلى عارفة الكود', img:null,
      short:'ليلى شافت نادية بتدخل الكود وحفظته',
      full:'ليلى اعترفت إنها شافت نادية بتدخل كود الخزنة مرة من غير قصد، وافتكرته من وقتها.',
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

  /* ============================================================
     ميكانيزم جديد: floorPlanPuzzle
     اللاعب بيشوف مخطط المتحف وبيحدد مسار حركة المشتبه فيه من
     الصالة الرئيسية للخزنة عبر الزاوية العمياء، عشان يثبت إمكانية
     الوصول الفعلي للخزنة من غير ما يتصور بالكاميرات.
     ============================================================ */
  floorPlanPuzzle: {
    enabled: true,
    tabLabel: 'مخطط الحركة',
    introText: 'تتبع المسار الممكن من الصالة الرئيسية للخزنة عبر الزاوية العمياء، وحدد مين من المشتبه بيهم كان يقدر يوصل من غير ما يتصور بالكاميرات.',
    resultText: 'المسار بيوضح إن فارس قدر يوصل للخزنة عبر الممر الجانبي والزاوية العمياء في نفس فترة غيابه العشر دقايق.',
    rooms: ['الصالة الرئيسية', 'الممر الجانبي', 'الزاوية العمياء', 'باب الخزنة'],
    suspectPaths: {
      museum_director_nadia: ['الصالة الرئيسية'],
      security_chief_omar:   ['الصالة الرئيسية', 'باب الخزنة'],
      collector_faris:       ['الصالة الرئيسية', 'الممر الجانبي', 'الزاوية العمياء', 'باب الخزنة'],
      assistant_laila:       ['الصالة الرئيسية'],
    },
    correctSuspectId: 'collector_faris',
    resultEvidenceIds: ['faris_absence'],
  },

  evidenceCombinations: [
    { parts:['laila_code_knowledge','camera_blindspot'], resultId:'faris_absence' },
  ],

  correctSuspectId: 'collector_faris',
  conclusiveEvidenceIds: ['faris_absence', 'camera_blindspot', 'laila_code_knowledge'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن فارس هو الفاعل؟',
        options: [
          { id:'a', text:'مسار الحركة اللي أثبت إمكانية وصوله للخزنة عبر الزاوية العمياء + غيابه المؤقت من الصالة + اعتراف ليلى بإعطائه الكود' },
          { id:'b', text:'لأنه جامع تحف وده يكفي كدافع' },
          { id:'c', text:'لأن عمر رئيس الأمن وده يخليه مشبوه تلقائيًا' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إزاي فارس عرف الكود أصلاً؟',
        options: [
          { id:'a', text:'ليلى، مساعدة المديرة، كانت مديونة ماليًا، فباعت الكود لفارس مقابل مبلغ كبير، وهو استخدمه شخصيًا لتنفيذ السرقة عبر الزاوية العمياء' },
          { id:'b', text:'فارس خمّن الكود بالصدفة' },
          { id:'c', text:'عمر رئيس الأمن هو اللي سرّب الكود مباشرة لفارس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الزاوية العمياء فضحت كل حاجة',
      paragraphs:[
        'ليلى، مساعدة مديرة المتحف، كانت في ضائقة مالية خطيرة. فارس، جامع التحف المهووس بالقلادة، عرض عليها مبلغ كبير مقابل كود الخزنة اللي كانت شافته بالصدفة. وافقت، وفارس استغل الزاوية العمياء القريبة من الخزنة عشان ينفذ السرقة بنفسه وسط زحمة الحفلة.',
        'مسار الحركة اللي أثبت إمكانية وصوله للخزنة عبر الزاوية العمياء، وغيابه المؤقت من الصالة الرئيسية لمدة عشر دقايق، واعتراف ليلى بإعطائه الكود، كلها أدلة حاصرته وكشفت خطة السرقة كاملة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية فارس، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: مسار الحركة، غيابه المؤقت، واعتراف ليلى، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والقلادة النادرة فضلت مفقودة، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "مفتاح الخزنة"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant museum vault room at night, an
   open empty jewelry display case with a single spotlight,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (vault-scene1.jpg):
   "Photorealistic wide shot of an elegant museum gala event, well
   dressed guests admiring displayed artifacts, warm ambient
   lighting, photorealistic, no text, no watermark"

   المشهد ٢ (vault-scene2.jpg):
   "Photorealistic shot of a museum director presenting an ornate
   ancient necklace on a velvet cushion to a crowd, warm spotlight,
   photorealistic, no text, no watermark"

   المشهد ٣ (vault-scene3.jpg):
   "Photorealistic dramatic shot of an open empty museum vault, a
   worried woman staring inside, dim vault lighting, photorealistic,
   no text, no watermark"

   المشهد ٤ (vault-scene4.jpg):
   "Photorealistic shot of museum security guards quietly managing
   guests near an entrance, warm formal event lighting,
   photorealistic, no text, no watermark"

   نادية (nadia.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female museum
   director, elegant formal outfit, composed worried expression,
   standing in a museum gallery, warm gallery lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   عمر (omar.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male security
   chief, formal security uniform, watchful serious expression,
   standing near a museum security monitor, dim lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   فارس (faris.jpg):
   "Photorealistic portrait of a wealthy middle-aged Egyptian male
   art collector, elegant formal suit, calculating composed
   expression, standing in a museum gallery, warm gallery lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   ليلى (laila.jpg):
   "Photorealistic portrait of a young Egyptian female museum
   assistant, formal professional outfit, anxious guilty
   expression, standing near an office desk, soft office lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل الخزنة (vault-empty.jpg):
   "Photorealistic close-up of an open empty museum vault interior,
   forensic evidence photography style, dim lighting, no text, no
   watermark, photorealistic"

   دليل الكاميرا (vault-cam.jpg):
   "Photorealistic security camera style still frame of a dim museum
   corridor corner with a visible blind spot shadow, grainy
   surveillance footage look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_VAULT_KEY;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'faris_vault_route', tag:'من مخطط الحركة', crit:true, title:'فارس قدر يوصل للخزنة من الزاوية العمياء', img:null,
    short:'مسار الحركة بيربط غياب فارس بالطريق غير المغطى بالكاميرات',
    full:'مخطط الحركة بيكشف إن فارس كان يقدر ينتقل من الصالة للخزنة عبر الممر الجانبي والزاوية العمياء خلال نفس فترة غيابه.', unlocked:false, order:90 });
  addEvidence({ id:'laila_code_sale', tag:'من اعتراف ليلى', crit:true, title:'ليلى باعت الكود لفارس', img:null,
    short:'ليلى اعترفت إنها أعطت فارس كود الخزنة مقابل فلوس',
    full:'ليلى اعترفت إنها كانت مديونة وإن فارس عرض عليها مبلغ كبير مقابل كود الخزنة، فوافقت وأعطته الكود.', unlocked:false, order:91 });
  c.floorPlanPuzzle.resultEvidenceIds = ['faris_vault_route'];
  const l=c.suspects.find(s=>s.id==='assistant_laila'); if(l){const q=l.questions.find(q=>q.closesInterrogation); if(q) q.unlockId='laila_code_sale';}
  c.conclusiveEvidenceIds = ['faris_absence','faris_vault_route','laila_code_sale'];
  const f=c.suspects.find(s=>s.id==='collector_faris');
  if(f && !f.questions.some(q=>q.closesInterrogation)) f.questions.push({
    q:'ليلى اعترفت إنها باعتلك الكود، ومخطط الحركة بيحطك عند الخزنة في نفس عشر دقايق اختفائك من الصالة. القلادة فين؟',
    requires:['faris_absence','faris_vault_route','laila_code_sale'], closesInterrogation:true,
    a:'(بيسكت ثم يبتسم بتوتر) "اشتريت الكود منها، واستغليت الزاوية العمياء وخدت القلادة. كنت فاكر إن الزحمة هتخلي العشر دقايق يعدّوا من غير ما حد يلاحظ."'
  });
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: غياب فارس، مسار الزاوية العمياء، واعتراف ليلى ببيع الكود، قبل ما تتهم.';

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_VAULT_KEY;
  c.evidenceCombinations = [];
  if (c.floorPlanPuzzle) {
    c.floorPlanPuzzle.resultText = 'المخطط يثبت إن فارس كان يقدر يوصل للخزنة عبر الممر الجانبي والزاوية العمياء خلال فترة غيابه. ده يثبت الفرصة، مش السرقة نفسها.';
    c.floorPlanPuzzle.resultEvidenceIds = ['faris_vault_route'];
  }
  const l = c.suspects.find(s => s.id === 'assistant_laila');
  if (l) {
    const q = l.questions.find(q => q.closesInterrogation);
    if (q) {
      q.unlockId = 'laila_code_sale';
      q.a = '(بتعيط) "أيوه، بعت الكود لفارس مقابل فلوس لأني كنت مديونة. أنا ما دخلتش الخزنة، لكن عارفة إن اللي عملته هو اللي فتح له الباب."';
    }
  }
  const f = c.suspects.find(s => s.id === 'collector_faris');
  if (f) {
    const q = f.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'ليلى قالت إنها باعتلك الكود، ومخطط الحركة يثبت إنك كنت تقدر توصل للخزنة في وقت غيابك. ردك؟';
      q.a = '(بيتوتر) "اشتريت منها معلومة عن الكود فعلًا بدافع الفضول، لكن ده مش اعتراف إني فتحت الخزنة أو أخدت القلادة."';
    }
  }
  c.conclusiveEvidenceIds = ['faris_absence','faris_vault_route','laila_code_sale','empty_vault'];
  c.conclusiveRequired = 4;
})();
