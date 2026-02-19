import React from 'react';
import WeeklyCompletionChart from './WeeklyCompletionChart';
import HabitDistributionChart from './HabitDistributionChart';
import StreakProgressChart from './StreakProgressChart';
import MonthlyTrendChart from './MonthlyTrendChart';
import StreakLeaderboard from './StreakLeaderboard';
import InsightsCard from './InsightsCard';

export default function AnalyticsDashboard({ habits }) {
  const list = Array.isArray(habits) ? habits : [];
  if (list.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">📊 Progress Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyCompletionChart habits={list} />
        <HabitDistributionChart habits={list} />
        <StreakProgressChart habits={list} />
        <MonthlyTrendChart habits={list} />
      </div>
      <StreakLeaderboard habits={list} />
      <InsightsCard habits={list} />
    </div>
  );
}
