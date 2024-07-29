import React from 'react';
import { Paper, Grid, Typography, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
        <Grid item marginTop={13} marginBottom={3} style={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h3" component="h2" gutterBottom style={{ fontFamily: 'BauhausRegular', fontWeight: 'bold' }}>
            Join SkySync
            </Typography>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={10} sm={8} md={6}>
            <Paper elevation={3} style={{ padding: 20, borderRadius: '10px' }}>
            <Grid container>
                <Grid item xs={12} style={{ padding: 20 }}>
                <Typography variant="h5" component="h2" gutterBottom style={{fontFamily: 'Poppins', fontWeight: '500'}}>
                    Sign Up
                </Typography>
                <Box component="form">
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16, fontFamily: 'Poppins', fontWeight: '600' }}>
                    Sign Up
                    </Button>
                </Box>
                <Box textAlign="center" marginTop={2}>
                    <Button variant="text" color="secondary" onClick={handleLoginClick} style={{ marginTop: 16, fontFamily: 'Poppins', fontWeight: '600' }}>
                    Already have an account? Login
                    </Button>
                </Box>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
        </Grid>
    </>
  );
};

export default SignupPage;
