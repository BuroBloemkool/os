# Buro Bloemkool OS — System Architecture

## 1) Product Architecture Principles

- **Client-first experience**: each workspace is curated and easy to navigate.
- **Structured collaboration**: no unstructured chat chaos; feedback is attached to entities.
- **Modular core**: each domain (tasks, content, brand, files) isolated in modules.
- **Multi-tenant SaaS**: all data scoped by `workspace_id` (client workspace).
- **Future-ready**: event-driven hooks for invoicing, CRM, analytics, automation.

---

## 2) High-Level Architecture

```text
[ Next.js Frontend ]
       |
       v
[ API Gateway / BFF Layer ]
       |
       +--> Auth & RBAC Module
       +--> Workspace / Client Portal Module
       +--> Task & Workflow Module
       +--> Content Planner Module
       +--> Brand Portal Module
       +--> File Module (NAS adapter)
       +--> Template Module
       +--> Activity Feed Module
       |
       v
[ PostgreSQL ]   [ NAS Storage ]
       |
       v
[ Event Bus (future): automation, notifications, analytics ]
```

---

## 3) Deployment Topology

### MVP (single-region)
- `web` service (Next.js)
- `api` service (Node/NestJS)
- `db` (PostgreSQL)
- `worker` (async jobs: media processing, notifications)
- NAS accessible via:
  - mounted volume path, or
  - SMB/SFTP/WebDAV adapter layer

### Scale-up
- Horizontal API scaling behind load balancer
- Read replicas for PostgreSQL
- Object-cache for metadata (Redis)
- Background queue (BullMQ/SQS equivalent)
- CDN for transformed previews (if allowed while source files remain NAS-hosted)

---

## 4) Domain Modules

### A. Identity & Access
- Users, roles (`admin`, `freelancer`, `client`)
- Workspace membership
- Policy checks per route + entity visibility filters

### B. Client Portal
- Workspace home
- “What’s happening now” snapshots
- updates feed
- quick actions & contact surface
- deliverables + feedback entry points

### C. Task & Workflow
- Projects with phases: `todo`, `in_progress`, `done`
- Task visibility toggle for clients
- Assign to internal/freelancer members
- Comments and file attachments

### D. Content Planner
- Calendar (week/month)
- Post cards with status lifecycle:
  `draft -> feedback -> approved -> scheduled`
- Field-level edit restrictions by role/status
- Per-post feedback + approval actions by client

### E. Brand Portal
- Brand sections: logos, colors, typography, voice, imagery
- Curated presentation blocks (brand book style)
- Downloadable assets
- Access only for active clients

### F. File Management
- File metadata in DB
- Binary in NAS
- Folder model per client:
  - Deliverables
  - Assets
  - Content
  - Internal
- Access policy mapped to role + folder + project context

### G. Template Engine
- Reusable project templates
- Template cloning for new client onboarding
- Clone includes phases/tasks/docs/workflows

---

## 5) Security Model

- Row-level scoping by `workspace_id`
- Policy middleware validates:
  - membership
  - role
  - object visibility (e.g., task hidden from client)
- Signed download URLs for NAS proxied access
- Audit log for approvals, edits, and permissions changes

---

## 6) API Design Conventions

- `/v1/workspaces/:workspaceId/...`
- REST-first MVP; move selective areas to GraphQL only if needed
- Standard envelope:
  - `data`
  - `meta`
  - `errors`
- Cursor pagination for feeds/lists

---

## 7) Scalability & Extension Interfaces

### Event topics (planned)
- `task.created`
- `task.status.changed`
- `content.post.approved`
- `file.uploaded`
- `brand.asset.downloaded`

### Future bounded contexts
- Invoicing
- CRM
- Analytics
- Automation workflows

Each module subscribes to domain events without tight coupling.

