# Mauricio Salinas

**Back-end Developer · Python · FastAPI · Event-Driven Microservices · Clean Architecture**

Santiago, Chile · maundrex@gmail.com · +56 9 4758 6414
[mauridev94.github.io](https://mauridev94.github.io) · [github.com/MauriDev94](https://github.com/MauriDev94) · [linkedin.com/in/mauricio-salinas-rubio](https://linkedin.com/in/mauricio-salinas-rubio) · **English C2 (EF SET 71/100)** · Open to remote work

---

## Summary

Backend developer focused on **Python**, **REST APIs**, and **event-driven microservices**. I build services with **FastAPI** and **Django/DRF** applying **SOLID, Clean Architecture, DDD, and TDD** — spec first, implementation backed by real test coverage. Experienced in **PostgreSQL**, **messaging with RabbitMQ** (idempotency, dead-letter queues, eventual consistency), advanced authentication (JWT/OAuth2/OTP/SSO), **observability** (JSON logging + correlation IDs), and **CI/CD pipelines with GitHub Actions**. English C2 for technical documentation and remote teamwork.

---

## Experience

### Backend Development — Portfolio Projects (Independent)
*Santiago, Chile · Apr 2025 – Present*

Building production-grade REST APIs as a professional portfolio, focused on patterns that come up in senior backend interviews.

- Designed and developed REST APIs with **FastAPI** and **Django/DRF** applying Clean Architecture, SOLID, DDD, and TDD.
- Designed **event-driven microservices systems** (RabbitMQ): idempotency, dead-letter queues, retries with backoff, eventual consistency, and end-to-end correlation IDs.
- Advanced authentication: **JWT, OAuth2, OTP, password reset, and Google login via SSO**.
- ORM query optimization (`select_related`/`prefetch_related`, zero N+1), atomic transactions, and *race-condition* prevention.
- Object-level **role-based access control (RBAC)** and brute-force **rate limiting**.
- Cross-cutting middleware: structured logging, error handling, and security.
- **CI/CD** pipelines with GitHub Actions (lint, automated tests, coverage, Codecov reporting) and continuous cloud deployment (Render).
- Containerization with **Docker** and **PostgreSQL** schema design with migrations.

### Support Analyst
*Cadaques (Domino) · Santiago, Chile · Apr 2023 – Jul 2024*

- Managed and maintained **SQL** databases; strategic reporting for operations.
- Built **Python scripts** to automate operational processes, reducing repetitive manual work.
- Monitored and configured enterprise network infrastructure.

---

## Projects

### Event-Driven Orders — Microservices with RabbitMQ
`Python 3.12 · FastAPI · RabbitMQ (aio-pika) · PostgreSQL 16 · Pydantic v2 · Docker Compose · pytest · testcontainers · structlog · GitHub Actions`

E-commerce order processing system with **3 microservices** (order, inventory, notification) communicating exclusively through **events** via RabbitMQ, applying Clean Architecture + DDD in each service.

- **Idempotency** in consumers (`processed_events` with `INSERT ... ON CONFLICT DO NOTHING`): a redelivered event does not duplicate business effects.
- **Atomicity anti race-condition** on stock reservation (conditional `UPDATE` + row-level locking + `SAVEPOINT`).
- **Dead-letter queues + retries with backoff** (3 stages) with transient/permanent failure classification.
- **Eventual consistency** via event choreography, no distributed transaction.
- **Observability**: structured JSON logging + **end-to-end correlation ID** (HTTP → events → 3 services) and robust broker reconnection.
- **database-per-service** (Postgres per service); **138 tests** with testcontainers (real PostgreSQL).
- **CI/CD**: GitHub Actions with per-service matrix (lint + mypy + tests).

Repo: [github.com/MauriDev94/event-driven-orders](https://github.com/MauriDev94/event-driven-orders)

### MedBook API — Medical appointment booking with Django + DRF
`Python 3.12 · Django 5.1 · DRF · PostgreSQL 16 · simplejwt · drf-spectacular · pytest · factory-boy · Docker · GitHub Actions · Codecov`

REST API for managing medical appointments, covering the full booking lifecycle: doctors publish schedules, the system generates concrete slots, and patients book them, moving through a **state machine** (pending → confirmed → completed / cancelled / no-show).

- **274 tests · 98.7% branch coverage · 0 failures** — built with **strict TDD** (Red-Green-Refactor) and `--cov-fail-under` enforced in CI.
- **RBAC** with 8 permission classes and object-level role-based access (doctor/patient/admin).
- **Atomic transactions + atomic UPDATE** to prevent *race conditions* when booking concurrent slots.
- ORM optimization: `select_related`/`prefetch_related` (zero N+1), `annotate()`/`Q()` for queries.
- **OpenAPI 3** documentation with drf-spectacular (Swagger UI) and email notifications (django-anymail/Resend).
- **Rate limiting** (AnonRateThrottle) for brute-force protection on login.
- **CI/CD**: GitHub Actions with lint (ruff), tests against real PostgreSQL, and coverage to Codecov.

Repo: [github.com/MauriDev94/MedBook](https://github.com/MauriDev94/MedBook) · Live (Swagger UI): [medbook-oiio.onrender.com/api/docs](https://medbook-oiio.onrender.com/api/docs/)

### API Monolith — Modular monolith with Clean Architecture
`Python · FastAPI · PostgreSQL · SQLAlchemy · Alembic · Pytest · Docker · JWT · OAuth2 · OTP · SSO · GitHub Actions · Render`

REST API built with **FastAPI** applying Clean Architecture, SOLID, and DDD. Independent modules: **Auth, Users, Todos, and Notifications**. Auth includes JWT/OAuth2, OTP, password reset, and Google login via SSO.

- Middleware for logging, error handling, and cross-cutting security.
- PostgreSQL schemas with **SQLAlchemy** and migrations with **Alembic**.
- **CI/CD** pipeline with GitHub Actions: lint (ruff, black), Pytest suite with 70% minimum coverage.
- **Deployed to production on Render.**

Repo: [github.com/MauriDev94/Api_monolith](https://github.com/MauriDev94/Api_monolith) · Live (Swagger UI): [api-monolith.onrender.com/docs](https://api-monolith.onrender.com/docs)

---

## Technical Skills

- **Languages:** Python, SQL
- **Frameworks:** FastAPI, Django, Django REST Framework (DRF)
- **Messaging / event-driven:** RabbitMQ (aio-pika), idempotency, dead-letter queues, retries with backoff, eventual consistency
- **Databases:** PostgreSQL, MongoDB — schema design and queries, ORM optimization (zero N+1)
- **ORM & migrations:** SQLAlchemy, Alembic, Django ORM
- **Testing:** Pytest, pytest-django, TDD, factory-boy, testcontainers, unit & integration tests, coverage.py
- **Auth & security:** JWT, OAuth2, OTP, SSO, Google Login, RBAC, rate limiting (throttling)
- **API:** REST, OpenAPI 3 / Swagger (drf-spectacular), endpoint design, versioning
- **CI/CD:** GitHub Actions (lint, tests, coverage, artifacts), Codecov, pre-commit
- **DevOps:** Docker, Git, GitHub, cloud deployment (Render)
- **Observability:** structlog (JSON logging), end-to-end correlation IDs
- **Quality & methodologies:** SOLID, design patterns, Clean Code, ruff, black · Clean Architecture, DDD, TDD, SDD, event-driven microservices, database-per-service, Modular Monolith

---

## Languages

- **Spanish:** Native
- **English:** **C2 Proficient — EF SET 71/100** (technical documentation and communication with remote teams)

---

## Education

**Programmer Analyst** — Instituto Profesional Santo Tomás · Santiago, Chile · Mar 2021 – Jul 2025
