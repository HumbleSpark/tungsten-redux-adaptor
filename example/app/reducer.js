import { createReducer, createActions } from 'app/lib/redux';
import { FILTER_ALL } from 'app/lib/constants';
import { fromJS } from 'immutable';
import { uniqueId } from 'lodash';

const newTodo = title => fromJS({
  id: uniqueId(), title, completed: false, editing: false,
});

const getItemNdx = (state, id) => state.get('todoItems').findIndex(todo => todo.get('id') === id);

const initialState = fromJS({
  filter: FILTER_ALL,
  newValue: '',
  todoItems: [
    newTodo('first todo from initialState'),
  ],
});

export const Actions = createActions([
  'updateNewValue', 'addTodo', 'toggleCompleted', 'updateFilter',
  'toggleEditItem', 'removeItem', 'toggleAll', 'clearCompleted',
]);

export default createReducer({
  [Actions.updateFilter](state, payload) {
    return state.set('filter', payload);
  },

  [Actions.updateNewValue](state, payload) {
    return state.set('newValue', payload);
  },

  [Actions.addTodo](state) {
    const newValue = state.get('newValue');
    if (!newValue) return state;
    return state
      .updateIn(['todoItems'], todos => todos.push(newTodo(newValue.trim())))
      .set('newValue', initialState.get('newValue'));
  },

  [Actions.toggleCompleted](state, id) {
    const ndx = getItemNdx(state, id);
    return state.updateIn(['todoItems', ndx, 'completed'], x => !x);
  },

  [Actions.toggleEditItem](state, payload) {
    const { id, title, editing } = payload;
    const ndx = getItemNdx(state, id);
    return state
      .setIn(['todoItems', ndx, 'editing'], editing)
      .setIn(['todoItems', ndx, 'title'], title);
  },

  [Actions.removeItem](state, id) {
    const ndx = getItemNdx(state, id);
    return state.deleteIn(['todoItems', ndx]);
  },

  [Actions.toggleAll](state, completed) {
    return state.update('todoItems', items => items.map(item => {
      return item.set('completed', completed);
    }));
  },

  [Actions.clearCompleted](state) {
    return state.update('todoItems', items => items.filter(item => {
      return !item.get('completed');
    }));
  },
}, initialState);
