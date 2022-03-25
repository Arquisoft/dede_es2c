import React from 'react';
import { Product } from '../shared/shareddtypes';

type CartProps =  {
    cartItems:Product[];
}

export default function Basket(items :CartProps){
    const cartItems = items.cartItems;
    return(
        <aside className = "block col-1">
            <h2>Cart Item</h2>
            <div>
                {cartItems.length == 0 && <div>Cart Is Empty</div>}
            </div>
        </aside>
    )
}
