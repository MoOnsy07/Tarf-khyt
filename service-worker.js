/* ============================================================
   Service Worker — طرف الخيط
   يجمع دعم الأوفلاين وإشعارات Firebase من غير ما يعتمد كل واحد
   على نجاح التاني. لو Firebase CDN تعطل، الأوفلاين يفضل شغال.
   ============================================================ */

// تهيئة Firebase Messaging. رسائل notification تظهر تلقائيًا في الخلفية،
// والرابط بيتحدد من webpush.fcm_options.link في خدمة send-push.
try {
  importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
  firebase.initializeApp({
    apiKey: 'AIzaSyCdstFImWOVKaP_1YXuZ2-dCqi4mQeWzEA',
    authDomain: 'taraf5eet.firebaseapp.com',
    projectId: 'taraf5eet',
    storageBucket: 'taraf5eet.firebasestorage.app',
    messagingSenderId: '405157321053',
    appId: '1:405157321053:web:846e359947e6710293b0b4',
  });
  firebase.messaging();
} catch (error) {
  console.warn('[SW] Firebase Messaging unavailable; offline cache is still active.', error);
}

const SHELL_CACHE = 'tarf-shell-v5';
const RUNTIME_CACHE = 'tarf-runtime-v5';
const CURRENT_CACHES = [SHELL_CACHE, RUNTIME_CACHE];

// صفحات اللعبة وملفات المنطق والقضايا. الصور الكبيرة من GitHub بتتخزن
// وقت المشاهدة بدل تحميلها كلها مقدمًا.
const SHELL_ASSETS = [
  './',
  'index.html',
  'play.html',
  'how-to-play.html',
  'leaderboard.html',
  'profile.html',
  'privacy.html',
  'terms.html',
  'data-deletion.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-512-maskable.png',
  'style.css',
  'config.js',
  'supabase-client.js',
  'push-notifications.js',
  'case-locations.js',
  'ready-cases.js',
  'engine.js',
  'leaderboard.js',
  'investigation-overhaul.js',
  'discovery-pack-5.js',
  'discovery-locks.js',
  'discovery-image-patches.js',
  'discovery-deduction-policy.js',
  'theory-builder-safety-fix.js',
  'donation-widget.js',
  'donation-paypal-addon.js',
  'android-download.js',
  'android-app-analytics.js',
  'ending-score.js',
  'ending-community-popup.js',
  'cloud-sync.js',
  'cloud-google-only.js',
  'cloud-session-guard.js',
  'social-profile-sync.js',
  'avatar-controls.js',
  'suspect-profiles.js',
  'telegram-invite-policy.js',
  'profile-scroll-stability.js',
  'facebook-launch-mode.js',
  'cases/case-93rd-minute.js',
  'cases/case-behind-scenes.js',
  'cases/case-bribery.js',
  'cases/case-broken-faucet.js',
  'cases/case-buffalo.js',
  'cases/case-charity-funds.js',
  'cases/case-closed-file.js',
  'cases/case-coded-message.js',
  'cases/case-dark-testimony.js',
  'cases/case-dating-app.js',
  'cases/case-dawn-call.js',
  'cases/case-dawn-club.js',
  'cases/case-deleted-scene.js',
  'cases/case-exam-leak.js',
  'cases/case-fake-audio.js',
  'cases/case-false-rumor-hotfix.js',
  'cases/case-false-rumor.js',
  'cases/case-final-exit.js',
  'cases/case-final-testament.js',
  'cases/case-finish-line.js',
  'cases/case-flat-12b.js',
  'cases/case-forged-canvas.js',
  'cases/case-forged-will.js',
  'cases/case-ghost-author.js',
  'cases/case-grandma-ring.js',
  'cases/case-hit-and-run.js',
  'cases/case-illusion-startup.js',
  'cases/case-last-bell.js',
  'cases/case-last-call.js',
  'cases/case-last-dish.js',
  'cases/case-last-episode.js',
  'cases/case-last-laugh.js',
  'cases/case-last-rehearsal.js',
  'cases/case-last-update.js',
  'cases/case-leaked-video.js',
  'cases/case-lost-wallet.js',
  'cases/case-missing-bride.js',
  'cases/case-missing-twin.js',
  'cases/case-mud-print.js',
  'cases/case-nile-cruise.js',
  'cases/case-no-witness-night.js',
  'cases/case-number-19.js',
  'cases/case-old-estate.js',
  'cases/case-old-photo.js',
  'cases/case-one-comment.js',
  'cases/case-opening-night.js',
  'cases/case-overbilled.js',
  'cases/case-postponed-engagement-rescue-fix.js',
  'cases/case-postponed-engagement.js',
  'cases/case-recorded-voice.js',
  'cases/case-red-thread.js',
  'cases/case-return-from-death.js',
  'cases/case-return-from-death-image-fallback.js',
  'cases/case-role-of-lifetime.js',
  'cases/case-room-307-discovery.js',
  'cases/case-room-307.js',
  'cases/case-second-face.js',
  'cases/case-secret-clinic.js',
  'cases/case-secret-recipe.js',
  'cases/case-shifting-painting.js',
  'cases/case-suspicious-transfer.js',
  'cases/case-vanished-wife.js',
  'cases/case-var-conspiracy.js',
  'cases/case-vault-key.js',
  'cases/case-warehouse-fire.js',
  'cases/case-wedding-gold.js',
  'cases/discovery-preaccusation-safety-fix.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      const results = await Promise.allSettled(SHELL_ASSETS.map((url) => cache.add(url)));
      const failed = results
        .map((result, index) => (result.status === 'rejected' ? SHELL_ASSETS[index] : null))
        .filter(Boolean);
      if (failed.length) console.warn('[SW] Some shell assets were not cached:', failed);
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => !CURRENT_CACHES.includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithRefresh(request, SHELL_CACHE));
    return;
  }

  if (url.hostname === 'raw.githubusercontent.com' && /\.(jpe?g|png|webp|gif)$/i.test(url.pathname)) {
    event.respondWith(cacheFirstRuntime(request));
  }
});

async function cacheFirstWithRefresh(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await network) || new Response('أوف لاين — الملف ده لسه مش محفوظ محليًا.', { status: 503 });
}

async function cacheFirstRuntime(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (_) {
    return new Response('', { status: 503, statusText: 'Offline — image not cached yet' });
  }
}
