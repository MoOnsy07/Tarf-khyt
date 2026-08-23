/* ============================================================
   باب 307 — تجربة الاكتشافات التفاعلية المكتوبة
   1) فتح هاتف هالة من خيط داخل الاستجواب.
   2) استخدام مرجع خرج من الهاتف للبحث يدويًا في أرشيف الشركة.
   ============================================================ */
(() => {
  'use strict';
  if (typeof CASE_ROOM_307 === 'undefined') return;
  const c = CASE_ROOM_307;

  const evidenceById = id => (c.evidence || []).find(e => e && e.id === id);
  const addEvidence = item => {
    if(!evidenceById(item.id)) c.evidence.push(item);
  };

  // الخيط الطبيعي: دينا تذكر تاريخًا شخصيًا مهمًا لهالة أثناء كلامها عن الشركة.
  const dina = (c.suspects || []).find(s => s.id === 'dina_sister');
  if(dina){
    const q = (dina.questions || []).find(x => x.unlockId === 'blackmail_file_hint');
    if(q && !String(q.a || '').includes('18 أبريل')){
      q.a = String(q.a || '') + ' "وعلى فكرة، هالة كانت متعلقة جدًا بيوم 18 أبريل؛ ده أول يوم بدأت فيه الشركة، وكانت دايمًا تقول إن التاريخ ده عمرها ما تنساه."';
    }
  }

  const blackmail = evidenceById('blackmail_file_hint');
  if(blackmail && !String(blackmail.full || '').includes('18 أبريل')){
    blackmail.full = String(blackmail.full || '') + ' دينا ذكرت كمان إن 18 أبريل هو تاريخ مهم جدًا لهالة لأنه أول يوم بدأت فيه الشركة.';
  }

  addEvidence({
    id:'hala_phone_draft',
    tag:'من هاتف هالة',
    crit:false,
    title:'مسودة غير مرسلة على هاتف هالة',
    img:null,
    short:'مسودة بتشير لمرجع ملف داخلي: 4B',
    full:'بعد فتح هاتف هالة ظهرت مسودة غير مرسلة مكتوب فيها: "لو حصل أي حاجة، راجعوا ملف 4B. اللي جوه الملف هو سبب خوفي الحقيقي." المسودة ما بتسميش شخص بعينه، لكنها بتحول التحقيق من شك عام لمرجع أرشيف محدد.',
    unlocked:false,
    order:96
  });

  addEvidence({
    id:'company_file_4b',
    tag:'من أرشيف شركة هالة',
    crit:true,
    title:'ملف 4B — تحويلات تحت اعتماد وليد',
    img:null,
    short:'تحويلات مالية غير معتادة مرتبطة بصلاحيات وليد واعتماده المباشر',
    full:'البحث داخل أرشيف الشركة بمرجع 4B كشف ملف مراجعة داخلي كانت هالة بتجمعه. الملف يربط عدة تحويلات مالية غير معتادة بصلاحيات وليد واعتماده المباشر، ويفسر ليه كانت هالة خايفة من شخص داخل الشركة قبل واقعة الفندق.',
    unlocked:false,
    order:97
  });

  c.discoveryTabLabel = 'اكتشافات';
  c.discoveryLocks = [
    {
      id:'hala_phone_pin',
      kind:'هاتف مقفول',
      label:'هاتف هالة',
      introText:'الهاتف اتلاقى وسط متعلقات هالة وعليه قفل من 4 أرقام. مفيش اختيار من قائمة؛ استخدم التفصيلة الشخصية اللي سمعتها أثناء التحقيق واكتب الرمز.',
      lockedText:'الهاتف معاك، لكن لسه ما سمعتش تفصيلة شخصية كفاية تساعدك تجرب رمز منطقي.',
      requires:['blackmail_file_hint'],
      inputMode:'numeric',
      maxLength:4,
      placeholder:'••••',
      acceptedAnswers:['1804','١٨٠٤'],
      wrongMsg:'✗ الهاتف ما فتحش. راجع التاريخ اللي دينا قالت إنه مهم جدًا لهالة.',
      successText:'الهاتف اتفتح. لقيت مسودة غير مرسلة فيها مرجع ملف غامض: 4B.',
      resultText:'الهاتف مفتوح، والمسودة اللي كانت جواه اتسجلت ضمن الأدلة.',
      resultEvidenceIds:['hala_phone_draft']
    },
    {
      id:'company_archive_ref',
      kind:'بحث أرشيفي',
      label:'أرشيف شركة هالة',
      introText:'بعد فتح الهاتف ظهر مرجع ملف داخلي. قدامك شاشة بحث الأرشيف؛ اكتب المرجع زي ما استنتجته من المسودة عشان تسترجع الملف الصحيح.',
      lockedText:'لسه ماعندكش مرجع ملف واضح تبحث بيه داخل أرشيف الشركة.',
      requires:['hala_phone_draft'],
      inputMode:'text',
      maxLength:8,
      placeholder:'مرجع الملف...',
      acceptedAnswers:['4B','4b','4 ب','4ب','٤B','٤ب'],
      wrongMsg:'✗ مفيش ملف بالمرجع ده. راجع المسودة اللي خرجت من الهاتف.',
      successText:'تم العثور على ملف 4B. محتواه ربط التحويلات المالية بصلاحيات وليد.',
      resultText:'ملف 4B اتسحب من الأرشيف واتضاف للأدلة.',
      resultEvidenceIds:['company_file_4b']
    }
  ];

  // نخلي الاكتشاف التفاعلي جزءًا حقيقيًا من الإدانة، مش نشاط جانبي.
  c.conclusiveEvidenceIds = ['room_service_call','company_file_4b','sayed_call_source','corridor_camera_walid'];
  c.conclusiveRequired = 4;

  const theory = c.theoryBuilder && c.theoryBuilder.questions
    ? c.theoryBuilder.questions.find(q => q.id === 'howidentified')
    : null;
  if(theory){
    const correct = (theory.options || []).find(o => o.id === theory.correctOptionId);
    if(correct){
      correct.text = 'هالة كانت بخير بعد خروج عمرو + فتح هاتفها قاد لملف 4B المالي + المكالمة خرجت من خط وليد + كاميرا الممر أثبتت دخوله وبقاءه في الغرفة';
    }
  }

  if(c.endings && c.endings.good && Array.isArray(c.endings.good.paragraphs)){
    c.endings.good.paragraphs = [
      'وليد كان خايف من ملف 4B المالي اللي هالة بتجمعه. فتح هاتفها من الخيط الشخصي اللي ذكرته دينا قاد للمسودة، والمسودة قادت بنفسها لمرجع الأرشيف اللي كشف التحويلات المرتبطة بصلاحيات وليد.',
      'بعدها اكتملت سلسلة الليلة نفسها: هالة كانت بخير بعد خروج عمرو، المكالمة اللي رتبت دخول المندوب خرجت من خط وليد، وكاميرا الممر أثبتت إنه دخل مع سيد وفضل في الغرفة بعد رجوع سيد للاستقبال. كده الدافع المالي ومسار التنفيذ اتجمعوا من اكتشافات اللاعب نفسه، مش من اختيار إجابة جاهزة.'
    ];
  }
})();
