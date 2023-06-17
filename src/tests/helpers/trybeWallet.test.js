import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Testa o projeto TrybeWallet', () => {
  it('Verifica se os componentes da Página de login estão certos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se os componentes da Página de Wallet estão certos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    act(() => {
      userEvent.type(email, 'teste@test.com');
      userEvent.type(password, '123456');
    });

    expect(button).not.toBeDisabled();

    act(() => {
      userEvent.click(button);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const header = screen.getByTestId('email-field');
    const expenses = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(header).toBeInTheDocument();
    expect(expenses).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
});
