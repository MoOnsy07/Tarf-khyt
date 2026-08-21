/* ============================================================
   بيانات قضية: المشهد المحذوف
   قضية اختفاء — ممثلة شابة بتعلن اعتزالها وتختفي ليلة العرض
   الخاص لفيلمها، وفي نفس الليلة مشهد محذوف بيتسرب فيه صوت
   اجتماع سري عن تغطية حادث أثناء التصوير.
   ============================================================ */

const IMG_BASE_DELETED = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/deleted-scene/';

const CASE_DELETED_SCENE = {
  id: 'deleted-scene',
  title: 'المشهد المحذوف',
  caseNo: 'CASE 023',
  subtitle: 'استوديو إنتاج سينمائي، مدينة الإنتاج الإعلامي',
  coverImg: IMG_BASE_DELETED + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'ممثلة شابة أعلنت اعتزالها واختفت ليلة عرض فيلمها الخاص. نفس الليلة، مشهد محذوف اتسرب فيه صوت اجتماع سري عن تغطية حادث. الاختفاء والتسريب مرتبطين ببعض.',

  isPremium: false,
  categories: ['disappearance', 'drama'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_DELETED + 'cover.webp',
    heroCaption: 'CASE 023 — ليلة العرض الخاص',
    text1: 'ممثلة شابة صاعدة، "ريما"، فاجأت الجميع بإعلان اعتزالها فجأة، وبعدها اختفت في نفس ليلة العرض الخاص لفيلمها الجديد. في نفس الليلة، نسخة مجهولة المصدر من مشهد محذوف من الفيلم وصلت للصحافة، وفي خلفية المشهد صوت اجتماع مش المفروض حد يسمعه.',
    text2: 'منتجة الفيلم منى أعلنت إنها قلقانة من اختفاء ريما وتسريب المشهد في نفس الليلة، وطلبت تحقيق داخلي سريع وسري، عشان تفهم اللي حصل فعليًا قبل ما القصة تتحول لفضيحة إعلامية كبيرة.',
    meta: [
      { label:'المختفية', value:'ريما — ممثلة شابة، أعلنت اعتزالها' },
      { label:'الحدث المرافق', value:'تسريب مشهد محذوف فيه صوت اجتماع سري' },
      { label:'وقت الاختفاء', value:'ليلة العرض الخاص للفيلم' },
      { label:'طلب التحقيق', value:'منتجة الفيلم' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — إعلان الاعتزال',
      img: IMG_BASE_DELETED + 'deleted-scene1.jpg',
      text:'ريما بتعلن اعتزالها فجأة في بوست قصير غامض على حسابها، من غير أي تفسير واضح، قبل العرض الخاص لفيلمها بيوم واحد بس.'
    },
    {
      scene:'المشهد ٢ — ليلة العرض',
      img: IMG_BASE_DELETED + 'deleted-scene2.jpg',
      text:'السجادة الحمراء جاهزة، الضيوف بيتجمعوا، بس ريما مش موجودة. الطاقم بيحاول يتواصل معاها من غير أي رد.'
    },
    {
      scene:'المشهد ٣ — التسريب',
      img: IMG_BASE_DELETED + 'deleted-scene3.jpg',
      text:'في نفس الليلة، نسخة من مشهد محذوف من الفيلم بتوصل لصفحات فنية على السوشيال ميديا، وفي خلفية المشهد صوت اجتماع غير واضح بيتكلم عن "تغطية الموضوع".'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_DELETED + 'deleted-scene4.jpg',
      text:'منتجة الفيلم بتديك وصول لنسخ الفيلم المختلفة، بيانات الميتاداتا، وتسجيلات الاستوديو أثناء التصوير.'
    },
  ],

  suspects: [
    {
      id:'director_wael', name:'المخرج وائل', role:'مخرج الفيلم', img: IMG_BASE_DELETED + 'wael.jpg', avatarEmoji:'🎬',
      alibi:'قال إنه كان في العرض الخاص طول الوقت، مستني ريما زي أي حد تاني.',
      questions:[
        { q:'ليه المشهد ده اتحذف من الفيلم أصلًا؟', unlockId:'scene_cut_reason',
          a:'"قرار فني بحت، المشهد كان طويل ومش مضيف حاجة للسرد، ده بيحصل عادي في أي مونتاج نهائي."' },
        { q:'حصل حادث معين أثناء تصوير المشهد ده؟', unlockId:'director_deflect',
          a:'(بيتردد) "التصوير كان طويل ومرهق، زي أي مشهد كبير، مفيش حاجة غريبة حصلت بقد ما أفتكر."' },
      ]
    },
    {
      id:'lead_actor_tarek', name:'طارق', role:'بطل الفيلم', img: IMG_BASE_DELETED + 'tarek.jpg', avatarEmoji:'🎥',
      alibi:'قال إنه كان في العرض الخاص طول الوقت زي أي ضيف تاني.',
      loseMsg:'طارق كان فعلًا موجود في العرض الخاص أمام عشرات الضيوف والصحفيين، ومفيش أي دليل يربطه بالتسريب أو باختفاء ريما.',
      questions:[
        { q:'إيه علاقتك بريما على السيت؟',
          a:'"علاقة شغل احترافية، زميلة ممتازة، اتفاجئت جدًا بقرار اعتزالها المفاجئ."' },
        { q:'كنت عارف بحادث معين أثناء التصوير؟',
          a:'"سمعت همسات عن مشكلة تقنية أو إصابة بسيطة، بس محدش وضح التفاصيل لينا كممثلين."' },
      ]
    },
    {
      id:'producer_mona', name:'المنتجة منى', role:'منتجة الفيلم والمسؤولة عن إدارة الأزمة', img: IMG_BASE_DELETED + 'mona.jpg', avatarEmoji:'💼',
      alibi:'قالت إنها هي اللي فتحت التحقيق عشان تعرف مين سرّب المشهد ومين ساعد ريما تختفي.',
      questions:[
        { q:'إيه اللي خلاكي حاسة إن الحدثين مرتبطين؟',
          a:'"أكيد مرتبطين. أنا عايزة أعرف مين خرج النسخة من الاستوديو ومين كان بيتواصل مع ريما قبل العرض."' },
        { q:'حادث التصوير ده كان إيه بالظبط؟', unlockId:'producer_admits_incident',
          a:'"حصلت إصابة أثناء التصوير، بس كانت حادثة شغل واتعاملنا معاها داخليًا. مش شايفة إن ليها علاقة باختفاء ريما أو بالتسريب."' },
      ]
    },
    {
      id:'editor_hany', name:'هاني', role:'مونتير الفيلم', img: IMG_BASE_DELETED + 'hany.jpg', avatarEmoji:'🎞️',
      alibi:'قال إنه بس نفّذ قرار حذف المشهد حسب تعليمات الإدارة.',
      questions:[
        { q:'مين اللي طلب حذف المشهد ده بالتحديد؟', unlockId:'cut_order_source',
          a:'"الطلب جه من مكتب الإنتاج باسم منى، والسبب المكتوب كان إن المشهد طويل. أنا نفذت الطلب، بس احتفظت بنسخة خام زي نظام الشغل."' },
        { q:'النسخة اللي اتسربت جتلك إزاي؟',
          a:'"معرفش، أنا عندي وصول للنسخ الأصلية، بس مش أنا اللي سربتها، ده هيدمر سمعتي المهنية لو حصل."' },
        { q:'الصوت اللي في خلفية المشهد المسرب ده صوت اجتماع بينك وبين حد تاني، صح؟', requires:['cut_order_source','producer_admits_incident'],
          a:'(بيصمت لحظة) "ده كان اجتماع بعد الحادث. منى كانت بتتكلم عن تعويض المصاب وعن إن الموضوع ما يطلعش للإعلام. أنا كنت موجود عشان عندي تسجيلات من يوم التصوير."' },
        { q:'ريما نفسها كانت موجودة في نفس الاجتماع ده، وطلبت تسجيله بنفسها كدليل — ده مش اجتماع إداري عادي.', requires:['cut_order_source','producer_admits_incident'], closesInterrogation:true,
          a:'(بيهدى) "ريما كانت خايفة إن حق المصاب يضيع، وسجلت الاجتماع بنفسها. أنا ساعدتها أحط التسجيل جوه نسخة من المشهد المحذوف وأوصل النسخة للصحافة. هي بعدت مؤقتًا عن الناس بمزاجها لحد ما الدليل يطلع للنور."' },
      ]
    },
  ],

  evidence: [
    { id:'leaked_scene', tag:'من المشهد المسرب', crit:true, title:'المشهد المحذوف المسرب', img: IMG_BASE_DELETED + 'deleted-photo.jpg', unlocksAudio:true,
      short:'فيه صوت اجتماع غير واضح في الخلفية',
      full:'المشهد المسرب فيه صوت اجتماع غير واضح في الخلفية، بيتكلموا فيه عن "تغطية الموضوع" من غير توضيح مين أو إيه بالظبط.',
      unlocked:true, order:1 },

    { id:'scene_cut_reason', tag:'من استجواب المخرج وائل', crit:false, title:'تبرير حذف المشهد', img:null,
      short:'ادعى إن الحذف قرار فني بحت',
      full:'المخرج وائل برر حذف المشهد بأنه قرار فني بحت متعلق بطول السرد، من غير أي تفاصيل إضافية.',
      unlocked:false, order:2 },

    { id:'director_deflect', tag:'من استجواب المخرج وائل', crit:false, title:'تجنب المخرج للتفاصيل', img:null,
      short:'تردد واضح عند سؤاله عن حادث أثناء التصوير',
      full:'المخرج وائل أظهر تردد واضح عند سؤاله عن أي حادث أثناء تصوير المشهد المحذوف.',
      unlocked:false, order:3 },

    { id:'producer_admits_incident', tag:'من استجواب المنتجة منى', crit:true, title:'اعتراف بحادث إصابة أثناء التصوير', img:null,
      short:'شخص من الطاقم اتصاب بسبب معدات غير مؤمّنة',
      full:'منى أقرت إن شخص من الطاقم اتصاب بسبب معدات ما كانتش متأمنة بشكل كافي، لكنها وصفت الموضوع كحادث اتحل داخليًا وأنكرت وجود محاولة لتسكيت المصاب أو منع القصة من الخروج.',
      unlocked:false, order:4 },

    { id:'cut_order_source', tag:'من استجواب هاني', crit:false, title:'مصدر طلب حذف المشهد', img:null,
      short:'طلب الحذف خرج من مكتب الإنتاج باسم منى',
      full:'هاني أكد إن أمر حذف المشهد خرج من مكتب الإنتاج باسم منى، والسبب المكتوب كان فني. توقيت الطلب كان بعد اجتماع مناقشة إصابة فرد الطاقم مباشرة.',
      unlocked:false, order:5 },

    { id:'audio_clarified', tag:'من التحليل الصوتي', crit:true, title:'تحليل صوت الاجتماع المسرب', img: IMG_BASE_DELETED + 'deleted-wave.jpg',
      short:'الصوت بيوضح منى وهي بتربط التعويض بعدم خروج الموضوع للإعلام',
      full:'تنقية الصوت بتوضح منى وهي بتتكلم عن تعويض المصاب بشرط إن الأزمة تفضل داخلية وما توصلش للصحافة، وريما بتعترض وبتطلب ضمان حقه كامل. هاني موجود في الاجتماع لكنه مش صاحب قرار التغطية.',
      unlocked:false, order:6 },

    { id:'rima_own_recording', tag:'من تحليل إضافي', crit:true, title:'ريما هي اللي سجلت الاجتماع بنفسها', img:null,
      short:'ريما طلبت تسجيل الاجتماع كضمانة شخصية',
      full:'بيانات التسجيل والنسخة الخام بتوضح إن ريما هي اللي بدأت تسجيل الاجتماع، وبعدها سلّمت الملف لهاني عشان يحتفظ بنسخة. ده يفسر تعاونهم في التسريب واختفاءها المؤقت، بدل فرضية إنها اتخطفت.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  audioPuzzle: {
    enabled: true,
    tabLabel: 'تحليل صوتي',
    introText: 'شغّل صوت المشهد المسرب وركّز في الجزء اللي صوت الحوار فيه أوضح من ضوضاء التصوير. اختار المقطع اللي تقدر تميّز فيه مضمون الاجتماع.',
    duplicateSourceRange: [15, 35],
    duplicateTargetRange: [48, 68],
    matchStart: 48,
    matchEnd: 68,
    resultText: 'وصلت للمقطع الصح. بعد تنقية الصوت، منى بتتكلم بوضوح عن تعويض المصاب بشرط إن الموضوع يفضل بعيد عن الإعلام، وريما بتعترض على الشرط.',
    resultEvidenceIds: ['audio_clarified'],
  },

  evidenceCombinations: [
    { parts:['producer_admits_incident','audio_clarified'], resultId:'rima_own_recording' },
  ],

  correctSuspectId: 'producer_mona',
  conclusiveEvidenceIds: ['producer_admits_incident', 'audio_clarified', 'rima_own_recording', 'cut_order_source'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'مين كان بيحاول يدفن حادث التصوير فعلًا؟',
        options: [
          { id:'a', text:'منى — أمر حذف المشهد خرج من مكتبها، والصوت بيثبت إنها ربطت التعويض بعدم خروج الحادث للإعلام' },
          { id:'b', text:'هاني — لأنه هو المونتير واحتفظ بنسخة من المشهد' },
          { id:'c', text:'طارق — لأنه كان موجود وقت العرض الخاص' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه الحقيقة الكاملة عن اختفاء ريما؟',
        options: [
          { id:'a', text:'ريما ماكانتش ضحية اختطاف؛ هي نفسها كانت بتحاول توصل دليل صوتي لمحاولة تغطية حادث إصابة زميل، وهربت مؤقتًا لحد ما تتأكد إن الحقيقة وصلت' },
          { id:'b', text:'ريما اتخطفت فعليًا من طاقم الإنتاج' },
          { id:'c', text:'ريما اعتزلت بسبب خلاف شخصي مع البطل طارق' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'SAFE', badgeLabel:'CASE CLOSED — SHE IS SAFE', title:'ريما بخير، والحقيقة اتكشفت',
      paragraphs:[
        'المشهد المحذوف ماكانش السر الحقيقي؛ الصوت اللي جواه كشف إن منى كانت بتحاول تقفل أزمة إصابة فرد من الطاقم داخليًا وربط التعويض بعدم وصول الموضوع للإعلام. ريما رفضت ده، وسجلت الاجتماع، وهاني ساعدها يخبي التسجيل في نسخة من المشهد ويوصلها للصحافة.',
        'اختفاء ريما طلع بإرادتها؛ كانت في مكان آمن وقطعت الاتصال مؤقتًا عشان مايتضغطش عليها قبل نشر الدليل. بعد ظهور التسجيل اتأكد إنها بخير، واتفتح تحقيق في حادث التصوير وطريقة التعامل مع المصاب وفي دور منى في محاولة احتواء الموضوع بعيد عن الرقابة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE REOPENED — MORE EVIDENCE NEEDED', title:'الشك في مكانه الصح، بس الصورة لسه مش كاملة',
      paragraphs:[
        'التحقيق كشف إن ريما اختفت بإرادتها وإن هاني ساعد في إخراج التسجيل، لكن الأدلة اللي جمعتها لسه مش كفاية تثبت إن منى كانت صاحبة قرار التغطية وحذف المشهد.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: حادث التصوير، مصدر أمر حذف المشهد، التحليل الصوتي، وتسجيل ريما، قبل ما تحدد المسؤول عن التغطية.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONG CONCLUSION', title:'القضية اتقفلت بفهم غلط',
      paragraphs:[
        'وصلت لاستنتاج غلط عن {wrongName}، والحقيقة الكاملة عن اختفاء ريما فضلت غير واضحة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "المشهد المحذوف"

   الغلاف (cover.webp):
   "Photorealistic shot of a red carpet event with an empty spotlight
   where a star should stand, photographers waiting, dramatic evening
   lighting, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (deleted-scene1.jpg):
   "Photorealistic close-up of a smartphone screen showing a social
   media post, held by a hand, soft indoor lighting, photorealistic,
   no text, no watermark"

   المشهد ٢ (deleted-scene2.jpg):
   "Photorealistic shot of a red carpet movie premiere with
   photographers and press, an empty spot where the lead actress
   should be, evening lighting, photorealistic, no text, no watermark"

   المشهد ٣ (deleted-scene3.jpg):
   "Photorealistic close-up of a laptop screen showing a video player
   with a leaked film clip, dim room lighting, photorealistic, no
   text, no watermark"

   المشهد ٤ (deleted-scene4.jpg):
   "Photorealistic shot of a film production office with editing
   equipment and monitors, focused atmosphere, soft lighting,
   photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   المخرج وائل (wael.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male film
   director, casual smart clothing, cap, intense focused expression,
   standing on a film set, studio lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   طارق (tarek.jpg):
   "Photorealistic portrait of a handsome young Egyptian male lead
   actor, stylish casual clothing, charismatic but slightly anxious
   expression, standing near film set lights, studio lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   المنتجة منى (mona.jpg):
   "Photorealistic portrait of a professional Egyptian female film
   producer, sharp business casual attire, holding a tablet,
   composed authoritative expression, film production office
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   هاني (hany.jpg):
   "Photorealistic portrait of a young Egyptian male film editor,
   casual clothing, headphones around his neck, tired focused
   expression, sitting in a dim editing room lit by monitor glow,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل المشهد المسرب (deleted-photo.jpg):
   "Photorealistic still frame from a film scene, cinematic lighting,
   slightly grainy leaked video quality, no text, no watermark,
   photorealistic"

   دليل الموجة الصوتية (deleted-wave.jpg):
   "Photorealistic close-up of an audio waveform editing interface on
   a computer screen, dark mode UI, highlighted segment, no text, no
   watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_DELETED_SCENE;
  c.evidenceCombinations = [];
  const h = c.suspects.find(s => s.id === 'editor_hany');
  if (h) {
    const q = h.questions.find(q => q.closesInterrogation);
    if (q) {
      q.unlockId = 'rima_own_recording';
      q.q = 'بيانات الملف بتوضح إن التسجيل بدأ من جهاز ريما واتنقل لنسخة المونتاج عندك. إيه اللي حصل؟';
      q.a = '(بيهدى) "ريما هي اللي سجلت الاجتماع كضمانة، وبعدها بعتتلي نسخة أحفظها. ساعدتها تقنيًا في الاحتفاظ بالدليل، لكن مش هاقول أكتر عن مكانها أو تحركاتها من غير ما أتأكد إنها آمنة."';
    }
  }
  c.conclusiveRequired = 4;
})();
