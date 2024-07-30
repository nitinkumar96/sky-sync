// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/fonts.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserInfoPage from './components/UserInfoPage';
import FlightStatusPage from './components/FlightStatusPage';
import FlightsPage from './components/FlightsPage';
import BookingPage from './components/BookingPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/status" element={<FlightStatusPage />} /> 
          <Route path="/flights" element={<FlightsPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          
          <Route path="/book" element={<BookingPage />} />
          <Route path="/dashboard/user" element={<ProtectedRoute element={UserInfoPage} />} />
          <Route path="/dashboard/admin" element={<ProtectedRoute element={AdminDashboard} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
