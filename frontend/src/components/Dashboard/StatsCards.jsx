import React from 'react';

export default function StatsCards({ totalHabits, completedToday, currentStreak }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted text-sm">Total Habits</p>
            <p className="text-3xl font-bold text-accent-cyan">{totalHabits}</p>
          </div>
          <div className="w-12 h-12 bg-surface-cyan rounded-full flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
        </div>
      </div>
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted text-sm">Completed Today</p>
            <p className="text-3xl font-bold text-accent-green">
              {completedToday}/{totalHabits}
            </p>
          </div>
          <div className="w-12 h-12 bg-surface-green rounded-full flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
        </div>
      </div>
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted text-sm">Longest Streak</p>
            <p className="text-3xl font-bold text-accent-green">{currentStreak} days</p>
          </div>
          <div className="w-12 h-12 bg-surface-green rounded-full flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
}
