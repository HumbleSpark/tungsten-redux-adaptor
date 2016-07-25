import tungsten from 'tungstenjs';
import NewItemView from 'app/views/todo_new_item_view';
import TodoItemView from 'app/views/todo_item_view';
import { Actions } from 'app/reducer';

const { View, _ } = tungsten;

export default View.extend({
  childViews: {
    'js-new-todo': NewItemView,
    'js-todo-item': TodoItemView
  },

  events: {
    'change .js-toggle-all': 'handleChangeToggleAll',
    'click .js-clear-completed': 'handleClickClearCompleted'
  },

  // @TODO selector api?
  serialize: function() {
    const state = View.prototype.serialize.call(this);

    const filteredTodos = state.todoItems.filter(item => {
      if (state.filter === 'active') return !item.completed;
      if (state.filter === 'completed') return item.completed;
      return item;
    });

    const incompletedItems = state.todoItems.filter(item => {
      return !item.completed;
    });

    const allCompleted = state.todoItems.length > 0 && state.todoItems.every(item => item.completed);
    const hasCompleted = state.todoItems.length > 0 && state.todoItems.some(item => item.completed);

    const todoCount = incompletedItems.length;
    const todoCountPlural = todoCount > 1;

    const hasTodos = state.todoItems.length > 0;

    const filters = [
      { name: 'All', hash: '', selected: state.filter === '' },
      { name: 'Active', hash: 'active', selected: state.filter === 'active' },
      { name: 'Completed', hash: 'completed', selected: state.filter === 'completed' }
    ];

    return {
      ...state,
      filteredTodos,
      incompletedItems,
      todoCount,
      filters,
      hasTodos,
      allCompleted,
      hasCompleted,
      todoCountPlural,
    };
  },

  handleClickClearCompleted: function(e) {
    e.preventDefault();
    this.store.dispatch(Actions.clearCompleted());
  },

  handleChangeToggleAll: function(e) {
    e.preventDefault();
    this.store.dispatch(Actions.toggleAll(e.currentTarget.checked));
  }
});
