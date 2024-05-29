// Components/MovieTicketsBooking.jsx
import React, { useState } from "react";
import { MOVIES } from "../data/movieData";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";

const defaultImage = "/default_image.jpg";

export default function MovieTicketsBooking() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage; 
  };

  return (
    <Container maxWidth="md">
      <Button component={Link} to="/" sx={{ color: 'black' }}>Logout</Button>
      <Button component={Link} to="/MovieTicketsBooking" sx={{ color: 'black' }}>Home</Button>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Welcome, Please Select Your Favorite Movie
      </Typography>
  
      <Grid container spacing={3}>
        {MOVIES.length ? (
          MOVIES.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/movie-details/${movie.id}`}
                  onClick={() => handleMovieSelect(movie)}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={movie.images || defaultImage}
                    alt={movie.title}
                    onError={handleImageError} // Handle image loading error
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 3 }}>
            No movies available at the moment.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
