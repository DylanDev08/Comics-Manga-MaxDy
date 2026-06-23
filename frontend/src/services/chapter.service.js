import { apiClient } from "./api/apiClient";

export const chapterService = {
  read: (chapterId) => apiClient(`/chapters/${chapterId}`),
};
