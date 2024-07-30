import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Box, Snackbar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import '../../styles/FlightStatus.css';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3001/api/admin/login', { email, password });
            const token = response.data.token;

            localStorage.setItem('token', token); 
            dispatch(setUser(response.data.user)); 
            navigate('/dashboard/admin'); 
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className={`status-background`}>
            <Grid container alignItems="center" justifyContent="center" marginTop={17} marginBottom={7}>
                <Typography variant="h3" component="h2" gutterBottom style={{ fontFamily: 'BauhausRegular', fontWeight: 'bold' }}>
                    SkySync Admin Login
                </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={10} sm={8} md={6}>
                    <div className='login fade-in' style={{ paddingTop: 24, paddingBottom: 24, borderRadius: '10px' }}>
                        <Grid container>
                            <div style={{ flexGrow: 1 }} />
                            <Grid item xs={12} sm={5} style={{ padding: 30 }}>
                                <Typography variant="h4" component="h2" gutterBottom style={{ fontFamily: 'DM Sans', fontWeight: '500' }}>
                                    Admin Login
                                </Typography>
                                <Box component="form" onSubmit={handleAdminLogin}>
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
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
                                        InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
                                    />
                                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16, fontFamily: 'DM Sans', fontWeight: '600' , backgroundColor: '#28449c' }}>
                                        Login
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
                            <Grid item xs={12} sm={5} style={{ width:'100%', padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: 'DM Sans', fontWeight: '500', textAlign: 'center' }}>
                                    Not an admin?
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: 16, fontFamily: 'DM Sans', fontWeight: '600', backgroundColor: '#28449c' }}
                                    onClick={() => navigate('/login')}
                                >
                                    User Login
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

export default AdminLoginPage;