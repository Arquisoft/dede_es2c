import React, { useState, useEffect, FC } from 'react';
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
