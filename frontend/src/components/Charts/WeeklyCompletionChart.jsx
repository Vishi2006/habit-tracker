import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getWeeklyCompletionFromHabits } from '../../utils/chartData';

export default function WeeklyCompletionChart({ habits }) {
  const data = getWeeklyCompletionFromHabits(habits);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">📅 Weekly Completion</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" stroke="var(--color-muted)" />
          <YAxis stroke="var(--color-muted)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-primary)',
            }}
          />
          <Legend />
          <Bar dataKey="completed" fill="var(--color-accent-green)" name="Completed" radius={[8, 8, 0, 0]} />
          <Bar dataKey="total" fill="var(--color-border)" name="Total" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
