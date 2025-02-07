import axios from "axios";

const API_KEY = "f36a2f6a"; 
const BASE_URL = "http://www.omdbapi.com/";

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query
      }
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
