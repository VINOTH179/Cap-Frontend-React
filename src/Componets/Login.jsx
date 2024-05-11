import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Link, Grid } from '@mui/material';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://cap-backend-mongodb.onrender.com/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          navigate('/MovieTicketsBooking');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Grid item>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter Password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          <Typography variant="body2" mt={2}>
            Don't have an account? <Link component={RouterLink} to="/register">Signup</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
