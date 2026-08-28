export async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(endpoint, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || data.message || `API error: ${response.status}`);
  }
  
  return data;
}
