import React from 'react';
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      <div className="card p-8 max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-accent-green mb-4">404</h1>
        <p className="text-primary text-lg mb-6">Page not found.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
