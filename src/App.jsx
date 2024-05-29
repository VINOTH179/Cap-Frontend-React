import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieTicketsBooking from './Componets/MovieTicketsBooking';
import Login from './Componets/Login';
import Signup from './Componets/Signup';
import MovieDetails from './Componets/MovieDetails'; // Import the MovieDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/movie-details/:movieId" element={<MovieDetails />} /> {/* Add this route */}
        <Route path="/MovieTicketsBooking" element={<MovieTicketsBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
