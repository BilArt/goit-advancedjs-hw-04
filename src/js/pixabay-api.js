import axios from 'axios';

const API_KEY = '45272920-c2160489642e002ce9de87f86';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
}
