import React, { useState, useEffect } from 'react';

export default function HabitForm({ habit, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: habit?.title ?? '',
    frequency: habit?.frequency ?? 'daily',
  });

  useEffect(() => {
    setFormData({
      title: habit?.title ?? '',
      frequency: habit?.frequency ?? 'daily',
    });
  }, [habit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card p-6 mb-6">
      <h3 className="text-lg font-bold text-primary mb-4">
        {habit ? 'Edit Habit' : 'Create New Habit'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Habit Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Morning Exercise"
            required
            className="input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Frequency</label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className="input w-full"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary">
            {habit ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
