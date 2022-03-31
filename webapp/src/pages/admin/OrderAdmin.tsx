import React, { FC, useEffect, useState } from 'react';
import { Order } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type OrderProps = {
    order: Order[]
}

const OrderAdmin = (order: OrderProps) => {

    return (
        <>
            {order.order.map((o) => {
                console.log(o.productsPedido)
                return (
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString()}</TableCell>
                        <TableCell align='center'>{o.correo}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                         <TableCell component="th" scope="row">
                            {o.productsPedido.map((p) => {return p.codigo + "\n"})}
                        </TableCell>  
                    </TableRow>
                );  
            })}
        </>
    );
}

export default OrderAdmin;