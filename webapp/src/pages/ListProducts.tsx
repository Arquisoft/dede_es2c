import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {Filtros} from '../stories/Button.stories';
import {TextCategorias} from '../stories/Text.stories';
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
import Container from '@mui/material/Container';
import { relative } from 'path';

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
        setProd(await getProductosByCategoria(cat));
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
    <Container style= {{
            position:'relative',
            top:10,
            height:1800,
            width:700,
        }}>
            <Container style = {{
                position:'relative',
                top: 150,
                right:600
            }}>
                <TextCategorias/>
                <Stack direction="column" spacing={2} style={{
                width:150,
                height:50
                }}>
            <Filtros backgroundColor="#06ee99" label="Almacenamiento" onClick={() => filtrar("almacenamiento")}/>
            <Filtros backgroundColor="#06ee99" label="Monitores" onClick={() => filtrar("monitor")}/>
            <Filtros backgroundColor="#06ee99" label="Ratones" onClick={() => filtrar("raton")}/>
            <Filtros backgroundColor="#06ee99" label="Sonido" onClick={() => filtrar("sonido")}/>
            <Filtros backgroundColor="#06ee99" label="Teclados" onClick={() => filtrar("teclado")}/>
            <Filtros backgroundColor="#06ee99" label="Todos los productos" onClick={() => filtrar("")}/>
            </Stack> 
            </Container>
            <Container style = {{
                position:'relative',
                right:250,
                width:1500
            }}>
            
            <div className='Filtros' style ={ {height: '15vh'} }>
            <Stack direction="row" divider = {<Divider orientation='horizontal' flexItem/>} spacing = {0.5}>                  
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
            </Container>
        </Container>    
    );
}

export default ListProducts;

       