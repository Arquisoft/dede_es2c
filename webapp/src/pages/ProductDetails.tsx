import { useState, useEffect } from 'react';
import { Product } from '../shared/shareddtypes';
import {getProductByCode} from '../api/ApiProducts';
import { Typography, Paper, Grid, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Swal from 'sweetalert2';

const ProductDetails = () => {

    const pName = ((window.location.href.split('/'))[5]).replaceAll('%20', "");
    const [p0, setProdo] = useState<Product>();
    async function getProduct (nombre: string) {
         setProdo(await getProductByCode(nombre));
        
    }


    function añadirCarrito(){
        if(p0 === undefined || Number.parseInt(p0.stock) <= 0){
            Swal.fire({
                title: "Error", 
                text: "Lo sentimos, producto seleccionado no tiene existecnias o no existe",
                icon: "error"
            })
        }
    }

    useEffect(() => {getProduct(pName)});
    return (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
            <Grid> 
                <Paper elevation={8} style={{ margin: "3vh 5vw", padding: "1em" }}>
                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ p: 2 }}> 
                        <Grid item xs={12} md={6}>
                            <img alt = "Imagen del producto" src={p0?.url} style={{width: "60%"}}/>
                        </Grid>

                        <Grid container item xs={12} md={6} direction={"column"}>
                            <Typography component="h1" variant='h5'>{p0?.nombre}</Typography>
                            <Typography component="h1" >Categorías: {p0?.categoria}</Typography>
                            <Typography component="h1" >Descripcion: {p0?.descripcion}</Typography>
                            <Typography component="h1" >Precio: {p0?.precio}€</Typography>
                            <Button onClick={() => añadirCarrito()} variant="outlined" startIcon = {<AddShoppingCartIcon />}>
                                Añadir al carrito
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
    
}

export default ProductDetails;
