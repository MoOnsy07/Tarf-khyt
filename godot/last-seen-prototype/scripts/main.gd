extends Control

const SAVE := "user://last_seen_godot.save"
const IMG := {
 "noise":"res://assets/surveillance.webp", "night":"res://assets/apartment_night.webp",
 "day":"res://assets/apartment_day.webp", "room":"res://assets/bedroom_day.webp",
 "yara":"res://assets/yara.webp", "hall":"res://assets/hallway.webp"
}
var s={"node":"file","name":"","beat":0,"ev":[],"flags":{},"stats":{"inv":0,"ind":0,"inf":0,"police":0},"search_at":0}
var bg:TextureRect; var box:VBoxContainer; var chapter:Label; var layer:Control
var blackout:ColorRect; var tick:Timer; var left:=150.0; var tween:Tween

func _ready():
 layout_direction=Control.LAYOUT_DIRECTION_RTL; _ui(); _load(); show_node()

func panel(c:=Color(0.025,0.033,0.045,.92),r:=14):
 var x=StyleBoxFlat.new(); x.bg_color=c; x.border_color=Color(1,1,1,.11); x.set_border_width_all(1)
 x.corner_radius_top_left=r;x.corner_radius_top_right=r;x.corner_radius_bottom_left=r;x.corner_radius_bottom_right=r; return x
func lab(t,sz:=18,c:=Color("eeeae3")):
 var x=Label.new();x.text=t;x.autowrap_mode=TextServer.AUTOWRAP_WORD_SMART;x.horizontal_alignment=HORIZONTAL_ALIGNMENT_RIGHT;x.add_theme_font_size_override("font_size",sz);x.add_theme_color_override("font_color",c);return x
func btn(t,fn,sub:="",danger:=false):
 var b=Button.new();b.text=t if sub=="" else t+"\n"+sub;b.alignment=HORIZONTAL_ALIGNMENT_RIGHT;b.custom_minimum_size=Vector2(0,58);b.add_theme_font_size_override("font_size",14)
 b.add_theme_stylebox_override("normal",panel(Color(.055,.07,.092,.96),11)); if danger:b.add_theme_color_override("font_color",Color("efb9b9"))
 b.pressed.connect(func(): tone(430,.03,.025);fn.call());return b
func clear():
 for x in box.get_children():x.queue_free()
 for x in layer.get_children():x.queue_free()
func scene(ch,k,title,text,image,small:=""):
 clear();chapter.text=ch;set_bg(image);box.add_child(lab(k,10,Color("cdb77f")));box.add_child(lab(title,40,Color("f4f0e8")));box.add_child(lab(text,22));
 if small!="":box.add_child(lab(small,12,Color("9fa6af")))
func choices(a):
 var v=VBoxContainer.new();v.add_theme_constant_override("separation",8)
 for x in a: v.add_child(x)
 box.add_child(v)

func _ui():
 bg=TextureRect.new();bg.set_anchors_and_offsets_preset(PRESET_FULL_RECT);bg.expand_mode=TextureRect.EXPAND_IGNORE_SIZE;bg.stretch_mode=TextureRect.STRETCH_KEEP_ASPECT_COVERED;bg.mouse_filter=MOUSE_FILTER_IGNORE;add_child(bg)
 var shade=ColorRect.new();shade.set_anchors_and_offsets_preset(PRESET_FULL_RECT);shade.color=Color(0,0,0,.25);shade.mouse_filter=MOUSE_FILTER_IGNORE;add_child(shade)
 layer=Control.new();layer.set_anchors_and_offsets_preset(PRESET_FULL_RECT);add_child(layer)
 var top=PanelContainer.new();top.set_anchors_preset(PRESET_TOP_WIDE);top.offset_bottom=62;top.add_theme_stylebox_override("panel",panel(Color(.015,.02,.028,.95),0));add_child(top)
 var tm=MarginContainer.new();tm.add_theme_constant_override("margin_left",22);tm.add_theme_constant_override("margin_right",22);tm.add_theme_constant_override("margin_top",10);top.add_child(tm)
 var row=HBoxContainer.new();tm.add_child(row);var brand=lab("طرف خيط\nآخر مُشاهد · Godot",16);brand.size_flags_horizontal=SIZE_EXPAND_FILL;row.add_child(brand);chapter=lab("الملف 45",11,Color("aab0b9"));row.add_child(chapter);var reset=Button.new();reset.text="إعادة";reset.flat=true;reset.pressed.connect(reset_game);row.add_child(reset)
 var m=MarginContainer.new();m.set_anchors_and_offsets_preset(PRESET_FULL_RECT);m.add_theme_constant_override("margin_left",28);m.add_theme_constant_override("margin_right",28);m.add_theme_constant_override("margin_top",90);m.add_theme_constant_override("margin_bottom",32);m.mouse_filter=MOUSE_FILTER_IGNORE;add_child(m)
 var bottom=VBoxContainer.new();bottom.alignment=BoxContainer.ALIGNMENT_END;bottom.size_flags_vertical=SIZE_EXPAND_FILL;m.add_child(bottom)
 var card=PanelContainer.new();card.custom_minimum_size=Vector2(0,265);card.add_theme_stylebox_override("panel",panel());card.mouse_filter=MOUSE_FILTER_STOP;bottom.add_child(card)
 var cm=MarginContainer.new();cm.add_theme_constant_override("margin_left",26);cm.add_theme_constant_override("margin_right",26);cm.add_theme_constant_override("margin_top",22);cm.add_theme_constant_override("margin_bottom",22);card.add_child(cm);box=VBoxContainer.new();box.add_theme_constant_override("separation",10);cm.add_child(box)
 blackout=ColorRect.new();blackout.set_anchors_and_offsets_preset(PRESET_FULL_RECT);blackout.color=Color(0,0,0,0);blackout.mouse_filter=MOUSE_FILTER_IGNORE;add_child(blackout)
 tick=Timer.new();tick.wait_time=.1;tick.timeout.connect(search_tick);add_child(tick)

