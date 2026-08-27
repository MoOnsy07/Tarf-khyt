/* ============================================================
   Ending Score — تقييم نهائي كنسبة + نقاط من حد القضية
   الوقت لا يدخل في الحساب نهائيًا.
   ============================================================ */
(function(){
  'use strict';

  const SCORE_ID = 'taraf-ending-score-card';

  function isEnding(){
    try{
      return typeof game !== 'undefined' && game && game.screen === 'ending';
    }catch(e){ return false; }
  }

  function hasCaseFeature(name){
    try{ return !!(typeof CASE !== 'undefined' && CASE && CASE[name]); }
    catch(e){ return false; }
  }

  // الحد الأقصى يختلف حسب حجم وتعقيد القضية: 100 / 150 / 200.
  // لو عايزين نحدد قضية بعينها يدويًا لاحقًا، يكفي إضافة scoreMax في بيانات القضية.
  function caseMaxScore(){
    try{
      if(typeof CASE === 'undefined' || !CASE) return 100;
      const explicit = Number(CASE.scoreMax || CASE.maxScore);
      if(Number.isFinite(explicit) && explicit >= 50) return Math.round(explicit);

      const evidenceCount = Array.isArray(CASE.evidence) ? CASE.evidence.length : 0;
      const suspectCount = Array.isArray(CASE.suspects) ? CASE.suspects.length : 0;
      const featureNames = [
        'timelinePuzzle','theoryBuilder','dnaLabPuzzle','alibiGridPuzzle',
        'ledgerAuditPuzzle','polygraphPuzzle','floorPlanPuzzle',
        'witnessReliabilityPuzzle','handwritingPuzzle','audioPuzzle',
        'cameraPuzzle','cipherPuzzle','matchPuzzle','codeLock',
        'investigationActions','contradictions'
      ];
      const featureCount = featureNames.reduce((n,k)=>n + (hasCaseFeature(k) ? 1 : 0), 0);

      const complexity = evidenceCount + (suspectCount * 2) + (featureCount * 4);
      if(complexity >= 38) return 200;
      if(complexity >= 22) return 150;
      return 100;
    }catch(e){ return 100; }
  }

  function scoreLogRows(){
    try{ return Array.isArray(game && game.scoreLog) ? game.scoreLog : []; }
    catch(e){ return []; }
  }

  function numericDelta(row){
    if(row == null) return 0;
    if(typeof row === 'number') return row;
    if(typeof row === 'object'){
      const candidates = [row.delta,row.points,row.score,row.amount,row.value];
      for(const v of candidates){
        const n = Number(v);
        if(Number.isFinite(n)) return n;
      }
    }
    return 0;
  }

  function missedSecretPenalty(){
    try{
      if(typeof CASE === 'undefined' || !CASE || !Array.isArray(CASE.evidence)) return 0;
      const found = game && game.secretsFound instanceof Set ? game.secretsFound : new Set(game && game.secretsFound || []);
      let possible = 0, earned = 0;
      CASE.evidence.forEach(ev=>{
        const bonus = Math.max(0, Number(ev && ev.bonusPoints) || 0);
        if(!bonus) return;
        possible += bonus;
        if(found.has(ev.id)) earned += bonus;
      });
      return Math.max(0, possible - earned);
    }catch(e){ return 0; }
  }

  // نسبة الأداء مبنية على القرارات داخل القضية فقط.
  // النجاحات = رصيد موجب، الأخطاء = رصيد سالب، والأسرار الاختيارية غير المكتشفة تقلل الكمال قليلًا.
  // لا يوجد أي استخدام لـ startedAt أو solveTimeSeconds هنا.
  function performancePercent(){
    try{
      const rows = scoreLogRows();
      let positive = 0;
      let mistakes = 0;
      rows.forEach(row=>{
        const d = numericDelta(row);
        if(d > 0) positive += d;
        else if(d < 0) mistakes += Math.abs(d);
      });

      const raw = Math.max(0, Number(game && game.score) || 0);
      if(positive === 0 && raw > 0) positive = raw;

      const missed = missedSecretPenalty();
      const denominator = Math.max(1, positive + mistakes + missed);

      // القضايا القديمة التي لا تملك scoreLog كامل: الحل الصحيح بدون أخطاء مسجلة لا يُعاقب.
      if(positive === 0 && mistakes === 0 && missed === 0) return 100;

      const pct = Math.round((positive / denominator) * 100);
      return Math.max(0, Math.min(100, pct));
    }catch(e){ return 100; }
  }

  function finalResult(){
    const max = caseMaxScore();
    const percent = performancePercent();
    const earned = Math.max(0, Math.min(max, Math.round(max * percent / 100)));
    return { earned, max, percent };
  }

  function renderEndingScore(){
    const old = document.getElementById(SCORE_ID);
    if(!isEnding()){
      if(old) old.remove();
      return;
    }

    const app = document.getElementById('app');
    if(!app) return;

    const result = finalResult();
    if(old){
      const points = old.querySelector('[data-ending-score-points]');
      const pct = old.querySelector('[data-ending-score-percent]');
      if(points) points.textContent = `${result.earned} من ${result.max}`;
      if(pct) pct.textContent = `${result.percent}%`;
      return;
    }

    const card = document.createElement('section');
    card.id = SCORE_ID;
    card.setAttribute('aria-label', 'تقييم أداء التحقيق');
    card.style.cssText = [
      'max-width:760px',
      'margin:18px auto',
      'padding:20px',
      'border:1px solid rgba(224,164,88,.45)',
      'border-radius:16px',
      'background:rgba(224,164,88,.08)',
      'text-align:center',
      'box-shadow:0 10px 30px rgba(0,0,0,.16)'
    ].join(';');

    card.innerHTML = `
      <div class="mono" style="font-size:12px;opacity:.72;margin-bottom:8px;">تقييم أداء التحقيق</div>
      <div data-ending-score-percent style="font-size:42px;font-weight:900;line-height:1;color:var(--amber,#e0a458);margin-bottom:8px;">${result.percent}%</div>
      <div data-ending-score-points style="font-size:20px;font-weight:800;">${result.earned} من ${result.max}</div>
      <div style="font-size:12px;opacity:.62;margin-top:7px;">التقييم حسب قراراتك وأدائك داخل القضية — الوقت لا يؤثر</div>
    `;

    app.appendChild(card);
  }

  let queued = false;
  function queueRender(){
    if(queued) return;
    queued = true;
    requestAnimationFrame(()=>{
      queued = false;
      renderEndingScore();
    });
  }

  function start(){
    const app = document.getElementById('app');
    if(!app) return;
    new MutationObserver(queueRender).observe(app, {childList:true, subtree:true});
    queueRender();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
