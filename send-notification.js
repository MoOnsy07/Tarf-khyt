// send-notification.js
// سكريبت لإرسال إشعار لكل اللاعبين المشتركين في "طرف الخيط"
// معدّل عشان يستخدم جداول push_devices و push_campaigns الموجودة بالفعل في Supabase

// ====== التثبيت المطلوب ======
// npm install firebase-admin @supabase/supabase-js

const admin = require("firebase-admin");
const { createClient } = require("@supabase/supabase-js");

// ====== 1) اعدادات Firebase Admin ======
// روح Project Settings > Service Accounts > Generate new private key
// وحمّل ملف الـ JSON وحطه جنب السكريبت ده باسم serviceAccountKey.json
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ====== 2) اعدادات Supabase ======
const SUPABASE_URL = "https://meynspmfkkedhqhffsqk.supabase.co";
const SUPABASE_SERVICE_KEY = "YOUR_SERVICE_ROLE_KEY"; // من Project Settings > API > service_role (مش الـ anon key)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ====== 3) دالة الإرسال ======
// platformFilter: "all" | "web" | "android"
async function sendUpdateNotification(title, body, targetUrl, platformFilter = "all") {
  let query = supabase.from("push_devices").select("fcm_token").eq("enabled", true);

  if (platformFilter !== "all") {
    query = query.eq("platform", platformFilter);
  }

  const { data: devices, error } = await query;

  if (error) {
    console.error("خطأ في جلب التوكنز:", error);
    return;
  }

  const tokens = devices.map((d) => d.fcm_token).filter(Boolean);
  if (tokens.length === 0) {
    console.log("مفيش أي أجهزة مشتركة في الإشعارات");
    return;
  }

  console.log(`هيتبعت إشعار لـ ${tokens.length} جهاز (${platformFilter})...`);

  let totalSuccess = 0;
  let totalFailure = 0;
  const invalidTokens = [];

  // FCM بيسمح بـ 500 توكن كحد أقصى في المرة الواحدة
  const chunkSize = 500;
  for (let i = 0; i < tokens.length; i += chunkSize) {
    const chunk = tokens.slice(i, i + chunkSize);

    const message = {
      notification: { title, body },
      tokens: chunk,
      webpush: targetUrl
        ? { fcmOptions: { link: targetUrl } }
        : undefined,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    totalSuccess += response.successCount;
    totalFailure += response.failureCount;

    response.responses.forEach((res, idx) => {
      if (!res.success) {
        invalidTokens.push(chunk[idx]);
      }
    });
  }

  console.log(`تم الإرسال: ${totalSuccess} نجح, ${totalFailure} فشل`);

  // نضّف التوكنز اللي بقت invalid من الجدول
  if (invalidTokens.length > 0) {
    await supabase.from("push_devices").delete().in("fcm_token", invalidTokens);
    console.log(`تم حذف ${invalidTokens.length} توكن غير صالح`);
  }

  // سجّل الحملة في جدول push_campaigns الموجود
  await supabase.from("push_campaigns").insert({
    title,
    body,
    target_url: targetUrl || null,
    topic: platformFilter,
  });
}

// ====== مثال استخدام: إشعار لمستخدمي الويب بس ======
sendUpdateNotification(
  "🧵 طرف الخيط - تحديث جديد!",
  "فصل جديد وقصص جديدة في انتظارك، افتح اللعبة دلوقتي!",
  "https://yourgame-url.com",
  "web"
);
