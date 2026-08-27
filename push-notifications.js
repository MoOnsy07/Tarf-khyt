// push-notifications.js
// كود تفعيل إشعارات "طرف الخيط" — ضيفه كـ <script src="push-notifications.js"></script>
// في index.html بعد supabase-client.js وقبل نهاية </body>

(function () {
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCdstFImWOVKaP_1YXuZ2-dCqi4mQeWzEA",
    authDomain: "taraf5eet.firebaseapp.com",
    projectId: "taraf5eet",
    storageBucket: "taraf5eet.firebasestorage.app",
    messagingSenderId: "405157321053",
    appId: "1:405157321053:web:846e359947e6710293b0b4",
  };

  const VAPID_KEY =
    "BAh6ywACf2Ec4SUTbrqgYwbVXvFstzlXJ5PRlDz98k0MVGqkgkYdzjUMdFhLWV0qRbo6es6KaPmaQ0jUpG7Mux4";

  let messaging = null;

  function loadFirebaseSDK() {
    return new Promise((resolve, reject) => {
      const s1 = document.createElement("script");
      s1.src = "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js";
      s1.onload = () => {
        const s2 = document.createElement("script");
        s2.src = "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js";
        s2.onload = resolve;
        s2.onerror = reject;
        document.head.appendChild(s2);
      };
      s1.onerror = reject;
      document.head.appendChild(s1);
    });
  }

  function getOrCreateVisitorId() {
    let id = localStorage.getItem("tarafkhyt_visitor_id") || localStorage.getItem("visitor_id");
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random();
      localStorage.setItem("tarafkhyt_visitor_id", id);
    }
    return id;
  }

  // بيدور على عميل Supabase الموجود بالفعل في supabase-client.js
  // (بيجرب أشهر الأسماء الشائعة، لو مختلف عدّل الاسم هنا)
  function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;
    if (window.supabase && window.supabase.__isClient) return window.supabase;
    if (window.sb) return window.sb;
    console.warn(
      "[push-notifications] مش لاقي عميل Supabase جاهز (supabaseClient). " +
      "راجع اسم المتغيّر في supabase-client.js وعدّله في getSupabaseClient()."
    );
    return null;
  }

  async function enableGameNotifications() {
    try {
      if (!("Notification" in window) || !("serviceWorker" in navigator)) {
        alert("متصفحك مش بيدعم الإشعارات");
        return null;
      }

      await loadFirebaseSDK();
      const app = firebase.initializeApp(FIREBASE_CONFIG);
      messaging = firebase.messaging(app);

      // اللعبة بتسجل service-worker.js بالفعل في index.html — هنستخدم نفس التسجيل
      const registration = await navigator.serviceWorker.ready;

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("المستخدم رفض الإشعارات");
        return null;
      }

      const token = await messaging.getToken({
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (token) {
        await saveTokenToSupabase(token);
        return token;
      }
    } catch (err) {
      console.error("[push-notifications] خطأ في تفعيل الإشعارات:", err);
    }
    return null;
  }

  async function saveTokenToSupabase(token) {
    const client = getSupabaseClient();
    if (!client) return;

    const visitorId = getOrCreateVisitorId();

    const { error } = await client.from("push_devices").upsert(
      {
        fcm_token: token,
        install_id: visitorId,
        platform: "web",
        enabled: true,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "fcm_token" }
    );

    if (error) console.error("[push-notifications] خطأ في حفظ التوكن:", error);
    else console.log("[push-notifications] تم حفظ التوكن بنجاح");
  }

  // إشعار واللعبة مفتوحة قدام المستخدم
  function listenForegroundMessages() {
    if (!messaging) return;
    messaging.onMessage((payload) => {
      console.log("[push-notifications] إشعار واللعبة مفتوحة:", payload);
      const title = payload.notification?.title || "طرف الخيط";
      const body = payload.notification?.body || "";
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body, icon: "icons/icon-192.png" });
      }
    });
  }

  // اربط الدالة دي بأي زرار في اللعبة، مثلاً:
  // <button onclick="TarafPush.enable()">فعّل الإشعارات</button>
  window.TarafPush = {
    enable: async function () {
      const token = await enableGameNotifications();
      if (token) listenForegroundMessages();
      return token;
    },
  };
})();
