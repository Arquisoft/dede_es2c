import React, { FC, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { User } from '../../shared/shareddtypes';
import axios from 'axios';
import IUserAdmin from '../admin/IUserAdmin';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const UserAdmin: FC = () => {

    const [users, setUsers] = React.useState<User[]>([]);

    const getUsers = async () => {
        const data = axios.get("http://localhost:5000/user/list").then (
            res => {
                setUsers(res.data)
                return res.data
            }
        )

        return data != null;
    }

    useEffect (() => {getUsers();}, [])

    return(
        <div style={{ margin: '170px' }}>
            <TableContainer component={Paper}>
                <Table sx = {{minWidth: 650}} aria-label = "customized-table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Correo Usuario</StyledTableCell>
                            <StyledTableCell align='center'>Ver pedidos de usuarios</StyledTableCell>
                            <StyledTableCell align='center'>Administrar Usuarios</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    
                    {/*  Cuerpo de la tabla */}

                    <TableBody>
                        <IUserAdmin user = {users} />
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
}

export default UserAdmin;