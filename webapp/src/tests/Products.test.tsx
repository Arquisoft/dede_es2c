import { render, screen } from '@testing-library/react';
import ListProducts from '../pages/ListProducts';
import {Product} from '../shared/shareddtypes';

test('Ventana Productos', async () => {
    const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    const productOnCart:any = {};
    render(<ListProducts onAddCart={productOnCart} cartItems = {productList}/>);
    expect(screen.getByText(/Menor a mayor/i)).toBeInTheDocument();  
    expect(screen.getByLabelText(/Precio/i)).toBeInTheDocument(); 
});

test('Ventana Productos stock > 0', async () => {
    const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    const productOnCart:any = {};
    /* render(
        <>
            <Productos product={productList} onAddCart={productOnCart} cartItems={productOnCart} homePage={false} /> 
        </>
    );
    expect(screen.getByText(/PruebaTecado/i)).toBeInTheDocument();  */
});

