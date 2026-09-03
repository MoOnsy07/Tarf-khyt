extends Control

const SAVE_PATH := "user://last_seen_clean.save"
const SEARCH_SECONDS := 150.0
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
    "search_started": 0.0
}

var arabic_font: FontFile
var bg: TextureRect
var vignette: ColorRect
var hotspot_layer: Control
var brand_label: Label
var chapter_label: Label
var card: PanelContainer
var card_margin: MarginContainer
var content_box: VBoxContainer
var blackout: ColorRect
var timer: Timer
var timer_label: Label
var camera_tween: Tween

func _ready() -> void:
    layout_direction = Control.LAYOUT_DIRECTION_RTL
    arabic_font = ArabicFontLoader.get_font()
    build_ui()
    get_viewport().size_changed.connect(_apply_responsive_layout)
    _apply_responsive_layout()
    load_state()
    render_node()

func build_ui() -> void:
    bg = TextureRect.new()
    bg.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    bg.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    bg.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
    bg.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(bg)

    vignette = ColorRect.new()
    vignette.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    vignette.color = Color(0.015, 0.018, 0.024, 0.46)
    vignette.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(vignette)

    hotspot_layer = Control.new()
    hotspot_layer.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    hotspot_layer.mouse_filter = MOUSE_FILTER_PASS
    add_child(hotspot_layer)

    brand_label = make_label("طرف خيط", 18, Color("f2eee5"), false)
    brand_label.anchor_left = 0.04
    brand_label.anchor_right = 0.28
    brand_label.anchor_top = 0.045
    brand_label.anchor_bottom = 0.11
    brand_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_LEFT
    brand_label.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(brand_label)

    chapter_label = make_label("ملف 45", 12, Color("c9b77f"), false)
    chapter_label.anchor_left = 0.66
    chapter_label.anchor_right = 0.96
    chapter_label.anchor_top = 0.05
    chapter_label.anchor_bottom = 0.11
    chapter_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    chapter_label.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(chapter_label)

    card = PanelContainer.new()
    card.add_theme_stylebox_override("panel", panel_style(Color(0.025, 0.03, 0.04, 0.93), 18, Color(1, 1, 1, 0.11)))
    add_child(card)

    card_margin = MarginContainer.new()
    card_margin.add_theme_constant_override("margin_left", 28)
    card_margin.add_theme_constant_override("margin_right", 28)
    card_margin.add_theme_constant_override("margin_top", 22)
    card_margin.add_theme_constant_override("margin_bottom", 22)
    card.add_child(card_margin)

    content_box = VBoxContainer.new()
    content_box.layout_direction = Control.LAYOUT_DIRECTION_RTL
    content_box.add_theme_constant_override("separation", 9)
    card_margin.add_child(content_box)

    blackout = ColorRect.new()
    blackout.set_anchors_and_offsets_preset(PRESET_FULL_RECT)
    blackout.color = Color(0, 0, 0, 0)
    blackout.mouse_filter = MOUSE_FILTER_IGNORE
    add_child(blackout)

    timer = Timer.new()
    timer.wait_time = 0.2
    timer.timeout.connect(_update_search_timer)
    add_child(timer)

func _apply_responsive_layout() -> void:
    var viewport_size := get_viewport_rect().size
    var narrow := viewport_size.x < 760.0

    if narrow:
        card.anchor_left = 0.035
        card.anchor_right = 0.965
        card.anchor_top = 0.48
        card.anchor_bottom = 0.965
        card_margin.add_theme_constant_override("margin_left", 18)
        card_margin.add_theme_constant_override("margin_right", 18)
        card_margin.add_theme_constant_override("margin_top", 17)
        card_margin.add_theme_constant_override("margin_bottom", 17)
        brand_label.anchor_right = 0.45
        chapter_label.anchor_left = 0.48
    else:
        card.anchor_left = 0.16
        card.anchor_right = 0.84
        card.anchor_top = 0.56
        card.anchor_bottom = 0.94
        card_margin.add_theme_constant_override("margin_left", 30)
        card_margin.add_theme_constant_override("margin_right", 30)
        card_margin.add_theme_constant_override("margin_top", 23)
        card_margin.add_theme_constant_override("margin_bottom", 23)
        brand_label.anchor_right = 0.28
        chapter_label.anchor_left = 0.66

    card.offset_left = 0
    card.offset_right = 0
    card.offset_top = 0
    card.offset_bottom = 0

