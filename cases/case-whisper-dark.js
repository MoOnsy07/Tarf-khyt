/* ============================================================
   بيانات قضية: همسة في الظلام
   شاب بيختفي من رحلة عمل، وعائلته بتستلم رسالة صوتية منه
   "بيطمنهم". لكن التسجيل مش زي ما هو شكله، وتحليله بيفتح باب
   لنصب عائلي مؤلم.
   ============================================================ */

const IMG_BASE_WHISPERDARK = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/whisper-dark/';

const CASE_WHISPER_DARK = {
  id: 'whisper-dark',
  title: 'همسة في الظلام',
  caseNo: 'CASE 075',
  subtitle: 'مدينة ساحلية، الإسكندرية',
  coverImg: IMG_BASE_WHISPERDARK + 'cover.webp',
  difficulty: 'صعبة',
  estMinutes: 54,
  investigationPoints: 25,
  teaser: 'شاب بيختفي فجأة من رحلة عمل، وعائلته بتستلم رسالة صوتية بصوته "بيطمنهم إنه بخير ومسافر لوقت". لكن تحليل الموجة الصوتية للتسجيل بيكشف إنه مجمّع من مقاطع مختلفة، مش محادثة حقيقية واحدة.',

  isPremium: false,
  categories: ['disappearance', 'fraud', 'family'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_WHISPERDARK + 'cover.webp',
    heroCaption: 'CASE 075 — الرسالة اللي مافيهاش صاحبها',
    text1: 'الشاب "معتز" اختفى فجأة أثناء رحلة عمل قصيرة للإسكندرية، ومحدش قدر يتواصل معاه لأيام. بعد قلق كبير من عائلته، استلموا رسالة صوتية بصوته بيقول إنه بخير ومسافر لظروف شخصية ومحتاج وقت لوحده.',
    text2: 'أخته "دينا" مش مقتنعة بالرسالة، لأن نبرة الصوت حسّت إنها غريبة شوية، وكأن الجمل مقطوعة من سياقات مختلفة. طلبت تحليل صوتي متخصص قبل ما العائلة تصدق الرسالة وتوقف البحث عنه.',
    meta: [
      { label:'المفقود', value:'معتز — شاب في رحلة عمل قصيرة' },
      { label:'الرسالة المستلمة', value:'تسجيل صوتي بصوته يطمئن العائلة' },
      { label:'الشك الأول', value:'الرسالة أصلية ومعتز اختار الاختفاء بإرادته' },
      { label:'طلب التحقيق', value:'دينا، أخت معتز' },
    ],
  },

  prologue: [
    { scene:'المشهد ١ — قبل السفر', img: IMG_BASE_WHISPERDARK + 'scene1.jpg',
      text:'معتز بيودّع عائلته قبل رحلة عمل قصيرة للإسكندرية، متحمس وطبيعي زي أي سفرة عادية.' },
    { scene:'المشهد ٢ — انقطاع التواصل', img: IMG_BASE_WHISPERDARK + 'scene2.jpg',
      text:'التواصل بيتقطع فجأة بعد يوم من وصوله، والعائلة بتحاول تتواصل معاه من غير رد.' },
    { scene:'المشهد ٣ — الرسالة الصوتية', img: IMG_BASE_WHISPERDARK + 'scene3.jpg',
      text:'العائلة بتستلم رسالة صوتية بصوت معتز، بتقول إنه بخير ومحتاج وقت لوحده، والجميع بيتنفس الصعداء.' },
    { scene:'المشهد ٤ — الشك', img: IMG_BASE_WHISPERDARK + 'scene4.jpg',
      text:'دينا بتسمع الرسالة كذا مرة، وبتحس إن نبرة الصوت وترتيب الجمل فيهم حاجة مش طبيعية.' },
  ],

  suspects: [
    {
      id:'cousin_ashraf', name:'أشرف', role:'ابن عم معتز، ورث معاه شركة عائلية', img: IMG_BASE_WHISPERDARK + 'ashraf.jpg', avatarEmoji:'💼',
      alibi:'قال إنه كان في القاهرة طول الوقت، بعيد تمامًا عن الإسكندرية وقت اختفاء معتز.',
      loseMsg:null,
      questions:[
        { q:'كان فيه خلاف بينك وبين معتز؟', unlockId:'business_conflict_hint',
          a:'"كان فيه خلاف على إدارة الشركة العائلية، معتز عايز يبيع حصته وأنا رافض، بس الخلاف كان بسيط."' },
        { q:'استفدت من اختفاء معتز بأي شكل؟', requires:['business_conflict_hint'],
          a:'"لأ خالص، اختفاؤه عطّل قرارات كتير في الشركة، ده ضرني أكتر ما نفعني."' },
      ],
      confrontations:{}
    },
    {
      id:'business_partner_wael', name:'وائل', role:'شريك عمل لمعتز في مشروع خاص', img: IMG_BASE_WHISPERDARK + 'wael.jpg', avatarEmoji:'📞',
      alibi:'قال إنه كان في الإسكندرية في نفس وقت رحلة معتز لأسباب عمل منفصلة.',
      questions:[
        { q:'كنت في الإسكندرية في نفس وقت معتز؟', unlockId:'wael_same_city',
          a:'"أيوه، كان عندي اجتماعات عمل هناك في نفس الفترة، صدفة بسيطة."' },
        { q:'كان فيه خلاف مالي بينكم في المشروع المشترك؟', requires:['wael_same_city'], unlockId:'wael_financial_dispute',
          a:'"معتز كان مطالبني بحصة أرباح كبيرة، وكنت محتاج وقت أدبّر الموضوع ده."' },
        { q:'سجل هاتفك بيوضح مكالمات متكررة لمعتز في الساعات اللي سبقت انقطاع تواصله — تفسر ده إزاي؟', unlockId:'wael_call_pattern', requires:['wael_financial_dispute'], closesInterrogation:true,
          a:'(بيتردد) "كنت بحاول أقنعه ياخد جزء من فلوسه بدل المبلغ الكامل، مكنتش متوقع الموضوع يوصل للي وصله."' },
      ],
      confrontations:{
        business_conflict_hint:'الخلاف ده كان بيني وبين معتز، مالوش علاقة بيا أنا.',
      }
    },
    {
      id:'sister_dina', name:'دينا', role:'أخت معتز، طلبت التحقيق', img: IMG_BASE_WHISPERDARK + 'dina-sister.jpg', avatarEmoji:'🔍',
      alibi:'كانت في القاهرة طول الوقت، بعيد عن الإسكندرية تمامًا.',
      questions:[
        { q:'إيه اللي خلاكِ تشكي في الرسالة الصوتية؟', unlockId:'dina_voice_concern',
          a:'"نبرة صوته حسّيتها غريبة شوية، وترتيب الجمل حسيته مش طبيعي، وكأنه مش بيتكلم في محادثة واحدة متصلة."' },
        { q:'معتز كان بيكلمك عن مشاكله المالية أو الشخصية قبل السفر؟', unlockId:'dina_prior_calls',
          a:'"أيوه، قال لي إنه متوتر من خلاف مالي مع وائل، وإنه كان مصمم ياخد حقه كامل قبل ما يسافر."' },
      ],
      confrontations:{}
    },
  ],

  evidence: [
    { id:'voice_message_original', tag:'من البلاغ الأصلي', crit:false, title:'الرسالة الصوتية المستلمة', img:null,
      short:'رسالة صوتية بصوت معتز تطمئن العائلة على اختفائه الطوعي',
      full:'الرسالة الصوتية الأصلية اللي استلمتها العائلة بصوت معتز، بتقول إنه بخير ومحتاج وقت لوحده، وطلب عدم البحث عنه لفترة.',
      unlocked:true, order:1 },

    { id:'business_conflict_hint', tag:'من استجواب أشرف', crit:false, title:'خلاف الشركة العائلية', img:null,
      short:'أشرف أكد وجود خلاف بسيط على إدارة الشركة العائلية',
      full:'أشرف أكد وجود خلاف بينه وبين معتز على إدارة الشركة العائلية، لكنه وصفه بالبسيط ومش سبب كافي لأي أذى.',
      unlocked:false, order:2 },

    { id:'wael_same_city', tag:'من استجواب وائل', crit:false, title:'تواجد وائل في نفس المدينة', img:null,
      short:'وائل كان في الإسكندرية في نفس فترة رحلة معتز',
      full:'وائل أكد إنه كان في الإسكندرية في نفس فترة رحلة معتز لأسباب عمل، وصفها كصدفة بسيطة.',
      unlocked:false, order:3 },

    { id:'dina_voice_concern', tag:'من استجواب دينا', crit:true, title:'شك دينا في طبيعة الرسالة', img: IMG_BASE_WHISPERDARK + 'evidence-phone.jpg',
      short:'دينا لاحظت نبرة غريبة وترتيب جمل مش طبيعي في الرسالة',
      full:'دينا كشفت إنها لاحظت نبرة صوت غريبة وترتيب جمل مش طبيعي في الرسالة الصوتية، حسّت إنها مش محادثة واحدة متصلة.',
      unlocked:false, order:4 },

    { id:'wael_financial_dispute', tag:'من استجواب وائل', crit:false, title:'خلاف مالي حقيقي مع معتز', img:null,
      short:'معتز كان بيطالب وائل بحصة أرباح كبيرة من مشروع مشترك',
      full:'وائل اعترف إن معتز كان بيطالبه بحصة أرباح كبيرة من مشروعهم المشترك، وإنه كان محتاج وقت "يدبّر" الموضوع ده.',
      unlocked:false, order:5 },

    { id:'dina_prior_calls', tag:'من استجواب دينا', crit:false, title:'توتر معتز قبل السفر', img:null,
      short:'معتز كان متوتر من خلافه المالي مع وائل قبل السفر',
      full:'دينا كشفت إن معتز كان متوتر من خلافه المالي مع وائل قبل السفر مباشرة، وكان مصمم ياخد حقه كامل.',
      unlocked:false, order:6 },

    { id:'wael_call_pattern', tag:'من سجل الاتصالات', crit:true, title:'مكالمات وائل المتكررة قبل الانقطاع', img: IMG_BASE_WHISPERDARK + 'evidence-callrecord.jpg',
      short:'سجل هاتف وائل يوضح مكالمات متكررة لمعتز قبل انقطاع تواصله',
      full:'سجل هاتف وائل بيوضح مكالمات متكررة لمعتز في الساعات اللي سبقت انقطاع تواصله بشكل كامل، بما يتجاوز مجرد صدفة تواجد في نفس المدينة.',
      unlocked:false, order:7 },

    { id:'audio_splice_found', tag:'من التحليل الصوتي', crit:true, title:'اكتشاف تجميع مقاطع صوتية', img: IMG_BASE_WHISPERDARK + 'evidence-waveform.jpg',
      short:'التحليل يثبت إن الرسالة مجمّعة من مقاطع صوتية قديمة لمعتز',
      full:'التحليل الصوتي المتخصص أثبت إن الرسالة مش محادثة واحدة متصلة — هي مجمّعة من مقاطع صوتية قديمة لمعتز من مكالمات ورسايل سابقة، اتقصت ورُكّبت مع بعض بعناية.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: {
    enabled: true,
    tabLabel: 'تناقضات',
    introText: 'قارن وصف وائل لتواجده في الإسكندرية كـ"صدفة بسيطة" بسجل مكالماته المتكررة لمعتز قبل انقطاع تواصله. فيه تناقض بين "الصدفة" والنمط الفعلي للتواصل.',
    resultText: 'التناقض واضح: وائل وصف تواجده كصدفة بسيطة، لكن سجل مكالماته المتكررة لمعتز في نفس الفترة بيوضح تواصل مكثف ومقصود، مش تزامن عرضي.',
    resultEvidenceIds: ['wael_call_pattern'],
    statements: [
      { id:'st1', text:'"أيوه، كان عندي اجتماعات عمل هناك في نفس الفترة، صدفة بسيطة."', source:'وائل — في الاستجواب' },
      { id:'st2', text:'سجل هاتف وائل يوضح مكالمات متكررة لمعتز قبل انقطاع تواصله.', source:'دليل: سجل الاتصالات' },
      { id:'st3', text:'"نبرة صوته حسّيتها غريبة شوية."', source:'دينا — في الاستجواب' },
      { id:'st4', text:'"اختفاؤه عطّل قرارات كتير في الشركة، ده ضرني أكتر ما نفعني."', source:'أشرف — في الاستجواب' },
    ],
    correctPair: ['st1','st2'],
  },

  timelinePuzzle: { enabled:false },
  codeLockPuzzle: { enabled:false },
  matchPuzzle: { enabled:false },
  cipherPuzzle: { enabled:false },
  cameraPuzzle: { enabled:false },
  alibiGridPuzzle: { enabled:false },
  floorPlanPuzzle: { enabled:false },
  dnaLabPuzzle: { enabled:false },
  polygraphPuzzle: { enabled:false },
  handwritingPuzzle: { enabled:false },
  witnessReliabilityPuzzle: { enabled:false },
  ledgerAuditPuzzle: { enabled:false },

  audioPuzzle: {
    enabled: true,
    tabLabel: 'تحليل صوتي',
    introText: 'شغّل الرسالة الصوتية وحلل الموجة الصوتية. دور على الجزء اللي نمط الضوضاء والقص فيه بيتطابق مع مقطع من مكالمة قديمة موثقة — ده اللي هيثبت إن الرسالة متجمعة من مصادر مختلفة.',
    duplicateSourceRange: [8, 24],
    duplicateTargetRange: [48, 64],
    matchStart: 48,
    matchEnd: 64,
    resultText: 'وصلت للمقطع الصح. الجزء ده مطابق لمقطع من مكالمة قديمة موثقة لمعتز، ومع نقاط القص الواضحة بين الجمل بقى مؤكد إن الرسالة مش محادثة حقيقية واحدة.',
    resultEvidenceIds: ['audio_splice_found'],
  },

  evidenceCombinations: [
    { parts:['dina_voice_concern','wael_call_pattern'], resultId:'audio_splice_found' },
  ],

  investigationActions: [
    {
      id:'crosscheck_old_recordings', kind:'مراجعة تسجيلات قديمة', label:'قارن الرسالة بتسجيلات صوتية قديمة لمعتز',
      description:'راجع مكالمات ورسايل صوتية قديمة موثقة لمعتز، وقارنها بمقاطع الرسالة المشكوك فيها.',
      requires:['dina_voice_concern','wael_financial_dispute'], resultEvidenceIds:['audio_splice_found'],
      successText:'المقارنة أكدت تطابق أجزاء من الرسالة مع تسجيلات صوتية قديمة لمعتز من مصادر مختلفة.'
    },
  ],

  correctSuspectId: 'business_partner_wael',
  conclusiveEvidenceIds: ['audio_splice_found', 'wael_call_pattern', 'wael_financial_dispute'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن وائل هو اللي وراء الرسالة المزيّفة؟',
        options: [
          { id:'a', text:'التحليل الصوتي أثبت إن الرسالة مجمّعة من تسجيلات قديمة + سجل مكالماته المتكررة قبل انقطاع التواصل + خلافه المالي المباشر مع معتز' },
          { id:'b', text:'لأنه كان في نفس المدينة وقت الاختفاء وده كافي وحده، بس ده لوحده مايكفيش كدليل قاطع من غير ربط تقني مباشر' },
          { id:'c', text:'لأنه كان متردد وقت الاستجواب، وده انطباع شخصي مش دليل مادي أو شهادة مباشرة' },
        ],
        correctOptionId:'a',
      },
      {
        id:'whynotashraf',
        label:'ليه أشرف كان بريء رغم خلافه مع معتز على الشركة؟',
        options: [
          { id:'a', text:'التحليل الصوتي والتواصل المريب ربطوا بوائل تحديدًا، ومفيش أي دليل يربط أشرف بالرسالة المزيّفة أو بأي تواصل مباشر مع معتز في الإسكندرية' },
          { id:'b', text:'لأن اختفاء معتز ضرّه ماديًا وده كافي لبراءته تلقائيًا، وده افتراض عكسي خاطئ لا يستبعد التورط' },
          { id:'c', text:'لأنه كان في القاهرة وده افتراض جغرافي عام، مش نتيجة تحقيق فعلي في وسائل التواصل عن بعد' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إدانة', title:'الرسالة اللي فضحت صانعها',
      paragraphs:[
        'وائل، تحت ضغط خلاف مالي كبير مع معتز على حصة أرباح مشروعهم المشترك، جمّع رسالة صوتية مزيفة من مقاطع قديمة موثقة لصوت معتز، عشان يوهم العائلة إنه اختفى بإرادته ويكسب وقت إضافي يتصرف فيه.',
        'اللي قفل الدائرة كان التحليل الصوتي اللي كشف تجميع المقاطع، وسجل مكالماته المتكررة لمعتز قبل انقطاع تواصله، وخلافه المالي المباشر اللي وفّر الدافع الحقيقي.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك صح، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية وائل، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا وتحدد مصير معتز الحقيقي.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: التحليل الصوتي، سجل المكالمات، والخلاف المالي، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، والحقيقة الكاملة عن مصير معتز فضلت مجهولة. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "همسة في الظلام"

   الغلاف (cover.webp):
   "Photorealistic shot of a smartphone screen showing a voice
   message waveform on a dark background, documentary photography
   style, no text, no watermark, photorealistic"

   المشهد ١ (scene1.jpg):
   "Photorealistic shot of a young man saying goodbye to his family
   at a train station, warm lighting, photorealistic, no text, no
   watermark"

   المشهد ٢ (scene2.jpg):
   "Photorealistic shot of a worried family member repeatedly
   calling a phone with no answer, photorealistic, no text, no
   watermark"

   المشهد ٣ (scene3.jpg):
   "Photorealistic shot of a family listening to a phone speaker
   together with relief on their faces, photorealistic, no text, no
   watermark"

   المشهد ٤ (scene4.jpg):
   "Photorealistic shot of a woman replaying a voice message on her
   phone with a suspicious expression, photorealistic, no text, no
   watermark"

   الشخصيات:

   أشرف (ashraf.jpg):
   "Photorealistic portrait of a middle-aged Egyptian businessman,
   composed expression, office background, photorealistic, no text,
   no watermark"

   وائل (wael.jpg):
   "Photorealistic portrait of a nervous middle-aged Egyptian man in
   business casual attire, photorealistic, no text, no watermark"

   دينا (dina-sister.jpg):
   "Photorealistic portrait of a concerned young Egyptian woman,
   thoughtful expression, photorealistic, no text, no watermark"

   أدلة:
   evidence-phone.jpg: "Photorealistic close-up of a smartphone
   screen playing a voice message with waveform visualization,
   photorealistic, no text, no watermark"
   evidence-callrecord.jpg: "Photorealistic close-up of a phone call
   log screen with multiple highlighted entries, photorealistic, no
   text, no watermark"
   evidence-waveform.jpg: "Photorealistic close-up of an audio
   waveform analysis on a computer screen with highlighted matching
   segments, photorealistic, no text, no watermark"
   ============================================================ */
