/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string, number, bool, shape } from 'prop-types';
import { actionFetchCurrencies } from '../redux/actions/walletAction';
import { addExpenses, saveEditExpense } from '../redux/actions/ expensesAction';
import getCurrencies from '../services/currenciesAPI';

class WalletForm extends Component {
  state = {
    addExpensesState: {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => ({
      addExpensesState: {
        ...prevState.addExpensesState,
        [name]: value,
      },
    }));
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { addExpensesState } = this.state;
    const { id } = addExpensesState;

    const response = await getCurrencies();
    const stateSaved = {
      ...addExpensesState,
      exchangeRates: response,
    };
    dispatch(addExpenses(stateSaved));

    this.setState({
      addExpensesState: {
        id: id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    });
  };

  handleEdit = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { addExpensesState } = this.state;
    const { value, description, currency, method, tag } = addExpensesState;
    const editCurrentExpense = expenses.find((expense) => expense.id === idToEdit);
    const editedCurrent = {
      id: idToEdit,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates: editCurrentExpense.exchangeRates,
    };
    const deleteExpense = expenses.filter((expense) => expense.id !== idToEdit);
    dispatch(saveEditExpense(deleteExpense));
    const newExpenses = [...deleteExpense, editedCurrent];
    dispatch(saveEditExpense(newExpenses.sort((a, b) => a.id - b.id)));
    this.setState((prev) => ({
      ...prev,
      addExpensesState: {
        id: prev.addExpensesState.id,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    }));
  };

  render() {
    const { currencies, editor } = this.props;
    const { addExpensesState } = this.state;
    const { value, description, currency, method, tag } = addExpensesState;

    return (
      <main className="flex justify-center mt-8 lg:mt-0">
        <section className="flex flex-col h-[134px] w-[1037px] justify-evenly">
          <div className="global-walletform">
            <div className="lg:mr-8">
              <label
                className="text-sm font-bold text-[#003BE5] mr-3"
                htmlFor="description-input"
              >
                Descrição das despesa
              </label>
              <input
                id="description-input"
                className="w-[140px] sm:w-[170px] md:w-[289px] input-walletform"
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </div>

            <div>
              <label
                className="text-sm font-bold text-[#003BE5] mr-6 md:mr-3"
                htmlFor="tag-select"
              >
                Categoria da despesa
              </label>
              <select
                id="tag-select"
                className="select-walletform w-[140px] sm:w-[170px] md:w-[155px]"
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
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-center items-center">
            <div>
              <label
                className="text-sm font-bold text-[#003BE5] mr-3"
                htmlFor="value-input"
              >
                Valor
              </label>
              <input
                id="value-input"
                className="input-walletform w-[158px] lg:mr-8"
                type="number"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </div>

            <div>
              <label
                className="text-sm font-bold text-[#003BE5] mr-3"
                htmlFor="method-input"
              >
                Método de pagamento
              </label>
              <select
                id="method-input"
                className="select-walletform w-[120px] md:w-[228px]  lg:mr-8"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </div>

            <div>
              <label
                className="text-sm font-bold text-[#003BE5] mr-3"
                htmlFor="currency-input"
              >
                Moeda
              </label>
              <select
                id="currency-input"
                className="select-walletform w-[91px]"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {currencies.map((curr, index) => (
                  <option key={ index }>{curr}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center lg:mt-[53px]">
            <button
              type="button"
              className="button-walletform"
              onClick={ editor ? this.handleEdit : this.handleClick }
            >
              { editor ? 'Editar despesa' : 'Adicionar despesa' }
            </button>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  idToEdit: number.isRequired,
  editor: bool.isRequired,
  expenses: arrayOf(
    shape({
      id: number.isRequired,
      value: string.isRequired,
      description: string.isRequired,
      currency: string.isRequired,
      method: string.isRequired,
      tag: string.isRequired,
    }).isRequired,
  ).isRequired,
};
