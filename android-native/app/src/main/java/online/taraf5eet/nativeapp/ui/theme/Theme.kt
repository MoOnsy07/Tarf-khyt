package online.taraf5eet.nativeapp.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val TarafBackground = Color(0xFF0A0C12)
val TarafSurface = Color(0xFF11141C)
val TarafGold = Color(0xFFE0A458)
val TarafRed = Color(0xFFB3221C)
val TarafTextPrimary = Color(0xFFEDE7DA)
val TarafTextSecondary = Color(0xFF9AA0AC)

private val TarafColorScheme = darkColorScheme(
    primary = TarafGold,
    onPrimary = TarafBackground,
    secondary = TarafRed,
    onSecondary = TarafTextPrimary,
    background = TarafBackground,
    onBackground = TarafTextPrimary,
    surface = TarafSurface,
    onSurface = TarafTextPrimary,
    surfaceVariant = TarafSurface,
    onSurfaceVariant = TarafTextSecondary
)

@Composable
fun TarafKhytTheme(content: @Composable () -> Unit) {
    // The brand identity is a fixed dark/gold palette regardless of system theme.
    @Suppress("UNUSED_EXPRESSION") isSystemInDarkTheme()
    MaterialTheme(
        colorScheme = TarafColorScheme,
        content = content
    )
}
