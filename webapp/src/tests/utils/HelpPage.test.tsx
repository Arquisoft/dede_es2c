/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import HelpPage from '../../pages/utils/HelpPage';


test('Carga correcta de la ventana SingUp',async () => {
    const {getAllByText} =  render(
          <HelpPage /> 
     );
 
     expect(getAllByText("Hola")[0]).toBeInTheDocument();
 })  