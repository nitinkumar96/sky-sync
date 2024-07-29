import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../styles/Navbar.css';
import planeImage from '../assets/plane.png';
import Grid from '@mui/material/Grid';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const isLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <AppBar position="fixed" elevation={0} style={{ backgroundColor: 'transparent' }}>
      <Toolbar className='navbar' style={{ padding: '10px 60px' }}>
        <Grid container alignItems="center">
          {/* Logo Section */}
          <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              style={{ 
                fontFamily: 'BauhausRegular', 
                fontSize: '30px', 
                fontWeight: 'bold',
                color: '#28449c' 
              }}
            >
              SkySync
            </Typography>
            <img 
              src={planeImage} 
              alt="Plane" 
              className="logo-image" 
              style={{ height: '30px', marginLeft: '8px' }} 
            />
          </Grid>
          
          {/* Links Section */}
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography 
                variant="h6" 
                style={{ 
                  fontFamily: 'Poppins', 
                  color: 'black', 
                  cursor: 'pointer', 
                  fontSize: '14px', 
                  margin: '0 20px' 
                }} 
                onClick={() => console.log('Home clicked')}
              >
                Home
              </Typography>
            </Link>
            <Link to="/status" style={{ textDecoration: 'none' }}>
              <Typography 
                variant="h6" 
                style={{ 
                  fontFamily: 'Poppins', 
                  color: 'black', 
                  cursor: 'pointer', 
                  fontSize: '14px', 
                  margin: '0 20px' 
                }} 
                onClick={() => console.log('Check Flight Status clicked')}
              >
                Check Flight Status
              </Typography>
            </Link>
          </Grid>
          
          {/* Login Section */}
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleLoginClick}
              style={{
                backgroundColor: isLoginOrSignupPage ? '#28449c' : '#e8ecf4',
                borderRadius: '20px',
                padding: '4px 4px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                textTransform: 'none' // Prevents text from being uppercase
              }}
            >
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Typography 
                  variant="h6" 
                  style={{ 
                    fontFamily: 'Poppins', 
                    color: 'black', 
                    margin: '0',
                    fontSize: '14px' // Set font size to 16px
                  }}
                >
                  Login
                </Typography>
              </div>
              <ArrowDropDownIcon style={{ color: isLoginOrSignupPage ? 'white' : 'black', marginLeft: '8px' }} />
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;