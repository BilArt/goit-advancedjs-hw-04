const API_KEY = '45272920-c2160489642e002ce9de87f86';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
