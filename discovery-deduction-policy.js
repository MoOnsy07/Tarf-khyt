/* ============================================================
   طرف الخيط — سياسة الاستنتاج للألغاز الواقعية المولّدة
   - الأولوية لمحتوى الدليل نفسه: تاريخ / وقت / كود / لوحة / رقم / مبلغ.
   - النظام يحدد للاعب نوع المعلومة ومصدرها، لكنه لا يعرض القيمة الجاهزة.
   - لو القضية لا تحتوي قيمًا مناسبة كفاية، لا يتم فرض لغز مصطنع على اللاعب.
   - الألغاز الخاصة المكتوبة يدويًا لا تتأثر.
   ============================================================ */
(function(){
  'use strict';

  if(typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return;

  const VERSION = '2026-08-25-content-v4';

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

    const codeRe = /(?:^|[\s«“"'(:])([A-Za-z\u0621-\u064a]{1,3}\s*[-–]?\s*\d{1,4}|\d{1,4}\s*[-–]?\s*[A-Za-z\u0621-\u064a]{1,3})(?=$|[\s»”"'،,.):])/g;
    while((m = codeRe.exec(text))){
      pushCandidate(out, seen, m[1], 'كود/مرجع', 'الكود أو المرجع المكتوب داخل الدليل', 100);
    }

    const plateRe = /([\u0621-\u064a](?:\s+[\u0621-\u064a]){1,2}\s*[-–]?\s*\d{3,4})/g;
    while((m = plateRe.exec(text))){
      pushCandidate(out, seen, m[1], 'رقم لوحة', 'رقم اللوحة الظاهر أو المذكور في الدليل', 98);
    }

    const dateRe = /\b(\d{1,2}[\/\-.]\d{1,2}(?:[\/\-.]\d{2,4})?)\b/g;
    while((m = dateRe.exec(text))){
      pushCandidate(out, seen, m[1], 'تاريخ', 'التاريخ المذكور داخل الدليل', 95);
    }

    const timeRe = /\b(\d{1,2}:\d{2})\b/g;
    while((m = timeRe.exec(text))){
      pushCandidate(out, seen, m[1], 'توقيت', 'التوقيت المذكور داخل الدليل', 94);
    }

    const moneyRe = /(\d{2,7})\s*(?:جنيه|جنيها|جنيهًا|EGP|دولار|ريال)/gi;
    while((m = moneyRe.exec(text))){
      pushCandidate(out, seen, m[1], 'مبلغ', 'المبلغ المذكور في الدليل بدون رمز العملة', 90);
    }

    const numberRe = /\b(\d{2,6})\b/g;
    while((m = numberRe.exec(text))){
      const raw = m[1];
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

  function disableGeneratedLocks(caseData, first, second){
    const ids = new Set([first && first.id, second && second.id].filter(Boolean));
    caseData.discoveryLocks = (caseData.discoveryLocks || []).filter(lock=>!lock || !ids.has(lock.id));

    if(caseData.realisticDiscoveryClues){
      Object.keys(caseData.realisticDiscoveryClues).forEach(id=>{
        const clues = caseData.realisticDiscoveryClues[id];
        if(!Array.isArray(clues)) return;
        caseData.realisticDiscoveryClues[id] = clues.filter(text=>
          !/عدد كلمات|خطة احتياطية|رمز المطابقة الاحتياطي|التحقق النهائي الاحتياطي/.test(String(text || ''))
        );
        if(!caseData.realisticDiscoveryClues[id].length) delete caseData.realisticDiscoveryClues[id];
      });
    }

    caseData.__generatedDiscoverySkipped = true;
    return true;
  }

  function patchGeneratedCase(caseData){
    if(!caseData || !Array.isArray(caseData.discoveryLocks)) return false;
    if(caseData.__deductionPolicyVersion === VERSION) return true;

    const firstId = `real_${caseData.id}_crossref`;
    const secondId = `real_${caseData.id}_archive`;
    const first = caseData.discoveryLocks.find(x=>x && x.id === firstId);
    const second = caseData.discoveryLocks.find(x=>x && x.id === secondId);
    if(!first || !second) return false;

    const units = chooseContentUnits(caseData, 3);
    const prefix = String(first.resultPrefix || '').trim();

    if(units.length < 2){
      disableGeneratedLocks(caseData, first, second);
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
    first.introText = `استخرج ${u1.candidate.hint} من «${u1.ev.title}»، ثم ${u2.candidate.hint} من «${u2.ev.title}». اكتب القيمتين بالترتيب للمطابقة.`;
    first.wrongMsg = '✗ القيم مش مطابقة. راجع محتوى الدليلين واستخرج القيم المكتوبة فعلًا.';

    second.requires = [u3.ev.id];
    second.sourceIds = [u3.ev.id];
    if(prefix){
      second.acceptedAnswers = [`${prefix}${u3.candidate.answer}`, `${prefix}-${u3.candidate.value}`, `${prefix} ${u3.candidate.value}`];
      second.introText = `استخدم بادئة المتابعة «${prefix}»، وبعدها ${u3.candidate.hint} من «${u3.ev.title}».`;
      second.wrongMsg = '✗ المرجع مش صحيح. راجع بادئة المتابعة والقيمة الحقيقية الموجودة في الدليل.';
    }

    caseData.__deductionPolicyVersion = VERSION;
    return true;
  }

  CASES_REGISTRY.forEach(patchGeneratedCase);
})();
