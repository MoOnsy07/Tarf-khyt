/* ============================================================
   Ending Score — إظهار الـ Score النهائي بوضوح في شاشة حل القضية
   ============================================================ */
(function(){
  'use strict';

  const SCORE_ID = 'taraf-ending-score-card';

  function scoreValue(){
    try{
      if(typeof game === 'undefined' || !game) return 0;
      return Math.max(0, Math.floor(Number(game.score) || 0));
    }catch(e){ return 0; }
  }

  function isEnding(){
    try{
      return typeof game !== 'undefined' && game && game.screen === 'ending';
    }catch(e){ return false; }
  }

  function renderEndingScore(){
    const old = document.getElementById(SCORE_ID);
    if(!isEnding()){
      if(old) old.remove();
      return;
    }

    const app = document.getElementById('app');
    if(!app) return;

    const score = scoreValue();
    if(old){
      const value = old.querySelector('[data-ending-score-value]');
      if(value) value.textContent = String(score);
      return;
    }

    const card = document.createElement('section');
    card.id = SCORE_ID;
    card.setAttribute('aria-label', 'النتيجة النهائية');
    card.style.cssText = [
      'max-width:760px',
      'margin:18px auto',
      'padding:18px 20px',
      'border:1px solid rgba(224,164,88,.45)',
      'border-radius:16px',
      'background:rgba(224,164,88,.08)',
      'text-align:center',
      'box-shadow:0 10px 30px rgba(0,0,0,.16)'
    ].join(';');

    card.innerHTML = `
      <div class="mono" style="font-size:12px;opacity:.72;margin-bottom:6px;">نتيجة التحقيق</div>
      <div style="display:flex;align-items:baseline;justify-content:center;gap:8px;direction:rtl;">
        <strong data-ending-score-value style="font-size:38px;line-height:1;color:var(--amber,#e0a458);">${score}</strong>
        <span style="font-size:14px;opacity:.78;">Score</span>
      </div>
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
