const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export async function apiClient(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "No pudimos completar la solicitud");
  }

  return payload.data ?? payload;
}
