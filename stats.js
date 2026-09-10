/*
 * Public statistics for diceflow.online.
 *
 * Every number on the page comes from a real source. If that source is not
 * reachable the neutral placeholder stays visible — the site never invents
 * or estimates figures.
 *
 * Point DICEFLOW_STATS_URL at the aggregation endpoint when it exists
 * (planned: https://api.diceflow.online/public/stats). Until then the script
 * asks this origin for /stats.json.
 *
 * Expected payload, all fields optional:
 * {
 *   "updated_at": "2026-09-10T00:00:00Z",
 *   "users": 1,
 *   "installs": 0,
 *   "rolls": 0,
 *   "version": "0.4.19",
 *   "milestone": { "current": 1, "target": 100, "label": "First 100 players" }
 * }
 */
(function () {
  var ENDPOINT = window.DICEFLOW_STATS_URL || '/stats.json';

  function num(value) {
    return typeof value === 'number' && isFinite(value)
      ? value.toLocaleString('en-US')
      : null;
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== null) el.textContent = value;
  }

  function render(data) {
    if (!data || typeof data !== 'object') return;

    setText('ps-users', num(data.users));
    setText('ps-installs', num(data.installs));
    setText('ps-rolls', num(data.rolls));
    setText('ps-version', typeof data.version === 'string' ? data.version : null);

    var note = document.getElementById('pubstats-note');
    if (note && typeof data.updated_at === 'string') {
      note.textContent = 'Aggregated and anonymised · updated ' + data.updated_at.slice(0, 10);
    }

    var milestone = data.milestone;
    if (milestone && num(milestone.current) !== null && num(milestone.target) !== null && milestone.target > 0) {
      var pct = Math.max(0, Math.min(100, Math.round((milestone.current / milestone.target) * 100)));
      var bar = document.getElementById('progressbar');
      var wrap = document.getElementById('progress');
      var goalNote = document.getElementById('goal-note');
      var title = document.getElementById('goal-title');
      if (bar) bar.style.width = pct + '%';
      if (wrap) wrap.hidden = false;
      if (title && typeof milestone.label === 'string') title.textContent = milestone.label;
      if (goalNote) {
        goalNote.textContent =
          num(milestone.current) + ' of ' + num(milestone.target) + ' — ' + pct + '%';
      }
    }
  }

  var request;
  try {
    request = fetch(ENDPOINT, { cache: 'no-store' });
  } catch (e) {
    return;
  }

  request
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(render)
    .catch(function () {
      var note = document.getElementById('pubstats-note');
      if (note) note.textContent = 'Statistics are not published yet.';
      var goalNote = document.getElementById('goal-note');
      if (goalNote) goalNote.textContent = 'The community counter appears here once analytics is live.';
    });
})();
