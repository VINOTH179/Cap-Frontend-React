import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, TextField, Container, Typography, Link, Grid } from '@mui/material';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(""); // Clear message on component mount or when name/email/password changes
    }, [name, email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cap-backend-mongodb.onrender.com/register', { name, email, password });
            setMessage("Registration successful! You can now log in.");
            console.log(response.data);
        } catch (error) {
            setMessage("Registration failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <Container maxWidth="md">
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <Grid item>
                    <Typography variant="h5" gutterBottom>Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            Register
                        </Button>
                    </form>
                    {message && <Typography variant="body2" mt={2}>{message}</Typography>}
                    <Typography variant="body2" mt={3}>Already have an account? <Link component={RouterLink} to="/">Login</Link></Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Signup;
