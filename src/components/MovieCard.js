import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Modal,
  Button
} from "@mui/material";
import axios from "axios";

const API_KEY = "f36a2f6a";
const BASE_URL = "https://www.omdbapi.com/";

const MovieCard = ({ movie }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  return (
    <>
      <Card
        sx={{
          maxWidth: 250,
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(255, 87, 34, 0.4)",
          transition: "0.3s",
          bgcolor: "#1C1C1C",
          color: "white",
          mx: 1,
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 15px rgba(255, 87, 34, 0.6)"
          }
        }}
        onClick={() => setOpen(true)}
      >
        <CardMedia
          component="img"
          height="350"
          image={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/250x350"
          }
          alt={movie.Title}
          sx={{ borderRadius: "12px 12px 0 0" }}
        />

        <CardContent sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {movie.Title}
          </Typography>

          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            details && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="grey.400">
                  🎬 Genre: {details.Genre || "N/A"}
                </Typography>
                <Typography variant="body2" color="grey.400">
                  📅 Year: {details.Year}
                </Typography>
                <Typography variant="body2" color="gold">
                  ⭐ IMDb: {details.imdbRating}/10
                </Typography>
              </Box>
            )
          )}
        </CardContent>
      </Card>

      {/* Movie Details Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "#1C1C1C",
            color: "white",
            p: 3,
            mx: "auto",
            mt: "10%",
            borderRadius: 3,
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(255, 87, 34, 0.4)"
          }}
        >
          <Typography variant="h5">{details?.Title}</Typography>
          <Typography>📅 Year: {details?.Year}</Typography>
          <Typography>🎬 Genre: {details?.Genre}</Typography>
          <Typography>⭐ IMDb: {details?.imdbRating}/10</Typography>
          <Typography>📖 Plot: {details?.Plot}</Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#E50914",
              "&:hover": { bgcolor: "#B20710" }
            }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MovieCard;
