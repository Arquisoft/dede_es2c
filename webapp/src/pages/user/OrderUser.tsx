import React, { FC, useEffect, useState } from 'react';
import { Order } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

type OrderProps = {
    order: Order[]
}

const findProductInOrderById = async (id: string) =>{
    const data = axios.get('http://localhost:5000/productOrder/getById/' + id).then(
        res => {
            console.log(res.data);
            return res.data
        }
    )
    return data != null; 
}

const  OrderUser = (orderProp: OrderProps) => {

    return (
        <>
            {orderProp.order.map((o) => {
                console.log(o.codigo);
                console.log(o.fecha.toLocaleString());
                console.log(o.precioTotal);
                findProductInOrderById(o.codigo);
                return (
                    
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString()}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                    </TableRow>
                );
            })}
        </>
    );
    /**
     * Buscar los productos_en_pedido por el id del carrito
     * Sacar la cantidad que hay de cada tipo en el carrito
     * Buscar los productos en si por cada id que nos retorne 
     * A partir de cada id sacar el nombre sde este
     */
}

export default OrderUser;