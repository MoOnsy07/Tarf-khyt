extends Control

const SAVE_PATH := "user://last_seen_godot.save"
const IMG := {
    "night": "res://assets/apartment_night.webp",
    "day": "res://assets/apartment_day.webp",
    "room": "res://assets/bedroom_day.webp",
    "yara": "res://assets/yara.webp",
    "hall": "res://assets/hallway.webp"
}

var state := {
    "node": "file",
    "name": "",
    "beat": 0,
    "evidence": [],
    "flags": {},
    "stats": {"inv": 0, "ind": 0, "inf": 0, "police": 0},
    "search_started": 0.0
}

var bg: TextureRect
var content_box: VBoxContainer
var chapter_label: Label
var hotspot_layer: Control
var blackout: ColorRect
var search_timer: Timer
var search_left := 150.0
var camera_tween: Tween

func _ready() -> void:
    layout_direction = Control.LAYOUT_DIRECTION_RTL
    build_ui()
    load_state()
    render_node()

func make_panel(color: Color = Color(0.025, 0.033, 0.045, 0.92), radius: int = 14) -> StyleBoxFlat:
    var style := StyleBoxFlat.new()
    style.bg_color = color
    style.border_color = Color(1, 1, 1, 0.11)
    style.set_border_width_all(1)
    style.corner_radius_top_left = radius
    style.corner_radius_top_right = radius
    style.corner_radius_bottom_left = radius
    style.corner_radius_bottom_right = radius
    return style

func make_label(text_value: String, size_value: int = 18, color_value: Color = Color("eeeae3")) -> Label:
    var label := Label.new()
    label.text = text_value
    label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    label.add_theme_font_size_override("font_size", size_value)
    label.add_theme_color_override("font_color", color_value)
    return label

func make_button(title: String, callback: Callable, subtitle: String = "", danger: bool = false) -> Button:
    var button := Button.new()
    button.text = title if subtitle.is_empty() else title + "\n" + subtitle
    button.alignment = HORIZONTAL_ALIGNMENT_RIGHT
    button.custom_minimum_size = Vector2(0, 58)
    button.add_theme_font_size_override("font_size", 14)
    button.add_theme_stylebox_override("normal", make_panel(Color(0.055, 0.07, 0.092, 0.96), 11))
    if danger:
        button.add_theme_color_override("font_color", Color("efb9b9"))
    button.pressed.connect(callback)
    return button

func build_ui() -> void:
    bg = TextureRect.new()
    bg.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    bg.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    bg.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
    bg.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(bg)

    var shade := ColorRect.new()
    shade.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    shade.color = Color(0, 0, 0, 0.28)
    shade.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(shade)

    hotspot_layer = Control.new()
    hotspot_layer.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    add_child(hotspot_layer)

    var top := PanelContainer.new()
    top.set_anchors_preset(PRESET_TOP_WIDE)
    top.offset_bottom = 62
    top.add_theme_stylebox_override("panel", make_panel(Color(0.015, 0.02, 0.028, 0.95), 0))
    add_child(top)

    var top_margin := MarginContainer.new()
    top_margin.add_theme_constant_override("margin_left", 22)
    top_margin.add_theme_constant_override("margin_right", 22)
    top_margin.add_theme_constant_override("margin_top", 10)
    top.add_child(top_margin)

    var row := HBoxContainer.new()
    top_margin.add_child(row)
    var brand := make_label("طرف خيط\nآخر مُشاهد · Godot", 16)
    brand.size_flags_horizontal = SIZE_EXPAND_FILL
    row.add_child(brand)
    chapter_label = make_label("الملف 45", 11, Color("aab0b9"))
    row.add_child(chapter_label)
    var reset_button := Button.new()
    reset_button.text = "إعادة"
    reset_button.flat = true
    reset_button.pressed.connect(reset_game)
    row.add_child(reset_button)

    var outer := MarginContainer.new()
    outer.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    outer.add_theme_constant_override("margin_left", 28)
    outer.add_theme_constant_override("margin_right", 28)
    outer.add_theme_constant_override("margin_top", 90)
    outer.add_theme_constant_override("margin_bottom", 32)
    outer.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(outer)

    var bottom := VBoxContainer.new()
    bottom.alignment = BoxContainer.ALIGNMENT_END
    bottom.size_flags_vertical = SIZE_EXPAND_FILL
    outer.add_child(bottom)

    var card := PanelContainer.new()
    card.custom_minimum_size = Vector2(0, 265)
    card.add_theme_stylebox_override("panel", make_panel())
    card.mouse_filter = MOUSE_FILTER_STOP
    bottom.add_child(card)

    var card_margin := MarginContainer.new()
    card_margin.add_theme_constant_override("margin_left", 26)
    card_margin.add_theme_constant_override("margin_right", 26)
    card_margin.add_theme_constant_override("margin_top", 22)
    card_margin.add_theme_constant_override("margin_bottom", 22)
    card.add_child(card_margin)

    content_box = VBoxContainer.new()
    content_box.add_theme_constant_override("separation", 10)
    card_margin.add_child(content_box)

    blackout = ColorRect.new()
    blackout.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    blackout.color = Color(0, 0, 0, 0)
    blackout.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(blackout)

    search_timer = Timer.new()
    search_timer.wait_time = 0.1
    search_timer.timeout.connect(update_search_timer)
    add_child(search_timer)

