import { Button, CardActions, CardContent, CardHeader, CardMedia, Grid} from '@mui/material';
import { Product} from '../shared/shareddtypes';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {v4 as uuidv4} from 'uuid';

type ProductsProps = {
    product: Product[]
    onAddCart:(prod:Product) => (void);
    cartItems:Product[]
    homePage: boolean
}
        
const Productos = ( product: ProductsProps) => {

    return (
        <>
        <Grid container spacing={3} key = {uuidv4()}>
         {product.product.map(
            (p) => {
                
                if(product.homePage){
                    if(Number.parseInt(p.stock) <= 5 && Number.parseInt(p.stock) > 0 ){
                        return(
                            <Grid item xs={3} md={3} key = {p.codigo}>
                                <Card  sx={{ maxWidth: 600, maxHeight: 700, minHeight: 700}}>
                                    <CardHeader title = {p.nombre}/>
                                    <CardMedia component="img" height="300" width = "300" image={p.url} alt={p.nombre} />
                                    <CardContent>Precio: {p.precio}€</CardContent>
                                    <CardContent>Descripción del producto:</CardContent>
                                    <CardContent>{p.descripcion}</CardContent>
                                    <CardActions>
                                        <Button onClick={() => product.onAddCart(p)} variant="outlined" startIcon = {<AddShoppingCartIcon />}>
                                            Añadir al carrito
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    }
                } else {

                    if(Number.parseInt(p.stock) > 0) {
                        return (
                            <Grid item xs={3} md={3} key = {p.codigo}>
                                <Card  sx={{ maxWidth: 600, maxHeight: 700, minHeight: 700}}>
                                    <CardHeader title = {p.nombre}/>
                                    <Link to ={"/products/details/" + p.codigo} className = "nav-link">
                                        {/* <CardMedia component="img" height="300" width = "300" src={p.url} alt={p.nombre} /> */}
                                        <img alt = "Imagen del producto" src={p.url} style={{width: "80%", alignItems: "center", textAlign: "center", 
                                            marginLeft: "auto", marginRight: "auto"}}/>
                                    </Link>
                                    <CardContent>Precio: {p.precio}€</CardContent>
                                    <CardContent>Descripción del producto:</CardContent>
                                    <CardContent>{p.descripcion}</CardContent>
                                    <CardActions>
                                        <Button onClick={() => product.onAddCart(p)} variant="outlined" startIcon = {<AddShoppingCartIcon />}>
                                            Añadir al carrito
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid item xs={3} md={3} key = {p.codigo}>
                                <Card  sx={{ maxWidth: 600, maxHeight: 700, minHeight: 700}}>
                                    <CardHeader title = {p.nombre}/>
                                    <Link to ={"/products/details/" + p.codigo} className = "nav-link">
                                        <CardMedia component="img" height="300" width = "300" src={p.url} alt={p.nombre} />
                                    </Link>
                                    <CardContent>Precio: {p.precio}€</CardContent>
                                    <CardContent>Descripción del producto:</CardContent>
                                    <CardContent>{p.descripcion}</CardContent>
                                    <CardActions>
                                        <Button variant="outlined" color='error' startIcon = {<ClearIcon />}>
                                            NO STOCK
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                    );
                } 
            }
            }
        )}
        </Grid>
        </>
    );
}


export default Productos;
