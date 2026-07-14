# AQIP Backend Architecture

## Overview

AQIP Backend is a modular NestJS application packaged as an independent backend repository. The current implementation establishes the platform foundation and one infrastructure-backed health module. It does not yet contain business modules.

## Guiding Principles

- Architecture over framework
- Production-ready from day one
- Immutable release artifacts
- Separation of CI, release, and deploy
- Vendor-independent architecture
- Modular monolith
- Fail fast
- Twelve-Factor App principles

## Layered Architecture

The codebase is organized around platform concerns, feature modules, and persistence infrastructure.

```text
Bootstrap
  -> AppModule composition
    -> Platform infrastructure
    -> Feature modules
    -> Persistence modules
```

`main.ts` configures application-wide behavior: structured logger, global API prefix, validation pipe, exception filter, Swagger, and shutdown hooks.

`AppModule` composes modules. It does not contain business logic.

## Module Organization

Feature modules live under `src/modules`. The current feature module is:

- `health`: exposes readiness at `/api/v1/health`, delegates evaluation to `HealthService`, and reports application/database status.

Shared platform code lives under `src/common`:

- `docs`: Swagger setup
- `filters`: global HTTP exception filter
- `pipes`: global validation pipe
- `decorators`, `guards`, `interceptors`: reserved platform folders for future cross-cutting concerns

## Configuration Strategy

Configuration is centralized in `src/config`.

- `ConfigModule` loads configuration globally.
- Environment variables are validated during startup.
- Application code should consume typed configuration instead of reading `process.env` directly.
- Required variables currently include `PORT`, `LOG_LEVEL`, `SWAGGER_ENABLED`, and `DATABASE_URL`.

Invalid configuration prevents startup.

## Persistence Architecture

Persistence infrastructure lives under `src/persistence`.

The current implementation uses Prisma with PostgreSQL:

- `prisma/schema.prisma` defines the Prisma generator and PostgreSQL datasource.
- `PrismaModule` exports `PrismaService`.
- `PrismaService` owns Prisma lifecycle with connect/disconnect hooks.
- Health readiness checks database connectivity through `PrismaService`.

Prisma is treated as an implementation detail of the persistence layer. Business repositories have not been introduced because no business modules exist yet.

## API Platform

The API uses a global prefix:

```text
/api/v1
```

Swagger is available when enabled by configuration:

```text
/api/docs
```

Errors are normalized by the global exception filter. DTO validation is configured globally through NestJS `ValidationPipe`.

## Runtime Packaging

The repository includes:

- `Dockerfile`: production multi-stage image
- `docker-compose.yml`: local development backend + PostgreSQL environment

Docker Compose is for local development only. Production deployment documentation is intentionally not included yet.
