/* ============================================================
   إعدادات عامة — حط بياناتك هنا
   ============================================================ */

// رقم الواتساب اللي هيوصلك عليه العميل، بصيغة دولية بدون + أو أصفار زيادة
// مثال: لو رقمك المصري 01001234567، يبقى: 201001234567
const WHATSAPP_NUMBER = '201145785696';

/* ============================================================
   دعم طرف الخيط
   ============================================================ */

const DONATION_VODAFONE_CASH = '01021657669';
const DONATION_INSTAPAY = 'medoonsy@instapay';
const DONATION_INSTAPAY_LINK = 'https://ipn.eg/S/medoonsy/instapay/2DrTZL';
const DONATION_PAYPAL_EMAIL = 'Medozonkol@gmail.com';
const DONATION_TITLE = 'ادعم طرف الخيط ❤️';

// إضافة PayPal منفصلة عشان تفضل نافذة الدعم الأساسية بسيطة وسهلة التعديل.
(function(){
  try{
    const s=document.createElement('script');
    s.src='donation-paypal-addon.js?v=20260825-1';
    s.defer=true;
    document.head.appendChild(s);
  }catch(e){}
})();
