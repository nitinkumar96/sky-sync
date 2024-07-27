import React from 'react';
import FlightStatusForm from "./FlightStatusForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SkySync Flight Status</h1>
        <FlightStatusForm />
      </header>
    </div>
  );
}

export default App;
