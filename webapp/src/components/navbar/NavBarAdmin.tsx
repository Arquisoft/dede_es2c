import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu } from '@mui/material';
import Badge from '@mui/material/Badge';
import { Product } from '../../shared/shareddtypes';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/material';
import Swal from 'sweetalert2';

type ProductsProps = {
    cartItems:Product[]
}
  
const NavBarAdmin = (cart:ProductsProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    var totalPrice = 0;
    var numOfProducts = 0
    cart.cartItems.map(x => numOfProducts+= x.cantidad);
    cart.cartItems.map(x => totalPrice+= x.cantidad * x.precio);

    const carrt = localStorage.getItem("cart");
    if(carrt !== null){
        for(let i =0;  i < JSON.parse(carrt).length; i++){
            cart.cartItems[i] = {
                nombre: JSON.parse(carrt)[i]['nombre'],
                codigo: JSON.parse(carrt)[i]['codigo'],
                descripcion: JSON.parse(carrt)[i]['descripcion'],
                precio: JSON.parse(carrt)[i]['precio'],
                cantidad: JSON.parse(carrt)[i]['cantidad'],
                url: JSON.parse(carrt)[i]['url'],
                stock: JSON.parse(carrt)[i]['stock'],
                categoria: JSON.parse(carrt)[i]['categoria'],
            }
        }
    }

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

    const cerrarSesion = () => {
        Swal.fire({
            title: '¿Quieres cerrar sesión?',
            text: "Se perderan los productos que teine en el carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire(
                'Sesión cerrada',
                'success'
              )
              window.location.assign("/");
            }
          })
        
    }

    function goTo(){
        window.location.assign("/products");
    }

    function goTo2(){
        console.log("Antes de cambiar");
        console.log(cart.cartItems);
        localStorage.setItem("carrito", JSON.stringify(cart.cartItems));
        window.location.assign("/carrito");
    }

    return (
        <AppBar position="fixed" >
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>DeDe</Typography>
                        <Button aria-label ='Inicio' color="inherit" href = "/">Inicio</Button>
                        <Button color="inherit" onClick={() => goTo()}>Productos</Button>
                        <Button color="inherit" href = "user/orderHistory">Mis pedidos</Button>
                        <Button color="inherit" href = "/admin/addProduct">Añadir Productos</Button>
                        <Button color="inherit" href = "/admin/manageProducts">Administrar Productos</Button>
                        <Button color="inherit" href = "/admin/manageOrders">Administrar Pedidos</Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

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
                                    
                                <img style={{ marginRight:20, width:50, height: 40,bottom:20}} 
                                        src = {prod.url} alt = {prod.nombre} >                               
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
                            Precio total: {totalPrice.toFixed(2)}€
                        </Typography>
                        </Container>
                        <Button variant = "contained" size = "small" style={{
                            left:24,
                            bottom:-2
                        }} onClick ={() => goTo2()}> Completar el pago </Button>
                        
                        </>
                    ) :(<div>
                        <Container>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            El carro se encuentra vacío
                        </Typography>
                        </Container>
                        </div>)}
                </Menu>

                <Button onClick={() => cerrarSesion()} color="inherit">Cerrar Sesión</Button> 
            </Toolbar>     
        </AppBar>
    );

}


export default NavBarAdmin;