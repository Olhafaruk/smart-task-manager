# ⭐ Smart Task Manager — React + FastAPI Microservices (Docker, RabbitMQ, PostgreSQL)

<p align="center">
  <a href="README.de.md"><img src="https://img.shields.io/badge/Deutsch-Lesen-black?style=for-the-badge" /></a>
  <a href="README.ua.md"><img src="https://img.shields.io/badge/Українська-Читати-yellow?style=for-the-badge" /></a>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/CI-GitHub%20Actions-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Messaging-RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" />
</p>

A modern, clean, and intuitive task management application with authentication, task filters, customizable UI themes, and a fully containerized microservices architecture.

---

## 💼 For Recruiters

This project is a **demo mini‑product** showcasing my engineering approach and architectural thinking.  
It demonstrates:

- Microservices architecture (FastAPI + RabbitMQ + PostgreSQL)  
- Clean service boundaries and scalable design  
- Production‑ready Docker orchestration  
- CI, healthchecks, environment configuration  
- Strong testing culture (frontend + backend, ~91% coverage)  
- UI/UX attention: themes, responsiveness, clean layout  

I’m open to opportunities to collaborate with a team on meaningful, technically interesting projects.

---

## 📱 UI Preview

<div align="center">

| Mobile | Register | Login |
|--------|----------|-------|
| <img src="./screenshots/mobile.png" height="360"/> | <img src="./screenshots/register.png" height="360"/> | <img src="./screenshots/login.png" height="360"/> |

| Eye Theme | Neumorphism | Edit Task |
|-----------|-------------|-----------|
| <img src="./screenshots/glassmorph.png" width="250"/> | <img src="./screenshots/neumorph.png" width="250"/> | <img src="./screenshots/edit.png" width="250"/> |

| Completed | Active | All Tasks |
|-----------|--------|-----------|
| <img src="./screenshots/completed.png" width="250"/> | <img src="./screenshots/active.png" width="250"/> | <img src="./screenshots/all.png" width="250"/> |

</div>

---

## 🏗️ Architecture Diagram

<p align="center">
  <img src="./docs/architecture-dark.svg" width="820" />
</p>

---

## 🚀 Tech Stack

### **Frontend**
- React + Vite + TypeScript  
- TailwindCSS  
- Context API  
- REST API integration  
- Nginx (production)

### **Backend**
- FastAPI (Auth, Tasks)  
- PostgreSQL (separate DB per service)  
- SQLAlchemy  
- RabbitMQ  
- Python Consumer  
- Docker Compose  
- Healthchecks  

---

## 🎨 Features

### **Tasks**
- Create, edit, delete  
- Filters: All / Active / Completed  
- Responsive UI  

### **Themes**
- Minimal  
- Neumorphism  
- Glassmorphism  
- Persistent theme  
- Settings panel  

### **Auth**
- Register / Login  
- JWT tokens  
- Protected routes  

### **Architecture**
- Microservices  
- Independent databases  
- RabbitMQ events  
- Nginx SPA  
- Full Docker orchestration  

---

## 📁 Project Structure

```
smart-task-manager/
├── services/
│   ├── auth-service/
│   ├── task-service/
│   └── notification-service/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── nginx.conf
│   ├── package.json
│   ├── vitest.config.ts
│   └── vite.config.ts
│
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## 🐳 Running the Project (Docker)

### **1. Create `.env`**

```env
AUTH_DB_USER=postgres
AUTH_DB_PASSWORD=postgres
AUTH_DB_NAME=auth_db

TASK_DB_USER=postgres
TASK_DB_PASSWORD=postgres
TASK_DB_NAME=tasks_db

RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest

VITE_AUTH_API_URL=http://auth-service:8001
VITE_TASK_API_URL=http://task-service:8002
```

### **2. Start all services**

```bash
make up
```

App will be available at:

```
http://localhost:5173
```

### **3. Useful commands**

```bash
make up
make down
make logs
make ps
make restart
```

---

## 🩺 Healthchecks

| Service               | Check                                      |
|----------------------|---------------------------------------------|
| auth-service         | `GET /health`                               |
| task-service         | `GET /health`                               |
| notification-service | RabbitMQ management API                     |
| rabbitmq             | `rabbitmq-diagnostics ping`                 |
| frontend             | `curl http://localhost`                     |

---

## 🧪 API Documentation

- **Auth Service** → http://localhost:8001/docs  
- **Task Service** → http://localhost:8002/docs  

---

## 🧪 Testing

### Frontend (Vitest + RTL)
- Auth flows  
- Task CRUD  
- Filters  
- Settings panel  
- Loading & error states  

### Backend (pytest)
- Auth routes  
- JWT logic  
- Task CRUD  
- RabbitMQ consumer  
- Coverage: **~91%**

---

## 🗺️ Roadmap

### ✅ Completed
- Microservices architecture  
- Docker orchestration  
- Multiple UI themes  
- JWT auth  
- Task filters  
- Nginx production build  

### 🚧 In Progress
- Integration tests  
- Architecture refactor  

### 🔮 Planned
- E2E tests  
- Dark mode improvements  
- User profile  
- Multi‑language UI  
- Deployment  

---

## 🤝 Contact

**GitHub:** https://github.com/Olhafaruk  
**Email:** farukolga2017@gmail.com
```

