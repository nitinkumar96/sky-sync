import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import FlightDetailCard from './FlightDetailCard';
import '../styles/HomePage.css';

const FlightStatusForm = () => {
  const [pnr, setPnr] = useState('');
  const [email, setEmail] = useState('');
  const [flightInfo, setFlightInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/flights/pnr', { pnr, email });
      setFlightInfo(response.data); // Assuming response contains the entire flight info
      setError('');
    } catch (err) {
      console.log(err);
      setError('Error fetching flight information');
      setFlightInfo(null);
    }
  };

  return (
    <>
      <div 
        backgroundColor='transparent'
        className='flight-status-form' 
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} padding={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField 
                fullWidth 
                label="PNR" 
                variant="outlined" 
                className='input'
                value={pnr} 
                onChange={(e) => setPnr(e.target.value)} 
                required 
                InputProps={{ style: { fontFamily: 'Poppins', fontWeight: 'bold', color: 'white' } }}
                InputLabelProps={{ style: { fontFamily: 'Poppins', fontWeight: 'bold', color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField 
                fullWidth 
                label="EMAIL" 
                variant="outlined" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                InputProps={{ style: { fontFamily: 'Poppins', fontWeight: 'bold', color: 'white' } }} 
                InputLabelProps={{ style: { fontFamily: 'Poppins', fontWeight: 'bold', color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={2} container justifyContent="center">
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                style={{ height: '50px', fontFamily: 'Poppins', fontWeight: 'bold', borderRadius: '6px', backgroundColor: 'orange', color: "#28449c" }}
              >
                Check Status
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && <Typography color="error" align="center">{error}</Typography>}
      </div>

      {flightInfo && (
        <FlightDetailCard flight={flightInfo} />
      )}
    </>
  );
};

export default FlightStatusForm;