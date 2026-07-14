# AQIP Backend

AQIP Backend is a NestJS service for the AQIP platform. The repository currently contains the backend platform foundation: centralized configuration, validation, exception handling, structured logging, Swagger documentation, health readiness, Prisma/PostgreSQL persistence, a production Docker image, and local Docker Compose support.

## Prerequisites

- Node.js 22 LTS or compatible runtime
- npm
- Docker Desktop or Docker Engine
- Docker Compose (`docker compose` or `docker-compose`)
- PostgreSQL, when running without Docker Compose

## Local Development

Install dependencies:

```cmd
npm install
```

Create a local environment file:

```cmd
copy .env.example .env
```

Run verification checks:

```cmd
npm run lint
npm run build
```

Start the application locally:

```cmd
npm run start:dev
```

## Docker Compose

Start the local backend and PostgreSQL services:

```cmd
docker compose up --build
```

If Compose is installed as the standalone command:

```cmd
docker-compose up --build
```

Run in the background:

```cmd
docker compose up --build -d
```

Stop the services:

```cmd
docker compose down
```

Remove the local PostgreSQL volume for a clean database:

```cmd
docker compose down -v
```

## Local Endpoints

- Health: `http://localhost:3000/api/v1/health`
- Swagger: `http://localhost:3000/api/docs`
- PostgreSQL host port: `localhost:5433`

## Repository Structure

```text
src/
├── common/              Platform concerns shared across modules
│   ├── docs/            Swagger setup
│   ├── filters/         Global exception filter
│   └── pipes/           Global validation pipe
├── config/              Centralized app configuration and validation
├── modules/             Feature modules
│   └── health/          Health readiness endpoint and checks
├── persistence/         Persistence infrastructure
│   └── prisma/          Prisma module and service
├── app.module.ts        Root module composition
└── main.ts              Application bootstrap

prisma/
└── schema.prisma        Prisma datasource and client generator

docs/
└── adr/                 Architecture Decision Records
```

## Documentation

- [Architecture](./ARCHITECTURE.md)
- [ADR-001 Modular Monolith](./docs/adr/ADR-001-modular-monolith.md)
- [ADR-002 Centralized Configuration](./docs/adr/ADR-002-centralized-configuration.md)
- [ADR-003 Structured Logging](./docs/adr/ADR-003-structured-logging.md)
