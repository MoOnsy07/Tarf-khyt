class_name ArabicFontLoader
extends RefCounted

static func get_font() -> FontFile:
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
    font.allow_system_fallback = false
    return font
