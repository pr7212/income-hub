# AI Income Hub — System Architecture

## 1. Overview

AI Income Hub follows a modular application architecture.

The system separates the user interface, business logic, data storage, and external integrations.

The architecture will evolve from a frontend-only prototype into a full-stack application.

## 2. High-Level Architecture

### Current Architecture

The first version uses a React frontend with browser-based storage.

```text
USER
 |
 v
REACT FRONTEND
 |
 +---- Dashboard
 |
 +---- Opportunities
 |
 +---- Applications
 |
 +---- Clients
 |
 +---- Income
 |
 v
BROWSER LOCAL STORAGE
```

The current prototype does not require a backend server.

### Planned Production Architecture

```text
USER
 |
 v
REACT FRONTEND
 |
 | HTTPS Requests
 v
NODE.JS + EXPRESS API
 |
 +---- Authentication
 |
 +---- Application Services
 |
 +---- Client Services
 |
 +---- Income Services
 |
 +---- Opportunity Services
 |
 +---- AI Integration Services
 |
 v
POSTGRESQL DATABASE
 |
 v
PRISMA ORM
```

External integrations will communicate with the backend through controlled API connections.

## 3. Frontend Architecture

The frontend is responsible for:

- Displaying the application interface.
- Handling navigation.
- Collecting user input.
- Validating basic form data.
- Displaying records and dashboard statistics.
- Communicating with the backend when introduced.

### Main frontend modules

| Module        | Responsibility                        |
| ------------- | ------------------------------------- |
| Dashboard     | Display income and activity summaries |
| Opportunities | Display available opportunity sources |
| Applications  | Manage applications                   |
| Clients       | Manage freelance clients              |
| Income        | Manage income records                 |
| Products      | Manage digital products               |
| Automation    | Manage workflow information           |
| Settings      | Manage user preferences               |

## 4. Backend Architecture

**Status: Planned**

The backend will use Node.js and Express.

It will be responsible for:

- Authentication and authorization.
- Business logic.
- Input validation.
- Database operations.
- API responses.
- External service integrations.
- Secure AI requests.

The frontend must not directly access private API credentials or database administration credentials.

## 5. Database Architecture

**Status: Planned**

PostgreSQL will store persistent application data.

Initial entities:

- User
- Application
- Client
- Income
- Opportunity
- Product
- AutomationWorkflow

Each user's private records must be associated with their user account.

Database access must enforce ownership and authorization.

## 6. API Communication

The frontend will communicate with the backend using REST APIs over HTTPS.

Example future endpoints:

| Method | Endpoint              | Purpose                 |
| ------ | --------------------- | ----------------------- |
| GET    | /api/applications     | Retrieve applications   |
| POST   | /api/applications     | Create application      |
| PATCH  | /api/applications/:id | Update application      |
| DELETE | /api/applications/:id | Delete application      |
| GET    | /api/clients          | Retrieve clients        |
| POST   | /api/clients          | Create client           |
| GET    | /api/income           | Retrieve income records |
| POST   | /api/income           | Create income record    |

All protected endpoints will require authentication.

## 7. Authentication and Security

**Status: Planned**

The production application will implement:

- Secure user authentication.
- Password hashing.
- Authorization checks.
- Server-side input validation.
- HTTPS communication.
- Secure session or token management.
- Environment-based secret management.
- Protection against unauthorized data access.

Authentication credentials and secrets must never be committed to GitHub.

## 8. External Integrations

Future integrations may include:

### AI services

Used for opportunity analysis, recommendations, and productivity assistance.

### n8n

Used to coordinate approved automated workflows.

### Opportunity platforms

Used to retrieve or link to external job and freelance opportunities where supported and permitted.

External integrations must handle errors, rate limits, and unavailable services.

## 9. Error Handling

The application should provide clear feedback when:

- A request fails.
- A record cannot be saved.
- An external service is unavailable.
- User input is invalid.
- Authentication fails.

The backend should log technical errors without exposing sensitive information to users.

## 10. Deployment Architecture

Planned deployment:

- Frontend: Vercel.
- Backend: Node.js hosting provider.
- Database: Managed PostgreSQL.
- Source control: GitHub.

Environment variables will hold deployment-specific configuration.

## 11. Architecture Development Phases

### Phase 1

Build the frontend and verify all core interactions.

### Phase 2

Create the backend and REST API.

### Phase 3

Connect PostgreSQL through Prisma.

### Phase 4

Implement authentication and authorization.

### Phase 5

Integrate AI and automation services.

### Phase 6

Deploy, test, monitor, and improve the production application.

## 12. Architecture Principles

1. Separation of concerns.
2. Modular and reusable code.
3. Secure data access.
4. Clear API contracts.
5. Maintainable database design.
6. Incremental development.
7. Reliable error handling.
