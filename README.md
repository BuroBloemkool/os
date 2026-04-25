# Buro Bloemkool OS

A modular SaaS foundation for a premium agency client experience platform.

## What is included

- Scalable system architecture
- PostgreSQL schema for multi-tenant role-based SaaS
- UX wireframes (low-fidelity)
- MVP API module contracts and endpoints
- Modular extension strategy for invoicing/CRM/analytics/automation

## Stack

- Frontend: Next.js (React + Tailwind-ready)
- Backend: NestJS-style modular Node architecture
- Database: PostgreSQL
- Files: NAS-backed storage adapter (mounted or API)
- Auth: RBAC with workspace scoping

## Repository Structure

- `docs/architecture.md` — architecture, module boundaries, scaling strategy
- `docs/ui-wireframes.md` — wireframes and UX flows
- `database/schema.sql` — relational schema with roles, tasks, content planner, brand, files, templates
- `apps/api/src` — MVP backend module map, permission policy, route contracts
- `apps/web/src` — MVP frontend IA + page map + component system notes
- `modules/future-expansion.md` — future capabilities and integration contracts

## Quick Start (foundation)

This repository currently contains the foundational design and implementation blueprint.
Use the files as scaffolding for immediate implementation in Next.js + NestJS.

