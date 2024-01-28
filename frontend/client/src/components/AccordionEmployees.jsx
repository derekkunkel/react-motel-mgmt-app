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
import EmployeeRegistration from './EmployeeRegistrationManual';

function AccordionEmployees(employees) {


  return (
    <>
    
    <ThemeProvider theme={theme}>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{`${employees.employees.first_name}`} {`${employees.employees.last_name}`} (Employee ID: {`${employees.employees.id}`}) <Typography variant="caption"> </Typography></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EmployeeRegistration data={employees}/>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
    </>
    
  );
}

export default AccordionEmployees;
