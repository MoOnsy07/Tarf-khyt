/* ============================================================
   بيانات قضية Premium: الخروج الأخير
   CASE 062 — قضية مستقلة بالكامل عن باقي القضايا.
   مبنية على الاستنتاجات المرحلية الموجودة في theory-builder-safety-fix.js.

   مبدأ التصميم:
   - السجل قد يكون صحيحًا وتفسيره غلط.
   - الجهاز/البطاقة لا يساوي صاحبه.
   - لا يوجد "طابق صفر" سري.
   - كل شخصية تخفي مخالفة مختلفة؛ لا يوجد شخص واحد نفّذ كل الأحداث.
   - حسام مسؤول عن التدافع الذي أدى للإصابة، وشريف مسؤول عن سجل الخروج الوهمي وتأخير اكتشاف كريم.
   ============================================================ */

const IMG_BASE_FINAL_EXIT = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/final-exit/';

const CASE_FINAL_EXIT = {
  id: 'final-exit',
  title: 'الخروج الأخير',
  caseNo: 'CASE 062',
  subtitle: 'التجمع الخامس، القاهرة الجديدة، القاهرة',
  coverImg: IMG_BASE_FINAL_EXIT + 'cover.jpg',
  difficulty: 'صعبة جدًا',
  estMinutes: 80,
  investigationPoints: 48,
  teaser: 'موظف مراجعة داخلية وُجد ميتًا في أرشيف برج إداري، رغم أن بطاقة دخوله سجلت خروجه قبل ساعات ورسالة صوتية وصلت بعد ذلك تقول إنه نزل فعلًا. لو كل السجلات صحيحة... إزاي فضِل جوه؟',

  isPremium: true,
  premiumType: 'telegram-exclusive',
  premiumLabel: 'حصرية لأعضاء القناة',
  categories: ['murder', 'mystery', 'digital', 'corruption', 'thriller'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  location: {
    governorate: 'القاهرة', district: 'القاهرة الجديدة', locality: 'التجمع الخامس', divisionType: 'قسم'
  },

  briefing: {
    heroImg: IMG_BASE_FINAL_EXIT + 'cover.jpg',
    heroCaption: 'CASE 062 — رجل خرج في السجلات فقط',
    text1: 'الساعة 06:38 صباحًا، عامل نظافة لاحظ إن باب غرفة الأرشيف في B2 مش مقفول بالشكل المعتاد. الأمن دخل ولقى كريم نادر مراد، مدير المراجعة الداخلية، فاقدًا للحياة بين ملفات مشروع قديم.',
    text2: 'المشكلة إن نظام الدخول والخروج بيقول إن بطاقة كريم خرجت الساعة 23:31، وبعدها وصلت رسالة صوتية من هاتفه: «أنا نزلت خلاص... هكلمك لما أوصل». مفيش اقتحام واضح، ومفيش كاميرا بتصور كريم وهو بيغادر. أول هدف ليك مش تعرف مين قتله؛ أول هدف تثبت هل كريم خرج أصلًا.',
    meta: [
      { label:'الضحية', value:'كريم نادر مراد — 39 سنة — مدير مراجعة داخلية' },
      { label:'مكان العثور', value:'غرفة الأرشيف — B2 — برج إداري' },
      { label:'وقت العثور', value:'06:38 صباحًا' },
      { label:'السؤال الأول', value:'هل سجل الخروج يثبت إن كريم نفسه غادر؟' }
    ]
  },

  prologue: [
    { scene:'المشهد ١ — باب الأرشيف', img:IMG_BASE_FINAL_EXIT+'archive-wide.jpg', text:'غرفة أرشيف هادية في B2. لا كسر واضح في الباب، ولا فوضى تكفي وحدها تشرح اللي حصل. كريم موجود بين الملفات وهاتفه قريب منه.' },
    { scene:'المشهد ٢ — سجل يقول إنه خرج', img:IMG_BASE_FINAL_EXIT+'lobby-gate.jpg', text:'قارئ البوابة سجل EXIT لبطاقة كريم الساعة 23:31. لكن السجل لا يحتوي صورة ولا اسم الشخص اللي كان ماسك البطاقة.' },
    { scene:'المشهد ٣ — رسالة وصلت متأخرة', img:IMG_BASE_FINAL_EXIT+'phone-scene.jpg', text:'بعد وقت الخروج المسجل وصلت رسالة صوتية من هاتف كريم: «أنا نزلت خلاص... هكلمك لما أوصل». وقت الوصول واضح، وقت التسجيل لسه محتاج فحص.' },
    { scene:'المشهد ٤ — زر غير موجود', img:IMG_BASE_FINAL_EXIT+'elevator-panel.jpg', text:'لوحة المصعد أمامك فيها B2 وB1 وG والأدوار العليا. مفيش زر اسمه 0. خليك فاكر التفصيلة من غير ما تفسرها قبل الدليل.' }
  ],

  suspects: [
    {
      id:'sara', name:'سارة فوزي', role:'المديرة المالية', img:IMG_BASE_FINAL_EXIT+'suspect-sara.jpg', avatarEmoji:'📊', age:41,
      alibi:'قالت إن آخر مرة شافت كريم كانت قبل التاسعة وإنها خرجت من المنطقة المؤمنة الساعة 21:08.',
      questions:[
        { q:'طبيعة علاقتك بكريم كانت إيه؟', unlockId:'sara_dispute', a:'"علاقة شغل. هو مراجعة داخلية وأنا مالية، فطبيعي يحصل احتكاك. قبل الحادث بيومين اختلفنا على ملفات مشروع قديم وطريقة طلبه للمستندات."' },
        { q:'إمتى آخر مرة شوفتي كريم؟', a:'"قبل التسعة تقريبًا. كان لسه عند مكتبه ومعاه ملفات، وأنا نزلت بعد كده."' },
        { q:'إمتى خرجتي من المبنى؟', a:'"بطاقتي سجلت خروج بعد التسعة بشوية. ما افتكرتش إن التوقيت ده هيبقى مهم."' },
        { q:'كنتِ عارفة هو بيراجع أنهي ملف؟', requires:['sara_dispute'], a:'"كان بيراجع أكتر من ملف. عارفة إنه طلب حاجات تخص مشروع قديم، لكن مش معنى ده إني عارفة هو وصل لإيه."' },
        { q:'عربيتك خرجت 23:46، كنتِ فين بعد 21:08؟', requires:['sara_car_exit'], minPhase:'alibis', a:'"نزلت للموقف وقعدت فترة، ورجعت منطقة الاجتماعات مرة. كنت بعمل مكالمات ومراجعة ورق."' },
        { q:'اللابتوب بتاعك ظهر في B1، وقابلتي كريم بعد العاشرة. ليه قلتي إن آخر مرة كانت قبل التسعة؟', requires:['sara_laptop_b1','b1_meeting_proof'], requiresDeductions:['sara_lied_last_contact'], minPhase:'alibis', closesInterrogation:true, a:'"خفت أبقى المتهمة الأولى. قابلته فعلًا عشان هو وراني اختلاف بين نسختين من محضر المشروع، واتخانقنا شوية في الكلام، وبعدها خرجت قبله."' }
      ],
      confrontations:{ financial_request:'المستند عاجل لأن كريم كتب عليه كده. أنا سلمت له جزء من المطلوب رسميًا.', b1_meeting_proof:'أيوه قابلته. إخفاء اللقاء كان غلط، لكن الكاميرا تثبت إنه خرج بعدي حي وبيمشي لوحده.' },
      loseMsg:'سارة كذبت عن آخر لقاء وعندها فجوة زمنية، لكن كريم ظهر بعدها حيًا وتحرك وحده. الكذب مش بديل عن إثبات لحظة الإصابة.'
    },
    {
      id:'sherif', name:'شريف أمين', role:'مشرف الأمن الليلي', img:IMG_BASE_FINAL_EXIT+'suspect-sherif.jpg', avatarEmoji:'🛡️', age:36,
      alibi:'موجود في البرج طوال الوردية، وقال إن سجل البوابة يعكس حركة البطاقات كما هي.',
      questions:[
        { q:'مسؤولياتك ليلة الحادث كانت إيه؟', unlockId:'sherif_shift', a:'"متابعة الكاميرات والبوابات وأفراد الأمن وأي بلاغ يحصل في الوردية."' },
        { q:'سجل كريم بيقول خرج 23:31. شفته بيخرج؟', a:'"لا. لو النظام مسجل خروج يبقى البطاقة اتقرت على قارئ الخروج، أنا مكنتش واقف على القارئ."' },
        { q:'ليه فيه فجوة في كاميرا من كاميرات الممر؟', requires:['cctv_timeline'], a:'"وحدة التسجيل عملت إعادة تشغيل، وكتبت العطل وقتها. راجعوا سجل الجهاز بدل ما تعتبروا أي فجوة حذف متعمد."' },
        { q:'مين يقدر يفتح الأرشيف بعد 22:00؟', unlockId:'archive_permissions', a:'"صلاحيات محدودة وبطاقات طوارئ للأمن. الموظف العادي مش كل صلاحيات النهار بتفضل شغالة بالليل."' },
        { q:'كنت فين 22:57 وقت فتح الأرشيف؟', requires:['sherif_landline'], minPhase:'alibis', a:'"كنت على الهاتف الأرضي في غرفة المراقبة في بلاغ داخلي. التسجيل نفسه يثبت ده."' },
        { q:'بطاقة كريم وصلتلك قبل 23:31 واستخدمتها بنفسك، صح؟', requires:['card_handover','sherif_gate_presence'], requiresDeductions:['sherif_used_card'], minPhase:'card', closesInterrogation:true, a:'(يسكت) "آه. افتكرت إنه خرج من مسار الخدمات ونسي البطاقة، فقفلت وجوده على النظام. كنت بحاول أمنع مراجعة مخالفات الوردية... ماكنتش عارف إنه منهار جوه الأرشيف."' }
      ],
      confrontations:{ cctv_timeline:'فجوة الكاميرا اتسجلت كعطل. وجود فجوة لوحده مايثبتش إني مسحت حاجة.', emergency_card_log:'بطاقات الطوارئ بنسلمها لأفراد الأمن لتنفيذ فتحات بعد الوقت. لازم تراجع سجل المهمة.', sherif_gate_presence:'وجودي عند البوابة صحيح. المشكلة الحقيقية إني استخدمت بطاقة كريم بدل ما أتأكد هو فين.' },
      loseMsg:'شريف لوّث السجل وأخّر اكتشاف كريم، لكن الأدلة لا تضعه عند لحظة الإصابة. لازم تفرق بين سبب الإصابة والتستر الإداري بعدها.'
    },
    {
      id:'marwan', name:'مروان زكي', role:'مهندس تشغيل وصيانة المبنى', img:IMG_BASE_FINAL_EXIT+'suspect-marwan.jpg', avatarEmoji:'🛠️', age:44,
      alibi:'قال إنه أنهى بلاغ مصعد وخرج قرابة 22:10.',
      questions:[
        { q:'مسؤولياتك في البرج إيه؟', unlockId:'marwan_role', a:'"تشغيل وصيانة ومتابعة أعطال المصاعد وأنظمة الخدمات. مش كل أمر فني معناه إني نفذته بإيدي."' },
        { q:'كان فيه مشكلة مصعد ليلة الحادث؟', a:'"كان فيه تنبيه بسيط. فعلت وضع الخدمة للحظات ورجع Normal قبل ما أمشي."' },
        { q:'يعني إيه LEVEL_REF:0؟', requires:['elevator_diagnostic'], a:'"مرجع كنترول، مش اسم دور مكتوب على باب. ممكن يبقى نقطة معايرة أو مرجع غير مستخدم. لازم تبص على جدول الكنترول."' },
        { q:'مين يقدر يشغل وضع الخدمة؟', unlockId:'service_access_info', a:'"فيه مفتاح محلي وصلاحيات فنية. الحدث نفسه يقول مصدر الأمر لو جبت السجل التفصيلي."' },
        { q:'المفتاح MNT-02 كان في عهدتك وفعل Service Mode 22:17. إنت اللي شغلته؟', requires:['service_key_log'], minPhase:'gap', a:'"أيوه. دي كانت معالجة تنبيه فني حقيقية، وبعدها رجع النظام طبيعي."' },
        { q:'كنت عارف إن مسار الخدمة اتستخدم قديمًا لنقل مستندات من غير تسجيل مخزني؟', requires:['old_service_email'], requiresDeductions:['document_scheme'], minPhase:'missing_file', closesInterrogation:true, a:'"كنت عارف إن مستندات بتطلع للتوقيع وترجع، وخبيت ده لأنه إجراء مخالف. ماكنتش عارف إنها بتتبدل، ومش موجود أصلًا في البرج وقت الجزء الأساسي من وفاة كريم."' }
      ],
      confrontations:{ elevator_diagnostic:'رقم 0 في الكنترول مش طابق سري. افهم الجدول الفني الأول.', marwan_external_alibi:'خروجي بعد 22:23 وكاميرا محطة الوقود يثبتوا إني ماكنتش موجود وقت فتح الأرشيف.', old_service_email:'وافقت على حركة ورق خارج النظام، وده غلط إداري. لكنه شيء مختلف عن وفاة كريم.' },
      loseMsg:'مروان عنده المعرفة التقنية ومخالفات قديمة، لكنه مستبعد زمنيًا من فتح الأرشيف وما بعده بأدلة مستقلة.'
    },
    {
      id:'laila', name:'ليلى سمير', role:'المساعدة التنفيذية لكريم', img:IMG_BASE_FINAL_EXIT+'suspect-laila.jpg', avatarEmoji:'🗂️', age:30,
      alibi:'قالت إنها غادرت 20:43 وكانت في منزلها معظم الليل.',
      questions:[
        { q:'إمتى آخر مرة شوفتي كريم؟', unlockId:'laila_archive_request', a:'"قبل ما أمشي. كان مركز في مراجعة ملفات وطلب مني خلال اليوم حاجات من الأرشيف."' },
        { q:'حصل تواصل بعد ما مشيتي؟', a:'"آه، سألني عن مكان ملف قديم ورديت عليه من البيت."' },
        { q:'كان متوتر؟', a:'"مستعجل. وسألني أكتر من مرة إذا كان حد بيسأل هو لسه في المكتب ولا مشي."' },
        { q:'كنتِ عارفة إن ملحق التعاقدات ناقص؟', requires:['missing_attachment_email'], minPhase:'missing_file', a:'"كنت عارفة إنه بيدور عليه، بس ماكنتش عارفة هو اكتشف إيه فيه."' },
        { q:'إنتِ قلتي إنك عرفتي بالملحق الصبح، والبريد يثبت إن كريم طلبه منك قبلها بثلاث أيام.', requires:['missing_attachment_email'], requiresDeductions:['laila_knew_attachment'], minPhase:'missing_file', a:'"قللت من معرفتي لأن كل التصاريح والملفات كانت بتعدي عليا إداريًا، وخفت أبقى جزء من المشكلة."' },
        { q:'حسابك أنشأ EX-12 وتصريح OPS-417. مين طلبهم؟', requires:['ex12_record','ops417_record'], minPhase:'after_impact', closesInterrogation:true, a:'"أنا كنت بجهز النماذج، مش باعتمدها ولا بشغل المصعد. EX-12 اتعمل كزيارة إدارية، وOPS-417 اتجهز بطلب تشغيل قديم."' }
      ],
      confrontations:{ missing_attachment_email:'آه كنت عارفة إنه بيدور على الصفحة، لكن معرفتي بالطلب مش معناها إني كنت عارفة محتواها.', ex12_record:'التصريح اتعمل من حسابي، لكن الشخص اللي استخدمه هو حسام، وسجل الدخول يثبت ده.' },
      loseMsg:'ليلى أخفت حجم معرفتها وأنشأت نماذج، لكن وجودها المنزلي يستبعدها من لحظات محورية في البرج.'
    },
    {
      id:'hossam', name:'حسام فؤاد', role:'مندوب إداري لشركة الشرق للخدمات الهندسية', img:IMG_BASE_FINAL_EXIT+'suspect-hossam.jpg', avatarEmoji:'📁', age:38,
      alibi:'دخل بتصريح زائر مساءً وغادر بسيارة الشركة قرابة 22:47.',
      questions:[
        { q:'ليه جيت البرج ليلة الحادث؟', minPhase:'after_impact', unlockId:'hossam_visit', a:'"كنت جاي أسلم أوراق متابعة تخص عقد قديم. اتقال لي أسيبها عند الإدارة وأمشي."' },
        { q:'قابلت كريم؟', requires:['hossam_visit'], minPhase:'after_impact', a:'(يتردد) "شوفته في الممر. سألني عن الورق اللي معايا."' },
        { q:'تصريحك EX-12 فتح باب الخدمات 22:38. حصل إيه هناك؟', requires:['ex12_use'], minPhase:'after_impact', a:'"كريم وقفني وشد الملف من إيدي. الكلام علي، وحصل شد على الورق."' },
        { q:'هل حصل احتكاك جسدي؟', requires:['hossam_bag_clip'], minPhase:'after_impact', a:'"آه، شدينا الملف من بعض. هو رجع خطوة لورا، لكن أنا ما ضربتوش بأداة."' },
        { q:'بطاقة كريم وقعت أثناء التدافع؟', requires:['badge_clip_piece'], minPhase:'card', a:'"لقيت كارت موظف وقع وسط الورق بعد ما بعدت، وسبته عند نقطة الأمن وأنا خارج."' },
        { q:'آثار الباب ومسار الدم وإعادة البناء بتقول إن الارتطام حصل أثناء التدافع بينكم. ليه أخفيت ده؟', requires:['service_door_dna','injury_reconstruction','hossam_scuffle'], requiresDeductions:['injury_mechanism'], minPhase:'final', closesInterrogation:true, a:'"لأن الراجل مات. خفت إن مجرد اعترافي إننا شدينا الورق من بعض يخليني قاتل متعمد. ماكنتش أعرف إن الخبطة اللي حصلت له خطيرة."' }
      ],
      confrontations:{ ex12_use:'أيوه التصريح كان معايا، وكنت في الممر. ده يثبت إني قابلته، مش إني خططت أقتله.', service_door_dna:'لو ارتطم بالباب وقت الشد فده يفسر الأثر، لكن أنا ما استخدمتش سلاح.', card_handover:'سلمت البطاقة للأمن وأنا خارج. ما استخدمتهاش على البوابة 23:31.' },
      loseMsg:'حسام هو آخر شخص ثبت حصول تدافع جسدي بينه وبين كريم قبل ظهور آثار الإصابة، لكن لازم تثبت آلية الارتطام بدل تحويل الشجار تلقائيًا لقتل متعمد.'
    }
  ],

  evidence: [
    { id:'archive_room', tag:'مسرح العثور', crit:false, title:'غرفة الأرشيف B2', img:IMG_BASE_FINAL_EXIT+'archive-wide.jpg', short:'كريم موجود داخل الأرشيف ولا يوجد اقتحام واضح', full:'الغرفة مرتبة نسبيًا، بعض الملفات خارج أماكنها، ولا توجد آثار اقتحام واضحة. وجود كريم هنا لا يثبت أن الإصابة حدثت هنا.', unlocked:true, order:1 },
    { id:'archive_door', tag:'فحص الباب', crit:false, title:'باب الأرشيف سليم', img:IMG_BASE_FINAL_EXIT+'archive-door-reader.jpg', short:'القفل الإلكتروني يعمل ولا توجد كسور', full:'فتح الباب بعد ساعات العمل يحتاج صلاحية مناسبة. لا توجد علامة كسر أو إجبار ميكانيكي.', unlocked:true, order:2 },
    { id:'elevator_panel', tag:'المصعد', crit:false, title:'لوحة بلا زر صفر', img:IMG_BASE_FINAL_EXIT+'elevator-panel.jpg', short:'B2 وB1 وG والأدوار العليا — لا يوجد زر 0', full:'لوحة الاستخدام العادي لا تحتوي على مستوى اسمه 0. أي ظهور للرقم في سجل الكنترول يحتاج تفسيرًا فنيًا منفصلًا.', unlocked:true, order:3 },
    { id:'victim_phone', tag:'مسرح العثور', crit:true, title:'هاتف كريم داخل الأرشيف', img:IMG_BASE_FINAL_EXIT+'phone-scene.jpg', short:'الهاتف موجود قرب الملفات والبطارية شبه فارغة', full:'الهاتف لم يغادر المكان عند العثور على كريم. بياناته تحتاج فحصًا جنائيًا قبل تفسير التوقيتات.', unlocked:true, order:4 },
    { id:'card_reader', tag:'نظام المبنى', crit:false, title:'قارئ بطاقات سليم', img:IMG_BASE_FINAL_EXIT+'archive-door-reader.jpg', short:'لا عبث ظاهر في القارئ', full:'القارئ يعمل بصورة طبيعية، وبالتالي أي حدث مسجل يحتاج تفسير صاحب البطاقة لا اتهام النظام بالتزوير تلقائيًا.', unlocked:true, order:5 },
    { id:'fiber_trace', tag:'أثر مادي', crit:false, title:'ألياف صناعية قرب الرف', img:IMG_BASE_FINAL_EXIT+'fiber-trace.jpg', short:'ألياف داكنة لا يمكن نسبها لشخص بصريًا', full:'العينة من بوليستر مقاوم للاحتكاك وتوجد في حقائب معدات وأغطية وعربات نقل، لذلك لا تربط مشتبهًا بعينه.', unlocked:false, order:6 },

    { id:'access_log', tag:'سجل دخول وخروج', crit:true, title:'بطاقة كريم — EXIT 23:31', img:IMG_BASE_FINAL_EXIT+'ui-access-log.jpg', short:'النظام يثبت استخدام البطاقة لا هوية حاملها', full:'السجل: 19:52 دخول، 23:31 خروج. لا يحتوي السجل صورة للشخص الذي مرر البطاقة ولا يثبت خروجه إلى الشارع.', unlocked:false, order:10 },
    { id:'cctv_timeline', tag:'كاميرات', crit:true, title:'لا توجد لقطة واضحة لخروج كريم', img:IMG_BASE_FINAL_EXIT+'ui-cctv-timeline.jpg', short:'الكاميرات لا تؤكد مرور كريم عند 23:31', full:'هناك فجوة قصيرة في إحدى التغذيات، لكن باقي الكاميرات لا تقدم مشهدًا واضحًا لكريم وهو يغادر المبنى عند وقت سجل البطاقة.', unlocked:false, order:11 },
    { id:'audio_message', tag:'هاتف كريم', crit:true, title:'«أنا نزلت خلاص...»', img:null, short:'الرسالة وصلت 23:37', full:'التسجيل الصوتي يقول: «أنا نزلت خلاص... هكلمك لما أوصل». وصوله 23:37 لا يثبت أنه أُنشئ في نفس اللحظة.', unlocked:false, order:12 },

    { id:'audio_metadata', tag:'بيانات رقمية', crit:true, title:'التسجيل أُنشئ 22:42', img:IMG_BASE_FINAL_EXIT+'ui-audio-metadata.jpg', short:'إنشاء 22:42 — بدء مزامنة 23:34 — وصول 23:37', full:'بيانات الملف تفصل بوضوح بين وقت الإنشاء ووقت وصوله للخادم. لا توجد مؤشرات واضحة على تركيب رقمي للصوت.', unlocked:false, order:20 },
    { id:'phone_network', tag:'تحليل شبكة', crit:false, title:'اتصالات هاتف كريم داخل البرج', img:IMG_BASE_FINAL_EXIT+'ui-phone-network.jpg', short:'الهاتف ظهر قرب نطاقات الحركة وB2 ثم استعاد الاتصال لاحقًا', full:'اتصال Wi-Fi يحدد نطاق نقطة وصول لا GPS. البيانات تدعم بقاء الهاتف داخل البرج لكنها لا تساوي موقع كريم في كل لحظة.', unlocked:false, order:21 },
    { id:'elevator_diagnostic', tag:'سجل فني', crit:true, title:'LEVEL_REF:0 / SERVICE', img:IMG_BASE_FINAL_EXIT+'ui-elevator-diagnostic.jpg', short:'22:18 ظهر LEVEL_REF:0 من مصدر LOCAL', full:'السجل الفني: SERVICE_MODE ثم LEVEL_REF:0 ثم عودة إلى B1/NORMAL. الرقم مرجع كنترول ويحتاج جدول إعدادات قبل اعتباره طابقًا.', unlocked:false, order:22 },
    { id:'service_key_log', tag:'سجل فني', crit:false, title:'المفتاح المحلي MNT-02', img:null, short:'الأمر 22:17 تم بمفتاح في عهدة مروان', full:'مروان يعترف بتنفيذ إجراء الخدمة، والسجل يبين عودة النظام للوضع الطبيعي بعد دقائق.', unlocked:false, order:23 },
    { id:'controller_map', tag:'مخطط فني', crit:true, title:'المرجع 0 غير مستخدم كطابق', img:IMG_BASE_FINAL_EXIT+'ui-building-map.jpg', short:'Controller Ref 0 لا يقابله طابق معماري', full:'جدول الكنترول يربط -2 بـB2 و-1 بـB1 و1 بـG، بينما 0 خانة مرجعية غير مخصصة لطابق ركاب.', unlocked:false, order:24 },
    { id:'service_route', tag:'مخطط المبنى', crit:true, title:'مسار خدمة يتجاوز بعض نقاط التتبع', img:IMG_BASE_FINAL_EXIT+'service-corridor.jpg', short:'الممر الفني يصل مناطق لا تمر بكل البوابات المعتادة', full:'المسار لا يصنع طابقًا سريًا؛ هو ممر خدمة يسمح بحركة بين مناطق لا تمر بنفس قارئات المسار العام.', unlocked:false, order:25 },

    { id:'autopsy_initial', tag:'طب شرعي', crit:true, title:'إصابة قوية في مؤخرة الرأس', img:null, short:'الوفاة بين 22:25 و23:05 تقريبًا', full:'إصابة خلفية جانبية بالرأس مع نزيف داخلي. الإصابة لا تضمن فقدان الوعي فورًا، ومكان العثور لا يحدد مكان الإصابة.', unlocked:false, order:30 },
    { id:'blood_mismatch_archive', tag:'طب شرعي', crit:true, title:'الدم في الأرشيف أقل من المتوقع', img:null, short:'الكمية لا تدعم وحدها أن الإصابة بدأت هنا', full:'كمية الدم الظاهرة في الأرشيف أقل مما يتوقع لو وقع الحدث الرئيسي في نفس الموضع، لكن هذا يحتاج مسار آثار إضافي.', unlocked:false, order:31 },
    { id:'shoe_trace', tag:'معمل', crit:false, title:'آثار على حذاء كريم لا تطابق الأرشيف', img:null, short:'غبار معدني وشحم ومطاط', full:'تركيب الأثر أقرب لمناطق الخدمات حول المصعد من أرضية الأرشيف وحدها.', unlocked:false, order:32 },
    { id:'service_blood', tag:'أثر حيوي', crit:true, title:'أثر دم كريم في منطقة الخدمات', img:null, short:'كريم كان في المنطقة وهو مصاب أو بعد بداية الإصابة', full:'أثر دقيق مطابق لكريم قرب المسار الفني. لا يثبت وحده أن الضربة حدثت في نفس النقطة.', unlocked:false, order:33 },
    { id:'cart_trace', tag:'عربة ملفات', crit:false, title:'DNA كريم وآثار عجلة على عربة الأرشيف', img:null, short:'العربة استُخدمت في مسار من ناحية المصعد للأرشيف', full:'في البداية يبدو كأنه نقل جسد، لكن الأثر يثبت استخدام كريم للعربة فقط ولا يحدد حالته وقت الاستخدام.', unlocked:false, order:34 },
    { id:'door_access_2257', tag:'سجل الأبواب', crit:true, title:'فتح الأرشيف 22:57 ببطاقة طوارئ', img:IMG_BASE_FINAL_EXIT+'ui-door-report.jpg', short:'Credential AC-04 فتح الباب', full:'الفتح تم بصلاحية طوارئ تابعة للأمن. هوية الشخص المنفذ تحتاج سجل المهمة، ولا يجوز نسب البطاقة لشريف تلقائيًا.', unlocked:false, order:35 },
    { id:'emergency_card_log', tag:'سجل الأمن', crit:false, title:'بطاقة الطوارئ خرجت لمهمة فتح', img:null, short:'البطاقة B أُخذت لتنفيذ طلب موظف', full:'سجل المهمة يربط أخذ البطاقة بطلب فتح بعد ساعات العمل، ما يضعف فرضية السرقة المتعمدة للبطاقة.', unlocked:false, order:36 },

    { id:'archive19', tag:'ملفات الأرشيف', crit:true, title:'الصندوق ARCH-19', img:null, short:'ملحق التعاقدات — نسخة المراجعة غير موجودة في مكانها', full:'فهرس الصندوق يسجل 8 صفحات، بينما النسخة المتاحة 7 صفحات فقط. الصفحة الأخيرة مرتبطة بتصاريح تشغيل خارج ساعات العمل.', unlocked:false, order:40 },
    { id:'missing_attachment_email', tag:'بريد كريم', crit:true, title:'كريم طلب الملحق قبل الحادث بثلاثة أيام', img:null, short:'ليلى كانت تعرف أن كريم يبحث عن الملحق', full:'رسالة رسمية إلى ليلى تطلب «ملحق التعاقدات — نسخة المراجعة» بالاسم، ما يناقض تقليلها السابق لحجم معرفتها.', unlocked:false, order:41 },
    { id:'printer_job', tag:'سجل الطباعة', crit:false, title:'كريم طبع 8 صفحات ثم أعاد صفحة واحدة', img:null, short:'JOB-8113 ثمان صفحات وJOB-8114 إعادة صفحة منفردة', full:'كريم كان مركزًا على صفحة محددة من العقد قبل الواقعة، لكن السجل لا يخزن محتواها.', unlocked:false, order:42 },
    { id:'page8_preview', tag:'نسخة احتياطية', crit:true, title:'Preview للصفحة الثامنة', img:null, short:'صلاحية تشغيل ليلية ومسار خدمة', full:'النسخة منخفضة الجودة تظهر استثناءات تشغيل خارج الساعات ومسار اعتماد يسمح بالحركة دون كل خطوات التتبع المعتادة.', unlocked:false, order:43 },
    { id:'old_service_pattern', tag:'تحريات تاريخية', crit:true, title:'LEVEL_REF:0 ظهر في ليالٍ أقدم', img:null, short:'نفس النمط الفني سبق ليلة وفاة كريم', full:'ظهور النمط قبل الجريمة يثبت أنه ليس خدعة أُنشئت خصيصًا ليلة الوفاة، بل مسار تشغيل سبق استخدامه.', unlocked:false, order:44 },
    { id:'receipt_versions', tag:'مقارنة مستندات', crit:true, title:'نسختان من محضر استلام مشروع', img:null, short:'نسخة بها ملاحظات فنية وأخرى بدونها', full:'النسخة الخالية من الملاحظات سمحت بإغلاق المشروع وصرف الدفعة النهائية، بينما Scan المتابعة ظهر بعد الصرف.', unlocked:false, order:45 },
    { id:'ops417_record', tag:'تصريح تشغيل', crit:true, title:'OPS-417 بلا أصل ورقي', img:null, short:'التصريح أنشأته ليلى وطُلِب تحت مسار فني قديم', full:'السجل يثبت أن ليلى جهزت النموذج إداريًا، بينما المراسلات الفنية تربط تنفيذه بمسار صيانة ومروان أخفى مشاركته في حركة مستندات خارج الدورة.', unlocked:false, order:46 },
    { id:'old_service_email', tag:'بريد قديم', crit:true, title:'«التسليم دون تسجيل حركة مخزنية»', img:null, short:'مروان وافق على حركة مستندات خارج المسار', full:'بريد قديم يطلب فتح الخدمة ونقل مستندات دون تسجيل مخزني بحجة أنها ستعود في نفس الليلة. مروان رد: «تم».', unlocked:false, order:47 },

    { id:'sara_car_exit', tag:'موقف السيارات', crit:true, title:'سيارة سارة خرجت 23:46', img:null, short:'خروج البطاقة 21:08 لم يكن مغادرة نهائية للبرج', full:'سجل الموقف يثبت بقاء سيارة سارة حتى 23:46، ما يفتح فجوة في تحركاتها بعد الخروج من المنطقة المؤمنة.', unlocked:false, order:50 },
    { id:'marwan_external_alibi', tag:'كاميرا خارجية', crit:true, title:'مروان خارج البرج بعد 22:23', img:null, short:'سيارته خرجت ثم ظهر في محطة وقود 22:39', full:'مصدران مستقلان يجعلان وجود مروان في الأرشيف 22:57 غير ممكن عمليًا.', unlocked:false, order:51 },
    { id:'laila_home_alibi', tag:'كاميرا سكنية', crit:true, title:'ليلى في منزلها 22:38', img:null, short:'كاميرا اللوبي تصورها تستلم طلبًا', full:'الزمن والمسافة يستبعدان وجودها في غرفة الأمن 22:46، مع بقاء احتمال تحركات لاحقة نظريًا.', unlocked:false, order:52 },
    { id:'sherif_landline', tag:'هاتف أرضي', crit:true, title:'صوت شريف في غرفة الأمن 22:52–23:03', img:null, short:'مكالمة حية تستبعد فتحه للأرشيف 22:57 بنفسه', full:'المكالمة المسجلة من الهاتف الثابت فيها صوت شريف وتفاعل لحظي، فتستبعد وجوده عند باب الأرشيف وقت الفتح.', unlocked:false, order:53 },
    { id:'sara_laptop_b1', tag:'شبكة المبنى', crit:true, title:'لابتوب سارة اتصل بـB1 الساعة 22:31', img:null, short:'سارة عادت لمنطقة داخل البرج', full:'الجهاز المعروف كلابتوب عملها اتصل بنقطة B1-MEETING، وصورة خروجها من مكتبها تظهر الحقيبة معها.', unlocked:false, order:54 },
    { id:'b1_meeting_proof', tag:'كاميرات وآثار', crit:true, title:'كريم قابل سارة 22:27–22:34', img:null, short:'بصماتهما على نسخة مقارنة وكاميرا تظهر سارة ثم كريم', full:'الدليل يثبت اللقاء الذي أخفته سارة، لكنه يظهر كريم بعد خروجها حيًا وقادرًا على الحركة بمفرده.', unlocked:false, order:55 },
    { id:'sara_alibi_gap', tag:'شبكة الأعذار', crit:false, title:'فجوة زمنية في رواية سارة', img:null, short:'أخفت لقاءً متأخرًا ومكانها غير محسوم بعده', full:'شبكة الأعذار تكسر جملة «آخر مرة قبل التاسعة» لكنها لا تثبت أنها نفذت أي حدث لاحق.', unlocked:false, order:56 },

    { id:'blood_path', tag:'إعادة فحص', crit:true, title:'مسار دم جزئي من B1 ناحية الخدمات', img:null, short:'كريم تحرك وهو مصاب', full:'نقاط دقيقة قرب ممر الاجتماع ثم اتجاه الخدمات والمصعد تدعم تحرك كريم بنفسه بعد بداية الإصابة.', unlocked:false, order:60 },
    { id:'karim_after_sara_cctv', tag:'كاميرا ممر', crit:true, title:'كريم خرج بعد سارة حيًا', img:null, short:'22:36 يظهر يمشي وحده ويحمل أوراقًا', full:'اللقطة تهدم فرضية إصابته القاتلة داخل لقاء سارة، من غير ما تجعل سارة بريئة من كل شيء.', unlocked:false, order:61 },
    { id:'ex12_record', tag:'تصريح زائر', crit:true, title:'EX-12 أُنشئ يوم الحادث', img:null, short:'تصريح مؤقت باسم غير مكتمل أنشأه حساب ليلى', full:'التصريح دخل 18:37 وفتح باب خدمات 22:38. كاميرا الدخول تربطه بحسام فؤاد، ممثل الشركة الخارجية.', unlocked:false, order:62 },
    { id:'ex12_use', tag:'سجل باب الخدمات', crit:true, title:'EX-12 في الممر 22:38', img:null, short:'حسام كان في نافذة الإصابة', full:'السجل والكاميرا الجزئية يضعان حسام في ممر الخدمات فور خروج كريم من لقاء سارة.', unlocked:false, order:63 },
    { id:'hossam_bag_clip', tag:'أثر مادي', crit:false, title:'مشبك حقيبة حسام مكسور في الممر', img:null, short:'جزء من الحقيبة يثبت الاحتكاك بالمكان', full:'المشبك المفقود من حقيبة المستندات يوجد قرب نقطة المواجهة. لا توجد دماء على الحقيبة ولا تتوافق كسلاح.', unlocked:false, order:64 },
    { id:'hossam_scuffle', tag:'استجواب حسام', crit:true, title:'حسام يعترف بشد وجذب على المستندات', img:null, short:'كريم انتزع الأوراق وحصل تدافع', full:'حسام أخفى أولًا الاحتكاك الجسدي ثم اعترف أن كلًا منهما كان يشد الملف من الآخر قبل أن يبتعد.', unlocked:false, order:65 },
    { id:'service_door_dna', tag:'فحص جنائي', crit:true, title:'DNA كريم على مقبض باب الخدمة', img:null, short:'المقبض يتوافق ميكانيكيًا مع موضع الإصابة', full:'أثر حيوي مجهري لكريم على جزء معدني بارز خلف موضع التدافع، وشكل الجزء يمكن أن ينتج عنه الارتطام المسجل طبيًا.', unlocked:false, order:66 },
    { id:'injury_reconstruction', tag:'إعادة بناء', crit:true, title:'الارتطام أثناء التراجع أقوى سيناريو', img:null, short:'الآثار لا تدعم ضربة بأداة مستقلة', full:'موضع الدم والمشبك واتجاه الحركة وشكل الإصابة تتوافق أكثر مع تراجع كريم أثناء مقاومة سحب الورق ثم اصطدامه بالباب.', unlocked:false, order:67 },
    { id:'elevator_weight', tag:'سجل المصعد', crit:false, title:'كريم نزل وحده', img:null, short:'حساس الوزن متوافق مع شخص بالغ واحد', full:'بعد المواجهة تحرك كريم للمصعد وحده، ما يضعف فرضية أن شخصًا آخر حمله إلى B2.', unlocked:false, order:68 },
    { id:'emad_statement', tag:'شهادة أمن', crit:true, title:'عماد فتح الأرشيف لكريم وهو حي', img:null, short:'كريم قال إنه «خبط دماغه وهو نازل»', full:'عماد نفذ طلب فتح بعد ساعات العمل، شاهد كريم واقفًا بنفسه ويمسك رأسه، ثم تركه يدخل الأرشيف وحده.', unlocked:false, order:69 },
    { id:'b2_camera', tag:'كاميرا B2', crit:true, title:'كريم يدخل الأرشيف بنفسه', img:null, short:'لا يوجد شخص ثالث معه', full:'لقطة B2 تؤكد أن كريم وصل حيًا ومتحركًا، وأن بطاقة الطوارئ استُخدمت له بطريقة تشغيلية طبيعية.', unlocked:false, order:70 },
    { id:'badge_clip_piece', tag:'أثر مادي', crit:true, title:'مشبك بطاقة كريم انكسر في الممر', img:null, short:'جزء من الحامل موجود عند موضع التدافع', full:'صورة 22:36 تظهر البطاقة على كريم، وصورة B2 لا تظهرها، والجزء المكسور يحدد نافذة سقوطها قرب مواجهة حسام.', unlocked:false, order:71 },

    { id:'card_handover', tag:'كاميرا خدمات', crit:true, title:'حسام يسلم بطاقة صغيرة للأمن 22:45', img:null, short:'عماد يؤكد أنها بطاقة كريم', full:'الكاميرا لا تقرأ الاسم، لكن شهادة عماد وحامل البطاقة المكسور يربطان التسليم ببطاقة كريم التي سقطت في الممر.', unlocked:false, order:80 },
    { id:'sherif_calls', tag:'سجل اتصالات', crit:true, title:'الأمن حاول الاتصال بكريم ولم يرد', img:null, short:'23:15 و23:18 و23:23 بدون رد', full:'رغم فشل الاتصالات، لم يتم إرسال فرد للتأكد من مكان كريم قبل تسجيل الخروج.', unlocked:false, order:81 },
    { id:'sherif_gate_presence', tag:'سجل حركة', crit:true, title:'بطاقة شريف قرب البوابة قبل 23:31', img:null, short:'شريف كان في المنطقة وقت استخدام بطاقة كريم', full:'سجل داخلي يضع شريف قرب القارئ قبل أقل من دقيقة من استخدام بطاقة كريم، ويناقض سجل ورديته المكتوب.', unlocked:false, order:82 },
    { id:'fake_exit_confirmed', tag:'اعتراف مدعوم', crit:true, title:'شريف استخدم بطاقة كريم', img:null, short:'«قفلت وجوده على النظام»', full:'شريف يعترف بأنه مرر بطاقة كريم لإغلاق حالته داخل النظام وتجنب مراجعة مخالفات الوردية، لا لإخفاء قتل مخطط.', unlocked:false, order:83 },
    { id:'page8_original', tag:'العربة', crit:true, title:'الصفحة الثامنة داخل فجوة في عربة الملفات', img:null, short:'لم يسرقها أحد بعد وفاة كريم', full:'الورقة انزلقت أثناء استخدام كريم للعربة. هي الأصل الذي يثبت مسار التفويض القديم والتلاعب بحركة المستندات.', unlocked:false, order:84 },
    { id:'karim_last_photo', tag:'هاتف كريم', crit:true, title:'آخر صورة تقارن نسختين من المستند', img:null, short:'23:04 كريم كان ما زال يحاول توثيق الاختلاف', full:'الصورة المهزوزة داخل الأرشيف تظهر نسخة الأرشيف والورق الذي أخذه من حسام، وتثبت أن هدفه كان مقارنة تاريخ الاعتماد.', unlocked:false, order:85 }
  ],

  phases: {
    enabled:true,
    initial:'initial',
    order:['initial','gap','wrong_scene','missing_file','alibis','after_impact','card','final'],
    labels:{ initial:'هل خرج كريم؟', gap:'الفجوة الزمنية', wrong_scene:'المكان الخطأ', missing_file:'الملف الذي لا وجود له', alibis:'أربعة أعذار', after_impact:'بعد الضربة', card:'البطاقة', final:'الحقيقة لا تكفي' }
  },

  deductions: {
    enabled:true,
    items:[
      { id:'did_he_leave', label:'هل سجل البوابة يثبت خروج كريم؟', phase:'initial', requires:['access_log','cctv_timeline'], question:'إيه أقصى حاجة تقدر تثبتها من سجل 23:31 لوحده؟', options:[ {id:'a',text:'كريم خرج يقينًا'}, {id:'b',text:'السجل مزور بالكامل'}, {id:'c',text:'بطاقة كريم استُخدمت على قارئ الخروج، وهوية حاملها غير مثبتة'}, {id:'d',text:'السجل بلا أي قيمة'} ], correctOptionId:'c', unlockPhase:'gap', successText:'ثبت إن «خروج البطاقة» مش هو نفسه «خروج كريم». اتفتح فحص التوقيتات والأنظمة.' },
      { id:'audio_time', label:'ماذا تثبت الرسالة الصوتية؟', phase:'gap', requires:['audio_metadata','audio_message'], question:'الرسالة وصلت 23:37 لكن Metadata يقول إنشاء 22:42. الاستنتاج الأدق؟', options:[ {id:'a',text:'كريم كان حيًا 23:37 بالضرورة'}, {id:'b',text:'الملف أُنشئ قبل وصوله للخادم، ووقت الوصول لا يحدد وقت التسجيل'}, {id:'c',text:'شريف سجلها بصوت مزيف'}, {id:'d',text:'الهاتف كان خارج البرج'} ], correctOptionId:'b', successText:'الرسالة مش دليل حياة عند 23:37. وقت الإنشاء ووقت المزامنة حدثان مختلفان.' },
      { id:'level_zero', label:'ما معنى LEVEL_REF:0؟', phase:'gap', requires:['elevator_diagnostic','controller_map','service_key_log'], requiresDeductions:['audio_time'], question:'مفيش زر 0 وجدول الكنترول لا يربطه بطابق. إيه الاستنتاج؟', options:[ {id:'a',text:'فيه طابق سري مؤكد'}, {id:'b',text:'الرقم مرجع فني داخل الكنترول وليس دليلًا على طابق معماري'}, {id:'c',text:'مروان قتل كريم'}, {id:'d',text:'السجل مزور'} ], correctOptionId:'b', unlockPhase:'wrong_scene', successText:'سقط فخ «الطابق السري». دلوقتي راجع المكان اللي حصلت فيه الإصابة بدل تفسير الأرقام كجغرافيا.' },
      { id:'archive_not_primary', label:'هل الأرشيف هو مكان الإصابة الأول؟', phase:'wrong_scene', requires:['autopsy_initial','blood_mismatch_archive','shoe_trace','service_blood'], question:'نقص الدم + آثار الحذاء + دم كريم في الخدمات بيدعموا إيه؟', options:[ {id:'a',text:'الإصابة حصلت داخل الأرشيف يقينًا'}, {id:'b',text:'الأدلة ترجح أن كريم بدأ إصابته قبل وصوله للأرشيف'}, {id:'c',text:'مروان نقل الجثة'}, {id:'d',text:'العربة هي سلاح الجريمة'} ], correctOptionId:'b', successText:'الأرشيف مكان العثور، مش بالضرورة بداية الواقعة.' },
      { id:'cart_not_body', label:'ماذا تثبت عربة الملفات؟', phase:'wrong_scene', requires:['cart_trace'], requiresDeductions:['archive_not_primary'], question:'DNA كريم ومسار العجلة يثبتوا إيه من غير افتراضات إضافية؟', options:[ {id:'a',text:'الجثة اتنقلت بالعربة'}, {id:'b',text:'كريم أو متعلقاته استخدموا العربة، وحالته وقت الاستخدام غير مثبتة'}, {id:'c',text:'شريف نقل كريم'}, {id:'d',text:'العربة بلا علاقة بالقضية'} ], correctOptionId:'b', unlockPhase:'missing_file', successText:'العربة ليست دليل جثة منقولة. اتفتح سؤال: كريم كان بيدور على إيه جوه الأرشيف؟' },
      { id:'laila_knew_attachment', label:'معرفة ليلى بالملحق', phase:'missing_file', requires:['missing_attachment_email','archive19'], question:'البريد قبل الحادث بثلاثة أيام يثبت إيه؟', options:[ {id:'a',text:'ليلى قتلت كريم'}, {id:'b',text:'ليلى كانت تعرف مسبقًا أن كريم يبحث عن الملحق وقللت من حجم معرفتها'}, {id:'c',text:'الصفحة لم توجد أصلًا'}, {id:'d',text:'سارة كتبت البريد'} ], correctOptionId:'b', successText:'ثبت أول تناقض حقيقي: ليلى أخفت معلومة، لكن ده لسه مش دليل قتل.' },
      { id:'document_scheme', label:'حقيقة الليالي القديمة', phase:'missing_file', requires:['page8_preview','old_service_pattern','receipt_versions','old_service_email'], requiresDeductions:['laila_knew_attachment'], question:'إيه النمط اللي يجمع مسار الخدمة والنسخ المختلفة من المستندات؟', options:[ {id:'a',text:'شركة الصيانة وهمية'}, {id:'b',text:'مسار الخدمات استُخدم لنقل واستبدال مستندات أصلية خارج دورة التوثيق المعتادة'}, {id:'c',text:'فيه تهريب بضائع'}, {id:'d',text:'مروان قتل كريم لتغطية عطل مصعد'} ], correctOptionId:'b', unlockPhase:'alibis', successText:'الدافع المهني اتضح، لكن معرفة الفساد لا تحدد مين كان مع كريم وقت إصابته. اختبر الأعذار.' },
      { id:'sara_lied_last_contact', label:'آخر لقاء لسارة', phase:'alibis', requires:['sara_car_exit','sara_laptop_b1','b1_meeting_proof'], question:'إيه الحقيقة الأقوى عن رواية سارة؟', options:[ {id:'a',text:'كانت في البيت من 21:08'}, {id:'b',text:'أخفت لقاءً متأخرًا مع كريم ولديها فجوة زمنية بعده'}, {id:'c',text:'استخدمت بطاقة الطوارئ'}, {id:'d',text:'هي المسؤولة عن LEVEL_REF:0'} ], correctOptionId:'b', resultEvidenceIds:['sara_alibi_gap'], successText:'ثبت كذب سارة عن آخر لقاء، لكن اللقاء وحده لا يثبت الإصابة.' },
      { id:'marwan_excluded_late', label:'مروان والجزء المتأخر', phase:'alibis', requires:['marwan_external_alibi','service_key_log'], requiresDeductions:['sara_lied_last_contact'], question:'إيه الاستنتاج المهني عن مروان؟', options:[ {id:'a',text:'بريء من كل مخالفات القضية'}, {id:'b',text:'نفذ Service Mode لكنه مستبعد زمنيًا من فتح الأرشيف وما بعده'}, {id:'c',text:'هو صاحب بطاقة كريم'}, {id:'d',text:'هو اللي سجل رسالة كريم'} ], correctOptionId:'b', successText:'المعرفة التقنية لا تساوي فرصة تنفيذ كل الأحداث.' },
      { id:'sherif_not_archive_opener', label:'فتح الأرشيف 22:57', phase:'alibis', requires:['sherif_landline','door_access_2257'], requiresDeductions:['marwan_excluded_late'], question:'هل شريف يقدر يكون الشخص اللي وقف عند باب الأرشيف 22:57؟', options:[ {id:'a',text:'نعم لأن بطاقة الطوارئ تبع الأمن'}, {id:'b',text:'الأدلة تستبعد وجوده عند الباب في اللحظة دي، بدون تبرئته من أحداث أخرى'}, {id:'c',text:'لا لأنه كان خارج البرج'}, {id:'d',text:'لا لأن الأرشيف فتح لوحده'} ], correctOptionId:'b', unlockPhase:'after_impact', successText:'مفيش مشتبه واحد حركته تفسر كل الأحداث. ارجع لآخر دقائق كريم وهو قادر يتحرك.' },
      { id:'karim_alive_after_sara', label:'هل سارة أصابته في الاجتماع؟', phase:'after_impact', requires:['karim_after_sara_cctv','blood_path'], question:'كاميرا 22:36 ومسار الدم بيدعموا إيه؟', options:[ {id:'a',text:'كريم خرج بعد سارة حيًا وتحرك بنفسه ثم بدأت تظهر آثار الإصابة لاحقًا'}, {id:'b',text:'سارة نقلته للمصعد'}, {id:'c',text:'كريم مات في الاجتماع'}, {id:'d',text:'الدم لا يعود لكريم'} ], correctOptionId:'a', successText:'فرضية إصابته القاتلة داخل لقاء سارة انهارت.' },
      { id:'hossam_present', label:'مين كان في الممر بعد سارة؟', phase:'after_impact', requires:['ex12_record','ex12_use','hossam_bag_clip'], requiresDeductions:['karim_alive_after_sara'], question:'تصريح EX-12 والكاميرا والمشبك المكسور يثبتوا إيه؟', options:[ {id:'a',text:'ليلى رجعت للبرج'}, {id:'b',text:'حسام كان في الممر واحتك بكريم خلال نافذة الإصابة'}, {id:'c',text:'شريف كان في المصعد'}, {id:'d',text:'مروان رجع للبرج'} ], correctOptionId:'b', successText:'اتحدد الشخص اللي قابل كريم بعد سارة، لكن لسه محتاج تثبت طبيعة اللي حصل.' },
      { id:'injury_mechanism', label:'كيف أُصيب كريم؟', phase:'after_impact', requires:['hossam_scuffle','service_door_dna','injury_reconstruction'], requiresDeductions:['hossam_present'], question:'أي سيناريو يفسر موضع الإصابة والأثر واتجاه الحركة بدون اختراع سلاح؟', options:[ {id:'a',text:'حسام ضرب كريم بأداة مخفية'}, {id:'b',text:'أثناء التدافع على المستندات تراجع كريم وارتطم بالجزء المعدني من باب الخدمة'}, {id:'c',text:'مروان دفعه من المصعد'}, {id:'d',text:'سارة ضربته داخل الاجتماع'} ], correctOptionId:'b', successText:'أقوى إعادة بناء للإصابة أصبحت التدافع والارتطام، لا ضربة مخططة بأداة.' },
      { id:'karim_entered_archive_alive', label:'هل نُقل كريم للأرشيف؟', phase:'after_impact', requires:['elevator_weight','emad_statement','b2_camera'], requiresDeductions:['injury_mechanism'], question:'الشهادة والكاميرا وحساس المصعد بيقولوا إيه؟', options:[ {id:'a',text:'الجثة نُقلت بعربة الملفات'}, {id:'b',text:'كريم نزل وحده ودخل الأرشيف حيًا باستخدام فتح طوارئ مشروع'}, {id:'c',text:'شريف حمله'}, {id:'d',text:'حسام دخل معه الأرشيف'} ], correctOptionId:'b', unlockPhase:'card', successText:'سقطت فرضية نقل الجثة وبطاقة الطوارئ المسروقة. دلوقتي تتبع بطاقة كريم نفسها.' },
      { id:'card_lost_scuffle', label:'متى فقد كريم بطاقته؟', phase:'card', requires:['badge_clip_piece','card_handover'], requiresDeductions:['karim_entered_archive_alive'], question:'آخر صورة بالبطاقة + المشبك المكسور + تسليم حسام للأمن يدعموا إيه؟', options:[ {id:'a',text:'البطاقة اتسرقت من الأرشيف بعد الوفاة'}, {id:'b',text:'البطاقة انفصلت أثناء واقعة الممر ووصلت للأمن قبل دخول كريم الأرشيف'}, {id:'c',text:'كريم باع البطاقة'}, {id:'d',text:'مروان أخذها'} ], correctOptionId:'b', successText:'بطاقة كريم كانت عند الأمن بينما كريم نفسه داخل B2.' },
      { id:'sherif_used_card', label:'من صنع سجل 23:31؟', phase:'card', requires:['sherif_gate_presence','card_handover','sherif_calls'], requiresDeductions:['card_lost_scuffle'], question:'مين يجمع حيازة البطاقة والوجود عند القارئ والتناقض في سجل الوردية؟', options:[ {id:'a',text:'حسام'}, {id:'b',text:'شريف'}, {id:'c',text:'سارة'}, {id:'d',text:'كريم نفسه'} ], correctOptionId:'b', resultEvidenceIds:['fake_exit_confirmed'], successText:'ثبت إن شريف هو اللي مرر بطاقة كريم على قارئ الخروج.' },
      { id:'fake_exit_reason', label:'ليه شريف عمل الخروج الوهمي؟', phase:'card', requires:['fake_exit_confirmed','sherif_calls'], requiresDeductions:['sherif_used_card'], question:'إيه الدافع المدعوم بدل نظرية مؤامرة القتل؟', options:[ {id:'a',text:'كان بيخفي قتلًا مخططًا مع حسام'}, {id:'b',text:'أراد إغلاق وجود كريم على النظام وتجنب مراجعة مخالفات ورديته'}, {id:'c',text:'أراد سرقة هوية كريم'}, {id:'d',text:'مروان أمره بذلك'} ], correctOptionId:'b', successText:'«الخروج الأخير» كان تسترًا إداريًا منفصلًا، لكنه أخفى وجود كريم المصاب داخل المبنى.' },
      { id:'page8_truth', label:'هل الصفحة الثامنة سُرقت بعد الوفاة؟', phase:'card', requires:['page8_original','karim_last_photo'], requiresDeductions:['fake_exit_reason'], question:'الصورة 23:04 والعثور على الورقة داخل العربة يثبتوا إيه؟', options:[ {id:'a',text:'دخل شخص الأرشيف بعد كريم وسرقها ثم أعادها'}, {id:'b',text:'الصفحة انزلقت أثناء استخدام كريم للعربة ولم يسرقها أحد بعد وفاته'}, {id:'c',text:'ليلى أخفتها في بيتها'}, {id:'d',text:'الصفحة مزيفة بالكامل'} ], correctOptionId:'b', unlockPhase:'final', successText:'آخر وهم سقط. كل العناصر الغريبة كانت صحيحة، لكن القصة المبنية عليها كانت غلط.' },
      { id:'final_responsibility', label:'افصل بين المسؤوليات', phase:'final', requires:['injury_reconstruction','fake_exit_confirmed','page8_original'], requiresDeductions:['page8_truth'], question:'إيه الوصف الوحيد اللي يطابق كل الأدلة من غير تحميل شخص فعل شخص تاني؟', options:[ {id:'a',text:'حسام خطط للقتل وشريف ساعده في إخفاء الجثة'}, {id:'b',text:'حسام تسبب في التدافع الذي أدى للإصابة، وشريف أنشأ خروجًا وهميًا لاحقًا لتغطية مخالفات أمنية فأخّر اكتشاف كريم'}, {id:'c',text:'مروان نفذ كل شيء بسبب معرفته بالمصعد'}, {id:'d',text:'سارة قتلت كريم وليلى زورت السجلات'} ], correctOptionId:'b', successText:'اكتملت الحقيقة: الإصابة، الخروج الوهمي، والتلاعب القديم بالمستندات ثلاث طبقات مختلفة تداخلت في نفس الليلة.' }
    ]
  },

  investigationActions: [
    { id:'fe_scene_trace', kind:'فحص مسرح', label:'وثّق الأرشيف وافحص الأثر قرب الرف', phase:'initial', resultEvidenceIds:['fiber_trace'], successText:'تم توثيق الغرفة ورفع أثر ألياف لا يمكن نسبه لشخص بصريًا.' },
    { id:'fe_access_log', kind:'سجلات', label:'اطلب سجل بطاقة كريم من البوابات', phase:'initial', resultEvidenceIds:['access_log'], successText:'ظهر EXIT 23:31 لبطاقة كريم.' },
    { id:'fe_cctv', kind:'كاميرات', label:'راجع كاميرات البوابة والممرات', phase:'initial', requires:['access_log'], resultEvidenceIds:['cctv_timeline'], successText:'لا توجد لقطة واضحة لكريم وهو يغادر عند وقت السجل.' },
    { id:'fe_audio', kind:'فحص هاتف', label:'استخرج آخر رسالة صوتية من هاتف كريم', phase:'initial', resultEvidenceIds:['audio_message'], successText:'ظهرت رسالة «أنا نزلت خلاص...» التي وصلت 23:37.' },

    { id:'fe_audio_meta', kind:'فحص رقمي', label:'افحص Metadata للتسجيل الصوتي', phase:'gap', requiresDeductions:['did_he_leave'], requires:['audio_message'], resultEvidenceIds:['audio_metadata'], successText:'اتضح إن الملف اتعمل 22:42 ووصل بعد ذلك بوقت طويل.' },
    { id:'fe_phone_network', kind:'شبكات', label:'راجع نقاط اتصال هاتف كريم داخل البرج', phase:'gap', requiresDeductions:['did_he_leave'], resultEvidenceIds:['phone_network'], successText:'ظهر الهاتف داخل نطاقات البرج، لكن الـWi-Fi لا يساوي GPS.' },
    { id:'fe_elevator_diag', kind:'سجل فني', label:'اطلب سجل تشخيص المصعد التفصيلي', phase:'gap', requiresDeductions:['did_he_leave'], resultEvidenceIds:['elevator_diagnostic'], successText:'ظهر LEVEL_REF:0 / SERVICE ومصدر الأمر LOCAL.' },
    { id:'fe_service_key', kind:'تشغيل', label:'حدد المفتاح المحلي المستخدم في Service Mode', phase:'gap', requires:['elevator_diagnostic'], resultEvidenceIds:['service_key_log'], successText:'المفتاح MNT-02 كان بعهدة مروان واعترف بتشغيل الإجراء.' },
    { id:'fe_controller_map', kind:'مخططات', label:'اطلب جدول مراجع كنترول المصعد', phase:'gap', requires:['elevator_diagnostic'], resultEvidenceIds:['controller_map'], successText:'المرجع 0 لا يقابله طابق معماري.' },
    { id:'fe_service_route', kind:'معاينة فنية', label:'عاين الممرات الفنية المرتبطة بالمصعد', phase:'gap', requiresDeductions:['level_zero'], resultEvidenceIds:['service_route'], successText:'المسار الفني يشرح تجاوز بعض نقاط التتبع من غير وجود طابق سري.' },

    { id:'fe_autopsy', kind:'طب شرعي', label:'اطلب التقرير الطبي التفصيلي', phase:'wrong_scene', requiresDeductions:['level_zero'], resultEvidenceIds:['autopsy_initial','blood_mismatch_archive'], successText:'الإصابة لا تضمن فقدان الوعي فورًا وكمية الدم في الأرشيف غير حاسمة.' },
    { id:'fe_shoe_trace', kind:'معمل', label:'حلل آثار حذاء كريم', phase:'wrong_scene', resultEvidenceIds:['shoe_trace'], successText:'التركيب أقرب لمناطق الخدمات.' },
    { id:'fe_service_blood', kind:'فحص جنائي', label:'افحص منطقة الخدمات لآثار حيوية', phase:'wrong_scene', requires:['shoe_trace'], resultEvidenceIds:['service_blood'], successText:'ظهر أثر دم دقيق لكريم خارج الأرشيف.' },
    { id:'fe_cart', kind:'فحص مادي', label:'افحص عربة نقل الملفات ومسار عجلاتها', phase:'wrong_scene', resultEvidenceIds:['cart_trace'], successText:'العربة تحمل أثر كريم ومسارًا للأرشيف، لكن لا تثبت نقل جثة.' },
    { id:'fe_archive_doorlog', kind:'سجل أبواب', label:'استخرج سجل فتح الأرشيف بعد 22:00', phase:'wrong_scene', resultEvidenceIds:['door_access_2257'], successText:'ظهر فتح 22:57 ببطاقة طوارئ AC-04.' },
    { id:'fe_emergency_card', kind:'سجل أمن', label:'راجع سجل خروج بطاقة الطوارئ', phase:'wrong_scene', requires:['door_access_2257'], resultEvidenceIds:['emergency_card_log'], successText:'البطاقة خرجت ضمن مهمة فتح، مش كسرقة مثبتة.' },
    { id:'fe_archive19', kind:'تفتيش ملفات', label:'افحص الصندوق ARCH-19', phase:'wrong_scene', requiresDeductions:['cart_not_body'], resultEvidenceIds:['archive19'], successText:'ظهر أن الملحق الثامن مفقود من مكانه.' },

    { id:'fe_mail_attachment', kind:'بريد داخلي', label:'راجع طلبات كريم الخاصة بالملحق', phase:'missing_file', requires:['archive19'], resultEvidenceIds:['missing_attachment_email'], successText:'البريد أثبت إن ليلى كانت تعرف بالطلب قبل الحادث.' },
    { id:'fe_printer', kind:'تحليل رقمي', label:'راجع سجل الطباعة المركزي لكريم', phase:'missing_file', requires:['archive19'], resultEvidenceIds:['printer_job'], successText:'كريم طبع 8 صفحات وأعاد صفحة واحدة منفردة.' },
    { id:'fe_backup_page8', kind:'استعادة بيانات', label:'استعد Preview قديم للصفحة الثامنة', phase:'missing_file', requires:['printer_job'], resultEvidenceIds:['page8_preview'], successText:'ظهر نص عن تشغيل ليلي ومسار اعتماد استثنائي.' },
    { id:'fe_old_service', kind:'تحريات سجلات', label:'قارن ليالي Service Mode القديمة', phase:'missing_file', requires:['page8_preview'], resultEvidenceIds:['old_service_pattern'], successText:'نفس النمط ظهر قبل ليلة وفاة كريم.' },
    { id:'fe_receipt_versions', kind:'مقارنة مستندات', label:'قارن نسخ محضر استلام المشروع', phase:'missing_file', resultEvidenceIds:['receipt_versions'], successText:'نسخة بلا الملاحظات سمحت بصرف الدفعة النهائية.' },
    { id:'fe_ops417', kind:'تصاريح', label:'تتبع التصريح OPS-417', phase:'missing_file', resultEvidenceIds:['ops417_record'], successText:'التصريح خرج من حساب ليلى كإعداد إداري وليس اعتماد تنفيذ.' },
    { id:'fe_old_email', kind:'بريد قديم', label:'راجع مراسلات فتح مسار الخدمة القديم', phase:'missing_file', requires:['ops417_record'], resultEvidenceIds:['old_service_email'], successText:'مروان أخفى موافقته على حركة مستندات خارج التسجيل المخزني.' },

    { id:'fe_sara_car', kind:'مواقف', label:'راجع دخول وخروج سيارة سارة', phase:'alibis', requiresDeductions:['document_scheme'], resultEvidenceIds:['sara_car_exit'], successText:'سيارة سارة لم تغادر حتى 23:46.' },
    { id:'fe_marwan_out', kind:'كاميرات خارجية', label:'تحقق من خروج مروان بمصدر مستقل', phase:'alibis', resultEvidenceIds:['marwan_external_alibi'], successText:'كاميرا الخدمات ومحطة الوقود تستبعد عودته للأرشيف 22:57.' },
    { id:'fe_laila_home', kind:'تحريات', label:'تحقق من وجود ليلى في منزلها', phase:'alibis', resultEvidenceIds:['laila_home_alibi'], successText:'كاميرا السكن تصورها 22:38.' },
    { id:'fe_sherif_phone', kind:'اتصالات', label:'استخرج مكالمة الهاتف الأرضي لغرفة الأمن', phase:'alibis', resultEvidenceIds:['sherif_landline'], successText:'صوت شريف موجود في غرفة الأمن أثناء فتح الأرشيف.' },
    { id:'fe_sara_laptop', kind:'شبكات', label:'تتبع لابتوب سارة بعد خروج بطاقتها', phase:'alibis', requires:['sara_car_exit'], resultEvidenceIds:['sara_laptop_b1'], successText:'اللابتوب اتصل بنقطة B1-MEETING 22:31.' },
    { id:'fe_b1_meeting', kind:'كاميرات وبصمات', label:'تحقق من لقاء B1', phase:'alibis', requires:['sara_laptop_b1'], resultEvidenceIds:['b1_meeting_proof'], successText:'ثبت اللقاء الذي أخفته سارة، وظهر كريم بعده حيًا.' },

    { id:'fe_blood_path', kind:'إعادة فحص', label:'ابنِ مسار آثار الدم الدقيقة من B1', phase:'after_impact', requiresDeductions:['sherif_not_archive_opener'], resultEvidenceIds:['blood_path'], successText:'الآثار تدعم تحرك كريم بنفسه ناحية الخدمات وهو مصاب.' },
    { id:'fe_post_sara_cam', kind:'كاميرات', label:'راجع أول لقطة بعد لقاء سارة', phase:'after_impact', resultEvidenceIds:['karim_after_sara_cctv'], successText:'22:36 كريم يمشي وحده بعد خروج سارة.' },
    { id:'fe_ex12', kind:'تصاريح دخول', label:'حدد صاحب التصريح EX-12', phase:'after_impact', requiresDeductions:['karim_alive_after_sara'], resultEvidenceIds:['ex12_record','ex12_use'], successText:'التصريح يقود لحسام ويضعه في الممر 22:38.' },
    { id:'fe_hossam_clip', kind:'فحص مادي', label:'افحص أثر حقيبة المستندات في الممر', phase:'after_impact', requires:['ex12_use'], resultEvidenceIds:['hossam_bag_clip'], successText:'مشبك حقيبة حسام يثبت الاحتكاك بالمكان.' },
    { id:'fe_hossam_scuffle', kind:'استجواب ومواجهة', label:'واجه حسام بتوقيت الممر والمستندات', phase:'after_impact', requiresDeductions:['hossam_present'], resultEvidenceIds:['hossam_scuffle'], successText:'حسام اعترف بحدوث شد وجذب على الأوراق.' },
    { id:'fe_door_dna', kind:'فحص جنائي', label:'افحص الجزء المعدني خلف موضع التدافع', phase:'after_impact', requires:['hossam_scuffle'], resultEvidenceIds:['service_door_dna'], successText:'ظهر DNA كريم على الجزء المتوافق مع موضع الإصابة.' },
    { id:'fe_injury_recon', kind:'إعادة بناء', label:'قارن سيناريوهات الضربة والارتطام', phase:'after_impact', requires:['service_door_dna','blood_path'], resultEvidenceIds:['injury_reconstruction'], successText:'الارتطام أثناء التراجع هو الأكثر اتساقًا مع الآثار.' },
    { id:'fe_elevator_weight', kind:'سجل المصعد', label:'راجع حساس وزن المصعد بعد الواقعة', phase:'after_impact', resultEvidenceIds:['elevator_weight'], successText:'الحمولة متوافقة مع شخص بالغ واحد.' },
    { id:'fe_emad', kind:'استجواب شاهد', label:'اسأل عماد عن مهمة فتح الأرشيف', phase:'after_impact', resultEvidenceIds:['emad_statement'], successText:'عماد أكد أن كريم كان حيًا وواقفًا ويمسك رأسه.' },
    { id:'fe_b2cam', kind:'كاميرات', label:'راجع كاميرا B2 لحظة الفتح', phase:'after_impact', requires:['emad_statement'], resultEvidenceIds:['b2_camera'], successText:'كريم دخل الأرشيف بنفسه ومن غير شخص ثالث.' },
    { id:'fe_badge_clip', kind:'فحص أدلة', label:'طابق جزء حامل بطاقة كريم بالممر', phase:'after_impact', requiresDeductions:['injury_mechanism'], resultEvidenceIds:['badge_clip_piece'], successText:'انكسار الحامل يحدد نافذة سقوط البطاقة أثناء واقعة الممر.' },

    { id:'fe_card_handover', kind:'كاميرات خدمات', label:'تتبع البطاقة بعد سقوطها', phase:'card', requiresDeductions:['karim_entered_archive_alive'], resultEvidenceIds:['card_handover'], successText:'حسام سلّم بطاقة لكاونتر الأمن وعماد أكد أنها بطاقة كريم.' },
    { id:'fe_sherif_calls', kind:'اتصالات', label:'راجع محاولات الأمن للوصول لكريم', phase:'card', resultEvidenceIds:['sherif_calls'], successText:'الأمن حاول الاتصال به أكثر من مرة قبل 23:31 ولم يرد.' },
    { id:'fe_sherif_gate', kind:'سجلات حركة', label:'حدد مكان شريف لحظة استخدام بطاقة كريم', phase:'card', requires:['card_handover'], resultEvidenceIds:['sherif_gate_presence'], successText:'شريف كان عند منطقة البوابة وسجل ورديته لا يطابق حركته.' },
    { id:'fe_page8_find', kind:'تفتيش دقيق', label:'فتش عربة الأرشيف من الداخل', phase:'card', requiresDeductions:['sherif_used_card'], resultEvidenceIds:['page8_original','karim_last_photo'], successText:'الصفحة الثامنة كانت عالقة بالعربة، وهاتف كريم يحتوي صورة مقارنة أخيرة.' }
  ],

  contradictionPuzzle:{enabled:false}, audioPuzzle:{enabled:false}, codeLockPuzzle:{enabled:false}, matchPuzzle:{enabled:false}, cipherPuzzle:{enabled:false}, cameraPuzzle:{enabled:false}, dnaLabPuzzle:{enabled:false}, ledgerAuditPuzzle:{enabled:false}, polygraphPuzzle:{enabled:false}, floorPlanPuzzle:{enabled:false}, witnessReliabilityPuzzle:{enabled:false}, handwritingPuzzle:{enabled:false},

  timelinePuzzle: {
    enabled:true,
    tabLabel:'خط الأحداث المختصر',
    introText:'رتب الأحداث التقنية الأساسية. خد بالك: ترتيب الأحداث لا يعني تلقائيًا إن نفس الشخص نفذها كلها.',
    events:[
      {id:'t1',text:'كريم يقابل سارة في B1.'},
      {id:'t2',text:'كريم يقابل حسام في ممر الخدمات ويحصل شد على المستندات.'},
      {id:'t3',text:'كريم يسجل «أنا نزلت خلاص...».'},
      {id:'t4',text:'كريم يدخل الأرشيف حيًا بعد فتح أمني مشروع.'},
      {id:'t5',text:'شريف يستخدم بطاقة كريم على قارئ الخروج.'},
      {id:'t6',text:'التسجيل الصوتي يكتمل رفعه للخادم.'}
    ],
    correctOrder:['t1','t2','t3','t4','t5','t6'],
    resultText:'ترتيب الأحداث يوضح إن الرسالة والخروج الإلكتروني حدثان منفصلان، وإن كريم دخل الأرشيف حيًا قبل الخروج الوهمي.',
    resultEvidenceIds:[]
  },

  alibiGridPuzzle: {
    enabled:true,
    tabLabel:'شبكة الأعذار',
    introText:'قارن الروايات في أربع نقاط حرجة. الشبكة تكشف كذبًا في الرواية، لكنها لا تساوي اتهام قتل.',
    resultText:'سارة أخفت لقاءً متأخرًا مع كريم؛ الشبكة كسرت رواية «آخر مرة قبل التاسعة» من غير ما تثبت أنها صاحبة الإصابة.',
    timeSlots:['22:17','22:46','22:57','23:31'],
    suspectClaims:{ sara:['غادرت','غادرت','غادرت','غادرت'], sherif:['غرفة الأمن','غرفة الأمن','غرفة الأمن','غرفة الأمن'], marwan:['الصيانة','خارج البرج','خارج البرج','خارج البرج'], laila:['المنزل','المنزل','المنزل','المنزل'], hossam:['داخل كزائر','قرب مخرج الخدمات','خارج البرج','خارج البرج'] },
    contradictionSlotIndex:1,
    contradictingSuspectId:'sara',
    resultEvidenceIds:['sara_alibi_gap']
  },

  evidenceCombinations:[],
  correctSuspectId:'hossam',
  conclusiveEvidenceIds:['hossam_scuffle','service_door_dna','injury_reconstruction','karim_after_sara_cctv','b2_camera','fake_exit_confirmed'],
  conclusiveRequired:6,

  theoryBuilder: {
    enabled:true,
    questions:[
      { id:'injury_cause', label:'إزاي بدأت الإصابة اللي أدت لوفاة كريم؟', options:[ {id:'a',text:'حسام ضربه بأداة معدنية مخبأة'}, {id:'b',text:'أثناء التدافع على المستندات تراجع كريم وارتطم بباب الخدمة'}, {id:'c',text:'سارة ضربته في غرفة الاجتماعات'}, {id:'d',text:'سقط من المصعد'} ], correctOptionId:'b' },
      { id:'injury_person', label:'مين كان الطرف الآخر في التدافع؟', options:[ {id:'a',text:'شريف'}, {id:'b',text:'مروان'}, {id:'c',text:'حسام'}, {id:'d',text:'ليلى'} ], correctOptionId:'c' },
      { id:'exit_user', label:'مين استخدم بطاقة كريم الساعة 23:31؟', options:[ {id:'a',text:'كريم'}, {id:'b',text:'حسام'}, {id:'c',text:'شريف'}, {id:'d',text:'سارة'} ], correctOptionId:'c' },
      { id:'exit_reason', label:'ليه اتعمل الخروج الوهمي؟', options:[ {id:'a',text:'لإخفاء قتل مخطط'}, {id:'b',text:'لإغلاق حالة كريم وتجنب مراجعة مخالفات الوردية'}, {id:'c',text:'لسرقة راتبه'}, {id:'d',text:'لإخفاء عطل المصعد'} ], correctOptionId:'b' },
      { id:'archive_truth', label:'إزاي وصل كريم للأرشيف؟', options:[ {id:'a',text:'اتنقل كجثة على العربة'}, {id:'b',text:'نزل بنفسه وطلب فتحًا أمنيًا بعد ما بطاقته لم تعمل ليلًا'}, {id:'c',text:'حسام حمله'}, {id:'d',text:'مروان نقله بالمصعد'} ], correctOptionId:'b' },
      { id:'document_truth', label:'إيه حقيقة ملف المشروع؟', options:[ {id:'a',text:'سرقة مالية مباشرة من سارة فقط'}, {id:'b',text:'مسار الخدمات والتصاريح استُخدموا قديمًا لنقل واستبدال مستندات أصلية خارج التوثيق المعتاد'}, {id:'c',text:'شركة وهمية بالكامل'}, {id:'d',text:'الصفحة الثامنة لم توجد أصلًا'} ], correctOptionId:'b' }
    ]
  },

  endings: {
    good:{
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — فصل المسؤوليات', title:'الدليل ما كدبش... التفسير هو اللي كدب',
      paragraphs:[
        'كريم خرج من لقاء سارة حيًا، ثم قابل حسام الذي جاء بمستندات مرتبطة بالمشروع القديم. حصل شد وجذب على الأوراق، وتراجع كريم وارتطم بالجزء المعدني من باب الخدمة. الإصابة سببت نزيفًا داخليًا لم يظهر خطره فورًا. كريم نزل وحده، سجل لأخته رسالة عادية، طلب من الأمن فتح الأرشيف بعد ما بطاقته لم تعمل ليلًا، ودخل بنفسه ليقارن النسخ. هناك تدهورت حالته.',
        'بطاقة كريم كانت سقطت أثناء التدافع ووصلت للأمن عن طريق حسام ثم عماد. شريف حاول الاتصال بكريم ولم يرد، لكنه بدل ما يبعث حد يتأكد من مكانه استخدم البطاقة الساعة 23:31 ليقفل وجوده على النظام ويتفادى مراجعة مخالفات ورديته. بعد دقائق فقط اكتملت مزامنة التسجيل القديم، فصنعت السجلات قصة مستحيلة: رجل خرج ثم أرسل رسالة ثم وُجد داخل البرج. لا الطابق صفر كان طابقًا سريًا، ولا الجثة اتنقلت، ولا الرسالة اتزورت؛ كل دليل كان صحيحًا، لكن كل كذبة صغيرة غيّرت معناه.'
      ]
    },
    partial:{
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — جزء من الحقيقة', title:'وصلت لحسام... لكن لازم تثبت آلية الواقعة',
      paragraphs:['وجود حسام في الممر ومشكلته مع كريم يخلّوه مشتبه قوي، لكن القضية ما تتقفلش على الشجار وحده. لازم تثبت أثر باب الخدمة، إعادة بناء الإصابة، وتحرك كريم بعد الواقعة، وتفصل ده عن الخروج الوهمي اللي عمله شريف لاحقًا.'],
      hint:'اجمع الأدلة الحاسمة من: اعتراف التدافع، أثر باب الخدمة، إعادة بناء الإصابة، كاميرا كريم بعد سارة، دخوله الأرشيف حيًا، واعتراف شريف باستخدام البطاقة.'
    },
    bad:{
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — خلط المسؤوليات', title:'جمعت الأكاذيب في شخص واحد',
      paragraphs:['اتهمت {wrongName} بالواقعة الرئيسية، لكن القضية مبنية على أفعال منفصلة. حسام كان الطرف في التدافع الذي بدأت منه الإصابة، وشريف صنع الخروج الوهمي لاحقًا لتغطية مخالفات أمنية، ومروان وليلى وسارة أخفوا كلٌ منهم مشكلة مختلفة مرتبطة بالملفات أو التوقيت. تحميل شخص واحد كل الأحداث هو نفس الخطأ اللي صنعت منه السجلات اللغز.']
    }
  }
};
