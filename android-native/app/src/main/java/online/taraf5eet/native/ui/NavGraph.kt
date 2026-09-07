package online.taraf5eet.native.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import online.taraf5eet.native.data.CaseRepository
import online.taraf5eet.native.viewmodel.CaseViewModel

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
    val catalog = remember { repository.loadCatalog() }

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
