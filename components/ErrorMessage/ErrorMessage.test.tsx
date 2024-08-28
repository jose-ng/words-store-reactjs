import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('Component ErrorMessage', () => {
    it('Renders a default text', () => {
        render(<ErrorMessage></ErrorMessage>);
        expect(screen.getByText('Error')).toBeInTheDocument();
    });
    it('Renders a text message', () => {
        const msg = 'This is an error';
        render(<ErrorMessage msg={msg}></ErrorMessage>);
        expect(screen.getByText(msg)).toBeInTheDocument();
    });
});
