// قايمة القضايا اللي أصولها البصرية مكتملة وجاهزة للعب فعليًا.
// ملف مشترك بين engine.js وأي صفحة تانية محتاجة تعرف حالة الجاهزية
// (زي profile.html) — عشان اللستة تتحدث في مكان واحد بس.
const READY_CASE_IDS = new Set([
  'dark-testimony',
  'final-testament',
  'last-episode',
  'leaked-video',
  'missing-bride',
  'hit-and-run',
  'last-dish',
  'last-rehearsal',
  'lost-wallet',
  'illusion-startup',
  'last-call',
  'no-witness-night',
  'number-19',
  'role-of-lifetime',
  'room-307',
  'shifting-painting',
  'fake-audio',
  'false-rumor',
  'forged-canvas',
  'ghost-author',
  'exam-leak',
  'dawn-call',
  'finish-line',
  'flat-12b',
  'last-bell',
  'last-update',
  'mud-print',
  'old-estate',
  'postponed-engagement',
  'recorded-voice',
  'red-thread',
  'vault-key',
  'warehouse-fire',
  'closed-file',
  'forged-will',
  'missing-twin',
  'var-conspiracy',
  'coded-message',
  'behind-scenes',
  'vanished-wife',
  'last-laugh',
  'nile-cruise',
  'old-photo',
  'one-comment',
  'secret-clinic',
  'secret-recipe',
  'opening-night',
  'suspicious-transfer',
  'second-face',
  'buffalo-case',
  '93rd-minute',
  'bribery',
  'broken-faucet',
  'dating-app',
  'dawn-club',
  'deleted-scene',
  'overbilled',
  'wedding-gold',
  'charity-funds',
  'grandma-ring',
]);

(function loadTarafCloudSync(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-cloud-sync]')) return;
  const s = document.createElement('script');
  s.src = 'cloud-sync.js?v=20260825-1';
  s.async = false;
  s.dataset.tarafCloudSync = '1';
  (document.head || document.documentElement).appendChild(s);
})();

(function loadTarafCloudGoogleOnly(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-cloud-google-only]')) return;
  const s = document.createElement('script');
  s.src = 'cloud-google-only.js?v=20260825-2';
  s.async = false;
  s.dataset.tarafCloudGoogleOnly = '1';
  (document.head || document.documentElement).appendChild(s);
})();

(function loadTarafSocialProfileSync(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-social-profile-sync]')) return;
  const s = document.createElement('script');
  s.src = 'social-profile-sync.js?v=20260825-1';
  s.async = false;
  s.dataset.tarafSocialProfileSync = '1';
  (document.head || document.documentElement).appendChild(s);
})();

(function loadTarafSuspectProfiles(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-suspect-profiles]')) return;
  const s = document.createElement('script');
  s.src = 'suspect-profiles.js?v=20260823-2';
  s.async = false;
  s.dataset.tarafSuspectProfiles = '1';
  (document.head || document.documentElement).appendChild(s);
})();

(function loadTarafTelegramInvitePolicy(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-telegram-policy]')) return;
  const s = document.createElement('script');
  s.src = 'telegram-invite-policy.js?v=20260824-1';
  s.async = false;
  s.dataset.tarafTelegramPolicy = '1';
  (document.head || document.documentElement).appendChild(s);
})();

(function loadTarafProfileScrollStability(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-profile-scroll-stability]')) return;
  const s = document.createElement('script');
  s.src = 'profile-scroll-stability.js?v=20260824-1';
  s.async = false;
  s.dataset.tarafProfileScrollStability = '1';
  (document.head || document.documentElement).appendChild(s);
})();

(function loadTarafDiscoveryDeductionPolicy(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-discovery-deduction]')) return;
  const s = document.createElement('script');
  s.src = 'discovery-deduction-policy.js?v=20260824-3';
  s.async = false;
  s.dataset.tarafDiscoveryDeduction = '1';
  (document.head || document.documentElement).appendChild(s);
})();
