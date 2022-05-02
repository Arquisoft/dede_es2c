import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {Filtros} from '../stories/Button.stories';
import {TextCategorias,TextSlider} from '../stories/Text.stories';
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
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      secondary: {
        main: '#6D9886'
      }
    }
  });
  

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }
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
            backgroundColor:'6D9886'
        }}>

            <Container style = {{
                position:'relative',
                top: 150,
                right:600,
                backgroundColor:'6D9886'
            }}>
                <Stack direction="column" spacing={2} style={{
                width:150,
                height:50
                }}>
                            <FormControl >
            <InputLabel variant='standard' htmlFor = 'uncontrolled'>Precio: </InputLabel>
                <NativeSelect>
            <option onClick={() => cargarProductos()}>Por defecto</option>
            <option onClick={() => filtroPrecio('mayor')}>Menor a mayor</option>
            <option onClick={() => filtroPrecio('menor')}>Mayor a menor</option>
            </NativeSelect>
                </FormControl>
                <TextCategorias/>
            <Filtros backgroundColor="#6D9886" label="Almacenamiento" onClick={() => filtrar("almacenamiento")}/>
            <Filtros backgroundColor="#6D9886" label="Monitores" onClick={() => filtrar("monitor")}/>
            <Filtros backgroundColor="#6D9886" label="Ratones" onClick={() => filtrar("raton")}/>
            <Filtros backgroundColor="#6D9886" label="Sonido" onClick={() => filtrar("sonido")}/>
            <Filtros backgroundColor="#6D9886" label="Teclados" onClick={() => filtrar("teclado")}/>
            <Filtros backgroundColor="#6D9886" label="Todos los productos" onClick={() => filtrar("")}/>
            <Box sx = {{ width: 250 }}>
                <TextSlider></TextSlider>
            <Grid container spacing={2} alignItems = "center">
            <Grid item><EuroIcon /></Grid>
            <Grid item xs>
                <ThemeProvider theme = {theme}>
                    <Slider color = "secondary"aria-label='Precio'  value = {value} onChange={handleChange} valueLabelDisplay = "on" max = {max} />
                    </ThemeProvider>
            
        </Grid>
        </Grid>
        </Box>

            </Stack> 
            </Container>
            <Container style = {{
                position:'relative',
                top:150,
                right:250,
                width:1500
            }}>
    <Products homePage = {false} product = {prod} onAddCart = {func.onAddCart} cartItems = {func.cartItems}/> 
            </Container>
        </Container>    
    );
}

export default ListProducts;

       