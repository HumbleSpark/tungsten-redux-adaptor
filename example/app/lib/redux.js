import { createAction, createReducer } from 'redux-act';

const createActions = actions => {
  return actions.reduce((result, action) => {
    result[action] = createAction(`${action}`);
    return result;
  }, {});
};

export {
  createReducer,
  createActions,
};
