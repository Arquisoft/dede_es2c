import { CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { getProducts } from '../api/api';
import { Product } from '../shared/shareddtypes';
import Card from '@mui/material/Card';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Productos() {
    const [productos, setProductos] = useState<Product[]>([]);

    async function cargar() {
        const arr: Product[] = await getProducts();
        setProductos(arr);
    }

    cargar();

    const listaProductos = productos.map(
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
                            <IconButton aria-label='Añadir al carrito' >
                                <AddShoppingCartIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            )
        }
    )

    return (
        <div>
            <table>
                <Grid container spacing={3}>
                    {listaProductos}
                </Grid>
            </table>
        </div>

    )
}


export default Productos;
