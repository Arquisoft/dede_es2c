import React, { FC, useEffect } from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {  getProducts } from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import ProdAdmin from '../admin/ProdAdmin';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const ManageProducts: FC = ()  => {
    const [prod, setProd] = React.useState<Product[]>([]);

    async function cargarProductos() {
        setProd(await getProducts());
    }

    useEffect(() => {cargarProductos();}, []);

    return (
       
        <div>
            {/* <StackAdmin /> */}
            <div style={{ margin: '170px' }}>
                <TableContainer component={Paper}>                    
                    <Table  sx={{ minWidth: 650}} aria-label="customized table">                                      
                        <TableHead >
                            <TableRow>
                                <StyledTableCell>Código</StyledTableCell>
                                <StyledTableCell align='center'>Nombre</StyledTableCell>
                                <StyledTableCell align='right'>Categoría</StyledTableCell>
                                <StyledTableCell align='center'>Descripción</StyledTableCell>
                                <StyledTableCell align='right'>Precio Base (€)</StyledTableCell>
                                <StyledTableCell align='right'>I.V.A (%)</StyledTableCell>
                                <StyledTableCell align='right'>Stock</StyledTableCell>
                                <StyledTableCell align='center'>Adminsitrar</StyledTableCell>
                                <StyledTableCell align='center'>Eliminar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        

                        {/*  Cuerpo de la tabla */}

                        <TableBody>

                            <ProdAdmin produc={prod} />

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
        
    );
}

export default ManageProducts;