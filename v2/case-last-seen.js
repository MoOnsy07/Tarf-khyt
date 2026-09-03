window.STORY_CASE = {
  id: 'last-seen-story-v1',
  title: 'آخر مُشاهد',
  kicker: 'طرف خيط · وضع القصة',
  chapter: 'الفصل الأول · الملف 45',
  start: 'incoming-file',
  initialState: {
    chapter: 'الفصل الأول · الملف 45',
    flags: {
      resistedAtStart:false,
      tracedFile:false,
      foundSite:false,
      foundCamera:false,
      foundPhone:false,
      foundNumbers:false,
      hidSite:false,
      hidCamera:false,
      hidFindings:false
    }
  },
  evidence: {
    'last-seen-access': { title:'دخول إلى LAST SEEN', summary:'سجل المتصفح يثبت أن آدم دخل منصة مخفية قبل اختفائه مباشرة.' },
    'hidden-camera': { title:'كاميرا مخفية', summary:'كاميرا صغيرة كانت تصور آدم داخل شقته من غير علمه منذ أيام.' },
    'mariam-call': { title:'مكالمة مريم', summary:'مكالمة محذوفة مع شخص مسجل باسم مريم قبل اختفاء آدم بـ18 دقيقة.' },
    'number-sheet': { title:'ورقة الأرقام', summary:'17، 24، 31، 38، 45. الرقم الأخير تحته علامة استفهام.' },
    'observer-reflection': { title:'انعكاس في شاشة الصالة', summary:'شخص غير واضح يظهر في انعكاس شاشة داخل الشقة، رغم أن المكان يفترض أنه كان خاليًا.' }
  },
  nodes: {
    'incoming-file': {
      id:'incoming-file', type:'decision', system:true, black:true,
      kicker:'ملف وارد · المصدر غير معروف',
      title:'وصل ملف جديد',
      subtitle:'رقم الملف: 45 · الحالة: غير مصرح بالفتح',
      prompt:'الملف ظهر داخل نظامك من غير ما تطلبه. ماذا تفعل؟',
      choices:[
        { id:'open', label:'فتح الملف', description:'تدخل مباشرة وتشوف محتواه.', effect:{stats:{risk:2,influence:1}}, next:'identity' },
        { id:'trace', label:'معرفة المرسل أولًا', description:'تحاول تعرف الملف جه منين قبل فتحه.', effect:{flags:{tracedFile:true},stats:{investigation:2,independence:2}}, next:'trace-result' },
        { id:'delete', label:'حذف الملف', description:'مش هتفتح حاجة مجهولة المصدر.', effect:{flags:{resistedAtStart:true},stats:{independence:3,influence:-1}}, next:'delete-confirmed' }
      ]
    },

    'trace-result': {
      id:'trace-result', type:'system', black:true, glitch:true,
      line:'جارٍ تتبع المصدر...', big:'المصدر غير موجود',
      small:'ثم ظهر سطر لم يكتبه النظام: «بتدور على إيه؟»',
      button:'فتح الملف',
      effect:{flash:'بتدور على إيه؟'},
      next:'identity'
    },

    'delete-confirmed': {
      id:'delete-confirmed', type:'system', black:true,
      line:'تم تنفيذ الأمر', big:'تم حذف الملف', small:'لا توجد نسخة في سلة المحذوفات.',
      button:'العودة', next:'file-returned'
    },

    'file-returned': {
      id:'file-returned', type:'system', black:true, glitch:true, danger:true,
      line:'بعد ثانيتين ظهر الملف مرة أخرى', big:'قلت لك افتحني',
      small:'رقم الملف ما زال 45.', button:'فتح',
      effect:{stats:{risk:1},flash:'45'},
      next:'identity'
    },

    'identity': {
      id:'identity', type:'identity',
      kicker:'بيانات المحقق', title:'تسجيل الدخول للملف',
      prompt:'اكتب الاسم اللي هتستخدمه داخل التحقيق.', button:'دخول',
      next:'adam-intro'
    },

    'adam-intro': {
      id:'adam-intro', type:'cutscene', black:true,
      kicker:'قبل البلاغ بـ 9 ساعات', title:'شقة آدم فؤاد',
      beats:[
        { text:'الساعة 2:13 صباحًا. آدم قاعد لوحده قدام اللابتوب، والنور الوحيد جاي من الشاشة.' },
        { text:'قدامه موقع بسيط اسمه LAST SEEN. صفحة سوداء، أسماء مستخدمين، وعدّاد بينقص.' },
        { speaker:'يارا 17', text:'يفتح بث لغرفة نوم. بنت نايمة. العدّاد: 00:00:08.' },
        { text:'قبل ما العدّاد يخلص، البنت تفتح عينيها وتبص مباشرة ناحية الكاميرا.' },
        { speaker:'رسالة على الشاشة', text:'انتهت مشاهدة يارا 17.', small:'بعدها ظهر سطر جديد: «أنت شاهدت. الآن جاء دورك.»' },
        { text:'خبطة واحدة على باب الشقة. آدم يبص ناحية الباب... الشاشة تسود.', flash:'أهلًا، [اسم اللاعب]', glitch:true }
      ],
      next:'morning-arrival'
    },

    'morning-arrival': {
      id:'morning-arrival', type:'cutscene',
      kicker:'08:36 صباحًا', title:'آدم اختفى',
      beats:[
        { text:'باب الشقة مقفول. مفيش كسر، مفيش دم، ومفيش جثة.' },
        { text:'الموبايل والمحفظة موجودين. لكن آدم نفسه مش موجود.' },
        { text:'على الحائط جنب المكتب رقم واحد مكتوب بقلم أسود: 17.' },
        { text:'وحدة الجرائم الإلكترونية في الطريق. عندك وقت محدود قبل ما المكان يتقفل رسميًا.' }
      ],
      next:'apartment-search'
    },

    'apartment-search': {
      id:'apartment-search', type:'investigation',
      kicker:'مسرح 01', title:'شقة آدم',
      caption:'قدامك أربع نقاط مهمة. مش هتلحق تفحصهم كلهم قبل وصول الفريق.',
      image:'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/missing-twin/twin-apartment.jpg',
      limit:3,
      timer:{seconds:150, timeoutMessage:'الفريق وصل. أي حاجة ما فحصتهاش دلوقتي خرجت من إيدك.'},
      hotspots:[
        {
          id:'laptop', title:'اللابتوب', area:{x:44,y:38,w:22,h:25},
          description:'اللابتوب مفتوح، لكن الشاشة سوداء. سجل المتصفح لسه موجود.',
          details:['آخر جلسة بدأت 1:57 صباحًا.','في دخول متكرر لنطاق مخفي باسم LAST SEEN.','آخر نشاط توقف قبل البلاغ بساعات.'],
          actionLabel:'نسخ سجل الدخول', evidence:['last-seen-access'],
          effect:{flags:{foundSite:true},stats:{investigation:2,risk:1}}, feedback:'نسخت سجل الدخول قبل مصادرة الجهاز.'
        },
        {
          id:'camera', title:'المكتبة', area:{x:7,y:22,w:23,h:42},
          description:'بين الكتب جسم أسود صغير مش راكب مع باقي المكان.',
          details:['كاميرا صغيرة موجهة ناحية مكتب آدم.','عليها ذاكرة محلية.','تاريخ أقدم ملف فيها يرجع لـ11 يوم.'],
          actionLabel:'فك الكاميرا وحفظها', evidence:['hidden-camera'],
          effect:{flags:{foundCamera:true},stats:{investigation:2,risk:1}}, feedback:'الكاميرا بقت معاك قبل وصول الفريق.'
        },
        {
          id:'phone', title:'هاتف آدم', area:{x:68,y:60,w:14,h:18},
          description:'الهاتف على وضع الصامت ومفتوح ببصمة محفوظة قبل اختفاء صاحبه.',
          details:['آخر مكالمة ظاهرة مش هي آخر مكالمة فعلية.','في سجل محذوف قبل الاختفاء بـ18 دقيقة.','الاسم المحفوظ: مريم.'],
          actionLabel:'حفظ سجل المكالمات', evidence:['mariam-call'],
          effect:{flags:{foundPhone:true},stats:{investigation:1}}, feedback:'سجل المكالمات اتحفظ.'
        },
        {
          id:'paper', title:'ورقة بجوار المكتب', area:{x:28,y:66,w:18,h:18},
          description:'ورقة مطوية مرتين وتحتها أثر قلم ضغط قوي.',
          details:['17','24','31','38','45 ؟'],
          actionLabel:'تصوير الورقة', evidence:['number-sheet'],
          effect:{flags:{foundNumbers:true},stats:{investigation:2,independence:1}}, feedback:'الأرقام اتسجلت. معناها لسه مش واضح.'
        }
      ],
      next:'police-arrival', timeoutNext:'police-arrival'
    },

    'police-arrival': {
      id:'police-arrival', type:'decision',
      kicker:'وحدة الجرائم الإلكترونية وصلت', title:'أول إفادة رسمية',
      prompt:'الضابط بيسألك: «لقيت حاجة غير طبيعية قبل ما نوصل؟»',
      note:'قرارك هيتحفظ فورًا. مش كل نتيجة هتظهر دلوقتي.',
      choices:[
        {
          id:'tell-all', label:'أقول كل اللي لقيته', description:'تسلم كل المعلومات اللي وصلت لها للفريق.',
          effect:{stats:{policeTrust:3,independence:-1},schedule:[{id:'police-followup',trigger:'observer-appearance',toast:'الفريق بدأ يتتبع LAST SEEN بناءً على إفادتك.'}]}, next:'observer-appearance'
        },
        {
          id:'hide-site', label:'أخفي وجود الموقع', description:'تقول إنك لقيت آثار استخدام عادي للجهاز فقط.',
          when:{flag:'foundSite'},
          effect:{flags:{hidSite:true},stats:{policeTrust:-1,independence:2,risk:1,influence:1},schedule:[{id:'observer-knows-site',trigger:'observer-appearance',flash:'إخفاؤك للموقع اتسجل.'}]}, next:'observer-appearance'
        },
        {
          id:'hide-camera', label:'أخفي الكاميرا', description:'تحتفظ بالكاميرا من غير ما تدخل سجل المضبوطات.',
          when:{flag:'foundCamera'},
          effect:{flags:{hidCamera:true},stats:{policeTrust:-2,risk:3,independence:2},schedule:[{id:'observer-knows-camera',trigger:'observer-hint',effect:{flags:{observerKnowsCamera:true}},toast:'وصلت رسالة جديدة من مستخدم مجهول.'}]}, next:'observer-appearance'
        },
        {
          id:'hide-findings', label:'أقول إن الفحص ماوصلش لحاجة واضحة', description:'تحتفظ بكل اللي عرفته لنفسك مؤقتًا.',
          effect:{flags:{hidFindings:true},stats:{policeTrust:-2,independence:3,risk:2,influence:1},schedule:[{id:'observer-knows-silence',trigger:'observer-appearance',flash:'أنت ماقلتش لهم كل حاجة.'}]}, next:'observer-appearance'
        }
      ]
    },

    'observer-appearance': {
      id:'observer-appearance', type:'system', black:true, glitch:true,
      line:'أثناء مراجعة ملف الشقة', big:'مستخدم آخر يشاهد هذا الملف الآن',
      small:'المراقب 00 · متصل', button:'استمرار',
      next:'observer-hint'
    },

    'observer-hint': {
      id:'observer-hint', type:'cutscene', black:true,
      kicker:'رسالة داخل الملف', title:'المراقب 00',
      beats:[
        { speaker:'المراقب 00', text:'فاتتك حاجة في صورة الصالة.' },
        { when:{flag:'observerKnowsCamera'}, speaker:'المراقب 00', text:'وبالمناسبة... الكاميرا اللي خبيتها مش في مكان آمن.' },
        { text:'ترجع للصورة. في انعكاس شاشة سوداء يظهر شكل شخص واقف ناحية الممر.', small:'المعلومة مفيدة فعلًا، وده أسوأ جزء فيها.' }
      ],
      effect:{evidence:['observer-reflection']},
      next:'observer-response'
    },

    'observer-response': {
      id:'observer-response', type:'decision', black:true,
      kicker:'المراقب 00 ينتظر', title:'هترد؟',
      prompt:'الشخص المجهول أثبت إنه شايف ملفاتك... وساعدك بدليل حقيقي.',
      timer:{seconds:25, timeoutChoice:'ignore', timeoutMessage:'ما رديتش. سكوتك اتحسب قرار.'},
      choices:[
        { id:'ask', label:'«إنت مين؟»', description:'تفتح قناة كلام معاه.', effect:{stats:{observerTrust:2,influence:1,risk:1}}, next:'chapter-one-report' },
        { id:'ignore', label:'أتجاهله', description:'ما تديهوش أي إشارة إنك مستعد تمشي وراه.', effect:{stats:{observerTrust:-1,independence:2,influence:-1}}, next:'chapter-one-report' },
        { id:'report', label:'أبلغ الشرطة', description:'تسلم الحساب للفريق ويحاولوا يتتبعوه.', effect:{stats:{policeTrust:1,observerTrust:-2,independence:1},flags:{reportedObserver:true}}, next:'chapter-one-report' }
      ]
    },

    'chapter-one-report': {
      id:'chapter-one-report', type:'report',
      kicker:'نهاية النسخة التجريبية · الفصل الأول', title:'الملف بدأ يكوّن صورة عنك',
      text:'أنت لسه بتدور على آدم. لكن من اللحظة دي، حد تاني بدأ يسجل طريقتك في اتخاذ القرار.',
      seal:'المشارك 45 · المراقبة مستمرة',
      items:[
        {label:'اسم المحقق',value:s=>s.playerName},
        {label:'نقاط الفحص اللي لحقتها',value:s=>String((s.investigations['apartment-search']?.checked||[]).length)+' / 4'},
        {label:'ثقة الشرطة',value:'stats.policeTrust'},
        {label:'استقلالية القرار',value:'stats.independence'},
        {label:'قابلية التأثير الحالية',value:'stats.influence'},
        {label:'زمن أول قرار',value:s=>Math.max(0,Math.round((s.metrics.decisionTimes['incoming-file']||0)/1000))+' ث'}
      ],
      button:'آخر لقطة', next:'chapter-one-end'
    },

    'chapter-one-end': {
      id:'chapter-one-end', type:'end', black:true,
      kicker:'LAST SEEN', title:'يتبع...',
      text:'آدم ما زال مفقودًا. والمراقب 00 عرف إنك دخلت الملف.',
      seal:'45 · متصل'
    }
  }
};
