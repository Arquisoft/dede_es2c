import React, { useState, FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
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

const Pago: FC = () => {

    const [titular, setTitular] = useState('')
    const [tarjeta, setTarjeta] = useState('')
    const [fechaCad, setFechaCad] = useState('')
    const [CVV, setCVV] = useState('')
    const [pulse, setPulse] = useState(false)

    function allFunc(Titular: String, tarjeta: String,fecha:String,cvv:string){
        setPulse(true);
    }

    return ( 
        <div>
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
                                defaultValue= "Titular de la tarjeta"
                                variant="outlined"
                                size="small"
                                value = {titular}
                                error = {checkParams(titular) && pulse}
                                helperText={checkParams(titular) && pulse ? 'El titular no puede ser vacío' : ''}
                                onChange = {(e: any) => setTitular(e.target.value)}
                               // helperText = "Valor incorrecto"
                            />
                                                    
                            <TextField 
                                id = "numero de tarjeta"
                                required
                                name = "Numero de tarjeta"
                                label = "Numero de tarjeta"
                                defaultValue= "Numero de tarjeta"
                                variant="outlined"
                                size="small"
                                value = {tarjeta}
                                error = {checkParams(tarjeta) && pulse}
                                helperText={checkParams(tarjeta) && pulse ? 'El numero de la tarjeta no puede ser vacío' : ''}
                                onChange = {(e: any) => setTarjeta(e.target.value)}
                               // helperText = "Valor incorrecto"
                            />
                             <Stack direction= "row" spacing={2}>

                             <TextField 
                                id = "caducidad"
                                required
                                name = "Fecha de caducidad"
                                label = "Fecha de caducidad (yyyy-mm-dd)"
                                defaultValue= "Fecha de caducidad (yyyy-mm-dd)"
                                variant="outlined"
                                size="small"
                                value = {fechaCad}
                                error = {checkParams(fechaCad) && pulse}
                                helperText={checkParams(fechaCad) && pulse ? 'Fecha de caducidad incorrecta' : ''}
                                onChange = {(e: any) => setFechaCad(e.target.value)}
                               // helperText = "Valor incorrecto"
                            />
                            <TextField 
                                id = "cvv"
                                required
                                name = "CVV"
                                label = "CVV"
                                defaultValue= "CVV"
                                variant="outlined"
                                size="small"
                                value = {CVV}
                                error = {checkParams(CVV) && pulse}
                                helperText={checkParams(CVV) && pulse ? 'El código CVV no puede ser vacío' : ''}
                                onChange = {(e: any) => setCVV(e.target.value)}
                               // helperText = "Valor incorrecto"
                            />
                             </Stack>       
                            <Button onClick={() => allFunc(titular, tarjeta,fechaCad,CVV)} variant="contained" type="submit">Completar el pago</Button>
                        
                    </Stack>
                    
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Pago; 