import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Grid, TextField, MenuItem } from '@mui/material';
import '../styles/FlightStatus.css';
import FlightCard from './FlightCard';
import Pagination from '@mui/material/Pagination';

const FlightsPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(4); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');

  useEffect(() => {
    setFadeIn(true);
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/flights');
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    fetchFlights();
  }, []);

  const handleDateChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  const filteredFlights = flights.filter(flight => {
    const flightDate = new Date(flight.departureTime);
    return flightDate.toDateString() === selectedDate.toDateString() &&
           (fromAirport ? flight.departureAirportCode === fromAirport : true) &&
           (toAirport ? flight.arrivalAirportCode === toAirport : true);
  });

  // Get current flights
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  return (
    <div className={`status-background`}>
      <h1 style={{ marginTop: '120px' }} className="home-page-heading">
        Hi there, ready to <span className="highlight">SkySync</span> your journey today?
      </h1>
      <Box className='fade-in' style={{width:'74%'}} display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
        <Box display="flex" alignItems="center">
          <Button onClick={() => handleDateChange(-1)} variant="outlined" color="primary">◀</Button>
          <Typography variant="h6" style={{ margin: '0 20px' }}>
            {selectedDate.toDateString()}
          </Typography>
          <Button onClick={() => handleDateChange(1)} variant="outlined" color="primary">▶</Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="60%">
          <TextField
            select
            label="From Airport"
            variant="outlined" 
            value={fromAirport}
            onChange={(e) => setFromAirport(e.target.value)}
            fullWidth
            style={{ marginRight: '10px' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="DEL">DEL</MenuItem>
            <MenuItem value="BOM">BOM</MenuItem>
            <MenuItem value="BLR">BLR</MenuItem>
          </TextField>
          <TextField
            select
            label="To Airport"
            variant="outlined" 
            value={toAirport}
            onChange={(e) => setToAirport(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="DEL">DEL</MenuItem>
            <MenuItem value="BOM">BOM</MenuItem>
            <MenuItem value="BLR">BLR</MenuItem>
          </TextField>
        </Box>
      </Box>
      <div className='flights-container'>
        {currentFlights.length > 0 ?  (
            currentFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        )) 
        ) : (
            <Typography variant="h6" align="center">No flights available for the selected date and filters.</Typography>
          )}
      </div>
      {totalPages > 1 && ( 
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={(event, value) => setCurrentPage(value)} 
          variant="outlined" 
          shape="rounded" 
          style={{ margin: '20px auto', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  );
};

export default FlightsPage;