func _set_search_layout(enabled: bool) -> void:
    var viewport_size := get_viewport_rect().size
    var narrow := viewport_size.x < 760.0
    if enabled:
        if narrow:
            card.anchor_left = 0.035
            card.anchor_right = 0.965
            card.anchor_top = 0.70
            card.anchor_bottom = 0.965
        else:
            card.anchor_left = 0.20
            card.anchor_right = 0.80
            card.anchor_top = 0.72
            card.anchor_bottom = 0.94
        card.offset_left = 0
        card.offset_right = 0
        card.offset_top = 0
        card.offset_bottom = 0
    else:
        _apply_responsive_layout()

func panel_style(fill: Color, radius: int, border: Color = Color(1, 1, 1, 0.08)) -> StyleBoxFlat:
    var style := StyleBoxFlat.new()
    style.bg_color = fill
    style.border_color = border
    style.set_border_width_all(1)
    style.corner_radius_top_left = radius
    style.corner_radius_top_right = radius
    style.corner_radius_bottom_left = radius
    style.corner_radius_bottom_right = radius
    return style

func make_label(text_value: String, size_value: int, color_value: Color, wrap: bool = true) -> Label:
    var label := Label.new()
    label.text = text_value
    label.layout_direction = Control.LAYOUT_DIRECTION_RTL
    label.text_direction = Control.TEXT_DIRECTION_RTL
    label.language = "ar"
    label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    label.size_flags_horizontal = SIZE_EXPAND_FILL
    if wrap:
        label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    if arabic_font:
        label.add_theme_font_override("font", arabic_font)
    label.add_theme_font_size_override("font_size", size_value)
    label.add_theme_color_override("font_color", color_value)
    return label

func make_button(title: String, callback: Callable, danger: bool = false) -> Button:
    var button := Button.new()
    button.text = title
    button.layout_direction = Control.LAYOUT_DIRECTION_RTL
    button.text_direction = Control.TEXT_DIRECTION_RTL
    button.language = "ar"
    button.alignment = HORIZONTAL_ALIGNMENT_RIGHT
    button.custom_minimum_size = Vector2(0, 48)
    button.size_flags_horizontal = SIZE_EXPAND_FILL
    if arabic_font:
        button.add_theme_font_override("font", arabic_font)
    button.add_theme_font_size_override("font_size", 15)
    button.add_theme_color_override("font_color", Color("eeeae1") if not danger else Color("f0bcbc"))
    button.add_theme_color_override("font_hover_color", Color("ffffff"))
    button.add_theme_stylebox_override("normal", panel_style(Color(0.055, 0.065, 0.082, 0.94), 11))
    button.add_theme_stylebox_override("hover", panel_style(Color(0.085, 0.095, 0.115, 0.98), 11, Color("b9a872")))
    button.add_theme_stylebox_override("pressed", panel_style(Color(0.035, 0.042, 0.055, 1.0), 11, Color("b9a872")))
    button.pressed.connect(callback)
    return button

func clear_stage() -> void:
    timer.stop()
    timer_label = null
    for child in content_box.get_children():
        content_box.remove_child(child)
        child.queue_free()
    for child in hotspot_layer.get_children():
        hotspot_layer.remove_child(child)
        child.queue_free()

func set_background(key: String) -> void:
    var path: String = IMG.get(key, IMG["night"])
    var texture := load(path)
    if texture:
        bg.texture = texture

    bg.position = Vector2.ZERO
    bg.scale = Vector2.ONE
    bg.pivot_offset = get_viewport_rect().size / 2.0

    if camera_tween and camera_tween.is_valid():
        camera_tween.kill()
    camera_tween = create_tween().set_loops()
    camera_tween.tween_property(bg, "scale", Vector2(1.025, 1.025), 8.0).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
    camera_tween.tween_property(bg, "scale", Vector2.ONE, 8.0).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)

func show_scene(chapter: String, kicker: String, title: String, body: String, image_key: String, note: String = "") -> void:
    clear_stage()
    _set_search_layout(false)
    chapter_label.text = chapter
    set_background(image_key)

    content_box.add_child(make_label(kicker, 11, Color("c9b77f"), false))
    content_box.add_child(make_label(title, 34, Color("f5f1e9"), true))
    content_box.add_child(make_label(body, 18, Color("ece8df"), true))
    if not note.is_empty():
        content_box.add_child(make_label(note, 12, Color("9ca3ad"), true))

