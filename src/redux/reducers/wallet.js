const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES_SUCCESS':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'EDIT_EXPENSES':
    return {
      ...state,
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'SAVE_EDIT_EXPENSE':
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
