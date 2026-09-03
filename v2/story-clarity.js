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
    'police-decision': {
      step:'05',
      objective:'قرر إيه اللي هتقوله للشرطة وإيه اللي هتحتفظ بيه.',
      context:'القرار ده هيحدد قد إيه الشرطة تثق فيك، وقد إيه تفضل عندك حرية تتحرك لوحدك.'
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
