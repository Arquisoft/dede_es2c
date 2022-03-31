import { Order } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type OrderProps = {
    orders: Order[]
}

const OrderAdmin = (order: OrderProps) => {
    
    return (
          
        <>
            {order.orders.map((o) => {
                return (
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString()}</TableCell>
                        <TableCell align='center'>{o.correo}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                         <TableCell component="th" scope="row">
                            {o.products.map((p) => {return p.nombre + " - "})}
                        </TableCell>  
                    </TableRow>
                );  
            })}
        </>
    );
}

export default OrderAdmin;