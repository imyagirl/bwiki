# GEMINI

## Goal


Create a new wiki system using Express.js and CouchDB.

## Features

### 1. Multi-Space Architecture
- **Logical Separation**: Separate content into distinct "Spaces" (e.g., Engineering, HR, Marketing).
- **Space-Level Settings**: Each space can have its own theme, default permissions, and administrators.
- **Cross-Space Search**: Ability to search across all accessible spaces or within a specific one.

### 2. Role-Based Access Control (RBAC)
- **Granular Permissions**: Define roles (Viewer, Editor, Admin) at both the System level and Space level.
- **Group Management**: Create user groups (e.g., "Developers") and assign permissions to groups rather than individuals.
- **Page-Level Security**: Option to restrict specific pages to certain roles or users.

### 3. Enterprise Authentication & Security
- **SSO Integration**: Support for LDAP, SAML, or OAuth2 (Google, GitHub, etc.).
- **Audit Logs**: Track critical actions (login, page deletion, permission changes) for compliance.
- **Session Management**: Secure session handling with timeouts and force logout capabilities.

### 4. Content Management
- **Rich Text Editor**: Markdown support with live preview or WYSIWYG editor.
- **Version History**: Track changes, view diffs, and restore previous versions of pages.
- **File Attachments**: Drag-and-drop support for images and documents.
- **Page Hierarchy**: Tree-structured navigation for organizing pages.

### 5. Search & Discovery
- **Full-Text Search**: Powerful search engine (using CouchDB-Lucene or similar) to index page content.
- **Tags & Metadata**: Tag pages for better organization and filtering.
- **Recent Activity**: Dashboard showing recently updated or viewed pages.

### 6. Collaboration Features
- **Comments**: Threaded comments on pages for discussions.
- **Mentions**: @mention users to notify them.
- **Notifications**: In-app and email notifications for updates and mentions.

### 7. System Administration
- **User Management**: Create, deactivate, and manage user accounts.
- **Space Management**: Create, archive, or delete spaces.
- **System Configuration**: Global settings for site name, logo, and integration keys.

## Development Environment
- **Database (CouchDB)**: `127.0.0.1:5984`
- **Web Client Assets**: `/` (index.html, css, js)
- **API Endpoint**: `/api`
- **Testing URL**: `http://127.0.0.1:5111`
- **Production URL**: `https://bwiki.sys5.co`
