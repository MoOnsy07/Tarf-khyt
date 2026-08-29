/* Production fallback for Return from Death document-style evidence that has no raster asset on main yet. */
(() => {
  'use strict';
  if (typeof CASE_RETURN_FROM_DEATH === 'undefined') return;

  const missing = new Set([
    'atm-after-death.jpg',
    'cloud-login.jpg',
    'death-time.jpg',
    'device-blackout.jpg',
    'doctor-contacts.jpg',
    'escape-finance.jpg',
    'fingerprint-reda.jpg',
    'kareem-contact-dna.jpg',
    'marwan-contact-dna.jpg',
    'marwan-last-call.jpg',
    'motive-file.jpg',
    'pharmacy-kareem.jpg',
    'reda-meeting.jpg',
    'sample-chain.jpg',
    'scar-report.jpg',
    'sedative-report.jpg',
    'voice-after-death.jpg',
    'warehouse-blood-report.jpg'
  ]);
  const base = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/return-from-death/';
  const seen = new WeakSet();

  function walk(value) {
    if (!value || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    Object.keys(value).forEach((key) => {
      const item = value[key];
      if (typeof item === 'string' && item.startsWith(base)) {
        const filename = item.slice(base.length);
        if (missing.has(filename)) value[key] = null;
      } else {
        walk(item);
      }
    });
  }

  walk(CASE_RETURN_FROM_DEATH);

  // القيم المطلوبة في تحدي المطابقة هي أكواد/مراجع المستندات نفسها، مش أرقام داخل وصف الواقعة.
  const evidence = Array.isArray(CASE_RETURN_FROM_DEATH.evidence) ? CASE_RETURN_FROM_DEATH.evidence : [];
  const fingerprintReda = evidence.find(e => e && e.id === 'fingerprint_reda');
  if (fingerprintReda) {
    fingerprintReda.matchValue = '517';
    fingerprintReda.full = String(fingerprintReda.full || '').replace(/\s+$/,'') + '\n\nمرجع الدليل: 517 (رقم القضية 2024/517)';
    fingerprintReda.short = String(fingerprintReda.short || '').replace(/\s+$/,'') + ' — مرجع الدليل: 517';
  }

  const deviceBlackout = evidence.find(e => e && e.id === 'device_blackout');
  if (deviceBlackout) {
    deviceBlackout.matchValue = '0017';
    deviceBlackout.full = String(deviceBlackout.full || '').replace(/\s+$/,'') + '\n\nمرجع الدليل: 0017 (رقم الملف 2025-0017)';
    deviceBlackout.short = String(deviceBlackout.short || '').replace(/\s+$/,'') + ' — مرجع الدليل: 0017';
  }
})();
