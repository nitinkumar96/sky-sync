import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, FormControlLabel, Switch, Divider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import axios from 'axios';
import FlightDetailCard from '../../components/FlightDetailCard';
import FlightCard from '../../components/FlightCard';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [flights, setFlights] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  const [notifications, setNotifications] = useState({
    allNotifications: true,
    emailNotification: true,
    smsNotification: true,
    pushNotification: true,
    reminders: true,
  });

  const [hasChanges, setHasChanges] = useState(false); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3001/api/users/details', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data));
          // Initialize notifications state with fetched preferences
          setNotifications({
            allNotifications: response.data.emailNotification || response.data.smsNotification || response.data.pushNotification,
            emailNotification: response.data.emailNotification,
            smsNotification: response.data.smsNotification,
            pushNotification: response.data.pushNotification,
            reminders: response.data.reminders,
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserFlights = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/users/flights', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching user flights:', error);
      }
    };

    fetchUserInfo();
    fetchUserFlights();
  }, [dispatch]);

  const handleCardClick = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const handleToggleAllNotifications = (event) => {
    const newValue = event.target.checked;
    setNotifications({
      allNotifications: newValue,
      emailNotification: newValue,
      smsNotification: newValue,
      pushNotification: newValue,
      reminders: notifications.reminders,
    });
    setHasChanges(true);
  };

  const handleToggleNotification = (event) => {
    const { name, checked } = event.target;
    setNotifications((prev) => {
      const updatedNotifications = {
        ...prev,
        [name]: checked,
      };

      // Determine if all child notifications are turned on or off
      const allChildrenOff = !updatedNotifications.emailNotification && !updatedNotifications.smsNotification && !updatedNotifications.pushNotification;
      return {
        ...updatedNotifications,
        allNotifications: !allChildrenOff,
      };
    });
    setHasChanges(true);
  };

  const handleSavePreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/users/preferences', {
        emailNotification: notifications.emailNotification,
        smsNotification: notifications.smsNotification,
        pushNotification: notifications.pushNotification,
        reminders: notifications.reminders,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHasChanges(false); 
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <Grid container spacing={3} alignSelf={'center'} style={{ margin: '120px 20px', width: '95%' }}>
      {/* User Info Section */}
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: 24, borderRadius: '10px', marginBottom: '20px' }}>
          <Typography variant="h6" component="h2" gutterBottom style={{ fontFamily: "DM Sans", fontWeight: '600', marginBottom: '20px' }}>
            User Info
          </Typography>
          <Divider style={{ marginBottom: '16px' }} />
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '600', fontSize: '16px' }}>Email</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '500', fontSize: '16px' }}>{user?.email}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '600', fontSize: '16px' }}>Name</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '500', fontSize: '16px' }}>{user?.name}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '600', fontSize: '16px' }}>Mobile</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '500', fontSize: '16px' }}>{user?.mobile}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Notification Preferences Card */}
        <Paper elevation={3} style={{ padding: 24, borderRadius: '10px' }}>
          <Typography variant="h6" component="h2" gutterBottom style={{ fontFamily: "DM Sans", fontWeight: '600', marginBottom: '20px' }}>
            Notification Preferences
          </Typography>
          <Divider style={{ marginBottom: '16px' }} />
          
          {/* Parent Switch */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={8}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '600', fontSize: '18px' }}>Enable Notifications</Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.allNotifications}
                    onChange={handleToggleAllNotifications}
                    color="primary"
                  />
                }
                label=""
              />
            </Grid>
          </Grid>

          {['email', 'sms', 'push'].map((type) => (
            <Grid container alignItems="center" justifyContent="space-between" key={type}>
              <Grid item xs={8}>
                <Typography style={{ fontFamily: "DM Sans", fontWeight: '500', fontSize: '16px' }}>
                  {`${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'right' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications[`${type}Notification`]}
                      onChange={handleToggleNotification}
                      name={`${type}Notification`}
                      color="primary"
                      disabled={!notifications.allNotifications} // Disable if parent is off
                    />
                  }
                  label=""
                />
              </Grid>
            </Grid>
          ))}

          <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: '16px'}}>
            <Grid item xs={8}>
              <Typography style={{ fontFamily: "DM Sans", fontWeight: '500', fontSize: '16px' }}>Receive Reminders</Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.reminders}
                    onChange={handleToggleNotification}
                    name="reminders"
                    color="primary"
                  />
                }
                label=""
              />
            </Grid>
          </Grid>

          {/* Save Preferences Button */}
          {hasChanges && (
            <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSavePreferences}
                style={{ fontFamily: 'DM Sans', fontWeight: '500' }}
              >
                Save Preferences
              </Button>
            </Grid>
          )}
        </Paper>
      </Grid>
      
      {/* Flights Section */}
      <Grid item xs={12} sm={8} padding={3}>
        <Typography variant="h5" component="h2" padding={2} borderRadius={2} gutterBottom style={{ backgroundColor: '#28449c', color: 'white', fontFamily: 'DM Sans', fontWeight: '500', margin: '0px 25px 0px 25px' }}>
          Upcoming Flights
        </Typography>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id} onClick={() => handleCardClick(flight.id)} style={{ marginBottom: '16px', marginTop: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'center'}}>
              {expandedCard === flight.id ? (
                <FlightDetailCard flight={flight} />
              ) : (
                <FlightCard flight={flight} />
              )}
            </div>
          ))
        ) : (
          <Typography variant="body1">No flights found.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default UserDashboard;