import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import KingBedIcon from '@mui/icons-material/KingBed';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  ManualGuestRegistration,
  UserAccountCreation,
  UserProfile,
  ManagerEmployeesEdit,
  NotFound,
  Home,
  SelfBook,
  DisplayGuests,
  ManagerRoomsEdit,
  DeleteReservation,
  ManageEmployeeSchedule,
} from "../pages";
import CreateAccountTypes from '../pages/CreateAccountTypes';
import AuthenticationButton from './AuthenticationButton';
import UserDetails from '../utilities/userDetails';



const drawerWidth = 240;

export default function NavbarWithMain() {
    const {
        user,
        isAuthenticated,
        getAccessTokenSilently,
      } = useAuth0();

      const [role, setRole] = useState(undefined);

    useEffect(() => {
        
        (async () => {
          try {
            const token = await getAccessTokenSilently();
            const userDetails = new UserDetails(token);
            await userDetails.initialize();
            setRole(userDetails.role);
          } catch (e) {
            console.error(e);
          }
        })();
      }, [getAccessTokenSilently]);

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Twilite Motel
        </Typography>
        {isAuthenticated && <Typography variant="h6" noWrap component="div" align="right">
          Welcome, {user.name}
        </Typography>}
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
            <ListItem button component={Link} to="/" >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
            </ListItem>

            {!isAuthenticated && <ListItem button component={Link} to="/register" >
                <ListItemIcon>
                    <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText primary={"Register Account"} />
            </ListItem>}

            {isAuthenticated && <ListItem button component={Link} to="/profile" >
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
            </ListItem>}

            {isAuthenticated && <ListItem button component={Link} to="/selfBook" >
                <ListItemIcon>
                    <KingBedIcon />
                </ListItemIcon>
                <ListItemText primary={"Reserve a Room"} />
            </ListItem>}
        </List>
        <Divider />
        <List>
            {(role === "Employee" || role === "Manager") && <ListItem button component={Link} to="/guestRegistry">
              <ListItemIcon>
                  <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Guests"} />
            </ListItem>}

            {(role === "Manager") && <ListItem button component={Link} to="/manageremployeesedit">
              <ListItemIcon>
                  <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Employees"} />
            </ListItem>}

            {(role === "Manager") && <ListItem button component={Link} to="/ManageSchedule">
              <ListItemIcon>
                  <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Schedule"} />
            </ListItem>}


            {(role === "Manager") && <ListItem button component={Link} to="/manageRooms" >
              <ListItemIcon>
                  <BedroomParentIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Rooms"} />
            </ListItem>}

            {(role === "Employee" || role === "Manager") && <ListItem button component={Link} to="/displayGuests">
              <ListItemIcon>
                  <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Reservations"} />
            </ListItem>}

            {(role === "Employee" || role === "Manager") && <ListItem button component={Link} to="/deleteReservation">
              <ListItemIcon>
                  <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary={"Delete Reservations"} />
            </ListItem>}

            <ListItem button >
              <ListItemIcon>
                  {!isAuthenticated ? <LoginIcon /> : <LogoutIcon /> }
              </ListItemIcon>
              <AuthenticationButton />
            </ListItem>

        </List>
      </Box>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<UserAccountCreation />} />
          <Route path="/guestRegistry" element={<ManualGuestRegistration />} />
          <Route path="/selfBook" element={<SelfBook />} />
          <Route path="/displayGuests" element={<DisplayGuests />} />
          <Route path="/manageRooms" element={<ManagerRoomsEdit />} />
          <Route path="/manageremployeesedit" element={<ManagerEmployeesEdit />} />
          <Route path="/deleteReservation" element={<DeleteReservation />} />
          <Route path="/registerAccounts" element={<CreateAccountTypes />} />
          <Route path="/ManageSchedule" element={<ManageEmployeeSchedule/>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  </Box>
  );
}