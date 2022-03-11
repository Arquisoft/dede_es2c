import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import 'bootswatch/dist/simplex/bootstrap.min.css'; // CSS que se va a utilizar
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../img/logo-dede.svg';
import { Card, CardContent } from '@mui/material';
import Link from '@mui/material/Link';
// import Check from '../checks/Arguments'


const checkParams = (text: String) => {
    return text === "" || text == null;
}

const LogIn: FC = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pulse, setPulse] = useState(false)
    return ( 
        <div>
            <Container component= "main" maxWidth="sm" fixed={true}>
                <Card className={"main"} elevation={10} style={{display: "grid"}}>
                    <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                    <div role= "banner">
                        <img  width={300} height = {300}  src={logo} alt=""/>
                    </div>

                    <Stack direction= "column" spacing={2}>
                        
                            <TextField 
                                id = "email"
                                required
                                name = "Correo Electronico"
                                label = "Correo Electronico"
                                defaultValue= "Correo Electronico"
                                variant="outlined"
                                size="small"
                                value = {email}
                                error = {checkParams(email) && pulse}
                                helperText={checkParams(email) && pulse ? 'La casilla no puede estar vacia' : ' '}
                                onChange = {e => setEmail(e.target.value)}
                               // helperText = "Valor incorrecto"
                            />

                            <TextField 
                                id = "pass"
                                required
                                name = "Contraseña"
                                label = "Contraseña"
                                type= "password"
                                defaultValue= "Contraseña"
                                size="small"
                                variant="outlined"
                                value = {pass}
                                error = {checkParams(pass) && pulse}
                                helperText={checkParams(pass) && pulse ? 'La casilla no puede estar vacia' : ' '}
                                onChange = {e => setPass(e.target.value)}
                                // helperText = "Valor incorrecto"
                            />

                            <Button onClick={() => setPulse(true)} variant="contained" type="submit">Iniciar Sesión</Button>
                            <Link href = "/signup">¿No tienes cuenta? Registrate ahora!</Link>
                        
                    </Stack>
                    
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default LogIn; 