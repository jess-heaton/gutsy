(function () {
  'use strict';

  const STORAGE_KEY = 'gutfeeling_entries';

  /* ─── Gutsy site: sync extension data → localStorage then exit ─── */
  const isGutsySite = !!document.querySelector('meta[name="gutsy-sync-target"]');

  if (isGutsySite) {
    chrome.storage.local.get([STORAGE_KEY], function (result) {
      const ext = result[STORAGE_KEY];
      if (!ext || Object.keys(ext).length === 0) return;

      // Inject into page context (content scripts can't touch page localStorage directly)
      const s = document.createElement('script');
      s.textContent = `(function(){
        try {
          var ext = ${JSON.stringify(ext)};
          var cur = JSON.parse(localStorage.getItem('${STORAGE_KEY}') || '{}');
          var merged = Object.assign({}, cur);
          Object.keys(ext).forEach(function(date) {
            if (!merged[date]) {
              merged[date] = ext[date];
            } else {
              var ids = new Set(merged[date].map(function(e){ return e.id; }));
              ext[date].forEach(function(e){ if (!ids.has(e.id)) merged[date].unshift(e); });
            }
          });
          localStorage.setItem('${STORAGE_KEY}', JSON.stringify(merged));
          window.dispatchEvent(new Event('storage'));
        } catch(e) {}
      })();`;
      (document.head || document.documentElement).appendChild(s);
      s.remove();
    });
    return;
  }

  /* ─── All other pages: inject the quick-log widget ─── */
  if (document.getElementById('gutsy-widget-root')) return;

  const host = document.createElement('div');
  host.id = 'gutsy-widget-root';
  host.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:2147483647;font-size:0;line-height:0;';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  /* ── State ── */
  let open    = false;
  let mode    = 'meal';   // 'meal' | 'bowel' | 'symptom'
  let bristol = null;
  let score   = null;

  /* ── Helpers ── */
  const todayKey = () => new Date().toISOString().split('T')[0];
  const nowTime  = () => {
    const d = new Date();
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  };
  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function saveEntry(entry) {
    chrome.storage.local.get([STORAGE_KEY], function (res) {
      const all = res[STORAGE_KEY] || {};
      if (!all[entry.date]) all[entry.date] = [];
      all[entry.date].unshift(entry);
      chrome.storage.local.set({ [STORAGE_KEY]: all });
    });
  }

  /* ── Styles (Shadow DOM isolates these from the host page) ── */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Pill ── */
    #pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(10, 33, 19, 0.97);
      border: 1px solid rgba(26, 92, 54, 0.55);
      color: rgba(255,255,255,0.8);
      padding: 7px 14px 7px 11px;
      border-radius: 999px;
      cursor: pointer;
      font-family: -apple-system, 'Inter', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3);
      user-select: none;
      transition: background 0.2s, border-color 0.2s;
      letter-spacing: 0.01em;
    }
    #pill:hover {
      background: rgba(17, 61, 36, 0.97);
      border-color: rgba(35, 122, 73, 0.6);
    }
    #pill svg {
      width: 13px; height: 13px;
      flex-shrink: 0;
      color: rgba(61, 184, 119, 0.85);
    }

    /* ── Card ── */
    #card {
      width: 282px;
      background: rgba(7, 7, 7, 0.98);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 16px 56px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.5);
      font-family: -apple-system, 'Inter', system-ui, sans-serif;
    }

    /* Header */
    #hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    #logo {
      font-family: 'Pacifico', cursive;
      font-size: 17px;
      color: white;
      line-height: 1;
    }
    #x {
      background: none; border: none;
      color: rgba(255,255,255,0.22);
      cursor: pointer;
      font-size: 19px;
      line-height: 1;
      padding: 0 2px;
      transition: color 0.15s;
      font-family: inherit;
    }
    #x:hover { color: rgba(255,255,255,0.65); }

    /* Tabs */
    #tabs {
      display: flex;
      gap: 3px;
      padding: 10px 11px 0;
    }
    .tab {
      flex: 1;
      padding: 6px 2px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: rgba(255,255,255,0.26);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
      letter-spacing: 0.01em;
    }
    .tab.on  { background: rgba(26,92,54,0.5); color: rgba(61,184,119,0.9); }
    .tab:hover:not(.on) { color: rgba(255,255,255,0.52); }

    /* Body */
    #body { padding: 10px 11px; }

    textarea {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      padding: 9px 11px;
      color: rgba(255,255,255,0.88);
      font-size: 13px;
      font-family: inherit;
      resize: none;
      outline: none;
      transition: border-color 0.2s;
      display: block;
    }
    textarea::placeholder { color: rgba(255,255,255,0.17); }
    textarea:focus { border-color: rgba(26,92,54,0.9); }

    .lbl {
      font-size: 10.5px;
      color: rgba(255,255,255,0.27);
      margin-bottom: 7px;
      display: block;
      letter-spacing: 0.03em;
    }
    .hint {
      font-size: 10px;
      color: rgba(255,255,255,0.27);
      text-align: center;
      margin-top: 5px;
      display: block;
    }

    .g7 { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
    .g5 { display: grid; grid-template-columns: repeat(5,1fr); gap: 4px; }

    .n {
      padding: 9px 0;
      border-radius: 8px;
      border: none;
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.33);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.12s;
      font-family: inherit;
    }
    .n.on  { background: rgba(26,92,54,0.85); color: rgba(61,184,119,1); }
    .n:hover:not(.on) { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.75); }

    .mm {
      display: flex;
      justify-content: space-between;
      padding: 4px 2px 0;
      font-size: 9.5px;
      color: rgba(255,255,255,0.18);
    }

    /* Save */
    #save {
      display: block;
      width: calc(100% - 22px);
      margin: 0 11px 11px;
      padding: 9px;
      border: none;
      border-radius: 10px;
      color: rgba(255,255,255,0.9);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
      background: rgba(26,92,54,0.9);
      letter-spacing: 0.01em;
    }
    #save:hover:not(:disabled) { background: rgba(35,122,73,0.95); }
    #save:disabled {
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.18);
      cursor: not-allowed;
    }
    #save.ok {
      background: rgba(22,163,74,0.45);
      color: rgba(167,243,208,1);
      cursor: default;
    }
  `;

  /* ── Render ── */
  const BLABELS = ['Hard','Lumpy','Cracked','Normal','Soft','Mushy','Watery'];

  function render() {
    shadow.innerHTML = '';
    const style = document.createElement('style');
    style.textContent = CSS;
    shadow.appendChild(style);

    if (!open) {
      const pill = document.createElement('div');
      pill.id = 'pill';
      pill.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>quick log</span>`;
      pill.addEventListener('click', () => { open = true; render(); });
      shadow.appendChild(pill);
      return;
    }

    const card = document.createElement('div');
    card.id = 'card';
    card.innerHTML = `
      <div id="hd">
        <span id="logo">gutsy</span>
        <button id="x">×</button>
      </div>
      <div id="tabs">
        <button class="tab ${mode==='meal'?'on':''}"    data-m="meal">🍎 meal</button>
        <button class="tab ${mode==='bowel'?'on':''}"   data-m="bowel">🚽 bowel</button>
        <button class="tab ${mode==='symptom'?'on':''}" data-m="symptom">😣 symptom</button>
      </div>
      <div id="body">
        ${mode === 'meal' ? `
          <textarea id="ta" rows="2" placeholder="What did you eat?"></textarea>
        ` : mode === 'bowel' ? `
          <span class="lbl">Bristol type</span>
          <div class="g7">${[1,2,3,4,5,6,7].map(n=>`<button class="n${bristol===n?' on':''}" data-n="${n}">${n}</button>`).join('')}</div>
          ${bristol!==null?`<span class="hint">${BLABELS[bristol-1]}</span>`:''}
        ` : `
          <span class="lbl">Overall symptom score</span>
          <div class="g5">${[2,4,6,8,10].map(n=>`<button class="n${score===n?' on':''}" data-n="${n}">${n}</button>`).join('')}</div>
          <div class="mm"><span>mild</span><span>severe</span></div>
        `}
      </div>
      <button id="save"${(mode==='bowel'&&bristol===null)||(mode==='symptom'&&score===null)?' disabled':''}>Log it</button>
    `;
    shadow.appendChild(card);

    // Wire up events
    shadow.getElementById('x').addEventListener('click', () => { open = false; render(); });

    shadow.querySelectorAll('.tab').forEach(b =>
      b.addEventListener('click', () => { mode = b.dataset.m; bristol = null; score = null; render(); })
    );

    if (mode === 'meal') {
      const ta   = shadow.getElementById('ta');
      const save = shadow.getElementById('save');
      save.disabled = true;
      ta.addEventListener('input', () => { save.disabled = !ta.value.trim(); });
      ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSave(); } });
      ta.focus();
    }

    if (mode === 'bowel') {
      shadow.querySelectorAll('.n').forEach(b =>
        b.addEventListener('click', () => { bristol = +b.dataset.n; render(); })
      );
    }

    if (mode === 'symptom') {
      shadow.querySelectorAll('.n').forEach(b =>
        b.addEventListener('click', () => { score = +b.dataset.n; render(); })
      );
    }

    shadow.getElementById('save').addEventListener('click', doSave);
  }

  function doSave() {
    const base = { id: genId(), date: todayKey(), time: nowTime() };
    let entry = null;

    if (mode === 'meal') {
      const text = shadow.getElementById('ta')?.value?.trim();
      if (!text) return;
      entry = { ...base, type: 'meal', mealType: 'snack', foods: [], freeText: text };
    } else if (mode === 'bowel' && bristol !== null) {
      entry = { ...base, type: 'bowel', bristolType: bristol, urgency: 'normal', pain: 0 };
    } else if (mode === 'symptom' && score !== null) {
      entry = { ...base, type: 'symptom', overall: score, bloating: 0, pain: 0, gas: 0, nausea: 0, fatigue: 0, notes: '' };
    }

    if (!entry) return;
    saveEntry(entry);

    const btn = shadow.getElementById('save');
    btn.textContent = '✓ Saved';
    btn.className = 'ok';
    btn.disabled = true;

    setTimeout(() => { bristol = null; score = null; render(); }, 1300);
  }

  render();
})();
