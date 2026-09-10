# diceflow-site

Marketing site and public roadmap for [DiceFlow](https://app.diceflow.online).

Public repository by design. It contains no DiceFlow application source — only the
landing page, the roadmap entry point and the public statistics display.

| | |
|---|---|
| Live | https://diceflow.online |
| Application | https://app.diceflow.online |
| Development build | https://dev.diceflow.online |
| Discussion and voting | https://github.com/liquid245/diceflow-site/discussions |

## Stack

Plain static HTML, CSS and JavaScript. No build step, no dependencies, no
framework. Cloudflare Pages serves the repository root as-is, so what is in this
repository is exactly what visitors receive.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire landing page, including the interactive dice demo |
| `stats.js` | Fetches aggregated public statistics and renders them |

## Public statistics

`stats.js` reads `window.DICEFLOW_STATS_URL`, falling back to `/stats.json` on
this origin. Only aggregated, anonymous values are displayed: user count, install
count, roll count, current application version and milestone progress.

No personal data, no user identifiers, no individual actions — by design.

When the aggregation service exists, it should serve this shape. Every field is
optional; missing fields keep their neutral placeholder rather than being
estimated:

```json
{
  "updated_at": "2026-09-10T00:00:00Z",
  "users": 0,
  "installs": 0,
  "rolls": 0,
  "version": "0.4.19",
  "milestone": { "current": 0, "target": 100, "label": "First 100 players" }
}
```

## Local preview

```bash
python3 -m http.server 8080
```

## Language

English is the primary launch language. Russian follows.
