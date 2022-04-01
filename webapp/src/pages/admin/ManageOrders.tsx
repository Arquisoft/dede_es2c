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
import { getOrders } from '../../api/api';

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
    
    async function cargarPedidos() {
        setOrders(await getOrders());
    }

    useEffect(() => {cargarPedidos();}, []);

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

export default ManageOrders;