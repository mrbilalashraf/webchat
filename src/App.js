import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Conversation from './Conversation';
import Home from './Home';
import { AuthContext } from './AuthContext';
import SplashScreen from './SplashScreen';
import Login from './Login';

function App() {
  const { isSignedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isSignedIn ? <Home /> : <Login />} />
        <Route path="/conversation/:convId" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
