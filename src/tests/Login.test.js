import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const VALID_EMAIL = 'alguem@email.com';
const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';

afterEach(() => jest.clearAllMocks());

describe('Testa a página de login', () => {
  test('Testa a rota da página de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se a página contém os campos de email, senha e botão', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Testa se o botão está desabilitado quando o email e senha são inválidos', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    userEvent.type(emailInput, 'email');
    expect(loginButton).toBeDisabled();

    userEvent.type(passwordInput, '123456');
    expect(loginButton).toBeDisabled();
  });

  test('Testa se o botão está habilitado quando o email e senha são válidos', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    userEvent.type(emailInput, VALID_EMAIL);
    expect(loginButton).toBeDisabled();

    userEvent.type(passwordInput, '123456');
    expect(loginButton).toBeEnabled();
  });

  test('Testa se o email é salvo no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });

  test('Testa se a rota é alterada para a página de carteira após o login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
