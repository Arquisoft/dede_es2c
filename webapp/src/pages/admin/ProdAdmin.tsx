import { Product } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button} from '@mui/material';
import React, { useState } from 'react';
import { Typography, TextField, Stack} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import Swal from 'sweetalert2';
import ClearIcon from '@mui/icons-material/Clear';

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
    var [nombre, setNombre] = useState('');
    let [descrop, setDescrip] = useState('');
    let [urlCod, setUrl] = useState('') ;
    let [stock, setStock] = useState(0);
    let [precio, setPrecio] = useState(0);
    let [codigo, setCodigo] = useState('');

    function saveP(o: Product){
        
        Prod.codigo = o.codigo;
        Prod.nombre = o.nombre;
        Prod.categoria = o.categoria;
        Prod.precio = o.precio;
        Prod.descripcion = o.descripcion;
        Prod.url = o.url; 

        setNombre(o.nombre);
        setDescrip(o.descripcion)
        setStock(Number.parseFloat(o.stock));
        setPrecio(o.precio);
        setUrl(o.url)
        setCodigo(o.codigo);
        handleOpen();
        
    } 

    async function allFunc(codigo: string, nombre: string, descrip: string, stock: number, precio: number, url: string) {
        // http://localhost:5000/product/update/codeExample/?nombre=namePrueba&descripcion=descripcionPrueba
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        axios.get(apiEndPoint + "/product/update/" + 
            codigo + "/?nombre=" + nombre + "&descripcion" + descrip + 
            "&precio=" + precio + "&url=" + url + '&stock=' + stock).then(
            res => {
                setPulse(true);
                if(res.status !== 404){
                    Swal.fire(
                        'Actualizado!',
                        'Este prodcuto ha sido actualizado.',
                        'success'
                    ).then( () =>{
                        window.location.assign("/admin/manageProducts");
                    })
                }else {
                    Swal.fire(
                        'Ha ocurrido un problema',
                        'error'
                    )
                }
            }
        )
        
    }

    async function eliminar(pro: Product){
        Swal.fire({
            title: '¿Estás seguro de eliminar el producto ' + pro.nombre + '?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
          }).then((result) => {
            if (result.isConfirmed) {
                const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
                axios.get(apiEndPoint + "/product/delete/" + pro.codigo).then(res => {
                    if(res.status !== 404){
                        Swal.fire(
                            'Eliminado!',
                            'Este prodcuto ha sido eliminado.',
                            'success'
                        ).then(() => {
                            window.location.assign("/admin/manageProducts");
                        }
                        )
                    }else {
                        Swal.fire(
                            'Ha ocurrido un problema',
                            'error'
                        )
                    }
                })
            }
          })
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
                        defaultValue={nombre}
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
                        defaultValue={descrop}
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
                        defaultValue={urlCod}
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
                        defaultValue = {stock}
                        helperText={checkParamsNumber(stock) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setStock(e.target.value)}
                    />

                    <TextField
                        id = "precio"
                        required
                        variant = "outlined"
                        label = "Precio base del producto"
                        size = "small"
                        defaultValue={precio}
                        value = {precio}
                        helperText={checkParamsNumber(precio) && pulse ? 'La casilla no puede estar vacia' : ''}
                        onChange = {(e: any) => setPrecio(e.target.value)}
                    />

                    <Button onClick={ () => allFunc(codigo, nombre, descrop, stock, precio, urlCod)} variant = "contained" type = "submit">Actualizar producto</Button>

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
                    <TableCell align='center'>
                        <Button variant="outlined" color='error' onClick = {() => eliminar(p)} startIcon = {<ClearIcon />}>Eliminar Producto</Button>
                    </TableCell>
                </TableRow>
            );
        })}
        </>
    );
}

export default ProdAdmin;