import React from 'react';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions/userAction';
import logo from '../img/logo.png';

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
      <main className="bg-img font-epilogue flex items-center justify-center">
        <section className="flex items-center justify-center">
          <form className="form-login">
            <div className="flex items-center">
              <img className="w-11" src={ logo } alt="logo" />
              <span className="text-[25px] mr-2 text-[#003BE5]">Control</span>
              <span className="text-[25px] text-[#2FC18C] font-extrabold">Wallet</span>
            </div>

            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="E-mail"
              data-testid="email-input"
              className="input-login mt-[10px] md:mt-[45px]"
            />
            <input
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              placeholder="Senha"
              data-testid="password-input"
              className="input-login"
            />
            <button
              type="submit"
              disabled={ !isEmailValid || !isPasswordValid }
              onClick={ this.handleClick }
              className="btn-login"
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
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
