import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';
import { IoPersonCircle } from 'react-icons/io5';
import logo from '../img/logo.png';
import coins from '../img/coins.svg';

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
      <main>
        <header className="flex justify-center">
          <div className="global-header">
            <div className="logo-header">
              <img className="w-11 mb-3 lg:m-0" src={ logo } alt="logo" />
              <span className="text-[25px] mr-2 text-[#003BE5]">Control</span>
              <span className="text-[25px] text-[#2FC18C] font-extrabold">Wallet</span>
            </div>
            <div className="flex items-center text-[#003BE5] text-sm mb-3 lg:m-0">
              <img className="mr-2 w-7" src={ coins } alt="coin" />
              <span className="font-bold mr-1">Total de despesas:</span>
              <span>{totalValue}</span>
              <span className="ml-1">BRL</span>
            </div>
            <div className="flex items-center">
              <IoPersonCircle className="text-[#2FC18C] text-2xl" />
              <span className="ml-2 text-sm font-semibold text-[#2FC18C]">{email}</span>
            </div>
          </div>
        </header>
      </main>
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
