/* ============================================================
   المواقع المصرية الحقيقية لكل قضية
   - المحافظات الريفية: مركز
   - القاهرة/الإسكندرية والمدن الحضرية: قسم
   متعمد نفصل الموقع عن نص القصة عشان يبقى سهل المراجعة والتحديث.
   ============================================================ */

const CASE_LOCATIONS = Object.freeze({
  '93rd-minute': { venue:'استاد المدينة', locality:'مدينة المحلة الكبرى', divisionType:'مركز', district:'المحلة الكبرى', governorate:'الغربية' },
  'behind-scenes': { venue:'مجمع استوديوهات', locality:'قرية شبرامنت', divisionType:'مركز', district:'أبو النمرس', governorate:'الجيزة' },
  'bribery': { venue:'كلية طب خاصة', locality:'التجمع الخامس', divisionType:'قسم', district:'أول القاهرة الجديدة', governorate:'القاهرة' },
  'broken-faucet': { venue:'فيلا مهجورة', locality:'قرية ميت العز', divisionType:'مركز', district:'ههيا', governorate:'الشرقية' },
  'buffalo-case': { venue:'زريبة الحاج عبد العال', locality:'قرية شما', divisionType:'مركز', district:'أشمون', governorate:'المنوفية' },
  'charity-funds': { venue:'مقر جمعية خيرية', locality:'حي سموحة', divisionType:'قسم', district:'سيدي جابر', governorate:'الإسكندرية' },
  'closed-file': { venue:'بيت الضابط المتقاعد', locality:'مدينة ملوي', divisionType:'مركز', district:'ملوي', governorate:'المنيا' },
  'coded-message': { venue:'فيلا رجل أعمال', locality:'مدينة الشيخ زايد', divisionType:'قسم', district:'الشيخ زايد', governorate:'الجيزة' },
  'dark-testimony': { venue:'قاعة أفراح', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'dating-app': { venue:'مقهى بوسط البلد', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'dawn-call': { venue:'بيت العائلة', locality:'قرية البتانون', divisionType:'مركز', district:'شبين الكوم', governorate:'المنوفية' },
  'dawn-club': { venue:'نادٍ ليلي', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'deleted-scene': { venue:'استوديو إنتاج سينمائي', locality:'مدينة الإنتاج الإعلامي', divisionType:'قسم', district:'أول 6 أكتوبر', governorate:'الجيزة' },
  'exam-leak': { venue:'مدرسة ثانوية', locality:'قرية محلة مرحوم', divisionType:'مركز', district:'طنطا', governorate:'الغربية' },
  'fake-audio': { venue:'شركة مقاولات', locality:'التجمع الخامس', divisionType:'قسم', district:'أول القاهرة الجديدة', governorate:'القاهرة' },
  'false-rumor': { venue:'بيت العائلة', locality:'قرية بياض العرب', divisionType:'مركز', district:'بني سويف', governorate:'بني سويف' },
  'final-testament': { venue:'فيلا على الساحل الشمالي', locality:'مدينة العلمين', divisionType:'مركز', district:'العلمين', governorate:'مطروح' },
  'finish-line': { venue:'مسار الماراثون السنوي', locality:'مدينة الإسماعيلية', divisionType:'قسم', district:'ثالث الإسماعيلية', governorate:'الإسماعيلية' },
  'flat-12b': { venue:'عمارة سكنية', locality:'حي مصر الجديدة', divisionType:'قسم', district:'مصر الجديدة', governorate:'القاهرة' },
  'forged-canvas': { venue:'جاليري فني', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'forged-will': { venue:'مكتب محاماة', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'ghost-author': { venue:'دار نشر', locality:'حي الزمالك', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'grandma-ring': { venue:'قاعة أفراح', locality:'مدينة أجا', divisionType:'مركز', district:'أجا', governorate:'الدقهلية' },
  'hit-and-run': { venue:'شارع رئيسي', locality:'مدينة الشيخ زايد', divisionType:'قسم', district:'الشيخ زايد', governorate:'الجيزة' },
  'illusion-startup': { venue:'حاضنة أعمال ناشئة', locality:'مدينة 6 أكتوبر', divisionType:'قسم', district:'أول 6 أكتوبر', governorate:'الجيزة' },
  'last-bell': { venue:'مدرسة ثانوية حكومية', locality:'قرية دميرة', divisionType:'مركز', district:'المنصورة', governorate:'الدقهلية' },
  'last-call': { venue:'موقف سيارات خاص', locality:'التجمع الخامس', divisionType:'قسم', district:'أول القاهرة الجديدة', governorate:'القاهرة' },
  'last-dish': { venue:'استوديو برنامج طبخ', locality:'مدينة الإنتاج الإعلامي', divisionType:'قسم', district:'أول 6 أكتوبر', governorate:'الجيزة' },
  'last-episode': { venue:'استوديو منزلي', locality:'حي المعادي', divisionType:'قسم', district:'المعادي', governorate:'القاهرة' },
  'last-laugh': { venue:'مسرح صغير', locality:'مدينة دمنهور', divisionType:'مركز', district:'دمنهور', governorate:'البحيرة' },
  'last-rehearsal': { venue:'المسرح القومي', locality:'ميدان العتبة', divisionType:'قسم', district:'الأزبكية', governorate:'القاهرة' },
  'last-update': { venue:'مكاتب شركة تكنولوجيا', locality:'التجمع الخامس', divisionType:'قسم', district:'أول القاهرة الجديدة', governorate:'القاهرة' },
  'leaked-video': { venue:'شقة ياسمين', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'lost-wallet': { venue:'مكتب استثماري', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'missing-bride': { venue:'قاعة أفراح', locality:'مدينة العياط', divisionType:'مركز', district:'العياط', governorate:'الجيزة' },
  'missing-twin': { venue:'شقة التوأم', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'mud-print': { venue:'ورشة نجارة', locality:'قرية كفر داود', divisionType:'مركز', district:'السادات', governorate:'المنوفية' },
  'nile-cruise': { venue:'مرسى الرحلات النيلية', locality:'مدينة إسنا', divisionType:'مركز', district:'إسنا', governorate:'الأقصر' },
  'no-witness-night': { venue:'قاعة أفراح', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'number-19': { venue:'أكاديمية كرة قدم', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'old-estate': { venue:'عزبة العائلة', locality:'قرية أبيار', divisionType:'مركز', district:'كفر الزيات', governorate:'الغربية' },
  'old-photo': { venue:'بيت عائلي قديم', locality:'مدينة سمالوط', divisionType:'مركز', district:'سمالوط', governorate:'المنيا' },
  'one-comment': { venue:'استوديو تصوير منزلي', locality:'حي مدينة نصر', divisionType:'قسم', district:'أول مدينة نصر', governorate:'القاهرة' },
  'opening-night': { venue:'مسرح صغير', locality:'مدينة المنصورة', divisionType:'مركز', district:'المنصورة', governorate:'الدقهلية' },
  'overbilled': { venue:'مطعم شعبي', locality:'مدينة طنطا', divisionType:'مركز', district:'طنطا', governorate:'الغربية' },
  'postponed-engagement': { venue:'بيت العروسة', locality:'مدينة أجا', divisionType:'مركز', district:'أجا', governorate:'الدقهلية' },
  'recorded-voice': { venue:'استوديو إذاعة', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'red-thread': { venue:'أتيليه أزياء', locality:'حي الزمالك', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'role-of-lifetime': { venue:'استوديو مسلسل تاريخي', locality:'مدينة الإنتاج الإعلامي', divisionType:'قسم', district:'أول 6 أكتوبر', governorate:'الجيزة' },
  'room-307': { venue:'فندق بوسط البلد', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'second-face': { venue:'شقة الممثلة', locality:'حي الزمالك', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'secret-clinic': { venue:'عيادة داخل شقة سكنية', locality:'مدينة المنصورة', divisionType:'مركز', district:'المنصورة', governorate:'الدقهلية' },
  'secret-recipe': { venue:'فيلا الشيف', locality:'قرية أبو رواش', divisionType:'مركز', district:'كرداسة', governorate:'الجيزة' },
  'shifting-painting': { venue:'مخزن مجموعة فنية', locality:'حي الزمالك', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'suspicious-transfer': { venue:'فرع بنك', locality:'وسط البلد', divisionType:'قسم', district:'قصر النيل', governorate:'القاهرة' },
  'vanished-wife': { venue:'بيت منى', locality:'حي سيدي بشر', divisionType:'قسم', district:'أول المنتزه', governorate:'الإسكندرية' },
  'var-conspiracy': { venue:'استاد المدينة', locality:'مدينة الإسماعيلية', divisionType:'قسم', district:'ثالث الإسماعيلية', governorate:'الإسماعيلية' },
  'vault-key': { venue:'متحف خاص', locality:'مدينة القرنة', divisionType:'مركز', district:'القرنة', governorate:'الأقصر' },
  'warehouse-fire': { venue:'مخزن بالمنطقة الصناعية', locality:'مدينة السادات', divisionType:'مركز', district:'السادات', governorate:'المنوفية' },
  'wedding-gold': { venue:'قاعة أفراح', locality:'قرية أبيار', divisionType:'مركز', district:'كفر الزيات', governorate:'الغربية' },
});

function caseLocationText(caseData, includeVenue=false){
  const loc = caseData && caseData.location;
  if(!loc) return '';
  const admin = [loc.locality, `${loc.divisionType} ${loc.district}`, `محافظة ${loc.governorate}`].filter(Boolean).join('، ');
  return includeVenue && loc.venue ? `${loc.venue} — ${admin}` : admin;
}

(function applyCaseLocations(){
  if(typeof CASES_REGISTRY === 'undefined') return;
  CASES_REGISTRY.forEach(caseData=>{
    const loc = CASE_LOCATIONS[caseData.id];
    if(loc) caseData.location = Object.freeze({ ...loc });
  });
})();
