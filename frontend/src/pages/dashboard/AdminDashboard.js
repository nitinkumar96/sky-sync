import React, { useEffect, useState } from 'react';
import {
    Paper, Typography, Grid, Tabs, Tab, TextField, Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import axios from 'axios';
import '../../styles/FlightStatus.css';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const [flightData, setFlightData] = useState({
        flightNumber: '',
        airline: '',
        departureAirportCode: '',
        departureAirportName: '',
        arrivalAirportCode: '',
        arrivalAirportName: '',
        date: '',
        departureTime: '',
        arrivalTime: '',
        status: '',
        gate: '',
        terminal: '',
    });

    const [updateFlightData, setUpdateFlightData] = useState({
        flightId: '',
        departureTime: '',
        arrivalTime: '',
        status: '',
        gate: '',
        terminal: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlightData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFlightData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchAdminInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:3001/api/admin/details', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    dispatch(setUser(response.data));
                }
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };

        fetchAdminInfo();
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCreateFlight = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3011/flights', flightData);
            alert('Flight created successfully');
            setFlightData({ // Reset the form after submission
                flightNumber: '',
                airline: '',
                departureAirportCode: '',
                departureAirportName: '',
                arrivalAirportCode: '',
                arrivalAirportName: '',
                date: '',
                departureTime: '',
                arrivalTime: '',
                status: '',
                gate: '',
                terminal: '',
            });
        } catch (error) {
            console.error('Error creating flight:', error);
        }
    };

    const handleUpdateFlight = async (event) => {
        event.preventDefault();
        const { flightId, ...updateData } = updateFlightData;
        try {
            await axios.put(`http://localhost:3011/flights/${flightId}`, updateData);
            alert('Flight updated successfully');
            setUpdateFlightData({ // Reset the form after submission
                flightId: '',
                departureTime: '',
                arrivalTime: '',
                status: '',
                gate: '',
                terminal: '',
            });
        } catch (error) {
            console.error('Error updating flight:', error);
        }
    };

    return (
        <Grid container spacing={3} justifyContent="center" style={{ margin: '120px 20px', width: '100%' }}>
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: 24, borderRadius: '10px', width: '70%' }}>
                    <Typography variant="h6" component="h2" gutterBottom style={{ fontFamily: "Poppins", fontWeight: '600' }}>
                        Admin Dashboard
                    </Typography>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="flight forms" indicatorColor="primary">
                        <Tab label="Create Flight" />
                        <Tab label="Update Flight" />
                    </Tabs>
                </Paper>
                <div className='flight-form' elevation={3} style={{ padding: 24, borderRadius: '10px', width: '70%', marginTop: '20px' }}>
                    {tabValue === 0 && (
                        <form onSubmit={handleCreateFlight}>
                            <Grid container spacing={3}>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={6} marginRight={2}>
                                        <TextField
                                            fullWidth
                                            name="flightNumber"
                                            label="Flight Number"
                                            value={flightData.flightNumber}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            name="airline"
                                            label="Airline"
                                            value={flightData.airline}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={2} marginRight={2}>
                                        <TextField
                                            fullWidth
                                            name="departureAirportCode"
                                            label="Departure Airport Code"
                                            value={flightData.departureAirportCode}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4} marginRight={2}>
                                        <TextField
                                            fullWidth
                                            name="departureAirportName"
                                            label="Departure Airport Name"
                                            value={flightData.departureAirportName}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={2} marginRight={2}>
                                        <TextField
                                            fullWidth
                                            name="arrivalAirportCode"
                                            label="Arrival Airport Code"
                                            value={flightData.arrivalAirportCode}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            name="arrivalAirportName"
                                            label="Arrival Airport Name"
                                            value={flightData.arrivalAirportName}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={6} marginRight={2}>
                                        <TextField
                                            name="date"
                                            label="Date"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={flightData.date}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="departureTime"
                                            label="Departure Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={flightData.departureTime}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={6} marginRight={2}>
                                        <TextField
                                            name="arrivalTime"
                                            label="Arrival Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={flightData.arrivalTime}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            name="status"
                                            label="Status"
                                            value={flightData.status}
                                            onChange={handleInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={6} marginRight={2}>
                                        <TextField
                                            fullWidth
                                            name="gate"
                                            label="Gate"
                                            value={flightData.gate}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            name="terminal"
                                            label="Terminal"
                                            value={flightData.terminal}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Create Flight
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                    {tabValue === 1 && (
                        <form onSubmit={handleUpdateFlight}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="flightId"
                                        label="Flight ID"
                                        value={updateFlightData.flightId}
                                        onChange={handleUpdateInputChange}
                                        required
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </Grid>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={6} marginRight={2}>
                                        <TextField
                                            name="departureTime"
                                            label="Departure Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={updateFlightData.departureTime}
                                            onChange={handleUpdateInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="arrivalTime"
                                            label="Arrival Time"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={updateFlightData.arrivalTime}
                                            onChange={handleUpdateInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <Grid item xs={6} marginRight={2}>
                                        <TextField
                                            fullWidth
                                            name="status"
                                            label="Status"
                                            value={updateFlightData.status}
                                            onChange={handleUpdateInputChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            name="gate"
                                            label="Gate"
                                            value={updateFlightData.gate}
                                            onChange={handleUpdateInputChange}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </Grid>
                                </div>
                                <div style={{width: '100%', display: 'flex', paddingLeft: '25px'}}>
                                    <TextField
                                        fullWidth
                                        name="terminal"
                                        label="Terminal"
                                        value={updateFlightData.terminal}
                                        onChange={handleUpdateInputChange}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </div>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Update Flight
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;