func add_choices(buttons: Array) -> void:
    var spacer := Control.new()
    spacer.custom_minimum_size = Vector2(0, 3)
    content_box.add_child(spacer)
    var choices := VBoxContainer.new()
    choices.layout_direction = Control.LAYOUT_DIRECTION_RTL
    choices.add_theme_constant_override("separation", 7)
    for button in buttons:
        choices.add_child(button)
    content_box.add_child(choices)

func go(node_id: String) -> void:
    state["node"] = node_id
    save_state()
    var transition := create_tween()
    transition.tween_property(blackout, "color:a", 0.92, 0.12)
    transition.tween_callback(render_node)
    transition.tween_property(blackout, "color:a", 0.0, 0.22)

func render_node() -> void:
    match String(state.get("node", "file")):
        "file": render_file()
        "trace": render_trace()
        "deleted": render_deleted()
        "returned": render_returned()
        "name": render_name()
        "intro": render_intro()
        "morning": render_morning()
        "search": render_search()
        "evidence": render_evidence()
        "police": render_police()
        "end": render_end()
        _:
            state["node"] = "file"
            render_file()

func render_file() -> void:
    show_scene("ملف 45", "ملف وارد · المصدر مجهول", "وصل ملف جديد", "الحالة: غير مصرح بالفتح", "night", "الملف ظهر داخل نظامك من غير ما تطلبه.")
    add_choices([
        make_button("فتح الملف", func(): go("name")),
        make_button("معرفة المرسل أولًا", _trace_file),
        make_button("حذف الملف", _delete_file, true)
    ])

func _trace_file() -> void:
    state["flags"]["traced"] = true
    go("trace")

func _delete_file() -> void:
    state["flags"]["resisted"] = true
    go("deleted")

func render_trace() -> void:
    show_scene("ملف 45", "جارٍ تتبع المصدر", "المصدر غير موجود", "المسار انتهى عند نقطة لا يفترض إنها موجودة.", "night", "ثم ظهر سطر واحد: «بتدور على إيه؟»")
    _glitch()
    add_choices([make_button("فتح الملف", func(): go("name"))])

func render_deleted() -> void:
    show_scene("ملف 45", "تم تنفيذ الأمر", "تم حذف الملف", "لا توجد نسخة في سلة المحذوفات.", "night")
    add_choices([make_button("رجوع", func(): go("returned"))])

func render_returned() -> void:
    show_scene("ملف 45", "بعد ثانيتين", "قلت لك افتحني", "الملف رجع لوحده. رقم الملف ما زال 45.", "night")
    _glitch()
    add_choices([make_button("فتح", func(): go("name"), true)])

func render_name() -> void:
    show_scene("ملف 45", "تسجيل الدخول", "اسم المحقق", "الاسم ده هو اللي هيظهر داخل الملف.", "night")

    var input := LineEdit.new()
    input.placeholder_text = "اكتب اسمك"
    input.text = String(state.get("name", ""))
    input.layout_direction = Control.LAYOUT_DIRECTION_RTL
    input.text_direction = Control.TEXT_DIRECTION_RTL
    input.language = "ar"
    input.alignment = HORIZONTAL_ALIGNMENT_RIGHT
    input.custom_minimum_size = Vector2(0, 48)
    if arabic_font:
        input.add_theme_font_override("font", arabic_font)
    input.add_theme_font_size_override("font_size", 16)
    input.add_theme_stylebox_override("normal", panel_style(Color(0.035, 0.042, 0.055, 1.0), 10))
    content_box.add_child(input)

    var enter := func():
        var value := input.text.strip_edges()
        if value.is_empty():
            input.placeholder_text = "اكتب الاسم الأول"
            return
        state["name"] = value
        state["beat"] = 0
        go("intro")

    add_choices([make_button("دخول الملف", enter)])
    input.grab_focus()

