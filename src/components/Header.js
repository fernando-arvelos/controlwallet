import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { email } = user;
    const { expenses } = wallet;

    const values = expenses.map((expense) => {
      const { value, currency, exchangeRates } = expense;
      const { ask } = exchangeRates[currency];
      return (value * ask);
    });

    const reducerValue = values.reduce((acc, curr) => acc + curr, 0);
    const totalValue = reducerValue.toFixed(2);

    return (
      <>
        <div>
          <span>Total de despesas: </span>
          <span data-testid="total-field">{totalValue}</span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
        <div
          data-testid="email-field"
        >
          {`Email: ${email}`}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  user,
  wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: shape({
    email: string.isRequired,
  }).isRequired,
  wallet: shape({
    expenses: arrayOf(shape({
      value: string,
      currency: string,
      exchangeRates: shape({
        ask: string,
      }).isRequired,
    })).isRequired,
  }).isRequired,
};
