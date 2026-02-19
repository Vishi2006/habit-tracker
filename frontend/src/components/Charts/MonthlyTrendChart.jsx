import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMonthlyTrendFromHabits } from '../../utils/chartData';

export default function MonthlyTrendChart({ habits }) {
  const monthlyData = getMonthlyTrendFromHabits(habits);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">📈 Monthly Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-accent-green)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-accent-green)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted)" />
          <YAxis stroke="var(--color-muted)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-primary)',
            }}
          />
          <Area
            type="monotone"
            dataKey="completion"
            stroke="var(--color-accent-green)"
            fillOpacity={1}
            fill="url(#colorCompletion)"
            name="Completion %"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
