/* ============================================================
   بيانات قضية: الوصفة السرية
   قضية قتل — شيف مشهور بيتسمم بمكوّن من وصفته الخاصة، جوه
   مطبخه الشخصي، وسط استعداده لبرنامج تلفزيوني كبير.
   ============================================================ */

const IMG_BASE_SECRETRECIPE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/secret-recipe/';

const CASE_SECRET_RECIPE = {
  id: 'secret-recipe',
  title: 'الوصفة السرية',
  caseNo: 'CASE 059',
  subtitle: 'مطبخ الشيف الخاص، فيلا فاخرة',
  coverImg: IMG_BASE_SECRETRECIPE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 34,
  investigationPoints: 19,
  teaser: 'شيف مشهور بيتسمم بمكوّن من وصفته السرية بالذات، جوه مطبخه الخاص، ليلة قبل تصوير أهم حلقة في مسيرته المهنية.',

  isPremium: false,
  categories: ['murder', 'food'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_SECRETRECIPE + 'cover.webp',
    heroCaption: 'CASE 059 — ليلة قبل التصوير الكبير',
    text1: 'الشيف المشهور "رامي" كان بيحضّر وصفته السرية الشهيرة استعدادًا لتصوير حلقة كبيرة في برنامج طبخ تلفزيوني. أثناء التذوق الأخير، بدأ يحس بأعراض غريبة، وانهار في مطبخه الخاص.',
    text2: 'الفحص الطبي كشف مادة سامة في مكوّن رئيسي من الوصفة السرية بالذات. زوجته طلبت منك تحقق بسرعة قبل ما البرنامج يتلغى والقضية تتحول لفضيحة إعلامية. عندك تفاصيل الوصفة، وقائمة الأشخاص اللي كان عندهم وصول للمطبخ.',
    meta: [
      { label:'المجني عليه', value:'رامي — شيف مشهور' },
      { label:'مكان الحادثة', value:'مطبخه الخاص في الفيلا' },
      { label:'الدليل المحوري', value:'مكوّن مسمم من الوصفة السرية' },
      { label:'طلب التحقيق', value:'زوجة رامي' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — التحضير',
      img: IMG_BASE_SECRETRECIPE + 'recipe-scene1.jpg',
      text:'رامي بيحضّر وصفته السرية بعناية فائقة في مطبخه الخاص، مكونات مرتبة بدقة على الرخامة.'
    },
    {
      scene:'المشهد ٢ — التذوق الأخير',
      img: IMG_BASE_SECRETRECIPE + 'recipe-scene2.jpg',
      text:'رامي بيتذوق الطبق الأخير قبل التصوير، بيبتسم راضي عن النتيجة، ويستعد للحلقة الكبيرة بكرة.'
    },
    {
      scene:'المشهد ٣ — الانهيار',
      img: IMG_BASE_SECRETRECIPE + 'recipe-scene3.jpg',
      text:'رامي بيبدأ يحس بدوخة شديدة فجأة، وينهار على أرضية المطبخ وسط ذعر زوجته.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_SECRETRECIPE + 'recipe-scene4.jpg',
      text:'زوجة رامي بتديك تفاصيل الوصفة السرية، وقائمة الأشخاص القريبين اللي كان عندهم وصول للمطبخ.'
    },
  ],

  suspects: [
    {
      id:'sous_chef_nabila', name:'نبيلة', role:'مساعدة الشيف الرئيسية', img: IMG_BASE_SECRETRECIPE + 'nabila.jpg', avatarEmoji:'🔪',
      alibi:'قالت إنها كانت بتجهز مكونات تانية في ركن بعيد من المطبخ.',
      questions:[
        { q:'إنتِ عارفة تفاصيل الوصفة السرية دي؟', unlockId:'nabila_recipe_knowledge',
          a:'"جزء منها بس، رامي دايمًا بيحافظ على سرية المكون الأساسي، حتى مني."' },
        { q:'كنتِ قريبة من مكونات الوصفة قبل التذوق؟', requires:['nabila_recipe_knowledge'], unlockId:'nabila_ingredient_access',
          a:'(بتتردد) "مريت جنب الرخامة أجيب أدوات، ده جزء طبيعي من شغلي."' },
      ]
    },
    {
      id:'tv_producer_karim_r', name:'كريم', role:'منتج البرنامج التلفزيوني', img: IMG_BASE_SECRETRECIPE + 'karim_r.jpg', avatarEmoji:'📺',
      alibi:'قال إنه كان في مكتبه بره الفيلا يراجع تفاصيل التصوير.',
      questions:[
        { q:'الحلقة دي كانت مهمة إزاي للبرنامج؟', unlockId:'karim_r_stakes',
          a:'"كانت هتحدد تجديد العقد مع القناة، ضغط كبير جدًا على الجميع."' },
        { q:'كان عندك خلاف مع رامي على تفاصيل الحلقة؟', requires:['karim_r_stakes'], unlockId:'karim_r_dispute',
          a:'(بيتردد) "كان بيرفض بعض التعديلات اللي طلبتها القناة، ده خلق توتر بينا."' },
      ]
    },
    {
      id:'rival_chef_mona_r', name:'منى', role:'شيف منافسة، كانت مرشحة لنفس البرنامج', img: IMG_BASE_SECRETRECIPE + 'mona_r.jpg', avatarEmoji:'👩‍🍳',
      alibi:'قالت إنها ماكانتش قريبة من فيلا رامي خالص.',
      questions:[
        { q:'علاقتك برامي في المجال كانت إيه؟', unlockId:'mona_r_rivalry',
          a:'"كنا منافسين على نفس البرنامج، القناة فضّلته في اللحظة الأخيرة، طبعًا ده أثر فيا."' },
        { q:'شاهد أكد إنك كنتِ قريبة من الفيلا، مش بعيدة زي ما قلتِ — عايزة تفسري؟', requires:['mona_r_rivalry','karim_r_dispute','nabila_ingredient_access'], closesInterrogation:true,
          a:'(بتصمت طويل) "جيت أشوف المطبخ بس، كنت فضولية أعرف سر الوصفة اللي خلته يفوز بالمركز عليا. حطيت كمية زيادة من مكون كنت فاكراه هيغير الطعم بس مش هيضره، وماكنتش متخيلة إن الكمية دي خطيرة."' },
      ]
    },
  ],

  evidence: [
    { id:'poisoned_ingredient', tag:'من التحليل الطبي', crit:true, title:'مكوّن مسمم في الوصفة', img: IMG_BASE_SECRETRECIPE + 'recipe-ingredient.jpg',
      short:'مادة سامة موجودة في مكوّن رئيسي من الوصفة السرية',
      full:'التحليل الطبي كشف مادة سامة موجودة في مكوّن رئيسي من الوصفة السرية، بتركيز أعلى بكتير من أي إضافة طبخ عادية.',
      unlocked:true, order:1 },

    { id:'nabila_recipe_knowledge', tag:'من استجواب نبيلة', crit:false, title:'معرفة نبيلة الجزئية بالوصفة', img:null,
      short:'نبيلة عارفة جزء من الوصفة بس مش المكون السري بالكامل',
      full:'نبيلة أكدت إن معرفتها بالوصفة جزئية، وإن رامي بيحافظ على سرية المكون الأساسي حتى منها.',
      unlocked:false, order:2 },

    { id:'nabila_ingredient_access', tag:'من استجواب نبيلة', crit:false, title:'وصول نبيلة للمكونات', img:null,
      short:'نبيلة كانت قريبة من الرخامة كجزء من شغلها',
      full:'نبيلة أكدت إنها كانت قريبة من رخامة المكونات كجزء طبيعي من شغلها كمساعدة.',
      unlocked:false, order:3 },

    { id:'karim_r_stakes', tag:'من استجواب كريم', crit:false, title:'أهمية الحلقة للبرنامج', img:null,
      short:'الحلقة كانت هتحدد تجديد عقد رامي مع القناة',
      full:'كريم أكد إن الحلقة كانت هتحدد تجديد عقد رامي مع القناة، وده كان ضغط كبير على الجميع.',
      unlocked:false, order:4 },

    { id:'karim_r_dispute', tag:'من استجواب كريم', crit:false, title:'خلاف كريم ورامي', img:null,
      short:'خلاف بسيط على تعديلات الحلقة بين كريم ورامي',
      full:'كريم اعترف بوجود خلاف بسيط مع رامي على تعديلات طلبتها القناة للحلقة.',
      unlocked:false, order:5 },

    { id:'mona_r_rivalry', tag:'من استجواب منى', crit:true, title:'منافسة منى ورامي', img:null,
      short:'منى ورامي كانوا منافسين على نفس البرنامج',
      full:'منى اعترفت بمنافستها القوية مع رامي على نفس فرصة البرنامج، وإن القناة فضّلته عليها في اللحظة الأخيرة.',
      unlocked:false, order:6 },

    { id:'witness_mona_r_seen', tag:'من شهادة جار الفيلا', crit:true, title:'منى شوهدت قريب من الفيلا', img: IMG_BASE_SECRETRECIPE + 'recipe-witness.jpg',
      short:'جار الفيلا أكد رؤية منى قريبة من المطبخ قبل الحادثة',
      full:'جار الفيلا أكد إنه شاف منى قريبة من نافذة المطبخ قبل الحادثة بوقت قصير، رغم إنها ادّعت إنها ماكانتش قريبة من الفيلا خالص.',
      unlocked:false, order:7 },
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
    tabLabel: 'تحليل أثر المادة',
    introText: 'قارن التركيب الكيميائي للمادة الموجودة في المكوّن المسمم مع عينات موجودة في حوزة كل مشتبه فيه، ودوّر على التطابق.',
    resultText: 'التركيب الكيميائي بيتطابق مع مادة موجودة في حقيبة منى الشخصية، شيف منافسة لرامي.',
    sampleSequence: ['C', 'H', 'E', 'F', 'X'],
    suspectSequences: {
      sous_chef_nabila:  ['C', 'H', 'E', 'F', 'Y'],
      tv_producer_karim_r:['P', 'R', 'O', 'D', 'X'],
      rival_chef_mona_r: ['C', 'H', 'E', 'F', 'X'],
    },
    correctSuspectId: 'rival_chef_mona_r',
    resultEvidenceIds: ['witness_mona_r_seen'],
  },

  evidenceCombinations: [
    { parts:['mona_r_rivalry','karim_r_dispute'], resultId:'witness_mona_r_seen' },
  ],

  correctSuspectId: 'rival_chef_mona_r',
  conclusiveEvidenceIds: ['mona_r_rivalry', 'witness_mona_r_seen', 'poisoned_ingredient'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن منى هي الفاعلة؟',
        options: [
          { id:'a', text:'التركيب الكيميائي المتطابق مع مادة في حقيبتها + شهادة جار الفيلا اللي كذّبت حجة غيابها + منافستها القوية الموثقة مع رامي على نفس البرنامج' },
          { id:'b', text:'لأنها شيف منافسة وده يكفي كدافع' },
          { id:'c', text:'لأن نبيلة كانت أقرب واحدة للمكونات' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية منى الحقيقية؟',
        options: [
          { id:'a', text:'ماكانتش ناوية تسممه؛ كانت فضولية تعرف سر الوصفة اللي خلاه يفوز عليها، وأضافت كمية من مكون فاكراه هيغير الطعم بس مش هيضره، لكنها كانت أخطر بكتير مما توقعت' },
          { id:'b', text:'كانت ناوية تسممه من البداية عشان تاخد مكانه في البرنامج' },
          { id:'c', text:'كانت بتحاول تساعده يحسن الوصفة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الوصفة اللي كشفت الفضول القاتل',
      paragraphs:[
        'منى كانت في منافسة قوية مع رامي على نفس فرصة البرنامج التلفزيوني، وكانت فضولية جدًا تعرف سر الوصفة اللي خلاه يفوز عليها في اللحظة الأخيرة. دخلت المطبخ سرًا وأضافت كمية من مكون معين كانت فاكراه هيغير الطعم بس مش هيضره، لكنه طلع أخطر بكتير مما توقعت.',
        'التركيب الكيميائي المتطابق مع مادة موجودة في حقيبتها الشخصية، وشهادة جار الفيلا اللي كذّبت حجة غيابها التام، ومنافستها القوية الموثقة مع رامي على نفس البرنامج، كلها أدلة حاصرتها وكشفت الحقيقة وراء تسمم الوصفة السرية.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية منى، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: التطابق الكيميائي، شهادة الجار، والمنافسة القوية، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسمعة الوصفة السرية فضلت ملطخة بتهمة مالهاش أساس، والفاعلة الحقيقية فضلت طليقة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الوصفة السرية"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant private kitchen with organized
   ingredients on a marble counter, warm kitchen lighting,
   documentary photography style, no text, no watermark,
   photorealistic"

   المشهد ١ (recipe-scene1.jpg):
   "Photorealistic shot of a chef carefully preparing ingredients on
   a marble kitchen counter, warm kitchen lighting, photorealistic,
   no text, no watermark"

   المشهد ٢ (recipe-scene2.jpg):
   "Photorealistic shot of a chef tasting a dish with a satisfied
   expression in a private kitchen, warm kitchen lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (recipe-scene3.jpg):
   "Photorealistic dramatic shot of a man collapsed on a kitchen
   floor, scattered cooking utensils nearby, warm kitchen lighting,
   photorealistic, no text, no watermark"

   المشهد ٤ (recipe-scene4.jpg):
   "Photorealistic shot of a woman handing recipe notes to an
   investigator in a kitchen, warm kitchen lighting, photorealistic,
   no text, no watermark"

   نبيلة (nabila.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female sous
   chef, white chef uniform, focused nervous expression, standing in
   a kitchen, warm kitchen lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   كريم (karim_r.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male TV
   producer, smart business casual outfit, calculating concerned
   expression, standing in an office, formal lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   منى (mona_r.jpg):
   "Photorealistic portrait of a middle-aged Egyptian female chef,
   white chef uniform, guarded competitive expression, standing in
   a professional kitchen, warm kitchen lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل المكوّن (recipe-ingredient.jpg):
   "Photorealistic close-up of a small jar of spice or ingredient on
   a marble kitchen counter, forensic evidence photography style, no
   text, no watermark, photorealistic"

   دليل الشاهد (recipe-witness.jpg):
   "Photorealistic shot of a neighbor peeking through a garden hedge
   toward a kitchen window, natural daylight, documentary photography
   style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_SECRET_RECIPE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'mona_r_chemical_match', tag:'من تحليل المادة', crit:true, title:'المادة اتطابقت مع اللي في حقيبة منى', img:null,
    short:'التركيب الكيميائي للمادة الملوثة مطابق لعينة في حقيبة منى',
    full:'التحليل أثبت إن التركيب الكيميائي للمادة الموجودة في المكوّن الملوّث مطابق لعينة موجودة في حقيبة منى الشخصية.', unlocked:false, order:90 });
  c.dnaLabPuzzle.resultEvidenceIds = ['mona_r_chemical_match'];
  c.conclusiveEvidenceIds = ['mona_r_rivalry','witness_mona_r_seen','mona_r_chemical_match'];
  const m=c.suspects.find(s=>s.id==='rival_chef_mona_r'); if(m){const q=m.questions.find(q=>q.closesInterrogation); if(q) q.requires=['mona_r_rivalry','witness_mona_r_seen','mona_r_chemical_match'];}
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: المنافسة، شهادة الجار، والتطابق الكيميائي مع عينة منى، قبل ما تتهم.';

})();

(() => {
  const s = CASE_SECRET_RECIPE.suspects.find(x => x.id === 'rival_chef_mona_r');
  if (s && !s.questions.some(x => x.q === 'دخلتي فيلا رامي أو مطبخه في الأسبوع اللي قبل التصوير؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'دخلتي فيلا رامي أو مطبخه في الأسبوع اللي قبل التصوير؟', requires:['mona_r_rivalry'], a:'"لأ، ماكانش عندي سبب أروح هناك. كل تحضيري كان في مطبخي أنا."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_SECRET_RECIPE;
  const ev = id => c.evidence.find(e => e.id === id);
  if (!ev('mona_chemical_match')) {
    c.evidence.push({
      id:'mona_chemical_match', tag:'من التحليل الكيميائي', crit:true,
      title:'تطابق المادة مع عينة في حقيبة منى', img:null,
      short:'المادة الموجودة مع منى مطابقة للمادة في المكوّن المسمم',
      full:'التحليل الكيميائي أثبت تطابق تركيب المادة الموجودة في حقيبة منى مع المادة الموجودة في المكوّن المسمم. التطابق يربطها بالمادة نفسها لكنه لا يثبت وحده لحظة وضعها في الوصفة.',
      unlocked:false, order:90
    });
  }
  if (c.dnaLabPuzzle) {
    c.dnaLabPuzzle.resultText = 'التحليل يثبت تطابق المادة الموجودة في حقيبة منى مع المادة الموجودة في المكوّن المسمم. ده دليل مادي مستقل، مش شهادة شاهد.';
    c.dnaLabPuzzle.resultEvidenceIds = ['mona_chemical_match'];
  }
  c.evidenceCombinations = [];
  const m = c.suspects.find(s => s.id === 'rival_chef_mona_r');
  if (m) {
    if (!m.questions.some(q => q.unlockId === 'witness_mona_r_seen')) {
      m.questions.push({
        q:'في شاهد من المنطقة قال إنه شافك قريبة من الفيلا الليلة دي، مع إنك قلتي إنك بعيدة تمامًا. تفسري؟',
        requires:['mona_r_rivalry'],
        unlockId:'witness_mona_r_seen',
        a:'(بتتوتر) "عديت من الشارع فعلًا، لكن ما دخلتش المطبخ. كنت فضولية أشوف تجهيزات التصوير مش أكتر."'
      });
    }
    const q = m.questions.find(q => q.closesInterrogation);
    if (q) {
      q.q = 'المادة في حقيبتك مطابقة للمادة المسممة، وشاهد حطك قرب الفيلا. عندك تفسير قبل الاتهام؟';
      q.requires = ['mona_r_rivalry','witness_mona_r_seen','mona_chemical_match'];
      q.a = '(بتسكت شوية) "المادة موجودة عندي فعلًا لأني بستخدمها في تجارب وصفات، ووجودي قرب الفيلا كان فضول. الربط بينهم محتاج أكتر من مجرد ظن."';
    }
  }
  c.conclusiveEvidenceIds = ['poisoned_ingredient','mona_r_rivalry','witness_mona_r_seen','mona_chemical_match'];
  c.conclusiveRequired = 4;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_SECRET_RECIPE;
  // إزالة نسخة قديمة مكررة من نفس نتيجة التحليل الكيميائي؛ النسخة الجديدة هي المعتمدة.
  c.evidence = c.evidence.filter(e=>e.id!=='mona_r_chemical_match');
  c.conclusiveEvidenceIds = (c.conclusiveEvidenceIds||[]).map(id=>id==='mona_r_chemical_match'?'mona_chemical_match':id);
  const m = c.suspects.find(s=>s.id==='rival_chef_mona_r');
  if(m) (m.questions||[]).forEach(q=>{ if(q.requires) q.requires=q.requires.map(id=>id==='mona_r_chemical_match'?'mona_chemical_match':id); });
})();
