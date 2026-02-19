import React from 'react';

export default function StreakLeaderboard({ habits }) {
  const sorted = [...(habits || [])]
    .filter((h) => h && (h.streak ?? 0) >= 0)
    .sort((a, b) => (b.streak ?? 0) - (a.streak ?? 0))
    .slice(0, 5);

  const rankClass = (index) => {
    if (index === 0) return 'text-accent-green';
    if (index === 1) return 'text-muted';
    if (index === 2) return 'text-accent-green';
    return 'text-muted';
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">🏆 Streak Leaderboard</h3>
      <div className="space-y-3">
        {sorted.map((habit, index) => (
          <div
            key={habit._id}
            className="flex items-center justify-between p-3 bg-surface-hover rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${rankClass(index)}`}>#{index + 1}</span>
              <div>
                <p className="font-semibold text-primary">{habit.title}</p>
                <p className="text-sm text-muted">{habit.frequency}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-accent-green">{habit.streak ?? 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
