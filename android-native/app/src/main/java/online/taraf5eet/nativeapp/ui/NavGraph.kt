package online.taraf5eet.nativeapp.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import online.taraf5eet.nativeapp.data.CaseRepository
import online.taraf5eet.nativeapp.data.CaseSummary
import online.taraf5eet.nativeapp.viewmodel.CaseViewModel

private const val ROUTE_HOME = "home"
private const val ROUTE_BRIEFING = "briefing/{caseId}"
private const val ROUTE_PROLOGUE = "prologue/{caseId}"
private const val ROUTE_INVESTIGATION = "investigation/{caseId}"
private const val ROUTE_ACCUSATION = "accusation/{caseId}"
private const val ROUTE_ENDING = "ending/{caseId}"

@Composable
fun TarafNavGraph(repository: CaseRepository) {
    val navController: NavHostController = rememberNavController()
    val vm = remember { CaseViewModel(repository) }

    // Loading the catalog must never leave the screen silently blank: any
    // failure (missing/corrupt asset) is shown as visible text instead.
    val catalogResult = remember {
        runCatching { repository.loadCatalog() }
    }

    val catalog = catalogResult.getOrNull()
    if (catalog == null) {
        val error = catalogResult.exceptionOrNull()
        Column(Modifier.fillMaxSize().padding(24.dp)) {
            Text("مشكلة في تحميل الكتالوج", color = Color.White, style = MaterialTheme.typography.titleLarge)
            Text(
                error?.message ?: "خطأ غير معروف",
                color = Color(0xFF9AA0AC),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp)
            )
        }
        return
    }

    if (catalog.isEmpty()) {
        Column(Modifier.fillMaxSize().padding(24.dp)) {
            Text("الكتالوج فاضي", color = Color.White, style = MaterialTheme.typography.titleLarge)
            Text(
                "catalog.json اتحمّل لكن معندوش أي قضايا جواه.",
                color = Color(0xFF9AA0AC),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 8.dp)
            )
        }
        return
    }

    NavHost(navController = navController, startDestination = ROUTE_HOME) {
        composable(ROUTE_HOME) {
            HomeScreen(catalog = catalog, onOpenCase = { id ->
                vm.load(id)
                navController.navigate("briefing/$id")
            })
        }
        composable(ROUTE_BRIEFING) {
            vm.case.value?.let { case ->
                BriefingScreen(case) { navController.navigate("prologue/${case.id}") }
            }
        }
        composable(ROUTE_PROLOGUE) {
            vm.case.value?.let { case ->
                PrologueScreen(case) { navController.navigate("investigation/${case.id}") }
            }
        }
        composable(ROUTE_INVESTIGATION) {
            vm.case.value?.let { case ->
                InvestigationScreen(case, vm) { navController.navigate("accusation/${case.id}") }
            }
        }
        composable(ROUTE_ACCUSATION) {
            vm.case.value?.let { case ->
                AccusationScreen(case, vm) { navController.navigate("ending/${case.id}") }
            }
        }
        composable(ROUTE_ENDING) {
            vm.case.value?.let { case ->
                EndingScreen(case, vm) {
                    navController.popBackStack(ROUTE_HOME, inclusive = false)
                }
            }
        }
    }
}
