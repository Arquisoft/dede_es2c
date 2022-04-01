import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Order } from '../../shared/shareddtypes';
import Paper from '@mui/material/Paper';
import {  getOrders, getOrdersByEmail } from '../../api/api';
import OrderUser from '../user/OrderUser';

type Id = {
    email:String
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const OrderHistory = (id: Id) => {

    const [orders, setOrders]  = React.useState<Order[]>([]);

    async function cargarPedidos() {
        setOrders(await getOrdersByEmail(id.email));
    }

    useEffect(() => {cargarPedidos();}, []);
    
    return (
        <div>
            <div style={{ margin: '170px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell>Código del pedido</StyledTableCell>
                                <StyledTableCell>Fecha de orden</StyledTableCell>
                                <StyledTableCell>Precio del pedido</StyledTableCell>
                                <StyledTableCell>Productos</StyledTableCell>  
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <OrderUser order = {orders} email = {id.email} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default OrderHistory;