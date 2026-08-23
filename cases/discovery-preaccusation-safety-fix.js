/* ============================================================
   الاكتشافات — مراجعة عدم حرق الحل قبل الاتهام (2026-08-24)
   تخلي الإنقاذ/التفتيش يثبت الواقعة أو المكان من غير ما يعلن
   هوية الجاني صراحة قبل قرار اللاعب النهائي.
   ============================================================ */
(() => {
  'use strict';

  const getEvidence = (c,id) => (c && Array.isArray(c.evidence) ? c.evidence : []).find(e=>e && e.id===id);
  const getAction = (c,id) => (c && Array.isArray(c.investigationActions) ? c.investigationActions : []).find(a=>a && a.id===id);

  /* ----------------------------------------------------------
     خطوبة مؤجلة — الإنقاذ تم إصلاحه في rescue-fix؛ هنا نضبط
     النهايات القديمة عشان ما ترجعش تقول إن معتز ما زال في خطر
     أو إن شهادته حسمت هوية المسؤول قبل الاتهام.
     ---------------------------------------------------------- */
  if(typeof CASE_POSTPONED_ENGAGEMENT !== 'undefined'){
    const c = CASE_POSTPONED_ENGAGEMENT;
    if(c.endings && c.endings.good && Array.isArray(c.endings.good.paragraphs)){
      c.endings.good.paragraphs[1] = 'شهادة البواب كسرت كذبة حسن، والكاميرا سجلت رقم العربية ومعتز بداخلها، ثم قاد التتبع للمخزن. المداهمة أنقذت معتز وأثبتت مكان الاحتجاز، وبعدها ربط التحقيق بين الدين، حركة العربية، صلة المخزن، وتناقض رواية حسن للوصول للمسؤولية.';
    }
    if(c.endings && c.endings.partial && Array.isArray(c.endings.partial.paragraphs)){
      c.endings.partial.paragraphs[0] = 'معتز اتلاقى واتأنقذ، لكن سلسلة الإثبات على الشخص المسؤول لسه ناقصة. لازم تربط حركة العربية، صلة المخزن، والقرائن المالية قبل ما تعتبر الاتهام محسوم.';
    }
    if(c.endings && c.endings.bad && Array.isArray(c.endings.bad.paragraphs)){
      c.endings.bad.paragraphs[0] = 'معتز اتلاقى واتأنقذ، لكن اتهام {wrongName} ماكانش مدعوم بالسلسلة الكاملة. الإنقاذ أثبت مكان الاحتجاز، مش هوية المسؤول وحدها.';
    }
  }

  /* ----------------------------------------------------------
     الرسالة المشفرة — المداهمة تنقذ نور وتثبت صحة الموقع، لكن
     نور لا تسمي يارا صراحة قبل اتهام اللاعب.
     ---------------------------------------------------------- */
  if(typeof CASE_CODED_MESSAGE !== 'undefined'){
    const c = CASE_CODED_MESSAGE;
    const found = getEvidence(c,'noor_found_old_villa');
    if(found){
      found.title = 'العثور على نور داخل مخزن الفيلا';
      found.short = 'المداهمة عثرت على نور حيّة داخل المخزن المحدد من الشفرة';
      found.full = 'فك الرسالة وتحديد مخزن B-12 قادا للمكان الصحيح، وتم العثور على نور حيّة داخله. أكدت إنها نُقلت للمكان بعد المدرسة وإن الشخص اللي احتجزها كان يعرف روتينها ومواعيدها، لكنها لم تستطع تحديد هويته بشكل قاطع وقت الإنقاذ. المداهمة تثبت صحة الموقع ومسار الخطف، لا اسم المسؤول وحده.';
    }
    const raid = getAction(c,'raid_coded_villa');
    if(raid){
      raid.successText = 'تم العثور على نور وإنقاذها داخل مخزن B-12. موقع الاحتجاز اتثبت، لكن هوية المسؤول لسه محتاجة ربط باقي الأدلة.';
    }
    if(c.endings && c.endings.partial && Array.isArray(c.endings.partial.paragraphs)){
      c.endings.partial.paragraphs[0] = 'نور اتأنقذت بعد الوصول للمخزن، لكن الأدلة اللي جمعتها على هوية المسؤول لسه مش كفاية تقفل القضية رسميًا.';
    }
    if(c.endings && c.endings.bad && Array.isArray(c.endings.bad.paragraphs)){
      c.endings.bad.paragraphs[0] = 'نور اتأنقذت، لكن اتهام {wrongName} ما اتسندش بسلسلة الأدلة الصحيحة. الوصول للمخزن أثبت مكان الاحتجاز، مش هوية الخاطف بمفرده.';
    }
  }

  /* ----------------------------------------------------------
     دهب الفرح — التفتيش يرجع الدهب من نقطة إخفاء على المسار من
     غير ما يلاقيه في ملابس إبراهيم قبل قرار الاتهام.
     ---------------------------------------------------------- */
  if(typeof CASE_WEDDING_GOLD !== 'undefined'){
    const c = CASE_WEDDING_GOLD;
    const bag = getEvidence(c,'gold_bag_found');
    if(bag){
      bag.title = 'العثور على الشنطة والدهب في نقطة إخفاء على المسار';
      bag.short = 'الشنطة والدهب اتلاقوا داخل صندوق الخدمة خ-12 على الممر الجانبي';
      bag.full = 'بعد إعادة بناء مسار الحركة وتتبع صندوق الخدمة خ-12، التفتيش كشف تجويفًا سفليًا داخل الصندوق. الشنطة والدهب كانوا مخبّيين جواه. الصندوق اتنقل وقت الضلمة وعلى نفس المسار الخارج من ناحية ترابيزة 14، لكن مكان العثور وحده لا يحدد مين وضعهم هناك.';
    }
    const search = getAction(c,'wedding_search_route_v2');
    if(search){
      search.label = 'فتّش صندوق الخدمة ونقطة الإخفاء';
      search.description = 'بعد إثبات مسار الحركة ومطابقة ترابيزة 14 وتتبع صندوق خ-12، فتّش نقطة الإخفاء نفسها بدل افتراض هوية السارق.';
      search.requires = ['route_reconstruction','wedding_table14_lookup','wedding_service_box_trace'];
      search.successText = 'تم العثور على الشنطة والدهب داخل تجويف في صندوق الخدمة خ-12. مكان الإخفاء اتثبت، لكن هوية السارق لسه محتاجة ربط باقي القرائن.';
    }
    if(c.endings && c.endings.partial && Array.isArray(c.endings.partial.paragraphs)){
      c.endings.partial.paragraphs[0] = 'وصلت لمسار السرقة ونقطة الإخفاء، لكن الربط بين المسار والشخص المسؤول لسه ناقص عشان تقفل الاتهام بشكل قوي.';
    }
    if(c.endings && c.endings.bad && Array.isArray(c.endings.bad.paragraphs)){
      c.endings.bad.paragraphs[0] = 'العثور على الدهب ما يثبتش وحده مين سرقه. اتهام {wrongName} تجاهل تسلسل الحركة والشهادات، فالقضية اتقفلت على الشخص الغلط.';
    }
  }

  /* ----------------------------------------------------------
     المحفظة المفقودة — تخفيف صياغة اللابتوب: يدي خيط تقني قوي
     بدون وصفه كاعتراف أو خطة مثبتة قبل تجميع مسار الأموال.
     ---------------------------------------------------------- */
  if(typeof CASE_LOST_WALLET !== 'undefined'){
    const c = CASE_LOST_WALLET;
    const note = getEvidence(c,'malak_laptop_note');
    if(note){
      note.title = 'محادثات تقنية ومرجع منصة NX-204';
      note.short = 'اللابتوب كشف نقاشًا عن تحويل كبير ومرجع متابعة NX-204';
      note.full = 'بعد فتح اللابتوب ظهرت محادثات تقنية عن تجهيز تحويل كبير قبل الانهيار، ومعاها مرجع متابعة على منصة تداول مكتوب NX-204. المحتوى يثبت معرفة مسبقة بالتحويل، لكن المرجع نفسه لازم يتراجع على المنصة قبل ما يربط الأموال بحساب محدد.';
    }
  }

  try{
    window.__TARAF_DISCOVERY_PREACCUSATION_AUDIT__ = {
      version:'2026-08-24-v1',
      reviewed:['room-307','postponed-engagement','coded-message','false-rumor','lost-wallet','wedding-gold'],
      changed:['postponed-engagement','coded-message','lost-wallet','wedding-gold']
    };
  }catch(_){}
})();
