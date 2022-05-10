import { render, screen } from '@testing-library/react';
import Pago from '../pages/Pago';

test('Ventana Pago', async () => {
     render(<Pago />) 
     expect(screen.getByText(/Comprueba tu direccion/i)).toBeInTheDocument();
    expect(screen.getByText(/Introduzca su Inrupt ID para poder seleccionar la direccion de envío/i)).toBeInTheDocument(); 
}); 

