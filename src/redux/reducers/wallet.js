const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES_SUCCESS':
    return {
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
