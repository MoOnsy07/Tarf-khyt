package online.taraf5eet.nativeapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import online.taraf5eet.nativeapp.data.CaseRepository
import online.taraf5eet.nativeapp.ui.TarafNavGraph
import online.taraf5eet.nativeapp.ui.theme.TarafBackground
import online.taraf5eet.nativeapp.ui.theme.TarafKhytTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val repository = CaseRepository(applicationContext)
        setContent {
            TarafKhytTheme {
                Surface(modifier = Modifier.fillMaxSize().background(TarafBackground)) {
                    TarafNavGraph(repository)
                }
            }
        }
    }
}
