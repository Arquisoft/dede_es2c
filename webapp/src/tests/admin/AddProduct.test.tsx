/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';
import AddProdutcAdmin from '../../pages/admin/AddProdcutAdmin';
import AddProduct from '../../components/admin/AddProduct';

test('Admin -> Añadir Productos sin permisos', async () => {
   const {getAllByText} =  render(<AddProdutcAdmin />)

   expect(getAllByText("Precio Base Producto *")[0]).toBeInTheDocument();
   expect(getAllByText("Categoría *")[0]).toBeInTheDocument();
   expect(getAllByText("Nombre Producto *")[0]).toBeInTheDocument();
});


test('Admin -> Añadir Productos con permisos', async () => {
    render(
        <AddProdutcAdmin />
    )
    
    expect(screen.getByText(/Añadir un nuevo producto/i)).toBeInTheDocument();
        // Price *
    expect(screen.getByText(/Añadir producto nuevo/i)).toBeInTheDocument(); 
    expect(screen.getByLabelText(/Precio Base Producto */i)).toBeInTheDocument();
}) ;