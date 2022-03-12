import React, { FC } from 'react';
import Filters from '../components/Filters'
import Productos from '../components/Products';

function cargarProductos() {
    return (
        <div id = "lista productos">
            <Productos />
        </div>
    );
}

const ListProducts: FC = () => {
    return(
        <div style={{margin: '75px', color: '#1976d2'}}>
            <p>Categorías: </p>
            <Filters />
            {cargarProductos()}
        </div>
    );
}

export default ListProducts;