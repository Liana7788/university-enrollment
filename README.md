# University Group Enrollment API (Node.js + Express + Prisma)

API for managing **Subjects**, **Groups**, **Students**, and **Enrollments** with:
- Group capacity validation
- Excel export for subject enrollments

## Tech Stack
- Node.js, Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger (OpenAPI)

---

## Setup Instructions

### Clone & install
```bash
git clone <REPO_URL>
cd <PROJECT_FOLDER>
npm install

## ER Model (Database Diagram)
- Diagram file: `docs/database-diagram.png`
- Source (DBML): `docs/database-diagram.dbml`

# Create and apply migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Development
npm run dev

## Swagger Documentation

- Swagger UI: http://localhost:5000/api-docs
- OpenAPI JSON: http://localhost:5000/api-docs-json