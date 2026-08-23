/* ============================================================
   طرف الخيط — Investigation Overhaul 2026-08-23
   طبقة نهائية موحدة للتحريات بعد تحميل كل القضايا والمواقع.

   أهدافها:
   1) منع أي إجراء تحريات من اختصار الطريق للجاني.
   2) منع نفس دليل التحريات من الظهور تلقائيًا عبر evidenceCombinations.
   3) إضافة ملفات تحريات إدارية منطقية لكل الشخصيات بدون كشف الحل.
   4) تشديد مسارات القضايا التي كشف الـaudit أنها توجه اللاعب بدري.
   5) إضافة فحص اتساق runtime يساعدنا نكتشف dead-ends مستقبلًا.
   ============================================================ */
(() => {
  'use strict';

  if (typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return;

  const AUDIT_VERSION = '2026-08-23-investigation-v1';

  function hash(text){
    let h = 2166136261 >>> 0;
    for (const ch of String(text || '')) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function pick(items, seed){
    if (!Array.isArray(items) || !items.length) return '';
    return items[Math.abs(seed) % items.length];
  }

  function uniq(items){
    return [...new Set((items || []).filter(Boolean))];
  }

  function evidenceById(c, id){
    return (c.evidence || []).find(e => e && e.id === id);
  }

  function ensureEvidence(c, item){
    if (!c || !item || !item.id) return null;
    const found = evidenceById(c, item.id);
    if (found) {
      Object.assign(found, item);
      return found;
    }
    c.evidence = c.evidence || [];
    c.evidence.push(item);
    return item;
  }

  function actionById(c, id){
    return (c.investigationActions || []).find(a => a && a.id === id);
  }

  function patchAction(caseId, actionId, patch){
    const c = CASES_REGISTRY.find(x => x && x.id === caseId);
    if (!c) return;
    c.investigationActions = c.investigationActions || [];
    const a = actionById(c, actionId);
    if (a) Object.assign(a, patch || {});
  }

  function removeAction(caseId, actionId){
    const c = CASES_REGISTRY.find(x => x && x.id === caseId);
    if (!c || !Array.isArray(c.investigationActions)) return;
    c.investigationActions = c.investigationActions.filter(a => !a || a.id !== actionId);
  }

  function removeCombinationResults(c, ids){
    if (!c || !Array.isArray(c.evidenceCombinations)) return;
    const blocked = new Set(ids || []);
    c.evidenceCombinations = c.evidenceCombinations.filter(x => x && !blocked.has(x.resultId));
  }

  /* ------------------------------------------------------------
     ملفات التحريات الإدارية للشخصيات
     ------------------------------------------------------------ */

  const ADDRESS_POOLS = {
    'القاهرة': ['مدينة نصر','مصر الجديدة','المعادي','عين شمس','حدائق القبة','شبرا','الزيتون'],
    'الجيزة': ['الدقي','العجوزة','الهرم','فيصل','مدينة 6 أكتوبر','الشيخ زايد','إمبابة'],
    'الإسكندرية': ['سيدي بشر','سموحة','العصافرة','محرم بك','ميامي','العجمي','سيدي جابر'],
    'الغربية': ['طنطا','كفر الزيات','المحلة الكبرى','بسيون','قطور','السنطة'],
    'المنوفية': ['شبين الكوم','مدينة السادات','أشمون','منوف','قويسنا','الباجور'],
    'الدقهلية': ['المنصورة','أجا','طلخا','ميت غمر','السنبلاوين','دكرنس'],
    'بني سويف': ['مدينة بني سويف','الواسطى','ناصر','ببا','إهناسيا'],
    'المنيا': ['مدينة المنيا','ملوي','سمالوط','بني مزار','أبو قرقاص'],
    'الإسماعيلية': ['مدينة الإسماعيلية','فايد','أبو صوير','القنطرة غرب','التل الكبير'],
    'الأقصر': ['مدينة الأقصر','إسنا','أرمنت','القرنة','الطود'],
    'مطروح': ['مرسى مطروح','العلمين','الحمام','الضبعة'],
    'الشرقية': ['الزقازيق','ههيا','أبو كبير','بلبيس','منيا القمح'],
    'البحيرة': ['دمنهور','كفر الدوار','إيتاي البارود','كوم حمادة','أبو حمص'],
  };

  const GENERAL_JOBS = [
    'موظف إداري','محاسب','موظف مبيعات','صاحب نشاط تجاري صغير','موظف خدمة عملاء',
    'مندوب مبيعات','موظف مشتريات','مشرف تشغيل','مصمم جرافيك','موظف موارد بشرية',
  ];

  function occupationFor(s, seed){
    const role = String((s && s.role) || '').toLowerCase();
    if (/طالب|تلميذ|مراهق/.test(role)) return 'طالب';
    if (/طفل|طفلة/.test(role)) return 'طالب بالمرحلة الابتدائية';
    if (/متقاعد/.test(role)) return 'متقاعد';
    if (/محامي/.test(role)) return 'محامي';
    if (/طبيب|دكتور/.test(role)) return 'طبيب';
    if (/ممرض|ممرضة/.test(role)) return 'تمريض ورعاية صحية';
    if (/صيدلي/.test(role)) return 'صيدلي';
    if (/شيف|طباخ|مطبخ/.test(role)) return 'مجال المطاعم والأغذية';
    if (/مذيع|مذيعة|إذاع/.test(role)) return 'إعلام وإذاعة';
    if (/صحفي/.test(role)) return 'صحفي';
    if (/كاتب|كاتبة|سيناريو/.test(role)) return 'كاتب';
    if (/ممثل|ممثلة|كوميديان|عارضة/.test(role)) return 'فنون وأداء';
    if (/مخرج/.test(role)) return 'إخراج وإنتاج فني';
    if (/منتج|إنتاج/.test(role)) return 'إنتاج وإدارة فنية';
    if (/مدرس|مدرّس|معلم|معلمة|أستاذ/.test(role)) return 'مجال التعليم';
    if (/مهندس/.test(role)) return 'مهندس';
    if (/مطور|مبرمج|تقني|ذكاء اصطناعي/.test(role)) return 'تكنولوجيا وبرمجيات';
    if (/مصمم|ستايلست|أزياء|ترميم/.test(role)) return 'تصميم وفنون تطبيقية';
    if (/محاسب|حسابات|بنك|صرف/.test(role)) return 'محاسبة وخدمات مالية';
    if (/مستثمر|رجل أعمال|شريك|ممول/.test(role)) return 'إدارة أعمال واستثمار';
    if (/مدير|مديرة/.test(role)) return 'إدارة وتشغيل';
    if (/صاحب|مالك/.test(role)) return 'صاحب نشاط خاص';
    if (/سائق/.test(role)) return 'سائق محترف';
    if (/حارس|أمن|بواب/.test(role)) return 'أمن وخدمات';
    if (/نادل|ضيافة/.test(role)) return 'ضيافة وخدمة عملاء';
    if (/مورد/.test(role)) return 'تجارة وتوريدات';
    if (/عامل|فني|نجار/.test(role)) return 'فني وعامل مهني';
    if (/مدرب|رياضي|عداء|لاعب/.test(role)) return 'مجال رياضي';
    if (/محصل|ديون/.test(role)) return 'تحصيل ومتابعة مالية';
    if (/مساعدة|مساعد/.test(role)) return 'مساعد إداري';
    return pick(GENERAL_JOBS, seed);
  }

  function ageFor(s, seed){
    const role = String((s && s.role) || '').toLowerCase();
    const between = (min,max) => min + (seed % (max-min+1));
    if (/طفل|طفلة/.test(role)) return between(8,13);
    if (/مراهق|مراهقة|طالب ثانوي|تلميذ/.test(role)) return between(16,19);
    if (/طالب|طالبة/.test(role)) return between(18,24);
    if (/جد|جدة/.test(role)) return between(62,76);
    if (/متقاعد/.test(role)) return between(58,70);
    if (/أب|والد|أم|والدة/.test(role)) return between(44,61);
    if (/عم |عمة|خال|خالة|أرملة/.test(role)) return between(40,59);
    if (/مدير|صاحب|مالك|طبيب|دكتور|محامي|مدرب/.test(role)) return between(34,54);
    if (/خطيب|خطيبة|عريس|عروسة|صديق|صديقة|زميل|زميلة/.test(role)) return between(24,37);
    return between(27,48);
  }

  function addressFor(c, s, seed){
    const loc = (c && c.location) || {};
    const gov = loc.governorate || 'القاهرة';
    const pool = ADDRESS_POOLS[gov] || [loc.locality || loc.district || 'مدينة المحافظة'];
    let place = pick(pool, seed);

    // ما نخليش كل الناس ساكنة في نفس مكان الواقعة لمجرد إن القضية حصلت هناك.
    if (pool.length > 1 && place === loc.locality) place = pool[(seed + 1) % pool.length];

    return `${place}، محافظة ${gov}`;
  }

  function neutralRecords(seed, age){
    const mod = seed % 7;
    if (mod <= 3 || age < 21) return [];
    if (mod === 4) return [{ year:'2023', title:'محضر فقد مستندات شخصية', outcome:'حُفظ إداريًا' }];
    if (mod === 5) return [{ year:'2022', title:'مخالفة مرورية بسيطة', outcome:'تم التصالح' }];
    return [{ year:'2024', title:'استعلام إداري سابق', outcome:'لا توجد ملاحظات' }];
  }

  function applyBackgroundProfiles(){
    CASES_REGISTRY.forEach(c => {
      (c.suspects || []).forEach((s, index) => {
        const seed = hash(`${c.id}|${s.id}|background-v1`);
        const age = ageFor(s, seed);
        const existing = s.backgroundCheck && typeof s.backgroundCheck === 'object'
          ? s.backgroundCheck
          : (s.criminalRecord && typeof s.criminalRecord === 'object' ? s.criminalRecord : {});

        // نحترم أي بيانات مكتوبة يدويًا بالفعل، ونملأ فقط الناقص.
        s.backgroundCheck = {
          ...existing,
          age: existing.age || s.age || age,
          occupation: existing.occupation || occupationFor(s, seed),
          address: existing.address || s.address || addressFor(c, s, seed),
          searchArea: existing.searchArea || (c.location
            ? `${c.location.divisionType || ''} ${c.location.district || ''}، محافظة ${c.location.governorate || ''}`.trim()
            : 'نطاق الواقعة'),
          records: Array.isArray(existing.records) ? existing.records : neutralRecords(seed, age),
          administrativeNotes: existing.administrativeNotes || 'الاستعلام إداري وتعريفي فقط؛ لا يتضمن استنتاجًا عن صلة الشخص بالواقعة الحالية.',
        };
      });
    });
  }

  /* ------------------------------------------------------------
     تشديد مسارات القضايا التي كان فيها تسريب اتجاه الحل
     ------------------------------------------------------------ */

  function hardenCriticalRoutes(){
    // العزبة القديمة: لازم اللاعب يراجع أكتر من فرضية قبل ما الشاهد يحدد حركة يوسف.
    patchAction('old-estate','ask_dinner_witness',{
      label:'راجع شهادات الحاضرين عن حركة الأطباق',
      description:'قارن أقوال أفراد العيلة عن توزيع الأطباق والحركة حول مائدة وليد قبل طلب شهادة مستقلة.',
      requires:['poisoned_plate','dalia_serving','marwan_mismanagement','samira_tension','youssef_o_exclusion']
    });
    patchAction('old-estate','search_youssef_belongings',{
      label:'فتّش متعلقات صاحب الفرصة الأقوى',
      description:'بعد ثبوت الدافع وشهادة الحركة حول الطبق، نفّذ تفتيشًا مبررًا للمتعلقات وافحص أي عبوات مشبوهة.',
      requires:['poisoned_plate','youssef_o_exclusion','witness_youssef_near_plate']
    });

    // الرسالة المشفرة: فك الشفرة أصبح شرطًا حقيقيًا للوصول للمكان، مش مجرد نشاط جانبي.
    const coded = CASES_REGISTRY.find(c => c.id === 'coded-message');
    if (coded) {
      ensureEvidence(coded, {
        id:'cipher_location_decoded', tag:'من فك الشفرة', crit:true,
        title:'الموقع المستخرج من الرسالة', img:null,
        short:'فك الشفرة حدد عبارة تشير لمخزن فيلا قديمة',
        full:'بعد حل مفتاح الاستبدال، ظهرت عبارة تشير إلى مخزن فيلا. المعلومة تحدد نوع المكان فقط، وتحتاج ربطها بالشهود والتحركات قبل أي مداهمة.',
        unlocked:false, order:96
      });
      if (coded.cipherPuzzle && coded.cipherPuzzle.enabled) {
        coded.cipherPuzzle.resultEvidenceIds = ['cipher_location_decoded'];
        coded.cipherPuzzle.resultText = 'فكيت الشفرة: الرسالة تشير إلى "مخزن فيلا". لسه لازم تربط المكان بتحركات المشتبهين قبل أي إجراء.';
      }
      patchAction('coded-message','follow_soad_witness',{
        label:'راجع شهادة سعاد بعد مقارنة روايات المقربين',
        description:'ارجع لشهادة سعاد فقط بعد ما تجمع معلومات عن الروتين، الدافع المالي، ومعرفة أفراد الدائرة القريبة.',
        requires:['atef_c_questioned','yara_c_debt','soad_c_tenure']
      });
      patchAction('coded-message','raid_coded_villa',{
        label:'اربط حل الشفرة بالشهادة ثم داهم الموقع',
        description:'المداهمة لا تتم إلا بعد فك الشفرة وربط الموقع بشهادة مستقلة ودافع واضح.',
        requires:['cipher_location_decoded','yara_c_seen_villa','yara_c_debt']
      });
      coded.conclusiveEvidenceIds = ['cipher_location_decoded','yara_c_seen_villa','noor_found_old_villa'];
      coded.conclusiveRequired = 3;
    }

    // خطوبة مؤجلة: مفيش اسم حسن من أول ضغطة تحريات.
    patchAction('postponed-engagement','engagement_check_call_records',{
      label:'راجع الاتصالات قبل خروج معتز',
      description:'بعد ما تعرف إن معتز كان ناوي يكلم شخص مهم وتظهر مشكلة مالية، راجع سجل الاتصالات لتحديد الطرف المقصود.',
      requires:['tamer_p_confession','sameh_p_reservations']
    });
    patchAction('postponed-engagement','engagement_question_doorman',{
      label:'اسأل البواب عن الشخص المرتبط بالمكالمة',
      description:'بعد ما يحدد سجل الاتصالات طرفًا له سبب للضغط على معتز، تحقق ميدانيًا من وجوده قرب العمارة.',
      requires:['hassan_p_pressure_call','hassan_p_debt']
    });
    patchAction('postponed-engagement','engagement_review_camera',{
      label:'راجع كاميرا العمارة لتثبيت شهادة البواب',
      description:'استخدم الكاميرا للتحقق من الشهادة وتحديد العربية واتجاهها، مش لاختيار مشتبه جديد من الصفر.',
      requires:['hassan_p_location_witness','last_text_message']
    });

    // الطبخة الأخيرة: فحص الزيت لا يبدأ من تقرير السم وحده.
    patchAction('last-dish','inspect_oil_station',{
      label:'افحص منطقة تجهيز الطبق بعد مقارنة الوصول',
      description:'بعد مراجعة سجل الثلاجة وأقوال الوصول للمطبخ، افحص المكوّن المشترك اللي يطابق تقرير السم.',
      requires:['poison_report','fridge_log','kitchen_access']
    });
    patchAction('last-dish','lift_oil_prints',{
      label:'ارفع البصمات من العبوة محل الشك',
      description:'بعد ثبوت تحريك العبوة ووجود تناقض في الوصول، ارفع البصمات بدل استخدامها كاختصار مبكر للحل.',
      requires:['oil_bottle_moved','fridge_log','contract_dispute']
    });
    const lastDish = CASES_REGISTRY.find(c => c.id === 'last-dish');
    if (lastDish) {
      lastDish.conclusiveEvidenceIds = ['poison_report','fridge_log','noha_prints','contradiction_noted_lastdish'];
      lastDish.conclusiveRequired = 4;
    }

    // ليلة الافتتاح: ما نطلبش تفتيش متعلقات طارق قبل وجود دافع وفرصة.
    patchAction('opening-night','opening_cup_forensics',{
      label:'افحص الكوباية ومتعلقات أصحاب الوصول',
      description:'نفّذ الفحص بعد إثبات فترة الوصول، ومراجعة الأشخاص اللي عندهم دافع وحضور فعلي خلف الكواليس.',
      requires:['poisoned_water_cup','cup_access_window','tarek_o_contract','gehad_seen_backstage']
    });

    // ملف مغلق: شاهد الجار لا يختار طارق قبل استجواب أطراف الملف القديم.
    patchAction('closed-file','ask_fathy_neighbor',{
      label:'اسأل الجار بعد مراجعة أطراف الملف القديم',
      description:'بعد مقارنة دوافع الأطراف المرتبطين بإعادة فتح القضية، استخدم شاهدًا مستقلًا لتثبيت حركة ليلة الجريمة.',
      requires:['old_case_file','hamed_knew_reopening','nasser_reputation_risk','tarek_f_family_burden']
    });

    // حريق المخزن: شهادة العربيات لا تظهر بعد تقرير الحريق مباشرة.
    patchAction('warehouse-fire','ask_warehouse_neighbor',{
      label:'راجع حركة العربيات بعد جمع دوافع الأطراف',
      description:'بعد تثبيت أن الحريق متعمد ومراجعة النقص المالي ومعرفة وجود سعيد، اسأل شاهدًا مستقلًا عن الحركة حول المخزن.',
      requires:['fire_investigator_report','gamal_inventory_shortage','hosny_financial_trouble','farid_knew_saeed_present']
    });
  }

  function hardenMediumRoutes(){
    // بصمة في الوحل
    patchAction('mud-print','trace_bassel_city',{
      label:'راجع تحركات أصحاب الوصول لأدوات سيد',
      description:'قارن علاقة المشتبهين بسيد وإمكانية الوصول لمقتنياته قبل مراجعة شهود الحركة خارج الورشة.',
      requires:['bassel_bond','samia_gloves','amir_old_tools']
    });

    // خط النهاية
    patchAction('finish-line','ask_camp_volunteers',{
      label:'راجع حركة الموجودين حول تجهيز الزجاجات',
      description:'بعد فهم بروتوكول الزجاجة، الوصول للمكملات، والمصلحة التجارية، اسأل المتطوعين عن الحركة الفعلية.',
      requires:['water_station_protocol','heba_supplement_prep','tamer_f_sponsorship']
    });

    // خيط أحمر
    patchAction('red-thread','check_backdoor',{
      label:'راجع المداخل الجانبية بعد تضييق دائرة الوصول',
      description:'راجع الباب الخلفي فقط بعد تحديد أصحاب الوصول للقماش وظهور دافع مالي وتحليل الأثر الموجود على الخيط.',
      requires:['fabric_access_list','kamal_secret','dna_sample_thread']
    });

    // فاتورة زيادة
    patchAction('overbilled','check_closing_witnesses',{
      label:'راجع توقيتات البقاء بعد الإغلاق',
      description:'بعد مراجعة الفواتير وأقوال أكثر من طرف عن الخلاف واتفاق المورد، تحقق من مواعيد الانصراف بشهادة مستقلة.',
      requires:['inflated_invoices','raafat_confrontation','mounir_heard_argument','medhat_o_deal']
    });

    // باب 307
    patchAction('room-307','review_corridor_camera',{
      label:'راجع كاميرا الممر بعد ربط المكالمة بالخلاف المالي',
      description:'استخدم الكاميرا لتأكيد فرضية قائمة بعد معرفة سبب فتح الغرفة ومصدر المكالمة والخلاف في الشركة.',
      requires:['keycard_reason','sayed_call_source','financial_dispute']
    });

    // حادثة الطريق: الدليل ده موجود أصلًا كسؤال مباشر، فإجراء التوثيق كان مسارًا مكررًا وغير منطقي.
    removeAction('hit-and-run','document_karim_statement');
  }

  /* ------------------------------------------------------------
     قواعد عامة لكل القضايا
     ------------------------------------------------------------ */
  function normalizeAllCases(){
    CASES_REGISTRY.forEach(c => {
      if (!c) return;
      c.investigationAuditVersion = AUDIT_VERSION;

      // إزالة التكرار في الأدلة مع الحفاظ على آخر نسخة لأنها غالبًا patch أحدث.
      if (Array.isArray(c.evidence)) {
        const byId = new Map();
        c.evidence.forEach(e => { if (e && e.id) byId.set(e.id, e); });
        c.evidence = [...byId.values()];
      }

      // إزالة تكرار الإجراءات مع الحفاظ على آخر تعريف.
      if (Array.isArray(c.investigationActions)) {
        const byId = new Map();
        c.investigationActions.forEach(a => { if (a && a.id) byId.set(a.id, a); });
        c.investigationActions = [...byId.values()];

        // لو دليل له مسار تحريات صريح، ما يظهرش تلقائيًا من evidenceCombinations كاختصار.
        const actionResults = new Set();
        c.investigationActions.forEach(a => (a.resultEvidenceIds || []).forEach(id => actionResults.add(id)));
        if (Array.isArray(c.evidenceCombinations)) {
          c.evidenceCombinations = c.evidenceCombinations.filter(x => x && !actionResults.has(x.resultId));
        }
      }
    });
  }

  function runtimeAudit(){
    const issues = [];
    CASES_REGISTRY.forEach(c => {
      if (!c) return;
      const evidenceIds = new Set((c.evidence || []).map(e => e && e.id).filter(Boolean));
      const actionIds = new Set();

      (c.investigationActions || []).forEach(a => {
        if (!a || !a.id) return;
        if (actionIds.has(a.id)) issues.push({caseId:c.id,type:'duplicate-action',id:a.id});
        actionIds.add(a.id);

        (a.requires || []).forEach(id => {
          if (!evidenceIds.has(id)) issues.push({caseId:c.id,type:'missing-action-requirement',actionId:a.id,id});
        });
        (a.resultEvidenceIds || []).forEach(id => {
          if (!evidenceIds.has(id)) issues.push({caseId:c.id,type:'missing-action-result',actionId:a.id,id});
        });
      });

      (c.conclusiveEvidenceIds || []).forEach(id => {
        if (!evidenceIds.has(id)) issues.push({caseId:c.id,type:'missing-conclusive-evidence',id});
      });
    });

    try {
      window.__TARAF_INVESTIGATION_AUDIT__ = {
        version:AUDIT_VERSION,
        caseCount:CASES_REGISTRY.length,
        issueCount:issues.length,
        issues
      };
      if (issues.length) console.warn('[Taraf Investigation Audit]', issues);
      else console.info(`[Taraf Investigation Audit] ${CASES_REGISTRY.length} cases checked — no broken investigation references.`);
    } catch (_) {}
  }

  // الترتيب مهم: نضيف البيانات، نطبق إصلاحات القضايا، ثم نطبّع المسارات ونفحصها.
  applyBackgroundProfiles();
  hardenCriticalRoutes();
  hardenMediumRoutes();
  normalizeAllCases();
  runtimeAudit();
})();
