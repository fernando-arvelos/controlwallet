import getCurrencies from '../../services/currenciesAPI';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const requestCurrenciesFailure = () => ({
  type: REQUEST_CURRENCIES_FAILURE,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());

  try {
    const currencies = await getCurrencies();
    const keysCurrencies = Object.keys(currencies);
    const newCurrencies = [...keysCurrencies.slice(0, 1), ...keysCurrencies.slice(2)];

    dispatch(requestCurrenciesSuccess(newCurrencies));
  } catch (error) {
    dispatch(requestCurrenciesFailure());
  }
};
