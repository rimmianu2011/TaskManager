# ✅ Full-Stack To-Do Manager

A modern full-stack task management application built with **React** on the frontend and **Django REST Framework** on the backend. Users can add, edit, and delete tasks using a clean modal UI, while data is persisted via RESTful API endpoints. Styled with custom CSS, the app offers both interactive UX and scalable backend integration.

![React](https://img.shields.io/badge/frontend-React-blue?logo=react)
![Django](https://img.shields.io/badge/backend-Django-green?logo=django)
![API](https://img.shields.io/badge/API-REST-red?logo=fastapi)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🧠 Features

- 📝 Add tasks with title, description, due date, and priority
- ✏️ Edit or delete existing tasks with ease
- 🎯 Priority color coding: High (🔴), Medium (🟠), Low (🟢)
- 🧩 Modal-based UI for focused input
- 🔄 LocalStorage caching for faster load
- 🌐 Fully integrated with Django REST API

---

## 🧱 Tech Stack

### Frontend
- React (Hooks + Functional Components)
- Vite (Lightning-fast build tool)
- Vanilla CSS (Animations + Responsive Design)
- Font Awesome (Icons)
- LocalStorage for client-side persistence

### Backend
- Django
- Django REST Framework (CRUD API)
- SQLite (default) – easily switchable to PostgreSQL
- ASGI + CORS-ready setup

---

## ⚙️ Getting Started

### Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # or `env\Scripts\activate` on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
