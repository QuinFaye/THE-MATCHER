import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/accounts';

export const loginUser = (data) => axios.post(`${BASE_URL}/login/`, data);
export const registerUser = (data) => axios.post(`${BASE_URL}/register/`, data);
