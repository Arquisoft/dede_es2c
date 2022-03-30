import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import Home from '../src/pages/Home';
import { Product } from '../src/shared/shareddtypes';



test('prueba', () => {
    const [cartItems,setCartItems] = useState<Product[]>([]);
    const onAddCart = (prod : Product) => {
    const exist = cartItems.find(x=> x.codigo === prod.codigo);
    if(exist){
      setCartItems(cartItems.map(x=> x.codigo === prod.codigo ? {...exist, cantidad : exist.cantidad +1} : x))

    } else {
      setCartItems([...cartItems,{...prod,cantidad:1}])
    }
    }

    render(<Home onAddCart={onAddCart} cartItems = {cartItems}/>)
    const linkElement = screen.getByAltText(/Banner/i);
    expect(linkElement).toBeInTheDocument();
});
