import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AnimationContext } from '../context/AnimationContext';
import { useNavigate } from 'react-router-dom';
import '../styles/FlightStatus.css';
import { TextField, Button, Typography, Grid } from '@mui/material';
import FlightDetailCard from './FlightDetailCard';
import { useSelector } from 'react-redux'; 

const FlightStatusPage = () => {
  const { animate, setAnimate } = useContext(AnimationContext);
  const navigate = useNavigate();
  const [pnr, setPnr] = useState('');
  const [email, setEmail] = useState('');
  const [flightInfo, setFlightInfo] = useState(null);
  const [error, setError] = useState('');
  const [fadeIn, setFadeIn] = useState(false); // State for fade-in effect

  // Access PNR and email from the Redux store
  const pnrFromStore = useSelector((state) => state.user.pnr);
  const emailFromStore = useSelector((state) => state.user.email);

  useEffect(() => {
    if (pnrFromStore && emailFromStore) {
      setPnr(pnrFromStore);
      setEmail(emailFromStore);
      handleFetchFlightInfo(pnrFromStore, emailFromStore);
    }
  }, [pnrFromStore, emailFromStore]); 

  useEffect(() => {
    setFadeIn(true);
  }, []); 

  const handleFetchFlightInfo = async (pnr, email) => {
    try {
      console.log("Fetching flight info for:", pnr, email); // Log PNR and email
      const response = await axios.post('http://localhost:3001/api/flights/pnr', { pnr, email });
      console.log(response.data);
      setFlightInfo(response.data);
      setError('');
    } catch (err) {
      console.log(err);
      setError('Error fetching flight information');
      setFlightInfo(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    console.log("submit", pnr, email); // Log current values of pnr and email
    await handleFetchFlightInfo(pnr, email); // Fetch flight info with current values
  };

  return (
    <div className={`status-background`}>
      <div className={`status-page-form ${fadeIn ? 'fade-in' : ''}`}>
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

      <div style={{ width: '67%', display: 'flex', justifyContent: 'center' }}>
        {flightInfo && (
          <FlightDetailCard flight={flightInfo} />
        )}
      </div>
    </div>
  );
};

export default FlightStatusPage;