# 🧠 QuizApp — Interactive Exam Generator

A full-stack quiz application built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can register, take timed quizzes, track their scores, and compete on the leaderboard. Admins can create and manage quizzes and questions.

---

## 🔗 Live Demo

| | Link |
|---|---|
| **Frontend** | [https://your-app.netlify.app](https://your-app.netlify.app) |
| **Backend API** | [https://your-api.onrender.com](https://your-api.onrender.com) |

> Replace the links above with your actual deployment URLs.

---

## 📸 Screenshots

> Add screenshots of the Home, Quiz, Profile, and Leaderboard pages here.

---

## ✨ Features

### 🔐 Authentication
- User registration with **email verification** (token expires in 15 min)
- JWT-based login with **1-hour session**
- **Forgot password** and **reset password** via email
- Change password for logged-in users
- Protected and public route guards

### 📋 Quiz System
- Browse all available quizzes by category and difficulty
- Timed quizzes with a countdown
- Multiple-choice questions (4 options each)
- Instant result calculation after submission
- Detailed **answer review** — see which answers were right/wrong

### 👤 User Profile & Rankings
- Personal stats: total score, quiz count, correct answers
- Three-tier **ranking system**:
  - 🥉 **Bürünc (Bronze)** — 0 to 99 points
  - 🥈 **Gümüş (Silver)** — 100 to 299 points
  - 🥇 **Qızıl (Gold)** — 300+ points
- Visual progress bar showing how close you are to the next rank

### 🏆 Leaderboard
- Top 10 users ranked by total score
- Displayed on the home page
- Updates after every quiz submission

### 🛠️ Admin Panel
- Create, edit, publish, and delete quizzes
- Add questions to any quiz
- View quiz results and statistics
- Toggle publish status per quiz

### 📊 Site Statistics
- Live count of total users, quizzes, and questions
- Displayed on the home page and admin panel

### 📧 Email Notifications
- Email verification on registration
- Password reset email with secure token

---

## 🗂️ Project Structure

```
exam-generator/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── pages/           # All route pages
│       ├── components/      # Reusable UI components
│       ├── layouts/         # MainLayout, DashboardLayout
│       ├── context/         # Auth context (global state)
│       ├── hooks/           # Custom hooks (useAuth)
│       └── api/             # Axios instance + interceptors
│
└── server/                  # Node.js + Express backend
    └── src/
        ├── controllers/     # Business logic
        ├── routes/          # API route definitions
        ├── models/          # Mongoose schemas
        ├── middlewares/     # Auth middleware (JWT)
        ├── config/          # Database connection
        └── utils/           # Email service (Nodemailer)
```

---

## 🧰 Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM 7 | Client-side routing |
| Vite | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| Axios | HTTP requests |
| React Toastify | Toast notifications |
| React Icons | Icon library |
| Day.js | Date formatting |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express 5 | Web server & API |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| Nodemailer + Brevo | Transactional emails |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin requests |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- A **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A **Brevo** (formerly Sendinblue) account for email — or any SMTP provider

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/exam-generator.git
cd exam-generator
```

---

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=8001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quiz_app

JWT_SECRET=your_jwt_secret_here
EMAIL_SECRET=your_email_secret_here

CLIENT_URL=http://localhost:5173

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
```

Start the backend:

```bash
npm run dev
```

The API will run on `http://localhost:8001`.

---

### 3. Set up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:8001
```

Start the frontend:

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

---

## 📖 How to Use the App

### As a Guest
1. Open the app — you'll land on the **Home** page.
2. Browse the **Quiz Arena** to see all available quizzes.
3. Click **Start Quiz** on any quiz card to begin.
4. Answer each question and submit — your score is shown instantly.

### As a Registered User
1. Click **Register** and fill in your name, username, email, and password.
2. Check your email for a **verification link** and confirm your account.
3. **Log in** with your email and password.
4. Take quizzes — your scores are saved to your profile automatically.
5. Visit your **Profile** page to see your rank, total score, and quiz history.
6. Check the **Leaderboard** on the home page to see where you stand.

### As an Admin
1. Log in with an admin account.
2. Navigate to `/admin/quizzes` to access the admin panel.
3. Click **Create Quiz** — fill in title, description, category, duration, and difficulty.
4. After creating a quiz, click **Add Questions** to add multiple-choice questions.
5. Set the correct answer for each question.
6. **Publish** the quiz to make it visible to users.
7. You can edit, unpublish, or delete any quiz at any time.

---

## 🌐 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and get JWT |
| GET | `/confirm-email/:token` | Verify email address |
| POST | `/request-password-reset` | Send reset email |
| POST | `/reset-password` | Reset password via token |
| GET | `/me` | Get current user (auth required) |
| PATCH | `/update-profile` | Update name / username |
| PATCH | `/change-password` | Change password (auth required) |

### Quizzes — `/api/quizzes`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all quizzes |
| POST | `/` | Create a quiz |
| GET | `/:id` | Get quiz with questions |
| PUT | `/:id` | Update quiz |
| DELETE | `/:id` | Delete quiz |
| PATCH | `/:id/publish` | Toggle publish status |
| GET | `/:quizId/questions` | Get questions for a quiz |
| POST | `/:id/submit` | Submit quiz answers |
| GET | `/:id/results` | Get quiz results (admin) |

### Questions — `/api/questions`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a question |
| GET | `/` | Get all questions |
| POST | `/submit` | Submit quiz answers |

### Results — `/api/results`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/me` | Get my quiz history (auth required) |
| GET | `/leaderboard` | Get top 10 users |

### Stats — `/api/stats`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get site-wide statistics |

---

## 🗄️ Database Models

### User
```
name, surname, username, email, password (hashed),
role (user/admin), isVerified, scores[], completedQuizzes[]
```

### Quiz
```
title, description, category, duration (seconds),
difficulty (easy/medium/hard), isPublished
```

### Question
```
quizId (ref Quiz), questionText, options[{text}],
correctAnswer (index), difficulty
```

### Result
```
user (ref User), quiz (ref Quiz), score,
answers[{question, isCorrect, selectedOption}]
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

*Built with ❤️ by [Aghakarim](https://github.com/Aghakarim-23)*
