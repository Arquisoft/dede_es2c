import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardHeader, CardMedia, Container, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React, {useState } from 'react';
import Swal from 'sweetalert2';
import {addProduct} from "../../api/ApiProducts";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AddProduct = () => {
    const theme = createTheme({
        palette: {
          secondary: {
            main: '#6D9886'
          }
        }
      });
    const [urlBase, setUrl] = useState('https://i.postimg.cc/25fVD0hz/TE01.jpg')
    const [nombreP , setNombre] = useState('')
    const [descrip, setDescripcion] = useState('')
    const [stock, setStock] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoria, setCategoria] = useState('')

    function checkCampos(url: string, nombre: string, descipcion: string, precio: string, stock: string){
        if(url === '' || url === null || nombre === '' || nombre === null ||
        descipcion === '' || descipcion === null || Number.parseFloat(precio) < 0 || Number.parseInt(stock) <= 0 ){
            Swal.fire({
                title: "ERROR",
                text: "Alguno de los campos introducidos no es correcto",
                icon: "error"
            });
        }
    }

    async function add(url: string, nombre: string, descripcion: string, precio: string, categoria: string, stock: string){
        checkCampos(nombre, url, descripcion, precio, stock);
        await addProduct(url, nombre, descripcion, precio, categoria, stock);
        
    }

    const handleChange = (event: SelectChangeEvent) => {
        setCategoria(event.target.value as string)
    }


    return (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '125vh',backgroundColor:'#F6F6F6'}}>
                    <Container component= "main" maxWidth="sm" fixed={true} 
                    sx={{ position: "center",top: 150,backgroundColor:'#F6F6F6'}}>
                        <Card sx = {{minWidth: 700, height: 1100}}>
                            <Stack direction = "column" spacing={3} style = {{marginLeft: '50px'}}>
                            <CardHeader title = 'Añadir un nuevo producto' />
        
                              <CardMedia component= "img" height= "400" width= "300" image={urlBase} />
                                <div style={{borderLeft: '125px'}}> 
                                <Box sx = {{width: 600, height: 300, alignContent: 'center' }}>
                                    <Stack direction = "column" spacing = {2}>
        
                                        <TextField 
                                            id = "url"
                                            name = "Url Iamgen"
                                            label = "Url Imagen"
                                            size='small'
                                            value={urlBase}
                                            onChange = {(e: any) => setUrl(e.target.value)}
                                        />
        
                                        <TextField 
                                            id = "nombre"
                                            required
                                            name= 'Nombre Producto'
                                            label = 'Nombre Producto'
                                            variant='outlined'
                                            size = 'small'
                                            value={nombreP}
                                            onChange = {(e: any) => setNombre(e.target.value)}
                                        />
        
                                        <TextField 
                                            id = "stock"
                                            required
                                            label = 'Stock Producto'
                                            variant='outlined'
                                            size = 'small'
                                            value={stock}
                                            onChange = {(e: any) => setStock(e.target.value)}
                                        />
        
                                        <TextField 
                                            id = "precio"
                                            required
                                            label = 'Precio Base Producto'
                                            variant='outlined'
                                            size = 'small'
                                            value={precio}
                                            onChange = {(e: any) => setPrecio(e.target.value)}
                                        />
        
                                        <TextField 
                                            aria-label="empty textarea"
                                            placeholder="Descripcion del producto"
                                            minRows = {5}
                                            maxRows = {10}
                                            multiline
                                            required
                                            type = "text"
                                            value = {descrip}
                                            onChange = {(e: any) => setDescripcion(e.target.value)}
                                        />
        
                                        <FormControl >
                                            <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={categoria}
                                                label="Categoría"
                                                onChange={handleChange}
                                                required
                                            >
                                                <MenuItem value = 'teclado'>teclado</MenuItem>
                                                <MenuItem value = 'monitor'>monitor</MenuItem>
                                                <MenuItem value = 'raton'>raton</MenuItem>
                                                <MenuItem value = 'almacenamiento'>almacenamiento</MenuItem>
                                                <MenuItem value = 'sonido'>sonido</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ThemeProvider theme = {theme}>
                                        <Button color="secondary" variant = "contained" type = "submit" onClick={() => add(urlBase, nombreP, descrip, precio, categoria, stock)}>Añadir Producto Nuevo</Button>
                                        </ThemeProvider>
                                    </Stack>                                   
                                </Box> 
                                </div>
                            </Stack>
                        </Card>
        
                    </Container>
                </div>
    );
}

export default AddProduct;