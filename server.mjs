import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");
const dataDir = join(root, "data");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const adminToken = process.env.BACKOFFICE_TOKEN || "local-dev-token";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

async function readJson(name) {
  const raw = await readFile(join(dataDir, name), "utf8");
  return JSON.parse(raw);
}

async function writeJson(name, value) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(join(dataDir, name), `${JSON.stringify(value, null, 2)}\n`);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": mime[".json"] });
  res.end(JSON.stringify(body));
}

function isAdmin(req) {
  return req.headers.authorization === `Bearer ${adminToken}`;
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/profile" && req.method === "GET") {
    return sendJson(res, 200, await readJson("profile.json"));
  }

  if (url.pathname === "/api/projects" && req.method === "GET") {
    const projects = await readJson("projects.json");
    return sendJson(res, 200, projects.sort((a, b) => a.rank - b.rank));
  }

  if (url.pathname === "/api/projects" && req.method === "POST") {
    if (!isAdmin(req)) return sendJson(res, 401, { error: "Missing or invalid backoffice token." });
    const projects = await readJson("projects.json");
    const input = await readBody(req);
    const now = new Date().toISOString();
    const project = {
      id: crypto.randomUUID(),
      slug: input.slug || input.title?.en?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      status: input.status || "draft",
      rank: Number(input.rank ?? projects.length + 1),
      tags: Array.isArray(input.tags) ? input.tags : [],
      title: input.title || { en: "Untitled project", ru: "Проект без названия" },
      summary: input.summary || { en: "", ru: "" },
      impact: input.impact || { en: "", ru: "" },
      metrics: Array.isArray(input.metrics) ? input.metrics : [],
      caseStudy: input.caseStudy || { en: [], ru: [] },
      createdAt: now,
      updatedAt: now
    };
    projects.push(project);
    await writeJson("projects.json", projects);
    return sendJson(res, 201, project);
  }

  const projectMatch = url.pathname.match(/^\/api\/projects\/([^/]+)$/);
  if (projectMatch && req.method === "PUT") {
    if (!isAdmin(req)) return sendJson(res, 401, { error: "Missing or invalid backoffice token." });
    const projects = await readJson("projects.json");
    const index = projects.findIndex((project) => project.id === projectMatch[1]);
    if (index === -1) return sendJson(res, 404, { error: "Project not found." });
    const input = await readBody(req);
    projects[index] = { ...projects[index], ...input, id: projects[index].id, updatedAt: new Date().toISOString() };
    await writeJson("projects.json", projects);
    return sendJson(res, 200, projects[index]);
  }

  if (projectMatch && req.method === "DELETE") {
    if (!isAdmin(req)) return sendJson(res, 401, { error: "Missing or invalid backoffice token." });
    const projects = await readJson("projects.json");
    const next = projects.filter((project) => project.id !== projectMatch[1]);
    if (next.length === projects.length) return sendJson(res, 404, { error: "Project not found." });
    await writeJson("projects.json", next);
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { error: "API route not found." });
}

async function handleStatic(req, res, url) {
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(decodeURIComponent(requested)).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicDir, safePath);
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("Not a file");
    res.writeHead(200, { "content-type": mime[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    return await handleStatic(req, res, url);
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Internal server error." });
  }
}).listen(port, host, () => {
  console.log(`Ilja self page running at http://${host}:${port}`);
  console.log(`Backoffice token for local editing: ${adminToken}`);
});
