package online.taraf5eet.native.data

import kotlinx.serialization.Serializable

@Serializable
data class CaseSummary(
    val id: String,
    val title: String,
    val caseNo: String,
    val subtitle: String,
    val difficulty: String,
    val estMinutes: Int,
    val teaser: String,
    val isPremium: Boolean = false,
    val playable: Boolean = false
)

@Serializable
data class PrologueScene(
    val scene: String,
    val text: String
)

@Serializable
data class Question(
    val q: String,
    val a: String,
    val unlockId: String? = null,
    val requires: List<String> = emptyList(),
    val closesInterrogation: Boolean = false
)

@Serializable
data class Suspect(
    val id: String,
    val name: String,
    val role: String,
    val avatarEmoji: String,
    val alibi: String,
    val questions: List<Question>,
    val confrontations: Map<String, String> = emptyMap()
)

@Serializable
data class Evidence(
    val id: String,
    val tag: String,
    val title: String,
    val short: String,
    val full: String,
    val crit: Boolean = false,
    val unlocked: Boolean = false,
    val order: Int = 0
)

@Serializable
data class Statement(
    val id: String,
    val text: String,
    val source: String
)

@Serializable
data class ContradictionPuzzle(
    val introText: String,
    val resultText: String,
    val resultEvidenceIds: List<String>,
    val statements: List<Statement>,
    val correctPair: List<String>
)

@Serializable
data class TheoryOption(
    val id: String,
    val text: String,
    val correct: Boolean = false
)

@Serializable
data class EndingContent(
    val title: String,
    val paragraphs: List<String>,
    val hint: String? = null
)

@Serializable
data class CaseData(
    val id: String,
    val title: String,
    val caseNo: String,
    val subtitle: String,
    val difficulty: String,
    val estMinutes: Int,
    val teaser: String,
    val briefingText1: String,
    val briefingText2: String,
    val prologue: List<PrologueScene>,
    val suspects: List<Suspect>,
    val evidence: List<Evidence>,
    val contradictionPuzzle: ContradictionPuzzle? = null,
    val correctSuspectId: String,
    val conclusiveEvidenceIds: List<String>,
    val conclusiveRequired: Int,
    val theoryOptions: List<TheoryOption>,
    val endingGood: EndingContent,
    val endingPartial: EndingContent,
    val endingBad: EndingContent
)
