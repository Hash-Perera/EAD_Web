// axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5077/api", // Replace with your backend base URL
  // You can also set default headers here if needed
});

// Request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("authToken");

    // Check if the request is not to the login endpoint
    if (token && !config.url.includes("/login")) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }

    return config;
  },
  (error) => {
    // Handle the error before the request is sent
    return Promise.reject(error);
  }
);

export default axiosInstance;
