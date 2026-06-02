# Ilja Self Page

Personal portfolio platform for Ilja Lushpajev, built as a real Java backend instead of a static business-card site.

## Stack

- Java 21
- Spring Boot 3
- PostgreSQL
- Flyway migrations
- Spring JDBC
- Static frontend served by the Java app

## Run Locally

Run the whole app with Docker:

```bash
docker compose up --build
```

Open:

- Public site: `http://localhost:4173`
- Backoffice: `http://localhost:4173/backoffice.html`

Default local backoffice token:

```text
local-dev-token
```

For local Java development without Docker, start only PostgreSQL:

```bash
docker compose up -d postgres
```

Then run the backend:

```bash
cd backend
mvn spring-boot:run
```

Override local config when needed:

```bash
BACKOFFICE_TOKEN=change-me \
DATABASE_URL=jdbc:postgresql://localhost:5432/ilja_portfolio \
DATABASE_USERNAME=portfolio \
DATABASE_PASSWORD=portfolio \
mvn spring-boot:run
```

## Current Shape

- `backend/src/main/java` contains the Java API.
- `backend/src/main/resources/db/migration` contains PostgreSQL schema and seed data.
- `backend/src/main/resources/static` contains the public site and backoffice UI.
- `docker-compose.yml` runs local PostgreSQL.

The public app still talks to `/api/profile` and `/api/projects`; the difference is that those routes now read/write a real database.

## API

- `GET /api/profile`
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/{id}`
- `DELETE /api/projects/{id}`

Write routes require:

```http
Authorization: Bearer local-dev-token
```

## Next Architecture Moves

1. Add real login/session auth for the backoffice.
2. Add project detail pages and richer case-study editing.
3. Add an AI assistant service that answers from profile, projects, and future Obsidian exports.
4. Add search over cases, skills, and evidence.
5. Split into frontend and backend services when the app becomes large enough to justify it.
