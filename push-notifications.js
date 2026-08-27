/* ============================================================
   إشعارات الويب — Firebase Cloud Messaging + Supabase
   التسجيل اختياري ولا يطلب الإذن إلا بعد ضغط المستخدم على الزر.
   ============================================================ */
(function () {
  'use strict';

  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCdstFImWOVKaP_1YXuZ2-dCqi4mQeWzEA',
    authDomain: 'taraf5eet.firebaseapp.com',
    projectId: 'taraf5eet',
    storageBucket: 'taraf5eet.firebasestorage.app',
    messagingSenderId: '405157321053',
    appId: '1:405157321053:web:846e359947e6710293b0b4',
  };

  const VAPID_KEY = 'BAh6ywACf2Ec4SUTbrqgYwbVXvFstzlXJ5PRlDz98k0MVGqkgkYdzjUMdFhLWV0qRbo6es6KaPmaQ0jUpG7Mux4';
  const FIREBASE_VERSION = '10.13.2';
  const ENABLED_KEY = 'tarafkhyt_web_push_enabled_v1';
  const APP_VERSION = 'web-pwa-2';

  let sdkPromise = null;
  let messaging = null;
  let foregroundListenerReady = false;

  function isAndroidWrapper() {
    try { return new URLSearchParams(location.search).get('android_app') === '1'; }
    catch (_) { return false; }
  }

  function getButton() {
    return document.getElementById('enable-push-btn');
  }

  function setButton(label, disabled) {
    const button = getButton();
    if (!button) return;
    button.textContent = label;
    button.disabled = Boolean(disabled);
  }

  function hideButton() {
    const button = getButton();
    if (button) button.hidden = true;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (window.firebase) return resolve();
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadFirebaseSDK() {
    if (window.firebase && typeof window.firebase.messaging === 'function') {
      return Promise.resolve();
    }
    if (sdkPromise) return sdkPromise;
    sdkPromise = loadScript(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app-compat.js`)
      .then(() => loadScript(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-messaging-compat.js`))
      .catch((error) => {
        sdkPromise = null;
        throw error;
      });
    return sdkPromise;
  }

  function getSupabaseClient() {
    try {
      if (typeof sb !== 'undefined' && sb && typeof sb.rpc === 'function') return sb;
    } catch (_) {}
    if (window.supabaseClient && typeof window.supabaseClient.rpc === 'function') return window.supabaseClient;
    if (window.sb && typeof window.sb.rpc === 'function') return window.sb;
    return null;
  }

  function getOrCreateVisitorId() {
    let id = localStorage.getItem('tarafkhyt_visitor_id') || localStorage.getItem('visitor_id');
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem('tarafkhyt_visitor_id', id);
    }
    return String(id).slice(0, 128);
  }

  async function getServiceWorkerRegistration() {
    let registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) {
      registration = await navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' });
    }
    return registration;
  }

  async function getMessaging() {
    if (messaging) return messaging;
    await loadFirebaseSDK();
    const apps = Array.isArray(firebase.apps) ? firebase.apps : [];
    const app = apps.find((item) => item && item.options && item.options.projectId === FIREBASE_CONFIG.projectId)
      || (apps[0] || firebase.initializeApp(FIREBASE_CONFIG));
    messaging = app.messaging ? app.messaging() : firebase.messaging(app);
    return messaging;
  }

  async function saveToken(token) {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase client is unavailable');

    const { data, error } = await client.rpc('register_push_token', {
      p_token: token,
      p_install_id: getOrCreateVisitorId(),
      p_platform: 'web',
      p_app_version: APP_VERSION,
    });

    if (error) throw error;
    if (data !== true) throw new Error('Supabase rejected the push token');
    localStorage.setItem(ENABLED_KEY, '1');
    return true;
  }

  function listenForegroundMessages() {
    if (!messaging || foregroundListenerReady) return;
    foregroundListenerReady = true;
    messaging.onMessage((payload) => {
      const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || 'طرف الخيط';
      const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || '';
      if (Notification.permission !== 'granted') return;
      const notification = new Notification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        data: { url: (payload.data && payload.data.url) || 'https://taraf5eet.online/' },
      });
      notification.onclick = () => {
        notification.close();
        const target = notification.data && notification.data.url;
        if (target) window.location.assign(target);
        else window.focus();
      };
    });
  }

  async function registerWebPush(askPermission) {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      throw new Error('Push notifications are not supported');
    }

    let permission = Notification.permission;
    if (permission === 'default' && askPermission) {
      // لازم يتطلب الإذن قبل أي await عشان يفضل مرتبط بضغطة المستخدم.
      permission = await Notification.requestPermission();
    }
    if (permission !== 'granted') return null;

    const registration = await getServiceWorkerRegistration();
    const messagingClient = await getMessaging();
    const token = await messagingClient.getToken({
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (!token) throw new Error('Firebase returned no registration token');

    await saveToken(token);
    listenForegroundMessages();
    setButton('✅ الإشعارات مفعّلة', true);
    return token;
  }

  async function enable() {
    setButton('جاري التفعيل…', true);
    try {
      const token = await registerWebPush(true);
      if (!token) {
        setButton(Notification.permission === 'denied' ? 'الإشعارات مرفوضة من المتصفح' : '🔔 فعّل الإشعارات', false);
      }
      return token;
    } catch (error) {
      console.error('[push-notifications] activation failed', error);
      setButton('تعذر التفعيل — حاول تاني', false);
      return null;
    }
  }

  function bootstrap() {
    if (isAndroidWrapper()) {
      hideButton();
      return;
    }
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      hideButton();
      return;
    }
    if (Notification.permission === 'denied') {
      setButton('الإشعارات مرفوضة من المتصفح', true);
      return;
    }
    if (Notification.permission === 'granted') {
      setButton('جاري تحديث الإشعارات…', true);
      registerWebPush(false).catch((error) => {
        console.error('[push-notifications] background registration failed', error);
        setButton('تعذر التفعيل — حاول تاني', false);
      });
      return;
    }
    setButton('🔔 فعّل الإشعارات', false);
  }

  window.TarafPush = { enable, refresh: () => registerWebPush(false) };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  else bootstrap();
})();
