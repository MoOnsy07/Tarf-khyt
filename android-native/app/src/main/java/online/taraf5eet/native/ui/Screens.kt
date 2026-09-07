package online.taraf5eet.native.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import online.taraf5eet.native.data.CaseData
import online.taraf5eet.native.data.CaseSummary
import online.taraf5eet.native.data.Question
import online.taraf5eet.native.ui.theme.TarafGold
import online.taraf5eet.native.ui.theme.TarafRed
import online.taraf5eet.native.ui.theme.TarafSurface
import online.taraf5eet.native.ui.theme.TarafTextSecondary
import online.taraf5eet.native.viewmodel.CaseViewModel
import online.taraf5eet.native.viewmodel.Verdict

// ---------- Home: case catalog ----------

@Composable
fun HomeScreen(catalog: List<CaseSummary>, onOpenCase: (String) -> Unit) {
    Column(Modifier.fillMaxSize().padding(top = 48.dp)) {
        Text(
            "طرف الخيط",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = TarafGold,
            modifier = Modifier.padding(horizontal = 20.dp)
        )
        Text(
            "${catalog.count { it.playable }} قضية جاهزة للعب  ·  ${catalog.size} قضية في الكتالوج",
            style = MaterialTheme.typography.bodyMedium,
            color = TarafTextSecondary,
            modifier = Modifier.padding(horizontal = 20.dp, vertical = 4.dp)
        )
        Spacer(Modifier.height(12.dp))
        LazyColumn(contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(catalog) { c -> CaseRow(c, onClick = { if (c.playable) onOpenCase(c.id) }) }
        }
    }
}

@Composable
private fun CaseRow(c: CaseSummary, onClick: () -> Unit) {
    Row(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(TarafSurface)
            .clickable(enabled = c.playable, onClick = onClick)
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(Modifier.weight(1f)) {
            Text(c.caseNo, color = TarafTextSecondary, style = MaterialTheme.typography.labelSmall)
            Text(c.title, color = Color.White, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
            Text(c.subtitle, color = TarafTextSecondary, style = MaterialTheme.typography.bodySmall, maxLines = 1)
        }
        if (c.playable) {
            AssistChip(onClick = onClick, label = { Text("العب") })
        } else {
            Icon(Icons.Default.Lock, contentDescription = null, tint = TarafTextSecondary)
        }
    }
}

// ---------- Briefing ----------

@Composable
fun BriefingScreen(case: CaseData, onStart: () -> Unit) {
    Column(Modifier.fillMaxSize().padding(24.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.Center) {
        Text(case.caseNo, color = TarafGold, style = MaterialTheme.typography.labelLarge)
        Text(case.title, color = Color.White, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.headlineSmall)
        Text(case.subtitle, color = TarafTextSecondary, style = MaterialTheme.typography.bodyMedium)
        Spacer(Modifier.height(16.dp))
        Text(case.briefingText1, color = Color.White, style = MaterialTheme.typography.bodyLarge)
        Spacer(Modifier.height(10.dp))
        Text(case.briefingText2, color = Color.White, style = MaterialTheme.typography.bodyLarge)
        Spacer(Modifier.height(28.dp))
        Button(onClick = onStart, modifier = Modifier.fillMaxWidth()) { Text("ابدأ التحقيق") }
    }
}

// ---------- Prologue ----------

@Composable
fun PrologueScreen(case: CaseData, onDone: () -> Unit) {
    var index by remember { mutableStateOf(0) }
    val scene = case.prologue.getOrNull(index)
    Column(Modifier.fillMaxSize().padding(24.dp), verticalArrangement = Arrangement.Center) {
        if (scene != null) {
            Text(scene.scene, color = TarafGold, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(12.dp))
            Text(scene.text, color = Color.White, style = MaterialTheme.typography.bodyLarge)
            Spacer(Modifier.height(28.dp))
            Button(
                onClick = { if (index < case.prologue.lastIndex) index++ else onDone() },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (index < case.prologue.lastIndex) "التالي" else "ابدأ الاستجواب")
            }
        }
    }
}

// ---------- Investigation ----------

private enum class InvestigationTab { SUSPECTS, EVIDENCE, PUZZLE }

@Composable
fun InvestigationScreen(case: CaseData, vm: CaseViewModel, onAccuse: () -> Unit) {
    var tab by remember { mutableStateOf(InvestigationTab.SUSPECTS) }
    var openSuspectId by remember { mutableStateOf<String?>(null) }

    Column(Modifier.fillMaxSize()) {
        TabRow(selectedTabIndex = tab.ordinal, containerColor = TarafSurface) {
            Tab(tab == InvestigationTab.SUSPECTS, { tab = InvestigationTab.SUSPECTS }, text = { Text("المشتبه بهم") })
            Tab(tab == InvestigationTab.EVIDENCE, { tab = InvestigationTab.EVIDENCE }, text = { Text("الأدلة (${vm.unlockedEvidenceIds.value.size}/${case.evidence.size})") })
            if (case.contradictionPuzzle != null) {
                Tab(tab == InvestigationTab.PUZZLE, { tab = InvestigationTab.PUZZLE }, text = { Text("تناقضات") })
            }
        }

        Box(Modifier.weight(1f)) {
            when (tab) {
                InvestigationTab.SUSPECTS -> {
                    val open = openSuspectId
                    if (open == null) {
                        SuspectListView(case) { openSuspectId = it }
                    } else {
                        val suspect = case.suspects.first { it.id == open }
                        SuspectDetailView(suspect, vm, onBack = { openSuspectId = null })
                    }
                }
                InvestigationTab.EVIDENCE -> EvidenceListView(case, vm)
                InvestigationTab.PUZZLE -> case.contradictionPuzzle?.let { ContradictionPuzzleView(it, vm) }
            }
        }

        Button(
            onClick = onAccuse,
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = TarafRed)
        ) { Text("جاهز تتهم؟") }
    }
}

