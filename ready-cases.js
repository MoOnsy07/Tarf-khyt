// قايمة القضايا اللي أصولها البصرية مكتملة وجاهزة للعب فعليًا.
// ملف مشترك بين engine.js وأي صفحة تانية محتاجة تعرف حالة الجاهزية
// (زي profile.html) — عشان اللستة تتحدث في مكان واحد بس.
const READY_CASE_IDS = new Set([
  'buffalo-case',
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
  // === إضافات هذه الجلسة — أصولها البصرية اكتملت بالكامل ===
  'fake-audio',
  'false-rumor',
  'forged-canvas',
  'ghost-author',
  'exam-leak',
  'charity-funds',
]);
