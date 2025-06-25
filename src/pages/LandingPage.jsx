import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-sky-400 mb-6">
          Unlock Your Full Fitness Potential
        </h1>
        <p className="text-xl sm:text-2xl text-gray-100 mb-8">
          Track your workouts, monitor your progress, and achieve your health goals with ease.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/register"
            className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-gray-800 text-gray-100 px-8 py-3 rounded-lg font-semibold text-lg border border-gray-800 hover:border-sky-500 hover:text-sky-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mt-16 p-8 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-sky-400 text-center mb-10">
          Why Choose FitnessApp?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Intuitive Workout Tracking</h3>
            <p className="text-gray-400">Easily log sets, reps, and weights for every exercise.</p>
          </div>
          <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Visualize Your Progress</h3>
            <p className="text-gray-400">See your strength gains and fitness journey unfold with detailed charts.</p>
          </div>
          <div className="text-center bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Customizable Workouts</h3>
            <p className="text-gray-400">Create your own routines or choose from pre-built programs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} FitnessApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;