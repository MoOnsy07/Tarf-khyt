extends Node

var arabic_font: FontFile

func _ready() -> void:
    arabic_font = _load_embedded_font()
    if arabic_font:
        arabic_font.allow_system_fallback = false
        ThemeDB.fallback_font = arabic_font

func get_font() -> FontFile:
    return arabic_font

func _load_embedded_font() -> FontFile:
    var encoded := ""
    for index in range(8):
        var path := "res://fonts/embedded/part_%02d.b64" % index
        var file := FileAccess.open(path, FileAccess.READ)
        if file == null:
            push_error("Missing embedded Arabic font chunk: %s" % path)
            return null
        encoded += file.get_as_text().strip_edges()
        file.close()

    var bytes := Marshalls.base64_to_raw(encoded)
    if bytes.size() < 1000:
        push_error("Embedded Arabic font decode failed")
        return null

    var font := FontFile.new()
    font.data = bytes
    return font
