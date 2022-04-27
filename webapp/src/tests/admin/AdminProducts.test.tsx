import { render, screen } from '@testing-library/react';
import {Product} from '../../shared/shareddtypes';
import { Table, TableBody } from '@mui/material';
import ProdAdmin from '../../pages/admin/ProdAdmin';
import ManageProducts from '../../pages/admin/ManageProducts';

test('Admin -> Administrar Productos Base Datos', async () => {
    const productList:Product[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    render(
      <Table>
          <TableBody>
            <ProdAdmin produc={productList} />
          </TableBody>
      </Table>);
    expect(screen.getByText(/PruebaTecado/i)).toBeInTheDocument();
    expect(screen.getByText(/Administrar/i)).toBeInTheDocument();
});

test('Admin -> Administrar Productos Base', async () => {
  render(<ManageProducts />);
  expect(screen.getByText(/Código/i)).toBeInTheDocument();
}); 