/* ============================================================
   Theory Builder Safety Fix
   يمنع شاشة بناء النظرية من كشف الجاني الحقيقي لو اللاعب اتهم
   شخصًا غلط. في الاتهام الغلط نروح مباشرة للنتيجة، أما لو
   الاتهام صح فتبقى شاشة النظرية متاحة كالمعتاد.
   ============================================================ */
(() => {
  'use strict';

  if (typeof renderPanel !== 'function' || typeof computeEnding !== 'function') return;

  const baseRenderPanel = renderPanel;

  renderPanel = function(){
    try {
      const onTheory = !!(game && CASE && game.screen === 'theory');
      const theoryEnabled = !!(CASE && CASE.theoryBuilder && CASE.theoryBuilder.enabled);
      const hasAccusation = !!(game && game.accSuspect);
      const hasCorrectSuspect = !!(CASE && CASE.correctSuspectId);
      const wrongAccusation = hasAccusation && hasCorrectSuspect && game.accSuspect !== CASE.correctSuspectId;

      if (onTheory && theoryEnabled && wrongAccusation) {
        try {
          gaTrack('theory_skipped_wrong_accusation', {
            suspect_id: String(game.accSuspect || '')
          });
        } catch (_) {}

        return computeEnding();
      }
    } catch (_) {}

    return baseRenderPanel.apply(this, arguments);
  };

  try {
    window.__TARAF_THEORY_BUILDER_SAFETY_FIX__ = {
      version: '2026-08-24-v1',
      wrongAccusationSkipsTheory: true,
      correctAccusationKeepsTheory: true
    };
  } catch (_) {}
})();

/* ============================================================
   Phased Deductions Engine — opt-in only
   ------------------------------------------------------------
   مخصص للقضايا المركبة اللي محتاجة اللاعب يستنتج الحقيقة على
   مراحل بدل ما نتيجة الربط تظهر أوتوماتيك. لا يغير أي سلوك في
   القضايا القديمة إلا لو CASE.deductions.enabled === true.

   Schema مختصر:
   CASE.phases = {
     enabled:true,
     initial:'death',
     order:['death','after_death','false_identity','fake_death','second_murder'],
     labels:{ death:'الوفاة', ... }
   };

   CASE.deductions = {
     enabled:true,
     items:[{
       id:'body_not_kareem',
       label:'هوية الجثمان',
       question:'إيه الاستنتاج الأقوى؟',
       requires:['medical_record','dental_record'],
       requiresActions:[],
       requiresDeductions:[],
       phase:'after_death',
       options:[
         {id:'a',text:'السجل ناقص'},
         {id:'b',text:'الجثة ليست كريم'}
       ],
       correctOptionId:'b',
       unlockPhase:'false_identity',
       resultEvidenceIds:[],
       successText:'ثبت إن هوية الجثمان الأولى غلط.'
     }]
   };

   وأي investigationAction يقدر يستخدم:
     phase / minPhase / phases
     requiresDeductions:['body_not_kareem']
   ============================================================ */
