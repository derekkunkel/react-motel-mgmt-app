import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ManualGuestRegistration,
  UserAccountCreation,
  ManagerEmployeesEdit,
  UserProfile,
  NotFound,
  Home,
  SelfBook,
  DisplayGuests,
  ManagerRoomsEdit,
  DeleteReservation
} from "./pages";
import Navbar from './components/Navbar';

function App() {
    return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<UserAccountCreation />} />
          <Route path="/guestRegistry" element={<ManualGuestRegistration />} />
          <Route path="/selfBook" element={<SelfBook />} />
          <Route path="/displayGuests" element={<DisplayGuests />} />
          <Route path="/managerRoomsEdit" element={<ManagerRoomsEdit />} />
          <Route path="/manageremployeesedit" element={<ManagerEmployeesEdit />} />
          <Route path="/deleteReservation" element={<DeleteReservation />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    )}

export default App;
