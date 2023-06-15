import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string } from 'prop-types';
import { actionFetchCurrencies } from '../redux/actions/walletAction';

class WalletForm extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleClick = (e) => {
    e.preventDefault();
  };

  render() {
    const { currencies } = this.props;

    return (
      <>
        <div>
          <label htmlFor="description-input">Descrição das despesa</label>
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
          />

          <label htmlFor="tag-select">Categoria da despesa</label>
          <select
            id="tag-select"
            data-testid="tag-input"
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
          />

          <label htmlFor="method-input">Método de pagamento</label>
          <select
            id="method-input"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <label htmlFor="currency-input">Moeda</label>
          <select
            id="currency-input"
            data-testid="currency-input"
          >
            {currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
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

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(actionFetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  getCurrencies: func.isRequired,
  currencies: arrayOf(string).isRequired,
};
