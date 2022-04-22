import React, { FC, useState } from 'react';
import LogIn from './pages/LogIn';
import NavBar from './components/NavBar';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import ListProducts from './pages/ListProducts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsSummary from './pages/ProductsSummary';
import { Product} from './shared/shareddtypes';
import Pago from './pages/Pago';
import AddProdutcAdmin from './pages/admin/AddProdcutAdmin';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import Profile from './pages/user/Profile';
import OrderHistory from './pages/user/OrderHistory';
import PrivateRoute from './components/routes/PrivateRoute';
import UserAdmin from './pages/admin/UsersAdmin';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import Footer from './components/Footer/Footer';
import ProductDetails from './pages/ProductDetails';


const App: FC = () => {

  const [cartItems,setCartItems] = useState<Product[]>([]);
  const onAddCart = (prod : Product) => {
    try{
    var user:any = jwt_decode(localStorage.getItem('token') || '{}');
    if(user){
      const exist = cartItems.find(x=> x.codigo == prod.codigo);
      if(exist){
        setCartItems(cartItems.map(x=> x.codigo == prod.codigo ? {...exist, cantidad : exist.cantidad +1} : x))

      } else {
        setCartItems([...cartItems,{...prod,cantidad:1}])
      }
    }else{
      Swal.fire({
        title: "Debes iniciar sesión",
        text: "Para añadir un producto al carrito primero debes iniciar sesión",
        icon: "warning"
    }).then(() => {
        window.location.assign("/login");
    });
    }
    }catch(err){
      Swal.fire({
        title: "Debes iniciar sesión",
        text: "Para añadir un producto al carrito primero debes iniciar sesión",
        icon: "warning"
    }).then(() => {
        window.location.assign("/login");
    });
    }
  }

  return (

      <Router>
        <NavBar cartItems = {cartItems}></NavBar>
        {/* <NavBar/>  */}
        <Routes>
          <Route index element = {<Home onAddCart={onAddCart} cartItems = {cartItems}/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
          <Route path = 'admin/addProduct' element = {<AddProdutcAdmin />} />
          <Route path = 'admin/manageProducts' element = {<ManageProducts />} />
          <Route path = 'admin/manageOrders' element = {<ManageOrders />} />
          <Route path = 'user/profile' element = {<Profile email={"user2@uniovi.com"}/>} />
          <Route path = 'user/orderHistory' element = {<OrderHistory email={"admin@uniovi.es"}/>} />
          <Route path = 'products' element = {<ListProducts onAddCart={onAddCart} cartItems = {cartItems}/>}/>
          <Route path = 'pago' element = {<Pago/>}/>
          <Route path = 'summary' element = {<ProductsSummary cartItems = {cartItems}/>}/>
          <Route path = 'products/details/:id' element = {<ProductDetails id='RA01'/>} />
          <Route path = 'admin/addProduct' element = {
          <PrivateRoute redirectTo="/login" >
            <AddProdutcAdmin />
          </PrivateRoute>} />
          <Route path = 'admin/manageProducts' element = {
          <PrivateRoute redirectTo="/login" >
            <ManageProducts />
          </PrivateRoute>} />
          <Route path = 'admin/manageOrders' element = {
          <PrivateRoute redirectTo="/login">
            <ManageOrders />
          </PrivateRoute>} />
          <Route path = 'admin/manageUsers' element = {
          <PrivateRoute redirectTo="/login">
            <UserAdmin />
          </PrivateRoute>} />
        </Routes>
        <Footer />
      </Router>
      
  );
}
export default App;
