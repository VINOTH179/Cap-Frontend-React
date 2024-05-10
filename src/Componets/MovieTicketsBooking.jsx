import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { MOVIES, SCREENS } from "../data/movieData";
import TicketPrint from './TicketPrint';
import Signup from './Signup';
import { Button, Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

export default function MovieTicketBooking() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Function to handle seat selection
  const handleSeatSelect = (screenIndex, seatIndex) => {
    const seatNumber = screenIndex * 100 + seatIndex;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Function to handle booking
  const handleBooking = () => {
    // if (!login) {
    //   alert("Please log in first.");
    //   return;
    // }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    const totalAmount = calculateTotalAmount();
    alert(`Payment successful! Total amount paid: $${totalAmount}.`);
    // Additional logic for handling booking goes here
    setBookingSuccess(true);
  };

  // Function to calculate total amount
  const calculateTotalAmount = () => {
    const numberOfSeats = selectedSeats.length;
    const total = 120 * numberOfSeats;
    return total;
  };

  
  const handleLogin = (userData) => {
    axios.post('https://cap-backend-mongodb.onrender.com/login', userData)
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          setUser(userData);
          navigate('/MovieTicketBooking'); // Redirect to MovieTicketBooking page
        }
      })
      .catch(err => {
        setError(err.response.data);
      });
  };

  // Function to handle signup click
  const handleSignupClick = () => {
    setShowSignup(true);
  };

  // Function to handle user signup
  const handleSignup = (userData) => {
    axios.post('https://cap-backend-mongodb.onrender.com/register', userData)
      .then(result => {
        console.log(result);
        setUser(userData);
      })
      .catch(err => {
        setError(err.response.data);
      });
  };
  
  // Function to handle logout
const handleLogout = () => {
  console.log("Logging out...");
  console.log("Before logout:", user);
  // Clear user session data
  setUser(null);
  console.log("After logout:", user);
};


  return (
    <Container maxWidth="md">
      {!user ? (
        <>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
  <Button href="/" style={{ color: 'black' }}>Logout</Button>
</div>
<Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h4">Movie Ticket Booking Website</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h5">Choose your Favorite Movie:</Typography>
            </Grid>
            {MOVIES.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardActionArea onClick={() => setSelectedMovie(movie)}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={movie.images}
                      alt={movie.title}
                    />
                    <CardContent>
                      <Typography variant="h6" align="center">
                        {movie.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          {selectedMovie && (
            <>
              <br/>
              <Typography variant="h5">Selected Movie: {selectedMovie.title}</Typography>
              <br/>
              <Typography variant="h5">Choose your Seats:</Typography>
              <br/>
              <Grid container spacing={2}>
                {SCREENS.map((screen, screenIndex) => (
                  <Grid item key={screen.id} xs={12} md={4}>
                    <Typography variant="h6">Screen: {screen.time}</Typography>
                    <br/>
                    <Grid container spacing={1}>
                      {screen.seats.map((seat, seatIndex) => (
                        <Grid item key={seatIndex} xs={4} sm={3}>
                          <Button
                            fullWidth
                            variant={selectedSeats.includes(screenIndex * 100 + seatIndex) ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleSeatSelect(screenIndex, seatIndex)}
                            disabled={seat === 0}
                          >
                            {seatIndex + 1}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
                {user && (
                  <Grid container justifyContent="flex-end" marginTop={2}>
                    <Button onClick={handleLogout} variant="outlined" color="secondary">Logout</Button>
                  </Grid>
                )}
              </Grid>
              <br/>
              <Button onClick={handleBooking} variant="contained" color="primary">Book Tickets</Button>
            </>
          )}
          {showSignup && <Signup onSignup={handleSignup} />}
        </>
      ) : (
        bookingSuccess ? (
          <TicketPrint login={user} selectedMovie={selectedMovie} selectedSeats={selectedSeats} />
        ) : (
          <Typography variant="h5">Welcome, {user.username}!</Typography>
        )
      )}
    </Container>
  );
}