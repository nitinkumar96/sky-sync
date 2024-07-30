import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import axios from 'axios';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [users, setUsers] = useState([]);

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

    return (
        <Grid container spacing={3} alignSelf={'center'} style={{ margin: '120px 20px', width: '95%' }}>
            {/* Admin Info Section */}
            <Grid item xs={12} sm={12}>
                <Paper elevation={3} style={{ padding: 24, borderRadius: '10px', marginBottom: '20px' }}>
                    <Typography variant="h6" component="h2" gutterBottom style={{ fontFamily: "Poppins", fontWeight: '600' }}>
                        Admin Dashboard
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;