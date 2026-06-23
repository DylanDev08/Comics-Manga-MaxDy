import { apiClient } from "./api/apiClient";

export const ratingService = {
  rate: (mangaId, score) => apiClient(`/ratings/${mangaId}`, { method: "POST", body: JSON.stringify({ score }) }),
};
