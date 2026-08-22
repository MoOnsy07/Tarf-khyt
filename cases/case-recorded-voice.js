/* ============================================================
   بيانات قضية: الصوت المسجل
   قضية اختفاء — مذيعة إذاعة بتتهدد برسائل صوتية مجهولة قبل ما
   تختفي فجأة بعد آخر برنامج ليها.
   ============================================================ */

const IMG_BASE_RECORDEDVOICE = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/recorded-voice/';

const CASE_RECORDED_VOICE = {
  id: 'recorded-voice',
  title: 'الصوت المسجل',
  caseNo: 'CASE 036',
  subtitle: 'استوديو إذاعة، وسط البلد',
  coverImg: IMG_BASE_RECORDEDVOICE + 'cover.webp',
  difficulty: 'متوسطة',
  estMinutes: 32,
  investigationPoints: 18,
  teaser: 'مذيعة إذاعة مشهورة بتتلقى رسائل صوتية مجهولة مهددة لمدة أسبوعين، وبعد آخر برنامج ليها بتختفي من غير أثر واضح.',

  isPremium: false,
  categories: ['disappearance', 'mystery'],
  seriesId: null,
  seriesOrder: null,
  seriesTitle: null,

  briefing: {
    heroImg: IMG_BASE_RECORDEDVOICE + 'cover.webp',
    heroCaption: 'CASE 036 — بعد آخر برنامج مباشرة',
    text1: 'المذيعة "دنيا" كانت بتتلقى رسائل صوتية مجهولة على تليفونها الشخصي لمدة أسبوعين، صوت مشوّه بيهددها تسكت عن موضوع معين في برنامجها. بعد آخر حلقة مباشرة، اختفت دنيا من غير ما ترجع بيتها.',
    text2: 'مدير الإذاعة طلب منك تحقق قبل ما القضية تتسرب وتأثر على سمعة الإذاعة. عندك تسجيلات الرسائل المهددة، وقائمة الناس المقربين من دنيا في محيط شغلها.',
    meta: [
      { label:'الضحية', value:'دنيا — مذيعة إذاعية مشهورة' },
      { label:'آخر مكان معروف', value:'استوديو الإذاعة بعد آخر حلقة' },
      { label:'الدليل المحوري', value:'رسائل صوتية مهددة مجهولة' },
      { label:'طلب التحقيق', value:'مدير الإذاعة' },
    ],
  },

  prologue: [
    {
      scene:'المشهد ١ — الرسائل تبدأ',
      img: IMG_BASE_RECORDEDVOICE + 'voice-scene1.jpg',
      text:'دنيا بتستقبل أول رسالة صوتية مجهولة على موبايلها، صوت مشوّه بيهددها بشكل غامض عن موضوع في برنامجها.'
    },
    {
      scene:'المشهد ٢ — آخر حلقة',
      img: IMG_BASE_RECORDEDVOICE + 'voice-scene2.jpg',
      text:'دنيا بتقدّم آخر حلقة ليها، صوتها فيه توتر واضح رغم محاولتها تخفيه أمام الجمهور.'
    },
    {
      scene:'المشهد ٣ — الاختفاء',
      img: IMG_BASE_RECORDEDVOICE + 'voice-scene3.jpg',
      text:'دنيا بتودّع زملاءها بعد الحلقة، بتمشي في ممر الاستوديو، وده آخر مرة حد شافها فيها.'
    },
    {
      scene:'المشهد ٤ — التحقيق',
      img: IMG_BASE_RECORDEDVOICE + 'voice-scene4.jpg',
      text:'مدير الإذاعة بيديك موبايل دنيا فيه الرسائل المهددة، وقائمة زملائها المقربين.'
    },
  ],

  suspects: [
    {
      id:'radio_manager_amgad', name:'أمجد', role:'مدير الإذاعة، طلب التحقيق', img: IMG_BASE_RECORDEDVOICE + 'amgad.jpg', avatarEmoji:'📻',
      accusable:false,
      alibi:'مش متهم، هو اللي طلب التحقيق أصلًا.',
      questions:[
        { q:'دنيا كانت بتقولك حاجة عن موضوع البرنامج المثير للجدل؟',
          a:'"قالتلي إنها بتحضر لموضوع كبير هيفضح فساد في جهة معينة، بس ما قالتليش تفاصيل."' },
        { q:'مين غيرك كان عارف بموضوع الحلقة الجاية؟', unlockId:'episode_topic_leak',
          a:'"المنتج المسؤول عن برنامجها كان عارف التفاصيل كلها."' },
      ]
    },
    {
      id:'producer_karim', name:'كريم', role:'منتج برنامج دنيا', img: IMG_BASE_RECORDEDVOICE + 'karim.jpg', avatarEmoji:'🎙️',
      alibi:'قال إنه كان في غرفة التحكم طول وقت الحلقة وبعدها.',
      questions:[
        { q:'كنت متحمس لموضوع الحلقة الجاية؟', unlockId:'karim_hesitation',
          a:'(بيتردد) "الموضوع كان حساس شوية، حاولت أقنعها تأجله بس هي أصرّت."' },
        { q:'صوتك اتفحص مع الرسائل الصوتية المهددة؟', requires:['karim_hesitation'], unlockId:'voice_analysis_karim',
          a:'"طبعًا مش أنا، ده صوت مشوّه أصلاً مش هتقدروا تحددوا صاحبه بسهولة."' },
      ]
    },
    {
      id:'exhusband_seif', name:'سيف', role:'زوج دنيا السابق', img: IMG_BASE_RECORDEDVOICE + 'seif.jpg', avatarEmoji:'💔',
      alibi:'قال إنه كان في مدينة تانية وقت اختفاء دنيا.',
      questions:[
        { q:'علاقتك بدنيا كانت إيه بعد الطلاق؟', unlockId:'seif_grudge',
          a:'"مكنتش سهلة، كان فيه خلافات مالية على حضانة ابننا لسه ما اتحلتش."' },
        { q:'شاهد أكد إنك كنت في المدينة نفسها ليلة اختفائها — عايز تفسر؟', requires:['seif_grudge'], unlockId:'seif_seen_city',
          a:'(بيتلعثم) "جيت أشوف ابني بس، مكنتش قاصد أقرب منها."' },
      ]
    },
    {
      id:'corrupt_official_hany', name:'هاني', role:'مسؤول حكومي، موضوع الحلقة كان هيفضحه', img: IMG_BASE_RECORDEDVOICE + 'hany.jpg', avatarEmoji:'🕴️',
      alibi:'قال إنه كان في اجتماع رسمي طول اليوم.',
      questions:[
        { q:'موضوع الحلقة كان هيأثر عليك إزاي؟', unlockId:'hany_exposure',
          a:'"دنيا كانت هتفضح تلاعب في مناقصة حكومية أنا كنت طرف فيها، ده كان هيدمر مسيرتي المهنية بالكامل."' },
        { q:'الرسائل الصوتية المهددة اتحللت واتطابقت مع تسجيلات صوتك الرسمية في مؤتمرات سابقة — عايز تفسر؟', requires:['hany_exposure','voice_analysis_karim','episode_topic_leak'], closesInterrogation:true,
          a:'(بيصمت طويل) "حاولت أخوفها تسكت بس رفضت. بعد آخر حلقة قابلتها في الممر، هددتها بشكل مباشر أكتر، وأخدتها معايا عشان أمنعها من نشر أي حاجة تانية."' },
      ]
    },
  ],

  evidence: [
    { id:'threatening_voice_messages', tag:'من موبايل دنيا', crit:true, title:'رسائل صوتية مهددة', img: IMG_BASE_RECORDEDVOICE + 'voice-messages.jpg',
      short:'رسائل صوتية مشوهة بتهدد دنيا تسكت عن موضوع معين',
      full:'الرسائل الصوتية المجهولة على موبايل دنيا بتهددها بشكل مباشر تسكت عن موضوع في برنامجها، بصوت مشوّه صعب تحديد صاحبه بسهولة.',
      unlocked:true, order:1 },

    { id:'episode_topic_leak', tag:'من استجواب أمجد', crit:false, title:'تسريب موضوع الحلقة', img:null,
      short:'المنتج كان عارف تفاصيل موضوع الحلقة الجاية',
      full:'أمجد أكد إن المنتج كريم كان عارف تفاصيل موضوع الحلقة الجاية المثير للجدل بشكل كامل.',
      unlocked:false, order:2 },

    { id:'karim_hesitation', tag:'من استجواب كريم', crit:false, title:'تردد كريم على الموضوع', img:null,
      short:'كريم حاول يقنع دنيا تأجل الموضوع',
      full:'كريم اعترف إنه حاول يقنع دنيا تأجل موضوع الحلقة الحساس، بس هي أصرّت على تقديمه.',
      unlocked:false, order:3 },

    { id:'voice_analysis_karim', tag:'من تحليل صوتي أولي', crit:false, title:'استبعاد صوت كريم', img:null,
      short:'تحليل أولي بيستبعد صوت كريم من الرسائل',
      full:'التحليل الصوتي الأولي بيستبعد صوت كريم كمصدر للرسائل المهددة، رغم تردده الواضح في الاستجواب.',
      unlocked:false, order:4 },

    { id:'seif_grudge', tag:'من استجواب سيف', crit:false, title:'خلافات ما بعد الطلاق', img:null,
      short:'خلافات مالية على حضانة الابن',
      full:'سيف اعترف بوجود خلافات مالية مستمرة مع دنيا بخصوص حضانة ابنهما بعد الطلاق.',
      unlocked:false, order:5 },

    { id:'seif_seen_city', tag:'من شهادة جار', crit:false, title:'سيف في نفس المدينة', img:null,
      short:'شاهد أكد وجود سيف في نفس المدينة ليلة الاختفاء',
      full:'جار أكد إنه شاف سيف في نفس المدينة ليلة اختفاء دنيا، رغم إنه ادّعى إنه كان في مدينة تانية، بس بتفسير بسيط يخص ابنهما.',
      unlocked:false, order:6 },

    { id:'hany_exposure', tag:'من استجواب هاني', crit:true, title:'تهديد مسيرة هاني المهنية', img:null,
      short:'موضوع الحلقة كان هيفضح تلاعب هاني في مناقصة حكومية',
      full:'هاني اعترف إن موضوع الحلقة كان هيفضح تلاعبه في مناقصة حكومية كبيرة، وده كان هيدمر مسيرته بالكامل.',
      unlocked:false, order:7 },

    { id:'voice_match_hany', tag:'من تحليل صوتي دقيق', crit:true, title:'تطابق صوتي مع هاني', img: IMG_BASE_RECORDEDVOICE + 'voice-analysis.jpg',
      short:'الرسائل المهددة اتطابقت مع تسجيلات صوت هاني الرسمية',
      full:'التحليل الصوتي الدقيق أثبت تطابق الرسائل المهددة مع تسجيلات صوت هاني في مؤتمرات رسمية سابقة، رغم محاولة تشويه الصوت.',
      unlocked:false, order:8 },
  ],

  contradictionPuzzle: { enabled:false },
  audioPuzzle: {
    enabled: true,
    tabLabel: 'تحليل الصوت',
    introText: 'استمع للرسائل الصوتية المهددة وقارنها بتسجيلات صوت المشتبه بيهم في مقابلات ومؤتمرات رسمية سابقة، ودوّر على التطابق.',
    resultText: 'التحليل الدقيق بيوضح تطابق واضح بين نبرة الصوت المشوّه وتسجيلات هاني الرسمية.',
    resultEvidenceIds: ['voice_match_hany'],
  },
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

  evidenceCombinations: [
    { parts:['hany_exposure','episode_topic_leak'], resultId:'voice_match_hany' },
  ],

  correctSuspectId: 'corrupt_official_hany',
  conclusiveEvidenceIds: ['hany_exposure', 'voice_match_hany', 'threatening_voice_messages'],
  conclusiveRequired: 3,

  theoryBuilder: {
    enabled: true,
    questions: [
      {
        id:'howidentified',
        label:'إزاي عرفت إن هاني هو الفاعل؟',
        options: [
          { id:'a', text:'التحليل الصوتي الدقيق اللي طابق الرسائل المهددة بصوته الرسمي + دافعه الواضح المرتبط بفضيحة المناقصة + تسريب موضوع الحلقة' },
          { id:'b', text:'لأنه مسؤول حكومي وده يكفي كدافع' },
          { id:'c', text:'لأن سيف زوجها السابق كان المشتبه الأوضح' },
        ],
        correctOptionId:'a',
      },
      {
        id:'twist',
        label:'إيه كانت نية هاني الحقيقية؟',
        options: [
          { id:'a', text:'كان بس عايز يخوفها تسكت عشان يحمي مسيرته من فضيحة المناقصة، لكن رفضها المستمر خلاه ياخدها بالقوة كخطوة أخيرة يائسة' },
          { id:'b', text:'كان ناوي يقتلها من البداية' },
          { id:'c', text:'كان بيحاول يفاوضها على صفقة مالية' },
        ],
        correctOptionId:'a',
      },
    ],
  },

  endings: {
    good: {
      stamp:'القضية اتقفلت', badgeLabel:'القضية اتقفلت — إنقاذ', title:'الصوت المشوّه ما قدرش يخبي نفسه',
      paragraphs:[
        'هاني كان طرف في تلاعب بمناقصة حكومية كبيرة، ودنيا كانت على وشك تفضحه في حلقتها الجاية. حاول يخوفها برسائل صوتية مجهولة ومشوّهة عشان تسكت، لكنها أصرّت على المتابعة. بعد آخر حلقة، قابلها في الممر وحاول يمنعها بالقوة من نشر أي حاجة تانية.',
        'التحليل الصوتي الدقيق اللي طابق نبرة الرسائل المهددة بتسجيلات صوته الرسمية في مؤتمرات سابقة، ودافعه الواضح المرتبط بفضيحة المناقصة، وتسريب موضوع الحلقة اللي أكده أمجد، كلها أدلة حاصرته وأدت لإنقاذ دنيا.',
      ]
    },
    partial: {
      stamp:'جزئي', badgeLabel:'القضية اتقفلت — أدلة غير كافية', title:'الشك في مكانه، الإثبات ناقص',
      paragraphs:[
        'التحقيق بيتجه صح ناحية هاني، بس الأدلة اللي جمعتها لسه مش كفاية تقفل القضية رسميًا قدام النيابة.',
      ],
      hint:'اجمع على الأقل 3 أدلة من: التحليل الصوتي، دافعه المهني، وتسريب موضوع الحلقة، قبل ما تتهم.'
    },
    bad: {
      stamp:'لغز بلا حل', badgeLabel:'القضية اتقفلت — اتهام ظالم', title:'القضية اتقفلت غلط',
      paragraphs:[
        'اتهمت {wrongName}، ودنيا فضلت في خطر حقيقي والفاعل الحقيقي فضل طليق. الأدلة كانت بتشاور بوضوح على اتجاه تاني من البداية.',
      ]
    }
  }
};