func set_bg(k):
 var tex=load(IMG.get(k,IMG.noise));if tex:bg.texture=tex
 bg.position=Vector2.ZERO;bg.scale=Vector2.ONE;bg.pivot_offset=size/2
 if tween and tween.is_valid():tween.kill()
 tween=create_tween().set_loops();tween.tween_property(bg,"scale",Vector2(1.045,1.045),8).set_trans(Tween.TRANS_SINE);tween.tween_property(bg,"scale",Vector2.ONE,8).set_trans(Tween.TRANS_SINE)
func go(n):s.node=n;save();blackout.color.a=0;var t=create_tween();t.tween_property(blackout,"color:a",.78,.12);t.tween_callback(show_node);t.tween_property(blackout,"color:a",0,.2)
func stat(k,n):s.stats[k]=int(s.stats.get(k,0))+n
func show_node():
 tick.stop()
 match s.node:
  "file":file_screen();"trace":trace_screen();"deleted":deleted_screen();"return":return_screen();"name":name_screen();"intro":intro_screen();"morning":morning_screen();"search":search_screen();"police":police_screen();"end":end_screen()

func file_screen():
 scene("الملف 45","ملف وارد · المصدر مجهول","وصل ملف جديد","رقم الملف: 45\nالحالة: غير مصرح بالفتح","noise","الملف ظهر داخل نظامك من غير ما تطلبه.")
 choices([btn("فتح الملف",func():stat("inf",1);go("name"),"أدخل مباشرة."),btn("معرفة المرسل أولًا",func():stat("inv",2);stat("ind",2);s.flags.traced=true;go("trace"),"أتتبع المصدر."),btn("حذف الملف",func():stat("ind",3);stat("inf",-1);s.flags.resisted=true;go("deleted"),"مش هفتح ملف مجهول.",true)])
func trace_screen():scene("الملف 45","جارٍ التتبع...","المصدر غير موجود","المسار انتهى عند نقطة لا يفترض إنها موجودة.","noise","ظهر سطر: «بتدور على إيه؟»");glitch();choices([btn("فتح الملف",func():go("name"))])
func deleted_screen():scene("الملف 45","تم تنفيذ الأمر","تم حذف الملف","لا توجد نسخة في سلة المحذوفات.","noise");choices([btn("العودة",func():go("return"))])
func return_screen():scene("الملف 45","بعد ثانيتين","قلت لك افتحني","الملف رجع لوحده. رقم الملف ما زال 45.","noise");glitch();choices([btn("فتح",func():go("name"),"",true)])
func name_screen():
 scene("بيانات المحقق","دخول الملف","تسجيل الدخول","اكتب الاسم اللي هتستخدمه داخل التحقيق.","night");var input=LineEdit.new();input.placeholder_text="الاسم";input.text=s.name;input.custom_minimum_size=Vector2(0,50);input.alignment=HORIZONTAL_ALIGNMENT_RIGHT;box.add_child(input)
 var enter=func():
  if input.text.strip_edges()=="": return
  s.name=input.text.strip_edges();s.beat=0;go("intro")
 choices([btn("دخول",enter)]);input.grab_focus()
