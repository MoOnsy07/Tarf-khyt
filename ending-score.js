/* ============================================================
   Ending Score — تقييم نهائي كنسبة + نقاط من حد القضية
   الوقت لا يدخل في الحساب نهائيًا.
   ============================================================ */
(function(){
  'use strict';

  const SCORE_ID = 'taraf-ending-score-stamp';
  const STYLE_ID = 'taraf-ending-score-styles';

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

  function ensureStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #panelBody .score-final{display:none!important}
      .ending-stamp-row{display:flex;align-items:center;flex-wrap:wrap;gap:14px;margin-bottom:18px;direction:rtl}
      .ending-stamp-row>.stamp{margin-bottom:0}
      .ending-score-stamp{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;min-width:122px;min-height:68px;box-sizing:border-box;padding:8px 18px;border:3px double currentColor;border-radius:50%;color:var(--amber,#e0a458);background:rgba(224,164,88,.055);box-shadow:inset 0 0 0 2px rgba(224,164,88,.14),0 0 18px rgba(224,164,88,.08);transform:rotate(4deg);text-align:center;line-height:1}
      .ending-score-stamp-label{font-size:9px;font-weight:800;letter-spacing:.04em;margin-bottom:4px;white-space:nowrap}
      .ending-score-stamp-percent{font-size:24px;font-weight:900}
      .ending-score-stamp-points{font-size:9px;font-weight:700;margin-top:4px;opacity:.82;direction:rtl}
      @media(max-width:480px){
        .ending-stamp-row{gap:10px}
        .ending-stamp-row>.stamp{font-size:17px;padding:7px 14px}
        .ending-score-stamp{min-width:106px;min-height:60px;padding:7px 13px}
        .ending-score-stamp-percent{font-size:21px}
      }
    `;
    document.head.appendChild(style);
  }

  function renderEndingScore(){
    const old = document.getElementById(SCORE_ID);
    if(!isEnding()){
      if(old) old.remove();
      return;
    }

    const verdictStamp = document.querySelector('#panelBody .stamp');
    if(!verdictStamp) return;

    ensureStyles();
    const result = finalResult();
    let row = verdictStamp.closest('.ending-stamp-row');
    if(!row){
      row = document.createElement('div');
      row.className = 'ending-stamp-row';
      verdictStamp.parentNode.insertBefore(row, verdictStamp);
      row.appendChild(verdictStamp);
    }

    if(old){
      const points = old.querySelector('[data-ending-score-points]');
      const pct = old.querySelector('[data-ending-score-percent]');
      if(points) points.textContent = `${result.earned} من ${result.max}`;
      if(pct) pct.textContent = `${result.percent}%`;
      if(old.parentNode !== row) row.appendChild(old);
      return;
    }

    const seal = document.createElement('div');
    seal.id = SCORE_ID;
    seal.className = 'ending-score-stamp mono';
    seal.setAttribute('aria-label', `التقييم الإجمالي ${result.percent}% — ${result.earned} من ${result.max}`);
    seal.innerHTML = `
      <span class="ending-score-stamp-label">التقييم الإجمالي</span>
      <strong class="ending-score-stamp-percent" data-ending-score-percent>${result.percent}%</strong>
      <span class="ending-score-stamp-points" data-ending-score-points>${result.earned} من ${result.max}</span>
    `;
    row.appendChild(seal);
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
