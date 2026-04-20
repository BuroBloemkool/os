# Frontend Information Architecture (Next.js)

## App Routes

```text
/ (marketing / login)
/app
  /workspace/[workspaceSlug]
    /dashboard
    /tasks
    /content
    /brand
    /files
    /deliverables
    /settings (admin only)
```

## UX Principles

- Max 2-click access to key client actions
- Persistent left navigation for module orientation
- Contextual right panel for feedback/comment flows
- Status colors standardized across tasks/content

## Component System (MVP)

- `WorkspaceShell`
- `ModuleHeader`
- `KpiCard`
- `StatusBadge`
- `EntityTimeline`
- `FeedbackThread`
- `ApprovalActions`
- `FileTable`
- `BrandSectionCard`

