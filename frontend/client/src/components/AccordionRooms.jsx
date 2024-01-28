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
import RoomRegistration from './RoomRegistrationManual';

function AccordionRooms(rooms) {


  return (
    <>
    
    <ThemeProvider theme={theme}>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Room {`${rooms.rooms.id}`} <Typography variant="caption"> </Typography></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RoomRegistration data={rooms}/>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
    </>
    
  );
}

export default AccordionRooms;