/* ============================================================
   بيانات قضية: التوأم المفقود
   قضية اختفاء/DNA — واحد من توأم بيدّعي إن أخوه اختفى فجأة،
   بس فيه شكوك غريبة حوالين القصة كلها من البداية.
   ============================================================ */

const IMG_BASE_MISSINGTWIN = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/missing-twin/';

const CASE_MISSING_TWIN = {
  id: 'missing-twin',
  title: 'التوأم المفقود',
  caseNo: 'CASE 054',
  subtitle: 'شقة التوأم المشتركة، مدينة نصر',
  coverImg: IMG_BASE_MISSINGTWIN + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 38,
  investigationPoints: 21,
  teaser: 'واحد من توأم متطابق بيبلغ عن اختفاء أخوه فجأة من شقتهم المشتركة، بس تفاصيل القصة اللي بيحكيها فيها تناقضات غريبة من البداية.',

  isPremium: false,
  categories: ['disappearance', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_MISSINGTWIN + 'cover.webp',
    heroCaption: 'CASE 054 — بعد الاختفاء بيومين',
    text1: 'التوأم "كريم" بلّغ الشرطة إن أخوه التوأم "تامر" اختفى فجأة من شقتهم المشتركة من غير أي أثر. المشكلة إن كريم وتامر متطابقين تمامًا، والناس القريبين منهم دايمًا بتتلخبط بينهم، وده بيخلي التحقيق معقد جدًا.',
    text2: 'أم كريم وتامر طلبت منك تحقق في الموضوع، لأنها حاسة إن حاجة في رواية كريم مش مظبوطة. عندك تفاصيل حياة التوأم المشتركة، وعينات DNA من غرفتيهم المنفصلتين في الشقة.',
    meta: [
      { label:'المختفي', value:'تامر — أحد التوأم المتطابقين' },
      { label:'المبلّغ', value:'كريم — التوأم الآخر' },
      { label:'التعقيد', value:'التوأم متطابقين تمامًا شكلًا' },
      { label:'طلب التحقيق', value:'أم التوأم' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — حياة مشتركة',
      img: IMG_BASE_MISSINGTWIN + 'twin-scene1.jpg',
      text:'كريم وتامر بيعيشوا سوا في شقة واحدة، متطابقين تمامًا في الشكل، بس شخصياتهم مختلفة جدًا حسب أقرب الناس ليهم.'
    },
    {
      scene:'المشهد ٢ — البلاغ',
      img: IMG_BASE_MISSINGTWIN + 'twin-scene2.jpg',
      text:'كريم بيروح قسم الشرطة، بيبلغ إن أخوه تامر اختفى فجأة قبلها بيوم، ومحدش عارف حاجة عن مكانه.'
    },
    {
      scene:'المشهد ٣ — التفاصيل المتناقضة',
      img: IMG_BASE_MISSINGTWIN + 'twin-scene3.jpg',
      text:'أثناء الاستجواب، كريم بيحكي تفاصيل عن آخر مرة شاف فيها تامر، لكن بعض التفاصيل بتتناقض مع أقوال شهود تانيين.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_MISSINGTWIN + 'twin-scene4.jpg',
      text:'أم التوأم بتديك تفاصيل حياتهم المشتركة، وصلاحية أخد عينات DNA من غرفتيهم المنفصلتين.'
    },
  ],

  suspects: [
    {
      id:'twin_karim', name:'كريم', role:'التوأم اللي بلّغ عن الاختفاء', img: IMG_BASE_MISSINGTWIN + 'karim_t.jpg', avatarEmoji:'👥',
      alibi:'قال إنه كان نايم وقت ما تامر خرج من الشقة آخر مرة.',
      questions:[
        { q:'علاقتك بتامر كانت مستقرة في الفترة الأخيرة؟', unlockId:'karim_t_relationship',
          a:'"كان بينا خلاف قديم على إرث أبونا، بس كنا بنحاول نتجاوزه."' },
        { q:'آخر مرة شفت فيها تامر كانت إمتى بالظبط؟', requires:['nourhan_relationship'], unlockId:'karim_t_last_seen',
          a:'"من يومين، خرج الصبح وما رجعش، ده كل اللي أعرفه."' },
      ]
    },
    {
      id:'girlfriend_nourhan', name:'نورهان', role:'صديقة تامر', img: IMG_BASE_MISSINGTWIN + 'nourhan.jpg', avatarEmoji:'💔',
      alibi:'قالت إنها ماشافتش تامر من كذا يوم قبل اختفائه.',
      questions:[
        { q:'علاقتك بتامر كانت إيه في الفترة الأخيرة؟', unlockId:'nourhan_relationship',
          a:'"كنا في علاقة، بس تامر كان بيحكيلي عن خلاف كبير مع كريم على الميراث."' },
        { q:'تامر قالك حاجة عن خططه قبل اختفائه؟', requires:['nourhan_relationship'], unlockId:'nourhan_plans',
          a:'"قالي إنه ناوي يطلب نصيبه من الميراث رسميًا، وإن كريم مش هيقبل بسهولة."' },
      ]
    },
    {
      id:'family_lawyer_essam', name:'عصام', role:'محامي العائلة، مسؤول عن ملف الإرث', img: IMG_BASE_MISSINGTWIN + 'essam.jpg', avatarEmoji:'📜',
      alibi:'قال إنه كان في مكتبه طول الوقت، بعيد تمامًا عن أي طرف من التوأم.',
      questions:[
        { q:'ملف إرث التوأم كان فيه إيه بالظبط؟', unlockId:'essam_inheritance_details',
          a:'"كريم كان المسؤول الرسمي عن إدارة الإرث، وتامر كان بيطالب بمراجعة الحسابات."' },
        { q:'لاحظت أي تلاعب في إدارة كريم للإرث؟', requires:['essam_inheritance_details'],
          a:'(بيتردد) "فيه بعض التحويلات اللي مكنتش واضحة تمامًا، كنت بخطط أراجعها بعناية أكتر."' },
      ]
    },
  ],

  evidence: [
    { id:'shared_apartment_scene', tag:'من الشقة المشتركة', crit:false, title:'الشقة من غير أي أثر عنف', img: IMG_BASE_MISSINGTWIN + 'twin-apartment.jpg',
      short:'غرفة تامر مرتبة تمامًا، من غير أي أثر مقاومة أو اقتحام',
      full:'غرفة تامر في الشقة مرتبة تمامًا، من غير أي أثر عنف أو مقاومة، وده بيفتح احتمالات مختلفة عن طبيعة الاختفاء.',
      unlocked:true, order:1 },

    { id:'karim_t_relationship', tag:'من استجواب كريم', crit:true, title:'خلاف الإرث بين التوأم', img:null,
      short:'كريم وتامر في خلاف قديم على إرث أبوهم',
      full:'كريم اعترف بوجود خلاف قديم مع تامر على إدارة إرث والدهم، رغم محاولتهم تجاوزه.',
      unlocked:false, order:2 },

    { id:'karim_t_last_seen', tag:'من استجواب كريم', crit:false, title:'رواية كريم عن آخر مرة', img:null,
      short:'كريم بيدّعي إن تامر خرج الصبح وما رجعش',
      full:'كريم قال إن تامر خرج من الشقة الصبح وما رجعش، من غير تفاصيل إضافية واضحة.',
      unlocked:false, order:3 },

    { id:'nourhan_relationship', tag:'من استجواب نورهان', crit:false, title:'علاقة نورهان بتامر', img:null,
      short:'نورهان كانت في علاقة مع تامر',
      full:'نورهان أكدت علاقتها بتامر، وإنه كان بيحكيلها عن الخلاف المستمر مع كريم على الميراث.',
      unlocked:false, order:4 },

    { id:'nourhan_plans', tag:'من استجواب نورهان', crit:true, title:'خطط تامر الأخيرة', img:null,
      short:'تامر كان ناوي يطالب بنصيبه رسميًا من الميراث',
      full:'نورهان كشفت إن تامر كان ناوي يطالب بمراجعة رسمية لحسابات الإرث، وإنه كان متوقع رفض قوي من كريم.',
      unlocked:false, order:5 },

    { id:'essam_inheritance_details', tag:'من استجواب عصام', crit:true, title:'تفاصيل ملف الإرث', img:null,
      short:'كريم كان المسؤول الرسمي عن إدارة إرث العيلة',
      full:'عصام أكد إن كريم كان المسؤول الرسمي عن إدارة إرث العائلة، وإن تامر كان بيطالب بمراجعة الحسابات.',
      unlocked:false, order:6 },

    { id:'dna_traces_room', tag:'من تحليل DNA', crit:true, title:'آثار DNA في غرفة كريم', img: IMG_BASE_MISSINGTWIN + 'twin-dna.jpg',
      short:'آثار دم بسيطة تخص تامر موجودة في غرفة كريم',
      full:'تحليل الـDNA كشف آثار دم بسيطة تخص تامر موجودة في غرفة كريم بالذات، رغم إن كريم قال إن تامر ماكانش دخل غرفته أبدًا.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
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
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم dnaLabPuzzle مستخدم هنا بطريقة خاصة: بما إن التوأم
     متطابقين جينيًا في الأساس، اللاعب بيقارن "آثار دم دقيقة"
     مش تسلسل DNA كامل، عشان يوضح مكان الحادثة الفعلي رغم التطابق
     الجيني شبه الكامل بين الأخوين.
     ============================================================ */
  dnaLabPuzzle: {
    enabled: true,
    tabLabel: 'تحليل آثار الدم',
    introText: 'بما إن التوأم متطابقين جينيًا تقريبًا، ركّز على موقع آثار الدم نفسها بدل التسلسل الجيني، ودوّر على الغرفة اللي فيها الأثر الأوضح.',
    resultText: 'أثر الدم الأوضح موجود في غرفة كريم بالذات، مش غرفة تامر، وده بيتناقض مع رواية كريم إن تامر ماكانش دخل غرفته.',
    sampleSequence: ['T', 'A', 'M', 'E', 'R'],
    suspectSequences: {
      twin_karim:        ['T', 'A', 'M', 'E', 'R'],
      girlfriend_nourhan: ['N', 'O', 'U', 'R', 'H'],
      family_lawyer_essam:['E', 'S', 'A', 'M', 'L'],
    },
    correctSuspectId: 'twin_karim',
    resultEvidenceIds: ['dna_traces_room'],
  },

  evidenceCombinations: [
    { parts:['nourhan_plans','essam_inheritance_details'], resultId:'dna_traces_room' },
  ],

  correctSuspectId: 'twin_karim',
  conclusiveEvidenceIds: ['karim_t_relationship', 'dna_traces_room', 'nourhan_plans'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كريم مسؤول عن اختفاء تامر؟',
        options: [
          { id:'a', text:'آثار دم تامر الموجودة في غرفة كريم رغم إنكاره + خلافهم القديم الموثق على إدارة الإرث + خطط تامر الأخيرة لمطالبة رسمية بمراجعة الحسابات' },
          { id:'b', text:'لأنه توأمه وده يكفي كدافع' },
          { id:'c', text:'لأن نورهان كانت آخر واحدة تكلمت معاه' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي حصل فعليًا بين التوأم؟',
        options: [
          { id:'a', text:'تامر واجه كريم في غرفته بخصوص مطالبته بمراجعة حسابات الإرث، النقاش اتصعّد لعنف غير مخطط له، وكريم حبس أخوه في مكان بعيد بدل ما يبلغ عن الحقيقة خوفًا من انكشاف تلاعبه المالي' },
          { id:'b', text:'تامر سافر بإرادته من غير ما يقول لحد' },
          { id:'c', text:'نورهان هي اللي كانت وراء اختفائه' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'الدم اللي ما قدرش يخبي نفسه',
      paragraphs:[
        'كريم كان بيدير إرث العائلة بشكل غير شفاف، وتامر كان مصمم يطالب بمراجعة رسمية للحسابات. واجه تامر أخوه في غرفته بخصوص الموضوع، والنقاش اتصعّد لعنف غير مخطط له. خوفًا من انكشاف تلاعبه المالي، قرر كريم يحبس أخوه بدل ما يبلغ عن الحقيقة أو يواجه العواقب.',
        'آثار دم تامر اللي اتلاقت في غرفة كريم بالذات رغم إنكاره التام، وخلافهم القديم الموثق على إدارة الإرث، وخطط تامر الأخيرة لمطالبة رسمية بمراجعة الحسابات، كلها أدلة حاصرت كريم وأدت لإنقاذ تامر في اللحظة المناسبة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كريم، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: آثار الدم في غرفته، الخلاف القديم، وخطط تامر الأخيرة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وتامر فضل في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "التوأم المفقود"

   الغلاف (cover.webp):
   "Photorealistic shot of an apartment hallway with two identical
   closed bedroom doors side by side, dim indoor lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (twin-scene1.jpg):
   "Photorealistic shot of two identical looking young Egyptian men
   in a shared living room, warm indoor lighting, photorealistic, no
   text, no watermark"

   المشهد ٢ (twin-scene2.jpg):
   "Photorealistic shot of a young man reporting a missing person at
   a police station desk, formal office lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (twin-scene3.jpg):
   "Photorealistic close-up of a man being questioned across a desk,
   nervous expression, formal interrogation room lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (twin-scene4.jpg):
   "Photorealistic shot of a worried mother handing photographs to
   an investigator in a living room, soft indoor lighting,
   photorealistic, no text, no watermark"

   كريم (karim_t.jpg):
   "Photorealistic portrait of a young Egyptian man, casual outfit,
   guarded calculating expression, standing in an apartment living
   room, warm indoor lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   نورهان (nourhan.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual outfit,
   worried concerned expression, sitting in a cafe, natural window
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   عصام (essam.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male lawyer,
   formal business suit, composed thoughtful expression, standing in
   an office, formal lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   دليل الشقة (twin-apartment.jpg):
   "Photorealistic shot of a tidy bedroom with no signs of struggle,
   soft indoor lighting, forensic evidence photography style, no
   text, no watermark, photorealistic"

   دليل الـ DNA (twin-dna.jpg):
   "Photorealistic close-up of a forensic blood trace analysis
   report on a clipboard, clinical lab lighting, no text, no
   watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_MISSING_TWIN;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const k=c.suspects.find(s=>s.id==='twin_karim');
  if(k && !k.questions.some(q=>q.closesInterrogation)) k.questions.push({
    q:'آثار دم تامر في أوضتك، وهو كان ناوي يطلب مراجعة رسمية لحسابات الإرث. إيه اللي حصل بينكم؟',
    requires:['dna_traces_room','karim_t_relationship','nourhan_plans'], closesInterrogation:true,
    a:'(صوته بيتهز) "واجهني بالحسابات في أوضتي. اتخانقنا واتصاب، وخفت يطلع يكشف كل حاجة. أخدته لمكان بعيد بدل ما أبلغ، وكنت فاكر إني هعرف أصلح الموضوع بعدين."'
  });

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_MISSING_TWIN;
  c.evidenceCombinations = [];
  const k = c.suspects.find(s => s.id === 'twin_karim');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(صوته بيتهز) "اتخانقنا فعلًا في أوضتي بسبب الحسابات واتصاب إصابة بسيطة، وبعدها خرج. أنا خبّيت موضوع الخناقة عشان ما أبانش مشتبه، لكن ماعرفش راح فين بعد كده."';
    }
  }
  c.conclusiveEvidenceIds = ['karim_t_relationship','dna_traces_room','nourhan_plans'];
  c.conclusiveRequired = 3;

  c.evidence.push({id:'karim_storage_link_v2',tag:'تحريات ملكية',crit:true,title:'مخزن مستأجر باسم كريم',img:null,short:'سجل الإيجار كشف مخزنًا استأجره كريم سرًا',full:'مراجعة التحركات المالية بعد الخلاف كشفت إيجار كريم لمخزن خارج المدينة باسم وسيط، في نفس أسبوع اختفاء تامر.',unlocked:false,order:98});
  c.evidence.push({id:'tamer_rescued_v2',tag:'نتيجة التتبع والمداهمة',crit:true,title:'العثور على تامر',img:null,short:'تم العثور على تامر محتجزًا في المخزن',full:'بعد مطابقة سجل الإيجار بآخر نطاق لهاتف تامر، تمت مداهمة المخزن والعثور عليه حيًا. شهادته أكدت إن كريم احتجزه بعد الخلاف.',unlocked:false,order:99});
  c.investigationActions=[...(c.investigationActions||[]),
    {id:'twin_trace_storage_v2',kind:'تحريات مالية',label:'راجع تحركات كريم وعقود التخزين',requires:['dna_traces_room','karim_t_relationship'],resultEvidenceIds:['karim_storage_link_v2'],successText:'تم كشف مخزن استأجره كريم باسم وسيط.'},
    {id:'twin_raid_storage_v2',kind:'تتبع ومداهمة',label:'طابق إشارة الهاتف وداهم المخزن',requires:['karim_storage_link_v2','nourhan_plans'],resultEvidenceIds:['tamer_rescued_v2'],successText:'تم العثور على تامر وإنقاذه من المخزن.'}
  ];
  c.conclusiveEvidenceIds=['dna_traces_room','karim_storage_link_v2','tamer_rescued_v2'];
  c.endings.good.paragraphs[1]='آثار دم تامر أثبتت بداية الاعتداء داخل غرفة كريم، وسجل الإيجار كشف المخزن السري، ثم قادت مطابقة إشارة الهاتف للمداهمة. العثور على تامر وشهادته أثبتا واقعة الاحتجاز.';
})();
