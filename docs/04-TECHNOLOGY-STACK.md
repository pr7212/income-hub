# AI Income Hub — Technology Stack

## 1. Overview

AI Income Hub uses a modern JavaScript and TypeScript technology stack.

The architecture is designed to support a responsive frontend today and a scalable backend as the application grows.

The project will be developed incrementally. Technologies will only be introduced when they solve a real requirement.

## 2. Current Technology Stack

These are the technologies used in the initial application.

### Frontend

| Technology | Purpose |
|---|---|
| React | Building reusable user interface components |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and UI design |
| Vite | Development server and production build |
| Lucide React | Interface icons |

### Browser Storage

| Technology | Purpose |
|---|---|
| localStorage | Saving application records in the browser |

The current prototype does not yet have a backend database or user authentication.

## 3. Planned Backend Stack

### Node.js

Node.js will provide the JavaScript runtime for the backend.

Documentation: https://nodejs.org/en/learn

### Express.js

Express will be used to create REST API endpoints.

Documentation: https://expressjs.com/

### PostgreSQL

PostgreSQL will be the primary relational database for storing user accounts, applications, clients, income records, and other persistent information.

Documentation: https://www.postgresql.org/docs/

### Prisma ORM

Prisma will manage database models, queries, migrations, and relationships.

Documentation: https://www.prisma.io/docs

## 4. Future Integrations

### AI Integration

AI services may be introduced for:

- Opportunity analysis.
- Job description analysis.
- Skill matching.
- Application preparation assistance.
- Productivity recommendations.

AI API keys must be stored securely on the backend and never exposed in frontend code.

### n8n Automation

n8n may be used to automate external workflows, including:

- Job opportunity monitoring.
- Email notifications.
- Workflow execution.
- Data collection from approved sources.

Documentation: https://docs.n8n.io/

### Redis

Redis may be introduced when the application requires:

- Caching.
- Background job queues.
- Rate limiting.
- Temporary data storage.

It is not required for the initial version.

Documentation: https://redis.io/docs/

## 5. Deployment Strategy

### Frontend

Vercel is the planned frontend hosting platform.

Documentation: https://vercel.com/docs

### Backend

A suitable Node.js hosting provider will be selected when the backend is introduced.

### Database

A managed PostgreSQL provider will be selected during backend development.

## 6. Development Tools

| Tool | Purpose |
|---|---|
| Visual Studio Code | Code editor |
| Git | Version control |
| GitHub | Source code hosting |
| npm | Package management |
| Browser Developer Tools | Debugging and testing |

## 7. Architecture Evolution

### Phase 1 — Frontend prototype

React + TypeScript + Tailwind CSS + Vite + localStorage.

### Phase 2 — Full-stack application

React frontend + Node.js + Express REST API + PostgreSQL + Prisma.

### Phase 3 — Intelligent platform

Introduce selected AI integrations, external opportunity sources, and n8n automation.

### Phase 4 — Production improvements

Introduce authentication, authorization, validation, monitoring, security controls, backups, and performance improvements.

## 8. Technology Selection Principles

1. Prefer stable and well-documented technologies.
2. Avoid unnecessary dependencies.
3. Keep frontend and backend responsibilities separate.
4. Protect sensitive data and API credentials.
5. Design for maintainability.
6. Introduce infrastructure only when required.

## 9. Official Documentation

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- Vite: https://vite.dev/guide/
- Node.js: https://nodejs.org/en/learn
- Express: https://expressjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- Prisma: https://www.prisma.io/docs
- Redis: https://redis.io/docs/
- Lucide React: https://lucide.dev/guide/packages/lucide-react
- n8n: https://docs.n8n.io/
- Vercel: https://vercel.com/docs
