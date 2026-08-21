/* ============================================================
   بيانات قضية: الدقيقة 93
   قضية قتل — مهاجم بيسجل هدف الفوز في الدقيقة 93، وبعد الماتش
   بينهار وبيموت. المادة اتحطت عشان تسقطه في تحليل منشطات، مش
   عشان تقتله، لكن الجرعة اتقدرت غلط.
   ============================================================ */

const IMG_BASE_MIN93 = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/93rd-minute/';

const CASE_93RD_MINUTE = {
  id: '93rd-minute',
  title: 'الدقيقة 93',
  caseNo: 'CASE 027',
  subtitle: 'استاد كبير، ليلة ماتش حاسم — بداية المباراة 8:00 مساءً',
  coverImg: IMG_BASE_MIN93 + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 32,
  investigationPoints: 18,
  teaser: 'مهاجم بيسجل هدف الفوز، وبعد الماتش بربع ساعة بيموت في غرفة الملابس. الاتهام الأول: منشطات. لكن اللاعب ده أصلاً بيرفض حتى الفيتامينات.',

  isPremium: false,
  categories: ['sports', 'murder'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_MIN93 + 'cover.webp',
    heroCaption: 'CASE 027 — بعد هدف الفوز بدقايق',
    text1: 'مهاجم الفريق، "بيشوي"، سجل هدف الفوز في الدقيقة 93 من ماتش حاسم. بعد الماتش مباشرة، انهار في غرفة الملابس ومات. التحليل الطبي كشف مادة منشطة محظورة بجرعة خطيرة جدًا في جسمه، والاتهام الأولي راح فورًا للاعب نفسه: منشطات عشان يكسب.',
    text2: 'المشكلة إن بيشوي معروف إنه بيرفض حتى المكملات الغذائية العادية من غير إشراف مباشر من دكتور الفريق. مدرب الفريق طلب منك تحقق قبل ما سمعة اللاعب الميت تتلطخ بتهمة مش حقيقية، وقبل ما الفاعل الحقيقي يفلت.',
    meta: [
      { label:'المجني عليه', value:'بيشوي — مهاجم، سجل هدف الفوز' },
      { label:'الاتهام الأولي', value:'تعاطي منشطات محظورة' },
      { label:'التناقض', value:'اللاعب معروف برفضه حتى المكملات العادية' },
      { label:'طلب التحقيق', value:'مدرب الفريق' },
      { label:'بداية المباراة', value:'8:00 مساءً' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — هدف الفوز',
      img: IMG_BASE_MIN93 + 'min93-scene1.jpg',
      text:'الدقيقة 93، بيشوي بيسجل هدف الفوز، الاستاد بينفجر فرحة، وزملاؤه بيحملوه على الأكتاف احتفالًا.'
    },
    {
      scene:'المشهد ٢ — الانهيار',
      img: IMG_BASE_MIN93 + 'min93-scene2.jpg',
      text:'في غرفة الملابس بعد الماتش، بيشوي بيبدأ يحس بدوخة شديدة، وبعد دقايق بينهار تمامًا وسط ذعر زملائه.'
    },
    {
      scene:'المشهد ٣ — التحليل الطبي',
      img: IMG_BASE_MIN93 + 'min93-scene3.jpg',
      text:'الفحص الطبي الطارئ بيكشف مادة منشطة محظورة بجرعة عالية جدًا في جسمه، أعلى بكتير من أي جرعة تحسين أداء عادية.',
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_MIN93 + 'min93-scene4.jpg',
      text:'مدرب الفريق بيديك صلاحية تراجع زجاجات المياه المستخدمة، سجل التبديلات، وكاميرات الملعب الجانبية.'
    },
  ],

  suspects: [
    {
      id:'karim_backup', name:'كريم', role:'المهاجم البديل، كان محتاج مكانه الأساسي', img: IMG_BASE_MIN93 + 'karim.jpg', avatarEmoji:'⚽',
      alibi:'قال إنه كان على دكة البدلاء طول الماتش زي أي لاعب احتياطي.',
      questions:[
        { q:'إحساسك إيه لما بيشوي سجل هدف الفوز؟',
          a:'"فرحت للفريق طبعًا. أكيد نفسي ألعب أساسي، بس مش على حساب بيشوي ولا بالطريقة دي."' },
        { q:'كنت قريب من زجاجات المياه أو المعدات قبل الماتش؟', unlockId:'karim_bottle_access',
          a:'"كنت بمر على منطقة المعدات زي باقي اللعيبة، إنما ما لمستش زجاجة بيشوي ولا كان عندي سبب أعمل كده."' },
      ]
    },
    {
      id:'coach_medhat', name:'المدرب مدحت', role:'مدرب الفريق، طلب التحقيق', img: IMG_BASE_MIN93 + 'medhat.jpg', avatarEmoji:'📋',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'إيه اللي خلاك مش مقتنع بتهمة تعاطي المنشطات؟',
          a:'"بيشوي كان بيرفض حتى الفيتامينات العادية من غير إشراف الدكتور، كان حذر جدًا من أي حاجة تدخل جسمه."' },
        { q:'مين اللي بيتحكم في زجاجات المياه أثناء الماتش؟', unlockId:'water_bottle_protocol',
          a:'"كل لاعب له زجاجة مميزة برقمه، مسؤول المعدات هو اللي بيجهزها ويوزعها قبل الماتش."' },
      ]
    },
    {
      id:'equipment_manager_tamer', name:'تامر', role:'مسؤول معدات الفريق', img: IMG_BASE_MIN93 + 'tamer.jpg', avatarEmoji:'🧴',
      alibi:'قال إنه بس جهّز الزجايز حسب البروتوكول المعتاد.',
      questions:[
        { q:'إنت المسؤول عن تجهيز زجاجات المياه، صح؟', unlockId:'bottle_prep',
          a:'"أيوه، بجهزها كلها قبل الماتش بساعة تقريبًا، وبحط رقم كل لاعب على زجاجته الخاصة."' },
        { q:'حد قدر يوصل للزجايز بعد ما تتجهز؟',
          a:'"بعد ما بجهزها، بتحط في ثلاجة صغيرة جنب الدكة. المنطقة نفسها مش مقفولة، بس المفروض محدش يلمس زجاجة لاعب غير مسؤول المعدات واللاعب نفسه."' },
        { q:'زجاجة بيشوي بالذات كانت مميزة إزاي؟', requires:['bottle_prep'],
          a:'"زي أي زجاجة تانية، برقمه بس، مفيش أي حاجة مميزة غير كده."' },
      ]
    },
    {
      id:'agent_sherif', name:'شريف', role:'وكيل أعمال كريم، بيدفع صفقة انتقال جديدة لموكله', img: IMG_BASE_MIN93 + 'sherif.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في المدرجات كضيف عادي طول الماتش.',
      questions:[
        { q:'إيه مصلحتك في نجاح كريم بالذات؟', unlockId:'transfer_pressure',
          a:'"عندي صفقة انتقال ضخمة لكريم لنادي كبير، بس الصفقة مشروطة إنه يبقى الأساسي في الفريق، ومكانه محجوز طول ما بيشوي أساسي."' },
        { q:'كنت قريب من غرفة تجهيز المعدات في أي وقت؟', unlockId:'sherif_seen_near',
          a:'(بيتردد) "مريت من ناحية المنطقة دي، بس ماكنتش قاصد أي حاجة، كنت بدور على كريم بس."' },
        { q:'الكاميرا والشاهد حطوك عند ثلاجة الزجايز في نفس التوقيت، وصفقة كريم كانت هتقع لو فضل احتياطي — عايز تفسر؟', requires:['sherif_seen_near','transfer_pressure','sideline_camera_footage'], closesInterrogation:true,
          a:'(بيتوتر وبيحاول يثبت صوته) "أيوه كنت عند الثلاجة، بس ده مش معناه إني لمست زجاجة بيشوي. كنت بدور على كريم، ومريت من المنطقة دي زي ما قلتلك. وجودي هناك مش دليل إني عملت حاجة."' },
      ]
    },
  ],

  evidence: [
    { id:'toxicology_report', tag:'من التحليل الطبي', crit:true, title:'جرعة منشطات خطيرة', img: IMG_BASE_MIN93 + 'min93-report.jpg',
      short:'مادة محظورة بتركيز خطير ومش منطقي كاستخدام رياضي',
      full:'التحليل الطبي كشف مادة محظورة بتركيز خطير، وكمان بقايا من نفس المادة في زجاجة بيشوي. التركيز مش منطقي كاستخدام لتحسين الأداء، وبيخلّي فرضية إن حد لوّث الزجاجة عشان يضمن نتيجة تحليل إيجابية أقوى من فرضية إن بيشوي أخدها بإرادته.',
      unlocked:true, order:1 },

    { id:'karim_bottle_access', tag:'من استجواب كريم', crit:false, title:'وصول كريم العام للمعدات', img:null,
      short:'وصول عادي زي أي لاعب في الفريق',
      full:'كريم أكد وصوله العام للمعدات زي أي لاعب تاني، من غير أي تفصيل مريب مباشر.',
      unlocked:false, order:2 },

    { id:'water_bottle_protocol', tag:'من استجواب المدرب مدحت', crit:false, title:'بروتوكول توزيع الزجايز', img:null,
      short:'كل لاعب له زجاجة برقمه الخاص',
      full:'المدرب مدحت أكد إن كل لاعب له زجاجة مياه مميزة برقمه الخاص، بيجهزها مسؤول المعدات قبل الماتش.',
      unlocked:false, order:3 },

    { id:'bottle_prep', tag:'من استجواب تامر', crit:true, title:'تفاصيل تجهيز زجاجات المياه', img:null,
      short:'الزجايز بتتحط في ثلاجة قريبة من دكة البدلاء، مش مقفولة بصرامة',
      full:'تامر أكد إن الزجايز بتتحط في ثلاجة صغيرة قريبة من دكة البدلاء، من غير قفل صارم، يعني أي حد من الطاقم أو المحيطين ممكن يوصلها.',
      unlocked:false, order:4 },

    { id:'transfer_pressure', tag:'من استجواب شريف', crit:true, title:'ضغط صفقة انتقال كريم', img:null,
      short:'الصفقة مشروطة بإن كريم يبقى الأساسي',
      full:'شريف اعترف إن صفقة انتقال كريم الضخمة مشروطة بإنه يبقى اللاعب الأساسي، وده كان مستحيل طول ما بيشوي أساسي في الفريق.',
      unlocked:false, order:5 },

    { id:'staff_witness_lead', tag:'من ربط الأدلة', crit:false, title:'خيط: اسأل طاقم الملعب', img:null,
      short:'الدافع + سهولة الوصول للثلاجة يخلّوا سؤال الطاقم خطوة منطقية',
      full:'بعد ما عرفت إن منطقة الزجايز كانت متاحة نسبيًا وإن شريف عنده دافع مباشر، بقى منطقي تسأل طاقم الملعب مين كان موجود قرب الثلاجة في ساعة تجهيز الزجاجات.',
      unlocked:false, order:6 },

    { id:'sherif_seen_near', tag:'من شهادة عامل الملعب', crit:true, title:'شريف قريب من ثلاجة الزجايز', img:null,
      short:'شاهد أكد وجوده قريب من الثلاجة قبل الماتش بساعة',
      full:'عامل من طاقم الملعب أكد إنه شاف شريف واقف عند منطقة ثلاجة الزجايز قبل الماتش بساعة تقريبًا، رغم إن مكانه الطبيعي كوكيل لاعبين كان بعيد عن منطقة المعدات.',
      unlocked:false, order:7 },

    { id:'sideline_camera_footage', tag:'من كاميرا الملعب الجانبية', crit:true, title:'تسجيل يوضح شريف عند الثلاجة', img: IMG_BASE_MIN93 + 'min93-cam.jpg',
      short:'شريف ظاهر بيقرب من ثلاجة الزجايز في التوقيت الحرج',
      full:'كاميرا الملعب الجانبية بتوضح شريف داخل منطقة المعدات وواقف قدام ثلاجة الزجايز في نفس التوقيت اللي حدده العامل، وبعدها بيرجع ناحية المدرجات.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },

  cameraPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الكاميرات',
    introText: 'كاميرا الملعب الجانبية بتغطي من الساعة 6 مساءً لحد 9 بالليل. راجع التسجيل وحدد أي دخول غير معتاد لمنطقة تجهيز زجاجات المياه خلال الفترة الحرجة قبل بداية المباراة.',
    resultText: 'ظبطت اللحظة الصح. الكاميرا بتوضح شريف داخل منطقة المعدات وواقف عند ثلاجة الزجايز حوالي الساعة 7:00، قبل بداية المباراة بساعة تقريبًا.',
    startHour24: 18,
    totalMinutes: 180,
    targetMinutes: 60,
    toleranceMinutes: 8,
    resultEvidenceIds: ['sideline_camera_footage'],
  },

  evidenceCombinations: [
    { parts:['bottle_prep','transfer_pressure'], resultId:'staff_witness_lead' },
  ],

  correctSuspectId: 'agent_sherif',
  conclusiveEvidenceIds: ['toxicology_report', 'transfer_pressure', 'sherif_seen_near', 'sideline_camera_footage', 'bottle_prep'],
  conclusiveRequired: 4,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن شريف هو الفاعل؟',
        options: [
          { id:'a', text:'دافعه المالي الواضح من صفقة كريم + شهادة العامل وكاميرا الملعب اللي أثبتوا وجوده عند ثلاجة الزجايز' },
          { id:'b', text:'لأنه وكيل أعمال وده يكفي' },
          { id:'c', text:'لأنه تردد وقت السؤال' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية شريف الحقيقية؟',
        options: [
          { id:'a', text:'ماكنش مخطط للقتل؛ كان عايز يلوّث زجاجة بيشوي عشان تحليله يطلع إيجابي ويتوقف، لكن الكمية اللي استخدمها كانت أخطر بكتير من اللي توقعه' },
          { id:'b', text:'كان ناوي يقتله من البداية عشان مصلحة موكله' },
          { id:'c', text:'كان بيحاول يحسن أداء بيشوي بالغلط' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الحقيقة أبعد من تهمة المنشطات',
      paragraphs:[
        'بعد ما واجهته بالأدلة كاملة، شريف انهار واعترف: كان تحت ضغط صفقة انتقال كبيرة لموكله كريم، ومكان كريم في الصفقة مرتبط بإنه يلعب أساسي. خطته ماكانتش قتل بيشوي؛ كان عايز يلوّث زجاجته بمادة محظورة عشان تحليله يطلع إيجابي ويتوقف فترة. لكنه استخدم كمية أخطر بكتير من اللي توقعها، وده انتهى بوفاة بيشوي.',
        'اللي حاصره كان وجود نفس المادة في زجاجة بيشوي، وشهادة عامل الملعب، والكاميرا اللي حطته عند الثلاجة، ودافعه المرتبط بصفقة كريم. التحقيق أثبت إن بيشوي ماخدش المادة بإرادته، وشريف اتحال للتحقيق في مسؤوليته عن الوفاة والتلاعب المتعمد بزجاجة اللاعب.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية شريف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'لازم تربط التقرير الطبي بدافع شريف ووجوده الفعلي عند منطقة الزجايز قبل ما الاتهام يبقى متماسك.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسمعة بيشوي فضلت ملطخة بتهمة مالهاش أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الدقيقة 93"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty football locker room at night,
   a single unattended water bottle on a bench, dramatic dim
   lighting, documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (min93-scene1.jpg):
   "Photorealistic wide shot of a football stadium at night, players
   celebrating a winning goal, bright floodlights, cheering crowd,
   photorealistic, no text, no watermark"

   المشهد ٢ (min93-scene2.jpg):
   "Photorealistic dramatic shot of a football locker room, players
   gathered in concern around a teammate, dim lighting, tense
   atmosphere, photorealistic, no text, no watermark"

   المشهد ٣ (min93-scene3.jpg):
   "Photorealistic shot of medical staff examining lab results in a
   stadium medical room, clinical lighting, photorealistic, no text,
   no watermark"

   المشهد ٤ (min93-scene4.jpg):
   "Photorealistic shot of an empty stadium sideline area at dusk,
   equipment coolers near the bench, quiet atmosphere, photorealistic,
   no text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   كريم (karim.jpg):
   "Photorealistic portrait of a young Egyptian male football player,
   athletic build, wearing a substitute's tracksuit, standing on the
   sideline with a slightly frustrated expression, stadium floodlight
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   المدرب مدحت (medhat.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male football
   coach, short greying hair, wearing a team tracksuit with a
   whistle around his neck, serious authoritative expression,
   stadium sideline lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   تامر (tamer.jpg):
   "Photorealistic portrait of a young Egyptian male sports
   equipment manager, wearing a team polo shirt, standing near
   water bottles and coolers, nervous expression, locker room
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   شريف (sherif.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male sports
   agent, sharp business casual attire, holding a phone, confident
   but calculating expression, stadium corridor lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   دليل التقرير الطبي (min93-report.jpg):
   "Photorealistic close-up of a medical toxicology report document
   with charts, clinical lighting, no text, no watermark,
   photorealistic"

   دليل الكاميرا (min93-cam.jpg):
   "Photorealistic security camera style still frame of a man near a
   stadium sideline equipment cooler at dusk, grainy surveillance
   footage look, no text, no watermark, photorealistic"
   ============================================================ */
