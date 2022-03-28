import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardHeader, CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const AddProdutcAdmin: FC = () => {

    const [urlBase, setUrl] = useState('https://i.postimg.cc/25fVD0hz/TE01.jpg')
    const [nombreP , setNombre] = useState('')
    const [descrip, setDescripcion] = useState('')
    const [stock, setStock] = useState()
    const [precio, setPrecio] = useState()
    const [categoria, setCategoria] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setCategoria(event.target.value as string)
    }

    return (
        <div style={{marginLeft: '450px', marginRight: 'auto', marginTop: '100px'}}>
            <Stack direction= "row">
                <Card sx = {{minWidth: 700, height: 1100}}>
                    <Stack direction = "column" spacing={3} style = {{marginLeft: '50px'}}>
                    <CardHeader title = 'Añadir un nuevo producto' />

                      <CardMedia component= "img" height= "400" width= "300" image={urlBase} />
                        <p></p>
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
                                    defaultValue= "Nombre Producto"
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
                                    rows= {5}
                                    maxRows = {10}
                                    multiline
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
                                        <MenuItem value = 'teclado'>Teclado</MenuItem>
                                        <MenuItem value = 'monitor'>Monitor</MenuItem>
                                        <MenuItem value = 'raton'>Ratón</MenuItem>
                                        <MenuItem value = 'almacenamiento'>Almacenamiento</MenuItem>
                                        <MenuItem value = 'sonido'>Sonido</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button variant = "contained" type = "submit">Añadir Producto Nuevo</Button>
                            </Stack>
                        </Box> 
                        </div>
                    </Stack>
                </Card>
            </Stack>

            <p></p>
        </div>
    );
} 


export default AddProdutcAdmin;