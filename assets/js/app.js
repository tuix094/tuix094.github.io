/* ==========================================================================
   Portfolio app
   Renders the header, footer, and every section from the data files in
   /assets/js/data/. You should not need to edit this file to change content.
   ========================================================================== */
(function () {
  "use strict";

  var P = window.PROFILE || {};
  var PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS.slice() : [];

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Escape text before putting it into HTML (protects against XSS).
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Only allow safe link types: http(s), mailto, tel, or site-relative paths.
  function safeUrl(value) {
    var s = String(value || "").trim();
    if (/^(https?:|mailto:|tel:)/i.test(s) || /^\/(?!\/)/.test(s)) return esc(s);
    return "";
  }

  function slug(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var ICONS = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    download: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    facebook: '<path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.link) + "</svg>";
  }

  function externalAttrs() { return ' target="_blank" rel="noopener noreferrer"'; }

  /* ---------- Navigation ---------- */
  var NAV = [
    { label: "Home", href: "/", section: "home" },
    { label: "About", href: "/about/", section: "about" },
    { label: "Skills", href: "/skills/", section: "skills" },
    { label: "Experience", href: "/experience/", section: "experience" },
    { label: "Projects", href: "/projects/", section: "projects" },
    { label: "Education", href: "/education/", section: "education" },
    { label: "CV", href: "/cv/", section: "cv" },
    { label: "Contact", href: "/contact/", section: "contact" }
  ];

  function currentHref() {
    var path = location.pathname.replace(/index\.html$/, "");
    if (!path.endsWith("/")) path += "/";
    if (path === "/") return "/";
    for (var i = 1; i < NAV.length; i++) {
      if (path.indexOf(NAV[i].href) === 0) return NAV[i].href;
    }
    return null;
  }

  function renderHeader() {
    var el = $("#site-header");
    if (!el) return;
    var cur = currentHref();
    el.innerHTML =
      '<div class="container header-inner">' +
        '<a class="brand" href="/"><span class="brand-mark" aria-hidden="true">' + esc(P.initials) + '</span><span class="visually-hidden">' + esc(P.name) + ", home</span></a>" +
        '<nav class="site-nav" aria-label="Main">' +
          '<button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="nav-list">' + icon("menu") + '<span class="visually-hidden">Open menu</span></button>' +
          '<ul class="nav-list" id="nav-list">' +
            NAV.map(function (n) {
              return '<li><a href="' + n.href + '" data-section="' + n.section + '"' + (n.href === cur ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
            }).join("") +
          "</ul>" +
        "</nav>" +
        '<button class="icon-btn theme-toggle" type="button"></button>' +
      "</div>";

    var toggle = $(".nav-toggle", el);
    var list = $(".nav-list", el);

    function setMenu(open) {
      list.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = icon(open ? "close" : "menu") + '<span class="visually-hidden">' + (open ? "Close menu" : "Open menu") + "</span>";
    }

    toggle.addEventListener("click", function () { setMenu(!list.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && list.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (list.classList.contains("is-open") && !el.contains(e.target)) setMenu(false);
    });

    // On the home page every section is on one page, so nav links scroll
    // to the section. The links still point to real pages (/about/ etc.)
    // for new tabs, sharing, and search engines.
    var onHome = document.body.getAttribute("data-page") === "home";
    $$("a[data-section]", list).forEach(function (a) {
      a.addEventListener("click", function (e) {
        setMenu(false);
        if (!onHome || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        var target = document.getElementById(a.getAttribute("data-section"));
        if (!target) return;
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        target.focus({ preventScroll: true });
      });
    });

    setupTheme($(".theme-toggle", el));
  }

  /* ---------- Dark / light mode ---------- */
  function setupTheme(btn) {
    function apply(theme, save) {
      document.documentElement.setAttribute("data-theme", theme);
      var dark = theme === "dark";
      btn.innerHTML = icon(dark ? "sun" : "moon") + '<span class="visually-hidden">' + (dark ? "Switch to light mode" : "Switch to dark mode") + "</span>";
      btn.setAttribute("aria-pressed", String(dark));
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#24233f" : "#dedcf6");
      if (save) { try { localStorage.setItem("theme", theme); } catch (e) { /* storage blocked */ } }
    }
    apply(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light", false);
    btn.addEventListener("click", function () {
      apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- Footer ---------- */
  function socialList() {
    var items = (P.socials || []).filter(function (s) { return safeUrl(s.url); });
    if (!items.length) return "";
    return '<ul class="social-list">' + items.map(function (s) {
      return '<li><a href="' + safeUrl(s.url) + '"' + externalAttrs() + ">" + icon(s.icon) + '<span class="visually-hidden">' + esc(s.label) + " (opens in a new tab)</span></a></li>";
    }).join("") + "</ul>";
  }

  function renderFooter() {
    var el = $("#site-footer");
    if (!el) return;
    el.innerHTML =
      '<div class="container footer-inner">' +
        '<div class="footer-id">' +
          '<p class="footer-name">' + esc(P.name) + "</p>" +
          '<p class="muted">' + esc(P.title) + "</p>" +
          '<p><a href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a></p>" +
        "</div>" +
        '<nav aria-label="Footer"><ul class="footer-links">' +
          NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
        "</ul></nav>" +
        socialList() +
      "</div>" +
      '<div class="container footer-bottom"><p>&copy; ' + new Date().getFullYear() + " " + esc(P.name) + ". All rights reserved.</p></div>";
  }

  /* ---------- Section renderers ---------- */
  function sectionTitle(el, text) {
    var hidden = el.hasAttribute("data-notitle") ? ' class="visually-hidden"' : "";
    return '<h2 id="' + el.id + '-title"' + hidden + ">" + esc(text) + "</h2>";
  }

  function cvButtons() {
    var cv = P.cv || {};
    return (
      '<a class="btn btn-primary" href="' + safeUrl(cv.file) + '" download="' + esc(cv.downloadName) + '" data-goatcounter-click="cv-download">' + icon("download") + "Download CV</a>" +
      '<a class="btn" href="' + safeUrl(cv.file) + '"' + externalAttrs() + ' data-goatcounter-click="cv-view">' + icon("external") + "View CV online</a>"
    );
  }

  var R = {};

  R.hero = function (el) {
    el.innerHTML =
      '<div class="hero">' +
        '<div class="hero-photo-wrap hatch"><img class="hero-photo" src="' + safeUrl(P.photo) + '" data-fallback="/assets/img/profile.svg" alt="Portrait of ' + esc(P.name) + '" width="240" height="240" fetchpriority="high"></div>' +
        '<div class="hero-text">' +
          '<h1 class="hero-name"><span class="br br-l" aria-hidden="true">[</span>' + esc(P.name) + '<span class="br br-r" aria-hidden="true">]</span></h1>' +
          '<p class="hero-title">' + esc(P.title) + "</p>" +
          '<p class="hero-tagline">' + esc(P.tagline) + "</p>" +
          '<p class="hero-intro">' + esc(P.intro) + "</p>" +
          '<div class="btn-row">' +
            '<a class="btn btn-primary" href="/projects/">View my projects</a>' +
            '<a class="btn" href="' + safeUrl((P.cv || {}).file) + '" download="' + esc((P.cv || {}).downloadName) + '" data-goatcounter-click="cv-download">' + icon("download") + "Download CV</a>" +
            '<a class="btn" href="/contact/">Contact me</a>' +
          "</div>" +
        "</div>" +
      "</div>";
  };

  R.about = function (el) {
    var a = P.about || {};
    var rows = [
      ["Full name", esc(P.name)],
      ["Professional title", esc(P.title)],
      ["Location", esc(P.location)],
      ["Email", '<a href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a>"],
      ["Contact number", '<a href="tel:' + esc(String(P.phone || "").replace(/[^+\d]/g, "")) + '">' + esc(P.phone) + "</a>"],
      ["Education", esc(a.education)],
      ["Occupation", esc(a.occupation)],
      ["Experience", esc(a.years)],
      ["Specialization", esc((a.specializations || []).join(", "))]
    ];
    el.innerHTML =
      sectionTitle(el, "About me") +
      '<div class="about-grid">' +
        '<div class="about-bio">' + (a.bio || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<dl class="facts">' + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") + "</dl>" +
      "</div>";
  };

  var LEVELS = { Familiar: 1, Proficient: 2, Advanced: 3 };

  R.skills = function (el) {
    el.innerHTML =
      sectionTitle(el, "Skills") +
      '<div class="skill-grid">' +
        (P.skills || []).map(function (cat) {
          return '<article class="skill-card tone-' + esc(cat.tone || "sky") + '">' +
            "<h3>" + esc(cat.category) + "</h3>" +
            '<p class="skill-summary">' + esc(cat.summary) + "</p>" +
            '<ul class="skill-list">' +
              (cat.items || []).map(function (s) {
                var lv = LEVELS[s.level] || 1;
                var dots = [1, 2, 3].map(function (i) { return "<i" + (i <= lv ? ' class="on"' : "") + "></i>"; }).join("");
                return '<li><span class="skill-name">' + esc(s.name) + '</span><span class="level"><span class="dots" aria-hidden="true">' + dots + '</span><span class="level-text">' + esc(s.level) + "</span></span></li>";
              }).join("") +
            "</ul>" +
          "</article>";
        }).join("") +
      "</div>" +
      '<p class="fine">Levels are self-assessed. Familiar: I have used it on at least one project. Proficient: I use it regularly without help. Advanced: I can teach it and troubleshoot it under pressure.</p>';
  };

  function bulletList(title, items) {
    if (!items || !items.length) return "";
    return "<h4>" + title + "</h4><ul>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }

  R.experience = function (el) {
    el.innerHTML =
      sectionTitle(el, "Experience") +
      '<ol class="timeline">' +
        (P.experience || []).map(function (x) {
          return '<li class="tl-item">' +
            '<p class="tl-dates">' + esc(x.start) + " to " + esc(x.end) + "</p>" +
            "<h3>" + esc(x.position) + "</h3>" +
            '<p class="tl-org">' + esc(x.organization) + ", " + esc(x.location) + "</p>" +
            bulletList("Responsibilities", x.responsibilities) +
            bulletList("Key accomplishments", x.accomplishments) +
          "</li>";
        }).join("") +
      "</ol>";
  };

  function projectCard(p) {
    var links = p.links || {};
    var url = "/projects/" + encodeURIComponent(p.id) + "/";
    var extra = "";
    if (safeUrl(links.github)) extra += '<a class="btn btn-sm" href="' + safeUrl(links.github) + '"' + externalAttrs() + ">" + icon("github") + 'GitHub<span class="visually-hidden"> for ' + esc(p.name) + "</span></a>";
    if (safeUrl(links.demo)) extra += '<a class="btn btn-sm" href="' + safeUrl(links.demo) + '"' + externalAttrs() + ">" + icon("external") + 'Demo<span class="visually-hidden"> of ' + esc(p.name) + "</span></a>";
    return '<article class="project-card">' +
      '<img class="pc-img" src="' + safeUrl(p.image) + '" data-fallback="' + fallbackFor(p.image) + '" alt="' + esc(p.imageAlt || "Preview of " + p.name) + '" width="800" height="500" loading="lazy" decoding="async">' +
      '<div class="pc-body">' +
        '<p class="pc-meta"><span class="tag">' + esc(p.category) + '</span><span class="status status-' + slug(p.status) + '">' + esc(p.status) + '</span><span class="year">' + esc(p.date || p.year) + "</span></p>" +
        '<h3 class="pc-title"><a href="' + url + '">' + esc(p.name) + "</a></h3>" +
        '<p class="pc-desc">' + esc(p.description) + "</p>" +
        '<ul class="chips" aria-label="Technologies used">' + (p.technologies || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '<p class="pc-role"><span class="muted">My role:</span> ' + esc(p.role) + "</p>" +
        '<div class="pc-actions"><a class="btn btn-sm btn-primary" href="' + url + '">View project<span class="visually-hidden">: ' + esc(p.name) + "</span></a>" + extra + "</div>" +
      "</div>" +
    "</article>";
  }

  function byYearDesc(a, b) { return String(b.year).localeCompare(String(a.year)); }

  // Home page: featured projects carousel with dots.
  R.featured = function (el) {
    var items = PROJECTS.filter(function (p) { return p.featured; }).sort(byYearDesc);
    if (!items.length) items = PROJECTS.slice(0, 3);
    el.innerHTML =
      sectionTitle(el, "Projects") +
      '<div class="carousel">' +
        '<div class="carousel-track" role="region" aria-label="Featured projects, scroll sideways" tabindex="0">' +
          items.map(function (p) { return '<div class="carousel-slide">' + projectCard(p) + "</div>"; }).join("") +
        "</div>" +
        '<div class="carousel-dots" role="group" aria-label="Choose a featured project">' +
          items.map(function (p, i) { return '<button type="button" class="dot" data-i="' + i + '"><span class="visually-hidden">Show ' + esc(p.name) + "</span></button>"; }).join("") +
        "</div>" +
      "</div>" +
      '<div class="section-foot"><a class="btn btn-primary" href="/projects/">Search all projects</a></div>';

    var track = $(".carousel-track", el);
    var dotsWrap = $(".carousel-dots", el);
    var slides = $$(".carousel-slide", track);
    var dots = $$(".dot", dotsWrap);

    function step() {
      return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    }
    function update() {
      var overflow = track.scrollWidth > track.clientWidth + 4;
      dotsWrap.hidden = !overflow;
      var maxScroll = track.scrollWidth - track.clientWidth;
      var i = track.scrollLeft >= maxScroll - 4 ? slides.length - 1 : Math.round(track.scrollLeft / step());
      dots.forEach(function (d, n) { d.setAttribute("aria-current", n === i ? "true" : "false"); });
    }
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () {
        track.scrollTo({ left: slides[n].offsetLeft - slides[0].offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      });
    });
    var ticking = false;
    track.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  };

  // Projects page: search and filter without reloading.
  R.projects = function (el) {
    function unique(fn) {
      var set = {};
      PROJECTS.forEach(function (p) { [].concat(fn(p)).forEach(function (v) { if (v) set[v] = true; }); });
      return Object.keys(set);
    }
    function options(list, allLabel) {
      return '<option value="">' + allLabel + "</option>" + list.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + "</option>"; }).join("");
    }
    var cats = unique(function (p) { return p.category; }).sort();
    var techs = unique(function (p) { return p.technologies; }).sort(function (a, b) { return a.localeCompare(b); });
    var years = unique(function (p) { return String(p.year); }).sort().reverse();
    var types = unique(function (p) { return p.type; }).sort();

    el.innerHTML =
      sectionTitle(el, "All projects") +
      '<form class="filters" role="search" aria-label="Search and filter projects">' +
        '<div class="field field-search"><label for="f-q">Search projects</label><input id="f-q" name="q" type="search" placeholder="Name, technology, or keyword" autocomplete="off" maxlength="100"></div>' +
        '<div class="field"><label for="f-cat">Category</label><select id="f-cat" name="category">' + options(cats, "All categories") + "</select></div>" +
        '<div class="field"><label for="f-tech">Technology</label><select id="f-tech" name="tech">' + options(techs, "All technologies") + "</select></div>" +
        '<div class="field"><label for="f-year">Year</label><select id="f-year" name="year">' + options(years, "All years") + "</select></div>" +
        '<div class="field"><label for="f-type">Project type</label><select id="f-type" name="type">' + options(types, "All types") + "</select></div>" +
        '<button class="btn" type="reset">Clear filters</button>' +
      "</form>" +
      '<p class="results-count" id="results-count" aria-live="polite"></p>' +
      '<div class="project-grid" id="project-grid"></div>' +
      '<div class="empty-state" id="empty-state" hidden><p>No projects match these filters. Try a different keyword or clear the filters.</p><button class="btn" type="button" id="empty-reset">Clear filters</button></div>';

    var form = $("form", el);
    var grid = $("#project-grid", el);
    var count = $("#results-count", el);
    var empty = $("#empty-state", el);
    var sorted = PROJECTS.slice().sort(byYearDesc);

    function haystack(p) {
      return [p.name, p.description, p.category, p.type, p.year, p.role, p.status].concat(p.technologies || []).join(" ").toLowerCase();
    }

    function apply() {
      var q = form.q.value.trim().toLowerCase();
      var words = q ? q.split(/\s+/) : [];
      var cat = form.category.value, tech = form.tech.value, year = form.year.value, type = form.type.value;
      var results = sorted.filter(function (p) {
        if (cat && p.category !== cat) return false;
        if (tech && (p.technologies || []).indexOf(tech) === -1) return false;
        if (year && String(p.year) !== year) return false;
        if (type && p.type !== type) return false;
        var h = haystack(p);
        return words.every(function (w) { return h.indexOf(w) !== -1; });
      });
      grid.innerHTML = results.map(projectCard).join("");
      empty.hidden = results.length > 0;
      count.textContent = results.length === sorted.length
        ? "Showing all " + sorted.length + " projects"
        : "Showing " + results.length + " of " + sorted.length + " projects";
    }

    form.addEventListener("input", apply);
    form.addEventListener("change", apply);
    form.addEventListener("submit", function (e) { e.preventDefault(); apply(); });
    form.addEventListener("reset", function () { setTimeout(apply, 0); });
    $("#empty-reset", el).addEventListener("click", function () { form.reset(); form.q.focus(); });
    apply();
  };

  // Individual project page: /projects/<id>/
  R.project = function (el) {
    var id = el.getAttribute("data-project");
    var idx = -1;
    PROJECTS.forEach(function (p, i) { if (p.id === id) idx = i; });
    var p = PROJECTS[idx];
    if (!p) {
      el.innerHTML = '<section class="panel"><h2>This project could not be found</h2><p>It may have been renamed or removed.</p><p><a class="btn btn-primary" href="/projects/">Browse all projects</a></p></section>';
      return;
    }
    var L = p.links || {};
    var links = [
      ["Live website", L.live, "external"],
      ["GitHub", L.github, "github"],
      ["Documentation", L.docs, "link"],
      ["Demo", L.demo, "external"]
    ].filter(function (l) { return safeUrl(l[1]); });

    var linkHtml = links.length
      ? '<div class="btn-row">' + links.map(function (l, i) {
          return '<a class="btn btn-sm' + (i === 0 ? " btn-primary" : "") + '" href="' + safeUrl(l[1]) + '"' + externalAttrs() + ">" + icon(l[2]) + esc(l[0]) + "</a>";
        }).join("") + "</div>"
      : "";

    var prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(idx + 1) % PROJECTS.length];

    el.innerHTML =
      '<section class="panel" aria-labelledby="overview-title">' +
        '<div class="detail-grid">' +
          '<div><h2 id="overview-title">Project overview</h2><p>' + esc(p.overview || p.description) + "</p></div>" +
          '<aside class="detail-aside" aria-label="Project facts">' +
            '<dl class="facts">' +
              "<div><dt>Category</dt><dd>" + esc(p.category) + "</dd></div>" +
              "<div><dt>Type</dt><dd>" + esc(p.type) + "</dd></div>" +
              "<div><dt>Date</dt><dd>" + esc(p.date || p.year) + "</dd></div>" +
              "<div><dt>Status</dt><dd>" + esc(p.status) + "</dd></div>" +
              "<div><dt>My role</dt><dd>" + esc(p.role) + "</dd></div>" +
            "</dl>" +
            linkHtml +
          "</aside>" +
        "</div>" +
      "</section>" +
      '<section class="panel two-col" aria-label="Problem and solution">' +
        "<div><h2>The problem</h2><p>" + esc(p.problem) + "</p></div>" +
        "<div><h2>The solution</h2><p>" + esc(p.solution) + "</p></div>" +
      "</section>" +
      '<section class="panel" aria-labelledby="features-title"><h2 id="features-title">Features</h2><ul class="feature-list">' +
        (p.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") +
      "</ul></section>" +
      '<section class="panel" aria-labelledby="tech-title"><h2 id="tech-title">Technologies used</h2><ul class="chips">' +
        (p.technologies || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
      "</ul></section>" +
      ((p.screenshots || []).length
        ? '<section class="panel" aria-labelledby="shots-title"><h2 id="shots-title">Screenshots</h2><div class="shots">' +
            p.screenshots.map(function (s) {
              return '<figure><img src="' + safeUrl(s.src) + '" data-fallback="' + fallbackFor(s.src) + '" alt="' + esc(s.alt) + '" width="800" height="500" loading="lazy" decoding="async"><figcaption>' + esc(s.caption || s.alt) + "</figcaption></figure>";
            }).join("") +
          "</div></section>"
        : "") +
      '<section class="panel" aria-labelledby="role-title"><h2 id="role-title">My role</h2><p>' + esc(p.roleDetail || p.role) + "</p></section>" +
      '<nav class="detail-nav" aria-label="More projects">' +
        '<a class="btn" href="/projects/' + encodeURIComponent(prev.id) + '/">Previous: ' + esc(prev.name) + "</a>" +
        '<a class="btn" href="/projects/' + encodeURIComponent(next.id) + '/">Next: ' + esc(next.name) + "</a>" +
      "</nav>";
  };

  R.education = function (el) {
    var certs = (P.certifications || []).map(function (c) {
      var id = c.credentialId ? '<p class="muted">Credential ID: ' + esc(c.credentialId) + "</p>" : "";
      var verify = safeUrl(c.verifyUrl) ? '<p><a href="' + safeUrl(c.verifyUrl) + '"' + externalAttrs() + ">Verify credential</a></p>" : "";
      return '<li><p class="cred-title">' + esc(c.name) + '</p><p class="muted">' + esc(c.issuer) + ", " + esc(c.year) + "</p>" + id + verify + "</li>";
    }).join("");
    var licenses = (P.licenses || []).map(function (l) {
      return '<li><p class="cred-title">' + esc(l.name) + '</p><p class="muted">' + esc(l.issuer) + ", " + esc(l.year) + "</p></li>";
    }).join("");
    var eduCol =
      "<div><h3>Education</h3>" +
        '<ul class="cred-list">' + (P.education || []).map(function (e) {
          return '<li><p class="cred-title">' + esc(e.degree) + "</p><p>" + esc(e.school) + '</p><p class="muted">' + [e.major, e.year].filter(Boolean).map(esc).join(", ") + "</p></li>";
        }).join("") + "</ul>" +
      "</div>";
    // The credentials column only appears once you add certifications or licenses.
    var credCol = (certs || licenses)
      ? "<div>" +
          (certs ? '<h3>Certifications</h3><ul class="cred-list">' + certs + "</ul>" : "") +
          (licenses ? '<h3' + (certs ? ' class="edu-sub"' : "") + '>Licenses and eligibility</h3><ul class="cred-list">' + licenses + "</ul>" : "") +
        "</div>"
      : "";
    el.innerHTML =
      sectionTitle(el, "Education and credentials") +
      (credCol ? '<div class="two-col">' + eduCol + credCol + "</div>" : eduCol);
  };

  R.cv = function (el) {
    var cv = P.cv || {};
    var preview = el.hasAttribute("data-preview")
      ? '<div class="cv-preview"><iframe src="' + safeUrl(cv.file) + '#view=FitH" title="Preview of ' + esc(P.name) + '\'s CV" loading="lazy"></iframe></div>' +
        '<p class="fine">If the preview doesn\'t show on your device, use View CV online.</p>'
      : "";
    el.innerHTML =
      sectionTitle(el, "Curriculum vitae") +
      '<div class="cv-box"><p>My latest CV as a PDF, updated ' + esc(cv.updated) + ".</p>" +
        '<div class="btn-row center">' + cvButtons() + "</div>" +
      "</div>" + preview;
  };

  R.contact = function (el) {
    el.innerHTML =
      sectionTitle(el, "Contact") +
      '<div class="contact-grid">' +
        '<div class="contact-info">' +
          "<p>Have a project, a role, or a question? Send a message and I'll reply within two working days.</p>" +
          '<ul class="info-list">' +
            "<li>" + icon("mail") + '<a href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a></li>" +
            "<li>" + icon("phone") + '<a href="tel:' + esc(String(P.phone || "").replace(/[^+\d]/g, "")) + '">' + esc(P.phone) + "</a></li>" +
            "<li>" + icon("pin") + "<span>" + esc(P.location) + "</span></li>" +
          "</ul>" +
          "<h3>Find me online</h3>" + socialList() +
        "</div>" +
        '<form class="contact-form" novalidate>' +
          field("c-name", "name", "Name", '<input id="c-name" name="name" type="text" autocomplete="name" required maxlength="100">') +
          field("c-email", "email", "Email", '<input id="c-email" name="email" type="email" autocomplete="email" required maxlength="150">') +
          field("c-subject", "subject", "Subject", '<input id="c-subject" name="subject" type="text" required maxlength="150">') +
          field("c-message", "message", "Message", '<textarea id="c-message" name="message" required maxlength="5000"></textarea>') +
          '<div class="hp" aria-hidden="true"><label for="c-website">Leave this field empty</label><input id="c-website" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>' +
          '<div><button class="btn btn-primary" type="submit">Send message</button></div>' +
          '<p class="form-status" role="status" aria-live="polite"></p>' +
        "</form>" +
      "</div>";
    setupContactForm($(".contact-form", el));
  };

  function field(id, name, label, control) {
    return '<div class="field"><label for="' + id + '">' + label + "</label>" +
      control.replace("<input ", '<input aria-describedby="' + id + '-err" ').replace("<textarea ", '<textarea aria-describedby="' + id + '-err" ') +
      '<span class="error" id="' + id + '-err"></span></div>';
  }

  /* ---------- Contact form ---------- */
  function setupContactForm(form) {
    if (!form) return;
    var startedAt = Date.now();
    var status = $(".form-status", form);
    var button = $('button[type="submit"]', form);

    var rules = {
      name: function (v) { return v.length < 2 ? "Enter your name." : ""; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email address, like name@example.com."; },
      subject: function (v) { return v.length < 2 ? "Enter a subject." : ""; },
      message: function (v) { return v.length < 10 ? "Write a message of at least 10 characters." : ""; }
    };

    function check(name) {
      var input = form.elements[name];
      var msg = rules[name](input.value.trim());
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      $("#" + input.id + "-err", form).textContent = msg;
      return !msg;
    }

    Object.keys(rules).forEach(function (name) {
      form.elements[name].addEventListener("blur", function () { if (this.value) check(name); });
    });

    function setStatus(text, kind) {
      status.textContent = text;
      status.className = "form-status" + (kind ? " is-" + kind : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setStatus("", "");

      // Spam protection 1: bots fill the hidden field. Pretend it worked.
      if (form.elements._gotcha.value) { form.reset(); setStatus("Message sent. Thank you.", "success"); return; }

      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (!check(name) && !firstBad) firstBad = form.elements[name];
      });
      if (firstBad) { firstBad.focus(); setStatus("Check the highlighted fields and try again.", "error"); return; }

      // Spam protection 2: humans take more than 3 seconds to fill a form.
      if (Date.now() - startedAt < 3000) { setStatus("That was fast. Wait a moment, then send again.", "error"); return; }

      var id = String(P.formspreeId || "");
      if (!/^[A-Za-z0-9]+$/.test(id) || id === "YOUR_FORM_ID") {
        setStatus("The contact form isn't connected yet. Email me directly at " + P.email + ".", "error");
        return;
      }

      var data = new FormData(form);
      data.set("_subject", "Portfolio message: " + form.elements.subject.value.trim());
      button.disabled = true;
      button.textContent = "Sending…";

      fetch("https://formspree.io/f/" + id, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          startedAt = Date.now();
          $$("[aria-invalid]", form).forEach(function (i) { i.removeAttribute("aria-invalid"); });
          setStatus("Message sent. I'll reply within two working days.", "success");
        })
        .catch(function () {
          setStatus("Your message didn't send. Check your connection and try again, or email " + P.email + ".", "error");
        })
        .then(function () {
          button.disabled = false;
          button.textContent = "Send message";
        });
    });
  }

  /* ---------- Missing images ---------- */
  // If an image file hasn't been added yet, show its placeholder instead.
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img && img.tagName === "IMG" && img.getAttribute("data-fallback") && img.src.indexOf(img.getAttribute("data-fallback")) === -1) {
      img.src = img.getAttribute("data-fallback");
    }
  }, true);

  function fallbackFor(src) { return safeUrl(String(src || "").replace(/\.(png|jpe?g|webp|avif)$/i, ".svg")); }

  /* ---------- Start ---------- */
  function init() {
    renderHeader();
    $$("[data-render]").forEach(function (el) {
      var fn = R[el.getAttribute("data-render")];
      if (fn) {
        try { fn(el); } catch (err) { console.error("Could not render section:", el.id, err); }
      }
    });
    renderFooter();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
