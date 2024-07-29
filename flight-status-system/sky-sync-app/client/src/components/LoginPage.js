import React from 'react';
import { Paper, Grid, Typography, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <Grid item marginTop={17} marginBottom={7} style={{display: "flex", justifyContent: "center"}}>
        <Typography variant="h3" component="h2" gutterBottom style={{ fontFamily: 'BauhausRegular', fontWeight: 'bold' }}>
          Log in to SkySync
        </Typography>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={10} sm={10} md={8}>
            <Paper elevation={3} style={{ padding: 24, borderRadius: '10px' }}>
            <Grid container>
                <Grid item xs={12} md={6} style={{ padding: 30, paddingRight: 50 }}>
                <Typography variant="h4" component="h2" gutterBottom style={{fontFamily: 'Poppins', fontWeight: '500'}}>
                    Login
                </Typography>
                <Box component="form">
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16, fontFamily: 'Poppins', fontWeight: '600' }}>
                    Login
                    </Button>
                </Box>
                </Grid>
                <Grid item xs={12} md={6} style={{ padding: 30, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" component="h3" gutterBottom style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                        Not a member of
                    </Typography>
                    <Typography variant="h5" marginBottom={3} component="h3" gutterBottom style={{ fontFamily: 'Poppins', fontWeight: '500', textAlign: 'center' }}>
                        SkySync?
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleSignupClick} style={{ fontFamily: 'Poppins' }}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
