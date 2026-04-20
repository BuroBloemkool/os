# Future Expansion Modules

## 1) Invoicing
- Generate invoice from approved deliverables
- Link invoice status to client portal widget

## 2) CRM
- Contact lifecycle and deal stages
- Workspace health score

## 3) Analytics
- Content performance ingest
- Delivery velocity (task cycle time)

## 4) Automation Workflows
- Trigger rules:
  - On content approved -> create scheduled task
  - On file uploaded to deliverables -> notify client
  - On project done -> generate wrap-up report

## Extension Contract Pattern

Each new module integrates through:
- event subscriber
- its own DB tables
- route namespace `/v1/<module>`
- permission policy declaration

