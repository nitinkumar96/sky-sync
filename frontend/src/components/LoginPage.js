import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Box, Snackbar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import '../styles/FlightStatus.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3001/api/users/login', { email });
            console.log(response);
            setIsOtpSent(true);
            setSuccessMessage('OTP sent to your email!');
        } catch (error) {
            console.log(error);
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3001/api/users/verify-otp', { email, otp });
            const token = response.data.token;

            localStorage.setItem('token', token);
            dispatch(setUser(response.data.user)); 
            navigate('/dashboard/user'); 
        } catch (error) {
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className={`status-background`}>
            <Grid container alignItems="center" justifyContent="center" marginTop={17} marginBottom={7}>
                <Typography variant="h3" component="h2" gutterBottom style={{ fontFamily: 'BauhausRegular', fontWeight: 'bold' }}>
                    Log in to SkySync
                </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={10} sm={8} md={6}>
                    <div className='login fade-in' style={{ paddingTop: 24, paddingBottom: 24, borderRadius: '10px' }}>
                        <Grid container>
                            <div style={{ flexGrow: 1 }} />
                            <Grid item xs={12} sm={5} style={{ padding: 30 }}>
                                <Typography variant="h4" component="h2" gutterBottom style={{ fontFamily: 'DM Sans', fontWeight: '500' }}>
                                    Login
                                </Typography>
                                <Box component="form" onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
                                        InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
                                    />
                                    {isOtpSent && (
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="otp"
                                            label="OTP"
                                            type="text"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
                                            InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
                                        />
                                    )}
                                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16, fontFamily: 'DM Sans', fontWeight: '600', backgroundColor: '#28449c' }}>
                                        {isOtpSent ? 'Verify OTP' : 'Send OTP'}
                                    </Button>
                                </Box>
                                {error && (
                                    <Snackbar
                                        open={Boolean(error)}
                                        autoHideDuration={6000}
                                        onClose={() => setError('')}
                                        message={error}
                                    />
                                )}
                                {successMessage && (
                                    <Snackbar
                                        open={Boolean(successMessage)}
                                        autoHideDuration={6000}
                                        onClose={() => setSuccessMessage('')}
                                        message={successMessage}
                                    />
                                )}
                            </Grid>
                            <div style={{ flexGrow: 1 }} />
                            <Divider orientation="vertical" flexItem />
                            <div style={{ flexGrow: 1 }} />
                            <Grid item xs={12} sm={5} style={{ padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: 'DM Sans', fontWeight: '500', textAlign: 'center' }}>
                                    SkySync Admin?
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: 16, fontFamily: 'DM Sans', fontWeight: '600', backgroundColor: '#28449c' }}
                                    onClick={() => navigate('/admin-login')}
                                >
                                    Admin Login
                                </Button>
                            </Grid>
                            <div style={{ flexGrow: 1 }} />
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginPage;
