import { Product} from './shared/shareddtypes';
import React, { useState} from 'react';

declare var productos:Product[];
let getProductos = () => {
    return (
        productos
    );
}
let añadirProducto = (prod:Product) => {
    const exist = productos.find(x=> x.codigo == prod.codigo);
    if(exist){
      setCartItems(productos.map(x=> x.codigo == prod.codigo ? {...exist, cantidad : exist.cantidad +1} : x))
    } else {
      setCartItems([...productos,{...prod,cantidad:1}])
    }
}

let setCartItems = (array:Product[]) =>{
    productos = array;
}
export default {getProductos,añadirProducto};