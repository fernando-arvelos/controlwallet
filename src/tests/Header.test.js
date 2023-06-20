import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const VALID_EMAIL = 'alguem@email.com';
const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';

const fetchAPI = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

jest.spyOn(global, 'fetch').mockImplementation(() => fetchAPI);
afterEach(() => jest.clearAllMocks());

describe('Testa o Header da página de carteira', () => {
  test('Testa se o email é renderizado na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/carteira'));
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent(VALID_EMAIL);
  });

  test('Testa se o total de gastos é renderizado na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/carteira'));
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
  });
});
