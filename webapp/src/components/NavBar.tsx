import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


class NavBar extends React.Component{
    render(){
     return(
    <AppBar position="fixed" >
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
           DeDe
          </Typography>
          <Button color="inherit" href = "/">Inicio</Button>
          <Button color="inherit" href = "/products">Productos</Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>

          <IconButton aria-label="cart" size="medium">
            <ShoppingCartIcon color="inherit" />
            </IconButton>

            <Button color="inherit" href = "/login">Iniciar Sesión / Registro</Button> 
            
        </Toolbar>     
    </AppBar>
        );
    }
}

export default NavBar;
