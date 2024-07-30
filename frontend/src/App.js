// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/fonts.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import FlightStatusPage from './pages/FlightStatusPage';
import FlightsPage from './pages/FlightsPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/login/LoginPage';
import AdminLoginPage from './pages/login/AdminLoginPage';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

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
          <Route path="/dashboard/user" element={<ProtectedRoute element={UserDashboard} />} />
          <Route path="/dashboard/admin" element={<ProtectedRoute element={AdminDashboard} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
