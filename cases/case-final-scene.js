/* ============================================================
   بيانات قضية: المشهد الأخير
   جريمة قتل في استوديو تصوير فيلم — كاسكيدير بيموت في مشهد
   خطر أثناء بروفة، والجميع فاكرين إنها حادثة، لكن الكاميرات
   بتقول حاجة تانية خالص.
   ============================================================ */

const IMG_BASE_FINALSCENE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/final-scene/';

const CASE_FINAL_SCENE = {
  id: 'final-scene',
  title: 'المشهد الأخير',
  caseNo: 'CASE 063',
  subtitle: 'استوديو تصوير سينمائي، مدينة الإنتاج الإعلامي، القاهرة',
  coverImg: IMG_BASE_FINALSCENE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 55,
  investigationPoints: 26,
  teaser: 'كاسكيدير محترف بيموت أثناء بروفة مشهد سقوط خطر، والفريق كله متأكد إنها حادثة تصوير عادية. لكن كاميرات المراقبة بتاعة الاستوديو بتحكي قصة مختلفة تمامًا عن توقيت الوفاة الحقيقي.',

  isPremium: false,
  categories: ['murder', 'entertainment'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FINALSCENE + 'cover.webp',
    heroCaption: 'CASE 063 — بروفة انتهت بجثة حقيقية',
    text1: 'أثناء تصوير الجزء الأخير من فيلم أكشن كبير، مات الكاسكيدير "سامي فوزي" في بروفة مشهد سقوط من ارتفاع، مفروض يكون مؤمّن بالكامل بحبال وشباك أمان. التقرير الأولي قال إن الحبل اتقطع بسبب إهمال فني.',
    text2: 'المخرجة "هالة" مش مقتنعة، لأن سامي كان أخبر فني محترف وماكانش يقبل ينزل من غير ما يتأكد من كل حاجة بنفسه. طلبت منك تراجع كل حاجة قبل ما التحقيق الرسمي يقفل الملف كحادث عمل عادي.',
    meta: [
      { label:'الضحية', value:'سامي فوزي — كاسكيدير محترف، 12 سنة خبرة' },
      { label:'مكان الوفاة', value:'ستوديو 4، مشهد سقوط من ارتفاع 8 أمتار' },
      { label:'الرواية الرسمية', value:'حادثة تصوير بسبب عطل في معدات الأمان' },
      { label:'طلب التحقيق', value:'هالة، مخرجة الفيلم' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — يوم التصوير', img: IMG_BASE_FINALSCENE + 'scene1.jpg',
      text:'استوديو ضخم مجهز بشباك أمان وحبال تسلق، وطاقم كامل من الفنيين والممثلين بيجهزوا لتصوير أخطر مشهد في الفيلم.' },
    { scene:'المشهد ٢ — البروفة', img: IMG_BASE_FINALSCENE + 'scene2.jpg',
      text:'سامي بيرتدي معدات الأمان ويتسلق المنصة العالية. المخرجة بتنادي "أكشن" للبروفة الأخيرة قبل التصوير الفعلي.' },
    { scene:'المشهد ٣ — السقوط', img: IMG_BASE_FINALSCENE + 'scene3.jpg',
      text:'سامي بينزل من الارتفاع، لكن الحبل بيتقطع فجأة في نص الطريق. صراخ في الاستوديو، والجميع بيجري ناحيته، لكن الوقت كان فات.' },
    { scene:'المشهد ٤ — بعد الصدمة', img: IMG_BASE_FINALSCENE + 'scene4.jpg',
      text:'التصوير اتوقف بالكامل. المحقق الرسمي بدأ إجراءات حادثة عمل عادية، لكن هالة حاسة إن فيه حاجة ناقصة في القصة.' },
  ],

  suspects: [
    {
      id:'kareem_stunt', name:'كريم', role:'منسّق المشاهد الخطرة (Stunt Coordinator)', img: IMG_BASE_FINALSCENE + 'kareem.jpg', avatarEmoji:'🎬',
      alibi:'قال إنه كان بيراجع معدات المشهد التالي وقت الحادثة، وماكانش قريب من نقطة التحكم في الحبل.',
      questions:[
        { q:'إنت المسؤول عن فحص معدات الأمان، صح؟',
          a:'"أيوه، وفحصت الحبل بنفسي الصبح، كان سليم مية بالمية. مش فاهم إزاي اتقطع فجأة كده."' },
        { q:'مين كان قريب من نقطة التحكم وقت الحادثة؟', unlockId:'control_point_access',
          a:'"العامل اللي بيتحكم في سرعة إنزال الحبل هو الوحيد اللي يقدر يوصل للنقطة دي، وكان ياسر يومها."' },
        { q:'فيه مشاكل شخصية بينك وبين سامي؟',
          a:'"كان في خلاف بسيط على أجر مشهد قديم، بس اتحل من زمان، مفيش عداوة."' },
        { q:'ليه معدات الأمان الاحتياطية ماكانتش موجودة يوم البروفة؟', unlockId:'backup_missing', requires:['control_point_access'],
          a:'"دي حاجة غريبة فعلاً، المفروض تكون موجودة دايمًا. حد لازم يكون شالها من غير ما يبلغني."' },
      ],
      confrontations:{
        control_point_access:'ياسر هو اللي كان عالتحكم، أنا كنت في ناحية تانية خالص.',
        writer_credit_dispute:'الخلاف ده مالوش علاقة بمعدات الأمان خالص.',
      }
    },
    {
      id:'yasser_rig', name:'ياسر', role:'فني تحكم الحبال والمعدات (Rigger)', img: IMG_BASE_FINALSCENE + 'yasser.jpg', avatarEmoji:'🔧',
      alibi:'قال إنه كان على نقطة التحكم طول الوقت وما لمسش حاجة غير المعتاد.',
      questions:[
        { q:'إنت كنت على نقطة التحكم وقت الحادثة، صح؟',
          a:'"أيوه، كنت في مكاني الطبيعي. الحبل قطع لوحده، أنا ملمستش فيه حاجة غريبة."' },
        { q:'كام مرة راجعت شد الحبل قبل البروفة؟', unlockId:'rig_log_gap',
          a:'"راجعته الصبح زي العادة، بس معنديش سجل مكتوب للمراجعة النهائية قبل البروفة مباشرة."' },
        { q:'حد قدر يوصل لمعدات التحكم من غيرك؟', requires:['rig_log_gap'],
          a:'"من ناحية الأمان المفروض محدش، بس فيه فترة قصيرة سبت فيها المكان أجيب مية."' },
        { q:'السجل الرقمي للمعدات بيوضح إن فيه تعديل حصل قبل البروفة بـ 20 دقيقة بالظبط، في وقت غيابك — عندك تفسير؟', unlockId:'rig_tamper_window', requires:['rig_log_gap'], closesInterrogation:true,
          a:'(بيتلعثم) "معرفش حصل إيه بالظبط، أنا بس غبت شوية. ممكن حد استغل الفرصة دي."' },
      ],
      confrontations:{
        control_point_access:'أنا كنت في مكاني، بس اتغيبت لحظات بسيطة جدًا.',
        backup_missing:'معرفش مين شال المعدات الاحتياطية، دي مش مسؤوليتي.',
      }
    },
    {
      id:'hala_director', name:'هالة', role:'مخرجة الفيلم', img: IMG_BASE_FINALSCENE + 'hala.jpg', avatarEmoji:'🎥',
      alibi:'كانت واقفة جنب الكاميرا الرئيسية، بعيد عن منطقة المعدات، أثناء البروفة.',
      questions:[
        { q:'إنتِ اللي طلبتي التحقيق، فيه سبب معين يخليكِ مش مصدقة إنها حادثة؟',
          a:'"سامي كان دقيق جدًا في شغله، مستحيل ينزل من غير ما يفحص الحبل بنفسه. الموضوع مش منطقي."' },
        { q:'كان فيه توتر بينك وبين سامي مؤخرًا؟', unlockId:'director_tension',
          a:'"كان عايز يشتغل في مشروع تاني منافس لفيلمي، وده كان مزعجني شوية، بس ده مش سبب أأذيه."' },
        { q:'مين كان بيكتب سيناريو المشهد الخطر ده بالتحديد؟', unlockId:'writer_credit_dispute',
          a:'"كريم اقترح تفاصيل المشهد فعليًا، لكن سامي كان بيقول للجميع إن الفكرة فكرته هو وإنه هيطالب بحقوقه فيها."' },
      ],
      confrontations:{
        director_tension:'التوتر كان بسيط، وماكنش يستاهل إني أأذي حد.',
      }
    },
    {
      id:'mariam_assistant', name:'مريم', role:'مساعدة الإنتاج', img: IMG_BASE_FINALSCENE + 'mariam.jpg', avatarEmoji:'📋',
      alibi:'قالت إنها كانت بتجهز جدول تصوير اليوم التالي في المكتب المجاور وقت الحادثة.',
      loseMsg:'مريم كانت فعلًا في المكتب المجاور تجهز الجدول، ومفيش أي دليل مادي يربطها بمنطقة المعدات أو بخلاف سامي مع أي حد. اتهامها هيكون تخمين بلا أساس.',
      questions:[
        { q:'لاحظتِ أي حاجة غريبة الصبح قبل البروفة؟', unlockId:'missing_backup_witness',
          a:'"شفت حد بياخد صندوق المعدات الاحتياطية من مخزن الاستوديو بدري الصبح، بس ماخدتش بالي مين بالظبط."' },
        { q:'سامي كان اتكلم معاكي عن مشاكله الأخيرة؟',
          a:'"قال لي إنه زعلان من موضوع حقوق فكرة، وإنه هيتكلم مع الإنتاج عشان ياخد حقه."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'official_report', tag:'من التقرير الرسمي', crit:false, title:'التقرير الأولي لحادثة العمل', img:null,
      short:'تقرير مبدئي بيوصف الوفاة كحادث نتيجة عطل في معدات الأمان',
      full:'التقرير الرسمي الأولي بيصنف الحادثة كعطل فني في حبل الأمان، من غير أي إشارة لاحتمال تدخل بشري متعمد.',
      unlocked:true, order:1 },

    { id:'control_point_access', tag:'من استجواب كريم', crit:false, title:'نقطة التحكم في الحبل', img:null,
      short:'ياسر هو الوحيد اللي كان عند نقطة التحكم وقت الحادثة',
      full:'كريم أكد إن نقطة التحكم في سرعة إنزال الحبل كانت تحت مسؤولية ياسر بشكل حصري وقت البروفة.',
      unlocked:false, order:2 },

    { id:'rig_log_gap', tag:'من استجواب ياسر', crit:false, title:'فجوة في سجل مراجعة المعدات', img:null,
      short:'مفيش سجل مكتوب لمراجعة نهائية للحبل قبل البروفة مباشرة',
      full:'ياسر اعترف إنه ماعملش توثيق مكتوب لمراجعة نهائية للحبل في الدقايق اللي سبقت البروفة، رغم إن ده إجراء معتاد.',
      unlocked:false, order:3 },

    { id:'backup_missing', tag:'من استجواب كريم', crit:false, title:'اختفاء معدات الأمان الاحتياطية', img:null,
      short:'معدات الأمان الاحتياطية ماكانتش موجودة يوم البروفة',
      full:'كريم أكد إن معدات الأمان الاحتياطية المفروض تكون موجودة دايمًا كانت غائبة يوم الحادثة من غير تفسير واضح.',
      unlocked:false, order:4 },

    { id:'missing_backup_witness', tag:'من استجواب مريم', crit:true, title:'شاهدة على نقل المعدات الاحتياطية', img: IMG_BASE_FINALSCENE + 'evidence-storage.jpg',
      short:'مريم شافت حد بياخد صندوق المعدات الاحتياطية بدري الصبح',
      full:'مريم شهدت إنها شافت شخص بياخد صندوق معدات الأمان الاحتياطية من المخزن الساعات الأولى من الصبح، قبل ما أي حد يوصل الاستوديو رسميًا.',
      unlocked:false, order:5 },

    { id:'writer_credit_dispute', tag:'من استجواب هالة', crit:false, title:'خلاف على حقوق فكرة المشهد', img:null,
      short:'سامي كان بيدّعي إن فكرة المشهد الخطر فكرته مش كريم',
      full:'هالة أكدت إن سامي كان بيقول للجميع إن فكرة تصميم المشهد الخطر أصلًا فكرته هو، وكان ناوي يطالب بحقوقه الرسمية فيها، رغم إن كريم هو اللي قدمها للإنتاج باسمه.',
      unlocked:false, order:6 },

    { id:'director_tension', tag:'من استجواب هالة', crit:false, title:'توتر بين هالة وسامي', img:null,
      short:'سامي كان عايز يشتغل في مشروع منافس لفيلم هالة',
      full:'هالة اعترفت بوجود توتر بينها وبين سامي مؤخرًا بسبب رغبته في العمل على مشروع منافس لفيلمها، لكنها أكدت إن ده مش دافع كافي لإيذائه.',
      unlocked:false, order:7 },

    { id:'rig_tamper_window', tag:'من سجل رقمي', crit:true, title:'نافذة التلاعب بالمعدات الرقمية', img: IMG_BASE_FINALSCENE + 'evidence-rig-log.jpg',
      short:'تعديل في إعدادات الحبل حصل في نافذة زمنية أثناء غياب ياسر',
      full:'السجل الرقمي لمعدات التحكم بيوضح إن فيه تعديل في إعدادات شد الحبل حصل قبل البروفة بعشرين دقيقة بالظبط، في نفس الفترة اللي ياسر اعترف بغيابه فيها.',
      unlocked:false, order:8 },

    { id:'camera_timestamp_verified', tag:'من كاميرات الاستوديو', crit:true, title:'التوقيت الحقيقي للتلاعب بالمعدات', img: IMG_BASE_FINALSCENE + 'evidence-camera.jpg',
      short:'كاميرا الاستوديو حددت هوية الشخص اللي دخل منطقة المعدات في النافذة الزمنية',
      full:'تحليل كاميرات المراقبة حدد بدقة مين دخل منطقة المعدات في نافذة الغياب العشرين دقيقة، بما يربط الشخص مباشرة بلحظة التلاعب بالحبل.',
      unlocked:false, order:9 },
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
    introText: 'كاميرا مخزن معدات الاستوديو بتغطي من الساعة 6 الصبح لحد 9. دوّر على اللحظة اللي حد بيدخل فيها منطقة التحكم في الحبل من غير إذن — النافذة المشبوهة كانت قبل البروفة بعشرين دقيقة تقريبًا.',
    resultText: 'وصلت للحظة الصح. الكاميرا بتوضح دخول كريم لمنطقة التحكم في المعدات الساعة الحادية عشر وعشرين، بعد ما ياسر سايب المكان بدقيقتين بالظبط، وقبل البروفة بعشرين دقيقة.',
    startHour24: 6,
    totalMinutes: 300,
    targetMinutes: 320,
    toleranceMinutes: 6,
    resultEvidenceIds: ['camera_timestamp_verified'],
  },

  evidenceCombinations: [
    { parts:['rig_tamper_window','camera_timestamp_verified'], resultId:'camera_timestamp_verified' },
  ],

  investigationActions: [
    {
      id:'check_storage_logs', kind:'مراجعة سجلات المخزن', label:'راجع سجل دخول مخزن المعدات',
      description:'قارن أسماء الفريق المصرح لهم بدخول المخزن بسجل الدخول الفعلي يوم الحادثة.',
      requires:['missing_backup_witness'], resultEvidenceIds:['backup_missing'],
      successText:'سجل المخزن يؤكد إن صندوق المعدات الاحتياطية اتنقل قبل الحادثة بساعات قليلة.'
    },
  ],

  correctSuspectId: 'kareem_stunt',
  conclusiveEvidenceIds: ['rig_tamper_window', 'camera_timestamp_verified', 'missing_backup_witness', 'writer_credit_dispute'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كريم هو الفاعل؟',
        options: [
          { id:'a', text:'الكاميرا حددت دخوله منطقة التحكم في نافذة التلاعب بالظبط + خلافه على حقوق فكرة المشهد + شهادة مريم على نقل المعدات الاحتياطية' },
          { id:'b', text:'لأنه منسق المشاهد الخطرة وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط مباشر بلحظة الجريمة' },
          { id:'c', text:'لأنه كان متوتر شوية وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whyyasser',
        label:'ليه ياسر كان بريء رغم إنه كان أقرب واحد للمعدات؟',
        options: [
          { id:'a', text:'الكاميرا أثبتت إنه كان غايب فعلًا في نافذة التلاعب، ومفيش دليل يربطه بدخول منطقة التحكم في التوقيت الحرج' },
          { id:'b', text:'لأنه اعترف بغيابه بصراحة، وده سلوك برئ في الظاهر بس مش استنتاج مبني على دليل مستقل' },
          { id:'c', text:'لأنه فني بسيط ومالوش دافع واضح، وده افتراض عام مش نتيجة تحقيق فعلي' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'المشهد اللي ماكانش في السيناريو',
      paragraphs:[
        'كريم استغل لحظة غياب ياسر القصيرة عشان يتلاعب بمعدات التحكم في الحبل، بعد ما حس إن سامي هيسحب منه حق فكرة المشهد اللي كان ممكن يبني عليها مستقبله المهني. الكاميرا حددت دخوله منطقة التحكم في نفس النافذة الزمنية اللي أثبتها السجل الرقمي.',
        'اللي قفل الدائرة كان تطابق توقيت الكاميرا مع سجل التلاعب الرقمي، وشهادة مريم على نقل المعدات الاحتياطية، وخلاف حقوق الفكرة اللي وفّر الدافع الحقيقي بعيدًا عن أي عداوة ظاهرة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كريم، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتنفي عنها صفة "حادثة عمل".',
      ],
      hint:'اجمع على الأقل 3 أدلة من: نافذة التلاعب الرقمية، تأكيد الكاميرا، شهادة مريم، وخلاف حقوق الفكرة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل يشتغل في الاستوديو وكأن حاجة ماحصلتش. الأدلة الرقمية والبصرية كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "المشهد الأخير"

   الغلاف (cover.webp):
   "Photorealistic wide shot of a large film studio soundstage with
   safety rigging and harnesses hanging from a high platform, dramatic
   overhead lighting, empty set after an accident, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a film crew preparing safety rigging and
   stunt equipment on a soundstage, professional lighting rigs,
   photorealistic, no text, no watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a stunt performer in safety harness
   climbing a high platform on a film set, crew watching from below,
   photorealistic, no text, no watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic dramatic shot of a film set in chaos, crew members
   running toward a fallen safety rig, tense atmosphere, photorealistic,
   no text, no watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of an empty film soundstage at night, safety
   equipment scattered, investigator examining a rig control panel,
   photorealistic, no text, no watermark"

   الشخصيات:

   كريم (kareem.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male stunt
   coordinator, athletic build, confident expression, wearing a
   crew jacket on a film set, photorealistic, no text, no watermark"

   ياسر (yasser.jpg):
   "Photorealistic portrait of a young Egyptian male rigging
   technician, work gloves, nervous expression, standing near
   rigging equipment, photorealistic, no text, no watermark"

   هالة (hala.jpg):
   "Photorealistic portrait of a confident Egyptian female film
   director, headset around neck, standing near a camera on set,
   photorealistic, no text, no watermark"

   مريم (mariam.jpg):
   "Photorealistic portrait of a young Egyptian female production
   assistant, holding a clipboard, professional demeanor, office
   setting, photorealistic, no text, no watermark"

   أدلة:
   evidence-storage.jpg: "Photorealistic shot of a film equipment
   storage room with safety gear on shelves, one shelf empty,
   photorealistic, no text, no watermark"
   evidence-rig-log.jpg: "Photorealistic close-up of a digital
   control panel screen showing rigging tension logs and timestamps,
   photorealistic, no text, no watermark"
   evidence-camera.jpg: "Photorealistic close-up of a security
   camera monitor showing a timestamped studio hallway feed,
   photorealistic, no text, no watermark"
   ============================================================ */
