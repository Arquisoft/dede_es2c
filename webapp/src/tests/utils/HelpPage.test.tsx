/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';

import HelpPage from '../../pages/utils/HelpPage';


test('Carga correcta de la ventana Help Page',async () => {
    render(
          <HelpPage /> 
     );
 
    
     expect(screen.getByText(/Empresa que vende productos electrónicos, en la que la direccion del cliente no se almacenara, sino que será obtenida mediante su POD./i)).toBeInTheDocument();
    expect(screen.getByText(/¿Qué es DeDe?/i)).toBeInTheDocument();
 })  