func clear_stage() -> void:
    for child in content_box.get_children():
        child.queue_free()
    for child in hotspot_layer.get_children():
        child.queue_free()

func set_background(key: String) -> void:
    var path: String = IMG.get(key, IMG["night"])
    var texture = load(path)
    if texture:
        bg.texture = texture
    bg.position = Vector2.ZERO
    bg.scale = Vector2.ONE
    bg.pivot_offset = size / 2.0
    if camera_tween and camera_tween.is_valid():
        camera_tween.kill()
    camera_tween = create_tween().set_loops()
    camera_tween.tween_property(bg, "scale", Vector2(1.045, 1.045), 8.0).set_trans(Tween.TRANS_SINE)
    camera_tween.tween_property(bg, "scale", Vector2.ONE, 8.0).set_trans(Tween.TRANS_SINE)

func show_scene(chapter: String, kicker: String, title: String, body: String, image_key: String, small: String = "") -> void:
    clear_stage()
    chapter_label.text = chapter
    set_background(image_key)
    content_box.add_child(make_label(kicker, 10, Color("cdb77f")))
    content_box.add_child(make_label(title, 40, Color("f4f0e8")))
    content_box.add_child(make_label(body, 22))
    if not small.is_empty():
        content_box.add_child(make_label(small, 12, Color("9fa6af")))

func add_choices(buttons: Array) -> void:
    var choices := VBoxContainer.new()
    choices.add_theme_constant_override("separation", 8)
    for button in buttons:
        choices.add_child(button)
    content_box.add_child(choices)

func change_stat(key: String, value: int) -> void:
    var stats: Dictionary = state["stats"]
    stats[key] = int(stats.get(key, 0)) + value

func go(node_id: String) -> void:
    state["node"] = node_id
    save_state()
    blackout.color.a = 0.0
    var transition := create_tween()
    transition.tween_property(blackout, "color:a", 0.78, 0.12)
    transition.tween_callback(render_node)
    transition.tween_property(blackout, "color:a", 0.0, 0.20)

func render_node() -> void:
    search_timer.stop()
    match String(state["node"]):
        "file":
            render_file()
        "trace":
            render_trace()
        "deleted":
            render_deleted()
        "returned":
            render_returned()
        "name":
            render_name()
        "intro":
            render_intro()
        "morning":
            render_morning()
        "search":
            render_search()
        "police":
            render_police()
        "end":
            render_end()
        _:
            state["node"] = "file"
            render_file()

func render_file() -> void:
    show_scene("الملف 45", "ملف وارد · المصدر مجهول", "وصل ملف جديد", "رقم الملف: 45\nالحالة: غير مصرح بالفتح", "night", "الملف ظهر داخل نظامك من غير ما تطلبه.")
    add_choices([
        make_button("فتح الملف", func(): change_stat("inf", 1); go("name"), "أدخل مباشرة."),
        make_button("معرفة المرسل أولًا", func(): change_stat("inv", 2); change_stat("ind", 2); state["flags"]["traced"] = true; go("trace"), "أتتبع المصدر."),
        make_button("حذف الملف", func(): change_stat("ind", 3); change_stat("inf", -1); state["flags"]["resisted"] = true; go("deleted"), "مش هفتح ملف مجهول.", true)
    ])

