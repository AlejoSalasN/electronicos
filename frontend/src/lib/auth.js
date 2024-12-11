import api from './api';

export async function loginUser(email, password) {
    try {
        const response = await api.post('/users/login', { email, password });
        localStorage.setItem('token', response.data.token); // Guardar token
        return response.data.user;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
}

export function getToken() {
    return localStorage.getItem('token');
}

export function logoutUser() {
    localStorage.removeItem('token');
}
