import * as React from 'react';
import {Container, Grid, Box, Link, Typography} from '@mui/material/';

const Footer = () => {

    const nosotros = "Ana Fernandez Ostio \n  Adrián Santamarina Romero\n" +  
                        "Darío Martínez Bajo \n Efrén García Valencia \n " + 
                        "Rubén Rubio del Castillo";
    
    const correo = "prguntar dario";

    return (
        <footer style = {{
            position:'relative'
        }}>
            <Box px = {{xs:3, sm:10}} py = {{xs: 5, sm:10}} bgcolor ="text.secondary" color = "white">
                <Container maxWidth = "lg">
                    <Grid container spacing={5}>
                        <Grid item xs= {12} sm = {4}>
                            <Box borderBottom={1}>Aplicación</Box>
                            <Box><Link href = "https://github.com/Arquisoft/dede_es2c" color= "inherit">Código fuente</Link> </Box>
                            <Box><Link href = "https://arquisoft.github.io/dede_es2c/" color= "inherit">Documentación</Link></Box>
                            <Box><Typography> </Typography></Box>
                            <Box borderBottom={1}>Correo de contacto</Box>
                            <Box><Typography>{correo}</Typography></Box>     
                        </Grid>

                        <Grid item xs= {12} sm = {4}>
                            <Box borderBottom={1}>Acerca de</Box>
                            <Box><Typography>Ana Fernandez Ostio</Typography></Box>
                            <Box><Typography>Adrián Santamarina Romero</Typography></Box>
                            <Box><Typography>Darío Martínez Bajo</Typography></Box>
                            <Box><Typography>Efrén García Valencia</Typography></Box>
                            <Box><Typography>Rubén Rubio del Castillo</Typography></Box>
                                                   
                        </Grid>

                        <Grid item xs= {12} sm = {4}>
                            <Box borderBottom={1}>Información adicional</Box>
                            <Box><Typography>Grupo Es_2C</Typography></Box>
                            <Box><Typography>Arquitectura del Software</Typography></Box>
                            <Box><Typography>Ingeneria Informarica del Software</Typography></Box>
                            <Box><Typography>Universidad de Oviedo, Asturias</Typography></Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;