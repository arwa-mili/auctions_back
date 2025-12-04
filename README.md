# Auctions - NestJS Microservices (converted from .NET)

This package contains the NestJS conversion and per-microservice bootstraps. Use Docker Compose to run separate containers for each service.

Quick start:

1. Copy .env.example to .env and adjust values if needed.
2. docker-compose up --build
3. Services:
   - Gateway (HTTP): http://localhost:3000
   - Auction service: http://localhost:3001
   - Bidding service: http://localhost:3002
   - Identity service: http://localhost:3003
   - Search service: http://localhost:3004
4. Optionally run `npm run seed` (after npm install) to populate example data.

Notes:
- All services use a single Postgres and RabbitMQ. Search uses MongoDB.
- TypeORM is set to synchronize: true for development. Use migrations for production.
