import { Product } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button} from '@mui/material';
import React, { useState } from 'react';
import { Typography, TextField, Stack} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const checkParams = (text: String) => {
    return text === "" || text == null;
}

const checkParamsNumber = (text: number) => {
    return text >= 0;
}

type ProductsProps = {
    produc: Product[]
}   

const Prod = {
    nombre: "Nombre",
    categoria: "Categoria",
    precio: 110,
    url: "string",
    descripcion: "gola",
    codigo: "gh",
    stock: 10
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 800,
    p: 4,
};


const ProdAdmin = (produc: ProductsProps):  JSX.Element => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [pulse, setPulse] = useState(false);

    // constantes para la actualizacio de los productos
    const [nombre, setNombre] = useState('');
    const [descrop, setDescrip] = useState('');
    const [urlCod, setUrl] = useState('') ;
    const [stock, setStock] = useState(0);
    const [precio, setPrecio] = useState(0);

    function saveP(o: Product){
        
        Prod.codigo = o.codigo;
        Prod.nombre = o.nombre;
        Prod.categoria = o.categoria;
        Prod.precio = o.precio;
        Prod.descripcion = o.descripcion;
        Prod.url = o.url; 
        handleOpen();
        
    }

   async function allFunc(nombre: string, descrip: string, stock: number, precio: number, url: string) {
       setPulse(true);
   }

    if(open){
        if(pulse){
            setPulse(false);
        }
        return(
            
            <Modal open = {open} onClose = {handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx ={style}>
                    <Stack direction = "column" spacing={2}>
                    <Typography id = "modal-title" variant = "h5" component = "h1">Actualización del producto {Prod.codigo}</Typography>
                    <TextField
                        id = "nombre"
                        required
                        variant = "outlined"
                        label = "Nombre del producto"
                        size = "small"
                        value = {nombre}
                        error = {checkParams(nombre) && pulse}
                        helperText={checkParams(nombre) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setNombre(e.target.value)}
                    />

                    <TextField
                        id = "descripción"
                        required
                        variant = "outlined"
                        label = "Descripcion del producto"
                        size = "small"
                        value = {descrop}
                        helperText={checkParams(descrop) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setDescrip(e.target.value)}
                    />

                    <TextField
                        id = "url"
                        required
                        variant = "outlined"
                        label = "Imagen del Producto (URL)"
                        size = "small"
                        value = {urlCod}
                        helperText={checkParams(urlCod) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setUrl(e.target.value)}
                    />

                    <TextField
                        id = "stock"
                        required
                        variant = "outlined"
                        label = "Stock"
                        size = "small"
                        value = {stock}
                        helperText={checkParamsNumber(stock) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setStock(e.target.value)}
                    />

                    <TextField
                        id = "precio"
                        required
                        variant = "outlined"
                        label = "Precio base del producto"
                        size = "small"
                        value = {precio}
                        helperText={checkParamsNumber(precio) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setPrecio(e.target.value)}
                    />

                    <Button onClick={ () => allFunc(nombre, descrop, stock, precio, urlCod)} variant = "contained" type = "submit">Actualizar producto</Button>

                    </Stack>
                </Box>
            </Modal>
        );
    }

    return (
        <>
        {produc.produc.map((p) => {
            return (
                <TableRow key={p.nombre} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{p.codigo}</TableCell>
                    <TableCell component="th" scope="row">{p.nombre}</TableCell>
                    <TableCell align='center'>{p.categoria}</TableCell>
                    <TableCell align='center'>{p.descripcion}</TableCell>
                    <TableCell align='center'>{p.precio}</TableCell>
                    <TableCell align='center'>18</TableCell>
                    <TableCell align='center'>{p.stock}</TableCell>
                    <TableCell align='center'><Button onClick={ () => saveP(p)}>Administrar</Button></TableCell>
                </TableRow>
            );
        })}
        </>
    );
}

export default ProdAdmin;