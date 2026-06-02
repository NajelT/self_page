insert into profiles (
  id,
  name,
  location,
  linkedin,
  headline_en,
  headline_ru,
  intro_en,
  intro_ru,
  availability_en,
  availability_ru
) values (
  '11111111-1111-4111-8111-111111111111',
  'Ilja Lushpajev',
  'Tallinn, Estonia',
  'https://www.linkedin.com/in/ilushpajev',
  'I turn chaotic delivery into systems teams can actually run.',
  'Превращаю хаотичную delivery-среду в систему, по которой команды реально могут работать.',
  'I started as a Java Developer, then moved into project and delivery management across fintech, telecom, payroll platforms, and IT delivery. My strongest zone is where engineering reality meets delivery governance: requirements, dependencies, production stability, release flow, metrics, and practical rules that help teams ship value predictably.',
  'Я начинал как Java Developer, а затем перешел в project и delivery management в fintech, telecom, payroll-платформах и IT delivery. Моя сильная зона — там, где инженерная реальность встречается с delivery governance: требования, зависимости, production stability, release flow, метрики и практичные правила, которые помогают командам предсказуемо поставлять ценность.',
  'Currently looking for Technical Project Manager, IT Project Manager, Technical Product Owner, and Delivery Lead roles.',
  'Сейчас ищу роли Technical Project Manager, IT Project Manager, Technical Product Owner и Delivery Lead.'
);

insert into profile_roles (profile_id, lang, item_order, label) values
  ('11111111-1111-4111-8111-111111111111', 'en', 1, 'Technical Project Manager'),
  ('11111111-1111-4111-8111-111111111111', 'en', 2, 'Technical Product Owner'),
  ('11111111-1111-4111-8111-111111111111', 'en', 3, 'Delivery Systems Builder'),
  ('11111111-1111-4111-8111-111111111111', 'ru', 1, 'Technical Project Manager'),
  ('11111111-1111-4111-8111-111111111111', 'ru', 2, 'Technical Product Owner'),
  ('11111111-1111-4111-8111-111111111111', 'ru', 3, 'Delivery Systems Builder');

insert into profile_skills (profile_id, item_order, label) values
  ('11111111-1111-4111-8111-111111111111', 1, 'Technical Project Management'),
  ('11111111-1111-4111-8111-111111111111', 2, 'Agile Delivery'),
  ('11111111-1111-4111-8111-111111111111', 3, 'Scrum'),
  ('11111111-1111-4111-8111-111111111111', 4, 'Kanban'),
  ('11111111-1111-4111-8111-111111111111', 5, 'SDLC'),
  ('11111111-1111-4111-8111-111111111111', 6, 'Capacity Planning'),
  ('11111111-1111-4111-8111-111111111111', 7, 'Stakeholder Management'),
  ('11111111-1111-4111-8111-111111111111', 8, 'Risk Management'),
  ('11111111-1111-4111-8111-111111111111', 9, 'Release Management'),
  ('11111111-1111-4111-8111-111111111111', 10, 'CI/CD'),
  ('11111111-1111-4111-8111-111111111111', 11, 'Feature Flags'),
  ('11111111-1111-4111-8111-111111111111', 12, 'DORA Metrics'),
  ('11111111-1111-4111-8111-111111111111', 13, 'Production Support Governance'),
  ('11111111-1111-4111-8111-111111111111', 14, 'Root Cause Analysis'),
  ('11111111-1111-4111-8111-111111111111', 15, 'LLM-assisted Analysis'),
  ('11111111-1111-4111-8111-111111111111', 16, 'Jira / YouTrack'),
  ('11111111-1111-4111-8111-111111111111', 17, 'SQL');

insert into profile_timeline_items (profile_id, item_order, period, company, role, note) values
  ('11111111-1111-4111-8111-111111111111', 1, '2025 - Present', 'Mercans', 'Technical Project Manager', 'Backend, product, ProdSupport, platform delivery, AI-assisted operational analysis.'),
  ('11111111-1111-4111-8111-111111111111', 2, '2024', 'Telecom Infrastructure Partners', 'Project / Delivery work', 'Automation, stakeholder coordination, process throughput.'),
  ('11111111-1111-4111-8111-111111111111', 3, '2023 - 2024', 'Wallester', 'Project Manager', 'Regulated fintech, card issuing and payments delivery.'),
  ('11111111-1111-4111-8111-111111111111', 4, '2020 - 2023', 'Ericsson', 'Project Manager / Technical Specialist', 'Telecom engineering delivery, procurement portfolio, technical operations.'),
  ('11111111-1111-4111-8111-111111111111', 5, '2019 - 2020', 'Fujitsu', 'Java Developer', 'Java, Spring, Hibernate, PostgreSQL, tests, code reviews, release quality.');

insert into projects (id, slug, status, rank_order) values
  ('22222222-2222-4222-8222-222222222221', 'value-delivery-transformation', 'published', 1),
  ('22222222-2222-4222-8222-222222222222', 'critical-issues-intelligence', 'published', 2),
  ('22222222-2222-4222-8222-222222222223', 'prodsupport-operating-model', 'published', 3),
  ('22222222-2222-4222-8222-222222222224', 'delivery-predictability', 'published', 4);

