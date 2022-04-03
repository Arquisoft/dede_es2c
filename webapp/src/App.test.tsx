import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import Home from '../src/pages/Home';
import { Product } from '../src/shared/shareddtypes';

test('renders learn react link', () => {
  render(<App />);
  /* const linkElement = screen.getByText(/Source code/i);
  expect(linkElement).toBeInTheDocument(); */
});

test('prueba sobre la Home Page de la aplicacion', async () => {
    const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    const productOnCart:Product = {codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0};
    /* render(<Home onAddCart={productOnCart} cartItems = {productList}/>);
    const linkElement = screen.getByAltText(/Banner/i);
    expect(linkElement).toBeInTheDocument();
    expect(screen.getByText(/Últimas unidades/i)).toBeInTheDocument();     */
});
