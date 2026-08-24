/* ============================================================
   العيادة السرية — تفسير رسالة غادة المريبة
   يقفل الخيط اللي كان بيظهر أثناء التحقيق من غير تفسير نهائي.
   ============================================================ */
(() => {
  'use strict';
  if (typeof CASE_SECRET_CLINIC === 'undefined') return;

  const c = CASE_SECRET_CLINIC;
  const ghada = (c.suspects || []).find(s => s && s.id === 'assistant_ghada');

  if (ghada) {
    ghada.questions = ghada.questions || [];
    const alreadyAdded = ghada.questions.some(q => String(q.q || '').includes('إيمان سافرت'));
    if (!alreadyAdded) {
      ghada.questions.push({
        q:'إنتِ قلتي لدنيا إن إيمان سافرت فجأة، لكن سجل المستشفى بيقول إنها دخلت طوارئ باسم مستعار. ليه بعتّي الرسالة دي؟',
        requires:['donia_suspicious_message','hospital_admission_record'],
        a:'(بتتوتر) "صبري هو اللي طلب مني أقول كده لو دنيا أو أهل إيمان سألوا. كان خايف لو عرفوا إنها في المستشفى يوصلوا للعيادة ويعرفوا إن العملية حصلت من غير ترخيص. أنا غلطت إني وافقت أبعت الرسالة، بس إيمان ما سافرتش أصلًا."'
      });
    }
  }

  const suspicious = (c.evidence || []).find(e => e && e.id === 'donia_suspicious_message');
  if (suspicious) {
    suspicious.full = 'دنيا كشفت عن رسالة من غادة بتدّعي إن إيمان قررت تسافر فجأة، رغم عدم منطقية الأمر نظرًا لحالتها بعد العملية مباشرة. الرسالة بقت خيط محتاج تفسير بعد مراجعة السجلات الطبية.';
  }

  if (c.endings && c.endings.good && Array.isArray(c.endings.good.paragraphs)) {
    const explanation = 'أما رسالة غادة عن سفر إيمان، فكانت قصة تغطية طلب منها صبري تبعتها عشان يمنع أهل إيمان من الوصول للمستشفى وربط الحالة بالعيادة غير المرخصة. غادة اعترفت إنها وافقت على الكذبة بعد ما واجهتها بسجل الدخول باسم مستعار.';
    if (!c.endings.good.paragraphs.some(p => String(p || '').includes('رسالة غادة'))) {
      c.endings.good.paragraphs.push(explanation);
    }
  }

  c.ghadaMessageExplanationVersion = '2026-08-24-v1';
})();
