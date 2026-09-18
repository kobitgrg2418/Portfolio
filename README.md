# Kobit Gurung — Portfolio

Django REST backend + Next.js frontend. The page looks and behaves like the original static site; copy is stored in Django and editable in admin.

## Run locally

Two terminals:

**Backend**

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_portfolio
python manage.py runserver
```

API: `http://127.0.0.1:8000/api/portfolio/`  
Admin: `http://127.0.0.1:8000/admin/` (after seed: `admin` / `admin` — change this)

**Frontend**

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

`frontend/.env.local` should point at Django:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

If Django is down, the frontend still renders from a built-in snapshot of the same content.

## Edit content

Use Django admin for profile, skills, projects, timeline, and contact channels. Contact form submissions appear under **Contact messages**.
