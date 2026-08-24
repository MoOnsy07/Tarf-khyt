/* ============================================================
   Theory Builder Safety Fix
   يمنع شاشة بناء النظرية من كشف الجاني الحقيقي لو اللاعب اتهم
   شخصًا غلط. في الاتهام الغلط نروح مباشرة للنتيجة، أما لو
   الاتهام صح فتبقى شاشة النظرية متاحة كالمعتاد.
   ============================================================ */
(() => {
  'use strict';

  if (typeof renderPanel !== 'function' || typeof computeEnding !== 'function') return;

  const baseRenderPanel = renderPanel;

  renderPanel = function(){
    try {
      const onTheory = !!(game && CASE && game.screen === 'theory');
      const theoryEnabled = !!(CASE && CASE.theoryBuilder && CASE.theoryBuilder.enabled);
      const hasAccusation = !!(game && game.accSuspect);
      const hasCorrectSuspect = !!(CASE && CASE.correctSuspectId);
      const wrongAccusation = hasAccusation && hasCorrectSuspect && game.accSuspect !== CASE.correctSuspectId;

      if (onTheory && theoryEnabled && wrongAccusation) {
        try {
          gaTrack('theory_skipped_wrong_accusation', {
            suspect_id: String(game.accSuspect || '')
          });
        } catch (_) {}

        return computeEnding();
      }
    } catch (_) {}

    return baseRenderPanel.apply(this, arguments);
  };

  try {
    window.__TARAF_THEORY_BUILDER_SAFETY_FIX__ = {
      version: '2026-08-24-v1',
      wrongAccusationSkipsTheory: true,
      correctAccusationKeepsTheory: true
    };
  } catch (_) {}
})();
