import { Container } from '@mui/material';
import { Product } from '../shared/shareddtypes';
import Button from '@mui/material/Button';

type cart = {
    cartItems:Product[];
}
const ProductsSummary= (cart: cart) => {
   
    return(
        <Container
        sx={{
            position: 'relative',
            top: 750,
            left: 1000
        }}>
            <div className ='Pago' style ={{height:'100'}} >
                <Button variant = "contained" href= '/pago'>Completar el pago </Button>
            </div>           
        </Container>
    );
}

export default ProductsSummary;