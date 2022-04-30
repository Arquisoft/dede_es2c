import React, { useEffect, Fragment } from "react";
import { Product, Object } from "../shared/shareddtypes";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Container, Grid, Typography, Card, CardMedia, Button, ListSubheader , ListItem, List, ListItemText} from "@mui/material";
import { keys } from "@mui/system";

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
            precioProductosFinal += cart[i].precio;
        }
        console.log(precioProductosFinal + "");
    }

    console.log(cart)
    console.log(cart.length)
    const carrito = JSON.parse(sessionStorage.getItem('carrito') as string);
    // localStorage.setItem("carrito", JSON.stringify(localStorage.getItem("carrito")));

        if(cart.length === 0){
            return(
                
                <div className='Home' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180vh' }}>
                 <p>El carrito esta vacio</p>
                </div>
            );
        } else {
            return(
                <Fragment>
                    <List
                    style={{ display: "grid", margin: "auto", textAlign: "center" }}
                    sx={{
                      width: '100%',
                      maxWidth: 700,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 700,
                      '& ul': { padding: 0 },
                    }}
                    >
                      <li key={'Productos'}>
                        <ul>
                          <ListSubheader>Me cago en to</ListSubheader>
                          {cart.map((item: Product) => (
                              
                            <ListItem key={item.nombre} alignItems="center">
                            <ListItemText primary={"x" + item.precio + "\t"+item.categoria + ":"} />
                            </ListItem>
                            ))}
                        </ul>
                        <ul>
                        <ListItem>
                        <ListItemText primary={precioProductosFinal.toFixed(2) + "$"}/>
                        </ListItem>
                        </ul>
                      </li>
                    </List>
                    </Fragment>
            );
                    }

}

export default Carrito;