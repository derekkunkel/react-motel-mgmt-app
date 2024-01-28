import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (

    <>
    <Button onClick={() => {
      logout({ returnTo: window.location.origin });
    }} >Logout</Button>
    </>
    
  );
}

export default LogoutButton;