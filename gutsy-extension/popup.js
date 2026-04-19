(async () => {
  const { gutsy_auth, gutsy_pending = [] } = await chrome.storage.local.get(['gutsy_auth', 'gutsy_pending']);
  const statusEl = document.getElementById('status');
  const pendingEl = document.getElementById('pending');

  if (gutsy_auth?.email) {
    statusEl.innerHTML = `<b>Signed in</b>${gutsy_auth.email}`;
  } else {
    statusEl.classList.add('out');
    statusEl.innerHTML = `<b>Not signed in</b>Open Gutsy and sign in to sync your logs.`;
  }

  if (gutsy_pending.length) {
    pendingEl.textContent = `${gutsy_pending.length} log${gutsy_pending.length === 1 ? '' : 's'} waiting to sync`;
  }
})();
