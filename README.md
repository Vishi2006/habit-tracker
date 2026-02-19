# Smart Habit Tracker (MERN)

A full-stack habit tracking app. Users can register, log in (JWT + bcrypt), create and manage habits, toggle completion per day, and view streaks and analytics.

## Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Auth:** JWT (httpOnly cookie), bcrypt

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file with:

- `MONGO_URI` – MongoDB connection string
- `JWT_KEY` – secret for signing JWT
- `EXPRESS_SESSION_SECRECT` – session secret (typo kept for compatibility)
- `PORT` – optional, defaults to 5000

Run:

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env` with:

- `VITE_API_BASE_AUTH_URL` – e.g. `http://localhost:5000/auth`
- `VITE_API_BASE_HABIT_URL` – e.g. `http://localhost:5000/habit`

Run:

```bash
npm run dev
```

## Features

- Register / login (password hashed with bcrypt, JWT in cookie)
- Create, edit, delete habits (title, frequency: daily/weekly)
- Toggle habit completion for today
- Streaks: consecutive days with at least one completion; recalculated on toggle
- Dashboard: stats (total habits, completed today, longest streak), habit list, analytics (weekly completion, distribution, streak progress, monthly trend, leaderboard)

## Project structure

- `backend/` – Express API, auth + habit routes, MongoDB models
- `frontend/src/` – React app: `pages/`, `components/` (Habit, Dashboard, Charts), `hooks/` (useHabits), `context/` (Auth), `services/` (API), `routes/`
