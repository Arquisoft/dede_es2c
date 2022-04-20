import { render, screen } from '@testing-library/react';
import {Order, Object} from '../../shared/shareddtypes';
import { Table, TableBody } from '@mui/material';
import OrderAdmin from '../../pages/admin/OrderAdmin';
import ManageOrders from '../../pages/admin/ManageOrders';

test('Admin -> Administrar Pedidos Inside', async () => {
    const productList:Object[] = [{codigo: "TE01", categoria: "teclado", nombre: "PruebaTecado", precio: 20, stock: '4', url: "aa", descripcion: "", cantidad: 0}];
    const pedido: Order[] = [{codigo: "A", correo: "a@uniovi", fecha: new Date(), precioTotal: 140.23, products: productList}, 
                              {codigo: "B", correo: "b@uniovi", fecha: new Date(), precioTotal: 140.23, products: productList}]
  
                          
    render(
      <Table>
        <TableBody>
         <OrderAdmin orders={pedido}  />
        </TableBody>
    </Table>)
    expect(screen.getByText(/a@uniovi/i)).toBeInTheDocument();
}); 

test('Admin -> Administrar Pedidos', async () => {
    render(<ManageOrders />)
    expect(screen.getByText(/Correo del comprador/i)).toBeInTheDocument();
});  
  