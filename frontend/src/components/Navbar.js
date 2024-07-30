import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout'; // Import logout icon
import '../styles/Navbar.css';
import planeImage from '../assets/plane.png';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { AnimationContext } from '../context/AnimationContext'; // Adjust the import path as necessary

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { setAnimate } = useContext(AnimationContext);

  const handleNavClick = (routePath) => {
    if (location.pathname === '/') {
      setAnimate(true);
      setTimeout(() => {
        navigate(routePath);
      }, 1200);
    } else {
      setAnimate(false);
      navigate(routePath);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
    navigate('/');
  };

  const handleUserInfoClick = () => {
    if(user && user.role === 'admin') {
      navigate('/dashboard/admin');
    }
    else {
      navigate('/dashboard/user');
    }
    
  };

  const isLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/admin-login';

  return (
    <AppBar position="fixed" elevation={0} style={{ backgroundColor: 'transparent' }}>
      <Toolbar className='navbar' style={{ padding: '10px 60px', backgroundColor: 'transparent' }}>
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
                  fontWeight: 'bold',
                  color: 'black',
                  cursor: 'pointer',
                  fontSize: '14px',
                  margin: '0 20px'
                }}
                onClick={() => handleNavClick('/')}
              >
                HOME
              </Typography>
            </Link>
            <Typography
              variant="h6"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                color: 'black',
                cursor: 'pointer',
                fontSize: '14px',
                margin: '0 20px'
              }}
              onClick={() => handleNavClick('/flights')}
            >
              FLIGHTS
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                color: 'black',
                cursor: 'pointer',
                fontSize: '14px',
                margin: '0 20px'
              }}
              onClick={() => handleNavClick('/book')}
            >
              BOOK A FLIGHT
            </Typography>
          </Grid>

          {/* Login/Logout Section */}
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!user ? (
              <Button
                onClick={() => handleNavClick('/login')}
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
                      fontSize: '14px' // Set font size to 14px
                    }}
                  >
                    Login
                  </Typography>
                </div>
                <ArrowDropDownIcon style={{ color: isLoginOrSignupPage ? 'white' : 'black', marginLeft: '8px' }} />
              </Button>
            ) : (
              <>
                <IconButton
                  onClick={handleUserInfoClick}
                  style={{
                    backgroundColor: '#e8ecf4',
                    borderRadius: '50%',
                    padding: '6px',
                    marginRight: '10px'
                  }}
                >
                  <AccountCircleIcon style={{ color: '#28449c' }} />
                </IconButton>
                <Button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#e8ecf4',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'none' // Prevents text from being uppercase
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Poppins',
                      color: 'black',
                      margin: '0',
                      fontSize: '14px' // Set font size to 14px
                    }}
                  >
                    Logout
                  </Typography>
                  <LogoutIcon style={{ color: 'black', marginLeft: '8px' }} />
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;