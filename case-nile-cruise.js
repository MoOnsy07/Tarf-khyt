/* ============================================================
   بيانات قضية: الرحلة النيلية
   قضية اختفاء — راكب بيختفي من على مركب نيلي فاخر وسط نومه،
   والمركب في نص النيل من غير أي مكان قريب يمشي منه.
   ============================================================ */

const IMG_BASE_NILECRUISE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/nile-cruise/';

const CASE_NILE_CRUISE = {
  id: 'nile-cruise',
  title: 'الرحلة النيلية',
  caseNo: 'CASE 050',
  subtitle: 'مركب نيلي فاخر، بين الأقصر وأسوان',
  coverImg: IMG_BASE_NILECRUISE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 38,
  investigationPoints: 21,
  price: '15 جنيه',
  oldPrice: '30 جنيه',
  discountLabel: 'خصم 50%',
  teaser: 'راكب بيختفي من كابينته على مركب نيلي فاخر نص الليل، والمركب في وسط النيل من غير أي مكان قريب يمشي منه. إزاي حد يختفي من مكان مقفول تمامًا؟',

  isPremium: true,
  premiumTier: 'B',
  categories: ['disappearance', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_NILECRUISE + 'cover.webp',
    heroCaption: 'CASE 050 — الليلة الثالثة من الرحلة',
    text1: 'الراكب "منصور" كان في رحلة نيلية فاخرة بين الأقصر وأسوان مع مجموعة صغيرة من السياح والأصدقاء. في الليلة الثالثة، اختفى من كابينته تمامًا، والمركب كان في وسط النيل، بعيد عن أي شاطئ يقدر يمشي منه بأمان.',
    text2: 'كابتن المركب طلب منك تحقق بسرعة قبل ما يوصلوا أسوان ويتفرق الركاب. عندك قائمة الركاب اللي كانوا في نفس الطابق، وتفاصيل الليلة الأخيرة اللي شافوا فيها منصور.',
    meta: [
      { label:'الضحية', value:'منصور — راكب في الرحلة النيلية' },
      { label:'مكان الحادثة', value:'كابينة منصور، الطابق الثاني' },
      { label:'الغموض', value:'المركب كان في وسط النيل بعيد عن أي شاطئ' },
      { label:'طلب التحقيق', value:'كابتن المركب' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — ليلة عادية',
      img: IMG_BASE_NILECRUISE + 'cruise-scene1.jpg',
      text:'الركاب بيتعشوا سوا على سطح المركب، منصور مبسوط ومشارك في الحديث زي كل ليلة.'
    },
    {
      scene:'المشهد ٢ — الانسحاب المبكر',
      img: IMG_BASE_NILECRUISE + 'cruise-scene2.jpg',
      text:'منصور بيعتذر للركاب ويمشي لكابينته بدري شوية عن المعتاد، قال إنه تعبان.'
    },
    {
      scene:'المشهد ٣ — الاختفاء',
      img: IMG_BASE_NILECRUISE + 'cruise-scene3.jpg',
      text:'الصبح، منصور ما نزلش للفطار. لما فتحوا كابينته، لقوها فاضية تمامًا، حاجاته موجودة بس هو مش موجود.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_NILECRUISE + 'cruise-scene4.jpg',
      text:'كابتن المركب بيديك صلاحية تراجع سجل حركة الركاب في الممرات، وقائمة اللي كانوا قريبين من كابينة منصور.'
    },
  ],

  suspects: [
    {
      id:'captain_reda_n', name:'كابتن رضا', role:'كابتن المركب، طلب التحقيق', img: IMG_BASE_NILECRUISE + 'reda_n.jpg', avatarEmoji:'🚢',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'المركب كان في نطاق أي شاطئ قريب وقت الاختفاء؟',
          a:'"كنا في نص النيل، أبعد نقطة عن أي شاطئ في الرحلة كلها، مستحيل حد يعوم أو يمشي من هناك."' },
        { q:'مين كان عنده وصول لممرات الطابق التاني في نص الليل؟', unlockId:'corridor_access_n',
          a:'"كل الركاب طبعًا، بس فيه كاميرا واحدة بس في نص الممر، مش بتغطي كل حاجة."' },
      ]
    },
    {
      id:'business_associate_fady_n', name:'فادي', role:'شريك عمل منصور، في نفس الرحلة', img: IMG_BASE_NILECRUISE + 'fady_n.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في كابينته نايم طول الليل.',
      questions:[
        { q:'علاقتك بمنصور كانت مستقرة في الرحلة دي؟', unlockId:'fady_n_dispute',
          a:'"كان بينا خلاف على قرار مالي كبير، كنت مصمم إنه يوافق قبل ما نرجع القاهرة."' },
        { q:'زرت كابينة منصور في الليلة الأخيرة؟', requires:['fady_n_dispute'], unlockId:'fady_n_visit',
          a:'(بيتردد) "مريت عليه بس عشان نكمل الكلام، خرجت بسرعة."' },
      ]
    },
    {
      id:'wife_yasmin_n', name:'ياسمين', role:'زوجة منصور، معاه في الرحلة', img: IMG_BASE_NILECRUISE + 'yasmin_n.jpg', avatarEmoji:'💍',
      alibi:'قالت إنها كانت في كابينتها منفصلة عن منصور بسبب خلاف بسيط.',
      questions:[
        { q:'ليه كنتوا في كابينتين منفصلتين؟', unlockId:'yasmin_n_separate',
          a:'"كان بينا خلاف بسيط قبل الرحلة، فضّلنا كابينتين لحد ما الموضوع يهدى."' },
        { q:'استفدتِ ماليًا من غياب منصور المفاجئ؟', requires:['yasmin_n_separate'],
          a:'"صراحة، بوليصة تأمين على حياته كبيرة، بس ده مبررش الشك فيا."' },
      ]
    },
    {
      id:'crew_member_ashraf_n', name:'أشرف', role:'أحد أفراد طاقم المركب', img: IMG_BASE_NILECRUISE + 'ashraf_n.jpg', avatarEmoji:'🔑',
      alibi:'قال إنه كان بيعمل جولة تفقدية طبيعية في الطابق وقت الاختفاء.',
      questions:[
        { q:'لاحظت أي حاجة غريبة وقت الجولة التفقدية؟', unlockId:'ashraf_n_observation',
          a:'"شفت فادي طالع من كابينة منصور بشكل مرتبك شوية، مش زي عادته."' },
        { q:'كاميرا الممر سجلت حد بيدخل كابينة منصور بعد كده؟', requires:['ashraf_n_observation'], unlockId:'corridor_camera_footage',
          a:'"عندي التسجيل، ممكن نراجعه سوا لو محتاجين."' },
      ]
    },
  ],

  evidence: [
    { id:'empty_cabin', tag:'من مسرح الاختفاء', crit:true, title:'كابينة فاضية من غير أثر', img: IMG_BASE_NILECRUISE + 'cruise-cabin.jpg',
      short:'كابينة منصور فاضية تمامًا وحاجاته موجودة',
      full:'كابينة منصور فاضية تمامًا من غير أي أثر عنف واضح، وحاجاته الشخصية كلها موجودة مكانها، وده بيستبعد فرضية السفر الطوعي.',
      unlocked:true, order:1 },

    { id:'corridor_access_n', tag:'من استجواب كابتن رضا', crit:false, title:'وصول محدود بالكاميرا', img:null,
      short:'كاميرا واحدة بس مش بتغطي كل الممر',
      full:'كابتن رضا أكد إن فيه كاميرا واحدة بس في نص الممر، مش بتغطي كل الحركة بشكل كامل.',
      unlocked:false, order:2 },

    { id:'fady_n_dispute', tag:'من استجواب فادي', crit:true, title:'خلاف مالي كبير', img:null,
      short:'فادي ومنصور في خلاف على قرار مالي كبير',
      full:'فادي اعترف بوجود خلاف كبير مع منصور على قرار مالي، وكان مصمم يقنعه يوافق قبل الرجوع.',
      unlocked:false, order:3 },

    { id:'fady_n_visit', tag:'من استجواب فادي', crit:true, title:'زيارة فادي لكابينة منصور', img:null,
      short:'فادي أكد زيارته لكابينة منصور في الليلة الأخيرة',
      full:'فادي اعترف بزيارته لكابينة منصور في الليلة الأخيرة عشان يكمل نقاش الخلاف المالي.',
      unlocked:false, order:4 },

    { id:'yasmin_n_separate', tag:'من استجواب ياسمين', crit:false, title:'انفصال مؤقت بين الزوجين', img:null,
      short:'ياسمين ومنصور في كابينتين منفصلتين بسبب خلاف',
      full:'ياسمين أكدت وجود خلاف بسيط بينها وبين منصور خلاهم ياخدوا كابينتين منفصلتين في الرحلة.',
      unlocked:false, order:5 },

    { id:'ashraf_n_observation', tag:'من استجواب أشرف', crit:true, title:'فادي طالع من الكابينة بتلعثم', img:null,
      short:'أشرف شاف فادي طالع من كابينة منصور بشكل غريب',
      full:'أشرف أكد إنه شاف فادي طالع من كابينة منصور بشكل مرتبك وغير طبيعي، مختلف عن سلوكه المعتاد.',
      unlocked:false, order:6 },

    { id:'corridor_camera_footage', tag:'من كاميرا الممر', crit:true, title:'تسجيل دخول فادي وخروجه', img: IMG_BASE_NILECRUISE + 'cruise-cam.jpg',
      short:'الكاميرا بتوضح فادي داخل ثم خارج كابينة منصور في وقت الاختفاء',
      full:'كاميرا الممر بتوضح فادي داخل كابينة منصور وطالع منها بعد فترة قصيرة، في نفس التوقيت التقريبي لاختفاء منصور.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  floorPlanPuzzle: {
    enabled: true,
    tabLabel: 'مخطط الطابق',
    introText: 'تتبع مسار الحركة الممكن من كل كابينة لكابينة منصور، وحدد مين كان يقدر يوصلها في نفس توقيت الاختفاء من غير ما يمر على الكاميرا الوحيدة في الممر.',
    resultText: 'المسار بيوضح إن فادي قدر يوصل لكابينة منصور مباشرة من كابينته المجاورة، بعيدًا عن نطاق الكاميرا الوحيدة.',
    rooms: ['كابينة فادي', 'الممر الرئيسي', 'كابينة منصور', 'كابينة ياسمين'],
    suspectPaths: {
      captain_reda_n:          ['الممر الرئيسي'],
      business_associate_fady_n: ['كابينة فادي', 'كابينة منصور'],
      wife_yasmin_n:            ['كابينة ياسمين'],
      crew_member_ashraf_n:     ['الممر الرئيسي'],
    },
    correctSuspectId: 'business_associate_fady_n',
    resultEvidenceIds: ['corridor_camera_footage'],
  },

  evidenceCombinations: [
    { parts:['fady_n_dispute','ashraf_n_observation'], resultId:'corridor_camera_footage' },
  ],

  correctSuspectId: 'business_associate_fady_n',
  conclusiveEvidenceIds: ['fady_n_visit', 'corridor_camera_footage', 'ashraf_n_observation'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن فادي هو الفاعل؟',
        options: [
          { id:'a', text:'كاميرا الممر اللي أثبتت دخوله وخروجه من كابينة منصور + شهادة أشرف عن سلوكه الغريب بعد الزيارة + خلافه المالي الكبير غير المحلول' },
          { id:'b', text:'لأنه شريك عمل وده يكفي كدافع' },
          { id:'c', text:'لأن ياسمين استفادت ماليًا من التأمين' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه اللي حصل فعليًا في كابينة منصور؟',
        options: [
          { id:'a', text:'فادي دخل يحاول يقنع منصور للمرة الأخيرة بالقرار المالي، لكن النقاش اتصعّد لعنف غير مخطط له، وفادي رمى منصور في النيل من نافذة الكابينة استغلالاً لموقع المركب في نص النهر' },
          { id:'b', text:'منصور قفز بنفسه بسبب أزمة نفسية' },
          { id:'c', text:'ياسمين هي اللي دبّرت الاختفاء بالكامل' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'نافذة الكابينة كشفت الجريمة',
      paragraphs:[
        'فادي كان في خلاف مالي كبير مع منصور، ودخل كابينته في الليلة الأخيرة عشان يحاول يقنعه للمرة الأخيرة بالقرار. النقاش اتصعّد بشكل غير متوقع لعنف، واستغل فادي موقع المركب في نص النيل، بعيدًا عن أي شاطئ، عشان يتخلص من منصور من نافذة الكابينة.',
        'كاميرا الممر اللي أثبتت دخول فادي وخروجه من كابينة منصور في نفس توقيت الاختفاء، وشهادة أشرف عن سلوكه الغريب والمرتبك بعد الزيارة، وخلافه المالي الكبير غير المحلول، كلها أدلة حاصرته وكشفت لغز الاختفاء الغامض.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية فادي، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: كاميرا الممر، شهادة أشرف، والخلاف المالي، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ولغز اختفاء منصور فضل بلا حل، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الرحلة النيلية"

   الغلاف (cover.webp):
   "Photorealistic shot of a luxury Nile cruise boat deck at night,
   moonlight reflecting on the river, documentary photography style,
   no text, no watermark, photorealistic"

   المشهد ١ (cruise-scene1.jpg):
   "Photorealistic shot of tourists having dinner on a Nile cruise
   boat deck at night, warm string lights, photorealistic, no text,
   no watermark"

   المشهد ٢ (cruise-scene2.jpg):
   "Photorealistic shot of a man walking down a cruise boat corridor
   toward his cabin at night, dim corridor lighting, photorealistic,
   no text, no watermark"

   المشهد ٣ (cruise-scene3.jpg):
   "Photorealistic shot of an empty cruise cabin with personal
   belongings left behind, morning light through a window,
   photorealistic, no text, no watermark"

   المشهد ٤ (cruise-scene4.jpg):
   "Photorealistic shot of a ship captain reviewing a passenger list
   on a cruise boat deck, daylight, photorealistic, no text, no
   watermark"

   كابتن رضا (reda_n.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male cruise
   boat captain, formal uniform, concerned authoritative expression,
   standing on a boat deck, daylight, candid documentary photography
   style, no text, no watermark, photorealistic"

   فادي (fady_n.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   businessman, smart casual travel outfit, nervous guarded
   expression, standing on a cruise boat deck, daylight, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   ياسمين (yasmin_n.jpg):
   "Photorealistic portrait of a middle-aged Egyptian woman, elegant
   travel outfit, composed worried expression, sitting on a cruise
   boat deck, daylight, candid documentary photography style, no
   text, no watermark, photorealistic"

   أشرف (ashraf_n.jpg):
   "Photorealistic portrait of a young Egyptian male crew member,
   simple boat uniform, watchful attentive expression, standing in a
   boat corridor, dim lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   دليل الكابينة (cruise-cabin.jpg):
   "Photorealistic shot of an empty cruise cabin interior with
   personal belongings on the bed, soft morning light, forensic
   evidence photography style, no text, no watermark, photorealistic"

   دليل الكاميرا (cruise-cam.jpg):
   "Photorealistic security camera style still frame of a man
   entering a cabin door in a dim boat corridor at night, grainy
   surveillance footage look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_NILE_CRUISE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const f=c.suspects.find(s=>s.id==='business_associate_fady_n');
  if(f && !f.questions.some(q=>q.closesInterrogation)) f.questions.push({
    q:'الكاميرا سجلت دخولك وخروجك من كابينة منصور، وأشرف شافك خارج منها متوتر، وإنت معترف بالخلاف المالي. حصل إيه جوه؟',
    requires:['fady_n_visit','corridor_camera_footage','ashraf_n_observation'], closesInterrogation:true,
    a:'(بيسكت طويل) "دخلت أحاول أقنعه للمرة الأخيرة. رفض، واتخانقنا، والمواجهة خرجت عن السيطرة. بعد كده حاولت أخفي اللي حصل مستغل إن المركب في نص النيل."'
  });

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_NILE_CRUISE;
  c.evidenceCombinations = [];
  const f = c.suspects.find(s => s.id === 'business_associate_fady_n');
  if (f) {
    const q = f.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "دخلت كابينته فعلًا عشان نتكلم في الخلاف المالي، واتخانقنا بالكلام. خرجت بعدها لوحدي. الكاميرا وشهادة أشرف تثبت زيارتي، مش مصير منصور بعد ما مشيت."';
    }
  }
  if (c.floorPlanPuzzle) {
    c.floorPlanPuzzle.resultText = 'المخطط يوضح إن فادي كان عنده مسار وصول مناسب لكابينة منصور بعيدًا عن جزء من تغطية الكاميرا. ده يثبت الفرصة، مش الجريمة.';
  }
  c.conclusiveEvidenceIds = ['fady_n_visit','corridor_camera_footage','ashraf_n_observation'];
  c.conclusiveRequired = 3;
})();
