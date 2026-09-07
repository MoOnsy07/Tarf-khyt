package online.taraf5eet.native.data

import android.content.Context
import kotlinx.serialization.json.Json

/**
 * Loads case content from local JSON assets. Every case — playable or not —
 * lives as a plain JSON file under assets/cases/<id>.json, following the same
 * schema as CASE_LOST_WALLET in the original engine.js. Adding a new playable
 * case means dropping in a new JSON file; no engine/UI code changes needed.
 */
class CaseRepository(private val context: Context) {

    private val json = Json { ignoreUnknownKeys = true }

    fun loadCatalog(): List<CaseSummary> {
        val text = context.assets.open("catalog.json").bufferedReader(Charsets.UTF_8).use { it.readText() }
        return json.decodeFromString(text)
    }

    fun loadCase(id: String): CaseData? {
        return try {
            val text = context.assets.open("cases/$id.json").bufferedReader(Charsets.UTF_8).use { it.readText() }
            json.decodeFromString(text)
        } catch (e: Exception) {
            null
        }
    }
}
