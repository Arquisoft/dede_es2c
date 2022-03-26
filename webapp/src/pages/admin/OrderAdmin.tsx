import React, { FC, useEffect, useState } from 'react';
import { Order, Product, Object } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
    let [ordersT, setOrders]  = React.useState<string>("");

    function cargarProductosCesta(pro: Product[]) {
        setOrders("");
        let aux = pro.length;
        for(let i = 0; i < aux; i++){
            ordersT += pro[i].nombre + "\n";
        }
    }

    const cargar = (p: Object[]) => {
        setOrders("");
        let aux = p.length;
        console.log(p.length);
        for(let i = 0; i < aux; i++){
            ordersT += p[i].codigo_producto+ "\n";
        }
    };

    return (
        <>
            {order.order.map((o) => {
                 cargar(o.product); 
                return (
                    <TableRow key={o.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.codigo}</TableCell>
                        <TableCell component="th" scope="row">{o.fecha.toLocaleString()}</TableCell>
                        <TableCell align='center'>{o.correo}</TableCell>
                        <TableCell component="th" scope="row">{o.precioTotal}</TableCell>
                        <TableCell component="th" scope="row">{ordersT}</TableCell> 
                    </TableRow>
                );
            })}
        </>
    );
}

export default OrderAdmin;