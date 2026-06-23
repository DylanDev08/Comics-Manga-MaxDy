import { apiClient } from "./api/apiClient";

export const mangaService = {
  list: (params = {}) => apiClient(`/mangas?${new URLSearchParams(params)}`),
  detail: (slug) => apiClient(`/mangas/${slug}`),
  chapters: (slug) => apiClient(`/mangas/${slug}/chapters`),
  rankings: () => apiClient("/rankings"),
  genres: () => apiClient("/genres"),
};
