
import React, { useState, useEffect } from 'react';
import { Order } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type OrderProps = {
    orders: Order[]
    email: String
}

async function ordersByEmail(order:Order[], orderEmail:Order[], email:String) {
    order.forEach(e => {if(e.correo == email) { orderEmail.push(e) }});
}

const OrderUser = (order: OrderProps) => {
    const[ordersEmail, setOrdersEmail] = React.useState<Order[]>([]);

    console.log(ordersEmail.length)
    ordersByEmail(order.orders, ordersEmail, order.email)
    console.log(ordersEmail.length)

    return ( 
        <>
            {ordersEmail.map((o) => {
                return (
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString().substring(0, 10)}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                         <TableCell component="th" >
                            {o.products.map((p) => {return p.nombre + " (" + 0 + " uds) "})}
                        </TableCell>  
                    </TableRow>
                );  
            })}
        </>
    );
}

export default OrderUser;