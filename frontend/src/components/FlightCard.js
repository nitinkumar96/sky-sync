import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import IndigoLogo from '../assets/indigo_logo.png';
import PlaneIcon from '@mui/icons-material/ArrowForward';
import { IoIosAirplane } from "react-icons/io";

const FlightCardContainer = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  width: '90%',
  marginBottom: '10px',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(241, 248, 255, 0.6)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
  cursor: 'poDM Sans',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.1rem',
  },
}));

const SmallHeading = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 'bold',
  fontFamily: 'DM Sans',
}));

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
    <FlightCardContainer>
      <Grid container alignItems="center">
        <Grid style={{ textAlign: 'center', marginLeft: '20px'}}>
          <ResponsiveTypography variant="h5" fontWeight="bold" fontFamily="DM Sans">{getDate(flight.departureTime)}</ResponsiveTypography>
          <ResponsiveTypography variant="body1" fontFamily="DM Sans">{getMonth(flight.departureTime)}</ResponsiveTypography>
        </Grid>
        
        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <img src={IndigoLogo} alt="Indigo" style={{ width: '40px' }} />
        </Grid>
        
        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <ResponsiveTypography variant="h6" fontWeight="bold" fontFamily="Fjalla One" style={{color: '#28449c'}}>{flight.flightNumber}</ResponsiveTypography>
          <ResponsiveTypography variant="body1" fontFamily="Fjalla One" style={{color: '#28449c'}}>{flight.airline}</ResponsiveTypography>
        </Grid>
        <div style={{ flexGrow: 1 }} />

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <ResponsiveTypography variant="h5" fontWeight="900" fontFamily="DM Sans">{getTime(flight.departureTime)}</ResponsiveTypography>
          <ResponsiveTypography variant="h6" fontWeight="600" fontFamily="DM Sans">{flight.departureAirportName.split(' ')[0]} ({flight.departureAirportCode})</ResponsiveTypography>
        </Grid>

        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <IoIosAirplane fontSize='24px' color='#28449c' />
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <ResponsiveTypography variant="h5" fontWeight="900" fontFamily="DM Sans">{getTime(flight.arrivalTime)}</ResponsiveTypography>
          <ResponsiveTypography variant="h6" fontWeight="600" fontFamily="DM Sans">{flight.arrivalAirportName.split(' ')[0]} ({flight.arrivalAirportCode})</ResponsiveTypography>
        </Grid>

        <div style={{ flexGrow: 1 }} />
        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <SmallHeading variant="caption" fontWeight="bold" fontFamily="DM Sans">Terminal</SmallHeading>
          <ResponsiveTypography variant="h5" fontWeight="bold" fontFamily="DM Sans">{flight.terminal}</ResponsiveTypography>
        </Grid>

        <Grid item xs={1} style={{ textAlign: 'center' }}>
          <SmallHeading style={{paddingBottom: '10px'}} variant="caption" fontWeight="bold" fontFamily="DM Sans">Gate</SmallHeading>
          <ResponsiveTypography variant="h5" fontWeight="bold" fontFamily="DM Sans">{flight.gate}</ResponsiveTypography>
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <SmallHeading variant="caption" fontWeight="bold" fontFamily="DM Sans">Status</SmallHeading>
          <ResponsiveTypography variant="h5" fontWeight="bold" fontFamily="DM Sans" style={{ color: getStatusColor(flight.status) }}>{flight.status}</ResponsiveTypography>
        </Grid>
      </Grid>
    </FlightCardContainer>
  );
};

export default FlightCard;