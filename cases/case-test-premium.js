/* ============================================================
   قضية وهمية — للتجربة بس، احذف الملف ده وسطره من index.html
   لما تخلص اختبار نظام البريميوم
   ============================================================ */

const CASE_TEST_PREMIUM = {
  id: 'test-premium',
  title: 'قضية تجريبية',
  caseNo: 'TEST FILE',
  subtitle: 'اختبار نظام البريميوم',
  coverImg: IMG_BASE + 'banner.jpg',
  difficulty: 'سهلة',
  estMinutes: 2,

  isPremium: true,
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE + 'banner.jpg',
    heroCaption: 'TEST',
    text1: 'القضية دي وهمية، غرضها الوحيد إنك تتأكد إن نافذة الشراء وفك الكود شغالين صح.',
    text2: 'أي حاجة تشوفها هنا مش لازم تكون منطقية أو مترابطة — دي مجرد تجربة تقنية.',
    meta: [
      { label:'الحالة', value:'تجريبية' },
    ],
  },

  prologue: [],

  suspects: [
    {
      id:'testsuspect', name:'مشتبه تجريبي', role:'اختبار', img: IMG_BASE + 'karim.jpg',
      alibi:'مفيش أليبي حقيقي، القضية دي تجريبية.',
      questions:[
        { q:'سؤال تجريبي؟', a:'"إجابة تجريبية."' },
      ]
    },
  ],

  evidence: [
    { id:'testev', tag:'اختبار', crit:true, title:'دليل تجريبي', img:null,
      short:'دليل وهمي بس',
      full:'الدليل ده مش حقيقي، الغرض منه بس التأكد إن لوحة الأدلة شغالة.',
      unlocked:true, order:1 },
  ],

  audioPuzzle: { enabled:false },

  correctSuspectId: 'testsuspect',
  conclusiveEvidenceIds: ['testev'],

  endings: {
    good: { stamp:'TEST OK', badgeLabel:'TEST — SUCCESS', title:'الاختبار نجح',
      paragraphs:['لو وصلت هنا، يبقى نظام الشراء والفتح والّلعب شغالين صح من الأول للآخر.'] },
    partial: { stamp:'TEST', badgeLabel:'TEST — PARTIAL', title:'اختبار جزئي',
      paragraphs:['نتيجة تجريبية.'], hint:'دي رسالة تجريبية.' },
    bad: { stamp:'TEST', badgeLabel:'TEST — WRONG', title:'اختبار غلط',
      paragraphs:['اتهمت {wrongName}، بس ده مجرد اختبار.'], hint:'دي رسالة تجريبية.' }
  }
};
