import React, { FC, useEffect  } from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Order } from '../../shared/shareddtypes';
import Paper from '@mui/material/Paper';
import OrderAdmin from '../admin/OrderAdmin';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const ManageOrders: FC = () => {

    const [orders, setOrders]  = React.useState<Order[]>([]);

    /* async function cargarPedidos() {
        setOrders(await getOrders());
    } */

    const getOrders2 = async () => {
        const data = await axios.get('http://localhost:5000/order/list').then(res => {
            setOrders(res.data)
        })
        return data != null
    }

    useEffect(() => {getOrders2();}, []);

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
                                <StyledTableCell>Precio Compra</StyledTableCell>
                                 <StyledTableCell>Productos Comprados</StyledTableCell> 
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <OrderAdmin order = {orders} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );

}

export default ManageOrders;