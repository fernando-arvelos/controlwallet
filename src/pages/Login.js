import React from 'react';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions/userAction';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isEmailValid = () => {
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  isPasswordValid = () => {
    const { password } = this.state;
    const number = 6;
    return password.length >= number;
  };

  handleClick = (e) => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    e.preventDefault();
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const isEmailValid = this.isEmailValid();
    const isPasswordValid = this.isPasswordValid();

    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="E-mail"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Senha"
            data-testid="password-input"
          />
          <button
            type="submit"
            disabled={ !isEmailValid || !isPasswordValid }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
  dispatch: func.isRequired,
};
