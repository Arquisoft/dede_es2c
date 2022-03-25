import React, { useState } from 'react';
import { Button, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton } from '@mui/material';
import { Product} from '../shared/shareddtypes';
import Card from '@mui/material/Card';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from './NavBar';

type ProductsProps = {
    product: Product[]
}
const Productos = ( product: ProductsProps) => {
    
    const [cartItems,setCartItems] = useState<Product[]>([]);
    const onAddCart = (prod : string) => {
        var num = NavBar.arguments;
    }
    return (
        <Grid container spacing={3}>
         {product.product.map(
            (p) => {
                return (
                    <Grid item xs={3} md={3}>
                        <Card  sx={{ width: 400}}>
                            <CardHeader title = {p.nombre}/>
                            <CardMedia component="img" height="300" width = "270" image={p.url} alt={p.nombre} />
                            <CardContent>Precio: {p.precio}€</CardContent>
                            <CardContent>Descripción del producto:</CardContent>
                            <CardContent>{p.descripcion}</CardContent>
                            <CardActions>
                                <IconButton onClick={() => onAddCart(p.codigo)} aria-label='Añadir al carrito' >
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            }
        )}
        </Grid>
    );
}


export default Productos;
