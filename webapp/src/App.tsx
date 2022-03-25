import React, { useState, useEffect, FC } from 'react';
import LogIn from './pages/LogIn';
import NavBar from './components/NavBar';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import ListProducts from './pages/ListProducts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsSummary from './pages/ProductsSummary';

const App: FC = () => {

  return (
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
          <Route path = 'products' element = {<ListProducts/>}/>
          <Route path = 'summary' element = {<ProductsSummary {...1} />}/>
        </Routes>
      </Router>
  );
}
export default App;
