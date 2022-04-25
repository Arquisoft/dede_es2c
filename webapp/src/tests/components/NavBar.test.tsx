/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";

import NavBar from '../../components/NavBar';

test('Footer de la aplicacion', async () => {
    const {getByText} = render(<NavBar cartItems={[]} />)

    expect(getByText("DeDe")).toBeInTheDocument();
});