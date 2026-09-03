(() => {
  'use strict';

  const DURATION_MS = 4800;
  const runtime = { ctx:null, running:false, lastWelcome:'', endTimer:null };
  const $ = (sel, root=document) => root.querySelector(sel);

  function soundAllowed(){
    return localStorage.getItem('taraf_story_audio') !== 'off';
  }

  function ensureAudio(){
    if(runtime.ctx) return runtime.ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return null;
    runtime.ctx = new AudioCtx();
    return runtime.ctx;
  }

  function scheduleThump(ctx, start, volume=0.04, pitch=54){
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, start);
    osc.frequency.exponentialRampToValueAtTime(31, start + .18);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, start + .21);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start); osc.stop(start + .23);
  }

  function scheduleTick(ctx, start, volume=0.006){
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(780, start);
    osc.frequency.exponentialRampToValueAtTime(310, start + .045);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .005);
    gain.gain.exponentialRampToValueAtTime(.0001, start + .055);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start); osc.stop(start + .065);
  }

  function playTensionRhythm(){
    if(!soundAllowed()) return;
    const ctx = ensureAudio();
    if(!ctx) return;
    if(ctx.state === 'suspended') ctx.resume().catch(()=>{});
    const start = ctx.currentTime + .04;

    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(36, start);
    drone.frequency.exponentialRampToValueAtTime(53, start + 4.25);
    droneGain.gain.setValueAtTime(.0001, start);
    droneGain.gain.exponentialRampToValueAtTime(.009, start + .5);
    droneGain.gain.setValueAtTime(.009, start + 3.75);
    droneGain.gain.exponentialRampToValueAtTime(.0001, start + 4.55);
    drone.connect(droneGain).connect(ctx.destination);
    drone.start(start); drone.stop(start + 4.62);

    const beats = [
      [0.28,.032,48], [1.00,.035,49], [1.62,.038,50],
      [2.15,.041,51], [2.59,.044,52], [2.96,.047,53],
      [3.27,.05,54], [3.53,.053,55], [3.75,.056,56]
    ];
    beats.forEach(([offset,vol,pitch], i) => {
      scheduleThump(ctx,start+offset,vol,pitch);
      if(i >= 3) scheduleTick(ctx,start+offset+.025,Math.min(.01,.004+i*.0007));
    });
  }

  function buildWelcomeText(flash, original){
    const name = original.replace(/^أهلًا[،,]?\s*/,'').trim();
    flash.textContent='';
    const hello=document.createElement('span'); hello.className='welcome-word'; hello.textContent='أهلًا،';
    const spacer=document.createTextNode(' ');
    const who=document.createElement('span'); who.className='welcome-name'; who.textContent=name || 'المحقق';
    flash.append(hello,spacer,who);
  }

  function startWelcome(flash, original){
    if(runtime.running || runtime.lastWelcome === original) return;
    runtime.running=true;
    runtime.lastWelcome=original;
    clearTimeout(runtime.endTimer);
    document.body.classList.add('welcome-sequence-active');
    flash.classList.add('welcome-flash');
    buildWelcomeText(flash,original);
    playTensionRhythm();
    try{ navigator.vibrate?.([28,560,32,430,36,330,42,250,48]); }catch{}

    runtime.endTimer=setTimeout(()=>{
      runtime.running=false;
      document.body.classList.remove('welcome-sequence-active');
      flash.classList.remove('welcome-flash');
    },DURATION_MS+80);
  }

  function inspectFlash(){
    const flash=$('#systemFlash');
    if(!flash || !flash.classList.contains('show')) return;
    const text=flash.textContent.trim();
    if(/^أهلًا[،,]?\s*/.test(text)) startWelcome(flash,text);
  }

  function init(){
    const flash=$('#systemFlash');
    if(!flash) return;
    const observer=new MutationObserver(()=>queueMicrotask(inspectFlash));
    observer.observe(flash,{attributes:true,attributeFilter:['class'],childList:true,subtree:true,characterData:true});
    document.addEventListener('pointerdown',()=>{
      if(!soundAllowed()) return;
      const ctx=ensureAudio();
      if(ctx?.state==='suspended') ctx.resume().catch(()=>{});
    },{passive:true});
    inspectFlash();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
