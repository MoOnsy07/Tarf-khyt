(() => {
  'use strict';

  const CASE = window.V2_CASE;
  if (!CASE) throw new Error('V2_CASE is missing');

  const SAVE_KEY = `taraf_v2_${CASE.id}`;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const clone = obj => JSON.parse(JSON.stringify(obj));
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); }
    catch { return null; }
  })();

  const state = Object.assign(clone(CASE.initialState), saved || {});
  state.visited = Array.isArray(state.visited) ? state.visited : [];
  state.evidence = Array.isArray(state.evidence) ? state.evidence : [];
  state.completedActions = Array.isArray(state.completedActions) ? state.completedActions : [];
  state.boardPositions = state.boardPositions && typeof state.boardPositions === 'object' ? state.boardPositions : {};

  let activeHotspotId = null;
  let toastTimer = null;

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
    catch {}
  }

  function has(flag) {
    return Boolean(state[flag]);
  }

  function meets(requirements = []) {
    return requirements.every(has);
  }

  function markVisited(id) {
    if (!state.visited.includes(id)) state.visited.push(id);
    save();
  }

  function addEvidence(id) {
    if (!id || state.evidence.includes(id)) return false;
    state.evidence.push(id);
    save();
    updateEvidenceCount();
    return true;
  }

  function toast(text) {
    const el = $('#toast');
    clearTimeout(toastTimer);
    el.textContent = text;
    el.classList.add('show');
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('hidden');
    el.setAttribute('aria-hidden', 'false');
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    el.setAttribute('aria-hidden', 'true');
  }

  function updateEvidenceCount() {
    $('#evidenceCount').textContent = String(state.evidence.length);
  }

  function renderHotspots() {
    const layer = $('#hotspotsLayer');
    layer.innerHTML = '';
    CASE.scene.hotspots.forEach(h => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hotspot';
      btn.dataset.hotspot = h.id;
      btn.setAttribute('aria-label', `فحص ${h.title}`);
      btn.style.left = `${h.area.x}%`;
      btn.style.top = `${h.area.y}%`;
      btn.style.width = `${h.area.w}%`;
      btn.style.height = `${h.area.h}%`;
      if (state.visited.includes(h.id)) btn.classList.add('visited');
      btn.addEventListener('click', () => inspectHotspot(h.id));
      layer.appendChild(btn);
    });
  }

  function inspectHotspot(id) {
    const h = CASE.scene.hotspots.find(x => x.id === id);
    if (!h) return;
    activeHotspotId = id;
    markVisited(id);
    renderHotspots();

    $('#inspectTitle').textContent = h.title;
    $('#inspectDesc').textContent = h.description;
    $('#inspectVisual').innerHTML = `<div class="visual-mark" aria-hidden="true">${h.icon || '•'}</div>`;

    const details = $('#inspectDetails');
    details.innerHTML = '';
    h.details.forEach(text => {
      const row = document.createElement('div');
      row.className = 'detail-row';
      row.textContent = text;
      details.appendChild(row);
    });

    renderActions(h);
    openOverlay('inspector');
    $('#sceneHint').style.opacity = '0';
  }

  function renderActions(h) {
    const wrap = $('#inspectActions');
    wrap.innerHTML = '';

    h.actions.forEach(action => {
      const done = state.completedActions.includes(action.id);
      const allowed = meets(action.requires || []);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `action-btn${!done && allowed ? ' primary' : ''}`;
      btn.disabled = done || !allowed;
      btn.textContent = done ? `${action.label} ✓` : action.label;
      if (!allowed && !done) btn.title = 'لسه ناقصك شيء في مسرح التحقيق';
      btn.addEventListener('click', () => runAction(h, action));
      wrap.appendChild(btn);
    });
  }

  function runAction(h, action) {
    if (state.completedActions.includes(action.id) || !meets(action.requires || [])) return;

    state.completedActions.push(action.id);
    Object.entries(action.set || {}).forEach(([key, value]) => { state[key] = value; });
    const isNewEvidence = addEvidence(action.evidence);
    save();

    $('#contextText').textContent = action.result;
    toast(isNewEvidence ? 'اتضاف دليل جديد لحافظتك.' : 'تم تسجيل الإجراء.');
    evaluateWorld();
    renderActions(h);
    renderInventory();
    renderBoard();
  }

  function evaluateWorld() {
    const hasShoulderObservation = state.evidence.includes('shoulder-note');
    const hasMedicalRecord = state.evidence.includes('nabil-shoulder-record');

    if (hasShoulderObservation && hasMedicalRecord && !state.identityDoubtTriggered) {
      state.identityDoubtTriggered = true;
      $('#objectiveText').textContent = 'في تناقض مادي في هوية الجثمان. اجمع قرائن مستقلة قبل ما تبني استنتاجك.';
      $('#contextText').textContent = 'السجل الطبي يقول إن نبيل عنده تثبيت معدني واضح في الكتف. فحص الجثمان لم يُظهره. ده تناقض، مش حكم نهائي.';
      toast('الهدف اتغيّر: عندك تناقض لازم تثبته، مش إجابة جاهزة.');
      save();
      return;
    }

    if (state.identityDoubtTriggered) {
      $('#objectiveText').textContent = 'في تناقض مادي في هوية الجثمان. اجمع قرائن مستقلة قبل ما تبني استنتاجك.';
    }
  }

  function renderInventory() {
    const list = $('#inventoryList');
    list.innerHTML = '';

    if (!state.evidence.length) {
      list.innerHTML = '<div class="detail-row">لسه ماجمعتش أدلة. ارجع للمشهد وافحصه بنفسك.</div>';
      return;
    }

    state.evidence.forEach(id => {
      const ev = CASE.evidence[id];
      if (!ev) return;
      const card = document.createElement('article');
      card.className = 'evidence-card';
      const title = document.createElement('strong');
      title.textContent = ev.title;
      const summary = document.createElement('p');
      summary.textContent = ev.summary;
      card.append(title, summary);
      list.appendChild(card);
    });
  }

  function defaultBoardPosition(index) {
    const columns = 3;
    const col = index % columns;
    const row = Math.floor(index / columns);
    return { x: 18 + col * 185, y: 18 + row * 100 };
  }

  function renderBoard() {
    const board = $('#board');
    board.innerHTML = '';

    if (!state.evidence.length) {
      const empty = document.createElement('div');
      empty.className = 'detail-row';
      empty.style.margin = '18px';
      empty.textContent = 'أي دليل تجمعه هيظهر هنا كبطاقة تقدر تحركها وترتبها.';
      board.appendChild(empty);
      return;
    }

    state.evidence.forEach((id, index) => {
      const ev = CASE.evidence[id];
      if (!ev) return;
      const card = document.createElement('div');
      card.className = 'board-card';
      card.dataset.evidence = id;
      card.innerHTML = `<b></b><span>اسحبني على اللوحة</span>`;
      $('b', card).textContent = ev.title;

      const pos = state.boardPositions[id] || defaultBoardPosition(index);
      card.style.left = `${pos.x}px`;
      card.style.top = `${pos.y}px`;
      enableDrag(card, board, id);
      board.appendChild(card);
    });
  }

  function enableDrag(card, board, id) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const move = e => {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      const rect = board.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      let x = p.clientX - rect.left - offsetX;
      let y = p.clientY - rect.top - offsetY;
      x = Math.max(0, Math.min(x, rect.width - cardRect.width));
      y = Math.max(0, Math.min(y, rect.height - cardRect.height));
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      state.boardPositions[id] = { x, y };
    };

    const end = () => {
      if (!dragging) return;
      dragging = false;
      save();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', end);
    };

    card.addEventListener('pointerdown', e => {
      dragging = true;
      const rect = card.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      card.setPointerCapture?.(e.pointerId);
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', end);
    });
  }

  function pulseHotspots() {
    const buttons = $$('.hotspot');
    buttons.forEach(b => b.classList.remove('pulse'));
    void $('#hotspotsLayer').offsetWidth;
    buttons.forEach(b => b.classList.add('pulse'));
    $('#contextText').textContent = 'النظرة السريعة بتلمّح مناطق قابلة للفحص فقط؛ مش معناها إن كل منطقة فيها دليل.';
  }

  function resetBoard() {
    state.boardPositions = {};
    save();
    renderBoard();
  }

  function wireUI() {
    $('#sceneTitle').textContent = CASE.scene.title;
    $('#objectiveText').textContent = CASE.scene.objective;
    $('#btnInventory').addEventListener('click', () => { renderInventory(); openOverlay('inventory'); });
    $('#btnNotebook').addEventListener('click', () => { renderBoard(); openOverlay('notebook'); });
    $('#btnPulse').addEventListener('click', pulseHotspots);
    $('#btnClearBoard').addEventListener('click', resetBoard);

    $$('[data-close]').forEach(btn => btn.addEventListener('click', () => closeOverlay(btn.dataset.close)));
    $$('.overlay').forEach(overlay => overlay.addEventListener('click', e => {
      if (e.target === overlay) closeOverlay(overlay.id);
    }));
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      $$('.overlay:not(.hidden)').forEach(el => closeOverlay(el.id));
    });
  }

  wireUI();
  updateEvidenceCount();
  renderHotspots();
  renderInventory();
  renderBoard();
  evaluateWorld();
})();