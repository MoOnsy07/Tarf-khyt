/* ============================================================
   بيانات قضية: الوش التاني
   قضية اختفاء رقمية — ممثلة بتكتشف إن حد بينتحل شخصيتها على
   السوشيال ميديا، وبعد ما تواجه الموضوع علنًا بتختفي.
   ============================================================ */

const IMG_BASE_SECONDFACE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/second-face/';

const CASE_SECOND_FACE = {
  id: 'second-face',
  title: 'الوش التاني',
  caseNo: 'CASE 056',
  subtitle: 'شقة الممثلة، القاهرة',
  coverImg: IMG_BASE_SECONDFACE + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 37,
  investigationPoints: 20,
  teaser: 'ممثلة صاعدة بتكتشف حساب مزيف بينتحل شخصيتها بالكامل باستخدام صور مولّدة بالذكاء الاصطناعي، وبعد ما تفضح الموضوع علنًا، بتختفي فجأة.',

  isPremium: false,
  categories: ['disappearance', 'digital'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_SECONDFACE + 'cover.webp',
    heroCaption: 'CASE 056 — بعد الفضح العلني بيوم',
    text1: 'الممثلة الصاعدة "جنى" اكتشفت حساب مزيف على السوشيال ميديا بينتحل شخصيتها بالكامل، باستخدام صور مولّدة بالذكاء الاصطناعي وبيتواصل مع متابعينها بشكل مضلل. جنى فضحت الحساب ده علنًا في فيديو منتشر، وبعد يوم واحد بس اختفت تمامًا.',
    text2: 'مديرة أعمالها طلبت منك تحقق بسرعة قبل ما القضية تتصاعد إعلاميًا. عندك تفاصيل الحساب المزيف، وقائمة الأشخاص المقربين من جنى اللي ممكن يكونوا وراء الموضوع.',
    meta: [
      { label:'الضحية', value:'جنى — ممثلة صاعدة' },
      { label:'الاكتشاف', value:'حساب مزيف بينتحل شخصيتها بالذكاء الاصطناعي' },
      { label:'آخر مكان معروف', value:'شقتها الشخصية بعد الفيديو الفاضح' },
      { label:'طلب التحقيق', value:'مديرة أعمال جنى' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الاكتشاف',
      img: IMG_BASE_SECONDFACE + 'face-scene1.jpg',
      text:'جنى بتلاقي حساب مزيف بيستخدم صور شبيهة بيها جدًا، بيتفاعل مع متابعينها بشكل غريب ومضلل.'
    },
    {
      scene:'المشهد ٢ — الفضح العلني',
      img: IMG_BASE_SECONDFACE + 'face-scene2.jpg',
      text:'جنى بتسجل فيديو تفضح فيه الحساب المزيف علنًا، الفيديو بينتشر بسرعة كبيرة وسط ردود فعل متباينة.'
    },
    {
      scene:'المشهد ٣ — الاختفاء',
      img: IMG_BASE_SECONDFACE + 'face-scene3.jpg',
      text:'بعد يوم واحد من الفيديو، جنى بتختفي من شقتها، موبايلها موجود مكانه لكنها مش موجودة.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_SECONDFACE + 'face-scene4.jpg',
      text:'مديرة أعمالها بتديك تفاصيل الحساب المزيف، وقائمة الأشخاص المقربين من جنى.'
    },
  ],

  suspects: [
    {
      id:'ex_assistant_rana_f', name:'رنا', role:'مساعدة سابقة لجنى، اتفصلت قبل شهرين', img: IMG_BASE_SECONDFACE + 'rana_f.jpg', avatarEmoji:'📲',
      alibi:'قالت إنها كانت في بيتها بعيد عن أي علاقة بالموضوع.',
      questions:[
        { q:'ليه اتفصلتِ من شغلك مع جنى؟', unlockId:'rana_f_firing',
          a:'"فصلتني بسبب سوء فهم، حسيت بظلم كبير في الطريقة اللي اتعاملت بيها معايا."' },
        { q:'كنتِ عارفة تفاصيل حساباتها الشخصية وصورها؟', requires:['rana_f_firing'], unlockId:'rana_f_access',
          a:'(بتتردد) "كان عندي وصول كامل لأرشيف صورها وقت شغلي معاها، بس مسحت كل حاجة لما اتفصلت."' },
      ]
    },
    {
      id:'obsessed_fan_khaled_f', name:'خالد', role:'معجب متطرف بجنى', img: IMG_BASE_SECONDFACE + 'khaled_f.jpg', avatarEmoji:'❤️',
      alibi:'قال إنه كان في بيته زي أي يوم عادي.',
      questions:[
        { q:'علاقتك بمتابعة جنى كانت إيه؟', unlockId:'khaled_f_obsession',
          a:'"بتابعها من زمان، بحس إنها بتفهمني أكتر من أي حد تاني في حياتي."' },
        { q:'إنت كنت بتستخدم الحساب المزيف بنفسك؟', requires:['khaled_f_obsession'], unlockId:'khaled_f_dm_contact',
          a:'(بيتردد) "أيوه، كنت بدخل عليه وأستخدمه عشان أحس إني قريب من عالمها. عارف إن ده تعدّي للحدود."' },
      ]
    },
    {
      id:'ai_developer_sherif_f', name:'شريف', role:'مطور تقني، مسؤول عن صور الذكاء الاصطناعي', img: IMG_BASE_SECONDFACE + 'sherif_f.jpg', avatarEmoji:'🤖',
      alibi:'قال إنه كان في شغله طول الوقت، بعيد تمامًا عن أي علاقة بجنى شخصيًا.',
      questions:[
        { q:'إنت المسؤول عن إنشاء الصور المزيفة دي؟', unlockId:'sherif_f_creation',
          a:'(بيتردد) "أيوه، حد طلب مني الخدمة دي مقابل مبلغ، ما سألتش كتير عن الأسباب."' },
        { q:'مين طلب منك الخدمة دي بالذات؟', requires:['sherif_f_creation'], unlockId:'sherif_f_client',
          a:'"خالد، بيتابعها بشكل مبالغ فيه، طلب مني أعمله صور وحساب يشبهها عشان يحس إنه قريب منها."' },
      ]
    },
  ],

  evidence: [
    { id:'fake_account_details', tag:'من فيديو الفضح', crit:true, title:'تفاصيل الحساب المزيف', img: IMG_BASE_SECONDFACE + 'face-account.jpg',
      short:'حساب بيستخدم صور مولّدة بالذكاء الاصطناعي شبيهة بجنى',
      full:'الحساب المزيف بيستخدم صور مولّدة بالذكاء الاصطناعي شبيهة جدًا بجنى، وبيتفاعل مع المتابعين بشكل مضلل ومقصود.',
      unlocked:true, order:1 },

    { id:'rana_f_firing', tag:'من استجواب رنا', crit:false, title:'ظروف فصل رنا', img:null,
      short:'رنا اتفصلت من شغلها مع جنى وسط ظروف غير واضحة',
      full:'رنا اعترفت بإحساسها بالظلم بسبب طريقة فصلها من شغلها مع جنى قبل شهرين.',
      unlocked:false, order:2 },

    { id:'rana_f_access', tag:'من استجواب رنا', crit:false, title:'وصول رنا القديم للأرشيف', img:null,
      short:'رنا كان عندها وصول كامل لأرشيف صور جنى سابقًا',
      full:'رنا أكدت إن عندها وصول كامل لأرشيف صور جنى الشخصية وقت شغلها، بس ادّعت إنها مسحت كل حاجة بعد الفصل.',
      unlocked:false, order:3 },

    { id:'khaled_f_obsession', tag:'من استجواب خالد', crit:true, title:'هوس خالد بجنى', img:null,
      short:'خالد معجب متطرف بجنى بشكل غير صحي',
      full:'خالد اعترف بمتابعته المكثفة لجنى وإحساسه العميق بارتباط شخصي غير حقيقي بيها.',
      unlocked:false, order:4 },

    { id:'khaled_f_dm_contact', tag:'من استجواب خالد', crit:true, title:'استخدام خالد للحساب المزيف', img:null,
      short:'خالد كان بيستخدم الحساب المزيف بنفسه عشان يعيش وهم القرب من جنى',
      full:'خالد اعترف إنه كان بيدخل على الحساب المزيف ويستخدمه بنفسه كطريقة يعيش بيها وهم القرب من جنى.',
      unlocked:false, order:5 },

    { id:'sherif_f_creation', tag:'من استجواب شريف', crit:true, title:'اعتراف شريف بإنشاء الصور', img:null,
      short:'شريف معترف إنه هو اللي أنشأ الصور المزيفة',
      full:'شريف اعترف إنه هو اللي أنشأ الصور المزيفة والحساب مقابل مبلغ مالي، من غير ما يسأل كتير عن دوافع العميل.',
      unlocked:false, order:6 },

    { id:'sherif_f_client', tag:'من استجواب شريف', crit:true, title:'هوية العميل الحقيقي', img:null,
      short:'خالد هو اللي طلب من شريف إنشاء الحساب المزيف',
      full:'شريف كشف إن خالد هو اللي طلب منه إنشاء الصور والحساب المزيف عشان يحس بقرب مصطنع من جنى.',
      unlocked:false, order:7 },

    { id:'khaled_f_seen_building', tag:'من شهادة جار جنى', crit:true, title:'خالد قريب من شقة جنى', img: IMG_BASE_SECONDFACE + 'face-witness.jpg',
      short:'جار جنى أكد رؤية خالد قريب من العمارة بعد الفيديو الفاضح',
      full:'جار جنى أكد إنه شاف خالد قريب من العمارة في اليوم اللي جنى اختفت فيه، بعد الفيديو الفاضح مباشرة.',
      unlocked:false, order:8 },
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
  floorPlanPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },

  witnessReliabilityPuzzle: {
    enabled: true,
    tabLabel: 'تقييم شهادة الجار',
    introText: 'قارن رواية خالد عن يوم بسيط عادي في بيته برواية جار جنى اللي أكد رؤيته قريب من العمارة، وقيّم مين شهادته أقرب للحقيقة.',
    resultText: 'رواية الجار محددة بالتاريخ والوقت بدقة، وده بيكشف تناقض واضح في ادعاء خالد ببقائه في بيته طول اليوم.',
    testimonies: [
      { suspectId:'obsessed_fan_khaled_f', text:'"كنت في بيتي زي أي يوم عادي، ما خرجتش خالص."', reliabilityScore: 22 },
      { suspectId:'ex_assistant_rana_f', text:'جار جنى: "شفت خالد قريب من العمارة بعد الفيديو مباشرة."', reliabilityScore: 84 },
    ],
    correctSuspectId: 'obsessed_fan_khaled_f',
    resultEvidenceIds: ['khaled_f_seen_building'],
  },

  evidenceCombinations: [
    { parts:['sherif_f_client','khaled_f_dm_contact'], resultId:'khaled_f_seen_building' },
  ],

  correctSuspectId: 'obsessed_fan_khaled_f',
  conclusiveEvidenceIds: ['sherif_f_client', 'khaled_f_dm_contact', 'khaled_f_seen_building'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن خالد هو المسؤول عن اختفاء جنى؟',
        options: [
          { id:'a', text:'اعتراف شريف بإنشاء الحساب المزيف بطلب من خالد + هوسه الشديد بجنى واستخدامه المستمر للحساب المزيف + شهادة الجار اللي أثبتت وجوده قريب من العمارة بعد الفيديو مباشرة' },
          { id:'b', text:'لأنه معجب بجنى وده يكفي كدافع' },
          { id:'c', text:'لأن رنا كانت مفصولة من شغلها معاها' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية خالد الحقيقية؟',
        options: [
          { id:'a', text:'لما جنى فضحت الحساب المزيف علنًا، حس إن "علاقته" المصطنعة بيها اتهددت، فقرر يقابلها شخصيًا عشان "يفهمها" الموضوع، لكن رفضها القاطع لمقابلته خلاه ياخدها بالقوة كخطوة يائسة' },
          { id:'b', text:'كان بيحاول يحمي شريف من المسؤولية القانونية' },
          { id:'c', text:'كان بيخطط للاختفاء من البداية بدافع الانتقام' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'الوش التاني كشف الوش الحقيقي',
      paragraphs:[
        'خالد، معجب متطرف بجنى، طلب من شريف المطور التقني إنشاء حساب وصور مزيفة بالذكاء الاصطناعي عشان يعيش وهم إنه قريب منها من خلال نسخة رقمية بتقلد شخصيتها. لما جنى فضحت الحساب علنًا، حس خالد إن "علاقته" المتخيلة اتهددت، فقرر يقابلها شخصيًا. رفضها القاطع خلاه ياخدها بالقوة كخطوة يائسة.',
        'اعتراف شريف بإنشاء الحساب المزيف بطلب مباشر من خالد، وهوسه الشديد الموثق بجنى واستخدامه المستمر للحساب المزيف، وشهادة الجار اللي أثبتت وجوده قريب من العمارة بعد الفيديو الفاضح مباشرة، كلها أدلة حاصرته وأدت لإنقاذ جنى.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية خالد، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: اعتراف شريف، استخدام خالد للحساب المزيف، وشهادة الجار، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وجنى فضلت في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الوش التاني"

   الغلاف (cover.webp):
   "Photorealistic close-up of a smartphone screen displaying a
   social media profile with a distorted face effect, dim phone
   glow lighting, documentary photography style, no text, no
   watermark, photorealistic"

   المشهد ١ (face-scene1.jpg):
   "Photorealistic close-up of a shocked woman looking at her phone
   screen at home, soft indoor lighting, photorealistic, no text, no
   watermark"

   المشهد ٢ (face-scene2.jpg):
   "Photorealistic shot of a woman recording a video with a
   smartphone on a tripod at home, warm indoor lighting,
   photorealistic, no text, no watermark"

   المشهد ٣ (face-scene3.jpg):
   "Photorealistic shot of an empty modern apartment living room
   with a phone left on a table, soft dim lighting, quiet unsettling
   atmosphere, photorealistic, no text, no watermark"

   المشهد ٤ (face-scene4.jpg):
   "Photorealistic shot of a woman handing a phone to an investigator
   in an office, formal indoor lighting, photorealistic, no text, no
   watermark"

   رنا (rana_f.jpg):
   "Photorealistic portrait of a young Egyptian woman, casual outfit,
   guarded resentful expression, sitting in a living room, soft
   natural lighting, candid documentary photography style, no text,
   no watermark, photorealistic"

   خالد (khaled_f.jpg):
   "Photorealistic portrait of a young Egyptian man, casual outfit,
   nervous obsessive expression, sitting alone in a dim room lit by
   a phone screen glow, candid documentary photography style, no
   text, no watermark, photorealistic"

   شريف (sherif_f.jpg):
   "Photorealistic portrait of a young Egyptian male tech developer,
   casual tech outfit, evasive nervous expression, sitting at a
   computer desk, dim screen glow lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل الحساب المزيف (face-account.jpg):
   "Photorealistic close-up of a smartphone screen showing a fake
   social media profile with AI-generated images, soft phone glow
   lighting, no text, no watermark, photorealistic"

   دليل الشاهد (face-witness.jpg):
   "Photorealistic shot of a neighbor watching from an apartment
   building entrance at dusk, natural lighting, documentary
   photography style, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_SECOND_FACE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  const k=c.suspects.find(s=>s.id==='obsessed_fan_khaled_f');
  if(k && !k.questions.some(q=>q.closesInterrogation)) k.questions.push({
    q:'شريف قال إنك إنت اللي طلبت منه الحساب المزيف، والجار شافك عند عمارة جنى بعد ما فضحته. رحت لها ليه؟',
    requires:['sherif_f_client','khaled_f_dm_contact','khaled_f_seen_building'], closesInterrogation:true,
    a:'(بيتكلم بسرعة) "كنت عايزها تسمعني وتفهم إن الحساب كان الطريقة الوحيدة أحس إني قريب منها. لما رفضت تقابلني، اتصرفت بعصبية وأخدتها معايا."'
  });

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_SECOND_FACE;
  c.evidenceCombinations = [];
  if (c.witnessReliabilityPuzzle) {
    c.witnessReliabilityPuzzle.resultText = 'شهادة الجار محددة في التوقيت والمكان وبتكسر أليبي خالد إنه فضل في البيت. ده يثبت وجوده قرب العمارة، مش الاختفاء نفسه.';
  }
  const k = c.suspects.find(s => s.id === 'obsessed_fan_khaled_f');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتوتر) "رحت العمارة فعلًا عشان أحاول أقابلها بعد الفيديو، لكن هي رفضت. الحساب المزيف غلط مني، ووجودي هناك يثبت إني كذبت، مش إني أخدتها."';
    }
  }
  c.conclusiveEvidenceIds = ['sherif_f_client','khaled_f_dm_contact','khaled_f_seen_building'];
  c.conclusiveRequired = 3;

  c.evidence.push({id:'khaled_vehicle_route_v2',tag:'كاميرات الشارع',crit:true,title:'خالد غادر بجنى',img:null,short:'الكاميرات سجلت جنى داخل عربية خالد',full:'كاميرات شارع جانبي سجلت خالد وهو يغادر المنطقة بعربيته وجنى بجواره في حالة مقاومة واضحة، ثم حددت اتجاه العربية.',unlocked:false,order:98});
  c.evidence.push({id:'jana_rescued_v2',tag:'نتيجة التتبع والمداهمة',crit:true,title:'العثور على جنى',img:null,short:'تم العثور على جنى في استراحة يستخدمها خالد',full:'تتبع العربية قاد لاستراحة يستعملها خالد. المداهمة عثرت على جنى بالداخل، وشهادتها أكدت إنه أخذها بالقوة.',unlocked:false,order:99});
  c.investigationActions=[...(c.investigationActions||[]),
    {id:'second_face_trace_car_v2',kind:'كاميرات وتتبع',label:'راجع كاميرات الشوارع حول العمارة',requires:['khaled_f_seen_building','khaled_f_dm_contact'],resultEvidenceIds:['khaled_vehicle_route_v2'],successText:'الكاميرات سجلت جنى داخل عربية خالد وحددت اتجاهها.'},
    {id:'second_face_raid_resthouse_v2',kind:'تتبع ومداهمة',label:'تتبّع العربية وداهم الاستراحة',requires:['khaled_vehicle_route_v2','sherif_f_client'],resultEvidenceIds:['jana_rescued_v2'],successText:'تم العثور على جنى وإنقاذها.'}
  ];
  c.conclusiveEvidenceIds=['khaled_f_seen_building','khaled_vehicle_route_v2','jana_rescued_v2'];
  c.endings.good.paragraphs[1]='شهادة الجار وضعت خالد عند العمارة، وكاميرات الشارع سجلت خروجه بجنى وحددت العربية، ثم قاد التتبع للاستراحة. المداهمة أنقذت جنى وشهادتها أكدت إنه أخذها بالقوة.';
})();
