
import { render, screen } from '@testing-library/react';

import Profile from '../../pages/user/Profile';

test('Carga correcta de la ventana SingUp',async () => {
     render(
         <Profile email={"khdkadhka"} /> 
    );

    expect(screen.getByText(/No hay sesión inciada, por favor inicie sesión/i)).toBeInTheDocument();
})  