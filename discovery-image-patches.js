/* ============================================================
   صور الاكتشافات الواقعية — ربط الصور المخصصة بالقضايا
   يعمل بعد discovery-locks.js، ولا يغيّر الوضع العادي.
   ============================================================ */
(() => {
  'use strict';
  if (typeof CASES_REGISTRY === 'undefined' || !Array.isArray(CASES_REGISTRY)) return;

  const byId = id => CASES_REGISTRY.find(c => c && c.id === id);
  const lock = (c, id) => (c && Array.isArray(c.discoveryLocks) ? c.discoveryLocks : []).find(x => x && x.id === id);
  const setClue = (c, evidenceId, notes) => {
    if (!c || !evidenceId) return;
    c.realisticDiscoveryClues = c.realisticDiscoveryClues || {};
    c.realisticDiscoveryClues[evidenceId] = Array.isArray(notes) ? notes : [String(notes || '')];
  };
  const patchLock = (c, id, patch) => {
    const item = lock(c, id);
    if (item) Object.assign(item, patch || {});
  };

  // باب 307
  {
    const c = byId('room-307');
    if (c) {
      patchLock(c, 'real_room307_phone', {
        image:'images/room-307/realistic-hala-phone-locked.jpg',
        imageAlt:'هاتف هالة المقفول برمز من أربعة أرقام'
      });
      patchLock(c, 'real_room307_archive', {
        image:'images/room-307/realistic-hala-note-4b.jpg',
        imageAlt:'مسودة هاتف هالة التي تشير إلى ملف 4B'
      });
    }
  }

  // خطوبة مؤجلة — لا تكشف المسؤول من المداهمة نفسها.
  {
    const c = byId('postponed-engagement');
    if (c) {
      setClue(c, 'tamer_p_confession', [
        'هنا افتكرت تفصيلة شخصية: أول مقابلة حقيقية بينها وبين معتز كانت يوم 14 فبراير، ومعتز كان بيحب يستخدم تواريخ المناسبات المهمة كرموز سهلة يفتكرها.'
      ]);
      setClue(c, 'hassan_p_location_witness', [
        'شهادة البواب خلت مراجعة كاميرا العمارة منطقية. في اللقطة، ركّز على رقم اللوحة قبل ما تعمل مطابقة للمركبة.'
      ]);
      c.discoveryLocks = [
        {
          id:'real_engagement_phone', kind:'هاتف مقفول', label:'هاتف معتز',
          introText:'هاتف معتز عليه PIN من 4 أرقام. استخدم التاريخ الشخصي اللي ظهر بعد مراجعة كلام تامر وهنا، واكتب اليوم ثم الشهر.',
          lockedText:'لسه محتاج تفصيلة شخصية موثوقة تساعدك تفهم رمز الهاتف.',
          requires:['tamer_p_confession'], inputMode:'numeric', maxLength:4, placeholder:'••••',
          acceptedAnswers:['1402'], wrongMsg:'✗ الهاتف ما فتحش. راجع التاريخ الشخصي وترتيب اليوم ثم الشهر.',
          successText:'الهاتف اتفتح، وسجل المكالمات كشف اتصال ضغط قبل الاختفاء.',
          resultText:'فتح الهاتف كشف مكالمة ضغط مرتبطة بموضوع الدين. المكالمة خيط مهم، لكنها لا تثبت وحدها مين احتجز معتز.',
          resultEvidenceIds:['hassan_p_pressure_call'], sourceIds:['tamer_p_confession'],
          image:'images/postponed-engagement/realistic-motaz-phone-locked.jpg',
          imageAlt:'هاتف معتز المقفول قبل إدخال رمز الدخول'
        },
        {
          id:'real_engagement_vehicle', kind:'سجل مركبات', label:'مطابقة عربية الكاميرا',
          introText:'بعد شهادة البواب، راجع لقطة الكاميرا واكتب رقم اللوحة الظاهر عشان تعمل مطابقة رسمية للمركبة.',
          lockedText:'لسه محتاج شاهد يحط العربية في المكان قبل ما تعتمد لقطة الكاميرا.',
          requires:['hassan_p_location_witness'], requiresDiscoveries:['real_engagement_phone'],
          inputMode:'text', maxLength:16, placeholder:'رقم اللوحة...', acceptedAnswers:['س م د 4821','سمد4821','4821'],
          wrongMsg:'✗ اللوحة مش مطابقة. ركّز في الأرقام والحروف الظاهرة في لقطة الكاميرا.',
          successText:'تمت مطابقة المركبة، واتسجلت اللقطة كدليل قابل للتتبع.',
          resultText:'رقم اللوحة طابق العربية محل التتبع. ده يثبت حركة المركبة، من غير ما يحسم وحده مين المسؤول عن الاحتجاز.',
          resultEvidenceIds:['hassan_p_vehicle_camera'], sourceIds:['hassan_p_location_witness'],
          image:'images/postponed-engagement/realistic-vehicle-camera-4821.jpg',
          imageAlt:'لقطة كاميرا ليلية للعربية ولوحتها س م د 4821'
        }
      ];
    }
  }

  // الرسالة المشفرة
  {
    const c = byId('coded-message');
    if (c) {
      setClue(c, 'soad_c_tenure', [
        'سعاد قالت إن للعيلة عقارًا قديمًا اسمه مرتبط بالنخيل، وإن فيه مخزن خدمة منفصل. استخدم المعلومة كمرساة لفك الورقة، من غير ما تفترض الاسم كاملًا.'
      ]);
      patchLock(c, 'real_coded_property', {
        label:'فك اسم العقار من الرسالة',
        introText:'راجع الورقة المشفرة مع خيط سعاد عن العقار القديم، واستخرج اسم المكان كاملًا ثم اكتبه كما ظهر لك.',
        lockedText:'لسه محتاج خيط عن العقار القديم قبل ما تقدر تثبت قراءة الشفرة.',
        requires:['ransom_note','soad_c_tenure'], acceptedAnswers:['فيلا النخيل','النخيل'],
        image:'images/coded-message/realistic-coded-note.jpg',
        imageAlt:'الرسالة المشفرة الأصلية مع الرموز وملاحظات التحليل'
      });
      patchLock(c, 'real_coded_storage', {
        image:'images/coded-message/realistic-storage-b12.jpg',
        imageAlt:'صندوق الأرشيف أو المخزن الذي يحمل المرجع B-12',
        acceptedAnswers:['B12','B-12','b12','b-12','ب12','ب-12']
      });
    }
  }

  // الوشاية
  {
    const c = byId('false-rumor');
    if (c) {
      setClue(c, 'source_trace', ['في نسخة المصدر الأولى فيه رقم مصدر جزئي. كبّر بيانات المصدر واقرأ آخر أربعة أرقام بنفسك.']);
      setClue(c, 'sender_line_record', ['في تقرير تفعيل الخط فيه مرجع قصير لبصمة الجهاز. استخدم المرجع الظاهر في التقرير للمطابقة الفنية.']);
      patchLock(c, 'real_rumor_sender', {
        image:'images/false-rumor/realistic-anonymous-post.jpg', imageAlt:'المنشور المجهول وبيانات مصدر الإرسال الأول'
      });
      patchLock(c, 'real_rumor_device', {
        image:'images/false-rumor/realistic-device-activation-d14.jpg', imageAlt:'سجل تفعيل الخط ومرجع بصمة الجهاز D14'
      });
    }
  }

  // المحفظة المفقودة
  {
    const c = byId('lost-wallet');
    if (c) {
      patchLock(c, 'real_wallet_laptop', {
        image:'images/lost-wallet/realistic-malek-laptop-locked.jpg', imageAlt:'لابتوب مالك المقفول برمز دخول من أربعة أرقام'
      });
      patchLock(c, 'real_wallet_exchange', {
        image:'images/lost-wallet/realistic-platform-nx204.jpg', imageAlt:'نتيجة البحث المالي للمرجع NX-204'
      });
    }
  }

  // دهب الفرح
  {
    const c = byId('wedding-gold');
    if (c) {
      setClue(c, 'video_clip', ['في لقطة مسار الحركة فيه كارت ترابيزة ظاهر للحظة. كبّر الصورة واقرأ الرقم بدل ما تعتمد على الوصف.']);
      setClue(c, 'route_reconstruction', ['على نقطة من الممر الجانبي فيه صندوق خدمة بكود واضح. استخدم الكود الظاهر في الصورة لتتبعه في سجل القاعة.']);
      patchLock(c, 'real_gold_table', {
        image:'images/wedding-gold/realistic-table-14.jpg', imageAlt:'ترابيزة الفرح التي تحمل الرقم 14'
      });
      patchLock(c, 'real_gold_box', {
        image:'images/wedding-gold/realistic-service-box-kh12.jpg', imageAlt:'صندوق الخدمة الذي يحمل الكود خ-12'
      });
    }
  }

  // حريق المخزن
  {
    const c = byId('warehouse-fire');
    if (c) {
      setClue(c, 'hosny_farid_payment', ['الإيصال نفسه عليه مرجع عملية مستقل. استخدم المرجع في المطابقة بدل الاكتفاء باسم المحوَّل إليه.']);
      setClue(c, 'farid_route_access', ['مخطط المخزن يبين اسم الممر اللي يتفادى غرفة الحراسة. اكتب اسم المسار كما هو ظاهر في المخطط.']);
      c.discoveryLocks = [
        {
          id:'real_warehouse_transfer', kind:'مراجعة تحويل', label:'مطابقة إيصال التحويل',
          introText:'راجع إيصال التحويل المشبوه واكتب مرجع العملية عشان تطابقه مع سجل المدفوعات.',
          lockedText:'لسه ما كشفتش التحويل غير المبرر بين حسني وفريد.', requires:['hosny_farid_payment'],
          inputMode:'text', maxLength:16, placeholder:'مرجع العملية...', acceptedAnswers:['HF-18750','HF18750','hf-18750','hf18750'],
          wrongMsg:'✗ المرجع مش مطابق للإيصال.', successText:'تمت مطابقة الإيصال مع التحويل المسجل قبل الحريق.',
          resultText:'التوقيت والقيمة والمرجع اتطابقوا. التحويل يثبت رابطًا ماليًا، لكنه لا يثبت تنفيذ الحريق وحده.',
          sourceIds:['hosny_farid_payment'], image:'images/warehouse-fire/realistic-payment-transfer.jpg',
          imageAlt:'إيصال تحويل من شركة النسيج الذهبي إلى فريد بمرجع HF-18750'
        },
        {
          id:'real_warehouse_route', kind:'مخطط موقع', label:'تحديد مسار الدخول الجانبي',
          introText:'راجع مخطط المخزن واكتب اسم الممر اللي يسمح بالوصول لنقطة الاشتعال بعيدًا عن الكاميرا والحراسة الرئيسية.',
          lockedText:'لسه ما أعدتش بناء مسار الوصول لنقطة الاشتعال.', requires:['farid_route_access'], requiresDiscoveries:['real_warehouse_transfer'],
          inputMode:'text', maxLength:32, placeholder:'اسم المسار...',
          acceptedAnswers:['ممر الخدمة الجانبي','ممر الخدمه الجانبي','الممر الجانبي','ممر الخدمة'],
          wrongMsg:'✗ المسار مش مطابق للمخطط.', successText:'المخطط أكد مسار الدخول الجانبي ونقطة العمى.',
          resultText:'المسار يثبت إمكانية الوصول من غير المرور بالحراسة، ويحتاج يفضل مربوط بباقي الأدلة قبل الاتهام.',
          sourceIds:['farid_route_access'], image:'images/warehouse-fire/realistic-side-corridor-plan.jpg',
          imageAlt:'مخطط المخزن موضحًا ممر الخدمة الجانبي ونقطة الحريق'
        }
      ];
    }
  }

  // الطبخة الأخيرة
  {
    const c = byId('last-dish');
    if (c) {
      setClue(c, 'fridge_log', ['راجع سجل الدخول المصور وحدد آخر توقيت متأخر ظاهر في الكشف. استخدم التوقيت كمرجع مراجعة، من غير ما تعتبر اسم المستخدم وحده اتهامًا.']);
      setClue(c, 'oil_bottle_moved', ['الزجاجة اللي اتحركت عليها ملصق مخزون صغير. اقرأ كود المخزون من الصورة عشان تطلب فحص العينة الصحيحة.']);
      c.discoveryLocks = [
        {
          id:'real_lastdish_access', kind:'سجل دخول', label:'مراجعة توقيت الدخول المتأخر',
          introText:'في كشف الدخول المصور فيه توقيت متأخر لافت. اكتب التوقيت كاملًا كما هو ظاهر في آخر دخول غير معتاد.',
          lockedText:'لسه ما وصلت لسجل دخول منطقة المكونات.', requires:['fridge_log'],
          inputMode:'text', maxLength:12, placeholder:'00:00:00', acceptedAnswers:['00:47:33','004733','0:47:33'],
          wrongMsg:'✗ التوقيت مش مطابق للسجل المصور.', successText:'تم تثبيت التوقيت كمرجع للمقارنة مع بقية حركة المطبخ.',
          resultText:'التوقيت بقى نقطة زمنية قابلة للمقارنة، لكنه لا يحدد شخصًا مسؤولًا وحده.',
          sourceIds:['fridge_log'], image:'images/last-dish/realistic-kitchen-access-log.jpg',
          imageAlt:'سجل دخول المطبخ والتوقيتات المسجلة قبل الواقعة'
        },
        {
          id:'real_lastdish_oil', kind:'تتبع عينة', label:'مطابقة زجاجة زيت الأعشاب',
          introText:'الزجاجة اللي اتحركت عليها كود مخزون. اكتبه عشان تطلب تحليل نفس العبوة بدل أي زجاجة مشابهة.',
          lockedText:'لسه ما ثبتش إن زجاجة الزيت اتحركت قبل التقديم.', requires:['oil_bottle_moved'], requiresDiscoveries:['real_lastdish_access'],
          inputMode:'text', maxLength:16, placeholder:'كود المخزون...', acceptedAnswers:['1-24-07-B','12407B','1 24 07 B','1-24-07B'],
          wrongMsg:'✗ الكود مش مطابق لملصق الزجاجة.', successText:'تم تحديد العبوة الصحيحة للفحص الفني.',
          resultText:'مطابقة العبوة تمنع خلط العينات، وتخلي نتائج الفحص مرتبطة بالزجاجة اللي ظهرت في مسار القضية.',
          sourceIds:['oil_bottle_moved'], image:'images/last-dish/realistic-oil-container-clue.jpg',
          imageAlt:'زجاجة زيت الأعشاب وملصق المخزون 1-24-07-B'
        }
      ];
    }
  }

  // العزبة القديمة
  {
    const c = byId('old-estate');
    if (c) {
      setClue(c, 'poisoned_plate', ['بعد تحديد إن طبق وليد وحده ملوّث، فتش مخزن المستلزمات عن عبوة غير معتادة وسجل كودها بدل افتراض مصدر المادة.']);
      setClue(c, 'dalia_serving', ['بعد ما عرفت مين وزّع الأطباق، طابق مكان طبق الضحية على السفرة قبل ما تبني استنتاج عن مين اقترب منه.']);
      c.discoveryLocks = [
        {
          id:'real_estate_bottle', kind:'جرد مخزن', label:'مطابقة العبوة الموجودة بالمخزن',
          introText:'في خزانة المستلزمات ظهرت عبوة غير معتادة بجوار ملاحظة تخزين. اكتب كود العبوة عشان تسجلها للفحص.',
          lockedText:'لسه ما عندكش نتيجة تحدد إن التلوث كان في طبق بعينه.', requires:['poisoned_plate'],
          inputMode:'text', maxLength:12, placeholder:'كود العبوة...', acceptedAnswers:['RAB-X9','RABX9','rab-x9','rabx9'],
          wrongMsg:'✗ الكود مش مطابق للعبوة المصورة.', successText:'تم تسجيل العبوة كعنصر محتاج فحص ومقارنة.',
          resultText:'وجود العبوة يفتح مسار فحص مادي، لكنه وحده لا يثبت مين استخدمها أو إمتى.',
          sourceIds:['poisoned_plate'], image:'images/old-estate/realistic-chemical-bottle-note.jpg',
          imageAlt:'عبوة RAB-X9 وملاحظة التخزين في المخزن الغربي'
        },
        {
          id:'real_estate_place', kind:'مخطط جلوس', label:'تحديد مكان طبق الضحية',
          introText:'بعد مراجعة توزيع الأطباق، اكتب اسم صاحب الطبق المستهدف عشان تثبت مكانه على صورة السفرة وتبدأ مقارنة مين اقترب منه.',
          lockedText:'لسه ما عرفت مين كان مسؤولًا عن توزيع الأطباق.', requires:['dalia_serving'], requiresDiscoveries:['real_estate_bottle'],
          inputMode:'text', maxLength:16, placeholder:'اسم صاحب الطبق...', acceptedAnswers:['وليد'],
          wrongMsg:'✗ الاسم مش مطابق للطبق اللي ثبت تلوثه.', successText:'تم تثبيت مكان طبق وليد على السفرة ومسار الوصول ليه.',
          resultText:'تحديد مكان الطبق يساعد في مقارنة الشهادات والحركة، لكنه ما يعتبرش اتهامًا لأي شخص بمفرده.',
          sourceIds:['dalia_serving','poisoned_plate'], image:'images/old-estate/realistic-dining-table-plate-clue.jpg',
          imageAlt:'سفرة العزبة بعد العشاء ومكان الطبق المستهدف ضمن أماكن الجلوس'
        }
      ];
    }
  }

  // حادثة الطريق
  {
    const c = byId('hit-and-run');
    if (c) {
      setClue(c, 'partial_plate', ['استخدم لقطة الكاميرا نفسها بدل وصف الشاهد فقط: ركز على آخر أربعة أرقام الظاهرة في اللوحة.']);
      setClue(c, 'cam_footage_verified', ['بعد تثبيت توقيت الصدمة، راجع سجل حركة الكاميرات وابحث عن مرجع المركبة اللي بيتكرر في نقطتين متتاليتين.']);
      c.discoveryLocks = [
        {
          id:'real_hitrun_plate', kind:'كاميرا طريق', label:'استخراج أرقام اللوحة',
          introText:'راجع لقطة الطريق واكتب آخر أربعة أرقام الواضحة في لوحة العربية عشان تبدأ تتبع المركبة.',
          lockedText:'لسه ما عندكش خيط لوحة من شاهد خارجي.', requires:['partial_plate'],
          inputMode:'numeric', maxLength:4, placeholder:'آخر 4 أرقام...', acceptedAnswers:['4216'],
          wrongMsg:'✗ الأرقام مش مطابقة للوحة في اللقطة.', successText:'تم تثبيت الجزء المقروء من اللوحة كمرجع بحث.',
          resultText:'اللوحة الجزئية تساعد في تضييق المركبة، لكنها لا تحدد مين كان على كرسي السواق.',
          sourceIds:['partial_plate'], image:'images/hit-and-run/realistic-cctv-car-clue.jpg',
          imageAlt:'لقطة كاميرا ليلية للعربية والجزء المقروء من اللوحة 4216'
        },
        {
          id:'real_hitrun_trace', kind:'سجل كاميرات', label:'تتبّع مرجع المركبة',
          introText:'في سجل حركة الكاميرات فيه مرجع واحد بيتكرر على نفس المسار. اكتبه عشان تثبت استمرار حركة نفس العربية.',
          lockedText:'لسه ما ثبتش توقيت ومسار العربية من تحليل الكاميرات.', requires:['cam_footage_verified'], requiresDiscoveries:['real_hitrun_plate'],
          inputMode:'text', maxLength:12, placeholder:'مرجع المركبة...', acceptedAnswers:['TR-4216','TR4216','tr-4216','tr4216'],
          wrongMsg:'✗ المرجع مش هو اللي بيتكرر في سجل الحركة.', successText:'تم ربط ظهور المركبة بين نقطتي كاميرا متتاليتين.',
          resultText:'السجل يثبت استمرار حركة نفس المركبة بعد الواقعة، لكنه لا يحسم هوية السائق بدون باقي الأدلة.',
          sourceIds:['cam_footage_verified'], image:'images/hit-and-run/realistic-traffic-movement-log.jpg',
          imageAlt:'سجل حركة الكاميرات المرورية ومرجع المركبة TR-4216'
        }
      ];
    }
  }

  try {
    window.__TARAF_DISCOVERY_IMAGE_PATCH_AUDIT__ = {
      version:'2026-08-24-v1', realisticOnly:true,
      cases:['room-307','postponed-engagement','coded-message','false-rumor','lost-wallet','wedding-gold','warehouse-fire','last-dish','old-estate','hit-and-run'],
      expectedImages:20
    };
  } catch (_) {}
})();
