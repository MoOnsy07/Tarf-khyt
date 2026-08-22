/* ============================================================
   بيانات قضية: حادثة الطريق
   قضية دهس وهروب — شاب اتصدم في الشارع بعد خروجه من عزومة
   أصحاب، والسواق هرب من غير ما يوقف. مين فعلًا كان بيسوق؟
   ============================================================ */

const IMG_BASE_HITRUN = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/hit-and-run/';

const CASE_HIT_AND_RUN = {
  id: 'hit-and-run',
  title: 'حادثة الطريق',
  caseNo: 'CASE 018',
  subtitle: 'شارع رئيسي، مدينة الشيخ زايد',
  coverImg: IMG_BASE_HITRUN + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 18,
  teaser: 'شاب اتصدم في الشارع بعد عزومة أصحاب، والسواق هرب من غير ما يوقف. أكتر من واحد من المجموعة ممكن يكون هو اللي كان بيسوق فعلاً.',

  isPremium: false,
  categories: ['accident', 'scandal'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_HITRUN + 'cover.webp',
    heroCaption: 'CASE 018 — بعد منتصف الليل بشوية',
    text1: '"مينا"، شاب في العشرينات، اتصدم بعربية وهو ماشي على الرصيف قريب من شارع رئيسي بعد ما خرج من عزومة أصحاب. العربية هربت فورًا من غير ما توقف. مينا في المستشفى دلوقتي في حالة مستقرة، بس مصاب بكسور.',
    text2: 'رقم اللوحة الجزئي رجّح إن العربية اللي صدمته هي عربية يوسف، واحد من مجموعة أصحاب خارجين من نفس العزومة، وكل واحد فيهم بيقول إنه ماكانش هو اللي بيسوق وقت الحادثة. أخو مينا طلب منك تحقق قبل ما القضية تتقفل كحادثة "سواق مجهول" وتضيع من غير عدالة.',
    meta: [
      { label:'المصاب', value:'مينا — شاب في العشرينات' },
      { label:'الحادثة', value:'دهس وهروب بعد منتصف الليل' },
      { label:'مكان الحادثة', value:'شارع رئيسي قريب من مكان العزومة' },
      { label:'طلب التحقيق', value:'أخو مينا' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — بعد العزومة',
      img: IMG_BASE_HITRUN + 'hitrun-scene1.jpg',
      text:'مجموعة أصحاب بيخرجوا من عزومة متأخرة بالليل، ضحك وحركة عادية، وسيارة واحدة بس بتاخد أكتر من واحد منهم.'
    },
    {
      scene:'المشهد ٢ — الحادثة',
      img: IMG_BASE_HITRUN + 'hitrun-scene2.jpg',
      text:'مينا ماشي على الرصيف قريب من الشارع الرئيسي، عربية بتنحرف فجأة وتصدمه، وبتكمل طريقها بسرعة من غير ما توقف خالص.'
    },
    {
      scene:'المشهد ٣ — بعد الحادثة',
      img: IMG_BASE_HITRUN + 'hitrun-scene3.jpg',
      text:'ناس المنطقة بتتجمع حوالين مينا وبتتصل بالإسعاف. حد من الشهود بيلاحظ رقم لوحة العربية جزئيًا قبل ما تختفي في الضلمة.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_HITRUN + 'hitrun-scene4.jpg',
      text:'رقم اللوحة الجزئي بيوصل لمجموعة الأصحاب اللي كانوا في نفس العزومة. عندك فرصة تحدد مين فعلًا كان بيسوق وقت الحادثة.'
    },
  ],

  suspects: [
    {
      id:'yousef_driver', name:'يوسف', role:'صاحب العربية رسميًا', img: IMG_BASE_HITRUN + 'yousef.jpg', avatarEmoji:'🚗',
      alibi:'قال إنه كان راكب جنب كريم وقت الحادثة، وإن كريم هو اللي كان سايق العربية.',
      questions:[
        { q:'العربية دي مسجلة باسمك، صح؟', unlockId:'car_owner',
          a:'"أيوه العربية بتاعتي، وكنت راكب فيها. بس كريم هو اللي كان سايق وقت الحادثة، وأنا كنت جنبه."' },
        { q:'مين كان واخد المفتاح منك وقتها؟',
          a:'"أنا اديت كريم المفتاح بعد العزومة عشان يسوق؛ كنت تعبان ومش عايز أسوق. بعد الحادث هو خاف ووقف بعد أول لفة وبدّلنا أماكن."' },
      ],
      confrontations:{
        partial_plate:'العربية مسجلة باسمي فعلاً، بس ده ما يعنيش إني السواق اللي كان فيها.',
        car_owner:'أنا صاحب العربية رسميًا، بس كريم كان بيسوقها الليلة دي.',
        karim_denial:'كريم بينكر ركوبه، بس أنا شفته بعيني قبل ما يمشي.',
        nour_saw_partial:'حد اتحرك بعد الحادثة فعلاً، أنا حسيت بيه من بعيد.',
        cam_footage_verified:'القميص ده... يمكن يبقى شبه قميص حد تاني، مش بس كريم.'
      }
    },
    {
      id:'karim_friend', name:'كريم', role:'صديق المجموعة، كان معاهم في العزومة', img: IMG_BASE_HITRUN + 'karim.jpg', avatarEmoji:'🍻',
      alibi:'قال إنه ما ركبش عربية يوسف أصلًا، وإنه رجع البيت بتاكسي من مكان العزومة.',
      questions:[
        { q:'ركبت عربية يوسف في أي وقت من الليلة؟', unlockId:'karim_denial',
          a:'"لأ خالص، أنا رجعت بتاكسي، ممكن أوريكم إيصال الرحلة لو عايزين."' },
        { q:'يوسف قال إنك أنت اللي كنت بتسوق، تعليقك إيه؟',
          a:'"كلامه غلط تمامًا، معرفش ليه بيقول كده، أنا مليش أي علاقة بالعربية النهارده خالص."' },
      ],
      confrontations:{
        karim_denial:'أنا ماركبتش العربية دي خالص، إنتوا غلطانين.',
        taxi_receipt_fake:'التاكسي ده حجزته زي ما قلت، مش فاكر التوقيت بالظبط.',
        cam_footage_verified:'القميص ده ممكن يبقى لحد تاني، مش دليل قاطع إنه أنا.'
      }
    },
    {
      id:'nour_passenger', name:'نور', role:'صديقة المجموعة، كانت راكبة في العربية وقت الحادثة', img: IMG_BASE_HITRUN + 'nour.jpg', avatarEmoji:'😰',
      alibi:'قالت إنها كانت قاعدة في الكرسي الخلفي ومش شايفة مين كان بيسوق بالظبط.',
      loseMsg:'نور كانت راكبة بس في الكرسي الخلفي وقت الحادثة، وشهادتها بتساعد التحقيق أكتر من ما تدينها. مفيش أي دليل يوضح إنها هي اللي كانت بتسوق.',
      questions:[
        { q:'كنتِ في العربية وقت الحادثة؟', unlockId:'nour_saw_partial',
          a:'"أيوه، كنت قاعدة ورا. من زاويتي ماكنتش شايفة وش السواق، بس قبل الحادث كنت شايفة قميصه الفاتح من بين الكرسيين."' },
        { q:'حد من الاتنين، يوسف أو كريم، غير مكانه فجأة بعد الحادثة؟', requires:['nour_saw_partial'],
          a:'"بعد الحادث وقفنا بعد أول لفة. السواق اللي كان لابس قميص فاتح نزل وراح ناحية الكرسي اليمين، ويوسف قعد مكانه وكمّل بالعربية."' },
      ],
      confrontations:{
        nour_saw_partial:'حسيت حد اتحرك بسرعة بعد الصدمة، بس ماقدرتش أتأكد مين.',
        cam_footage_verified:'أنا شفت القميص ده وقت الحادثة، وحسيت إنه شكله مألوف.'
      }
    },
    {
      id:'ahmed_witness', name:'أحمد', role:'شاهد عابر، لاحظ جزء من رقم اللوحة', img: IMG_BASE_HITRUN + 'ahmed.jpg', avatarEmoji:'👀',
      alibi:'مش متهم، شاهد عابر بس ساعد في تحديد رقم اللوحة الجزئي.',
      accusable:false,
      questions:[
        { q:'إيه اللي شفته بالظبط؟',
          a:'"شفت العربية بتنحرف فجأة وتصدم الشاب، وكملت طريقها بسرعة، قدرت ألاحظ جزء من رقم اللوحة بس."' },
        { q:'شفت مين كان قاعد في كرسي السواق؟',
          a:'"وش السواق ماكانش واضح، لكن القميص كان فاتح. وفي كاميرا العزومة قبلها بدقايق باين كريم بقميص فاتح ويوسف بقميص غامق."' },
      ],
      confrontations:{
        partial_plate:'أنا شفت جزء من اللوحة بس، ده اللي قدرت أوصفه بصراحة.'
      }
    },
  ],

  evidence: [
    { id:'partial_plate', tag:'من شهادة أحمد', crit:true, title:'رقم اللوحة الجزئي', img: IMG_BASE_HITRUN + 'hitrun-plate.jpg',
      short:'بيوصل لعربية يوسف بشكل مباشر',
      full:'الأرقام والحروف الجزئية اللي لاحظها أحمد بتتطابق تمامًا مع لوحة عربية يوسف.',
      unlocked:true, order:1 },

    { id:'car_owner', tag:'من استجواب يوسف', crit:false, title:'ملكية العربية', img:null,
      short:'العربية مسجلة باسم يوسف رسميًا',
      full:'يوسف أكد ملكيته الرسمية للعربية، لكنه نفى إنه كان يسوقها وقت الحادثة.',
      unlocked:false, order:2 },

    { id:'karim_denial', tag:'من استجواب كريم', crit:false, title:'نفي كريم ركوب العربية', img:null,
      short:'كريم أنكر ركوبه العربية من الأساس',
      full:'كريم أنكر ركوبه عربية يوسف بشكل كامل، وادعى إنه رجع بتاكسي منفصل.',
      unlocked:false, order:3 },

    { id:'nour_saw_partial', tag:'من استجواب نور', crit:true, title:'شهادة نور الجزئية', img:null,
      short:'حد غيّر مكانه فجأة بعد الحادثة',
      full:'نور أكدت إن السواق وقت الحادث كان لابس قميص فاتح، وإنه بدّل مكانه مع يوسف بعد ما وقفوا بعد أول لفة. شهادة نور لوحدها محتاجة مقارنة بالكاميرات عشان تحدد هوية السواق.',
      unlocked:false, order:4 },

    { id:'taxi_receipt_fake', tag:'من فحص إيصال التاكسي', crit:true, title:'إيصال تاكسي كريم مزيف التوقيت', img: IMG_BASE_HITRUN + 'hitrun-receipt.jpg',
      short:'رحلة التاكسي بدأت بعد الحادثة، فمينفعش تكون أليبي لوقت الصدمة',
      full:'إيصال التطبيق اللي قدمه كريم حقيقي، لكن الرحلة بدأت بعد الحادثة بحوالي ساعة ومن مكان مختلف عن العزومة. يعني هو ركب تاكسي فعلًا، بس بعد الحادث، فالإيصال ما يثبتش إنه كان بعيد وقت الصدمة.',
      unlocked:false, order:5 },

    { id:'cam_footage_verified', tag:'من كاميرا محل قريب', crit:true, title:'مقارنة كاميرا الحادث بكاميرا خروج العزومة', img:null,
      short:'القميص الفاتح عند كرسي السواق يطابق لبس كريم قبل الحادث',
      full:'كاميرا المحل ثبتت توقيت الحادثة وشكل السواق بقميص فاتح. وبمقارنتها بكاميرا عند مكان العزومة قبلها بوقت قصير، كريم ظاهر بالقميص الفاتح ويوسف بقميص غامق. مع شهادة نور عن تبديل الأماكن بعد الحادث، المقارنة بتحدد كريم كسائق وقت الصدمة.',
      unlocked:false, order:6 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },

  cameraPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الكاميرات',
    introText: 'سجل كاميرا محل قريب من مكان الحادثة بيغطي من الساعة 11 مساءً لحد 1 بعد نص الليل. دوّر على اللحظة اللي العربية بتظهر فيها وهي بتصدم مينا — حوالي الساعة 12:20 بالليل.',
    resultText: 'وصلت للحظة الصح. كاميرا الحادث بتثبت الساعة 12:20 وبتبين السواق بقميص فاتح. لما تقارنها بكاميرا خروج العزومة، القميص ده يطابق كريم، مش يوسف.',
    startHour24: 23,
    totalMinutes: 120,
    targetMinutes: 80,
    toleranceMinutes: 8,
    resultEvidenceIds: ['cam_footage_verified'],
  },

  matchPuzzle: {
    enabled: true,
    tabLabel: 'الربط',
    introText: 'اربط كل شخص بموقفه الحقيقي في القضية بناءً على الأدلة اللي جمعتها.',
    leftItems: [
      { id:'l_yousef', text:'يوسف' },
      { id:'l_karim', text:'كريم' },
      { id:'l_nour', text:'نور' },
      { id:'l_ahmed', text:'أحمد' },
    ],
    rightItems: [
      { id:'r_falsely_blamed', text:'اتهمه صديقه ظلمًا، مش هو السواق الحقيقي' },
      { id:'r_real_driver', text:'السواق الحقيقي وقت الحادثة، قدّم دليل مزيف' },
      { id:'r_key_witness', text:'راكبة كانت شاهدة جزئية على تغيير الأماكن' },
      { id:'r_external_witness', text:'شاهد خارجي ساعد في تحديد رقم اللوحة' },
    ],
    correctPairs: [
      ['l_yousef','r_falsely_blamed'],
      ['l_karim','r_real_driver'],
      ['l_nour','r_key_witness'],
      ['l_ahmed','r_external_witness'],
    ],
    resultText: 'ربطت كل حد بموقفه الحقيقي! الصورة الكاملة واضحة دلوقتي: كريم هو السواق الحقيقي، وحاول يلصق التهمة بيوسف من خلال إيصال تاكسي مزيف التوقيت.',
    resultEvidenceIds: ['taxi_receipt_fake'],
  },

  evidenceCombinations: [
    { parts:['karim_denial','cam_footage_verified'], resultId:'taxi_receipt_fake' },
  ],

  correctSuspectId: 'karim_friend',
  conclusiveEvidenceIds: ['nour_saw_partial', 'taxi_receipt_fake', 'cam_footage_verified'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كريم هو السواق الحقيقي؟',
        options: [
          { id:'a', text:'الكاميرتان حددوا لبس السواق + شهادة نور عن تبديل الأماكن + إيصال التاكسي بدأ بعد الحادث مش قبله' },
          { id:'b', text:'لأنه أنكر ركوب العربية من الأساس' },
          { id:'c', text:'لأنه صديق يوسف' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyyousef',
        label:'ليه يوسف كان بريء فعليًا؟',
        options: [
          { id:'a', text:'المقارنة بين الكاميرات وشهادة نور حددت كريم كسائق وقت الحادث، وإيصال التاكسي ماكانش أليبي لأنه بعد الصدمة' },
          { id:'b', text:'لأن العربية مسجلة باسمه وده بيبعده عن الشبهة' },
          { id:'c', text:'لأنه اعترف بمكانه بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة وصلت من الكاميرا',
      paragraphs:[
        'كريم كان هو اللي سايق وقت الحادثة. بعد الصدمة خاف، وقف بعد أول لفة وبدّل مكانه مع يوسف، وبعدها بوقت ركب تاكسي وحاول يستخدم الرحلة كأنها أليبي من وقت الحادث.',
        'اللي قفل الصورة كان مقارنة كاميرا الحادث بكاميرا خروج العزومة، وشهادة نور عن تبديل الأماكن، وتوقيت رحلة التاكسي اللي بدأت بعد الصدمة. كده بقى فيه أساس واضح لتحديد مين كان على كرسي السواق وقت الحادث بدل الاكتفاء باسم صاحب العربية.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كريم، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: شهادة نور، إيصال التاكسي، وتسجيل الكاميرا، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والمسؤول الحقيقي فضل طليق من غير أي مساءلة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "حادثة الطريق"

   الغلاف (cover.webp):
   "Photorealistic shot of a dark city street at night with a single
   shoe and scattered items on the road near a curb, police tape,
   streetlights glowing, documentary photography style, no text, no
   watermark, photorealistic"

   المشهد ١ (hitrun-scene1.jpg):
   "Photorealistic shot of a group of young Egyptian friends leaving
   a house gathering at night, walking toward a parked car, warm
   streetlight, photorealistic, no text, no watermark"

   المشهد ٢ (hitrun-scene2.jpg):
   "Photorealistic dramatic shot of a car swerving on a dark street at
   night, motion blur, streetlights, dramatic composition,
   photorealistic, no text, no watermark"

   المشهد ٣ (hitrun-scene3.jpg):
   "Photorealistic shot of concerned bystanders gathered around on a
   dark street at night, phone flashlights, emergency atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٤ (hitrun-scene4.jpg):
   "Photorealistic shot of a dark city street the next morning,
   quiet, tire marks faintly visible near a curb, soft morning light,
   photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   يوسف (yousef.jpg):
   "Photorealistic portrait of a young Egyptian man, casual clothes,
   standing near a parked car, defensive tense expression, soft
   evening lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   كريم (karim.jpg):
   "Photorealistic portrait of a young Egyptian man, casual clothes,
   visibly nervous fidgeting expression, standing outside a house at
   night, soft evening lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   نور (nour.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual evening
   wear, worried uneasy expression, standing near a car at night,
   soft evening lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   أحمد (ahmed.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male bystander,
   casual clothes, plain honest expression, standing on a city
   street at night, soft streetlight lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل رقم اللوحة (hitrun-plate.jpg):
   "Photorealistic close-up of a blurred car license plate at night
   under streetlight, motion blur effect, no text, no watermark,
   photorealistic"

   دليل إيصال التاكسي (hitrun-receipt.jpg):
   "Photorealistic close-up of a printed taxi ride receipt on a
   table, soft indoor lighting, no text, no watermark, photorealistic"
   ============================================================ */

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_HIT_AND_RUN;
  c.evidenceCombinations = [];
  const k = c.suspects.find(s => s.id === 'karim_friend');
  if (k) {
    const q = k.questions.find(q => q.unlockId === 'karim_denial');
    if (q) {
      q.unlockId = 'taxi_receipt_fake';
      q.a = '"أنا رجعت بتاكسي، وده إيصال الرحلة. راجعوا التوقيت بنفسكم لو مش مصدقين."';
    }
  }
  c.conclusiveEvidenceIds = ['nour_saw_partial','taxi_receipt_fake','cam_footage_verified'];
  c.conclusiveRequired = 3;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_HIT_AND_RUN;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='document_karim_statement')) c.investigationActions.push({
    id:'document_karim_statement', kind:'مراجعة أقوال', label:'وثّق رواية كريم الأولى',
    description:'ثبت رسميًا الجزء اللي أنكره كريم قبل مقارنة كلامه بباقي الأدلة.',
    requires:['car_owner'], resultEvidenceIds:['karim_denial'],
    successText:'تم توثيق رواية كريم الأولى ضمن ملف القضية.'
  });
})();
