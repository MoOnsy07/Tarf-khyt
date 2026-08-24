/* ============================================================
   طرف الخيط — الاكتشافات التفاعلية الواقعية الموحدة
   - بتشتغل فقط في مود التحقيق الواقعي.
   - كل قضية في CASES_REGISTRY تاخد اكتشافين كتابيين تلقائيًا.
   - الاكتشافات مبنية على أدلة موجودة بالفعل؛ مفيش أسئلة اختيار.
   - لوحة الاتهام في الواقعي ما تفتحش قبل إنهاء الاكتشافين.
   - الوضع العادي لا يتأثر نهائيًا.
   ============================================================ */
(() => {
  'use strict';

  if (typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return;
  if (typeof renderTabs !== 'function' || typeof renderPanel !== 'function') return;

  const VERSION = '2026-08-24-realistic-all-v1';
  const STORAGE_FIELD = 'solvedDiscoveries';

  function hashString(value){
    let h = 2166136261 >>> 0;
    const s = String(value || '');
    for(let i=0;i<s.length;i++){
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function twoDigits(n){
    return String(10 + (Math.abs(n) % 90));
  }

  function threeDigits(n){
    return String(100 + (Math.abs(n) % 900));
  }

  function evidenceText(ev){
    return [ev && ev.tag, ev && ev.title, ev && ev.short, ev && ev.full].filter(Boolean).join(' ');
  }

  function evidenceMeta(ev){
    const text = evidenceText(ev);
    if(/هاتف|موبايل|مكالمة|رسائل|واتساب|رقم|شريحة|اتصال/.test(text)){
      return { kind:'فحص رقمي', label:'سجل الاتصالات', noun:'سجل الاتصال', clue:'رقم التحقق' };
    }
    if(/كاميرا|فيديو|لقطة|تسجيل|CCTV/.test(text)){
      return { kind:'تحليل كاميرات', label:'فهرس التسجيلات', noun:'لقطة التسجيل', clue:'مرجع الفريم' };
    }
    if(/تحويل|حساب|فاتورة|إيصال|سحب|فلوس|مبلغ|مالي|بنك|محفظة|دفع/.test(text)){
      return { kind:'مراجعة مالية', label:'بوابة المراجعة المالية', noun:'السجل المالي', clue:'مرجع المراجعة' };
    }
    if(/عينة|دم|بصم|سم|مادة|معمل|طب شرعي|DNA|حمض نووي|تحليل/.test(text)){
      return { kind:'فحص معملي', label:'بوابة المعمل', noun:'العينة', clue:'كود العينة' };
    }
    if(/عربية|سيارة|لوحة|مركبة/.test(text)){
      return { kind:'سجل مركبات', label:'سجل المركبات', noun:'بيانات المركبة', clue:'مرجع المركبة' };
    }
    if(/ورقة|وثيقة|سجل|عقد|ملف|رسالة|مذكرة|خطاب|تقرير|كشف/.test(text)){
      return { kind:'بحث أرشيفي', label:'أرشيف المستندات', noun:'المستند', clue:'مرجع الأرشيف' };
    }
    return { kind:'فحص أدلة', label:'سجل فحص الأدلة', noun:'الدليل', clue:'ختم الفحص' };
  }

  function resultPrefixForCase(caseData){
    const prefixes = ['AR','DX','MX','RF','TR','NX','SV','KT','PX','VL'];
    const h = hashString(caseData.id + ':prefix');
    return prefixes[h % prefixes.length];
  }

  function reachableEvidenceIds(caseData){
    const ids = new Set();
    (caseData.evidence || []).forEach(e=>{ if(e && e.unlocked && e.id) ids.add(e.id); });
    (caseData.suspects || []).forEach(s=>{
      (s.questions || []).forEach(q=>{ if(q && q.unlockId) ids.add(q.unlockId); });
      Object.values(s.confrontations || {}).forEach(v=>{
        if(v && typeof v === 'object' && v.unlockId) ids.add(v.unlockId);
      });
    });
    (caseData.investigationActions || []).forEach(a=>(a.resultEvidenceIds || []).forEach(id=>ids.add(id)));
    const puzzleKeys = [
      'audioPuzzle','cameraPuzzle','contradictionPuzzle','timelinePuzzle','dnaLabPuzzle',
      'alibiGridPuzzle','ledgerAuditPuzzle','polygraphPuzzle','floorPlanPuzzle',
      'witnessReliabilityPuzzle','handwritingPuzzle','codeLockPuzzle','cipherPuzzle','matchPuzzle'
    ];
    puzzleKeys.forEach(key=>{
      const p = caseData[key];
      if(p && p.enabled) (p.resultEvidenceIds || []).forEach(id=>ids.add(id));
    });
    (caseData.evidenceCombinations || []).forEach(c=>{ if(c && c.resultId) ids.add(c.resultId); });
    return ids;
  }

  function chooseSources(caseData){
    const all = [...(caseData.evidence || [])].filter(e=>e && e.id);
    const reachable = reachableEvidenceIds(caseData);
    const sorted = all.sort((a,b)=>{
      const au = a.unlocked ? 0 : 1;
      const bu = b.unlocked ? 0 : 1;
      if(au !== bu) return au - bu;
      const ar = reachable.has(a.id) ? 0 : 1;
      const br = reachable.has(b.id) ? 0 : 1;
      if(ar !== br) return ar - br;
      return (Number(a.order)||999) - (Number(b.order)||999);
    });
    const picked = [];
    for(const ev of sorted){
      if(!picked.some(x=>x.id===ev.id)) picked.push(ev);
      if(picked.length===3) break;
    }
    while(picked.length < 3 && all.length){
      const ev = all[picked.length % all.length];
      if(!picked.some(x=>x.id===ev.id)) picked.push(ev);
      else break;
    }
    return picked;
  }

  function makeGeneratedLocks(caseData){
    if(!caseData || !Array.isArray(caseData.evidence) || caseData.evidence.length < 2) return [];
    const sources = chooseSources(caseData);
    if(sources.length < 2) return [];
    const a = sources[0], b = sources[1], c = sources[2] || sources[1];
    const h = hashString(caseData.id);
    const part1 = twoDigits(h);
    const part2 = twoDigits(h >>> 7);
    const suffix = threeDigits(h >>> 13);
    const prefix = resultPrefixForCase(caseData);
    const metaA = evidenceMeta(a);
    const metaB = evidenceMeta(b);
    const metaC = evidenceMeta(c);
    const firstId = `real_${caseData.id}_crossref`;
    const secondId = `real_${caseData.id}_archive`;

    caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
    caseData.realisticDiscoveryClues[a.id] = [
      ...(caseData.realisticDiscoveryClues[a.id] || []),
      `ملاحظة الفحص الواقعي: ${metaA.clue} في «${a.title}» بيبدأ بالجزء «${part1}».`
    ];
    caseData.realisticDiscoveryClues[b.id] = [
      ...(caseData.realisticDiscoveryClues[b.id] || []),
      `ملاحظة الفحص الواقعي: الجزء المكمل لنفس المرجع في «${b.title}» هو «${part2}».`
    ];
    caseData.realisticDiscoveryClues[c.id] = [
      ...(caseData.realisticDiscoveryClues[c.id] || []),
      `ملاحظة الفحص الواقعي: الجزء الرقمي من مرجع المتابعة في «${c.title}» هو «${suffix}».`
    ];

    return [
      {
        id:firstId,
        kind:'مطابقة خيوط',
        label:`مطابقة ${metaA.noun} مع ${metaB.noun}`,
        introText:`عندك جزئين لمرجع واحد؛ الأول موجود في «${a.title}» والتاني في «${b.title}». اكتب الجزئين متصلين بالترتيب عشان تعمل المطابقة اليدوية.`,
        lockedText:`لسه محتاج تجمع «${a.title}» و«${b.title}» قبل ما تعمل المطابقة.`,
        requires:[a.id,b.id],
        inputMode:'numeric',
        maxLength:4,
        placeholder:'المرجع المركب...',
        acceptedAnswers:[`${part1}${part2}`],
        wrongMsg:'✗ المرجع مش مطابق. افتح الدليلين وراجع ملاحظات الفحص الواقعي.',
        successText:`المطابقة نجحت. النظام رجّع بادئة مرجع متابعة: ${prefix}.`,
        resultText:`اتأكد إن الخيطين بيرجعوا لنفس مسار الفحص. بادئة المتابعة اللي خرجت من المطابقة: ${prefix}.`,
        resultPrefix:prefix,
        sourceIds:[a.id,b.id],
        image:(a.img || b.img || null)
      },
      {
        id:secondId,
        kind:metaC.kind,
        label:metaC.label,
        introText:`المطابقة الأولى طلعت البادئة «${prefix}». في «${c.title}» موجود الجزء الرقمي من مرجع المتابعة. اكتب المرجع كاملًا عشان تفتح نتيجة التحقق النهائية.`,
        lockedText:`لسه محتاج تخلص المطابقة الأولى وتجمع «${c.title}».`,
        requires:[c.id],
        requiresDiscoveries:[firstId],
        inputMode:'text',
        maxLength:12,
        placeholder:'مرجع المتابعة...',
        acceptedAnswers:[`${prefix}${suffix}`,`${prefix}-${suffix}`,`${prefix} ${suffix}`],
        wrongMsg:'✗ المرجع مش موجود. راجع نتيجة المطابقة الأولى وملاحظة الفحص في الدليل المطلوب.',
        successText:'تم فتح سجل التحقق واتأكد الخيط كمعلومة مستقلة في ملف التحقيق.',
        resultText:`سجل المتابعة «${prefix}-${suffix}» اتفتح بنجاح. النتيجة بتأكد صلاحية الخيط للاعتماد عليه مع باقي الأدلة، من غير ما تحدد الجاني لوحدها.`,
        sourceIds:[c.id],
        image:(c.img || null)
      }
    ];
  }

  function specialLocks(caseData){
    if(!caseData) return null;

    if(caseData.id === 'room-307'){
      const clue = (caseData.evidence || []).find(e=>e.id==='blackmail_file_hint');
      if(clue){
        caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
        caseData.realisticDiscoveryClues[clue.id] = [
          'ملاحظة من كلام دينا: 18 أبريل كان تاريخًا مهمًا جدًا لهالة، وكانت بتستخدم التواريخ المهمة كرموز سهلة تفتكرها.'
        ];
      }
      return [
        {
          id:'real_room307_phone', kind:'هاتف مقفول', label:'هاتف هالة',
          introText:'الهاتف عليه قفل من 4 أرقام. استخدم التاريخ الشخصي اللي ظهر في التحقيق واكتبه بصيغة يوم ثم شهر.',
          lockedText:'لسه ماوصلتش للتفصيلة الشخصية اللي ممكن تساعدك في رمز الهاتف.',
          requires:['blackmail_file_hint'], inputMode:'numeric', maxLength:4, placeholder:'••••',
          acceptedAnswers:['1804'], wrongMsg:'✗ الهاتف ما فتحش. راجع التاريخ المهم اللي اتقال عن هالة.',
          successText:'الهاتف اتفتح وظهر في المسودات مرجع ملف داخلي: 4B.',
          resultText:'الهاتف مفتوح، وفي مسودة غير مرسلة مكتوب: «لو حصل حاجة، راجعوا ملف 4B».',
          resultPrefix:'4B', sourceIds:['blackmail_file_hint']
        },
        {
          id:'real_room307_archive', kind:'بحث أرشيفي', label:'أرشيف شركة هالة',
          introText:'المسودة اللي ظهرت بعد فتح الهاتف فيها مرجع ملف داخلي. اكتبه في شاشة الأرشيف.',
          lockedText:'لسه ما فتحتش هاتف هالة.', requires:[], requiresDiscoveries:['real_room307_phone'],
          inputMode:'text', maxLength:8, placeholder:'مرجع الملف...', acceptedAnswers:['4B','4 ب','4ب'],
          wrongMsg:'✗ مفيش ملف بالمرجع ده. راجع المسودة اللي ظهرت بعد فتح الهاتف.',
          successText:'تم فتح ملف 4B: مراجعة مالية كانت هالة بتجمعها قبل الواقعة.',
          resultText:'ملف 4B يثبت إن هالة كانت بتراجع مخالفات مالية داخل الشركة؛ الخيط يضيف دافعًا محتملًا لكنه ما يحددش الفاعل وحده.'
        }
      ];
    }

    if(caseData.id === 'postponed-engagement'){
      const call = (caseData.evidence || []).find(e=>e.id==='hassan_p_pressure_call');
      const cam = (caseData.evidence || []).find(e=>e.id==='hassan_p_vehicle_camera');
      caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
      if(call) caseData.realisticDiscoveryClues[call.id] = ['تكبير سجل المكالمة بيظهر آخر أربعة أرقام من الرقم غير المحفوظ: 7316.'];
      if(cam) caseData.realisticDiscoveryClues[cam.id] = ['تكبير لوحة العربية في الكاميرا بيظهر الرقم: س م د 4821.'];
      return [
        {
          id:'real_engagement_caller', kind:'استعلام اتصالات', label:'بوابة بيانات المشتركين',
          introText:'اسم المتصل مش ظاهر في السجل. اكتب آخر 4 أرقام الظاهرة عشان تعمل استعلام عن الخط.',
          lockedText:'لسه ما استخرجتش سجل المكالمات قبل اختفاء معتز.', requires:['hassan_p_pressure_call'],
          inputMode:'numeric', maxLength:4, placeholder:'آخر 4 أرقام...', acceptedAnswers:['7316'],
          wrongMsg:'✗ الرقم مش مطابق للسجل.', successText:'الاستعلام رجّع خطًا مرتبطًا بحسن.',
          resultText:'بيانات المشترك ربطت الرقم اللي ضغط على معتز بخط مرتبط بحسن. ده رابط مستقل، مش اعتراف.'
        },
        {
          id:'real_engagement_vehicle', kind:'سجل مركبات', label:'البحث برقم اللوحة',
          introText:'الكاميرا التقطت لوحة العربية. اكتب الرقم كاملًا في سجل المركبات عشان تثبت المركبة قبل تتبعها.',
          lockedText:'لسه ما عندكش لقطة واضحة للعربية.', requires:['hassan_p_vehicle_camera'], requiresDiscoveries:['real_engagement_caller'],
          inputMode:'text', maxLength:16, placeholder:'رقم اللوحة...', acceptedAnswers:['س م د 4821','سمد4821'],
          wrongMsg:'✗ مفيش مطابقة للوحة دي.', successText:'تمت مطابقة العربية وتقدر تعتمد عليها في التتبع.',
          resultText:'سجل المركبات أكد مطابقة العربية الظاهرة في الكاميرا. المعلومة تقوي مسار التتبع من غير ما تحسم المسؤولية وحدها.'
        }
      ];
    }

    if(caseData.id === 'coded-message'){
      const soad = (caseData.evidence || []).find(e=>e.id==='soad_c_tenure');
      caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
      if(soad) caseData.realisticDiscoveryClues[soad.id] = ['من تفاصيل سعاد: العيلة كانت بتسمي العقار القديم «فيلا النخيل»، ومخزنه منفصل عن البيت.'];
      return [
        {
          id:'real_coded_property', kind:'بحث عقاري', label:'أرشيف العقارات القديمة',
          introText:'بعد ما تعرف إن الرسالة بتشير لمخزن فيلا، اكتب اسم الفيلا القديمة اللي ظهر في شهادة سعاد.',
          lockedText:'لسه محتاج خيط عن تاريخ العيلة والعقار القديم.', requires:['soad_c_tenure'],
          inputMode:'text', maxLength:32, placeholder:'اسم العقار...', acceptedAnswers:['فيلا النخيل','النخيل'],
          wrongMsg:'✗ الاسم مش موجود في الأرشيف.', successText:'ظهر مخطط فيلا النخيل، ومخزن الخدمة عليه الكود B-12.',
          resultText:'الأرشيف رجّع مخطط العقار وكود المخزن B-12؛ الموقع لسه محتاج ربط بباقي الشهادات.'
        },
        {
          id:'real_coded_storage', kind:'مخطط موقع', label:'فتح تفاصيل المخزن',
          introText:'المخطط اللي ظهر من الأرشيف فيه كود المخزن المنفصل. اكتبه عشان تحدد المدخل الصحيح.',
          lockedText:'لسه ما استخرجتش مخطط الفيلا.', requires:[], requiresDiscoveries:['real_coded_property'],
          inputMode:'text', maxLength:8, placeholder:'كود المخزن...', acceptedAnswers:['B12','B-12'],
          wrongMsg:'✗ الكود مش مطابق للمخطط.', successText:'تم تحديد مخزن B-12 ومدخله الجانبي.',
          resultText:'المخطط حدد مخزن B-12 بدقة. تقدر تستخدم الموقع مع الأدلة الأخرى قبل أي مداهمة.'
        }
      ];
    }

    if(caseData.id === 'false-rumor'){
      const trace = (caseData.evidence || []).find(e=>e.id==='source_trace');
      const sender = (caseData.evidence || []).find(e=>e.id==='sender_line_record');
      caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
      if(trace) caseData.realisticDiscoveryClues[trace.id] = ['أول نسخة من الصورة اتبعتت من رقم جديد؛ آخر أربعة أرقام الظاهرة في المصدر: 6241.'];
      if(sender) caseData.realisticDiscoveryClues[sender.id] = ['سجل تفعيل الخط بيحمل مرجع بصمة جهاز قصير: D14.'];
      return [
        {
          id:'real_rumor_sender', kind:'تحريات رقمية', label:'تحديد رقم الإرسال الأول',
          introText:'اكتب آخر أربعة أرقام الظاهرة في مصدر النسخة الأولى عشان تفتح طلب بيانات الخط.',
          lockedText:'لسه ما تتبعتش مصدر أول نسخة.', requires:['source_trace'], inputMode:'numeric', maxLength:4,
          placeholder:'آخر 4 أرقام...', acceptedAnswers:['6241'], wrongMsg:'✗ الرقم مش مطابق للمصدر.',
          successText:'تم فتح طلب بيانات الرقم الأول.', resultText:'الرقم اتثبت كأول مصدر إرسال، ولسه محتاج تقارن بصمة الجهاز قبل ما تربطه بشخص.'
        },
        {
          id:'real_rumor_device', kind:'بصمة جهاز', label:'سجل الأجهزة المرتبطة',
          introText:'سجل تفعيل الرقم فيه مرجع بصمة جهاز. اكتبه عشان تعمل المطابقة الفنية.',
          lockedText:'لسه ما وصلتش لسجل تفعيل الخط.', requires:['sender_line_record'], requiresDiscoveries:['real_rumor_sender'],
          inputMode:'text', maxLength:8, placeholder:'مرجع الجهاز...', acceptedAnswers:['D14','D-14'],
          wrongMsg:'✗ المرجع مش مطابق للسجل.', successText:'بصمة الجهاز اتطابقت مع جهاز مستخدم قبل كده على خط معروف في القضية.',
          resultText:'المطابقة الفنية أكدت ارتباط الجهاز بمسار الإرسال؛ لسه لازم تربطها بباقي الأدلة قبل الاتهام.'
        }
      ];
    }

    if(caseData.id === 'lost-wallet'){
      const key = (caseData.evidence || []).find(e=>e.id==='private_key_log');
      caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
      if(key) caseData.realisticDiscoveryClues[key.id] = ['في ملف الموارد البشرية: سنة التخرج 2017. وعلى بطاقة جهاز الأمان: آخر رقمين 08. ورقة صغيرة بتقول: «آخر رقمين من سنة التخرج، وبعدهم آخر رقمين من البادج».'];
      return [
        {
          id:'real_wallet_laptop', kind:'جهاز مقفول', label:'لابتوب مالك',
          introText:'ركب كود الأربع أرقام من سنة التخرج ورقم البادج زي ما التلميح المكتوب بيقول.',
          lockedText:'لسه ما جمعتش سجل جهاز التوقيع والبيانات المرتبطة بيه.', requires:['private_key_log'],
          inputMode:'numeric', maxLength:4, placeholder:'••••', acceptedAnswers:['1708'],
          wrongMsg:'✗ الكود غلط. راجع ترتيب الجزأين في التلميح.', successText:'اللابتوب اتفتح وظهر مرجع متابعة على منصة تداول: NX-204.',
          resultText:'محتوى اللابتوب فيه مرجع NX-204 مرتبط بحركة تحويل كبيرة؛ المرجع وحده ما يثبتش صاحب الحساب.'
        },
        {
          id:'real_wallet_exchange', kind:'تحليل مالي', label:'طلب بيانات منصة التداول',
          introText:'اكتب مرجع المتابعة اللي ظهر بعد فتح اللابتوب عشان تطلب بيانات الحساب المرتبط بالحركة.',
          lockedText:'لسه ما فتحتش اللابتوب.', requires:[], requiresDiscoveries:['real_wallet_laptop'],
          inputMode:'text', maxLength:12, placeholder:'مرجع المتابعة...', acceptedAnswers:['NX204','NX-204'],
          wrongMsg:'✗ المرجع مش موجود.', successText:'تمت مطابقة المرجع مع حساب موثق في منصة التداول.',
          resultText:'بيانات المنصة أكدت مسار جزء من الأموال لحساب موثق؛ استخدم النتيجة مع باقي السجلات قبل الاتهام.'
        }
      ];
    }

    if(caseData.id === 'wedding-gold'){
      const video = (caseData.evidence || []).find(e=>e.id==='video_clip');
      const route = (caseData.evidence || []).find(e=>e.id==='route_reconstruction');
      caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
      if(video) caseData.realisticDiscoveryClues[video.id] = ['تكبير أول لقطة لمسار الظل بيظهر كارت ترابيزة عليه الرقم 14.'];
      if(route) caseData.realisticDiscoveryClues[route.id] = ['على صندوق خدمة في الممر الجانبي ظاهر الكود «خ-12».'];
      return [
        {
          id:'real_gold_table', kind:'خريطة جلوس', label:'مطابقة رقم الترابيزة',
          introText:'الفيديو فيه رقم ترابيزة ظاهر لحظة بداية مسار الظل. اكتبه في خريطة الجلوس.',
          lockedText:'لسه ما جمعتش فيديو منّة.', requires:['video_clip'], inputMode:'numeric', maxLength:2,
          placeholder:'رقم الترابيزة...', acceptedAnswers:['14'], wrongMsg:'✗ الرقم مش مطابق للكارت في الفيديو.',
          successText:'خريطة الجلوس حددت نقطة بداية المسار عند ترابيزة 14.',
          resultText:'تم تثبيت نقطة بداية الحركة عند ترابيزة 14؛ المعلومة لا تثبت هوية السارق وحدها.'
        },
        {
          id:'real_gold_box', kind:'سجل تجهيزات', label:'تتبّع صندوق الخدمة',
          introText:'بعد إعادة بناء المسار ظهر كود على صندوق خدمة. اكتبه في سجل تجهيزات القاعة.',
          lockedText:'لسه محتاج تعيد بناء مسار الحركة.', requires:['route_reconstruction'], requiresDiscoveries:['real_gold_table'],
          inputMode:'text', maxLength:8, placeholder:'كود الصندوق...', acceptedAnswers:['خ12','خ-12','خ 12'],
          wrongMsg:'✗ الكود مش مطابق للصندوق على المسار.', successText:'السجل أكد حركة صندوق خ-12 وقت انقطاع الكهرباء.',
          resultText:'صندوق خ-12 ثبت كنقطة مهمة على مسار الإخفاء، لكن مكانه وحده ما يحددش مين استخدمه.'
        }
      ];
    }

    return null;
  }

  function installCaseDiscoveries(caseData){
    if(!caseData || caseData.__realisticDiscoveryVersion === VERSION) return;
    caseData.realisticDiscoveryClues = {};
    const special = specialLocks(caseData);
    caseData.discoveryLocks = special || makeGeneratedLocks(caseData);
    caseData.discoveryTabLabel = 'اكتشافات واقعية';
    caseData.discoveryMode = 'realistic';
    caseData.__realisticDiscoveryVersion = VERSION;
  }

  CASES_REGISTRY.forEach(installCaseDiscoveries);

  function isRealistic(){
    try{ return typeof currentPlayMode === 'function' && currentPlayMode() === 'realistic'; }
    catch(_){ return !!(game && game.playMode === 'realistic'); }
  }

  function locks(){
    if(!isRealistic()) return [];
    return CASE && Array.isArray(CASE.discoveryLocks) ? CASE.discoveryLocks : [];
  }

  function ensureSolvedSet(){
    if(!game) return new Set();
    if(!(game.solvedDiscoveries instanceof Set)){
      const raw = Array.isArray(game.solvedDiscoveries) ? game.solvedDiscoveries : [];
      game.solvedDiscoveries = new Set(raw);
    }
    return game.solvedDiscoveries;
  }

  function discoverySolved(lock){
    return !!(lock && ensureSolvedSet().has(lock.id));
  }

  function discoveryUnlocked(lock){
    if(!lock) return false;
    const evidenceOk = (lock.requires || []).every(id => game.collected && game.collected.has(id));
    const discoveryOk = (lock.requiresDiscoveries || []).every(id => ensureSolvedSet().has(id));
    return evidenceOk && discoveryOk;
  }

  function allDiscoveriesSolved(){
    const active = locks();
    return active.length === 0 || active.every(discoverySolved);
  }

  function normalize(value){
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return String(value == null ? '' : value)
      .trim().toLowerCase()
      .replace(/[٠-٩]/g, d=>String(arabicDigits.indexOf(d)))
      .replace(/[۰-۹]/g, d=>String(persianDigits.indexOf(d)))
      .replace(/[ًٌٍَُِّْـ]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/[^a-z0-9\u0621-\u064a]/g,'');
  }

  function safeCssEscape(value){
    if(window.CSS && typeof CSS.escape === 'function') return CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }

  function clueNotesForEvidence(evidenceId){
    if(!isRealistic() || !CASE || !CASE.realisticDiscoveryClues) return [];
    return CASE.realisticDiscoveryClues[evidenceId] || [];
  }

  function sourceSummary(lock){
    const ids = lock.sourceIds || lock.requires || [];
    const titles = ids.map(id=>{
      const ev = CASE && CASE.evidence ? CASE.evidence.find(e=>e.id===id) : null;
      return ev ? ev.title : null;
    }).filter(Boolean);
    if(!titles.length) return '';
    return `<p class="mono dim" style="font-size:11px;margin:8px 0 0;">راجع: ${titles.map(escapeHTML).join(' + ')}</p>`;
  }

  function cardHTML(lock){
    const solved = discoverySolved(lock);
    const unlocked = discoveryUnlocked(lock);
    const state = solved ? 'مكتمل ✓' : unlocked ? 'جاهز' : 'الخيط ناقص';
    const image = lock.image ? `<div style="margin:12px 0;overflow:hidden;border:1px solid var(--line);border-radius:10px;"><img src="${escapeHTML(lock.image)}" alt="${escapeHTML(lock.label || 'دليل')}" style="display:block;width:100%;max-height:340px;object-fit:cover;"></div>` : '';

    if(solved){
      return `<div class="evidence-card found" style="cursor:default;">
        <div class="ev-top"><span class="tag mono">${escapeHTML(lock.kind || 'اكتشاف')}</span><span class="mono dim">${state}</span></div>
        <h3 style="margin:8px 0 6px;">${escapeHTML(lock.label || 'اكتشاف')}</h3>
        ${image}
        <p>${escapeHTML(lock.resultText || lock.successText || 'تم التحقق من الخيط.')}</p>
      </div>`;
    }

    if(!unlocked){
      return `<div class="evidence-card" style="cursor:default;opacity:.72;">
        <div class="ev-top"><span class="tag mono">${escapeHTML(lock.kind || 'اكتشاف')}</span><span class="mono dim">${state}</span></div>
        <h3 style="margin:8px 0 6px;">${escapeHTML(lock.label || 'اكتشاف')}</h3>
        <p class="dim">${escapeHTML(lock.lockedText || 'لسه محتاج خيوط سابقة.')}</p>
        ${sourceSummary(lock)}
      </div>`;
    }

    const numeric = lock.inputMode === 'numeric';
    return `<div class="evidence-card" style="cursor:default;">
      <div class="ev-top"><span class="tag mono">${escapeHTML(lock.kind || 'اكتشاف')}</span><span class="mono dim">${state}</span></div>
      <h3 style="margin:8px 0 6px;">${escapeHTML(lock.label || 'اكتشاف')}</h3>
      ${image}
      <p class="dim" style="margin-bottom:12px;">${escapeHTML(lock.introText || '')}</p>
      ${sourceSummary(lock)}
      <input data-real-discovery-input="${escapeHTML(lock.id)}" inputmode="${numeric ? 'numeric' : 'text'}" autocomplete="off" maxlength="${Number(lock.maxLength || 40)}" placeholder="${escapeHTML(lock.placeholder || 'اكتب اللي استنتجته...')}" style="width:100%;max-width:430px;padding:12px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);border-radius:8px;margin-top:12px;">
      <div><button class="btn" data-real-discovery-submit="${escapeHTML(lock.id)}" style="margin-top:12px;">نفّذ التحقق</button></div>
      <div class="wave-feedback" data-real-discovery-feedback="${escapeHTML(lock.id)}"></div>
    </div>`;
  }

  function discoveriesHTML(){
    const active = locks();
    const done = active.filter(discoverySolved).length;
    return `<h2>اكتشافات التحقيق الواقعي</h2>
      <p class="dim">دي مش أسئلة ولا اختيارات. افتح الأدلة اللي جمعتها، استخرج الأرقام أو المراجع منها، واكتبها بنفسك عشان تكمل التحقق. لازم تخلص الاكتشافات قبل الاتهام النهائي في الوضع الواقعي.</p>
      <div class="mono dim" style="font-size:11px;margin:10px 0 14px;">${done} / ${active.length} مكتمل</div>
      <div class="divider"></div>
      <div style="display:grid;gap:12px;">${active.map(cardHTML).join('')}</div>`;
  }

  function submitDiscovery(id){
    const lock = locks().find(x=>x && x.id===id);
    if(!lock || discoverySolved(lock) || !discoveryUnlocked(lock)) return;
    const esc = safeCssEscape(id);
    const input = document.querySelector(`[data-real-discovery-input="${esc}"]`);
    const fb = document.querySelector(`[data-real-discovery-feedback="${esc}"]`);
    const value = normalize(input ? input.value : '');
    const accepted = (lock.acceptedAnswers || []).map(normalize).filter(Boolean);
    if(value && accepted.includes(value)){
      ensureSolvedSet().add(lock.id);
      (lock.resultEvidenceIds || []).forEach(id=>{
        try{ if(typeof collect === 'function') collect(id); }catch(_){}
      });
      try{ if(typeof addScore === 'function') addScore(4, 'اكتشاف واقعي صحيح', {silent:true}); }catch(_){}
      try{ gaTrack('realistic_discovery_solved',{discovery_id:lock.id}); }catch(_){}
      try{ persistProgress(); }catch(_){}
      if(fb){ fb.textContent='✓ '+(lock.successText || 'تم التحقق.'); fb.className='wave-feedback ok'; }
      setTimeout(()=>{ try{ render(); }catch(_){} },650);
    }else{
      if(fb){ fb.textContent=lock.wrongMsg || '✗ مش مطابق. راجع الخيوط اللي جمعتها.'; fb.className='wave-feedback bad'; }
      try{ gaTrack('realistic_discovery_attempt',{discovery_id:lock.id}); }catch(_){}
    }
  }

  function bindDiscoveryEvents(){
    document.querySelectorAll('[data-real-discovery-submit]').forEach(btn=>{
      btn.addEventListener('click',()=>submitDiscovery(btn.dataset.realDiscoverySubmit));
    });
    document.querySelectorAll('[data-real-discovery-input]').forEach(input=>{
      input.addEventListener('keydown',e=>{ if(e.key==='Enter') submitDiscovery(input.dataset.realDiscoveryInput); });
    });
  }

  function injectEvidenceClue(evidenceId){
    const notes = clueNotesForEvidence(evidenceId);
    if(!notes.length) return;
    const overlays = [...document.querySelectorAll('.overlay .modal')];
    const modal = overlays[overlays.length-1];
    if(!modal || modal.querySelector('[data-realistic-clue-box]')) return;
    const box = document.createElement('div');
    box.setAttribute('data-realistic-clue-box','1');
    box.style.cssText='margin-top:14px;padding:12px;border:1px dashed var(--amber);background:rgba(224,164,88,.08);border-radius:8px;';
    box.innerHTML = `<div class="tag mono" style="margin-bottom:7px;">🧪 فحص واقعي</div>${notes.map(n=>`<p style="margin:5px 0;line-height:1.8;">${escapeHTML(n)}</p>`).join('')}`;
    const close = modal.querySelector('.close-btn');
    if(close) modal.insertBefore(box, close);
    else modal.appendChild(box);
  }

  function saveDiscoveryProgress(){
    if(!CASE || !game) return;
    try{
      const saved = loadLocalProgress(CASE.id) || {};
      saved[STORAGE_FIELD] = [...ensureSolvedSet()];
      saveLocalProgress(CASE.id, saved);
    }catch(_){}
  }

  function loadDiscoveryProgress(){
    if(!CASE || !game) return;
    try{
      const saved = loadLocalProgress(CASE.id) || {};
      game.solvedDiscoveries = new Set(Array.isArray(saved[STORAGE_FIELD]) ? saved[STORAGE_FIELD] : []);
    }catch(_){ game.solvedDiscoveries = new Set(); }
  }

  const basePersistProgress = persistProgress;
  persistProgress = function(){
    const out = basePersistProgress.apply(this, arguments);
    saveDiscoveryProgress();
    return out;
  };

  const baseEnterCase = enterCase;
  enterCase = function(){
    const out = baseEnterCase.apply(this, arguments);
    if(CASE && game){
      loadDiscoveryProgress();
      if(app && app.view === 'case'){
        try{ render(); }catch(_){}
      }
    }
    return out;
  };

  const baseRenderTabs = renderTabs;
  renderTabs = function(){
    baseRenderTabs();
    const active = locks();
    if(!active.length) return;
    ensureSolvedSet();
    const tabsEl = document.getElementById('tabs');
    if(!tabsEl) return;

    let btn = tabsEl.querySelector('[data-tab="discoveries"]');
    if(!btn){
      btn = document.createElement('button');
      btn.className='tab';
      btn.dataset.tab='discoveries';
      btn.textContent='اكتشافات واقعية';
      btn.addEventListener('click',()=>{ game.screen='discoveries'; render(); });
      const accusation = tabsEl.querySelector('[data-tab="accusation"]');
      if(accusation) tabsEl.insertBefore(btn,accusation); else tabsEl.appendChild(btn);
    }
    btn.classList.toggle('active', game.screen==='discoveries');

    const accusation = tabsEl.querySelector('[data-tab="accusation"]');
    if(accusation && !allDiscoveriesSolved()){
      accusation.disabled = true;
      accusation.title = 'كمّل الاكتشافات الواقعية الأول';
    }
  };

  const baseRenderPanel = renderPanel;
  renderPanel = function(){
    if(game && game.screen==='discoveries' && locks().length){
      const el=document.getElementById('panelBody');
      if(!el) return;
      el.innerHTML=discoveriesHTML();
      bindDiscoveryEvents();
      return;
    }
    return baseRenderPanel.apply(this,arguments);
  };

  if(typeof openEvidenceModal === 'function'){
    const baseOpenEvidenceModal = openEvidenceModal;
    openEvidenceModal = function(id){
      const out = baseOpenEvidenceModal.apply(this,arguments);
      if(isRealistic()) setTimeout(()=>injectEvidenceClue(id),0);
      return out;
    };
  }

  const baseComputeEnding = computeEnding;
  computeEnding = function(){
    if(isRealistic() && !allDiscoveriesSolved()){
      try{ showToast('كمّل الاكتشافات الواقعية الأول قبل ما تقفل القضية.', 'danger'); }catch(_){}
      game.screen='discoveries';
      try{ render(); }catch(_){}
      return;
    }
    return baseComputeEnding.apply(this,arguments);
  };

  if(typeof CASE !== 'undefined' && CASE && typeof game !== 'undefined' && game){
    loadDiscoveryProgress();
    try{ if(app && app.view==='case') render(); }catch(_){}
  }

  try{
    window.__TARAF_REALISTIC_DISCOVERY_AUDIT__ = {
      version:VERSION,
      registryCount:CASES_REGISTRY.length,
      casesWithDiscoveries:CASES_REGISTRY.filter(c=>Array.isArray(c.discoveryLocks)&&c.discoveryLocks.length>=2).length,
      totalLocks:CASES_REGISTRY.reduce((n,c)=>n+((c.discoveryLocks||[]).length),0),
      normalModeEnabled:false
    };
  }catch(_){}
})();
