import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-isqr3dj4.us.auth0.com";
  const clientId = "w0ur3W8xT91zcRcs9wRr1U18YwVJX8lG";

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    history(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;