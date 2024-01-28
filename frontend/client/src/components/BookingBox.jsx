import React, {useEffect, useState} from 'react';
import theme from './theme';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, ThemeProvider, 
    Typography, Button, Modal} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ReservationForm from './ReservationForm';

function BookingBox(booking) {

    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleDelete = () => {
      fetch(`http://localhost:3030/api/deleteReservation`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({reservation_id: booking.booking.reservation_id})
            });
      window.location.reload();

    };

    useEffect(() => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        console.log(booking.booking.start_date)

        let s_date = new Date(booking.booking.start_date);
        let e_date = new Date(booking.booking.end_date);
        
        setStartDate(`${monthNames[s_date.getUTCMonth()]} ${s_date.getUTCDate()}, ${s_date.getUTCFullYear()}`)
        setEndDate(`${monthNames[e_date.getUTCMonth()]} ${e_date.getUTCDate()}, ${e_date.getUTCFullYear()}`)

       
    }, [booking.booking.start_date, booking.booking.end_date]);

  return (
    <>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2"> Edit Reservation</Typography>
        <hr /> <br />
        <ReservationForm data={booking} />
      </Box>
    </Modal>
    
    <ThemeProvider theme={theme}>
    <Box m={1} sx={{
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
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          "&:hover": {
            boxShadow: 9
          }
        }} >
            <Box>
            
                <Typography variant="h6">{booking.booking.type === undefined ? "Room Type" : booking.booking.type}</Typography>
                <Typography variant="body2">{startDate === undefined ? "Start Date" : startDate}
                 {" - "} 
                {endDate === undefined ? "End Date" : endDate}</Typography>
                <Typography variant="caption">
                    {booking.booking.smoking === 1 ? "Smoking" : null}
                    {booking.booking.kitchenette === 1 ? ", Kitchenette" : null}
                    {booking.booking.beds === 1 ? `, ${booking.booking.beds} Bed(s)` : null}
                </Typography>
            </Box>
        
            <Typography variant="h6">
              
              {booking.booking.price === undefined ? "CAD $0.00" : `CAD $${booking.booking.price}`}
            <Tooltip title="Modify Reservation">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem onClick={handleCloseUserMenu} >
                  <Typography textAlign="center"><Button variant='outlined' color='primary' onClick={handleOpen}>Edit Reservation</Button></Typography>
              </MenuItem>
              
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Button variant='outlined' color='error' onClick={handleDelete}>Cancel Reservation</Button></Typography>
              </MenuItem>
            </Menu>
            
            
            </Typography>
        
        </Box>
    </ThemeProvider>
    </>
    
  );
}

export default BookingBox;