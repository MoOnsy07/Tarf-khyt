/* ============================================================
   طرف الخيط — Discovery Pack 5 (2026-08-24)
   خمس قضايا إضافية تستخدم اكتشافات كتابية داخل عالم القضية.
   يتحمّل بعد investigation-overhaul.js وقبل engine.js.
   ============================================================ */
(() => {
  'use strict';

  function evidence(c, id){
    return (c && Array.isArray(c.evidence) ? c.evidence : []).find(e => e && e.id === id);
  }

  function addEvidence(c, item){
    if(!c || !item || !item.id) return null;
    const found = evidence(c, item.id);
    if(found){ Object.assign(found, item); return found; }
    c.evidence = c.evidence || [];
    c.evidence.push(item);
    return item;
  }

  function action(c, id){
    return (c && Array.isArray(c.investigationActions) ? c.investigationActions : []).find(a => a && a.id === id);
  }

  function patchAction(c, id, patch){
    const a = action(c, id);
    if(a) Object.assign(a, patch || {});
    return a;
  }

  function appendText(obj, key, text, marker){
    if(!obj || !text) return;
    const current = String(obj[key] || '');
    if(marker && current.includes(marker)) return;
    obj[key] = current ? `${current} ${text}` : text;
  }

  function addAnswerText(suspect, unlockId, text, marker){
    if(!suspect || !Array.isArray(suspect.questions)) return;
    const q = suspect.questions.find(x => x && x.unlockId === unlockId);
    if(q) appendText(q, 'a', text, marker);
  }

  /* ==========================================================
     1) خطوبة مؤجلة
     - رقم غير محفوظ -> كتابة آخر 4 أرقام -> معرفة صاحب الخط.
     - رقم لوحة من الكاميرا -> كتابته -> تثبيت ملكية العربية.
     ========================================================== */
  if(typeof CASE_POSTPONED_ENGAGEMENT !== 'undefined'){
    const c = CASE_POSTPONED_ENGAGEMENT;
    c.discoveryTabLabel = 'اكتشافات';

    const callEv = evidence(c, 'hassan_p_pressure_call');
    if(callEv){
      callEv.title = 'مكالمة ضغط من رقم غير محفوظ';
      callEv.short = 'رقم غير محفوظ اتصل بمعتز قبل خروجه مباشرة؛ آخر 4 أرقام: 7316';
      callEv.full = 'سجل المكالمات يثبت اتصالًا قصيرًا ومتكررًا من رقم غير محفوظ قبل خروج معتز. الرقم الكامل محجوب في النسخة الأولية، لكن آخر أربعة أرقام ظاهرة بوضوح: 7316. الاستعلام عن صاحب الخط محتاج إدخال الجزء الظاهر يدويًا في بوابة المشتركين.';
    }

    addEvidence(c, {
      id:'engagement_caller_identity',
      tag:'من بوابة بيانات المشتركين', crit:true,
      title:'صاحب الرقم الضاغط هو حسن', img:null,
      short:'الاستعلام بآخر 4 أرقام ربط المكالمة بخط مسجل باسم حسن',
      full:'إدخال آخر أربعة أرقام 7316 في بوابة المشتركين رجّع سجل الخط الكامل، واتضح إنه مسجل باسم حسن. كده بقى عندك رابط مستقل بين كلام تامر عن المكالمة والشخص اللي كان بيضغط على معتز.',
      unlocked:false, order:96
    });

    const cameraEv = evidence(c, 'hassan_p_vehicle_camera');
    if(cameraEv){
      appendText(cameraEv, 'full', 'تكبير لقطة اللوحة أظهر الرقم كاملًا: «س م د 4821».', '4821');
      appendText(cameraEv, 'short', ' رقم اللوحة المقروء: س م د 4821.', '4821');
    }

    addEvidence(c, {
      id:'engagement_vehicle_registry',
      tag:'من سجل المركبات', crit:true,
      title:'مطابقة لوحة العربية', img:null,
      short:'اللوحة س م د 4821 مرتبطة بالعربية المستخدمة في تحركات حسن',
      full:'البحث اليدوي برقم اللوحة س م د 4821 أكد إن العربية الظاهرة في كاميرا العمارة هي نفس العربية المرتبطة بحسن، وفتح إمكانية تتبعها على كاميرات الطريق بدل الاكتفاء بصورة واحدة.',
      unlocked:false, order:97
    });

    patchAction(c, 'engagement_check_call_records', {
      successText:'السجل أظهر مكالمة ضغط من رقم غير محفوظ ينتهي بـ7316. لسه محتاج تحدد صاحب الخط.'
    });
    patchAction(c, 'engagement_question_doorman', {
      requires:['engagement_caller_identity','hassan_p_debt']
    });
    patchAction(c, 'engagement_review_camera', {
      successText:'الكاميرا أثبتت ركوب معتز العربية وسمحت بقراءة اللوحة: س م د 4821.'
    });
    patchAction(c, 'engagement_track_vehicle_route_v2', {
      requires:['hassan_p_vehicle_camera','engagement_vehicle_registry']
    });

    c.discoveryLocks = [
      {
        id:'engagement_lookup_caller',
        kind:'استعلام اتصالات',
        label:'بوابة بيانات المشتركين',
        introText:'سجل المكالمات معاك، لكن اسم صاحب الرقم مش ظاهر. اكتب آخر 4 أرقام اللي ظهرت في السجل عشان تعمل استعلام رسمي.',
        lockedText:'لسه ما استخرجتش سجل المكالمات اللي سبق اختفاء معتز.',
        requires:['hassan_p_pressure_call'],
        inputMode:'numeric', maxLength:4,
        placeholder:'آخر 4 أرقام...',
        acceptedAnswers:['7316','٧٣١٦'],
        wrongMsg:'✗ الرقم مش مطابق للسجل. راجع آخر أربعة أرقام في دليل المكالمة.',
        successText:'ظهر صاحب الخط: حسن.',
        resultText:'تم توثيق صاحب الرقم ضمن الأدلة.',
        image: callEv && callEv.img ? callEv.img : null,
        resultEvidenceIds:['engagement_caller_identity']
      },
      {
        id:'engagement_lookup_vehicle',
        kind:'سجل مركبات',
        label:'البحث برقم اللوحة',
        introText:'الكاميرا جابت رقم اللوحة كامل. اكتب الرقم كما قرأته من الدليل عشان تثبت العربية وتبدأ تتبع مسارها.',
        lockedText:'لسه ما عندكش لقطة واضحة لرقم العربية.',
        requires:['hassan_p_vehicle_camera'],
        inputMode:'text', maxLength:16,
        placeholder:'رقم اللوحة...',
        acceptedAnswers:['س م د 4821','سمد4821','س م د ٤٨٢١','سمد٤٨٢١'],
        wrongMsg:'✗ مفيش مطابقة للرقم ده. راجع لقطة الكاميرا.',
        successText:'تمت مطابقة اللوحة، وتقدر دلوقتي تتبع العربية على الطريق.',
        resultText:'سجل المركبات اتضاف للأدلة.',
        resultEvidenceIds:['engagement_vehicle_registry']
      }
    ];
  }

  /* ==========================================================
     2) الرسالة المشفرة
     - حل الشفرة يحدد نوع المكان، واستجواب سعاد يعطي اسم الفيلا.
     - البحث باسم الفيلا يعطي كود المخزن B-12، واللاعب يدخله.
     ========================================================== */
  if(typeof CASE_CODED_MESSAGE !== 'undefined'){
    const c = CASE_CODED_MESSAGE;
    c.discoveryTabLabel = 'اكتشافات';

    const soad = (c.suspects || []).find(s => s && s.id === 'housekeeper_soad_c');
    addAnswerText(soad, 'soad_c_tenure', '"العيلة كان عندها زمان فيلا قديمة كلنا بنسميها فيلا النخيل، ومخزنها كان منفصل عن البيت."', 'فيلا النخيل');
    const soadEv = evidence(c, 'soad_c_tenure');
    appendText(soadEv, 'full', 'سعاد ذكرت اسم العقار القديم صراحة: «فيلا النخيل».', 'فيلا النخيل');

    addEvidence(c, {
      id:'coded_villa_registry',
      tag:'من أرشيف العقارات القديم', crit:true,
      title:'سجل فيلا النخيل', img:null,
      short:'العقار القديم فيه مخزن خدمة مسجل بالكود B-12',
      full:'البحث باسم «فيلا النخيل» في أرشيف العقارات رجّع مخططًا قديمًا للعقار. المخزن المنفصل ظاهر فيه تحت كود B-12، لكن السجل وحده لا يثبت إن نور موجودة هناك.',
      unlocked:false, order:96
    });

    addEvidence(c, {
      id:'coded_storage_b12',
      tag:'من مخطط العقار', crit:true,
      title:'تحديد مخزن B-12', img:null,
      short:'كود B-12 حدد المدخل الجانبي والمخزن المقصود بدقة',
      full:'إدخال كود B-12 في مخطط العقار فتح تفاصيل المخزن المنفصل ومدخله الجانبي. لما تقارن ده بشهادة وجود يارا قرب الفيلا، يبقى عندك موقع محدد يصلح للمداهمة.',
      unlocked:false, order:97
    });

    patchAction(c, 'raid_coded_villa', {
      label:'اربط موقع المخزن بالشهادة ثم داهمه',
      description:'المداهمة لا تتم إلا بعد فك الشفرة، استخراج اسم العقار وكود المخزن، وربط المكان بشهادة مستقلة ودافع واضح.',
      requires:['coded_storage_b12','yara_c_seen_villa','yara_c_debt']
    });

    c.discoveryLocks = [
      {
        id:'coded_property_lookup',
        kind:'بحث عقاري',
        label:'أرشيف العقارات القديمة',
        introText:'حل الشفرة قال إن المقصود «مخزن فيلا». سعاد قالت اسم الفيلا القديمة أثناء الاستجواب. اكتب اسم العقار عشان تجيب سجله.',
        lockedText:'لسه ما جمعتش حل الشفرة ومعرفة سعاد بتاريخ العيلة.',
        requires:['cipher_location_decoded','soad_c_tenure'],
        inputMode:'text', maxLength:32,
        placeholder:'اسم الفيلا...',
        acceptedAnswers:['فيلا النخيل','النخيل'],
        wrongMsg:'✗ الاسم مش موجود في الأرشيف. ارجع لكلام سعاد.',
        successText:'لقيت سجل فيلا النخيل، وفيه مخزن مسجل بالكود B-12.',
        resultText:'سجل العقار محفوظ ضمن الأدلة.',
        image: evidence(c,'ransom_note') && evidence(c,'ransom_note').img ? evidence(c,'ransom_note').img : null,
        resultEvidenceIds:['coded_villa_registry']
      },
      {
        id:'coded_storage_lookup',
        kind:'مخطط موقع',
        label:'فتح تفاصيل المخزن',
        introText:'سجل الفيلا فيه كود واحد للمخزن المنفصل. اكتبه في شاشة المخطط عشان تحدد المدخل والمكان بدقة.',
        lockedText:'لسه ما استخرجتش سجل الفيلا القديمة.',
        requires:['coded_villa_registry'],
        inputMode:'text', maxLength:8,
        placeholder:'كود المخزن...',
        acceptedAnswers:['B12','B-12','b12','b-12','ب12','ب-12','ب١٢'],
        wrongMsg:'✗ الكود مش مطابق لسجل العقار.',
        successText:'اتفتح مخطط B-12 واتحدد المدخل الجانبي للمخزن.',
        resultText:'تفاصيل مخزن B-12 اتضافت للأدلة.',
        resultEvidenceIds:['coded_storage_b12']
      }
    ];
  }

  /* ==========================================================
     3) الوشاية
     - أول رسالة تكشف آخر 4 أرقام للمرسل، اللاعب يدخلها لفتح طلب الاستعلام.
     - سجل الخط يعطي مرجع بصمة جهاز D14، واللاعب يبحث به للتأكيد الفني.
     ========================================================== */
  if(typeof CASE_FALSE_RUMOR !== 'undefined'){
    const c = CASE_FALSE_RUMOR;
    c.discoveryTabLabel = 'اكتشافات';

    const source = evidence(c, 'source_trace');
    appendText(source, 'full', 'نسخة الرسالة الأصلية أظهرت آخر أربعة أرقام من رقم المرسل الجديد: 6241.', '6241');
    appendText(source, 'short', ' آخر 4 أرقام للمرسل: 6241.', '6241');

    addEvidence(c, {
      id:'rumor_line_lookup_ticket',
      tag:'من بوابة استعلام الخطوط', crit:false,
      title:'مرجع طلب الاستعلام R-17', img:null,
      short:'آخر أربعة أرقام طابقت الرقم الأصلي وفتحت طلب بيانات رسمي',
      full:'إدخال 6241 طابق الرقم اللي أرسل النسخة الأولى لروان وولّد مرجع الاستعلام R-17. المرجع لا يحدد صاحبة الخط وحده، لكنه يسمح بطلب سجل التفعيل الرسمي.',
      unlocked:false, order:96
    });

    const sender = evidence(c, 'sender_line_record');
    appendText(sender, 'full', 'سجل التفعيل يحتوي مرجع بصمة الجهاز «D14».', 'D14');
    appendText(sender, 'short', ' مرجع بصمة الجهاز: D14.', 'D14');

    addEvidence(c, {
      id:'rumor_device_fingerprint',
      tag:'من سجل بصمة الجهاز', crit:true,
      title:'تطابق بصمة الجهاز D14', img:null,
      short:'نفس بصمة الجهاز ظهرت مع الخط الجديد وخط ياسمين الأساسي',
      full:'البحث بمرجع D14 في سجل الأجهزة أكد إن بصمة الجهاز اللي فعّلت الرقم الجديد هي نفسها اللي سبق استخدامها مع خط ياسمين الأساسي. ده يقوي الربط التقني من مجرد ملكية خط إلى تطابق جهاز فعلي.',
      unlocked:false, order:97
    });

    patchAction(c, 'trace_sender_number', {
      requires:['source_trace','rumor_line_lookup_ticket'],
      description:'بعد مطابقة الجزء الظاهر من الرقم وتوليد مرجع الاستعلام، اطلب سجل التفعيل الرسمي.',
      successText:'سجل الخط ربط الرقم الجديد بياسمين وظهر فيه مرجع بصمة الجهاز D14.'
    });

    c.conclusiveEvidenceIds = ['aunt_testimony','photo_analysis','rumor_device_fingerprint','contradiction_noted_rumor'];
    c.conclusiveRequired = 4;

    const how = c.theoryBuilder && Array.isArray(c.theoryBuilder.questions)
      ? c.theoryBuilder.questions.find(q => q && q.id === 'howidentified') : null;
    if(how && Array.isArray(how.options)){
      const correct = how.options.find(o => o && o.id === how.correctOptionId);
      if(correct) correct.text = 'التحليل أثبت الفبركة + تتبع الرقم قاد لسجل التفعيل + مرجع D14 أثبت تطابق الجهاز مع خط ياسمين + إنكارها تعارض مع السجل الرقمي';
    }

    c.discoveryLocks = [
      {
        id:'rumor_sender_digits',
        kind:'تتبع رقم',
        label:'بوابة استعلام الخطوط',
        introText:'الرسالة الأصلية عند روان بتعرض جزءًا فقط من رقم المرسل. اكتب آخر أربعة أرقام الظاهرة عشان تولّد طلب الاستعلام.',
        lockedText:'لسه ما استخرجتش الرسالة الأصلية من روان.',
        requires:['source_trace'],
        inputMode:'numeric', maxLength:4,
        placeholder:'آخر 4 أرقام...',
        acceptedAnswers:['6241','٦٢٤١'],
        wrongMsg:'✗ الأرقام مش مطابقة للرسالة الأصلية.',
        successText:'اتولد مرجع الاستعلام R-17، وتقدر تطلب سجل التفعيل.',
        resultText:'مرجع الاستعلام محفوظ في ملف القضية.',
        resultEvidenceIds:['rumor_line_lookup_ticket']
      },
      {
        id:'rumor_device_ref',
        kind:'بصمة جهاز',
        label:'سجل الأجهزة المرتبطة',
        introText:'سجل الخط فيه مرجع قصير لبصمة الجهاز المستخدم وقت التفعيل. اكتب المرجع عشان تقارن الجهاز بخطوط سابقة.',
        lockedText:'لسه ما وصلتش لسجل تفعيل الرقم الجديد.',
        requires:['sender_line_record'],
        inputMode:'text', maxLength:8,
        placeholder:'مرجع الجهاز...',
        acceptedAnswers:['D14','d14','D-14','d-14'],
        wrongMsg:'✗ المرجع مش مطابق لسجل التفعيل.',
        successText:'بصمة D14 طابقت جهازًا سبق استخدامه مع خط ياسمين الأساسي.',
        resultText:'نتيجة تطابق الجهاز اتضافت للأدلة.',
        image: evidence(c,'photo_analysis') && evidence(c,'photo_analysis').img ? evidence(c,'photo_analysis').img : null,
        resultEvidenceIds:['rumor_device_fingerprint']
      }
    ];
  }

  /* ==========================================================
     4) المحفظة المفقودة
     - ننقل فكرة كود اللابتوب من codeLock المنفصل إلى اكتشاف داخل القصة.
     - بعد الفتح يظهر مرجع منصة NX-204 واللاعب يبحث به لإثبات مسار الأموال.
     ========================================================== */
  if(typeof CASE_LOST_WALLET !== 'undefined'){
    const c = CASE_LOST_WALLET;
    c.discoveryTabLabel = 'اكتشافات';
    c.codeLockPuzzle = { enabled:false };

    const privateKey = evidence(c, 'private_key_log');
    appendText(privateKey, 'full', 'جنب جهاز مالك اتلاقى ملف موارد بشرية مختصر: سنة التخرج 2017، وبطاقة جهاز الأمان تنتهي بـ08. وعلى ورقة صغيرة مكتوب: «آخر رقمين من سنة التخرج، وبعدهم آخر رقمين من البادج».', 'سنة التخرج 2017');

    addEvidence(c, {
      id:'malak_laptop_note',
      tag:'من لابتوب مالك', crit:true,
      title:'محادثة تخطيط ومرجع منصة NX-204', img:null,
      short:'اللابتوب كشف تجهيزًا مسبقًا للتحويل ومرجع متابعة NX-204',
      full:'بعد فتح اللابتوب ظهرت محادثات عن تجهيز تحويل كبير قبل الانهيار، ومعاها مرجع متابعة على منصة تداول مكتوب NX-204. المرجع نفسه لا يثبت اسم صاحب الحساب قبل الرجوع لبيانات المنصة.',
      unlocked:false, order:96
    });

    c.discoveryLocks = [
      {
        id:'wallet_malak_laptop',
        kind:'لابتوب مقفول',
        label:'لابتوب مالك',
        introText:'اللابتوب مقفول بـ4 أرقام. عندك سنة التخرج 2017، والبادج الأمني ينتهي بـ08، والملاحظة بتقول: آخر رقمين من سنة التخرج ثم آخر رقمين من البادج.',
        lockedText:'لسه محتاج تثبت إن جهاز التوقيع تحت مسؤولية مالك وتراجع سجل المفتاح.',
        requires:['wallet_access','private_key_log'],
        inputMode:'numeric', maxLength:4,
        placeholder:'••••',
        acceptedAnswers:['1708','١٧٠٨'],
        wrongMsg:'✗ اللابتوب ما فتحش. ركّب الرقمين من التلميح المكتوب.',
        successText:'اللابتوب اتفتح وظهر مرجع منصة تداول: NX-204.',
        resultText:'محتوى اللابتوب ومرجع NX-204 اتسجلوا ضمن الأدلة.',
        image: privateKey && privateKey.img ? privateKey.img : null,
        resultEvidenceIds:['malak_laptop_note']
      },
      {
        id:'wallet_exchange_reference',
        kind:'تتبع أموال',
        label:'بوابة مراجعة منصة التداول',
        introText:'اللابتوب كشف مرجع متابعة للمعاملة. اكتب المرجع عشان تطلب بيانات الحساب الموثق اللي استقبل جزءًا من الأموال.',
        lockedText:'لسه ما فتحتش لابتوب مالك ولا عرفت مرجع المنصة.',
        requires:['malak_laptop_note'],
        inputMode:'text', maxLength:12,
        placeholder:'مرجع المتابعة...',
        acceptedAnswers:['NX204','NX-204','nx204','nx-204'],
        wrongMsg:'✗ المرجع غير موجود. راجع المحادثة اللي ظهرت بعد فتح اللابتوب.',
        successText:'بيانات المنصة ربطت الحساب الموثق باسم مالك بمسار الأموال.',
        resultText:'هوية الحساب الخارجي اتضافت للأدلة.',
        resultEvidenceIds:['external_wallet_id']
      }
    ];
  }

  /* ==========================================================
     5) دهب الفرح
     - رقم ترابيزة ظاهر في لقطة الفيديو -> خريطة الجلوس.
     - كود صندوق خدمة على مسار الحركة -> سجل تجهيزات القاعة.
     ========================================================== */
  if(typeof CASE_WEDDING_GOLD !== 'undefined'){
    const c = CASE_WEDDING_GOLD;
    c.discoveryTabLabel = 'اكتشافات';

    const video = evidence(c, 'video_clip');
    appendText(video, 'full', 'عند تكبير أول لقطة من مسار الظل، كارت ترابيزة ظاهر بوضوح عليه الرقم «14».', 'الرقم «14»');

    addEvidence(c, {
      id:'wedding_table14_lookup',
      tag:'من خريطة جلوس المدعوين', crit:true,
      title:'ترابيزة 14 تخص مجموعة إبراهيم', img:null,
      short:'مطابقة رقم الترابيزة حددت نقطة بداية المسار عند مجموعة إبراهيم',
      full:'إدخال رقم 14 في خريطة جلوس المدعوين أكد إن الترابيزة الظاهرة في بداية مسار الظل هي ترابيزة مجموعة إبراهيم. المعلومة لا تثبت السرقة وحدها، لكنها تربط الفيديو بمكان معروف داخل القاعة.',
      unlocked:false, order:96
    });

    const route = evidence(c, 'route_reconstruction');
    appendText(route, 'full', 'أثناء مراجعة الممر ظهر على صندوق خدمة بمحاذاة المسار الكود «خ-12».', 'خ-12');

    addEvidence(c, {
      id:'wedding_service_box_trace',
      tag:'من سجل تجهيزات القاعة', crit:true,
      title:'صندوق الخدمة خ-12 اتحرك وقت انقطاع الكهرباء', img:null,
      short:'السجل يربط الصندوق خ-12 بالممر المجاور لترابيزة 14',
      full:'البحث بكود خ-12 في سجل تجهيزات القاعة بيّن إن الصندوق كان موضوعًا في الممر المجاور لترابيزة 14، واتسجل نقله من مكانه وقت انقطاع الكهرباء. ده يفسر نقطة إخفاء مؤقتة على نفس مسار الحركة.',
      unlocked:false, order:97
    });

    patchAction(c, 'wedding_search_route_v2', {
      description:'نفّذ التفتيش بعد إثبات مسار الحركة، مطابقة ترابيزة 14، وتتبع صندوق الخدمة على نفس المسار.',
      requires:['route_reconstruction','debt_note','ibrahim_seen_near','wedding_table14_lookup','wedding_service_box_trace']
    });

    c.discoveryLocks = [
      {
        id:'wedding_table_number',
        kind:'خريطة جلوس',
        label:'ابحث برقم الترابيزة',
        introText:'الفيديو وشهادة رضا حددوا بداية مسار الحركة، وفي تكبير اللقطة ظهر رقم ترابيزة. اكتبه في خريطة الجلوس عشان تعرف مين كان في النقطة دي.',
        lockedText:'لسه محتاج الفيديو وشهادة رضا عشان تحدد بداية المسار.',
        requires:['video_clip','reda_witness'],
        inputMode:'numeric', maxLength:3,
        placeholder:'رقم الترابيزة...',
        acceptedAnswers:['14','١٤'],
        wrongMsg:'✗ الرقم مش مطابق للكارت الظاهر في اللقطة.',
        successText:'ترابيزة 14 هي ترابيزة مجموعة إبراهيم.',
        resultText:'خريطة الجلوس اتضافت للأدلة.',
        image: video && video.img ? video.img : null,
        resultEvidenceIds:['wedding_table14_lookup']
      },
      {
        id:'wedding_service_box',
        kind:'سجل تجهيزات',
        label:'تتبّع صندوق الخدمة',
        introText:'بعد إعادة بناء المسار ظهر كود على صندوق خدمة في الممر. اكتب الكود في سجل تجهيزات القاعة عشان تعرف مكانه وتحركه.',
        lockedText:'لسه ما أعدتش بناء مسار الحركة وربطته بنقطة البداية.',
        requires:['route_reconstruction','wedding_table14_lookup'],
        inputMode:'text', maxLength:8,
        placeholder:'كود الصندوق...',
        acceptedAnswers:['خ12','خ-12','خ 12','خ١٢','خ-١٢'],
        wrongMsg:'✗ الكود مش مطابق للصندوق الظاهر على المسار.',
        successText:'السجل أكد إن صندوق خ-12 اتحرك وقت الضلمة وكان على نفس مسار الشنطة.',
        resultText:'سجل الصندوق اتضاف للأدلة.',
        resultEvidenceIds:['wedding_service_box_trace']
      }
    ];
  }

  // فحص بسيط في الكونسول لو حصل خطأ في مرجع دليل جديد.
  try{
    const cases = [
      typeof CASE_POSTPONED_ENGAGEMENT !== 'undefined' ? CASE_POSTPONED_ENGAGEMENT : null,
      typeof CASE_CODED_MESSAGE !== 'undefined' ? CASE_CODED_MESSAGE : null,
      typeof CASE_FALSE_RUMOR !== 'undefined' ? CASE_FALSE_RUMOR : null,
      typeof CASE_LOST_WALLET !== 'undefined' ? CASE_LOST_WALLET : null,
      typeof CASE_WEDDING_GOLD !== 'undefined' ? CASE_WEDDING_GOLD : null,
    ].filter(Boolean);
    const issues = [];
    cases.forEach(c => {
      const ids = new Set((c.evidence || []).map(e => e && e.id).filter(Boolean));
      (c.discoveryLocks || []).forEach(lock => {
        (lock.requires || []).forEach(id => { if(!ids.has(id)) issues.push(`${c.id}:${lock.id}:missing-require:${id}`); });
        (lock.resultEvidenceIds || []).forEach(id => { if(!ids.has(id)) issues.push(`${c.id}:${lock.id}:missing-result:${id}`); });
      });
    });
    window.__TARAF_DISCOVERY_PACK_5__ = { version:'2026-08-24-v1', caseCount:cases.length, issueCount:issues.length, issues };
    if(issues.length) console.warn('[Taraf Discovery Pack 5]', issues);
  }catch(_){}
})();
