import axios from 'axios';
import { useDispatch } from 'react-redux';

const API_BASE_URL = 'http://localhost:8081/api/auth'; // Thay thế bằng URL của API của bạn

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData);
        const { jwtToken } = response.data; // Trích xuất token từ thuộc tính jwtToken của đối tượng phản hồi
        return jwtToken;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getUser = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
};

