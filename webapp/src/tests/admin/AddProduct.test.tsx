import { render, screen } from '@testing-library/react';
import AddProdutcAdmin from '../../pages/admin/AddProdcutAdmin';
import AddProduct from '../../components/admin/AddProduct';

/* test('Admin -> Añadir Productos sin permisos', async () => {
    render(<AddProdutcAdmin />)
    expect(screen.getByText(/No dispone de los permisos necesarios para acceder a la ruta introducida/i)).toBeInTheDocument();
});
 */

test('Admin -> Añadir Productos con permisos', async () => {
    render(
        <AddProdutcAdmin />
    )
    
    expect(screen.getByText(/Añadir un nuevo producto/i)).toBeInTheDocument();

}) ;