@Composable
private fun SuspectListView(case: CaseData, onOpen: (String) -> Unit) {
    LazyColumn(contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        items(case.suspects) { s ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(14.dp))
                    .background(TarafSurface)
                    .clickable { onOpen(s.id) }
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(s.avatarEmoji, style = MaterialTheme.typography.headlineSmall)
                Spacer(Modifier.width(12.dp))
                Column {
                    Text(s.name, color = Color.White, fontWeight = FontWeight.SemiBold)
                    Text(s.role, color = TarafTextSecondary, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}

@Composable
private fun SuspectDetailView(suspect: online.taraf5eet.native.data.Suspect, vm: CaseViewModel, onBack: () -> Unit) {
    var revealedAnswer by remember { mutableStateOf<Question?>(null) }
    LazyColumn(contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            TextButton(onClick = onBack) { Text("‹ رجوع للمشتبه بهم") }
            Text(suspect.name, color = TarafGold, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.titleLarge)
            Text(suspect.role, color = TarafTextSecondary, style = MaterialTheme.typography.bodyMedium)
            Text("العذر: ${suspect.alibi}", color = Color.White, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp))
            Spacer(Modifier.height(12.dp))
        }
        items(suspect.questions) { q ->
            val locked = q.requires.isNotEmpty() && !vm.requirementsMet(q.requires)
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(TarafSurface)
                    .clickable(enabled = !locked) {
                        vm.askQuestion(suspect.id, q)
                        revealedAnswer = q
                    }
                    .padding(14.dp)
            ) {
                Text(
                    q.q,
                    color = if (locked) TarafTextSecondary else Color.White,
                    fontWeight = FontWeight.Medium
                )
                if (locked) {
                    Text("محتاج تكشف دليل تاني الأول", color = TarafTextSecondary, style = MaterialTheme.typography.labelSmall)
                }
                if (revealedAnswer == q) {
                    Text(q.a, color = TarafGold, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 8.dp))
                }
            }
        }
    }
}

