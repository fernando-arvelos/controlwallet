import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component, store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRedux(component, options = {}) {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;

  return {
    ...render(withRedux(component, store)),
    store,
  };
}

export const renderWithRouterAndRedux = (component, route = '/', initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
