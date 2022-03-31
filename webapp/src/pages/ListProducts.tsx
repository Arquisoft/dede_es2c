import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Product } from '../shared/shareddtypes';
import { getProductosByCategoria, getProducts } from '../api/api';
import Products from '../components/Products';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import EuroIcon from '@mui/icons-material/Euro';

type ProductsProps = {
    onAddCart:(prod:Product) => (void);
    cartItems:Product[]
}

const ListProducts = (func:ProductsProps) => {
    const [prod, setProd] = useState<Product[]>([]);
    const [value, setValue] = React.useState<number>(500);
    const [max] = React.useState<number>(500);

    const handleChange = ( event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        filtrarPrecio2(newValue as number);
    };

    async function filtrarPrecio2(v: number) {
        const aux: Product[] = await getProducts();
        const aux2: Product[] = [];
        let cAux2 = 0;
        for(let i = 0; i < aux.length; i++){
            if(aux[i].precio <= v){
                aux2[cAux2] = aux[i];
                cAux2++;
            }
        }   

        setProd(aux2);
    
   }

    async function cargarProductos() {
        setProd(await getProducts());
    }

    async function filtrar(cat: string) {
        let aux: Product[] = []
        let auxNum = 0;
        for (let index = 0; index < prod.length; index++) {
            
            if(prod[index].categoria === cat){
                aux[auxNum] = prod[index];
                auxNum++;
            }
            
        }
        setProd(aux);
    }

    async function filtroPrecio(orden: string) {
        const aux: Product[] = await getProducts();

        const sorted:Product[] = aux.sort((n1, n2):number => {
                const _a = n1.precio;
                const _b = n2.precio;
                return (_a -_b);
            }
        );

        if(orden === 'mayor'){
            setProd(sorted);
        } else{
            setProd(sorted.reverse());
        }
        
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
                    <Box sx = {{ width: 250 }}>
                        <Typography id = "input-slider" gutterBottom>Precio</Typography>
                        <Grid container spacing={2} alignItems = "center">
                            <Grid item><EuroIcon /></Grid>
                            <Grid item xs>
                                <Slider aria-label='Precio'  value = {value} onChange={handleChange} valueLabelDisplay = "on" max = {max} />
                            </Grid>
                        </Grid>
                    </Box>
                    <FormControl >
                        <InputLabel variant='standard' htmlFor = 'uncontrolled'>Precio: </InputLabel>
                            <NativeSelect>
                                <option onClick={() => cargarProductos()}>Por defecto</option>
                                <option onClick={() => filtroPrecio('mayor')}>Menor a mayor</option>
                                <option onClick={() => filtroPrecio('menor')}>Mayor a menor</option>
                            </NativeSelect>
                    </FormControl>
                    
                </Stack>  
            </div>
            <Products homePage = {false} product = {prod} onAddCart = {func.onAddCart} cartItems = {func.cartItems}/> 
        </div>
    );
}

export default ListProducts;