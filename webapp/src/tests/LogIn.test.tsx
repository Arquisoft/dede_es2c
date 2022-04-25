/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import LogIn from '../pages/LogIn';

test('Carga correcta de la ventana LogIn',async () => {
   const {getAllByText} =  render(
         <LogIn /> 
    );

    expect(getAllByText("Introduza su contraseña")[0]).toBeInTheDocument();
})  