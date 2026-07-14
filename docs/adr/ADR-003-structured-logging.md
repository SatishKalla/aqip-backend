# ADR-003: Structured Logging

## Status

Accepted

## Context

The backend needs production-suitable logs that can be consumed by container runtimes and future log aggregation tools. Plain text logs are harder to query and correlate.

The application already has centralized configuration, so log level should be environment-controlled.

## Decision

Use `nestjs-pino` and `pino` for structured JSON logging.

The logger is configured globally in `AppModule` and replaces the default NestJS logger during bootstrap. HTTP request logging is enabled through Pino middleware, and log level is read from centralized configuration.

## Consequences

- Application and HTTP request logs are emitted as structured JSON.
- Log level is controlled by `LOG_LEVEL`.
- The logger is configured once as a platform concern.
- The current setup is ready for future correlation ID support without changing business modules.

## Alternatives Considered

- **Default NestJS logger**: rejected because it does not provide the structured JSON logging foundation needed for production containers.
- **Manual `console.log` usage**: rejected because it would scatter logging behavior and bypass global configuration.
- **External logging stack integration now**: rejected because metrics, tracing, and aggregation are outside the current implementation scope.
