/* ============================================================
   بيانات قضية: دهب الفرح
   قضية سرقة كوميدية خفيفة — شنطة دهب العروسة اختفت وسط زحمة
   فرح ريفي كبير، ولازم ترتب أحداث الليلة عشان تلاقي الفاعل.
   ============================================================ */

const IMG_BASE_GOLD = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/wedding-gold/';

const CASE_WEDDING_GOLD = {
  id: 'wedding-gold',
  title: 'دهب الفرح',
  caseNo: 'CASE 002',
  subtitle: 'قرية أبيار، مركز كفر الزيات، الغربية',
  coverImg: IMG_BASE_GOLD + 'cover.webp',
  difficulty: 'سهلة',
  estMinutes: 26,
  investigationPoints: 16,
  teaser: 'شنطة دهب العروسة اختفت وسط زحمة فرح ريفي كبير. عشرات الناس كانوا حوالين الطاولة، ولازم ترتب أحداث الليلة كلها عشان تلاقي الفاعل.',

  isPremium: false,
  categories: ['theft', 'comedy'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_GOLD + 'cover.webp',
    heroCaption: 'CASE 002 — نص فرح "سوسو" العروسة',
    text1: 'وسط فرح "سوسو" الكبير في القرية، الشنطة اللي فيها كل دهبها اختفت من على الكرسي المخصص لها جنب المنصة. الزفة كانت في أعز لحظاتها، والفرحة اتحولت لدوشة وصراخ من كل العيلة.',
    text2: 'أبو العروسة، "الحاج فتحي"، مقتنع إن حد من المدعوين استغل الزحمة والضلمة. طلب منك تحقق بهدوء وسرعة، قبل ما الفرح يخلص والمدعوين يمشوا كل واحد لحاله، عشان الدهب ميضيعش للأبد.',
    meta: [
      { label:'الضحية', value:'سوسو — العروسة' },
      { label:'الحاجة المسروقة', value:'شنطة دهب كاملة' },
      { label:'مكان الحادثة', value:'الكرسي المخصص للعروسة جنب المنصة' },
      { label:'طلب التحقيق', value:'الحاج فتحي، والد العروسة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الزفة',
      img: IMG_BASE_GOLD + 'gold-scene1.jpg',
      text:'فرح ريفي كبير، دي جيه، رقص، وزغاريد في كل مكان. سوسو العروسة قاعدة على كرسيها المزين، والشنطة جنبها على الأرض تحت الكرسي.'
    },
    {
      scene:'المشهد ٢ — الظلام المفاجئ',
      img: IMG_BASE_GOLD + 'gold-scene2.jpg',
      text:'الكهربا بتقطع لمدة دقيقة تقريبًا بسبب حمل زيادة، والناس بتصرخ وتضحك في نفس الوقت وسط الضلمة والزحمة.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_GOLD + 'gold-scene3.jpg',
      text:'لما الكهربا ترجع، سوسو بتنزل تدور على شنطتها تحت الكرسي، تلاقيها مش موجودة. صراخ وهيصة تعم القاعة كلها.'
    },
    {
      scene:'المشهد ٤ — التحقيق وسط الزحمة',
      img: IMG_BASE_GOLD + 'gold-scene4.jpg',
      text:'الحاج فتحي بيقفل باب القاعة مؤقتًا. عندك دايرة من الناس القريبين من كرسي العروسة وقت انقطاع الكهربا بالذات.'
    },
  ],

  suspects: [
    {
      id:'amm_gaber', name:'عم جابر', role:'خال العروسة، مسؤول الكهربا والصوتيات في الفرح', img: IMG_BASE_GOLD + 'gaber.jpg', avatarEmoji:'🔌',
      alibi:'قال إنه كان مشغول بإصلاح الكهربا وقت انقطاعها.',
      questions:[
        { q:'إنت اللي بتتحكم في الكهربا، الانقطاع ده كان مقصود؟', unlockId:'power_log',
          a:'"لأ والله، حمل زيادة عادي بسبب السماعات الكبيرة، بيحصل في كل الأفراح الكبيرة كده."' },
        { q:'كنت فين بالظبط وقت الانقطاع؟',
          a:'"كنت عند لوحة الكهربا بعيد عن كرسي العروسة تمامًا، بحاول أرجع التيار بسرعة."' },
        { q:'حد سألك تقطع الكهربا لحظة معينة؟',
          a:'"لأ خالص، ده كان عطل حقيقي مش تمثيل."' },
      ]
    },
    {
      id:'mennat', name:'منّة', role:'صديقة العروسة المقربة، قاعدة جنبها طول الوقت', img: IMG_BASE_GOLD + 'mennat.jpg', avatarEmoji:'💃',
      alibi:'قالت إنها كانت واقفة تصور فيديو للعروسة وقت الانقطاع.',
      loseMsg:'منّة كانت فعلًا بتصور فيديو للعروسة على موبايلها، والفيديو نفسه بيثبت مكانها بعيد عن الشنطة طول فترة الانقطاع. مفيش أي دليل يربطها بالسرقة.',
      questions:[
        { q:'كنتِ قريبة من شنطة الدهب وقت الانقطاع؟',
          a:'"لأ، كنت واقفة بعيد شوية بصور فيديو للعروسة، عشان نحتفظ بذكرى الليلة."' },
        { q:'الفيديو اللي صورتيه ممكن يفيدنا؟', unlockId:'video_clip',
          a:'"أكيد، خدوه وشوفوه بنفسكم، هيوضح مكاني بالظبط طول الوقت."' },
      ]
    },
    {
      id:'ibrahim', name:'إبراهيم', role:'ابن عم العريس، عنده ديون كبيرة معروفة في القرية', img: IMG_BASE_GOLD + 'ibrahim.jpg', avatarEmoji:'💸',
      alibi:'قال إنه كان قاعد على ترابيزته البعيدة طول الليلة تقريبًا.',
      questions:[
        { q:'سمعنا إن عليك ديون كبيرة في البلد؟', unlockId:'debt_note',
          a:'"للأسف أيوه، ظروف تجارة خسرانة، بس ده مش معناه إني هسرق دهب قريبتي في فرحها!"' },
        { q:'كنت فين وقت انقطاع الكهربا بالظبط؟', unlockId:'ibrahim_seen_near',
          a:'"في مكاني عند الترابيزة، ممكن حد يكون شافني، الظلمة كانت كبيرة بس."' },
        { q:'شاهد قال إنه شافك قريب من كرسي العروسة أثناء الضلمة — عندك تفسير؟', requires:['ibrahim_seen_near','debt_note'],
          a:'(بيتلعثم) "كنت رايح أسلم على سوسو بس، ماكنش قصدي أقرب من الشنطة، الظلمة خلتني أتوه شوية."' },
      ]
    },
    {
      id:'reda_waiter', name:'رضا', role:'أحد عمال الضيافة في الفرح', img: IMG_BASE_GOLD + 'reda.jpg', avatarEmoji:'🍽️',
      alibi:'قال إنه كان بيوزع المشروبات على الترابيزات طول الوقت.',
      loseMsg:'رضا كان فعلًا مشغول بتوزيع المشروبات، وأكتر من ضيف أكدوا شغله المستمر طول فترة الانقطاع. مفيش أي دليل مادي يربطه بالسرقة.',
      questions:[
        { q:'اقتربت من كرسي العروسة في أي وقت؟',
          a:'"لأ، شغلي كان على الترابيزات البعيدة، مقربتش من المنصة خالص."' },
        { q:'لاحظت حد غريب قريب من الشنطة؟', unlockId:'reda_witness',
          a:'"صراحة لاحظت واحد بيتحرك ناحية المنصة أثناء الضلمة، بس ماقدرتش أميز ملامحه كويس."' },
      ]
    },
  ],

  evidence: [
    { id:'power_log', tag:'من فحص لوحة الكهربا', crit:false, title:'سبب انقطاع الكهربا', img:null,
      short:'حمل زيادة حقيقي، مش تلاعب متعمد',
      full:'فحص لوحة الكهربا بيأكد إن الانقطاع كان بسبب حمل زيادة حقيقي من السماعات الكبيرة، مش تلاعب متعمد من حد.',
      unlocked:false, order:1 },

    { id:'video_clip', tag:'من فيديو منّة', crit:true, title:'فيديو منّة أثناء الانقطاع', img: IMG_BASE_GOLD + 'gold-video.jpg', unlocksTimeline:true,
      short:'بيثبت مكان منّة، وبيظهر ظل شخص قريب من الكرسي في الخلفية',
      full:'فيديو منّة بيثبت إنها كانت بعيدة عن الشنطة وقت الانقطاع. وفي الخلفية، مع ضوء موبايل لحظي، بيظهر شخص بيتحرك من ناحية ترابيزة إبراهيم للممر الجانبي المؤدي للمنصة.',
      unlocked:false, order:2 },

    { id:'debt_note', tag:'من استجواب إبراهيم', crit:false, title:'ديون إبراهيم المعروفة', img:null,
      short:'إبراهيم عليه ديون تجارية كبيرة في القرية',
      full:'إبراهيم اعترف بديون تجارية كبيرة معروفة في القرية، ده بيديله دافع مالي واضح.',
      unlocked:false, order:3 },

    { id:'ibrahim_seen_near', tag:'من شهادة عابرة', crit:false, title:'إبراهيم قريب من الكرسي أثناء الضلمة', img:null,
      short:'شاهد قال إنه شاف إبراهيم قريب من المنصة وقت الانقطاع',
      full:'شاهد عابر أكد إنه شاف إبراهيم بيقرب من منطقة كرسي العروسة أثناء فترة الضلمة، رغم إنه قال إنه كان قاعد على ترابيزته البعيدة.',
      unlocked:false, order:4 },

    { id:'reda_witness', tag:'من استجواب رضا', crit:true, title:'رضا لاحظ حد قريب من المنصة', img:null,
      short:'حد كان بيتحرك ناحية المنصة أثناء الضلمة',
      full:'رضا شاف شخصًا يعدي من الممر الجانبي ناحية المنصة وقت الضلمة، وماقدرش يحدد وشه. اتجاه الحركة بيتوافق مع الظل اللي ظهر في فيديو منّة.',
      unlocked:false, order:5 },

    { id:'route_reconstruction', tag:'من ترتيب خط الأحداث', crit:true, title:'إعادة بناء طريق الحركة وقت الضلمة', img:null,
      short:'الفيديو وشهادة رضا بيرسموا طريقًا من ناحية ترابيزة إبراهيم للممر الجانبي ثم المنصة',
      full:'لما تجمع لقطة الظل في فيديو منّة مع مكان رضا وشهادة الضيف، بيتحدد مسار واحد متماسك بدأ من ناحية ترابيزة إبراهيم، مر بالممر الجانبي، ووصل للمنصة خلال دقيقة انقطاع الكهرباء.',
      unlocked:false, order:6 },

    { id:'gold_bag_found', tag:'من تفتيش القاعة', crit:true, title:'الشنطة الفاضية والدهب بعد إعادة تتبع المسار', img: IMG_BASE_GOLD + 'gold-bag.jpg',
      short:'الشنطة اتلاقت في صندوق خدمة قريب من ترابيزة إبراهيم، والدهب اتضبط معاه',
      full:'بعد ما أعدت بناء مسار الحركة من الفيديو وشهادة رضا، التفتيش ركز على الممر الجانبي وصندوق خدمة قريب من ترابيزة إبراهيم. الشنطة الفاضية اتلاقت هناك، وبعد مواجهة إبراهيم وافق على تفتيش متعلقاته واتلاقى الدهب مخبي في بطانة سترته.',
      unlocked:false, order:7 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },

  timelinePuzzle: {
    enabled: true,
    tabLabel: 'خط الأحداث',
    introText: 'رتب أحداث الليلة بالترتيب الصح، من أول الزفة لحد اكتشاف السرقة، عشان توضح لحظة السرقة بالظبط.',
    events: [
      { id:'e1', text:'الزفة بتبدأ، سوسو قاعدة على كرسيها والشنطة تحت الكرسي.' },
      { id:'e2', text:'الكهربا بتقطع فجأة بسبب حمل زيادة من السماعات.' },
      { id:'e3', text:'إبراهيم بيتحرك وسط الضلمة ناحية منطقة المنصة، بعيد عن مكانه المعتاد.' },
      { id:'e4', text:'الكهربا بترجع، والزفة بتكمل عادي زي ما هي.' },
      { id:'e5', text:'سوسو بتنزل تدور على الشنطة، تلاقيها اختفت.' },
    ],
    correctOrder: ['e1','e2','e3','e4','e5'],
    resultText: 'رتبت الأحداث صح. المسار بقى واضح: انقطاع النور فتح فرصة، والشخص اللي تحرك من ناحية ترابيزة إبراهيم للممر الجانبي وصل للمنصة ورجع قبل ما النور يثبت.',
    resultEvidenceIds: ['route_reconstruction'],
  },

  evidenceCombinations: [
    { parts:['video_clip','reda_witness'], resultId:'route_reconstruction' },
    { parts:['route_reconstruction','debt_note'], resultId:'gold_bag_found' },
  ],

  correctSuspectId: 'ibrahim',
  conclusiveEvidenceIds: ['ibrahim_seen_near', 'route_reconstruction', 'gold_bag_found'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن إبراهيم هو الفاعل؟',
        options: [
          { id:'a', text:'شهادات حركته وقت الضلمة + إعادة بناء المسار من الفيديو + العثور على الشنطة والدهب بعد تتبع نفس المسار' },
          { id:'b', text:'لأنه ابن عم العريس بس' },
          { id:'c', text:'لأنه كان متضايق في الفرح' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whymennat',
        label:'ليه منّة كانت بريئة فعليًا؟',
        options: [
          { id:'a', text:'الفيديو اللي صورته بيثبت مكانها بعيد عن الشنطة طول الوقت' },
          { id:'b', text:'لأنها صديقة العروسة المقربة' },
          { id:'c', text:'لأنها اعترفت بمكانها بس' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الدهب رجع للعروسة',
      paragraphs:[
        'إبراهيم كان تحت ضغط ديون، واستغل انقطاع النور وتحرك من الممر الجانبي للمنصة. أخد الشنطة، شال الدهب منها بسرعة، وخبّى الشنطة في صندوق خدمة قريب من ترابيزته قبل ما يرجع وسط الناس.',
        'اللي وصّل له كان فيديو منّة، وشهادة رضا، وإعادة بناء طريق الحركة، وبعدها العثور على الشنطة والدهب. الدهب رجع لسوسو، وباقي التعامل مع واقعة السرقة اتساب للإجراءات الرسمية بعيد عن قرار التحقيق نفسه.'
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية إبراهيم، بس الأدلة اللي جمعتها لسه مش كفاية تأكد الاتهام قدام العيلة كلها.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: الديون، الشهادة القريبة، وشهادة رضا، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والفاعل الحقيقي فضل طليق بالدهب. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "دهب الفرح"

   الغلاف (cover.webp):
   "Photorealistic overhead shot of an ornate empty wedding chair with
   festive decorations, an open empty jewelry bag on the ground beside
   it, warm colorful wedding lighting, documentary photography style,
   no text, no watermark, photorealistic"

   المشهد ١ (gold-scene1.jpg):
   "Photorealistic wide shot of a lively rural Egyptian wedding
   celebration, colorful lights, dancing crowd, a decorated bride's
   chair on a small stage, warm festive atmosphere, photorealistic,
   no text, no watermark"

   المشهد ٢ (gold-scene2.jpg):
   "Photorealistic shot of a wedding hall plunged into darkness,
   silhouettes of people, phone flashlights turning on, chaotic warm
   atmosphere, photorealistic, no text, no watermark"

   المشهد ٣ (gold-scene3.jpg):
   "Photorealistic shot of a bride looking under an empty decorated
   chair with a shocked expression, wedding hall lights back on,
   photorealistic, no text, no watermark"

   المشهد ٤ (gold-scene4.jpg):
   "Photorealistic shot of a rural wedding hall entrance being closed,
   guests waiting inside, warm ambient lighting, photorealistic, no
   text, no watermark"

   الشخصيات (برومبت مستقل لكل شخصية):

   عم جابر (gaber.jpg):
   "Photorealistic portrait of a middle-aged Egyptian rural man,
   traditional galabeya, standing near an electrical panel, wary
   defensive expression, warm wedding hall lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   منّة (mennat.jpg):
   "Photorealistic portrait of a young Egyptian woman, festive
   wedding guest dress, headscarf, holding a phone, worried loyal
   expression, warm wedding hall lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   إبراهيم (ibrahim.jpg):
   "Photorealistic portrait of a young Egyptian man, formal wedding
   suit, anxious guarded expression, standing in a village wedding
   hall, warm wedding hall lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   رضا (reda.jpg):
   "Photorealistic portrait of a young Egyptian male wedding waiter,
   formal catering uniform, nervous evasive expression, standing
   near a wedding hall buffet table, warm wedding hall lighting,
   candid documentary photography style, no text, no watermark,
   photorealistic"

   دليل الفيديو (gold-video.jpg):
   "Photorealistic still frame from a smartphone video showing a dim
   wedding hall with a blurred silhouette in the background,
   photorealistic, no text, no watermark"

   دليل الشنطة (gold-bag.jpg):
   "Photorealistic close-up of an empty decorative gold jewelry bag
   found under a table cloth, dim lighting, forensic evidence
   photography style, no text, no watermark, photorealistic"
   ============================================================ */

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_WEDDING_GOLD;
  if (c.timelinePuzzle) {
    const e3 = c.timelinePuzzle.events.find(e => e.id === 'e3');
    if (e3) e3.text = 'شخص بيتحرك وسط الضلمة من ناحية ترابيزة إبراهيم ناحية الممر الجانبي القريب من المنصة.';
    c.timelinePuzzle.resultText = 'ترتيب الأحداث يحدد نافذة السرقة والمسار المحتمل من ناحية ترابيزة إبراهيم للمنصة، لكنه ما يثبتش هوية السارق وحده.';
  }
  c.evidenceCombinations = [
    { parts:['video_clip','reda_witness'], resultId:'route_reconstruction' }
  ];
  const i = c.suspects.find(s => s.id === 'ibrahim');
  if (i && !i.questions.some(q => q.unlockId === 'gold_bag_found')) {
    i.questions.push({
      q:'بعد ما اتحدد مسار الحركة، وافقت نفتش متعلقاتك والمكان القريب من ترابيزتك؟',
      requires:['route_reconstruction','debt_note','ibrahim_seen_near'],
      unlockId:'gold_bag_found',
      a:'(بيتوتر) "فتشوا لو عايزين... أنا ماخدتش حاجة."'
    });
  }
  c.evidenceCombinations=(c.evidenceCombinations||[]).filter(x=>x.resultId!=='gold_bag_found');
  const searchQuestion=i && i.questions.find(q=>q.unlockId==='gold_bag_found');
  if(searchQuestion) searchQuestion.unlockId=null;
  c.investigationActions=[...(c.investigationActions||[]),{
    id:'wedding_search_route_v2',kind:'تفتيش',label:'فتّش مسار الحركة ومتعلقات إبراهيم',
    description:'نفّذ التفتيش بعد إثبات مسار الحركة ووجود إبراهيم قرب الكرسي ودافع الدين.',
    requires:['route_reconstruction','debt_note','ibrahim_seen_near'],resultEvidenceIds:['gold_bag_found'],
    successText:'تم العثور على الشنطة في صندوق الخدمة والدهب داخل بطانة سترة إبراهيم.'
  }];
  c.conclusiveEvidenceIds = ['ibrahim_seen_near','route_reconstruction','gold_bag_found'];
  c.conclusiveRequired = 3;
})();
