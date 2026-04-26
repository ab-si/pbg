# 🎲 Board Game Night Planner

A fun, shareable survey app to plan the perfect board game night with friends.
Built as a **monorepo** with a React frontend and Node.js/Express/MongoDB backend.

---

## 📁 Project Structure

```
board-game-night/
├── client/               # React + Vite + Tailwind frontend
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── WelcomeScreen.jsx
│       │   ├── ProgressBar.jsx
│       │   ├── StepCard.jsx
│       │   ├── SubmitScreen.jsx
│       │   └── steps/
│       │       ├── NameStep.jsx
│       │       ├── AvailabilityStep.jsx
│       │       ├── GamePreferencesStep.jsx
│       │       ├── FoodStep.jsx
│       │       └── DrinksStep.jsx
├── server/               # Express + MongoDB backend
│   ├── index.js
│   ├── models/
│   │   └── SurveyResponse.js
│   └── routes/
│       └── responses.js
├── .env                  # Environment variables (edit this!)
├── package.json          # Root workspace + scripts
└── README.md
```

---

## ⚡ Quick Start

### 1. Install all dependencies (from root)

```bash
npm install
```

### 2. Configure environment

Edit `.env` in the root:

```env
MONGO_URI=your_mongodb_connection_string_here
SERVER_PORT=5001
```

> Get a free MongoDB Atlas cluster at https://www.mongodb.com/atlas
> On macOS, `5000` is often already used by a system service, so `5001` is the safer local default.

### 3. Run both apps

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

---

## 🧩 Individual Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run client + server concurrently |
| `npm run client` | Frontend only |
| `npm run server` | Backend only |

---

## 🌐 API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/responses` | Save a survey response |
| `GET` | `/api/responses` | Fetch all responses |
| `GET` | `/api/health` | Health check |

---

## 🎨 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Lato font |
| Animations | CSS keyframes, canvas-confetti |
| Backend | Node.js, Express 4 |
| Database | MongoDB via Mongoose |
| Dev tooling | Nodemon, Concurrently |
