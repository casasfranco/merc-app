import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useModel from './useModel';

const AuthRedirect = ({ children }) => {
  const user = useModel.user();

  const navigate = useNavigate();
  const isAuthenticated = user && user.token;
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default AuthRedirect;
