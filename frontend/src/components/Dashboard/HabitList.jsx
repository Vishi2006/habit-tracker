import React from 'react';
import HabitCard from '../Habit/HabitCard';

export default function HabitList({
  habits,
  loading,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-primary mb-4">Your Habits</h2>
        <p className="text-center text-muted py-8">Loading habits...</p>
      </div>
    );
  }

  const list = Array.isArray(habits) ? habits.filter((h) => h && h._id) : [];

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-xl font-bold text-primary mb-4">Your Habits</h2>
      {list.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted text-lg mb-2">No habits yet</p>
          <p className="text-muted text-sm">Create your first habit to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onToggle={() => onToggle(habit._id)}
              onEdit={() => onEdit(habit)}
              onDelete={() => onDelete(habit._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
