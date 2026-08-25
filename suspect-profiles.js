/* ============================================================
   طرف الخيط — ملفات تعريف الشخصيات 2026-08-23
   طبقة ثابتة ومحايدة لبيانات التحريات الإدارية.

   - السن والمهنة والعنوان مبنيين على دور الشخصية وسياق القضية.
   - لا توجد مخالفات/محاضر عشوائية؛ السجل الإداري محايد للجميع.
   - لا تُضاف أي معلومة تكشف الجاني أو تقرّب اللاعب من الحل.
   - تُطبّق بعد investigation-overhaul حتى تلغي أي بيانات مولّدة قديمة.
   ============================================================ */
(() => {
  'use strict';

  const VERSION = '2026-08-25-profiles-v3';

  function hash(text){
    let h = 2166136261 >>> 0;
    for (const ch of String(text || '')) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function pick(items, seed){
    if (!Array.isArray(items) || !items.length) return '';
    return items[Math.abs(seed) % items.length];
  }

  const ADDRESS_POOLS = {
    'القاهرة': ['مدينة نصر','مصر الجديدة','المعادي','شبرا','الزيتون','حدائق القبة','عين شمس','المقطم'],
    'الجيزة': ['الدقي','العجوزة','الهرم','فيصل','إمبابة','مدينة 6 أكتوبر','الشيخ زايد','البدرشين'],
    'الإسكندرية': ['سموحة','سيدي بشر','سيدي جابر','محرم بك','ميامي','العصافرة','العجمي'],
    'المنوفية': ['شبين الكوم','مدينة السادات','قويسنا','منوف','أشمون','الباجور','تلا'],
    'الغربية': ['طنطا','المحلة الكبرى','كفر الزيات','السنطة','قطور','بسيون'],
    'الدقهلية': ['المنصورة','طلخا','ميت غمر','أجا','السنبلاوين','دكرنس'],
    'الشرقية': ['الزقازيق','بلبيس','منيا القمح','أبو كبير','ههيا','فاقوس'],
    'البحيرة': ['دمنهور','كفر الدوار','إيتاي البارود','كوم حمادة','أبو حمص','رشيد'],
    'القليوبية': ['بنها','شبرا الخيمة','قليوب','طوخ','العبور','الخانكة'],
    'بني سويف': ['مدينة بني سويف','الواسطى','ناصر','ببا','إهناسيا'],
    'المنيا': ['مدينة المنيا','ملوي','سمالوط','بني مزار','أبو قرقاص'],
    'أسيوط': ['مدينة أسيوط','ديروط','القوصية','أبنوب','منفلوط'],
    'سوهاج': ['مدينة سوهاج','أخميم','جرجا','طهطا','المراغة'],
    'قنا': ['مدينة قنا','نجع حمادي','قوص','دشنا','أبو تشت'],
    'الأقصر': ['مدينة الأقصر','إسنا','أرمنت','القرنة','الطود'],
    'أسوان': ['مدينة أسوان','كوم أمبو','إدفو','دراو','نصر النوبة'],
    'الإسماعيلية': ['مدينة الإسماعيلية','فايد','أبو صوير','التل الكبير','القنطرة غرب'],
    'السويس': ['حي السويس','الأربعين','عتاقة','فيصل','الجناين'],
    'بورسعيد': ['حي الشرق','حي العرب','حي الضواحي','بورفؤاد'],
    'دمياط': ['مدينة دمياط','دمياط الجديدة','رأس البر','فارسكور','كفر سعد'],
    'كفر الشيخ': ['مدينة كفر الشيخ','دسوق','بلطيم','بيلا','سيدي سالم'],
    'الفيوم': ['مدينة الفيوم','سنورس','إطسا','أبشواي','طامية'],
    'مطروح': ['مرسى مطروح','العلمين','الحمام','الضبعة'],
  };

  const NEUTRAL_JOBS = [
    'موظف إداري','محاسب','موظف مبيعات','مندوب مبيعات','موظف مشتريات',
    'مشرف تشغيل','موظف خدمة عملاء','صاحب نشاط تجاري صغير','موظف موارد بشرية','مسؤول مخازن'
  ];

  // أعمار ثابتة للحالات الحساسة اللي السن فيها جزء من منطق القصة أو العلاقة العائلية.
  const AGE_OVERRIDES = {
    'number-19': { sameh_agent:38, youssef_father:51, rival_player:21, coach_ashraf:47 },
    'role-of-lifetime': { writer_dalia:36, producer_hesham:49, son_yehia:41, journalist_kareem:68 },
    'final-testament': { mounir:44, laila:32, samah:39, nadia:49, adel:55, karim:36 },
    'missing-bride': { tawfiq:58, khalil:56, ziad:29, omar:30, sayed:48, hala:28 },
    'dark-testimony': { dina:27, omar:29, karim:31, sameh:39, ahmed:30 },
    'buffalo-case': { sheikh:63, baker:57, tuktuk:33, nabawiya:69, son:25, rizq:58, dayab:47, hosni:30 },
    'buffalo': { sheikh:63, baker:57, tuktuk:33, nabawiya:69, son:25, rizq:58, dayab:47, hosni:30 },
    'old-photo': { uncle_adham:37, aunt_widad:61, business_partner_naeem:63, childhood_friend_ramzy:62 },
    'old-estate': { sister_dalia:37, cousin_marwan:44, widow_samira:66, nephew_youssef_o:31 },
    'closed-file': { old_suspect_hamed:69, former_colleague_nasser:68, victim_family_laila_f:65, hamed_son_tarek_f:43 },
    'forged-will': { elder_son_karim_w:43, younger_daughter_rana_w:34, accountant_sherif_w:50, family_friend_nabil:62 },
    'missing-twin': { twin_karim:31, girlfriend_nourhan:28, family_lawyer_essam:49 },
    'room-307': { amr_husband:37, dina_sister:33, walid_manager:48, sayed_employee:29 },
    'dawn-call': { twin_brother_maged:44, business_partner_fadi:46, mechanic_hassan:53, voice_actor_sami:42 },
    'postponed-engagement': { exgirlfriend_dalia_p:27, best_man_tamer_p:29, brides_father_sameh_p:56, debt_collector_hassan_p:43 },
    'wedding-gold': { amm_gaber:53, mennat:26, ibrahim:34, reda_waiter:29 },
    'secret-clinic': { unlicensed_doctor_sabry:46, assistant_ghada:32, landlord_atef:55, friend_donia:28 },
    'no-witness-night': { essam_accused:30, kareem_lookalike:31, yara_witness:28, lawyer_nour:45 },
    'false-rumor': { salma_victim:26, yasmin_exfiancee:28, rawan_neighbor:32, khaled_fiance:29 },
    'var-conspiracy': { yassin_player:25, coach_hazem:46, mostafa_var_official:38, ramy_data_feed:34 },
    'last-episode': { mona:36, karim:38, sara:33, yassin:35 },
    'ghost-author': { nourhan:31, hassan:29, mona_editor:45, tarek:37, sameh_writer:39 },
  };

  // مهن مكتوبة يدويًا للشخصيات اللي وصفها الدرامي لا يحتوي على اسم المهنة.
  // ده يمنع سقوطها في قائمة الوظائف العامة وظهور مهنة غير منطقية داخل سياق القضية.
  const OCCUPATION_OVERRIDES = {
    'buffalo-case': { nabawiya:'ربة منزل', rizq:'مزارع وصاحب أرض زراعية' },
    'buffalo': { nabawiya:'ربة منزل', rizq:'مزارع وصاحب أرض زراعية' },
  };

  function roleText(s){
    return String((s && s.role) || '').trim();
  }

  function contextualAge(c, s, seed){
    const override = AGE_OVERRIDES[c.id] && AGE_OVERRIDES[c.id][s.id];
    if (override) return override;

    const r = roleText(s).toLowerCase();
    const between = (min,max) => min + (seed % (max-min+1));

    if (/طفل|طفلة|ابتدائ/.test(r)) return between(9,13);
    if (/مراهق|مراهقة|طالب ثانوي|طالبة ثانوي|ناشئ/.test(r)) return between(16,19);
    if (/طالب|طالبة/.test(r)) return between(19,23);
    if (/جد|جدة/.test(r)) return between(63,75);
    if (/متقاعد|قديم في الشرطة|زميل .* القديم/.test(r)) return between(58,69);
    if (/والد|والدة|أبو |أم |والد العريس|والد العروسة/.test(r)) return between(49,60);
    if (/عم |عمة|خال|خالة|أرملة/.test(r)) return between(43,60);
    if (/مدير|مديرة|رئيس|صاحب|صاحبة|مالك|مالكة|محامي|طبيب|دكتور|مدرب|كابتن/.test(r)) return between(36,54);
    if (/خطيب|خطيبة|عريس|عروسة|صديق|صديقة|زميل|زميلة|حبيب|حبيبة|عارض|عارضة|لاعب|عداء/.test(r)) return between(24,36);
    if (/مساعد|مساعدة|موظف|موظفة|نادل|عاملة|عامل|سائق|سواق|فني|مبرمج|مطور/.test(r)) return between(27,42);
    return between(28,47);
  }

  function occupationFor(c, s, seed){
    const override = OCCUPATION_OVERRIDES[c.id] && OCCUPATION_OVERRIDES[c.id][s.id];
    if (override) return override;

    const r = roleText(s).toLowerCase();
    if (/إمام|شيخ/.test(r)) return 'إمام وخطيب';
    if (/بياعة|بائع/.test(r)) return 'تجارة تجزئة';
    if (/سواق توك|سائق توك/.test(r)) return 'سائق توك توك';
    if (/سمسار مواشي/.test(r)) return 'سمسار مواشي';
    if (/رعاية المواشي|راعي/.test(r)) return 'عامل في تربية المواشي';
    if (/طالب|طالبة|ناشئ|تلميذ/.test(r)) return 'طالب';
    if (/محامي/.test(r)) return 'محامي';
    if (/طبيب|دكتور/.test(r)) return 'طبيب';
    if (/ممرض|ممرضة/.test(r)) return 'تمريض ورعاية صحية';
    if (/صيدلي/.test(r)) return 'صيدلي';
    if (/شيف|طباخ/.test(r)) return 'طاهٍ محترف';
    if (/مذيع|مذيعة|إذاع/.test(r)) return 'إعلام وإذاعة';
    if (/صحفي/.test(r)) return 'صحفي';
    if (/كاتب|كاتبة|سيناريو/.test(r)) return 'كاتب';
    if (/ممثل أصوات/.test(r)) return 'ممثل ومؤدي صوتي';
    if (/ممثل|ممثلة|كوميديان/.test(r)) return 'فنون وأداء';
    if (/عارضة|عارض/.test(r)) return 'عارض أزياء';
    if (/مخرج/.test(r)) return 'إخراج وإنتاج فني';
    if (/منتج|إنتاج/.test(r)) return 'إنتاج وإدارة فنية';
    if (/مدرس|مدرّس|معلم|معلمة|أستاذ/.test(r)) return 'مجال التعليم';
    if (/مهندس صوت/.test(r)) return 'مهندس صوت';
    if (/مهندس/.test(r)) return 'مهندس';
    if (/مطور|مبرمج|تقني|ذكاء اصطناعي/.test(r)) return 'تكنولوجيا وبرمجيات';
    if (/مصمم|مصممة|ستايلست|أزياء/.test(r)) return 'تصميم وأزياء';
    if (/ترميم/.test(r)) return 'ترميم وحفظ أعمال فنية';
    if (/محاسب|محاسبة/.test(r)) return 'محاسب';
    if (/بنك|صرف|فرع/.test(r)) return 'خدمات مصرفية';
    if (/مستثمر|ممول/.test(r)) return 'استثمار وإدارة أعمال';
    if (/رجل أعمال|سيدة أعمال|شريك عمل|شريكة/.test(r)) return 'إدارة أعمال';
    if (/مدير أعمال/.test(r)) return 'إدارة أعمال فنية وتجارية';
    if (/مدير|مديرة|رئيس/.test(r)) return 'إدارة وتشغيل';
    if (/صاحب|صاحبة|مالك|مالكة/.test(r)) return 'صاحب نشاط خاص';
    if (/سائق|سايق/.test(r)) return 'سائق محترف';
    if (/حارس|أمن|بواب/.test(r)) return 'أمن وخدمات';
    if (/نادل|ضيافة/.test(r)) return 'ضيافة وخدمة عملاء';
    if (/مورد/.test(r)) return 'تجارة وتوريدات';
    if (/نجار/.test(r)) return 'نجار';
    if (/سباك/.test(r)) return 'سباك وفني صيانة';
    if (/ميكانيكي/.test(r)) return 'ميكانيكي سيارات';
    if (/عامل|فني|فراش/.test(r)) return 'فني وعامل مهني';
    if (/مدرب/.test(r)) return 'مدرب رياضي';
    if (/عداء|لاعب/.test(r)) return 'رياضي محترف';
    if (/تحصيل|ديون/.test(r)) return 'تحصيل ومتابعة مالية';
    if (/سكرتير|سكرتيرة|مساعدة|مساعد/.test(r)) return 'مساعد إداري';
    if (/مصور|تصوير/.test(r)) return 'تصوير وإنتاج بصري';
    if (/متحف|تحف|لوحات/.test(r)) return 'مجال الفنون والمقتنيات';
    return pick(NEUTRAL_JOBS, seed);
  }

  function governorateFor(c){
    const loc = c && c.location;
    return (loc && loc.governorate) || 'القاهرة';
  }

  function addressFor(c, s, seed){
    const gov = governorateFor(c);
    const loc = (c && c.location) || {};
    const pool = ADDRESS_POOLS[gov] || [loc.district, loc.locality, `مدينة ${gov}`].filter(Boolean);
    let place = pick(pool.length ? pool : [`مدينة ${gov}`], seed);

    if (pool.length > 1 && (place === loc.locality || place === loc.district)) {
      place = pool[(seed + 1) % pool.length];
    }
    return `${place}، محافظة ${gov}`;
  }

  function searchAreaFor(c){
    const loc = (c && c.location) || {};
    const parts = [loc.district || loc.locality, loc.governorate].filter(Boolean);
    return parts.length ? parts.join('، ') : 'نطاق محل الإقامة المسجل';
  }

  function isHumanSuspect(s){
    const text = `${s && s.id || ''} ${s && s.name || ''} ${s && s.role || ''}`;
    return !/عفريت|شبح|ghost/i.test(text);
  }

  function applyProfiles(){
    if (typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return false;

    let cases = 0;
    let people = 0;
    CASES_REGISTRY.forEach(c => {
      if (!c || !Array.isArray(c.suspects)) return;
      cases += 1;
      c.suspects.forEach((s, index) => {
        if (!s || !isHumanSuspect(s)) return;
        const seed = hash(`${c.id}|${s.id}|profile-v2|${index}`);
        const age = contextualAge(c, s, seed);

        s.age = age;
        s.address = addressFor(c, s, seed);
        s.occupation = occupationFor(c, s, seed);
        s.backgroundCheck = {
          age,
          occupation: s.occupation,
          address: s.address,
          searchArea: searchAreaFor(c),
          records: [],
          recordSummary: 'لا توجد سوابق جنائية أو ملاحظات إدارية مسجلة في الاستعلام التعريفي.',
          administrativeNotes: 'بيانات تعريفية محايدة فقط، ولا تمثل دليلًا على صلة الشخص بالواقعة الحالية.',
          profileVersion: VERSION,
        };
        people += 1;
      });
    });

    if (typeof window !== 'undefined') {
      window.__TARAF_SUSPECT_PROFILE_AUDIT__ = { version: VERSION, cases, people };
    }
    return true;
  }

  function boot(){
    let tries = 0;
    const run = () => {
      tries += 1;
      if (applyProfiles()) return;
      if (tries < 40) setTimeout(run, 50);
    };
    run();
  }

  if (typeof document === 'undefined') {
    applyProfiles();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once:true });
  } else {
    setTimeout(boot, 0);
  }

  if (typeof window !== 'undefined') {
    window.TarafSuspectProfiles = { version: VERSION, apply: applyProfiles };
  }
})();
