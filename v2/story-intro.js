(() => {
  'use strict';

  const CASE = window.STORY_CASE;
  if (!CASE || !CASE.nodes) return;

  CASE.start = 'case-intro';
  CASE.chapter = 'الفصل الأول · بلاغ الاختفاء';

  CASE.nodes['case-intro'] = {
    id:'case-intro',
    type:'system',
    black:true,
    line:'بلاغ اختفاء جديد',
    big:'آدم فؤاد',
    small:'27 سنة · آخر ظهور مؤكد: شقته · البلاغ مفتوح من 24 دقيقة',
    button:'فتح البلاغ',
    next:'case-briefing'
  };

  CASE.nodes['case-briefing'] = {
    id:'case-briefing',
    type:'cutscene',
    kicker:'ملخص البلاغ · المعلومات المؤكدة فقط',
    title:'اختفاء من شقة مقفولة',
    beats:[
      {
        text:'صباح اليوم اتبلغ عن اختفاء آدم فؤاد من شقته. الباب كان مقفول، ومفيش آثار كسر أو عنف.'
      },
      {
        text:'موبايله ومحفظته ومفاتيحه لسه في الشقة. مفيش دليل واضح إنه خرج بإرادته.'
      },
      {
        text:'آخر وقت معروف إنه كان صاحي فيه: بعد الثانية صباحًا. اللابتوب كان مفتوح، لكن محدش عارف كان بيعمل إيه.'
      },
      {
        speaker:'النظام',
        text:'وأنت بتراجع البلاغ، ملف جديد ظهر داخل نظام التحقيق من غير ما حد يرفعه.',
        small:'اسم الملف الوحيد: 45'
      }
    ],
    nextLabel:'عرض الملف',
    next:'incoming-file'
  };

  // Keep the first real chapter label meaningful after the intro.
  if (CASE.nodes['incoming-file']) {
    CASE.nodes['incoming-file'].chapter = 'الفصل الأول · الملف 45';
  }
})();
