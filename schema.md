# GEMINI Database Schema

This document details the JSON document structures for the CouchDB databases used in the GEMINI wiki system.

## Databases Overview

*   `gemini_users`: User accounts, groups, and global permissions.
*   `gemini_meta`: Space metadata and system configurations.
*   `gemini_content`: Wiki pages, comments, and content hierarchy.
*   `gemini_audit`: Immutable audit logs.

---

## 1. Users Database (`gemini_users`)

Stores authentication and authorization data.

### User Document
**ID Format:** `org.couchdb.user:<username>` (Standard CouchDB user format for `_users` db if using native auth, or custom if using external auth mapping).
**Type:** `user`

```json
{
  "_id": "org.couchdb.user:jdoe",
  "type": "user",
  "name": "jdoe",
  "email": "jdoe@example.com",
  "fullName": "John Doe",
  "password_scheme": "pbkdf2", 
  "iterations": 10,
  "derived_key": "...",
  "salt": "...",
  "roles": ["editor", "marketing-group"], 
  "global_role": "admin", 
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "in_app": true
    }
  },
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:00:00Z",
  "active": true
}
```

### Group Document
**ID Format:** `group:<group_slug>`
**Type:** `group`

```json
{
  "_id": "group:developers",
  "type": "group",
  "name": "Developers",
  "description": "Engineering team members",
  "members": ["jdoe", "asmith"], 
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:00:00Z"
}
```

---

## 2. Metadata Database (`gemini_meta`)

Stores structural and configuration data.

### Space Document
**ID Format:** `space:<space_slug>`
**Type:** `space`

```json
{
  "_id": "space:engineering",
  "type": "space",
  "slug": "engineering",
  "name": "Engineering",
  "description": "Technical documentation and specs",
  "settings": {
    "theme": "default",
    "allow_public_read": false,
    "default_role": "viewer"
  },
  "admins": ["jdoe"], 
  "permissions": {
    "group:developers": "editor",
    "group:marketing": "viewer"
  },
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:00:00Z"
}
```

### System Configuration Document
**ID Format:** `config:system`
**Type:** `config`

```json
{
  "_id": "config:system",
  "type": "config",
  "site_name": "Gemini Wiki",
  "auth_settings": {
    "provider": "google", 
    "clientId": "...",
    "domain": "example.com"
  },
  "maintenance_mode": false
}
```

---

## 3. Content Database (`gemini_content`)

Stores the actual wiki content.

### Page Document
**ID Format:** `<uuid>` (UUIDs preferred for content to allow easy renaming/moving)
**Type:** `page`

```json
{
  "_id": "c0_df4...",
  "type": "page",
  "space_id": "engineering", 
  "title": "Backend Architecture",
  "slug": "backend-architecture", 
  "parent_id": "c1_ab2...", 
  "content_type": "markdown",
  "content": "# Backend Architecture\n\nThis is the...",
  "html_render": "<h1>Backend Architecture</h1>...", 
  "tags": ["architecture", "backend"],
  "author": "jdoe",
  "last_modified_by": "asmith",
  "version": 12,
  "is_published": true,
  "permissions_override": {
    "group:interns": "none"
  },
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-28T14:30:00Z",
  "_attachments": {
    "diagram.png": {
      "content_type": "image/png",
      "revpos": 2,
      "digest": "md5-...",
      "length": 12345,
      "stub": true
    }
  }
}
```

### Page History Document (Version)
**ID Format:** `history:<page_uuid>:<version>`
**Type:** `page_version`

```json
{
  "_id": "history:c0_df4...:11",
  "type": "page_version",
  "page_id": "c0_df4...",
  "version": 11,
  "title": "Backend Architecture",
  "content": "Old content...",
  "modified_by": "jdoe",
  "modified_at": "2023-10-27T11:00:00Z",
  "change_summary": "Initial draft"
}
```

### Comment Document
**ID Format:** `comment:<uuid>`
**Type:** `comment`

```json
{
  "_id": "comment:f1_23a...",
  "type": "comment",
  "page_id": "c0_df4...",
  "user_id": "asmith",
  "content": "Should we include the database schema here?",
  "parent_comment_id": null, 
  "created_at": "2023-10-28T15:00:00Z",
  "updated_at": "2023-10-28T15:00:00Z"
}
```

---

## 4. Audit Database (`gemini_audit`)

Stores system logs.

### Audit Log Document
**ID Format:** `audit:<uuid>`
**Type:** `audit`

```json
{
  "_id": "audit:a1_b2c...",
  "type": "audit",
  "action": "page.delete",
  "actor": "jdoe",
  "target": {
    "type": "page",
    "id": "c0_df4...",
    "title": "Deprecated API"
  },
  "details": {
    "reason": "No longer needed"
  },
  "ip_address": "192.168.1.50",
  "timestamp": "2023-10-29T09:15:00Z"
}
```
