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
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/material';

type ProductsProps = {
  cartItems:Product[]
}
const NavBar=(cart:ProductsProps) =>{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    var totalPrice = 0;
    var numOfProducts = 0
    cart.cartItems.map(x => numOfProducts+= x.cantidad);
    cart.cartItems.map(x => totalPrice+= x.cantidad * x.precio);

    const removeItem = (prod:Product) =>{
        const index = cart.cartItems.indexOf(prod,0);
        if(index > -1){
            if(cart.cartItems[index].cantidad > 1){
                cart.cartItems[index].cantidad = cart.cartItems[index].cantidad -1 ;
            } else{
                cart.cartItems.splice(index);
            }
        } 
    }

    const allFunc = (prod:Product) =>{
        removeItem(prod);
        handleClose();
    }
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

                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClose}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

                <IconButton onClick={() => window.location.href = '/summary'} aria-label="cart" size="medium"></IconButton>
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
                >
                    <Link href="/user/profile" underline="none"style={{color:"#000000"}}>
                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            </Link>
                            <Link href="/user/orderHistory" underline="none"style={{color:"#000000"}}>
                        <MenuItem onClick={handleClose}>Historial de Ventas</MenuItem>
                    </Link>
                </Menu>

              <IconButton 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}       
              >
                <Badge badgeContent={numOfProducts} color="secondary">    
                    <ShoppingCartIcon color="inherit" />
                </Badge>
                </IconButton>
                <Menu     
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                 'aria-labelledby': 'basic-button',
                }}>
                    {cart.cartItems.length > 0 ? (
                        <>
                        {cart.cartItems.map( prod => (
                            <div className= "cartItem">
                                <Container>
                                    
                                    <img style={{
                                        marginRight:20,
                                        width:50,
                                        height: 40,
                                        bottom:20
                                    }} src = {prod.url}>                                
                                    </img>
                                        {prod.nombre} x{prod.cantidad} precio: {prod.cantidad * prod.precio}€         
                                        <IconButton style={{
                                        left:10,
                                    }} onClick = {() => allFunc(prod)} size = "small">  <DeleteIcon  color="inherit" /> </IconButton>                         
                                    
                          
                                </Container>                         
                            </div>                                            
                         ))}
                        <div></div>
                        <Container style = {{
                            right:200
                        }}>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            Precio total: {totalPrice}€
                        </Typography>
                        </Container>
                        <Button variant = "contained" size = "small" style={{
                            left:24,
                            bottom:-2
                        }} href = "/pago"> Completar el pago </Button>
                        
                        </>
                    ) :(<div>
                        <Container>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            El carro se encuentra vacío
                        </Typography>
                        </Container>
                        </div>)}
                </Menu>

                <Button color="inherit" href = "/login">Iniciar Sesión / Registro</Button> 

            </Toolbar>     
        </AppBar>
            );
    }

const  showProducts = () =>{
    return(
        <div>hola</div>
    );
}


export default NavBar;
