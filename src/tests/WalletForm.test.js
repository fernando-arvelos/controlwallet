import { screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const VALUE_ID = 'value-input';
const DESCRIPTION_ID = 'description-input';

const mockExpense = [
  {
    id: 0,
    value: '50',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: 'teste1',
    exchangeRates: { ...mockData },
  },
  {
    id: 1,
    value: '1',
    currency: 'BTC',
    method: 'Cartão de Crédito',
    tag: 'Saúde',
    description: 'teste2',
    exchangeRates: { ...mockData },
  },
];

const currencies = [
  'USD',
  'CAD',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'EUR',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP',
  'DOGE',
];

const INITIAL_STATE = {
  user: {
    email: 'alguem@email.com',
  },
  wallet: {
    currencies,
    expenses: mockExpense,
    editor: false,
    idToEdit: 0,
  },
};

describe('Testa as funcionalidades do WalletForm', () => {
  test('Testa se o formulário está sendo renderizado na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_ID);
    const description = screen.getByTestId(DESCRIPTION_ID);
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: /despesa/i });

    expect(value).toBeDefined();
    expect(description).toBeDefined();
    expect(currency).toBeDefined();
    expect(method).toBeDefined();
    expect(tag).toBeDefined();
    expect(addButton).toBeDefined();
  });

  test('Testa se handleSubmit é chamado quando o botão de adicionar despesa é clicado', async () => {
    const exchangeRate = mockData.USD.ask;
    const currencyName = mockData.USD.name;
    const valueBRL = 10 * exchangeRate;

    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_ID);
    const description = screen.getByTestId(DESCRIPTION_ID);
    const addButton = screen.getByRole('button', { name: /despesa/i });

    expect(value).toBeDefined();
    expect(description).toBeDefined();
    expect(addButton).toBeDefined();

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');
    userEvent.click(addButton);

    const tableValue = screen.findByText('10');
    const tableDescription = screen.findByText('Teste');
    const currencyDescription = screen.findByText(currencyName);
    const rate = screen.queryByText('4.75');
    const BRL = screen.findByText('BRL');
    const deleteButton = screen.findByTestId('delete-btn');
    const editButton = screen.findByTestId('edit-btn');
    const convertedAmount = screen.findByText(valueBRL);

    expect(value.innerText).not.toBeDefined();
    expect(description.innerText).not.toBeDefined();
    expect(tableValue).toBeDefined();
    expect(tableDescription).toBeDefined();
    expect(currencyDescription).toBeDefined();
    expect(rate).toBeDefined();
    expect(BRL).toBeDefined();
    expect(deleteButton).toBeDefined();
    expect(editButton).toBeDefined();
    expect(convertedAmount).toBeDefined();

    userEvent.click(await editButton);
    expect(tableValue).not.toBeDefined();
  });

  test('Testa o botão de editar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId(VALUE_ID);
    const descriptionInput = screen.getByTestId(DESCRIPTION_ID);
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, '1');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0]);
    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, '2');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');

    expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));

    expect(await screen.findByRole('cell', { name: '2.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '2' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Cartão de débito' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
  });
});
