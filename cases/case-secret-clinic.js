/* ============================================================
   بيانات قضية: العيادة السرية
   قضية اختفاء (محتوى للبالغين) — عيادة تجميل غير مرخصة، مريضة
   بتختفي بعد عملية تجميلية سرية.
   ============================================================ */

const IMG_BASE_SECRETCLINIC = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/secret-clinic/';

const CASE_SECRET_CLINIC = {
  id: 'secret-clinic',
  title: 'العيادة السرية',
  caseNo: 'CASE 046',
  subtitle: 'عيادة تجميل غير مرخصة، شقة سكنية',
  coverImg: IMG_BASE_SECRETCLINIC + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 35,
  investigationPoints: 20,
  teaser: 'مريضة بتروح عملية تجميل سرية في عيادة غير مرخصة جوه شقة سكنية عادية، وبعدها بتختفي تمامًا من غير أي أثر رسمي لوجودها هناك أصلاً.',

  isPremium: false,
  categories: ['disappearance', 'corruption'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتتناول موضوع عمليات تجميل غير مرخصة وسياقات طبية حساسة، مناسبة لجمهور بالغ.',

  briefing: {
    heroImg: IMG_BASE_SECRETCLINIC + 'cover.webp',
    heroCaption: 'CASE 046 — بعد العملية بيوم',
    text1: 'المريضة "إيمان" حجزت عملية تجميل بسعر رخيص جدًا في عيادة غير مرخصة بتشتغل سرًا جوه شقة سكنية عادية. بعد العملية بيوم واحد، إيمان اختفت تمامًا، ومحدش من أهلها عرف حاجة عن مكان العيادة أصلاً لأنها كانت بتخبي الموضوع.',
    text2: 'صديقتها المقربة اللي رافقتها يوم العملية طلبت منك تحقق بسرعة قبل ما يضيع أي أثر. عندك عنوان تقريبي للشقة، وأسماء الأشخاص اللي كانوا موجودين وقت العملية.',
    meta: [
      { label:'الضحية', value:'إيمان — أجرت عملية تجميل سرية' },
      { label:'مكان العملية', value:'عيادة غير مرخصة في شقة سكنية' },
      { label:'الغموض', value:'مفيش أي سجل رسمي لوجودها هناك' },
      { label:'طلب التحقيق', value:'صديقة إيمان المقربة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الحجز',
      img: IMG_BASE_SECRETCLINIC + 'clinic-scene1.jpg',
      text:'إيمان بتتواصل مع حساب سوشيال ميديا بيقدّم عمليات تجميل بسعر مغري جدًا، وبتحجز موعد سري.'
    },
    {
      scene:'المشهد ٢ — العملية',
      img: IMG_BASE_SECRETCLINIC + 'clinic-scene2.jpg',
      text:'إيمان بتدخل شقة سكنية عادية اتحولت لعيادة مؤقتة، معدات طبية بسيطة مجهزة في غرفة نوم سابقة.'
    },
    {
      scene:'المشهد ٣ — بعد العملية',
      img: IMG_BASE_SECRETCLINIC + 'clinic-scene3.jpg',
      text:'إيمان بتخرج من العملية متعبة، بتوعد صديقتها إنها هتتصل بيها تاني يوم، وده آخر تواصل بينهم.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_SECRETCLINIC + 'clinic-scene4.jpg',
      text:'صديقة إيمان بتديك تفاصيل محادثاتها مع الحساب، وعنوان تقريبي للشقة اللي حصلت فيها العملية.'
    },
  ],

  suspects: [
    {
      id:'unlicensed_doctor_sabry', name:'صبري', role:'الشخص اللي أجرى العملية، بيدّعي إنه دكتور', img: IMG_BASE_SECRETCLINIC + 'sabry.jpg', avatarEmoji:'💉',
      alibi:'قال إن إيمان خرجت من عنده بحالة كويسة وسليمة بعد العملية.',
      questions:[
        { q:'إنت فعلاً دكتور مرخص؟', unlockId:'sabry_no_license',
          a:'(بيتردد) "عندي خبرة كبيرة في المجال، بس مش عندي ترخيص رسمي حاليًا لظروف معينة."' },
        { q:'حصل أي مضاعفات أثناء عملية إيمان؟', requires:['sabry_no_license'], unlockId:'sabry_complication',
          a:'"كان فيه نزيف بسيط أكتر من المتوقع، بس تعاملت معاه وطلعت بره كويسة."' },
      ]
    },
    {
      id:'assistant_ghada', name:'غادة', role:'مساعدة العيادة السرية', img: IMG_BASE_SECRETCLINIC + 'ghada.jpg', avatarEmoji:'🩹',
      alibi:'قالت إنها ساعدت في العملية زي المعتاد وبعدين مشت.',
      questions:[
        { q:'دورك في العيادة دي كان إيه بالظبط؟', unlockId:'ghada_role',
          a:'"بساعد صبري في تجهيز الأدوات ومتابعة المرضى بعد العمليات."' },
        { q:'إيمان طلعت من الشقة سليمة قدامك؟', requires:['ghada_role'], unlockId:'ghada_saw_leaving',
          a:'(بتتردد) "صراحة، آخر مرة شفتها كانت لسه في غرفة الاستشفاء، ما شفتهاش وهي بتخرج فعليًا."' },
      ]
    },
    {
      id:'landlord_atef', name:'عاطف', role:'صاحب الشقة المؤجرة للعيادة', img: IMG_BASE_SECRETCLINIC + 'atef.jpg', avatarEmoji:'🏠',
      alibi:'قال إنه مجرد مؤجر الشقة ومالوش علاقة باللي بيحصل جواها.',
      questions:[
        { q:'كنت عارف إن الشقة بتتستخدم كعيادة تجميل؟', unlockId:'atef_knew_use',
          a:'"عارف إنها بتتستخدم لحاجة طبية، ومش داخل في التفاصيل، بس باخد إيجار زيادة عشان كده."' },
        { q:'دخلت الشقة يوم عملية إيمان؟', requires:['atef_knew_use'],
          a:'"جيت أجيب الإيجار بس، مكنتش موجود وقت العملية نفسها."' },
      ]
    },
    {
      id:'friend_donia', name:'دنيا', role:'صديقة إيمان المقربة، رافقتها يوم العملية', img: IMG_BASE_SECRETCLINIC + 'donia.jpg', avatarEmoji:'📱',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'إيمان قالتلك حاجة عن حالتها بعد العملية؟',
          a:'"قالتلي إنها متعبة بس تمام، وهتتصل بيا تاني يوم. الاتصال ده معملوش أبدًا."' },
        { q:'صبري أو غادة بعتولك أي رسالة بعد اختفائها؟', unlockId:'donia_suspicious_message',
          a:'"غادة بعتتلي رسالة غريبة بتقول إن إيمان قررت تسافر فجأة، بس ده مش منطقي خالص."' },
      ]
    },
  ],

  evidence: [
    { id:'social_media_ad', tag:'من موبايل إيمان', crit:true, title:'إعلان العملية السري', img: IMG_BASE_SECRETCLINIC + 'clinic-ad.jpg',
      short:'إعلان على سوشيال ميديا بيقدّم عمليات تجميل بسعر رخيص بشكل مريب',
      full:'الإعلان اللي تواصلت معاه إيمان بيقدّم عمليات تجميل بسعر رخيص بشكل مريب، من غير أي معلومات رسمية عن ترخيص أو موقع ثابت.',
      unlocked:true, order:1 },

    { id:'sabry_no_license', tag:'من استجواب صبري', crit:true, title:'غياب الترخيص الرسمي', img:null,
      short:'صبري معترف إنه بيجري عمليات تجميل من غير ترخيص طبي رسمي',
      full:'صبري اعترف إنه بيمارس عمليات تجميلية من غير ترخيص طبي رسمي حاليًا، رغم ادعائه بالخبرة الكبيرة.',
      unlocked:false, order:2 },

    { id:'sabry_complication', tag:'من استجواب صبري', crit:true, title:'مضاعفات أثناء العملية', img:null,
      short:'حصل نزيف أكبر من المتوقع أثناء عملية إيمان',
      full:'صبري اعترف بحدوث نزيف أكبر من المتوقع أثناء عملية إيمان، بس أكد إنه تعامل معاه وطلعت بحالة كويسة.',
      unlocked:false, order:3 },

    { id:'ghada_role', tag:'من استجواب غادة', crit:false, title:'دور غادة في العيادة', img:null,
      short:'غادة مسؤولة عن المساعدة ومتابعة المرضى',
      full:'غادة أكدت دورها في مساعدة صبري في العمليات ومتابعة المرضى بعدها.',
      unlocked:false, order:4 },

    { id:'ghada_saw_leaving', tag:'من استجواب غادة', crit:true, title:'غادة ما شافتش إيمان تخرج', img:null,
      short:'آخر مرة شافت فيها غادة إيمان كانت في غرفة الاستشفاء',
      full:'غادة اعترفت إن آخر مرة شافت فيها إيمان كانت لسه في غرفة الاستشفاء، وإنها ما شافتهاش فعليًا وهي بتخرج من الشقة.',
      unlocked:false, order:5 },

    { id:'atef_knew_use', tag:'من استجواب عاطف', crit:false, title:'معرفة عاطف باستخدام الشقة', img:null,
      short:'عاطف عارف إن الشقة بتتستخدم لغرض طبي',
      full:'عاطف اعترف بمعرفته إن الشقة بتتستخدم لغرض طبي، وإنه بياخد إيجار أعلى بسبب كده.',
      unlocked:false, order:6 },

    { id:'donia_suspicious_message', tag:'من رسائل دنيا', crit:true, title:'رسالة مريبة من غادة', img: IMG_BASE_SECRETCLINIC + 'clinic-message.jpg',
      short:'غادة بعتت رسالة تدّعي إن إيمان سافرت فجأة',
      full:'دنيا كشفت عن رسالة من غادة بتدّعي إن إيمان قررت تسافر فجأة، رغم عدم منطقية الأمر تمامًا نظرًا لحالتها بعد العملية مباشرة.',
      unlocked:false, order:7 },

    { id:'hospital_admission_record', tag:'من سجلات مستشفى قريب', crit:true, title:'سجل دخول طارئ باسم مستعار', img: IMG_BASE_SECRETCLINIC + 'clinic-hospital.jpg',
      short:'سجل دخول طارئ في مستشفى قريب بمواصفات تطابق إيمان',
      full:'سجلات مستشفى قريب من الشقة بتوضح دخول طارئ لحالة نزيف بمواصفات تطابق إيمان، تحت اسم مستعار أدخلها بيه صبري خوفًا من انكشاف العيادة غير المرخصة.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  dnaLabPuzzle: {
    enabled: true,
    tabLabel: 'تحليل عينة طبية',
    introText: 'قارن عينة الدم الموجودة في أدوات العيادة السرية مع فصيلة دم إيمان المسجلة في ملفها الطبي القديم، عشان تثبت وجودها الفعلي في مكان الحادثة.',
    resultText: 'فصيلة الدم متطابقة تمامًا مع ملف إيمان الطبي، وده بيؤكد حدوث نزيف خطير أثناء العملية غير المرخصة.',
    sampleSequence: ['A', 'B', 'O', 'A', 'B'],
    suspectSequences: {
      unlicensed_doctor_sabry: ['O', 'B', 'O', 'A', 'A'],
      assistant_ghada:         ['A', 'A', 'O', 'B', 'B'],
      landlord_atef:           ['B', 'B', 'A', 'A', 'O'],
      friend_donia:            ['A', 'B', 'O', 'A', 'B'],
    },
    correctSuspectId: 'friend_donia',
    resultEvidenceIds: ['hospital_admission_record'],
  },

  evidenceCombinations: [
    { parts:['sabry_complication','ghada_saw_leaving'], resultId:'hospital_admission_record' },
  ],

  correctSuspectId: 'unlicensed_doctor_sabry',
  conclusiveEvidenceIds: ['sabry_no_license', 'sabry_complication', 'hospital_admission_record'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن صبري هو المسؤول عن اختفاء إيمان؟',
        options: [
          { id:'a', text:'اعترافه بالمضاعفات الخطيرة أثناء العملية + عدم وجود ترخيص رسمي عنده + سجل دخول طارئ لمستشفى قريب باسم مستعار يطابق حالتها' },
          { id:'b', text:'لأنه أجرى العملية وده يكفي' },
          { id:'c', text:'لأن غادة كانت آخر واحدة شافتها' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي حصل فعليًا لإيمان؟',
        options: [
          { id:'a', text:'حصل نزيف خطير أثناء العملية غير المرخصة، وصبري خاف يبلغ الطوارئ رسميًا خوفًا من انكشاف العيادة، فأدخلها مستشفى قريب باسم مستعار بدل ما ياخد المخاطرة الكاملة بحياتها في الشقة' },
          { id:'b', text:'إيمان سافرت فعلاً بإرادتها زي ما قالت غادة' },
          { id:'c', text:'عاطف صاحب الشقة هو اللي كان وراء اختفائها' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'العيادة السرية كشفت نفسها',
      paragraphs:[
        'صبري، اللي بيدّعي إنه دكتور من غير ترخيص رسمي، تسبب في نزيف خطير أثناء عملية إيمان. بدل ما يبلغ الطوارئ رسميًا ويعرّض العيادة السرية للانكشاف، قرر يدخلها مستشفى قريب باسم مستعار، وترك أهلها وصديقتها في حيرة تامة عن مكانها.',
        'اعترافه بحدوث المضاعفات الخطيرة، وعدم وجود ترخيص رسمي عنده، وسجل دخول طارئ في مستشفى قريب باسم مستعار يطابق حالتها الطبية، كلها أدلة حاصرته وأدت لإيجاد إيمان وإنقاذ حياتها في اللحظة المناسبة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية صبري، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 4 أدلة من: اعترافه بالمضاعفات، غياب الترخيص، وسجل المستشفى، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وإيمان فضلت في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "العيادة السرية"

   الغلاف (cover.webp):
   "Photorealistic shot of an ordinary residential apartment room
   converted into a makeshift clinic, simple medical equipment
   visible, dim lighting, documentary photography style, no text,
   no watermark, photorealistic"

   المشهد ١ (clinic-scene1.jpg):
   "Photorealistic close-up of a woman texting on her phone at
   home, soft evening lighting, photorealistic, no text, no
   watermark"

   المشهد ٢ (clinic-scene2.jpg):
   "Photorealistic shot of a converted bedroom with basic medical
   equipment, dim clinical lighting, photorealistic, no text, no
   watermark"

   المشهد ٣ (clinic-scene3.jpg):
   "Photorealistic shot of a tired woman sitting in a recovery room
   after a procedure, dim soft lighting, photorealistic, no text,
   no watermark"

   المشهد ٤ (clinic-scene4.jpg):
   "Photorealistic shot of a worried woman showing her phone to an
   investigator in a living room, soft indoor lighting,
   photorealistic, no text, no watermark"

   صبري (sabry.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man in a
   simple medical coat, nervous evasive expression, standing in a
   makeshift clinic room, dim clinical lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   غادة (ghada.jpg):
   "Photorealistic portrait of a young Egyptian woman in simple
   medical assistant attire, anxious guarded expression, standing
   near medical supplies, dim lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   عاطف (atef.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   outfit, evasive uncomfortable expression, standing near an
   apartment door, natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دنيا (donia.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual
   outfit, worried concerned expression, sitting in a living room,
   soft natural lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   دليل الإعلان (clinic-ad.jpg):
   "Photorealistic close-up of a smartphone screen showing a social
   media beauty clinic advertisement, soft phone glow lighting, no
   text, no watermark, photorealistic"

   دليل الرسالة (clinic-message.jpg):
   "Photorealistic close-up of a smartphone screen showing a text
   message conversation, soft phone glow lighting, no text, no
   watermark, photorealistic"

   دليل المستشفى (clinic-hospital.jpg):
   "Photorealistic close-up of a hospital admission record document
   on a clipboard, clinical lighting, no text, no watermark,
   photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_SECRET_CLINIC;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const s=c.suspects.find(s=>s.id==='unlicensed_doctor_sabry');
  if(s && !s.questions.some(q=>q.closesInterrogation)) s.questions.push({
    q:'إيمان ماخرجتش قدام غادة، وسجل المستشفى جاب حالة نزيف باسم مستعار مطابقة ليها. إنت اللي دخلتها هناك؟',
    requires:['sabry_no_license','sabry_complication','hospital_admission_record'], closesInterrogation:true,
    a:'(بيسكت) "أيوه. النزيف كان أخطر من اللي قلت. خفت لو دخلتها باسمها الحقيقي يتكشف مكان العيادة، فسجلتها باسم مستعار في المستشفى."'
  });

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_SECRET_CLINIC;
  c.dnaLabPuzzle.enabled = false;
  c.dnaLabPuzzle.resultEvidenceIds = [];
  c.evidenceCombinations = [];

  const s = c.suspects.find(x => x.id === 'unlicensed_doctor_sabry');
  if (s) {
    if (!s.questions.some(q => q.unlockId === 'hospital_admission_record')) {
      s.questions.push({
        q:'بعد ما النزيف زاد، نقلت إيمان لأي مستشفى أو مركز طبي؟',
        requires:['sabry_complication'],
        unlockId:'hospital_admission_record',
        a:'(بيتردد) "خرجت بيها لمكان طبي قريب عشان تتلحق. استخدمت اسم مختلف عشان مايتكشفش موضوع العيادة، وده كان قرار غلط."'
      });
    }
    const hospitalQuestion=s.questions.find(q=>q.unlockId==='hospital_admission_record');
    if(hospitalQuestion) hospitalQuestion.unlockId=null;
    const q = s.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'سجل المستشفى باسم مستعار مطابق لحالة إيمان، وغادة ما شافتهاش تخرج سليمة. ليه أخفيت مكانها؟';
      q.a = '(بيسكت) "كنت خايف من انكشاف العيادة والترخيص. أخفيت مكانها عن أهلها، لكن هدفي وقتها كان ألحق المضاعفات، مش أضيّعها."';
    }
  }

  c.correctSuspectId = 'unlicensed_doctor_sabry';
  c.investigationActions=[...(c.investigationActions||[]),{
    id:'clinic_check_hospitals_v2',kind:'تحريات طبية',label:'راجع سجلات المستشفيات القريبة',
    description:'ابحث عن حالة نزيف دخلت بعد العملية، بما في ذلك الحالات المسجلة بأسماء غير مطابقة.',
    requires:['sabry_complication','ghada_saw_leaving'],resultEvidenceIds:['hospital_admission_record'],
    successText:'ظهر دخول طارئ باسم مستعار يطابق حالة إيمان وتوقيت نقلها.'
  }];
  c.conclusiveEvidenceIds = ['sabry_no_license','sabry_complication','ghada_saw_leaving','hospital_admission_record'];
  c.conclusiveRequired = 4;
})();
