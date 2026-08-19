/* ============================================================
   بيانات قضية: تعليق واحد
   قضية قتل (محتوى للبالغين) — يوتيوبر مشهور بيتهدد بسبب تعليق
   فاضح سر شخص معين، وبعدها بيموت في ظروف غامضة.
   ============================================================ */

const IMG_BASE_ONECOMMENT = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/one-comment/';

const CASE_ONE_COMMENT = {
  id: 'one-comment',
  title: 'تعليق واحد',
  caseNo: 'CASE 052',
  subtitle: 'استوديو تصوير منزلي، ليلة النشر',
  coverImg: IMG_BASE_ONECOMMENT + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  price: '15 جنيه',
  oldPrice: '30 جنيه',
  discountLabel: 'خصم 50%',
  teaser: 'يوتيوبر مشهور بينشر فيديو فيه تعليق عابر بيلمح لسر شخصي خطير عن حد معين، وبعد ساعات بيتلاقى ميت في استوديو التصوير بتاعه.',

  isPremium: true,
  premiumTier: 'B',
  categories: ['murder', 'digital'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتناول موضوعات فضح أسرار شخصية عبر الإنترنت، مناسبة لجمهور بالغ.',

  briefing: {
    heroImg: IMG_BASE_ONECOMMENT + 'cover.webp',
    heroCaption: 'CASE 052 — بعد نشر الفيديو بساعات',
    text1: 'اليوتيوبر "زياد" كان بينشر فيديو "قصص من ذكرياتي" وذكر فيه تفصيلة عابرة عن "صديق قديم كان بيخفي علاقة سرية غيرت مصير عيلة كاملة". الفيديو انتشر بسرعة، وكتير من المتابعين بدأوا يحاولوا يعرفوا مين المقصود.',
    text2: 'بعد نشر الفيديو بساعات قليلة، زياد اتلاقى ميت في استوديو التصوير المنزلي بتاعه. أخته طلبت منك تحقق قبل ما القضية تتحول لتكهنات إعلامية مالهاش أساس. عندك تعليقات الفيديو، وقائمة أصدقاء زياد القدامى.',
    meta: [
      { label:'المجني عليه', value:'زياد — يوتيوبر مشهور' },
      { label:'التلميح الخطير', value:'إشارة عابرة لسر شخصي في فيديو أخير' },
      { label:'مكان الحادثة', value:'استوديو التصوير المنزلي' },
      { label:'طلب التحقيق', value:'أخت زياد' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — التصوير',
      img: IMG_BASE_ONECOMMENT + 'comment-scene1.jpg',
      text:'زياد بيصور فيديو جديد في استوديوه المنزلي، بيحكي قصة عابرة عن صديق قديم من غير ما يذكر اسمه صراحة.'
    },
    {
      scene:'المشهد ٢ — الانتشار',
      img: IMG_BASE_ONECOMMENT + 'comment-scene2.jpg',
      text:'الفيديو بينتشر بسرعة، تعليقات كتير بتحاول تخمن هوية "الصديق القديم" اللي زياد اتكلم عنه.'
    },
    {
      scene:'المشهد ٣ — الليلة الأخيرة',
      img: IMG_BASE_ONECOMMENT + 'comment-scene3.jpg',
      text:'زياد بيستلم رسالة خاصة غاضبة من حساب مجهول، بعدها بساعات بيتلاقى ميت في استوديو التصوير.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_ONECOMMENT + 'comment-scene4.jpg',
      text:'أخت زياد بتديك موبايله فيه الرسالة المجهولة، وقائمة أصدقاء زياد المقربين من زمان.'
    },
  ],

  suspects: [
    {
      id:'childhood_friend_yehia', name:'يحيى', role:'صديق طفولة قديم لزياد', img: IMG_BASE_ONECOMMENT + 'yehia.jpg', avatarEmoji:'📹',
      alibi:'قال إنه كان في بيته وقت مقتل زياد.',
      questions:[
        { q:'إنت الصديق اللي زياد كان بيقصده في الفيديو؟', unlockId:'yehia_identification',
          a:'(بيتردد) "الفيديو كان غامض، بس كتير من التفاصيل شبهت موقف حصلي أنا فعلاً من زمان."' },
        { q:'إيه السر اللي كنت خايف زياد يفضحه؟', requires:['yehia_identification'], unlockId:'yehia_secret',
          a:'"كان عندي علاقة سرية أثرت على عيلة صديق مشترك بينا، حاجة ندمت عليها بشدة."' },
      ]
    },
    {
      id:'affected_family_member_samah', name:'سماح', role:'عضو من العيلة اللي تأثرت بالسر', img: IMG_BASE_ONECOMMENT + 'samah.jpg', avatarEmoji:'👨‍👩‍👧',
      alibi:'قالت إنها كانت في اجتماع عائلي طول الليلة.',
      questions:[
        { q:'الفيديو أثر عليكِ إزاي؟', unlockId:'samah_impact',
          a:'"فتح جرح عيلة قديم كنا بالكاد اتخطيناه، الناس بدأت تسأل أسئلة كتير."' },
        { q:'كنتِ عارفة هوية "الصديق القديم" اللي زياد اتكلم عنه؟', requires:['samah_impact'],
          a:'"للأسف أيوه، عرفته من التفاصيل، ده خلاني أزعل بشدة."' },
      ]
    },
    {
      id:'business_manager_ossama', name:'أسامة', role:'مدير أعمال زياد', img: IMG_BASE_ONECOMMENT + 'ossama.jpg', avatarEmoji:'📊',
      alibi:'قال إنه كان في اجتماع مع معلنين طول الليلة.',
      questions:[
        { q:'الفيديو ده أثر على شغلكم إزاي؟', unlockId:'ossama_business_impact',
          a:'"جاب مشاهدات كتير، بس كمان جاب ضغط إعلامي مش مريح، بعض المعلنين قلقوا."' },
        { q:'حاولت تقنع زياد يمسح الفيديو؟', requires:['ossama_business_impact'],
          a:'"اقترحت عليه، بس رفض، قال إن ده جزء من محتواه الصادق مع جمهوره."' },
      ]
    },
    {
      id:'anonymous_commenter_gaser', name:'جاسر', role:'صاحب الحساب المجهول اللي بعت الرسالة الغاضبة', img: IMG_BASE_ONECOMMENT + 'gaser.jpg', avatarEmoji:'💬',
      alibi:'قال إنه كان بره المدينة تمامًا وقت مقتل زياد.',
      questions:[
        { q:'إنت اللي بعت الرسالة الغاضبة لزياد؟', unlockId:'gaser_message_admission',
          a:'(بيتردد) "أيوه، أنا اللي بعتها، كنت غاضب جدًا من التلميحات في الفيديو."' },
        { q:'ليه كنت غاضب لدرجة إنك تهدد؟', requires:['gaser_message_admission'], unlockId:'gaser_reason',
          a:'"زياد كان بيلمح لسر يخص أبويا، اللي كان الصديق المشترك المتأثر بموقف يحيى القديم."' },
        { q:'شاهد أكد إنك كنت في نفس المدينة، مش بره خالص زي ما قلت — عايز تفسر؟', requires:['gaser_reason','yehia_secret','samah_impact'], closesInterrogation:true,
          a:'(بيصمت طويل) "كنت في المدينة فعلاً، رحت أواجه زياد بنفسي عشان يوقف يلمح لموضوع أبويا، النقاش اتصعّد بسرعة."' },
      ]
    },
  ],

  evidence: [
    { id:'video_transcript', tag:'من الفيديو المنشور', crit:true, title:'نص الفيديو المثير للجدل', img: IMG_BASE_ONECOMMENT + 'comment-video.jpg',
      short:'إشارة عابرة لسر شخصي عن صديق قديم غيّر مصير عيلة',
      full:'نص الفيديو بيوضح إشارة عابرة، لكن كافية، لسر شخصي قديم يخص صديق قديم لزياد، من غير ذكر اسم صريح.',
      unlocked:true, order:1 },

    { id:'yehia_identification', tag:'من استجواب يحيى', crit:false, title:'تطابق تفاصيل الفيديو مع يحيى', img:null,
      short:'يحيى اعترف بتشابه التفاصيل مع موقف حصله فعلاً',
      full:'يحيى اعترف بتشابه كبير بين تفاصيل الفيديو وموقف حقيقي حصله في الماضي.',
      unlocked:false, order:2 },

    { id:'yehia_secret', tag:'من استجواب يحيى', crit:true, title:'اعتراف يحيى بالسر', img:null,
      short:'يحيى اعترف بعلاقة سرية أثرت على عيلة صديق مشترك',
      full:'يحيى اعترف بعلاقة سرية قديمة أثرت بشكل كبير على عيلة صديق مشترك، وهو السر اللي كان زياد بيلمح ليه.',
      unlocked:false, order:3 },

    { id:'samah_impact', tag:'من استجواب سماح', crit:true, title:'تأثر عيلة سماح', img:null,
      short:'عيلة سماح هي اللي تأثرت بالسر القديم',
      full:'سماح أكدت إن عيلتها هي اللي تأثرت بشكل مباشر بالسر القديم اللي زياد لمح ليه في الفيديو.',
      unlocked:false, order:4 },

    { id:'ossama_business_impact', tag:'من استجواب أسامة', crit:false, title:'ضغط إعلامي على زياد', img:null,
      short:'الفيديو جاب ضغط إعلامي على أعمال زياد',
      full:'أسامة أكد إن الفيديو جاب مشاهدات كتير بس كمان ضغط إعلامي أثر على علاقة زياد بالمعلنين.',
      unlocked:false, order:5 },

    { id:'gaser_message_admission', tag:'من استجواب جاسر', crit:true, title:'اعتراف جاسر بالرسالة', img:null,
      short:'جاسر اعترف إنه صاحب الرسالة الغاضبة المجهولة',
      full:'جاسر اعترف إنه هو اللي بعت الرسالة الغاضبة المجهولة لزياد بعد نشر الفيديو مباشرة.',
      unlocked:false, order:6 },

    { id:'gaser_reason', tag:'من استجواب جاسر', crit:true, title:'دافع جاسر الشخصي', img:null,
      short:'السر بيخص أبو جاسر، الصديق المشترك المتأثر',
      full:'جاسر اعترف إن السر اللي زياد كان بيلمح ليه بيخص أبوه، اللي كان الصديق المشترك المتأثر بموقف يحيى القديم.',
      unlocked:false, order:7 },

    { id:'witness_gaser_seen_city', tag:'من شهادة جار الاستوديو', crit:true, title:'جاسر شوهد في المدينة', img: IMG_BASE_ONECOMMENT + 'comment-witness.jpg',
      short:'جار أكد رؤية جاسر قريب من استوديو زياد ليلة الجريمة',
      full:'جار للاستوديو أكد إنه شاف جاسر قريب من المكان في نفس ليلة الجريمة، رغم إنه ادّعى إنه كان بره المدينة تمامًا.',
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
  audioPuzzle: { enabled:false },

  witnessReliabilityPuzzle: {
    enabled: true,
    tabLabel: 'تقييم شهادة الحضور',
    introText: 'قارن رواية جاسر عن غيابه عن المدينة برواية جار الاستوديو اللي أكد رؤيته قريب من المكان، وقيّم مين شهادته أقرب للحقيقة.',
    resultText: 'رواية الجار أكثر تفصيلاً ومحددة بمكان وزمان واضحين، وده بيكشف كذب جاسر في ادعاء غيابه عن المدينة.',
    testimonies: [
      { suspectId:'anonymous_commenter_gaser', text:'"كنت بره المدينة تمامًا وقت مقتل زياد."', reliabilityScore: 20 },
      { suspectId:'affected_family_member_samah', text:'جار الاستوديو: "شفت جاسر قريب من الاستوديو نفس الليلة."', reliabilityScore: 82 },
    ],
    correctSuspectId: 'anonymous_commenter_gaser',
    resultEvidenceIds: ['witness_gaser_seen_city'],
  },

  evidenceCombinations: [
    { parts:['gaser_reason','yehia_secret'], resultId:'witness_gaser_seen_city' },
  ],

  correctSuspectId: 'anonymous_commenter_gaser',
  conclusiveEvidenceIds: ['gaser_message_admission', 'gaser_reason', 'witness_gaser_seen_city'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن جاسر هو الفاعل؟',
        options: [
          { id:'a', text:'اعترافه بإرسال الرسالة الغاضبة + دافعه الشخصي المرتبط بسر أبوه + شهادة الجار اللي كذّبت ادعاءه بالغياب عن المدينة' },
          { id:'b', text:'لأنه بعت رسالة غاضبة وده يكفي' },
          { id:'c', text:'لأن يحيى كان صاحب السر الأصلي' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية جاسر الحقيقية؟',
        options: [
          { id:'a', text:'رفض يشوف سمعة أبوه تتلطخ من جديد بعد سنين من محاولة تجاوز الموضوع، فراح يواجه زياد بنفسه عشان يوقف التلميحات، لكن النقاش اتصعّد بسرعة لعنف غير مخطط له' },
          { id:'b', text:'كان مخطط للقتل من البداية بدافع الانتقام' },
          { id:'c', text:'كان بيحاول يحمي يحيى فقط' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'تعليق واحد كفى لتفجير الحقيقة',
      paragraphs:[
        'زياد نشر فيديو فيه إشارة عابرة لسر قديم يخص علاقة يحيى السرية اللي أثرت على عيلة صديق مشترك، عيلة جاسر بالتحديد. جاسر، اللي عاش طول حياته يحاول يتجاوز أثر الموضوع على سمعة أبوه، خاف من عودة الفضيحة للسطح من جديد بسبب انتشار الفيديو. راح يواجه زياد بنفسه عشان يوقف التلميحات، لكن النقاش اتصعّد بسرعة لعنف غير مخطط له.',
        'اعترافه بإرسال الرسالة الغاضبة المجهولة، ودافعه الشخصي العميق المرتبط بسر أبوه، وشهادة الجار اللي كذّبت ادعاءه بالغياب عن المدينة، كلها أدلة حاصرته وكشفت إزاي تعليق واحد في فيديو قدر يفجّر جريمة قتل.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية جاسر، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: اعترافه بالرسالة، دافعه الشخصي، وشهادة الجار، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى زياد فضلت مرتبطة بتكهنات إعلامية بلا أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "تعليق واحد"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty home video studio setup with
   ring light and camera, dim ambient lighting, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (comment-scene1.jpg):
   "Photorealistic shot of a young man recording a video in a home
   studio with a ring light, warm studio lighting, photorealistic,
   no text, no watermark"

   المشهد ٢ (comment-scene2.jpg):
   "Photorealistic close-up of a smartphone screen showing a video
   with many comments scrolling, soft phone glow lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (comment-scene3.jpg):
   "Photorealistic close-up of a smartphone screen showing an angry
   private message notification at night, dim phone glow lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (comment-scene4.jpg):
   "Photorealistic shot of a woman handing a phone to an
   investigator in a living room, soft indoor lighting,
   photorealistic, no text, no watermark"

   يحيى (yehia.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   outfit, guarded uncomfortable expression, sitting in a living
   room, soft natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   سماح (samah.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman, simple
   formal outfit, hurt composed expression, sitting in a living
   room, soft natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   أسامة (ossama.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male talent
   manager, smart business casual outfit, concerned expression,
   standing in an office, warm office lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   جاسر (gaser.jpg):
   "Photorealistic portrait of a young Egyptian man, casual outfit,
   tense guarded expression, standing outside a building, natural
   daylight, candid documentary photography style, no text, no
   watermark, photorealistic"

   دليل الفيديو (comment-video.jpg):
   "Photorealistic close-up of a video editing screen with a
   transcript text visible, soft screen glow lighting, no text, no
   watermark, photorealistic"

   دليل الشاهد (comment-witness.jpg):
   "Photorealistic shot of a neighbor peeking through a window
   curtain at night, dim street light outside, documentary
   photography style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_ONE_COMMENT;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  c.teaser = 'زياد قال جملة عابرة في فيديو جديد، وبعد ساعات اتلاقى ميت في الاستوديو. تعليق واحد لمس سر قديم عند شخص كان مستعد يعمل أي حاجة عشان مايرجعش للسطح.';

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_ONE_COMMENT;
  const g = c.suspects.find(s => s.id === 'anonymous_commenter_gaser');
  if (g) {
    const q = g.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتوتر) "أيوه كنت في المدينة ورحت أواجه زياد، وكنت غضبان جدًا. لكن سيبته حي ومشيت. كوني كذبت في مكاني مش معناه إني قتلته."';
    }
  }
  if (c.witnessReliabilityPuzzle) {
    c.witnessReliabilityPuzzle.resultText = 'شهادة الجار أدق في المكان والتوقيت من رواية جاسر، فبتكسر أليبي السفر. دي قرينة حضور مهمة، لكنها مش إدانة لوحدها.';
  }
  c.conclusiveRequired = 3;
})();
