# API MVP Modules (NestJS-style)

## Folder Layout

```text
apps/api/src/
  modules/
    auth/
    workspaces/
    portal/
    projects/
    tasks/
    content/
    brand/
    files/
    templates/
    feed/
    permissions/
  shared/
    db/
    events/
    errors/
```

## Critical Endpoints (MVP)

### Auth / Membership
- `POST /v1/auth/login`
- `GET /v1/auth/me`
- `GET /v1/workspaces/:workspaceId/members`

### Client Portal
- `GET /v1/workspaces/:workspaceId/portal/overview`
- `GET /v1/workspaces/:workspaceId/updates`
- `POST /v1/workspaces/:workspaceId/updates`

### Tasks
- `GET /v1/workspaces/:workspaceId/projects/:projectId/tasks`
- `POST /v1/workspaces/:workspaceId/projects/:projectId/tasks`
- `PATCH /v1/workspaces/:workspaceId/tasks/:taskId`
- `POST /v1/workspaces/:workspaceId/tasks/:taskId/comments`

### Content Planner
- `GET /v1/workspaces/:workspaceId/content/calendar`
- `POST /v1/workspaces/:workspaceId/content/posts`
- `PATCH /v1/workspaces/:workspaceId/content/posts/:postId`
- `POST /v1/workspaces/:workspaceId/content/posts/:postId/feedback`
- `POST /v1/workspaces/:workspaceId/content/posts/:postId/approve`

### Brand Portal
- `GET /v1/workspaces/:workspaceId/brand`
- `POST /v1/workspaces/:workspaceId/brand/sections`
- `PATCH /v1/workspaces/:workspaceId/brand/sections/:sectionId`

### Files (NAS-backed)
- `POST /v1/workspaces/:workspaceId/files/upload-url`
- `GET /v1/workspaces/:workspaceId/files`
- `GET /v1/workspaces/:workspaceId/files/:fileId/download-url`

### Templates
- `POST /v1/templates`
- `POST /v1/templates/:templateId/instantiate`

