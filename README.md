# Ilja Self Page

Local-first personal portfolio platform for Ilja Lushpajev.

## Run

```bash
node server.mjs
```

Open:

- Public site: `http://localhost:4173`
- Backoffice: `http://localhost:4173/backoffice.html`

Default local backoffice token:

```text
local-dev-token
```

Override it when needed:

```bash
BACKOFFICE_TOKEN=change-me PORT=4173 node server.mjs
```

## Current Shape

- `server.mjs` serves static files and a small JSON API.
- `data/profile.json` stores positioning, skills, timeline, and contact links.
- `data/projects.json` stores the first case bank.
- `public/index.html` is the public portfolio.
- `public/backoffice.html` is the local content editor for projects.

No npm dependencies are required in this first increment.

## Next Architecture Moves

1. Replace JSON files with SQLite while keeping the same `/api/profile` and `/api/projects` contract.
2. Add real auth for the backoffice.
3. Add an AI assistant service that answers from `profile` + `projects` + future Obsidian exports.
4. Split services when it becomes useful: content API, search/indexing, assistant, and frontend app.
