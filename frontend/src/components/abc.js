import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FlightStatus.css';
import FlightCard from './FlightCard';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const FlightsPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [allFlights, setAllFlights] = useState([]); 
  const [filteredFlights, setFilteredFlights] = useState([]); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [date, setDate] = useState(new Date());
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/flights');
        if (response.data && Array.isArray(response.data.flights)) {
          setAllFlights(response.data.flights); // Assuming the API returns flights in this format
          setFilteredFlights(response.data.flights); // Initially set filtered flights to all flights
          setTotalPages(Math.ceil(response.data.flights.length / 10)); // Assuming 10 flights per page
        } else {
          console.error("Invalid flight data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    fetchFlights();
  }, []);

  useEffect(() => {
    // Filter flights whenever date, fromAirport, or toAirport changes
    const filtered = allFlights.filter(flight => {
      const flightDate = new Date(flight.departureTime).toLocaleDateString();
      const selectedDate = date.toLocaleDateString();

      return (
        flightDate === selectedDate &&
        (!fromAirport || flight.departureAirportName.toLowerCase().includes(fromAirport.toLowerCase())) &&
        (!toAirport || flight.arrivalAirportName.toLowerCase().includes(toAirport.toLowerCase()))
      );
    });

    setFilteredFlights(filtered);
    setTotalPages(Math.ceil(filtered.length / 10)); // Update total pages based on filtered flights
    setPage(1); // Reset to first page when filters change
  }, [date, fromAirport, toAirport, allFlights]);

  const handleDateChange = (direction) => {
    const newDate = new Date(date);
    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setDate(newDate);
  };

  return (
    <div className={`status-background`}>
      <h1 style={{ marginTop: '120px' }} className="home-page-heading">
        Hi there, ready to <span className="highlight">SkySync</span> your journey today?
      </h1>
      
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
        <Box display="flex" alignItems="center">
          <Button onClick={() => handleDateChange('prev')} variant="outlined" color="primary">◀</Button>
          <Typography variant="h6" style={{ margin: '0 20px' }}>{date.toLocaleDateString()}</Typography>
          <Button onClick={() => handleDateChange('next')} variant="outlined" color="primary">▶</Button>
        </Box>
        
        <Box display="flex" alignItems="center" justifyContent="space-between" width="60%">
          <TextField 
            label="From Airport" 
            variant="outlined" 
            value={fromAirport}
            onChange={(e) => setFromAirport(e.target.value)} 
            fullWidth
            style={{ marginRight: '10px' }} 
          />
          <TextField 
            label="To Airport" 
            variant="outlined" 
            value={toAirport}
            onChange={(e) => setToAirport(e.target.value)} 
            fullWidth 
          />
        </Box>
      </Box>

      <div className='flights-container'>
        {filteredFlights.length > 0 ? (
          filteredFlights.slice((page - 1) * 10, page * 10).map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <Typography variant="h6" align="center">No flights available for the selected date and filters.</Typography>
        )}
      </div>

      {totalPages > 1 && ( // Only show pagination if there are multiple pages
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
          variant="outlined" 
          shape="rounded" 
          style={{ margin: '20px auto', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  );
};

export default FlightsPage;