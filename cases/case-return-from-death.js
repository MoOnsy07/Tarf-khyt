/* ============================================================
   بيانات قضية Premium: العودة من الموت
   قضية مركبة على مرحلتين جنائيتين، ومبنية على نظام الاستنتاجات
   المرحلية الاختياري الموجود في theory-builder-safety-fix.js.

   مبدأ التصميم:
   - لا يوجد دليل منفرد يكشف الـ plot twist.
   - اللاعب هو اللي يثبت الاستنتاجات المحورية.
   - الإجراءات المستقبلية لا تظهر أصلًا قبل المرحلة المناسبة.
   - القضايا القديمة لا تعتمد على أي من الحقول الجديدة هنا.
   ============================================================ */

const IMG_BASE_RETURN_DEATH = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/return-from-death/';

const CASE_RETURN_FROM_DEATH = {
  id: 'return-from-death',
  title: 'العودة من الموت',
  caseNo: 'CASE 061',
  subtitle: 'التجمع الخامس، القاهرة الجديدة، القاهرة',
  coverImg: IMG_BASE_RETURN_DEATH + 'cover.jpg',
  difficulty: 'صعبة جدًا',
  estMinutes: 65,
  investigationPoints: 39,
  teaser: 'رجل أعمال مات في شقته... وبعد إعلان وفاته بساعات ظهر صوته، اتحرك حسابه، واتصورت هيئة شبهه في كاميرا. هل حد بينتحل شخصيته، ولا التحقيق بدأ من الجثة الغلط؟',

  isPremium: true,
  premiumType: 'telegram-exclusive',
  premiumLabel: 'حصرية لأعضاء القناة',
  categories: ['murder', 'mystery', 'thriller', 'digital'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  location: {
    governorate: 'القاهرة',
    district: 'القاهرة الجديدة',
    locality: 'التجمع الخامس',
    divisionType: 'قسم',
  },

  briefing: {
    heroImg: IMG_BASE_RETURN_DEATH + 'cover.jpg',
    heroCaption: 'CASE 061 — جثة في شقة رجل أعمال',
    text1: 'الساعة قربت من 9 الصبح لما تم العثور على جثة داخل شقة رجل الأعمال كريم الدسوقي. بطاقة كريم، ساعته، موبايله ومتعلقاته كلها كانت جوه المشهد، والتعرّف الأولي رجّح إن الجثمان لصاحب الشقة نفسه.',
    text2: 'كريم كان بيمر بضغط شديد في شغله، وخلافاته الأخيرة فتحت أكتر من اتجاه: شريكه مروان، خطيبته السابقة ليلى، وطبيب كان على تواصل معاه قبل الحادث. المطلوب منك تثبت كل خطوة بالدليل؛ أي فرضية هتتعامل معاها كحقيقة بدري ممكن توقع التحقيق كله.',
    meta: [
      { label:'الضحية المعلنة', value:'كريم الدسوقي — رجل أعمال' },
      { label:'مكان العثور', value:'شقة كريم — التجمع الخامس' },
      { label:'وقت العثور', value:'08:47 صباحًا' },
      { label:'طبيعة القضية', value:'وفاة مشبوهة وهوية تحتاج تثبيت' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — باب مفتوح على غير العادة',
      img: IMG_BASE_RETURN_DEATH + 'scene1-apartment.jpg',
      text:'مكالمة من حارس العمارة بتبلغ إن باب شقة كريم موارب من الصبح. لما تدخل، تلاقي الصالة هادية زيادة عن اللزوم، وكرسي مقلوب وكوباية مكسورة قرب الجثمان.'
    },
    {
      scene:'المشهد ٢ — هوية تبدو محسومة',
      img: IMG_BASE_RETURN_DEATH + 'scene2-belongings.jpg',
      text:'بطاقة كريم موجودة، ساعته المعروفة في إيده، وموبايله قريب منه. مفيش حاجة في النظرة الأولى تقول إنك بتبص على شخص غير صاحب الشقة.'
    },
    {
      scene:'المشهد ٣ — حياة مليانة خلافات',
      img: IMG_BASE_RETURN_DEATH + 'scene3-office.jpg',
      text:'ملفات الشركة بتقول إن كريم كان تحت ضغط مالي وقانوني، وعلاقته بشريكه مروان بقت متوترة. ليلى كمان كانت باعتاله كلام مقلق قبل الحادث.'
    },
    {
      scene:'المشهد ٤ — ابدأ من اللي تقدر تثبته',
      img: IMG_BASE_RETURN_DEATH + 'scene4-investigation.jpg',
      text:'المشهد شكله واضح، وده بالذات سبب يخليك ما تثقش في أول تفسير. اجمع، قارن، واستنتج بنفسك قبل ما تغيّر اتجاه القضية.'
    },
  ],

  suspects: [
    {
      id:'marwan', name:'مروان السيوفي', role:'شريك كريم في الشركة', img: IMG_BASE_RETURN_DEATH + 'marwan.jpg', avatarEmoji:'💼',
      age:40,
      alibi:'قال إنه كان في اجتماع عمل ثم رجع بيته، وإن آخر كلام مباشر بينه وبين كريم كان قبل الحادث بساعات.',
      questions:[
        { q:'كريم كان حاله إيه آخر أسبوع؟', unlockId:'marwan_pressure',
          a:'"متوتر جدًا. كان عندنا مراجعة مالية ومشاكل في عقود قديمة، وبقى بياخد قرارات لوحده من غير ما يرجعلي."' },
        { q:'كان بينكم خلاف شخصي؟', requires:['marwan_pressure'],
          a:'"خلاف شغل، مش أكتر. الشركة كبيرة وأي شريكين ممكن يختلفوا على فلوس وقرارات."' },
        { q:'إزاي تفسر نشاط موبايله وحسابه بعد إعلان الوفاة؟', requires:['voice_after_death','atm_after_death'],
          a:'"أكيد حد كان معاه الموبايل أو البطاقة. كريم كان حريص جدًا، فلو فيه حد بيستخدم حاجاته يبقى الموضوع مترتب."' },
        { q:'إنت كنت عارف إن كريم كان حي بعد الجثة الأولى؟', requiresDeductions:['kareem_alive'], minPhase:'fake_death',
          a:'(بيسكت لحظة) "أنا عرفت بعدين إن فيه حاجة مش طبيعية، لكن ماكنتش فاهم حجم الخطة كلها."' },
        { q:'إنت قلت إنك ما قابلتوش بعد الحادث، طيب اتصالكم الأخير وعربيتك عند المنطقة الصناعية تفسيرهم إيه؟', requires:['marwan_last_call','marwan_car_cctv'], requiresDeductions:['kareem_killed_reda'], phase:'second_murder',
          a:'"قابلته فعلًا. كنت خايف أقول لأن مجرد اعترافي إنه كان عايش هيورطني في قصة تزوير موته. سيبته حي ومشيت."' },
        { q:'التسجيل من المخزن والخلايا تحت أظافر كريم بيقولوا إن حصل صراع مباشر بينكم. لسه متمسك إنك سيبته حي؟', requires:['warehouse_audio','marwan_contact_dna'], requiresDeductions:['real_kareem_dead'], phase:'second_murder', closesInterrogation:true,
          a:'(صوته بيوطى) "هو حاول ياخد الملف كله ويختفي ويسيبني أتحاسب لوحدي... حصل اشتباك، والدنيا خرجت عن السيطرة."' },
      ],
      confrontations:{
        atm_after_death:'استخدام البطاقة بعد الوفاة يثبت إن حد كان بيحرك حاجاته، مش إن أنا اللي كنت بستخدمها.',
        doctor_contacts:'أنا ماكنتش طرف في مكالماته مع هشام، اسأله هو.',
        marwan_car_cctv:'أيوه دي عربيتي، وأنا قلتلك إني قابلته لما اضطرّيت أعترف.',
        warehouse_audio:'التسجيل يثبت خناقة، مش لوحده مين تسبب في الوفاة.',
        marwan_contact_dna:'حصل اشتباك بينا، أنا مش بنكر ده.'
      },
      loseMsg:'مروان عليه تناقضات ثقيلة، لكن اتهامه من غير إثبات اللقاء الأخير والصراع والجثة الحقيقية هيكون قفزة أكبر من الأدلة.'
    },
    {
      id:'leila', name:'ليلى فؤاد', role:'خطيبة كريم السابقة', img: IMG_BASE_RETURN_DEATH + 'leila.jpg', avatarEmoji:'📰',
      age:32,
      alibi:'قالت إنها كانت في منزل أختها ليلة الحادث، وأختها وكاميرا مدخل العمارة يدعموا وجودها.',
      questions:[
        { q:'إيه آخر خلاف حصل بينك وبين كريم؟', unlockId:'leila_message',
          a:'"ماكنش خلاف عاطفي بس. كان داخل في حاجة أكبر منه، وقلتله صراحة إن الطريق اللي ماشي فيه مش هيرجعه زي الأول."' },
        { q:'تقصدِي إيه بـ «الموضوع لازم يخلص» في الرسالة؟', requires:['leila_message'],
          a:'"كان بيتكلم عن أزمة في الشركة وملفات بيحاول يقفلها. ما قالليش تفاصيل، وأنا افتكرت إنه هيسوي مشاكله ويسافر فترة."' },
        { q:'هل قالك إنه ناوي يختفي؟', requiresDeductions:['fake_death_plan'], minPhase:'fake_death',
          a:'"قال مرة جملة غريبة: نفسي أصحى ألاقي اسمي اختفى من كل الملفات. حسبتها عصبية، ما تخيلتش إنه يقصدها حرفيًا."' },
      ],
      confrontations:{
        leila_message:'الرسالة تهديد شكلها وحش لو اتقرت لوحدها، لكن كلامنا كان عن مصيبة هو داخل فيها، مش إني ناوية أقتله.'
      },
      loseMsg:'ليلى كان عندها سبب تزعل من كريم، لكن مسارها الزمني مدعوم ومفيش خيط مادي يربطها بأي من مسرحي الجريمة.'
    },
    {
      id:'hisham', name:'د. هشام راضي', role:'طبيب ومعاون بمعمل خاص', img: IMG_BASE_RETURN_DEATH + 'hisham.jpg', avatarEmoji:'🧪',
      age:51,
      alibi:'قال إن علاقته بكريم كانت مهنية وإن دخوله في ملف التعرف على الجثمان تم بعد العثور عليه فقط.',
      questions:[
        { q:'إيه دورك في التعرّف الأولي على الجثمان؟',
          a:'"كنت جزء من مراجعة ملف قديم وعينة مرجعية متاحة. التقرير من البداية كان ترجيحي مش إثبات نهائي."' },
        { q:'ليه كريم كلمك قبل الحادث بـ48 ساعة؟', requires:['doctor_contacts'],
          a:'"كان بيسأل في موضوع تحاليل تخص شركة عنده. معرفش ليه كل مكالمة لازم تتحول لمؤامرة."' },
        { q:'العينة المرجعية اتغير ملصقها وإنت اللي طلبت استخدامها. ليه؟', requires:['sample_chain'], requiresDeductions:['body_not_kareem'], minPhase:'false_identity',
          a:'(يتوتر) "هو دفعلي عشان أخلّي المقارنة الأولية تمشي على العينة الموجودة بدل ما نطلب عينة عائلية جديدة. أنا غلطت، بس ما قتلتش حد."' },
      ],
      confrontations:{
        doctor_contacts:'المكالمات كانت موجودة فعلًا، لكن محتواها هو المهم.',
        sample_chain:'أنا مسؤول عن تغيير مسار العينة، ومش هقدر أنكر الورق.'
      },
      loseMsg:'هشام متورط في التلاعب بإجراء الهوية، لكن الأدلة ما بتحطوش في مسرح قتل رضا ولا مسرح مقتل كريم الحقيقي.'
    },
    {
      id:'emad', name:'عماد فتحي', role:'مسؤول أمن وحارس العمارة', img: IMG_BASE_RETURN_DEATH + 'emad.jpg', avatarEmoji:'🛡️',
      age:47,
      alibi:'كان على بوابة العمارة معظم الليل، لكنه اعتمد في التعرف على السكان على الهيئة والعربية والملابس أكثر من رؤية الوجه مباشرة.',
      questions:[
        { q:'إنت شفت كريم ليلة الحادث؟', unlockId:'emad_statement',
          a:'"أنا افتكرت اللي دخل الأستاذ كريم. العربية والتوقيت والهدوم كانوا طبيعيين، بس ما وقفتوش عشان أبص في وشه عن قرب."' },
        { q:'كان لوحده؟', requires:['emad_statement'],
          a:'"فاكر إن راجل تاني دخل في فترة قريبة منه، لكن وقتها ما ربطتش الاتنين ببعض."' },
      ],
      confrontations:{
        body_not_visual_match:'أنا عمري ما قلت إني عاينت وش الجثة أو بصيت في وش اللي دخل من سنتيمترات. قلت افتكرته كريم من هيئته.'
      },
      loseMsg:'شهادة عماد ساعدت الوهم الأول، لكنها شهادة تعرف بصري غير دقيق، ومفيش دافع أو أثر يربطه بالجريمتين.'
    },
    {
      id:'kareem', name:'كريم الدسوقي', role:'رجل الأعمال والضحية المعلنة', img: IMG_BASE_RETURN_DEATH + 'kareem.jpg', avatarEmoji:'🕴️',
      age:38,
      accusable:false,
      alibi:'في بداية القضية يُعامل كضحية متوفاة، لكن وضعه داخل التحقيق يتغير مع الأدلة.',
      questions:[],
    },
    {
      id:'reda', name:'رضا النجار', role:'سمسار عقارات — تظهر هويته أثناء التحقيق', img: IMG_BASE_RETURN_DEATH + 'reda.jpg', avatarEmoji:'🏠',
      age:41,
      accusable:false,
      hiddenUntilDeduction:'body_is_reda',
      alibi:'آخر ما قاله لأسرته إنه رايح يقابل عميل مهم في صفقة خاصة.',
      questions:[],
    },
  ],

  evidence: [
    { id:'scene_overview', tag:'مسرح الجريمة', crit:false, title:'المعاينة الأولى للشقة', img:IMG_BASE_RETURN_DEATH+'scene-overview.jpg',
      short:'جثمان بالصالة مع آثار اضطراب محدود ومن غير اقتحام واضح',
      full:'الجثمان موجود في صالة شقة كريم. كرسي مقلوب وكوباية مكسورة وملفات مبعثرة بشكل محدود، لكن مفيش كسر في الباب أو بعثرة سرقة واسعة. المشهد يرجح لقاء حصل جوه المكان قبل الوفاة.', unlocked:true, order:1 },
    { id:'body_belongings', tag:'مسرح الجريمة', crit:false, title:'متعلقات الجثمان', img:IMG_BASE_RETURN_DEATH+'body-belongings.jpg',
      short:'ساعة كريم ومحفظته وموبايله قريبين من الجثمان',
      full:'ساعة معروفة إن كريم بيلبسها، محفظة، هاتف ومتعلقات شخصية كلها موجودة حول الجثمان. وجودها يدعم الهوية ظاهريًا، لكنه لا يثبت بيولوجيًا صاحب الجثمان.', unlocked:true, order:2 },
    { id:'kareem_id', tag:'المتعلقات', crit:false, title:'بطاقة كريم الدسوقي', img:IMG_BASE_RETURN_DEATH+'kareem-id.jpg',
      short:'بطاقة كريم موجودة مع الجثمان',
      full:'بطاقة شخصية باسم كريم الدسوقي موجودة داخل المحفظة. البطاقة أصلية، لكن وجود بطاقة شخص مع جثمان لا يساوي وحده إثبات هوية الجثمان.', unlocked:true, order:3 },
    { id:'initial_forensics', tag:'الفحص الأولي', crit:false, title:'تقرير تعرّف أولي غير قاطع', img:IMG_BASE_RETURN_DEATH+'initial-forensics.jpg',
      short:'السن والهيئة والمتعلقات لا تنفي أن الجثمان لكريم',
      full:'التقرير الأولي يستخدم صياغة ترجيحية: رجل في الفئة العمرية المناسبة، ولا توجد في المعاينة السريعة علامة ظاهرة تنفي هوية صاحب الشقة. لم يتم اعتماد التعرف النهائي بالأسنان أو مقارنة سجل إصابة قديمة في هذه المرحلة.', unlocked:true, order:4 },
    { id:'emad_statement', tag:'شهادة أمن', crit:false, title:'عماد ظن أن الداخل هو كريم', img:null,
      short:'الهيئة والعربية والتوقيت خلّوا عماد يفترض إنه كريم',
      full:'عماد لم يقل إنه دقق في الوجه، بل اعتمد على الهيئة والملابس والعربية والتوقيت. شهادته تدعم الانطباع الأول لكنها ليست تعرّفًا قطعيًا.', unlocked:false, order:5 },
    { id:'marwan_pressure', tag:'استجواب مروان', crit:false, title:'كريم كان تحت ضغط مالي ومهني', img:null,
      short:'مراجعة مالية وخلافات داخل الشركة قبل الحادث',
      full:'مروان وصف كريم بأنه متوتر، يتخذ قرارات منفردة، وواقع تحت ضغط مراجعة مالية وعقود قديمة.', unlocked:false, order:6 },
    { id:'leila_message', tag:'هاتف كريم', crit:false, title:'رسالة مقلقة من ليلى', img:IMG_BASE_RETURN_DEATH+'leila-message.jpg',
      short:'«إنت داخل على حاجة مش هتعرف ترجع منها»',
      full:'في محادثة قبل الحادث كتبت ليلى: «إنت داخل على حاجة مش هتعرف ترجع منها». رد كريم: «اتأخرنا، الموضوع لازم يخلص». الرسالة قابلة لتفسير شخصي أو مهني ولا تثبت تهديدًا بالقتل.', unlocked:false, order:7 },

    { id:'voice_after_death', tag:'فحص رقمي', crit:true, title:'رسالة صوتية بعد إعلان الوفاة', img:IMG_BASE_RETURN_DEATH+'voice-after-death.jpg',
      short:'رسالة من رقم كريم أُرسلت بعد إعلان وفاته',
      full:'تم إرسال رسالة صوتية من رقم كريم بعد إعلان الوفاة: «خلي كل حاجة زي ما اتفقنا، والملف ما يطلعش غير لما أتأكد». التوقيت صحيح، لكن الرسالة وحدها لا تثبت هوية من ضغط زر الإرسال.', unlocked:false, order:8 },
    { id:'atm_after_death', tag:'تحريات مالية', crit:true, title:'سحب نقدي بعد الوفاة', img:IMG_BASE_RETURN_DEATH+'atm-after-death.jpg',
      short:'بطاقة كريم استُخدمت بعد إعلان موته بساعتين تقريبًا',
      full:'عملية سحب بقيمة 18,000 جنيه تمت الساعة 11:42 مساءً ببطاقة كريم. استخدام البطاقة يؤكد نشاطًا ماديًا بعد الوفاة المعلنة، لكنه قد يكون من شخص آخر يحملها.', unlocked:false, order:9 },
    { id:'gas_cctv', tag:'كاميرات', crit:true, title:'شخص يشبه كريم في محطة وقود', img:IMG_BASE_RETURN_DEATH+'gas-cctv.jpg',
      short:'هيئة قريبة جدًا من كريم بعد وقت الوفاة المعلن',
      full:'كاميرا محطة وقود سجلت رجلًا في نفس البنية والهيئة العامة لكريم بعد إعلان وفاته. الوجه غير واضح بما يكفي للجزم، لذلك التسجيل يرفع الشك ولا يحسمه.', unlocked:false, order:10 },
    { id:'substitute_note', tag:'لابتوب كريم', crit:true, title:'ملاحظة عن «البديل»', img:IMG_BASE_RETURN_DEATH+'substitute-note.jpg',
      short:'«ماحدش يعرف البديل غيري»',
      full:'مسودة على لابتوب كريم تقول: «لو حصل خلل، البديل يدخل قبل المعاد. النسخة الأساسية معايا. ماحدش يعرف البديل غيري». معنى كلمة البديل غير محدد في هذه المرحلة.', unlocked:false, order:11 },

    { id:'old_arm_record', tag:'ملف طبي', crit:true, title:'كسر قديم غير موجود في الجثمان', img:IMG_BASE_RETURN_DEATH+'old-arm-record.jpg',
      short:'كريم عنده تثبيت جراحي قديم لا يظهر في أشعة الجثمان',
      full:'سجل طبي موثق يثبت كسرًا قديمًا في الساعد الأيسر لكريم مع تثبيت جراحي. أشعة الجثمان لا تظهر أثر الكسر أو التثبيت المتوقع.', unlocked:false, order:12 },
    { id:'scar_mismatch', tag:'فحص علامات مميزة', crit:true, title:'ندبة لا يفسرها سجل كريم', img:IMG_BASE_RETURN_DEATH+'scar-report.jpg',
      short:'الجثمان يحمل ندبة جراحية غير موجودة في تاريخ كريم الطبي',
      full:'فحص أدق وجد ندبة جراحية صغيرة بأسفل البطن، بينما ملفات كريم الطبية المتاحة وصوره السابقة لا تشير لإجراء يفسرها. الدليل لا يحسم وحده لكنه يضيف اختلافًا مستقلًا.', unlocked:false, order:13 },
    { id:'dental_mismatch', tag:'سجل الأسنان', crit:true, title:'أسنان الجثمان لا تطابق كريم', img:IMG_BASE_RETURN_DEATH+'dental-record.jpg',
      short:'تاج وعلاج عصب موثقين لكريم غير موجودين في الجثمان',
      full:'سجل طبيب أسنان كريم يثبت تاجًا خزفيًا وعلاج عصب في موضعين محددين. فحص الجثمان يظهر توزيع علاجات مختلفًا، ما يجعل خطأ الهوية أقوى تفسير متسق مع بقية الاختلافات.', unlocked:false, order:14 },
    { id:'body_not_visual_match', tag:'إعادة تقييم', crit:true, title:'التعرف البصري الأول كان افتراضًا', img:null,
      short:'المتعلقات وشهادة عماد دعمت هوية لم يتم تثبيتها تشريحيًا',
      full:'بعد مراجعة طريقة التعرف الأولى اتضح أن أغلب اليقين جاء من البطاقة والمتعلقات وهيئة الشخص، وليس من علامة تشريحية مستقلة.', unlocked:false, order:15 },

    { id:'fingerprint_reda', tag:'مطابقة بصمات', crit:true, title:'مطابقة بصمة باسم رضا النجار', img:IMG_BASE_RETURN_DEATH+'fingerprint-reda.jpg',
      short:'بصمة الجثمان تقود لسجل قديم باسم رضا محمود النجار',
      full:'مقارنة البصمات لا تطابق كريم، وتنتج مطابقة معاملة حكومية قديمة باسم رضا محمود النجار، 41 سنة، سمسار عقارات.', unlocked:false, order:16 },
    { id:'reda_missing_report', tag:'بلاغات المفقودين', crit:true, title:'بلاغ اختفاء رضا النجار', img:IMG_BASE_RETURN_DEATH+'reda-missing.jpg',
      short:'رضا اختفى في نفس الليلة بعد ما قال إنه رايح يقابل عميل مهم',
      full:'أسرة رضا قدمت بلاغ فقد. آخر كلامه إنه رايح مقابلة «عميل مهم» في صفقة خاصة، ولم يعد بعدها.', unlocked:false, order:17 },
    { id:'reda_building_cctv', tag:'كاميرات العمارة', crit:true, title:'رضا دخل عمارة كريم ولم يظهر خارجًا', img:IMG_BASE_RETURN_DEATH+'reda-building-cctv.jpg',
      short:'كاميرا المدخل تسجل رضا ليلة الجريمة',
      full:'الكاميرا الخارجية تسجل رضا داخلًا العمارة الساعة 8:51 مساءً. لا يوجد في التسجيلات المتاحة مشهد واضح لخروجه بعد ذلك.', unlocked:false, order:18 },
    { id:'reda_meeting_note', tag:'هاتف رضا', crit:true, title:'موعد باسم كريم قبل الاختفاء', img:IMG_BASE_RETURN_DEATH+'reda-meeting.jpg',
      short:'«مقابلة أ/ كريم — صفقة خاصة — الدفع كاش»',
      full:'ملاحظة في هاتف رضا قبل اختفائه تحمل موعدًا باسم كريم وتصف المقابلة بأنها صفقة خاصة ودفعها نقدي.', unlocked:false, order:19 },

    { id:'escape_finance', tag:'تحريات مالية', crit:true, title:'تجهيز سيولة قبل الوفاة', img:IMG_BASE_RETURN_DEATH+'escape-finance.jpg',
      short:'سحوبات متفرقة وإغلاق وديعة وشراء شريحة قبل الحادث',
      full:'خلال أيام قبل الجريمة سحب كريم مبالغ على دفعات، أغلق وديعة قبل موعدها، ونُفذ شراء شريحة مسبقة الدفع مرتبطة بتحركاته. النمط أقرب لتجهيز حركة خروج منه لتصرف مالي عادي.', unlocked:false, order:20 },
    { id:'doctor_contacts', tag:'سجل اتصالات', crit:true, title:'كريم تواصل مع هشام قبل الحادث', img:IMG_BASE_RETURN_DEATH+'doctor-contacts.jpg',
      short:'مكالمات قبل الوفاة ورسالة عن مرور «التقرير الأول»',
      full:'سجل الاتصالات يثبت مكالمتين قبل الحادث ومكالمة قصيرة ليلته. جزء مسترجع من رسالة: كريم: «المهم التقرير الأول يعدّي». هشام: «أنا مسؤول عن الجزء اللي يخصني بس».', unlocked:false, order:21 },
    { id:'sample_chain', tag:'سلسلة حفظ العينات', crit:true, title:'العينة المرجعية جرى توجيهها', img:IMG_BASE_RETURN_DEATH+'sample-chain.jpg',
      short:'عينة قديمة بدل عينة عائلية مع إعادة طباعة ملصق',
      full:'مراجعة سلسلة الحيازة تكشف أن المقارنة الأولية استخدمت عينة قديمة بدل طلب عينة عائلية مستقلة، وأن هشام هو من طلب المسار وظهر تعديل في ملصق العينة. ده يثبت تلاعبًا بالإجراء لا تزوير كل الفحوص.', unlocked:false, order:22 },
    { id:'cloud_login', tag:'أمن رقمي', crit:true, title:'جهاز كريم الأصلي دخل حسابه بعد الوفاة', img:IMG_BASE_RETURN_DEATH+'cloud-login.jpg',
      short:'جلسة من جهاز معروف لكريم فتحت ملفًا مشفرًا بعد الجثة الأولى',
      full:'سجل أمان الحساب السحابي يظهر جلسة بعد العثور على الجثمان من جهاز سبق استخدامه بواسطة كريم نفسه. الجلسة فتحت ملف backup_02 وحمّلت ملفًا مشفرًا.', unlocked:false, order:23 },
    { id:'kareem_alive_cctv', tag:'كاميرا موقع اختباء', crit:true, title:'كريم حي بعد إعلان وفاته', img:IMG_BASE_RETURN_DEATH+'kareem-alive-cctv.jpg',
      short:'صورة أوضح من كاميرا مبنى بعيد تحسم أن الرجل هو كريم',
      full:'بتتبع نطاق الجهاز تظهر كاميرا مبنى صغير تسجل كريم بملامح قابلة للمقارنة وهو يدخل بعد ساعات من العثور على الجثة الأولى. الصورة مع سجل الجهاز تجعل انتحال الشخصية تفسيرًا أضعف بكثير.', unlocked:false, order:24 },

    { id:'two_cups', tag:'إعادة فحص الشقة', crit:true, title:'لقاء مرتب بين كريم ورضا', img:IMG_BASE_RETURN_DEATH+'two-cups.jpg',
      short:'بصمات كريم ورضا على كوبين منفصلين ومن غير اقتحام',
      full:'إعادة فحص الشقة بعد معرفة هوية رضا تكشف بصمات رضا على كوب، وبصمات كريم على كوب آخر، من غير آثار اقتحام. رضا دخل كضيف في لقاء مرتب.', unlocked:false, order:25 },
    { id:'sedative_trace', tag:'المعمل', crit:true, title:'مهدئ في جسد رضا وكوبه', img:IMG_BASE_RETURN_DEATH+'sedative-report.jpg',
      short:'جرعة غير قاتلة استُخدمت قبل الوفاة',
      full:'التحليل السمي يثبت مادة مهدئة بجرعة غير قاتلة في جسد رضا، وبقاياها في كوبه. ده يرجح تخطيطًا للسيطرة عليه قبل الجريمة، لا شجارًا بدأ فجأة.', unlocked:false, order:26 },
    { id:'pharmacy_kareem', tag:'تحريات دوائية', crit:true, title:'كريم اشترى نفس المادة قبل الحادث', img:IMG_BASE_RETURN_DEATH+'pharmacy-kareem.jpg',
      short:'سجل صرف قبل الجريمة بيوم',
      full:'سجل الصيدلية يثبت صرف عبوة تحتوي المادة نفسها لكريم قبل الحادث بيوم بناءً على وصفة قديمة كانت تسمح له بالحصول عليها.', unlocked:false, order:27 },
    { id:'reda_audio', tag:'هاتف رضا', crit:true, title:'رضا قابل كريم داخل الشقة', img:IMG_BASE_RETURN_DEATH+'reda-audio.jpg',
      short:'«أنا وصلت يا أستاذ كريم» — وصوت كريم يرد عليه',
      full:'ملف صوتي قصير مسترجع من هاتف رضا يبدأ بصوته: «أنا وصلت يا أستاذ كريم»، ثم صوت كريم: «اتفضل، اقعد. نخلص الموضوع بسرعة». التسجيل يثبت وجودهما معًا ليلة الجريمة.', unlocked:false, order:28 },
    { id:'kareem_contact_dna', tag:'معمل جنائي', crit:true, title:'أثر مقاومة يطابق كريم', img:IMG_BASE_RETURN_DEATH+'kareem-contact-dna.jpg',
      short:'خلايا تحت أظافر رضا تطابق كريم',
      full:'الفحص يجد خلايا جلدية تحت أظافر رضا تطابق كريم. وحده يثبت احتكاكًا، لكن مع المهدئ واللقاء وتجهيز الوفاة المزيفة يتحول إلى جزء قوي من تسلسل الجريمة الأولى.', unlocked:false, order:29 },

    { id:'device_blackout', tag:'متابعة رقمية', crit:true, title:'اختفاء رقمي مفاجئ لكريم', img:IMG_BASE_RETURN_DEATH+'device-blackout.jpg',
      short:'الجهاز الذي كان نشطًا توقف فجأة ولا توجد حركة بعدها',
      full:'بعد فترة من نشاط منتظم للجهاز والحسابات، انقطع الجهاز فجأة منذ 36 ساعة، وتوقفت معه الحركات المالية والجلسات. التوقف الحاد لا يطابق نمط الهروب المنظم اللي ظهر قبل كده.', unlocked:false, order:30 },
    { id:'marwan_last_call', tag:'سجل اتصالات', crit:true, title:'آخر اتصال بين كريم ومروان', img:IMG_BASE_RETURN_DEATH+'marwan-last-call.jpg',
      short:'«هات الملف وتعالى لوحدك» — «دي آخر مرة نتقابل»',
      full:'بعد الوفاة المزيفة بيوم، كريم يطلب من مروان إحضار الملف والمجيء بمفرده. مروان يرد: «دي آخر مرة نتقابل». بعدها يتحرك جهاز كريم ناحية المنطقة الصناعية.', unlocked:false, order:31 },
    { id:'marwan_car_cctv', tag:'كاميرات طريق', crit:true, title:'سيارة مروان دخلت المنطقة الصناعية', img:IMG_BASE_RETURN_DEATH+'marwan-car-cctv.jpg',
      short:'دخلت بعد رسالة كريم وخرجت بعد 47 دقيقة',
      full:'كاميرا طريق تسجل سيارة مروان تدخل النطاق الذي توقف فيه جهاز كريم، ثم تخرج بعد 47 دقيقة. لا يظهر كريم خارجًا معها.', unlocked:false, order:32 },
    { id:'warehouse_scene', tag:'تفتيش مخزن', crit:true, title:'مسرح صراع ثانٍ', img:IMG_BASE_RETURN_DEATH+'warehouse.jpg',
      short:'دم وهاتف مكسور وحقيبة ملفات مفتوحة',
      full:'مخزن صغير بالمنطقة الصناعية يحتوي على هاتف كريم المكسور، آثار دم، علامات جر، وحقيبة ملفات مفتوحة. لا تظهر الجثة بمجرد الدخول؛ يلزم استكمال تفتيش المكان.', unlocked:false, order:33 },
    { id:'warehouse_audio', tag:'هاتف كريم', crit:true, title:'تسجيل الخلاف الأخير', img:IMG_BASE_RETURN_DEATH+'warehouse-audio.jpg',
      short:'خلاف بين كريم ومروان على الملف ونصيب كل واحد',
      full:'جزء من تسجيل أثناء شجار: كريم: «الاتفاق إن كل واحد ياخد نصيبه». مروان: «إنت ناوي تختفي بالملف كله». يسمع بعدها صوت صدام وينقطع التسجيل.', unlocked:false, order:34 },
    { id:'warehouse_blood', tag:'المعمل', crit:true, title:'دم كريم وآثار جر داخل المخزن', img:IMG_BASE_RETURN_DEATH+'warehouse-blood-report.jpg',
      short:'كمية الدم لا تبدو إصابة سطحية',
      full:'العينة تطابق كريم، والكمية والتوزيع مع آثار الجر ترجح إصابة خطيرة حدثت داخل المخزن.', unlocked:false, order:35 },
    { id:'real_kareem_body', tag:'الغرفة الخلفية', crit:true, title:'العثور على كريم الحقيقي', img:IMG_BASE_RETURN_DEATH+'real-kareem-body.jpg',
      short:'الأسنان والإصابة القديمة والبصمة وDNA مستقل يثبتوا الهوية',
      full:'في غرفة خدمة خلفية يتم العثور على جثمان ثانٍ. هذه المرة تتطابق الأسنان، إصابة الساعد القديمة، البصمة والعينة المستقلة: الجثمان هو كريم الدسوقي الحقيقي.', unlocked:false, order:36 },
    { id:'death_time_match', tag:'طب شرعي', crit:true, title:'زمن وفاة كريم يطابق وجود مروان', img:IMG_BASE_RETURN_DEATH+'death-time.jpg',
      short:'الوفاة وقعت داخل نافذة وجود سيارة مروان في المنطقة',
      full:'تقدير زمن الوفاة يضع مقتل كريم داخل الفترة التي دخلت وخرجت فيها سيارة مروان من المنطقة الصناعية، ومتسقًا مع توقيت التسجيل الصوتي.', unlocked:false, order:37 },
    { id:'marwan_bag_exit', tag:'كاميرات', crit:true, title:'مروان خرج بالحقيبة', img:IMG_BASE_RETURN_DEATH+'marwan-bag-exit.jpg',
      short:'يحمل حافظة الملفات التي كانت محور الخلاف',
      full:'لقطة خروج أوضح تسجل مروان يحمل حقيبة سوداء مطابقة لحافظة الملفات الظاهرة في موقع اللقاء، ما يربطه بالدافع وبما حدث بعد الصراع.', unlocked:false, order:38 },
    { id:'marwan_contact_dna', tag:'معمل جنائي', crit:true, title:'أثر مقاومة كريم يطابق مروان', img:IMG_BASE_RETURN_DEATH+'marwan-contact-dna.jpg',
      short:'خلايا تحت أظافر كريم من مروان',
      full:'خلايا جلدية تحت أظافر كريم تطابق مروان، وتثبت احتكاكًا جسديًا مباشرًا في الصراع الأخير.', unlocked:false, order:39 },
    { id:'motive_file', tag:'الملف المشفر', crit:true, title:'الملف يكشف سبب التصفية', img:IMG_BASE_RETURN_DEATH+'motive-file.jpg',
      short:'كريم جهز لنفسه حصة أكبر ونسخة تدين مروان',
      full:'فك الملف يثبت معاملات وملفات تدين الشريكين، ويظهر أن كريم نقل جزءًا أكبر من الأموال لنفسه واحتفظ بنسخة تترك مروان معرضًا وحده للانكشاف. ده يوفر دافع الخيانة والمال والخوف من الفضيحة.', unlocked:false, order:40 },
  ],

  phases: {
    enabled:true,
    initial:'death',
    order:['death','after_death','false_identity','fake_death','second_murder'],
    labels:{
      death:'وفاة كريم',
      after_death:'النشاط بعد الوفاة',
      false_identity:'هوية الجثمان',
      fake_death:'الوفاة المصطنعة',
      second_murder:'الجريمة الثانية',
    },
  },

  deductions: {
    enabled:true,
    items:[
      {
        id:'postmortem_anomaly', label:'المستحيل بعد الوفاة', phase:'death',
        requires:['voice_after_death','atm_after_death','gas_cctv'],
        question:'3 أنواع نشاط ظهرت بعد وفاة كريم المعلنة. إيه الاستنتاج المهني الصح في المرحلة دي؟',
        options:[
          {id:'a',text:'كريم رجع للحياة فعلًا'},
          {id:'b',text:'مروان هو القاتل أكيد'},
          {id:'c',text:'فرضية الوفاة أو هوية مستخدم ممتلكات كريم لازم تتراجع قبل أي اتهام'},
          {id:'d',text:'كل النشاط آلي ومش مهم'},
        ], correctOptionId:'c', unlockPhase:'after_death',
        successText:'فيه تناقض حقيقي بعد الوفاة. اتفتح مسار مراجعة هوية الجثمان بدل القفز لجاني.',
      },
      {
        id:'body_not_kareem', label:'هوية الجثمان', phase:'after_death',
        requires:['old_arm_record','scar_mismatch','dental_mismatch'],
        question:'إصابة قديمة مفقودة + ندبة غير مفسرة + سجل أسنان مختلف. إيه التفسير الأقوى اللي يجمع التلاتة؟',
        options:[
          {id:'a',text:'كل السجلات الطبية غلط في نفس الوقت'},
          {id:'b',text:'الجثمان الموجود في الشقة ليس كريم الدسوقي'},
          {id:'c',text:'كريم عالج كل العلامات القديمة قبل الحادث'},
          {id:'d',text:'مروان بدّل الأشعة فقط'},
        ], correctOptionId:'b', unlockPhase:'false_identity', resultEvidenceIds:['body_not_visual_match'],
        successText:'الهوية الأولى سقطت. السؤال بقى: مين الرجل الموجود في شقة كريم؟',
      },
      {
        id:'body_is_reda', label:'هوية الضحية الأولى', phase:'false_identity',
        requires:['fingerprint_reda','reda_missing_report'], requiresDeductions:['body_not_kareem'],
        question:'البصمة وبلاغ المفقودين بيقودوا لنفس الشخص. مين الجثمان الأول؟',
        options:[
          {id:'a',text:'رضا النجار'}, {id:'b',text:'مروان السيوفي'}, {id:'c',text:'شخص مجهول تمامًا'}, {id:'d',text:'د. هشام'},
        ], correctOptionId:'a',
        successText:'تم تثبيت هوية الضحية الأولى: رضا النجار.',
      },
      {
        id:'reda_was_lured', label:'كيف وصل رضا؟', phase:'false_identity',
        requires:['reda_building_cctv','reda_meeting_note'], requiresDeductions:['body_is_reda'],
        question:'رضا عنده موعد باسم كريم، دخل العمارة وما ظهرش خارجًا. إيه الاستنتاج الأقوى؟',
        options:[
          {id:'a',text:'دخل العمارة مصادفة'},
          {id:'b',text:'رضا كان بيطارد كريم'},
          {id:'c',text:'رضا تم استدراجه لمقابلة مرتبة مرتبطة بكريم'},
          {id:'d',text:'رضا هو اللي اخترع هوية كريم'},
        ], correctOptionId:'c',
        successText:'رضا لم يدخل المشهد صدفة؛ اللقاء كان مرتبًا قبل موته.',
      },
      {
        id:'fake_death_plan', label:'لماذا جثمان بديل؟', phase:'false_identity',
        requires:['substitute_note','kareem_id','body_belongings'], requiresDeductions:['body_is_reda','reda_was_lured'],
        question:'جثمان رضا يحمل هوية ومتعلقات كريم، ومعانا ملاحظة «البديل». إيه الغرض الأكثر اتساقًا؟',
        options:[
          {id:'a',text:'سرقة متعلقات كريم فقط'},
          {id:'b',text:'تجهيز رضا ليُعتقد أن كريم هو الميت'},
          {id:'c',text:'توريط ليلى في سرقة'},
          {id:'d',text:'رضا كان بيقلد كريم من نفسه'},
        ], correctOptionId:'b', unlockPhase:'fake_death',
        successText:'اتثبت اتجاه «الوفاة المصطنعة». دلوقتي لازم تعرف مين خطط لها ومين ساعده.',
      },
      {
        id:'kareem_alive', label:'هل كريم كان حيًا؟', phase:'fake_death',
        requires:['cloud_login','kareem_alive_cctv'], requiresDeductions:['fake_death_plan'],
        question:'سجل جهاز كريم وصورة الكاميرا الأوضح بيقولوا إيه؟',
        options:[
          {id:'a',text:'شخص آخر سرق باسورد كريم فقط'},
          {id:'b',text:'كريم نفسه كان حيًا بعد العثور على الجثمان الأول'},
          {id:'c',text:'الكاميرا قديمة'},
          {id:'d',text:'رضا كان حيًا بعد الجريمة'},
        ], correctOptionId:'b',
        successText:'كريم كان حيًا بعد «وفاته». العنوان الرسمي للوفاة الأولى كان كذبة.',
      },
      {
        id:'kareem_mastermind', label:'صاحب خطة الاختفاء', phase:'fake_death',
        requires:['escape_finance','doctor_contacts','sample_chain'], requiresDeductions:['kareem_alive'],
        question:'تجهيز السيولة واتصالات هشام والتلاعب بالعينة حصلوا قبل إعلان الوفاة. مين المستفيد وصاحب الخطة الأقرب؟',
        options:[
          {id:'a',text:'ليلى'}, {id:'b',text:'كريم نفسه'}, {id:'c',text:'عماد'}, {id:'d',text:'رضا'},
        ], correctOptionId:'b',
        successText:'كريم لم يكن مجرد شخص نجا من محاولة قتل؛ هو صاحب خطة اختفائه.',
      },
      {
        id:'kareem_killed_reda', label:'قاتل رضا النجار', phase:'fake_death',
        requires:['two_cups','sedative_trace','pharmacy_kareem','reda_audio','kareem_contact_dna'], requiresDeductions:['kareem_mastermind','reda_was_lured'],
        question:'اللقاء المرتب، المهدئ، مصدره، التسجيل وأثر المقاومة بيبنوا تسلسل واحد. مين قتل رضا؟',
        options:[
          {id:'a',text:'مروان'}, {id:'b',text:'د. هشام'}, {id:'c',text:'كريم'}, {id:'d',text:'ليلى'},
        ], correctOptionId:'c', unlockPhase:'second_murder',
        successText:'الجريمة الأولى اتقفلت منطقيًا: كريم قتل رضا واستخدم جثمانه لتزوير وفاته. لكن ملف كريم نفسه لسه ما اتقفلش.',
      },
      {
        id:'something_happened_kareem', label:'اختفاء كريم الحقيقي', phase:'second_murder',
        requires:['device_blackout','marwan_last_call'], requiresDeductions:['kareem_killed_reda'],
        question:'كريم كان مجهز هروب منظم، ثم جهازه ونشاطه توقفوا فجأة بعد موعد مع مروان. إيه الفرضية اللي تستحق التحقيق؟',
        options:[
          {id:'a',text:'نجح في الهروب ومفيش داعي نكمل'},
          {id:'b',text:'حصل لكريم شيء بعد الوفاة المزيفة ويجب تتبع اللقاء الأخير'},
          {id:'c',text:'رضا رجع للحياة'},
          {id:'d',text:'ليلى عطلت الإنترنت'},
        ], correctOptionId:'b',
        successText:'اتفتح مسار اللقاء الأخير بدل اعتبار اختفاء كريم نهاية ناجحة للهروب.',
      },
      {
        id:'real_kareem_dead', label:'الوفاة الحقيقية', phase:'second_murder',
        requires:['real_kareem_body','warehouse_blood'], requiresDeductions:['something_happened_kareem'],
        question:'الهوية هذه المرة مؤكدة بالأسنان والإصابة القديمة والبصمة وعينة مستقلة. إيه الحقيقة؟',
        options:[
          {id:'a',text:'الجثة الثانية رضا'},
          {id:'b',text:'كريم الدسوقي مات فعلًا بعد أن زوّر موته الأول'},
          {id:'c',text:'الجثة مجهولة'},
          {id:'d',text:'كريم زوّر موته مرة ثانية'},
        ], correctOptionId:'b',
        successText:'العودة من الموت كانت مؤقتة: كريم لم يمت أول مرة، لكنه قُتل فعلًا بعد ذلك.',
      },
      {
        id:'marwan_killed_kareem', label:'قاتل كريم الحقيقي', phase:'second_murder',
        requires:['death_time_match','marwan_bag_exit','marwan_contact_dna','motive_file','warehouse_audio'], requiresDeductions:['real_kareem_dead'],
        question:'مين يجمع وجوده وقت الوفاة، الصراع المباشر، أخذ الملف والدافع المالي/الجنائي؟',
        options:[
          {id:'a',text:'د. هشام'}, {id:'b',text:'مروان السيوفي'}, {id:'c',text:'ليلى'}, {id:'d',text:'عماد'},
        ], correctOptionId:'b',
        successText:'اكتملت الجريمة الثانية: مروان هو قاتل كريم الحقيقي.',
      },
    ],
  },

  investigationActions: [
    { id:'rd_voice_check', kind:'فحص رقمي', label:'افحص الرسائل الخارجة من هاتف كريم', phase:'death', requires:['emad_statement','marwan_pressure'], resultEvidenceIds:['voice_after_death'], successText:'ظهر إرسال صوتي بتوقيت بعد الوفاة المعلنة.' },
    { id:'rd_financial_after', kind:'تحريات مالية', label:'راجع آخر حركات بطاقة كريم', phase:'death', requires:['voice_after_death'], resultEvidenceIds:['atm_after_death'], successText:'اتسجل سحب نقدي بعد الوفاة المعلنة.' },
    { id:'rd_cctv_after', kind:'كاميرات', label:'راجع كاميرات نطاق استخدام البطاقة', phase:'death', requires:['atm_after_death'], resultEvidenceIds:['gas_cctv'], successText:'كاميرا محطة وقود أظهرت هيئة تشبه كريم.' },
    { id:'rd_laptop_note', kind:'فحص رقمي', label:'استرجع المسودات المحذوفة من لابتوب كريم', phase:'death', requires:['voice_after_death'], resultEvidenceIds:['substitute_note'], successText:'ظهرت ملاحظة غامضة عن «البديل».' },

    { id:'rd_old_medical', kind:'سجلات طبية', label:'قارن الجثمان بسجل كريم الطبي القديم', phase:'after_death', requiresDeductions:['postmortem_anomaly'], resultEvidenceIds:['old_arm_record'], successText:'ظهر اختلاف مهم في إصابة الساعد القديمة.' },
    { id:'rd_marks_exam', kind:'فحص جنائي', label:'اطلب فحص العلامات الجسدية المميزة', phase:'after_death', requires:['old_arm_record'], resultEvidenceIds:['scar_mismatch'], successText:'ظهر اختلاف جسدي مستقل عن إصابة الساعد.' },
    { id:'rd_dental', kind:'تحريات طبية', label:'هات سجل أسنان كريم وقارنه بالجثمان', phase:'after_death', requires:['old_arm_record','scar_mismatch'], resultEvidenceIds:['dental_mismatch'], successText:'سجل الأسنان كسر فرضية الهوية الأولى.' },

    { id:'rd_fingerprint_identity', kind:'بصمات', label:'طابق بصمات الجثمان بعد سقوط الهوية', phase:'false_identity', requiresDeductions:['body_not_kareem'], resultEvidenceIds:['fingerprint_reda'], successText:'البصمة قادت لاسم رضا النجار.' },
    { id:'rd_missing_report', kind:'تحريات', label:'راجع بلاغات المفقودين باسم رضا النجار', phase:'false_identity', requires:['fingerprint_reda'], resultEvidenceIds:['reda_missing_report'], successText:'بلاغ أسرة رضا طابق التوقيت والوصف.' },
    { id:'rd_reda_route', kind:'كاميرات', label:'تتبع آخر تحركات رضا', phase:'false_identity', requiresDeductions:['body_is_reda'], resultEvidenceIds:['reda_building_cctv'], successText:'رضا ظهر داخلًا عمارة كريم ولم يظهر خارجًا.' },
    { id:'rd_reda_phone', kind:'فحص رقمي', label:'افحص هاتف رضا ومواعيده', phase:'false_identity', requires:['reda_building_cctv'], requiresDeductions:['body_is_reda'], resultEvidenceIds:['reda_meeting_note'], successText:'ظهر موعد مباشر باسم كريم وصفقة خاصة.' },

    { id:'rd_escape_money', kind:'تحريات مالية', label:'راجع تصرفات كريم المالية قبل وفاته المعلنة', phase:'fake_death', requiresDeductions:['fake_death_plan'], resultEvidenceIds:['escape_finance'], successText:'النمط المالي كشف تجهيز سيولة وخط اتصال للهروب.' },
    { id:'rd_doctor_calls', kind:'فحص رقمي', label:'راجع اتصالات كريم بد. هشام قبل الحادث', phase:'fake_death', requiresDeductions:['fake_death_plan'], resultEvidenceIds:['doctor_contacts'], successText:'ظهر تواصل سابق على الجريمة ورسالة عن التقرير الأول.' },
    { id:'rd_sample_audit', kind:'تحليل جنائي', label:'راجع سلسلة حفظ العينة المرجعية', phase:'fake_death', requires:['doctor_contacts'], requiresDeductions:['body_not_kareem'], resultEvidenceIds:['sample_chain'], successText:'المراجعة أثبتت توجيه العينة المرجعية.' },
    { id:'rd_cloud_login', kind:'أمن رقمي', label:'راجع سجلات أمان حساب كريم وأجهزته', phase:'fake_death', requiresDeductions:['fake_death_plan'], resultEvidenceIds:['cloud_login'], successText:'جهاز معروف لكريم دخل الحساب بعد الوفاة.' },
    { id:'rd_hideout_cctv', kind:'كاميرات', label:'تتبع نطاق الجهاز وراجع كاميرات المنطقة', phase:'fake_death', requires:['cloud_login'], resultEvidenceIds:['kareem_alive_cctv'], successText:'تم الحصول على صورة أوضح لكريم حيًا.' },
    { id:'rd_recheck_apartment', kind:'إعادة فحص', label:'أعد فحص الشقة بعد معرفة هوية رضا', phase:'fake_death', requiresDeductions:['kareem_mastermind','body_is_reda'], resultEvidenceIds:['two_cups'], successText:'الكوبان أثبتا لقاءً مرتبًا بين كريم ورضا.' },
    { id:'rd_toxicology', kind:'معمل', label:'أعد التحليل السمي لرضا', phase:'fake_death', requires:['two_cups'], resultEvidenceIds:['sedative_trace'], successText:'ظهر مهدئ غير قاتل في جسد رضا وكوبه.' },
    { id:'rd_pharmacy', kind:'تحريات', label:'تتبع مصدر المادة المهدئة', phase:'fake_death', requires:['sedative_trace'], resultEvidenceIds:['pharmacy_kareem'], successText:'سجل الصرف ربط المادة بكريم قبل الحادث بيوم.' },
    { id:'rd_reda_audio', kind:'فحص رقمي', label:'استرجع الملفات الصوتية المحذوفة من هاتف رضا', phase:'fake_death', requires:['reda_meeting_note'], resultEvidenceIds:['reda_audio'], successText:'تسجيل قصير أثبت لقاء رضا بكريم داخل الشقة.' },
    { id:'rd_reda_dna', kind:'معمل', label:'افحص آثار المقاومة تحت أظافر رضا', phase:'fake_death', requires:['reda_audio','sedative_trace'], resultEvidenceIds:['kareem_contact_dna'], successText:'أثر المقاومة طابق كريم.' },

    { id:'rd_device_blackout', kind:'متابعة رقمية', label:'راجع استمرار نشاط كريم بعد الاختفاء', phase:'second_murder', requiresDeductions:['kareem_killed_reda'], resultEvidenceIds:['device_blackout'], successText:'ظهر توقف رقمي حاد وغير متسق مع نمط الهروب.' },
    { id:'rd_last_call', kind:'فحص رقمي', label:'استخرج آخر اتصال قبل توقف جهاز كريم', phase:'second_murder', requires:['device_blackout'], resultEvidenceIds:['marwan_last_call'], successText:'آخر موعد معروف كان مع مروان والملف.' },
    { id:'rd_marwan_car', kind:'كاميرات', label:'راجع كاميرات الطريق للنطاق الصناعي', phase:'second_murder', requiresDeductions:['something_happened_kareem'], resultEvidenceIds:['marwan_car_cctv'], successText:'سيارة مروان دخلت نطاق آخر إشارة لكريم.' },
    { id:'rd_search_warehouse', kind:'تفتيش', label:'حدد الموقع وفتش المخزن', phase:'second_murder', requires:['marwan_car_cctv'], resultEvidenceIds:['warehouse_scene'], successText:'تم العثور على مسرح صراع ثانٍ وهاتف كريم.' },
    { id:'rd_phone_recover', kind:'فحص رقمي', label:'استرجع ما يمكن من هاتف كريم المكسور', phase:'second_murder', requires:['warehouse_scene'], resultEvidenceIds:['warehouse_audio'], successText:'استُرجع جزء من تسجيل الخلاف الأخير.' },
    { id:'rd_warehouse_blood', kind:'معمل', label:'حلل الدم وآثار الجر داخل المخزن', phase:'second_murder', requires:['warehouse_scene'], resultEvidenceIds:['warehouse_blood'], successText:'الدم يعود لكريم ويشير لإصابة خطيرة.' },
    { id:'rd_back_room', kind:'تفتيش دقيق', label:'استكمل تفتيش الغرفة الخلفية والخدمات', phase:'second_murder', requires:['warehouse_blood','warehouse_audio'], resultEvidenceIds:['real_kareem_body'], successText:'تم العثور على جثمان ثانٍ وتأكيد أنه كريم الحقيقي.' },
    { id:'rd_real_autopsy', kind:'طب شرعي', label:'حدد زمن وفاة كريم الحقيقي', phase:'second_murder', requiresDeductions:['real_kareem_dead'], resultEvidenceIds:['death_time_match'], successText:'زمن الوفاة وقع داخل نافذة وجود مروان.' },
    { id:'rd_exit_camera', kind:'كاميرات', label:'حسّن لقطة خروج سيارة مروان', phase:'second_murder', requiresDeductions:['real_kareem_dead'], resultEvidenceIds:['marwan_bag_exit'], successText:'ظهر مروان خارجًا بحافظة الملفات.' },
    { id:'rd_kareem_nails', kind:'معمل جنائي', label:'افحص آثار المقاومة في جسد كريم', phase:'second_murder', requires:['real_kareem_body'], resultEvidenceIds:['marwan_contact_dna'], successText:'أثر المقاومة طابق مروان.' },
    { id:'rd_decrypt_file', kind:'فحص رقمي', label:'استرجع نسخة الملف المشفر وافتحها', phase:'second_murder', requires:['warehouse_audio','marwan_bag_exit'], resultEvidenceIds:['motive_file'], successText:'الملف كشف المال والخيانة والدافع لإسكات كريم.' },
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
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  evidenceCombinations: [],

  correctSuspectId: 'marwan',
  conclusiveEvidenceIds: ['marwan_car_cctv','warehouse_audio','real_kareem_body','death_time_match','marwan_bag_exit','marwan_contact_dna','motive_file'],
  conclusiveRequired: 6,

  theoryBuilder: {
    enabled:true,
    questions:[
      {
        id:'first_body', label:'مين كان الجثمان الأول في شقة كريم؟',
        options:[
          {id:'a',text:'كريم الدسوقي'}, {id:'b',text:'رضا النجار'}, {id:'c',text:'مروان السيوفي'}, {id:'d',text:'شخص مجهول لم نحدد هويته'},
        ], correctOptionId:'b',
      },
      {
        id:'first_killer', label:'مين قتل رضا النجار؟',
        options:[
          {id:'a',text:'مروان'}, {id:'b',text:'د. هشام'}, {id:'c',text:'كريم'}, {id:'d',text:'ليلى'},
        ], correctOptionId:'c',
      },
      {
        id:'fake_reason', label:'ليه اتجهز جثمان رضا بهوية كريم؟',
        options:[
          {id:'a',text:'لتزوير وفاة كريم وتمكينه من الاختفاء'}, {id:'b',text:'للحصول على ميراث رضا'}, {id:'c',text:'لتوريط ليلى'}, {id:'d',text:'لإخفاء سرقة بسيطة'},
        ], correctOptionId:'a',
      },
      {
        id:'doctor_role', label:'إيه دور د. هشام؟',
        options:[
          {id:'a',text:'قتل رضا'}, {id:'b',text:'سهّل مسار العينة والتعرّف الأولي المضلل'}, {id:'c',text:'قتل كريم'}, {id:'d',text:'لا علاقة له بأي شيء'},
        ], correctOptionId:'b',
      },
      {
        id:'second_killer', label:'مين قتل كريم الحقيقي بعد نجاح الوفاة المزيفة؟',
        options:[
          {id:'a',text:'ليلى'}, {id:'b',text:'عماد'}, {id:'c',text:'مروان'}, {id:'d',text:'هشام'},
        ], correctOptionId:'c',
      },
      {
        id:'second_motive', label:'إيه الدافع الأقوى لقتل كريم؟',
        options:[
          {id:'a',text:'الخلاف على الملفات والأموال وخوف مروان من انكشافه وتركه يتحمل القضية وحده'},
          {id:'b',text:'غيرة عاطفية'}, {id:'c',text:'خلاف على الشقة'}, {id:'d',text:'انتقام لرضا فقط'},
        ], correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — الحقيقة الكاملة', title:'عاد من الموت... ثم مات فعلًا',
      paragraphs:[
        'الجثمان الأول لم يكن كريم الدسوقي، بل رضا النجار. كريم استدرج رضا بحجة صفقة، هدّأه بمادة حصل عليها قبل الحادث، قتله، ثم وضع معه بطاقته ومتعلقاته ليصنع وفاة تبدو وكأنها وفاته هو. د. هشام ساعد في تمرير مسار تعرّف أولي مضلل عن طريق توجيه العينة المرجعية، بينما الأدلة الطبية المستقلة هي اللي كسرت الخدعة.',
        'كريم ظهر حيًا بعد وفاته المعلنة وكان يجهز للهروب بملف وأموال. لكن شراكته مع مروان انهارت بعد التنفيذ. اللقاء الأخير في المخزن تحول لصراع على الملف والخيانة المالية؛ زمن الوفاة، سيارة مروان، التسجيل، آثار المقاومة وخروجه بالحقيبة أثبتوا إن مروان قتل كريم الحقيقي واستولى على الملف. أول وفاة كانت كذبة صنعها كريم؛ الثانية كانت الجريمة اللي أنهت الخطة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — جزء من الحقيقة', title:'وصلت للقاتل... لكن الصورة ناقصة',
      paragraphs:[
        'شكك في مروان في مكانه، لكن قضية بالشكل ده ما ينفعش تتقفل على وجوده في المنطقة وحده. لازم تربط الجثة الحقيقية بزمن الوفاة والصراع وآثار المقاومة والملف اللي أخده بعد اللقاء.',
      ],
      hint:'قبل الاتهام النهائي اجمع 6 أدلة على الأقل من مسار المخزن: سيارة مروان، التسجيل، جثة كريم الحقيقية، زمن الوفاة، الحقيبة، أثر المقاومة والملف.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام خاطئ', title:'وقفت عند طبقة من الخدعة',
      paragraphs:[
        'اتهمت {wrongName}، لكن القضية كان فيها جريمتان منفصلتان لازم ما يتخلطوش. كريم هو قاتل رضا وصاحب الوفاة المزيفة، أما قاتل كريم الحقيقي بعد ذلك فهو مروان. الخلط بين المساعد في التغطية، القاتل الأول والقاتل الثاني بيغيّر النتيجة بالكامل.',
      ]
    }
  }
};

/* ============================================================
   قائمة الأصول البصرية المقترحة — 27 أصل أساسي تقريبًا
   الصور النصية/السجلات البسيطة يفضّل بناؤها داخل UI بدل توليدها
   كنص مصوّر، لتقليل أخطاء العربية وسهولة تعديل التواريخ لاحقًا.

   شخصيات: kareem.jpg, marwan.jpg, leila.jpg, hisham.jpg, emad.jpg, reda.jpg
   غلاف/مشاهد: cover.jpg + scene1..scene4
   محاور بصرية أساسية:
   scene-overview.jpg, body-belongings.jpg, gas-cctv.jpg,
   old-arm-record.jpg, dental-record.jpg, reda-missing.jpg,
   reda-building-cctv.jpg, kareem-alive-cctv.jpg, two-cups.jpg,
   reda-audio.jpg, warehouse.jpg, warehouse-audio.jpg,
   real-kareem-body.jpg, marwan-car-cctv.jpg, marwan-bag-exit.jpg

   باقي المستندات يمكن عملها كـ UI cards داخل اللعبة عند تحسين العرض.
   ============================================================ */