# 🏋️‍♀️ FitTrack

**FitTrack** is a modern fitness tracking application — a full-stack web app designed to help users log, track, and manage their workout routines. With a clean, responsive interface built with React and a robust backend powered by Flask, FitTrack provides a seamless experience for monitoring fitness progress.

---

## 🚀 Features

- **User Authentication**  
  Secure user registration and login functionality.

- **Workout CRUD**  
  Create, read, update, and delete workouts with details like name, date, and notes.

- **Exercise Logging**  
  Add specific exercises to each workout, tracking metrics like sets, reps, and duration.

- **Dashboard Overview**  
  A welcoming dashboard that summarizes key stats and recent activity.

- **Detailed Views**  
  Drill down into specific workouts to see all logged exercises and notes.

- **Responsive Design**  
  A modern UI styled with Tailwind CSS that works beautifully on all screen sizes.

---

## 🧠 RESTful API

A well-structured backend API for managing all application data.

---

## 🛠 Tech Stack

### 🔹 Frontend
- **Framework:** React (with Vite)  
- **Styling:** Tailwind CSS  
- **Routing:** React Router  
- **API Communication:** Axios  
- **State Management:** React Context API  

### 🔸 Backend
- **Framework:** Flask  
- **ORM:** SQLAlchemy  
- **Database:** SQLite (for development)  
- **API Standards:** RESTful  

---

## 📁 Project Structure

The project is organized into two main parts: a `fittrack-frontend` directory and a `fittrack-backend` directory.

### Frontend Layout

├── api/
│ └── api.js # Centralized Axios instance
├── assets/ # Static assets like images
├── components/ # Reusable UI components (WorkoutCard, Forms, etc.)
├── pages/ # Page-level components (DashboardPage, LoginPage, etc.)
├── context/ # React Context for global state (e.g., AuthContext)
├── App.jsx # Root component with layout
├── main.jsx # Main application entry point
└── routes.jsx # All application routes defined

---

## 🧰 Getting Started

To get a local copy up and running, follow these simple steps.

### 🔧 Prerequisites
- Node.js & npm (or yarn/pnpm)
- Python & pip
- Git

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://your-repository-url/fittrack.git
cd fittrack
2. Set up the Backend
Navigate to the backend directory:

cd fittrack-server
Install dependencies & activate virtual environment:

pipenv install
pipenv shell
Run the Flask server:

flask run
The backend API will be running at: http://127.0.0.1:5000

3. Set up the Frontend
Navigate to the frontend directory:

cd fittrack-frontend
Install frontend dependencies:

npm install
Create a .env file:

echo "VITE_API_URL=http://127.0.0.1:5000" > .env

Start the development server:

npm run dev
The frontend will be available at: http://localhost:5173

📜 Available Scripts
(Frontend)
npm run dev       # Runs the app in development mode.
npm run build     # Builds the app for production.
npm run lint      # Lints the code for errors.
npm run preview   # Serves the production build locally.

🔌 API Endpoints
The backend provides the following RESTful endpoints:

Method	Endpoint	Description
POST	/register	Create a new user
POST	/login	Authenticate user & get a token
GET	/workouts	Get list of workouts for user
POST	/workouts	Create a new workout
GET	/workouts/:id	Get workout details
PATCH	/workouts/:id	Update a workout
DELETE	/workouts/:id	Delete a workout
POST	/workouts/:id/exercises	Add exercise to workout
PATCH	/exercises/:id	Update an exercise
DELETE	/exercises/:id	Delete an exercise