/* ============================================================
   ملاحظة: برومبتات الصور المقترحة لقضية "الصوت المسجل"

   الغلاف (cover.webp):
   "Photorealistic shot of an empty radio studio at night, an
   on-air microphone glowing red, dim ambient lighting, documentary
   photography style, no text, no watermark, photorealistic"

   المشهد ١ (voice-scene1.jpg):
   "Photorealistic close-up of a woman looking worried at her phone
   screen at night, soft phone glow lighting, photorealistic, no
   text, no watermark"

   المشهد ٢ (voice-scene2.jpg):
   "Photorealistic shot of a female radio host speaking into a
   microphone in a studio, visible tension in her expression, warm
   studio lighting, photorealistic, no text, no watermark"

   المشهد ٣ (voice-scene3.jpg):
   "Photorealistic shot of a woman walking down a dim radio station
   hallway alone, soft corridor lighting, quiet unsettling
   atmosphere, photorealistic, no text, no watermark"

   المشهد ٤ (voice-scene4.jpg):
   "Photorealistic shot of a radio station manager handing over a
   phone to an investigator in an office, warm office lighting,
   photorealistic, no text, no watermark"

   أمجد (amgad.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male radio
   station manager, formal casual outfit, concerned expression,
   standing in a radio station hallway, warm lighting, candid
   documentary photography style, no text, no watermark,
   photorealistic"

   كريم (karim.jpg):
   "Photorealistic portrait of a young Egyptian male radio producer,
   casual smart outfit, nervous guarded expression, sitting at a
   control room desk, dim studio lighting, candid documentary
   photography style, no text, no watermark, photorealistic"

   سيف (seif.jpg):
   "Photorealistic portrait of a middle-aged Egyptian man, casual
   outfit, tense uncomfortable expression, standing outside a
   building, natural daylight, candid documentary photography
   style, no text, no watermark, photorealistic"

   هاني (hany.jpg):
   "Photorealistic portrait of a middle-aged Egyptian male
   government official, formal suit, calculating nervous
   expression, standing in an office corridor, formal office
   lighting, candid documentary photography style, no text, no
   watermark, photorealistic"

   دليل الرسائل الصوتية (voice-messages.jpg):
   "Photorealistic close-up of a smartphone screen showing a voice
   message waveform and unknown caller ID, soft phone glow, no
   text, no watermark, photorealistic"

   دليل التحليل الصوتي (voice-analysis.jpg):
   "Photorealistic close-up of an audio waveform analysis on a
   computer screen with two overlapping frequency patterns,
   clinical lab lighting, no text, no watermark, photorealistic"
   ============================================================ */


