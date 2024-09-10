import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Conversation from './Conversation';
import Home from './Home';
import { AuthProvider } from './AuthContext';

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conversation/:convId" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
