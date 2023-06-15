import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { emailGlobal } = this.props;
    const totalExpenses = 0;

    return (
      <>
        <div>
          <span data-testid="total-field">{`Total de despesas: ${totalExpenses} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div
          data-testid="email-field"
        >
          {`Email: ${emailGlobal}`}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGlobal: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailGlobal: string.isRequired,
};
