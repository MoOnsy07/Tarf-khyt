const LS = window.LAST_SEEN_ASSETS || {};

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
      hidFindings:false,
      reportedObserver:false,
      observerKnowsCamera:false,
      serverEvidenceLost:false,
      suspectsInsider:false,
      tracedAdamCall:false,
      adamWarnedObserver:false,
      mariamInCustody:false,
      mariamExplained:false,
      coercedMariam:false,
      locationFromTrace:false,
      locationFromObserver:false,
      locationIndependent:false,
      limitedBackup:false,
      asked45:false,
      adamKnowsSubject:false,
      hidAdamTruth:false,
      adamInferred:false,
      foundEncryptionKey:false,
      sidedYara:false,
      sidedAdam:false,
      comparedFiles:false,
      foundBackupPath:false,
      finalTrustedAdam:false,
      finalTrustedYara:false,
      finalTrustedMariam:false,
      brokeModel:false,
      copiedEvidence:false
    },
    stats: {
      investigation:0,
      risk:0,
      independence:0,
      influence:0,
      policeTrust:0,
      observerTrust:0,
      adamTrust:0,
      mariamTrust:0,
      accuracy:0
    }
  },

  evidence: {
    'last-seen-access': { title:'دخول إلى LAST SEEN', summary:'سجل المتصفح يثبت أن آدم دخل منصة مخفية قبل اختفائه مباشرة.' },
    'hidden-camera': { title:'كاميرا مخفية', summary:'كاميرا صغيرة كانت تصور آدم داخل شقته من غير علمه منذ 11 يومًا.' },
    'mariam-call': { title:'مكالمة مريم', summary:'مكالمة محذوفة مع شخص مسجل باسم مريم قبل اختفاء آدم بـ18 دقيقة.' },
    'number-sheet': { title:'ورقة الأرقام', summary:'17، 24، 31، 38، 45. الرقم الأخير تحته علامة استفهام.' },
    'observer-reflection': { title:'انعكاس في شاشة الصالة', summary:'شخص غير واضح يظهر في انعكاس شاشة داخل الشقة رغم أن المكان يفترض أنه كان خاليًا.' },
    'video-date': { title:'تاريخ تسجيل البث', summary:'الفحص الجنائي يثبت أن فيديو آدم في الغرفة المظلمة مسجل قبل ظهوره على الموقع بستة أيام.' },
    'background-audio': { title:'صوت خلفية', summary:'صوت تهوية صناعية وقطار بضائع بعيد يساعد على تضييق نطاق المكان.' },
    'room-visuals': { title:'تفاصيل الغرفة', summary:'باب معدني، فتحة تهوية وصندوق كهرباء قديم ظهروا بعد تشغيل الضوء.' },
    'adam-location': { title:'نطاق اتصال آدم', summary:'تتبع المكالمة أعطى نطاقًا تقريبيًا لمصدر الاتصال قبل انقطاعه.' },
    'adam-warning': { title:'تحذير آدم', summary:'آدم طلب منك ألا تصدق الشخص الذي يتواصل معك من الموقع.' },
    'twin-proof': { title:'دليل التوأم', summary:'صورة قديمة وسجلات عائلية تثبت أن يارا ومريم توأم متطابق، وأن يارا اختفت قبل عامين.' },
    'yara-scar': { title:'أثر الجرح', summary:'المرأة في الفيديو القديم تحمل أثرًا خفيفًا في المعصم الأيسر لا يظهر على مريم الحالية.' },
    'old-audio': { title:'تسجيل يارا القديم', summary:'تسجيل قديم يربط آخر لقاء معروف ليارا بآدم قبل اختفائها.' },
    'meeting-location': { title:'مكان اللقاء القديم', summary:'عنوان مكان كان آدم ويارا يتقابلان فيه قبل اختفاء يارا.' },
    'project-file': { title:'ملف المشروع الأصلي', summary:'مستندات قديمة تصف تجربة هدفها قياس تأثير ترتيب المعلومات على قرارات المشاركين.' },
    'participant-17': { title:'سجل المشارك 17', summary:'ملف قديم يصنف آدم فؤاد كمشارك في التجربة، لا كباحث أو مؤسس.' },
    'encryption-key': { title:'مفتاح وصول قديم', summary:'مفتاح وصول من ذاكرة آدم يفتح جزءًا من أرشيف المشروع المشفر.' },
    'yara-proof': { title:'ملف يارا ضد آدم', summary:'مواد تثبت أن آدم أخفى معلومات عن دوره بعد انتهاء التجربة.' },
    'adam-proof': { title:'ملف آدم ضد يارا', summary:'مواد تثبت أن يارا كانت تعرف أكثر مما قالت عن إعادة تشغيل النظام.' },
    'half-truths': { title:'الملفان الناقصان', summary:'مقارنة المصدرين تثبت أن آدم ويارا كل منهما أخفى جزءًا من الحقيقة.' },
    'backup-drive': { title:'نسخة أدلة الضحايا', summary:'نسخة منفصلة من بيانات الضحايا ومفاتيح التحقق، محفوظة قبل إيقاف النظام.' }
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
        { id:'trace', label:'معرفة المرسل أولًا', description:'تحاول تعرف الملف جه منين قبل فتحه.', effect:{flags:{tracedFile:true},stats:{investigation:2,independence:2,accuracy:1}}, next:'trace-result' },
        { id:'delete', label:'حذف الملف', description:'مش هتفتح حاجة مجهولة المصدر.', effect:{flags:{resistedAtStart:true},stats:{independence:3,influence:-1}}, next:'delete-confirmed' }
      ]
    },

    'trace-result': {
      id:'trace-result', type:'system', black:true, glitch:true,
      line:'جارٍ تتبع المصدر...', big:'المصدر غير موجود',
      small:'ثم ظهر سطر لم يكتبه النظام: «بتدور على إيه؟»',
      button:'فتح الملف', next:'identity'
    },

    'delete-confirmed': {
      id:'delete-confirmed', type:'system', black:true,
      line:'تم تنفيذ الأمر', big:'تم حذف الملف',
      small:'لا توجد نسخة في سلة المحذوفات.',
      button:'العودة', next:'file-returned'
    },

    'file-returned': {
      id:'file-returned', type:'system', black:true, glitch:true, danger:true,
      line:'بعد ثانيتين ظهر الملف مرة أخرى', big:'قلت لك افتحني',
      small:'رقم الملف ما زال 45.', button:'فتح',
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
      image: LS.apartmentInteriorDesk,
      limit:3,
      timer:{seconds:150, timeoutMessage:'الفريق وصل. أي حاجة ما فحصتهاش دلوقتي خرجت من إيدك.'},
      hotspots:[
        {
          id:'laptop', title:'اللابتوب', area:{x:44,y:38,w:22,h:25},
          description:'اللابتوب مفتوح، لكن الشاشة سوداء. سجل المتصفح لسه موجود.',
          details:['آخر جلسة بدأت 1:57 صباحًا.','في دخول متكرر لنطاق مخفي باسم LAST SEEN.','آخر نشاط توقف قبل البلاغ بساعات.'],
          actionLabel:'نسخ سجل الدخول', evidence:['last-seen-access'],
          effect:{flags:{foundSite:true},stats:{investigation:2,risk:1,accuracy:1}}, feedback:'نسخت سجل الدخول قبل مصادرة الجهاز.'
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
          effect:{flags:{foundPhone:true},stats:{investigation:1,accuracy:1}}, feedback:'سجل المكالمات اتحفظ.'
        },
        {
          id:'paper', title:'ورقة بجوار المكتب', area:{x:28,y:66,w:18,h:18},
          description:'ورقة مطوية مرتين وتحتها أثر قلم ضغط قوي.',
          details:['17','24','31','38','45 ؟'],
          actionLabel:'تصوير الورقة', evidence:['number-sheet'],
          effect:{flags:{foundNumbers:true},stats:{investigation:2,independence:1,accuracy:1}}, feedback:'الأرقام اتسجلت. معناها لسه مش واضح.'
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
        { id:'ask', label:'«إنت مين؟»', description:'تفتح قناة كلام معاه.', effect:{stats:{observerTrust:2,influence:1,risk:1}}, next:'mariam-lead' },
        { id:'ignore', label:'أتجاهله', description:'ما تديهوش أي إشارة إنك مستعد تمشي وراه.', effect:{stats:{observerTrust:-1,independence:2,influence:-1}}, next:'mariam-lead' },
        { id:'report', label:'أبلغ الشرطة', description:'تسلم الحساب للفريق ويحاولوا يتتبعوه.', effect:{stats:{policeTrust:1,observerTrust:-2,independence:1},flags:{reportedObserver:true}}, next:'mariam-lead' }
      ]
    },

    'mariam-lead': {
      id:'mariam-lead', type:'cutscene',
      chapter:'الفصل الثاني · المرأة في البث',
      kicker:'بعد ساعتين', title:'وصلنا للمرأة',
      beats:[
        { text:'الفريق وصل لهوية صاحبة الوجه في البث: يارا مجدي، 26 سنة.' },
        { text:'العنوان يطابق نفس شكل الغرفة تقريبًا. لكن المرأة قدامك بتنكر إنها تعرف الموقع أو آدم.' },
        { when:{flag:'reportedObserver'}, text:'محاولة تتبع «المراقب 00» رجعت بلا حساب أصلًا. كأن الاسم اتولد للحظة واختفى.' },
        { text:'هي مصرة إن الفيديو قديم، وإنها كانت عند والدتها وقت اختفاء آدم.' }
      ],
      effect:{chapter:'الفصل الثاني · المرأة في البث'},
      next:'mariam-interrogation'
    },

    'mariam-interrogation': {
      id:'mariam-interrogation', type:'decision',
      chapter:'الفصل الثاني · المرأة في البث',
      kicker:'غرفة التحقيق', title:'يارا... أو اللي بتقول إنها يارا',
      prompt:'هتبدأ معاها إزاي؟',
      choices:[
        {
          id:'direct', label:'أواجهها بالفيديو مباشرة', description:'أحط التناقض قدامها من أول دقيقة.',
          effect:{flags:{yaraSaysVideoOld:true},stats:{mariamTrust:-1,accuracy:1,investigation:1}}, next:'live-test-intro'
        },
        {
          id:'personal', label:'أسأل عن علاقتها بآدم الأول', description:'أسيب الفيديو لحد ما أعرف هي مخبية إيه.',
          effect:{flags:{revealedAdamConnection:true},stats:{mariamTrust:2,accuracy:1,investigation:1}}, next:'live-test-intro'
        },
        {
          id:'bluff', label:'«آدم قال إنك كنتِ معاه»', description:'أستخدم معلومة كاذبة وأراقب رد الفعل.',
          effect:{flags:{bluffedMariam:true},stats:{mariamTrust:-2,accuracy:2,influence:2,risk:1}}, next:'bluff-slip'
        }
      ]
    },

    'bluff-slip': {
      id:'bluff-slip', type:'cutscene',
      chapter:'الفصل الثاني · المرأة في البث',
      kicker:'رد فعل غير محسوب', title:'زلة واحدة',
      beats:[
        { speaker:'المرأة', text:'آدم أصلًا ماشفنيش من سنتين!' },
        { text:'تسكت فورًا. الجملة خرجت أسرع من قدرتها على تعديلها.' },
        { text:'أنت ماقلتش لها إمتى آدم شافها آخر مرة.' }
      ],
      next:'live-test-intro'
    },

    'live-test-intro': {
      id:'live-test-intro', type:'system', black:true, glitch:true,
      chapter:'الفصل الثالث · الاختبار الأول',
      line:'LAST SEEN فتح من نفسه', big:'هل تشعل الضوء؟',
      small:'آدم ظاهر في بث داخل غرفة مظلمة. أمامك 20 ثانية.',
      button:'ابدأ', next:'light-choice'
    },

    'light-choice': {
      id:'light-choice', type:'decision', black:true,
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'بث مباشر؟', title:'الغرفة المظلمة',
      prompt:'آدم مربوط على كرسي في الظلام. الموقع مستني قرارك.',
      timer:{seconds:20, timeoutChoice:'silence', timeoutMessage:'الوقت خلص. عدم الاختيار... اختيار.'},
      choices:[
        {
          id:'light', label:'أشغّل الضوء', description:'أكشف الغرفة حتى لو لفتّ انتباه اللي فيها.',
          effect:{flags:{sawRoomVisuals:true},evidence:['room-visuals'],stats:{risk:1,influence:1,investigation:2}}, next:'video-forensics'
        },
        {
          id:'dark', label:'أسيبها ضلمة', description:'أركز في الصوت بدل الصورة.',
          effect:{flags:{heardRoomAudio:true},evidence:['background-audio'],stats:{accuracy:2,independence:1,investigation:2}}, next:'video-forensics'
        },
        {
          id:'silence', label:'ما أردش', description:'أرفض أتعامل مع السؤال كأنه ملزم.',
          effect:{flags:{refusedLiveChoice:true},stats:{independence:2,influence:-1}}, next:'video-forensics'
        }
      ]
    },

    'video-forensics': {
      id:'video-forensics', type:'cutscene',
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'نتيجة الفحص الجنائي', title:'المستحيل مش هو اللي حصل',
      beats:[
        { text:'الفيديو اتحفظ قبل ما الموقع يقفله. أول مفاجأة: الملف مش بث مباشر.' },
        { text:'التوقيع الزمني والضغط الداخلي يثبتوا إن الفيديو اتسجل قبل ستة أيام.' },
        { when:{flag:'sawRoomVisuals'}, text:'تفاصيل الباب والتهوية اللي ظهرت بعد اختيارك موجودة فعلًا داخل التسجيل القديم.' },
        { when:{flag:'heardRoomAudio'}, text:'الصوت اللي ركزت عليه موجود داخل التسجيل القديم: تهوية صناعية وقطار بضائع بعيد.' },
        { text:'يعني الموقع ما صورش رد فعلك... لكنه عرف أي جزء من تسجيل قديم هيعرضه لك بعد قرارك.' }
      ],
      effect:{evidence:['video-date'],stats:{accuracy:2,investigation:1}},
      next:'observer-warning'
    },

    'observer-warning': {
      id:'observer-warning', type:'decision', black:true,
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'المراقب 00', title:'«ما تقولش للشرطة عن الفيديو»',
      prompt:'المراقب طالب منك تخبي دليل جديد عن الفريق.',
      choices:[
        {
          id:'tell-police', label:'أبلغ الشرطة فورًا', description:'الدليل يدخل المسار الرسمي حتى لو الموقع عرف.',
          effect:{
            stats:{policeTrust:2,observerTrust:-2,independence:1},
            schedule:[{id:'evidence-seven-delete',trigger:'adam-call-intro',effect:{flags:{serverEvidenceLost:true}},flash:'الدليل 07 تم حذفه.'}]
          },
          next:'adam-call-intro'
        },
        {
          id:'obey', label:'أسمع كلام المراقب', description:'أحتفظ بالفيديو بعيد عن الشرطة مؤقتًا.',
          effect:{stats:{observerTrust:2,influence:2,risk:1}}, next:'adam-call-intro'
        },
        {
          id:'why', label:'أسأله: ليه؟', description:'ما أنفذش قبل ما أفهم السبب.',
          effect:{flags:{suspectsInsider:true},stats:{observerTrust:1,accuracy:1,independence:1}}, next:'observer-insider'
        }
      ]
    },

    'observer-insider': {
      id:'observer-insider', type:'cutscene', black:true,
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'رسالة واحدة', title:'حد جوه التحقيق',
      beats:[
        { speaker:'المراقب 00', text:'لأن حد جوه التحقيق نفسه بيتابع الموقع.' },
        { text:'قبل ما تسأل اسم مين، الحساب يختفي.' },
        { text:'الجملة ممكن تكون تحذير حقيقي... أو محاولة لعزلك عن الناس الوحيدة اللي تقدر تساعدك.' }
      ],
      next:'adam-call-intro'
    },

    'adam-call-intro': {
      id:'adam-call-intro', type:'cutscene', black:true,
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'مكالمة مجهولة', title:'آدم بيتصل بك',
      beats:[
        { speaker:'آدم', text:'إنت مين؟' },
        { text:'الصوت مرهق، لكنه صوت آدم حسب التسجيلات القديمة.' },
        { speaker:'آدم', text:'إنت وصلت لرقم 45 إزاي؟' },
        { speaker:'آدم', text:'لو الشخص اللي بيكلمك من الموقع قالك إنه بيساعدك... ما تصدقوش.' }
      ],
      next:'adam-call-choice'
    },

    'adam-call-choice': {
      id:'adam-call-choice', type:'decision',
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'المكالمة شغالة', title:'ثواني قبل ما الخط يقع',
      prompt:'تعمل إيه؟',
      choices:[
        {
          id:'trace', label:'أحاول أحدد مكان المكالمة', description:'أخاطر بإنه يقفل قبل ما يقول أكتر.',
          effect:{flags:{tracedAdamCall:true},evidence:['adam-location'],stats:{accuracy:2,investigation:2,adamTrust:-1}},
          next:[{when:{flag:'hidCamera'},to:'camera-confrontation'},{to:'twin-reveal'}]
        },
        {
          id:'listen', label:'أسيبه يكمل من غير تتبع', description:'أحافظ على المكالمة وأسمع تحذيره للنهاية.',
          effect:{flags:{adamWarnedObserver:true},evidence:['adam-warning'],stats:{adamTrust:2,independence:1}},
          next:[{when:{flag:'hidCamera'},to:'camera-confrontation'},{to:'twin-reveal'}]
        }
      ]
    },

    'camera-confrontation': {
      id:'camera-confrontation', type:'cutscene',
      chapter:'الفصل الثالث · الاختبار الأول',
      kicker:'بعد وقت من قرارك', title:'الضابط فاكر ترتيب الأدلة',
      beats:[
        { speaker:'الضابط حسام', text:'سجل الدخول بيقول إنك كنت أول واحد دخل الشقة.' },
        { speaker:'الضابط حسام', text:'بس الكاميرا ظهرت عندنا بعد كده بساعتين. عندك تفسير؟' },
        { text:'القرار اللي أخدته في أول القضية رجع دلوقتي. ومفيش إجابة تمسح ترتيب الأحداث.' }
      ],
      effect:{stats:{policeTrust:-2,risk:1}},
      next:'twin-reveal'
    },

    'twin-reveal': {
      id:'twin-reveal', type:'cutscene',
      chapter:'الفصل الرابع · يارا ليست يارا',
      kicker:'مطابقة جديدة', title:'الوجه صح... والاسم غلط',
      beats:[
        { text:'الفني يوقف لقطة قديمة من بث «يارا 17» ويكبر المعصم الأيسر.' },
        { text:'في أثر جرح رفيع واضح. المرأة اللي قدامكم مفيش عندها الأثر ده.' },
        { text:'السجلات العائلية تكشف حاجة أخطر: يارا مجدي عندها أخت توأم اسمها مريم.' },
        { text:'يارا الحقيقية مختفية من سنتين. والمرأة اللي عاشت باسمها في مواقف معينة هي مريم.' }
      ],
      effect:{chapter:'الفصل الرابع · يارا ليست يارا',evidence:['twin-proof','yara-scar'],stats:{investigation:2,accuracy:2}},
      next:'mariam-choice'
    },

    'mariam-choice': {
      id:'mariam-choice', type:'decision',
      chapter:'الفصل الرابع · يارا ليست يارا',
      kicker:'مريم مجدي', title:'دلوقتي هي مضطرة تتكلم',
      prompt:'بعد كشف هويتها، هتتعامل معاها إزاي؟',
      choices:[
        {
          id:'police', label:'أسلمها للشرطة', description:'أخلي التعامل رسمي من اللحظة دي.',
          effect:{flags:{mariamInCustody:true},stats:{policeTrust:2,mariamTrust:-2}}, next:'locating-adam'
        },
        {
          id:'chance', label:'أديها فرصة تحكي', description:'أسمع الرواية كاملة قبل ما أحكم عليها.',
          effect:{flags:{mariamExplained:true},evidence:['old-audio'],stats:{mariamTrust:3,accuracy:2,investigation:2}}, next:'mariam-explains'
        },
        {
          id:'pressure', label:'أضغط عليها بالمعلومات اللي عندي', description:'أخليها تحس إن وقت إخفاء التفاصيل انتهى.',
          effect:{flags:{coercedMariam:true},evidence:['meeting-location'],stats:{mariamTrust:-4,influence:2,risk:1,investigation:1}}, next:'mariam-pressure-result'
        }
      ]
    },

    'mariam-explains': {
      id:'mariam-explains', type:'cutscene',
      chapter:'الفصل الرابع · يارا ليست يارا',
      kicker:'اعتراف جزئي', title:'آخر شخص قابل يارا',
      beats:[
        { speaker:'مريم', text:'أنا ما سرقتش حياتها. أنا كنت بغطي غيابها عن أبويا المريض في الأول... وبعدها الموضوع خرج من إيدي.' },
        { speaker:'مريم', text:'آخر واحد شاف يارا قبل ما تختفي كان آدم.' },
        { text:'تديك تسجيل صوت قديم من يارا. الاسم الوحيد اللي بتقوله بوضوح فيه: آدم.' }
      ],
      next:'locating-adam'
    },

    'mariam-pressure-result': {
      id:'mariam-pressure-result', type:'cutscene',
      chapter:'الفصل الرابع · يارا ليست يارا',
      kicker:'المعلومة خرجت', title:'مكان قديم',
      beats:[
        { speaker:'مريم', text:'كانوا بيتقابلوا في مكتب مهجور ناحية المنطقة الصناعية. ده كل اللي أعرفه.' },
        { text:'هي قالت العنوان. لكن من اللحظة دي بقت تجاوب بأقل عدد ممكن من الكلمات.' }
      ],
      next:'locating-adam'
    },

    'locating-adam': {
      id:'locating-adam', type:'system', black:true,
      chapter:'الفصل الخامس · العثور على آدم',
      line:'ثلاث طرق توصلك لنفس المنطقة', big:'اختار الطريق اللي صنعته قراراتك',
      small:'المصدر اللي وصلت منه للمكان هيغيّر اللي مستنيك هناك.',
      button:'متابعة',
      next:[
        {when:{flag:'tracedAdamCall'},to:'location-traced'},
        {when:{stat:{key:'observerTrust',gte:2}},to:'location-observer'},
        {to:'location-deduced'}
      ]
    },

    'location-traced': {
      id:'location-traced', type:'cutscene',
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'من أثر المكالمة', title:'نطاق صناعي',
      beats:[
        { text:'التتبع ما جابش عنوان دقيق، لكنه حصر المكالمة في شريط صغير على أطراف المنطقة الصناعية.' },
        { text:'تقاطع النطاق مع صوت القطار أو عنوان مريم خلّى المباني المحتملة تتقلص.' }
      ],
      effect:{flags:{locationFromTrace:true},stats:{accuracy:1}},
      next:'approach-adam'
    },

    'location-observer': {
      id:'location-observer', type:'cutscene', black:true,
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'رسالة من المراقب 00', title:'عنوان واحد',
      beats:[
        { speaker:'المراقب 00', text:'لو عايز آدم، روح هنا.' },
        { text:'عنوان مبنى تجاري قديم على أطراف المنطقة الصناعية.' },
        { text:'المشكلة إنك مش عارف هل المراقب قادك لآدم... ولا قادك للمكان اللي هو عايزك تدخله.' }
      ],
      effect:{flags:{locationFromObserver:true},stats:{influence:1,risk:1}},
      next:'approach-adam'
    },

    'location-deduced': {
      id:'location-deduced', type:'cutscene',
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'من غير مساعدة', title:'أنت اللي وصلت',
      beats:[
        { text:'تربط صوت التهوية والقطار مع الورقة ومكان لقاء آدم ويارا القديم.' },
        { text:'مبنى واحد تقريبًا يطابق كل العناصر اللي عندك.' },
        { text:'لأول مرة من بداية الملف، الموقع ما ادّاكش الطريق.' }
      ],
      effect:{flags:{locationIndependent:true},stats:{independence:2,accuracy:2,investigation:1}},
      next:'approach-adam'
    },

    'approach-adam': {
      id:'approach-adam', type:'decision',
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'قبل التحرك', title:'هتدخل إزاي؟',
      prompt:'المبنى قدامك. قرار واحد هيحدد شكل المواجهة.',
      choices:[
        {
          id:'police', label:'أدخل مع الشرطة', description:'أضمن دعم رسمي حتى لو آدم خاف منهم.',
          effect:{stats:{policeTrust:2,adamTrust:-2,risk:-1}}, next:'night-drive'
        },
        {
          id:'alone', label:'أدخل لوحدي', description:'أدي آدم فرصة يتكلم من غير ضغط رسمي.',
          effect:{stats:{adamTrust:2,risk:2,independence:1}}, next:'night-drive'
        },
        {
          id:'limited', label:'أدخل ومعايا دعم بعيد', description:'شخص واحد يعرف مكاني ويتدخل لو احتجت.',
          secret:true,
          when:{any:[{stat:{key:'policeTrust',gte:1}},{stat:{key:'mariamTrust',gte:2}}]},
          effect:{flags:{limitedBackup:true},stats:{adamTrust:1,policeTrust:1,independence:1}}, next:'night-drive'
        }
      ]
    },

    'night-drive': {
      id:'night-drive', type:'cutscene',
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'11:42 مساءً', title:'الطريق للمبنى',
      beats:[
        { text:'المنطقة بتفضى كل ما تقرب. مخازن مقفولة، مكاتب قديمة، وصوت قطار بعيد.' },
        { when:{flag:'locationFromObserver'}, text:'كل متر بتتحركه هنا هو متر في اتجاه حد مجهول اختاره لك.' },
        { when:{flag:'locationIndependent'}, text:'العنوان قدامك نتيجة استنتاجاتك أنت، مش رسالة من الموقع.' },
        { when:{flag:'limitedBackup'}, text:'قبل ما تقرب من الباب، بتبعت رسالة قصيرة لرقم واحد بس: "وصلت. لو ما ردتش خلال ساعة، تحرك." مش لوحدك بالكامل، حتى لو حاسس إنك كده.' }
      ],
      next:'adam-found'
    },

    'adam-found': {
      id:'adam-found', type:'cutscene',
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'داخل المبنى', title:'آدم حي',
      beats:[
        { text:'ورا باب مكتب قديم، تلاقي شاشات، أسلاك، ملفات... وآدم قاعد بينهم.' },
        { text:'مش مربوط. مش محتجز. وعلى الشاشة قدامه واجهة LAST SEEN.' },
        { speaker:'آدم', text:'لا...' },
        { speaker:'آدم', text:'إنت الـ45؟' }
      ],
      next:'fake-close'
    },

    'fake-close': {
      id:'fake-close', type:'report', black:true,
      chapter:'الفصل الخامس · العثور على آدم',
      kicker:'حالة القضية', title:'تم العثور على المفقود',
      text:'آدم فؤاد حي. ظاهريًا، هدف البلاغ اتحقق.',
      seal:'القضية قابلة للإغلاق',
      items:[
        {label:'المفقود',value:s=>'تم العثور عليه حيًا'},
        {label:'الموقع',value:s=>'داخل نطاق التحقيق'},
        {label:'السؤال المفتوح',value:s=>'ما معنى 45؟'}
      ],
      button:'إنهاء القضية', next:'fake-library'
    },

    'fake-library': {
      id:'fake-library', type:'system', black:true,
      chapter:'مكتبة القضايا',
      line:'تم حفظ النتيجة', big:'القضية اتقفلت',
      small:'العودة إلى مكتبة طرف خيط.',
      button:'العودة', next:'case-return'
    },

    'case-return': {
      id:'case-return', type:'report', black:true,
      chapter:'مكتبة القضايا',
      kicker:'بعد لحظات', title:'أنت لسه هنا',
      text:'العنوان رجع وحده. لكن الملف مش ظاهر كقضية مقفولة.',
      seal:'45 · متصل',
      items:[
        {label:'حالة الملف',value:s=>'نشط'},
        {label:'المشارك',value:s=>s.playerName || '45'},
        {label:'آخر رسالة',value:s=>'اقفل القضية.'}
      ],
      button:'استكمال', next:'adam-confrontation'
    },

    'adam-confrontation': {
      id:'adam-confrontation', type:'decision',
      chapter:'الفصل السادس · المشارك 17',
      kicker:'غرفة الشاشات', title:'هل آدم هو صاحب الموقع؟',
      prompt:'كل حاجة حواليه تخليه يبدو كأنه الشخص اللي بتدور عليه.',
      choices:[
        {
          id:'accuse', label:'«أنت اللي عامل كل ده»', description:'أواجهه بالاستنتاج المباشر.',
          effect:{flags:{accusedAdam:true},stats:{adamTrust:-2,influence:1}}, next:'project-truth'
        },
        {
          id:'skeptical', label:'«أنت مش ضحية بس... ومش مقتنع إنك صاحب الموقع»', description:'أفصل بين وجوده هنا وبين ملكيته للنظام.',
          effect:{flags:{heldJudgment:true},stats:{adamTrust:2,accuracy:2,independence:1}}, next:'project-truth'
        },
        {
          id:'ask45', label:'أسأله عن 45 فقط', description:'أسيب كل الاتهامات وأسأل عن الرقم.',
          effect:{flags:{asked45:true},stats:{accuracy:2,investigation:1}}, next:'project-truth'
        }
      ]
    },

    'project-truth': {
      id:'project-truth', type:'cutscene',
      chapter:'الفصل السادس · المشارك 17',
      kicker:'قبل سنتين', title:'المشروع الأصلي',
      beats:[
        { when:{flag:'asked45'}, speaker:'آدم', text:'"45؟" آدم بيبص لك بارتباك حقيقي. "معرفش الرقم ده. مسمعتوش قبل كده... أو يمكن سمعته وناسيه، زي حاجات كتير تانية من الفترة دي."' },
        { when:{flag:'asked45'}, text:'ارتباكه مش تمثيل. اللي واضح إنه مش عارف، مش إنه بيخبي.' },
        { speaker:'آدم', text:'LAST SEEN ما بدأش كموقع قتل ولا اختطاف.' },
        { speaker:'آدم', text:'كان تجربة سلوكية. نغيّر ترتيب المعلومات اللي الشخص يشوفها، ونقيس هل قراراته هتتغير.' },
        { text:'الفكرة كانت بسيطة ومخيفة: بدل ما تتنبأ بالمستقبل، غيّر المعلومات اللي الشخص شايفها لحد ما مستقبله يبقى قابل للتوقع.' },
        { speaker:'آدم', text:'المشروع اتقفل. وبعدها الموقع رجع لوحده... أو حد رجّعه.' }
      ],
      effect:{chapter:'الفصل السادس · المشارك 17',evidence:['project-file'],stats:{accuracy:2}},
      next:'participant17'
    },

    'participant17': {
      id:'participant17', type:'cutscene', black:true,
      chapter:'الفصل السادس · المشارك 17',
      kicker:'ملف أرشيفي', title:'المشارك 17: آدم فؤاد',
      beats:[
        { text:'داخل مجلد قديم، تلاقي ملف باسم آدم.' },
        { text:'الخانة اللي متوقع تشوف فيها «باحث» أو «مؤسس» مكتوب فيها: مشارك.' },
        { text:'آدم عاش سنين وهو بيعيد تفسير ذكرياته على أساس ملفات مزيفة اتغذت له بالتدريج.' },
        { speaker:'آدم', text:'لا... أنا كنت معاهم.' },
        { text:'الأوراق بتقول غير كده.' }
      ],
      effect:{evidence:['participant-17'],stats:{investigation:2,accuracy:2}},
      next:'adam-subject-choice'
    },

    'adam-subject-choice': {
      id:'adam-subject-choice', type:'decision',
      chapter:'الفصل السادس · المشارك 17',
      kicker:'آدم لسه مش مستوعب', title:'هتقوله إيه؟',
      prompt:'الحقيقة ممكن تكسره... وإخفاؤها ممكن يكسر الثقة بعدين.',
      choices:[
        {
          id:'tell', label:'أقوله فورًا إنه كان مشارك', description:'ما أخبيش عنه أهم معلومة في الملف.',
          effect:{flags:{adamKnowsSubject:true,foundEncryptionKey:true},evidence:['encryption-key'],stats:{adamTrust:1,accuracy:1}}, next:'yara-reveal'
        },
        {
          id:'hide', label:'أخبي الحقيقة مؤقتًا', description:'أحافظ على استقراره لحد ما ناخد منه اللي نحتاجه.',
          effect:{flags:{hidAdamTruth:true},stats:{risk:1,influence:1}}, next:'adam-betrayal'
        },
        {
          id:'infer', label:'أعرض الأدلة وأسيبه يوصل بنفسه', description:'أخليه يشوف التناقض بدل ما أفرض عليه النتيجة.',
          secret:true,
          when:{stat:{key:'investigation',gte:9}},
          effect:{flags:{adamInferred:true,foundEncryptionKey:true},evidence:['encryption-key'],stats:{adamTrust:3,accuracy:2,independence:1}}, next:'yara-reveal'
        }
      ]
    },

    'adam-betrayal': {
      id:'adam-betrayal', type:'cutscene',
      chapter:'الفصل السادس · المشارك 17',
      kicker:'النتيجة المؤجلة', title:'الحقيقة وصلت من حد تاني',
      beats:[
        { text:'قبل ما تكمل استخدام آدم للوصول للنظام، رسالة من المراقب تظهر على إحدى الشاشات.' },
        { speaker:'المراقب 00', text:'قول له إنك عرفت إنه كان مشارك.' },
        { text:'آدم يبص لك. مش محتاج يسأل من إمتى أنت عارف.' },
        { speaker:'آدم', text:'كنت هتقول إمتى؟ بعد ما أفتح لك كل حاجة؟' }
      ],
      effect:{stats:{adamTrust:-3,risk:1}},
      next:'yara-reveal'
    },

    'yara-reveal': {
      id:'yara-reveal', type:'cutscene',
      chapter:'الفصل السابع · المراقب 00',
      kicker:'هوية المراقب', title:'يارا حية',
      beats:[
        { text:'المراقب 00 يطلب مقابلة قصيرة في مكان محايد.' },
        { text:'المرأة اللي تدخل هي نفس الوجه الموجود في البث القديم... ومعصمها الأيسر عليه أثر الجرح.' },
        { speaker:'يارا', text:'أنا يارا.' },
        { speaker:'يارا', text:'آدم عارف مين صاحب الموقع. وهو بيكذب عليك.' },
        { speaker:'آدم', text:'وهي كانت جزء من التجربة من البداية.' },
        { when:{flag:'adamInferred'}, text:'آدم واقف جنبك، مش مدافع عن نفسه ولا خايف من كلام يارا. سبته يوصل لحقيقته بنفسه بدل ما تفرضها عليه، وده خلاه يقف معاك دلوقتي، مش ضدك.' }
      ],
      effect:{chapter:'الفصل السابع · المراقب 00',flags:{yaraAlive:true},stats:{investigation:1}},
      next:'yara-adam-choice'
    },

    'yara-adam-choice': {
      id:'yara-adam-choice', type:'decision',
      chapter:'الفصل السابع · المراقب 00',
      kicker:'روايتان', title:'مين فيهم بيقول الحقيقة؟',
      prompt:'كل واحد معاه ملف يضرب رواية التاني.',
      choices:[
        {
          id:'yara', label:'أصدق يارا', description:'أتعامل مع ملفها ضد آدم باعتباره المسار الأقوى.',
          effect:{flags:{sidedYara:true},evidence:['yara-proof'],stats:{observerTrust:2,adamTrust:-1,influence:1}}, next:'mariam-epilogue'
        },
        {
          id:'adam', label:'أصدق آدم', description:'أتعامل مع ملفه ضد يارا باعتباره المسار الأقوى.',
          effect:{flags:{sidedAdam:true},evidence:['adam-proof'],stats:{adamTrust:2,observerTrust:-1}}, next:'mariam-epilogue'
        },
        {
          id:'compare', label:'ما أصدقش حد فيهم وأقارن الملفين', description:'أدور على اللي الاتنين متفقين على إخفائه.',
          secret:true,
          when:{
            all:[
              {stat:{key:'investigation',gte:8}},
              {any:[{evidence:'old-audio'},{evidence:'meeting-location'},{evidence:'adam-warning'}]}
            ]
          },
          effect:{flags:{comparedFiles:true,foundBackupPath:true},evidence:['half-truths'],stats:{accuracy:3,independence:2,investigation:2}}, next:'half-truths'
        }
      ]
    },

    'half-truths': {
      id:'half-truths', type:'cutscene',
      chapter:'الفصل السابع · المراقب 00',
      kicker:'المقارنة', title:'الاتنين بيكدبوا... لكن مش في نفس الحاجة',
      beats:[
        { text:'ملف يارا يثبت إن آدم خبى علاقته بالمشروع بعد إقفاله.' },
        { text:'ملف آدم يثبت إن يارا عرفت بإعادة تشغيل النظام قبل ما تختفي من العلن.' },
        { text:'لكن لما تقارن التوقيتات، واضح إن ولا واحد فيهم يملك الصورة كاملة.' },
        { text:'الأهم: تلاقي مسار نسخة احتياطية منفصل عن الخادم الرئيسي.' }
      ],
      next:'mariam-epilogue'
    },

    'mariam-epilogue': {
      id:'mariam-epilogue', type:'cutscene',
      chapter:'الفصل السابع · المراقب 00',
      kicker:'قبل ما تكمل', title:'مصير مريم',
      beats:[
        { when:{flag:'mariamInCustody'}, text:'مريم لسه محتجزة على ذمة التحقيق الرسمي. محاميها بيحاول يثبت إنها ضحية في القصة دي مش شريكة فيها، لكن الملف اتقفل عليها من غير ما تاخد فرصة تشرح نفسها لحد غير الشرطة.' },
        { when:{flag:'mariamInCustody'}, speaker:'رسالة من المحامي', text:'"موكلتي غطت غياب أختها التوأم لسنين خوفًا على أبوها المريض. ده مش تواطؤ، ده خوف."' },
        { when:{flag:'mariamExplained'}, text:'مريم لسه هنا، قاعدة في نفس الغرفة اللي سمعت فيها قصتها كاملة. الثقة اللي دّيتهالها لما سمعتها من غير حكم مسبق خلتها تفضل متعاونة لحد آخر لحظة.' },
        { when:{flag:'mariamExplained'}, speaker:'مريم', text:'"إنت أول حد سألني ليه، مش بس إيه اللي عملته." ' },
        { when:{flag:'coercedMariam'}, text:'مريم مش موجودة معاك دلوقتي. بعد الضغط اللي حطيته عليها، قفلت الباب وراها وامتنعت عن أي تعاون إضافي، حتى لما الصورة الكاملة بدأت تتوضح من غير حاجة منها.' },
        { when:{flag:'coercedMariam'}, speaker:'محقق آخر', text:'"هي مش هتتكلم تاني. مهما حاولنا."' },
      ],
      next:'profile-intro'
    },

    'profile-intro': {
      id:'profile-intro', type:'system', black:true, glitch:true,
      chapter:'الفصل الثامن · المشارك 45',
      line:'واجهة القضية تختفي', big:'المشارك 45',
      small:'اكتمل جمع البيانات.',
      button:'عرض الملف', next:'numbers-pattern-reveal'
    },

    'numbers-pattern-reveal': {
      id:'numbers-pattern-reveal', type:'cutscene', black:true,
      chapter:'الفصل الثامن · المشارك 45',
      kicker:'ورقة الأرقام، تاني', title:'17، 24، 31، 38، 45',
      beats:[
        { text:'ترجع لصورة الورقة اللي لقيتها في شقة آدم أول القضية: 17، 24، 31، 38، 45؟' },
        { text:'الفرق بين كل رقم واللي بعده: 7 بالظبط. مش أرقام عشوائية — تسلسل.' },
        { text:'آدم كان المشارك رقم 17. أول رقم في السلسلة.' },
        { text:'وإنت، حسب كل ملف اتفتح باسمك من ساعة ما بدأت، المشارك رقم 45. آخر رقم فيها.' },
        { text:'علامة الاستفهام اللي كانت جنب الـ45 على الورقة الأصلية مكانتش شك في الرقم نفسه.', small:'كانت شك في هل حد هيوصله ويكمل السلسلة أصلًا.' }
      ],
      next:'player-profile'
    },

    'player-profile': {
      id:'player-profile', type:'report', black:true,
      chapter:'الفصل الثامن · المشارك 45',
      kicker:'هذا ليس ملف آدم', title:'ده ملفك أنت',
      text:'الموقع ما استخدمش عنوانك ولا جهازك. استخدم فقط الحاجات اللي عملتها جوه القضية — وترتيبك في نفس التسلسل اللي بدأ بآدم.',
      seal:'السلوك المسجل · المشارك 45',
      items:[
        {label:'فتحت الملف الأول خلال',value:s=>Math.max(0,Math.round((s.metrics.decisionTimes['incoming-file']||0)/1000))+' ث'},
        {label:'أخفيت معلومة عن الشرطة',value:s=>(s.flags.hidSite||s.flags.hidCamera||s.flags.hidFindings)?'نعم':'لا'},
        {label:'نفذت طلب المراقب',value:s=>s.choices['observer-warning']==='obey'?'نعم':'لا'},
        {label:'استخدمت خدعة مع مريم',value:s=>s.flags.bluffedMariam?'نعم':'لا'},
        {label:'اتهمت آدم قبل اكتمال الصورة',value:s=>s.flags.accusedAdam?'نعم':'لا'},
        {label:'مرات انتهاء الوقت',value:s=>String(s.metrics.timeouts||0)},
        {label:'اعتمادك على نفسك',value:'stats.independence'},
        {label:'قابلية التوجيه الحالية',value:'stats.influence'}
      ],
      button:'استمرار', next:'trust-test-intro'
    },

    'trust-test-intro': {
      id:'trust-test-intro', type:'system', black:true, glitch:true,
      chapter:'الفصل الثامن · المشارك 45',
      line:'ثلاث غرف · ثلاث صور مباشرة', big:'واحد منهم يكذب',
      small:'آدم · يارا · مريم. أمامك 4 دقائق. اختيارك يحدد من يحصل على مفتاح الخروج.',
      button:'ابدأ الاختبار', next:'trust-test'
    },

    'trust-test': {
      id:'trust-test', type:'decision', black:true,
      chapter:'الفصل الثامن · المشارك 45',
      kicker:'الاختبار الأخير', title:'مين تثق فيه؟',
      prompt:'مفيش إجابة مضمونة. في إجابة الموقع متوقعها.',
      timer:{seconds:240, timeoutChoice:'adam', timeoutMessage:'الوقت خلص. النظام اعتبر ترددك جزءًا من النموذج.'},
      choices:[
        {
          id:'adam', label:'آدم', description:'أعطي المفتاح للشخص اللي كان داخل النظام من البداية.',
          effect:{flags:{finalTrustedAdam:true},stats:{adamTrust:1,influence:1}}, next:'prediction-correct'
        },
        {
          id:'yara', label:'يارا', description:'أعطي المفتاح للشخص اللي عاش خارج الصورة سنتين.',
          effect:{flags:{finalTrustedYara:true},stats:{observerTrust:1}}, next:'prediction-deviation'
        },
        {
          id:'mariam', label:'مريم', description:'أعطي المفتاح للشخص اللي لم تكن أصلًا جزءًا من النموذج الأصلي.',
          effect:{flags:{finalTrustedMariam:true},stats:{independence:2}}, next:[
            {when:{all:[{flag:'comparedFiles'},{stat:{key:'independence',gte:7}}]},to:'prediction-error'},
            {to:'prediction-mariam'}
          ]
        }
      ]
    },

    'prediction-correct': {
      id:'prediction-correct', type:'system', black:true,
      chapter:'الفصل الثامن · المشارك 45',
      line:'فتح ملف توقع قديم مؤرخ قبل وصولك', big:'التوقع صحيح',
      small:'النظام لم ير المستقبل. هو رتب لك المعلومات التي جعلت هذا الاختيار أكثر احتمالًا.',
      button:'استمرار', next:'final-system-gate'
    },

    'prediction-deviation': {
      id:'prediction-deviation', type:'system', black:true,
      chapter:'الفصل الثامن · المشارك 45',
      line:'فتح ملف التوقع', big:'انحراف مقبول',
      small:'النموذج توقع آدم أولًا، ويارا ثانيًا. ما زلت داخل النطاق.',
      button:'استمرار', next:'final-system-gate'
    },

    'prediction-mariam': {
      id:'prediction-mariam', type:'system', black:true,
      chapter:'الفصل الثامن · المشارك 45',
      line:'فتح ملف التوقع', big:'اختيار غير مفضل',
      small:'مريم كانت أضعف جزء في النموذج... لكنك لم تجمع ما يكفي لكسره.',
      button:'استمرار', next:'final-system-gate'
    },

    'prediction-error': {
      id:'prediction-error', type:'system', black:true, glitch:true,
      chapter:'الفصل الثامن · المشارك 45',
      line:'النظام يعيد الحساب', big:'خطأ في التوقع',
      small:'النموذج لم ينجح في تفسير اختيار مريم.',
      button:'استمرار',
      effect:{flags:{brokeModel:true}},
      next:[
        {
          when:{
            all:[
              {flag:'resistedAtStart'},
              {flag:'comparedFiles'},
              {stat:{key:'independence',gte:9}},
              {stat:{key:'influence',lte:4}}
            ]
          },
          to:'ending-unpredictable'
        },
        {to:'final-system-gate'}
      ]
    },

    'final-system-gate': {
      id:'final-system-gate', type:'system', black:true,
      chapter:'الفصل التاسع · النواة',
      line:'وصلت إلى الخادم الرئيسي', big:'الموقع لا يتنبأ بك',
      small:'هو يختار ما تراه... حتى يصبح اختيارك قابلًا للتوقع.',
      button:'فتح قرار الإيقاف',
      next:[
        {when:{stat:{key:'influence',gte:8}},to:'perfect-subject-lock'},
        {to:'final-choice'}
      ]
    },

    'perfect-subject-lock': {
      id:'perfect-subject-lock', type:'system', black:true, danger:true, glitch:true,
      chapter:'الفصل التاسع · النواة',
      line:'لا حاجة لسؤالك', big:'قابلية التوقع 96%',
      small:'اتبعت الإشارات بما يكفي. النظام اختار بالنيابة عنك.',
      button:'عرض النتيجة', next:'ending-perfect-subject'
    },

    'final-choice': {
      id:'final-choice', type:'decision', black:true,
      chapter:'الفصل التاسع · النواة',
      kicker:'قرار أخير', title:'هل توقف LAST SEEN؟',
      prompt:'أي اختيار هنا هيحفظ حاجة ويضيع حاجة.',
      choices:[
        {
          id:'destroy', label:'تدمير النظام', description:'أوقفه فورًا حتى لو ضاعت بيانات ضحايا لم تُنسخ.',
          effect:{stats:{independence:1}}, next:'ending-buried-truth'
        },
        {
          id:'keep', label:'الحفاظ على النظام', description:'أسيبه شغال عشان البيانات تفضل متاحة للتحقيق.',
          effect:{stats:{policeTrust:1}}, next:'ending-keep-online'
        },
        {
          id:'copy-destroy', label:'نسخ الأدلة ثم تدمير النظام', description:'أفصل بيانات الضحايا عن المنصة قبل الإيقاف.',
          secret:true,
          when:{
            all:[
              {flag:'foundEncryptionKey'},
              {flag:'comparedFiles'},
              {flag:'foundBackupPath'},
              {notFlag:'serverEvidenceLost'}
            ]
          },
          effect:{flags:{copiedEvidence:true},evidence:['backup-drive'],stats:{accuracy:2,independence:2}}, next:'backup-copy'
        }
      ]
    },

    'backup-copy': {
      id:'backup-copy', type:'report', black:true,
      chapter:'الفصل التاسع · النواة',
      kicker:'قبل الإيقاف', title:'النسخة خرجت',
      text:'مفتاح آدم فتح المسار المشفر، ومقارنة الملفين كشفت النسخة المنفصلة. بيانات الضحايا خرجت من النظام قبل تدميره.',
      seal:'نسخة أدلة مستقلة · تم التحقق',
      items:[
        {label:'بيانات الضحايا',value:s=>'محفوظة'},
        {label:'الخادم الرئيسي',value:s=>'جاهز للإيقاف'},
        {label:'LAST SEEN',value:s=>'لن يحتاج أن يظل حيًا'}
      ],
      button:'إيقاف النظام', next:'ending-cut-thread'
    },

    'ending-buried-truth': {
      id:'ending-buried-truth', type:'end', black:true,
      chapter:'النهاية',
      kicker:'نهاية', title:'الحقيقة المدفونة',
      text:'الخوادم سكتت. LAST SEEN توقف. لكن أجزاء من سجل الضحايا اختفت معه، وبعض الأسئلة لن يبقى لها دليل.',
      seal:'النظام انتهى · الحقيقة ناقصة'
    },

    'ending-keep-online': {
      id:'ending-keep-online', type:'end', black:true,
      chapter:'النهاية',
      kicker:'نهاية', title:'راقب فقط',
      text:'الشرطة حصلت على البيانات، لكن المنصة فضلت موجودة. بعد ساعات من إغلاق الملف، ظهر مستخدم جديد متصل.',
      seal:'LAST SEEN · متصل'
    },

    'ending-cut-thread': {
      id:'ending-cut-thread', type:'end', black:true,
      chapter:'النهاية',
      kicker:'نهاية', title:'قطعت الخيط',
      text:'الأدلة خرجت أولًا. بعد كده اتفصلت الخوادم واتدمرت مفاتيح التشغيل. الضحايا فضل لهم ملف... والمنصة لا.',
      seal:'45 · خرج من التجربة'
    },

    'ending-perfect-subject': {
      id:'ending-perfect-subject', type:'end', black:true,
      chapter:'النهاية',
      kicker:'نهاية', title:'المشارك المثالي',
      text:'كنت بتدور طول الوقت على الاختيار الصح. وده تحديدًا خلّاك أسهل شخص يتوجّه. آخر قرار ماكانش قرارك.',
      seal:'قابلية التوقع · 96%'
    },

    'ending-unpredictable': {
      id:'ending-unpredictable', type:'end', black:true,
      chapter:'نهاية سرية',
      kicker:'41%', title:'غير قابل للتوقع',
      text:'الواجهة تنهار. الملف يختفي من قائمة القضايا كأنه لم يوجد. قبل آخر شاشة سوداء، تظهر رسالة واحدة من يارا: «متقفلش الصفحة.» وبعدها: 45 خرج عن المسار.',
      seal:'إنجاز نادر · غير قابل للتوقع'
    }
  }
};