const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDayStart(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function getWeeklyCompletionFromHabits(habits) {
  const today = new Date();
  const total = habits?.length ?? 0;
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayName = DAY_NAMES[date.getDay()];
    result.push({ day: dayName, date: date.getTime(), completed: 0, total });
  }

  if (!Array.isArray(habits) || habits.length === 0) {
    return result.map((r) => ({ day: r.day, completed: 0, total: 0 }));
  }

  result.forEach((row) => {
    const dayStart = getDayStart(row.date);
    habits.forEach((habit) => {
      const completedDates = habit.completedDates ?? [];
      const completedThatDay = completedDates.some(
        (d) => getDayStart(d) === dayStart
      );
      if (completedThatDay) row.completed += 1;
    });
  });

  return result.map((r) => ({ day: r.day, completed: r.completed, total: r.total }));
}

export function getStreakDataFromHabits(habits) {
  if (!Array.isArray(habits)) return [];
  return habits
    .filter((h) => h && (h.title || h.name))
    .map((h) => ({
      name: (h.title || h.name || 'Habit').slice(0, 12),
      streak: typeof h.streak === 'number' ? h.streak : 0,
      target: 30,
    }));
}

export function getPieDataFromHabits(habits) {
  if (!Array.isArray(habits)) return [{ name: 'Daily', value: 0, color: '#22c55e' }, { name: 'Weekly', value: 0, color: '#06b6d4' }];
  const daily = habits.filter((h) => h?.frequency === 'daily').length;
  const weekly = habits.filter((h) => h?.frequency === 'weekly').length;
  return [
    { name: 'Daily', value: daily, color: '#22c55e' },
    { name: 'Weekly', value: weekly, color: '#06b6d4' },
  ];
}

export function getMonthlyTrendFromHabits(habits) {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const total = habits?.length ?? 1;
  const today = new Date();
  const result = weeks.map((label, i) => {
    let completed = 0;
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (4 - i) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    (habits || []).forEach((h) => {
      const dates = h.completedDates ?? [];
      const anyInWeek = dates.some((d) => {
        const t = new Date(d).getTime();
        return t >= weekStart.getTime() && t <= weekEnd.getTime();
      });
      if (anyInWeek) completed += 1;
    });
    return { month: label, completion: total ? Math.round((completed / total) * 100) : 0 };
  });
  return result;
}
