/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import Signup from '../pages/Signup';

test('Carga correcta de la ventana SingUp',async () => {
   const {getAllByText} =  render(
         <Signup /> 
    );

    expect(getAllByText("Nombre")[0]).toBeInTheDocument();
})  