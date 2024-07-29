// HomePage.js
import React, { useEffect, useState } from 'react';
import FlightCard from './FlightCard';
import axios from 'axios';
import '../styles/HomePage.css';

const HomePage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3001/flights');
        setFlights(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page-heading">
        Hi there, ready to <span className="highlight">SkySync</span> your journey today?
      </h1>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default HomePage;
