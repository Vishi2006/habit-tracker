import React from 'react';

export default function InsightsCard({ habits }) {
  const total = Array.isArray(habits) ? habits.length : 0;
  const completedToday = Array.isArray(habits)
    ? habits.filter((h) => h && h.completedToday).length
    : 0;
  const completionRate = total > 0 ? Math.round((completedToday / total) * 100) : 0;
  const longestStreak =
    total > 0
      ? Math.max(0, ...habits.map((h) => (typeof h.streak === 'number' ? h.streak : 0)))
      : 0;

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">💡 Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-surface-green rounded-lg border-l-4 border-accent-green">
          <p className="text-sm font-semibold text-accent-green">Great Progress!</p>
          <p className="text-xs text-muted mt-1">
            You&apos;re at {completionRate}% completion today. Keep pushing forward!
          </p>
        </div>
        <div className="p-4 bg-surface-cyan rounded-lg border-l-4 border-accent-cyan">
          <p className="text-sm font-semibold text-accent-cyan">Stay Consistent</p>
          <p className="text-xs text-muted mt-1">
            Your longest streak is {longestStreak} days. Can you beat it?
          </p>
        </div>
      </div>
    </div>
  );
}
