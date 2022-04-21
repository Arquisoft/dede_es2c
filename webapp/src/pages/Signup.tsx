import React, { useState, useEffect, FC } from 'react';
import Container from '@mui/material/Container';
import { Card, CardContent, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import logo from '../img/logo-dede.svg';
import Link from '@mui/material/Link';
import Swal from 'sweetalert2';
import { foundEmail, handleSignup } from '../api/ApiUsers';

const checkParams = (text: String) => {
    return text === "" || text == null;
}

const checkEmail = (email: String) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email.toString());
}

const checkPaswwords = (repPass: String, pass: String) => {
    return repPass !== pass;
}

const signUp = (name:String,surname:String,email: String,pass: String,repPass:String) => {
    handleSignup(name, surname, email, pass, repPass);
}


const SignUp: FC = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [repPass, setRepPass] = useState('')
    const [pulse, setPulse] = useState(false)

    async function allFunc(name:String,surname:String,email: String,pass: String,repPass:String){
        setPulse(true);
        if(await foundEmail(email)){
            Swal.fire({
                title: "El e-mail ya existe",
                text: "El e-mail ya existe en el sistema, pruebe con otro",
                icon: "error"
            });
        }else{
            signUp(name,surname,email,pass,repPass);
        }
    }

    return (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container component= "main" maxWidth="sm"
                sx={{
                position: "center",
                top: 150
            }}>
                <Card className={"main"} elevation={10} style={{display: "grid"}}>
                    <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                    <div role= "banner">
                        <img  width={300} height = {300}  src={logo} alt=""/>
                    </div>
                        <Stack direction= "column" spacing={2}>
                            <TextField
                                id = "name" required
                                name = "Nombre"
                                label = "Nombre"
                                defaultValue = "Nombre"
                                variant = "outlined"
                                size = "small"
                                value = {name}
                                error = {checkParams(name) && pulse}
                                helperText={checkParams(name) && pulse ? 'La casilla no puede estar vacia' : ''}
                                onChange = {(e: any) => setName(e.target.value)}
                            />

                            <TextField
                                id = "surname" required
                                name = "Apellido"
                                label = "Apellido"
                                defaultValue = "Apellido"
                                variant = "outlined"
                                size = "small"
                                value = {surname}
                                error = {checkParams(surname) && pulse}
                                helperText={checkParams(surname) && pulse ? 'La casilla no puede estar vacia' : ''}
                                onChange = {(e: any) => setSurname(e.target.value)}
                            />

                            <TextField
                                id = "email" required
                                name = "Correo electronico"
                                label = "Correo electronico"
                                defaultValue = "Correo electronico"
                                variant = "outlined"
                                size = "small"
                                value = {email}
                                error = {checkParams(email) && pulse || checkEmail(email) && pulse}
                                helperText={checkParams(email) && pulse ? 'La casilla no puede estar vacia' : ''
                                            ||checkEmail(email) && pulse ? 'Formato de e-mail inválido' : ''}
                                onChange = {(e: any) => setEmail(e.target.value)}
                            />

                            <TextField
                                id = "pass" required
                                name = "Contraseña"
                                label = "Contraseña"
                                type= "password"
                                defaultValue= "Contraseña"
                                size="small"
                                variant="outlined"
                                value = {pass}
                                error = {checkParams(pass) && pulse}
                                helperText={checkParams(pass) && pulse ? 'La casilla no puede estar vacia' : ''}
                                onChange = {(e: any) => setPass(e.target.value)}
                            />

                            <TextField
                                id = "repPass" required
                                name = "Repetir Contraseña"
                                label = "Repetir Contraseña"
                                type= "password"
                                defaultValue= "Repetir Contraseña"
                                size="small"
                                variant="outlined"
                                value = {repPass}
                                error = {checkParams(repPass) && pulse || checkPaswwords(repPass, pass)}
                                helperText={checkParams(repPass) && pulse ? 'La casilla no puede estar vacia' : ''
                                                || checkPaswwords(repPass, pass) && pulse ? 'Las contraseñas no coinciden' : ''}
                                onChange = {(e: any) => setRepPass(e.target.value)}
                            />

                            <Button onClick={() => allFunc(name,surname,email,pass,repPass)} variant="contained" type="submit">Crear cuenta</Button>
                            <Link href = "/login">¿Ya tienes una cuenta? Inicia sesión aqui!</Link>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );

}
export default SignUp;