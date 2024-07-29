import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import IndigoLogo from '../assets/indigo_logo.png';
import PlaneIcon from '@mui/icons-material/ArrowForward'; 

const FlightCard = ({ flight }) => {
  const getTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return date.getUTCDate().toString().padStart(2, '0');
  };

  const getMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  };

  const getStatusColor = (status) => {
    return status.toLowerCase() === 'on time' ? '#209424' : '#d32f2f';
  };

  return (
    <Box 
      padding={2} 
      margin={1} 
      bgcolor="rgba(241, 248, 255, 0.6)" 
      borderRadius={3} 
      boxShadow="0px 5px 10px rgba(0, 0, 0, 0.1)"
      transition="transform 0.3s"
      style={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.2)' } }} 
    >
      <Grid container alignItems="center">
        <Grid style={{ textAlign: 'center', marginLeft: '20px'}}>
          <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getDate(flight.departureTime)}</Typography>
          <Typography variant="body1" fontFamily="Poppins">{getMonth(flight.departureTime)}</Typography>
        </Grid>
        
        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <img src={IndigoLogo} alt="Indigo" style={{ width: '40px' }} />
        </Grid>
        
        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold" fontFamily="Poppins" style={{color: '#28449c'}}>{flight.flightNumber}</Typography>
          <Typography variant="body1" fontFamily="Poppins" style={{color: '#28449c'}}>{flight.airline}</Typography>
        </Grid>
        <div style={{ flexGrow: 1 }} />

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getTime(flight.departureTime)}</Typography>
          <Typography variant="h6" fontFamily="Poppins">{flight.departureAirportName.split(' ')[0]} ({flight.departureAirportCode})</Typography>
        </Grid>

        {/* <Grid style={{ textAlign: 'center', marginLeft: '20px'  }}>
          <FlightTakeoffIcon />
          <Typography variant="h6" fontFamily="Poppins"> {getTime(flight.departureTime)}</Typography>
        </Grid> */}

        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <PlaneIcon fontSize="large" />
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getTime(flight.arrivalTime)}</Typography>
          <Typography variant="h6" fontFamily="Poppins">{flight.arrivalAirportName.split(' ')[0]} ({flight.arrivalAirportCode})</Typography>
        </Grid>

        {/* <Grid style={{ textAlign: 'center' }}>
          <FlightLandIcon />
          <Typography variant="h6" fontFamily="Poppins">{getTime(flight.arrivalTime)}</Typography>
        </Grid> */}

        <div style={{ flexGrow: 1 }} />
        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <Typography variant="caption" fontWeight="bold" fontFamily="Poppins">Terminal</Typography>
          <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{flight.terminal}</Typography>
        </Grid>

        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <Typography style={{paddingBottom: '10px'}} variant="caption" fontWeight="bold" fontFamily="Poppins">Gate</Typography>
          <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{flight.gate}</Typography>
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Typography variant="caption" fontWeight="bold" fontFamily="Poppins">Status</Typography>
          <Typography variant="h5" fontFamily="Poppins" style={{ color: getStatusColor(flight.status), fontWeight: 'bold' }}>{flight.status}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightCard;
