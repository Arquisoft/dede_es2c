import { render, screen } from '@testing-library/react';
import {  Product } from '../src/shared/shareddtypes';
import ListProducts from './pages/ListProducts';



test('Ventana Productos', async () => {
  const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
  const productOnCart:any = {};
  render(<ListProducts onAddCart={productOnCart} cartItems = {productList}/>);
  expect(screen.getByText(/Menor a mayor/i)).toBeInTheDocument();  
  expect(screen.getByLabelText(/Precio/i)).toBeInTheDocument(); 
});