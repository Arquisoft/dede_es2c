import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';

type Email = {
    email:String
}

const checkParams = (text: String) => {
    return text === "" || text == null;
}

const getEmail = async (email: String) => {
    const data = await axios.get("http://localhost:5000/user/list/"+ email).
    then(res => {
        return res.data
    })
    return data != null; 
}

const handleChangeProfile = (name:String,surname:String,email: String,pass: String) => {
    axios.post("http://localhost:5000/user/signup",{"name":name,"surname":surname,"email":email,"password":pass})
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
}

const Profile = (correo:Email) => {
    const [pulse, setPulse] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    async function allFunc(name:String,surname:String,email: String,pass: String){
        setPulse(true);
        if(await getEmail(email).then(resolve => {return resolve})){
            alert("El email ya existe");
        }else{
            handleChangeProfile(name,surname,email,pass);
        }
    }

    return ( 
        <div>
            <Container component= "main" maxWidth="sm"
                sx={{
                position: "relative",
                top: 150
            }}>
                <Card className={"main"} elevation={10} style={{display: "grid"}}>
                    <Typography>
                        <span className="miPerfil" style={{position:'relative', right:-240, top:10}}>Mi Perfil</span>
                    </Typography>
                    <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                        <Stack direction= "column" spacing={2}>
                            <TextField
                                id = "email" required
                                name = "Correo electronico"
                                label = "Correo electronico"
                                defaultValue = "Correo electronico"
                                variant = "outlined"
                                size = "small"
                            />

                            <TextField
                                id = "name" required
                                name = "Nombre"
                                label = "Nombre"
                                defaultValue = "Nombre"
                                variant = "outlined"
                                size = "small"
                            />

                            <TextField
                                id = "surname" required
                                name = "Apellido"
                                label = "Apellido"
                                defaultValue = "Apellido"
                                variant = "outlined"
                                size = "small"
                            />


                            <TextField
                                id = "pass" required
                                name = "Contraseña"
                                label = "Contraseña"
                                type= "password"
                                defaultValue= "Contraseña"
                                size="small"
                                variant="outlined"
                            />

                            <Button onClick={() => allFunc(name,surname,email,pass)} variant="contained" type="submit">Aplicar cambios</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Profile; 