import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getPieDataFromHabits } from '../../utils/chartData';

export default function HabitDistributionChart({ habits }) {
  const pieData = getPieDataFromHabits(habits);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">🥧 Habit Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-primary)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: pieData[0]?.color }} />
          <span className="text-sm text-muted">Daily: {pieData[0]?.value ?? 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: pieData[1]?.color }} />
          <span className="text-sm text-muted">Weekly: {pieData[1]?.value ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
