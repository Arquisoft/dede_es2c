import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Product } from '../shared/shareddtypes';
import { getProductosByCategoria, getProducts } from '../api/api';
import Products from '../components/Products';

type ProductsProps = {
    onAddCart:(prod:Product) => (void);
    cartItems:Product[]
}

const ListProducts = (func:ProductsProps) => {
    const [prod, setProd] = useState<Product[]>([]);

    async function cargarProductos() {
        setProd(await getProducts());
    }

    async function filtrar(cat: string) {
        setProd(await getProductosByCategoria(cat));
    }

    useEffect(() => {cargarProductos();}, []);

    return(
        <div style={{margin: '75px', color: '#1976d2'}}>
            <p>Categorías: </p>
            <div className='Filtros' style ={ {height: '15vh'} }>
                <Stack direction="row" divider = {<Divider orientation='horizontal' flexItem/>} spacing = {0.5}>
                    <Button onClick={() => filtrar("almacenamiento")} variant="contained">Almacenamiento</Button>
                    <Button onClick={() => filtrar("monitor")} variant="contained">Monitores</Button>
                    <Button onClick={() => filtrar("raton")} variant="contained">Ratones</Button>
                    <Button onClick={() => filtrar("sonido")} variant="contained">Sonido</Button>
                    <Button onClick={() => filtrar("teclado")} variant="contained">Teclados</Button>
                    <Button onClick={() => cargarProductos()} variant="contained">Todos los productos</Button>
                </Stack>  
            </div>
            <Products product = {prod} onAddCart = {func.onAddCart} cartItems = {func.cartItems}/> 
        </div>
    );
}

export default ListProducts;