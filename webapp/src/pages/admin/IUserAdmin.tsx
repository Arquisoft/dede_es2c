import { User } from '../../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';


type UserProps = {
    user: User[]
}

const IUserAdmin = (user: UserProps): JSX.Element => {

    function tipoUsuario(nombre: string) {
        if(nombre === "admin@uniovi.es"){
            
            return <Button variant="outlined" type="submit">Quitar admin</Button>
           
        }else {
            return <Button variant="outlined" type="submit">Hacer admin</Button>
        }
    }

    return (
        <>
            {user.user.map((u) => {
                return(
                    <TableRow key={u.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align='center' component="th" scope="row">{u.email}</TableCell>
                        <TableCell align='center' component="th" scope="row">
                            <Button variant="outlined" type="submit">Ver pedidos</Button>
                        </TableCell>
                        <TableCell align='center' component="th" scope="row">
                            {tipoUsuario(u.email)}
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}


export default IUserAdmin;