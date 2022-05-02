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
import {Product, User} from '../shared/shareddtypes';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

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

    var envio: number = 0;

    async function getPrecioEnvio(direccion:any){
        var user:any = jwt_decode(localStorage.getItem('token') || '{}');
        var UserName:User = await getUserById(user.id);
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        const precioEnvio = await axios.post(apiEndPoint + "/order/calculateShipment", {
                name: UserName.name, 
                street1: direccion['street_address'] + "",
                city: direccion['locality']  + "",
                state: direccion['region'] + "",
                zip: direccion['postalCode']  + "",
                country: direccion['country'] + "",
                phone: tel
            }).then(res => {
                if(res.status == 200){
                    var dataJson: any = res.data['shippmentCost']
                    envio = Number.parseFloat(dataJson['rate']);
                    console.log(envio)
                    return envio;
                    
                } else {
                    console.log('fallo')
                }
            }).catch( (error) => {
                console.log("En el catch");
                console.log(error);
            });
        return precioEnvio;
    }

    async function allFunc(Titular: String, tarjeta: String,fecha:String,cvv:string){
        setPulse(true);
        var precio = localStorage.getItem("precioCarrito");
        if(precio !== null){
            const direccion = await getDireccionPod(webId);
            await getPrecioEnvio(direccion);
            var parseado = JSON.parse(precio);
            console.log("Envio: " + envio)
            var precioFinal: number = Number.parseFloat(parseado) + envio*0.95;
            Swal.fire({
                title: "Precio Final",
                text: "El precio de los articulos es de " + parseado + " tras la suma" + 
                        " con el precio de envío de " + envio + ". El precio Final que se " + 
                        " deberá abonar es de: " + precioFinal.toFixed(2), 
                icon: "warning",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar pedido!'
            }).then(async (res) => {
                if(res.isConfirmed){
                    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000';
                    var user:any = jwt_decode(localStorage.getItem('token') || '{}');
                    var UserName:User = await getUserById(user.id);
                    let codigo = uuidv4();

                    const carrt2 = localStorage.getItem("carrito");
                    const cart: Product[] = [];
                    var size: number = 0;
                    if(carrt2 !== null){
                        size = JSON.parse(carrt2).length;
                        for(let i =0;  i < size; i++){
                            cart[i] = {
                            nombre: JSON.parse(carrt2)[i]['nombre'],
                            codigo: JSON.parse(carrt2)[i]['codigo'],
                            descripcion: JSON.parse(carrt2)[i]['descripcion'],
                            precio: JSON.parse(carrt2)[i]['precio'],
                            cantidad: JSON.parse(carrt2)[i]['cantidad'],
                            url: JSON.parse(carrt2)[i]['url'],
                            stock: JSON.parse(carrt2)[i]['cantidad'],
                            categoria: JSON.parse(carrt2)[i]['categoria'],
                            }
            
                        }   
                    }
                    axios.post(apiEndPoint + "/order/addOrder", 
                        {"codigo": codigo, "correo": UserName.email, "direccion": 
                        calle + " " + localidad + " " + pais, "fecha": new Date(), 
                        "products": cart}).then(
                            resp => {
                                console.log(resp.data);
                            }
                        );
                }
            })

        }
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
        } else {
            Swal.fire({
                title: "Creedenciales incorrectos",
                text: "No se ha encontrado el POD con ese nombre",
                icon: "error",
            });
        }
    }

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