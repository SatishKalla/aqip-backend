# ADR-002: Centralized Configuration

## Status

Accepted

## Context

The backend depends on environment-specific values such as port, log level, Swagger enablement, and database connection URL. Reading environment variables throughout the codebase would make validation inconsistent and increase coupling to process-level APIs.

The application should fail fast when required configuration is missing or invalid.

## Decision

Use NestJS `ConfigModule` with a centralized configuration package under `src/config`.

Configuration is loaded once, validated during startup, and exposed as typed application configuration. Direct `process.env` access is limited to the configuration layer.

## Consequences

- Required configuration is validated before the application starts.
- Runtime configuration follows Twelve-Factor App principles.
- Application modules can depend on typed configuration rather than raw environment variables.
- New configuration values must be added to the centralized config and validation files.

## Alternatives Considered

- **Read `process.env` directly where needed**: rejected because validation and typing would be scattered.
- **Hardcoded defaults for required values**: rejected for values that must be explicit in each environment.
- **External configuration service**: not needed for the current repository foundation.
