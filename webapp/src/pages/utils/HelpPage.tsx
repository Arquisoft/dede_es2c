import React from "react";
import {Stack} from '@mui/material';

const HelpPage = () => {
    return (
        <div className='Help' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Stack direction= "column" spacing={2} alignItems = "center">
                <h1>¿Qué es DeDe?</h1>
                <p>Empresa que vende productos electrónicos, en la que la direccion del cliente no se almacenara, sino que será
                    obtenida mediante su POD.
                </p>
                <p>Esta página web presneta dos vistas, una para cliente y otra para administrador. A continuación se muestran 
                    dos videos de como funciona cada una de ellas
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-E7908j38X0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

                <p>El vídeo que se muestra a continuación sería de como funciona la aplicación desde una vista de administrador</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ZRobGjPoAA8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </Stack>
        </div>
    );
}

export default HelpPage; 