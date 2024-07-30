import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import '../styles/FlightStatus.css';

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flightId: '',
    name: '',
    email: '',
    mobile: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3012/bookings', formData);
      console.log('Booking successful:', response.data);
      setSnackbar({ open: true, message: 'Booking successful!', severity: 'success' });
    } catch (error) {
      console.error('Error booking flight:', error);
      setSnackbar({ open: true, message: 'Error booking flight. Please try again.', severity: 'error' });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={`status-background`}>
      <div className='booking fade-in' style={{ padding: '20px', marginTop: '150px' }}>
        <Typography component="h1" variant="h5" style={{ textAlign: 'center', fontFamily:"DM Sans", fontWeight: "bold" }}>
          Book a Flight
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="flightId"
            label="Flight ID"
            name="flightId"
            value={formData.flightId}
            onChange={handleChange}
            autoFocus
            InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
            InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
            InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
            InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
            InputLabelProps={{ style: { fontFamily: 'DM Sans', fontWeight: '600' } }}
          />
          <Box mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{fontFamily: 'DM Sans', fontWeight: 'bold', backgroundColor: "#28449c"}}
            >
              Submit
            </Button>
          </Box>
        </form>
        
      </div>
      <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          style={{marginBottom: '30px', marginLeft: '60px'}}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
    </div>
  );
};

export default BookingPage;