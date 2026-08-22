/* ============================================================
   بيانات قضية: مكالمة الفجر
   قضية قتل غامضة — زوجة بتتلقى مكالمة من رقم زوجها المتوفى
   بعد أسبوعين من وفاته في حادثة "عرضية".
   ============================================================ */

const IMG_BASE_DAWNCALL = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/dawn-call/';

const CASE_DAWN_CALL = {
  id: 'dawn-call',
  title: 'مكالمة الفجر',
  caseNo: 'CASE 047',
  subtitle: 'بيت العائلة، بعد أسبوعين من الجنازة',
  coverImg: IMG_BASE_DAWNCALL + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 37,
  investigationPoints: 21,
  teaser: 'زوجة بتتلقى مكالمة غامضة الفجر من رقم زوجها المتوفى من أسبوعين، بصوت شبيه بصوته بيقولها جملة واحدة غامضة قبل ما الخط يقفل.',

  isPremium: false,
  categories: ['murder', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_DAWNCALL + 'cover.webp',
    heroCaption: 'CASE 047 — الفجر بعد أسبوعين من الجنازة',
    text1: 'زوجة "علاء" المتوفى حديثًا في حادثة سيارة "عرضية" بتتلقى مكالمة غريبة على الفجر من رقم زوجها بالذات. صوت يشبه صوته بيقولها جملة واحدة: "مكنش حادث" قبل ما الخط يقفل فجأة.',
    text2: 'الزوجة طلبت منك تحقق في الموضوع، رغم إن الشرطة قفلت قضية علاء رسميًا كحادثة سيارة عرضية. عندك تفاصيل الحادثة الأصلية، وسجل المكالمة الغريبة.',
    meta: [
      { label:'المتوفى الأصلي', value:'علاء — مات في حادثة سيارة قبل أسبوعين' },
      { label:'الحدث الغريب', value:'مكالمة من رقمه بعد وفاته' },
      { label:'الجملة الغامضة', value:'"مكنش حادث"' },
      { label:'طلب التحقيق', value:'زوجة علاء' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحادثة الأصلية',
      img: IMG_BASE_DAWNCALL + 'call-scene1.jpg',
      text:'علاء بيموت في حادثة سيارة على طريق سريع فاضي نص الليل، تقرير الشرطة يوصفها كحادثة عرضية بسبب سرعة زايدة.'
    },
    {
      scene:'المشهد ٢ — بعد أسبوعين',
      img: IMG_BASE_DAWNCALL + 'call-scene2.jpg',
      text:'الزوجة بتحاول تتأقلم مع الفقد، البيت هادي وحزين، صورة علاء على الحائط.'
    },
    {
      scene:'المشهد ٣ — المكالمة',
      img: IMG_BASE_DAWNCALL + 'call-scene3.jpg',
      text:'موبايل الزوجة بيرن الفجر، اسم علاء ظاهر على الشاشة. بترد بيد مرتجفة، تسمع صوت يشبه صوته يقول "مكنش حادث" قبل ما يقفل فجأة.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_DAWNCALL + 'call-scene4.jpg',
      text:'الزوجة بتديك موبايلها فيه سجل المكالمة الغريبة، وتفاصيل تقرير الحادثة الأصلي.'
    },
  ],

  suspects: [
    {
      id:'twin_brother_maged', name:'ماجد', role:'أخو علاء التوأم', img: IMG_BASE_DAWNCALL + 'maged.jpg', avatarEmoji:'👥',
      alibi:'قال إنه كان في بيته وقت المكالمة الغريبة.',
      questions:[
        { q:'علاقتك بعلاء كانت إيه في الفترة الأخيرة؟', unlockId:'maged_relationship',
          a:'"كنا مقربين جدًا، صوتنا شبه بعض من زمان، الناس كانت بتلخبط بينا كتير."' },
        { q:'إنت اللي اتصلت من رقم علاء ده؟', requires:['maged_relationship'],
          a:'(بيتردد) "لأ طبعًا، ده رقمه الشخصي، ما عنديش سبب أعمل كده."' },
      ]
    },
    {
      id:'business_partner_fadi', name:'فادي', role:'شريك عمل علاء', img: IMG_BASE_DAWNCALL + 'fadi.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان مسافر خارج البلد وقت الحادثة الأصلية.',
      questions:[
        { q:'علاقتك التجارية بعلاء كانت مستقرة؟', unlockId:'fadi_dispute',
          a:'"كان بينا خلاف كبير على قرار استثماري خطير، علاء كان رافض بشدة."' },
        { q:'الحادثة الأصلية حصلت في وقت قريب من موعد قرار مهم؟', requires:['fadi_dispute'], unlockId:'fadi_deadline',
          a:'(بيتردد) "أيوه، كان في موعد نهائي لتوقيع الصفقة، وعلاء كان العائق الوحيد قدامها."' },
      ]
    },
    {
      id:'mechanic_hassan', name:'حسن', role:'ميكانيكي عربية علاء', img: IMG_BASE_DAWNCALL + 'hassan.jpg', avatarEmoji:'🔧',
      alibi:'قال إنه فحص العربية بشكل روتيني قبل الحادثة بأسبوع.',
      questions:[
        { q:'العربية كانت في حالة كويسة قبل الحادثة؟', unlockId:'hassan_car_check',
          a:'"فحصتها بنفسي قبل الحادثة بأسبوع، كانت في حالة ممتازة، مفيش أي مشكلة فنية."' },
        { q:'حد طلب منك تتلاعب في فرامل العربية؟', requires:['hassan_car_check'], unlockId:'hassan_tampering_request',
          a:'(بيتردد) "فادي جالي قبل الحادثة بيومين، عرض عليّ فلوس أعمل خلل بسيط في الفرامل يبان زي عطل عادي."' },
      ]
    },
    {
      id:'voice_actor_sami', name:'سامي', role:'ممثل أصوات، صديق قديم لماجد', img: IMG_BASE_DAWNCALL + 'sami.jpg', avatarEmoji:'🎙️',
      alibi:'قال إنه ما لهوش أي علاقة بالموضوع خالص.',
      questions:[
        { q:'إنت عارف ماجد إزاي؟', unlockId:'sami_connection',
          a:'"صديق قديم، بساعده أحيانًا في أعمال صوتية بسيطة لمشاريعه."' },
        { q:'ماجد طلب منك تسجل صوت يشبه صوت علاء؟', requires:['sami_connection','fadi_deadline','hassan_tampering_request'], closesInterrogation:true,
          a:'(بيتردد) "ماجد جاني بتسجيلات قديمة لصوت علاء، طلب مني أدمج جملة معينة بصوت شبيه. قالي إنها عشان يخوف حد كان السبب في موت أخوه."' },
      ]
    },
  ],

  evidence: [
    { id:'original_accident_report', tag:'من تقرير الشرطة', crit:false, title:'تقرير الحادثة الأصلي', img: IMG_BASE_DAWNCALL + 'call-report.jpg',
      short:'التقرير وصف الحادثة كحادثة عرضية بسبب سرعة زايدة',
      full:'تقرير الشرطة الأصلي وصف وفاة علاء كحادثة سيارة عرضية بسبب سرعة زايدة على طريق سريع فاضي نص الليل.',
      unlocked:true, order:1 },

    { id:'maged_relationship', tag:'من استجواب ماجد', crit:false, title:'تشابه صوت ماجد بعلاء', img:null,
      short:'ماجد وعلاء توأم، صوتهم متشابه جدًا',
      full:'ماجد أكد التشابه الكبير بين صوته وصوت أخوه التوأم علاء، لدرجة إن الناس كانت بتلخبط بينهم على التليفون.',
      unlocked:false, order:2 },

    { id:'fadi_dispute', tag:'من استجواب فادي', crit:true, title:'خلاف استثماري خطير', img:null,
      short:'فادي وعلاء في خلاف كبير على قرار استثماري',
      full:'فادي اعترف بوجود خلاف كبير مع علاء على قرار استثماري خطير كان علاء رافضه بشدة.',
      unlocked:false, order:3 },

    { id:'fadi_deadline', tag:'من استجواب فادي', crit:true, title:'موعد نهائي حاسم', img:null,
      short:'الحادثة حصلت قريب جدًا من موعد نهائي لتوقيع صفقة',
      full:'فادي اعترف إن الحادثة حصلت في وقت قريب جدًا من موعد نهائي لتوقيع صفقة كبيرة كان علاء العائق الوحيد قدامها.',
      unlocked:false, order:4 },

    { id:'hassan_car_check', tag:'من استجواب حسن', crit:false, title:'فحص روتيني للعربية', img:null,
      short:'حسن فحص العربية قبل الحادثة بأسبوع وكانت سليمة',
      full:'حسن أكد إنه فحص عربية علاء قبل الحادثة بأسبوع وكانت في حالة ممتازة، من غير أي مشاكل فنية.',
      unlocked:false, order:5 },

    { id:'hassan_tampering_request', tag:'من استجواب حسن', crit:true, title:'طلب تلاعب في الفرامل', img:null,
      short:'فادي عرض على حسن فلوس عشان يعمل خلل في الفرامل',
      full:'حسن اعترف إن فادي عرض عليه مبلغ مالي كبير عشان يعمل خلل بسيط في فرامل العربية قبل الحادثة بيومين.',
      unlocked:false, order:6 },

    { id:'sami_connection', tag:'من استجواب سامي', crit:false, title:'علاقة سامي بماجد', img:null,
      short:'سامي صديق قديم لماجد وبيساعده في أعمال صوتية',
      full:'سامي أكد صداقته القديمة بماجد ومساعدته له في أعمال صوتية بسيطة من وقت للتاني.',
      unlocked:false, order:7 },

    { id:'voice_synthesis_evidence', tag:'من تحليل صوتي', crit:true, title:'دمج صوتي احترافي', img: IMG_BASE_DAWNCALL + 'call-audio.jpg',
      short:'المكالمة الغامضة كانت دمج صوتي احترافي مبني على تسجيلات قديمة',
      full:'التحليل الصوتي الدقيق أكد إن المكالمة الغريبة كانت دمج صوتي احترافي مبني على تسجيلات قديمة لصوت علاء، نفذه سامي بطلب من ماجد.',
      unlocked:false, order:8 },
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
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },

  audioPuzzle: {
    enabled: true,
    tabLabel: 'تحليل مكالمة الفجر',
    introText: 'استمع للمكالمة الغريبة وقارنها بتسجيلات صوت علاء الحقيقية القديمة، ودوّر على علامات الدمج الصوتي الاصطناعي.',
    resultText: 'التحليل بيوضح إن المكالمة دمج صوتي احترافي، مش صوت علاء الحقيقي أو أي شخص حي بيتكلم مباشرة.',
    resultEvidenceIds: ['voice_synthesis_evidence'],
  },

  witnessReliabilityPuzzle: {
    enabled: true,
    tabLabel: 'تقييم رواية فادي',
    introText: 'قارن رواية فادي عن سفره وقت الحادثة برواية حسن عن زيارته له قبل الحادثة بيومين، وقيّم مين شهادته أقرب للحقيقة.',
    resultText: 'رواية حسن أكثر تفصيلاً وموثقة بتاريخ محدد، وده بيكشف تناقض واضح في ادعاء فادي بسفره.',
    testimonies: [
      { suspectId:'business_partner_fadi', text:'"كنت مسافر خارج البلد وقت الحادثة."', reliabilityScore: 30 },
      { suspectId:'mechanic_hassan', text:'"فادي جالي قبل الحادثة بيومين بالظبط وعرض عليّ فلوس."', reliabilityScore: 80 },
    ],
    correctSuspectId: 'business_partner_fadi',
    resultEvidenceIds: ['fadi_deadline'],
  },

  evidenceCombinations: [
    { parts:['fadi_dispute','hassan_tampering_request'], resultId:'fadi_deadline' },
  ],

  correctSuspectId: 'business_partner_fadi',
  conclusiveEvidenceIds: ['fadi_dispute', 'hassan_tampering_request', 'fadi_deadline'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن فادي هو المسؤول عن مقتل علاء؟',
        options: [
          { id:'a', text:'اعتراف حسن بمحاولة الرشوة للتلاعب في الفرامل + الخلاف الاستثماري الخطير بين فادي وعلاء + الموعد النهائي الحاسم لتوقيع الصفقة اللي علاء كان العائق قدامها' },
          { id:'b', text:'لأنه شريك عمل وده يكفي كدافع' },
          { id:'c', text:'لأن ماجد كان أخوه التوأم وده مريب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'مين اللي كان وراء مكالمة الفجر الغريبة؟',
        options: [
          { id:'a', text:'ماجد، أخو علاء التوأم، طلب من صديقه سامي يدمج تسجيلات صوت علاء القديمة عشان يخوف فادي ويخليه يشك إن الحقيقة هتتكشف، من غير ما يكون عنده دليل رسمي وقتها' },
          { id:'b', text:'كانت مكالمة حقيقية من علاء نفسه اللي زوّر موته' },
          { id:'c', text:'فادي نفسه هو اللي دبّر المكالمة عشان يشتت التحقيق' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'صوت من الماضي كشف الحاضر',
      paragraphs:[
        'فادي كان في خلاف استثماري خطير مع علاء، اللي كان العائق الوحيد قدام توقيع صفقة كبيرة في موعد نهائي حاسم. عرض على حسن الميكانيكي رشوة عشان يعمل خلل في فرامل عربية علاء يبان زي عطل عادي. ماجد، أخو علاء التوأم، كان مشكوك إن الحادثة مش عرضية، فطلب من صديقه سامي يدمج تسجيلات صوت علاء القديمة عشان يخوف فادي ويكشف الحقيقة.',
        'اعتراف حسن بمحاولة الرشوة للتلاعب في الفرامل، والخلاف الاستثماري الخطير الموثق بين فادي وعلاء، والموعد النهائي الحاسم لتوقيع الصفقة، كلها أدلة حاصرت فادي وكشفت إن حادثة علاء ماكانتش عرضية أبدًا.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية فادي، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: اعتراف حسن، الخلاف الاستثماري، والموعد النهائي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى علاء فضلت مرتبطة بحادثة غير حقيقية، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "مكالمة الفجر"

   الغلاف (cover.webp):
   "Photorealistic close-up of a smartphone screen glowing at dawn
   in a dark bedroom, an incoming call notification, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (call-scene1.jpg):
   "Photorealistic shot of a crashed car on an empty highway at
   night, emergency lights nearby, documentary photography style,
   no text, no watermark"

   المشهد ٢ (call-scene2.jpg):
   "Photorealistic shot of a quiet mourning living room with a
   framed photo on the wall, soft dim daylight, photorealistic, no
   text, no watermark"

   المشهد ٣ (call-scene3.jpg):
   "Photorealistic close-up of a woman answering her phone in bed at
   dawn, dim blue morning light, shocked expression, photorealistic,
   no text, no watermark"

   المشهد ٤ (call-scene4.jpg):
   "Photorealistic shot of a woman handing her phone to an
   investigator in a living room, soft indoor lighting,
   photorealistic, no text, no watermark"

   ماجد (maged.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   outfit, sorrowful guarded expression, sitting in a living room,
   soft natural lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   فادي (fadi.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   businessman, formal business suit, calculating nervous
   expression, standing in an office, formal lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   حسن (hassan.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male mechanic,
   work uniform with grease stains, nervous guarded expression,
   standing in a car garage, warm garage lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   سامي (sami.jpg):
   "Photorealistic portrait of a young Egyptian male voice actor,
   casual outfit, nervous evasive expression, sitting near audio
   recording equipment, dim studio lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل تقرير الحادثة (call-report.jpg):
   "Photorealistic close-up of a police accident report document,
   clinical office lighting, no text, no watermark, photorealistic"

   دليل التحليل الصوتي (call-audio.jpg):
   "Photorealistic close-up of an audio waveform analysis screen
   showing two overlapping voice patterns, clinical lab lighting, no
   text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_DAWN_CALL;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'fadi_travel_alibi_broken', tag:'من مقارنة الشهادات', crit:false, title:'حجة سفر فادي اتكسرت', img:null,
    short:'رواية حسن والتوقيتات بتكشف تناقض في كلام فادي عن سفره',
    full:'مقارنة رواية حسن بالتوقيتات المتاحة بتوضح إن حجة سفر فادي مش متماسكة، وإنه كان قادر يتواصل وينسق قبل الحادثة.', unlocked:false, order:90 });
  c.witnessReliabilityPuzzle.resultEvidenceIds = ['fadi_travel_alibi_broken'];
  const sami = c.suspects.find(s => s.id === 'voice_actor_sami');
  if (sami) { const q=sami.questions.find(q=>q.closesInterrogation); if(q) q.unlockId='voice_synthesis_evidence'; }
  const fadi = c.suspects.find(s => s.id === 'business_partner_fadi');
  if (fadi && !fadi.questions.some(q => q.closesInterrogation)) fadi.questions.push({
    q:'حسن اعترف إنك عرضت عليه فلوس عشان يعبث بالفرامل، والخلاف والصفقة بيحطوا الدافع عندك. لسه هتقول إن الحادث كان صدفة؟',
    requires:['hassan_tampering_request','fadi_dispute','fadi_deadline'], closesInterrogation:true,
    a:'(بيتنفس بعصبية) "كنت عايز علاء يبعد عن الصفقة، وافتكرت إن عطل العربية هيبان حادث عادي. ماحسبتش إن الموضوع هينتهي بموته."'
  });

})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_DAWN_CALL;
  c.evidenceCombinations = [];
  const f = c.suspects.find(s => s.id === 'business_partner_fadi');
  if (f) {
    const q = f.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'حسن قال إنك عرضت عليه فلوس عشان يعمل خلل في الفرامل، والخلاف والموعد النهائي بيدوك دافع واضح. ردك إيه؟';
      q.a = '(بيتنفس بعصبية) "حسن بيحاول ينقذ نفسه ويرميني في الموضوع. آه كان بينا خلاف وصفقة، لكن أنا ماطلبتش قتل علاء ولا العبث بعربيته."';
    }
  }
  c.conclusiveEvidenceIds = ['fadi_dispute','hassan_tampering_request','fadi_deadline'];
  c.conclusiveRequired = 3;
})();