insert into project_translations (project_id, lang, title, summary, impact) values
  ('22222222-2222-4222-8222-222222222221', 'en', 'Value Delivery Transformation', 'Led a release-model transformation from large batch releases across 25+ repositories to item-by-item delivery using trunk-based development, feature flags, quality gates, and DORA metrics.', 'Separated deployment from business release, improved production stability, reduced release stress, and gave Product safer control over customer exposure.'),
  ('22222222-2222-4222-8222-222222222221', 'ru', 'Value Delivery Transformation', 'Перевел release model от больших batch-релизов в 25+ репозиториях к item-by-item delivery через trunk-based development, feature flags, quality gates и DORA metrics.', 'Разделил deployment и бизнес-релиз, повысил production stability, снизил стресс вокруг релизов и дал Product более безопасный контроль customer exposure.'),
  ('22222222-2222-4222-8222-222222222222', 'en', 'Critical Issues Intelligence', 'Used MCP, LLM reasoning, semantic search, and Obsidian graph thinking to turn fragmented issue history into a root-cause and prioritization map.', 'Identified systemic product and engineering problems, prioritized high-value fixes, and supported a 70% reduction in escalations and critical issues after 4 fixes were implemented.'),
  ('22222222-2222-4222-8222-222222222222', 'ru', 'Critical Issues Intelligence', 'Использовал MCP, LLM reasoning, semantic search и Obsidian graph-подход, чтобы превратить разрозненную историю задач в карту root causes и приоритизации.', 'Нашел системные продуктовые и инженерные проблемы, приоритизировал high-value fixes и поддержал 70% снижение escalations и critical issues после внедрения 4 fixes.'),
  ('22222222-2222-4222-8222-222222222223', 'en', 'ProdSupport Operating Model', 'Built a three-layer support management flow linking weekly health reporting, YouTrack dashboard analysis, and Kanban board execution.', 'Made service health visible, connected root-cause analysis to daily board priorities, and created clear pull rules for support work.'),
  ('22222222-2222-4222-8222-222222222223', 'ru', 'ProdSupport Operating Model', 'Построил трехслойный support management flow: weekly health report, YouTrack dashboard analysis и Kanban board execution.', 'Сделал service health видимым, связал root-cause analysis с ежедневными board priorities и создал понятные pull rules для support work.'),
  ('22222222-2222-4222-8222-222222222224', 'en', 'Delivery Predictability System', 'Made sprint planning more structured and data-driven by accounting for vacations, holidays, support rosters, buffer factors, estimates, and real team capacity.', 'Improved roadmap predictability while handling heavy unplanned production support pressure.'),
  ('22222222-2222-4222-8222-222222222224', 'ru', 'Delivery Predictability System', 'Сделал sprint planning более структурным и data-driven через учет отпусков, праздников, support roster, buffer factors, estimates и реальной team capacity.', 'Улучшил roadmap predictability на фоне тяжелой нагрузки от unplanned production support.');

insert into project_tags (project_id, item_order, label) values
  ('22222222-2222-4222-8222-222222222221', 1, 'CI/CD'),
  ('22222222-2222-4222-8222-222222222221', 2, 'Release governance'),
  ('22222222-2222-4222-8222-222222222221', 3, 'Feature flags'),
  ('22222222-2222-4222-8222-222222222221', 4, 'DORA'),
  ('22222222-2222-4222-8222-222222222222', 1, 'LLM'),
  ('22222222-2222-4222-8222-222222222222', 2, 'MCP'),
  ('22222222-2222-4222-8222-222222222222', 3, 'Root cause analysis'),
  ('22222222-2222-4222-8222-222222222222', 4, 'Operational analytics'),
  ('22222222-2222-4222-8222-222222222223', 1, 'ProdSupport'),
  ('22222222-2222-4222-8222-222222222223', 2, 'Kanban'),
  ('22222222-2222-4222-8222-222222222223', 3, 'SLA'),
  ('22222222-2222-4222-8222-222222222223', 4, 'YouTrack'),
  ('22222222-2222-4222-8222-222222222224', 1, 'Scrum'),
  ('22222222-2222-4222-8222-222222222224', 2, 'Capacity planning'),
  ('22222222-2222-4222-8222-222222222224', 3, 'YouTrack hygiene'),
  ('22222222-2222-4222-8222-222222222224', 4, 'Delivery metrics');

