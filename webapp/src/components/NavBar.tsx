import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { colors } from '@mui/material';
import LogoCarro from "../img/LogoCarro.jpg";
import { Icon } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

class NavBar extends React.Component{
    render(){
     return(
    <AppBar position="fixed" >
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
           DeDe
          </Typography>
          <Button color="inherit" href = "/">Home</Button>
          <Button color="inherit" href = "/products">Products</Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>

          <IconButton aria-label="cart" size="medium">
            <ShoppingCartIcon color="inherit" />
            </IconButton>

            <Button color="inherit" href = "/login">SignUp/Login</Button>
        </Toolbar>

  
          
    </AppBar>
        );
    }
}

export default NavBar;
