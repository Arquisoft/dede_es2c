import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer/Footer';

test('Footer de la aplicación', async () => {
    render(
        <>
            <Footer />
        </>
    );

    expect(screen.getByText(/Información adicional/i)).toBeInTheDocument();
})