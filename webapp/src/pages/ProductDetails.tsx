import React, { useState, useEffect, FC } from 'react';
import { Product } from '../shared/shareddtypes';
import {getProducts, getProductByCode} from '../api/ApiProducts';

type ProdProps = {
    id: string
}

const ProductDetails = (params: ProdProps) => {

    const [prod, setProd] = useState<Product[] | undefined | null>();
    const [p, setProd2] = useState<Product>();
    async function getProduct () {
         setProd(await getProducts());

         setProd2(await getProductByCode(params.id));
         console.log(p)
    }

    useEffect(() => {getProduct()});
    /* if(prod !== undefined && prod !== null){
        // eslint-disable-next-line no-lone-blocks
        {prod.forEach((p) => {
            if(p.codigo === params.id){
                return (
                    <>
                        <div style={{margin: '75px', color: '#1976d2'}} >
                            {p.nombre}
                        </div>
                    </>
                );
            }
        })}
       
    } else {
        return (
        <>
        <div style={{margin: '75px', color: '#1976d2'}} >
                <p>Lo sentimos, pero no existe ese producto</p>
        </div>
        </>
        );
    } */
    return (
        <>
        <div style={{margin: '75px', color: '#1976d2'}} >
                <p>xxd</p>
        </div>
        </>
    );
    
}

export default ProductDetails;