/* ============================================================
   مراجعة محتوى 2026-08-19 — ضبط منطق التحقيق وربط الأدلة
   ملاحظة: التعديلات هنا تخص محتوى القضية فقط، بدون افتراضات عن المحرك.
   ============================================================ */
(() => {
  const c = CASE_RECORDED_VOICE;
  const evidence = (id) => c.evidence.find(e => e.id === id);
  const addEvidence = (item) => { if (!evidence(item.id)) c.evidence.push(item); };
  const setTheory0 = (text) => { const q=c.theoryBuilder?.questions?.[0]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };
  const setTheory1 = (text) => { const q=c.theoryBuilder?.questions?.[1]; if(q){const o=q.options.find(x=>x.id===q.correctOptionId); if(o)o.text=text;} };

  c.teaser = 'دنيا كانت بتستقبل رسائل صوتية مجهولة بتهددها تسكت عن موضوع حساس. بعد آخر حلقة اختفت، لكن تشويه الصوت ماكانش كفاية يمسح بصمة صاحبه.';

})();

(() => {
  const s = CASE_RECORDED_VOICE.suspects.find(x => x.id === 'corrupt_official_hany');
  if (s && !s.questions.some(x => x.q === 'عمرك بعت لدنيا رسالة صوتية عشان تخليها توقف الحلقة؟')) {
    const idx = s.questions.findIndex(x => x.closesInterrogation);
    const item = { q:'عمرك بعت لدنيا رسالة صوتية عشان تخليها توقف الحلقة؟', requires:['hany_exposure','threatening_voice_messages'], a:'"لأ. اعترضت على كلامها بشكل رسمي، لكن ما هددتهاش ولا كلمتها من رقم مجهول."' };
    if (idx >= 0) s.questions.splice(idx, 0, item); else s.questions.push(item);
  }
})();

/* FINAL REVIEW PATCH 2026-08-19 */
(() => {
  const c = CASE_RECORDED_VOICE;
  c.evidenceCombinations = [];
  const h = c.suspects.find(s => s.id === 'corrupt_official_hany');
  if (h) {
    const q = h.questions.find(q => q.closesInterrogation);
    if (q) {
      q.a = '(بيتوتر) "حاولت أخوفها بالرسائل عشان تسكت عن الملف، وده غلط. لكن اختفاؤها بعد البرنامج مش دليل إني أنا اللي أخدتها."';
    }
  }
  c.conclusiveEvidenceIds = ['hany_exposure','voice_match_hany','threatening_voice_messages'];
  c.conclusiveRequired = 3;
})();
