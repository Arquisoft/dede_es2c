import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../img/logo-dede.svg';
import { Card, CardContent, Typography } from '@mui/material';
import Swal from 'sweetalert2'
import { getDireccionPod } from '../api/api';
import jwt_decode from "jwt-decode";
import { getUserById } from '../api/ApiUsers';
import {User} from '../shared/shareddtypes';
import axios from 'axios';


const checkParams = (text: String) => {
    return text === "" || text == null;
}

const Pago: FC = () => {

    const [titular, setTitular] = useState('')
    const [tarjeta, setTarjeta] = useState('')
    const [fechaCad, setFechaCad] = useState('')
    const [CVV, setCVV] = useState('')
    const [tel, setTel] = useState('')
    const [pulse, setPulse] = useState(false)

    // Constantes para el pod
    const [webId, setWebId] = useState('')
    const [pais, setPais] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [codigo, setCodigo] = useState('')
    const [region, setRegion] = useState('')
    const [calle, setCalle] = useState('')

    function allFunc(Titular: String, tarjeta: String,fecha:String,cvv:string){
        setPulse(true);
    }


    async function getDireccion(){
        const direccion = await getDireccionPod(webId);

        if(direccion !== ""){
            console.log(direccion);
            setPais(direccion['country']);
            setLocalidad(direccion['locality']);
            setCodigo(direccion['postalCode']);
            setRegion(direccion['region']);
            setCalle(direccion['street_address']);

            Swal.fire({
                title: "Creedenciales correctas",
                text:   "Direccion: " + direccion['street_address'] + "\n" +
                        "Código Postal: " + direccion['postalCode'] + "\n" + 
                        "Localidad: " + direccion['locality'] + "\n" +     
                        "Region: "  + direccion['region'] + "\n" + 
                        "País: " + direccion['country'] + "\n"
                      ,
                icon: "success",
            });

            var user:any = jwt_decode(localStorage.getItem('token') || '{}');
            console.log(localStorage.getItem('token'));
            console.log(user);
            var UserName:User = await getUserById(user.id);
            console.log(UserName);

            const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
            axios.post(apiEndPoint + "/order/calculateShipment", {
                name: UserName.name, 
                street1: calle,
                city: localidad,
                state: region,
                zip: codigo,
                country: pais,
                phone: tel
            }).then(res => {
                if(res.status !== 404){
                    console.log(res.status);
                    console.log(res.data);
                    var dataJson: any = res.data['shippmentCost']
                    var precioEnvio: string = dataJson['retail_rate']
                    console.log(precioEnvio)
                    
                } else {
                    console.log('fallo')
                }
            }).catch(
                
            );


        } else {
            Swal.fire({
                title: "Creedenciales incorrectos",
                text: "No se ha encontrado el POD con ese nombre",
                icon: "error",
            });
        }
    }

    console.log(localStorage.getItem("carrito"));

    return ( 
        <div className='Home' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '130vh' }}>
            <Container component= "main" maxWidth="sm" fixed={true} 
            sx={{
                position: "relative",
                top: 150
            }}>
                <Card className={"main"} elevation={10} style={{display: "grid"}}>
                    <CardContent style={{display: "grid", textAlign: "center", margin: "auto"}}>
                    <div role= "banner">
                        <img  width={300} height = {300}  src={logo} alt=""/>
                    </div>

                    <Stack direction= "column" spacing={2}>
                        
                            <TextField 
                                id = "nombre"
                                required
                                name = "Titular de la tarjeta"
                                label = "Titular de la tarjeta"
                                variant="outlined"
                                size="small"
                                value = {titular}
                                error = {checkParams(titular) && pulse}
                                helperText={checkParams(titular) && pulse ? 'El titular no puede ser vacío' : ''}
                                onChange = {(e: any) => setTitular(e.target.value)}
                            />
                                                    
                            <TextField 
                                id = "numero de tarjeta"
                                required
                                name = "Numero de tarjeta"
                                label = "Numero de tarjeta"
                                variant="outlined"
                                size="small"
                                value = {tarjeta}
                                error = {checkParams(tarjeta) && pulse}
                                helperText={checkParams(tarjeta) && pulse ? 'El numero de la tarjeta no puede ser vacío' : ''}
                                onChange = {(e: any) => setTarjeta(e.target.value)}
                            />
                             <Stack direction= "row" spacing={2}>

                             <TextField 
                                id = "caducidad"
                                required
                                name = "Fecha de caducidad"
                                label = "Fecha de caducidad (yyyy-mm-dd)"
                                variant="outlined"
                                size="small"
                                value = {fechaCad}
                                error = {checkParams(fechaCad) && pulse}
                                helperText={checkParams(fechaCad) && pulse ? 'Fecha de caducidad incorrecta' : ''}
                                onChange = {(e: any) => setFechaCad(e.target.value)}
                            />
                            <TextField 
                                id = "cvv"
                                required
                                name = "CVV"
                                label = "CVV"
                                variant="outlined"
                                size="small"
                                value = {CVV}
                                error = {checkParams(CVV) && pulse}
                                helperText={checkParams(CVV) && pulse ? 'El código CVV no puede ser vacío' : ''}
                                onChange = {(e: any) => setCVV(e.target.value)}
                            />
                            </Stack>       
                            <TextField 
                                id = "telefono"
                                required
                                name="contacto cliente"
                                label = "Telefono de contacto"
                                variant="outlined"
                                size="small"
                                value = {tel}
                                error = {checkParams(tel) && pulse}
                                helperText={checkParams(tel) && pulse ? 'El telefono no puede ser vacío' : ''}
                                onChange = {(e: any) => setTel(e.target.value)}
                            />
                        
                            <Typography>
                                Dirección de envío, por favor ingrese el nombre de su POD
                            </Typography>
                            <TextField 
                                id = "pod"
                                required
                                name = "Dirección de Envío"
                                label = "Dirección de Envío"
                                value = {webId}
                                error = {checkParams(webId) && pulse}
                                helperText={checkParams(webId) && pulse ? 'La direccion no puede estar vacía' : ''}
                                onChange = {(e: any) => setWebId(e.target.value)}
                            />

                            <Button onClick={() => getDireccion()}>Comprueba tu direccion</Button>

                            <Button onClick={() => allFunc(titular, tarjeta,fechaCad,CVV)} variant="contained" type="submit">Completar el pago</Button>
                        
                    </Stack>
                    
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Pago; 