(() => {
  'use strict';

  if (typeof fieldworkHTML !== 'function' ||
      typeof investigationActionsForCase !== 'function' ||
      typeof runFieldAction !== 'function') return;

  const STORAGE_PREFIX = 'ca_case_logic_v1_';
  let stateCache = null;
  let stateCaseId = null;

  function enabled(){
    return !!(CASE && CASE.deductions && CASE.deductions.enabled && Array.isArray(CASE.deductions.items));
  }

  function phaseConfig(){
    return CASE && CASE.phases && CASE.phases.enabled ? CASE.phases : null;
  }

  function initialPhase(){
    const cfg = phaseConfig();
    if(!cfg) return null;
    if(cfg.initial) return String(cfg.initial);
    if(Array.isArray(cfg.order) && cfg.order.length) return String(cfg.order[0]);
    return null;
  }

  function storageKey(){
    return CASE && CASE.id ? STORAGE_PREFIX + CASE.id : null;
  }

  function loadState(){
    if(!enabled()) return { solved:new Set(), phase:null };
    if(stateCache && stateCaseId === CASE.id) return stateCache;

    let parsed = null;
    try { parsed = JSON.parse(localStorage.getItem(storageKey()) || 'null'); } catch(_) {}
    stateCache = {
      solved: new Set(parsed && Array.isArray(parsed.solved) ? parsed.solved : []),
      phase: parsed && parsed.phase ? String(parsed.phase) : initialPhase(),
    };
    stateCaseId = CASE.id;
    return stateCache;
  }

  function saveState(){
    if(!enabled()) return;
    const st = loadState();
    try {
      localStorage.setItem(storageKey(), JSON.stringify({
        solved:[...st.solved],
        phase:st.phase || null,
      }));
    } catch(_) {}
  }

  function solved(id){
    return !!id && enabled() && loadState().solved.has(id);
  }

  function phaseIndex(id){
    const cfg = phaseConfig();
    if(!cfg || !Array.isArray(cfg.order)) return -1;
    return cfg.order.indexOf(id);
  }

  function currentPhase(){
    if(!enabled()) return null;
    return loadState().phase || initialPhase();
  }

  function phaseVisible(item){
    const cfg = phaseConfig();
    if(!cfg || !item) return true;
    const current = currentPhase();

    if(Array.isArray(item.phases) && item.phases.length){
      return item.phases.includes(current);
    }
    if(item.phase){
      return String(item.phase) === String(current);
    }
    if(item.minPhase){
      const now = phaseIndex(current);
      const min = phaseIndex(String(item.minPhase));
      if(now >= 0 && min >= 0) return now >= min;
    }
    return true;
  }

  function reqEvidenceOk(item){
    const ids = Array.isArray(item && item.requires) ? item.requires : [];
    return ids.every(id => game && game.collected && game.collected.has(id));
  }

  function reqActionsOk(item){
    const ids = Array.isArray(item && item.requiresActions) ? item.requiresActions : [];
    return ids.every(id => game && game.investigationActionsDone && game.investigationActionsDone.has(id));
  }

  function reqDeductionsOk(item){
    const ids = Array.isArray(item && item.requiresDeductions) ? item.requiresDeductions : [];
    return ids.every(solved);
  }

  function requirementsOk(item){
    return reqEvidenceOk(item) && reqActionsOk(item) && reqDeductionsOk(item);
  }

  function esc(v){
    try { return typeof escapeHTML === 'function' ? escapeHTML(v) : String(v == null ? '' : v); }
    catch(_) { return String(v == null ? '' : v); }
  }

  function visibleDeductions(){
    if(!enabled()) return [];
    return CASE.deductions.items.filter(d => {
      if(!d || !d.id) return false;
      if(solved(d.id)) return true;
      return phaseVisible(d) && requirementsOk(d);
    });
  }

  function deductionSectionHTML(){
    if(!enabled()) return '';
    const items = visibleDeductions();
    if(!items.length) return '';

    const cfg = phaseConfig();
    const phase = currentPhase();
    const phaseLabel = cfg && cfg.labels && cfg.labels[phase] ? cfg.labels[phase] : null;

    const cards = items.map(d => {
      const done = solved(d.id);
      if(done){
        return `
          <div class="evidence-card found" style="cursor:default;">
            <div class="ev-top"><span class="tag mono">استنتاج</span><span class="mono dim">✓ تم</span></div>
            <h3 style="margin:8px 0 6px;">${esc(d.label || 'استنتاج')}</h3>
            <p class="dim" style="margin:0;">${esc(d.solvedText || d.successText || 'تم تثبيت الاستنتاج في ملف القضية.')}</p>
          </div>`;
      }

      const options = (d.options || []).map(o => `
        <button class="q-btn" data-deduction-id="${esc(d.id)}" data-deduction-option="${esc(o.id)}">${esc(o.text)}</button>
      `).join('');

      return `
        <div class="evidence-card" style="cursor:default; border-color:var(--signal);">
          <div class="ev-top"><span class="tag mono">🧠 استنتاج متاح</span><span class="mono dim">حلّل الخيوط</span></div>
          <h3 style="margin:8px 0 6px;">${esc(d.label || 'استنتاج')}</h3>
          <p style="margin:0 0 12px;">${esc(d.question || 'إيه الاستنتاج الأقوى من الأدلة اللي جمعتها؟')}</p>
          <div class="q-grid">${options}</div>
        </div>`;
    }).join('');

    return `
      <div class="divider"></div>
      <div class="deductions-section">
        <h2 style="margin-bottom:4px;">🧠 استنتاجات المحقق</h2>
        ${phaseLabel ? `<div class="tag mono" style="margin-bottom:10px;">المرحلة الحالية: ${esc(phaseLabel)}</div>` : ''}
        <p class="dim">هنا اللعبة مش هتربط الخيوط مكانك. الاستنتاج الصح هو اللي يفتح مسار التحقيق اللي بعده.</p>
        <div class="evidence-grid">${cards}</div>
      </div>`;
  }

  const baseInvestigationActionsForCase = investigationActionsForCase;
  investigationActionsForCase = function(){
    const all = baseInvestigationActionsForCase.apply(this, arguments) || [];
    if(!enabled()) return all;
    return all.filter(a => phaseVisible(a) && reqDeductionsOk(a));
  };

  const baseFieldworkHTML = fieldworkHTML;
  fieldworkHTML = function(){
    const base = baseFieldworkHTML.apply(this, arguments);
    if(!enabled()) return base;
    return base + deductionSectionHTML();
  };

  const baseRunFieldAction = runFieldAction;
  runFieldAction = function(actionId){
    if(enabled()){
      const action = (baseInvestigationActionsForCase.apply(this, []) || []).find(a => a && a.id === actionId);
      if(action && (!phaseVisible(action) || !reqDeductionsOk(action))){
        if(typeof showToast === 'function') showToast('لسه محتاج تستنتج خيط سابق قبل الإجراء ده.', 'danger');
        return;
      }
    }
    return baseRunFieldAction.apply(this, arguments);
  };

  if(typeof interrogationQuestionVisible === 'function'){
    const baseQuestionVisible = interrogationQuestionVisible;
    interrogationQuestionVisible = function(s, item, idx){
      const base = baseQuestionVisible.apply(this, arguments);
      if(!base || !enabled()) return base;
      return phaseVisible(item) && reqDeductionsOk(item);
    };
  }

  if(typeof clearLocalProgress === 'function'){
    const baseClearLocalProgress = clearLocalProgress;
    clearLocalProgress = function(caseId){
      const result = baseClearLocalProgress.apply(this, arguments);
      try { localStorage.removeItem(STORAGE_PREFIX + caseId); } catch(_) {}
      if(CASE && CASE.id === caseId){ stateCache = null; stateCaseId = null; }
      return result;
    };
  }

  function solveDeduction(id, optionId){
    if(!enabled()) return;
    const d = CASE.deductions.items.find(x => x && x.id === id);
    if(!d || solved(id) || !phaseVisible(d) || !requirementsOk(d)) return;

    if(String(optionId) !== String(d.correctOptionId)){
      try { gaTrack('deduction_attempt', { deduction_id:String(id), correct:'no' }); } catch(_) {}
      if(typeof showToast === 'function') showToast(d.wrongText || 'الاستنتاج ده لسه مش راكب على كل الأدلة. راجع الخيوط وجرب تاني.', 'danger');
      return;
    }

    const st = loadState();
    st.solved.add(id);
    if(d.unlockPhase) st.phase = String(d.unlockPhase);
    saveState();

    let gained = 0;
    (d.resultEvidenceIds || []).forEach(evId => {
      try { if(typeof collect === 'function' && collect(evId)) gained++; } catch(_) {}
    });

    try {
      gaTrack('deduction_solved', {
        deduction_id:String(id),
        unlock_phase:String(d.unlockPhase || ''),
        result_count:gained,
      });
    } catch(_) {}

    if(typeof addScore === 'function' && d.score !== 0){
      try { addScore(d.score != null ? Number(d.score) : 6, 'استنتاج صحيح: ' + (d.label || id), {silent:true}); } catch(_) {}
    }
    try { if(typeof persistProgress === 'function') persistProgress(); } catch(_) {}
    if(typeof triggerFlash === 'function') try { triggerFlash('good'); } catch(_) {}
    if(typeof showToast === 'function') showToast(d.successText || '🧠 استنتاج صحيح — اتفتح خيط جديد في التحقيق.', 'amber');

    if(game) game.screen = 'fieldwork';
    if(typeof render === 'function') render();
  }

  document.addEventListener('click', e => {
    const btn = e.target && e.target.closest ? e.target.closest('[data-deduction-id][data-deduction-option]') : null;
    if(!btn) return;
    e.preventDefault();
    solveDeduction(btn.dataset.deductionId, btn.dataset.deductionOption);
  });

  try {
    window.TarafCaseLogic = {
      enabled,
      solved,
      currentPhase,
      phaseVisible,
      requirementsOk,
      solveDeduction,
      resetCurrent(){
        if(!CASE || !CASE.id) return;
        try { localStorage.removeItem(STORAGE_PREFIX + CASE.id); } catch(_) {}
        stateCache = null;
        stateCaseId = null;
      }
    };
    window.__TARAF_PHASED_DEDUCTIONS__ = {
      version:'2026-08-25-v1',
      optInOnly:true,
      supports:['deductions','phases','requiresDeductions','phase','minPhase','phases']
    };
  } catch(_) {}
})();
