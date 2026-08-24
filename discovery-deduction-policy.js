/* ============================================================
   طرف الخيط — سياسة الاستنتاج للألغاز الواقعية المولّدة
   تمنع النظام من إعطاء الرقم/الكود الجاهز ثم طلب كتابته.
   بدل ذلك، اللاعب يستخرج الإجابة من قاعدة واضحة مرتبطة بالأدلة.
   القضايا ذات الألغاز الخاصة المكتوبة يدويًا لا تتأثر.
   ============================================================ */
(function(){
  'use strict';

  if(typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return;

  function wordCount(text){
    return String(text || '').trim().split(/\s+/).filter(Boolean).length;
  }

  function twoDigits(n){
    return String(Math.max(0, Math.min(99, Number(n) || 0))).padStart(2, '0');
  }

  function evidenceById(caseData, id){
    return (caseData.evidence || []).find(e=>e && e.id === id) || null;
  }

  function patchGeneratedCase(caseData){
    if(!caseData || !Array.isArray(caseData.discoveryLocks)) return false;
    if(caseData.__deductionPolicyVersion === '2026-08-24-v2') return true;

    const firstId = `real_${caseData.id}_crossref`;
    const secondId = `real_${caseData.id}_archive`;
    const first = caseData.discoveryLocks.find(x=>x && x.id === firstId);
    const second = caseData.discoveryLocks.find(x=>x && x.id === secondId);

    // الاسمين دول خاصين بالنسخة المولّدة تلقائيًا فقط؛
    // الألغاز الخاصة المكتوبة يدويًا لا تتغير.
    if(!first || !second) return false;

    const firstSources = first.sourceIds || first.requires || [];
    const a = evidenceById(caseData, firstSources[0]);
    const b = evidenceById(caseData, firstSources[1]);
    const secondSources = second.sourceIds || second.requires || [];
    const c = evidenceById(caseData, secondSources[0]);
    if(!a || !b || !c) return false;

    const aCount = wordCount(a.title);
    const bCount = wordCount(b.title);
    const cCount = wordCount(c.title);
    const firstAnswer = `${twoDigits(aCount)}${twoDigits(bCount)}`;
    const prefix = String(first.resultPrefix || '').trim();
    const secondSuffix = twoDigits(cCount);

    caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};

    caseData.realisticDiscoveryClues[a.id] = [
      'قاعدة المطابقة: احسب عدد كلمات عنوان الدليل، واكتب العدد في خانتين. مثال: عنوان من 3 كلمات = 03.'
    ];
    caseData.realisticDiscoveryClues[b.id] = [
      'ده الجزء الثاني من رمز المطابقة: احسب عدد كلمات عنوان الدليل بنفسك واكتبه في خانتين.'
    ];
    caseData.realisticDiscoveryClues[c.id] = [
      'في التحقق النهائي: الجزء الرقمي من المرجع هو عدد كلمات عنوان الدليل في خانتين. اربطه بمفتاح المتابعة اللي استنتجته من الخطوة الأولى.'
    ];

    first.inputMode = 'numeric';
    first.maxLength = 4;
    first.placeholder = 'رمز الاستنتاج...';
    first.acceptedAnswers = [firstAnswer];
    first.introText = `راجع «${a.title}» و«${b.title}». احسب عدد كلمات عنوان كل دليل بالترتيب، واكتب كل عدد في خانتين لتكوين رمز المطابقة. النظام مش هيعرض لك الرمز الجاهز.`;
    first.wrongMsg = '✗ الرمز مش صحيح. عدّ كلمات عنوان كل دليل بالترتيب، واكتب كل عدد في خانتين.';
    first.successText = prefix
      ? `المطابقة نجحت. ظهر مفتاح متابعة «${prefix}». استخدمه في الخطوة التالية.`
      : 'المطابقة نجحت. ظهر مفتاح متابعة للخطوة التالية.';
    first.resultText = prefix
      ? `تم ربط الدليلين بنجاح، وخرج مفتاح متابعة «${prefix}». المفتاح وحده مش نتيجة نهائية.`
      : 'تم ربط الدليلين بنجاح وخرج مفتاح متابعة للخطوة التالية.';

    if(prefix){
      second.acceptedAnswers = [
        `${prefix}${secondSuffix}`,
        `${prefix}-${secondSuffix}`,
        `${prefix} ${secondSuffix}`
      ];
    }
    second.maxLength = 12;
    second.placeholder = 'مرجع الاستنتاج...';
    second.introText = `كوّن المرجع بنفسك: ابدأ بمفتاح المتابعة من الخطوة الأولى، وبعده عدد كلمات عنوان «${c.title}» في خانتين.`;
    second.wrongMsg = '✗ المرجع مش صحيح. راجع مفتاح الخطوة الأولى، وبعده احسب عدد كلمات عنوان الدليل المطلوب.';
    second.successText = 'تم التحقق من المرجع اللي استنتجته وفتح سجل المتابعة.';
    second.resultText = 'سجل المتابعة اتفتح بعد استنتاج المرجع بشكل صحيح. النتيجة تؤكد صلاحية الخيط للاعتماد عليه مع باقي الأدلة من غير ما تكشف الجاني لوحدها.';

    caseData.__deductionPolicyVersion = '2026-08-24-v2';
    return true;
  }

  function applyPolicy(){
    let generatedFound = 0;
    CASES_REGISTRY.forEach(caseData=>{
      if(patchGeneratedCase(caseData)) generatedFound++;
    });
    return generatedFound;
  }

  // الملف ممكن يتحمّل قبل discovery-locks.js، لذلك نستنى لحد ما
  // الاكتشافات تتبني ثم نطبق السياسة مرة واحدة على كل القضايا.
  if(applyPolicy() === 0){
    let tries = 0;
    const timer = setInterval(()=>{
      tries++;
      if(applyPolicy() > 0 || tries >= 200) clearInterval(timer);
    }, 50);
  }
})();
