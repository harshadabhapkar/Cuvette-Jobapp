
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during Registrating:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export const verifyEmail = async (email, otp) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/verify-email`, { email, otp });
        return response.data;
    } catch (error) {
        console.error('Error during Registrating:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// New function to verify phone
export const verifyPhone = async (phone, otp) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/verify-phone`, { phone, otp });
        return response.data;
    } catch (error) {
        console.error('Error during phone verification:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

