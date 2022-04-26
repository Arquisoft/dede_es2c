import { render, screen } from '@testing-library/react';
import AddProdutcAdmin from '../../pages/admin/AddProdcutAdmin';

test('Admin -> Añadir Productos', async () => {
    render(<AddProdutcAdmin />)
    expect(screen.getByText(/No dispone de los permisos necesarios para acceder a la ruta introducida/i)).toBeInTheDocument();
});
 