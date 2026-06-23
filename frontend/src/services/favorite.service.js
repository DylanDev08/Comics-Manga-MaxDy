import { apiClient } from "./api/apiClient";

export const favoriteService = {
  list: () => apiClient("/favorites"),
  add: (mangaId) => apiClient(`/favorites/${mangaId}`, { method: "POST" }),
  remove: (mangaId) => apiClient(`/favorites/${mangaId}`, { method: "DELETE" }),
};
