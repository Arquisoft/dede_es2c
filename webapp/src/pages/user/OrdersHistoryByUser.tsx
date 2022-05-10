import React, { FC } from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Order, User } from '../../shared/shareddtypes';
import Paper from '@mui/material/Paper';
import OrderAdmin from '../admin/OrderAdmin';
import { getOrdersByEmail } from '../../api/api';
import { useState } from 'react';
import { getUserById } from '../../api/ApiUsers';
import jwt_decode from "jwt-decode";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const OrdersHistoryByUser: FC = () => {

    const [orders, setOrders]  = React.useState<Order[]>([]); 
    const [currentUser, setCurrentUser] = useState<User>();

    async function usuarioActivo(){

        if(localStorage.getItem('token') != null){
            let id;
            var user:any = jwt_decode(localStorage.getItem('token') || '{}'); 
            if(user)
                id = user.id;
                setCurrentUser(await getUserById(id));
        }
    }

    async function pedidosUssuario() {
        usuarioActivo()
        let email = currentUser?.email;
        if(email !== undefined)
            setOrders(await getOrdersByEmail(email));
    }

    pedidosUssuario()

    return (
        
        <div>
            <div style={{ margin: '170px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Código</StyledTableCell>
                                <StyledTableCell>Fecha</StyledTableCell>
                                <StyledTableCell>Correo del comprador</StyledTableCell>
                                <StyledTableCell>Precio Compra (€)</StyledTableCell>
                                <StyledTableCell>Productos Comprado (Unidades)</StyledTableCell> 
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <OrderAdmin orders = {orders} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );

}

export default OrdersHistoryByUser;
