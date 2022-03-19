import { Product } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


type ProductsProps = {
    produc: Product[]
}   

const ProdAdmin = (produc: ProductsProps):  JSX.Element => {
    return (
        <>
        {produc.produc.map((p) => {
            return (
                <TableRow key={p.nombre} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{p.codigo}</TableCell>
                    <TableCell component="th" scope="row">{p.nombre}</TableCell>
                    <TableCell align='center'>{p.categoria}</TableCell>
                    <TableCell align='center'>{p.descripcion}</TableCell>
                    <TableCell align='center'>{p.precio}</TableCell>
                    <TableCell align='center'>0.21</TableCell>
                    <TableCell align='center'>{p.stock}</TableCell>
                </TableRow>
            );
        })}
        </>
    );
}

export default ProdAdmin;