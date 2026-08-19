/* ============================================================
   بيانات قضية: تطبيق التعارف
   قضية اختفاء (محتوى للبالغين) — فتاة بتختفي بعد أول لقاء
   شخصي مع حد قابلته على تطبيق تعارف أونلاين.
   ============================================================ */

const IMG_BASE_DATINGAPP = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/dating-app/';

const CASE_DATING_APP = {
  id: 'dating-app',
  title: 'تطبيق التعارف',
  caseNo: 'CASE 038',
  subtitle: 'مقهى وسط البلد، ثم شقة مجهولة',
  coverImg: IMG_BASE_DATINGAPP + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 33,
  investigationPoints: 19,
  teaser: 'فتاة بتروح أول لقاء شخصي مع حد قابلته على تطبيق تعارف، وبعدها بتختفي تمامًا. المحادثات القديمة على التطبيق هي المفتاح لمعرفة مين قابلته فعلاً.',

  isPremium: false,
  categories: ['disappearance', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  contentWarning: 'القضية دي فيها إشارات لموضوعات تعارف أونلاين وعلاقات بالغين، من غير أي محتوى صريح، ومناسبة لجمهور بالغ.',

  briefing: {
    heroImg: IMG_BASE_DATINGAPP + 'cover.webp',
    heroCaption: 'CASE 038 — بعد أول لقاء بساعات',
    text1: 'الفتاة "مايا" كانت بتستخدم تطبيق تعارف من فترة، وقابلت حد جديد أونلاين وحددوا أول لقاء شخصي في مقهى وسط البلد. بعد اللقاء، مايا اختفت تمامًا ومحدش قدر يوصلها.',
    text2: 'صديقتها المقربة طلبت منك تحقق قبل ما الأهل يعرفوا التفاصيل الكاملة عن طريقة تعارفها بالراجل ده. عندك محادثات مايا على التطبيق، وقائمة الناس القريبين منها في الفترة الأخيرة.',
    meta: [
      { label:'الضحية', value:'مايا — تعرفت على شخص عبر تطبيق تعارف' },
      { label:'آخر مكان معروف', value:'مقهى وسط البلد بعد اللقاء' },
      { label:'الدليل المحوري', value:'محادثات التطبيق مع حساب مجهول' },
      { label:'طلب التحقيق', value:'صديقة مايا المقربة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — المحادثات',
      img: IMG_BASE_DATINGAPP + 'dating-scene1.jpg',
      text:'مايا بتتبادل رسائل ودية مع حساب جديد على تطبيق التعارف، بيتفقوا على أول لقاء شخصي في مقهى هادي.'
    },
    {
      scene:'المشهد ٢ — اللقاء',
      img: IMG_BASE_DATINGAPP + 'dating-scene2.jpg',
      text:'مايا قاعدة في المقهى، بتستنى الشخص اللي هتقابله لأول مرة، متحمسة وقلقانة في نفس الوقت.'
    },
    {
      scene:'المشهد ٣ — الاختفاء',
      img: IMG_BASE_DATINGAPP + 'dating-scene3.jpg',
      text:'آخر رسالة من مايا لصديقتها كانت "هو لطيف جدًا، هكلمك بعدين"، وبعدها اختفت تمامًا.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_DATINGAPP + 'dating-scene4.jpg',
      text:'صديقتها بتديك موبايل مايا فيه محادثات التطبيق، وقائمة أصدقائها المقربين.'
    },
  ],

  suspects: [
    {
      id:'friend_nada', name:'ندى', role:'صديقة مايا المقربة، طلبت التحقيق', img: IMG_BASE_DATINGAPP + 'nada.jpg', avatarEmoji:'📱',
      accusable:false,
      alibi:'مش متهمة، هي اللي طلبت التحقيق أصلًا.',
      questions:[
        { q:'مايا كانت قالتلك حاجة عن الشخص ده قبل اللقاء؟',
          a:'"قالتلي اسمه بس على التطبيق، مش اسمه الحقيقي، وإنه شكله محترم من الصور."' },
        { q:'حد تاني كان عارف بموعد اللقاء ده؟', unlockId:'meeting_leak',
          a:'"أنا بس اللي كنت عارفة بالتفصيل، بس مايا كانت بتحكي لزميلها في الشغل عن حياتها الشخصية كتير."' },
      ]
    },
    {
      id:'dating_match_ali', name:'الحساب المجهول (علي)', role:'الشخص اللي قابلته مايا من التطبيق', img: IMG_BASE_DATINGAPP + 'ali.jpg', avatarEmoji:'💬',
      alibi:'قال إنه قابلها في المقهى وبعدين مشى لحاله وسابها هي كويسة.',
      questions:[
        { q:'اللقاء عدى إزاي بينكم؟', unlockId:'ali_account',
          a:'"كان لقاء عادي، اتكلمنا شوية، وبعدين هي قالت هتمشي، وأنا مشيت في اتجاه تاني."' },
        { q:'صورة بروفايلك على التطبيق كانت حقيقية؟', unlockId:'ali_fake_profile',
          a:'(بيتردد) "الصور كانت لشخص تاني، أنا مش زي ما ظاهر في البروفايل، بس ده عادي في التطبيقات دي."' },
      ]
    },
    {
      id:'coworker_hazem_d', name:'حازم', role:'زميل مايا في الشغل', img: IMG_BASE_DATINGAPP + 'hazem_d.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في بيته طول الوقت بعد الشغل.',
      questions:[
        { q:'علاقتك بمايا كانت إيه في الشغل؟', unlockId:'hazem_d_obsession',
          a:'"كنا مقربين، بتحكيلي عن حياتها كتير. صراحة كنت بحس بحاجة أكتر من الصداقة تجاهها."' },
        { q:'كنت عارف بموضوع اللقاء ده؟', requires:['hazem_d_obsession'], unlockId:'hazem_d_knew',
          a:'(بيتردد) "أيوه، قالتلي بحماس عن الشخص الجديد ده، وصراحة ده أزعجني."' },
      ]
    },
    {
      id:'cafe_owner_farouk', name:'فاروق', role:'صاحب المقهى اللي حصل فيه اللقاء', img: IMG_BASE_DATINGAPP + 'farouk.jpg', avatarEmoji:'☕',
      alibi:'قال إنه كان بيدير المقهى طول الوقت زي أي يوم عادي.',
      questions:[
        { q:'لاحظت أي حاجة غريبة في المقهى وقت اللقاء ده؟', unlockId:'farouk_observation',
          a:'"شفت اتنين قاعدين لفترة قصيرة، وبعدين البنت خرجت لوحدها فعلاً، الشاب فضل قاعد كام دقيقة زيادة."' },
        { q:'كاميرا المقهى سجلت حد بيتابع مايا بعد خروجها؟', requires:['farouk_observation'], unlockId:'cafe_camera_followup',
          a:'"عندي كاميرا برة المقهى، ممكن تراجعوها لو محتاجين."' },
      ]
    },
  ],

  evidence: [
    { id:'app_conversation', tag:'من موبايل مايا', crit:true, title:'محادثات التطبيق', img: IMG_BASE_DATINGAPP + 'dating-chat.jpg',
      short:'محادثات ودية بين مايا وحساب مجهول قبل اللقاء',
      full:'المحادثات على التطبيق بتوضح ترتيب اللقاء بين مايا وحساب باسم مستعار "علي"، من غير أي معلومات حقيقية تانية عنه.',
      unlocked:true, order:1 },

    { id:'meeting_leak', tag:'من استجواب ندى', crit:false, title:'من كان عارف بالموعد', img:null,
      short:'حازم كان عارف بتفاصيل اللقاء من مايا نفسها',
      full:'ندى أكدت إن مايا كانت بتحكي لزميلها حازم عن حياتها الشخصية بشكل مستمر، فمن المرجح إنه كان عارف بتفاصيل اللقاء.',
      unlocked:false, order:2 },

    { id:'ali_account', tag:'من استجواب علي', crit:false, title:'رواية علي عن اللقاء', img:null,
      short:'علي بيقول إن اللقاء كان عادي وانتهى بسلام',
      full:'الشخص اللي قابلته مايا أكد إن اللقاء كان عادي وقصير، وإنها مشيت لوحدها بعده بأمان حسب روايته.',
      unlocked:false, order:3 },

    { id:'ali_fake_profile', tag:'من استجواب علي', crit:true, title:'بروفايل مزيف', img:null,
      short:'صور بروفايل علي على التطبيق مش حقيقية',
      full:'علي اعترف إن الصور اللي استخدمها في بروفايله على التطبيق مش له شخصيًا، وده بيفتح احتمال إخفاء هويته الحقيقية.',
      unlocked:false, order:4 },

    { id:'hazem_d_obsession', tag:'من استجواب حازم', crit:false, title:'مشاعر حازم تجاه مايا', img:null,
      short:'حازم اعترف بمشاعر أعمق من الصداقة تجاه مايا',
      full:'حازم اعترف إنه كان بيحس بمشاعر أعمق من مجرد الصداقة تجاه مايا، وده كان مصدر توتر داخلي عنده.',
      unlocked:false, order:5 },

    { id:'hazem_d_knew', tag:'من استجواب حازم', crit:false, title:'حازم كان عارف بالموعد', img:null,
      short:'حازم اعترف إن معرفته باللقاء أزعجته',
      full:'حازم اعترف إن معرفته بلقاء مايا الجديد أزعجه بشكل واضح، لكنه نفى أي تورط مباشر في اختفائها.',
      unlocked:false, order:6 },

    { id:'farouk_observation', tag:'من استجواب فاروق', crit:true, title:'ملاحظة صاحب المقهى', img:null,
      short:'مايا خرجت لوحدها، والشاب فضل قاعد كام دقيقة زيادة',
      full:'فاروق أكد إن مايا خرجت من المقهى لوحدها فعلاً، لكن الشخص اللي كانت بتقابله فضل قاعد كام دقيقة زيادة قبل ما يخرج وراها في نفس الاتجاه تقريبًا.',
      unlocked:false, order:7 },

    { id:'cafe_camera_followup', tag:'من كاميرا المقهى', crit:true, title:'تتبع بعد الخروج', img: IMG_BASE_DATINGAPP + 'dating-cam.jpg',
      short:'كاميرا خارجية للمقهى بتوضح شخص بيتابع مايا بعد خروجها',
      full:'كاميرا خارج المقهى بتوضح رجل بيمشي ورا مايا على بعد مسافة بعد خروجها مباشرة، بشكل يوحي بالتتبع المتعمد.',
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
  polygraphPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم جديد: witnessReliabilityPuzzle
     اللاعب بيقيّم شهادات متضاربة من شهود مختلفين عن نفس الحدث،
     ويوزن مصداقية كل شهادة بناءً على تفاصيلها ووضوحها، عشان
     يوصل لأقرب رواية للحقيقة.
     ============================================================ */
  witnessReliabilityPuzzle: {
    enabled: true,
    tabLabel: 'تقييم الشهادات',
    introText: 'قارن رواية فاروق (صاحب المقهى) برواية علي عن نفس اللحظة، وقيّم مين شهادته أقرب للحقيقة بناءً على وضوح التفاصيل وتناسقها.',
    resultText: 'رواية فاروق أكثر تفصيلاً، وفيها تعارض واضح مع كلام علي عن اتجاه خروجه. النتيجة تبرر مراجعة الكاميرا، لكنها مش إدانة نهائية.',
    testimonies: [
      { suspectId:'dating_match_ali', text:'"مشيت في اتجاه تاني بعد ما مايا خرجت."', reliabilityScore: 25 },
      { suspectId:'cafe_owner_farouk', text:'"الشاب فضل قاعد كام دقيقة زيادة قبل ما يخرج ورا مايا في نفس الاتجاه."', reliabilityScore: 85 },
    ],
    correctSuspectId: 'dating_match_ali',
    resultEvidenceIds: ['cafe_camera_followup'],
  },

  evidenceCombinations: [
    { parts:['ali_fake_profile','farouk_observation'], resultId:'farouk_observation' },
  ],

  correctSuspectId: 'dating_match_ali',
  conclusiveEvidenceIds: ['ali_fake_profile', 'farouk_observation', 'cafe_camera_followup'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن علي هو الفاعل؟',
        options: [
          { id:'a', text:'بروفايله المزيف اللي أخفى هويته الحقيقية + ملاحظة صاحب المقهى إنه فضل ورا مايا بعد خروجها + كاميرا المقهى اللي أثبتت تتبعه ليها' },
          { id:'b', text:'لأنه الشخص اللي قابلته من التطبيق وده يكفي' },
          { id:'c', text:'لأن حازم كان بيحبها وده أوضح دافع' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت حقيقة "علي"؟',
        options: [
          { id:'a', text:'كان مستخدم بروفايل مزيف بالكامل عشان يقابل فتيات مختلفات، وتابع مايا بعد اللقاء لما حس إنها هتكتشف حقيقته الزائفة' },
          { id:'b', text:'كان صديق قديم لمايا بيتنكر عمدًا' },
          { id:'c', text:'كان بيحاول يحميها من خطر تاني' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — RESCUE', title:'كاميرا خارج المقهى كشفت التتبع',
      paragraphs:[
        'الشخص اللي عرف نفسه بـ"علي" كان بيستخدم بروفايل مزيف بالكامل عشان يقابل فتيات مختلفات من غير ما يكشف هويته الحقيقية. لما مايا بدأت تسأل أسئلة دقيقة أثناء اللقاء عن حياته الحقيقية، حس إنها هتكتشف الخداع، فقرر يتبعها بعد خروجها من المقهى.',
        'اعترافه بالبروفايل المزيف، وملاحظة صاحب المقهى الدقيقة إنه فضل قاعد كام دقيقة زيادة قبل ما يخرج ورا مايا، وكاميرا المقهى الخارجية اللي أثبتت تتبعه ليها بشكل مباشر، كلها أدلة حاصرته وأدت لإنقاذها.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية علي، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: البروفايل المزيف، ملاحظة صاحب المقهى، وكاميرا التتبع، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ومايا فضلت في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "تطبيق التعارف"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty cafe table with two coffee cups,
   one abandoned, soft warm cafe lighting, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (dating-scene1.jpg):
   "Photorealistic close-up of a woman smiling while texting on her
   phone at home, soft evening lighting, photorealistic, no text,
   no watermark"

   المشهد ٢ (dating-scene2.jpg):
   "Photorealistic shot of a young woman sitting alone at a cafe
   table waiting, checking her phone, warm cafe window lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (dating-scene3.jpg):
   "Photorealistic shot of an empty cafe table with an unfinished
   coffee cup, warm dim lighting, quiet unsettling atmosphere,
   photorealistic, no text, no watermark"

   المشهد ٤ (dating-scene4.jpg):
   "Photorealistic shot of a worried woman handing a phone to an
   investigator in a living room, soft indoor lighting,
   photorealistic, no text, no watermark"

   ندى (nada.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual
   outfit, worried concerned expression, sitting in a living room,
   soft natural lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   علي (ali.jpg):
   "Photorealistic portrait of a young Egyptian man, casual smart
   outfit, guarded evasive expression, sitting at a cafe table,
   warm cafe lighting, candid documentary photography style, no
   text, no watermark, photorealistic"

   حازم (hazem_d.jpg):
   "Photorealistic portrait of a young Egyptian man, office casual
   outfit, uncomfortable conflicted expression, standing in an
   office space, fluorescent office lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   فاروق (farouk.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male cafe
   owner, simple apron over casual clothes, attentive friendly
   expression, standing behind a cafe counter, warm cafe lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل المحادثات (dating-chat.jpg):
   "Photorealistic close-up of a smartphone screen showing a dating
   app chat conversation, soft phone glow lighting, no text, no
   watermark, photorealistic"

   دليل الكاميرا (dating-cam.jpg):
   "Photorealistic security camera style still frame of a street
   outside a cafe at dusk with two distant figures walking in the
   same direction, grainy surveillance footage look, no text, no
   watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_DATING_APP;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const ali = c.suspects.find(s => s.id === 'dating_match_ali');
  if (ali && !ali.questions.some(q => q.closesInterrogation)) ali.questions.push({
    q:'إنت قلت إنك مشيت في اتجاه تاني، لكن شهادة فاروق والكاميرا بيأكدوا إنك خرجت ورا مايا. ليه كدبت؟',
    requires:['ali_fake_profile','farouk_observation','cafe_camera_followup'], closesInterrogation:true,
    a:'(بيتردد قبل ما يسكت) "أيوه خرجت بعدها بدقايق، بس ده مش معناه إني أذيتها. كنت عايز ألحقها وأشرح موضوع البروفايل قبل ما تحكي لحد. بعد كده كل واحد راح لحاله."'
  });
  c.teaser = 'مايا خرجت لأول مقابلة مع شخص عرفته من تطبيق تعارف، وبعدها اختفت. المشكلة إن الشخص اللي قابلته مش هو الشخص اللي كانت شايفاه على الشاشة.';

})();
