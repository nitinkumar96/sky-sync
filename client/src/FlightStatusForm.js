import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2>Check Flight Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>PNR:</label>
          <input type="text" value={pnr} onChange={(e) => setPnr(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Check Status</button>
      </form>
      {flightInfo && (
        <div>
          <h3>Flight Information</h3>
          <p><strong>Flight Number:</strong> {flightInfo.flightNumber}</p>
          <p><strong>Airline:</strong> {flightInfo.airline}</p>
          <p><strong>Departure:</strong> {flightInfo.departureTime} from {flightInfo.departureAirportName} ({flightInfo.departureAirportCode})</p>
          <p><strong>Arrival:</strong> {flightInfo.arrivalTime} at {flightInfo.arrivalAirportName} ({flightInfo.arrivalAirportCode})</p>
          <p><strong>Gate:</strong> {flightInfo.gate}</p>
          <p><strong>Terminal:</strong> {flightInfo.terminal}</p>
          <p><strong>Status:</strong> {flightInfo.status}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FlightStatusForm;
