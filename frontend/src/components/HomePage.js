import React, { useContext, useState } from 'react';
import { AnimationContext } from '../context/AnimationContext'; 
import { useNavigate } from 'react-router-dom';
import planeImage from '../assets/airplane.png';
import '../styles/HomePage.css';
import { TextField, Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux'; 
import { setPnrVal, setEmailVal } from '../redux/features/userSlice';

const HomePage = () => {
  const { animate, setAnimate } = useContext(AnimationContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pnr, setPnr] = useState('');
  const [email, setEmail] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(setPnrVal(pnr));
    dispatch(setEmailVal(email));

    setAnimate(true);
    setFormVisible(false); 

    setTimeout(() => {
      navigate('/status');
    }, 1200);
  };

  return (
    <div className={`background ${animate ? 'zoom' : 'fade-in'}`}>
      <div className={`airplane-container ${animate ? 'animate' : 'fade-in'}`}>
        <img src={planeImage} alt="Airplane" className={`airplane ${animate ? 'animate' : 'fade-in'}`} />
        <h1 className={`line1 ${animate ? 'fade-out' : 'fade-in'}`}>KNOW THE FUTURE</h1>
        <h1 className={`line3 ${animate ? 'fade-out' : 'fade-in'}`}>OF THE SKY</h1>
      </div>
      <div>
        <div 
          className={`flight-status-form ${formVisible ? '' : 'slide-up'} ${animate ? 'fade-out' : 'fade-in'}`}
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;