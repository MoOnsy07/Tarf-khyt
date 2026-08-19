/* ============================================================
   بيانات قضية: آخر بروفة
   قضية قتل — ممثل مشهور بيموت أثناء بروفة مسرحية قتل، والكل
   يفتكر إن مسدس البروفة اتبدّل بمسدس حقيقي، لكن الحقيقة مادة
   سامة في بخاخ حلقه الخاص.
   ============================================================ */

const IMG_BASE_REHEARSAL = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/last-rehearsal/';

const CASE_LAST_REHEARSAL = {
  id: 'last-rehearsal',
  title: 'آخر بروفة',
  caseNo: 'CASE 021',
  subtitle: 'مسرح قومي، وسط البلد',
  coverImg: IMG_BASE_REHEARSAL + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 34,
  investigationPoints: 19,
  teaser: 'ممثل مشهور بيموت أثناء بروفة مسرحية قتل، والكل مقتنع إن مسدس البروفة اتبدّل بمسدس حقيقي. الحقيقة أعقد بكتير من طلقة نارية.',

  isPremium: false,
  categories: ['murder', 'drama'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_REHEARSAL + 'cover.webp',
    heroCaption: 'CASE 021 — بروفة مشهد القتل الأخير',
    text1: 'ممثل مشهور، "عادل شكري"، بيموت فجأة أثناء بروفة مسرحية اسمها "الجريمة الكاملة"، في نفس اللحظة اللي المفروض فيها زميله يطلق عليه "طلقة" من مسدس مسرحي. الكل افترض فورًا إن المسدس اتبدّل بمسدس حقيقي بالغلط أو عمدًا.',
    text2: 'تقرير الأدلة الأولي فاجأ الجميع: المسدس المسرحي ماقتلش عادل أصلًا، ومفيش أي رصاصة حقيقية في الموضوع. المخرج طلب منك تحقق بهدوء تام قبل ما العرض الافتتاحي يتلغى نهائيًا، وقبل ما الحقيقة الغريبة تضيع وسط افتراض الجميع الخاطئ عن المسدس.',
    meta: [
      { label:'المجني عليه', value:'عادل شكري — ممثل مشهور' },
      { label:'مكان الحادثة', value:'خشبة المسرح، أثناء بروفة' },
      { label:'المفاجأة الأولى', value:'المسدس المسرحي لم يقتله فعليًا' },
      { label:'طلب التحقيق', value:'مخرج المسرحية' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — البروفة',
      img: IMG_BASE_REHEARSAL + 'rehearsal-scene1.jpg',
      text:'خشبة مسرح مضاءة جزئيًا، طاقم تمثيل صغير بيعمل بروفة مشهد القتل الأخير في المسرحية، عادل واقف في مكانه المعتاد ينتظر "الطلقة".'
    },
    {
      scene:'المشهد ٢ — لحظة قبل المشهد',
      img: IMG_BASE_REHEARSAL + 'rehearsal-scene2.jpg',
      text:'عادل بيرش بخاخ الحلق الخاص بيه زي كل بروفة، عادة ثابتة عنده قبل أي مشهد فيه صراخ أو حوار طويل.'
    },
    {
      scene:'المشهد ٣ — الانهيار',
      img: IMG_BASE_REHEARSAL + 'rehearsal-scene3.jpg',
      text:'زميله بيطلق "الطلقة" المسرحية، وعادل بيقع فعلًا زي المفروض في المشهد، بس ماعادش يقوم تاني. الطاقم كله يفتكرها حادثة مسدس حقيقي.'
    },
    {
      scene:'المشهد ٤ — الصدمة والتحقيق',
      img: IMG_BASE_REHEARSAL + 'rehearsal-scene4.jpg',
      text:'تقرير الأدلة الأولي بيقول إن المسدس سليم تمامًا ومفيهوش أي رصاصة حقيقية. عندك فرصة تحقق من جوه طاقم المسرحية الصغير.'
    },
  ],

  suspects: [
    {
      id:'nadine_actress', name:'ناردين', role:'ممثلة منافسة، كانت مرشحة لدور عادل الأساسي', img: IMG_BASE_REHEARSAL + 'nadine.jpg', avatarEmoji:'🎭',
      alibi:'قالت إنها كانت قاعدة في الصالة تراقب البروفة زي كل يوم.',
      questions:[
        { q:'إيه علاقتك بالمسرحية دي بالظبط؟', unlockId:'role_rivalry',
          a:'"كنت مرشحة لدور عادل الأساسي، بس المخرج فضّله عليّ في اللحظة الأخيرة، طبيعي أزعل، بس ده مش هيوصلني لجريمة."' },
        { q:'قربتي من أدوات المسرح أو الإكسسوارات قبل البروفة؟',
          a:'"لأ، كنت قاعدة في الصالة طول الجزء ده من البروفة، وفي ناس من الطاقم شافوني هناك."' },
      ]
    },
    {
      id:'director_samir', name:'المخرج سمير', role:'مخرج المسرحية، طلب التحقيق', img: IMG_BASE_REHEARSAL + 'samir.jpg', avatarEmoji:'🎬',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'إزاي كانت علاقتك بعادل؟',
          a:'"ممتازة، كنت شايفه بطل المسرحية دي بجدارة، خسارته كارثة حقيقية للعرض كله."' },
        { q:'حد كان له مصلحة يضر عادل؟', unlockId:'director_hint',
          a:'"صراحة، الدوبلير بتاعه كان بيقعد ساعات طويلة معاه في التدريبات الشخصية، ممكن يعرف تفاصيل أكتر مني."' },
      ]
    },
    {
      id:'khaled_understudy', name:'خالد', role:'دوبلير عادل، بيتدرب على نفس الدور كبديل', img: IMG_BASE_REHEARSAL + 'khaled.jpg', avatarEmoji:'🎪',
      alibi:'قال إنه كان بيجهز أدوات المسرح خلف الكواليس وقت البروفة.',
      questions:[
        { q:'إنت مسؤول عن تجهيز أدوات المسرح، صح؟', unlockId:'props_access',
          a:'"أيوه، بساعد في تجهيز حاجات عادل قبل البروفة، ومن ضمنها إني أحط بخاخ الحلق بتاعه على الترابيزة في الكواليس."' },
        { q:'كنت عارف إن فوزك بالدور هيبقى أسهل لو حصل لعادل حاجة؟',
          a:'(بيتردد) "أكيد غيابه كان هيديني فرصة أكبر، بس ده مش معناه إني كنت عايز يحصله أذى."' },
        { q:'مين آخر واحد لمس بخاخ الحلق بتاع عادل قبل البروفة؟', requires:['props_access'],
          a:'(بيتلعثم) "أنا اللي حطيته على طاولته زي كل مرة، مش فاكر حد تاني قرب منه."' },
        { q:'التحليل لقى مادة غريبة مضافة للبخاخ، وبقايا من نفس المادة في عبوة صغيرة جوه شنطة تجهيزاتك — عندك تفسير؟', requires:['props_access','makeup_kit_match'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "كنت عايز البروفة تفشل وعادل يبعد عن الافتتاح كام يوم. عبثت بالبخاخ بمادة ماكانش المفروض تتحط فيه، وما توقعتش إن النتيجة تبقى قاتلة."' },
      ]
    },
    {
      id:'youssra_stage_manager', name:'يسرا', role:'مديرة المسرح المسؤولة عن كل الإكسسوارات', img: IMG_BASE_REHEARSAL + 'youssra.jpg', avatarEmoji:'📋',
      alibi:'قالت إنها كانت خلف الكواليس بتراجع قائمة الإكسسوارات طول الوقت.',
      loseMsg:'يسرا كانت فعلًا مسؤولة عن الإكسسوارات، بس التحليل الكيميائي بيوضح إن المادة اتحطت في بخاخ حلق عادل الشخصي، مش أي أداة مسرحية عامة تحت مسؤوليتها المباشرة.',
      questions:[
        { q:'إيه مسؤوليتك بالظبط في المسرحية؟',
          a:'"أنا مسؤولة عن كل الإكسسوارات العامة للمسرحية، بس أغراض الممثلين الشخصية زي بخاخ حلق عادل مش تحت مسؤوليتي المباشرة."' },
        { q:'المسدس المسرحي كان تحت مسؤوليتك، صح؟',
          a:'"أيوه، وفحصته بنفسي قبل كل بروفة، وهو سليم تمامًا زي ما طلع في التقرير."' },
      ]
    },
  ],

  evidence: [
    { id:'gun_clean_report', tag:'من تقرير الأدلة', crit:true, title:'المسدس المسرحي سليم', img: IMG_BASE_REHEARSAL + 'rehearsal-gun.jpg',
      short:'مفيش أي رصاصة حقيقية أو تلف في المسدس',
      full:'التقرير الأولي بيأكد إن المسدس المسرحي سليم تمامًا، وماقتلش عادل فعليًا رغم افتراض الجميع الأولي.',
      unlocked:true, order:1 },

    { id:'role_rivalry', tag:'من استجواب ناردين', crit:false, title:'منافسة ناردين على الدور', img:null,
      short:'كانت مرشحة أساسية للدور قبل عادل',
      full:'ناردين اعترفت بمنافسة حقيقية على دور عادل الأساسي قبل ما المخرج يفضله عليها.',
      unlocked:false, order:2 },

    { id:'director_hint', tag:'من استجواب المخرج سمير', crit:false, title:'قرب خالد من عادل', img:null,
      short:'خالد كان بيقضي وقت طويل مع عادل في تدريبات شخصية',
      full:'المخرج سمير أشار لعلاقة قريبة بين خالد وعادل من خلال ساعات التدريب الشخصية الطويلة.',
      unlocked:false, order:3 },

    { id:'props_access', tag:'من استجواب خالد', crit:true, title:'مسؤولية خالد عن تجهيز الأدوات', img:null,
      short:'خالد هو اللي كان بيحط بخاخ الحلق على طاولة عادل',
      full:'خالد اعترف إنه مسؤول عن تجهيز أدوات المسرح كجزء من دوره كدوبلير، بما فيها بخاخ حلق عادل الشخصي.',
      unlocked:false, order:4 },

    { id:'throat_spray_analysis', tag:'من تحليل بخاخ الحلق', crit:true, title:'مادة كيميائية مضافة في البخاخ', img: IMG_BASE_REHEARSAL + 'rehearsal-spray.jpg',
      short:'مادة غير مخصصة للاستخدام اتضافت للبخاخ وكانت سبب الوفاة',
      full:'التحليل المعملي بيأكد إن بخاخ عادل اتلوث عمدًا بمادة غير مخصصة للاستخدام، وإن التعرض ليها هو سبب الوفاة الحقيقي. التقرير ما بيديش سبب يخلي المادة موجودة في البخاخ بشكل طبيعي.',
      unlocked:false, order:5 },

    { id:'makeup_kit_match', tag:'من فحص أدوات المكياج', crit:true, title:'بقايا من نفس المادة في شنطة خالد', img: IMG_BASE_REHEARSAL + 'rehearsal-makeup.jpg',
      short:'بقايا من نفس المادة اتلاقت في عبوة صغيرة ضمن تجهيزات خالد الشخصية',
      full:'فحص شنطة تجهيزات خالد الشخصية لقى عبوة صغيرة عليها بقايا من نفس المادة الموجودة في بخاخ عادل. مع اعترافه إنه آخر شخص جهز البخاخ، الدليل بيربطه بالعبث نفسه.',
      unlocked:false, order:6 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث',
    introText: 'رتب أحداث البروفة بالترتيب الصح، عشان توضح اللحظة الحقيقية اللي أثرت فيها المادة السامة على عادل.',
    events: [
      { id:'e1', text:'خالد بيحط بخاخ الحلق على طاولة عادل زي كل بروفة.' },
      { id:'e2', text:'عادل بيرش البخاخ على حلقه قبل بداية المشهد.' },
      { id:'e3', text:'زميله بيطلق "الطلقة" المسرحية في المشهد.' },
      { id:'e4', text:'عادل بيقع زي المفروض في المشهد، لكن ماعادش يقوم.' },
      { id:'e5', text:'الطاقم يكتشف إن المسدس سليم ومفيهوش أي رصاصة حقيقية.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'رتبت الأحداث صح! الصورة واضحة دلوقتي: المادة السامة أثرت من لحظة رش البخاخ، ومشهد "الطلقة" كان مجرد تزامن ظاهري بس، مش السبب الحقيقي للوفاة.',
    resultEvidenceIds: ['throat_spray_analysis'],
  },

  evidenceCombinations: [
    { parts:['props_access','throat_spray_analysis'], resultId:'makeup_kit_match' },
  ],

  correctSuspectId: 'khaled_understudy',
  conclusiveEvidenceIds: ['props_access', 'throat_spray_analysis', 'makeup_kit_match', 'director_hint'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن خالد هو الفاعل؟',
        options: [
          { id:'a', text:'هو آخر شخص جهز البخاخ + التحليل أثبت التلوث + بقايا نفس المادة اتلاقت في شنطة تجهيزاته' },
          { id:'b', text:'لأنه دوبلير عادل وده بيديه دافع تلقائي' },
          { id:'c', text:'لأنه اتلعثم أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت الحقيقة عن "المسدس القاتل"؟',
        options: [
          { id:'a', text:'المسدس سليم، والوفاة حصلت بسبب العبث ببخاخ عادل قبل المشهد؛ توقيت الطلقة خلّى الكل يربط السبب بالمكان الغلط' },
          { id:'b', text:'المسدس فعلًا اتبدّل برصاصة حقيقية' },
          { id:'c', text:'عادل مات من نوبة قلبية طبيعية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'التمويه اتكشف',
      paragraphs:[
        'خالد كان شايف إن غياب عادل عن الافتتاح ممكن يفتح له باب الدور الأساسي، واستغل إنه بيساعد في تجهيز حاجاته وعبث ببخاخ الحلق بمادة ماكانش المفروض تكون فيه. هو قال إنه كان ناوي يعطل عادل عن العرض، لكن النتيجة كانت قاتلة. توقيت سقوط عادل مع الطلقة المسرحية وجّه الشك للمسدس من البداية.',
        'اللي ربط خالد بالفعل كان تحكمه في البخاخ قبل البروفة، والتحليل المعملي، وبقايا نفس المادة في شنطة تجهيزاته. القضية اتحالت للجهات المختصة، والمسرح وقف العرض لحين انتهاء التحقيق بدل محاولة قفل الموضوع بهدوء.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية خالد، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: مسؤوليته عن التجهيز، تحليل البخاخ، وتطابق أدوات المكياج، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق وسط طاقم المسرح. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "آخر بروفة"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty theater stage with dramatic
   spotlight, a prop gun on the floor and a small perfume-like spray
   bottle nearby, moody atmosphere, documentary photography style, no
   text, no watermark, photorealistic"

   المشهد ١ (rehearsal-scene1.jpg):
   "Photorealistic shot of a small theater rehearsal in progress on a
   dimly lit stage, actors in casual rehearsal clothes, dramatic
   stage lighting, photorealistic, no text, no watermark"

   المشهد ٢ (rehearsal-scene2.jpg):
   "Photorealistic close-up of a middle-aged actor spraying a small
   throat spray bottle before a performance, backstage dressing table,
   warm lighting, photorealistic, no text, no watermark"

   المشهد ٣ (rehearsal-scene3.jpg):
   "Photorealistic dramatic shot of a theater stage moment, an actor
   collapsed on the floor, another actor holding a prop gun in
   shock, dramatic stage lighting, photorealistic, no text, no
   watermark"

   المشهد ٤ (rehearsal-scene4.jpg):
   "Photorealistic shot of a theater backstage area with props and
   costumes, quiet and tense atmosphere, dim lighting, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   ناردين (nadine.jpg):
   "Photorealistic portrait of a young Egyptian female actress,
   rehearsal clothes, ambitious sharp expression, standing backstage
   in a theater, warm theater lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   المخرج سمير (samir.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male theater
   director, casual smart clothing, intense commanding expression,
   standing on a theater stage, warm theater lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   خالد (khaled.jpg):
   "Photorealistic portrait of a young Egyptian male understudy
   actor, rehearsal clothes, eager but nervous expression, standing
   backstage, warm theater lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   يسرا (youssra.jpg):
   "Photorealistic portrait of a young Egyptian female stage manager,
   practical backstage attire, holding a clipboard, focused watchful
   expression, standing backstage among props, warm theater lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل المسدس (rehearsal-gun.jpg):
   "Photorealistic close-up of a prop stage gun on a wooden table,
   forensic evidence photography style, no text, no watermark,
   photorealistic"

   دليل البخاخ (rehearsal-spray.jpg):
   "Photorealistic close-up of a small throat spray bottle on a
   dressing table, soft lighting, no text, no watermark,
   photorealistic"

   دليل أدوات المكياج (rehearsal-makeup.jpg):
   "Photorealistic close-up of an open makeup kit box with small
   bottles and brushes, backstage lighting, no text, no watermark,
   photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_LAST_REHEARSAL;
  c.evidenceCombinations = [];
  const k = c.suspects.find(s => s.id === 'khaled_understudy');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'بعد تحليل البخاخ، تم تفتيش شنطة تجهيزاتك ولقينا عبوة فيها نفس المادة. تفسر التطابق إزاي؟';
      q.requires = ['props_access','throat_spray_analysis'];
      q.unlockId = 'makeup_kit_match';
      q.a = '(بيتوتر) "العبوة ضمن أدوات قديمة في الشنطة، ومش فاكر مصدرها. وجود نفس المادة محتاج تفسير، بس أنا ماحطتش حاجة في بخاخ عادل."';
    }
  }
  c.conclusiveEvidenceIds = ['props_access','throat_spray_analysis','makeup_kit_match','director_hint'];
  c.conclusiveRequired = 4;
})();
