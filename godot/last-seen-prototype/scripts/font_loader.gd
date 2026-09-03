extends Node

const ARABIC_FONT_URL := "https://raw.githubusercontent.com/google/fonts/main/ofl/notosansarabic/NotoSansArabic%5Bwdth%2Cwght%5D.ttf"

var request: HTTPRequest
var arabic_font: FontFile

func _ready() -> void:
    get_tree().node_added.connect(_on_node_added)
    request = HTTPRequest.new()
    add_child(request)
    request.request_completed.connect(_on_font_loaded)
    var err := request.request(ARABIC_FONT_URL)
    if err != OK:
        push_warning("Arabic font request could not start: %s" % err)
    call_deferred("_fix_existing_tree")

func _on_font_loaded(_result: int, response_code: int, _headers: PackedStringArray, body: PackedByteArray) -> void:
    if response_code < 200 or response_code >= 300 or body.size() < 1000:
        push_warning("Arabic font download failed. HTTP %s" % response_code)
        return

    arabic_font = FontFile.new()
    arabic_font.data = body
    arabic_font.allow_system_fallback = true
    ThemeDB.fallback_font = arabic_font
    _fix_existing_tree()

func _on_node_added(node: Node) -> void:
    call_deferred("_apply_rtl", node)

func _fix_existing_tree() -> void:
    _walk(get_tree().root)

func _walk(node: Node) -> void:
    _apply_rtl(node)
    for child in node.get_children():
        _walk(child)

func _apply_rtl(node: Node) -> void:
    if node is Control:
        (node as Control).layout_direction = Control.LAYOUT_DIRECTION_RTL
    if node is Label:
        var label := node as Label
        label.text_direction = Control.TEXT_DIRECTION_RTL
        label.language = "ar"
    elif node is Button:
        var button := node as Button
        button.text_direction = Control.TEXT_DIRECTION_RTL
        button.language = "ar"
    elif node is LineEdit:
        var input := node as LineEdit
        input.text_direction = Control.TEXT_DIRECTION_RTL
        input.language = "ar"
