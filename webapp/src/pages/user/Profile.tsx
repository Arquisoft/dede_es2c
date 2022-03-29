import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import {User} from '../../shared/shareddtypes';

type Email = {
    email:String
}

const checkParams = (text: String) => {
    return text === "" || text == null;
}

const Profile = (correo:Email) => {
    let [user, setUser] = React.useState<User>({id: "", name: "",email: "",surname: "", password: ""});
    const [pulse, setPulse] = useState(false)
    let [email, setEmail] = useState('')
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [pass, setPass] = useState('')

    const getUserByEmail = async (email:String) => {
        const data = await axios.get("http://localhost:5000/user/list/" + email).
        then(res => {
            setUser(res.data);
            return res.data;
        })
        return data != null;
    }

    const updateUser = (id:String,name:String,surname:String,email: String,pass: String) => {
        axios.post("http://localhost:5000/user/update/",{"id":id,"name":name,"surname":surname,"email":email,"password":pass})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    async function allFunc(name:String,surname:String,email: String,pass: String){
        setPulse(true);
        updateUser(user.id, user.name, user.surname, user.email, user.password);
    }

    getUserByEmail(correo.email);
    console.log(user.email)

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
                                id = "email" 
                                label = "Correo electronico"
                                multiline
                                defaultValue={user.email}
                            />

                            <TextField
                                id = "name"
                                label = "Nombre"
                                multiline
                                value = {user.name}
                            />

                            <TextField
                                id = "surname"
                                name = "Apellido"
                                multiline
                                value = {user.surname}
                            />


                            <TextField
                                id = "pass" 
                                name = "Contraseña"
                                multiline
                                type= "password"
                                value= {user.password}
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