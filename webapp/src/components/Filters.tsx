import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

class Filters extends React.Component {
    render() {
        return (
            
            <div className='Filtros' style ={ {height: '15vh'} }>
                <Stack direction="row" divider = {<Divider orientation='horizontal' flexItem/>} spacing = {0.5}>
                    <Button variant="contained">Almacenamiento</Button>
                    <Button variant="contained">Monitores</Button>
                    <Button variant="contained">Ratones</Button>
                    <Button variant="contained">Sonido</Button>
                    <Button variant="contained">Teclados</Button>
                </Stack>  
            </div>
        );
    }
}

export default Filters;