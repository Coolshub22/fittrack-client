import React from "react";
import { Link } from "react-router-dom";
import {
  Dumbbell,
  BarChart3,
  Sparkles,
  Trophy,
  UserPlus,
  LogIn,
} from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 flex flex-col items-center justify-center py-16 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-sky-500 opacity-20 rounded-full blur-3xl top-0 -left-10 animate-pulse" />
      <div className="absolute w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />

      {/* Hero Section */}
      <section className="text-center max-w-4xl z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-sky-400 mb-6 drop-shadow-lg">
          Unlock Your Full Fitness Potential
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Track your workouts, monitor progress, and crush goals with our
          all-in-one fitness tracker.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 border border-sky-500 text-sky-400 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <UserPlus className="w-5 h-5" />
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 border border-yellow-400 text-yellow-300 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <LogIn className="w-5 h-5" />
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mt-16 p-8 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-sky-400 text-center mb-10">
          Why Choose FitTrack?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Intuitive Workout Logging",
              text: "Log sets, reps, weight, duration, and distance with ease.",
              video: "https://player.vimeo.com/external/4804787.sd.mp4?loop=1",
            },
            {
              title: "Metric-Based Insights",
              text: "Track your personal bests, workout streaks, and more.",
              video: "https://player.vimeo.com/external/4745805.sd.mp4?loop=1",
            },
            {
              title: "Custom Workouts",
              text: "Build routines from scratch or use templates tailored to your goals.",
              video: "https://player.vimeo.com/external/4761426.sd.mp4?loop=1",
            },
            {
              title: "Challenge Your Limits",
              text: "Push for streaks, improve your PBs, and stay accountable.",
              video: "https://player.vimeo.com/external/4761428.sd.mp4?loop=1",
            },
            {
              title: "Get Started Quickly",
              text: "Sign up and track your first workout in minutes.",
              video: "https://player.vimeo.com/external/3195534.sd.mp4?loop=1",
            },
            {
              title: "All-in-One Dashboard",
              text: "Manage your workouts, stats, and streaks—all in one place.",
              video: "https://player.vimeo.com/external/4057407.sd.mp4?loop=1",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-4 rounded-xl shadow-md border border-slate-700 hover:border-sky-500 transform hover:scale-[1.02] transition flex flex-col items-center text-center space-y-3"
            >
              <video
                src={item.video}
                muted
                autoPlay
                loop
                playsInline
                className="rounded-md w-full h-36 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm z-10">
        <p>
          &copy; {new Date().getFullYear()} FitTrack. Built for your best self.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
