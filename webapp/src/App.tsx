import React, { useState, useEffect, FC } from 'react';
/* import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes'; */
import 'bootswatch/dist/litera/bootstrap.min.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/Singup';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
      <Router>
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
        </Routes>
      </Router>
  );
}
export default App;
