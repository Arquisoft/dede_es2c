/* import React, { useState} from 'react'; */
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Card, CardContent } from '@mui/material';
/* import axios from 'axios'; */
/* import {User} from '../../shared/shareddtypes';
import Swal from 'sweetalert2'; */
import jwt_decode from "jwt-decode";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type Email = {
    email:String
}

const Profile = (correo:Email) => {

    function metodo() {
        localStorage.clear();
        window.location.assign("/login");
    }

    /* let [user, setUser] = React.useState<User>({_id: "", name: "",email: "",surname: "", password: ""});
    const [pulse, setPulse] = useState(false) */

    /* const getUserByEmail = async (email:String) => {
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        const data = await axios.get(apiEndPoint + "/user/list/" + email).
        then(res => {
            setUser(res.data);
            return res.data;
        })
        return data != null;
    }

    getUserByEmail(correo.email); */
   /*  const updateUser = (id:String,name?:String,surname?:String,email?:String) => {
        if(name === ''){
            name = user.name
        }
        if(surname === ''){
            surname = user.surname
        }
        if(email === ''){
            email = user.email
        }
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        axios.put(apiEndPoint + "/user/update/" + id,{"name":name,"surname":surname,"email":email})
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.status === 404){
                Swal.fire({
                    title: "Perfil modificado",
                    text: "El perfil ha sido modificado con exito",
                    icon: "success"
                }).then(() => {
                    window.location.assign("/login");
                });
            }
        })
    } */

    /* async function allFunc(id:String,name:String,surname:String,email: String){
        setPulse(true);
        updateUser(id, name, surname, email);
    } */

        if(localStorage.getItem('token') != null){
            var user2:any = jwt_decode(localStorage.getItem('token') || '{}');
            console.log(user2.id);
            return (
                <div className='PerfilUsuario' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <Container component= "main" maxWidth="sm" fixed={true} sx={{position: "center",top: 150}}> 
                        <Card className={"main"} elevation={10} style={{display: "grid"}}> 
                            <CardContent style={{display: "flex", textAlign: "center", margin: "auto", justifyContent: 'center', alignItems: 'center'}}> 
                                <Stack direction= "column" spacing={2} textAlign = "center">
                                    <div>
                                        <AccountCircleIcon sx={{ fontSize: 60, textAlign: "center", justifyContent: 'center', alignItems: 'center'}}/>
                                    </div>
                                    <h1>MI PERFIL</h1>
                                    <TextField 
                                        disabled
                                        required
                                        size = "small"
                                        name = "correoToken"
                                        label = "Correo Asociado"
                                        variant = 'outlined'
                                        value={user2.correo}
                                    />
                                    <h2>{user2.correo}</h2>
                                </Stack>
                        </CardContent>            
                        </Card>
                    </Container>
                </div>);
        } else {
            return(
                <div className='PerfilUsuarioError' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <Container component= "main" maxWidth="sm" fixed={true} sx={{position: "center",top: 150}}> 
                        <Card className={"main"} elevation={10} style={{display: "grid"}}> 
                            <CardContent style={{display: "flex", textAlign: "center", margin: "auto", justifyContent: 'center', alignItems: 'center'}}> 
                                <Stack direction= "column" spacing={2} textAlign = "center">
                                    <div>
                                        <WarningAmberIcon sx={{ fontSize: 60, textAlign: "center", justifyContent: 'center', alignItems: 'center'}}/>
                                    </div>
                                    <h1>Error</h1>
                                    <h2>No hay sesión inciada, por favor inicie sesión</h2>
                                    <Button onClick={() => metodo()}>Iniciar Sesión</Button>
                                </Stack>
                            </CardContent>            
                        </Card>
                    </Container>
                </div>
            );
        }
}

export default Profile; 