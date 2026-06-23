import { apiClient } from "./api/apiClient";

export const userService = {
  profile: () => apiClient("/users/me"),
  updateProfile: (payload) => apiClient("/users/me", { method: "PATCH", body: JSON.stringify(payload) }),
  library: () => apiClient("/users/me/library"),
  favorites: () => apiClient("/users/me/favorites"),
  history: () => apiClient("/users/me/history"),
};
