export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DEL_EXPENSE = 'DEL_EXPENSE';

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const delExpenses = (expenses) => ({
  type: DEL_EXPENSE,
  expenses,
});
