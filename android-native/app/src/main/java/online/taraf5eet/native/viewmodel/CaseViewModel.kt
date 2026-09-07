package online.taraf5eet.native.viewmodel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import online.taraf5eet.native.data.CaseData
import online.taraf5eet.native.data.CaseRepository

enum class Verdict { GOOD, PARTIAL, BAD }

/**
 * Holds the live state of one investigation: which evidence has been
 * unlocked, which questions were asked, whether the contradiction puzzle
 * was solved, and the final accusation outcome. This is the native
 * equivalent of the state object engine.js keeps per active case.
 */
class CaseViewModel(private val repository: CaseRepository) : ViewModel() {

    var case = mutableStateOf<CaseData?>(null)
        private set

    val unlockedEvidenceIds = mutableStateOf<Set<String>>(emptySet())
    val askedQuestions = mutableStateOf<Set<String>>(emptySet()) // "suspectId::question"
    val puzzleSolved = mutableStateOf(false)
    val accusedSuspectId = mutableStateOf<String?>(null)
    val verdict = mutableStateOf<Verdict?>(null)

    fun load(caseId: String) {
        val data = repository.loadCase(caseId)
        case.value = data
        unlockedEvidenceIds.value = data?.evidence?.filter { it.unlocked }?.map { it.id }?.toSet() ?: emptySet()
        askedQuestions.value = emptySet()
        puzzleSolved.value = false
        accusedSuspectId.value = null
        verdict.value = null
    }

    fun isUnlocked(evidenceId: String) = unlockedEvidenceIds.value.contains(evidenceId)

    fun requirementsMet(requires: List<String>) = requires.all { isUnlocked(it) }

    fun askQuestion(suspectId: String, question: online.taraf5eet.native.data.Question) {
        askedQuestions.value = askedQuestions.value + "$suspectId::${question.q}"
        val unlock = question.unlockId ?: return
        unlockedEvidenceIds.value = unlockedEvidenceIds.value + unlock
    }

    fun solvePuzzle() {
        val puzzle = case.value?.contradictionPuzzle ?: return
        puzzleSolved.value = true
        unlockedEvidenceIds.value = unlockedEvidenceIds.value + puzzle.resultEvidenceIds
    }

    fun accuse(suspectId: String, theoryOptionId: String) {
        val data = case.value ?: return
        accusedSuspectId.value = suspectId

        val correctSuspect = suspectId == data.correctSuspectId
        val correctTheory = data.theoryOptions.find { it.id == theoryOptionId }?.correct == true
        val conclusiveCount = data.conclusiveEvidenceIds.count { isUnlocked(it) }

        verdict.value = when {
            correctSuspect && correctTheory && conclusiveCount >= data.conclusiveRequired -> Verdict.GOOD
            correctSuspect -> Verdict.PARTIAL
            else -> Verdict.BAD
        }
    }
}
