import { Order } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type OrderProps = {
    orders: Order[]
}

const OrdersByUser = (order: OrderProps) => {
    
    return (
        
        <>
            {order.orders.map((o) => {
                return (
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString().substring(0, 10)}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                         <TableCell component="th" >
                            {o.products.map((p) => {return p.nombre + " (" + p.stock + " uds) "})}
                        </TableCell>  
                    </TableRow>
                );  
            })}
        </>
    );
}

export default OrdersByUser;