export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function authFetch(path, options = {}, getToken) {
  const token = await getToken();

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
}
