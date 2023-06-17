import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);

    return (
      <table>
        <thead>
          <tr>
            <th scope="row">Descrição</th>
            <th scope="row">Tag</th>
            <th scope="row">Método de pagamento</th>
            <th scope="row">Valor</th>
            <th scope="row">Moeda</th>
            <th scope="row">Câmbio utilizado</th>
            <th scope="row">Valor convertido</th>
            <th scope="row">Moeda de conversão</th>
            <th scope="row">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const { value, currency, exchangeRates } = expense;
            const exchange = Number(exchangeRates[currency].ask);
            const convValue = (value * exchange);

            return (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[currency].name}</td>
                <td>{exchange.toFixed(2)}</td>
                <td>{convValue.toFixed(2)}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
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
  expenses: arrayOf(shape({
    value: string,
    currency: string,
    exchangeRates: shape({
      ask: string,
    }).isRequired,
  })).isRequired,
};