func render_intro() -> void:
    var beats := [
        ["قبل البلاغ بـ 9 ساعات", "شقة آدم فؤاد", "2:13 صباحًا. آدم قاعد لوحده قدام اللابتوب. النور الوحيد جاي من الشاشة.", "night"],
        ["LAST SEEN", "يارا 17", "يفتح بث لغرفة نوم. بنت نايمة. عدّاد صغير بينقص.", "room"],
        ["LAST SEEN", "يارا 17", "قبل ما العدّاد يخلص، البنت تفتح عينيها… وتبص مباشرة ناحية الكاميرا.", "yara"],
        ["رسالة على الشاشة", "أنت شاهدت", "الآن جاء دورك.", "night"],
        ["قبل البلاغ بـ 9 ساعات", "خبطة واحدة", "آدم يبص ناحية باب الشقة. الشاشة تسود.", "night"]
    ]

    var index := clampi(int(state.get("beat", 0)), 0, beats.size() - 1)
    var data: Array = beats[index]
    show_scene("الفصل الأول · ملف 45", data[0], data[1], data[2], data[3])

    if index == 2 or index == 3:
        _glitch()
    if index == 4:
        _knock()

    var advance := func():
        if index < beats.size() - 1:
            state["beat"] = index + 1
            save_state()
            render_intro()
        else:
            go("morning")

    add_choices([make_button("استمرار" if index == beats.size() - 1 else "التالي", advance)])

func render_morning() -> void:
    show_scene("08:36 صباحًا", "شقة آدم", "آدم اختفى", "باب الشقة مقفول. مفيش كسر. الموبايل والمحفظة موجودين… لكن آدم نفسه مش موجود.", "day", "على الحائط جنب المكتب: 17. الشرطة في الطريق.")
    var start_search := func():
        state["search_started"] = Time.get_unix_time_from_system()
        state["evidence"] = []
        go("search")
    add_choices([make_button("ابدأ التفتيش", start_search)])

func render_search() -> void:
    clear_stage()
    _set_search_layout(true)
    chapter_label.text = "مسرح 01 · شقة آدم"
    set_background("day")

    var evidence: Array = state["evidence"]
    content_box.add_child(make_label("تفتيش محدود", 11, Color("c9b77f"), false))
    content_box.add_child(make_label("اختار 3 أدلة من 4", 24, Color("f5f1e9"), false))
    timer_label = make_label("الشرطة في الطريق", 13, Color("b7bdc6"), false)
    content_box.add_child(timer_label)

    _add_hotspot("laptop", Vector2(0.22, 0.58), "لابتوب")
    _add_hotspot("camera", Vector2(0.38, 0.33), "كاميرا")
    _add_hotspot("phone", Vector2(0.66, 0.62), "هاتف")
    _add_hotspot("numbers", Vector2(0.79, 0.44), "ورقة")

    if evidence.size() >= 3:
        add_choices([make_button("إنهاء التفتيش", func(): go("police"))])

    if float(state.get("search_started", 0.0)) <= 0.0:
        state["search_started"] = Time.get_unix_time_from_system()
    _update_search_timer()
    timer.start()

func _add_hotspot(id: String, ratio: Vector2, hint: String) -> void:
    var evidence: Array = state["evidence"]
    if id in evidence or evidence.size() >= 3:
        return

    var button := Button.new()
    button.text = "+"
    button.tooltip_text = hint
    button.anchor_left = ratio.x
    button.anchor_right = ratio.x
    button.anchor_top = ratio.y
    button.anchor_bottom = ratio.y
    button.offset_left = -25
    button.offset_right = 25
    button.offset_top = -25
    button.offset_bottom = 25
    button.custom_minimum_size = Vector2(50, 50)
    if arabic_font:
        button.add_theme_font_override("font", arabic_font)
    button.add_theme_font_size_override("font_size", 23)
    button.add_theme_color_override("font_color", Color("e4cf91"))
    button.add_theme_stylebox_override("normal", panel_style(Color(0.02, 0.025, 0.03, 0.72), 25, Color("c9b77f")))
    button.add_theme_stylebox_override("hover", panel_style(Color(0.08, 0.09, 0.10, 0.92), 25, Color("f0d992")))
    button.pressed.connect(func(): _open_evidence(id))
    hotspot_layer.add_child(button)

func _open_evidence(id: String) -> void:
    state["flags"]["current_evidence"] = id
    state["node"] = "evidence"
    save_state()
    render_evidence()