func intro_screen():
 var a=[ ["قبل البلاغ بـ 9 ساعات","شقة آدم فؤاد","الساعة 2:13 صباحًا. آدم قاعد لوحده قدام اللابتوب، والنور الوحيد جاي من الشاشة.","night"], ["LAST SEEN","يارا 17","يفتح بث لغرفة نوم. بنت نايمة. العدّاد بينقص.","room"], ["LAST SEEN","يارا 17","قبل ما العدّاد يخلص، البنت تفتح عينيها وتبص مباشرة ناحية الكاميرا.","yara"], ["رسالة على الشاشة","أنت شاهدت","الآن جاء دورك.","noise"], ["قبل البلاغ بـ 9 ساعات","خبطة واحدة","آدم يبص ناحية باب الشقة… والشاشة تسود.","night"] ]
 var i=clampi(int(s.beat),0,a.size()-1);var q=a[i];scene("الفصل الأول · الملف 45",q[0],q[1],q[2],q[3]);if i==3:glitch();flash("أهلًا، "+s.name);if i==4:knock()
 var advance=func():
  if i<a.size()-1:
   s.beat=i+1;save();intro_screen()
  else:
   go("morning")
 choices([btn("استمرار" if i==a.size()-1 else "التالي",advance)])
func morning_screen():scene("08:36 صباحًا","شقة آدم","آدم اختفى","باب الشقة مقفول. مفيش كسر، مفيش دم، ومفيش جثة.\n\nالموبايل والمحفظة موجودين… لكن آدم نفسه مش موجود.","day","على الحائط جنب المكتب: 17. الشرطة في الطريق.");choices([btn("ابدأ التفتيش",func():s.search_at=Time.get_unix_time_from_system();go("search"),"4 نقاط مهمة، هتلحق 3 بس.")])

func search_screen():
 clear();chapter.text="مسرح 01 · شقة آدم";set_bg("day");box.add_child(lab("تفتيش محدود",10,Color("cdb77f")));box.add_child(lab("شقة آدم",38));box.add_child(lab("فحوص متبقية: "+str(max(0,3-s.ev.size())),18));var tl=lab("الشرطة في الطريق",12,Color("a8aeb7"));tl.name="TimerLabel";box.add_child(tl);box.add_child(lab("اضغط نقاط الفحص داخل المشهد.",12,Color("9fa6af")))
 hotspot("laptop",Vector2(.12,.59),"اللابتوب","سجل دخول متكرر إلى LAST SEEN.");hotspot("camera",Vector2(.32,.32),"المكتبة","كاميرا بتصور آدم من غير علمه.");hotspot("phone",Vector2(.64,.68),"الهاتف","مكالمة محذوفة مع «مريم» قبل الاختفاء بـ18 دقيقة.");hotspot("numbers",Vector2(.78,.48),"الورقة","17، 24، 31، 38، 45 ؟")
 if s.ev.size()>=3:choices([btn("إنهاء الفحص",func():go("police"),"الدليل الرابع خرج من إيدك.")])
 if float(s.search_at)<=0: s.search_at=Time.get_unix_time_from_system()
 left=maxf(1,150-(Time.get_unix_time_from_system()-float(s.search_at)));tick.start()
func hotspot(id,pos,title,detail):
 if id in s.ev:return
 var b=Button.new();b.text="◉";b.anchor_left=pos.x;b.anchor_right=pos.x;b.anchor_top=pos.y;b.anchor_bottom=pos.y;b.offset_left=-28;b.offset_right=28;b.offset_top=-28;b.offset_bottom=28;b.add_theme_font_size_override("font_size",25);b.add_theme_color_override("font_color",Color("dbc78f"));b.add_theme_stylebox_override("normal",panel(Color(.03,.04,.05,.42),28));b.tooltip_text=title;b.pressed.connect(func():take(id,title,detail));layer.add_child(b)
func take(id,title,detail):
 tick.stop();scene("فحص موضعي","دليل",title,detail,"day");var extra={"laptop":"آخر جلسة 1:57 صباحًا.","camera":"أقدم تسجيل يرجع لـ11 يوم.","phone":"الاسم المحفوظ: مريم.","numbers":"الرقم 45 تحته علامة استفهام."}[id];box.add_child(lab(extra,12,Color("9fa6af")));choices([btn("سجّل الدليل",func():s.ev.append(id);stat("inv",1 if id=="phone" else 2);if id=="numbers":stat("ind",1);save();search_screen()),btn("رجوع",func():search_screen())])
