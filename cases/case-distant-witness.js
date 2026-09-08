/* ============================================================
   بيانات قضية: شاهدة من بعيد
   حادثة دهس وهروب في شارع سكني هادي، وشاهدة عيان وحيدة بتحدد
   لون العربية والسواق. لكن الإضاءة الضعيفة والمسافة بعيدة —
   وهي غلطانة في التفاصيل الأهم.
   ============================================================ */

const IMG_BASE_DISTANTWITNESS = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/distant-witness/';

const CASE_DISTANT_WITNESS = {
  id: 'distant-witness',
  title: 'شاهدة من بعيد',
  caseNo: 'CASE 071',
  subtitle: 'شارع سكني هادي، مدينة الشروق، القاهرة',
  coverImg: IMG_BASE_DISTANTWITNESS + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 49,
  investigationPoints: 23,
  teaser: 'رجل بيتعرض لحادثة دهس وهروب في شارع هادي بالليل. شاهدة عيان وحيدة بتؤكد لون العربية والسواق بثقة كاملة، لكن المسافة والإضاءة الضعيفة خلّوها تخلط بين شخصين متشابهين — والمتهم الحقيقي مش اللي فكرت فيه.',

  isPremium: false,
  categories: ['accident', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_DISTANTWITNESS + 'cover.webp',
    heroCaption: 'CASE 071 — الشاهدة متأكدة... بس غلطانة',
    text1: 'رجل يدعى "عادل" اتعرض لحادثة دهس وهروب في شارع سكني هادي حوالي الساعة 11 بالليل. الشاهدة الوحيدة، جارة اسمها "فايزة"، شافت الحادثة من شرفتها في الطابق التالت، وأكدت إن العربية كانت "فضية" والسواق "شاب نحيف بقميص فاتح".',
    text2: 'بناءً على وصفها، الشك وقع فورًا على أحد جيران الشارع، لكن المسافة والإضاءة الضعيفة بالليل بتخلي وصف فايزة أقل دقة مما تتخيل. طلب منك عادل تحقق قبل ما التهمة تتثبت على شخص غلط.',
    meta: [
      { label:'الضحية', value:'عادل — اتعرض لحادثة دهس وهروب' },
      { label:'الشاهدة الوحيدة', value:'فايزة — جارة، شافت الحادثة من شرفتها' },
      { label:'الوصف المعلن', value:'عربية فضية، سواق شاب نحيف بقميص فاتح' },
      { label:'طلب التحقيق', value:'عادل، الضحية نفسه' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — ليلة عادية', img: IMG_BASE_DISTANTWITNESS + 'scene1.jpg',
      text:'عادل بيمشي في طريقه لبيته في شارع هادي بالليل، والإضاءة في الشارع ضعيفة نسبيًا.' },
    { scene:'المشهد ٢ — الحادثة', img: IMG_BASE_DISTANTWITNESS + 'scene2.jpg',
      text:'عربية بتظهر فجأة وتصدم عادل، وبعدها بتهرب بسرعة من غير ما تقف.' },
    { scene:'المشهد ٣ — الشاهدة', img: IMG_BASE_DISTANTWITNESS + 'scene3.jpg',
      text:'فايزة بتشوف الحادثة من شرفتها في الطابق التالت، من مسافة بعيدة نسبيًا وفي إضاءة ضعيفة.' },
    { scene:'المشهد ٤ — التحقيق', img: IMG_BASE_DISTANTWITNESS + 'scene4.jpg',
      text:'بناءً على وصف فايزة، الشرطة بتبدأ تدوّر على "شاب نحيف بقميص فاتح وعربية فضية" في الحي.' },
  ],

  suspects: [
    {
      id:'neighbor_khaled', name:'خالد', role:'جار الحي، يمتلك عربية فضية اللون', img: IMG_BASE_DISTANTWITNESS + 'khaled.jpg', avatarEmoji:'🚗',
      alibi:'قال إنه كان في بيته طول الليلة، وعربيته متوقفة في الجراج طول الوقت.',
      loseMsg:'خالد فعلًا كان في بيته طول الليلة، وكاميرا الجراج الخاصة بيه بتؤكد إن عربيته ماتحركتش خالص وقت الحادثة. الشبه اللي وصفته فايزة (شاب نحيف، عربية فضية) ينطبق على شخص تاني في الحي، مش عليه تحديدًا. اتهامه هيكون خطأ في هوية بسبب تشابه سطحي بس.',
      questions:[
        { q:'إنت صاحب عربية فضية في الحي، صح؟',
          a:'"أيوه، بس عربيتي ماتحركتش من الجراج طول الليلة دي، عندي كاميرا بتأكد ده."' },
        { q:'حد تاني في الحي عنده عربية شبه عربيتك؟', unlockId:'similar_car_hint',
          a:'"في شاب ساكن في الشارع اللي وراني، طارق، عنده عربية فضية شبه عربيتي تمامًا، حتى الموديل قريب."' },
      ],
      confrontations:{}
    },
    {
      id:'delivery_tarek', name:'طارق', role:'سائق توصيل، يعمل بعربية فضية مستأجرة', img: IMG_BASE_DISTANTWITNESS + 'tarek-driver.jpg', avatarEmoji:'📦',
      alibi:'قال إنه كان في آخر توصيلة له في نفس الحي في نفس التوقيت تقريبًا.',
      questions:[
        { q:'إنت كنت شغال في الحي وقت الحادثة؟', unlockId:'tarek_delivery_route',
          a:'"أيوه، كانت آخر توصيلة عندي في نفس الليلة، وكنت ماشي في نفس الشارع تقريبًا."' },
        { q:'ليه ماوقفتش لما حصلت الحادثة؟', requires:['tarek_delivery_route'],
          a:'"معرفش عن أي حادثة أصلًا، أنا كملت طريقي عادي وسلمت الطلبية وخلاص."' },
        { q:'سجل تطبيق التوصيل بيوضح توقف مفاجئ في مسارك لمدة دقيقتين في نفس مكان وتوقيت الحادثة — تفسر ده إزاي؟', unlockId:'tarek_gps_stop', requires:['tarek_delivery_route'], closesInterrogation:true,
          a:'(بيتردد) "وقفت شوية أراجع العنوان على الخريطة، ده كل اللي حصل."' },
      ],
      confrontations:{
        similar_car_hint:'عربيتي شبه عربية خالد فعلًا، بس ده صدفة مش دليل.',
      }
    },
    {
      id:'ex_partner_mostafa', name:'مصطفى', role:'شريك عمل سابق لعادل، خلاف مالي قديم', img: IMG_BASE_DISTANTWITNESS + 'mostafa.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في مدينة تانية تمامًا وقت الحادثة، بعيد عن مكان الواقعة خالص.',
      questions:[
        { q:'كان فيه خلاف بينك وبين عادل؟', unlockId:'business_dispute_hint',
          a:'"أيوه، خلاف مالي قديم من شراكة سابقة، بس اتحل من زمان بالتراضي."' },
        { q:'عربيتك لونها إيه؟', unlockId:'mostafa_car_color',
          a:'"عربيتي سودة، مالهاش أي علاقة بالوصف اللي فايزة قالته."' },
      ],
      confrontations:{}
    },
    {
      id:'witness_fayza', name:'فايزة', role:'الجارة الشاهدة على الحادثة', img: IMG_BASE_DISTANTWITNESS + 'fayza.jpg', avatarEmoji:'👀',
      alibi:'كانت في شقتها في الطابق التالت وقت الحادثة، شافت المشهد من شرفتها.',
      questions:[
        { q:'إنتِ متأكدة من وصف العربية والسواق؟', unlockId:'fayza_confidence_hint',
          a:'"متأكدة مية بالمية، شفت العربية الفضية والشاب النحيف بقميص فاتح بوضوح."' },
        { q:'المسافة كانت قد إيه بينك وبين مكان الحادثة؟', requires:['fayza_confidence_hint'], unlockId:'fayza_distance_hint',
          a:'"كنت في الطابق التالت، يعني بعيدة شوية، بس الإضاءة كانت كفاية إني أشوف بوضوح."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'accident_report', tag:'من بلاغ الحادثة', crit:false, title:'بلاغ حادثة الدهس والهروب', img:null,
      short:'بلاغ رسمي بحادثة دهس وهروب في الشارع السكني',
      full:'البلاغ الرسمي بيوثق حادثة دهس وهروب لعادل في شارع سكني هادي، بناءً على شهادة الجارة فايزة الوحيدة.',
      unlocked:true, order:1 },

    { id:'fayza_confidence_hint', tag:'من استجواب فايزة', crit:false, title:'ثقة فايزة الكاملة في وصفها', img:null,
      short:'فايزة أكدت وصفها للعربية والسواق بثقة كاملة',
      full:'فايزة أكدت وصفها للعربية الفضية والسواق النحيف بقميص فاتح بثقة كاملة، من غير أي تردد ظاهر.',
      unlocked:false, order:2 },

    { id:'fayza_distance_hint', tag:'من استجواب فايزة', crit:true, title:'المسافة والإضاءة الفعلية', img: IMG_BASE_DISTANTWITNESS + 'evidence-balcony.jpg',
      short:'فايزة كانت في الطابق التالت بمسافة وإضاءة ضعيفة نسبيًا',
      full:'فايزة أكدت إنها كانت في الطابق التالت، بمسافة وإضاءة ضعيفة نسبيًا وقت الحادثة، رغم تأكيدها على الوضوح الكامل لما شافته.',
      unlocked:false, order:3 },

    { id:'similar_car_hint', tag:'من استجواب خالد', crit:false, title:'تشابه عربية طارق بعربية خالد', img:null,
      short:'طارق عنده عربية فضية شبه عربية خالد تمامًا',
      full:'خالد كشف إن سائق التوصيل طارق عنده عربية فضية بموديل قريب جدًا من عربيته الشخصية، مما يفسر احتمال الخلط بينهم من مسافة بعيدة.',
      unlocked:false, order:4 },

    { id:'tarek_delivery_route', tag:'من استجواب طارق', crit:false, title:'مسار توصيل طارق في نفس الحي', img:null,
      short:'طارق كان في نفس الحي والتوقيت تقريبًا بحكم شغله',
      full:'طارق أكد إنه كان في نفس الحي في نفس التوقيت تقريبًا، ضمن آخر توصيلة له في تلك الليلة.',
      unlocked:false, order:5 },

    { id:'business_dispute_hint', tag:'من استجواب مصطفى', crit:false, title:'خلاف مالي قديم مع عادل', img:null,
      short:'مصطفى أكد وجود خلاف مالي قديم اتحل بالتراضي',
      full:'مصطفى أكد وجود خلاف مالي قديم مع عادل من شراكة سابقة، لكنه أكد إنه اتحل بالتراضي من فترة طويلة.',
      unlocked:false, order:6 },

    { id:'mostafa_car_color', tag:'من استجواب مصطفى', crit:false, title:'لون عربية مصطفى', img:null,
      short:'عربية مصطفى سودة، مش فضية زي وصف الشاهدة',
      full:'مصطفى أكد إن عربيته لونها أسود، وهو لون مختلف تمامًا عن وصف الشاهدة للعربية الفضية.',
      unlocked:false, order:7 },

    { id:'tarek_gps_stop', tag:'من سجل تطبيق التوصيل', crit:true, title:'توقف طارق المفاجئ في مكان الحادثة', img: IMG_BASE_DISTANTWITNESS + 'evidence-gps.jpg',
      short:'سجل GPS يوضح توقف طارق دقيقتين في نفس مكان وتوقيت الحادثة',
      full:'سجل تطبيق التوصيل بيوضح توقف مفاجئ في مسار طارق لمدة دقيقتين، في نفس مكان وتوقيت حادثة الدهس بالظبط.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن ثقة فايزة الكاملة في وصفها بتأكيدها اللاحق على المسافة والإضاءة الضعيفة. فيه تناقض بين درجة اليقين والظروف الفعلية للرؤية.',
    resultText: 'التناقض واضح: فايزة أكدت وصفها بثقة "مية بالمية"، لكنها بنفسها اعترفت إنها كانت في الطابق التالت بمسافة وإضاءة ضعيفة — وده يفتح احتمال حقيقي للخلط بين شخصين متشابهين شكليًا.',
    resultEvidenceIds: ['fayza_distance_hint'],
    statements: [
      { id:'st1', text:'"متأكدة مية بالمية، شفت العربية الفضية والشاب النحيف بقميص فاتح بوضوح."', source:'فايزة — أول الاستجواب' },
      { id:'st2', text:'"كنت في الطابق التالت، يعني بعيدة شوية، بس الإضاءة كانت كفاية."', source:'فايزة — لاحقًا في نفس الاستجواب' },
      { id:'st3', text:'"طارق عنده عربية فضية شبه عربيتي تمامًا، حتى الموديل قريب."', source:'خالد — في الاستجواب' },
      { id:'st4', text:'"عربيتي سودة، مالهاش أي علاقة بالوصف."', source:'مصطفى — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  witnessReliabilityPuzzle: {
    enabled: true,
    tabLabel: 'تقييم مصداقية الشهادة',
    introText: 'قارن رواية فايزة عن الحادثة برواية خالد عن حجم التشابه بين عربيته وعربية طارق، وقيّم مين شهادته أقرب فعليًا للحقيقة المادية.',
    resultText: 'رواية خالد عن التشابه الشديد بين العربيتين، مع تأكيد سجل GPS لتوقف طارق في نفس مكان وتوقيت الحادثة، بتكشف إن شهادة فايزة تأثرت بالتشابه الشكلي من مسافة بعيدة.',
    testimonies: [
      { suspectId:'neighbor_khaled', text:'"طارق عنده عربية فضية شبه عربيتي تمامًا، حتى الموديل قريب."', reliabilityScore: 80 },
      { suspectId:'witness_fayza', text:'"متأكدة مية بالمية من العربية الفضية والسواق النحيف."', reliabilityScore: 35 },
    ],
    correctSuspectId: 'delivery_tarek',
    resultEvidenceIds: ['tarek_gps_stop'],
  },

  evidenceCombinations: [
    { parts:['similar_car_hint','fayza_distance_hint'], resultId:'tarek_gps_stop' },
  ],

  investigationActions: [
    {
      id:'crosscheck_delivery_app', kind:'مراجعة تطبيق التوصيل', label:'راجع سجل GPS الكامل لرحلة طارق',
      description:'قارن توقيت التوقف المفاجئ في مسار طارق بتوقيت بلاغ الحادثة الرسمي.',
      requires:['tarek_delivery_route','fayza_distance_hint'], resultEvidenceIds:['tarek_gps_stop'],
      successText:'المراجعة أكدت إن التوقف حصل في نفس دقيقة بلاغ الحادثة بالظبط.'
    },
  ],

  correctSuspectId: 'delivery_tarek',
  conclusiveEvidenceIds: ['tarek_gps_stop', 'similar_car_hint', 'fayza_distance_hint'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن طارق هو السواق الحقيقي؟',
        options: [
          { id:'a', text:'سجل GPS أثبت توقفه في نفس مكان وتوقيت الحادثة + تشابه عربيته الشديد بعربية خالد + اعتراف فايزة بضعف الرؤية الفعلي' },
          { id:'b', text:'لأنه كان في نفس الحي وقت الحادثة وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بلحظة الحادثة نفسها' },
          { id:'c', text:'لأنه كان متردد وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotkhaled',
        label:'ليه خالد كان بريء رغم إن وصف الشاهدة ينطبق عليه؟',
        options: [
          { id:'a', text:'كاميرا الجراج الخاصة بيه أثبتت إن عربيته ماتحركتش خالص، والتشابه كان مجرد صدفة شكلية بين عربيتين من نفس الموديل واللون' },
          { id:'b', text:'لأنه صاحب عربية فضية وده افتراض عام مبني على اللون بس، مش نتيجة تحقيق فعلي في تحركاته الحقيقية' },
          { id:'c', text:'لأنه تعاون في الاستجواب بصراحة، وده سلوك متعاون بس مش إثبات مباشر على براءته الكاملة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الشبه اللي كاد يدين البريء',
      paragraphs:[
        'طارق، سائق التوصيل، كان فعلًا سبب حادثة الدهس والهروب، مستغلًا عربيته الفضية المستأجرة اللي بالصدفة شبه عربية خالد تمامًا. لما شافت فايزة الحادثة من بعيد وفي إضاءة ضعيفة، خلطت شكليًا بين العربيتين المتشابهتين.',
        'اللي قفل الدائرة كان سجل GPS تطبيق التوصيل اللي أثبت توقف طارق في نفس مكان وتوقيت الحادثة، وتشابه العربيتين اللي فسّر خطأ الشاهدة، واعتراف فايزة نفسها بضعف ظروف الرؤية الفعلية.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية طارق، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عنها وصف الشاهدة الأصلي.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: سجل GPS، تشابه العربيتين، وضعف ظروف رؤية الشاهدة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والسواق الحقيقي فضل حر يشتغل في نفس الحي. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "شاهدة من بعيد"

   الغلاف (cover.webp):
   "Photorealistic night shot of a quiet residential street with dim
   streetlights, documentary photography style, no text, no
   watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a man walking alone on a dimly lit
   residential street at night, photorealistic, no text, no
   watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic dramatic shot of a silver car speeding away on a
   dark street at night, motion blur, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a woman looking down from a third-floor
   balcony at night, distant street view, photorealistic, no text,
   no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of police officers investigating a
   residential street at night, photorealistic, no text, no
   watermark"

   الشخصيات:

   خالد (khaled.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, calm
   expression, standing near a silver car, photorealistic, no text,
   no watermark"

   طارق السائق (tarek-driver.jpg):
   "Photorealistic portrait of a young Egyptian delivery driver in
   casual clothes, nervous expression, photorealistic, no text, no
   watermark"

   مصطفى (mostafa.jpg):
   "Photorealistic portrait of a middle-aged Egyptian businessman,
   composed expression, photorealistic, no text, no watermark"

   فايزة (fayza.jpg):
   "Photorealistic portrait of an elderly Egyptian woman standing on
   a balcony, photorealistic, no text, no watermark"

   أدلة:
   evidence-balcony.jpg: "Photorealistic shot of a view from a
   third-floor balcony looking down at a dim street at night,
   photorealistic, no text, no watermark"
   evidence-gps.jpg: "Photorealistic close-up of a smartphone screen
   showing a delivery app GPS route map, photorealistic, no text, no
   watermark"
   ============================================================ */
