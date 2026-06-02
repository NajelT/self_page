create table profiles (
  id uuid primary key,
  name text not null,
  location text not null,
  linkedin text not null,
  headline_en text not null,
  headline_ru text not null,
  intro_en text not null,
  intro_ru text not null,
  availability_en text not null,
  availability_ru text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table profile_roles (
  id bigserial primary key,
  profile_id uuid not null references profiles(id) on delete cascade,
  lang text not null check (lang in ('en', 'ru')),
  item_order integer not null,
  label text not null,
  unique (profile_id, lang, item_order)
);

create table profile_skills (
  id bigserial primary key,
  profile_id uuid not null references profiles(id) on delete cascade,
  item_order integer not null,
  label text not null,
  unique (profile_id, item_order)
);

create table profile_timeline_items (
  id bigserial primary key,
  profile_id uuid not null references profiles(id) on delete cascade,
  item_order integer not null,
  period text not null,
  company text not null,
  role text not null,
  note text not null,
  unique (profile_id, item_order)
);

create table projects (
  id uuid primary key,
  slug text not null unique,
  status text not null check (status in ('draft', 'published')),
  rank_order integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_status_rank_idx on projects(status, rank_order);

create table project_translations (
  project_id uuid not null references projects(id) on delete cascade,
  lang text not null check (lang in ('en', 'ru')),
  title text not null,
  summary text not null,
  impact text not null,
  primary key (project_id, lang)
);

create table project_tags (
  id bigserial primary key,
  project_id uuid not null references projects(id) on delete cascade,
  item_order integer not null,
  label text not null,
  unique (project_id, item_order)
);

create table project_metrics (
  id bigserial primary key,
  project_id uuid not null references projects(id) on delete cascade,
  item_order integer not null,
  label text not null,
  unique (project_id, item_order)
);

create table project_case_study_items (
  id bigserial primary key,
  project_id uuid not null references projects(id) on delete cascade,
  lang text not null check (lang in ('en', 'ru')),
  item_order integer not null,
  body text not null,
  unique (project_id, lang, item_order)
);
