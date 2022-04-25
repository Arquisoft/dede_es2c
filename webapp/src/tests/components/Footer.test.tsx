/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";

import Footer from '../../components/Footer/Footer';

test('Footer de la aplicacion', async () => {
    const {getByText} = render(<Footer />)

    expect(getByText("Universidad de Oviedo, Asturias")).toBeInTheDocument();
});