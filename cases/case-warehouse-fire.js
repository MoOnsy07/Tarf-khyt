/* ============================================================
   بيانات قضية: حريق المخزن
   قضية قتل/حريق — حريق كبير في مخزن ملابس، وجثة عامل جواه
   رغم إن المفروض إنه مسافر خارج البلد وقت الحريق.
   ============================================================ */

const IMG_BASE_WAREHOUSEFIRE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/warehouse-fire/';

const CASE_WAREHOUSE_FIRE = {
  id: 'warehouse-fire',
  title: 'حريق المخزن',
  caseNo: 'CASE 043',
  subtitle: 'مخزن ملابس، المنطقة الصناعية',
  coverImg: IMG_BASE_WAREHOUSEFIRE + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 32,
  investigationPoints: 18,
  teaser: 'حريق ضخم بيلتهم مخزن ملابس بالكامل، وجثة عامل بتتلاقى جوه الرماد رغم إن المفروض إنه كان مسافر خارج البلد وقت الحريق بالظبط.',

  isPremium: false,
  categories: ['murder', 'arson'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_WAREHOUSEFIRE + 'cover.webp',
    heroCaption: 'CASE 043 — بعد إخماد الحريق',
    text1: 'حريق كبير اندلع في مخزن ملابس تابع لشركة "النسيج الذهبي" نص الليل، والتهم جزء كبير من المخزون. لما فريق الإطفاء دخل بعد إخماد النيران، لقوا جثة العامل "سعيد" جوه المخزن.',
    text2: 'الغريب إن سعيد كان مفروض مسافر خارج البلد في إجازة من أسبوع، وأهله أكدوا إنه سافر فعلاً. صاحب الشركة طلب منك تحقق قبل ما التأمين يرفض تعويض الحريق بسبب الشكوك حوالين الحادثة.',
    meta: [
      { label:'المجني عليه', value:'سعيد — عامل في المخزن' },
      { label:'مكان الحادثة', value:'مخزن ملابس النسيج الذهبي' },
      { label:'الغموض', value:'سعيد كان مفروض مسافر وقت الحريق' },
      { label:'طلب التحقيق', value:'صاحب الشركة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قبل الحريق',
      img: IMG_BASE_WAREHOUSEFIRE + 'fire-scene1.jpg',
      text:'المخزن هادي ومقفول بعد نهاية الشفت، رفوف الملابس مرتبة في صفوف طويلة تحت إضاءة خافتة.'
    },
    {
      scene:'المشهد ٢ — اندلاع الحريق',
      img: IMG_BASE_WAREHOUSEFIRE + 'fire-scene2.jpg',
      text:'ألسنة نار بتبدأ تنتشر بسرعة من زاوية معينة في المخزن، والدخان بيتصاعد في السما نص الليل.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_WAREHOUSEFIRE + 'fire-scene3.jpg',
      text:'فريق الإطفاء بعد إخماد النيران بيكتشف جثة محترقة جزئيًا جوه بقايا المخزن.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_WAREHOUSEFIRE + 'fire-scene4.jpg',
      text:'صاحب الشركة بيديك تقرير خبير الحرائق الأولي، وقائمة الموظفين اللي كان عندهم وصول للمخزن.'
    },
  ],

  suspects: [
    {
      id:'warehouse_manager_gamal', name:'جمال', role:'مدير المخزن', img: IMG_BASE_WAREHOUSEFIRE + 'gamal.jpg', avatarEmoji:'📦',
      alibi:'قال إنه كان في بيته وقت اندلاع الحريق.',
      questions:[
        { q:'المخزون كان في حالة مالية إيه قبل الحريق؟', unlockId:'gamal_inventory_shortage',
          a:'"صراحة، كان فيه نقص غريب في بعض الأصناف من فترة، كنت بحقق فيه بهدوء."' },
        { q:'سعيد كان عارف حاجة عن النقص ده؟', requires:['gamal_inventory_shortage'],
          a:'(بيتردد) "سعيد كان لاحظ الموضوع قبلي، وكان بيسألني أسئلة كتير عنه."' },
      ]
    },
    {
      id:'business_owner_hosny', name:'حسني', role:'صاحب شركة النسيج الذهبي، طلب التحقيق', img: IMG_BASE_WAREHOUSEFIRE + 'hosny.jpg', avatarEmoji:'🏭',
      alibi:'قال إنه كان في اجتماع عمل خارج المدينة وقت الحريق.',
      questions:[
        { q:'الشركة كانت في وضع مالي صعب قبل الحريق؟', unlockId:'hosny_financial_trouble',
          a:'"كنا في أزمة سيولة حقيقية، والتأمين على المخزون كان هيساعدنا نتخطى الأزمة دي."' },
        { q:'سعيد كان عارف تفاصيل عن حالة الشركة المالية؟', requires:['hosny_financial_trouble'], unlockId:'hosny_saeed_knowledge',
          a:'(بيتوتر) "سعيد كان قريب من الحسابات أكتر مما ينفع، كان بيسأل أسئلة محرجة."' },
      ]
    },
    {
      id:'security_guard_reda', name:'رضا', role:'حارس أمن المخزن الليلي', img: IMG_BASE_WAREHOUSEFIRE + 'reda.jpg', avatarEmoji:'🔦',
      alibi:'قال إنه كان بيعمل جولة تفقدية طبيعية وقت الحريق.',
      questions:[
        { q:'لاحظت أي حاجة غريبة قبل اندلاع الحريق؟', unlockId:'reda_observation',
          a:'"شفت سيارة صاحب الشركة قريبة من المخزن قبل الحريق بساعة تقريبًا، مع إنه قال إنه في اجتماع بره المدينة."' },
        { q:'إنت كنت فين بالظبط وقت اندلاع النار؟', requires:['reda_observation'],
          a:'"كنت في الجولة التفقدية على الجانب التاني من المخزن، ده اللي أخرني عن ملاحظة الحريق بدري."' },
      ]
    },
    {
      id:'colleague_farid', name:'فريد', role:'زميل سعيد في المخزن', img: IMG_BASE_WAREHOUSEFIRE + 'farid.jpg', avatarEmoji:'👕',
      alibi:'قال إنه كان في بيته وقت الحريق زي أي يوم إجازة عادي.',
      questions:[
        { q:'كنت عارف إن سعيد ماسافرش فعلاً؟', unlockId:'farid_knew_saeed_present',
          a:'"أيوه، كلمني قبل الحريق بساعتين، قالي إنه راجع المخزن يجيب حاجة نساها."' },
        { q:'شاهد أكد إن سيارتك كانت قريبة من المخزن وقت الحريق، رغم إنك قلت كنت في بيتك — عايز تفسر؟', requires:['farid_knew_saeed_present','hosny_saeed_knowledge','gamal_inventory_shortage'], closesInterrogation:true,
          a:'(بيسكت) "حسني عرض عليّ فلوس كبيرة أشعل حريق يغطي على نقص المخزون قبل ما التدقيق يكشفه. مكنتش أعرف إن سعيد جوه المخزن وقتها."' },
      ]
    },
  ],

  evidence: [
    { id:'fire_investigator_report', tag:'من تقرير خبير الحرائق', crit:true, title:'الحريق مفتعل عمدًا', img: IMG_BASE_WAREHOUSEFIRE + 'fire-report.jpg',
      short:'آثار مادة معجّلة للاشتعال في نقطة بداية الحريق',
      full:'تقرير خبير الحرائق أكد وجود آثار مادة معجّلة للاشتعال في نقطة بداية الحريق، وده بيستبعد تمامًا فرضية الحادث العرضي.',
      unlocked:true, order:1 },

    { id:'gamal_inventory_shortage', tag:'من استجواب جمال', crit:false, title:'نقص غريب في المخزون', img:null,
      short:'نقص ملحوظ في بعض أصناف المخزون قبل الحريق',
      full:'جمال أكد ملاحظته لنقص غريب في بعض أصناف المخزون قبل الحريق بفترة، وكان بيحقق فيه بهدوء.',
      unlocked:false, order:2 },

    { id:'hosny_financial_trouble', tag:'من استجواب حسني', crit:true, title:'أزمة مالية في الشركة', img:null,
      short:'الشركة كانت في أزمة سيولة حقيقية قبل الحريق',
      full:'حسني اعترف بوجود أزمة سيولة حقيقية في الشركة، وإن تعويض التأمين على المخزون كان هيساعد بشكل كبير في تخطي الأزمة.',
      unlocked:false, order:3 },

    { id:'hosny_saeed_knowledge', tag:'من استجواب حسني', crit:true, title:'قرب سعيد من الحسابات', img:null,
      short:'سعيد كان بيسأل أسئلة محرجة عن الحسابات المالية',
      full:'حسني اعترف إن سعيد كان قريب من التفاصيل المالية للشركة أكتر من اللازم، وبيسأل أسئلة محرجة.',
      unlocked:false, order:4 },

    { id:'reda_observation', tag:'من استجواب رضا', crit:true, title:'سيارة حسني قريبة من المخزن', img: IMG_BASE_WAREHOUSEFIRE + 'fire-car.jpg',
      short:'رضا شاف سيارة حسني قريبة من المخزن قبل الحريق بساعة',
      full:'رضا أكد إنه شاف سيارة تشبه سيارة حسني قريبة من المخزن قبل اندلاع الحريق بساعة تقريبًا، رغم إن حسني ادّعى إنه كان في اجتماع خارج المدينة.',
      unlocked:false, order:5 },

    { id:'farid_knew_saeed_present', tag:'من استجواب فريد', crit:true, title:'سعيد كان في المخزن فعلاً', img:null,
      short:'فريد أكد إن سعيد رجع المخزن قبل الحريق بساعتين',
      full:'فريد اعترف إن سعيد كلمه قبل الحريق بساعتين وقاله إنه راجع المخزن يجيب حاجة نساها، رغم إن العيلة كانت فاكرة إنه مسافر.',
      unlocked:false, order:6 },

    { id:'farid_car_seen', tag:'من شهادة جار المخزن', crit:true, title:'سيارة فريد قريبة من المخزن', img: IMG_BASE_WAREHOUSEFIRE + 'fire-witness.jpg',
      short:'جار المخزن أكد وجود سيارة فريد قريبة وقت الحريق',
      full:'جار للمخزن أكد إنه شاف سيارة تشبه سيارة فريد قريبة من المكان وقت اندلاع الحريق، رغم إن فريد ادّعى إنه كان في بيته.',
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
  polygraphPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },

  floorPlanPuzzle: {
    enabled: true,
    tabLabel: 'مخطط مسار الحريق',
    introText: 'تتبع اتجاه انتشار الحريق من نقطة الاشتعال، وحدد مين من المشتبه بيهم كان يقدر يوصل لنقطة البداية دي من غير ما يمر على غرفة الحراسة.',
    resultText: 'المسار بيوضح إن فريد قدر يوصل لنقطة الاشتعال من المدخل الجانبي من غير ما يمر على رضا في غرفة الحراسة.',
    rooms: ['المدخل الرئيسي', 'المدخل الجانبي', 'نقطة الاشتعال', 'غرفة الحراسة'],
    suspectPaths: {
      warehouse_manager_gamal: ['المدخل الرئيسي'],
      business_owner_hosny:    ['المدخل الرئيسي', 'غرفة الحراسة'],
      security_guard_reda:     ['غرفة الحراسة'],
      colleague_farid:         ['المدخل الجانبي', 'نقطة الاشتعال'],
    },
    correctSuspectId: 'colleague_farid',
    resultEvidenceIds: ['farid_car_seen'],
  },

  evidenceCombinations: [
    { parts:['hosny_financial_trouble','farid_knew_saeed_present'], resultId:'farid_car_seen' },
  ],

  correctSuspectId: 'colleague_farid',
  conclusiveEvidenceIds: ['farid_knew_saeed_present', 'farid_car_seen', 'hosny_financial_trouble'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن فريد هو الفاعل؟',
        options: [
          { id:'a', text:'مسار الحريق اللي أثبت وصوله لنقطة الاشتعال من المدخل الجانبي + شهادة الجار اللي كذّبت حجة غيابه + معرفته المسبقة إن سعيد كان في المخزن فعلاً' },
          { id:'b', text:'لأنه زميل سعيد وده يكفي كدافع' },
          { id:'c', text:'لأن حسني صاحب الشركة وده أوضح مستفيد من التأمين' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت خطة فريد الحقيقية؟',
        options: [
          { id:'a', text:'حسني عرض عليه فلوس كبيرة يشعل حريق يغطي على نقص المخزون قبل ما التدقيق المالي يكشفه، لكنه ما كانش يعرف إن سعيد رجع المخزن في نفس التوقيت' },
          { id:'b', text:'كان ناوي يقتل سعيد عمدًا بسبب خلاف شخصي' },
          { id:'c', text:'كان بيحاول يخوّف حسني بس من غير نية إشعال حريق فعلي' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحريق اللي خبى الحقيقة بدل ما يمحيها',
      paragraphs:[
        'حسني كان في أزمة سيولة حقيقية، وقرر يستغل الحريق كوسيلة لتغطية نقص مخزون كان حصل بسبب تلاعب مالي، عشان يحصل على تعويض التأمين. عرض على فريد مبلغ كبير عشان يشعل الحريق، لكن محدش منهم كان يعرف إن سعيد رجع المخزن في نفس التوقيت يجيب حاجة نساها.',
        'مسار الحريق اللي أثبت وصول فريد لنقطة الاشتعال من المدخل الجانبي، وشهادة الجار اللي كذّبت حجة غيابه، ومعرفته المسبقة بوجود سعيد في المخزن، كلها أدلة حاصرته وكشفت مأساة كان ممكن تتجنب.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية فريد، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: مسار الحريق، شهادة الجار، ومعرفته بوجود سعيد، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى سعيد فضلت مرتبطة بحادثة مالهاش تفسير حقيقي، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "حريق المخزن"

   الغلاف (cover.webp):
   "Photorealistic shot of a burned out clothing warehouse interior
   at dawn, charred racks and debris, smoky atmosphere, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (fire-scene1.jpg):
   "Photorealistic shot of a quiet clothing warehouse at night, rows
   of hanging clothes under dim lighting, photorealistic, no text,
   no watermark"

   المشهد ٢ (fire-scene2.jpg):
   "Photorealistic dramatic shot of flames spreading inside a
   warehouse at night, thick smoke rising, photorealistic, no text,
   no watermark"

   المشهد ٣ (fire-scene3.jpg):
   "Photorealistic shot of firefighters investigating a burned
   warehouse interior after extinguishing a fire, smoky atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٤ (fire-scene4.jpg):
   "Photorealistic shot of a businessman handing a fire report
   document to an investigator outside a burned warehouse, daylight,
   photorealistic, no text, no watermark"

   جمال (gamal.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male warehouse
   manager, work uniform, worried guarded expression, standing near
   warehouse shelves, warm indoor lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   حسني (hosny.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male business
   owner, formal business suit, nervous calculating expression,
   standing outside a burned warehouse, daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   رضا (reda.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male security
   guard, simple uniform with a flashlight, watchful tired
   expression, standing near a warehouse entrance at night, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   فريد (farid.jpg):
   "Photorealistic portrait of a young Egyptian male warehouse
   worker, simple work clothes, nervous guilty expression, standing
   outside a building, natural daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل التقرير (fire-report.jpg):
   "Photorealistic close-up of a fire investigation report document
   with burn pattern diagrams, clinical lighting, no text, no
   watermark, photorealistic"

   دليل السيارة (fire-car.jpg):
   "Photorealistic security camera style still frame of a car parked
   near a warehouse at night, grainy surveillance footage look, no
   text, no watermark, photorealistic"

   دليل الشاهد (fire-witness.jpg):
   "Photorealistic shot of a neighbor watching a burning warehouse
   from a distance at night, dim orange glow lighting, documentary
   photography style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_WAREHOUSE_FIRE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'farid_fire_route', tag:'من مخطط الحريق', crit:true, title:'فريد قدر يوصل لنقطة الاشتعال من المدخل الجانبي', img:null,
    short:'مخطط الحركة بيحط فريد على المسار الوحيد اللي يتفادى غرفة الحراسة',
    full:'تحليل مخطط المخزن بيوضح إن فريد كان يقدر يوصل لنقطة بداية الحريق من المدخل الجانبي من غير ما يعدي على رضا في غرفة الحراسة.', unlocked:false, order:90 });
  addEvidence({ id:'hosny_farid_payment', tag:'من تحويل مالي', crit:true, title:'دفعة من حسني لفريد قبل الحريق', img:null,
    short:'تحويل مالي كبير من حسني لفريد قبل الحريق بيوم',
    full:'مراجعة التحويلات كشفت دفعة مالية غير معتادة من حساب حسني لفريد قبل الحريق بيوم، وحسني حاول يبررها على إنها مقابل شغل إضافي من غير مستندات.', unlocked:false, order:91 });
  c.floorPlanPuzzle.resultEvidenceIds = ['farid_fire_route'];
  const farid=c.suspects.find(s=>s.id==='colleague_farid');
  if(farid){
    farid.questions[0].q='آخر مرة كلمت سعيد قبل الحريق كانت إمتى؟';
    farid.questions[0].a='"كلمني قبل الحريق بساعتين وقال إنه هيعدي على المخزن يجيب حاجة نسيها ويمشي على طول. كنت فاكر إنه خرج قبل ما يحصل أي حاجة."';
    const fq=farid.questions.find(q=>q.closesInterrogation); if(fq){fq.requires=['farid_car_seen','farid_fire_route','hosny_farid_payment']; fq.a='(بيسكت) "حسني دفعلي عشان أشعل الحريق ويبان كأنه حادث يغطي على نقص المخزون. كنت فاكر سعيد عدى وخلاص وخرج، ماكنتش أعرف إنه لسه جوه وقت ما ولعت النار."';}
  }
  const old=evidence('farid_knew_saeed_present'); if(old){old.title='اتصال سعيد قبل الحريق'; old.short='سعيد قال لفريد إنه هيمر على المخزن بسرعة ويخرج'; old.full='فريد أكد إن سعيد اتصل بيه قبل الحريق وقال إنه هيمر على المخزن يجيب حاجة نسيها ويمشي، وفريد ادعى إنه كان فاكره خرج قبل اندلاع النار.'; old.crit=false;}
  const hosny=c.suspects.find(s=>s.id==='business_owner_hosny');
  if(hosny && !hosny.questions.some(q=>q.unlockId==='hosny_farid_payment')) hosny.questions.push({
    q:'في تحويل كبير خرج من حسابك لفريد قبل الحريق بيوم من غير فاتورة أو عقد. كان مقابل إيه؟',
    requires:['hosny_financial_trouble','gamal_inventory_shortage'], unlockId:'hosny_farid_payment',
    a:'(بيتوتر) "كان مقابل شغل إضافي... مفيش ورق رسمي عليه. كنت محتاج مشكلة المخزون تختفي قبل مراجعة التأمين."'
  });
  c.conclusiveEvidenceIds = ['farid_car_seen','farid_fire_route','hosny_farid_payment'];
  setTheory0('مسار الحريق اللي أثبت وصول فريد لنقطة الاشتعال + شهادة الجار اللي حطت عربيته قرب المخزن + التحويل المالي من حسني لفريد قبل الحريق');
  setTheory1('حسني دفع لفريد عشان يشعل حريق يغطي على نقص المخزون قبل التدقيق والتأمين. فريد كان فاكر إن سعيد مرّ على المخزن وخرج، لكنه كان لسه جوه وقت التنفيذ');
  c.endings.good.paragraphs[0] = 'حسني كان في أزمة سيولة ونقص المخزون كان ممكن يفتح عليه تدقيق كبير. دفع لفريد عشان يشعل حريق يبان كأنه حادث ويغطي على النقص. فريد كان عارف إن سعيد هيعدي على المخزن بسرعة، لكنه كان مقتنع إنه خرج قبل تنفيذ الخطة؛ سعيد كان لسه جوه وقت اندلاع النار.';
  c.endings.good.paragraphs[1] = 'مسار الحريق اللي حط فريد عند نقطة الاشتعال، وشهادة الجار على وجود عربيته، والتحويل المالي غير المبرر من حسني قبل الحريق، عملوا سلسلة إثبات واضحة وكشفوا إن الحريق كان متعمد وإن وفاة سعيد كانت نتيجة الخطة.';
  c.endings.partial.hint = 'اجمع على الأقل 4 أدلة من: سيارة فريد، مساره لنقطة الاشتعال، والتحويل المالي من حسني، قبل ما تتهم.';

})();

(() => {
  const s = CASE_WAREHOUSE_FIRE.suspects.find(x => x.id === 'colleague_farid');
  if (s && !s.questions.some(x => x.q === 'كان بينك وبين حسني شغل خاص أو فلوس خارج مرتبك؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'كان بينك وبين حسني شغل خاص أو فلوس خارج مرتبك؟', requires:['farid_car_seen'], a:'(بيتردد) "عملت له شغل إضافي كذا مرة، وكان ساعات بيدفعلي بشكل مباشر. مش كل حاجة بينا كانت بتدخل في حسابات الشركة."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_WAREHOUSE_FIRE;
  c.evidenceCombinations = [];
  if (c.floorPlanPuzzle) {
    c.floorPlanPuzzle.resultText = 'المخطط يثبت إن فريد كان يقدر يوصل لنقطة الاشتعال من المدخل الجانبي من غير المرور بالحراسة. ده يثبت فرصة الوصول فقط.';
    c.floorPlanPuzzle.resultEvidenceIds = ['farid_route_access'];
  }
  const ev = id => c.evidence.find(e => e.id === id);
  if (!ev('farid_route_access')) {
    c.evidence.push({
      id:'farid_route_access', tag:'من مخطط المخزن', crit:true,
      title:'مسار وصول فريد لنقطة الاشتعال', img:null,
      short:'الممر الجانبي يتيح الوصول لنقطة بداية الحريق بعيدًا عن الحراسة',
      full:'مخطط المخزن يثبت إن فريد كان يقدر يدخل من الممر الجانبي ويصل لنقطة بداية الحريق من غير المرور على رضا. ده يثبت الإمكانية، مش التنفيذ وحده.',
      unlocked:false, order:90
    });
  }
  const f = c.suspects.find(s => s.id === 'colleague_farid');
  if (f) {
    const q = f.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'عربيتك كانت قرب المخزن، وإنت عارف إن سعيد رجع، والمخطط يثبت إنك تقدر تدخل من الممر الجانبي. تفسر ده إزاي؟';
      q.requires = ['farid_knew_saeed_present','farid_car_seen','farid_route_access'];
      q.a = '(بيسكت) "كنت قريب من المكان فعلًا وعرفت إن سعيد رجع، لكن ده مش اعتراف إني ولعت المخزن. لازم تثبتوا مين استخدم مادة الاشتعال."';
    }
  }
  c.conclusiveEvidenceIds = ['fire_investigator_report','farid_knew_saeed_present','farid_car_seen','farid_route_access'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_WAREHOUSE_FIRE;
  // إزالة نسخة قديمة مكررة من دليل المسار؛ farid_route_access هو الإصدار المعتمد في المراجعة الأخيرة.
  c.evidence = c.evidence.filter(e=>e.id!=='farid_fire_route');
  c.conclusiveEvidenceIds = (c.conclusiveEvidenceIds||[]).map(id=>id==='farid_fire_route'?'farid_route_access':id);
  const f = c.suspects.find(s=>s.id==='colleague_farid');
  if(f) (f.questions||[]).forEach(q=>{ if(q.requires) q.requires=q.requires.map(id=>id==='farid_fire_route'?'farid_route_access':id); });
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='ask_warehouse_neighbor')) c.investigationActions.push({
    id:'ask_warehouse_neighbor', kind:'شاهد خارجي', label:'اسأل جار المخزن عن العربيات وقت الحريق',
    description:'راجع الحركة حوالين المخزن مع شاهد مستقل عن موظفي الشركة.',
    requires:['fire_investigator_report'], resultEvidenceIds:['farid_car_seen'],
    successText:'تم توثيق شهادة الجار عن حركة العربيات وقت الحريق.'
  });
})();
