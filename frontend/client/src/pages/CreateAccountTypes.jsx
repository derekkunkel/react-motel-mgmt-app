import React from 'react';
import { Box, Grid} from '@mui/material';
import AllTypesRegistration from '../components/AllTypesRegistration';


function CreateAccountTypes() {

    return  (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
      
        <Grid item xs={3} sx={{
          boxShadow: 5,
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          width: 'max',
          height: '5rem',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          "&:hover": {
            boxShadow: 9
          }
        }}>
            <Box>
                <AllTypesRegistration />

            </Box>
         
        </Grid>   
         
      </Grid> 
    );


  
}

export default CreateAccountTypes;