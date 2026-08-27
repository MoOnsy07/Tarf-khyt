/* ============================================================
   Service Worker — طرف الخيط
   الهدف: بعد أول زيارة (لازم فيها نت)، اللعبة تشتغل بالكامل من غير
   إنترنت — الصفحات، منطق اللعبة، وكل قضية، محفوظين محليًا.
   الصور بتتخزن أول ما تتشاف (runtime caching)، فمش كل الـ106MB
   بتتحمل مقدمًا، بس أي قضية اتفتحت مرة هتشتغل تاني من غير نت.
   ============================================================ */

const SHELL_CACHE = 'tarf-shell-v1';
const RUNTIME_CACHE = 'tarf-runtime-v1';
const CURRENT_CACHES = [SHELL_CACHE, RUNTIME_CACHE];

// كل ملفات الشِل الأساسية (الصفحات، المحرك، كل ملفات القضايا، الـCSS)
// اتولّدت آليًا من فحص فعلي لكل src/href في index.html و play.html،
// واتأكد إن كل ملف موجود فعلًا قبل ما يتحط هنا.
const SHELL_ASSETS = ["./", "index.html", "play.html", "how-to-play.html", "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png", "case-locations.js", "ending-score.js", "cases/case-93rd-minute.js", "cases/case-behind-scenes.js", "cases/case-bribery.js", "cases/case-broken-faucet.js", "cases/case-buffalo.js", "cases/case-charity-funds.js", "cases/case-closed-file.js", "cases/case-coded-message.js", "cases/case-dark-testimony.js", "cases/case-dating-app.js", "cases/case-dawn-call.js", "cases/case-dawn-club.js", "cases/case-deleted-scene.js", "cases/case-exam-leak.js", "cases/case-fake-audio.js", "cases/case-false-rumor-hotfix.js", "cases/case-false-rumor.js", "cases/case-final-testament.js", "cases/case-finish-line.js", "cases/case-flat-12b.js", "cases/case-forged-canvas.js", "cases/case-forged-will.js", "cases/case-ghost-author.js", "cases/case-grandma-ring.js", "cases/case-hit-and-run.js", "cases/case-illusion-startup.js", "cases/case-last-bell.js", "cases/case-last-call.js", "cases/case-last-dish.js", "cases/case-last-episode.js", "cases/case-last-laugh.js", "cases/case-last-rehearsal.js", "cases/case-last-update.js", "cases/case-leaked-video.js", "cases/case-lost-wallet.js", "cases/case-missing-bride.js", "cases/case-missing-twin.js", "cases/case-mud-print.js", "cases/case-nile-cruise.js", "cases/case-no-witness-night.js", "cases/case-number-19.js", "cases/case-old-estate.js", "cases/case-old-photo.js", "cases/case-one-comment.js", "cases/case-opening-night.js", "cases/case-overbilled.js", "cases/case-postponed-engagement-rescue-fix.js", "cases/case-postponed-engagement.js", "cases/case-recorded-voice.js", "cases/case-red-thread.js", "cases/case-role-of-lifetime.js", "cases/case-room-307-discovery.js", "cases/case-room-307.js", "cases/case-second-face.js", "cases/case-secret-clinic.js", "cases/case-secret-recipe.js", "cases/case-shifting-painting.js", "cases/case-suspicious-transfer.js", "cases/case-vanished-wife.js", "cases/case-var-conspiracy.js", "cases/case-vault-key.js", "cases/case-warehouse-fire.js", "cases/case-wedding-gold.js", "cases/discovery-preaccusation-safety-fix.js", "config.js", "discovery-image-patches.js", "discovery-locks.js", "discovery-pack-5.js", "donation-widget.js", "engine.js", "investigation-overhaul.js", "leaderboard.js", "ready-cases.js", "style.css", "supabase-client.js", "theory-builder-safety-fix.js"];

// ============================================================
// التثبيت: نحفظ كل ملفات الشِل. كل ملف بيتحاول لوحده (مش cache.addAll)
// عشان لو ملف واحد فشل (شبكة بطيئة مثلاً)، الباقي يتحفظ عادي.
// ============================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      const results = await Promise.allSettled(
        SHELL_ASSETS.map((url) => cache.add(url))
      );
      const failed = results
        .map((r, i) => (r.status === 'rejected' ? SHELL_ASSETS[i] : null))
        .filter(Boolean);
      if (failed.length) {
        console.warn('[SW] فشل تخزين بعض ملفات الشِل (هيتحاول تاني وقت التصفح):', failed);
      }
      return self.skipWaiting();
    })
  );
});

// ============================================================
// التفعيل: نمسح أي كاش قديم من نسخة سابقة للـ service worker
// ============================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !CURRENT_CACHES.includes(key))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ============================================================
// جلب الملفات: استراتيجيتين حسب نوع الطلب
// ============================================================
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1) طلبات لنفس الموقع (index.html, engine.js, ملفات القضايا...)
  //    Cache-first: هات من الكاش فورًا لو موجود، وحدّثه في الخلفية.
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithRefresh(req, SHELL_CACHE));
    return;
  }

  // 2) صور القضايا من raw.githubusercontent.com — دي أكبر جزء (106MB)،
  //    فبنخزنها بس أول ما تتشاف فعليًا (runtime caching)، مش مقدمًا.
  if (url.hostname === 'raw.githubusercontent.com' && /\.(jpe?g|png|webp|gif)$/i.test(url.pathname)) {
    event.respondWith(cacheFirstRuntime(req));
    return;
  }

  // 3) أي حاجة تانية (Supabase, fonts خارجية...) — سيبها تروح للنت عادي،
  //    ولو مفيش نت هتفشل بس مش هتكسر اللعبة (الكود عندنا بيتعامل مع الفشل).
});

async function cacheFirstWithRefresh(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: true });
  const networkFetch = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || (await networkFetch) || new Response('أوف لاين — الملف ده لسه مش محفوظ محليًا.', { status: 503 });
}

async function cacheFirstRuntime(req) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return new Response('', { status: 503, statusText: 'Offline — image not cached yet' });
  }
}
