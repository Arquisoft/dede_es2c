
import React, { useState } from 'react';
import { Button, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Product} from '../shared/shareddtypes';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type ProductsProps = {
    product: Product[]
    onAddCart:(prod:Product) => (void);
    cartItems:Product[]
    homePage: boolean
}
        
const Prod = {
    nombre: "Nombre",
    categoria: "Categoria",
    precio: 110,
    url: "string",
    descripcion: "gola",
    stock: '10'
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const Productos = ( product: ProductsProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function saveP(o: Product){
        handleOpen();
        Prod.nombre = o.nombre;
        Prod.categoria = o.categoria;
        Prod.precio = o.precio;
        Prod.descripcion = o.descripcion;
        Prod.url = o.url;
        Prod.stock = o.stock;
    }

    function handleAddCart(){
        if(!localStorage.token)
            window.location.assign("/login");
    }


    if(open){

        if(Prod.stock != '0'){

            return (
                
                <Modal open = {open} onClose = {handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx = {style}>
                    <Typography id = "modal-modal-title" variant = "h6" component= "h2">{Prod.nombre}</Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>Categoria: {Prod.categoria} </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>Descripcion del Producto: {Prod.descripcion}</Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>Precio del producto: {Prod.precio}</Typography>

                    {/* <IconButton onClick={() => product.onAddCart(Prod)} aria-label='Añadir al carrito' >
                              <AddShoppingCartIcon />
                      </IconButton> */}

                    <img src= {Prod.url} alt  = {Prod.nombre}/>

                </Box>
            </Modal>

            );
        } else {
            return (
            <Modal open = {open} onClose = {handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx = {style}>
                <Typography id = "modal-modal-title" variant = "h6" component= "h2">{Prod.nombre}</Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>Categoria: {Prod.categoria} </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>Descripcion del Producto: {Prod.descripcion}</Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>Precio del producto: {Prod.precio}</Typography>

                <Button variant="outlined" color='error' startIcon = {<ClearIcon />}>
                    NO STOCK
                </Button>

                <img src= {Prod.url} alt  = {Prod.nombre}/>

            </Box>
        </Modal>
            ); 
        }
    }

    return (
        <Grid container spacing={3}>
         {product.product.map(
            (p) => {
                
                if(product.homePage){
                    if(Number.parseInt(p.stock) <= 5 && Number.parseInt(p.stock) > 0 ){
                        return(
                            <Grid item xs={3} md={3}>
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
                                        <Button onClick={ () => saveP(p) } variant="outlined" startIcon = {<InfoIcon />}>
                                            Más información
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    }
                } else {

                    if(p.stock != '0') {
                        return (
                            <Grid item xs={3} md={3}>
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
                                        <Button onClick={ () => saveP(p) } variant="outlined" startIcon = {<InfoIcon />}>
                                            Más información
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                    );
                    } else {
                        return (
                            <Grid item xs={3} md={3}>
                                <Card  sx={{ maxWidth: 600, maxHeight: 700, minHeight: 700}}>
                                    <CardHeader title = {p.nombre}/>
                                    <CardMedia component="img" height="300" width = "300" image={p.url} alt={p.nombre} />
                                    <CardContent>Precio: {p.precio}€</CardContent>
                                    <CardContent>Descripción del producto:</CardContent>
                                    <CardContent>{p.descripcion}</CardContent>
                                    <CardActions>
                                        <Button variant="outlined" color='error' startIcon = {<ClearIcon />}>
                                            NO STOCK
                                        </Button>
                                        <Button onClick={ () => saveP(p) } variant="outlined" startIcon = {<InfoIcon />}>
                                            Más información
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
    );
}


export default Productos;
