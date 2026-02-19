import React from 'react';

export default function HabitCard({ habit, onToggle, onEdit, onDelete }) {
  const completed = Boolean(habit?.completedToday);
  const streak = habit?.streak ?? 0;

  return (
    <div
      className={`card p-4 transition-all border-2 ${
        completed ? 'border-accent-green bg-surface-green' : 'border-border bg-surface'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button
            type="button"
            onClick={onToggle}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
              completed
                ? 'bg-accent-green border-accent-green text-bg'
                : 'border-muted hover:border-accent-green'
            }`}
          >
            {completed && <span className="text-lg">✓</span>}
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-primary">{habit?.title ?? ''}</h3>
            <div className="flex items-center gap-3 text-sm text-muted mt-1">
              <span className="badge">{habit?.frequency ?? 'daily'}</span>
              <span>🔥 {streak} day streak</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onEdit} className="btn btn-ghost btn-sm text-accent-cyan">
            Edit
          </button>
          <button type="button" onClick={onDelete} className="btn btn-ghost btn-sm text-accent-red">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
