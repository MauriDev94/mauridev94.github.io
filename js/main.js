const translations = {
  en: {
    "hero.title": "Backend Developer · Python · FastAPI · Event-Driven Microservices · Clean Architecture",
    "hero.pitch": "I build production-grade REST APIs and event-driven systems with real test coverage — applying Clean Architecture, DDD and TDD from day one.",
    "hero.location": "Santiago, Chile · Remote · English C2 (EF SET 71/100)",
    "hero.downloadCv": "Download CV",
    "projects.heading": "Featured Projects",
    "projects.repo": "Repo",
    "projects.liveDemo": "Live demo",
    "projects.eventDriven.desc": "3 microservices communicating exclusively via RabbitMQ — idempotent consumers, dead-letter queues with retries, eventual consistency, and end-to-end correlation IDs. 138 tests with real PostgreSQL.",
    "projects.medbook.desc": "Medical appointment API (Django + DRF) with a full state machine, object-level RBAC and atomic transactions to prevent race conditions. 274 tests · 98.7% branch coverage.",
    "projects.monolith.desc": "Modular monolith (FastAPI + Django) with Clean Architecture and DDD. JWT, OAuth2, OTP and Google SSO — deployed to production on Render.",
    "stack.heading": "Tech Stack",
    "stack.languages": "Languages",
    "stack.frameworks": "Frameworks",
    "stack.messaging": "Messaging / Event-Driven",
    "stack.data": "Data",
    "stack.testing": "Testing",
    "stack.devops": "DevOps",
    "about.heading": "About Me",
    "about.text": "I build backend systems that hold up under pressure — distributed, tested and observable. Real coverage, clear architecture, and code a team can actually trust."
  },
  es: {
    "hero.title": "Backend Developer · Python · FastAPI · Microservicios Event-Driven · Clean Architecture",
    "hero.pitch": "Construyo APIs REST production-grade y sistemas event-driven con cobertura de tests real — aplicando Clean Architecture, DDD y TDD desde el día uno.",
    "hero.location": "Santiago, Chile · Remoto · Inglés C2 (EF SET 71/100)",
    "hero.downloadCv": "Descargar CV",
    "projects.heading": "Proyectos Destacados",
    "projects.repo": "Repo",
    "projects.liveDemo": "Demo en vivo",
    "projects.eventDriven.desc": "3 microservicios conectados exclusivamente por eventos vía RabbitMQ — consumers idempotentes, dead-letter queues con retries, eventual consistency y correlation IDs end-to-end. 138 tests con PostgreSQL real.",
    "projects.medbook.desc": "API de citas médicas (Django + DRF) con máquina de estados completa, RBAC por objeto y transacciones atómicas para prevenir race conditions. 274 tests · 98.7% branch coverage.",
    "projects.monolith.desc": "Monolito modular (FastAPI + Django) con Clean Architecture y DDD. JWT, OAuth2, OTP y Google SSO — desplegado en producción en Render.",
    "stack.heading": "Tech Stack",
    "stack.languages": "Lenguajes",
    "stack.frameworks": "Frameworks",
    "stack.messaging": "Mensajería / Event-Driven",
    "stack.data": "Datos",
    "stack.testing": "Testing",
    "stack.devops": "DevOps",
    "about.heading": "Sobre Mí",
    "about.text": "Construyo sistemas backend que aguantan bajo presión — distribuidos, testeados y observables. Cobertura real, arquitectura clara y código en el que un equipo puede confiar."
  }
};

const cvFiles = {
  en: "assets/CV_Mauricio_Salinas_EN.pdf",
  es: "assets/CV_Mauricio_Salinas.pdf"
};

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = translations[lang][key];
    if (text) el.textContent = text;
  });
  document.getElementById("cv-download").setAttribute("href", cvFiles[lang]);
  localStorage.setItem("lang", lang);
}

function detectInitialLanguage() {
  const stored = localStorage.getItem("lang");
  if (stored) return stored;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.getElementById("theme-toggle").textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

console.log("%cwow. such backend. very clean architecture. 🐕", "color:#2b6cb0; font-weight:bold; font-size:14px;");

function initStarField() {
  const container = document.querySelector(".hero__stars");
  if (!container) return;

  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const COLORS = ["#ffffff", "#ccd8ff", "#ffeeb0", "#e2d0ff", "#a8d8ff"];
  let stars = [];
  let raf;

  function buildStars() {
    stars = [];
    const w = canvas.width;
    const h = canvas.height;
    const total = Math.floor((w * h) / 3200);

    for (let i = 0; i < total; i++) {
      const roll = Math.random();
      const r = roll < 0.04
        ? 1.6 + Math.random() * 0.9
        : roll < 0.2
          ? 0.9 + Math.random() * 0.7
          : 0.3 + Math.random() * 0.5;

      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        base: 0.45 + Math.random() * 0.55,
        twinkle: Math.random() < 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0008,
      });
    }
  }

  function resize() {
    const hero = container.closest(".hero");
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    buildStars();
  }

  function draw(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      const op = s.twinkle
        ? s.base * (0.55 + 0.45 * Math.sin(ts * s.speed + s.phase))
        : s.base;

      ctx.globalAlpha = op;
      ctx.fillStyle = s.color;
      ctx.shadowBlur = s.r > 1.4 ? 6 : 0;
      ctx.shadowColor = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    raf = requestAnimationFrame(draw);
  }

  function syncTheme() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark && !raf) raf = requestAnimationFrame(draw);
    if (!dark && raf) { cancelAnimationFrame(raf); raf = null; }
  }

  window.addEventListener("resize", resize);
  new MutationObserver(syncTheme).observe(document.documentElement, {
    attributes: true, attributeFilter: ["data-theme"]
  });

  resize();
  raf = requestAnimationFrame(draw);
  syncTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = detectInitialLanguage();
  applyLanguage(currentLang);

  document.getElementById("lang-toggle").addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    applyLanguage(currentLang);
  });

  const storedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(storedTheme);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  initStarField();
});
