/* ============================================================
   بيانات قضية: فاتورة زيادة
   قضية قتل/فساد — صاحب مطعم بيتقتل بعد ما يكتشف نصب من
   شريكه في الحسابات المالية للمطعم.
   ============================================================ */

const IMG_BASE_OVERBILLED = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/overbilled/';

const CASE_OVERBILLED = {
  id: 'overbilled',
  title: 'فاتورة زيادة',
  caseNo: 'CASE 055',
  subtitle: 'مطعم شعبي مشهور، وسط البلد',
  coverImg: IMG_BASE_OVERBILLED + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 17,
  teaser: 'صاحب مطعم شعبي مشهور بيكتشف صدفة إن شريكه في الإدارة بيغش في فواتير الموردين من سنين، وبعد ما يواجهه، بيتلاقى مقتول في المطبخ بعد إغلاق المطعم.',

  isPremium: false,
  categories: ['murder', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_OVERBILLED + 'cover.webp',
    heroCaption: 'CASE 055 — بعد إغلاق المطعم',
    text1: 'صاحب المطعم "فتحي" كان بيراجع فواتير الموردين بالصدفة، ولاحظ فروق غريبة في الأسعار المسجلة مقارنة بالأسعار الحقيقية. اكتشف إن شريكه في الإدارة "رأفت" بيتلاعب في الفواتير من سنين طويلة عشان ياخد عمولات سرية.',
    text2: 'بعد ما واجه رأفت بالموضوع مباشرة، فتحي اتلاقى مقتول في مطبخ المطعم بعد الإغلاق بساعة تقريبًا. أخت فتحي طلبت منك تحقق بسرعة قبل ما المطعم يقفل بسبب الفضيحة. عندك فواتير المطعم لآخر سنة، وقائمة فريق العمل القريب.',
    meta: [
      { label:'المجني عليه', value:'فتحي — صاحب المطعم' },
      { label:'الاكتشاف', value:'تلاعب في فواتير الموردين' },
      { label:'مكان الحادثة', value:'مطبخ المطعم بعد الإغلاق' },
      { label:'طلب التحقيق', value:'أخت فتحي' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاكتشاف',
      img: IMG_BASE_OVERBILLED + 'bill-scene1.jpg',
      text:'فتحي بيراجع فواتير الموردين في مكتبه الصغير جوه المطعم، ويلاحظ فروق غريبة في الأسعار.'
    },
    {
      scene:'المشهد ٢ — المواجهة',
      img: IMG_BASE_OVERBILLED + 'bill-scene2.jpg',
      text:'فتحي بيواجه رأفت شريكه في المطبخ، نقاش حاد بينهم قبل ما المطعم يقفل أبوابه للعملاء.'
    },
    {
      scene:'المشهد ٣ — الجريمة',
      img: IMG_BASE_OVERBILLED + 'bill-scene3.jpg',
      text:'بعد إغلاق المطعم، فتحي بيتلاقى مقتول في المطبخ، والفواتير اللي كان بيراجعها متناثرة على الأرض.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_OVERBILLED + 'bill-scene4.jpg',
      text:'أخت فتحي بتديك نسخة من فواتير المطعم لآخر سنة، وقائمة فريق العمل القريب من فتحي ورأفت.'
    },
  ],

  suspects: [
    {
      id:'business_partner_raafat', name:'رأفت', role:'شريك فتحي في إدارة المطعم', img: IMG_BASE_OVERBILLED + 'raafat.jpg', avatarEmoji:'🧾',
      alibi:'قال إنه مشى فور ما المطعم قفل، قبل ما فتحي يتقتل.',
      questions:[
        { q:'المواجهة اللي حصلت بينك وبين فتحي كانت على إيه؟', unlockId:'raafat_confrontation',
          a:'"اتناقشنا على تفاصيل الفواتير، بس الموضوع اتحل بسرعة، ومشيت بعدها على طول."' },
        { q:'كنت بتاخد عمولات من الموردين على حساب المطعم؟', requires:['raafat_confrontation'], unlockId:'raafat_kickback',
          a:'(بيتلعثم) "كان اتفاق بسيط مع بعض الموردين، مقدرتش أرفض، ده كان بيغطي مصاريف شخصية ضرورية."' },
      ]
    },
    {
      id:'head_chef_mounir', name:'منير', role:'الشيف الرئيسي في المطعم', img: IMG_BASE_OVERBILLED + 'mounir.jpg', avatarEmoji:'👨‍🍳',
      alibi:'قال إنه كان بينظف المطبخ وقت الإغلاق زي كل يوم.',
      questions:[
        { q:'كنت عارف عن التلاعب في الفواتير؟', unlockId:'mounir_awareness',
          a:'"كان عندي شك، بعض المكونات كانت بتيجي أرخص من اللي مكتوب في الفواتير، بس ما كنتش متأكد."' },
        { q:'سمعت المواجهة بين فتحي ورأفت؟', requires:['mounir_awareness'], unlockId:'mounir_heard_argument',
          a:'"أيوه، كانت واضحة، فتحي كان غضبان جدًا ورأفت كان بيحاول يهدّيه."' },
      ]
    },
    {
      id:'supplier_medhat_o', name:'مدحت', role:'مورد رئيسي للمطعم', img: IMG_BASE_OVERBILLED + 'medhat_o.jpg', avatarEmoji:'📦',
      alibi:'قال إنه كان في مخزنه طول الليلة، بعيد عن المطعم تمامًا.',
      questions:[
        { q:'علاقتك برأفت كانت إيه بالظبط؟', unlockId:'medhat_o_deal',
          a:'"كان بينا اتفاق على عمولة مقابل تسجيل أسعار أعلى في الفواتير، اتفاق مربح للطرفين."' },
        { q:'كنت خايف إن الاتفاق ده ينكشف؟', requires:['medhat_o_deal'],
          a:'"طبعًا، ده كان هيدمر سمعتي التجارية مع موردين تانيين لو انكشف."' },
      ]
    },
  ],

  evidence: [
    { id:'inflated_invoices', tag:'من فواتير المطعم', crit:true, title:'فواتير بأسعار مضخمة', img: IMG_BASE_OVERBILLED + 'bill-invoice.jpg',
      short:'فروق واضحة بين الأسعار المسجلة والأسعار الحقيقية',
      full:'الفواتير بتوضح فروق واضحة ومتكررة بين الأسعار المسجلة رسميًا والأسعار الحقيقية للمكونات، على مدار سنة كاملة تقريبًا.',
      unlocked:true, order:1 },

    { id:'raafat_confrontation', tag:'من استجواب رأفت', crit:false, title:'مواجهة رأفت وفتحي', img:null,
      short:'رأفت اعترف بمواجهة قصيرة مع فتحي على الفواتير',
      full:'رأفت اعترف بحدوث مواجهة قصيرة مع فتحي حول تفاصيل الفواتير، بس أكد إن الموضوع اتحل بسرعة.',
      unlocked:false, order:2 },

    { id:'raafat_kickback', tag:'من استجواب رأفت', crit:true, title:'اعتراف رأفت بالعمولات', img:null,
      short:'رأفت معترف بأخذ عمولات سرية من الموردين',
      full:'رأفت اعترف بأخذ عمولات سرية من الموردين مقابل تسجيل أسعار مضخمة في الفواتير الرسمية.',
      unlocked:false, order:3 },

    { id:'mounir_awareness', tag:'من استجواب منير', crit:false, title:'شكوك منير القديمة', img:null,
      short:'منير كان عنده شك في أسعار المكونات',
      full:'منير أكد إن عنده شك قديم في فروق أسعار بعض المكونات، بس ما كانش متأكد من التفاصيل الكاملة.',
      unlocked:false, order:4 },

    { id:'mounir_heard_argument', tag:'من استجواب منير', crit:true, title:'منير سمع المواجهة', img:null,
      short:'منير سمع مواجهة حادة بين فتحي ورأفت',
      full:'منير أكد إنه سمع مواجهة حادة وواضحة بين فتحي ورأفت قبل إغلاق المطعم، وإن فتحي كان غضبان جدًا.',
      unlocked:false, order:5 },

    { id:'medhat_o_deal', tag:'من استجواب مدحت', crit:true, title:'اتفاق العمولة مع رأفت', img:null,
      short:'مدحت اعترف باتفاق عمولة سرية مع رأفت',
      full:'مدحت اعترف بوجود اتفاق عمولة سرية مع رأفت، بيسجل بموجبه أسعار أعلى في الفواتير مقابل نسبة مالية.',
      unlocked:false, order:6 },

    { id:'raafat_stayed_late', tag:'من شهادة جار المطعم', crit:true, title:'رأفت فضل بعد الإغلاق', img: IMG_BASE_OVERBILLED + 'bill-witness.jpg',
      short:'جار المطعم أكد وجود رأفت بعد إغلاق المطعم بوقت طويل',
      full:'جار المطعم أكد إنه شاف رأفت لسه موجود بعد إغلاق المطعم بوقت طويل، رغم إنه ادّعى إنه مشى فورًا بعد الإغلاق.',
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
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  ledgerAuditPuzzle: {
    enabled: true,
    tabLabel: 'تدقيق فواتير الموردين',
    introText: 'راجع فواتير الموردين المختلفين، ودوّر على المورد اللي أسعاره مضخمة بشكل متكرر مقارنة بأسعار السوق الحقيقية.',
    resultText: 'لقيت المورد المشبوه! مدحت بيسجل أسعار أعلى بشكل ملحوظ ومتكرر من كل الموردين التانيين.',
    ledgerRows: [
      { account:'مورد الخضار', name:'أسعار السوق العادية', amount:'2,000', suspicious:false },
      { account:'مدحت - اللحوم', name:'أسعار مضخمة متكررة', amount:'8,500', suspicious:true },
      { account:'مورد الألبان', name:'أسعار السوق العادية', amount:'1,500', suspicious:false },
      { account:'مورد التوابل', name:'أسعار السوق العادية', amount:'700', suspicious:false },
    ],
    correctAccountId: 'مدحت - اللحوم',
    linkedSuspectId: 'business_partner_raafat',
    resultEvidenceIds: ['raafat_kickback'],
  },

  evidenceCombinations: [
    { parts:['medhat_o_deal','mounir_heard_argument'], resultId:'raafat_stayed_late' },
  ],

  correctSuspectId: 'business_partner_raafat',
  conclusiveEvidenceIds: ['raafat_kickback', 'raafat_stayed_late', 'mounir_heard_argument'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن رأفت هو الفاعل؟',
        options: [
          { id:'a', text:'اعترافه بأخذ العمولات السرية من الموردين + شهادة جار المطعم اللي كذّبت حجة مغادرته المبكرة + شهادة منير على المواجهة الحادة بينه وبين فتحي' },
          { id:'b', text:'لأنه شريك فتحي وده يكفي كدافع' },
          { id:'c', text:'لأن مدحت المورد كان طرف في الصفقة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية رأفت الحقيقية؟',
        options: [
          { id:'a', text:'حاول يقنع فتحي يسكت عن التلاعب في الفواتير عشان يحمي مصدر دخله الإضافي من العمولات، لكن رفض فتحي القاطع خلى الموقف يتصعّد لعنف غير مخطط له بعد إغلاق المطعم' },
          { id:'b', text:'كان مخطط للقتل من البداية عشان يستولي على المطعم بالكامل' },
          { id:'c', text:'كان بيحاول يوقع مدحت في المشكلة بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'فاتورة واحدة كشفت كل حاجة',
      paragraphs:[
        'رأفت كان بياخد عمولات سرية من مدحت المورد مقابل تسجيل أسعار مضخمة في فواتير المطعم على مدار سنة كاملة. لما فتحي اكتشف التلاعب بالصدفة وواجهه مباشرة، حاول رأفت يقنعه يسكت عشان يحمي مصدر دخله الإضافي. رفض فتحي القاطع خلى الموقف يتصعّد لعنف غير مخطط له بعد إغلاق المطعم.',
        'اعتراف رأفت بأخذ العمولات السرية، وشهادة جار المطعم اللي كذّبت ادعاءه بمغادرته المبكرة، وشهادة منير على المواجهة الحادة اللي سمعها بينهم، كلها أدلة حاصرته وأثبتت مسؤوليته الكاملة عن مقتل شريكه.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية رأفت، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: اعترافه بالعمولات، شهادة الجار، وشهادة منير، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى فتحي فضلت مرتبطة بجريمة مالهاش فاعل معروف، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "فاتورة زيادة"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty restaurant kitchen at night,
   scattered invoice papers on a counter, dim kitchen lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (bill-scene1.jpg):
   "Photorealistic shot of a middle-aged man reviewing invoices at a
   small office desk inside a restaurant, warm desk lamp lighting,
   photorealistic, no text, no watermark"

   المشهد ٢ (bill-scene2.jpg):
   "Photorealistic shot of a tense confrontation between two men in
   a restaurant kitchen, warm kitchen lighting, photorealistic, no
   text, no watermark"

   المشهد ٣ (bill-scene3.jpg):
   "Photorealistic dramatic shot of scattered invoice papers on a
   restaurant kitchen floor, dim lighting, forensic evidence
   photography style, no text, no watermark"

   المشهد ٤ (bill-scene4.jpg):
   "Photorealistic shot of a woman handing invoice documents to an
   investigator in a restaurant dining area, warm restaurant
   lighting, photorealistic, no text, no watermark"

   رأفت (raafat.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male restaurant
   business partner, formal casual outfit, nervous calculating
   expression, standing in a restaurant kitchen, warm kitchen
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   منير (mounir.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male head
   chef, white chef uniform, thoughtful concerned expression,
   standing in a restaurant kitchen, warm kitchen lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   مدحت (medhat_o.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male food
   supplier, casual work outfit, nervous guarded expression, standing
   in a warehouse, warm warehouse lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل الفاتورة (bill-invoice.jpg):
   "Photorealistic close-up of a restaurant supplier invoice document
   with highlighted price discrepancies, clinical office lighting,
   no text, no watermark, photorealistic"

   دليل الشاهد (bill-witness.jpg):
   "Photorealistic shot of a neighbor watching a restaurant from
   across the street at night, dim street light, documentary
   photography style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_OVERBILLED;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'supplier_overbilling_proven', tag:'من تدقيق الفواتير', crit:false, title:'تضخيم أسعار المورد اتثبت', img:null,
    short:'التدقيق كشف إن أسعار مدحت أعلى بشكل متكرر وغير طبيعي',
    full:'مراجعة الفواتير أثبتت نمط تضخيم متكرر في أسعار المورد مدحت مقارنة بباقي الموردين، وده بيدعم اعتراف رأفت بنظام العمولات.', unlocked:false, order:90 });
  c.ledgerAuditPuzzle.resultEvidenceIds = ['supplier_overbilling_proven'];
  const r=c.suspects.find(s=>s.id==='business_partner_raafat');
  if(r && !r.questions.some(q=>q.closesInterrogation)) r.questions.push({
    q:'إنت اعترفت بالعمولات، ومنير سمع المواجهة، وجار المطعم شافك لسه موجود بعد الإغلاق. حصل إيه بعد ما فتحي رفض يسكت؟',
    requires:['raafat_kickback','mounir_heard_argument','raafat_stayed_late'], closesInterrogation:true,
    a:'(بيسكت) "حاولت أقنعه يديني فرصة أرجع الفلوس وأقفل الموضوع. هو رفض وأصر يبلغ، والمواجهة اتصعّدت بعد ما الكل مشي."'
  });

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_OVERBILLED;
  c.evidenceCombinations = [];
  const r = c.suspects.find(s => s.id === 'business_partner_raafat');
  if (r) {
    const q = r.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "فضلت بعد الإغلاق فعلًا عشان أحاول أقنع فتحي يديني فرصة أرجع الفلوس. اتخانقنا، وبعدها سبت المكان. التلاعب المالي ثابت، لكن القتل محتاج دليل مستقل."';
    }
  }
  c.conclusiveEvidenceIds = ['raafat_kickback','raafat_stayed_late','mounir_heard_argument','supplier_overbilling_proven'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_OVERBILLED;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='check_closing_witnesses')) c.investigationActions.push({
    id:'check_closing_witnesses', kind:'تحريات وقت', label:'راجع خروج العاملين بعد الإغلاق',
    description:'قارن مواعيد الانصراف بشهادات العاملين اللي فضلوا لآخر الشيفت.',
    requires:['raafat_confrontation'], resultEvidenceIds:['raafat_stayed_late'],
    successText:'تم تثبيت معلومة مهمة عن توقيت بقاء رأفت بعد الإغلاق.'
  });
})();
