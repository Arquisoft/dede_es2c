import React from "react";
import { Product } from "../shared/shareddtypes";
import { Table, Paper, TableContainer, TableHead, TableRow, TableBody} from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CarritoItem from '../components/utils/CarritoItem'

const Carrito = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#1976d2",
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));


    const carrt2 = localStorage.getItem("carrito");
    console.log(carrt2)
    var cart: Product[] = [];
    var precioProductosFinal: number = 0;

    if(carrt2 !== null){
        for(let i =0;  i < JSON.parse(carrt2).length; i++){
            cart[i] = {
                nombre: JSON.parse(carrt2)[i]['nombre'],
                codigo: JSON.parse(carrt2)[i]['codigo'],
                descripcion: JSON.parse(carrt2)[i]['descripcion'],
                precio: JSON.parse(carrt2)[i]['precio'],
                cantidad: JSON.parse(carrt2)[i]['cantidad'],
                url: JSON.parse(carrt2)[i]['url'],
                stock: JSON.parse(carrt2)[i]['stock'],
                categoria: JSON.parse(carrt2)[i]['categoria'],
            }
            precioProductosFinal += cart[i].precio;
        }
    }

     localStorage.setItem("carrito", JSON.stringify(localStorage.getItem("carrito")));

     console.log(cart)
        if(cart.length === 0){
            return(
                
                <div className='Home' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180vh' }}>
                 <p>El carrito esta vacio</p>
                </div>
            );
        }
        return(
            <div style={{ margin: '170px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Articulo</StyledTableCell>
                                <StyledTableCell>Precio</StyledTableCell>
                                <StyledTableCell>Cantidad</StyledTableCell>
                                <StyledTableCell>Total</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <CarritoItem items={cart} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    

}

export default Carrito;