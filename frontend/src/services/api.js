import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/accounts';

export const loginUser = (data) => axios.post(`${BASE_URL}/login/`, data);
export const registerUser = (data) => axios.post(`${BASE_URL}/register/`, data);
export const getProfile = (token) =>
  axios.get(`${BASE_URL}/accounts/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
