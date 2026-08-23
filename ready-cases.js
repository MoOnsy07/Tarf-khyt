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
  // === إضافات هذه الجلسة — أصولها البصرية اكتملت بالكامل ===
  'fake-audio',
  'false-rumor',
  'forged-canvas',
  'ghost-author',
  'exam-leak',
  // === إضافات جلسة استكمال مطابقة الصور (من صورة 0156 لحد 0350) ===
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
  // === إضافات جلسة تصحيح الـ82 صورة (اكتشاف وإصلاح الـ"إزاحة" بين الملفات) ===
  'closed-file',
  'forged-will',
  'missing-twin',
  'var-conspiracy',
  'coded-message',
  'behind-scenes',
  'vanished-wife',
  // === القضايا التانية اللي كانت ناقصة صورة واحدة بس، واكتملت
  // بفضل نفس دفعة الـ82 صورة (لقينا الصور الناقصة بتاعتها في نفس الأرشيف) ===
  'last-laugh',
  'nile-cruise',
  'old-photo',
  'one-comment',
  'secret-clinic',
  // === اكتملت بعد رفع 4 صور إضافية (كان ناقص واحدة بس لكل قضية) ===
  'secret-recipe',
  'opening-night',
  'suspicious-transfer',
  // === آخر قضية! second-face اكتملت بصورة face-witness.jpg ===
  'second-face',
  // === buffalo-case رجعت جاهزة (22 أغسطس) — كان في غلط مني في فحصها،
  // صورها فعليًا تحت images/buffalo/ (مش images/buffalo-case/) وكلها موجودة ===
  'buffalo-case',
  // === القضايا الـ10 دي لسه ناقصة صور فعليًا (اتفحصت وأكدت):
  // 93rd-minute, bribery, broken-faucet, dating-app,
  // dawn-club (بريميوم!), deleted-scene, overbilled, wedding-gold,
  // charity-funds, grandma-ring
  // رجّعهم للسِت دي لما تكتمل صورهم فعليًا (شوف قايمة البرومتات الناقصة) ===
]);

// Cloud progress — ملف مستقل بيتحمّل في اللعبة وprofile.html من غير تعديل المحرك.
// async=false يحافظ على ترتيب التنفيذ لو الصفحة فيها أكتر من loader ديناميكي.
(function loadTarafCloudSync(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-cloud-sync]')) return;
  const s = document.createElement('script');
  s.src = 'cloud-sync.js?v=20260823-1';
  s.async = false;
  s.dataset.tarafCloudSync = '1';
  (document.head || document.documentElement).appendChild(s);
})();

// مؤقتًا: تسجيل الدخول السحابي عبر Google فقط، بدون Magic Link بالإيميل.
(function loadTarafCloudGoogleOnly(){
  if(typeof document === 'undefined' || document.querySelector('script[data-taraf-cloud-google-only]')) return;
  const s = document.createElement('script');
  s.src = 'cloud-google-only.js?v=20260823-1';
  s.async = false;
  s.dataset.tarafCloudGoogleOnly = '1';
  (document.head || document.documentElement).appendChild(s);
})();
