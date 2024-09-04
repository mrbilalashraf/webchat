import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Conversation from './Conversation';
import Home from './Home';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conversation/:convId" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
