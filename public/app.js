const copy = {
  en: {
    navCases: "Cases",
    navSystem: "System",
    navTimeline: "Timeline",
    navBackoffice: "Backoffice",
    viewCases: "View cases",
    systemKicker: "Positioning",
    systemTitle: "A portfolio that behaves like a product system.",
    systemBodyOne: "This is intentionally more than a business-card page: the content is fed by local JSON data, the API is already separated, and the case bank can move to SQLite/Postgres without changing the public interface.",
    systemBodyTwo: "The next layers are obvious: admin authentication, AI assistant trained on the case bank, CV/JD tailoring workflows, and eventually split services for content, search, and assistant logic.",
    casesKicker: "Case bank",
    casesTitle: "Evidence, not slogans.",
    timelineKicker: "Journey",
    timelineTitle: "From code to delivery systems.",
    filterAll: "All",
    footerText: "Built as a local-first portfolio platform. Next: auth, SQLite/Postgres, AI assistant, richer admin workflows.",
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
    systemBodyOne: "Это специально не просто сайт-визитка: контент уже идет из локальной JSON-базы, API отделен, а банк кейсов можно перенести на SQLite/Postgres без переписывания публичного интерфейса.",
    systemBodyTwo: "Следующие слои понятны: admin authentication, AI assistant на базе кейсов, CV/JD tailoring workflows, а позже отдельные сервисы для контента, поиска и assistant logic.",
    casesKicker: "Банк кейсов",
    casesTitle: "Доказательства, не лозунги.",
    timelineKicker: "Путь",
    timelineTitle: "От кода к delivery systems.",
    filterAll: "Все",
    footerText: "Собрано как local-first portfolio platform. Дальше: auth, SQLite/Postgres, AI assistant, richer admin workflows.",
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
  $("#skills").innerHTML = profile.skills.map((skill) => `<span>${skill}</span>`).join("");
  $("#timeline-list").innerHTML = profile.timeline.map((item) => `
    <article class="timeline-item">
      <div class="timeline-period">${item.period}</div>
      <div>
        <h3>${item.company}</h3>
        <p class="timeline-role">${item.role}</p>
        <p>${item.note}</p>
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
      <div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <h3>${localText(project.title)}</h3>
      <p>${localText(project.summary)}</p>
      <div class="case-impact">
        <strong>${t("impact")}</strong>
        <span>${localText(project.impact)}</span>
      </div>
      <div class="metric-list" aria-label="${t("metrics")}">
        ${project.metrics.map((metric) => `<span>${metric}</span>`).join("")}
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
