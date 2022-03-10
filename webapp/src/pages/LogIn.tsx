import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import 'bootswatch/dist/simplex/bootstrap.min.css'; // CSS que se va a utilizar
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../img/logo-dede.svg';
import { Card, CardContent } from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';
// import Check from '../checks/Arguments'


const checkParams = (text: String) => {
    return text === "" || text == null;
}

const handleLogin = (idUser: String,pass: String) => {
   axios.post("http://localhost:5000/user/login",{"email":idUser,"password":pass})
   .then(res => {
       console.log(res);
       console.log(res.data);
   })
}

const LogIn: FC = () => {
    const [idUsuario, setId] = useState('')
    const [pass, setPass] = useState('')
    const [pulse, setPulse] = useState(false)
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
                                value = {idUsuario}
                                error = {checkParams(idUsuario) && pulse}
                                onChange = {e => setId(e.target.value)}
                               // helperText = "Valor incorrecto"
                            />

                            <TextField 
                                id = "conUsuario"
                                required
                                name = "Contraseña"
                                label = "Contraseña"
                                type= "password"
                                defaultValue= "Contraseña"
                                size="small"
                                variant="outlined"
                                value = {pass}
                                error = {checkParams(idUsuario) && pulse}
                                onChange = {e => setPass(e.target.value)}
                                // helperText = "Valor incorrecto"
                            />
        
                            <Button onClick={() => handleLogin(idUsuario,pass)} variant="contained" type="submit">Iniciar Sesión</Button>
                            <Link href = "/signup">¿No tienes cuenta? Registrate ahora!</Link>
                        
                    </Stack>
                    
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default LogIn; 