import React from 'react';
import { Button, Typography } from '@mui/material';

function TicketPrint({ selectedMovie, selectedScreen, selectedSeats }) {
  const handlePrint = () => {
    window.print(); // Trigger the browser's print dialog
  };

  return (
    <div className="ticket-print">
      <Typography variant="h5" gutterBottom>Ticket Details</Typography>
      <Typography variant="body1">
        <strong>Movie:</strong> {selectedMovie.title}
      </Typography>
      <Typography variant="body1">
        <strong>Screen:</strong> {selectedScreen.time}
      </Typography>
      <Typography variant="body1">
        <strong>Seats:</strong> {selectedSeats.map(seat => seat + 1).join(', ')}
      </Typography>
      <Button onClick={handlePrint} variant="contained" color="primary">
        Print Ticket
      </Button>
    </div>
  );
}

export default TicketPrint;
