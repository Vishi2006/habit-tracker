import api from './api';

const HABIT_URL = (import.meta.env.VITE_API_BASE_HABIT_URL || 'http://localhost:5000/habit').replace(/\/$/, '');

export const getHabit = async () => {
  const res = await api.get(HABIT_URL);
  return res.data;
};

export const createHabit = async (data) => {
  const res = await api.post(HABIT_URL, data);
  return res.data;
};

export const updateHabit = async (id, data) => {
  const res = await api.put(`${HABIT_URL}/${id}`, data);
  return res.data;
};

export const deleteHabit = async (id) => {
  return api.delete(`${HABIT_URL}/${id}`);
};

export const toggleComplete = async (id) => {
  const res = await api.patch(`${HABIT_URL}/${id}/check`, {});
  return res.data;
};