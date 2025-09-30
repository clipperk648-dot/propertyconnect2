// src/services/authService.js
import api from "../utils/api";

export const loginUser = (data, config = {}) =>
  api.post("/auth/login", data, config);

export const registerUser = (data, config = {}) =>
  api.post("/auth/register", data, config);

export const getProfile = (config = {}) =>
  api.get("/auth/profile", config);
