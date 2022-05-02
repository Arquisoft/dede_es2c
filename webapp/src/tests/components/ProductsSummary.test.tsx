import { render, screen } from '@testing-library/react';
import ProductSummary from '../../pages/ProductsSummary';

test('Componente Producto Sumario', async () => {
    render(<ProductSummary cartItems={[]} />) 
    expect(screen.getByText(/Completar el pago/i)).toBeInTheDocument();
}); 