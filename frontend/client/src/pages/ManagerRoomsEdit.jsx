import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, ThemeProvider, 
  Typography, Button, CircularProgress, Modal} from '@mui/material';
import theme from '../components/theme';
import UserDetails from '../utilities/userDetails';
import RoomRegistration from '../components/RoomRegistrationManual';
import AccordionRooms from '../components/AccordionRooms';


function ManagerRoomsEdit() {
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

    const [rooms, setRooms] = useState([]);
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
          await fetch(`http://localhost:3030/api/rooms`)
          .then(response => response.json()).then(response => setRooms(response));
          setRole(userDetails.role);
            
        } catch (e) {
          console.error(e);
        }
      })();
    }, [getAccessTokenSilently]);




    if (isLoading) {
        return <CircularProgress />;
      } else if(!isAuthenticated){
        return <div>You are not authenticated to view this page</div>
      } 
      else {
    
        return isAuthenticated && (
          
          <div>
            {role === "Manager" ?
              <><Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                  <Typography variant="h4">Add A Room</Typography><br />
              <RoomRegistration/>
              </Box>
          </Modal>
  
          <Box>
            <ThemeProvider theme={theme}>
              <Typography variant='h4' align='left'>Manage Rooms</Typography>
            </ThemeProvider>
            <Button align="right" onClick={handleOpen}>+ Add Rooms </Button>
            {rooms.map((data,i) => <AccordionRooms key={i} rooms={data}/>)}  
      
          </Box> </>: <>Your Role:{role} -- You are not allowed to view this page</>}
          </div>
        );
    
      }

}

export default ManagerRoomsEdit;
