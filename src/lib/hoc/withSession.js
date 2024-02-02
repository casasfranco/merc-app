import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useModel } from '../hooks';

const withSession = (Component) => {
  const SessionCheck = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = useModel.user();
    const token = user?.token;

    const isTokenValid = () => {
      if (!token) return false;
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    };

    useEffect(() => {
      if (!isTokenValid()) {
        sessionStorage.clear();
        navigate('/login');
      } else if (location.pathname === '/login') {
        navigate('/home');
      }
    }, [token, navigate, location.pathname]);

    return isTokenValid() ? <Component {...props} /> : null;
  };

  SessionCheck.displayName = `WithSession(${Component.displayName || Component.name || 'Component'})`;

  return SessionCheck;
};

export default withSession;
