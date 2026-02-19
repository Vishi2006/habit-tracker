import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHabits } from '../hooks/useHabits';
import { logoutUser, deleteUser } from '../services/authApi';
import StatsCards from '../components/Dashboard/StatsCards';
import HabitList from '../components/Dashboard/HabitList';
import HabitForm from '../components/Habit/HabitForm';
import AnalyticsDashboard from '../components/Charts/AnalyticsDashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const {
    habits,
    loading,
    totalHabits,
    completedToday,
    currentStreak,
    handleCreateHabit,
    handleUpdateHabit,
    handleDeleteHabit,
    handleToggleComplete,
  } = useHabits(token);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // API may fail (expired token, etc.) - still clear local state
    } finally {
      logout();
      navigate('/login');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      await deleteUser();
      logout();
      navigate('/register');
    } catch (error) {
      alert('Failed to delete account. Please try again.');
    }
  };

  const onCreate = async (data) => {
    const result = await handleCreateHabit(data);
    if (result.success) setShowCreateForm(false);
    else if (result.message) alert(result.message);
  };

  const onUpdate = async (id, data) => {
    const result = await handleUpdateHabit(id, data);
    if (result.success) setEditingHabit(null);
    else if (result.message) alert(result.message);
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this habit?')) return;
    const result = await handleDeleteHabit(id);
    if (!result.success && result.message) alert(result.message);
  };

  const onToggle = async (id) => {
    const result = await handleToggleComplete(id);
    if (!result.success && result.message) alert(result.message);
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Welcome, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-sm text-muted">Track your habits, build your future</p>
          </div>

          <div>
          <button type="button" onClick={handleLogout} className="btn btn-ghost text-accent-red">
            Logout
          </button>
          <button type="button" onClick={handleDeleteAccount} className="btn btn-ghost text-accent-red">
              Delete Account
          </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StatsCards
          totalHabits={totalHabits}
          completedToday={completedToday}
          currentStreak={currentStreak}
        />

        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowCreateForm((v) => !v)}
            className="btn btn-primary"
          >
            {showCreateForm ? '✕ Cancel' : '+ Create New Habit'}
          </button>
        </div>

        {(showCreateForm || editingHabit) && (
          <HabitForm
            habit={editingHabit}
            onSubmit={
              editingHabit
                ? (data) => onUpdate(editingHabit._id, data)
                : onCreate
            }
            onCancel={() => {
              setShowCreateForm(false);
              setEditingHabit(null);
            }}
          />
        )}

        <HabitList
          habits={habits}
          loading={loading}
          onToggle={onToggle}
          onEdit={setEditingHabit}
          onDelete={onDelete}
        />

        {habits.length > 0 && <AnalyticsDashboard habits={habits} />}
      </main>
    </div>
  );
}
