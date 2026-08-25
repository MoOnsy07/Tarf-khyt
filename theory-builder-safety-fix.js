/* ============================================================
   طرف الخيط — Theory safety + phased deductions + exclusive cases
   كل الإضافات Opt-in: القضايا القديمة لا تتغير إلا لو عرّفت الحقول الجديدة.
   ============================================================ */
(() => {
  'use strict';

  if (typeof renderPanel === 'function' && typeof computeEnding === 'function') {
    const baseRenderPanel = renderPanel;
    renderPanel = function(){
      try {
        const onTheory = !!(game && CASE && game.screen === 'theory');
        const enabled = !!(CASE && CASE.theoryBuilder && CASE.theoryBuilder.enabled);
        const wrong = !!(game && CASE && game.accSuspect && CASE.correctSuspectId && game.accSuspect !== CASE.correctSuspectId);
        if (onTheory && enabled && wrong) {
          try { gaTrack('theory_skipped_wrong_accusation', { suspect_id:String(game.accSuspect || '') }); } catch(_) {}
          return computeEnding();
        }
      } catch(_) {}
      return baseRenderPanel.apply(this, arguments);
    };
  }

  if (typeof fieldworkHTML === 'function' && typeof investigationActionsForCase === 'function' && typeof runFieldAction === 'function') {
    const PREFIX = 'ca_case_logic_v2_';
    let cache = null, cacheCaseId = null;

    const isEnabled = () => !!(CASE && CASE.deductions && CASE.deductions.enabled && Array.isArray(CASE.deductions.items));
    const phaseCfg = () => CASE && CASE.phases && CASE.phases.enabled ? CASE.phases : null;
    const initialPhase = () => {
      const c = phaseCfg();
      if(!c) return null;
      return String(c.initial || (Array.isArray(c.order) && c.order[0]) || '');
    };
    const key = () => CASE && CASE.id ? PREFIX + CASE.id : null;
    const load = () => {
      if(!isEnabled()) return { solved:new Set(), phase:null };
      if(cache && cacheCaseId === CASE.id) return cache;
      let raw = null;
      try { raw = JSON.parse(localStorage.getItem(key()) || 'null'); } catch(_) {}
      cache = { solved:new Set(raw && Array.isArray(raw.solved) ? raw.solved : []), phase:(raw && raw.phase) ? String(raw.phase) : initialPhase() };
      cacheCaseId = CASE.id;
      return cache;
    };
    const save = () => {
      if(!isEnabled()) return;
      const s = load();
      try { localStorage.setItem(key(), JSON.stringify({ solved:[...s.solved], phase:s.phase || null })); } catch(_) {}
    };
    const solved = id => !!id && isEnabled() && load().solved.has(String(id));
    const currentPhase = () => isEnabled() ? (load().phase || initialPhase()) : null;
    const phaseIndex = id => {
      const c = phaseCfg();
      return c && Array.isArray(c.order) ? c.order.indexOf(String(id)) : -1;
    };
    const phaseVisible = item => {
      const c = phaseCfg();
      if(!c || !item) return true;
      const now = currentPhase();
      if(Array.isArray(item.phases) && item.phases.length) return item.phases.map(String).includes(String(now));
      if(item.phase) return String(item.phase) === String(now);
      if(item.minPhase){
        const a = phaseIndex(now), b = phaseIndex(item.minPhase);
        return a >= 0 && b >= 0 ? a >= b : true;
      }
      return true;
    };
    const evidenceOk = item => (Array.isArray(item && item.requires) ? item.requires : []).every(id => game && game.collected && game.collected.has(id));
    const actionsOk = item => (Array.isArray(item && item.requiresActions) ? item.requiresActions : []).every(id => game && game.investigationActionsDone && game.investigationActionsDone.has(id));
    const deductionsOk = item => (Array.isArray(item && item.requiresDeductions) ? item.requiresDeductions : []).every(solved);
    const requirementsOk = item => evidenceOk(item) && actionsOk(item) && deductionsOk(item);
    const esc = v => { try { return typeof escapeHTML === 'function' ? escapeHTML(v) : String(v == null ? '' : v); } catch(_) { return String(v == null ? '' : v); } };

    const visibleDeductions = () => {
      if(!isEnabled()) return [];
      return CASE.deductions.items.filter(d => d && d.id && (solved(d.id) || (phaseVisible(d) && requirementsOk(d))));
    };

    const deductionHTML = () => {
      if(!isEnabled()) return '';
      const items = visibleDeductions();
      if(!items.length) return '';
      const c = phaseCfg(), p = currentPhase();
      const phaseLabel = c && c.labels && c.labels[p] ? c.labels[p] : '';
      const cards = items.map(d => {
        if(solved(d.id)) return `<div class="evidence-card found" style="cursor:default"><div class="ev-top"><span class="tag mono">استنتاج</span><span class="mono dim">✓ تم</span></div><h3 style="margin:8px 0 6px">${esc(d.label || 'استنتاج')}</h3><p class="dim" style="margin:0">${esc(d.solvedText || d.successText || 'تم تثبيت الاستنتاج.')}</p></div>`;
        const opts = (d.options || []).map(o => `<button class="q-btn" data-deduction-id="${esc(d.id)}" data-deduction-option="${esc(o.id)}">${esc(o.text)}</button>`).join('');
        return `<div class="evidence-card" style="cursor:default;border-color:var(--signal)"><div class="ev-top"><span class="tag mono">🧠 استنتاج متاح</span><span class="mono dim">حلّل الخيوط</span></div><h3 style="margin:8px 0 6px">${esc(d.label || 'استنتاج')}</h3><p style="margin:0 0 12px">${esc(d.question || 'إيه الاستنتاج الأقوى؟')}</p><div class="q-grid">${opts}</div></div>`;
      }).join('');
      return `<div class="divider"></div><div class="deductions-section"><h2 style="margin-bottom:4px">🧠 استنتاجات المحقق</h2>${phaseLabel ? `<div class="tag mono" style="margin-bottom:10px">المرحلة الحالية: ${esc(phaseLabel)}</div>` : ''}<p class="dim">الاستنتاج الصح هو اللي يفتح مسار التحقيق اللي بعده.</p><div class="evidence-grid">${cards}</div></div>`;
    };

    const baseActions = investigationActionsForCase;
    investigationActionsForCase = function(){
      const all = baseActions.apply(this, arguments) || [];
      return !isEnabled() ? all : all.filter(a => phaseVisible(a) && deductionsOk(a));
    };

    const baseFieldwork = fieldworkHTML;
    fieldworkHTML = function(){
      const html = baseFieldwork.apply(this, arguments);
      return !isEnabled() ? html : html + deductionHTML();
    };

    const baseRun = runFieldAction;
    runFieldAction = function(actionId){
      if(isEnabled()){
        const action = (baseActions.apply(this, []) || []).find(a => a && a.id === actionId);
        if(action && (!phaseVisible(action) || !deductionsOk(action))){
          if(typeof showToast === 'function') showToast('لسه محتاج تثبت خيط سابق قبل الإجراء ده.', 'danger');
          return;
        }
      }
      return baseRun.apply(this, arguments);
    };

    if(typeof interrogationQuestionVisible === 'function'){
      const baseQ = interrogationQuestionVisible;
      interrogationQuestionVisible = function(s, item, idx){
        const ok = baseQ.apply(this, arguments);
        return (!ok || !isEnabled()) ? ok : phaseVisible(item) && deductionsOk(item);
      };
    }

    if(typeof orderedSuspects === 'function'){
      const baseOrderedSuspects = orderedSuspects;
      orderedSuspects = function(){
        const all = baseOrderedSuspects.apply(this, arguments) || [];
        if(!isEnabled()) return all;
        return all.filter(s => !s || !s.hiddenUntilDeduction || solved(s.hiddenUntilDeduction));
      };
    }

    if(typeof clearLocalProgress === 'function'){
      const baseClear = clearLocalProgress;
      clearLocalProgress = function(caseId){
        const out = baseClear.apply(this, arguments);
        try { localStorage.removeItem(PREFIX + caseId); localStorage.removeItem('ca_case_logic_v1_' + caseId); } catch(_) {}
        if(CASE && CASE.id === caseId){ cache = null; cacheCaseId = null; }
        return out;
      };
    }

    function solveDeduction(id, optionId){
      if(!isEnabled()) return;
      const d = CASE.deductions.items.find(x => x && String(x.id) === String(id));
      if(!d || solved(id) || !phaseVisible(d) || !requirementsOk(d)) return;
      if(String(optionId) !== String(d.correctOptionId)){
        try { gaTrack('deduction_attempt', { deduction_id:String(id), correct:'no' }); } catch(_) {}
        if(typeof showToast === 'function') showToast(d.wrongText || 'الاستنتاج ده مش راكب على كل الأدلة. راجع الخيوط.', 'danger');
        return;
      }
      const s = load();
      s.solved.add(String(id));
      if(d.unlockPhase) s.phase = String(d.unlockPhase);
      save();
      (d.resultEvidenceIds || []).forEach(evId => { try { if(typeof collect === 'function') collect(evId); } catch(_) {} });
      try { gaTrack('deduction_solved', { deduction_id:String(id), unlock_phase:String(d.unlockPhase || '') }); } catch(_) {}
      if(typeof addScore === 'function' && d.score !== 0){ try { addScore(d.score != null ? Number(d.score) : 6, 'استنتاج صحيح: ' + (d.label || id), {silent:true}); } catch(_) {} }
      try { if(typeof persistProgress === 'function') persistProgress(); } catch(_) {}
      if(typeof triggerFlash === 'function') try { triggerFlash('good'); } catch(_) {}
      if(typeof showToast === 'function') showToast(d.successText || '🧠 استنتاج صحيح — اتفتح خيط جديد.', 'amber');
      if(game) game.screen = 'fieldwork';
      if(typeof render === 'function') render();
    }

    document.addEventListener('click', e => {
      const b = e.target && e.target.closest ? e.target.closest('[data-deduction-id][data-deduction-option]') : null;
      if(!b) return;
      e.preventDefault();
      solveDeduction(b.dataset.deductionId, b.dataset.deductionOption);
    });

    window.TarafCaseLogic = { isEnabled, solved, currentPhase, phaseVisible, requirementsOk, solveDeduction };
  }

  /* ============================================================
     Registry للقضايا الحصرية. كل قضية لها Hash مستقل وكود reusable.
     ============================================================ */
  const EXCLUSIVE_CASES = {
    'return-from-death': { expectedHash:'4045aa5c' },
    'final-exit': { expectedHash:'00771648' },
  };

  function codeHash(value){
    let h = 0x811c9dc5;
    const s = String(value || '').trim().toUpperCase();
    for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8,'0');
  }

  function exclusiveCfg(caseId){ return EXCLUSIVE_CASES[String(caseId || '')] || null; }
  function accessKey(caseId){ return 'ca_exclusive_access_' + String(caseId || ''); }
  function hasExclusiveAccess(caseId){
    const id = String(caseId || 'return-from-death');
    if(!exclusiveCfg(id)) return true;
    try { return localStorage.getItem(accessKey(id)) === '1'; } catch(_) { return false; }
  }
  function unlockExclusive(caseId, code){
    let id = String(caseId || '');
    let value = code;
    if(arguments.length === 1){ value = caseId; id = 'return-from-death'; }
    const cfg = exclusiveCfg(id);
    const ok = !!cfg && codeHash(value) === cfg.expectedHash;
    if(ok){
      try { localStorage.setItem(accessKey(id), '1'); } catch(_) {}
      try { gaTrack('exclusive_case_unlocked', { exclusive_case_id:id }); } catch(_) {}
    }
    return ok;
  }

  if(typeof isCaseLocked === 'function'){
    const baseLocked = isCaseLocked;
    isCaseLocked = function(c){
      if(c && exclusiveCfg(c.id) && !hasExclusiveAccess(c.id)) return { locked:true, reason:'telegram-exclusive' };
      return baseLocked.apply(this, arguments);
    };
  }

  function accessModal(caseData){
    if(document.getElementById('exclusiveAccessOverlay')) return;
    if(!caseData || !exclusiveCfg(caseData.id)) return;
    if(typeof isCaseReady === 'function' && !isCaseReady(caseData)){
      if(typeof showToast === 'function') showToast('القضية لسه تحت التجهيز وهتتفتح بعد اكتمال الصور.', 'amber');
      return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'exclusiveAccessOverlay';
    overlay.innerHTML = `<div class="modal"><div class="tag mono">🔐 قضية حصرية</div><h3>${caseData.title || 'قضية حصرية لأعضاء القناة'}</h3><p>الكود موجود في رسالة القضية على قناة طرف الخيط. الكود مش بيتستهلك وينفع لكل أعضاء القناة.</p><input id="exclusiveAccessCode" class="lib-search-input" dir="ltr" autocomplete="off" placeholder="اكتب كود القضية" style="width:100%;margin:10px 0"><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="exclusiveAccessSubmit">فتح القضية</button><a class="btn ghost" href="https://t.me/taraf5eet" target="_blank" rel="noopener">افتح القناة</a><button class="btn ghost" id="exclusiveAccessClose">إلغاء</button></div></div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.addEventListener('click', e => { if(e.target === overlay) close(); });
    overlay.querySelector('#exclusiveAccessClose').addEventListener('click', close);
    overlay.querySelector('#exclusiveAccessSubmit').addEventListener('click', () => {
      const input = overlay.querySelector('#exclusiveAccessCode');
      if(!unlockExclusive(caseData.id, input.value)){
        if(typeof showToast === 'function') showToast('الكود غير صحيح. انسخه من رسالة القضية في القناة.', 'danger');
        input.select();
        return;
      }
      close();
      if(typeof showToast === 'function') showToast('✓ اتفتحت القضية على الجهاز ده.', 'amber');
      if(typeof showLibrary === 'function') showLibrary();
      if(typeof enterCase === 'function') enterCase(caseData);
    });
    setTimeout(() => { const i = overlay.querySelector('#exclusiveAccessCode'); if(i) i.focus(); }, 0);
  }

  document.addEventListener('click', e => {
    const card = e.target && e.target.closest ? e.target.closest('.lib-card[data-case]') : null;
    if(!card) return;
    const id = String(card.dataset.case || '');
    if(!exclusiveCfg(id) || hasExclusiveAccess(id)) return;
    const c = (typeof CASES_REGISTRY !== 'undefined' && CASES_REGISTRY.find) ? CASES_REGISTRY.find(x => x && x.id === id) : null;
    if(!c || (typeof isCaseReady === 'function' && !isCaseReady(c))) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    accessModal(c);
  }, true);

  function addEvidenceIfMissing(c, item){
    if(!c || !Array.isArray(c.evidence) || !item || !item.id) return;
    if(!c.evidence.some(e => e && e.id === item.id)) c.evidence.push(item);
  }

  function registerCase(c){
    if(!c || typeof CASES_REGISTRY === 'undefined') return;
    c.access = { type:'shared-code', source:'telegram', reusable:true };
    if(!CASES_REGISTRY.some(x => x && x.id === c.id)) CASES_REGISTRY.push(c);
    if(typeof showLibrary === 'function' && typeof app !== 'undefined' && app.view === 'library') showLibrary();
    try {
      const wanted = new URLSearchParams(location.search).get('case');
      if(wanted === c.id && typeof isCaseReady === 'function' && isCaseReady(c)){
        if(hasExclusiveAccess(c.id) && typeof enterCase === 'function') enterCase(c);
        else accessModal(c);
      }
    } catch(_) {}
  }

  function registerReturnFromDeath(){
    if(typeof CASE_RETURN_FROM_DEATH === 'undefined') return;
    const c = CASE_RETURN_FROM_DEATH;
    c.caseCharacters = [
      { id:'kareem', name:'كريم الدسوقي', role:'الضحية المعلنة / محور القضية', img:c.coverImg ? c.coverImg.replace('cover.jpg','kareem.jpg') : null },
      { id:'reda', name:'رضا النجار', role:'هوية تظهر أثناء التحقيق', hiddenUntilDeduction:'body_is_reda', img:c.coverImg ? c.coverImg.replace('cover.jpg','reda.jpg') : null },
    ];
    c.suspects = (c.suspects || []).filter(s => s && s.id !== 'kareem' && s.id !== 'reda');
    const noteAction = (c.investigationActions || []).find(a => a && a.id === 'rd_laptop_note');
    if(noteAction){ delete noteAction.phase; noteAction.minPhase = 'death'; }
    registerCase(c);
  }

  function registerFinalExit(){
    if(typeof CASE_FINAL_EXIT === 'undefined') return;
    const c = CASE_FINAL_EXIT;
    c.caseCharacters = [
      { id:'karim-final-exit', name:'كريم نادر مراد', role:'الضحية / مدير المراجعة الداخلية', img:IMG_BASE_FINAL_EXIT + 'victim-karim.jpg' },
      { id:'emad-final-exit', name:'عماد رجب', role:'فرد أمن / شاهد مهمة فتح الأرشيف', img:null },
    ];

    const hossam = (c.suspects || []).find(s => s && s.id === 'hossam');
    if(hossam) hossam.hiddenUntilDeduction = 'hossam_present';

    // شبكة الأعذار الأولى تخص الأربع شخصيات المعروفة؛ حسام يظهر لاحقًا كخيط جديد.
    if(c.alibiGridPuzzle && c.alibiGridPuzzle.suspectClaims){
      delete c.alibiGridPuzzle.suspectClaims.hossam;
    }

    addEvidenceIfMissing(c, { id:'sara_dispute', tag:'استجواب سارة', crit:false, title:'خلاف مهني مع كريم', img:null, short:'خلاف حول ملفات مشروع قديم', full:'سارة أقرت بخلاف مهني مع كريم بشأن طلب ملفات مشروع قديم وطريقة المراجعة.', unlocked:false, order:90 });
    addEvidenceIfMissing(c, { id:'sherif_shift', tag:'استجواب شريف', crit:false, title:'شريف مسؤول الوردية الليلية', img:null, short:'مسؤول عن الأمن والبوابات والكاميرات', full:'شريف كان مشرف الوردية الليلية ومسؤولًا عن متابعة البوابات والكاميرات وأفراد الأمن.', unlocked:false, order:91 });
    addEvidenceIfMissing(c, { id:'archive_permissions', tag:'استجواب شريف', crit:false, title:'صلاحيات الأرشيف بعد 22:00', img:null, short:'بطاقات الطوارئ تقدر تفتح بعد الوقت', full:'بعد الساعة 22:00 لا تعمل كل صلاحيات الموظفين العادية، وتستخدم بطاقات طوارئ الأمن عند الحاجة.', unlocked:false, order:92 });
    addEvidenceIfMissing(c, { id:'marwan_role', tag:'استجواب مروان', crit:false, title:'دور مروان الفني', img:null, short:'مسؤول تشغيل وصيانة ومتابعة المصاعد', full:'معرفة مروان بالنظام تمنحه قدرة تفسير فنية، لكنها لا تثبت استخدامه للنظام في الجريمة.', unlocked:false, order:93 });
    addEvidenceIfMissing(c, { id:'service_access_info', tag:'استجواب مروان', crit:false, title:'طرق تشغيل وضع الخدمة', img:null, short:'مفتاح محلي أو صلاحية فنية', full:'وضع الخدمة يمكن أن يظهر من تحكم محلي أو صلاحيات فنية، والسجل التفصيلي هو الذي يحدد المصدر.', unlocked:false, order:94 });
    addEvidenceIfMissing(c, { id:'laila_archive_request', tag:'استجواب ليلى', crit:false, title:'كريم طلب ملفات من الأرشيف', img:null, short:'طلب ملفات ARCH-19 خلال يوم الحادث', full:'ليلى أكدت أن كريم كان يطلب ملفات من الأرشيف خلال اليوم، ما يعطي سببًا طبيعيًا لنزوله إلى B2.', unlocked:false, order:95 });
    addEvidenceIfMissing(c, { id:'hossam_visit', tag:'استجواب حسام', crit:false, title:'حسام جاء لتسليم أوراق المشروع', img:null, short:'زيارة مرتبطة بعقد قديم', full:'حسام قال إنه حضر بصفته مندوبًا إداريًا لتسليم أوراق متابعة مرتبطة بالعقد القديم.', unlocked:false, order:96 });
    addEvidenceIfMissing(c, { id:'alibi_grid_ready', tag:'مسار التحقيق', crit:false, title:'شبكة الأعذار أصبحت متاحة', img:null, short:'الأدلة كفت لمقارنة مواقع المشتبهين الأربعة', full:'بعد فهم نمط المستندات أصبح من المنطقي اختبار أماكن المشتبهين في الأوقات الحرجة.', unlocked:false, unlocksAlibiGrid:true, order:97 });
    addEvidenceIfMissing(c, { id:'timeline_ready', tag:'مسار التحقيق', crit:false, title:'إعادة بناء الخط الزمني أصبحت متاحة', img:null, short:'اتضح صاحب سجل الخروج ويمكن الآن ترتيب الأحداث التقنية', full:'بعد تحديد من استخدم بطاقة كريم أصبح ممكنًا ترتيب الأحداث بدون خلط حركة البطاقة بحركة صاحبها.', unlocked:false, unlocksTimeline:true, order:98 });

    const documentScheme = c.deductions && c.deductions.items && c.deductions.items.find(d => d && d.id === 'document_scheme');
    if(documentScheme){
      const ids = new Set(documentScheme.resultEvidenceIds || []);
      ids.add('alibi_grid_ready');
      documentScheme.resultEvidenceIds = [...ids];
    }
    const sherifUsed = c.deductions && c.deductions.items && c.deductions.items.find(d => d && d.id === 'sherif_used_card');
    if(sherifUsed){
      const ids = new Set(sherifUsed.resultEvidenceIds || []);
      ids.add('fake_exit_confirmed');
      ids.add('timeline_ready');
      sherifUsed.resultEvidenceIds = [...ids];
    }

    registerCase(c);
  }

  function loadCaseScript(src, onload, label){
    const s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    s.onerror = () => { try { console.error('Failed to load exclusive case: ' + label); } catch(_) {} };
    document.head.appendChild(s);
  }

  if(typeof CASE_RETURN_FROM_DEATH !== 'undefined') registerReturnFromDeath();
  else loadCaseScript('cases/case-return-from-death.js?v=20260825-1', registerReturnFromDeath, 'return-from-death');

  if(typeof CASE_FINAL_EXIT !== 'undefined') registerFinalExit();
  else loadCaseScript('cases/case-final-exit.js?v=20260825-1', registerFinalExit, 'final-exit');

  window.TarafExclusiveCases = {
    hasExclusiveAccess,
    unlockExclusive,
    openAccessModal:accessModal,
    isExclusiveCase: id => !!exclusiveCfg(id),
    configuredCaseIds: Object.keys(EXCLUSIVE_CASES),
  };
  window.__TARAF_THEORY_BUILDER_SAFETY_FIX__ = {
    version:'2026-08-25-v6',
    wrongAccusationSkipsTheory:true,
    phasedDeductions:true,
    exclusiveSharedCode:true,
    multiExclusiveRegistry:true,
    phasedSuspectReveal:true,
    gatedTimelineAndAlibi:true,
    dynamicReturnFromDeath:true,
    dynamicFinalExit:true,
    blocksEntryUntilReady:true,
  };
})();