(() => {
  'use strict';

  const LS = window.LAST_SEEN_ASSETS || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const ART = {
    'incoming-file': LS.blankSurveillanceNoise,
    'trace-result': LS.blankSurveillanceNoise,
    'delete-confirmed': LS.blankSurveillanceNoise,
    'file-returned': LS.blankSurveillanceNoise,
    'identity': LS.blankSurveillanceNoise,
    'adam-intro': LS.blankSurveillanceNoise,
    'morning-arrival': LS.apartmentHallway,
    'apartment-search': LS.apartmentInteriorDesk,
    'police-arrival': LS.policeCorridor,
    'observer-appearance': LS.apartmentHallway,
    'observer-hint': LS.apartmentHallway,
    'observer-response': LS.blankSurveillanceNoise,
    'mariam-lead': LS.policeCorridor,
    'mariam-interrogation': LS.policeCorridor,
    'bluff-slip': LS.policeCorridor,
    'camera-confrontation': LS.policeCorridor,
    'live-test-intro': LS.darkRoomCaptive,
    'light-choice': LS.darkRoomCaptive,
    'video-forensics': LS.darkRoomCaptive,
    'observer-warning': LS.darkRoomCaptive,
    'observer-insider': LS.darkRoomCaptive,
    'adam-call-intro': LS.blankSurveillanceNoise,
    'adam-call-choice': LS.blankSurveillanceNoise,
    'twin-reveal': LS.oldPhotographTwins,
    'mariam-choice': LS.policeCorridor,
    'mariam-explains': LS.policeCorridor,
    'mariam-pressure-result': LS.policeCorridor,
    'locating-adam': LS.nightDriveIndustrial,
    'location-traced': LS.nightDriveIndustrial,
    'location-observer': LS.nightDriveIndustrial,
    'location-deduced': LS.nightDriveIndustrial,
    'approach-adam': LS.nightDriveIndustrial,
    'night-drive': LS.nightDriveIndustrial,
    'adam-found': LS.industrialBuildingInterior,
    'fake-close': LS.industrialBuildingInterior,
    'fake-library': LS.blankSurveillanceNoise,
    'case-return': LS.industrialBuildingInterior,
    'adam-confrontation': LS.industrialBuildingInterior,
    'project-truth': LS.industrialBuildingInterior,
    'participant17': LS.industrialBuildingInterior,
    'adam-subject-choice': LS.industrialBuildingInterior,
    'adam-betrayal': LS.industrialBuildingInterior,
    'yara-reveal': LS.neutralMeetingRoom,
    'yara-adam-choice': LS.neutralMeetingRoom,
    'half-truths': LS.neutralMeetingRoom,
    'mariam-epilogue': LS.policeCorridor,
    'profile-intro': LS.blankSurveillanceNoise,
    'numbers-pattern-reveal': LS.blankSurveillanceNoise,
    'player-profile': LS.blankSurveillanceNoise,
    'trust-test-intro': LS.threeLiveFeeds,
    'trust-test': LS.threeLiveFeeds,
    'prediction-correct': LS.threeLiveFeeds,
    'prediction-deviation': LS.threeLiveFeeds,
    'prediction-mariam': LS.threeLiveFeeds,
    'prediction-error': LS.threeLiveFeeds,
    'backup-copy': LS.evidenceBackupDrive,
    'final-system-gate': LS.serverCoreRoom,
    'perfect-subject-lock': LS.serverCoreRoom,
    'final-choice': LS.serverCoreRoom,
    'ending-buried-truth': LS.endingBuriedTruth,
    'ending-keep-online': LS.endingKeepOnline,
    'ending-cut-thread': LS.endingCutThread,
    'ending-perfect-subject': LS.endingPerfectSubject,
    'ending-unpredictable': LS.endingUnpredictable
  };

  const runtime = {
    layer: 0,
    currentArt: '',
    currentNode: '',
    lastBeatText: '',
    audio: null,
    ambient: null,
    audioOn: localStorage.getItem('taraf_story_audio') !== 'off',
    lastHover: 0
  };

  function ensureBackdrop(){
    if($('#cinematicBackdrop')) return;
    const wrap = document.createElement('div');
    wrap.id = 'cinematicBackdrop';
    wrap.className = 'cinematic-backdrop';
    wrap.setAttribute('aria-hidden','true');
    wrap.innerHTML = '<div class="cinematic-layer active"></div><div class="cinematic-layer"></div><div class="cinematic-shade"></div><div class="cinematic-grain"></div><div class="cinematic-scan"></div>';
    const app = $('#storyApp');
    app?.insertBefore(wrap, app.firstChild);
  }

  function cssSceneArt(){
    const raw = getComputedStyle(document.body).getPropertyValue('--scene-art').trim();
    const match = raw.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : '';
  }

  function investigationArt(){
    const el = $('#sceneImage');
    if(!el) return '';
    const raw = getComputedStyle(el).backgroundImage || el.style.backgroundImage || '';
    const matches = [...raw.matchAll(/url\(["']?(.*?)["']?\)/g)];
    return matches.length ? matches[matches.length - 1][1] : '';
  }

  function resolveArt(nodeId, type){
    if(type === 'investigation') return investigationArt() || ART[nodeId] || cssSceneArt();
    return ART[nodeId] || cssSceneArt() || '';
  }

  function setBackdrop(url, nodeId){
    ensureBackdrop();
    if(!url || url === runtime.currentArt) return;
    runtime.currentArt = url;
    runtime.layer = runtime.layer ? 0 : 1;
    const layers = $$('.cinematic-layer');
    const next = layers[runtime.layer];
    const old = layers[runtime.layer ? 0 : 1];
    if(!next) return;
    const variant = Math.abs(hash(nodeId || url)) % 3;
    next.classList.remove('pan-b','pan-c');
    if(variant === 1) next.classList.add('pan-b');
    if(variant === 2) next.classList.add('pan-c');
    next.style.backgroundImage = `url("${url}")`;
    requestAnimationFrame(() => {
      next.classList.add('active');
      old?.classList.remove('active');
    });
  }

  function hash(str=''){
    let h = 0;
    for(let i=0;i<str.length;i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return h;
  }

  function refreshMood(){
    const node = document.body.dataset.node || '';
    const type = document.body.dataset.type || '';
    document.body.classList.toggle('cinematic-system', type === 'system' || node.includes('profile') || node.includes('trust-test'));
    document.body.classList.toggle('cinematic-danger', node.includes('ending-perfect') || node.includes('file-returned') || node.includes('perfect-subject'));
    const art = resolveArt(node, type);
    setBackdrop(art, node);
    if(node !== runtime.currentNode){
      runtime.currentNode = node;
      hit(node.includes('ending-') ? 'deep' : type === 'system' ? 'system' : 'soft');
    }
    enhanceChoices();
    enhanceBeat();
  }

  function enhanceChoices(){
    const buttons = $$('.choice-btn');
    buttons.forEach((btn, index) => {
      if(btn.dataset.cinematicEnhanced === '1') return;
      btn.dataset.cinematicEnhanced = '1';
      btn.dataset.shortcut = String(index + 1);
      const badge = document.createElement('span');
      badge.className = 'choice-key';
      badge.textContent = String(index + 1).padStart(2,'0');
      btn.prepend(badge);
      btn.addEventListener('pointerenter', () => {
        const t = performance.now();
        if(t - runtime.lastHover > 90){ tone('hover'); runtime.lastHover = t; }
      });
    });
    const host = $('#choices');
    if(host && buttons.length && !host.nextElementSibling?.classList.contains('decision-hint')){
      const hint = document.createElement('div');
      hint.className = 'decision-hint';
      hint.textContent = 'تقدر تختار من الكيبورد بالأرقام 1–4';
      host.insertAdjacentElement('afterend', hint);
    }
  }

  function enhanceBeat(){
    const text = $('.beat-text')?.textContent?.trim() || '';
    if(!text || text === runtime.lastBeatText) return;
    runtime.lastBeatText = text;
    if(/خبطة|طرق|الباب/.test(text)){
      hit('knock');
      try{ navigator.vibrate?.([35,45,55]); }catch{}
    }else if(/اختفى|مفقود|حيّ|حي |لا…|45/.test(text)){
      hit('soft');
    }
    const wrap = $('.beat-wrap');
    if(wrap){
      wrap.animate?.([
        {opacity:.2,transform:'translateY(7px)'},
        {opacity:1,transform:'translateY(0)'}
      ],{duration:320,easing:'cubic-bezier(.2,.75,.25,1)'});
    }
  }

  function ensureTools(){
    const meta = $('.header-meta');
    if(!meta || $('#cinematicTools')) return;
    const tools = document.createElement('div');
    tools.id = 'cinematicTools';
    tools.className = 'immersive-tools';
    tools.innerHTML = '<button id="audioToggle" class="immersive-tool" type="button" aria-label="الصوت">◉</button><button id="fullscreenToggle" class="immersive-tool" type="button" aria-label="ملء الشاشة">⛶</button>';
    meta.appendChild(tools);
    updateAudioButton();
    $('#audioToggle')?.addEventListener('click', () => {
      runtime.audioOn = !runtime.audioOn;
      localStorage.setItem('taraf_story_audio', runtime.audioOn ? 'on' : 'off');
      if(runtime.audioOn){ ensureAudio(); startAmbient(); tone('click'); }
      else stopAmbient();
      updateAudioButton();
    });
    $('#fullscreenToggle')?.addEventListener('click', async () => {
      try{
        if(document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      }catch{}
    });
  }

  function updateAudioButton(){
    const btn = $('#audioToggle');
    if(!btn) return;
    btn.classList.toggle('off', !runtime.audioOn);
    btn.textContent = runtime.audioOn ? '◉' : '○';
    btn.title = runtime.audioOn ? 'إيقاف الصوت' : 'تشغيل الصوت';
  }

  function ensureAudio(){
    if(runtime.audio) return runtime.audio;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return null;
    runtime.audio = new AudioCtx();
    return runtime.audio;
  }

  function tone(kind='click'){
    if(!runtime.audioOn) return;
    const ctx = ensureAudio();
    if(!ctx) return;
    if(ctx.state === 'suspended') ctx.resume().catch(()=>{});
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    let f1=160, f2=110, dur=.08, vol=.025, type='sine';
    if(kind==='hover'){f1=280;f2=235;dur=.035;vol=.008;type='triangle'}
    if(kind==='system'){f1=73;f2=48;dur=.22;vol=.035;type='sawtooth'}
    if(kind==='deep'){f1=62;f2=38;dur=.38;vol=.045;type='sine'}
    osc.type=type; osc.frequency.setValueAtTime(f1,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(Math.max(20,f2),ctx.currentTime+dur);
    gain.gain.setValueAtTime(.0001,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(vol,ctx.currentTime+.01); gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+dur);
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+dur+.02);
  }

  function hit(kind='soft'){
    if(kind==='knock'){
      knockPulse(0); setTimeout(()=>knockPulse(.11),110); return;
    }
    tone(kind === 'system' ? 'system' : kind === 'deep' ? 'deep' : 'click');
    document.body.classList.remove('cinematic-glitch');
    if(kind==='system' || kind==='deep'){
      void document.body.offsetWidth;
      document.body.classList.add('cinematic-glitch');
      setTimeout(()=>document.body.classList.remove('cinematic-glitch'),480);
    }
  }

  function knockPulse(delay=0){
    setTimeout(()=>{
      if(runtime.audioOn){
        const ctx=ensureAudio(); if(!ctx)return;
        const osc=ctx.createOscillator(), gain=ctx.createGain();
        osc.type='sine'; osc.frequency.setValueAtTime(76,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(42,ctx.currentTime+.13);
        gain.gain.setValueAtTime(.0001,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.055,ctx.currentTime+.007); gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.14);
        osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.16);
      }
      document.body.classList.add('cinematic-subtle-hit');
      setTimeout(()=>document.body.classList.remove('cinematic-subtle-hit'),320);
    },delay*1000);
  }

  function startAmbient(){
    if(!runtime.audioOn || runtime.ambient) return;
    const ctx = ensureAudio();
    if(!ctx) return;
    if(ctx.state === 'suspended') ctx.resume().catch(()=>{});
    const master = ctx.createGain();
    master.gain.value=.012;
    const low=ctx.createOscillator(), high=ctx.createOscillator();
    low.type='sine'; low.frequency.value=43;
    high.type='sine'; high.frequency.value=67;
    const highGain=ctx.createGain(); highGain.gain.value=.28;
    low.connect(master); high.connect(highGain).connect(master); master.connect(ctx.destination);
    low.start(); high.start();
    runtime.ambient={low,high,master,highGain};
  }

  function stopAmbient(){
    if(!runtime.ambient) return;
    const a=runtime.ambient; runtime.ambient=null;
    try{a.master.gain.exponentialRampToValueAtTime(.0001,(runtime.audio?.currentTime||0)+.12);setTimeout(()=>{a.low.stop();a.high.stop()},150)}catch{}
  }

  function wireGlobalInteractions(){
    document.addEventListener('pointerdown', e => {
      if(runtime.audioOn){ ensureAudio(); startAmbient(); }
      if(e.target.closest('button')) tone('click');
    }, {passive:true});

    document.addEventListener('keydown', e => {
      if(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const n = Number(e.key);
      if(n >= 1 && n <= 9){
        const target = $(`.choice-btn[data-shortcut="${n}"]`);
        if(target && !target.disabled){ e.preventDefault(); target.click(); return; }
      }
      if((e.key===' ' || e.key==='Enter') && !e.repeat){
        const target = $('#beatNext,#systemNext,#reportNext,#continueLocked');
        if(target && !target.disabled){ e.preventDefault(); target.click(); }
      }
      if(e.key==='Escape') $('.inspect-sheet .close-x')?.click();
    });

    window.addEventListener('pointermove', e => {
      const back=$('#cinematicBackdrop'); if(!back || matchMedia('(pointer:coarse)').matches) return;
      const x=((e.clientX/innerWidth)-.5)*-7;
      const y=((e.clientY/innerHeight)-.5)*-5;
      back.style.setProperty('--mx',`${x.toFixed(2)}px`);
      back.style.setProperty('--my',`${y.toFixed(2)}px`);
    },{passive:true});

    document.addEventListener('visibilitychange',()=>{
      if(runtime.ambient) runtime.ambient.master.gain.value=document.hidden?.002:.012;
    });
  }

  function observeStory(){
    const stage=$('#stage');
    const obs = new MutationObserver(() => requestAnimationFrame(refreshMood));
    obs.observe(document.body,{attributes:true,attributeFilter:['data-node','data-type']});
    if(stage) obs.observe(stage,{childList:true,subtree:true,characterData:true});
  }

  function init(){
    ensureBackdrop();
    ensureTools();
    wireGlobalInteractions();
    observeStory();
    refreshMood();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
