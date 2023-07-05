import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="h-[100vh] w-[100%] overflow-scroll flex flex-row justify-between gap-10 bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <div className="flex-1 ml-44 sm:ml-52 md:ml-60 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />}  />
            <Route path="/contacts" element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
