import { CardContent, CardHeader, Grid } from '@mui/material';
import { useState } from 'react';
import { getProducts } from '../api/api';
import { Product } from '../shared/shareddtypes';
import Card from '@mui/material/Card';

function Productos() {
    const [productos, setProductos] = useState<Product[]>([]);

    async function cargar() {
        const arr: Product[] = await getProducts();
        setProductos(arr);
    }

    cargar();

    const misMuertos = productos.map(
        (p) => {
            return (
                <Grid item xs = {13} sm = {5} md = {2}>
                    <Card>
                        <CardHeader title = {p.nombre}/>
                        <CardContent>{p.precio}</CardContent>
                    </Card>
                </Grid>
            )
        }
    )

    return (
        <div>
            <table>
                <Grid container spacing={3}>
                    {misMuertos}
                </Grid>
            </table>
        </div>

    )
}


export default Productos;
