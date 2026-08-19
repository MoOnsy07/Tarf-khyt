/* ============================================================
   بيانات قضية: صورة قديمة
   قضية قتل قديمة — صورة عيلية قديمة بتتلاقى بالصدفة، وبتكشف
   تفاصيل عن جريمة قتل مدفونة من 20 سنة.
   ============================================================ */

const IMG_BASE_OLDPHOTO = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/old-photo/';

const CASE_OLD_PHOTO = {
  id: 'old-photo',
  title: 'صورة قديمة',
  caseNo: 'CASE 045',
  subtitle: 'بيت عائلي قديم، ذكرى 20 سنة',
  coverImg: IMG_BASE_OLDPHOTO + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 36,
  investigationPoints: 20,
  teaser: 'أثناء تنظيف بيت عائلي قديم، بتتلاقى صورة عيلية من 20 سنة فيها تفاصيل غريبة على ضهرها بتشير لجريمة قتل اتقفلت وقتها كحادثة عادية.',

  isPremium: false,
  categories: ['murder', 'coldcase'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_OLDPHOTO + 'cover.webp',
    heroCaption: 'CASE 045 — 20 سنة بعد الحادثة',
    text1: 'أثناء تنظيف بيت الجدة القديم بعد وفاتها، لقت حفيدتها "سلمى" صورة عيلية قديمة من رحلة صيفية من 20 سنة. على ضهر الصورة، لقت كلمات مكتوبة بخط اليد بتلمح إن وفاة جدها "كمال" في نفس السنة دي مكانتش حادثة عادية زي ما الجميع كان فاكر.',
    text2: 'سلمى طلبت منك تحقق في الموضوع القديم ده، حتى لو كل الأدلة المباشرة اختفت مع الوقت. عندك الصورة القديمة، وقائمة أفراد العيلة اللي كانوا حاضرين في الرحلة الصيفية دي.',
    meta: [
      { label:'الضحية القديمة', value:'كمال — جد سلمى، مات من 20 سنة' },
      { label:'الاتهام القديم', value:'حادثة غرق عرضية' },
      { label:'الدليل الجديد', value:'كتابة مشبوهة على ضهر صورة قديمة' },
      { label:'طلب التحقيق', value:'سلمى، الحفيدة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — التنظيف',
      img: IMG_BASE_OLDPHOTO + 'photo-scene1.jpg',
      text:'سلمى بتنظف صندوق قديم في بيت جدتها المتوفاة، بتلاقي ألبوم صور قديم مغطى بالتراب.'
    },
    {
      scene:'المشهد ٢ — الاكتشاف',
      img: IMG_BASE_OLDPHOTO + 'photo-scene2.jpg',
      text:'سلمى بتقلب في الألبوم، تلاقي صورة رحلة صيفية عيلية، وعلى ضهرها كتابة بخط يد غير واضح.'
    },
    {
      scene:'المشهد ٣ — القراءة',
      img: IMG_BASE_OLDPHOTO + 'photo-scene3.jpg',
      text:'سلمى بتقرأ الكتابة بصعوبة: "مش حادثة... محدش يعرف الحقيقة غيري"، وتوقيع غير واضح تحتها.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_OLDPHOTO + 'photo-scene4.jpg',
      text:'سلمى بتجمع كل المستندات القديمة المتاحة، وتحاول تتواصل مع أفراد العيلة اللي كانوا حاضرين وقتها.'
    },
  ],

  suspects: [
    {
      id:'uncle_adham', name:'أدهم', role:'عم سلمى، كان حاضر الرحلة الصيفية', img: IMG_BASE_OLDPHOTO + 'adham.jpg', avatarEmoji:'🏊',
      alibi:'قال إنه كان بعيد عن الشاطئ وقت الحادثة، بيلعب مع باقي الأطفال.',
      questions:[
        { q:'علاقتك بأبوك كمال كانت إيه في وقتها؟', unlockId:'adham_relationship',
          a:'"كانت صعبة صراحة، كان بيفضل أخويا عليّ في كل حاجة، وده أثر فيا كتير في وقتها."' },
        { q:'إنت اللي كتبت الكلام على ضهر الصورة؟', requires:['adham_relationship'],
          a:'(بيتردد) "مش متذكر صراحة، عدى وقت طويل جدًا على كده."' },
      ]
    },
    {
      id:'aunt_widad', name:'وداد', role:'أخت كمال، كانت حاضرة الرحلة', img: IMG_BASE_OLDPHOTO + 'widad.jpg', avatarEmoji:'👒',
      alibi:'قالت إنها كانت في الفيلا بتحضر الأكل وقت الحادثة.',
      questions:[
        { q:'كنتِ قريبة من كمال في وقتها؟', unlockId:'widad_closeness',
          a:'"كنت أخته الوحيدة، وكانت بينا علاقة قوية، بس بعد وفاته حسيت إن حاجة مش مظبوطة في القصة."' },
        { q:'شكيتِ في حد بالذات وقتها؟', requires:['widad_closeness'], unlockId:'widad_suspicion',
          a:'(بتتردد) "كان فيه شريك عمل لكمال زارنا في الرحلة دي، حسيت إنه متوتر بشكل غريب بعد الحادثة."' },
      ]
    },
    {
      id:'business_partner_naeem', name:'نعيم', role:'شريك عمل كمال القديم، حضر الرحلة كضيف', img: IMG_BASE_OLDPHOTO + 'naeem.jpg', avatarEmoji:'🤝',
      alibi:'قال إنه كان في الشاطئ بعيد عن كمال وقت الحادثة.',
      questions:[
        { q:'علاقتك التجارية بكمال كانت إيه في وقتها؟', unlockId:'naeem_business_dispute',
          a:'"كان بينا خلاف كبير على تقسيم أرباح مشروع مشترك، كان كمال ناوي يقاضيني."' },
        { q:'كنت آخر واحد شفته مع كمال قبل الحادثة؟', requires:['naeem_business_dispute'], unlockId:'naeem_last_seen',
          a:'(بيتردد) "مشينا سوا على الشاطئ نتكلم في الموضوع، بس سبته كويس وأنا رجعت."' },
      ]
    },
    {
      id:'childhood_friend_ramzy', name:'رمزي', role:'صديق طفولة لكمال، كان حاضر الرحلة', img: IMG_BASE_OLDPHOTO + 'ramzy.jpg', avatarEmoji:'📷',
      alibi:'قال إنه كان بياخد صور للعيلة على الشاطئ طول الوقت.',
      questions:[
        { q:'إنت اللي التقطت الصورة دي؟', unlockId:'ramzy_photographer',
          a:'"أيوه، كنت بصور كل الرحلة، كان عندي كاميرا كانت جديدة وقتها."' },
        { q:'سلمى لقت خط اليد ده مطابق لدفتر يوميات قديم بتاعك — عايز تفسر؟', requires:['ramzy_photographer','naeem_last_seen','widad_suspicion'], closesInterrogation:true,
          a:'(بيصمت طويل) "شفت نعيم وكمال بيتخانقوا على الشاطئ، وشفت نعيم بيدفعه في المية بقوة. خفت أتكلم وقتها، وكتبت الملاحظة دي على الصورة كتذكير لنفسي إني لازم أعترف يومًا ما."' },
      ]
    },
  ],

  evidence: [
    { id:'photo_back_writing', tag:'من الصورة القديمة', crit:true, title:'كتابة غامضة على ضهر الصورة', img: IMG_BASE_OLDPHOTO + 'photo-back.jpg',
      short:'كتابة بخط يد غير واضح بتلمح إن الوفاة مش حادثة عرضية',
      full:'الكتابة على ضهر الصورة بتقول "مش حادثة... محدش يعرف الحقيقة غيري"، بخط يد قديم صعب تحديد صاحبه بسهولة.',
      unlocked:true, order:1 },

    { id:'adham_relationship', tag:'من استجواب أدهم', crit:false, title:'علاقة أدهم بأبوه', img:null,
      short:'علاقة صعبة بين أدهم وكمال في وقتها',
      full:'أدهم اعترف بوجود علاقة صعبة بينه وبين أبوه كمال، اللي كان بيفضل أخوه عليه في كل حاجة.',
      unlocked:false, order:2 },

    { id:'widad_closeness', tag:'من استجواب وداد', crit:false, title:'شكوك وداد القديمة', img:null,
      short:'وداد حسّت إن حاجة مش مظبوطة بعد وفاة أخوها',
      full:'وداد اعترفت إنها حسّت من زمان إن حاجة مش مظبوطة في قصة وفاة أخوها، رغم إن الجميع اتقبل فرضية الحادث العرضي.',
      unlocked:false, order:3 },

    { id:'widad_suspicion', tag:'من استجواب وداد', crit:false, title:'شك وداد في نعيم', img:null,
      short:'وداد لاحظت توتر غريب من نعيم بعد الحادثة',
      full:'وداد أكدت إنها لاحظت توتر غريب من نعيم بعد الحادثة مباشرة، رغم إنها ما قدرتش تتأكد من شكها وقتها.',
      unlocked:false, order:4 },

    { id:'naeem_business_dispute', tag:'من استجواب نعيم', crit:true, title:'خلاف تجاري خطير', img:null,
      short:'خلاف كبير بين نعيم وكمال على أرباح مشروع',
      full:'نعيم اعترف بوجود خلاف تجاري كبير مع كمال على تقسيم أرباح مشروع مشترك، وإن كمال كان ناوي يقاضيه.',
      unlocked:false, order:5 },

    { id:'naeem_last_seen', tag:'من استجواب نعيم', crit:true, title:'آخر من شاف كمال', img:null,
      short:'نعيم كان آخر واحد مشى مع كمال قبل الحادثة',
      full:'نعيم اعترف إنه كان آخر واحد مشى مع كمال على الشاطئ قبل الحادثة، بس أنكر أي عنف مباشر.',
      unlocked:false, order:6 },

    { id:'ramzy_photographer', tag:'من استجواب رمزي', crit:false, title:'رمزي مصور الرحلة', img:null,
      short:'رمزي هو اللي التقط كل صور الرحلة',
      full:'رمزي أكد إنه هو اللي كان بيصور كل صور الرحلة الصيفية بكاميرته الشخصية.',
      unlocked:false, order:7 },

    { id:'handwriting_match_ramzy', tag:'من مقارنة خط يد', crit:true, title:'تطابق خط اليد مع رمزي', img: IMG_BASE_OLDPHOTO + 'photo-diary.jpg',
      short:'خط الكتابة على الصورة بيتطابق مع دفتر يوميات رمزي القديم',
      full:'المقارنة بين الكتابة على ضهر الصورة ودفتر يوميات قديم لرمزي أثبتت تطابق واضح في أسلوب الخط، وده بيدل على إنه هو اللي كتب الملاحظة.',
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
  witnessReliabilityPuzzle: { enabled:false },

  handwritingPuzzle: {
    enabled: true,
    tabLabel: 'تحليل خط الكتابة القديمة',
    introText: 'قارن خط الكتابة على ضهر الصورة القديمة بعينات خط يد أفراد العيلة والضيوف الحاضرين وقتها، ودوّر على التطابق.',
    resultText: 'الخط بيتطابق مع دفتر يوميات قديم يخص رمزي، صديق طفولة كمال ومصور الرحلة.',
    referenceSignature: { angle: 10, pressure: 'light', spacing: 'narrow' },
    willSignature: { angle: 11, pressure: 'light', spacing: 'narrow' },
    discrepancyPoints: [],
    correctSuspectId: 'childhood_friend_ramzy',
    resultEvidenceIds: ['handwriting_match_ramzy'],
  },

  evidenceCombinations: [
    { parts:['naeem_last_seen','widad_suspicion'], resultId:'handwriting_match_ramzy' },
  ],

  correctSuspectId: 'business_partner_naeem',
  conclusiveEvidenceIds: ['naeem_business_dispute', 'naeem_last_seen', 'handwriting_match_ramzy'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن نعيم هو المسؤول عن وفاة كمال؟',
        options: [
          { id:'a', text:'شهادة رمزي المتأخرة اللي أثبتها تحليل خط يده على الصورة + دافع نعيم التجاري الواضح + كونه آخر واحد اتشاف مع كمال قبل الحادثة' },
          { id:'b', text:'لأن نعيم شريك عمل وده يكفي كدافع' },
          { id:'c', text:'لأن أدهم كان له خلاف مع أبوه' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'ليه رمزي سكت 20 سنة قبل ما يعترف؟',
        options: [
          { id:'a', text:'خاف يوقع صديقه القديم نعيم في مشكلة، وكتب الملاحظة على الصورة كتذكير لنفسه بضميره، بدون ما يقدر يواجه الحقيقة رسميًا لحد ما الصورة اتلاقت بالصدفة' },
          { id:'b', text:'كان شريك في الجريمة من البداية' },
          { id:'c', text:'كان ناسي الموضوع تمامًا لحد ما شاف الصورة' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'الصورة اللي حملت الحقيقة 20 سنة',
      paragraphs:[
        'نعيم كان في خلاف تجاري كبير مع كمال على تقسيم أرباح مشروع مشترك، وكمال كان ناوي يقاضيه. في نفس الرحلة الصيفية، حصل نقاش حاد بينهم على الشاطئ تحول لدفعة عنيفة في المية أدت لغرق كمال. رمزي، صديق الطفولة، شاف كل حاجة بس خاف يتكلم وقتها.',
        'شهادة رمزي المتأخرة بعد 20 سنة، اللي أثبتها تحليل خط يده على الصورة نفسها، ودافع نعيم التجاري الواضح، وكونه آخر واحد اتشاف مع كمال قبل الحادثة، كلها أدلة حاصرته وكشفت حقيقة كانت مدفونة لعقدين كاملين.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية نعيم، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة بعد كل السنين دي.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: تحليل خط يد رمزي، الخلاف التجاري، وشهادته المتأخرة، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وذكرى كمال فضلت مرتبطة بحادثة غير حقيقية، والفاعل الحقيقي فضل طليق رغم مرور كل السنين دي. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "صورة قديمة"

   الغلاف (cover.webp):
   "Photorealistic close-up of an old faded family photograph on a
   wooden table, dusty attic lighting, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (photo-scene1.jpg):
   "Photorealistic shot of a woman cleaning an old dusty photo album
   box in an attic, warm nostalgic lighting, photorealistic, no
   text, no watermark"

   المشهد ٢ (photo-scene2.jpg):
   "Photorealistic close-up of hands flipping through an old family
   photo album, warm nostalgic lighting, photorealistic, no text,
   no watermark"

   المشهد ٣ (photo-scene3.jpg):
   "Photorealistic close-up of faded handwritten text on the back of
   an old photograph, warm desk lamp lighting, photorealistic, no
   text, no watermark"

   المشهد ٤ (photo-scene4.jpg):
   "Photorealistic shot of a woman organizing old documents at a
   desk, warm nostalgic lighting, photorealistic, no text, no
   watermark"

   أدهم (adham.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   outfit, guarded uncomfortable expression, sitting in a living
   room, soft natural lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   وداد (widad.jpg):
   "Photorealistic portrait of an elderly Egyptian woman, elegant
   traditional outfit, thoughtful composed expression, sitting in an
   armchair, warm lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   نعيم (naeem.jpg):
   "Photorealistic portrait of an elderly Egyptian man, formal
   business outfit, nervous guarded expression, standing in an
   office, formal lighting, candid documentary photography style,
   no text, no watermark, photorealistic"

   رمزي (ramzy.jpg):
   "Photorealistic portrait of an elderly Egyptian man, simple
   casual outfit, sorrowful guilty expression, sitting near an old
   camera on a shelf, warm nostalgic lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل ضهر الصورة (photo-back.jpg):
   "Photorealistic extreme close-up of faded handwritten text on old
   photograph paper, forensic evidence photography style, no text,
   no watermark, photorealistic"

   دليل دفتر اليوميات (photo-diary.jpg):
   "Photorealistic close-up of an old worn diary notebook open to a
   handwritten page, warm nostalgic lighting, no text, no watermark,
   photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_OLD_PHOTO;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'ramzy_witness_confession', tag:'من اعتراف رمزي', crit:true, title:'رمزي شاف المواجهة على الشاطئ', img:null,
    short:'رمزي اعترف إنه شاف نعيم يدفع كمال في الميه بعد خناقة',
    full:'بعد إثبات إن الخط على الصورة خطه، رمزي اعترف إنه شاف نعيم وكمال بيتخانقوا على الشاطئ، وشاف نعيم يدفع كمال في الميه قبل الغرق.', unlocked:false, order:90 });
  const r=c.suspects.find(s=>s.id==='childhood_friend_ramzy'); if(r){const q=r.questions.find(q=>q.closesInterrogation); if(q) q.unlockId='ramzy_witness_confession';}
  c.conclusiveEvidenceIds = ['naeem_business_dispute','naeem_last_seen','ramzy_witness_confession'];
  const n=c.suspects.find(s=>s.id==='business_partner_naeem');
  if(n && !n.questions.some(q=>q.closesInterrogation)) n.questions.push({
    q:'رمزي اعترف إنه شاف المواجهة والدَفعة، وإنت آخر واحد كنت مع كمال وعندك خلاف مالي كبير معاه. لسه هتقول إنك سبته كويس؟',
    requires:['naeem_business_dispute','naeem_last_seen','ramzy_witness_confession'], closesInterrogation:true,
    a:'(بيسكت وقت طويل) "اتخانقنا على الفلوس، وأنا دفعته بعصبية. لما وقع في الميه خفت، ورمزي كان شايف. سيبت الكل يصدق إنها حادثة."'
  });
  setTheory0('اعتراف رمزي إنه شاف المواجهة + خلاف نعيم التجاري الواضح مع كمال + كون نعيم آخر شخص اتشاف ماشي معاه قبل الغرق');
  c.endings.good.paragraphs[1] = 'اعتراف رمزي بعد ما اتكشف إنه صاحب الكتابة على الصورة، وخلاف نعيم التجاري، وكون نعيم آخر شخص اتشاف مع كمال قبل الغرق، عملوا سلسلة إثبات كاملة لقصة فضلت مدفونة عشرين سنة.';
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: خلاف نعيم، كونه آخر شخص مع كمال، واعتراف رمزي كشاهد، قبل ما تتهم.';

})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_OLD_PHOTO;
  c.correctSuspectId = 'business_partner_naeem';
  const r = c.suspects.find(s => s.id === 'childhood_friend_ramzy');
  if (r) {
    const q = r.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيصمت طويل) "أنا كتبت الجملة فعلًا لأني شفت خناقة قوية بين نعيم وكمال قرب المية. وقتها خفت أتكلم، وفضلت ساكت السنين دي كلها. اللي شفته يخليني أشك في نعيم، لكن أنا ما شفتش لحظة الغرق نفسها بوضوح."';
    }
  }
  const n = c.suspects.find(s => s.id === 'business_partner_naeem');
  if (n) {
    const q = n.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتضايق) "اتخانقنا على الفلوس فعلًا وكنت آخر واحد معاه. لكن رمزي نفسه بيقول إنه ما شافش لحظة الغرق بوضوح. لو هتتهمني لازم تثبت أكتر من كده."';
    }
  }
  c.conclusiveEvidenceIds = ['naeem_business_dispute','naeem_last_seen','handwriting_match_ramzy'];
  c.conclusiveRequired = 3;
  if (c.handwritingPuzzle) {
    c.handwritingPuzzle.resultText = 'الخط على ظهر الصورة بيتطابق مع دفتر رمزي. ده يثبت إنه صاحب الملاحظة القديمة، لكنه يحوله لشاهد على الشبهة لا للقاتل تلقائيًا.';
  }
})();
