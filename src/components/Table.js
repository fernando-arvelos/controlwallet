/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import { TiEdit } from 'react-icons/ti';
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
      <main className="main-table">
        <div className="overflow-x-auto">
          <table className="table-table min-w-full mx-2 md:mx-0">
            <thead className="w-[1037px] border-b-[1px]">
              <tr className="divide-x">
                <th className="th-table">Descrição</th>
                <th className="th-table">Tag</th>
                <th className="th-table">Método de pagamento</th>
                <th className="th-table">Valor</th>
                <th className="th-table">Moeda</th>
                <th className="th-table">Câmbio utilizado</th>
                <th className="th-table">Valor convertido</th>
                <th className="th-table">Moeda de conversão</th>
                <th className="th-table">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                const { value, currency, exchangeRates } = expense;
                const exchange = Number(exchangeRates[currency].ask);
                const convValue = value * exchange;

                return (
                  <tr key={ expense.id } className="max-h-1">
                    <td className="td-table">{expense.description}</td>
                    <td className="td-table">{expense.tag}</td>
                    <td className="td-table">{expense.method}</td>
                    <td className="td-table">{Number(expense.value).toFixed(2)}</td>
                    <td className="td-table">{expense.exchangeRates[currency].name}</td>
                    <td className="td-table">{exchange.toFixed(2)}</td>
                    <td className="td-table">{convValue.toFixed(2)}</td>
                    <td className="td-table">Real</td>
                    <td className="td-table">
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => this.handleClickEdit(expense.id) }
                      >
                        <TiEdit className="text-[18px] mr-3" />
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.handleClickDel(expense) }
                      >
                        <FaTrash className="text-[#DF3C6D] text-[15px]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
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
