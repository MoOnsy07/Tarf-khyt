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
    if(!caseData || !Array.isArray(caseData.discoveryLocks)) return;

    const firstId = `real_${caseData.id}_crossref`;
    const secondId = `real_${caseData.id}_archive`;
    const first = caseData.discoveryLocks.find(x=>x && x.id === firstId);
    const second = caseData.discoveryLocks.find(x=>x && x.id === secondId);

    // وجود الاسمين دول معًا معناه إن دي النسخة المولّدة تلقائيًا،
    // مش لغز خاص مكتوب للقضية.
    if(!first || !second) return;

    const firstSources = first.sourceIds || first.requires || [];
    const a = evidenceById(caseData, firstSources[0]);
    const b = evidenceById(caseData, firstSources[1]);
    const secondSources = second.sourceIds || second.requires || [];
    const c = evidenceById(caseData, secondSources[0]);
    if(!a || !b || !c) return;

    const aCount = wordCount(a.title);
    const bCount = wordCount(b.title);
    const cCount = wordCount(c.title);
    const firstAnswer = `${twoDigits(aCount)}${twoDigits(bCount)}`;
    const prefix = String(first.resultPrefix || '').trim();
    const secondSuffix = twoDigits(cCount);

    caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};

    caseData.realisticDiscoveryClues[a.id] = [
      `قاعدة المطابقة: احسب عدد كلمات عنوان هذا الدليل، واكتبه في خانتين. مثال: 3 كلمات = 03. ما تاخدش رقمًا جاهزًا من النظام.`
    ];
    caseData.realisticDiscoveryClues[b.id] = [
      `قاعدة المطابقة: احسب عدد كلمات عنوان هذا الدليل بنفسك. ده الجزء الثاني من الرمز، ويتكتب في خانتين.`
    ];
    caseData.realisticDiscoveryClues[c.id] = [
      `قاعدة التحقق النهائي: الجزء الرقمي هو عدد كلمات عنوان هذا الدليل في خانتين. اربطه ببادئة المتابعة اللي خرجت من المطابقة الأولى.`
    ];

    first.inputMode = 'numeric';
    first.maxLength = 4;
    first.placeholder = 'رمز الاستنتاج...';
    first.acceptedAnswers = [firstAnswer];
    first.introText = `راجع «${a.title}» و«${b.title}». رمز المطابقة مكوّن من عدد كلمات عنوان الدليل الأول في خانتين، ثم عدد كلمات عنوان الدليل الثاني في خانتين. احسبهم بنفسك واكتب الأربع خانات.`;
    first.wrongMsg = '✗ الرمز مش صحيح. عدّ كلمات عنوان كل دليل بالترتيب، واكتب كل عدد في خانتين.';
    first.successText = prefix
      ? `المطابقة نجحت. ظهر لك الآن مفتاح المتابعة «${prefix}». احتفظ به للخطوة التالية.`
      : 'المطابقة نجحت. ظهر مفتاح المتابعة للخطوة التالية.';
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
    second.introText = `استخدم مفتاح المتابعة اللي حصلت عليه من المطابقة الأولى، وبعده عدد كلمات عنوان «${c.title}» في خانتين. النظام مش هيعرض لك المرجع النهائي؛ كوّنه بنفسك.`;
    second.wrongMsg = '✗ المرجع مش صحيح. راجع مفتاح الخطوة الأولى، وبعده عدّ كلمات عنوان الدليل المطلوب واكتب العدد في خانتين.';
    second.successText = 'تم التحقق من المرجع اللي استنتجته وفتح سجل المتابعة.';
    second.resultText = 'سجل المتابعة اتفتح بعد استنتاج المرجع بشكل صحيح. النتيجة تؤكد صلاحية الخيط للاعتماد عليه مع باقي الأدلة من غير ما تكشف الجاني لوحدها.';

    caseData.__deductionPolicyVersion = '2026-08-24-v1';
  }

  CASES_REGISTRY.forEach(patchGeneratedCase);
})();
