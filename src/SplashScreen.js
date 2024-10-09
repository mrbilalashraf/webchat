import React from 'react';
import './css/SplashScreen.css'; // Add your styling here

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="logo-container">
        <h1 className="logo">WEB CHAAT</h1> {/* You can replace this with an image or logo */}
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
