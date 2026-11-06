# Madhu Silks — Local Setup & Beginner's Guide

This guide explains step-by-step how to start and test both the Django backend and Next.js frontend on your local computer.

## Prerequisites
- **Node.js** (v18 or v22 installed)
- **Python** (v3.10, 3.11, or 3.12 installed)
- **Git**

---

## 1. Running the Django Backend
Open a terminal in the root folder (`c:\Users\HP\Desktop\Madhu Silks`):

```powershell
# 1. Activate the Python virtual environment
.\backend\venv\Scripts\Activate.ps1

# 2. Run migrations to ensure database tables are created
python backend\manage.py migrate

# 3. Seed demonstration saree catalog, admin user & categories
python backend\manage.py seed_data

# 4. Start the Django API server
python backend\manage.py runserver 8000
```
- The backend API will be running at `http://127.0.0.1:8000/`.
- Interactive API Documentation (Swagger): `http://127.0.0.1:8000/api/docs/`
- Django Administration: `http://127.0.0.1:8000/admin/`
  - Admin login: `admin@madhusilks.com`
  - Admin password: `Admin@MadhuSilks2026`

---

## 2. Running the Next.js Frontend
Open a **second terminal** window in the root folder:

```powershell
# 1. Navigate to the frontend folder
cd frontend

# 2. Start the development server
npm run dev
```
- The frontend will be running at `http://localhost:3000/`.
- Open your web browser and visit `http://localhost:3000/`.

---

## 3. Running Automated Tests
To run the automated backend test suite:

```powershell
python backend\manage.py test apps.core
```

To run a production frontend build:
```powershell
cd frontend
npm run build
```

