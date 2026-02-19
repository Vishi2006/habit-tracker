import { useState, useEffect, useCallback } from 'react';
import { getHabit, createHabit, updateHabit, deleteHabit, toggleComplete } from '../services/habitApi';

function normalizeHabits(habitData) {
  if (Array.isArray(habitData)) return habitData;
  if (habitData) return [habitData];
  return [];
}

export function useHabits(token) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await getHabit();
      setHabits(normalizeHabits(res?.data));
    } catch {
      setHabits([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleCreateHabit = useCallback(async (habitData) => {
    try {
      const res = await createHabit(habitData);
      setHabits((prev) => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err?.response?.data?.message || err.message };
    }
  }, []);

  const handleUpdateHabit = useCallback(async (id, habitData) => {
    try {
      const res = await updateHabit(id, habitData);
      setHabits((prev) => prev.map((h) => (h._id === id ? res.data : h)));
      return { success: true };
    } catch (err) {
      return { success: false, message: err?.response?.data?.message || err.message };
    }
  }, []);

  const handleDeleteHabit = useCallback(async (id) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err?.response?.data?.message || err.message };
    }
  }, []);

  const handleToggleComplete = useCallback(async (id) => {
    try {
      const res = await toggleComplete(id);
      setHabits((prev) => prev.map((h) => (h._id === id ? res.data : h)));
      return { success: true };
    } catch (err) {
      return { success: false, message: err?.response?.data?.message || err.message };
    }
  }, []);

  const totalHabits = habits?.length ?? 0;
  const completedToday = Array.isArray(habits)
    ? habits.filter((h) => h && h.completedToday).length
    : 0;
  const currentStreak =
    Array.isArray(habits) && habits.length > 0
      ? Math.max(
          0,
          ...habits
            .filter((h) => h && typeof h.streak === 'number')
            .map((h) => h.streak)
        )
      : 0;

  return {
    habits,
    loading,
    fetchHabits,
    totalHabits,
    completedToday,
    currentStreak,
    handleCreateHabit,
    handleUpdateHabit,
    handleDeleteHabit,
    handleToggleComplete,
  };
}
