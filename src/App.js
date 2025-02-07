import React, { useState } from "react";
import { searchMovies } from "./services/movieAPI";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Slider from "react-slick";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    const results = await searchMovies(query);
    if (results.length === 0) {
      setError("No movies found. Please try another search.");
    }
    setMovies(results);
    setLoading(false);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://i.pinimg.com/736x/19/3f/be/193fbe6d549ee09c5e785247a3c1e63b.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#ff9800" }}
        >
          🎬 Movie Search App
        </Typography>
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <CircularProgress
            sx={{ display: "block", mx: "auto", my: 3, color: "#ff9800" }}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ mt: 3, px: 3 }}>
          {movies.length > 0 && (
            <Slider {...sliderSettings}>
              {movies.map((movie) => (
                <Box key={movie.imdbID} sx={{ px: 1 }}>
                  <MovieCard movie={movie} />
                </Box>
              ))}
            </Slider>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
