import React, { FC, useEffect, useState } from 'react';
import { Order, Product, ProductPedido } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ConstructionOutlined } from '@mui/icons-material';

type OrderProps = {
    order: Order[]
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const OrderAdmin = (order: OrderProps) => {

    return (
        <>
            {order.order.map((o) => {
                return (
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString()}</TableCell>
                        <TableCell align='center'>{o.correo}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                         <TableCell component="th" scope="row">
                            {o.product.map((pr) => {return pr.producto.nombre + "\n"})}    
                        </TableCell>  
                    </TableRow>
                );
            })}
        </>
    );
}

export default OrderAdmin;