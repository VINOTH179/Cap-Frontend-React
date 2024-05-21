import React, { useState } from "react";
import { MOVIES, SCREENS, THEATERS } from "../data/movieData";
import Signup from './Signup';
import {
  Button, Container, Typography, Grid, Card, CardActionArea,
  CardMedia, CardContent, TextField, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemText, Divider, Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export default function MovieTicketBooking() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [user, setUser] = useState({ username: "John Doe" });
  const [showSignup, setShowSignup] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(MOVIES);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSeatSelect = (screenIndex, seatIndex) => {
    const seatNumber = screenIndex * 100 + seatIndex;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = () => {
    if (!selectedTheater) {
      alert("Please select a theater.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setBookingSuccess(true);
    setOpenDialog(true);
  };

  const calculateTotalAmount = () => {
    const numberOfSeats = selectedSeats.length;
    const total = 120 * numberOfSeats;
    return total;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterMovies(event.target.value);
  };

  const filterMovies = (query) => {
    if (query) {
      const filtered = MOVIES.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(MOVIES);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setBookingSuccess(false);
  };

  return (
    <Container maxWidth="md">
      {user ? (
        <>
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <Button href="/" style={{ color: 'black' }}>Logout</Button>
          </div>
          <Typography variant="h6" style={{ marginBottom: '20px' }}>Welcome, Please Select Your Favorite Movie </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h4">Movie Ticket Booking Website</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h5">Choose your Favorite Movie:</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <TextField
                label="Search Movies"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
            {filteredMovies.map((movie) => (
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
              <Typography variant="h5">Choose your Theatre:</Typography>
              <br/>
              <Select
                value={selectedTheater ? selectedTheater.id : ""}
                onChange={(e) => {
                  const theater = THEATERS.find(theater => theater.id === e.target.value);
                  setSelectedTheater(theater);
                }}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select Theatre</MenuItem>
                {THEATERS.map(theater => (
                  <MenuItem key={theater.id} value={theater.id}>{theater.name}</MenuItem>
                ))}
              </Select>
              <br/><br/>
              <Typography variant="h5">Choose your Screen:</Typography>
              <br/>
              <Select
                value={selectedScreen ? selectedScreen.id : ""}
                onChange={(e) => {
                  const screen = SCREENS.find(screen => screen.id === e.target.value);
                  setSelectedScreen(screen);
                }}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select Screen</MenuItem>
                {SCREENS.map(screen => (
                  <MenuItem key={screen.id} value={screen.id}>{screen.time}</MenuItem>
                ))}
              </Select>
              <br/><br/>
              {selectedScreen && (
                <>
                  <Typography variant="h5">Choose your Seats:</Typography>
                  <br/>
                  <Grid container spacing={2}>
                    {selectedScreen.seats.map((seat, seatIndex) => (
                      <Grid item key={`${selectedScreen.id}-${seatIndex}`} xs={4} sm={3}>
                        <Button
                          fullWidth
                          variant={selectedSeats.includes(selectedScreen.id * 100 + seatIndex) ? 'contained' : 'outlined'}
                          color="primary"
                          onClick={() => handleSeatSelect(selectedScreen.id, seatIndex)}
                        >
                          {seatIndex + 1}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  <br/>
                  <Typography variant="h6">Total Amount: ₹{calculateTotalAmount()}</Typography>
                </>
              )}
              <br/>
              <Button onClick={handleBooking} variant="contained" color="primary">Pay Now ₹{calculateTotalAmount()}</Button>
            </>
          )}
          {showSignup && <Signup onSignup={handleSignup} />}
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
          >
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <CheckCircleIcon style={{ color: 'green', marginRight: '8px' }} />
                Ticket Booked Successfully
                <IconButton style={{ marginLeft: 'auto' }} onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                <Typography variant="body1" gutterBottom>
                  <strong>Movie:</strong> {selectedMovie ? selectedMovie.title : 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Theatre:</strong> {selectedTheater ? selectedTheater.name : 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Screen:</strong> {selectedScreen ? selectedScreen.time : 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Total Seats:</strong> {selectedSeats.length}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
                  Seats:
                </Typography>
                <List>
                  {selectedSeats.map(seat => (
                    <ListItem key={seat}>
                      <ListItemText primary={`Seat ${seat % 100 + 1}`} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
                  Total Amount: ₹{calculateTotalAmount()}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">OK</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        showSignup ? (
          <Signup onSignup={handleSignup} />
        ) : null
      )}
    </Container>
  );
}
