import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import IndigoLogo from '../assets/indigo_logo.png';
import PlaneIcon from '@mui/icons-material/ArrowForward'; 

const FlightStatusForm = () => {
  const [pnr, setPnr] = useState('');
  const [email, setEmail] = useState('');
  const [flightInfo, setFlightInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3004/check-flight-status', { pnr, email });
      setFlightInfo(response.data); // Assuming response contains the entire flight info
      setError('');
    } catch (err) {
      console.log(err);
      setError('Error fetching flight information');
      setFlightInfo(null);
    }
  };

  const getTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    const DD = date.getUTCDate().toString().padStart(2, '0');
    const MM = date.toLocaleString('default', { month: 'short' });
    const YY = date.getFullYear().toString();
    return `${DD}-${MM}-${YY}`;
  };

  const getStatusColor = (status) => {
    return status.toLowerCase() === 'on time' ? '#209424' : '#d32f2f';
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: '0px', marginTop: '120px', marginLeft: '60px', marginRight: '60px', borderRadius: '10px' }}>
        <Typography variant="h5" align="center" color="white" style={{ padding: '10px', marginBottom: '20px', fontFamily: 'Poppins', backgroundColor: '#28449c', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          Check Flight Status
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} padding={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField 
                fullWidth 
                label="PNR" 
                variant="outlined" 
                value={pnr} 
                onChange={(e) => setPnr(e.target.value)} 
                required 
                InputProps={{ style: { fontFamily: 'Poppins' } }} 
                style={{ marginBottom: '16px' }} 
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField 
                fullWidth 
                label="Email" 
                variant="outlined" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                InputProps={{ style: { fontFamily: 'Poppins' } }} 
                style={{ marginBottom: '16px' }} 
              />
            </Grid>
            <Grid item xs={12} sm={2} container justifyContent="center">
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                style={{ height: '56px', marginBottom: '16px', fontFamily: 'Poppins', borderRadius: '10px', backgroundColor: '#28449c' }}
              >
                Check Status
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && <Typography color="error" align="center">{error}</Typography>}
      </Paper>

      {flightInfo && (
        <Paper elevation={2} style={{ padding: '20px', marginTop: '20px', marginLeft: '60px', marginRight: '60px', borderRadius: '10px' }}>
          <Grid container alignItems="center">            
            <Grid item xs={1} style={{ textAlign: 'center' }}>
              <img src={IndigoLogo} alt="Indigo" style={{ width: '40px' }} />
            </Grid>
            
            <Grid item xs={1} style={{ textAlign: 'center' }}>
              <Typography variant="h6" fontWeight="bold" fontFamily="Poppins" style={{color: '#28449c'}}>{flightInfo.flightNumber}</Typography>
              <Typography variant="body1" fontFamily="Poppins" style={{color: '#28449c'}}>{flightInfo.airline}</Typography>
            </Grid>
            <div style={{ flexGrow: 1 }} />

            <Grid item xs={1} style={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getTime(flightInfo.departureTime)}</Typography>
              <Typography variant="h6" fontFamily="Poppins">{flightInfo.departureAirportCode}</Typography>
            </Grid>

            <Grid item xs={1} style={{ textAlign: 'center' }}>
              <PlaneIcon fontSize="large" />
            </Grid>

            <Grid item xs={1} style={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getTime(flightInfo.arrivalTime)}</Typography>
              <Typography variant="h6" fontFamily="Poppins">{flightInfo.arrivalAirportCode}</Typography>
            </Grid>

            <div style={{ flexGrow: 1 }} />
            
            <Grid item xs={2} style={{ textAlign: 'center' }}>
              <Typography variant="caption" fontWeight="bold" fontFamily="Poppins">Status</Typography>
              <Typography variant="h5" fontFamily="Poppins" style={{ color: getStatusColor(flightInfo.status), fontWeight: 'bold' }}>{flightInfo.status}</Typography>
            </Grid>
          </Grid>

          <Grid container padding={1}>
            <Grid item xs={6} style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{backgroundColor: '#f1f1ff', borderRadius: '10px', marginRight: '10px', padding: '10px'}}>
                <Typography variant="h6" fontWeight="bold" fontFamily="Poppins">{flightInfo.departureAirportName.split(' ')[0]}, IN</Typography>
                <Typography variant="h6" fontWeight="500" fontFamily="Poppins">{flightInfo.departureAirportName}</Typography>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Flight Departure Time</Typography>
                <Typography variant="h6" fontWeight="500" fontFamily="Poppins">{getDate(flightInfo.departureTime)}</Typography>

                <Grid container alignItems="center">
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Scheduled</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flightInfo.departureTime)}</Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Actual</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flightInfo.scheduledDepartureTime)}</Typography>
                  </Grid>
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Terminal</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{flightInfo.terminal}</Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Gate</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{flightInfo.gate}</Typography>
                  </Grid>
                </Grid>
              </div>
              
            </Grid>

            <Grid item xs={6} style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{backgroundColor: '#f1f1ff', borderRadius: '10px', marginLeft: '10px', padding: '10px'}}>
                <Typography variant="h6" fontWeight="bold" fontFamily="Poppins">{flightInfo.arrivalAirportName.split(' ')[0]}, IN</Typography>
                <Typography variant="h6" fontWeight="500" fontFamily="Poppins">{flightInfo.arrivalAirportName}</Typography>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Flight Arrival Time</Typography>
                <Typography variant="h6" fontWeight="500" fontFamily="Poppins">{getDate(flightInfo.arrivalTime)}</Typography>

                <Grid container alignItems="center">
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Scheduled</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flightInfo.arrivalTime)}</Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Actual</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flightInfo.scheduledArrivalTime)}</Typography>
                  </Grid>
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Terminal</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{flightInfo.terminal}</Typography>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Gate</Typography>
                    <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{flightInfo.gate}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default FlightStatusForm;
