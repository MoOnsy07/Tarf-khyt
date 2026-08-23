/* CASE 014 — الوشاية: runtime logic hotfix (2026-08-23)
   يمنع تسريب اتجاه الحل ويجعل إنكار ياسمين نتيجة مواجهة بسجل الرقم نفسه. */
(() => {
  if (typeof CASE_FALSE_RUMOR === 'undefined') return;
  const c = CASE_FALSE_RUMOR;
  const y = (c.suspects || []).find(s => s.id === 'yasmin_ex');

  if (y) {
    // سؤال الخلفية لا يحتاج إظهار "خبرة ياسمين" كشرط واجهة؛ التحليل الفني هو الخيط الفعلي.
    const backgroundQ = (y.questions || []).find(q => String(q.q || '').includes('التحليل الفني لقى'));
    if (backgroundQ) backgroundQ.requires = ['photo_analysis'];

    // حذف سؤال سجل الرقم من قائمة الأسئلة: الإنكار لازم ينتج فقط من مواجهة ياسمين بالسجل نفسه.
    y.questions = (y.questions || []).filter(q => q.unlockId !== 'yasmin_denial');

    y.confrontations = y.confrontations || {};
    y.confrontations.sender_line_record = {
      text:'(بتتوتر) "الخط اتسجل باسمي فعلًا، بس مش أنا اللي استخدمته وقت الرسالة. ممكن حد يكون وصل له. أنا ما بعتش الصورة."',
      unlockId:'yasmin_denial'
    };
    delete y.confrontations.yasmin_denial;
  }

  // منع فتح لغز الربط مبكرًا من سؤال روان، وتعطيله في القضية لأنه كان يوجه الشك زيادة عن اللازم.
  const sourceTrace = (c.evidence || []).find(e => e.id === 'source_trace');
  if (sourceTrace) delete sourceTrace.unlocksMatch;
  c.matchPuzzle = { enabled:false };

  // خلي الخيارات الجانبية في التناقض ما تضيفش معلومة حاسمة لم يجمعها اللاعب من المسار نفسه.
  if (c.contradictionPuzzle && Array.isArray(c.contradictionPuzzle.statements)) {
    const st3 = c.contradictionPuzzle.statements.find(s => s.id === 'st3');
    if (st3) {
      st3.text = 'الصورة المنتشرة فيها اختلافات واضحة في الإضاءة وحواف القص.';
      st3.source = 'دليل: الصورة المنتشرة';
    }
  }

  // صياغة النظرية النهائية تعتمد على الأدلة الحاسمة فقط بدل توجيه اللاعب بالدافع والخبرة.
  const how = c.theoryBuilder && Array.isArray(c.theoryBuilder.questions)
    ? c.theoryBuilder.questions.find(q => q.id === 'howidentified')
    : null;
  if (how && Array.isArray(how.options)) {
    const correct = how.options.find(o => o.id === 'a');
    if (correct) correct.text = 'التحليل أثبت الفبركة + سجل الرقم ربط أول إرسال بجهازها + التناقض بين إنكارها والسجل الرقمي';
  }
})();
