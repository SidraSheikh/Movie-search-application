import axios from "axios";

const API_KEY = "f36a2f6a";
const BASE_URL = "https://www.omdbapi.com/"; // ✅ Changed to HTTPS

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
