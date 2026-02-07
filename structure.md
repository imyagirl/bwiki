# GEMINI Project Structure

This document outlines the directory structure and architectural organization for the GEMINI wiki system, based on Express.js and CouchDB.

## 1. Directory Structure

```
gemini/
├── src/                    # Backend source code
│   ├── config/             # Configuration (DB, Auth, Envs)
│   ├── controllers/        # Request handlers (Route logic)
│   ├── middleware/         # Express middleware (Auth, RBAC, Validation)
│   ├── models/             # Data access layer (CouchDB interactions)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic and complex operations
│   ├── utils/              # Shared utilities and helpers
│   ├── app.js              # Express app configuration
│   └── server.js           # Server entry point
├── public/                 # Static assets (Web Client)
│   ├── css/
│   ├── js/
│   ├── images/
│   └── index.html          # Main entry point for the frontend
├── tests/                  # Test suite (Unit and Integration)
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore rules
└── package.json            # Dependencies and scripts
```

## 2. Key Modules & Components

### `src/config/`
- `couchdb.js`: Connection setup for CouchDB.
- `passport.js`: Strategies for SSO (LDAP, SAML, OAuth2).
- `logging.js`: Configuration for system and audit logs.

### `src/controllers/`
- `auth.controller.js`: Login, logout, session management.
- `space.controller.js`: Space creation, settings, and deletion.
- `page.controller.js`: Page CRUD, version history, attachments.
- `user.controller.js`: User and group management.
- `search.controller.js`: Handling full-text search queries.

### `src/middleware/`
- `auth.middleware.js`: Verifies authentication (sessions/tokens).
- `rbac.middleware.js`: Enforces Role-Based Access Control (System/Space/Page levels).
- `audit.middleware.js`: Intercepts and logs critical actions.
- `upload.middleware.js`: Handles file uploads (e.g., using multer).

### `src/models/`
- `User.js`: User profiles and preferences.
- `Space.js`: Space metadata and settings.
- `Page.js`: Wiki page content, history traversal.
- `Group.js`: User groups and permission mappings.

### `src/routes/`
- `index.js`: Main API router aggregation.
- `auth.routes.js`: Authentication endpoints.
- `spaces.routes.js`: Space-related endpoints.
- `pages.routes.js`: Page-related endpoints.
- `users.routes.js`: User and group administration endpoints.

### `src/services/`
- `couchdb.service.js`: Low-level CouchDB wrapper/client.
- `search.service.js`: Interface for search engine (e.g., CouchDB-Lucene).
- `history.service.js`: Managing page versioning and diffs.
- `notification.service.js`: handling email and in-app notifications.

## 3. Database Organization (CouchDB)

Proposed database separation for scalability and logical isolation:

- `gemini_users`: Stores user accounts, groups, and global roles.
- `gemini_meta`: Stores space metadata, configurations, and system settings.
- `gemini_content`: Stores all wiki pages, comments, and attachments.
  - *Strategy*: Documents can be partitioned by `space_id` for performance.
- `gemini_audit`: Stores immutable audit logs.

## 4. API Design

Base URL: `/api`

### Authentication
- `POST /api/auth/login`: Authenticate user.
- `POST /api/auth/logout`: End session.

### Spaces
- `GET /api/spaces`: List accessible spaces.
- `POST /api/spaces`: Create a new space.
- `GET /api/spaces/:id`: Get space details.

### Pages
- `GET /api/spaces/:space_id/pages`: List pages in a space (hierarchy).
- `POST /api/spaces/:space_id/pages`: Create a new page.
- `GET /api/pages/:id`: Get page content.
- `PUT /api/pages/:id`: Update page content.

### Search
- `GET /api/search?q={query}&space={space_id}`: Full-text search.