func render_trace() -> void:
    show_scene("الملف 45", "جارٍ التتبع...", "المصدر غير موجود", "المسار انتهى عند نقطة لا يفترض إنها موجودة.", "night", "ظهر سطر: «بتدور على إيه؟»")
    glitch()
    add_choices([make_button("فتح الملف", func(): go("name"))])

func render_deleted() -> void:
    show_scene("الملف 45", "تم تنفيذ الأمر", "تم حذف الملف", "لا توجد نسخة في سلة المحذوفات.", "night")
    add_choices([make_button("العودة", func(): go("returned"))])

func render_returned() -> void:
    show_scene("الملف 45", "بعد ثانيتين", "قلت لك افتحني", "الملف رجع لوحده. رقم الملف ما زال 45.", "night")
    glitch()
    add_choices([make_button("فتح", func(): go("name"), "", true)])

func render_name() -> void:
    show_scene("بيانات المحقق", "دخول الملف", "تسجيل الدخول", "اكتب الاسم اللي هتستخدمه داخل التحقيق.", "night")
    var input := LineEdit.new()
    input.placeholder_text = "الاسم"
    input.text = String(state["name"])
    input.custom_minimum_size = Vector2(0, 50)
    input.alignment = HORIZONTAL_ALIGNMENT_RIGHT
    content_box.add_child(input)
    var enter := func():
        if input.text.strip_edges().is_empty():
            return
        state["name"] = input.text.strip_edges()
        state["beat"] = 0
        go("intro")
    add_choices([make_button("دخول", enter)])
    input.grab_focus()

func render_intro() -> void:
    var beats := [
        ["قبل البلاغ بـ 9 ساعات", "شقة آدم فؤاد", "الساعة 2:13 صباحًا. آدم قاعد لوحده قدام اللابتوب، والنور الوحيد جاي من الشاشة.", "night"],
        ["LAST SEEN", "يارا 17", "يفتح بث لغرفة نوم. بنت نايمة. العدّاد بينقص.", "room"],
        ["LAST SEEN", "يارا 17", "قبل ما العدّاد يخلص، البنت تفتح عينيها وتبص مباشرة ناحية الكاميرا.", "yara"],
        ["رسالة على الشاشة", "أنت شاهدت", "الآن جاء دورك.", "night"],
        ["قبل البلاغ بـ 9 ساعات", "خبطة واحدة", "آدم يبص ناحية باب الشقة… والشاشة تسود.", "night"]
    ]
    var index := clampi(int(state["beat"]), 0, beats.size() - 1)
    var beat_data: Array = beats[index]
    show_scene("الفصل الأول · الملف 45", beat_data[0], beat_data[1], beat_data[2], beat_data[3])
    if index == 3:
        glitch()
        flash_message("أهلًا، " + String(state["name"]))
    if index == 4:
        knock_effect()
    var advance := func():
        if index < beats.size() - 1:
            state["beat"] = index + 1
            save_state()
            render_intro()
        else:
            go("morning")
    add_choices([make_button("استمرار" if index == beats.size() - 1 else "التالي", advance)])

func render_morning() -> void:
    show_scene("08:36 صباحًا", "شقة آدم", "آدم اختفى", "باب الشقة مقفول. مفيش كسر، مفيش دم، ومفيش جثة.\n\nالموبايل والمحفظة موجودين… لكن آدم نفسه مش موجود.", "day", "على الحائط جنب المكتب: 17. الشرطة في الطريق.")
    add_choices([make_button("ابدأ التفتيش", func(): state["search_started"] = Time.get_unix_time_from_system(); go("search"), "4 نقاط مهمة، هتلحق 3 بس.")])

