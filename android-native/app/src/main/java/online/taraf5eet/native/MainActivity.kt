package online.taraf5eet.native

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import online.taraf5eet.native.data.CaseRepository
import online.taraf5eet.native.ui.TarafNavGraph
import online.taraf5eet.native.ui.theme.TarafBackground
import online.taraf5eet.native.ui.theme.TarafKhytTheme

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
