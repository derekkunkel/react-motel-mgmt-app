import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, ThemeProvider, 
  Typography, CircularProgress } from '@mui/material';
import theme from '../components/theme';
import UserDetails from '../utilities/userDetails';
import BookingBox from '../components/BookingBox';


function UserProfile() {
  const {
    isLoading,
    getAccessTokenSilently
  } = useAuth0();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
      
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(token)
        const userDetails = new UserDetails(token);
        await userDetails.initialize();
        const response = await fetch(`http://localhost:3030/api/reservations?fname=${userDetails.given_name}&lname=${userDetails.family_name}`)
        .then(response => response.json()).then(response => setBookings(response));

        console.log(response)        
        
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);


  if (isLoading) {
    return <CircularProgress />;
  } else {

    return (
      <div>
      <Box>
        <ThemeProvider theme={theme}>
          <Typography variant='h4' align='left'>Reservations</Typography>
          {bookings.map((data,i) => <BookingBox key={i} booking={data}/>)}  
        </ThemeProvider>
  
      </Box>
      </div>
    );

  }

  
}

export default UserProfile;