func render_search() -> void:
    clear_stage()
    chapter_label.text = "مسرح 01 · شقة آدم"
    set_background("day")
    content_box.add_child(make_label("تفتيش محدود", 10, Color("cdb77f")))
    content_box.add_child(make_label("شقة آدم", 38))
    var evidence: Array = state["evidence"]
    content_box.add_child(make_label("فحوص متبقية: " + str(max(0, 3 - evidence.size())), 18))
    var timer_label := make_label("الشرطة في الطريق", 12, Color("a8aeb7"))
    timer_label.name = "TimerLabel"
    content_box.add_child(timer_label)
    content_box.add_child(make_label("اضغط نقاط الفحص داخل المشهد.", 12, Color("9fa6af")))

    add_hotspot("laptop", Vector2(0.12, 0.59), "اللابتوب", "سجل دخول متكرر إلى LAST SEEN.")
    add_hotspot("camera", Vector2(0.32, 0.32), "المكتبة", "كاميرا بتصور آدم من غير علمه.")
    add_hotspot("phone", Vector2(0.64, 0.68), "الهاتف", "مكالمة محذوفة مع «مريم» قبل الاختفاء بـ18 دقيقة.")
    add_hotspot("numbers", Vector2(0.78, 0.48), "الورقة", "17، 24، 31، 38، 45 ؟")

    if evidence.size() >= 3:
        add_choices([make_button("إنهاء الفحص", func(): go("police"), "الدليل الرابع خرج من إيدك.")])
    if float(state["search_started"]) <= 0.0:
        state["search_started"] = Time.get_unix_time_from_system()
    search_left = maxf(1.0, 150.0 - (Time.get_unix_time_from_system() - float(state["search_started"])))
    search_timer.start()

func add_hotspot(id: String, position_ratio: Vector2, title: String, detail: String) -> void:
    var evidence: Array = state["evidence"]
    if id in evidence:
        return
    if evidence.size() >= 3:
        return
    var button := Button.new()
    button.text = "◉"
    button.anchor_left = position_ratio.x
    button.anchor_right = position_ratio.x
    button.anchor_top = position_ratio.y
    button.anchor_bottom = position_ratio.y
    button.offset_left = -28
    button.offset_right = 28
    button.offset_top = -28
    button.offset_bottom = 28
    button.add_theme_font_size_override("font_size", 25)
    button.add_theme_color_override("font_color", Color("dbc78f"))
    button.add_theme_stylebox_override("normal", make_panel(Color(0.03, 0.04, 0.05, 0.42), 28))
    button.tooltip_text = title
    button.pressed.connect(func(): inspect_evidence(id, title, detail))
    hotspot_layer.add_child(button)

func inspect_evidence(id: String, title: String, detail: String) -> void:
    search_timer.stop()
    show_scene("فحص موضعي", "دليل", title, detail, "day")
    var extra := {
        "laptop": "آخر جلسة 1:57 صباحًا.",
        "camera": "أقدم تسجيل يرجع لـ11 يوم.",
        "phone": "الاسم المحفوظ: مريم.",
        "numbers": "الرقم 45 تحته علامة استفهام."
    }
    content_box.add_child(make_label(String(extra[id]), 12, Color("9fa6af")))
    add_choices([
        make_button("سجّل الدليل", func(): collect_evidence(id)),
        make_button("رجوع", render_search)
    ])

func collect_evidence(id: String) -> void:
    var evidence: Array = state["evidence"]
    if not id in evidence and evidence.size() < 3:
        evidence.append(id)
        change_stat("inv", 1 if id == "phone" else 2)
        if id == "numbers":
            change_stat("ind", 1)
        save_state()
    render_search()

func update_search_timer() -> void:
    search_left = maxf(0.0, 150.0 - (Time.get_unix_time_from_system() - float(state["search_started"])))
    var timer_label := content_box.get_node_or_null("TimerLabel") as Label
    if timer_label:
        timer_label.text = "الشرطة في الطريق · %02d:%02d" % [int(search_left / 60.0), int(search_left) % 60]
    if search_left <= 0.0:
        search_timer.stop()
        go("police")

func render_police() -> void:
    show_scene("وحدة الجرائم الإلكترونية", "أول إفادة رسمية", "الضابط حسام وصل", "«لقيت حاجة غير طبيعية قبل ما نوصل؟»", "hall", "قرارك هيتحفظ. مش كل نتيجة هتظهر دلوقتي.")
    var buttons: Array = []
    buttons.append(make_button("أقول كل اللي لقيته", func(): change_stat("police", 3); change_stat("ind", -1); state["flags"]["told"] = true; go("end"), "أسلم كل المعلومات للفريق."))
    var evidence: Array = state["evidence"]
    if "laptop" in evidence:
        buttons.append(make_button("أخفي وجود LAST SEEN", func(): change_stat("police", -1); change_stat("ind", 2); change_stat("inf", 1); state["flags"]["hid_site"] = true; go("end"), "أحتفظ بالموقع لنفسي."))
    if "camera" in evidence:
        buttons.append(make_button("أخفي الكاميرا", func(): change_stat("police", -2); change_stat("ind", 2); state["flags"]["hid_camera"] = true; go("end"), "القرار ده هيرجعلك بعدين.", true))
    buttons.append(make_button("أقول إن الفحص ماوصلش لحاجة", func(): change_stat("police", -2); change_stat("ind", 3); state["flags"]["hid"] = true; go("end"), "أحتفظ بكل اللي عرفته."))
    add_choices(buttons)