func search_tick():
 left=maxf(0,150-(Time.get_unix_time_from_system()-float(s.search_at)));var x=box.get_node_or_null("TimerLabel")
 if x: x.text="الشرطة في الطريق · %02d:%02d"%[int(left/60),int(left)%60]
 if left<=0: go("police")

func police_screen():
 scene("وحدة الجرائم الإلكترونية","أول إفادة رسمية","الضابط حسام وصل","«لقيت حاجة غير طبيعية قبل ما نوصل؟»","hall","قرارك هيتحفظ. مش كل نتيجة هتظهر دلوقتي.");var a=[btn("أقول كل اللي لقيته",func():stat("police",3);stat("ind",-1);s.flags.told=true;go("end"),"أسلم كل المعلومات للفريق.")]
 if "laptop" in s.ev:a.append(btn("أخفي وجود LAST SEEN",func():stat("police",-1);stat("ind",2);stat("inf",1);s.flags.hid_site=true;go("end"),"أحتفظ بالموقع لنفسي."))
 if "camera" in s.ev:a.append(btn("أخفي الكاميرا",func():stat("police",-2);stat("ind",2);s.flags.hid_camera=true;go("end"),"القرار ده هيرجعلك بعدين.",true))
 a.append(btn("أقول إن الفحص ماوصلش لحاجة",func():stat("police",-2);stat("ind",3);s.flags.hid=true;go("end"),"أحتفظ بكل اللي عرفته."));choices(a)
func end_screen():scene("نهاية النموذج","أول 10 دقائق","هنا يبدأ الفرق الحقيقي","النموذج بيقف عند أول إفادة للشرطة.\n\nجرّبت حركة الكاميرا، Fade، Glitch، صوت مولد داخل المحرك، Hotspots، عدّاد وحفظ حالة.","hall","لو الإحساس مناسب نكمّل من المراقب 00.");box.add_child(lab("الأدلة %d/3 · التحقيق %d · الاستقلالية %d · التوجيه %d"%[s.ev.size(),s.stats.inv,s.stats.ind,s.stats.inf],13,Color("cdb77f")));choices([btn("إعادة النموذج",reset_game)])

func glitch():var p=bg.position;var t=create_tween();t.tween_property(bg,"position",p+Vector2(-7,0),.04);t.tween_property(bg,"position",p+Vector2(9,1),.04);t.tween_property(bg,"position",p,.06);tone(80,.1,.1)
func knock():tone(58,.16,.17);var p=bg.position;var t=create_tween();t.tween_property(bg,"position",p+Vector2(6,0),.04);t.tween_property(bg,"position",p-Vector2(5,0),.04);t.tween_property(bg,"position",p,.06)
func flash(t):var l=lab(t,38);l.set_anchors_and_offsets_preset(PRESET_FULL_RECT);l.horizontal_alignment=HORIZONTAL_ALIGNMENT_CENTER;l.vertical_alignment=VERTICAL_ALIGNMENT_CENTER;add_child(l);l.modulate.a=0;var q=create_tween();q.tween_property(blackout,"color:a",.9,.08);q.parallel().tween_property(l,"modulate:a",1,.08);q.tween_interval(.35);q.tween_property(l,"modulate:a",0,.15);q.parallel().tween_property(blackout,"color:a",0,.18);q.tween_callback(l.queue_free)
func tone(f,d,v):
 var g=AudioStreamGenerator.new();g.mix_rate=22050;g.buffer_length=maxf(.2,d+.05)
 var a=AudioStreamPlayer.new();a.stream=g;add_child(a);a.play()
 var p=a.get_stream_playback() as AudioStreamGeneratorPlayback
 if p==null: return
 for i in range(int(g.mix_rate*d)):
  var z=float(i)/float(g.mix_rate*d);var sm=sin(TAU*f*i/g.mix_rate)*v*pow(1-z,2);p.push_frame(Vector2(sm,sm))
 get_tree().create_timer(d+.1).timeout.connect(a.queue_free)
func save():
 var f=FileAccess.open(SAVE,FileAccess.WRITE)
 if f:
  f.store_string(JSON.stringify(s));f.close()
func _load():
 if FileAccess.file_exists(SAVE):
  var f=FileAccess.open(SAVE,FileAccess.READ);var x=JSON.parse_string(f.get_as_text())
  if typeof(x)==TYPE_DICTIONARY: s=x
func reset_game():
 if FileAccess.file_exists(SAVE): DirAccess.remove_absolute(ProjectSettings.globalize_path(SAVE))
 s={"node":"file","name":"","beat":0,"ev":[],"flags":{},"stats":{"inv":0,"ind":0,"inf":0,"police":0},"search_at":0};show_node()
