import * as React from 'react';
import {Container, Grid, Box, Link, Typography} from '@mui/material/';

const Footer = () => {

    return (

        <footer>
            <Box px = {{xs:3, sm:10}} py = {{xs: 5, sm:10}} bgcolor ="text.secondary" color = "white">
                <Container maxWidth = "lg">
                    <Grid container spacing={5}>
                        <Grid item xs= {12} sm = {4}>
                            <Box borderBottom={1}>Aplicación</Box>
                            <Box><Link href = "https://github.com/Arquisoft/dede_es2c" color= "inherit">Código fuente</Link> </Box>
                            <Box><Link href = "https://arquisoft.github.io/dede_es2c/" color= "inherit">Documentación</Link></Box>
                        </Grid>

                        <Grid item xs= {12} sm = {4}>
                            <Box borderBottom={1}>Acerca de</Box>
                            <Box><Link href = "https://github.com/Arquisoft/dede_es2c" color= "inherit">¿Quienes somos?</Link></Box>
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