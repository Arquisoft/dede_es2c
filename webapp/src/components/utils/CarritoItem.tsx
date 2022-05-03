import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Product, Object } from '../../shared/shareddtypes';

type ItemProps = {
    items: Object[]
}

const CarritoItem = (item: ItemProps) => {

    return(
        <>
            {item.items.map((i) => {
                 console.log(i)
                return(
                    <TableRow key={i.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{i.codigo}</TableCell>
                        <TableCell component="th" scope="row">{i.cantidad}</TableCell>
                        <TableCell align='center'>{i.cantidad}</TableCell>
                        <TableCell component="th" scope="row">{i.cantidad}</TableCell>
                         
                    </TableRow>
                );
            })}
        </>
    );

}

export default CarritoItem;