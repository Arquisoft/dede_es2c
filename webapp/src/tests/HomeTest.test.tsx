import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { Product} from '../shared/shareddtypes';

test('Home Page de la aplicacion', async () => {
    const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    const productOnCart:any = {};
    render(<Home onAddCart={productOnCart} cartItems = {productList}/>);
    const linkElement = screen.getByAltText(/Banner/i); 
    expect(linkElement).toBeInTheDocument();
    expect(screen.getByText(/Últimas unidades/i)).toBeInTheDocument(); 
});