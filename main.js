/**
 * main.js — reads project data from projects.js and renders the
 * "Featured Projects" section in the DOM.
 *
 * Projects are defined in projects.ts (TypeScript source) and compiled
 * to projects.js (browser-ready). Any project with `featured: true` is
 * shown in the #featured-projects grid on the page.
 */

(function () {
  "use strict";

  // ── Render a single project card ────────────────────────────────────────
  function createCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);

    // Title
    const title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    // Description
    const desc = document.createElement("p");
    desc.textContent = project.description;
    card.appendChild(desc);

    // Tags
    if (project.tags && project.tags.length > 0) {
      const tagsEl = document.createElement("div");
      tagsEl.className = "project-tags";
      project.tags.forEach(function (tag) {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
      card.appendChild(tagsEl);
    }

    // Links
    const linksEl = document.createElement("div");
    linksEl.className = "project-links";

    if (project.url) {
      const liveLink = document.createElement("a");
      liveLink.href = project.url;
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.textContent = "🌐 Live site";
      linksEl.appendChild(liveLink);
    }

    if (project.repoUrl) {
      const repoLink = document.createElement("a");
      repoLink.href = project.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = "🔗 Repository";
      linksEl.appendChild(repoLink);
    }

    if (linksEl.children.length > 0) {
      card.appendChild(linksEl);
    }

    return card;
  }

  // ── Mount featured projects into the grid ───────────────────────────────
  function renderFeaturedProjects() {
    var grid = document.getElementById("featured-projects");
    if (!grid) return;

    // `projects` is loaded via projects.js (a plain <script> tag before main.js)
    if (typeof projects === "undefined" || !Array.isArray(projects)) {
      grid.innerHTML =
        '<p class="empty-state">No project data found. ' +
        "Make sure projects.js is loaded before main.js.</p>";
      return;
    }

    var featured = projects.filter(function (p) {
      return p.featured === true;
    });

    if (featured.length === 0) {
      grid.innerHTML =
        '<p class="empty-state">No featured projects yet. ' +
        "Set <code>featured: true</code> on a project in projects.ts.</p>";
      return;
    }

    featured.forEach(function (project) {
      grid.appendChild(createCard(project));
    });
  }

  // Run after the DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFeaturedProjects);
  } else {
    renderFeaturedProjects();
  }
})();
