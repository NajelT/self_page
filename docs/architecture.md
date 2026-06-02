# Architecture Notes

## Goal

This is deliberately more complex than a normal portfolio page, but still small enough to understand end to end. The current version is a real vertical slice:

- browser UI
- Java HTTP API
- PostgreSQL database
- Flyway migrations
- backoffice CRUD for project cases

## Boundaries

### Public App

The public app fetches profile and project data from API routes instead of hardcoding content into HTML. The current frontend is static HTML/CSS/JS served by Spring Boot from `backend/src/main/resources/static`.

### Content API

The API lives in the Java backend. It exposes:

- `GET /api/profile`
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/{id}`
- `DELETE /api/projects/{id}`

Write routes require `Authorization: Bearer <BACKOFFICE_TOKEN>`.

### Data Layer

The database is PostgreSQL. Schema is managed by Flyway:

- `profiles`
- `profile_roles`
- `profile_skills`
- `profile_timeline_items`
- `projects`
- `project_translations`
- `project_tags`
- `project_metrics`
- `project_case_study_items`

The project model is normalized enough to keep translations, metrics, tags, and case-study items queryable later.

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
