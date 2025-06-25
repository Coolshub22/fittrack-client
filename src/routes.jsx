import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import WorkoutsPage from './pages/WorkoutsPage.jsx';
import WorkoutDetailPage from './pages/WorkoutDetailPage.jsx';
import CreateWorkoutPage from './pages/CreateWorkoutPage.jsx';
import EditWorkoutPage from './pages/EditWorkoutPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProgressPage from './pages/ProgressPage.jsx';



export const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'workouts', element: <WorkoutsPage /> },
          { path: 'workouts/new', element: <CreateWorkoutPage /> },
          { path: 'workouts/edit/:id', element: <EditWorkoutPage /> },
          { path: 'workouts/:id', element: <WorkoutDetailPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'progress', element: <ProgressPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },      
    ],
  },
]);
