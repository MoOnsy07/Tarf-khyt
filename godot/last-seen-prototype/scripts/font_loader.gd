class_name ArabicFontLoader
extends RefCounted

static func get_font() -> FontFile:
    var resource := load("res://fonts/NotoSansArabic.ttf")
    if resource is FontFile:
        var font := resource as FontFile
        font.allow_system_fallback = false
        return font
    push_error("Embedded Arabic font resource is missing")
    return null
