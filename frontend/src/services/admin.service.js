import { apiClient } from "./api/apiClient";

export const adminService = {
  dashboard: () => apiClient("/admin/dashboard"),
  mangas: () => apiClient("/admin/mangas"),
  createManga: (payload) => apiClient("/admin/mangas", { method: "POST", body: JSON.stringify(payload) }),
  updateManga: (id, payload) => apiClient(`/admin/mangas/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteManga: (id) => apiClient(`/admin/mangas/${id}`, { method: "DELETE" }),
  chapters: () => apiClient("/admin/chapters"),
  createChapter: (payload) => apiClient("/admin/chapters", { method: "POST", body: JSON.stringify(payload) }),
  updateChapter: (id, payload) => apiClient(`/admin/chapters/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteChapter: (id) => apiClient(`/admin/chapters/${id}`, { method: "DELETE" }),
  reportedComments: () => apiClient("/admin/comments/reported"),
  updateCommentStatus: (id, status) =>
    apiClient(`/admin/comments/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
