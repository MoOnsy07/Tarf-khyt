// service-worker.js
// نسخة مدمجة: التخزين الأوفلاين (Cache) + إشعارات Firebase (Push)
// ⚠️ مهم: الملف ده بيستبدل service-worker.js القديم بتاعك.
// لو عندك أسماء Cache أو ملفات precache مختلفة في النسخة القديمة،
// راجع قسم "OFFLINE CACHING" تحت وعدّله ليطابق القديم بالظبط
// (خصوصًا CACHE_NAME واسم الملفات المحفوظة) قبل ما ترفعه.

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCdstFImWOVKaP_1YXuZ2-dCqi4mQeWzEA",
  authDomain: "taraf5eet.firebaseapp.com",
  projectId: "taraf5eet",
  storageBucket: "taraf5eet.firebasestorage.app",
  messagingSenderId: "405157321053",
  appId: "1:405157321053:web:846e359947e6710293b0b4"
});

const messaging = firebase.messaging();

// ====== FIREBASE PUSH: استقبال إشعار واللعبة مقفولة/في الخلفية ======
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "طرف الخيط";
  const options = {
    body: payload.notification?.body || "في تحديث جديد في اللعبة!",
    icon: "icons/icon-192.png",
    badge: "icons/icon-192.png",
    data: payload.data || {},
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

// ====== OFFLINE CACHING ======
// ⚠️ ده نمط عام أساسي — راجعه وقارنه بالنسخة القديمة بتاعتك
// لو كانت بتخزن ملفات معينة (زي كل ملفات cases/*.js) لازم تتأكد إنها متضافة هنا
const CACHE_NAME = "taraf5eet-cache-v1";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/style.css",
  "/config.js",
  "/supabase-client.js",
  "/engine.js",
  "/leaderboard.js",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // نتجاهل طلبات Firebase Messaging نفسها من الكاش
  if (event.request.url.includes("firebaseinstallations") || event.request.url.includes("fcm.googleapis.com")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200 && event.request.method === "GET") {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => cached)
      );
    })
  );
});
