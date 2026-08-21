export async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(endpoint, options);
  return response.json();
}
