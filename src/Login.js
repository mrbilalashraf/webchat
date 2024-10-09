import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup } from './google_signin';
import { AuthContext } from './AuthContext';
import SplashScreen from './SplashScreen';

function Login() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { setIsSignedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        setIsAuthenticating(true);
        try {
        await signInWithGooglePopup();
        setIsSignedIn(true);
        navigate('/');
        } catch (error) {
        console.error('Error during sign-in: ', error);
        setIsAuthenticating(false);
        }
    };

    if (isAuthenticating) {
        return <SplashScreen />;
    }
    return (
      <div className='login'>
        <h1>Please Sign In</h1>
        <button className='button' onClick={handleSignIn}>Sign In With Google</button>
      </div>
    );
}

export default Login;