export const ADD_EXPENSES = 'ADD_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const editExpenses = (idToEdit) => ({
  type: EDIT_EXPENSES,
  payload: idToEdit,
});

export const saveEditExpense = (expenses) => ({
  type: SAVE_EDIT_EXPENSE,
  payload: expenses,
});

export const delExpenses = (expenses) => ({
  type: DEL_EXPENSE,
  expenses,
});