@Composable
private fun EvidenceListView(case: CaseData, vm: CaseViewModel) {
    LazyColumn(contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        items(case.evidence.sortedBy { it.order }) { ev ->
            val unlocked = vm.isUnlocked(ev.id)
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(TarafSurface)
                    .padding(14.dp)
            ) {
                Text(ev.tag, color = TarafTextSecondary, style = MaterialTheme.typography.labelSmall)
                Text(
                    if (unlocked) ev.title else "دليل غير مكتشف",
                    color = if (unlocked) Color.White else TarafTextSecondary,
                    fontWeight = FontWeight.SemiBold
                )
                if (unlocked) {
                    Text(ev.full, color = TarafTextSecondary, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}

@Composable
private fun ContradictionPuzzleView(puzzle: online.taraf5eet.native.data.ContradictionPuzzle, vm: CaseViewModel) {
    var selected by remember { mutableStateOf<List<String>>(emptyList()) }
    val solved = vm.puzzleSolved.value

    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Text(puzzle.introText, color = Color.White, style = MaterialTheme.typography.bodyMedium)
        Spacer(Modifier.height(12.dp))
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.weight(1f)) {
            items(puzzle.statements) { st ->
                val isSelected = selected.contains(st.id)
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (isSelected) TarafGold.copy(alpha = 0.18f) else TarafSurface)
                        .clickable(enabled = !solved) {
                            selected = if (isSelected) selected - st.id
                            else if (selected.size < 2) selected + st.id else selected
                        }
                        .padding(12.dp)
                ) {
                    Text(st.text, color = Color.White, style = MaterialTheme.typography.bodyMedium)
                    Text(st.source, color = TarafTextSecondary, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
        if (solved) {
            Text(puzzle.resultText, color = TarafGold, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(vertical = 8.dp))
        } else {
            Button(
                enabled = selected.size == 2,
                onClick = {
                    if (selected.toSet() == puzzle.correctPair.toSet()) vm.solvePuzzle()
                },
                modifier = Modifier.fillMaxWidth()
            ) { Text("أكّد التناقض") }
        }
    }
}

// ---------- Accusation ----------

@Composable
fun AccusationScreen(case: CaseData, vm: CaseViewModel, onAccused: () -> Unit) {
    var suspectId by remember { mutableStateOf<String?>(null) }
    var theoryId by remember { mutableStateOf<String?>(null) }

    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item { Text("مين الفاعل؟", color = TarafGold, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.titleLarge) }
        items(case.suspects) { s ->
            RadioRow(text = s.name, selected = suspectId == s.id) { suspectId = s.id }
        }
        item { Spacer(Modifier.height(8.dp)); Text("إزاي عرفت؟", color = TarafGold, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.titleMedium) }
        items(case.theoryOptions) { t ->
            RadioRow(text = t.text, selected = theoryId == t.id) { theoryId = t.id }
        }
        item {
            Spacer(Modifier.height(16.dp))
            Button(
                enabled = suspectId != null && theoryId != null,
                onClick = {
                    vm.accuse(suspectId!!, theoryId!!)
                    onAccused()
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = TarafRed)
            ) { Text("أقفل القضية") }
        }
    }
}

@Composable
private fun RadioRow(text: String, selected: Boolean, onClick: () -> Unit) {
    Row(
        Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(if (selected) TarafGold.copy(alpha = 0.18f) else TarafSurface)
            .clickable(onClick = onClick)
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        RadioButton(selected = selected, onClick = onClick)
        Spacer(Modifier.width(4.dp))
        Text(text, color = Color.White, style = MaterialTheme.typography.bodyMedium)
    }
}

// ---------- Ending ----------

@Composable
fun EndingScreen(case: CaseData, vm: CaseViewModel, onBackHome: () -> Unit) {
    val verdict = vm.verdict.value ?: return
    val content = when (verdict) {
        Verdict.GOOD -> case.endingGood
        Verdict.PARTIAL -> case.endingPartial
        Verdict.BAD -> case.endingBad
    }
    val stamp = when (verdict) {
        Verdict.GOOD -> "القضية اتقفلت — إدانة"
        Verdict.PARTIAL -> "أدلة غير كافية"
        Verdict.BAD -> "اتهام ظالم"
    }
    val stampColor = when (verdict) {
        Verdict.GOOD -> TarafGold
        Verdict.PARTIAL -> TarafTextSecondary
        Verdict.BAD -> TarafRed
    }

    Column(Modifier.fillMaxSize().padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Text(stamp, color = stampColor, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.labelLarge)
        Spacer(Modifier.height(8.dp))
        Text(content.title, color = Color.White, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.headlineSmall, textAlign = TextAlign.Center)
        Spacer(Modifier.height(16.dp))
        content.paragraphs.forEach {
            Text(
                it.replace("{wrongName}", case.suspects.first { s -> s.id == vm.accusedSuspectId.value }.name),
                color = TarafTextSecondary,
                style = MaterialTheme.typography.bodyMedium,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(bottom = 10.dp)
            )
        }
        content.hint?.let { Text(it, color = TarafGold, style = MaterialTheme.typography.bodySmall) }
        Spacer(Modifier.height(24.dp))
        Button(onClick = onBackHome, modifier = Modifier.fillMaxWidth()) { Text("رجوع للكتالوج") }
    }
}
