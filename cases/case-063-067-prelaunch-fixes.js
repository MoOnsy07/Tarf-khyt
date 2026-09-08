/* ============================================================
   CASE 063–067 — prelaunch logic/content fixes
   Loaded before engine.js from ready-cases.js.
   Keeps the five cases private by default; owner test mode can
   temporarily treat them as ready on the current browser only.
   ============================================================ */
(() => {
  'use strict';

  const TEST_IDS = ['final-scene','last-column','runaway-bride','blueprint-leak','archive-fire'];

  function byId(list, id){ return Array.isArray(list) ? list.find(x => x && x.id === id) : null; }
  function evidence(c, id){ return byId(c && c.evidence, id); }
  function action(c, id){ return byId(c && c.investigationActions, id); }
  function question(c, suspectId, unlockId){
    const s = byId(c && c.suspects, suspectId);
    return s && Array.isArray(s.questions) ? s.questions.find(q => q && q.unlockId === unlockId) : null;
  }
  function theoryQ(c, id){ return c && c.theoryBuilder && Array.isArray(c.theoryBuilder.questions) ? byId(c.theoryBuilder.questions, id) : null; }
  function reorderOptions(q, ids){
    if(!q || !Array.isArray(q.options)) return;
    const map = new Map(q.options.map(o => [o.id, o]));
    const ordered = ids.map(id => map.get(id)).filter(Boolean);
    q.options.forEach(o => { if(o && !ids.includes(o.id)) ordered.push(o); });
    q.options = ordered;
  }
  function upsertEvidence(c, item){
    if(!c || !Array.isArray(c.evidence) || !item || !item.id) return;
    const old = evidence(c, item.id);
    if(old) Object.assign(old, item);
    else c.evidence.push(item);
  }
  function removeAction(c, id){
    if(!c || !Array.isArray(c.investigationActions)) return;
    c.investigationActions = c.investigationActions.filter(a => !a || a.id !== id);
  }
  function addAction(c, item){
    if(!c || !Array.isArray(c.investigationActions) || !item || !item.id) return;
    const old = action(c, item.id);
    if(old) Object.assign(old, item);
    else c.investigationActions.push(item);
  }

  // ------------------------------------------------------------
  // CASE 063 — المشهد الأخير
  // ------------------------------------------------------------
  if(typeof CASE_FINAL_SCENE !== 'undefined'){
    const c = CASE_FINAL_SCENE;
    c.teaser = 'كاسكيدير محترف بيموت أثناء بروفة مشهد سقوط خطر، والفريق كله متأكد إنها حادثة تصوير عادية. لكن سجلات التحكم وكاميرات الاستوديو بتكشف نافذة تلاعب حصلت قبل البروفة بدقايق — والسؤال مين استغلها؟';

    const inv = evidence(c, 'counterfeit_equipment_invoice');
    if(inv) inv.img = null; // امنع صورة مكسورة لحد رفع الأصل النهائي

    reorderOptions(theoryQ(c, 'howidentified'), ['b','a','c']);
    reorderOptions(theoryQ(c, 'whyyasser'), ['c','b','a']);
  }

  // ------------------------------------------------------------
  // CASE 064 — العمود الأخير
  // ------------------------------------------------------------
  if(typeof CASE_LAST_COLUMN !== 'undefined'){
    const c = CASE_LAST_COLUMN;

    const callLie = evidence(c, 'lawyer_contradiction');
    if(callLie){
      callLie.tag = 'من تحليل التناقضات';
      callLie.title = 'كذب نبيل بشأن الاتصال المباشر';
      callLie.short = 'نبيل أنكر أي اتصال بطارق، لكن سجل الاتصالات يثبت مكالمة من رقمه الشخصي قبل الوفاة بساعة';
      callLie.full = 'نبيل قال بوضوح إنه ماكلمش طارق خالص وإن أي تواصل لازم يمر عبر المكتب القانوني، بينما سجل شركة الاتصالات يثبت مكالمة صادرة من رقمه الشخصي لهاتف طارق قبل الوفاة بساعة. ده تناقض مباشر في روايته الشخصية، لكنه وحده لا يثبت القتل.';
      callLie.crit = true;
    }

    if(c.contradictionPuzzle){
      c.contradictionPuzzle.introText = 'قارن إنكار نبيل لأي اتصال مباشر بطارق بسجل شركة الاتصالات. هنا فيه قول ودليل مستقل ماينفعوش يكونوا صح مع بعض.';
      c.contradictionPuzzle.resultText = 'التناقض واضح: نبيل قال إنه ماكلمش طارق خالص، لكن سجل الاتصالات يثبت مكالمة من رقمه الشخصي قبل الوفاة بساعة. ده يثبت إنه كذب في نقطة أساسية ويفتح باب فحص اللقاء اللي حصل بعدها.';
      c.contradictionPuzzle.resultEvidenceIds = ['lawyer_contradiction'];
      c.contradictionPuzzle.statements = [
        { id:'st1', text:'"مكلمتوش خالص. اتصالات الشركة كلها بتمر على المكتب القانوني بتاعنا، مش أنا شخصيًا."', source:'نبيل — في الاستجواب' },
        { id:'st2', text:'سجل شركة الاتصالات يثبت مكالمة من رقم نبيل الشخصي لهاتف طارق قبل الوفاة بساعة.', source:'دليل: سجل الاتصالات' },
        { id:'st3', text:'"جالي مكالمة من محامي الشركة يهددني بدعوى قضائية لو نشرنا."', source:'سلمى — في الاستجواب' },
        { id:'st4', text:'"استشارني في موضوع تهديد بدعوى قضائية من شركة النيل."', source:'رامز — في الاستجواب' },
      ];
      c.contradictionPuzzle.correctPair = ['st1','st2'];
    }

    if(c.cipherPuzzle){
      c.cipherPuzzle.introText = 'طارق سايب مفتاح صغير في هامش الورقة. كل رمز مكوّن من حرف ورقم: الحرف يحدد مجموعة كلمات، والرقم يحدد ترتيب الكلمة داخل المجموعة. المفتاح: ن = [نبيل، النشر، النهاية] — م = [موعد، المبلغ، مكتب] — ا = [القديم، اللي اتفقنا عليه، التحقيق] — ت = [وتذكر، توقف، تأجل]. فك الرموز ن1، م2، ا2، ت1.';
      c.cipherPuzzle.fragments = [
        {
          id:'f1',
          context:'الرمز ن1 — مجموعة ن = [نبيل، النشر، النهاية]. اختار العنصر رقم 1.',
          options:[
            { id:'o1a', text:'النهاية' },
            { id:'o1b', text:'يا نبيل' },
            { id:'o1c', text:'النشر' },
          ],
          correctOptionId:'o1b',
        },
        {
          id:'f2',
          context:'الرمز م2 — مجموعة م = [موعد، المبلغ، مكتب]. اختار العنصر رقم 2.',
          options:[
            { id:'o2a', text:'مكتب' },
            { id:'o2b', text:'المبلغ' },
            { id:'o2c', text:'موعد' },
          ],
          correctOptionId:'o2b',
        },
        {
          id:'f3',
          context:'الرمز ا2 — مجموعة ا = [القديم، اللي اتفقنا عليه، التحقيق]. اختار العنصر رقم 2.',
          options:[
            { id:'o3a', text:'التحقيق' },
            { id:'o3b', text:'اللي اتفقنا عليه' },
            { id:'o3c', text:'القديم' },
          ],
          correctOptionId:'o3b',
        },
        {
          id:'f4',
          context:'الرمز ت1 — مجموعة ت = [وتذكر، توقف، تأجل]. اختار العنصر رقم 1.',
          options:[
            { id:'o4a', text:'تأجل' },
            { id:'o4b', text:'توقف' },
            { id:'o4c', text:'وتذكر' },
          ],
          correctOptionId:'o4c',
        },
      ];
      c.cipherPuzzle.decodedMessage = 'يا نبيل، المبلغ اللي اتفقنا عليه مش هيكون كافي المرة الجاية، وتذكر: لو رفضت هننشر كل حاجة زي ما هي.';
      c.cipherPuzzle.resultText = 'فكيت الشفرة بطريقة قابلة للتحقق من المفتاح نفسه: طارق كان بيطلب من نبيل مبلغ إضافي مقابل تأجيل النشر. الرسالة تثبت الابتزاز والدافع المحتمل، لكنها لا تثبت وحدها مين تسبب في الوفاة.';
      c.cipherPuzzle.resultEvidenceIds = ['decoded_warning'];
    }

    c.evidenceCombinations = [];
    removeAction(c, 'crosscheck_legal_channel');
    c.conclusiveEvidenceIds = ['toxicology_reexam','building_entry_log','office_cup_trace','decoded_warning'];
    c.conclusiveRequired = 4;

    reorderOptions(theoryQ(c, 'howidentified'), ['c','a','b']);
    reorderOptions(theoryQ(c, 'whytarek'), ['b','c','a']);
  }

  // ------------------------------------------------------------
  // CASE 065 — ليلة ما قبل الفرح
  // ------------------------------------------------------------
  if(typeof CASE_RUNAWAY_BRIDE !== 'undefined'){
    const c = CASE_RUNAWAY_BRIDE;

    const voice = evidence(c, 'nour_voice_note');
    if(voice){
      voice.short = 'نور سجلت روايتها بنفسها عن تهديد وليد، لكن التسجيل محتاج تحقق مستقل من وجود اتصال بينهما';
      voice.full = 'نسخة احتياطية من هاتف نور فيها رسالة صوتية سجلتها بنفسها قبل اختفائها بساعات. بتقول إن وليد هددها لو الفرح كمل وإنها هتروح لمكان آمن لحد ما الأمور تهدى. التسجيل يثبت حالتها وروايتها، لكنه مش دليل مستقل كفاية على إن المكالمة كانت فعلًا من وليد — لازم تتأكد من سجل الاتصال.';
    }

    upsertEvidence(c, {
      id:'waleed_nour_call_trace', tag:'من سجلات شركة الاتصالات', crit:true,
      title:'مكالمة مؤكدة من وليد لنور قبل الاختفاء', img:null,
      short:'سجل الاتصالات يثبت مكالمة من خط وليد لهاتف نور في نفس الدقيقة اللي سمعت فيها دينا اسمه',
      full:'سجل شركة الاتصالات يثبت مكالمة صادرة من خط وليد الشخصي لهاتف نور في نفس التوقيت اللي شهدت فيه دينا إن نور استلمت المكالمة وسمعتها تقول اسم وليد. السجل مايسجلش محتوى المكالمة، لكنه يثبت هوية الطرف المتصل بشكل مستقل ويدعم رواية نور الصوتية.',
      unlocked:false, order:11,
    });

    upsertEvidence(c, {
      id:'nour_exit_route', tag:'من تتبع الخروج', crit:false,
      title:'مسار خروج نور من النادي', img:null,
      short:'كاميرا البوابة الجانبية وسجل سيارة أجرة يثبتان خروج نور بإرادتها واتجاهها لمنطقة خالتها',
      full:'كاميرا البوابة الجانبية صورت نور وهي تخرج وحدها من غير إجبار، وسجل سيارة أجرة مطابق للتوقيت يوضح إن الرحلة انتهت في المنطقة اللي ساكنة فيها خالتها. الدليل يضيق مكان البحث من غير ما يقفز مباشرة لمكانها النهائي.',
      unlocked:false, order:12,
    });

    const hide = evidence(c, 'nour_hiding_location');
    if(hide) hide.order = 13;

    addAction(c, {
      id:'verify_waleed_call_trace', kind:'تحقيق اتصالات', label:'تحقق من هوية المتصل بنور قبل الاختفاء',
      description:'رسالة نور ودينا بيذكروا وليد، لكن الكلام وحده مش كفاية. اطلب سجل الاتصالات للتأكد مين اتصل فعلًا في التوقيت الحرج.',
      requires:['nour_voice_note','phone_call_witnessed'], resultEvidenceIds:['waleed_nour_call_trace'],
      successText:'سجل شركة الاتصالات أكد مكالمة من خط وليد الشخصي لهاتف نور في نفس التوقيت بالظبط.'
    });

    removeAction(c, 'search_relatives_homes');
    addAction(c, {
      id:'trace_nour_exit_route', kind:'تتبع حركة', label:'راجع طريقة خروج نور من النادي',
      description:'قبل ما تفتش بيوت الأقارب عشوائيًا، راجع البوابة الجانبية وسجلات سيارات الأجرة في توقيت الاختفاء.',
      requires:['nour_voice_note','waleed_nour_call_trace'], resultEvidenceIds:['nour_exit_route'],
      successText:'كاميرا البوابة وسجل الرحلة أثبتوا إن نور خرجت وحدها بإرادتها واتجهت للمنطقة اللي ساكنة فيها خالتها.'
    });
    addAction(c, {
      id:'check_aunt_home', kind:'تحقيق ميداني', label:'اتجه لبيت خالة نور بعد تثبيت مسار الرحلة',
      description:'مسار الرحلة حدد منطقة واضحة بدل البحث العشوائي. تحقق من بيت خالتها مباشرة.',
      requires:['nour_exit_route'], resultEvidenceIds:['nour_hiding_location'],
      successText:'لقيت نور في بيت خالتها بأمان، وأكدت إنها اختفت بإرادتها بعد التهديد.'
    });

    c.conclusiveEvidenceIds = ['gas_station_id','nour_voice_note','waleed_nour_call_trace','nour_hiding_location'];
    c.conclusiveRequired = 3;

    const tq = theoryQ(c, 'howidentified');
    if(tq){
      const correct = byId(tq.options, 'a');
      if(correct) correct.text = 'موظف محطة البنزين تعرّف على وليد شخصيًا + سجل الاتصالات أثبت مكالمته لنور في التوقيت الحرج + رسالة نور الصوتية شرحت التهديد + التحقيق الميداني أثبت إنها اختفت بإرادتها';
    }
    reorderOptions(theoryQ(c, 'howidentified'), ['b','c','a']);
    reorderOptions(theoryQ(c, 'whynournotvictim'), ['a','c','b']);

    if(c.endings && c.endings.good){
      c.endings.good.paragraphs = [
        'نور ماكانتش هاربة من الزواج ولا مخطوفة. بعد مكالمة من وليد هددها فيها بسبب خلافه المالي مع كريم، سجلت رسالة بصوتها تشرح اللي حصل وخرجت من النادي بإرادتها لمكان آمن.',
        'التحقيق مااعتمدش على كلام نور وحده: سجل شركة الاتصالات أثبت مكالمة من خط وليد لهاتفها في نفس توقيت شهادة دينا، وموظف محطة البنزين تعرّف على وليد شخصيًا قرب النادي، وكاميرا البوابة وسجل الرحلة قادوا لبيت خالتها حيث وُجدت بأمان.',
      ];
    }
  }

  // ------------------------------------------------------------
  // CASE 066 — التسريب
  // ------------------------------------------------------------
  if(typeof CASE_BLUEPRINT_LEAK !== 'undefined'){
    const c = CASE_BLUEPRINT_LEAK;

    if(c.briefing){
      c.briefing.text2 = 'بمجرد تأكد التسريب، بند في اتفاق المستثمرين وبوليصة حماية الملكية الفكرية جمّد الإطلاق تلقائيًا لحين مراجعة قانونية وتقنية. رئيسة مجلس الإدارة "منى" طلبت تحقيق داخلي عاجل، لأن الشك الأول وقع على منافس صناعي كبير، لكنها حاسة إن القصة مريحة أكتر من اللازم.';
      if(Array.isArray(c.briefing.meta) && !c.briefing.meta.some(x => x && x.label === 'أثر التسريب')){
        c.briefing.meta.push({ label:'أثر التسريب', value:'تجميد الإطلاق تلقائيًا لحين مراجعة الحادث' });
      }
    }

    upsertEvidence(c, {
      id:'launch_freeze_clause', tag:'من اتفاق المستثمرين والتأمين', crit:false,
      title:'بند تجميد الإطلاق بعد تسريب الملكية الفكرية', img:null,
      short:'أي تسريب مؤكد للمخطط يوقف الإطلاق تلقائيًا لحين مراجعة قانونية وتقنية',
      full:'اتفاق المستثمرين وبوليصة حماية الملكية الفكرية في نوفا تك ينصان على تجميد أي إطلاق تجاري تلقائيًا إذا تسربت الملفات الجوهرية للمنتج، لحين مراجعة سبب الحادث ومسؤولية الشركة. بالتالي التسريب نفسه كان وسيلة مضمونة لإيقاف إطلاق منتج يعرف يوسف إن فيه عيبًا خطيرًا.',
      unlocked:true, order:2,
    });

    const ins = evidence(c, 'insurance_claim_filed');
    if(ins){
      ins.title = 'فتح ملف مطالبة تأمينية بشكل مبكر';
      ins.short = 'يوسف فتح بلاغ حادث وبدأ ملف مطالبة تأمينية في نفس يوم التسريب قبل اكتمال أي تحقيق';
      ins.full = 'سجلات شركة التأمين بتوضح إن يوسف فتح بلاغ حادث وبدأ إجراءات ملف مطالبة تحت بند "سرقة الملكية الفكرية" في نفس يوم التسريب، قبل ما يتحدد مصدره أو مسؤوله. فتح الملف مش جريمة في حد ذاته، لكن توقيته المبكر جدًا يصبح مريبًا مع بقية الأدلة.';
    }

    const iq = question(c, 'youssef_ceo', 'insurance_claim_filed');
    if(iq){
      iq.q = 'سجل شركة التأمين بيوضح إنك فتحت بلاغ حادث وبدأت ملف مطالبة يوم التسريب نفسه قبل ما التحقيق يحدد المصدر — ليه السرعة دي؟';
      iq.a = '(بيتردد) "كنت بحمي حق الشركة من بدري. فتح البلاغ إجراء احترازي، والمطالبة نفسها لسه كانت تحت المراجعة."';
    }

    const payment = evidence(c, 'leak_source_traced');
    if(payment) payment.img = null; // امنع صورة مكسورة لحد رفع الأصل النهائي

    const cross = action(c, 'crosscheck_insurance_timing');
    if(cross){
      cross.description = 'راجع توقيت فتح بلاغ التأمين وبداية ملف المطالبة مقارنة بتوقيت نشر المخطط وبداية التحقيق الداخلي.';
      cross.successText = 'المراجعة أكدت إن يوسف بدأ إجراءات ملف التأمين في نفس ساعات التسريب، قبل تحديد مصدره، وإن البند المستخدم يغطي تحديدًا سرقة الملكية الفكرية.';
    }

    if(c.codeLockPuzzle){
      c.codeLockPuzzle.introText = 'اللابتوب الاحتياطي مقفول بكود 4 أرقام. سياسة يوسف في الأجهزة الثانوية واضحة من ملاحظات تقنية قديمة: أول رقمين = شهر تأسيس الشركة بصيغة رقمين، وآخر رقمين = آخر رقمين من براءة الاختراع. الشركة اتأسست في الشهر الثالث، وبراءة الاختراع تنتهي بـ47.';
      c.codeLockPuzzle.hint = 'حوّل الشهر الثالث لصيغة رقمين، وبعده مباشرة آخر رقمين من براءة الاختراع.';
      c.codeLockPuzzle.wrongMsg = '✗ الكود مش مطابق للقاعدة المكتوبة: شهر التأسيس بصيغة رقمين ثم آخر رقمين من البراءة.';
    }

    const motiveQ = theoryQ(c, 'whymotive');
    if(motiveQ){
      const correct = byId(motiveQ.options, 'a');
      if(correct) correct.text = 'كان عارف إن المنتج فيه عيب أمان خطير، وبند التسريب هيجمّد الإطلاق تلقائيًا. فدبّر التسريب عن طريق وسيط عشان يوقف الإطلاق قبل الفضيحة ويبدأ ملف تعويض تحت بند سرقة الملكية الفكرية.';
    }
    reorderOptions(theoryQ(c, 'howidentified'), ['c','b','a']);
    reorderOptions(theoryQ(c, 'whymotive'), ['b','a','c']);

    if(c.endings && c.endings.good){
      c.endings.good.paragraphs = [
        'يوسف كان عارف من تقرير طارق إن المنتج فيه عيب أمان خطير. وكان عارف كمان إن أي تسريب مؤكد للمخطط هيجمّد الإطلاق تلقائيًا بموجب اتفاق المستثمرين وبوليصة حماية الملكية الفكرية. بدل ما يوقف الإطلاق بنفسه ويتحمل مسؤولية قرار كارثي، دفع لوسيط مجهول "M" ينشر المخطط من غير ما يبان المصدر الداخلي.',
        'بعد التسريب بدأ مبكرًا إجراءات ملف تأمين تحت بند سرقة الملكية الفكرية. اللي قفل الدائرة مش التوقيت وحده، لكن تتبع التحويل المالي من حسابه الشخصي لمحفظة الوسيط، ومحادثاته معاه على اللابتوب الاحتياطي، وتجاهله الموثق لتحذير العيب الأمني.',
      ];
    }
  }

  // ------------------------------------------------------------
  // CASE 067 — رماد الأرشيف
  // ------------------------------------------------------------
  if(typeof CASE_ARCHIVE_FIRE !== 'undefined'){
    const c = CASE_ARCHIVE_FIRE;

    const handyman = evidence(c, 'handyman_identifies_nabila');
    if(handyman) handyman.img = null;
    const bank = evidence(c, 'nabila_cash_withdrawal');
    if(bank) bank.img = null;
    const lab = evidence(c, 'accelerant_lab_match');
    if(lab) lab.order = 16;

    c.conclusiveEvidenceIds = ['handyman_identifies_nabila','nabila_cash_withdrawal','accelerant_lab_match','nabila_phone_location'];
    c.conclusiveRequired = 3;

    reorderOptions(theoryQ(c, 'howidentified'), ['c','a','b']);
    reorderOptions(theoryQ(c, 'whynotinvestor'), ['b','c','a']);
  }

  // ------------------------------------------------------------
  // Owner-only prelaunch testing.
  // Normal visitors still see these as "قريبًا" because the base
  // READY_CASE_IDS is unchanged. Only the browser carrying owner
  // test mode gets temporary ready status, before engine boot.
  // ------------------------------------------------------------
  try{
    const q = new URLSearchParams(location.search);
    if(q.get('testmode') === 'TARAF_TEST_2026') localStorage.setItem('ca_owner_test_mode', '1');
    const owner = localStorage.getItem('ca_owner_test_mode') === '1';
    if(owner && typeof READY_CASE_IDS !== 'undefined') TEST_IDS.forEach(id => READY_CASE_IDS.add(id));
  }catch(_){}

  // Lightweight structural QA that runs before engine boot.
  function qaCase(c){
    const errors = [];
    if(!c || !c.id) return ['case object missing'];
    const evIds = new Set((c.evidence || []).filter(Boolean).map(e => e.id));
    const suspectIds = new Set((c.suspects || []).filter(Boolean).map(s => s.id));
    if(c.correctSuspectId && !suspectIds.has(c.correctSuspectId)) errors.push('correctSuspectId not found: ' + c.correctSuspectId);
    (c.conclusiveEvidenceIds || []).forEach(id => { if(!evIds.has(id)) errors.push('missing conclusive evidence: ' + id); });
    (c.investigationActions || []).forEach(a => {
      (a && a.requires || []).forEach(id => { if(!evIds.has(id)) errors.push('action ' + a.id + ' requires unknown evidence ' + id); });
      (a && a.resultEvidenceIds || []).forEach(id => { if(!evIds.has(id)) errors.push('action ' + a.id + ' returns unknown evidence ' + id); });
    });
    if(c.theoryBuilder && c.theoryBuilder.enabled){
      (c.theoryBuilder.questions || []).forEach(q => {
        if(!q || !Array.isArray(q.options) || !q.options.some(o => o && o.id === q.correctOptionId)) errors.push('theory correct option missing: ' + (q && q.id));
      });
    }
    if(c.cipherPuzzle && c.cipherPuzzle.enabled){
      (c.cipherPuzzle.fragments || []).forEach(f => {
        if(!f || !Array.isArray(f.options) || !f.options.some(o => o && o.id === f.correctOptionId)) errors.push('cipher correct option missing: ' + (f && f.id));
      });
    }
    return errors;
  }

  const caseObjects = [
    typeof CASE_FINAL_SCENE !== 'undefined' ? CASE_FINAL_SCENE : null,
    typeof CASE_LAST_COLUMN !== 'undefined' ? CASE_LAST_COLUMN : null,
    typeof CASE_RUNAWAY_BRIDE !== 'undefined' ? CASE_RUNAWAY_BRIDE : null,
    typeof CASE_BLUEPRINT_LEAK !== 'undefined' ? CASE_BLUEPRINT_LEAK : null,
    typeof CASE_ARCHIVE_FIRE !== 'undefined' ? CASE_ARCHIVE_FIRE : null,
  ].filter(Boolean);

  const report = {};
  caseObjects.forEach(c => { report[c.id] = qaCase(c); });
  const allErrors = Object.entries(report).flatMap(([id, errs]) => errs.map(e => id + ': ' + e));
  if(allErrors.length) console.warn('Taraf prelaunch five QA:', allErrors);
  else console.info('Taraf prelaunch five QA: structural checks passed.');

  window.TarafPrelaunchFiveQA = {
    ids: TEST_IDS.slice(),
    report: () => JSON.parse(JSON.stringify(report)),
    passed: () => !Object.values(report).some(arr => arr && arr.length),
  };
})();
