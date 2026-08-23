/* ============================================================
   بيانات قضية: نادي الفجر
   قضية قتل (محتوى للبالغين) — نادي ليلي فاخر بيتقفل مؤقتًا بعد
   وفاة مشبوهة لواحد من الزباين المهمين جدًا للمكان.
   ============================================================ */

const IMG_BASE_DAWNCLUB = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/dawn-club/';

const CASE_DAWN_CLUB = {
  id: 'dawn-club',
  title: 'نادي الفجر',
  caseNo: 'CASE 042',
  subtitle: 'نادي ليلي فاخر، وسط القاهرة',
  coverImg: IMG_BASE_DAWNCLUB + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'رجل أعمال معروف بيموت فجأة في غرفة كبار الشخصيات بنادي ليلي فاخر، وسط أجواء صاخبة وشهود كتير بس رواياتهم متضاربة تمامًا.',

  isPremium: false,
  categories: ['murder', 'nightlife'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي بتدور في بيئة نادي ليلي وبتتضمن إشارات لتعاطي كحول وأجواء بالغين، من غير أي محتوى صريح.',

  briefing: {
    heroImg: IMG_BASE_DAWNCLUB + 'cover.webp',
    heroCaption: 'CASE 042 — ليلة في غرفة كبار الشخصيات',
    text1: 'رجل الأعمال "عمرو" كان من زباين نادي الفجر الدائمين، بيقعد في غرفة كبار الشخصيات كل أسبوع تقريبًا. الليلة دي، اتلاقى فاقد الوعي في نفس الغرفة، ومات قبل ما الإسعاف يوصل.',
    text2: 'مالك النادي طلب منك تحقق بسرعة وسرية قبل ما القضية تأثر على ترخيص النادي وسمعته. عندك شهادات من فريق العمل والزباين اللي كانوا قريبين من عمرو في آخر ساعة.',
    meta: [
      { label:'المجني عليه', value:'عمرو — رجل أعمال، زبون دائم للنادي' },
      { label:'مكان الحادثة', value:'غرفة كبار الشخصيات في النادي' },
      { label:'الغموض', value:'شهود كتير بروايات متضاربة' },
      { label:'طلب التحقيق', value:'مالك النادي' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — ليلة عادية',
      img: IMG_BASE_DAWNCLUB + 'dawn-scene1.jpg',
      text:'النادي مزدحم بالزباين، أضواء ملونة وموسيقى صاخبة، عمرو قاعد في غرفة كبار الشخصيات مع مجموعة أصدقاء.'
    },
    {
      scene:'المشهد ٢ — التوتر',
      img: IMG_BASE_DAWNCLUB + 'dawn-scene2.jpg',
      text:'شهود بيلاحظوا نقاش حاد بين عمرو وشخص تاني في الغرفة قبل ما الوضع يهدأ ويرجع الجميع لجو الاحتفال.'
    },
    {
      scene:'المشهد ٣ — الانهيار',
      img: IMG_BASE_DAWNCLUB + 'dawn-scene3.jpg',
      text:'بعد شوية، عمرو بيتلاقى فاقد الوعي على الأريكة، أصدقاؤه في حالة ذعر وسط صوت الموسيقى العالي.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_DAWNCLUB + 'dawn-scene4.jpg',
      text:'مالك النادي بيديك صلاحية تراجع كاميرات غرفة كبار الشخصيات وقائمة الحاضرين معاه الليلة دي.'
    },
  ],

  suspects: [
    {
      id:'business_rival_sherif_c', name:'شريف', role:'منافس تجاري لعمرو', img: IMG_BASE_DAWNCLUB + 'sherif_c.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في نفس الغرفة بس بعيد عن عمرو معظم الوقت.',
      questions:[
        { q:'علاقتك التجارية بعمرو كانت إيه؟', unlockId:'sherif_c_rivalry',
          a:'"كنا منافسين في نفس القطاع، وعمرو كان بيحاول يستولي على صفقة كنت مستني عليها بقالي شهور."' },
        { q:'النقاش الحاد اللي شافه الشهود كان بينك وبينه؟', unlockId:'sherif_c_argument',
          a:'(بيتردد) "أيوه، اتناقشنا في الصفقة، الكلام اتصعّد شوية بس مافيش عنف."' },
      ]
    },
    {
      id:'club_owner_mostafa', name:'مصطفى', role:'مالك النادي، طلب التحقيق', img: IMG_BASE_DAWNCLUB + 'mostafa.jpg', avatarEmoji:'🌃',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'عمرو كان مهم لسمعة النادي إزاي؟',
          a:'"كان من كبار الزباين اللي بيجيبوا سمعة وفلوس كتير للمكان، وفاته أثرت علينا بشكل كبير."' },
        { q:'مين كان مسؤول عن تقديم المشروبات في غرفة كبار الشخصيات؟', unlockId:'vip_service_staff',
          a:'"النادل الخاص بالغرفة، بيتابع كل طلبات الزباين المهمين بنفسه."' },
      ]
    },
    {
      id:'waiter_ehab', name:'إيهاب', role:'نادل غرفة كبار الشخصيات', img: IMG_BASE_DAWNCLUB + 'ehab.jpg', avatarEmoji:'🍸',
      alibi:'قال إنه كان بيخدم كل الطلبات حسب البروتوكول المعتاد.',
      questions:[
        { q:'إنت اللي قدّمت مشروب عمرو الأخير؟', unlockId:'ehab_last_drink',
          a:'"أيوه، طلب مشروبه المعتاد زي كل مرة، ماعملتش أي حاجة غريبة."' },
        { q:'حد طلب منك تضيف حاجة لمشروب عمرو الليلة دي؟', requires:['ehab_last_drink'], unlockId:'ehab_bribe_offer',
          a:'(بيتلعثم) "شريف عرض عليّ مبلغ كبير أضيف حاجة لمشروب عمرو، قالي إنها بس عشان يهدي شوية."' },
      ]
    },
    {
      id:'girlfriend_mariam_c', name:'مريم', role:'صديقة عمرو، كانت معاه في الغرفة', img: IMG_BASE_DAWNCLUB + 'mariam_c.jpg', avatarEmoji:'💃',
      alibi:'قالت إنها كانت قاعدة جنب عمرو طول الليلة تقريبًا.',
      questions:[
        { q:'لاحظتِ أي تغيير في حالة عمرو قبل ما ينهار؟', unlockId:'mariam_c_observation',
          a:'"كان بيتصرف طبيعي، بس بعد المشروب الأخير بدأ يتكلم بشكل غريب شوية."' },
        { q:'شاهد أكد إن شريف اتصل بيك بعد الحادثة مباشرة — عايز تفسري؟', requires:['mariam_c_observation','ehab_bribe_offer','sherif_c_argument'], closesInterrogation:true,
          a:'(بتتردد) "شريف اتصل بيا يهددني أسكت عن أي حاجة شفتها. أنا مكنتش عارفة تفاصيل، بس خفت أتكلم قبل كده."' },
      ]
    },
  ],

  evidence: [
    { id:'toxicology_report_c', tag:'من التحليل الطبي', crit:true, title:'مادة مؤثرة في دم عمرو', img: IMG_BASE_DAWNCLUB + 'dawn-report.jpg',
      short:'مادة غير معروفة موجودة في دم عمرو بتركيز خطير',
      full:'التحليل الطبي كشف مادة غير معتادة في دم عمرو، بتركيز أعلى بكتير من أي جرعة ترفيهية عادية.',
      unlocked:true, order:1 },

    { id:'sherif_c_rivalry', tag:'من استجواب شريف', crit:false, title:'منافسة تجارية حادة', img:null,
      short:'شريف وعمرو منافسين في نفس القطاع التجاري',
      full:'شريف اعترف بوجود منافسة تجارية حادة بينه وبين عمرو على صفقة مهمة.',
      unlocked:false, order:2 },

    { id:'sherif_c_argument', tag:'من شهادة زبون', crit:false, title:'نقاش حاد بين شريف وعمرو', img:null,
      short:'شاهد أكد نقاش حاد بينهم قبل الحادثة',
      full:'شريف اعترف بوجود نقاش حاد بينه وبين عمرو حول الصفقة، بس نفى أي عنف مباشر.',
      unlocked:false, order:3 },

    { id:'vip_service_staff', tag:'من استجواب مصطفى', crit:false, title:'مسؤولية خدمة الغرفة', img:null,
      short:'النادل إيهاب مسؤول عن كل طلبات الغرفة',
      full:'مصطفى أكد إن إيهاب هو المسؤول الوحيد عن تقديم كل المشروبات في غرفة كبار الشخصيات.',
      unlocked:false, order:4 },

    { id:'ehab_last_drink', tag:'من استجواب إيهاب', crit:false, title:'إيهاب قدّم آخر مشروب', img:null,
      short:'إيهاب أكد إنه قدّم مشروب عمرو الأخير',
      full:'إيهاب أكد إنه هو اللي قدّم مشروب عمرو الأخير قبل ما ينهار، حسب الطلب المعتاد.',
      unlocked:false, order:5 },

    { id:'ehab_bribe_offer', tag:'من استجواب إيهاب', crit:true, title:'عرض رشوة من شريف', img:null,
      short:'شريف عرض على إيهاب مبلغ كبير عشان يضيف حاجة للمشروب',
      full:'إيهاب اعترف إن شريف عرض عليه مبلغ كبير عشان يضيف مادة معينة لمشروب عمرو، بحجة إنها بس عشان تهدئته.',
      unlocked:false, order:6 },

    { id:'mariam_c_observation', tag:'من استجواب مريم', crit:false, title:'ملاحظة مريم على سلوك عمرو', img:null,
      short:'عمرو بدأ يتصرف بشكل غريب بعد آخر مشروب',
      full:'مريم أكدت إن عمرو بدأ يتصرف بشكل غريب وغير معتاد بعد ما شرب آخر مشروب بالذات.',
      unlocked:false, order:7 },

    { id:'threat_call_record', tag:'من سجل مكالمات مريم', crit:true, title:'مكالمة تهديد من شريف', img: IMG_BASE_DAWNCLUB + 'dawn-phone.jpg',
      short:'شريف اتصل بمريم بعد الحادثة يهددها تسكت',
      full:'سجل المكالمات بيوضح اتصال من شريف لمريم بعد الحادثة مباشرة، في مكالمة قصيرة يهددها فيها تسكت عن أي حاجة شافتها.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },

  polygraphPuzzle: {
    enabled: true,
    tabLabel: 'كشف الكذب',
    introText: 'اسأل كل المشتبه بيهم: "هل طلبت من حد يضيف حاجة لمشروب عمرو؟" وراقب مستوى التذبذب على شاشة كشف الكذب.',
    resultText: 'أعلى مستوى تذبذب كان مع شريف، وده بيأكد كذبه في إنكار طلب الإضافة للمشروب.',
    question: 'هل طلبت من حد يضيف حاجة لمشروب عمرو؟',
    suspectReadings: {
      business_rival_sherif_c: 91,
      club_owner_mostafa:      12,
      waiter_ehab:              40,
      girlfriend_mariam_c:      20,
    },
    truthThreshold: 50,
    correctSuspectId: 'business_rival_sherif_c',
    resultEvidenceIds: ['ehab_bribe_offer'],
  },

  evidenceCombinations: [
    { parts:['sherif_c_argument','mariam_c_observation'], resultId:'threat_call_record' },
  ],

  correctSuspectId: 'business_rival_sherif_c',
  conclusiveEvidenceIds: ['ehab_bribe_offer', 'threat_call_record', 'toxicology_report_c'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن شريف هو الفاعل؟',
        options: [
          { id:'a', text:'أعلى مستوى تذبذب في كشف الكذب + اعتراف إيهاب بعرض الرشوة + مكالمة التهديد اللي بعتها لمريم بعد الحادثة' },
          { id:'b', text:'لأنه منافس تجاري وده يكفي كدافع' },
          { id:'c', text:'لأن مريم كانت آخر واحدة قاعدة جنبه' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية شريف الحقيقية؟',
        options: [
          { id:'a', text:'كان عايز يخلي عمرو يتصرف بشكل محرج أو ضعيف عشان يخسر الصفقة، مش يقتله، لكن الجرعة اللي طلب من إيهاب يضيفها كانت أقوى بكتير من اللي توقعها' },
          { id:'b', text:'كان ناوي يقتله من البداية عشان يستولي على الصفقة بالكامل' },
          { id:'c', text:'كان بيحاول يحمي نفسه من عمرو فقط' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الغرفة الفاخرة كشفت أسرارها',
      paragraphs:[
        'شريف كان في منافسة تجارية حادة مع عمرو على صفقة كبيرة. حاول يخليه يتصرف بشكل محرج أو ضعيف قدام الحاضرين عشان يخسر مصداقيته في الصفقة، فطلب من إيهاب النادل يضيف مادة لمشروبه مقابل رشوة كبيرة. الجرعة كانت أقوى بكتير من اللي توقعها، وانتهى الأمر بوفاة عمرو.',
        'أعلى مستوى تذبذب في كشف الكذب فضح إنكاره، واعتراف إيهاب بعرض الرشوة عليه، ومكالمة التهديد اللي بعتها لمريم بعد الحادثة مباشرة يخوفها تسكت، كلها أدلة حاصرته وأثبتت مسؤوليته الكاملة.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية شريف، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: كشف الكذب، اعتراف النادل، ومكالمة التهديد، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسمعة النادي فضلت مهددة بتهمة مالهاش أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "نادي الفجر"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty luxury nightclub VIP room at
   dawn, dim colorful ambient lighting fading, a single abandoned
   glass on a table, documentary photography style, no text, no
   watermark, photorealistic"

   المشهد ١ (dawn-scene1.jpg):
   "Photorealistic wide shot of a crowded luxury nightclub with
   colorful lights, VIP lounge area visible, energetic atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٢ (dawn-scene2.jpg):
   "Photorealistic shot of a tense conversation between two men in
   a dim VIP lounge, colorful ambient club lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (dawn-scene3.jpg):
   "Photorealistic dramatic shot of a man collapsed on a lounge sofa
   in a VIP club room, dim colorful lighting, concerned figures
   nearby, photorealistic, no text, no watermark"

   المشهد ٤ (dawn-scene4.jpg):
   "Photorealistic shot of a nightclub owner reviewing security
   footage in a small office, dim monitor glow, photorealistic, no
   text, no watermark"

   شريف (sherif_c.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   businessman, sharp formal suit, calculating tense expression,
   standing in a nightclub VIP area, dim ambient lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   مصطفى (mostafa.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male nightclub
   owner, sharp business casual outfit, concerned authoritative
   expression, standing in a nightclub office, warm lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   إيهاب (ehab.jpg):
   "Photorealistic portrait of a young Egyptian male waiter, formal
   nightclub uniform, nervous evasive expression, standing near a
   bar counter, dim ambient club lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   مريم (mariam_c.jpg):
   "Photorealistic portrait of a young Egyptian woman, elegant
   evening outfit, worried composed expression, sitting in a
   nightclub VIP lounge, dim ambient lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل التقرير الطبي (dawn-report.jpg):
   "Photorealistic close-up of a medical toxicology report document
   with charts, clinical lighting, no text, no watermark,
   photorealistic"

   دليل الهاتف (dawn-phone.jpg):
   "Photorealistic close-up of a smartphone screen showing a call
   log with a recent unknown entry, soft phone glow lighting, no
   text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_DAWN_CLUB;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'sherif_polygraph_lie', tag:'من اختبار كشف الكذب', crit:true, title:'شريف كدب في سؤال المشروب', img:null,
    short:'أعلى تذبذب ظهر عند شريف لما اتسأل عن إضافة حاجة لمشروب عمرو',
    full:'نتيجة كشف الكذب أظهرت أعلى مستوى تذبذب عند شريف تحديدًا في سؤال طلب إضافة مادة لمشروب عمرو، وده بيدعم باقي الأدلة ضده.', unlocked:false, order:90 });
  c.polygraphPuzzle.resultEvidenceIds = ['sherif_polygraph_lie'];
  c.conclusiveEvidenceIds = ['sherif_polygraph_lie','ehab_bribe_offer','threat_call_record'];
  const mariam=c.suspects.find(s=>s.id==='girlfriend_mariam_c'); if(mariam){const q=mariam.questions.find(q=>q.closesInterrogation);if(q)q.unlockId='threat_call_record';}
  const sh=c.suspects.find(s=>s.id==='business_rival_sherif_c');
  if(sh && !sh.questions.some(q=>q.closesInterrogation)) sh.questions.push({
    q:'إيهاب قال إنك عرضت عليه الفلوس، وكشف الكذب فضح إنكارك، وبعدها هددت مريم. كنت عايز تعمل إيه في عمرو؟',
    requires:['sherif_polygraph_lie','ehab_bribe_offer','threat_call_record'], closesInterrogation:true,
    a:'(بيسكت) "كنت عايزه يبان مهزوز قدام الناس ويخسر الصفقة، مش يموت. طلبت جرعة أضعف من كده، بس اللي حصل خرج عن اللي كنت متوقعه."'
  });

})();

/* ENDING CONSISTENCY PATCH */
(() => {
  const c=CASE_DAWN_CLUB;
  c.evidence.push({id:'sherif_payment_to_ehab',tag:'تحليل التحويلات',crit:true,title:'تحويل شريف للنادل',img:null,short:'تحويل مالي من شريف لإيهاب قبل الحادثة',full:'كشف التحويلات أثبت إن شريف حول لإيهاب مبلغًا غير معتاد قبل الحادثة بساعات، وإيهاب أكد إنه مقابل إضافة المادة للمشروب.',unlocked:false,order:99});
  c.investigationActions=[...(c.investigationActions||[]),{id:'audit_club_payments',kind:'تحليل مالي',label:'راجع التحويلات بين شريف وإيهاب',requires:['ehab_bribe_offer'],resultEvidenceIds:['sherif_payment_to_ehab'],successText:'التحويل المالي وثّق اتفاق شريف مع إيهاب.'}];
  c.conclusiveEvidenceIds=['toxicology_report_c','ehab_bribe_offer','sherif_payment_to_ehab']; c.conclusiveRequired=3;
  c.endings.good.paragraphs[1]='تقرير السموم أثبت المادة وجرعتها، واعتراف إيهاب شرح طريقة دسها، والتحويل المالي من شريف للنادل وثّق الاتفاق بينهما. السلسلة دي أثبتت مسؤولية شريف بدل الاعتماد على كشف الكذب وحده.';
})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_DAWN_CLUB;
  if (c.polygraphPuzzle) {
    c.polygraphPuzzle.enabled = false;
    c.polygraphPuzzle.resultEvidenceIds = [];
  }
  c.evidence = c.evidence.filter(e => e.id !== 'sherif_polygraph_lie');
  c.evidenceCombinations = [];
  const m = c.suspects.find(s => s.id === 'girlfriend_mariam_c');
  if (m) {
    const q = m.questions.find(q => q.closesInterrogation);
    if (q) q.unlockId = 'threat_call_record';
  }
  const sh = c.suspects.find(s => s.id === 'business_rival_sherif_c');
  if (sh) {
    let q = sh.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'إيهاب قال إنك عرضت عليه فلوس يضيف مادة للمشروب، وسجل المكالمة يثبت إنك اتصلت بمريم بعدها. عندك تفسير؟';
      q.requires = ['ehab_bribe_offer','threat_call_record','toxicology_report_c'];
      q.a = '(بيتوتر) "إيهاب بيحاول يعلق غلطه فيا، واتصالي بمريم كان عشان أعرف اللي شافته. ده مش اعتراف إني طلبت تسميم عمرو."';
    }
  }
  c.conclusiveEvidenceIds = ['toxicology_report_c','ehab_bribe_offer','sherif_payment_to_ehab'];
  c.conclusiveRequired = 3;
  const tq = c.theoryBuilder?.questions?.[0];
  if (tq) {
    const o = tq.options.find(x => x.id === tq.correctOptionId);
    if (o) o.text = 'تقرير السموم + شهادة إيهاب عن عرض المال + سجل مكالمة التهديد لمريم بعد الواقعة';
  }
})();
