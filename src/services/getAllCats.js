import { API_URL } from './config'

export const getAllCats = async () => {
  const url = `${API_URL}/adopt`;
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error)
  }
}
