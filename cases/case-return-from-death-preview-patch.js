/* Preview branch only: use images from this branch instead of main. */
(() => {
  'use strict';
  if (typeof CASE_RETURN_FROM_DEATH === 'undefined') return;
  const from = 'https://raw.githubusercontent.com/MoOnsy07/Tarf-khyt/main/images/return-from-death/';
  const to = 'images/return-from-death/';
  const seen = new WeakSet();
  function walk(value){
    if(!value || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    if(Array.isArray(value)){
      value.forEach((item, i) => {
        if(typeof item === 'string' && item.startsWith(from)) value[i] = to + item.slice(from.length);
        else walk(item);
      });
      return;
    }
    Object.keys(value).forEach(key => {
      const item = value[key];
      if(typeof item === 'string' && item.startsWith(from)) value[key] = to + item.slice(from.length);
      else walk(item);
    });
  }
  walk(CASE_RETURN_FROM_DEATH);
  CASE_RETURN_FROM_DEATH.previewOnly = true;
})();
