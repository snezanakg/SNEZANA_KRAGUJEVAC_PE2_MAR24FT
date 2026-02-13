export const API_BASE = "https://v2.api.noroff.dev";

export async function fetchFromApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("holidaze_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Something went wrong");
  }

  return data;
}
