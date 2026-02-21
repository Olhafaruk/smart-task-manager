# Smart Task Manager — React + FastAPI Мікросервіси (Docker, RabbitMQ, PostgreSQL)

<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-Read-blue?style=for-the-badge" /></a>
  <a href="README.de.md"><img src="https://img.shields.io/badge/Deutsch-Lesen-black?style=for-the-badge" /></a>
</p>

Сучасний, зручний та інтуїтивний застосунок для управління задачами з аутентифікацією, фільтрами, кастомними UI‑темами та повністю контейнеризованою мікросервісною архітектурою.

---

## 💼 Для рекрутерів

Цей проєкт — **демо міні‑продукт**, який демонструє:

- Мікросервісну архітектуру (FastAPI + RabbitMQ + PostgreSQL)  
- Чіткі межі сервісів та масштабованість  
- Продакшн‑готову Docker‑оркестрацію  
- CI, healthchecks, конфігурацію середовищ  
- Високу культуру тестування (~91% покриття)  
- Увагу до UI/UX: теми, адаптивність, чистий інтерфейс  

Відкрита до можливостей співпраці над технічно цікавими проєктами.

---

## 📱 UI Прев’ю

<div align="center">

| Мобільна | Реєстрація | Логін |
|----------|------------|-------|
| <img src="./screenshots/mobile.png" height="360"/> | <img src="./screenshots/register.png" height="360"/> | <img src="./screenshots/login.png" height="360"/> |

| Eye Theme | Neumorphism | Редагування |
|-----------|-------------|-------------|
| <img src="./screenshots/glassmorph.png" width="250"/> | <img src="./screenshots/neumorph.png" width="250"/> | <img src="./screenshots/edit.png" width="250"/> |

| Завершені | Активні | Усі |
|-----------|---------|-----|
| <img src="./screenshots/completed.png" width="250"/> | <img src="./screenshots/active.png" width="250"/> | <img src="./screenshots/all.png" width="250"/> |

</div>

---

## 🏗️ Архітектурна діаграма

<p align="center">
  <img src="./docs/architecture-dark.svg" width="820" />
</p>

---

## 🚀 Технології

### **Frontend**
- React + Vite + TypeScript  
- TailwindCSS  
- Context API  
- REST API  
- Nginx (production)

### **Backend**
- FastAPI (Auth, Tasks)  
- PostgreSQL (окремі БД)  
- SQLAlchemy  
- RabbitMQ  
- Python Consumer  
- Docker Compose  
- Healthchecks  

---

## 🎨 Функції

### **Задачі**
- Створення, редагування, видалення  
- Фільтри: Усі / Активні / Завершені  
- Адаптивний інтерфейс  

### **Теми**
- Minimal  
- Neumorphism  
- Glassmorphism  
- Збереження теми  
- Панель налаштувань  

### **Авторизація**
- Реєстрація / Логін  
- JWT токени  
- Захищені маршрути  

### **Архітектура**
- Мікросервіси  
- Окремі бази даних  
- Події RabbitMQ  
- Nginx SPA  
- Повна Docker‑оркестрація  

---

## 📁 Структура проєкту

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
└── README.ua.md
```

---

## 🐳 Запуск проєкту (Docker)

### **1. Створити `.env`**

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

### **2. Запустити всі сервіси**

```bash
make up
```

Додаток буде доступний за адресою:

```
http://localhost:5173
```

### **3. Корисні команди**

```bash
make up
make down
make logs
make ps
make restart
```

---

## 🩺 Healthchecks

| Сервіс               | Перевірка                                   |
|----------------------|----------------------------------------------|
| auth-service         | `GET /health`                                |
| task-service         | `GET /health`                                |
| notification-service | RabbitMQ management API                      |
| rabbitmq             | `rabbitmq-diagnostics ping`                  |
| frontend             | `curl http://localhost`                      |

---

## 🧪 API Документація

- **Auth Service** → http://localhost:8001/docs  
- **Task Service** → http://localhost:8002/docs  

---

## 🧪 Тестування

### Frontend (Vitest + RTL)
- Авторизація  
- CRUD задач  
- Фільтри  
- Налаштування  
- Стани завантаження та помилок  

### Backend (pytest)
- Маршрути авторизації  
- JWT логіка  
- CRUD задач  
- RabbitMQ consumer  
- Покриття: **~91%**

---

## 🤝 Контакти

**GitHub:** https://github.com/Olhafaruk  
**Email:** farukolga2017@gmail.com
```
