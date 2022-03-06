import React, { useState, useEffect, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import 'bootswatch/dist/simplex/bootstrap.min.css'; // CSS que se va a utilizar
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../img/logo-dede.svg';
import { Card, CardContent } from '@mui/material';


const LogIn: FC = () => {
    return ( 
        <div>
            <Container component= "main" maxWidth="sm">
                <Card className={"main"} elevation={10} style={{display: "grid"}}>
                    <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                    <div role= "banner">
                        <img  width={300} height = {300}  src={logo} alt=""/>
                    </div>

                    <Stack direction= "column" spacing={2}>
                        
                            <TextField 
                                id = "idUsuario"
                                required
                                name = "Nombre usuario"
                                label = "Nombre Usuario"
                                defaultValue= "Nombre Usuario"
                                variant="outlined"
                                size="small"
                            />

                            <TextField 
                                id = "conUsuario"
                                required
                                name = "Contraseña"
                                label = "Contraseña"
                                type= "password"
                                defaultValue= "Contraseña"
                                size="small"
                            />

                            <Button variant="contained" href="#contained-buttons">
                                Iniciar Sesión
                            </Button>
                        
                    </Stack>
                    
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default LogIn; 