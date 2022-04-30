import { render, screen} from '@testing-library/react';

import NoPermissions from '../../pages/utils/NoPermissions';


test('Carga correcta de la ventana Help Page',async () => {
    render(<NoPermissions /> );
    expect(screen.getByText(/No dispone de los permisos necesarios para acceder a la ruta introducida/i)).toBeInTheDocument();
 })   