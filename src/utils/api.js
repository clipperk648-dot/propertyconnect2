// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
  withCredentials: true, // if you need cookies/auth
});

export default api;
