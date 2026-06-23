import { apiClient } from "./api/apiClient";

export const commentService = {
  list: (mangaId) => apiClient(`/mangas/${mangaId}/comments`),
  create: (mangaId, payload) => apiClient(`/mangas/${mangaId}/comments`, { method: "POST", body: JSON.stringify(payload) }),
  reply: (commentId, payload) => apiClient(`/comments/${commentId}/replies`, { method: "POST", body: JSON.stringify(payload) }),
  like: (commentId) => apiClient(`/comments/${commentId}/like`, { method: "POST" }),
  report: (commentId, payload) => apiClient(`/comments/${commentId}/report`, { method: "POST", body: JSON.stringify(payload) }),
};
