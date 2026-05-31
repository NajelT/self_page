# Architecture Notes

## Goal

This is deliberately more complex than a normal portfolio page, but still small enough to understand end to end. The current version is a local-first vertical slice:

- browser UI
- local HTTP API
- content database represented as JSON files
- backoffice CRUD for project cases

## Boundaries

### Public app

The public app fetches profile and project data from API routes instead of hardcoding content into HTML. That keeps the content model movable.

### Content API

The API currently lives in `server.mjs`. It exposes:

- `GET /api/profile`
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

Write routes require `Authorization: Bearer <BACKOFFICE_TOKEN>`.

### Data layer

The current data layer is JSON-on-disk:

- `data/profile.json`
- `data/projects.json`

The next natural step is SQLite:

- `profiles`
- `projects`
- `project_translations`
- `project_metrics`
- `project_tags`

The API contract should stay stable while the storage changes.

## AI Assistant Direction

The assistant should not be a generic chatbot. It should be a portfolio companion that can answer:

- what kind of role Ilja is looking for
- which projects prove a specific skill
- how a case maps to a job description
- which case to emphasize for TPM, PO, fintech, ProdSupport, CI/CD, or AI workflow roles

Suggested future service boundary:

- `assistant-service`: retrieval, prompt assembly, answer generation
- `content-service`: profile/projects/case CRUD
- `search-service`: embeddings or keyword index over cases and Obsidian notes

## Backoffice Direction

The current backoffice edits projects. Next useful entities:

- case studies
- testimonials
- CV bullets
- role-positioning variants
- project evidence links
- generated cover-letter snippets
