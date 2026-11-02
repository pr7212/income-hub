# AI Income Hub — Features and Functional Requirements

## 1. Overview

This document describes the main features of AI Income Hub, what each module does, and how users interact with the application.

The application will be developed in stages. Features are classified as:

- **Current:** Included in the initial frontend prototype.
- **Planned:** Intended for future development.

## 2. Dashboard Overview

**Status: Current**

The dashboard provides a summary of the user's income activities.

### Main components

- Monthly income summary.
- Monthly income target.
- Remaining amount to reach the target.
- Active applications count.
- Monthly income progress.
- Recent income activity.
- Recommended opportunities.

### Expected result

The user can quickly understand their current progress without navigating through multiple pages.

## 3. Opportunities Module

**Status: Current — curated directory**

This module organizes platforms where users can find potential income opportunities.

### Opportunity categories

- Remote jobs.
- Freelancing.
- AI training and data evaluation.
- Digital products and SaaS opportunities.

### Core functionality

- Display opportunity platforms.
- Organize opportunities by category.
- Provide external platform links.
- Help users identify relevant opportunities.

### Future functionality

- Live job feeds.
- Search and filtering.
- Opportunity matching.
- Saved opportunities.
- Deadline tracking.

External platform links do not guarantee that opportunities are currently available or that a user is eligible.

## 4. Applications Module

**Status: Current**

This module tracks job and freelance applications.

### Application information

- Company or client name.
- Position or project title.
- Application platform.
- Application date.
- Application status.
- Notes.

### Application statuses

| Status     | Meaning                     |
| ---------- | --------------------------- |
| Saved      | Opportunity saved for later |
| Applied    | Application submitted       |
| Assessment | Completing an assessment    |
| Interview  | Interview stage             |
| Accepted   | Opportunity accepted        |
| Rejected   | Application unsuccessful    |

### User actions

- Add an application.
- Update application status.
- Delete an application.
- Review application progress.

## 5. Clients Module

**Status: Current**

This module helps organize freelance clients.

### Client information

- Client name.
- Service provided.
- Contact information.
- Project notes.
- Project status.

### User actions

- Add a client.
- View client records.
- Organize client relationships.

### Future functionality

- Client communication history.
- Project deadlines.
- Invoices.
- Payment tracking.
- Project management.

## 6. Income Module

**Status: Current**

This module records actual income received.

### Income information

- Income source.
- Amount.
- Currency.
- Date received.
- Description.

### User actions

- Record income.
- View income history.
- Delete incorrect records.
- Monitor monthly income.

### Dashboard calculations

The application calculates:

- Total income recorded for the current month.
- Monthly target.
- Remaining target amount.
- Percentage of the target achieved.

Initial monthly target: KSh 50,000.

Income should only be recorded when it has actually been received.

## 7. Products Module

**Status: Planned**

This module will organize digital products and software projects.

Potential functionality:

- Add a product.
- Record product descriptions.
- Track development status.
- Record product links.
- Track sales and revenue.

## 8. Automation Module

**Status: Planned**

This module will eventually organize automated workflows.

Potential functionality:

- Track automation workflows.
- Monitor workflow status.
- Record execution results.
- Integrate with n8n.
- Connect approved external services.

## 9. Settings Module

**Status: Planned**

This module will manage application preferences.

Potential functionality:

- User profile.
- Monthly income target.
- Currency preferences.
- Notification settings.
- Account security.
- Data management.

## 10. Data Persistence

**Current implementation:** Browser localStorage.

The initial prototype stores information locally in the browser.

**Future implementation:** A server-backed database.

The future system should support secure authentication, persistent records, backups, and synchronization across devices.

## 11. Feature Development Priorities

| Priority | Feature                | Stage   |
| -------- | ---------------------- | ------- |
| 1        | Dashboard              | Current |
| 2        | Opportunities          | Current |
| 3        | Applications           | Current |
| 4        | Clients                | Current |
| 5        | Income tracking        | Current |
| 6        | Authentication         | Planned |
| 7        | Database integration   | Planned |
| 8        | Live opportunity feeds | Planned |
| 9        | AI recommendations     | Planned |
| 10       | Workflow automation    | Planned |

## 12. Definition of a Successful First Version

The first version is successful when a user can:

1. Open the application.
2. Navigate between dashboard modules.
3. Add and manage applications.
4. Add and manage clients.
5. Record income.
6. See their income progress.
7. Refresh the browser without losing locally stored records.

All core interactions should work without runtime errors.
