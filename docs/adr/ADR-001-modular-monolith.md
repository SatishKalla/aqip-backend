# ADR-001: Modular Monolith

## Status

Accepted

## Context

AQIP Backend is an independent backend repository. The system needs clear module boundaries while avoiding distributed-system complexity before business capabilities require it.

The current application contains platform infrastructure and a health module. No business modules exist yet.

## Decision

Use a modular monolith architecture.

NestJS modules define application boundaries. Feature modules live under `src/modules`, shared platform concerns live under `src/common`, configuration lives under `src/config`, and persistence infrastructure lives under `src/persistence`.

`AppModule` is responsible for module composition only.

## Consequences

- Module boundaries are explicit from the beginning.
- The codebase remains simple to run, test, and package.
- Future business capabilities can be added as modules without introducing network boundaries.
- Cross-cutting concerns can be configured globally without duplicating infrastructure logic in controllers.
- If service extraction is ever needed, module boundaries provide a starting point.

## Alternatives Considered

- **Microservices from the start**: rejected because no current business requirement justifies distributed deployment, messaging, or operational complexity.
- **Flat NestJS application structure**: rejected because it would blur platform, persistence, and feature boundaries early.
- **Repository abstraction now**: rejected because no business entities exist yet; adding repositories now would be premature.
