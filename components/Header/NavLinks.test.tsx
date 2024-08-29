import { render, screen, fireEvent } from '@testing-library/react';
import { NavLinks } from './NavLinks';
import { renderWithProviders } from '@/utils/tests/renderWithProviders';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));
describe('Component NavLinks', () => {
    it('Renders navigation links', () => {
        renderWithProviders(<NavLinks></NavLinks>);
        expect(screen.getByRole('link', { name: /Words/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Academy/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    });

    it('Renders Words active link correctly', () => {
        mockUsePathname.mockImplementation(() => '/words');
        renderWithProviders(<NavLinks></NavLinks>);
        expect(screen.getByRole('link', { name: /Words/i })).toHaveClass('text-white');
        expect(screen.getByRole('link', { name: /Academy/i })).toHaveClass('text-gray-900');
        expect(screen.getByRole('link', { name: /About/i })).toHaveClass('text-gray-900');
    })

    it('Renders Academy active link correctly', () => {
        mockUsePathname.mockImplementation(() => '/academy');
        renderWithProviders(<NavLinks></NavLinks>);
        expect(screen.getByRole('link', { name: /Words/i })).toHaveClass('text-gray-900');
        expect(screen.getByRole('link', { name: /Academy/i })).toHaveClass('text-white');
        expect(screen.getByRole('link', { name: /About/i })).toHaveClass('text-gray-900');
    })

    it('Renders About active link correctly', () => {
        mockUsePathname.mockImplementation(() => '/about');
        renderWithProviders(<NavLinks></NavLinks>);
        expect(screen.getByRole('link', { name: /Words/i })).toHaveClass('text-gray-900');
        expect(screen.getByRole('link', { name: /Academy/i })).toHaveClass('text-gray-900');
        expect(screen.getByRole('link', { name: /About/i })).toHaveClass('text-white');
    })

    it('Doesnt Render sign out button', async () => {
        renderWithProviders(<NavLinks></NavLinks>);
        expect(await screen.queryByRole('button', { name: /Exit/i })).not.toBeInTheDocument();
    })

    describe('logged in state', () => {
        it('Sign out button is clickable when logged in', async () => {
            renderWithProviders(<NavLinks></NavLinks>, { preloadedState: { user: { isLoggedIn: true } } });
            fireEvent.click(screen.getByRole('button', { name: /Exit/i }))
            expect(await screen.queryByRole('button', { name: /Exit/i })).not.toBeInTheDocument();
        })

        it('Renders submenu links when logged in', () => {
            renderWithProviders(<NavLinks></NavLinks>, { preloadedState: { user: { isLoggedIn: true } } });
            expect(screen.getByRole('button', { name: /Add Word/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Add Note/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Exit/i })).toBeInTheDocument();
        });
    })
});
