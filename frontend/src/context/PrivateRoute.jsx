

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  // Check if 'user' exists in localStorage
  const user = JSON.parse(localStorage.getItem('user')); 

  return user ? (
    element // If the user is authenticated, render the component passed as 'element'
  ) : (
    <Navigate to="/login" /> // If not authenticated, redirect to the login page
  );
};

export default PrivateRoute;
