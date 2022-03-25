import React, {FC } from 'react';
import { Product } from '../shared/shareddtypes';

type cart = {
    cartItems:Product[];
}
const ProductsSummary= (cart: cart) => {
   
    return(
    <div className='Home'
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
            <div>
                {<h2>Cart tiene {cart.cartItems.length} elementos</h2>}
            </div>
        </div>
    );
}

export default ProductsSummary;