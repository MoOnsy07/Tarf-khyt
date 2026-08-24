/* ============================================================
   طرف الخيط — سياسة الاستنتاج للألغاز الواقعية المولّدة
   - الأولوية لمحتوى الدليل نفسه: تاريخ / وقت / كود / لوحة / رقم / مبلغ.
   - النظام يحدد للاعب نوع المعلومة ومصدرها، لكنه لا يعرض القيمة الجاهزة.
   - لو القضية لا تحتوي قيمًا مناسبة كفاية، يرجع فقط وقتها لـ fallback آمن.
   - الألغاز الخاصة المكتوبة يدويًا لا تتأثر.
   ============================================================ */
(function(){
  'use strict';

  if(typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return;

  const VERSION = '2026-08-24-content-v3';

  function normalizeDigits(value){
    const ar = '٠١٢٣٤٥٦٧٨٩';
    const fa = '۰۱۲۳۴۵۶۷۸۹';
    return String(value == null ? '' : value)
      .replace(/[٠-٩]/g, d=>String(ar.indexOf(d)))
      .replace(/[۰-۹]/g, d=>String(fa.indexOf(d)));
  }

  function cleanAnswer(value){
    return normalizeDigits(value)
      .trim()
      .replace(/[ًٌٍَُِّْـ]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/[^a-zA-Z0-9\u0621-\u064a]/g,'')
      .toUpperCase();
  }

  function evidenceText(ev){
    return normalizeDigits([
      ev && ev.title,
      ev && ev.short,
      ev && ev.full,
      ev && ev.tag
    ].filter(Boolean).join(' '));
  }

  function evidenceById(caseData, id){
    return (caseData.evidence || []).find(e=>e && e.id === id) || null;
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

  function pushCandidate(out, seen, value, type, hint, priority){
    const answer = cleanAnswer(value);
    if(!answer || answer.length < 2 || answer.length > 14) return;
    if(seen.has(answer)) return;
    seen.add(answer);
    out.push({value:String(value), answer, type, hint, priority});
  }

  function extractCandidates(ev){
    const text = evidenceText(ev);
    const out = [];
    const seen = new Set();
    let m;

    // أكواد صريحة زي NX-204 / B-12 / D14 / 4B / خ-12
    const codeRe = /(?:^|[\s«“"'(:])([A-Za-z\u0621-\u064a]{1,3}\s*[-–]?\s*\d{1,4}|\d{1,4}\s*[-–]?\s*[A-Za-z\u0621-\u064a]{1,3})(?=$|[\s»”"'،,.):])/g;
    while((m = codeRe.exec(text))){
      pushCandidate(out, seen, m[1], 'كود/مرجع', 'الكود أو المرجع المكتوب داخل الدليل', 100);
    }

    // لوحات عربية شائعة: س م د 4821
    const plateRe = /([\u0621-\u064a](?:\s+[\u0621-\u064a]){1,2}\s*[-–]?\s*\d{3,4})/g;
    while((m = plateRe.exec(text))){
      pushCandidate(out, seen, m[1], 'رقم لوحة', 'رقم اللوحة الظاهر أو المذكور في الدليل', 98);
    }

    // تواريخ رقمية
    const dateRe = /\b(\d{1,2}[\/\-.]\d{1,2}(?:[\/\-.]\d{2,4})?)\b/g;
    while((m = dateRe.exec(text))){
      pushCandidate(out, seen, m[1], 'تاريخ', 'التاريخ المذكور داخل الدليل', 95);
    }

    // أوقات
    const timeRe = /\b(\d{1,2}:\d{2})\b/g;
    while((m = timeRe.exec(text))){
      pushCandidate(out, seen, m[1], 'توقيت', 'التوقيت المذكور داخل الدليل', 94);
    }

    // مبالغ لما السياق واضح
    const moneyRe = /(\d{2,7})\s*(?:جنيه|جنيها|جنيهًا|EGP|دولار|ريال)/gi;
    while((m = moneyRe.exec(text))){
      pushCandidate(out, seen, m[1], 'مبلغ', 'المبلغ المذكور في الدليل بدون رمز العملة', 90);
    }

    // أرقام مرتبطة بسياق مفيد؛ نستبعد 1 رقم منفرد لتقليل الضوضاء.
    const numberRe = /\b(\d{2,6})\b/g;
    while((m = numberRe.exec(text))){
      const raw = m[1];
      // سنين شائعة تظل مفيدة لو السياق نفسه تاريخ/سنة.
      const around = text.slice(Math.max(0, m.index - 30), Math.min(text.length, m.index + raw.length + 30));
      let hint = 'الرقم المرتبط بالتفصيلة الأساسية داخل الدليل';
      let priority = 60;
      if(/سنة|عام|تخرج|تاريخ/.test(around)){ hint = 'السنة أو الرقم الزمني المذكور في الدليل'; priority = 82; }
      else if(/آخر|رقم|هاتف|مكالمة|لوحة|بادج|كارت|غرفة|ترابيزة|صندوق|مرجع|فريم|عينة/.test(around)){ hint = 'الرقم المرتبط بالعنصر المذكور في الدليل'; priority = 80; }
      pushCandidate(out, seen, raw, 'رقم', hint, priority);
    }

    return out.sort((a,b)=>b.priority-a.priority || a.answer.length-b.answer.length);
  }

  function chooseContentUnits(caseData, wanted){
    const reachable = reachableEvidenceIds(caseData);
    const evidence = (caseData.evidence || []).filter(e=>e && e.id && (e.unlocked || reachable.has(e.id)));
    const units = [];

    evidence.forEach(ev=>{
      const candidates = extractCandidates(ev);
      candidates.forEach((candidate, idx)=>{
        units.push({ev, candidate, rank:(candidate.priority || 0) - idx});
      });
    });

    units.sort((a,b)=>b.rank-a.rank || (Number(a.ev.order)||999)-(Number(b.ev.order)||999));

    // نحاول ننوّع الأدلة الأول، وبعدها نسمح بقيمتين من نفس الدليل لو محتاجين.
    const picked = [];
    const usedEvidence = new Set();
    for(const unit of units){
      if(usedEvidence.has(unit.ev.id)) continue;
      picked.push(unit);
      usedEvidence.add(unit.ev.id);
      if(picked.length >= wanted) return picked;
    }
    for(const unit of units){
      if(picked.some(p=>p.ev.id===unit.ev.id && p.candidate.answer===unit.candidate.answer)) continue;
      picked.push(unit);
      if(picked.length >= wanted) break;
    }
    return picked;
  }

  function fallbackPatch(caseData, first, second){
    const sources1 = first.sourceIds || first.requires || [];
    const a = evidenceById(caseData, sources1[0]);
    const b = evidenceById(caseData, sources1[1]);
    const sources2 = second.sourceIds || second.requires || [];
    const c = evidenceById(caseData, sources2[0]);
    if(!a || !b || !c) return false;

    const count = s=>String(String(s||'').trim().split(/\s+/).filter(Boolean).length).padStart(2,'0');
    const firstAnswer = count(a.title) + count(b.title);
    const prefix = String(first.resultPrefix || '').trim();
    const suffix = count(c.title);

    caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
    caseData.realisticDiscoveryClues[a.id] = ['مفيش رقم مباشر صالح للتحقق في الدليل؛ استخدم عدد كلمات عنوانه كخطة احتياطية فقط.'];
    caseData.realisticDiscoveryClues[b.id] = ['استخدم عدد كلمات عنوان الدليل كجزء ثانٍ من رمز المطابقة الاحتياطي.'];
    caseData.realisticDiscoveryClues[c.id] = ['للتحقق النهائي الاحتياطي، استخدم عدد كلمات عنوان الدليل بعد مفتاح المتابعة.'];

    first.inputMode='numeric';
    first.maxLength=4;
    first.acceptedAnswers=[firstAnswer];
    first.introText=`القضية دي مفيهاش قيم رقمية/مرجعية كفاية في الأدلة المتاحة. كحل احتياطي: احسب عدد كلمات «${a.title}» ثم «${b.title}» واكتب كل عدد في خانتين.`;
    first.wrongMsg='✗ الرمز مش صحيح. عدّ كلمات عنوان كل دليل واكتب كل عدد في خانتين.';

    if(prefix){
      second.acceptedAnswers=[`${prefix}${suffix}`,`${prefix}-${suffix}`,`${prefix} ${suffix}`];
      second.introText=`استخدم مفتاح المتابعة من الخطوة الأولى، وبعده عدد كلمات عنوان «${c.title}» في خانتين.`;
      second.wrongMsg='✗ المرجع مش صحيح. راجع المفتاح وعدد كلمات عنوان الدليل.';
    }
    return true;
  }

  function patchGeneratedCase(caseData){
    if(!caseData || !Array.isArray(caseData.discoveryLocks)) return false;
    if(caseData.__deductionPolicyVersion === VERSION) return true;

    const firstId = `real_${caseData.id}_crossref`;
    const secondId = `real_${caseData.id}_archive`;
    const first = caseData.discoveryLocks.find(x=>x && x.id === firstId);
    const second = caseData.discoveryLocks.find(x=>x && x.id === secondId);
    if(!first || !second) return false; // لغز خاص مكتوب يدويًا: لا نلمسه.

    const units = chooseContentUnits(caseData, 3);
    const prefix = String(first.resultPrefix || '').trim();

    if(units.length < 2){
      fallbackPatch(caseData, first, second);
      caseData.__deductionPolicyVersion = VERSION;
      return true;
    }

    const u1 = units[0];
    const u2 = units[1];
    const u3 = units[2] || units[0];

    caseData.realisticDiscoveryClues = caseData.realisticDiscoveryClues || {};
    caseData.realisticDiscoveryClues[u1.ev.id] = [
      `ملاحظة تحقيق: استخرج بنفسك ${u1.candidate.hint}. القيمة موجودة في محتوى الدليل ومش هتظهر لك كإجابة جاهزة.`
    ];
    caseData.realisticDiscoveryClues[u2.ev.id] = [
      ...(caseData.realisticDiscoveryClues[u2.ev.id] || []),
      `ملاحظة تحقيق: استخرج ${u2.candidate.hint}. هتحتاجها مع قيمة الدليل الآخر للمطابقة.`
    ];
    caseData.realisticDiscoveryClues[u3.ev.id] = [
      ...(caseData.realisticDiscoveryClues[u3.ev.id] || []),
      `ملاحظة تحقيق: راجع ${u3.candidate.hint} لاستخدامها في التحقق النهائي.`
    ];

    const firstAnswer = u1.candidate.answer + u2.candidate.answer;
    first.requires = [...new Set([u1.ev.id,u2.ev.id])];
    first.sourceIds = [...first.requires];
    first.inputMode = /^[0-9]+$/.test(firstAnswer) ? 'numeric' : 'text';
    first.maxLength = Math.max(8, Math.min(30, firstAnswer.length + 6));
    first.placeholder = 'القيمتين بالترتيب...';
    first.acceptedAnswers = [firstAnswer, `${u1.candidate.value}-${u2.candidate.value}`, `${u1.candidate.value} ${u2.candidate.value}`];
    first.introText = `راجع «${u1.ev.title}» و«${u2.ev.title}». من الأول استخرج ${u1.candidate.hint}، ومن الثاني استخرج ${u2.candidate.hint}. اكتب القيمتين وراء بعض بالترتيب لإجراء المطابقة. النظام مش هيعرض الأرقام أو الأكواد نفسها.`;
    first.lockedText = `لسه محتاج تجمع «${u1.ev.title}» و«${u2.ev.title}» قبل المطابقة.`;
    first.wrongMsg = '✗ المطابقة مش صحيحة. افتح الدليلين واقرأ محتواهم؛ المطلوب قيم موجودة فعلًا جوه الأدلة، مش رقم ظاهر في رسالة النظام.';
    first.successText = prefix
      ? `المطابقة نجحت. ظهر مفتاح متابعة «${prefix}». استخدمه مع الدليل التالي.`
      : 'المطابقة نجحت وظهر مفتاح متابعة للخطوة التالية.';
    first.resultText = prefix
      ? `تم ربط القيمتين من الدليلين وخرج مفتاح متابعة «${prefix}». المفتاح وحده لا يحسم القضية.`
      : 'تم ربط القيمتين بنجاح. النتيجة مجرد خيط متابعة وليست اتهامًا.';

    const secondValue = u3.candidate.answer;
    second.requires = [u3.ev.id];
    second.sourceIds = [u3.ev.id];
    second.requiresDiscoveries = [firstId];
    second.inputMode = 'text';
    second.maxLength = Math.max(12, Math.min(30, (prefix + secondValue).length + 6));
    second.placeholder = 'مرجع التحقق...';
    if(prefix){
      second.acceptedAnswers = [
        `${prefix}${secondValue}`,
        `${prefix}-${u3.candidate.value}`,
        `${prefix} ${u3.candidate.value}`
      ];
      second.introText = `بعد نجاح المطابقة الأولى، استخدم مفتاح المتابعة اللي ظهر لك ثم استخرج بنفسك ${u3.candidate.hint} من «${u3.ev.title}». كوّن المرجع واكتبه؛ القيمة مش هتظهر جاهزة في شاشة التحقق.`;
    }else{
      second.acceptedAnswers = [secondValue, u3.candidate.value];
      second.introText = `راجع «${u3.ev.title}» واستخرج بنفسك ${u3.candidate.hint} لفتح سجل التحقق.`;
    }
    second.lockedText = `لسه محتاج تخلص المطابقة الأولى وتجمع «${u3.ev.title}».`;
    second.wrongMsg = '✗ المرجع مش صحيح. ارجع لمحتوى الدليل نفسه واستخرج القيمة المطلوبة، ثم اربطها بمفتاح المتابعة.';
    second.successText = 'تم فتح سجل التحقق بعد استخدام المعلومة المستخرجة من الدليل.';
    second.resultText = 'تم التحقق من الخيط اعتمادًا على محتوى الأدلة نفسها. النتيجة تقوي التحقيق من غير ما تكشف الجاني وحدها.';

    caseData.__deductionPolicyVersion = VERSION;
    return true;
  }

  function applyPolicy(){
    let generatedFound = 0;
    CASES_REGISTRY.forEach(caseData=>{
      if(patchGeneratedCase(caseData)) generatedFound++;
    });
    return generatedFound;
  }

  // ممكن الملف يتحمل قبل discovery-locks.js؛ نستنى بناء الاكتشافات ثم نطبّق السياسة.
  if(applyPolicy() === 0){
    let tries = 0;
    const timer = setInterval(()=>{
      tries++;
      if(applyPolicy() > 0 || tries >= 200) clearInterval(timer);
    }, 50);
  }
})();
