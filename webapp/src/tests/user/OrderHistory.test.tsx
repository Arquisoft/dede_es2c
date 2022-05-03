import { render, screen } from "@testing-library/react";
import OrderHistory from '../../pages/user/OrderHistory';

test('Carga bien historial pedidos', async () => {
    render(<OrderHistory email={"dhkahdkah@gmail.com"}/>);

    expect(screen.getByText(/Fecha de orden/i)).toBeInTheDocument();
})