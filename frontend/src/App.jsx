// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/new" element={<CustomerForm />} />
        <Route path="/edit/:id" element={<CustomerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
