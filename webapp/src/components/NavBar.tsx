import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Product } from '../shared/shareddtypes';

type ProductsProps = {
  cartItems:Product[]
}

export default function NavBar(cart:ProductsProps) {
    var numOfProducts = 0
    cart.cartItems.map(x => numOfProducts+= x.cantidad);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
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

            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

            <IconButton onClick={() => window.location.href = '/summary'} aria-label="cart" size="medium">
                <Badge badgeContent={numOfProducts} color="secondary">    
                    <ShoppingCartIcon color="inherit" />
                </Badge>
                </IconButton>
                <Button color="inherit" href = "/login">Iniciar Sesión / Registro</Button> 

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} href = "user/Profile">Perfil</MenuItem>
                <MenuItem onClick={handleClose} href = "user/Profile">Historial de Ventas</MenuItem>
            </Menu>
            
        </Toolbar>     
    </AppBar>
        );
  }
