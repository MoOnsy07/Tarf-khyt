/* ============================================================
   طرف الخيط — الاكتشافات التفاعلية المكتوبة
   نظام عام اختياري: كل قضية تقدر تعرف discoveryLocks متعددة.
   اللاعب يستخرج المفتاح من الأدلة/الاستجواب ويكتبه بنفسه؛
   النجاح يفتح أدلة حقيقية داخل القضية، بدون أسئلة اختيارية.
   ============================================================ */
(() => {
  'use strict';

  if (typeof renderTabs !== 'function' || typeof renderPanel !== 'function') return;

  const baseRenderTabs = renderTabs;
  const baseRenderPanel = renderPanel;

  function normalizeDiscoveryAnswer(value){
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    return String(value == null ? '' : value)
      .trim()
      .toLowerCase()
      .replace(/[٠-٩]/g, d => String(arabicDigits.indexOf(d)))
      .replace(/[ًٌٍَُِّْـ]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[^a-z0-9\u0621-\u064a]/g, '');
  }

  function discoveryLocks(){
    return CASE && Array.isArray(CASE.discoveryLocks) ? CASE.discoveryLocks : [];
  }

  function discoverySolved(lock){
    const ids = lock && Array.isArray(lock.resultEvidenceIds) ? lock.resultEvidenceIds : [];
    return ids.length > 0 && ids.every(id => game.collected.has(id));
  }

  function discoveryUnlocked(lock){
    return (lock.requires || []).every(id => game.collected.has(id));
  }

  function discoveryCardHTML(lock){
    const solved = discoverySolved(lock);
    const unlocked = discoveryUnlocked(lock);
    const state = solved ? 'مفتوح ✓' : (unlocked ? 'جاهز للفحص' : 'الخيط ناقص');
    const image = lock.image ? `
      <div style="margin:12px 0;overflow:hidden;border:1px solid var(--line);border-radius:10px;">
        <img src="${escapeHTML(lock.image)}" alt="${escapeHTML(lock.imageAlt || lock.label || 'دليل بصري')}" style="display:block;width:100%;max-height:380px;object-fit:cover;">
      </div>` : '';

    if(solved){
      return `
        <div class="evidence-card found" style="cursor:default;">
          <div class="ev-top"><span class="tag mono">${escapeHTML(lock.kind || 'اكتشاف')}</span><span class="mono dim">${state}</span></div>
          <h3 style="margin:8px 0 6px;">${escapeHTML(lock.label || 'اكتشاف')}</h3>
          ${image}
          <p class="dim">${escapeHTML(lock.resultText || 'تم فتح الخيط بنجاح وظهر دليل جديد.')}</p>
        </div>`;
    }

    if(!unlocked){
      return `
        <div class="evidence-card" style="cursor:default;opacity:.72;">
          <div class="ev-top"><span class="tag mono">${escapeHTML(lock.kind || 'اكتشاف')}</span><span class="mono dim">${state}</span></div>
          <h3 style="margin:8px 0 6px;">${escapeHTML(lock.label || 'اكتشاف')}</h3>
          <p class="dim">${escapeHTML(lock.lockedText || 'لسه ماعندكش الخيط الكافي للتعامل مع الحاجة دي.')}</p>
        </div>`;
    }

    const mode = lock.inputMode === 'numeric' ? 'numeric' : 'text';
    const max = Number(lock.maxLength || 40);
    return `
      <div class="evidence-card" style="cursor:default;">
        <div class="ev-top"><span class="tag mono">${escapeHTML(lock.kind || 'اكتشاف')}</span><span class="mono dim">${state}</span></div>
        <h3 style="margin:8px 0 6px;">${escapeHTML(lock.label || 'اكتشاف')}</h3>
        ${image}
        <p class="dim" style="margin-bottom:12px;">${escapeHTML(lock.introText || '')}</p>
        <input
          data-discovery-input="${escapeHTML(lock.id)}"
          inputmode="${mode}"
          autocomplete="off"
          maxlength="${max}"
          placeholder="${escapeHTML(lock.placeholder || 'اكتب اللي استنتجته...')}"
          style="width:100%;max-width:420px;padding:12px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);border-radius:8px;"
        >
        <div><button class="btn" data-discovery-submit="${escapeHTML(lock.id)}" style="margin-top:12px;">جرّب</button></div>
        <div class="wave-feedback" data-discovery-feedback="${escapeHTML(lock.id)}"></div>
      </div>`;
  }

  function discoveriesHTML(){
    const locks = discoveryLocks();
    return `
      <h2>${escapeHTML(CASE.discoveryTabLabel || 'اكتشافات')}</h2>
      <p class="dim">هنا مفيش اختيارات جاهزة. استخدم التفاصيل اللي لقيتها في الاستجواب والأدلة، واكتب المفتاح بنفسك عشان تفتح الحاجة أو توصل للملف.</p>
      <div class="divider"></div>
      <div style="display:grid;gap:12px;">${locks.map(discoveryCardHTML).join('')}</div>`;
  }

  function submitDiscovery(lockId){
    const lock = discoveryLocks().find(x => x && x.id === lockId);
    if(!lock || !discoveryUnlocked(lock) || discoverySolved(lock)) return;

    const input = document.querySelector(`[data-discovery-input="${CSS.escape(lockId)}"]`);
    const fb = document.querySelector(`[data-discovery-feedback="${CSS.escape(lockId)}"]`);
    const value = normalizeDiscoveryAnswer(input ? input.value : '');
    const accepted = (lock.acceptedAnswers || []).map(normalizeDiscoveryAnswer).filter(Boolean);

    if(value && accepted.includes(value)){
      (lock.resultEvidenceIds || []).forEach(id => collect(id));
      persistProgress();
      try{ gaTrack('discovery_lock_solved', { discovery_id: lock.id }); }catch(_){}
      if(fb){
        fb.textContent = '✓ ' + (lock.successText || 'اتفتح. ظهر خيط جديد في القضية.');
        fb.className = 'wave-feedback ok';
      }
      setTimeout(() => render(), 650);
    }else{
      if(fb){
        fb.textContent = lock.wrongMsg || '✗ مش ده المفتاح. راجع التفاصيل اللي جمعتها.';
        fb.className = 'wave-feedback bad';
      }
      try{ gaTrack('discovery_lock_attempt', { discovery_id: lock.id }); }catch(_){}
    }
  }

  function bindDiscoveryEvents(){
    document.querySelectorAll('[data-discovery-submit]').forEach(btn => {
      btn.addEventListener('click', () => submitDiscovery(btn.dataset.discoverySubmit));
    });
    document.querySelectorAll('[data-discovery-input]').forEach(input => {
      input.addEventListener('keydown', e => {
        if(e.key === 'Enter') submitDiscovery(input.dataset.discoveryInput);
      });
    });
  }

  renderTabs = function(){
    baseRenderTabs();
    if(!discoveryLocks().length) return;
    const tabsEl = document.getElementById('tabs');
    if(!tabsEl || tabsEl.querySelector('[data-tab="discoveries"]')) return;

    const btn = document.createElement('button');
    btn.className = 'tab' + (game.screen === 'discoveries' ? ' active' : '');
    btn.dataset.tab = 'discoveries';
    btn.textContent = CASE.discoveryTabLabel || 'اكتشافات';
    btn.addEventListener('click', () => { game.screen = 'discoveries'; render(); });

    const accusation = tabsEl.querySelector('[data-tab="accusation"]');
    if(accusation) tabsEl.insertBefore(btn, accusation);
    else tabsEl.appendChild(btn);
  };

  renderPanel = function(){
    if(game && game.screen === 'discoveries' && discoveryLocks().length){
      const el = document.getElementById('panelBody');
      if(!el) return;
      el.innerHTML = discoveriesHTML();
      bindDiscoveryEvents();
      return;
    }
    baseRenderPanel();
  };
})();
