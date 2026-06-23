import { apiClient } from "./api/apiClient";

export const authService = {
  register: (payload) => apiClient("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => apiClient("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => apiClient("/auth/logout", { method: "POST" }),
  me: () => apiClient("/auth/me"),
  forgotPassword: (payload) => apiClient("/auth/forgot-password", { method: "POST", body: JSON.stringify(payload) }),
  resetPassword: (payload) => apiClient("/auth/reset-password", { method: "POST", body: JSON.stringify(payload) }),
};
