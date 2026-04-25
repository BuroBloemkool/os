-- Buro Bloemkool OS PostgreSQL Schema (MVP)

create extension if not exists "pgcrypto";

-- ===== Identity & Workspaces =====
create table workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  status text not null default 'active' check (status in ('active', 'archived', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('admin', 'freelancer', 'client')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

-- ===== Client Portal =====
create table workspace_updates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  author_member_id uuid not null references workspace_members(id),
  title text not null,
  body text not null,
  visible_to_client boolean not null default true,
  created_at timestamptz not null default now()
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  label text not null,
  value text not null,
  type text not null check (type in ('email', 'phone', 'meeting_link', 'action')),
  created_at timestamptz not null default now()
);

-- ===== Projects, Tasks, Feedback =====
create table projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  description text,
  created_by_member_id uuid not null references workspace_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  phase text not null default 'todo' check (phase in ('todo', 'in_progress', 'done')),
  status text not null default 'open' check (status in ('open', 'blocked', 'completed')),
  assigned_member_id uuid references workspace_members(id),
  visible_to_client boolean not null default true,
  due_date date,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete cascade,
  author_member_id uuid not null references workspace_members(id),
  body text not null,
  created_at timestamptz not null default now()
);

-- ===== Content Planner =====
create table content_calendars (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null default 'Main Content Calendar',
  created_at timestamptz not null default now()
);

create table content_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  calendar_id uuid not null references content_calendars(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  topic text not null,
  caption text,
  visual_file_id uuid,
  planned_for timestamptz,
  status text not null default 'draft' check (status in ('draft', 'feedback', 'approved', 'scheduled')),
  created_by_member_id uuid not null references workspace_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table content_feedback (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references content_posts(id) on delete cascade,
  author_member_id uuid not null references workspace_members(id),
  body text not null,
  created_at timestamptz not null default now()
);

create table content_approvals (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references content_posts(id) on delete cascade,
  approved_by_member_id uuid not null references workspace_members(id),
  approved_at timestamptz not null default now(),
  unique (post_id, approved_by_member_id)
);

-- ===== Brand Portal =====
create table brand_guides (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  version text not null default 'v1',
  is_published boolean not null default false,
  created_by_member_id uuid not null references workspace_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brand_sections (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references brand_guides(id) on delete cascade,
  section_type text not null check (section_type in ('logo', 'color', 'typography', 'tone', 'imagery', 'asset')),
  title text not null,
  content jsonb not null default '{}'::jsonb,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

-- ===== Files / NAS Metadata =====
create table files (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  folder_type text not null check (folder_type in ('deliverables', 'assets', 'content', 'internal')),
  storage_path text not null,
  filename text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by_member_id uuid not null references workspace_members(id),
  created_at timestamptz not null default now()
);

alter table content_posts
  add constraint fk_visual_file
  foreign key (visual_file_id) references files(id) on delete set null;

create table task_files (
  task_id uuid not null references tasks(id) on delete cascade,
  file_id uuid not null references files(id) on delete cascade,
  primary key (task_id, file_id)
);

-- ===== Templates =====
create table templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_by_member_id uuid not null references workspace_members(id),
  created_at timestamptz not null default now()
);

create table template_tasks (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references templates(id) on delete cascade,
  title text not null,
  description text,
  phase text not null default 'todo' check (phase in ('todo', 'in_progress', 'done')),
  position integer not null default 0
);

-- ===== Audit =====
create table audit_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  actor_member_id uuid references workspace_members(id),
  event_name text not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ===== Indexes =====
create index idx_workspace_members_workspace_role on workspace_members(workspace_id, role);
create index idx_projects_workspace on projects(workspace_id);
create index idx_tasks_project_phase on tasks(project_id, phase, position);
create index idx_content_posts_calendar_date on content_posts(calendar_id, planned_for);
create index idx_files_workspace_folder on files(workspace_id, folder_type);
create index idx_brand_guides_workspace_published on brand_guides(workspace_id, is_published);
create index idx_audit_events_workspace_created on audit_events(workspace_id, created_at desc);

