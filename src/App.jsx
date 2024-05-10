import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Componets/Signup'; // Corrected import statement
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieTicketsBooking from './Componets/MovieTicketsBooking'
import Login from './Componets/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path="/MovieTicketsBooking" element={<MovieTicketsBooking />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
