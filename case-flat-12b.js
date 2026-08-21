/* ============================================================
   بيانات قضية: الشقة 12 ب
   قضية خطف — صاحب شقة مفروشة بيلاقي أثر خطف واضح لمستأجرة
   جديدة، من غير أي خاطف واضح من كاميرات المبنى.
   ============================================================ */

const IMG_BASE_FLAT12B = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/flat-12b/';

const CASE_FLAT_12B = {
  id: 'flat-12b',
  title: 'الشقة 12 ب',
  caseNo: 'CASE 031',
  subtitle: 'عمارة سكنية، حي راقٍ، القاهرة',
  coverImg: IMG_BASE_FLAT12B + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 30,
  investigationPoints: 17,
  teaser: 'مستأجرة جديدة بتختفي من شقتها المفروشة، وسط علامات خطف واضحة، بس كاميرات المبنى مش شايفة أي حد داخل أو خارج في التوقيت المشبوه.',

  isPremium: false,
  categories: ['kidnapping', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_FLAT12B + 'cover.webp',
    heroCaption: 'CASE 031 — شقة 12 ب في صمت غريب',
    text1: 'صاحب العمارة "عادل" دخل الشقة 12 ب بعد ما المستأجرة الجديدة "سلمى" ما ردتش على أي مكالمة لمدة يومين. لقى الشقة في حالة فوضى، الباب مخلوع من الداخل، وحقيبتها وموبايلها متروكين على الأرض.',
    text2: 'الغريب إن كاميرات المبنى مش شايفة أي حد غريب داخل أو خارج في نطاق الوقت المتوقع للحادثة. يعني إما الخاطف كان معروف عند سلمى وقدر يدخل من غير ما يلفت الانتباه، أو إن حاجة تانية خالص حصلت. عادل طلب منك تحقق قبل ما يبلغ الشرطة رسميًا ويتلخبط اسم العمارة كلها.',
    meta: [
      { label:'الضحية', value:'سلمى — مستأجرة جديدة في الشقة 12 ب' },
      { label:'مكان الحادثة', value:'الشقة 12 ب، الدور الثاني عشر' },
      { label:'الغموض', value:'كاميرات المبنى مفيهاش أي أثر لخاطف غريب' },
      { label:'طلب التحقيق', value:'عادل، صاحب العمارة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — القلق يبدأ',
      img: IMG_BASE_FLAT12B + 'flat12b-scene1.jpg',
      text:'عادل بيحاول يتواصل مع سلمى لتحصيل الإيجار، محدش بيرد لمدة يومين متواصلين رغم إن سيارتها لسه واقفة تحت العمارة.'
    },
    {
      scene:'المشهد ٢ — فتح الشقة',
      img: IMG_BASE_FLAT12B + 'flat12b-scene2.jpg',
      text:'عادل بيفتح الشقة بمفتاحه الاحتياطي، يلاقي الباب الداخلي مخلوع والأثاث مقلوب في الصالة.'
    },
    {
      scene:'المشهد ٣ — آثار الخطف',
      img: IMG_BASE_FLAT12B + 'flat12b-scene3.jpg',
      text:'حقيبة سلمى وموبايلها متروكين على الأرض، وكوباية شاي نص فاضية على الترابيزة، كأن حد قاطعها فجأة.'
    },
    {
      scene:'المشهد ٤ — مراجعة الكاميرات',
      img: IMG_BASE_FLAT12B + 'flat12b-scene4.jpg',
      text:'كاميرات المدخل الرئيسي والمصعد اتراجعت، ومفيش أي شخص غريب ظاهر داخل أو خارج في نطاق الوقت المتوقع.'
    },
  ],

  suspects: [
    {
      id:'landlord_adel', name:'عادل', role:'صاحب العمارة، هو اللي بلّغ عن الاختفاء', img: IMG_BASE_FLAT12B + 'adel.jpg', avatarEmoji:'🔑',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'سلمى كانت مستأجرة من قد إيه؟',
          a:'"استأجرت الشقة من شهر بس، كانت هادية ومنضبطة في الإيجار."' },
        { q:'حد تاني عنده مفتاح للشقة غيرك؟', unlockId:'spare_key_info',
          a:'"أنا والحارس بس عندنا مفاتيح احتياطية، ومفيش سبب لأي حد فيهم يستخدمها."' },
      ]
    },
    {
      id:'exboyfriend_tarek', name:'طارق', role:'صديق سابق لسلمى، كان بيتصل بيها كتير', img: IMG_BASE_FLAT12B + 'tarek.jpg', avatarEmoji:'📱',
      alibi:'قال إنه كان في شغله طول اليوم اللي فيه سلمى اختفت.',
      questions:[
        { q:'علاقتك بسلمى كانت إيه في الفترة الأخيرة؟', unlockId:'tarek_calls',
          a:'"كنا بنحاول نرجع لبعض، بس هي كانت مترددة، فكنت بكلمها كتير عشان أقنعها."' },
        { q:'حد شافك قريب من العمارة في اليوم ده؟', unlockId:'tarek_seen_nearby',
          a:'(بيتردد) "مريت من الشارع بس ماكنتش قاصد أدخل، مكنش عندي سبب."' },
      ]
    },
    {
      id:'doorman_saber', name:'صابر', role:'حارس العمارة', img: IMG_BASE_FLAT12B + 'saber.jpg', avatarEmoji:'🚪',
      alibi:'قال إنه كان في المدخل طول الوقت وما شافش حد غريب.',
      questions:[
        { q:'إنت شفت سلمى بتستقبل حد في الأيام الأخيرة؟', unlockId:'saber_visitor_note',
          a:'"شفتها كذا مرة بتستقبل واحد باسم يبدو إنه من شغلها، مش طارق ده."' },
        { q:'كاميرا المصعد اتعطلت في يوم من الأيام دي؟', requires:['saber_visitor_note'], unlockId:'elevator_camera_gap',
          a:'"أيوه، كان فيه عطل يوم واحد بس، بالصدفة كان نفس اليوم اللي هي اختفت فيه."' },
      ]
    },
    {
      id:'coworker_ramy', name:'رامي', role:'زميل عمل سلمى، مسؤول مباشر عنها', img: IMG_BASE_FLAT12B + 'ramy.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في اجتماع عمل طول فترة الظهر.',
      questions:[
        { q:'علاقتك بسلمى في الشغل كانت طبيعية؟', unlockId:'ramy_pressure',
          a:'"كنت مسؤول عنها في مشروع كبير، وكانت هتبلغ عن مخالفات مالية اكتشفتها في القسم."' },
        { q:'شاهد أكد إنك دخلت العمارة يوم اختفاء سلمى، رغم إنك قلت كنت في اجتماع — عايز تفسر؟', requires:['ramy_pressure','elevator_camera_gap','saber_visitor_note'], closesInterrogation:true,
          a:'(بيتلعثم) "كنت عايز أقنعها متبلغش، الموضوع اتصعّد وهي رفضت تسكت، فأخدتها معايا عشان أهدّي الموقف... مقصدش يوصل الأمر للي وصله."' },
      ]
    },
  ],

  evidence: [
    { id:'broken_door_lock', tag:'من مسرح الحادثة', crit:true, title:'باب مخلوع من الداخل', img: IMG_BASE_FLAT12B + 'flat12b-door.jpg',
      short:'الباب مخلوع من جهة الداخل مش الخارج',
      full:'الباب الداخلي للشقة مخلوع من جهة الداخل، وده بيدل على إن اللي دخل كان معروف عند سلمى وفتحتله بنفسها، مش اقتحام عنيف من برة.',
      unlocked:true, order:1 },

    { id:'spare_key_info', tag:'من استجواب عادل', crit:false, title:'المفاتيح الاحتياطية', img:null,
      short:'عادل والحارس بس عندهم مفاتيح احتياطية',
      full:'عادل أكد إن المفاتيح الاحتياطية للشقة محدودة جدًا، عنده هو والحارس بس.',
      unlocked:false, order:2 },

    { id:'tarek_calls', tag:'من استجواب طارق', crit:false, title:'مكالمات متكررة من طارق', img:null,
      short:'طارق كان بيحاول يرجع لسلمى',
      full:'طارق اعترف إنه كان بيتصل بسلمى بشكل متكرر في محاولة يرجعوا لبعض، وهي كانت مترددة.',
      unlocked:false, order:3 },

    { id:'tarek_seen_nearby', tag:'من شهادة جار', crit:false, title:'طارق قريب من العمارة', img:null,
      short:'جار شاف طارق في الشارع قريب من العمارة',
      full:'جار أكد إنه شاف طارق في الشارع قريب من العمارة في اليوم اللي سلمى اختفت فيه، بس من غير دليل واضح إنه دخل.',
      unlocked:false, order:4 },

    { id:'saber_visitor_note', tag:'من استجواب صابر', crit:true, title:'زائر غير معروف', img:null,
      short:'صابر شاف رجل غريب بيزور سلمى كذا مرة',
      full:'صابر أكد إنه شاف سلمى بتستقبل رجل غريب كذا مرة في الفترة الأخيرة، ووصفه بشكل قريب من زميل شغلها رامي.',
      unlocked:false, order:5 },

    { id:'elevator_camera_gap', tag:'من استجواب صابر', crit:true, title:'عطل كاميرا المصعد', img: IMG_BASE_FLAT12B + 'flat12b-cam.jpg',
      short:'كاميرا المصعد اتعطلت بالصدفة في يوم الاختفاء بالظبط',
      full:'كاميرا المصعد كانت متعطلة في نفس يوم اختفاء سلمى بالظبط، وده فسّر غياب أي تسجيل واضح لدخول أو خروج الفاعل.',
      unlocked:false, order:6 },

    { id:'ramy_pressure', tag:'من استجواب رامي', crit:true, title:'ضغط مخالفات مالية', img:null,
      short:'سلمى كانت هتبلغ عن مخالفات مالية في القسم',
      full:'رامي اعترف إن سلمى كانت اكتشفت مخالفات مالية في القسم وهتبلغ عنها، وده كان هيأثر عليه مباشرة كمسؤول عنها.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم جديد: alibiGridPuzzle
     جدول زمني بيوضح مواقع كل المشتبه بيهم في فترات مختلفة من
     اليوم. اللاعب لازم يحدد الفترة اللي فيها تناقض واضح بين
     أقوال شخصين مختلفين عن نفس المكان أو الوقت.
     ============================================================ */
  alibiGridPuzzle: {
    enabled: true,
    tabLabel: 'جدول الحجج الزمنية',
    introText: 'قارن أقوال كل المشتبه بيهم عن أماكنهم في نفس الفترة الزمنية، ودوّر على التناقض اللي بيكشف الكذب.',
    resultText: 'لقيت التناقض! رامي قال إنه كان في اجتماع، لكن شهادة الحارس وعطل الكاميرا بيوضحوا وجوده الفعلي في العمارة في نفس التوقيت.',
    timeSlots: ['12:00 م', '1:00 م', '2:00 م', '3:00 م'],
    suspectClaims: {
      landlord_adel:   ['المكتب', 'المكتب', 'المكتب', 'المكتب'],
      exboyfriend_tarek:['الشغل', 'الشغل', 'الشغل', 'الشغل'],
      doorman_saber:   ['المدخل', 'المدخل', 'المدخل', 'المدخل'],
      coworker_ramy:   ['اجتماع', 'اجتماع', 'اجتماع', 'اجتماع'],
    },
    contradictionSlotIndex: 2,
    contradictingSuspectId: 'coworker_ramy',
    resultEvidenceIds: ['ramy_pressure'],
  },

  evidenceCombinations: [
    { parts:['saber_visitor_note','tarek_calls'], resultId:'elevator_camera_gap' },
  ],

  correctSuspectId: 'coworker_ramy',
  conclusiveEvidenceIds: ['ramy_pressure', 'saber_visitor_note', 'elevator_camera_gap'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن رامي هو الفاعل؟',
        options: [
          { id:'a', text:'وصف الحارس لزائر غريب طابق رامي + عطل الكاميرا المريب اللي غطى تحركاته + دافعه المرتبط بمخالفات مالية' },
          { id:'b', text:'لأنه زميل شغلها وده يكفي' },
          { id:'c', text:'لأن الباب كان مخلوع من الداخل بس' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت خطة رامي الحقيقية؟',
        options: [
          { id:'a', text:'ماكنش ناوي يخطفها؛ كان عايز يقنعها متبلغش عن المخالفات، لكنها رفضت والموقف اتصعّد لخطف فعلي' },
          { id:'b', text:'كان مخطط للخطف من البداية بدافع مالي بحت' },
          { id:'c', text:'كان بيحاول يساعدها في مشكلة تانية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — RESCUE', title:'الكاميرا المعطلة كانت الخيط',
      paragraphs:[
        'سلمى اكتشفت مخالفات مالية خطيرة في القسم اللي بيشرف عليه رامي، وكانت مصممة تبلغ عنها رسميًا. رامي حاول يقنعها تسكت بزيارات متكررة، ولما رفضت في اليوم الأخير، حاول يمنعها بالقوة من الإبلاغ، والموقف اتصعّد لخطف فعلي.',
        'وصف الحارس لزائر غريب طابق ملامح رامي، وعطل كاميرا المصعد اللي حصل بالصدفة في نفس يوم الاختفاء بالظبط، ودافعه الواضح المرتبط بالمخالفات المالية، كلها أدلة حاصرته وأدت لإنقاذ سلمى قبل ما يتفاقم الموقف.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية رامي، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: وصف الحارس، عطل الكاميرا، ودافعه المالي، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسلمى فضلت في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الشقة 12 ب"

   الغلاف (cover.webp):
   "Photorealistic shot of a modern apartment building hallway at
   night, a single apartment door slightly ajar with dim light
   leaking out, documentary photography style, no text, no
   watermark, photorealistic"

   المشهد ١ (flat12b-scene1.jpg):
   "Photorealistic shot of a middle-aged Egyptian man standing
   worried outside an apartment door, knocking, dim hallway
   lighting, photorealistic, no text, no watermark"

   المشهد ٢ (flat12b-scene2.jpg):
   "Photorealistic shot of a messy apartment living room, overturned
   furniture, a broken interior door, dim moody lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (flat12b-scene3.jpg):
   "Photorealistic close-up of an abandoned handbag and phone on an
   apartment floor next to a half-full teacup, dim lighting,
   forensic evidence photography style, no text, no watermark"

   المشهد ٤ (flat12b-scene4.jpg):
   "Photorealistic shot of a security guard reviewing CCTV monitors
   in a building lobby, dim blue monitor glow, photorealistic, no
   text, no watermark"

   عادل (adel.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male landlord,
   casual formal outfit, concerned expression, standing in a
   building hallway, soft indoor lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   طارق (tarek.jpg):
   "Photorealistic portrait of a young Egyptian male, casual
   clothing, anxious nervous expression, standing on a street near
   an apartment building, natural daylight, candid documentary
   photography style, no text, no watermark, photorealistic"

   صابر (saber.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male building
   doorman, simple uniform, watchful attentive expression, standing
   at a building entrance, natural lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   رامي (ramy.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male office
   manager, formal business attire, calculating guarded expression,
   standing in a corridor, office lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل الباب (flat12b-door.jpg):
   "Photorealistic close-up of a broken interior door lock,
   forensic evidence photography style, dim lighting, no text, no
   watermark, photorealistic"

   دليل الكاميرا (flat12b-cam.jpg):
   "Photorealistic security camera style still frame of an empty
   elevator interior with a glitch static effect, grainy
   surveillance footage look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_FLAT_12B;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'ramy_alibi_broken', tag:'من شبكة الأعذار', crit:true, title:'حجة اجتماع رامي اتكسرت', img:null,
    short:'مقارنة التوقيتات بتثبت إن رامي كان في العمارة مش في الاجتماع',
    full:'شبكة الأعذار جمعت شهادة الحارس وتوقيتات الدخول وعطل الكاميرا، وبيّنت إن رامي كان موجود في العمارة في الفترة اللي ادّعى إنه كان فيها باجتماع.', unlocked:false, order:90 });
  c.alibiGridPuzzle.resultEvidenceIds = ['ramy_alibi_broken'];
  c.conclusiveEvidenceIds = ['ramy_pressure','saber_visitor_note','ramy_alibi_broken'];
  const r=c.suspects.find(s=>s.id==='coworker_ramy'); if(r){const q=r.questions.find(q=>q.closesInterrogation); if(q) q.requires=['ramy_pressure','saber_visitor_note','ramy_alibi_broken'];}
  setTheory0('وصف الحارس للزائر اللي طابق رامي + شبكة الأعذار اللي كسرت قصة الاجتماع + دافعه المرتبط بالمخالفات المالية اللي سلمى كانت هتبلغ عنها');
  c.endings.good.paragraphs[1] = 'وصف الحارس للزائر اللي كان بيروح لسلمى، وشبكة الأعذار اللي أثبتت وجود رامي في العمارة رغم قصة الاجتماع، ودافعه المباشر المرتبط بالمخالفات المالية، كلها أدلة حاصرته وأدت للوصول لسلمى.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: ضغط المخالفات، وصف الحارس، وكسر حجة اجتماع رامي، قبل ما تتهم.';

})();

(() => {
  const s = CASE_FLAT_12B.suspects.find(x => x.id === 'coworker_ramy');
  if (s && !s.questions.some(x => x.q === 'قبل يوم الاختفاء، حاولت تكلم سلمى عن موضوع المخالفات؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'قبل يوم الاختفاء، حاولت تكلم سلمى عن موضوع المخالفات؟', requires:['ramy_pressure'], a:'"كلمتها كذا مرة وقلت لها تستنى قبل ما تبلغ. كنت شايف إننا نقدر نحل الموضوع جوه الشركة من غير فضيحة."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_FLAT_12B;
  const evidence = id => c.evidence.find(e => e.id === id);
  if (!evidence('saber_identifies_ramy')) {
    c.evidence.push({
      id:'saber_identifies_ramy', tag:'من استجواب صابر', crit:true,
      title:'صابر يتعرف على زائر سلمى', img:null,
      short:'بعد عرض صور فريق الشغل، صابر تعرّف على رامي باعتباره الزائر اللي شافه قبل الاختفاء',
      full:'صابر ماكانش فاكر الاسم وقت الاستجواب الأول. بعد ما شاف صور الأشخاص المرتبطين بسلمى، تعرّف على رامي باعتباره الشخص اللي كان بيزور سلمى بصفته زميل من الشغل قرب يوم الاختفاء.',
      unlocked:false, order:90
    });
  }
  const s = c.suspects.find(x => x.id === 'doorman_saber');
  if (s && !s.questions.some(q => q.unlockId === 'saber_identifies_ramy')) {
    s.questions.push({
      q:'لو وريتك صور زملاء سلمى، تقدر تحدد الشخص اللي كنت بتشوفه بيزورها؟',
      requires:['saber_visitor_note','ramy_pressure'],
      unlockId:'saber_identifies_ramy',
      a:'"أيوه، ده هو رامي. شفته قبل كده داخل لها بصفته من الشغل. ماكنتش أعرف اسمه وقتها."'
    });
  }
  if (c.alibiGridPuzzle) {
    c.alibiGridPuzzle.resultText = 'الجدول يوضح إن عطل الكاميرا عمل فجوة مهمة في التوقيت، لكنه لوحده مايثبتش إن رامي كان جوه العمارة. محتاج شهادة تحدد هوية الزائر.';
    c.alibiGridPuzzle.resultEvidenceIds = ['elevator_camera_gap'];
  }
  c.evidenceCombinations = [];
  const r = c.suspects.find(s => s.id === 'coworker_ramy');
  if (r) {
    const q = r.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'صابر اتعرف عليك كزائر لسلمى، وده يناقض كلامك إنك كنت في اجتماع بعيد عن العمارة. تفسر وجودك إزاي؟';
      q.requires = ['ramy_pressure','saber_identifies_ramy','elevator_camera_gap'];
      q.a = '(بيتلعثم) "عديت عليها فعلًا عشان أتكلم معاها في موضوع الشغل، لكن سيبتها بعدها ومشيت. وجودي عندها مش دليل إني خطفتها."';
    }
  }
  c.conclusiveEvidenceIds = ['ramy_pressure','saber_identifies_ramy','elevator_camera_gap','broken_door_lock'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_FLAT_12B;
  if (c.alibiGridPuzzle && c.alibiGridPuzzle.enabled) {
    c.alibiGridPuzzle.resultEvidenceIds = ['ramy_alibi_broken'];
    c.alibiGridPuzzle.resultText = 'مقارنة التوقيتات كسرت حجة اجتماع رامي وحددت الفجوة في روايته.';
  }
})();
