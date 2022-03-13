import React, { FC } from 'react';
import Productos from '../components/Products';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ProductosFiltrado from '../components/ProductosPorFiltro';

function cargarProductos() {
    return (
        <div id = "lista productos">
            <Productos />
        </div>
    );
}

function filtrar(cat: string){

    return (
        <div id = "lista productos filtro" >
            <ProductosFiltrado  categoria= "monitor"/>
        </div>
    )

}

const ListProducts: FC = () => {
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
            {cargarProductos()}
        </div>
    );
}

export default ListProducts;