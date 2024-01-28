import React from 'react';
import theme from './theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 
{
ThemeProvider, 
Typography,
Accordion,
AccordionSummary,
AccordionDetails
} 
    from '@mui/material';
import UserRegistration from './UserRegistrationManual';

function AccordionGuests(guest) {

  return (
    <>
    
    <ThemeProvider theme={theme}>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{`${guest.guest.first_name} ${guest.guest.last_name}`} <Typography variant="caption">  {`id:${guest.guest.guest_id}`}</Typography></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserRegistration data={guest}/>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
    </>
    
  );
}

export default AccordionGuests;