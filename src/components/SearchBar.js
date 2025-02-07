import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 3,
        mb: 3,
        justifyContent: "center"
      }}
    >
      <TextField
        label="Search Movies..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: "350px",
          borderRadius: 2,
          backgroundColor: "transparent", // Remove black background
          input: { color: "white" }, // White text
          "& label": { color: "white" }, // Label text white
          "& fieldset": { borderColor: "white" } // White border
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#ff9800",
          "&:hover": { bgcolor: "#e68900" },
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          px: 3,
          py: 1.5,
          borderRadius: 2
        }}
      >
        🔍 Search
      </Button>
    </Box>
  );
};

export default SearchBar;