insert into project_metrics (project_id, item_order, label) values
  ('22222222-2222-4222-8222-222222222221', 1, '25+ repositories'),
  ('22222222-2222-4222-8222-222222222221', 2, '20+ repositories transitioned'),
  ('22222222-2222-4222-8222-222222222221', 3, '10% to 80%+ test coverage target'),
  ('22222222-2222-4222-8222-222222222221', 4, 'DORA metrics introduced'),
  ('22222222-2222-4222-8222-222222222222', 1, '4,000+ issues analyzed'),
  ('22222222-2222-4222-8222-222222222222', 2, '616 high-severity backend tickets'),
  ('22222222-2222-4222-8222-222222222222', 3, '10 root causes'),
  ('22222222-2222-4222-8222-222222222222', 4, '70% reduction in escalations and critical issues'),
  ('22222222-2222-4222-8222-222222222223', 1, 'Weekly Monday 09:00 health cadence'),
  ('22222222-2222-4222-8222-222222222223', 2, 'WIP limits'),
  ('22222222-2222-4222-8222-222222222223', 3, 'SLA aging thresholds'),
  ('22222222-2222-4222-8222-222222222223', 4, '3 operational surfaces unified'),
  ('22222222-2222-4222-8222-222222222224', 1, '70%+ April backend capacity redirected to critical support'),
  ('22222222-2222-4222-8222-222222222224', 2, '16% support estimation deviation'),
  ('22222222-2222-4222-8222-222222222224', 3, '4% feature estimation deviation'),
  ('22222222-2222-4222-8222-222222222224', 4, '50% grooming time reduction');

insert into project_case_study_items (project_id, lang, item_order, body) values
  ('22222222-2222-4222-8222-222222222221', 'en', 1, 'Separated deployment as an engineering event from release as a Product decision.'),
  ('22222222-2222-4222-8222-222222222221', 'en', 2, 'Introduced dark launches, gradual rollouts, kill switches, auditability, and build-once/deploy-anywhere artifact promotion.'),
  ('22222222-2222-4222-8222-222222222221', 'en', 3, 'Added quality gates and deployment health metrics to balance speed with stability.'),
  ('22222222-2222-4222-8222-222222222221', 'ru', 1, 'Разделил deployment как инженерное событие и release как продуктово-бизнесовое решение.'),
  ('22222222-2222-4222-8222-222222222221', 'ru', 2, 'Ввел dark launches, gradual rollouts, kill switches, auditability и build-once/deploy-anywhere artifact promotion.'),
  ('22222222-2222-4222-8222-222222222221', 'ru', 3, 'Добавил quality gates и метрики delivery health, чтобы балансировать скорость и стабильность.'),
  ('22222222-2222-4222-8222-222222222222', 'en', 1, 'Analyzed full issue history through an MCP-enabled workflow.'),
  ('22222222-2222-4222-8222-222222222222', 'en', 2, 'Used semantic search to uncover relationships invisible in individual ticket views.'),
  ('22222222-2222-4222-8222-222222222222', 'en', 3, 'Converted operational support data into product and engineering priorities.'),
  ('22222222-2222-4222-8222-222222222222', 'ru', 1, 'Проанализировал полную историю задач через MCP-enabled workflow.'),
  ('22222222-2222-4222-8222-222222222222', 'ru', 2, 'Использовал semantic search, чтобы увидеть связи, которые не видны из отдельных тикетов.'),
  ('22222222-2222-4222-8222-222222222222', 'ru', 3, 'Преобразовал operational support data в product и engineering priorities.'),
  ('22222222-2222-4222-8222-222222222223', 'en', 1, 'Introduced weekly visibility for backlog trend, inflow vs throughput, SLA risk, and BE/FE/INT distribution.'),
  ('22222222-2222-4222-8222-222222222223', 'en', 2, 'Designed pull-based rules where ProdSupport owns priority and developers pull from the top when capacity is available.'),
  ('22222222-2222-4222-8222-222222222223', 'en', 3, 'Added WIP, blocker, reopened, review, and escalation playbooks.'),
  ('22222222-2222-4222-8222-222222222223', 'ru', 1, 'Ввел еженедельную видимость backlog trend, inflow vs throughput, SLA risk и BE/FE/INT breakdown.'),
  ('22222222-2222-4222-8222-222222222223', 'ru', 2, 'Спроектировал pull-based правила: ProdSupport владеет priority, developers берут верхнюю задачу при наличии capacity.'),
  ('22222222-2222-4222-8222-222222222223', 'ru', 3, 'Добавил WIP, blocker, reopened, review и escalation playbooks.'),
  ('22222222-2222-4222-8222-222222222224', 'en', 1, 'Delivered Q1 backend epic scope to at least Acceptance despite major support redirection.'),
  ('22222222-2222-4222-8222-222222222224', 'en', 2, 'Built monthly delivery metrics for leadership across feature work, production support, leave adjustments, escalations, and unplanned work.'),
  ('22222222-2222-4222-8222-222222222224', 'en', 3, 'Drove 100% sprint-backlog estimate and assignee coverage.'),
  ('22222222-2222-4222-8222-222222222224', 'ru', 1, 'Довел Q1 backend epic scope минимум до Acceptance, несмотря на сильное перераспределение capacity в support.'),
  ('22222222-2222-4222-8222-222222222224', 'ru', 2, 'Построил monthly delivery metrics для leadership по feature work, production support, leave adjustments, escalations и unplanned work.'),
  ('22222222-2222-4222-8222-222222222224', 'ru', 3, 'Довел sprint backlog до 100% покрытия estimates и assignees.');
