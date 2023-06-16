import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string, shape } from 'prop-types';
import { actionFetchCurrencies } from '../redux/actions/walletAction';
import { addExpenses } from '../redux/actions/ expensesAction';
import getCurrencies from '../services/currenciesAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (e) => {
    const { dispatch, expenses } = this.props;

    const response = await getCurrencies();

    e.preventDefault();
    const stateSaved = {
      id: expenses.length,
      ...this.state,
      exchangeRates: response,
    };
    dispatch(addExpenses(stateSaved));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <>
        <div>
          <label htmlFor="description-input">Descrição das despesa</label>
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />

          <label htmlFor="tag-select">Categoria da despesa</label>
          <select
            id="tag-select"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>

        <div>
          <label htmlFor="value-input">Valor</label>
          <input
            id="value-input"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />

          <label htmlFor="method-input">Método de pagamento</label>
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <label htmlFor="currency-input">Moeda</label>
          <select
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((curr, index) => (
              <option key={ index }>{curr}</option>
            ))}
          </select>

          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>

      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  expenses: arrayOf(shape()).isRequired,
};
