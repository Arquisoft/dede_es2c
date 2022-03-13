import { CardActions, CardContent, CardHeader, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { getProductosByCategoria, getProducts } from '../api/api';
import { Product } from '../shared/shareddtypes';
import Card from '@mui/material/Card';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type filtrado= {
    categoria: string;
}

function Productofiltrado(categoria: filtrado) {
    const [productos, setProductos] = useState<Product[]>([]);

    async function cargar() {
        const arr: Product[] = await getProductosByCategoria(categoria.categoria);
        setProductos(arr);
    }

    cargar();

    const listaProductos = productos.filter(
        (p) => {
            return (
                <Grid item xs = {13} sm = {5} md = {2}>
                    <Card>
                        <CardHeader title = {p.nombre}/>
                        <CardContent>{p.precio}€</CardContent>
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


export default Productofiltrado;
