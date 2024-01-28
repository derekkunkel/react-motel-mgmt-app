import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import NavbarWithMain from './components/NavbarWithMain';

    ReactDOM.render(
      <Router>
        <Auth0ProviderWithHistory>
          <NavbarWithMain />
        </Auth0ProviderWithHistory>
      </Router>,

    document.getElementById('root')
 );
