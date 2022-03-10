import { Product } from '../shared/shareddtypes';
import {getProducts} from '../api/api';
import React, { useState, useEffect, FC } from 'react';


const Home: FC = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const createProduct = async () => {
        const pro: Product[] = await getProducts();
        setProducts(pro);
    }

    useEffect(() => {
        createProduct();

        products.forEach(p => {
            console.log(p.categoria);
        });
    })

    return (
        <div>

        </div>
    )

}
export default Home;