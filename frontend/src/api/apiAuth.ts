//src/api/apiAuth.ts
const API_URL = import.meta.env.VITE_AUTH_API_URL;

export async function apiAuth(path: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  return response;
}
