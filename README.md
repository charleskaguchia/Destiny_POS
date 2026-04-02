# Rural SME POS System (Destiny POS)

A lightweight, offline-first POS application tailored for SMEs in rural Kenya.

## Tech Stack

### Backend
- **Python / Django / DRF**
- **MySQL** (ACID compliant)
- **Celery & Redis** (Background tasks & Offline sync)
- **JWT** (Authentication)

### Frontend
- **React (Vite)**
- **Tailwind CSS** (MD3 Token System)
- **Dexie.js** (IndexedDB for offline storage)
- **Service Workers** (PWA features)

## Directory Structure

- `backend/`: Django REST API
- `frontend/`: React PWA
- `architecture.md`: Detailed system architecture
- `design.md`: UI/UX design specifications
- `prd.md`: Product requirements

## Getting Started

### Backend Setup
1. `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate venv: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Configure `.env`
6. Run migrations: `python manage.py migrate`
7. Start server: `python manage.py runserver`

### Frontend Setup
1. `cd frontend`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## Deployment
- Frontend: **Vercel**
- Backend & Database: **Railway**
