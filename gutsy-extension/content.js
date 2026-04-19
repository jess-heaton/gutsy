/* Gutsy extension content script.
 *
 * Two jobs:
 *  1. On the Gutsy site: harvest the Supabase auth session from page
 *     localStorage and mirror it into chrome.storage so the widget on other
 *     tabs can use it.
 *  2. On every other http(s) page: inject a floating quick-log widget that
 *     writes entries directly to Supabase (or buffers them if offline/logged
 *     out and flushes later).
 */
(() => {
  'use strict';
  if (window.__gutsyLoaded) return;
  window.__gutsyLoaded = true;

  const SUPABASE_URL  = 'https://epeckzrybiwjwxazhvrm.supabase.co';
  const SUPABASE_KEY  = 'sb_publishable_lC-_-rxLKJrbTSilC5MY2g_F1PK4QAd';
  const PROJECT_REF   = 'epeckzrybiwjwxazhvrm';
  const AUTH_LS_KEY   = `sb-${PROJECT_REF}-auth-token`;
  const GUTSY_HOSTS   = ['gutsy.freedible.co.uk', 'localhost', '127.0.0.1'];

  const isGutsySite =
    document.querySelector('meta[name="gutsy-sync-target"]') !== null ||
    GUTSY_HOSTS.includes(location.hostname);

  /* ═══════════════════════════ auth helpers ═══════════════════════════ */

  function readPageAuth() {
    try {
      const raw = localStorage.getItem(AUTH_LS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const access  = parsed.access_token  || parsed.currentSession?.access_token;
      const refresh = parsed.refresh_token || parsed.currentSession?.refresh_token;
      const expires = parsed.expires_at    || parsed.currentSession?.expires_at;
      const user    = parsed.user          || parsed.currentSession?.user;
      if (!access || !user?.id) return null;
      return { access_token: access, refresh_token: refresh, expires_at: expires, user_id: user.id, email: user.email };
    } catch { return null; }
  }

  async function getAuth() {
    const { gutsy_auth } = await chrome.storage.local.get('gutsy_auth');
    return gutsy_auth || null;
  }

  async function setAuth(auth) {
    if (auth) await chrome.storage.local.set({ gutsy_auth: auth });
    else await chrome.storage.local.remove('gutsy_auth');
  }

  async function refreshAuth(auth) {
    if (!auth?.refresh_token) return null;
    try {
      const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: auth.refresh_token }),
      });
      if (!r.ok) return null;
      const j = await r.json();
      const next = {
        access_token: j.access_token,
        refresh_token: j.refresh_token,
        expires_at: j.expires_at,
        user_id: j.user?.id || auth.user_id,
        email:   j.user?.email || auth.email,
      };
      await setAuth(next);
      return next;
    } catch { return null; }
  }

  async function authValid(auth) {
    if (!auth) return null;
    const nowSec = Math.floor(Date.now() / 1000);
    if (auth.expires_at && auth.expires_at - 60 > nowSec) return auth;
    return await refreshAuth(auth);
  }

  /* ═══════════════════════════ gutsy site: harvest ═══════════════════════════ */

  if (isGutsySite) {
    const sync = () => {
      const fresh = readPageAuth();
      if (fresh) setAuth(fresh);
      else setAuth(null);
    };
    sync();
    window.addEventListener('storage', (e) => { if (e.key === AUTH_LS_KEY) sync(); });
    setInterval(sync, 30_000);
    flushPending();
    return;
  }

  /* ═══════════════════════════ entry writing ═══════════════════════════ */

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function nowTime() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  async function postEntry(row, auth) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/entries`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    return r.ok;
  }

  async function saveEntry(partial) {
    const id = generateId();
    const row = {
      id,
      date: todayKey(),
      time: nowTime(),
      ...partial,
    };

    const auth = await authValid(await getAuth());
    if (auth) {
      const ok = await postEntry({ ...row, user_id: auth.user_id }, auth);
      if (ok) return { status: 'synced' };
    }

    const { gutsy_pending = [] } = await chrome.storage.local.get('gutsy_pending');
    gutsy_pending.push(row);
    await chrome.storage.local.set({ gutsy_pending });
    return { status: 'pending' };
  }

  async function flushPending() {
    const auth = await authValid(await getAuth());
    if (!auth) return;
    const { gutsy_pending = [] } = await chrome.storage.local.get('gutsy_pending');
    if (!gutsy_pending.length) return;
    const remaining = [];
    for (const row of gutsy_pending) {
      const ok = await postEntry({ ...row, user_id: auth.user_id }, auth);
      if (!ok) remaining.push(row);
    }
    await chrome.storage.local.set({ gutsy_pending: remaining });
  }

  flushPending();

  /* ═══════════════════════════ widget UI ═══════════════════════════ */

  const host = document.createElement('div');
  host.id = 'gutsy-widget-host';
  host.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:2147483647;';
  const shadow = host.attachShadow({ mode: 'open' });

  const BRISTOL_LABELS = { 1:'Hard', 2:'Lumpy', 3:'Cracked', 4:'Normal', 5:'Soft', 6:'Mushy', 7:'Watery' };

  shadow.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600;700&display=swap');
      :host, * { box-sizing: border-box; }
      .pill {
        display:flex;align-items:center;gap:8px;background:#0a0a0a;border:1px solid #1f2937;
        color:#fff;padding:9px 14px;border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.35);
        font:500 13px Inter,system-ui,sans-serif;cursor:pointer;transition:all .15s;
      }
      .pill:hover { background:#111827;border-color:#374151; }
      .pill svg { width:14px;height:14px;color:#4ade80; }
      .card {
        width:280px;background:rgba(10,10,10,.96);backdrop-filter:blur(20px);
        border:1px solid rgba(255,255,255,.05);border-radius:16px;overflow:hidden;
        box-shadow:0 20px 50px rgba(0,0,0,.5);font:400 13px Inter,system-ui,sans-serif;color:#fff;
      }
      .hdr { display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.05); }
      .logo { font:400 18px Pacifico,cursive;color:#fff;line-height:1; }
      .close { background:none;border:none;color:#4b5563;cursor:pointer;padding:4px;display:flex;align-items:center; }
      .close:hover { color:#d1d5db; }
      .tabs { display:flex;gap:4px;padding:12px 12px 0; }
      .tab { flex:1;padding:6px;border-radius:8px;background:none;border:none;cursor:pointer;color:#4b5563;font:500 11px Inter;text-transform:capitalize;transition:all .15s; }
      .tab.active { background:#065f46;color:#6ee7b7; }
      .tab:not(.active):hover { color:#d1d5db; }
      .body { padding:12px;display:flex;flex-direction:column;gap:8px; }
      textarea { width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.05);border-radius:12px;padding:10px 12px;color:#fff;font:400 13px Inter;resize:none;outline:none; }
      textarea:focus { border-color:#065f46; }
      textarea::placeholder { color:#4b5563; }
      .label { font-size:11px;color:#4b5563;padding:0 2px; }
      .grid7 { display:grid;grid-template-columns:repeat(7,1fr);gap:4px; }
      .grid5 { display:grid;grid-template-columns:repeat(5,1fr);gap:4px; }
      .gbtn { padding:8px 0;border-radius:8px;background:rgba(255,255,255,.04);border:none;cursor:pointer;color:#6b7280;font:700 11px Inter;transition:all .15s; }
      .gbtn.active { background:#047857;color:#fff; }
      .gbtn:not(.active):hover { color:#e5e7eb; }
      .sub { font-size:11px;color:#6b7280;text-align:center; }
      .scale { display:flex;justify-content:space-between;padding:0 2px;font-size:10px;color:#374151; }
      .save {
        width:100%;padding:9px;border-radius:12px;border:none;cursor:pointer;
        font:600 12px Inter;background:#047857;color:#fff;transition:all .15s;
      }
      .save:hover:not(:disabled) { background:#059669; }
      .save:disabled { background:rgba(255,255,255,.04);color:#374151;cursor:not-allowed; }
      .save.ok { background:#064e3b;color:#6ee7b7; }
      .status { font-size:10px;color:#4b5563;text-align:center;padding-top:2px; }
      .status.pending { color:#fbbf24; }
    </style>

    <button id="pill" class="pill" aria-label="Open Gutsy">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
      Quick log
    </button>

    <div id="card" class="card" style="display:none">
      <div class="hdr">
        <span class="logo">gutsy</span>
        <button id="x" class="close" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="tabs">
        <button class="tab active" data-mode="meal">🍎 meal</button>
        <button class="tab" data-mode="bowel">🚽 bowel</button>
        <button class="tab" data-mode="symptom">😣 symptom</button>
      </div>
      <div class="body">
        <div id="pane-meal">
          <textarea id="meal-text" rows="2" placeholder="What did you eat?"></textarea>
        </div>
        <div id="pane-bowel" style="display:none">
          <div class="label" style="padding-bottom:6px">Bristol stool type</div>
          <div id="bristol-grid" class="grid7"></div>
          <div id="bristol-sub" class="sub" style="padding-top:4px"></div>
        </div>
        <div id="pane-symptom" style="display:none">
          <div class="label" style="padding-bottom:6px">Overall symptom score</div>
          <div id="sym-grid" class="grid5"></div>
          <div class="scale" style="padding-top:4px"><span>mild</span><span>severe</span></div>
        </div>
        <button id="save" class="save" disabled>Log it</button>
        <div id="status" class="status"></div>
      </div>
    </div>
  `;
  document.documentElement.appendChild(host);

  const $  = (id) => shadow.getElementById(id);
  const pill = $('pill'), card = $('card'), xBtn = $('x'), saveBtn = $('save'), statusEl = $('status');
  const mealText = $('meal-text'), bristolGrid = $('bristol-grid'), bristolSub = $('bristol-sub'), symGrid = $('sym-grid');

  let mode = 'meal', bristol = null, symptom = null;

  for (let n = 1; n <= 7; n++) {
    const b = document.createElement('button');
    b.className = 'gbtn'; b.textContent = n; b.dataset.n = n;
    b.addEventListener('click', () => {
      bristol = n;
      [...bristolGrid.children].forEach(c => c.classList.toggle('active', +c.dataset.n === n));
      bristolSub.textContent = BRISTOL_LABELS[n];
      refreshSave();
    });
    bristolGrid.appendChild(b);
  }
  for (const n of [2, 4, 6, 8, 10]) {
    const b = document.createElement('button');
    b.className = 'gbtn'; b.textContent = n; b.dataset.n = n;
    b.addEventListener('click', () => {
      symptom = n;
      [...symGrid.children].forEach(c => c.classList.toggle('active', +c.dataset.n === n));
      refreshSave();
    });
    symGrid.appendChild(b);
  }

  shadow.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      mode = t.dataset.mode;
      shadow.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === t));
      $('pane-meal').style.display    = mode === 'meal' ? '' : 'none';
      $('pane-bowel').style.display   = mode === 'bowel' ? '' : 'none';
      $('pane-symptom').style.display = mode === 'symptom' ? '' : 'none';
      refreshSave();
    });
  });

  mealText.addEventListener('input', refreshSave);
  mealText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (canSave()) doSave(); }
  });

  function canSave() {
    if (mode === 'meal')    return !!mealText.value.trim();
    if (mode === 'bowel')   return bristol !== null;
    if (mode === 'symptom') return symptom !== null;
    return false;
  }
  function refreshSave() {
    saveBtn.disabled = !canSave();
    saveBtn.textContent = 'Log it';
    saveBtn.classList.remove('ok');
    statusEl.textContent = '';
    statusEl.classList.remove('pending');
  }

  async function doSave() {
    let payload;
    if (mode === 'meal') {
      payload = { type: 'meal', payload: { mealType: 'snack', foods: [], freeText: mealText.value.trim() } };
    } else if (mode === 'bowel') {
      payload = { type: 'bowel', payload: { bristolType: bristol, urgency: 'normal', pain: 0 } };
    } else {
      payload = { type: 'symptom', payload: { overall: symptom, bloating: 0, pain: 0, gas: 0, nausea: 0, fatigue: 0, notes: '' } };
    }
    saveBtn.disabled = true;
    const { status } = await saveEntry(payload);
    saveBtn.textContent = '✓ Saved';
    saveBtn.classList.add('ok');
    if (status === 'pending') {
      statusEl.textContent = 'Saved locally — will sync when you open Gutsy';
      statusEl.classList.add('pending');
    } else {
      statusEl.textContent = 'Synced to your account';
    }
    setTimeout(() => {
      mealText.value = ''; bristol = null; symptom = null;
      [...bristolGrid.children].forEach(c => c.classList.remove('active'));
      [...symGrid.children].forEach(c => c.classList.remove('active'));
      bristolSub.textContent = '';
      refreshSave();
    }, 1600);
  }

  saveBtn.addEventListener('click', doSave);
  pill.addEventListener('click', () => { pill.style.display = 'none'; card.style.display = ''; });
  xBtn.addEventListener('click', () => { card.style.display = 'none'; pill.style.display = ''; });
})();
