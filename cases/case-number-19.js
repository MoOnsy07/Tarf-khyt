/* ============================================================
   بيانات قضية: القميص رقم 19
   قضية اختفاء — لاعب ناشئ بيختفي قبل أول ماتش ليه مع الفريق
   الأول، وقميصه بيتلاقى في ترعة. الحقيقة إنه مستخبي بإرادته
   بعد ما اكتشف تزوير سن لاعب تاني، وحد استغل اختفاءه.
   ============================================================ */

const IMG_BASE_JERSEY = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/number-19/';

const CASE_NUMBER_19 = {
  id: 'number-19',
  title: 'القميص رقم 19',
  caseNo: 'CASE 022',
  subtitle: 'أكاديمية كرة قدم للناشئين، القاهرة',
  coverImg: IMG_BASE_JERSEY + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 20,
  teaser: 'لاعب ناشئ بيختفي قبل أول ماتش ليه مع الفريق الأول، وقميصه بيتلاقى في ترعة قريبة. الكل خايف عليه، بس الحقيقة إنه مستخبي بإرادته لسبب خطير.',

  isPremium: false,
  categories: ['sports', 'disappearance'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_JERSEY + 'cover.webp',
    heroCaption: 'CASE 022 — قبل أول ماتش بيوم واحد',
    text1: '"عمر"، لاعب ناشئ عنده 19 سنة، اختفى فجأة قبل أول ماتش رسمي ليه مع الفريق الأول. بعد ساعات، قميصه الرياضي اتلاقى ملقى في ترعة جنب طريق النادي. الناس بدأت تتكلم عن خطف أو حتى انتحار، خصوصًا بعد ما رسائل قديمة له اتسربت يقول فيها إنه "مش قادر يكمل".',
    text2: 'والد عمر رافض يصدق نظرية الانتحار، وحاسس إن في حاجة تانية وراء اختفاء ابنه. طلب منك تحقق بسرعة، عشان توصل لحقيقة اختفائه قبل ما القضية تتقفل بشكل خاطئ تمامًا.',
    meta: [
      { label:'المختفي', value:'عمر — لاعب ناشئ، 19 سنة' },
      { label:'الدليل الأول', value:'قميصه في ترعة قريبة من النادي' },
      { label:'الإشاعة المنتشرة', value:'رسائل تسربت توحي بانتحار' },
      { label:'طلب التحقيق', value:'والد عمر' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — قبل الاختفاء',
      img: IMG_BASE_JERSEY + 'jersey-scene1.jpg',
      text:'ملعب تدريب النادي، عمر بيتمرن بحماس واضح قبل أول ماتش رسمي ليه، وزملاؤه بيهنّوه على الفرصة الكبيرة.'
    },
    {
      scene:'المشهد ٢ — الاختفاء',
      img: IMG_BASE_JERSEY + 'jersey-scene2.jpg',
      text:'عمر بيسيب التدريب الأخير قبل الماتش من غير ما يودع حد، وماحدش بيقدر يوصله بعدها.'
    },
    {
      scene:'المشهد ٣ — القميص في الترعة',
      img: IMG_BASE_JERSEY + 'jersey-scene3.jpg',
      text:'صياد بيلاقي قميص عمر الرياضي عايم في ترعة قريبة من طريق النادي، والخبر بينتشر بسرعة وسط قلق كبير.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_JERSEY + 'jersey-scene4.jpg',
      text:'والد عمر بيديك كل حاجة عنده: رسائل قديمة، بيانات GPS من عربية النادي، وفيديوهات تدريب أخيرة.'
    },
  ],

  suspects: [
    {
      id:'sameh_agent', name:'سامح', role:'وكيل أعمال عمر', img: IMG_BASE_JERSEY + 'sameh.jpg', avatarEmoji:'📄',
      alibi:'قال إنه كان بيجهز عقد انتقال جديد لعمر لنادي أوروبي.',
      questions:[
        { q:'إيه وضع عمر المهني الفترة الأخيرة؟', unlockId:'transfer_deal',
          a:'"كان قريب جدًا من عقد انتقال كبير لنادي أوروبي، فرصة العمر بالنسباله، محدش كان هيسيبها كده."' },
        { q:'حصل بينك وبينه أي خلاف مؤخرًا؟',
          a:'"لأ خالص، علاقتنا ممتازة، أنا معايا مصلحة كبيرة في نجاحه، مش في اختفائه."' },
      ],
      confrontations:{
        transfer_deal:'العقد ده كان فرصة كبيرة لعمر، مالوش علاقة باختفاءه.'
      }
    },
    {
      id:'youssef_father', name:'يوسف', role:'والد عمر، طلب التحقيق', img: IMG_BASE_JERSEY + 'youssef.jpg', avatarEmoji:'👨',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'الرسائل اللي اتسربت دي كانت بتقول إيه بالظبط؟', unlockId:'leaked_messages',
          a:'"كانت رسائل قديمة من كذا شهر، بيقول فيها إنه مش قادر يكمل ضغط التدريب، بس ده كلام عادي لأي لاعب ناشئ، مش نية انتحار."' },
        { q:'عمر كان قلقان من حاجة معينة الفترة الأخيرة؟', unlockId:'father_hint',
          a:'"أيوه، كان مشغول البال بحاجة في الأكاديمية، مش قادر يوضحلي بالظبط إيه، بس كان مختلف عن نفسه."' },
      ],
      confrontations:{
        leaked_messages:'الرسائل دي قديمة، مش دليل على نية انتحار، أنا متأكد من كده.',
        father_hint:'عمر كان مشغول البال بحاجة، بس ماقالليش إيه بالظبط.'
      }
    },
    {
      id:'rival_player', name:'حسام', role:'زميل عمر ومنافسه على مكان في الفريق الأول', img: IMG_BASE_JERSEY + 'hossam.jpg', avatarEmoji:'⚡',
      alibi:'قال إنه كان في بيته طول ليلة الاختفاء.',
      questions:[
        { q:'إنت وعمر بينكم منافسة على نفس المركز، صح؟',
          a:'"أيوه، كنا الاتنين مرشحين لنفس المكان، طبيعي يكون في تنافس، بس ده تنافس رياضي شريف."' },
        { q:'سنك الحقيقي كام؟', unlockId:'age_doubt',
          a:'(بيتردد) "19 في أوراق النادي... ليه السؤال ده؟"' },
        { q:'شهادة ميلادك الرسمية بتوضح تاريخ مختلف عن اللي مسجل في أوراق النادي بسنتين.', requires:['age_doubt'],
          a:'(بيصمت لحظة) "الإدارة عارفة من زمان إن سني الحقيقي أكبر من المسجل بسنتين. أنا ماعملتش الأوراق بنفسي."' },
      ],
      confrontations:{
        age_doubt:'السن ده... تفاصيل إدارية، مالهاش علاقة باختفاء عمر خالص.',
        omar_complaint:'عمر سأل عني، بس ده كان فضول عادي مش اتهام.',
        training_video_cut:'الفيديو ده اتقص من جهاز أشرف، مش من جهازي أنا.'
      }
    },
    {
      id:'coach_ashraf', name:'المدرب أشرف', role:'مدير قطاع الناشئين بالنادي', img: IMG_BASE_JERSEY + 'ashraf.jpg', avatarEmoji:'📋',
      alibi:'قال إنه بس مسؤول إداري عن القطاع، ومالوش أي علاقة باختفاء عمر.',
      questions:[
        { q:'سجلات القطاع كلها موثقة صح؟',
          a:'"بالطبع، كل حاجة موثقة رسميًا حسب اتحاد الكرة."' },
        { q:'عمر جه لك بشكوى قبل اختفائه؟', unlockId:'omar_complaint',
          a:'(بيتردد) "جه يسألني عن حاجة في سجلات لاعب تاني، قلت له إن ده مش شغله ويركز في تدريبه بس."' },
        { q:'عمر اكتشف إن حسام أكبر من السن المسجل بسنتين، وفيديو التدريب اتعدل من جهاز مكتبك، وعربية القطاع خرجت ناحية الترعة بعد اختفائه — تفسر السلسلة دي إزاي؟', requires:['omar_complaint','age_doubt','training_video_cut','gps_location'], closesInterrogation:true,
          a:'(بيسكت وقت طويل) "أيوه، حسام أكبر من السن المسجل بسنتين، والإدارة كانت ساكتة. عمر هدد يفتح الملف. لما اختفى من نفسه، أنا خفت الموضوع يجرنا للسجلات، فخدت قميصه من الدولاب وحطيته عند الترعة، وسرّبت الرسايل القديمة عشان الناس تفسر اختفاءه على إنه أزمة شخصية. أنا هددته قبلها يسكت، بس ما خطفتوش."' },
      ],
      confrontations:{
        age_doubt:'السن ده تفصيلة إدارية قديمة، مالهاش علاقة باللي حصل.',
        omar_complaint:'عمر سأل عن السجلات، وأنا رديت عليه رد عادي.',
        gps_location:'العربية دي كانت في مشوار رسمي، مفتاحها كان معايا لأني مسؤول القطاع.',
        training_video_cut:'محيت جزء من الفيديو، بس كان ده قرار إداري بس مش أكتر.'
      }
    },
  ],

  evidence: [
    { id:'jersey_found', tag:'من الترعة القريبة', crit:true, title:'قميص عمر في الترعة', img: IMG_BASE_JERSEY + 'jersey-found.jpg', unlocksCamera:true,
      short:'اتلاقى عايم من غير أي علامات عنف أو تمزق',
      full:'القميص اتلاقى قريب من حافة الترعة من غير تمزق أو آثار عنف، وكيس المعدات اللي كان عمر سايبه في النادي ناقص منه القميص ده تحديدًا. ده يرجّح إن حد أخده من النادي وحطه هناك كدليل مضلل.',
      unlocked:true, order:1 },

    { id:'transfer_deal', tag:'من استجواب سامح', crit:false, title:'عقد الانتقال القريب', img:null,
      short:'عمر كان قريب من عقد انتقال أوروبي كبير',
      full:'سامح أكد إن عمر كان قريب جدًا من عقد انتقال لنادي أوروبي، فرصة كان من غير المنطقي يسيبها بإرادته من غير سبب قوي.',
      unlocked:false, order:2 },

    { id:'leaked_messages', tag:'من رسائل مسربة', crit:false, title:'رسائل قديمة عن الضغط النفسي', img:null,
      short:'رسائل من شهور بتتكلم عن ضغط التدريب، مش نية انتحار واضحة',
      full:'الرسائل المسربة قديمة من شهور، وبتتكلم عن ضغط تدريب عادي، من غير أي إشارة مباشرة لنية إيذاء النفس.',
      unlocked:false, order:3 },

    { id:'father_hint', tag:'من استجواب يوسف', crit:false, title:'انشغال عمر الأخير', img:null,
      short:'كان مشغول البال بحاجة في الأكاديمية قبل اختفائه',
      full:'والده أكد إن عمر كان مشغول البال بحاجة محددة في الأكاديمية آخر فترة قبل اختفائه.',
      unlocked:false, order:4 },

    { id:'age_doubt', tag:'من استجواب حسام', crit:true, title:'شكوك في السن الرسمي لحسام', img:null,
      short:'تاريخ الميلاد الحقيقي يخليه أكبر من السن المسجل في النادي بسنتين',
      full:'المستند الأصلي لتاريخ ميلاد حسام يخليه أكبر بسنتين من السن المسجل في ملف النادي، وده يغيّر أهليته للفئة العمرية اللي كان بيلعب فيها.',
      unlocked:false, order:5 },

    { id:'omar_complaint', tag:'من استجواب المدرب أشرف', crit:true, title:'شكوى عمر قبل اختفائه', img:null,
      short:'عمر سأل عن سجلات حسام قبل اختفائه بأيام',
      full:'المدرب أشرف اعترف إن عمر جه له بسؤال عن سجلات لاعب تاني (حسام) قبل اختفائه بأيام قليلة.',
      unlocked:false, order:6 },

    { id:'gps_location', tag:'من بيانات GPS', crit:true, title:'موقع عربية النادي وقت الاختفاء', img: IMG_BASE_JERSEY + 'jersey-gps.jpg',
      short:'عربية القطاع خرجت ناحية طريق الترعة بعد الاختفاء، ومفتاحها كان مستلم باسم أشرف',
      full:'بيانات GPS بتوضح إن عربية قطاع الناشئين خرجت الساعة 6:15 من النادي لطريق الترعة ورجعت بعدها بنحو 25 دقيقة. سجل المفاتيح الورقي موقّع باسم أشرف في نفس الفترة، وده بيربطه بمسار القميص المضلل.',
      unlocked:false, order:7 },

    { id:'training_video_cut', tag:'من فيديو تدريب مقصوص', crit:true, title:'فيديو تدريب أخير مقصوص', img: IMG_BASE_JERSEY + 'jersey-video.jpg',
      short:'جزء مواجهة عمر مع أشرف اتمسح من النسخة الرسمية من جهاز مكتب أشرف',
      full:'النسخة الأصلية من كاميرا التدريب فيها مواجهة قصيرة بين عمر وأشرف عن سجلات حسام، لكن النسخة اللي اترفعت للأرشيف اتقص منها الجزء ده. سجل التصدير بيبين إن التعديل اتعمل من جهاز مكتب أشرف قبل انتشار خبر الاختفاء.',
      unlocked:false, order:8 },

    { id:'omar_safe_message', tag:'من بريد عمر المجدول', crit:true, title:'رسالة تؤكد إن عمر بخير', img:null,
      short:'رسالة مجدولة اتبعت بعد الاختفاء تؤكد إنه بعيد بإرادته وعايز حماية ملف الأدلة',
      full:'بعد مراجعة بريد عمر، ظهرت رسالة مجدولة اتبعت لوكيله بعد الاختفاء تقول إنه بخير وإنه بعد مؤقتًا بإرادته، وإنه مش هيرجع قبل ما يتأمن ملف سجلات السن اللي اكتشفه. الرسالة ما بتكشفش مكانه احترامًا لأمانه.',
      unlocked:false, order:9 },

  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  cameraPuzzle: {
    enabled: true,
    tabLabel: 'تتبع GPS',
    introText: 'بيانات GPS من عربية النادي بتغطي من الساعة 4 العصر (بداية التدريب) لحد 8 بالليل. دوّر على اللحظة اللي العربية بتتحرك فيها بشكل مريب بعد التدريب مباشرة — حوالي الساعة 6:15.',
    resultText: 'وصلت للحركة المهمة: عربية القطاع خرجت الساعة 6:15 ناحية طريق الترعة ورجعت بعد حوالي 25 دقيقة، وسجل المفاتيح بيربط الرحلة بأشرف.',
    startHour24: 16,
    totalMinutes: 240,
    targetMinutes: 135,
    toleranceMinutes: 10,
    resultEvidenceIds: ['gps_location'],
  },

  matchPuzzle: {
    enabled: true,
    tabLabel: 'الربط',
    introText: 'اربط كل شخص بموقفه الحقيقي في القضية بناءً على الأدلة اللي جمعتها.',
    leftItems: [
      { id:'l_sameh', text:'سامح' },
      { id:'l_hossam', text:'حسام' },
      { id:'l_ashraf', text:'المدرب أشرف' },
      { id:'l_youssef', text:'يوسف' },
    ],
    rightItems: [
      { id:'r_no_motive', text:'مالوش أي دافع، مصلحته في بقاء عمر مش اختفائه' },
      { id:'r_hidden_secret', text:'صاحب السر اللي عمر اكتشفه' },
      { id:'r_covering_up', text:'المسؤول عن التستر وتهديد عمر' },
      { id:'r_worried_parent', text:'الأب القلقان، مش متهم' },
    ],
    correctPairs: [
      ['l_sameh','r_no_motive'],
      ['l_hossam','r_hidden_secret'],
      ['l_ashraf','r_covering_up'],
      ['l_youssef','r_worried_parent'],
    ],
    resultText: 'ربطت الأدوار صح: حسام هو اللاعب اللي سنه الحقيقي أكبر من المسجل، وأشرف هو اللي تستر على الملف وهدد عمر ثم زرع أدلة مضللة بعد اختفائه. سامح ووالد عمر مفيش دليل على تورطهم.',
    resultEvidenceIds: ['training_video_cut'],
  },

  evidenceCombinations: [
    { parts:['omar_complaint','age_doubt'], resultId:'training_video_cut' },
    { parts:['gps_location','training_video_cut'], resultId:'omar_safe_message' },
  ],

  correctSuspectId: 'coach_ashraf',
  conclusiveEvidenceIds: ['age_doubt', 'gps_location', 'training_video_cut', 'omar_safe_message'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن المدرب أشرف هو المسؤول عن تهديد عمر؟',
        options: [
          { id:'a', text:'اعترافه بشكوى عمر + فيديو التدريب المقصوص + تحرك عربية النادي المريب بعد الاختفاء' },
          { id:'b', text:'لأنه مدير قطاع الناشئين وده كافي' },
          { id:'c', text:'لأنه تردد أثناء الاستجواب' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه الحقيقة الكاملة عن اختفاء عمر؟',
        options: [
          { id:'a', text:'عمر اختفى بإرادته بعد ما هدد يكشف تزوير سن حسام، وأشرف استغل الاختفاء وزرع القميص وسرّب رسائل قديمة عشان يوجّه الناس لتفسير شخصي ويبعد التحقيق عن سجلات النادي' },
          { id:'b', text:'عمر اتخطف فعليًا من غريب' },
          { id:'c', text:'عمر حاول فعلًا يأذي نفسه بسبب ضغط التدريب' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'بأمان', badgeLabel:'القضية اتقفلت — هو بأمان', title:'عمر بخير، والحقيقة اتكشفت',
      paragraphs:[
        'عمر ماكانش مخطوف ولا حاول يأذي نفسه. اكتشف إن حسام أكبر من السن المسجل في ملف النادي بسنتين وإن أشرف عارف بالتلاعب، فقرر يبعد مؤقتًا ويأمّن الأدلة قبل ما يفتح الموضوع رسميًا.',
        'أشرف استغل اختفاء عمر، أخد القميص من النادي وحطه ناحية الترعة وسرّب رسائل قديمة عشان يوجّه الناس لفكرة أزمة شخصية. سجل تعديل الفيديو ومسار عربية القطاع ربطوه بالتغطية، وبعدها رسالة عمر المجدولة أكدت إنه بخير. إدارة النادي فتحت مراجعة مستقلة لسجلات السن ودور أشرف.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتفتحت تاني — محتاجة أدلة أكتر', title:'الشك في مكانه الصح، بس الصورة لسه مش كاملة',
      paragraphs:[
        'التحقيق بيتجه صح ناحية المدرب أشرف، بس الأدلة اللي جمعتها لسه مش كافية تأكد الصورة الكاملة قدام إدارة النادي.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: شكوى عمر، فيديو التدريب المقصوص، وتحرك GPS، قبل ما تقدّم استنتاجك النهائي.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — استنتاج غلط', title:'القضية اتقفلت بفهم غلط',
      paragraphs:[
        'وصلت لاستنتاج غلط عن {wrongName}، والحقيقة الكاملة عن اختفاء عمر فضلت غير واضحة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "القميص رقم 19"

   الغلاف (cover.webp):
   "Photorealistic shot of a wet football jersey with number 19
   floating in a canal near a road, dramatic overcast lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (jersey-scene1.jpg):
   "Photorealistic wide shot of young Egyptian football players
   training on a green pitch, one player being congratulated by
   teammates, daylight, photorealistic, no text, no watermark"

   المشهد ٢ (jersey-scene2.jpg):
   "Photorealistic shot of a young athlete walking alone away from a
   training ground at dusk, backpack over shoulder, moody golden hour
   lighting, photorealistic, no text, no watermark"

   المشهد ٣ (jersey-scene3.jpg):
   "Photorealistic shot of a wet sports jersey floating in a canal
   near a road, a concerned fisherman nearby, overcast daylight,
   photorealistic, no text, no watermark"

   المشهد ٤ (jersey-scene4.jpg):
   "Photorealistic shot of a worried middle-aged man sitting at a
   kitchen table with a laptop and documents, soft indoor lighting,
   photorealistic, no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   سامح (sameh.jpg):
   "Photorealistic portrait of a young Egyptian male sports agent,
   business casual attire, smooth confident expression, standing on
   a football academy sideline, natural daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   يوسف (youssef.jpg):
   "Photorealistic portrait of a middle-aged Egyptian father, worried
   distressed expression, casual clothing, standing near a football
   academy field, natural daylight, candid documentary photography
   style, no text, no watermark, photorealistic"

   حسام (hossam.jpg):
   "Photorealistic portrait of a young athletic Egyptian male
   football player, team training kit, guarded competitive
   expression, standing on a football field, natural daylight,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   المدرب أشرف (ashraf.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male youth
   academy director, tracksuit, authoritative composed expression,
   standing on a football academy sideline, natural daylight, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل القميص (jersey-found.jpg):
   "Photorealistic close-up of a wet football jersey with visible
   number, floating in murky canal water, forensic evidence
   photography style, no text, no watermark, photorealistic"

   دليل GPS (jersey-gps.jpg):
   "Photorealistic close-up of a car GPS tracking map interface on a
   tablet screen showing a route line, dark mode UI, no text, no
   watermark, photorealistic"

   دليل الفيديو (jersey-video.jpg):
   "Photorealistic close-up of a video editing timeline on a laptop
   screen showing a highlighted cut segment, dark mode UI, no text,
   no watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_NUMBER_19;
  const a = c.suspects.find(s => s.id === 'coach_ashraf');
  if (a) {
    const q = a.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "عمر اكتشف مشكلة في تسجيل سن حسام وواجهني، وأنا حاولت أوقفه عن التصعيد. بعد اختفائه حصلت تصرفات غبية من الإدارة عشان نبعد الشبهة عن الملف، لكن لازم تفرقوا بين التغطية وبين إن حد خطفه."';
    }
  }
  c.conclusiveEvidenceIds = ['age_doubt','gps_location','training_video_cut','omar_safe_message'];
  c.conclusiveRequired = 4;
})();
