import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import CropSquareIcon from '@mui/icons-material/CropSquare';

const goTo = (pos: string) => {
    if(pos === "productos"){
        window.location.assign("/admin/manageProducts");
    }else if (pos === "añadir"){
        window.location.assign("/admin/addProduct");
    }else if(pos === "usuarios"){
        window.location.assign("/admin/manageUsers");
    }else if(pos === "inicio"){
        window.location.assign("/");
    }
}

const StackAdmin  = () => {
    return (
        <div style={{margin: '100px',  borderLeft: '100px', maxWidth: '200px'}}>
            
            <Card elevation={10}>
                <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                    <Stack direction= "column" spacing={2}>
                        <Typography align='center' variant="h5" gutterBottom component="div" color= '#1976d2'>Administrador</Typography>
                        <Button startIcon = {<CropSquareIcon />} onClick = {() => goTo("inicio")}>Inicio</Button>
                        <Button startIcon = {<CropSquareIcon />} onClick = {() => goTo("productos")}>Administrar Productos</Button> 
                        <Button startIcon = {<CropSquareIcon />} onClick = {() => goTo("añadir")}>Añadir Productos</Button> 
                        <Button startIcon = {<CropSquareIcon />} onClick = {() => goTo("usuarios")}>Ver Usuarios</Button> 
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
}

export default StackAdmin;