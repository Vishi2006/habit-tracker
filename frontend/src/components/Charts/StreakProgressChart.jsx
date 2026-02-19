import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStreakDataFromHabits } from '../../utils/chartData';

export default function StreakProgressChart({ habits }) {
  const streakData = getStreakDataFromHabits(habits);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">🔥 Streak Progress</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={streakData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis type="number" stroke="var(--color-muted)" />
          <YAxis dataKey="name" type="category" stroke="var(--color-muted)" width={100} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-primary)',
            }}
          />
          <Bar dataKey="streak" fill="var(--color-accent-green)" name="Current Streak" radius={[0, 8, 8, 0]} />
          <Bar dataKey="target" fill="var(--color-border)" name="Target (30)" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
