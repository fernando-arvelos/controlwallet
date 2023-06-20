import { screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

afterEach(() => jest.clearAllMocks());

describe('', () => {
  describe('Testa as funcionalidades da tabela', () => {
    test('Testa se a tabela está sendo renderizada', () => {
      renderWithRouterAndRedux(<Wallet />);

      const valueInput = screen.getByTestId('value-input');
      const descriptionInput = screen.getByTestId('description-input');
      const button = screen.getByRole('button', { name: /despesa/i });

      expect(valueInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      userEvent.type(valueInput, '10');
      userEvent.type(descriptionInput, 'Teste');
      userEvent.click(button);

      const deleteButton = screen.findByTestId('delete-btn');
      const editButton = screen.findByTestId('edit-btn');

      expect(deleteButton).toBeDefined();
      expect(editButton).toBeDefined();
    });
  });
});
