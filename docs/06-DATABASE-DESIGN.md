# AI Income Hub — Database Design

## 1. Overview

AI Income Hub will use PostgreSQL as its primary relational database.

Prisma ORM will manage database models, queries, and migrations.

The database will store user accounts and the records associated with each account.

**Current status:** The frontend prototype uses browser localStorage. PostgreSQL is planned for the full-stack version.

## 2. Database Objectives

The database should:

- Store user information securely.
- Organize applications and opportunities.
- Manage freelance clients.
- Track actual income received.
- Store digital product information.
- Record automation workflow information.
- Support future reporting and analytics.

## 3. Main Database Entities

The initial database will contain the following entities:

| Entity             | Purpose                               |
| ------------------ | ------------------------------------- |
| User               | Stores account information            |
| Application        | Tracks job and freelance applications |
| Client             | Stores freelance client records       |
| Income             | Records received income               |
| Opportunity        | Stores discovered opportunities       |
| Product            | Manages digital products              |
| AutomationWorkflow | Stores workflow information           |

## 4. Database Relationships

A user can have multiple applications, clients, income records, and products.

```text
USER
 |
 +---- APPLICATIONS
 |
 +---- CLIENTS
 |
 +---- INCOME RECORDS
 |
 +---- PRODUCTS
 |
 +---- AUTOMATION WORKFLOWS
 |
 +---- SAVED OPPORTUNITIES
```

Every private record must belong to its owner.

## 5. Proposed Table Structures

### 5.1 User

| Field        | Type      | Description           |
| ------------ | --------- | --------------------- |
| id           | UUID      | Primary key           |
| name         | VARCHAR   | User's name           |
| email        | VARCHAR   | Unique email          |
| passwordHash | VARCHAR   | Hashed password       |
| createdAt    | TIMESTAMP | Account creation date |
| updatedAt    | TIMESTAMP | Last update           |

Passwords must never be stored as plain text.

### 5.2 Application

| Field     | Type      | Description            |
| --------- | --------- | ---------------------- |
| id        | UUID      | Primary key            |
| userId    | UUID      | Owner                  |
| company   | VARCHAR   | Company or client      |
| position  | VARCHAR   | Job or project title   |
| platform  | VARCHAR   | Source platform        |
| status    | VARCHAR   | Application status     |
| appliedAt | TIMESTAMP | Application date       |
| notes     | TEXT      | Additional information |
| createdAt | TIMESTAMP | Record creation        |

Supported statuses:

- SAVED
- APPLIED
- ASSESSMENT
- INTERVIEW
- ACCEPTED
- REJECTED

### 5.3 Client

| Field     | Type      | Description           |
| --------- | --------- | --------------------- |
| id        | UUID      | Primary key           |
| userId    | UUID      | Owner                 |
| name      | VARCHAR   | Client name           |
| service   | VARCHAR   | Service provided      |
| contact   | VARCHAR   | Contact information   |
| notes     | TEXT      | Project notes         |
| status    | VARCHAR   | Client/project status |
| createdAt | TIMESTAMP | Record creation       |

### 5.4 Income

| Field       | Type      | Description        |
| ----------- | --------- | ------------------ |
| id          | UUID      | Primary key        |
| userId      | UUID      | Owner              |
| source      | VARCHAR   | Income source      |
| amount      | DECIMAL   | Amount received    |
| currency    | VARCHAR   | Currency code      |
| description | TEXT      | Income description |
| receivedAt  | TIMESTAMP | Date received      |
| createdAt   | TIMESTAMP | Record creation    |

Amounts should use a decimal database type rather than floating-point storage.

### 5.5 Opportunity

| Field       | Type      | Description               |
| ----------- | --------- | ------------------------- |
| id          | UUID      | Primary key               |
| title       | VARCHAR   | Opportunity title         |
| company     | VARCHAR   | Organization              |
| category    | VARCHAR   | Opportunity category      |
| location    | VARCHAR   | Location or remote        |
| sourceUrl   | TEXT      | External opportunity link |
| description | TEXT      | Opportunity description   |
| createdAt   | TIMESTAMP | Record creation           |

### 5.6 Product

| Field       | Type      | Description         |
| ----------- | --------- | ------------------- |
| id          | UUID      | Primary key         |
| userId      | UUID      | Owner               |
| name        | VARCHAR   | Product name        |
| description | TEXT      | Product description |
| status      | VARCHAR   | Development status  |
| productUrl  | TEXT      | Product link        |
| createdAt   | TIMESTAMP | Record creation     |

### 5.7 AutomationWorkflow

| Field       | Type      | Description          |
| ----------- | --------- | -------------------- |
| id          | UUID      | Primary key          |
| userId      | UUID      | Owner                |
| name        | VARCHAR   | Workflow name        |
| platform    | VARCHAR   | Automation platform  |
| status      | VARCHAR   | Workflow status      |
| description | TEXT      | Workflow description |
| createdAt   | TIMESTAMP | Record creation      |

## 6. Data Integrity and Security

The production database must implement:

- Primary keys.
- Foreign key relationships.
- Unique email constraints.
- Required field validation.
- Appropriate indexes.
- User ownership checks.
- Secure database credentials.

Users must never be able to access another user's private records.

## 7. Recommended Indexes

Initial indexes should include:

- User email.
- Application userId.
- Application status.
- Client userId.
- Income userId and receivedAt.
- Product userId.
- AutomationWorkflow userId.

These indexes will support common queries as the application grows.

## 8. Database Migration Strategy

Prisma migrations will manage database schema changes.

Development process:

1. Define or update Prisma models.
2. Generate a migration.
3. Apply the migration to the development database.
4. Test the affected application features.
5. Apply reviewed migrations during deployment.

## 9. Future Improvements

Possible future database functionality:

- Invoice management.
- Project management.
- Expense tracking.
- Subscription management.
- Income analytics.
- AI recommendation history.
- Workflow execution history.

These features should only be introduced when required.
