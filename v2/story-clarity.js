(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);

  const GUIDE = {
    'incoming-file': {
      step:'01',
      objective:'قرر هتتعامل إزاي مع الملف المجهول.',
      context:'القضية الأساسية: آدم فؤاد اختفى صباح اليوم. الملف ده وصل لك من مصدر غير معروف وفيه آخر تسجيل مرتبط باختفائه.'
    },
    'trace-result': {
      step:'01',
      objective:'افتح الملف وشوف آخر تسجيل لآدم.',
      context:'محاولة تتبع المصدر فشلت. المرسل واضح إنه عارف إنك بتحاول توصله.'
    },
    'delete-confirmed': {
      step:'01',
      objective:'ارجع بعد حذف الملف.',
      context:'إنت رفضت تفتح ملف مجهول المصدر.'
    },
    'file-returned': {
      step:'01',
      objective:'الملف رجع لوحده. افتحه واعرف ليه اختارك.',
      context:'دي أول علامة إن اللي باعت الملف قادر يتدخل في اللي بيظهر قدامك.'
    },
    'identity': {
      step:'01',
      objective:'سجّل اسم المحقق اللي هتستخدمه في القضية.',
      context:'الاسم ده هو اللي هتخاطبك بيه الرسائل جوه التحقيق.'
    },
    'adam-intro': {
      step:'02',
      objective:'شاهد آخر دقائق موثقة لآدم قبل اختفائه.',
      context:'آدم فؤاد، 27 سنة. بعد ساعات من التسجيل ده اتبلغ عن اختفائه من شقته.'
    },
    'morning-arrival': {
      step:'03',
      objective:'افهم إيه اللي حصل في الشقة بعد نهاية التسجيل.',
      context:'آخر حاجة شوفناها: آدم كان على موقع اسمه LAST SEEN، سمع خبطة على الباب، وبعدها التسجيل قطع.'
    },
    'apartment-search': {
      step:'04',
      objective:'افحص 3 نقاط فقط من أصل 4 قبل وصول الجرائم الإلكترونية.',
      context:'مش هتلحق تجمع كل الأدلة. اللي تسيبه دلوقتي ممكن يضيع منك بعدين.'
    },
    'police-arrival': {
      step:'05',
      objective:'قرر إيه اللي هتقوله للشرطة وإيه اللي هتحتفظ بيه.',
      context:'القرار ده هيحدد قد إيه الشرطة تثق فيك، وقد إيه تفضل عندك حرية تتحرك لوحدك.'
    },
    'observer-appearance': {
      step:'06',
      objective:'استوعب إن حد تاني بيتابع الملف ده لحظة بلحظة.',
      context:'حساب مجهول اسمه "المراقب 00" بيشوف نفس التفاصيل اللي إنت بتشوفها دلوقتي.'
    },
    'observer-hint': {
      step:'06',
      objective:'راجع صورة الصالة تاني بعد التلميح.',
      context:'المراقب 00 وجّهك لتفصيلة فاتتك. المعلومة مفيدة، بس مصدرها مريب.'
    },
    'observer-response': {
      step:'06',
      objective:'قرر هترد على المراقب المجهول ولا تتجاهله ولا تبلغ عنه.',
      context:'أي رد هيكشف حاجة عن نيتك للطرف التاني، حتى لو "التجاهل" نفسه.'
    },
    'mariam-lead': {
      step:'07',
      objective:'قابل المرأة اللي هويتها اتأكدت في البث.',
      context:'اسمها يارا مجدي حسب سجلات الفريق، لكنها بتنكر أي علاقة بآدم أو بالموقع.'
    },
    'mariam-interrogation': {
      step:'07',
      objective:'اختار أسلوبك في مواجهتها بالفيديو.',
      context:'المواجهة المباشرة والتلميح غير المباشر هيوصلوك لنفس المكان بطريقة مختلفة تمامًا.'
    },
    'bluff-slip': {
      step:'07',
      objective:'لاحظ اللي طلع منها من غير قصد.',
      context:'جملة واحدة خرجت أسرع من تفكيرها.'
    },
    'live-test-intro': {
      step:'08',
      objective:'استعد لبث مباشر مفاجئ من الموقع نفسه.',
      context:'الموقع بيتفاعل معاك مباشرة لأول مرة، مش بس بيعرض حاجة سابقة.'
    },
    'light-choice': {
      step:'08',
      objective:'قرر تشغل الضوء ولا تركز على الصوت — عندك 20 ثانية.',
      context:'آدم ظاهر مربوط في غرفة مظلمة. القرار ده هيحدد أي تفاصيل هتوصلك.'
    },
    'video-forensics': {
      step:'08',
      objective:'افهم نتيجة الفحص الجنائي للفيديو.',
      context:'اللي شفته للتو مش بالضرورة اللي إنت فاكره.'
    },
    'observer-warning': {
      step:'09',
      objective:'قرر تخبي الدليل الجديد عن الشرطة زي ما المراقب طلب، ولا لأ.',
      context:'المراقب 00 عايزك تختار جانبه ضد الفريق الرسمي.'
    },
    'observer-insider': {
      step:'09',
      objective:'استوعب اتهام خطير: حد جوه التحقيق بيتابع الموقع.',
      context:'مفيش وقت تسأل مين قبل ما مصدر المعلومة يختفي.'
    },
    'adam-call-intro': {
      step:'09',
      objective:'استمع لتحذير آدم بنفسه.',
      context:'آدم بيتصل شخصيًا ومحذرك من حد بيتواصل معاك من الموقع.'
    },
    'adam-call-choice': {
      step:'09',
      objective:'قرر تحاول تحدد مكان المكالمة ولا تسيبه يكمل كلامه.',
      context:'المكالمة ممكن تتقطع في أي لحظة.'
    },
    'camera-confrontation': {
      step:'09',
      objective:'واجه سؤال الضابط عن ترتيب اكتشافك للكاميرا.',
      context:'قرار قديم من أول القضية رجع يطاردك دلوقتي.'
    },
    'twin-reveal': {
      step:'10',
      objective:'استوعب اكتشاف هوية المرأة الحقيقية.',
      context:'الوجه صح، لكن الاسم غلط. القضية اتعقدت أكتر.'
    },
    'mariam-choice': {
      step:'10',
      objective:'قرر إزاي هتتعامل مع مريم بعد كشف هويتها.',
      context:'رسمي، متفهم، أو ضاغط — كل أسلوب هيوصلك لمعلومة مختلفة.'
    },
    'mariam-explains': {
      step:'10',
      objective:'استمع لروايتها كاملة.',
      context:'مريم بتحكي إزاي الموضوع خرج من إيدها.'
    },
    'mariam-pressure-result': {
      step:'10',
      objective:'سجّل العنوان اللي طلع منها تحت الضغط.',
      context:'من اللحظة دي هتجاوبك بأقل كلام ممكن.'
    },
    'locating-adam': {
      step:'11',
      objective:'شوف أي مصدر معلومات هيوديك لآدم.',
      context:'الطريق اللي هتوصل بيه للمكان بيعتمد على قراراتك اللي فاتت.'
    },
    'location-traced': {
      step:'11',
      objective:'تابع النطاق اللي طلع من تتبع المكالمة.',
      context:'مش عنوان دقيق، لكنه كفاية يضيّق الاحتمالات.'
    },
    'location-observer': {
      step:'11',
      objective:'قيّم العنوان اللي بعتهولك المراقب المجهول.',
      context:'مش عارف لسه هو بيساعدك ولا بيوجهك لمكان هو عايزه.'
    },
    'location-deduced': {
      step:'11',
      objective:'راجع استنتاجك المستقل من غير مساعدة حد.',
      context:'أول مرة توصل لحاجة بنفسك من غير ما الموقع يوجهك.'
    },
    'approach-adam': {
      step:'11',
      objective:'قرر تدخل المبنى إزاي.',
      context:'قرار الدخول هيشكل طبيعة المواجهة اللي جاية.'
    },
    'night-drive': {
      step:'11',
      objective:'اتجه للمبنى في الظلمة.',
      context:'المنطقة الصناعية فاضية وهادية بشكل مقلق.'
    },
    'adam-found': {
      step:'11',
      objective:'واجه آدم لأول مرة بعد الاختفاء.',
      context:'مش مربوط، مش محتجز — وده مش اللي كنت متوقعه.'
    },
    'fake-close': {
      step:'12',
      objective:'راجع حالة القضية الظاهرية.',
      context:'المفقود اتلاقى. لكن سؤال واحد لسه من غير إجابة.'
    },
    'fake-library': {
      step:'12',
      objective:'شوف هل القضية فعلاً اتقفلت.',
      context:'النتيجة اتسجلت رسميًا.'
    },
    'case-return': {
      step:'12',
      objective:'استوعب إن الملف لسه نشط رغم إغلاقك له.',
      context:'حاجة مش طبيعية بتحصل بعد ما القضية المفروض تكون خلصت.'
    },
    'adam-confrontation': {
      step:'13',
      objective:'قرر إزاي هتواجه آدم بشكوكك.',
      context:'كل حاجة حواليه بتشير إنه هو صاحب الموقع.'
    },
    'project-truth': {
      step:'13',
      objective:'استمع لأصل المشروع من آدم نفسه.',
      context:'LAST SEEN ماكانش بدأ زي ما إنت متخيل.'
    },
    'participant17': {
      step:'13',
      objective:'راجع ملف آدم الأرشيفي بنفسك.',
      context:'الملف بيقول عن آدم حاجة هو نفسه مش مستوعبها.'
    },
    'adam-subject-choice': {
      step:'13',
      objective:'قرر تقوله الحقيقة عن نفسه دلوقتي ولا تأجلها.',
      context:'الحقيقة ممكن تكسره، وإخفاؤها ممكن يكسر الثقة بينكم بعدين.'
    },
    'adam-betrayal': {
      step:'13',
      objective:'شوف نتيجة تأجيلك للحقيقة.',
      context:'حد تاني وصلها قبل ما توصلها إنت.'
    },
    'yara-reveal': {
      step:'14',
      objective:'قابل المراقب 00 وجهًا لوجه أخيرًا.',
      context:'هويته كانت قدامك من زمان من غير ما تعرف.'
    },
    'yara-adam-choice': {
      step:'14',
      objective:'قرر مين تصدق: يارا ولا آدم.',
      context:'كل واحد فيهم معاه ملف يضرب رواية التاني.'
    },
    'half-truths': {
      step:'14',
      objective:'قارن الملفين بنفسك من غير ما تصدق حد فيهم بالكامل.',
      context:'مفيش واحد فيهم بيملك الصورة كاملة.'
    },
    'mariam-epilogue': {
      step:'14',
      objective:'شوف نتيجة الطريقة اللي تعاملت بيها مع مريم.',
      context:'أسلوبك معاها بدري في القضية كان له ثمن — لسه بتشوفه دلوقتي.'
    },
    'profile-intro': {
      step:'15',
      objective:'استعد لملف مختلف تمامًا عن اللي بتدور عليه.',
      context:'الموقع جهز حاجة، بس مش عن آدم.'
    },
    'numbers-pattern-reveal': {
      step:'15',
      objective:'اربط ورقة الأرقام اللي لقيتها أول القضية بموقعك الحالي.',
      context:'الورقة دي كانت أول دليل جمعته، ولسه معناها الحقيقي ما وضحلكش.'
    },
    'player-profile': {
      step:'15',
      objective:'راجع سلوكك المسجل طول القضية.',
      context:'الموقع ماستخدمش عنوانك ولا جهازك — استخدم بس اختياراتك.'
    },
    'trust-test-intro': {
      step:'16',
      objective:'استعد للاختبار الأخير قبل القرار الحاسم.',
      context:'آدم، يارا، مريم. واحد فيهم بس هياخد مفتاح الخروج.'
    },
    'trust-test': {
      step:'16',
      objective:'قرر مين تدّيه المفتاح.',
      context:'مفيش إجابة مضمونة. في إجابة الموقع متوقعها منك.'
    },
    'prediction-correct': {
      step:'16',
      objective:'شوف هل اختيارك كان متوقع.',
      context:'الموقع ما شافش المستقبل — هو رتب لك المعلومات بس.'
    },
    'prediction-deviation': {
      step:'16',
      objective:'شوف قد إيه اختيارك قرّب من توقع النظام.',
      context:'انحراف بسيط، لكن لسه جوه النطاق المتوقع.'
    },
    'prediction-mariam': {
      step:'16',
      objective:'شوف رد فعل النظام على اختيارك الأضعف احتمالًا.',
      context:'مريم كانت أضعف جزء في حسابات الموقع.'
    },
    'prediction-error': {
      step:'16',
      objective:'استوعب إن النظام نفسه اتفاجئ.',
      context:'اختيارك كسر جزء من الحسابات المتوقعة.'
    },
    'final-system-gate': {
      step:'17',
      objective:'وصلت لجوهر الموقع نفسه.',
      context:'الموقع مابيتنبأش بيك... هو بيختار ليك حتى تبقى متوقع.'
    },
    'perfect-subject-lock': {
      step:'17',
      objective:'شوف نتيجة قابلية توقعك العالية.',
      context:'اتبعت الإشارات بما يكفي إن النظام يقرر بدالك.'
    },
    'final-choice': {
      step:'17',
      objective:'اتخذ القرار الأخير بمصير LAST SEEN.',
      context:'أي اختيار هنا هيحفظ حاجة ويضيع حاجة تانية.'
    },
    'backup-copy': {
      step:'17',
      objective:'راجع تفاصيل النسخة اللي طلعتها قبل الإيقاف.',
      context:'مفتاح آدم فتح مسار مشفر قبل ما تقفل النظام.'
    }
  };

  const TEXT_REWRITES = [
    {
      node:'adam-intro',
      match:'الساعة 2:13 صباحًا. آدم قاعد لوحده قدام اللابتوب',
      text:'ده آدم فؤاد، 27 سنة. الساعة 2:13 صباحًا كان قاعد لوحده قدام اللابتوب. بعد ساعات من اللحظة دي هيتبلغ عن اختفائه.'
    },
    {
      node:'adam-intro',
      match:'قدامه موقع بسيط اسمه LAST SEEN',
      text:'آدم دخل موقع غريب اسمه LAST SEEN. الموقع بيعرض بثوص لأشخاص مجهولين، وكل بث عليه عدّاد بينقص.'
    },
    {
      node:'adam-intro',
      match:'يفتح بث لغرفة نوم. بنت نايمة',
      text:'فتح بث باسم «يارا 17». قدامه بنت نايمة في غرفة، والعدّاد فاضله 8 ثواني.'
    },
    {
      node:'adam-intro',
      match:'قبل ما العدّاد يخلص، البنت تفتح عينيها',
      text:'قبل ما العدّاد يوصل للصفر، البنت فتحت عينيها وبصت مباشرة ناحية الكاميرا.'
    },
    {
      node:'adam-intro',
      match:'انتهت مشاهدة يارا 17',
      text:'البث انتهى. بعدها فورًا ظهرت رسالة لآدم: «أنت شاهدت. الآن جاء دورك.»'
    },
    {
      node:'adam-intro',
      match:'خبطة واحدة على باب الشقة',
      text:'خَبطة واحدة على باب الشقة. آدم لفّ ناحية الصوت... وهنا آخر تسجيل معروف ليه انتهى.'
    },
    {
      node:'morning-arrival',
      match:'باب الشقة مقفول. مفيش كسر',
      text:'بعد 9 ساعات: تم الإبلاغ عن اختفاء آدم. باب شقته مقفول، ومفيش أي علامة اقتحام.'
    },
    {
      node:'morning-arrival',
      match:'الموبايل والمحفظة موجودين',
      text:'موبايله ومحفظته ومفاتيحه موجودين جوه الشقة. آدم نفسه هو الحاجة الوحيدة الناقصة.'
    },
    {
      node:'morning-arrival',
      match:'على الحائط جنب المكتب رقم واحد',
      text:'جنب المكتب لقيت رقم «17» مكتوب بقلم أسود. نفس الرقم اللي كان في اسم البث: يارا 17.'
    },
    {
      node:'morning-arrival',
      match:'وحدة الجرائم الإلكترونية في الطريق',
      text:'فريق الجرائم الإلكترونية في الطريق. قدامك دقايق قليلة تفحص المكان بنفسك قبل ما يتقفل رسميًا.'
    }
  ];

  function applyOpeningCopy(node){
    if(node === 'incoming-file'){
      const title = $('.node-title');
      const subtitle = $('.node-subtitle');
      const prompt = $('.beat-text');
      if(title) title.textContent = 'بلاغ اختفاء: آدم فؤاد';
      if(subtitle) subtitle.textContent = 'وصل لك ملف مجهول مرتبط بآخر ساعات قبل اختفاء آدم.';
      if(prompt) prompt.textContent = 'قبل ما تبدأ التحقيق: هتفتح الملف، تحاول تعرف مصدره، ولا ترفضه؟';
    }
    if(node === 'identity'){
      const title = $('.node-title');
      const prompt = $('.beat-text');
      if(title) title.textContent = 'اسم المحقق';
      if(prompt) prompt.textContent = 'اكتب الاسم اللي عايز القضية تخاطبك بيه.';
    }
  }

  function rewriteBeat(node){
    const beat = $('.beat-text');
    if(!beat) return;
    const current = beat.textContent.trim();
    const rule = TEXT_REWRITES.find(x => x.node === node && current.includes(x.match));
    if(rule && beat.textContent !== rule.text) beat.textContent = rule.text;
  }

  function renderGuide(node){
    const data = GUIDE[node];
    $('.case-objective')?.remove();
    if(!data) return;

    const el = document.createElement('aside');
    el.className = 'case-objective';
    el.innerHTML = `
      <div class="case-objective-step">خطوة ${data.step}</div>
      <div class="case-objective-copy">
        <strong>هدفك دلوقتي</strong>
        <span>${data.objective}</span>
        <small>${data.context}</small>
      </div>`;

    const target = $('.node-top') || $('.investigation-head') || $('.system-screen') || $('.node-card');
    if(!target) return;
    if(target.classList.contains('node-top') || target.classList.contains('investigation-head')) target.insertAdjacentElement('afterend', el);
    else target.prepend(el);
  }

  function apply(){
    const node = document.body.dataset.node || '';
    if(!node) return;
    applyOpeningCopy(node);
    rewriteBeat(node);
    renderGuide(node);
  }

  function init(){
    const stage = $('#stage');
    if(!stage) return;
    let raf = 0;
    const queue = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const observer = new MutationObserver(queue);
    observer.observe(stage,{childList:true,subtree:true,characterData:true});
    observer.observe(document.body,{attributes:true,attributeFilter:['data-node','data-type']});
    queue();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
