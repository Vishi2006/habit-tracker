import React, { useState } from 'react';
import { registerUser } from '../services/authApi';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import FlashMessage from '../components/Flashmessage';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [flash, setFlash] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      throw new Error('All fields are required');
    }
    if (formData.name.length < 3) {
      throw new Error('Name must be at least 3 characters');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error('Invalid email format');
    }
    if (formData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      validateForm();
      await registerUser(formData);
      setFlash({ message: 'Registration successful! Redirecting to login...', type: 'success' });
      setFormData({ name: '', email: '', password: '' });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Registration failed';
      setFlash({ message: msg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg p-4">
      {flash && <FlashMessage {...flash} onClose={() => setFlash(null)} />}
      <div className="w-full max-w-md">
        <div className="card rounded-2xl overflow-hidden">
          <div className="bg-surface border-b border-border p-8 text-center">
            <div className="w-20 h-20 bg-bg rounded-full mx-auto mb-4 flex items-center justify-center border border-border">
              <svg className="w-10 h-10 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
            <p className="text-muted">Join us today and get started</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-muted mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="input w-full pl-4 py-3"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-muted mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="username"
                  className="input w-full pl-4 py-3"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-muted mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 6 characters)"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="input w-full pl-4 py-3"
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full py-3" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted">
                Already have an account?{' '}
                <NavLink to="/login" className="text-accent-cyan font-semibold hover:underline">
                  Sign In
                </NavLink>
              </p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted">All rights reserved by Pulkit Khowal.</p>
        <p className="mt-1 text-center text-sm text-muted">Protected by JWT & bcrypt</p>
      </div>
    </div>
  );
}
