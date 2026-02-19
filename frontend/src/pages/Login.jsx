import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/authApi';
import { NavLink, useNavigate } from 'react-router-dom';
import FlashMessage from '../components/Flashmessage';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required');
      }

      const res = await loginUser(formData);
      await login(res.data.user, res.data.token);
      setFlash({ message: 'Login successful! Redirecting...', type: 'success' });
      setFormData({ email: '', password: '' });
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
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
              <svg className="w-10 h-10 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
            <p className="text-muted">Sign in to continue</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="input w-full pl-4 py-3"
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full py-3" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted">
                Don&apos;t have an account?{' '}
                <NavLink to="/register" className="text-accent-green font-semibold hover:underline">
                  Sign Up
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
