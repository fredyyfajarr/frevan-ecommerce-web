import axios from 'axios';

const customAPI = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

customAPI.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch {
    localStorage.removeItem('user');
  }

  return config;
});

// const customAPI = axios.create({
//   baseURL: 'http://localhost:3000/api/v1', // Explicitly set backend URL
//   withCredentials: true, // Required for cookies
// });

export default customAPI;
