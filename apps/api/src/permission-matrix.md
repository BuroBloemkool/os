# Permission Matrix (MVP)

| Capability | Admin | Freelancer | Client |
|---|---|---|---|
| View workspace dashboard | ✅ | ✅ (assigned workspaces) | ✅ |
| Create/edit tasks | ✅ | ✅ (assigned projects) | ❌ |
| Move task phase | ✅ | ✅ | ❌ |
| View hidden tasks | ✅ | ✅ | ❌ |
| Comment on tasks | ✅ | ✅ | ✅ (only visible tasks) |
| Create/edit content posts | ✅ | ✅ | ❌ |
| Leave content feedback | ✅ | ✅ | ✅ |
| Approve content post | ✅ | ❌ | ✅ |
| Edit brand guide | ✅ | ❌ | ❌ |
| View brand guide (if active client) | ✅ | ✅ | ✅ |
| Upload files | ✅ | ✅ | ✅ (restricted folders) |
| Access internal folder | ✅ | ✅ | ❌ |
| Create templates | ✅ | ❌ | ❌ |

## Enforcement Rules

1. Every request must resolve `workspace_id` + membership.
2. Role checks are combined with object visibility (`visible_to_client`, folder rules).
3. Content edit fields are status-aware (e.g., approved post caption locked for clients).

