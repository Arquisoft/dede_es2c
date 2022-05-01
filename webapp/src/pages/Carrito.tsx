import { Product } from "../shared/shareddtypes";
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';
import {TableBody, Paper, Table,TableContainer, TableHead, Button, TableCell, TableRow} from "@mui/material";

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
    const cart: Product[] = [];
    var precioProductosFinal: number = 0;
    var size: number = 0;
    if(carrt2 !== null){
        size = JSON.parse(carrt2).length;
        for(let i =0;  i < size; i++){
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
            console.log(cart[i]);
            precioProductosFinal += cart[i].precio * cart[i].cantidad;
        }
        console.log(precioProductosFinal + "");
    }

    console.log(cart)
    console.log(cart.length)
    // const carrito = JSON.parse(sessionStorage.getItem('carrito') as string);
    // localStorage.setItem("carrito", JSON.stringify(localStorage.getItem("carrito")));

        if(cart.length === 0){
            return(
                
                <div className='Home' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180vh' }}>
                 <p>El carrito esta vacio</p>
                </div>
            );
        } else {
            return(
              <div style={{ margin: '170px' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Artículo</StyledTableCell>
                        <StyledTableCell>Cantidad</StyledTableCell>
                        <StyledTableCell>Precio Articulo</StyledTableCell>
                        <StyledTableCell>Precio Total Articulo</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cart.map((item: Product) => (
                          <>
                          <TableRow key={item.nombre} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell>{item.nombre}</StyledTableCell>
                          <StyledTableCell>{item.cantidad}</StyledTableCell>
                          <StyledTableCell>{item.precio}</StyledTableCell>
                          <StyledTableCell>{item.precio * item.cantidad}</StyledTableCell>
                          </TableRow>
                          </>
                      ))}
                      <TableRow key = {"Precio Final"}>
                          <StyledTableCell>{""}</StyledTableCell>
                          <StyledTableCell>{""}</StyledTableCell>
                          <StyledTableCell>{"Precio Final"}</StyledTableCell>
                          <StyledTableCell>{precioProductosFinal.toFixed(2)}</StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <p></p>
                <Button sx = {{minWidth: 650}} variant="contained" onClick={() => mover()}>CONFIRMAR PAGO</Button>
              </div>
            );
        }

      function mover(){
        localStorage.setItem("carrito", JSON.stringify(cart));
        window.location.assign('/pago')
      }

}

export default Carrito;