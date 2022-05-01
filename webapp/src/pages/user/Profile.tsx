import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import {User} from '../../shared/shareddtypes';
import Link from '@mui/material/Link';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

function getUserId(): string {
    var id;
    if(localStorage.getItem('token') != null)
    var user:any = jwt_decode(localStorage.getItem('token') || '{}');
    id = user.id
    return id
}

const Profile = () => {
    let [user, setUser] = React.useState<User>({_id: "", name: "",email: "",surname: "", password: ""});
    let [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [pulse, setPulse] = useState(false)

    id = getUserId()

    const getUser = async (id:String) => {
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        const data = await axios.get(apiEndPoint + "/user/findById/" + id).then (
            res => {
                setUser(res.data);
                console.log(user.email)
                return res.data
            }
        )
        return data != null;
    }
    
    getUser(id)
    const updateUser = (id:String,name?:String,surname?:String,email?:String) => {
        if(name == ''){
            name = user.name
        }
        if(surname == ''){
            surname = user.surname
        }
        axios.put("http://localhost:5000/user/update/" + id,{"name":name,"surname":surname})
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.status == 404){
                Swal.fire({
                    title: "Perfil modificado",
                    text: "El perfil ha sido modificado con exito",
                    icon: "success"
                }).then(() => {
                    window.location.assign("/login");
                });
            }
        })
    }

    const enviarContraseña = () => {
        Swal.fire({
            title: '¿Desea cambiar su contraseña?',
            text: "Se le enviará un correo a su dirección correo electrónico para cambiar su contraseña.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Correo envaido',
                'Podrá cambiar su contraseña en el correo que le acabamos de enviar',
                'success'
              )
            }
          })
        
    }

    async function allFunc(id:String,name:String,surname:String,email: String){
        setPulse(true);
        updateUser(id, name, surname, email);
    }

    return ( 
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container component= "main" maxWidth="sm"
                sx={{
                position: "relative",
                top: 10
            }}>
                <Card className={"main"} elevation={10} style={{display: "grid", height: 370}}>

                    <Typography className="miPerfil" style={{position:'relative', right:-240, top:20}}> Mi Perfil </Typography>
                    
                    <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                        <Stack direction= "column" spacing={-0.5}>
                            
                        <Typography className="email" style={{position:'relative', right:188, top:10}}> Correo electrónico: </Typography>

                            <TextField
                                id = "email" 
                                name = "Email"
                                value= {user.email}
                                size="small"
                                variant="outlined"
                                style={{position:'relative', top:-20}}
                            />

                            <Typography className="name" style={{position:'relative', right:150, top:10}}> Nombre: </Typography>

                            <TextField
                                id = "name"
                                multiline
                                defaultValue = {user.name}
                                variant = "outlined"
                                size = "small"
                                onChange = {(e: any) => setName(e.target.value)}
                                style={{position:'relative', top:-20}}
                            />

                            <Typography className="surname" style={{position:'relative', right:153, top:10}}> Apellidos: </Typography>

                            <TextField
                                id = "surname"
                                name = "Apellido"
                                multiline
                                defaultValue = {user.surname}
                                variant = "outlined"
                                size = "small"
                                onChange = {(e: any) => setSurname(e.target.value)}
                                style={{position:'relative', top:-20}}
                            />

                            <Typography className="surname" style={{position:'relative', right:163, top:10}}> Contraseña: </Typography>

                            <TextField
                                id = "pass" 
                                name = "Contraseña"
                                type= "password"
                                value= {user.password}
                                size="small"
                                variant="outlined"
                                style={{position:'relative', top:-20}}
                            />
                            
                            <Button onClick={() => allFunc(user._id,name,surname,email)} variant="contained" type="submit"> Aplicar cambios</Button>
                            <Link onClick={() => enviarContraseña()} style={{position:'relative', top:10}}>Quiero cambiar mi contraseña.</Link>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Profile; 