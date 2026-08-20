/* ============================================================
   بيانات قضية: خيط أحمر
   قضية قتل — مصممة أزياء بتلاقي عارضة مقتولة في الأتيليه بتاعها
   ليلة قبل عرض الأزياء الكبير، ودليل DNA بيقود لمفاجأة.
   ============================================================ */

const IMG_BASE_REDTHREAD = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/red-thread/';

const CASE_RED_THREAD = {
  id: 'red-thread',
  title: 'خيط أحمر',
  caseNo: 'CASE 030',
  subtitle: 'أتيليه "لمسة"، الزمالك، ليلة قبل العرض الكبير',
  coverImg: IMG_BASE_REDTHREAD + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 38,
  investigationPoints: 22,
  price: '15 جنيه',
  oldPrice: '30 جنيه',
  discountLabel: 'خصم 50%',
  teaser: 'عارضة أزياء بتتلاقي مقتولة في الأتيليه ليلة قبل عرض حاسم لمصممة صاعدة. خيط أحمر من قماش نادر هو الدليل الوحيد اللي ممكن يفضح القاتل.',

  isPremium: true,
  premiumTier: 'B',
  categories: ['murder', 'fashion'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_REDTHREAD + 'cover.webp',
    heroCaption: 'CASE 030 — ليلة قبل العرض بساعات',
    text1: 'مصممة الأزياء الصاعدة "نور فتحي" كانت على بعد ساعات من أهم عرض في مشوارها. العارضة الرئيسية بتاعتها، "ياسمين"، اتلاقت مقتولة جوه الأتيليه بين مانيكانات نصف مكسية بفستان المجموعة الجديدة. مفيش آثار اقتحام، والباب كان مقفول من الداخل.',
    text2: 'الدليل الوحيد اللي لقاه المحقق الأول كان خيط أحمر من قماش نادر جدًا، مستورد خصيصًا للمجموعة، عالق عند طرف فستان ياسمين. القماش ده موجود بس عند خمسة أشخاص بالظبط كانوا في الأتيليه الليلة دي. نور طلبت منك تحل القضية بسرعة وسرية قبل ما الخبر يوصل للصحافة ويهد مشوارها كله.',
    meta: [
      { label:'المجني عليه', value:'ياسمين — العارضة الرئيسية للمجموعة' },
      { label:'مكان الحادثة', value:'أتيليه لمسة، جناح البروفات' },
      { label:'الدليل المحوري', value:'خيط أحمر من قماش نادر' },
      { label:'طلب التحقيق', value:'نور فتحي، مصممة المجموعة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — البروفة الأخيرة',
      img: IMG_BASE_REDTHREAD + 'redthread-scene1.jpg',
      text:'الأتيليه مزدحم بالخياطين والعارضات، آخر تعديلات على الفساتين قبل العرض بيوم واحد بس، والتوتر واضح على وش الجميع.'
    },
    {
      scene:'المشهد ٢ — الاختفاء',
      img: IMG_BASE_REDTHREAD + 'redthread-scene2.jpg',
      text:'ياسمين بتختفي من جناح البروفات لمدة نص ساعة تقريبًا، محدش لاحظ غيابها وسط الزحمة والاستعجال.'
    },
    {
      scene:'المشهد ٣ — الاكتشاف',
      img: IMG_BASE_REDTHREAD + 'redthread-scene3.jpg',
      text:'واحدة من الخياطات بتلاقي ياسمين ملقاة بين المانيكانات، الفستان اللي كانت بتقيسه ممزق من كتفه، والباب مقفول من جوه.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_REDTHREAD + 'redthread-scene4.jpg',
      text:'المحقق الأول بيلاقي خيط أحمر صغير عالق عند طرف فستان ياسمين، من نفس القماش النادر المستخدم في المجموعة الجديدة بس.'
    },
  ],

  suspects: [
    {
      id:'designer_nour', name:'نور فتحي', role:'مصممة المجموعة، صاحبة الأتيليه', img: IMG_BASE_REDTHREAD + 'nour.jpg', avatarEmoji:'✂️',
      alibi:'قالت إنها كانت في مكتبها بتراجع قائمة الدعوة النهائية للعرض.',
      questions:[
        { q:'علاقتك بياسمين كانت إيه بالظبط؟',
          a:'"كانت العارضة المفضلة عندي، بنتعاون من زمان. مكنش بينا أي مشكلة شخصية."' },
        { q:'حد من غير الخياطين كان له وصول للقماش الأحمر النادر ده؟', unlockId:'fabric_access_list',
          a:'"القماش ده غالي جدًا ومحدود، بس أربع أو خمس ناس في الأتيليه كانوا يقدروا يوصلوله."' },
      ]
    },
    {
      id:'stylist_hana', name:'هنا', role:'ستايلست المجموعة، مسؤولة عن الفساتين', img: IMG_BASE_REDTHREAD + 'hana.jpg', avatarEmoji:'🧵',
      alibi:'قالت إنها كانت بتجهز إكسسوارات الفساتين في الأوضة المجاورة.',
      questions:[
        { q:'كان عندك أي خلاف مع ياسمين على تفاصيل الفستان؟', unlockId:'dress_dispute',
          a:'"ياسمين كانت بتشتكي إن الفستان ضيق عليها وطلبت تعديل في اللحظة الأخيرة، ده أزعجني شوية بس مش أكتر من كده."' },
        { q:'إنتِ كنتِ في جناح البروفات وقت اختفاء ياسمين؟', unlockId:'hana_seen_leaving',
          a:'"دخلت أجيب دبابيس، خرجت بسرعة، مكنتش هناك أكتر من دقيقتين."' },
      ]
    },
    {
      id:'model_reem', name:'ريم', role:'عارضة احتياطية للمجموعة', img: IMG_BASE_REDTHREAD + 'reem.jpg', avatarEmoji:'👗',
      alibi:'قالت إنها كانت بتتمرن على المشية في الصالة التانية طول الوقت.',
      questions:[
        { q:'إيه اللي كنتِ هتكسبيه لو ياسمين ما لبستش الفستان الرئيسي؟', unlockId:'reem_motive',
          a:'"هصدقك، كنت هبقى العارضة الرئيسية بدالها. بس ده مش سبب أقتل عشانه."' },
        { q:'لمستي القماش الأحمر في وقت من الأوقات؟', requires:['reem_motive'], unlockId:'reem_fabric_contact',
          a:'(بتتردد) "لمسته وأنا بساعد في تعليق الفساتين، زي أي حد تاني."' },
      ]
    },
    {
      id:'investor_kamal', name:'كمال', role:'ممول المجموعة، له مصلحة مالية كبيرة في نجاح العرض', img: IMG_BASE_REDTHREAD + 'kamal.jpg', avatarEmoji:'💰',
      alibi:'قال إنه كان بيكلم موزعين على التليفون في السيارة قدام الأتيليه.',
      questions:[
        { q:'ياسمين كانت عارفة حاجة عن استثمارك ممكن تضرك؟', unlockId:'kamal_secret',
          a:'(بيتلعثم) "مش فاهم قصدك، أنا بس ممول عادي للمجموعة."' },
        { q:'شهود أكدوا إنك دخلت الأتيليه من الباب الخلفي وقت اختفاء ياسمين، مش قاعد في عربيتك زي ما قلت — عايز تفسر؟', requires:['kamal_secret','fabric_access_list'], closesInterrogation:true,
          a:'(بيسكت شوية) "ياسمين كانت لقت مستندات بتوضح إني بستخدم فلوس التمويل في حاجة تانية، هددتني إنها هتفضحني قدام نور والصحافة الليلة نفسها. دخلت أقنعها تسكت، الموضوع خرج عن السيطرة."' },
      ]
    },
  ],

  evidence: [
    { id:'red_thread_fabric', tag:'من مسرح الجريمة', crit:true, title:'خيط أحمر من قماش نادر', img: IMG_BASE_REDTHREAD + 'redthread-fabric.jpg',
      short:'قماش مستورد نادر، محدود الوصول لعدد قليل من الناس',
      full:'الخيط الأحمر اللي اتلاقى عند طرف فستان ياسمين من نفس القماش النادر المستخدم في المجموعة الجديدة، ومحدود جدًا مين يقدر يوصله.',
      unlocked:true, order:1 },

    { id:'fabric_access_list', tag:'من استجواب نور', crit:false, title:'قائمة أصحاب الوصول للقماش', img:null,
      short:'أربع أو خمس أشخاص بس كان عندهم وصول للقماش النادر',
      full:'نور أكدت إن القماش الأحمر النادر ده محدود جدًا، وعدد قليل جدًا من فريق العمل والممولين كان عندهم وصول ليه.',
      unlocked:false, order:2 },

    { id:'dress_dispute', tag:'من استجواب هنا', crit:false, title:'خلاف على تعديل الفستان', img:null,
      short:'ياسمين طلبت تعديل مفاجئ في اللحظة الأخيرة',
      full:'هنا أكدت إن ياسمين كانت مستاءة من ضيق الفستان وطلبت تعديل عاجل، وده سبب توتر بسيط بينهم قبل الحادثة.',
      unlocked:false, order:3 },

    { id:'hana_seen_leaving', tag:'من شهادة خياطة', crit:false, title:'هنا خرجت من جناح البروفات بسرعة', img:null,
      short:'خياطة شافتها خارجة في وقت قريب من اختفاء ياسمين',
      full:'واحدة من الخياطات أكدت إنها شافت هنا خارجة من جناح البروفات بسرعة في نفس التوقيت التقريبي لاختفاء ياسمين، بس من غير أي دليل تاني يربطها بالجريمة.',
      unlocked:false, order:4 },

    { id:'reem_motive', tag:'من استجواب ريم', crit:false, title:'دافع ريم المحتمل', img:null,
      short:'ريم كانت هتاخد مكان ياسمين كعارضة رئيسية',
      full:'ريم اعترفت إنها كانت هتستفيد لو ياسمين معملتش عرض الأزياء، بس نفت أي علاقة لها بالجريمة.',
      unlocked:false, order:5 },

    { id:'reem_fabric_contact', tag:'من استجواب ريم', crit:false, title:'ريم لمست القماش الأحمر', img:null,
      short:'تفسير عادي لوصولها للقماش أثناء الشغل',
      full:'ريم أكدت إنها لمست القماش الأحمر أثناء مساعدتها في تعليق الفساتين، وده تفسير منطقي مش مرتبط بالجريمة مباشرة.',
      unlocked:false, order:6 },

    { id:'dna_sample_thread', tag:'من تحليل المعمل', crit:true, title:'تحليل DNA على الخيط الأحمر', img: IMG_BASE_REDTHREAD + 'redthread-dna.jpg',
      short:'أثر DNA غير مكتمل على الخيط يحتاج مطابقة',
      full:'المعمل استخرج أثر DNA جزئي من الخيط الأحمر، لسه ناقص مطابقة نهائية مع عينات المشتبه بيهم لتحديد صاحبه بدقة.',
      unlocked:false, order:7 },

    { id:'kamal_secret', tag:'من استجواب كمال', crit:true, title:'سر مالي خطير', img:null,
      short:'كمال بيتلعثم في سؤال عن استثماره',
      full:'كمال بيتلعثم بشكل واضح لما اتسأل عن أي حاجة ممكن ياسمين تكون عارفاها عن استثماره في المشروع.',
      unlocked:false, order:8 },

    { id:'kamal_backdoor_seen', tag:'من شهادة أمن', crit:true, title:'كمال دخل من الباب الخلفي', img: IMG_BASE_REDTHREAD + 'redthread-cam.jpg',
      short:'رجل أمن أكد دخول كمال من الباب الخلفي وقت اختفاء ياسمين',
      full:'رجل الأمن المسؤول عن الباب الخلفي أكد إنه شاف كمال داخل منه في نفس توقيت اختفاء ياسمين تقريبًا، رغم إنه قال إنه كان في عربيته طول الوقت.',
      unlocked:false, order:9 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: { enabled:false },
  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },

  /* ============================================================
     ميكانيزم جديد: dnaLabPuzzle
     اللاعب بيلاقي شرايط DNA جزئية (fragments) لأربع مشتبه بيهم،
     ولازم يركب الشريط الناقص بترتيب صح عشان يطابق العينة الأصلية.
     عند النجاح، بيتفتح دليل حاسم بيربط القاتل الحقيقي بمسرح الجريمة.
     ============================================================ */
  dnaLabPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الـ DNA',
    introText: 'المعمل قدملك أربع شرايط DNA جزئية مأخوذة من المشتبه بيهم، وشريط العينة الأصلية من الخيط الأحمر. رتّب أجزاء الشريط الناقص بنفس ترتيب العينة الأصلية عشان تحصل على مطابقة.',
    resultText: 'المطابقة اتظبطت! الـ DNA على الخيط الأحمر بيتطابق مع عينة كمال بدقة، وده بيأكد وجوده الفعلي في مسرح الجريمة.',
    sampleSequence: ['A', 'T', 'G', 'C', 'T', 'A'],
    suspectSequences: {
      designer_nour:   ['A', 'T', 'G', 'G', 'C', 'A'],
      stylist_hana:    ['A', 'T', 'C', 'C', 'T', 'A'],
      model_reem:      ['A', 'G', 'G', 'C', 'T', 'A'],
      investor_kamal:  ['A', 'T', 'G', 'C', 'T', 'A'],
    },
    correctSuspectId: 'investor_kamal',
    resultEvidenceIds: ['dna_sample_thread'],
  },

  evidenceCombinations: [
    { parts:['kamal_secret','fabric_access_list'], resultId:'kamal_backdoor_seen' },
  ],

  correctSuspectId: 'investor_kamal',
  conclusiveEvidenceIds: ['kamal_secret', 'kamal_backdoor_seen', 'dna_sample_thread'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن كمال هو الفاعل؟',
        options: [
          { id:'a', text:'مطابقة الـ DNA على الخيط الأحمر + شهادة رجل الأمن اللي أثبتت كذب حجة غيابه + سره المالي' },
          { id:'b', text:'لأنه كان متوتر في الاستجواب' },
          { id:'c', text:'لأنه ممول المشروع وده يكفي كدليل' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كان السبب الحقيقي وراء الجريمة؟',
        options: [
          { id:'a', text:'ياسمين اكتشفت إن كمال بيستخدم فلوس التمويل في حاجة تانية غير المتفق عليه، وهددته بالفضيحة، فحاول يسكتها والموضوع خرج عن السيطرة' },
          { id:'b', text:'كمال كان بيحب ياسمين ورفضته' },
          { id:'c', text:'خلاف بسيط على تصميم الفستان' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'CASE CLOSED', badgeLabel:'CASE CLOSED — CONVICTION', title:'خيط واحد كفى لفضح الحقيقة',
      paragraphs:[
        'كمال كان بيستخدم فلوس تمويل المجموعة في استثمارات شخصية خطيرة من غير علم نور. ياسمين لقت مستندات بالصدفة تكشف الموضوع، وهددته إنها هتفضحه قدام نور والصحافة ليلة العرض نفسها. حاول يقنعها تسكت، الموضوع اتصعّد، وانتهى بمقتلها.',
        'مطابقة الـ DNA على الخيط الأحمر، وشهادة رجل الأمن اللي كذّبت حجة غيابه، وسره المالي اللي حاول يخبيه، كلها أدلة حاصرته وأثبتت وجوده الفعلي في مسرح الجريمة وقت الحادثة.',
      ]
    },
    partial: {
      stamp:'PARTIAL', badgeLabel:'CASE CLOSED — INSUFFICIENT EVIDENCE', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية كمال، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل تلات أدلة من: سره المالي، شهادة رجل الأمن، ومطابقة الـ DNA، قبل ما تتهم.'
    },
    bad: {
      stamp:'UNSOLVED', badgeLabel:'CASE CLOSED — WRONGFUL ACCUSATION', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، وسمعة الأتيليه فضلت ملطخة بتهمة مالهاش أساس، والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "خيط أحمر"

   الغلاف (cover.webp):
   "Photorealistic shot of an elegant fashion atelier at night,
   half-dressed mannequins under dramatic spotlight, a single red
   thread visible on the floor, documentary photography style, no
   text, no watermark, photorealistic"

   المشهد ١ (redthread-scene1.jpg):
   "Photorealistic wide shot of a busy fashion atelier during final
   fitting, tailors and models working under bright lights, tense
   energetic atmosphere, photorealistic, no text, no watermark"

   المشهد ٢ (redthread-scene2.jpg):
   "Photorealistic shot of an empty fitting room corner in a fashion
   atelier, a dress left unattended on a mannequin, dim lighting,
   quiet unsettling atmosphere, photorealistic, no text, no watermark"

   المشهد ٣ (redthread-scene3.jpg):
   "Photorealistic dramatic shot of a fashion atelier fitting area,
   a torn dress on a mannequin, scattered fabric on the floor, dim
   moody lighting, photorealistic, no text, no watermark"

   المشهد ٤ (redthread-scene4.jpg):
   "Photorealistic shot of a forensic investigator examining a small
   red fabric thread with tweezers under a desk lamp, clinical close
   lighting, photorealistic, no text, no watermark"

   نور فتحي (nour.jpg):
   "Photorealistic portrait of a young Egyptian female fashion
   designer, elegant modern outfit, focused determined expression,
   standing in her atelier surrounded by fabric samples, soft studio
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   هنا (hana.jpg):
   "Photorealistic portrait of a young Egyptian female stylist,
   trendy chic outfit, holding fabric swatches, slightly anxious
   expression, atelier lighting, candid documentary photography
   style, no text, no watermark, photorealistic"

   ريم (reem.jpg):
   "Photorealistic portrait of a young Egyptian female fashion
   model, elegant posture, guarded cautious expression, standing
   near a clothing rack, soft atelier lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   كمال (kamal.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male investor,
   sharp formal suit, calculating nervous expression, standing near
   an atelier entrance, dim corridor lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   دليل القماش (redthread-fabric.jpg):
   "Photorealistic extreme close-up of a small red thread of rare
   fabric held with tweezers, forensic evidence photography style,
   no text, no watermark, photorealistic"

   دليل الـ DNA (redthread-dna.jpg):
   "Photorealistic close-up of a DNA analysis printout with a
   partial genetic sequence chart, clinical lab lighting, no text,
   no watermark, photorealistic"

   دليل الكاميرا (redthread-cam.jpg):
   "Photorealistic security camera style still frame of a man
   entering through a back door at night, grainy surveillance
   footage look, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_RED_THREAD;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  addEvidence({ id:'kamal_dna_match', tag:'من مطابقة الـDNA', crit:true, title:'الخيط الأحمر عليه DNA كمال', img:null,
    short:'المطابقة النهائية ربطت الأثر الجيني على الخيط بكمال',
    full:'المعمل أكمل المطابقة، والـDNA الجزئي الموجود على الخيط الأحمر اتطابق مع عينة كمال، وده بيثبت وجوده الفعلي في الأتيليه.', unlocked:false, order:90 });
  c.dnaLabPuzzle.resultEvidenceIds = ['kamal_dna_match'];
  c.conclusiveEvidenceIds = ['kamal_secret','kamal_backdoor_seen','kamal_dna_match'];
  const k=c.suspects.find(s=>s.id==='investor_kamal'); if(k){const q=k.questions.find(q=>q.closesInterrogation); if(q) q.requires=['kamal_secret','kamal_backdoor_seen','kamal_dna_match'];}
  c.endings.partial.hint = 'اجمع على الأقل تلات أدلة من: السر المالي، دخول كمال من الباب الخلفي، ومطابقة الـDNA على الخيط، قبل ما تتهم.';

})();

(() => {
  const s = CASE_RED_THREAD.suspects.find(x => x.id === 'investor_kamal');
  if (s && !s.questions.some(x => x.q === 'ياسمين واجهتك قبل العرض بحاجة تخص حسابات التمويل؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'ياسمين واجهتك قبل العرض بحاجة تخص حسابات التمويل؟', requires:['kamal_secret'], a:'(بيتوتر) "سألت كام سؤال عن المصاريف، بس ماكانش معاها حاجة تثبت أي اتهام."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_RED_THREAD;
  c.evidenceCombinations = [];
  const k = c.suspects.find(s => s.id === 'investor_kamal');
  if (k) {
    const q = k.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيسكت) "دخلت فعلًا أكلم ياسمين لأنها كانت مهدداني بموضوع الفلوس، لكن خرجت وسيبتها. الخيط والـDNA لازم يثبتوا حصل إيه بعد كده بدل ما تعتمدوا على دافعي بس."';
    }
  }
  c.conclusiveEvidenceIds = ['kamal_secret','kamal_backdoor_seen','dna_sample_thread'];
  c.conclusiveRequired = 3;
})();

/* EVIDENCE ROUTE FIX 2026-08-20 */
(() => {
  const c = CASE_RED_THREAD;
  c.investigationActions = c.investigationActions || [];
  if (!c.investigationActions.some(a=>a.id==='lab_red_thread')) c.investigationActions.push({
    id:'lab_red_thread', kind:'معمل جنائي', label:'ابعت الخيط الأحمر للتحليل',
    description:'حلل الأثر الحيوي الموجود على الخيط بدل ما يظهر من الحوار تلقائيًا.',
    requires:['red_thread_fabric'], resultEvidenceIds:['dna_sample_thread'],
    successText:'وصل تقرير التحليل الأولي للخيط الأحمر.'
  });
  if (!c.investigationActions.some(a=>a.id==='check_backdoor')) c.investigationActions.push({
    id:'check_backdoor', kind:'مراجعة مدخل', label:'راجع الباب الخلفي وشهود الحركة',
    description:'تحقق من الحركة خارج المدخل الرئيسي في الفترة الحرجة.',
    requires:['fabric_access_list'], resultEvidenceIds:['kamal_backdoor_seen'],
    successText:'التحريات حددت حركة مهمة عند الباب الخلفي.'
  });
})();
