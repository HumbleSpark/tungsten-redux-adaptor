import BaseView from 'app/views/base_view';
import { Actions } from 'app/reducer';
import { ENTER_KEY, ESC_KEY } from 'app/lib/constants';

export default BaseView.extend({
  events: {
    'blur .js-todo-edit': 'handleBlurTodoEdit',
    'change .js-toggle': 'handleChangeToggle',
    'click .js-destroy': 'handleClickDestroy',
    'dblclick .js-todo-title': 'handleDblClickTodoTitle',
    'keydown .js-todo-edit': 'handleKeyDownTodoEdit',
    'keypress .js-todo-edit': 'handleKeyPressTodoEdit'
  },

  handleBlurTodoEdit: function(e) {
    if (!this.model.editing) return; // @TODO wont work bc bug in readme, etc.
    this.clear(e.currentTarget);
  },

  handleClickDestroy: function() {
    this.store.dispatch(Actions.removeItem(this.model.id));
  },

  handleChangeToggle: function() {
    this.store.dispatch(Actions.toggleCompleted(this.model.id));
  },

  handleDblClickTodoTitle: function() {
    const { id, title } = this.model;
    this.store.dispatch(Actions.toggleEditItem({ id, title, editing: true }));
    this.listenToOnce(this, 'rendered', function() {
      this.el.querySelector('.js-todo-edit').focus();
    });
  },

  handleKeyDownTodoEdit: function(e) {
    if (e.which === ESC_KEY) {
      const { id, title } = this.model;
      this.store.dispatch(Actions.toggleEditItem({ id, title, editing: false }));
    }
  },

  handleKeyPressTodoEdit: function(e) {
    if (e.which === ENTER_KEY) {
      this.clear(e.currentTarget);
    }
  },

  clear: function(input) {
    const { id, title } = this.model;
    var value = input.value;
    var trimmedValue = value.trim();

    if (trimmedValue) {
      this.store.dispatch(Actions.toggleEditItem({ id, title: trimmedValue, editing: false }));
    } else {
      this.handleClickDestroy();
    }
  }
});
