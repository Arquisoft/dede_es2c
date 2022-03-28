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
import PrivateRoute from './components/routes/PrivateRoute';


const App: FC = () => {
  const user = localStorage.getItem("user");
  return (
      <Router>
        <NavBar/> 
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
          <Route path = 'products' element = {<ListProducts/>}/>
          <Route path = 'admin/addProduct' element = {
          <PrivateRoute redirectTo="/login" user={user}>
            <AddProdutcAdmin />
          </PrivateRoute>} />
          <Route path = 'admin/manageProducts' element = {
          <PrivateRoute redirectTo="/login" user={user}>
            <ManageProducts />
          </PrivateRoute>} />
          <Route path = 'admin/manageOrders' element = {
          <PrivateRoute redirectTo="/login" user={user}>
            <ManageOrders />
          </PrivateRoute>} />
          {/* <Route path = 'admin/updateProduct' element = {<UpdateProduct />} /> */}
        </Routes>
      </Router>
  );
}
export default App;
