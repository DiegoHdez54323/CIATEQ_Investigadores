const API_URL = "http://127.0.0.1:8000";

export async function fetchData() {
  const response = await fetch(`${API_URL}/api/test/`);
  return response.json();
}
