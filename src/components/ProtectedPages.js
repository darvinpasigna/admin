import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedPages = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('authToken');
  return token ? <Element {...rest} /> : <Navigate to="/PPGadminsite" />;
};

export default ProtectedPages;

