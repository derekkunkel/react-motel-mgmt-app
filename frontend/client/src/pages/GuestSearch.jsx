import React, {useEffect, useState} from 'react';
import UserRegistrationManual from '../components/UserRegistrationManual';
import DisplayGuests from '../components/DisplayGuests';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, ThemeProvider,
    Typography, CircularProgress, Grid} from '@mui/material';
import theme from '../components/theme';


function GuestSearch() {

    return  (

        <Grid
            container
            spacing={1}
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            style={{ minHeight: '400vh' }}
        >

        <>
            <DisplayGuests />
        </>

        </Grid>

    );

}

export default GuestSearch;