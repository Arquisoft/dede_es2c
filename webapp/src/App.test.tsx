import { render, screen } from '@testing-library/react';
import App from './App';
import Home from '../src/pages/Home';
import { Order, Product, User, Object } from '../src/shared/shareddtypes';
import ListProducts from './pages/ListProducts';
import ManageProducts from './pages/admin/ManageProducts';
import ProdAdmin from './pages/admin/ProdAdmin';
import IUserAdmin from './pages/admin/IUserAdmin';
import UserAdmin from './pages/admin/UsersAdmin';
import AddProdutcAdmin from './pages/admin/AddProdcutAdmin';
import ManageOrders from './pages/admin/ManageOrders';
import OrderAdmin from './pages/admin/OrderAdmin';

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Source code/i);
  expect(linkElement).toBeInTheDocument();
}); */

test('Home Page de la aplicacion', async () => {
    const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    const productOnCart:any = {};
    render(<Home onAddCart={productOnCart} cartItems = {productList}/>);
    const linkElement = screen.getByAltText(/Banner/i);
    expect(linkElement).toBeInTheDocument();
    expect(screen.getByText(/Últimas unidades/i)).toBeInTheDocument(); 
});


test('Ventana Productos', async () => {
  const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
  const productOnCart:any = {};
  render(<ListProducts onAddCart={productOnCart} cartItems = {productList}/>);
  expect(screen.getByText(/Categorías/i)).toBeInTheDocument(); 
  expect(screen.getByText(/Menor a mayor/i)).toBeInTheDocument();  
  expect(screen.getByLabelText(/Precio/i)).toBeInTheDocument(); 
});


test('Admin -> Administrar Productos Base', async () => {
  render(<ManageProducts />);
  expect(screen.getByText(/Código/i)).toBeInTheDocument();
});

test('Admin -> Administrar Productos Base Datos', async () => {
  const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
  render(<ProdAdmin produc={productList} />);
  expect(screen.getByText(/PruebaTecado/i)).toBeInTheDocument();
  expect(screen.getByText(/Administrar/i)).toBeInTheDocument();
});

test('Admin -> Administrar Usuarios dentro', async () => {
  const userList:User[] = [{name:"Ana", email: "a@uniovi.es"}]
  render(<IUserAdmin user={userList} />)
  expect(screen.getByText(/Ver pedidos/i)).toBeInTheDocument();
});

test('Admin -> Administrar Usuarios', async () => {
  render(<UserAdmin />)
  expect(screen.getByText(/Ver pedidos de usuarios/i)).toBeInTheDocument();
});

test('Admin -> Añadir Productos', async () => {
  render(<AddProdutcAdmin />)
  expect(screen.getByText(/Añadir un nuevo producto/i)).toBeInTheDocument();
});

test('Admin -> Administrar Pedidos', async () => {
  render(<ManageOrders />)
  expect(screen.getByText(/Correo del comprador/i)).toBeInTheDocument();
});

test('Admin -> Administrar Pedidos Inside', async () => {
  const productList:Object[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
  const pedido: Order[] = [{codigo: "A", correo: "a@uniovi", fecha: new Date(), precioTotal: 140.23, products: productList}, 
                            {codigo: "B", correo: "b@uniovi", fecha: new Date(), precioTotal: 140.23, products: productList}]
  render(<OrderAdmin orders={pedido}  />)
  expect(screen.getByText(/a@uniovi/i)).toBeInTheDocument();
});