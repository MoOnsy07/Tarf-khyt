/* ============================================================
   leaderboard.js — نظام الليدر بورد لـ "طرف الخيط"
   ============================================================
   الاستخدام:
   1. حط السكريبت ده بعد سكريبت Supabase مباشرة في كل الصفحات
      اللي محتاجة تتفاعل مع الليدر بورد (صفحة اللعب + صفحة الليدر بورد).
   2. في engine.js، بعد ما اللاعب يوصل لنهاية "good" (حل القضية صح)،
      نادِ على:
         Leaderboard.submitScore({
           caseId: CASE.id,
           caseTitle: CASE.title,
           points: CASE.investigationPoints,
           solveTimeSeconds: <احسبها من وقت بداية القضية>,
           endingType: 'good'
         });
   ============================================================ */

const Leaderboard = (() => {
  const SUPABASE_URL = 'https://meynspmfkkedhqhffsqk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9';

  let client = null;
  function getClient() {
    if (!client) {
      client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return client;
  }

  const NAME_STORAGE_KEY = 'ca_player_name';
  const LEGACY_NAME_STORAGE_KEY = 'tarafkhyt_player_name';

  /** يرجع اسم اللاعب المحفوظ محليًا، أو null لو أول مرة */
  function getSavedPlayerName() {
    try {
      let name = localStorage.getItem(NAME_STORAGE_KEY);
      if (!name) {
        name = localStorage.getItem(LEGACY_NAME_STORAGE_KEY);
        if (name) localStorage.setItem(NAME_STORAGE_KEY, name);
      }
      return name;
    } catch (e) {
      return null;
    }
  }

  /** يحفظ اسم اللاعب محليًا عشان ميتسألش كل مرة */
  function savePlayerName(name) {
    try {
      localStorage.setItem(NAME_STORAGE_KEY, name);
      localStorage.setItem(LEGACY_NAME_STORAGE_KEY, name);
    } catch (e) {
      /* لو التخزين المحلي مش متاح، نتجاهل بهدوء */
    }
  }

  /** تنضيف بسيط لاسم اللاعب: يشيل مسافات زيادة ويحدد الطول */
  function sanitizeName(name) {
    const trimmed = (name || '').trim().replace(/\s+/g, ' ');
    return trimmed.slice(0, 30);
  }

  /**
   * تسجيل نتيجة لاعب بعد ما يحل قضية بنجاح.
   * لازم يتنادى مرة واحدة بس لكل حل ناجح، بعد نهاية "good".
   */
  async function submitScore({ caseId, caseTitle, points, solveTimeSeconds, endingType }) {
    let playerName = getSavedPlayerName();

    // أول مرة يحل فيها اللاعب قضية، نطلب منه اسم مستعار
    if (!playerName) {
      playerName = sanitizeName(
        prompt('اكتب اسمك المستعار اللي هيظهر في لوحة المتصدرين:') || ''
      );
      if (!playerName || playerName.length < 2) {
        // اللاعب رفض يحط اسم، نتجاهل التسجيل من غير ما نعطل اللعبة
        return { skipped: true };
      }
      savePlayerName(playerName);
    }

    // حماية بسيطة من قيم غير منطقية قبل الإرسال
    const safeTime = Math.max(1, Math.floor(solveTimeSeconds || 0));
    const safePoints = Math.max(0, Math.floor(points || 0));

    try {
      const { data, error } = await getClient()
        .from('leaderboard_entries')
        .insert([{
          player_name: playerName,
          case_id: caseId,
          case_title: caseTitle,
          points: safePoints,
          solve_time_seconds: safeTime,
          ending_type: endingType || 'good',
        }]);

      if (error) {
        console.error('Leaderboard submit error:', error);
        return { error };
      }
      return { data };
    } catch (e) {
      console.error('Leaderboard submit exception:', e);
      return { error: e };
    }
  }

  /** تاب "عدد القضايا المحلولة" — أعلى اللاعبين حسب عدد القضايا المختلفة */
  async function getTopByCasesSolved(limit = 50) {
    const { data, error } = await getClient()
      .from('leaderboard_by_cases_solved')
      .select('*')
      .order('cases_solved', { ascending: false })
      .order('total_points', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('getTopByCasesSolved error:', error);
      return [];
    }
    return data || [];
  }

  /** تاب "إجمالي النقاط" — أعلى اللاعبين حسب مجموع النقاط */
  async function getTopByTotalPoints(limit = 50) {
    const { data, error } = await getClient()
      .from('leaderboard_by_total_points')
      .select('*')
      .order('total_points', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('getTopByTotalPoints error:', error);
      return [];
    }
    return data || [];
  }

  /**
   * تاب "الأسرع" — أسرع وقت حل لقضية معينة.
   * لو caseId اتسابت فاضية، بترجع أسرع وقت لكل القضايا مجمّعة.
   */
  async function getFastestForCase(caseId, limit = 50) {
    let query = getClient()
      .from('leaderboard_fastest_per_case')
      .select('*')
      .order('solve_time_seconds', { ascending: true })
      .limit(limit);

    if (caseId) {
      query = query.eq('case_id', caseId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('getFastestForCase error:', error);
      return [];
    }
    return data || [];
  }

  /** يرجع قائمة بكل القضايا اللي فيها نتايج مسجلة، لملء قائمة اختيار القضية في تاب الأسرع */
  async function getCasesWithEntries() {
    const { data, error } = await getClient()
      .from('leaderboard_entries')
      .select('case_id, case_title')
      .eq('ending_type', 'good');

    if (error) {
      console.error('getCasesWithEntries error:', error);
      return [];
    }
    const seen = new Map();
    (data || []).forEach((row) => {
      if (!seen.has(row.case_id)) seen.set(row.case_id, row.case_title);
    });
    return Array.from(seen, ([caseId, caseTitle]) => ({ caseId, caseTitle }));
  }

  return {
    submitScore,
    getTopByCasesSolved,
    getTopByTotalPoints,
    getFastestForCase,
    getCasesWithEntries,
    getSavedPlayerName,
  };
})();
