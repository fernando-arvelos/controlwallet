import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import { delExpenses, editExpenses } from '../redux/actions/ expensesAction';

class Table extends Component {
  handleClickDel = (expense) => {
    const { dispatch, expenses } = this.props;

    const idToDelete = expense.id;
    const newExpenses = expenses.filter((item) => item.id !== idToDelete);
    dispatch(delExpenses(newExpenses));
  };

  handleClickEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { value, currency, exchangeRates } = expense;
            const exchange = Number(exchangeRates[currency].ask);
            const convValue = (value * exchange);

            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[currency].name}</td>
                <td>{exchange.toFixed(2)}</td>
                <td>{convValue.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleClickDel(expense) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  dispatch: func.isRequired,
  expenses: arrayOf(shape({
    value: string,
    currency: string,
    exchangeRates: shape({
      ask: string,
    }).isRequired,
  })).isRequired,
};
