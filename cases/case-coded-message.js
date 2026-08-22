/* ============================================================
   بيانات قضية: الرسالة المشفرة
   قضية خطف/ابتزاز — بنت رجل أعمال بتتخطف، ورسالة فدية مكتوبة
   بشفرة غريبة بدل ما تكون مطالب واضحة زي أي خطف عادي.
   ============================================================ */

const IMG_BASE_CODEDMESSAGE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/coded-message/';

const CASE_CODED_MESSAGE = {
  id: 'coded-message',
  title: 'الرسالة المشفرة',
  caseNo: 'CASE 060',
  subtitle: 'فيلا رجل أعمال، مدينة الشيخ زايد',
  coverImg: IMG_BASE_CODEDMESSAGE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'بنت رجل أعمال بتتخطف من قدام مدرستها، ورسالة الفدية اللي وصلت لأبوها مكتوبة بشفرة غريبة بدل أي مطلب واضح. مين يعرف الشفرة دي غير حد قريب من العيلة؟',

  isPremium: false,
  categories: ['kidnapping', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_CODEDMESSAGE + 'cover.webp',
    heroCaption: 'CASE 060 — بعد الاختطاف بساعتين',
    text1: 'رجل الأعمال "منتصر" استقبل مكالمة مرعبة: ابنته "نور" اختفت من قدام باب مدرستها. بعد شوية، لقى مظروف تحت باب الفيلا فيه رسالة، بس الرسالة مش فيها أي مطلب مالي واضح — بس أرقام وحروف متبدلة بشكل غريب.',
    text2: 'منتصر طلب منك تفك شفرة الرسالة وتلاقي نور قبل ما الخاطف يتصرف. عندك الرسالة المشفرة، وقائمة الناس القريبين من العيلة اللي ممكن يعرفوا تفاصيل شخصية كفاية يستخدموها كشفرة.',
    meta: [
      { label:'المخطوفة', value:'نور — ابنة منتصر، 10 سنين' },
      { label:'آخر مكان معروف', value:'قدام مدرستها' },
      { label:'الدليل المحوري', value:'رسالة فدية مشفرة بدل مطالب واضحة' },
      { label:'طلب التحقيق', value:'منتصر، والد نور' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — يوم عادي',
      img: IMG_BASE_CODEDMESSAGE + 'coded-scene1.jpg',
      text:'نور بتخرج من باب مدرستها زي كل يوم، السائق مستنيها في المكان المعتاد، لكنها ما وصلتش للعربية أبدًا.'
    },
    {
      scene:'المشهد ٢ — الاختفاء',
      img: IMG_BASE_CODEDMESSAGE + 'coded-scene2.jpg',
      text:'السائق بيتصل بمنتصر في ذعر: نور مش موجودة، ومحدش من المدرسة شافها بتمشي مع حد غريب.'
    },
    {
      scene:'المشهد ٣ — الرسالة',
      img: IMG_BASE_CODEDMESSAGE + 'coded-scene3.jpg',
      text:'مظروف بيتلاقى تحت باب الفيلا، جواه ورقة مكتوب عليها سلسلة أرقام وحروف غريبة، من غير أي توضيح.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_CODEDMESSAGE + 'coded-scene4.jpg',
      text:'منتصر بيديك الرسالة المشفرة، وقائمة كل الناس القريبين من العيلة اللي ممكن يعرفوا تفاصيلها الشخصية.'
    },
  ],

  suspects: [
    {
      id:'driver_atef_c', name:'عاطف', role:'سائق العيلة، آخر واحد شاف نور', img: IMG_BASE_CODEDMESSAGE + 'atef_c.jpg', avatarEmoji:'🚗',
      alibi:'قال إنه كان مستني في مكانه المعتاد، وما شافش نور خارجة خالص.',
      questions:[
        { q:'إنت شغال مع العيلة من قد إيه؟', unlockId:'atef_c_tenure',
          a:'"من خمس سنين تقريبًا، بعرف تفاصيل كتير عن روتين نور اليومي."' },
        { q:'حد سألك مؤخرًا عن مواعيد نور أو روتينها؟', requires:['atef_c_tenure'], unlockId:'atef_c_questioned',
          a:'(بيتردد) "معلم بتاعها الخصوصي كان بيسأل أسئلة كتير عن جدولها في الأسبوعين اللي فاتوا."' },
      ]
    },
    {
      id:'private_tutor_yara_c', name:'يارا', role:'معلمة نور الخصوصية', img: IMG_BASE_CODEDMESSAGE + 'yara_c.jpg', avatarEmoji:'📚',
      alibi:'قالت إنها كانت في بيتها تحضّر لدرس تاني وقت الاختفاء.',
      questions:[
        { q:'علاقتك بنور كانت إيه؟', unlockId:'yara_c_relationship',
          a:'"بدرّسها من سنتين، علاقتنا كويسة جدًا، بتحكيلي عن حياتها الشخصية كتير."' },
        { q:'وضعك المالي كان محتاج مساعدة في الفترة الأخيرة؟', requires:['yara_c_relationship'], unlockId:'yara_c_debt',
          a:'(بتتردد) "كنت مديونة بشكل كبير من مصاريف علاج والدتي، ده كان ضاغط عليّا جدًا."' },
      ]
    },
    {
      id:'business_rival_kareem_c', name:'كريم', role:'منافس تجاري لمنتصر', img: IMG_BASE_CODEDMESSAGE + 'kareem_c.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في اجتماع عمل طول اليوم، بعيد تمامًا عن مدرسة نور.',
      questions:[
        { q:'علاقتك بمنتصر كانت إيه في الفترة الأخيرة؟', unlockId:'kareem_c_dispute',
          a:'"كان بينا خلاف كبير على استحواذ شركة، منتصر كان رافض يبيع نصيبه."' },
        { q:'كنت متعرف على تفاصيل شخصية عن عيلة منتصر؟', requires:['kareem_c_dispute'],
          a:'"لأ، علاقتنا كانت شغل بس، مكنش عندي وصول لتفاصيل عيلته الشخصية."' },
      ]
    },
    {
      id:'housekeeper_soad_c', name:'سعاد', role:'مدبرة منزل العيلة القديمة', img: IMG_BASE_CODEDMESSAGE + 'soad_c.jpg', avatarEmoji:'🏠',
      alibi:'قالت إنها كانت في الفيلا تنظف زي أي يوم عادي.',
      questions:[
        { q:'إنتِ شغالة مع العيلة من قد إيه؟', unlockId:'soad_c_tenure',
          a:'"من قبل ما نور تتولد، بعرف كل تفاصيل البيت وتاريخ العيلة."' },
        { q:'شاهد أكد إن يارا كانت في الفيلا قريب من وقت الاختفاء، مش في بيتها زي ما قالت — عايزة تفسري؟', requires:['soad_c_tenure','yara_c_debt','atef_c_questioned'], closesInterrogation:true,
          a:'(بصوت واطي) "أنا اللي شفتها، بس مقلتش حاجة الأول خوفًا. يارا كانت مديونة بشدة، وكانت بتسأل كتير عن روتين نور. مش متأكدة لو هي وراء الموضوع، بس حسيت إن لازم أقول دلوقتي."' },
      ]
    },
  ],

  evidence: [
    { id:'ransom_note', tag:'من تحت باب الفيلا', crit:true, title:'الرسالة المشفرة', img: IMG_BASE_CODEDMESSAGE + 'coded-note.jpg',
      short:'سلسلة أرقام وحروف بدل مطالب واضحة',
      full:'الرسالة اللي اتلاقت تحت الباب مكتوب فيها سلسلة أرقام وحروف بشكل مشفر، من غير أي مطلب مالي مباشر أو تهديد صريح، وده غريب عن أي خطف عادي بيكون هدفه المال.',
      unlocked:true, order:1 },

    { id:'atef_c_tenure', tag:'من استجواب عاطف', crit:false, title:'خبرة عاطف بروتين نور', img:null,
      short:'عاطف شغال مع العيلة من خمس سنين وعارف تفاصيل كتير',
      full:'عاطف أكد إنه شغال مع العيلة من خمس سنين، وعارف تفاصيل روتين نور اليومي بشكل كامل.',
      unlocked:false, order:2 },

    { id:'atef_c_questioned', tag:'من استجواب عاطف', crit:true, title:'أسئلة يارا المتكررة', img:null,
      short:'يارا كانت بتسأل عاطف عن جدول نور كتير',
      full:'عاطف كشف إن يارا، معلمة نور الخصوصية، كانت بتسأله أسئلة كتيرة عن جدول نور في الأسبوعين اللي سبقوا الاختطاف.',
      unlocked:false, order:3 },

    { id:'yara_c_relationship', tag:'من استجواب يارا', crit:false, title:'قرب يارا من نور', img:null,
      short:'يارا مدرّسة خصوصية لنور من سنتين',
      full:'يارا أكدت علاقتها القوية بنور من سنتين، وإن نور بتحكيلها عن حياتها الشخصية بشكل مستمر.',
      unlocked:false, order:4 },

    { id:'yara_c_debt', tag:'من استجواب يارا', crit:true, title:'ديون يارا المالية', img:null,
      short:'يارا مديونة بشكل كبير بسبب علاج والدتها',
      full:'يارا اعترفت بمديونية كبيرة بسبب مصاريف علاج والدتها، وإن الضغط المالي كان تقيل عليها جدًا في الفترة الأخيرة.',
      unlocked:false, order:5 },

    { id:'kareem_c_dispute', tag:'من استجواب كريم', crit:false, title:'خلاف تجاري مع منتصر', img:null,
      short:'كريم ومنتصر في خلاف على استحواذ شركة',
      full:'كريم اعترف بوجود خلاف كبير مع منتصر على استحواذ شركة، بس نفى أي وصول لتفاصيل عيلته الشخصية.',
      unlocked:false, order:6 },

    { id:'soad_c_tenure', tag:'من استجواب سعاد', crit:false, title:'معرفة سعاد العميقة بالعيلة', img:null,
      short:'سعاد شغالة مع العيلة من قبل ميلاد نور',
      full:'سعاد أكدت إنها شغالة مع العيلة من قبل ما نور تتولد، وعارفة كل تفاصيل البيت وتاريخه.',
      unlocked:false, order:7 },

    { id:'yara_c_seen_villa', tag:'من شهادة سعاد', crit:true, title:'يارا كانت في الفيلا وقت الاختفاء', img: IMG_BASE_CODEDMESSAGE + 'coded-witness.jpg',
      short:'سعاد شافت يارا قريب من الفيلا في نفس توقيت اختفاء نور',
      full:'سعاد أكدت إنها شافت يارا قريبة من الفيلا في نفس توقيت اختفاء نور تقريبًا، رغم إن يارا ادّعت إنها كانت في بيتها طول الوقت.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم موجود بالفعل في engine.js: cipherPuzzle
     الرسالة بتستخدم شفرة استبدال بسيطة (كل حرف اتبدل برقم حسب
     مفتاح شخصي يخص العيلة — تاريخ ميلاد نور)، واللاعب لازم يفك
     الشفرة عشان يوصل لمكان احتجاز نور.
     ============================================================ */
  cipherPuzzle: {
    enabled: true,
    tabLabel: 'فك الشفرة',
    introText: 'الرسالة مكتوبة بشفرة استبدال مرتبطة بتفصيلة شخصية تخص نور. راجع المعلومات اللي يعرفها المقربون منها وحدد المفتاح قبل فك الأرقام.',
    cipherText: '13-15-11-5-14 / 22-9-12-12-1',
    cipherKey: 'birthdate-substitution',
    solutionText: 'مخزن فيلا',
    resultText: 'فكيت الشفرة! الرسالة بتشاور على "مخزن فيلا" — مكان قريب من فيلا العيلة القديمة كانت سعاد بتشتغل فيه زمان.',
    resultEvidenceIds: ['ransom_note'],
  },

  evidenceCombinations: [
    { parts:['yara_c_debt','atef_c_questioned'], resultId:'yara_c_debt' },
  ],

  correctSuspectId: 'private_tutor_yara_c',
  conclusiveEvidenceIds: ['ransom_note', 'yara_c_debt', 'yara_c_seen_villa', 'atef_c_questioned'],
  conclusiveRequired: 4,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن يارا هي المسؤولة عن خطف نور؟',
        options: [
          { id:'a', text:'شهادة سعاد اللي أثبتت وجودها قريب من الفيلا وقت الاختفاء + أسئلتها المتكررة عن جدول نور قبل الحادثة + ديونها المالية الكبيرة اللي كانت دافع واضح' },
          { id:'b', text:'لأنها معلمة خصوصية وده يكفي كدافع' },
          { id:'c', text:'لأن كريم كان في خلاف تجاري مع منتصر' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'ليه يارا استخدمت شفرة بدل مطلب فدية واضح؟',
        options: [
          { id:'a', text:'خافت إن أي رسالة مباشرة تتربط بيها بسهولة بسبب قربها من العيلة، فاستخدمت شفرة تعتمد على تفاصيل شخصية بس هي والعيلة القريبة عارفينها، عشان تفاوض من غير ما تكشف هويتها فورًا' },
          { id:'b', text:'كانت عايزة تختبر ذكاء منتصر بس من غير أي دافع مالي' },
          { id:'c', text:'الشفرة كانت غلطة مطبعية بسيطة مقصودة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'الشفرة اللي فضحت صاحبتها',
      paragraphs:[
        'يارا كانت تحت ضغط مالي هائل بسبب مصاريف علاج والدتها، واستغلت قربها الشديد من نور ومعرفتها بتفاصيل حياتها الشخصية عشان تخطط لعملية خطف. استخدمت شفرة مبنية على تاريخ ميلاد نور بدل مطلب فدية مباشر، عشان تقدر تفاوض من غير ما تكشف هويتها فورًا، واحتجزت نور في مخزن فيلا قديمة كانت سعاد بتشتغل فيها زمان.',
        'شهادة سعاد اللي أثبتت وجودها قريب من الفيلا في نفس توقيت الاختفاء، وأسئلتها المتكررة لعاطف عن جدول نور قبل الحادثة، وديونها المالية الكبيرة الموثقة، كلها أدلة حاصرتها وأدت لإنقاذ نور قبل ما يتفاقم الموقف.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية يارا، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: شهادة سعاد، أسئلتها المتكررة، وديونها المالية، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ونور فضلت في خطر حقيقي والفاعلة الحقيقية فضلت طليقة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الرسالة المشفرة"

   الغلاف (cover.webp):
   "Photorealistic close-up of a coded ransom note with numbers and
   letters on aged paper, dim dramatic desk lighting, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (coded-scene1.jpg):
   "Photorealistic shot of a school entrance gate in the afternoon,
   children walking out, a parked car waiting nearby, natural
   daylight, photorealistic, no text, no watermark"

   المشهد ٢ (coded-scene2.jpg):
   "Photorealistic close-up of a worried driver on the phone standing
   next to an empty car outside a school, daylight, tense expression,
   photorealistic, no text, no watermark"

   المشهد ٣ (coded-scene3.jpg):
   "Photorealistic shot of a sealed envelope on a villa doorstep at
   dusk, dramatic low lighting, documentary photography style, no
   text, no watermark, photorealistic"

   المشهد ٤ (coded-scene4.jpg):
   "Photorealistic shot of a worried businessman handing a note to an
   investigator in a villa living room, warm indoor lighting,
   photorealistic, no text, no watermark"

   عاطف (atef_c.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male driver,
   formal simple uniform, worried nervous expression, standing near
   a car, daylight, candid documentary photography style, no text, no
   watermark, photorealistic"

   يارا (yara_c.jpg):
   "Photorealistic portrait of a young Egyptian female private tutor,
   smart casual outfit, guarded anxious expression, standing near a
   bookshelf, warm indoor lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   كريم (kareem_c.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   businessman, formal suit, calculating composed expression,
   standing in an office, formal lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سعاد (soad_c.jpg):
   "Photorealistic portrait of an elderly Egyptian female
   housekeeper, simple modest outfit, thoughtful composed expression,
   standing in a villa hallway, warm indoor lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل الرسالة (coded-note.jpg):
   "Photorealistic extreme close-up of a coded ransom note with
   numbers and letters, forensic evidence photography style, dim
   lighting, no text, no watermark, photorealistic"

   دليل الشاهد (coded-witness.jpg):
   "Photorealistic shot of a woman peeking from behind a villa gate
   at dusk, dim lighting, documentary photography style, no text, no
   watermark, photorealistic"
   ============================================================ */

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_CODED_MESSAGE;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='follow_soad_witness')) c.investigationActions.push({
    id:'follow_soad_witness', kind:'متابعة شاهد', label:'راجع مع سعاد تحركات الليلة',
    description:'بعد ما تعرف مدى معرفتها بالبيت والعيلة، ارجع لها في تفاصيل اللي شافته حوالين الفيلا.',
    requires:['soad_c_tenure'], resultEvidenceIds:['yara_c_seen_villa'],
    successText:'سعاد حدّدت تفصيلة مهمة عن محيط الفيلا وتم توثيقها.'
  });
})();