func render_end() -> void:
    show_scene("نهاية النموذج", "أول 10 دقائق", "هنا يبدأ الفرق الحقيقي", "النموذج بيقف عند أول إفادة للشرطة.\n\nجرّبت حركة كاميرا، Fade، Glitch، صوت داخل المحرك، Hotspots، عدّاد وحفظ حالة.", "hall", "لو الإحساس مناسب نكمل من المراقب 00.")
    var evidence: Array = state["evidence"]
    var stats: Dictionary = state["stats"]
    content_box.add_child(make_label("الأدلة %d/3 · التحقيق %d · الاستقلالية %d · التوجيه %d" % [evidence.size(), stats["inv"], stats["ind"], stats["inf"]], 13, Color("cdb77f")))
    add_choices([make_button("إعادة النموذج", reset_game)])

func glitch() -> void:
    var original := bg.position
    var animation := create_tween()
    animation.tween_property(bg, "position", original + Vector2(-7, 0), 0.04)
    animation.tween_property(bg, "position", original + Vector2(9, 1), 0.04)
    animation.tween_property(bg, "position", original, 0.06)
    play_tone(80.0, 0.10, 0.10)

func knock_effect() -> void:
    play_tone(58.0, 0.16, 0.17)
    var original := bg.position
    var animation := create_tween()
    animation.tween_property(bg, "position", original + Vector2(6, 0), 0.04)
    animation.tween_property(bg, "position", original - Vector2(5, 0), 0.04)
    animation.tween_property(bg, "position", original, 0.06)

func flash_message(text_value: String) -> void:
    var label := make_label(text_value, 38)
    label.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    add_child(label)
    label.modulate.a = 0.0
    var animation := create_tween()
    animation.tween_property(blackout, "color:a", 0.90, 0.08)
    animation.parallel().tween_property(label, "modulate:a", 1.0, 0.08)
    animation.tween_interval(0.35)
    animation.tween_property(label, "modulate:a", 0.0, 0.15)
    animation.parallel().tween_property(blackout, "color:a", 0.0, 0.18)
    animation.tween_callback(label.queue_free)

func play_tone(frequency: float, duration: float, volume: float) -> void:
    var generator := AudioStreamGenerator.new()
    generator.mix_rate = 22050.0
    generator.buffer_length = maxf(0.2, duration + 0.05)
    var player := AudioStreamPlayer.new()
    player.stream = generator
    add_child(player)
    player.play()
    var playback := player.get_stream_playback() as AudioStreamGeneratorPlayback
    if playback:
        var frame_count := int(generator.mix_rate * duration)
        for index in range(frame_count):
            var progress := float(index) / float(frame_count)
            var sample := sin(TAU * frequency * float(index) / generator.mix_rate) * volume * pow(1.0 - progress, 2.0)
            playback.push_frame(Vector2(sample, sample))
    get_tree().create_timer(duration + 0.1).timeout.connect(player.queue_free)

func save_state() -> void:
    var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    if file:
        file.store_string(JSON.stringify(state))
        file.close()

func load_state() -> void:
    if not FileAccess.file_exists(SAVE_PATH):
        return
    var file := FileAccess.open(SAVE_PATH, FileAccess.READ)
    if not file:
        return
    var parsed = JSON.parse_string(file.get_as_text())
    file.close()
    if typeof(parsed) == TYPE_DICTIONARY:
        state = parsed

func reset_game() -> void:
    if FileAccess.file_exists(SAVE_PATH):
        DirAccess.remove_absolute(ProjectSettings.globalize_path(SAVE_PATH))
    state = {
        "node": "file",
        "name": "",
        "beat": 0,
        "evidence": [],
        "flags": {},
        "stats": {"inv": 0, "ind": 0, "inf": 0, "police": 0},
        "search_started": 0.0
    }
    render_node()
