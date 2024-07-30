import React from 'react';
import { Typography, Grid } from '@mui/material';
import IndigoLogo from '../assets/indigo_logo.png';
import '../styles/FlightStatus.css';
import { IoIosAirplane } from "react-icons/io";

const FlightDetailCard = ({ flight }) => {
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
    <div className='flight-detail' style={{ width: '90%', padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
        <Grid container alignItems="center">            
        <Grid item xs={1} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <img src={IndigoLogo} alt="Indigo" style={{ width: '45px' }} />
        </Grid>
        
        <Grid item xs={2} style={{ textAlign: 'left' }}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Poppins" style={{color: '#28449c'}}>{flight.flightNumber}</Typography>
            <Typography variant="body1" fontFamily="Poppins" style={{color: '#28449c'}}>{flight.airline}</Typography>
        </Grid>
        <div style={{ flexGrow: 1 }} />

        <Grid item xs={1} style={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getTime(flight.scheduledDepartureTime)}</Typography>
            <Typography variant="h6" fontFamily="Poppins">{flight.departureAirportCode}</Typography>
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
            <IoIosAirplane fontSize="30px" color="#28449c" />
        </Grid>

        <Grid item xs={1} style={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">{getTime(flight.scheduledArrivalTime)}</Typography>
            <Typography variant="h6" fontFamily="Poppins">{flight.arrivalAirportCode}</Typography>
        </Grid>

        <div style={{ flexGrow: 1 }} />
        <Grid item xs={1} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
            <Typography variant="caption" fontWeight="bold" fontFamily="Poppins">Status</Typography>
            <Typography variant="h5" fontFamily="Poppins" style={{ color: getStatusColor(flight.status), fontWeight: 'bold' }}>{flight.status}</Typography>
        </Grid>
        </Grid>

        <Grid container padding={1}>
        <Grid item xs={6} style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{backgroundColor: '#f1f1ff', borderRadius: '10px', marginRight: '10px', padding: '10px'}}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Poppins">{flight.departureAirportName.split(' ')[0]}, IN</Typography>
            <Typography variant="h6" fontSize="14px" fontWeight="500" fontFamily="Poppins">{flight.departureAirportName.split(' ').slice(1).join(' ')}</Typography>
            <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Flight Departure Time</Typography>
            <Typography variant="h6" fontWeight="500" fontFamily="Poppins">{getDate(flight.departureTime)}</Typography>

            <Grid container alignItems="center">
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Scheduled</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flight.scheduledDepartureTime)}</Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Actual</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flight.departureTime)}</Typography>
                </Grid>
            </Grid>

            <Grid container alignItems="center">
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Terminal</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{flight.terminal}</Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Gate</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{flight.gate}</Typography>
                </Grid>
            </Grid>
            </div>
            
        </Grid>

        <Grid item xs={6} style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{backgroundColor: '#f1f1ff', borderRadius: '10px', marginLeft: '10px', padding: '10px'}}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Poppins">{flight.arrivalAirportName.split(' ')[0]}, IN</Typography>
            <Typography variant="h6" fontSize="14px" fontWeight="500" fontFamily="Poppins">{flight.arrivalAirportName.split(' ').slice(1).join(' ')}</Typography>
            <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Flight Arrival Time</Typography>
            <Typography variant="h6" fontWeight="500" fontFamily="Poppins">{getDate(flight.arrivalTime)}</Typography>

            <Grid container alignItems="center">
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Scheduled</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flight.scheduledArrivalTime)}</Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Estimated</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">{getTime(flight.arrivalTime)}</Typography>
                </Grid>
            </Grid>

            <Grid container alignItems="center">
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Terminal</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">N/A</Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Typography variant="body1" fontFamily="Poppins" marginTop={3}>Gate</Typography>
                <Typography variant="h5" fontWeight="600" fontFamily="Poppins">N/A</Typography>
                </Grid>
            </Grid>
            </div>
        </Grid>
        </Grid>
    </div>
  );
};

export default FlightDetailCard;
