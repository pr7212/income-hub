# AI Income Hub — API Documentation

## 1. Overview

The AI Income Hub backend will expose a REST API built with Node.js and Express.

The API will allow the React frontend to communicate with the database through controlled HTTP requests.

**Current status:** These endpoints are planned. The frontend prototype currently uses localStorage and does not yet communicate with a backend API.

## 2. Base URL

Development:

```text
http://localhost:5000/api
```

Production:

```text
https://your-backend-domain.com/api
```

The production domain will be configured when backend hosting is selected.

## 3. API Standards

The API will follow these standards:

- REST architectural conventions.
- JSON request and response bodies.
- HTTPS in production.
- Consistent HTTP status codes.
- Server-side validation.
- Authentication for protected resources.
- Centralized error handling.

## 4. Authentication Endpoints

### Register

```http
POST /api/auth/register
```

Purpose: Create a new user account.

Example request:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "example-password"
}
```

### Login

```http
POST /api/auth/login
```

Purpose: Authenticate a user.

### Logout

```http
POST /api/auth/logout
```

Purpose: End the authenticated session.

### Current User

```http
GET /api/auth/me
```

Purpose: Retrieve the authenticated user's profile.

## 5. Applications Endpoints

| Method | Endpoint              | Purpose                  |
| ------ | --------------------- | ------------------------ |
| GET    | /api/applications     | List applications        |
| POST   | /api/applications     | Create application       |
| GET    | /api/applications/:id | Retrieve one application |
| PATCH  | /api/applications/:id | Update application       |
| DELETE | /api/applications/:id | Delete application       |

Example creation request:

```json
{
  "company": "Example Company",
  "position": "Junior Frontend Developer",
  "platform": "Company Website",
  "status": "APPLIED",
  "notes": "Application submitted"
}
```

## 6. Clients Endpoints

| Method | Endpoint         | Purpose         |
| ------ | ---------------- | --------------- |
| GET    | /api/clients     | List clients    |
| POST   | /api/clients     | Create client   |
| GET    | /api/clients/:id | Retrieve client |
| PATCH  | /api/clients/:id | Update client   |
| DELETE | /api/clients/:id | Delete client   |

## 7. Income Endpoints

| Method | Endpoint        | Purpose                |
| ------ | --------------- | ---------------------- |
| GET    | /api/income     | List income records    |
| POST   | /api/income     | Create income record   |
| GET    | /api/income/:id | Retrieve income record |
| PATCH  | /api/income/:id | Update income record   |
| DELETE | /api/income/:id | Delete income record   |

Example creation request:

```json
{
  "source": "Website Development",
  "amount": 15000,
  "currency": "KES",
  "description": "Website project payment",
  "receivedAt": "2026-11-02T10:00:00.000Z"
}
```

## 8. Opportunities Endpoints

| Method | Endpoint                     | Purpose                  |
| ------ | ---------------------------- | ------------------------ |
| GET    | /api/opportunities           | List opportunities       |
| GET    | /api/opportunities/:id       | Retrieve opportunity     |
| POST   | /api/opportunities/saved     | Save opportunity         |
| GET    | /api/opportunities/saved     | List saved opportunities |
| DELETE | /api/opportunities/saved/:id | Remove saved opportunity |

Opportunity discovery integrations will be introduced separately.

## 9. Products Endpoints

| Method | Endpoint          | Purpose        |
| ------ | ----------------- | -------------- |
| GET    | /api/products     | List products  |
| POST   | /api/products     | Create product |
| PATCH  | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

## 10. Automation Endpoints

| Method | Endpoint             | Purpose                |
| ------ | -------------------- | ---------------------- |
| GET    | /api/automations     | List workflows         |
| POST   | /api/automations     | Create workflow record |
| PATCH  | /api/automations/:id | Update workflow        |
| DELETE | /api/automations/:id | Delete workflow record |

These endpoints will initially manage workflow information. Actual workflow execution will require a separate integration.

## 11. Dashboard Endpoint

```http
GET /api/dashboard/summary
```

Purpose: Retrieve dashboard statistics for the authenticated user.

Example response:

```json
{
  "monthlyIncome": 15000,
  "monthlyTarget": 50000,
  "remainingTarget": 35000,
  "activeApplications": 4,
  "totalClients": 2
}
```

All values must be calculated using the authenticated user's records.

## 12. HTTP Status Codes

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 200  | Request successful                   |
| 201  | Resource created                     |
| 204  | Request successful, no response body |
| 400  | Invalid request                      |
| 401  | Authentication required              |
| 403  | Access denied                        |
| 404  | Resource not found                   |
| 409  | Resource conflict                    |
| 422  | Validation failed                    |
| 500  | Internal server error                |

## 13. Standard Error Response

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be greater than zero"
    }
  ]
}
```

Do not expose database credentials, stack traces, or private implementation details in production error responses.

## 14. Security Requirements

- Validate all incoming requests.
- Authenticate protected requests.
- Verify record ownership.
- Use secure session management.
- Apply rate limits where appropriate.
- Store secrets in environment variables.
- Never expose private API keys in frontend code.

## 15. API Development Plan

1. Initialize the Express server.
2. Add environment configuration.
3. Add request validation and error handling.
4. Connect PostgreSQL through Prisma.
5. Implement authentication.
6. Build application endpoints.
7. Build client endpoints.
8. Build income endpoints.
9. Connect the React frontend.
10. Test all endpoints before deployment.
