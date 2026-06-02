const copy = {
  en: {
    navCases: "Cases",
    navSystem: "System",
    navTimeline: "Timeline",
    navBackoffice: "Backoffice",
    viewCases: "View cases",
    systemKicker: "Positioning",
    systemTitle: "A portfolio that behaves like a product system.",
    systemBodyOne: "This is intentionally more than a business-card page: the content is served by a Java API, stored in PostgreSQL, and versioned through Flyway migrations.",
    systemBodyTwo: "The next layers are obvious: real backoffice auth, AI assistant trained on the case bank, CV/JD tailoring workflows, and eventually split services for content, search, and assistant logic.",
    casesKicker: "Case bank",
    casesTitle: "Evidence, not slogans.",
    timelineKicker: "Journey",
    timelineTitle: "From code to delivery systems.",
    filterAll: "All",
    footerText: "Built as a Java + PostgreSQL portfolio platform. Next: auth, AI assistant, search, richer admin workflows.",
    metrics: "Metrics",
    impact: "Impact"
  },
  ru: {
    navCases: "Кейсы",
    navSystem: "Система",
    navTimeline: "Опыт",
    navBackoffice: "Backoffice",
    viewCases: "Смотреть кейсы",
    systemKicker: "Позиционирование",
    systemTitle: "Портфолио, которое ведет себя как продуктовая система.",
    systemBodyOne: "Это специально не просто сайт-визитка: контент отдает Java API, данные лежат в PostgreSQL, а схема ведется через Flyway migrations.",
    systemBodyTwo: "Следующие слои понятны: real backoffice auth, AI assistant на базе кейсов, CV/JD tailoring workflows, а позже отдельные сервисы для контента, поиска и assistant logic.",
    casesKicker: "Банк кейсов",
    casesTitle: "Доказательства, не лозунги.",
    timelineKicker: "Путь",
    timelineTitle: "От кода к delivery systems.",
    filterAll: "Все",
    footerText: "Собрано как Java + PostgreSQL portfolio platform. Дальше: auth, AI assistant, search, richer admin workflows.",
    metrics: "Метрики",
    impact: "Impact"
  }
};

let state = {
  lang: localStorage.getItem("lang") || "en",
  profile: null,
  projects: [],
  filter: "all"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function t(key) {
  return copy[state.lang][key] || copy.en[key] || key;
}

function localText(value) {
  if (!value) return "";
  return value[state.lang] || value.en || "";
}

function renderCopy() {
  document.documentElement.lang = state.lang;
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
}

function renderProfile() {
  const profile = state.profile;
  $("#role-line").textContent = localText(profile.roles).join(" / ");
  $("#hero-title").textContent = localText(profile.headline);
  $("#hero-intro").textContent = localText(profile.intro);
  $("#availability").textContent = localText(profile.availability);
  $("#linkedin-link").href = profile.linkedin;
  $("#skills").innerHTML = profile.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
  $("#timeline-list").innerHTML = profile.timeline.map((item) => `
    <article class="timeline-item">
      <div class="timeline-period">${escapeHtml(item.period)}</div>
      <div>
        <h3>${escapeHtml(item.company)}</h3>
        <p class="timeline-role">${escapeHtml(item.role)}</p>
        <p>${escapeHtml(item.note)}</p>
      </div>
    </article>
  `).join("");
}

function renderProjects() {
  const projects = state.projects.filter((project) => {
    if (project.status !== "published") return false;
    if (state.filter === "all") return true;
    return project.tags.some((tag) => tag.toLowerCase().includes(state.filter.toLowerCase()));
  });

  $("#case-grid").innerHTML = projects.map((project) => `
    <article class="case-card">
      <div class="tag-row">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <h3>${escapeHtml(localText(project.title))}</h3>
      <p>${escapeHtml(localText(project.summary))}</p>
      <div class="case-impact">
        <strong>${t("impact")}</strong>
        <span>${escapeHtml(localText(project.impact))}</span>
      </div>
      <div class="metric-list" aria-label="${t("metrics")}">
        ${project.metrics.map((metric) => `<span>${escapeHtml(metric)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

async function load() {
  const [profile, projects] = await Promise.all([
    fetch("/api/profile").then((response) => response.json()),
    fetch("/api/projects").then((response) => response.json())
  ]);
  state.profile = profile;
  state.projects = projects;
  render();
}

function render() {
  renderCopy();
  renderProfile();
  renderProjects();
}

$$(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    localStorage.setItem("lang", state.lang);
    render();
  });
});

$$(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    $$(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
    renderProjects();
  });
});

load();
