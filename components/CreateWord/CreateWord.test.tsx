import { render, screen, fireEvent } from '@testing-library/react';
import { CreateWord } from './CreateWord';

describe('Component CreateWord', () => {
    it('Renders inputs and button', () => {
        render(<CreateWord onChangeValue={() => null} form={{ text_en: '', text_es: '' }}></CreateWord>);
        expect(screen.getAllByRole('textbox')).toHaveLength(2);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('Should disable button', () => {
        render(<CreateWord onChangeValue={() => null} form={{ text_en: '', text_es: '' }} sending></CreateWord>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('Should call onSubmit on click', () => {
        const onSubmit = jest.fn()
        render(<CreateWord onSubmit={onSubmit} onChangeValue={() => null} form={{ text_en: '', text_es: '' }}></CreateWord>);
        fireEvent.click(screen.getByRole('button'))
        expect(onSubmit).toHaveBeenCalled();
    });
});
