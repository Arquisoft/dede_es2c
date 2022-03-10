import React, { useState, useEffect, FC } from 'react';
import LogIn from './pages/LogIn';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Products from './pages/Products';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
      <Router>
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
          <Route path = 'products' element = {<Products/>}/>
        </Routes>
      </Router>
  );
}
export default App;
