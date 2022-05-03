import React from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Order } from '../../shared/shareddtypes';
import Paper from '@mui/material/Paper';
import {  getOrdersByEmail } from '../../api/api';
import OrderUser from '../user/OrderUser';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { User } from '../../shared/shareddtypes';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

function getUserId(): string {
    var id;
    if(localStorage.getItem('token') != null)
    var user:any = jwt_decode(localStorage.getItem('token') || '{}');
    id = user.id
    return id
}

const OrderHistory = () => {
    const [ordersEmail, setOrdersEmail] = React.useState<Order[]>([]);
    let [email, setEmail] = useState('')
    let [id, setId] = useState('')
    let [user, setUser] = React.useState<User>({_id: "", name: "",email: "",surname: "", password: ""});

    setId(getUserId())
    
    const getUser = async (id:String) => {
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        const data = await axios.get(apiEndPoint + "/user/findById/" + id).then (
            res => {
                setUser(res.data);
                return res.data
            }
        )
        return data != null;
    }
    
    getUser(id)
    setEmail(user.email)

    async function cargarPedidosEmail() {
        setOrdersEmail(await getOrdersByEmail(email))
    }
    cargarPedidosEmail()

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
                            <OrderUser orders = {ordersEmail} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default OrderHistory;