import { render, screen } from '@testing-library/react';
import AddProdutcAdmin from '../../pages/admin/AddProdcutAdmin';

test('Admin -> Añadir Productos', async () => {
    render(<AddProdutcAdmin />)
    expect(screen.getByText(/No ha iniciado sesión, por favor inicie sesión/i)).toBeInTheDocument();
});
 