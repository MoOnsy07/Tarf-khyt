extends Node

const FONT_URLS := [
    "https://raw.githubusercontent.com/google/fonts/main/ofl/notosansarabic/NotoSansArabic%5Bwdth%2Cwght%5D.ttf",
    "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notosansarabic/NotoSansArabic%5Bwdth,wght%5D.ttf"
]

var request: HTTPRequest
var arabic_font: FontFile
var url_index := 0

func _ready() -> void:
    get_tree().node_added.connect(_on_node_added)
    request = HTTPRequest.new()
    add_child(request)
    request.request_completed.connect(_on_font_loaded)
    _request_font()
    call_deferred("_fix_existing_tree")

func _request_font() -> void:
    if url_index >= FONT_URLS.size():
        push_error("Arabic font could not be downloaded from any source.")
        return
    var err := request.request(FONT_URLS[url_index])
    if err != OK:
        url_index += 1
        call_deferred("_request_font")

func _on_font_loaded(_result: int, response_code: int, _headers: PackedStringArray, body: PackedByteArray) -> void:
    if response_code < 200 or response_code >= 300 or body.size() < 10000:
        url_index += 1
        _request_font()
        return

    var loaded := FontFile.new()
    loaded.data = body
    loaded.allow_system_fallback = false

    # Make sure the downloaded payload really contains Arabic glyphs.
    if not loaded.has_char(0x0627) or not loaded.has_char(0x0645):
        url_index += 1
        _request_font()
        return

    arabic_font = loaded
    ThemeDB.fallback_font = arabic_font
    _fix_existing_tree()

func _on_node_added(node: Node) -> void:
    call_deferred("_apply_arabic", node)

func _fix_existing_tree() -> void:
    _walk(get_tree().root)

func _walk(node: Node) -> void:
    _apply_arabic(node)
    for child in node.get_children():
        _walk(child)

func _apply_arabic(node: Node) -> void:
    if node is Control:
        (node as Control).layout_direction = Control.LAYOUT_DIRECTION_RTL

    if node is Label:
        var label := node as Label
        label.text_direction = Control.TEXT_DIRECTION_RTL
        label.language = "ar"
        if arabic_font:
            label.add_theme_font_override("font", arabic_font)

    elif node is Button:
        var button := node as Button
        button.text_direction = Control.TEXT_DIRECTION_RTL
        button.language = "ar"
        if arabic_font:
            button.add_theme_font_override("font", arabic_font)

    elif node is LineEdit:
        var input := node as LineEdit
        input.text_direction = Control.TEXT_DIRECTION_RTL
        input.language = "ar"
        if arabic_font:
            input.add_theme_font_override("font", arabic_font)

    elif node is TextEdit:
        var editor := node as TextEdit
        editor.text_direction = Control.TEXT_DIRECTION_RTL
        editor.language = "ar"
        if arabic_font:
            editor.add_theme_font_override("font", arabic_font)
