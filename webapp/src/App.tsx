import React, { FC } from 'react';
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
import UserAdmin from './pages/admin/UsersAdmin';


const App: FC = () => {

  const [cartItems,setCartItems] = useState<Product[]>([]);
  const onAddCart = (prod : Product) => {
    const exist = cartItems.find(x=> x.codigo == prod.codigo);
    if(exist){
      setCartItems(cartItems.map(x=> x.codigo == prod.codigo ? {...exist, cantidad : exist.cantidad +1} : x))

    } else {
      setCartItems([...cartItems,{...prod,cantidad:1}])
    }

  }

  return (

      <Router>
        <NavBar cartItems = {cartItems}></NavBar>
        <NavBar/> 
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = 'login' element = {<LogIn/>}/>
          <Route path = 'signup' element = {<SignUp/>}/>
          <Route path = 'products' element = {<ListProducts onAddCart={onAddCart} cartItems = {cartItems}/>}/>
          <Route path = 'summary' element = {<ProductsSummary cartItems = {cartItems}/>}/>
          <Route path = 'pago' element = {<Pago/>}/>
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
