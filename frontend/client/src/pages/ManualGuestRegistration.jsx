import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, ThemeProvider, 
  Typography, Button, CircularProgress, Modal} from '@mui/material';
import UserDetails from '../utilities/userDetails';
import theme from '../components/theme';
import UserRegistration from '../components/UserRegistrationManual';
import AccordionGuests from '../components/AccordionGuests';


function ManualGuestRegistration() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const {
      isAuthenticated,
      isLoading,
      getAccessTokenSilently
    } = useAuth0();
  
    const [guest, setGuests] = useState([]);
    const [role, setRole] = useState(undefined);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    useEffect(() => {
        
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          const userDetails = new UserDetails(token);
          await userDetails.initialize();
          await fetch(`http://localhost:3030/api/guest`)
          .then(response => response.json()).then(response => setGuests(response));
          setRole(userDetails.role);
            
        } catch (e) {
          console.error(e);
        }
      })();
    }, [getAccessTokenSilently]);
  
  
    if (isLoading) {
      return <CircularProgress />;
    } else if(!isAuthenticated && role === "Customer"){
      return <div>You are not authenticated to view this page</div>
    } 
    else {
  
      return isAuthenticated && (
        
        <div>
          {role === "Employee" || role === "Manager" ?
            <><Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Typography variant="h4">Guest Registration</Typography><br />
            <UserRegistration/>
            </Box>
        </Modal>

        <Box>
          <ThemeProvider theme={theme}>
            <Typography variant='h4' align='left'>Guest Registry</Typography>
          </ThemeProvider>
          <Button align="right" onClick={handleOpen}>+ Add Guest </Button>
          {guest.map((data,i) => <AccordionGuests key={i} guest={data}/>)}  
    
        </Box> </>: <>Your Role:{role} -- You are not allowed to view this page</>}
        </div>
      );
  
    }
  
    
  }

export default ManualGuestRegistration;
