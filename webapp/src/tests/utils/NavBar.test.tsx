import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/navbar/NavBar';
import NavBarAdmin from '../../components/navbar/NavBarAdmin';

test('NavBar de la aplicación', async () => {
    render(
        <>
            <NavBar cartItems={[]} />
        </>
    );

    expect(screen.getByText(/DeDe/i)).toBeInTheDocument();
})

test('NavBar de la aplicación en Admin', async () => {
    render(
        <>
            <NavBarAdmin cartItems={[]} />
        </>
    );

    expect(screen.getByText(/Añadir Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument();
})