func render_evidence() -> void:
    var id := String(state["flags"].get("current_evidence", "laptop"))
    var data := {
        "laptop": ["اللابتوب", "سجل دخول متكرر إلى LAST SEEN.", "آخر جلسة كانت 1:57 صباحًا."],
        "camera": ["الكاميرا", "كاميرا صغيرة كانت بتصور آدم من غير علمه.", "أقدم تسجيل يرجع لـ11 يوم."],
        "phone": ["الهاتف", "مكالمة محذوفة مع «مريم» قبل الاختفاء بـ18 دقيقة.", "المكالمة استمرت 3 دقائق و12 ثانية."],
        "numbers": ["الورقة", "17، 24، 31، 38، 45 ؟", "الرقم 45 تحته علامة استفهام."]
    }
    var item: Array = data.get(id, data["laptop"])
    show_scene("فحص دليل", "مسرح 01", item[0], item[1], "day", item[2])

    var evidence: Array = state["evidence"]
    var buttons: Array = []
    if not id in evidence and evidence.size() < 3:
        buttons.append(make_button("سجّل الدليل", func(): _collect_evidence(id)))
    buttons.append(make_button("رجوع للمشهد", func(): go("search")))
    add_choices(buttons)

func _collect_evidence(id: String) -> void:
    var evidence: Array = state["evidence"]
    if not id in evidence and evidence.size() < 3:
        evidence.append(id)
        state["evidence"] = evidence
        save_state()
    go("search")

func _update_search_timer() -> void:
    if String(state.get("node", "")) != "search":
        timer.stop()
        return
    var elapsed := Time.get_unix_time_from_system() - float(state.get("search_started", 0.0))
    var left := maxf(0.0, SEARCH_SECONDS - elapsed)
    if timer_label:
        timer_label.text = "الشرطة في الطريق · %02d:%02d" % [int(left / 60.0), int(left) % 60]
    if left <= 0.0:
        timer.stop()
        go("police")

func render_police() -> void:
    show_scene("وحدة الجرائم الإلكترونية", "أول إفادة رسمية", "الضابط حسام وصل", "«لقيت حاجة غير طبيعية قبل ما نوصل؟»", "hall", "اختيارك هنا هيرجعلك بعدين.")
    var evidence: Array = state["evidence"]
    var buttons: Array = [make_button("أقول كل اللي لقيته", _tell_police_all)]
    if "laptop" in evidence:
        buttons.append(make_button("أخفي وجود LAST SEEN", _hide_site))
    if "camera" in evidence:
        buttons.append(make_button("أخفي الكاميرا", _hide_camera, true))
    buttons.append(make_button("أقول إن الفحص ماوصلش لحاجة", _hide_all))
    add_choices(buttons)

func _tell_police_all() -> void:
    state["flags"]["police"] = "all"
    go("end")

func _hide_site() -> void:
    state["flags"]["police"] = "hide_site"
    go("end")

func _hide_camera() -> void:
    state["flags"]["police"] = "hide_camera"
    go("end")

func _hide_all() -> void:
    state["flags"]["police"] = "hide_all"
    go("end")

func render_end() -> void:
    show_scene("نهاية النموذج", "أول 10 دقائق", "هنا يبدأ المراقب 00", "النسخة دي معمولة عشان نقيس إحساس Godot نفسه: مشاهد كاملة، انتقالات، حركة كاميرا، أدلة داخل المكان وقرارات محفوظة.", "hall", "لو الشكل والإحساس بقوا صح، نكمّل القضية كلها على نفس الأساس.")
    add_choices([make_button("إعادة النموذج", reset_game)])

func _glitch() -> void:
    var original := bg.position
    var tween := create_tween()
    tween.tween_property(bg, "position", original + Vector2(-5, 0), 0.035)
    tween.tween_property(bg, "position", original + Vector2(7, 1), 0.04)
    tween.tween_property(bg, "position", original, 0.06)

func _knock() -> void:
    var original := bg.position
    var tween := create_tween()
    tween.tween_property(bg, "position", original + Vector2(5, 0), 0.04)
    tween.tween_property(bg, "position", original - Vector2(4, 0), 0.04)
    tween.tween_property(bg, "position", original, 0.06)

func save_state() -> void:
    var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    if file:
        file.store_string(JSON.stringify(state))
        file.close()

func load_state() -> void:
    if not FileAccess.file_exists(SAVE_PATH):
        return
    var file := FileAccess.open(SAVE_PATH, FileAccess.READ)
    if file == null:
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
        "search_started": 0.0
    }
    render_node()
