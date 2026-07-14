# AQIP Backend

NestJS backend for AQIP.

## Local Development

Install dependencies for local Node.js development:

```cmd
npm install
```

Create a local `.env` from the example and adjust values if needed:

```cmd
copy .env.example .env
```

Run the application locally:

```cmd
npm run start:dev
```

## Docker Compose

Start the local backend and PostgreSQL services:

```cmd
docker compose up --build
```

If Docker Compose is installed as the standalone command on your machine, use:

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

Remove the local PostgreSQL volume when a clean database is needed:

```cmd
docker compose down -v
```

## Local Endpoints

- API health: `http://localhost:3000/api/v1/health`
- Swagger docs: `http://localhost:3000/api/docs`
- PostgreSQL host port: `localhost:5433`

## Verification

```cmd
npm run lint
npm run build
```
