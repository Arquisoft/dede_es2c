import React, { FC } from 'react';
import LogIn from './pages/LogIn';
import NavBar from './components/NavBar';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import ListProducts from './pages/ListProducts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProdutcAdmin from './pages/admin/AddProdcutAdmin';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import UserAdmin from './pages/admin/UsersAdmin';

const App: FC = () => {
  return (
      <Router>
        <NavBar/> 
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
          <Route path = 'products' element = {<ListProducts/>}/>
          <Route path = 'admin/addProduct' element = {<AddProdutcAdmin />} />
          <Route path = 'admin/manageProducts' element = {<ManageProducts />} />
          <Route path = 'admin/manageOrders' element = {<ManageOrders />} />
          <Route path='admin/manageUsers' element = {<UserAdmin />} />
        </Routes>
      </Router>
  );
}
export default App;
