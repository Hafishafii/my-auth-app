import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
  withCredentials: true,
});

export default api;





// src/utils/api.js  for jwt integretion
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3000/api', // Update if needed
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
