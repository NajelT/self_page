let projects = [];
let selectedId = null;

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emptyProject() {
  return {
    id: "",
    status: "draft",
    rank: projects.length + 1,
    tags: [],
    title: { en: "", ru: "" },
    summary: { en: "", ru: "" },
    impact: { en: "", ru: "" },
    metrics: [],
    caseStudy: { en: [], ru: [] }
  };
}

function token() {
  return $("#token").value.trim();
}

function setStatus(message, isError = false) {
  $("#admin-status").textContent = message;
  $("#admin-status").classList.toggle("error", isError);
}

function fillForm(project) {
  selectedId = project.id || null;
  $("#project-id").value = project.id || "";
  $("#status").value = project.status || "draft";
  $("#rank").value = project.rank || 1;
  $("#title-en").value = project.title?.en || "";
  $("#title-ru").value = project.title?.ru || "";
  $("#summary-en").value = project.summary?.en || "";
  $("#summary-ru").value = project.summary?.ru || "";
  $("#impact-en").value = project.impact?.en || "";
  $("#impact-ru").value = project.impact?.ru || "";
  $("#tags").value = (project.tags || []).join(", ");
  $("#metrics").value = (project.metrics || []).join("\n");
  renderList();
}

function readForm() {
  return {
    status: $("#status").value,
    rank: Number($("#rank").value || 1),
    title: { en: $("#title-en").value.trim(), ru: $("#title-ru").value.trim() },
    summary: { en: $("#summary-en").value.trim(), ru: $("#summary-ru").value.trim() },
    impact: { en: $("#impact-en").value.trim(), ru: $("#impact-ru").value.trim() },
    tags: $("#tags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
    metrics: $("#metrics").value.split("\n").map((metric) => metric.trim()).filter(Boolean)
  };
}

function renderList() {
  $("#admin-list").innerHTML = projects.map((project) => `
    <button class="admin-project ${project.id === selectedId ? "active" : ""}" type="button" data-id="${project.id}">
      <span>${escapeHtml(project.rank)}. ${escapeHtml(project.title.en)}</span>
      <small>${escapeHtml(project.status)}</small>
    </button>
  `).join("");

  document.querySelectorAll(".admin-project").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projects.find((item) => item.id === button.dataset.id);
      fillForm(project);
    });
  });
}

async function loadProjects() {
  projects = await fetch("/api/projects").then((response) => response.json());
  renderList();
  fillForm(projects[0] || emptyProject());
}

async function saveProject(event) {
  event.preventDefault();
  const payload = readForm();
  const isExisting = Boolean($("#project-id").value);
  const url = isExisting ? `/api/projects/${$("#project-id").value}` : "/api/projects";
  const method = isExisting ? "PUT" : "POST";
  const response = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token()}`
    },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok) {
    setStatus(result.error || "Save failed", true);
    return;
  }
  setStatus("Saved.");
  await loadProjects();
  fillForm(result);
}

async function deleteProject() {
  const id = $("#project-id").value;
  if (!id) return fillForm(emptyProject());
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token()}` }
  });
  const result = await response.json();
  if (!response.ok) {
    setStatus(result.error || "Delete failed", true);
    return;
  }
  setStatus("Deleted.");
  await loadProjects();
}

$("#project-form").addEventListener("submit", saveProject);
$("#new-project").addEventListener("click", () => fillForm(emptyProject()));
$("#delete-project").addEventListener("click", deleteProject);

loadProjects();
