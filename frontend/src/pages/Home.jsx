import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      <div className="card p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Habit Tracker</h1>
        <p className="text-muted mb-2">Track your habits, build streaks, and stay consistent.</p>
        <p className="text-muted mb-8">Developed and designed by Pulkit Khowal.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-ghost border border-border">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
