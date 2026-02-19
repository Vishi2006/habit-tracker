import axios from 'axios';
import api from './api';

const AUTH_URL = (import.meta.env.VITE_API_BASE_AUTH_URL || 'http://localhost:5000/auth').replace(/\/$/, '');

export const registerUser = async (data) => {
    try {
        return await axios.post(`${AUTH_URL}/create`, data, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        if (error.response?.status === 429) {
            throw new Error('Too many attempts. Please try again later.');
        }
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        return await axios.post(`${AUTH_URL}/login`, data, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        if (error.response?.status === 429) {
            throw new Error('Too many login attempts. Please try again later.');
        }
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        return await api.post(`${AUTH_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error('Logout error:', error);
        // Always clear local storage even if logout request fails
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        throw error;
    }
};

export const deleteUser = async () => {
    return api.delete(`${AUTH_URL}/delete`, { withCredentials: true });
};

