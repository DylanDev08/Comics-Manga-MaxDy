import { apiClient } from "./api/apiClient";

export const progressService = {
  save: (mangaId, payload) => apiClient(`/progress/${mangaId}`, { method: "PATCH", body: JSON.stringify(payload) }),
};
