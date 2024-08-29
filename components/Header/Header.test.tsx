import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Component Header', () => {
    it('Renders links and children content', () => {
        render(<Header><p>This is a sample</p></Header>);
        expect(screen.getByRole('link', {name: /dictionary/i})).toBeInTheDocument()
        expect(screen.getByText('This is a sample')).toBeInTheDocument();
    });

    it('Should collapse menu on click', async () => {
        render(<Header><p>This is a sample</p></Header>);
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('navigation')).not.toHaveClass('hidden')
    })
});
