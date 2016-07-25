import { View } from 'tungstenjs';
import { Actions } from 'app/reducer';
import { ENTER_KEY, ESC_KEY } from 'app/lib/constants';

// @TODO best way of grabbing id?

export default View.extend({
  events: {
    'blur .js-todo-edit': 'handleBlurTodoEdit',
    'change .js-toggle': 'handleChangeToggle',
    'click .js-destroy': 'handleClickDestroy',
    'dblclick .js-todo-title': 'handleDblClickTodoTitle',
    'keydown .js-todo-edit': 'handleKeyDownTodoEdit',
    'keypress .js-todo-edit': 'handleKeyPressTodoEdit'
  },

  handleBlurTodoEdit: function(e) {
    if (!this.options.context.view.editing) return; // @TODO wont work bc bug in readme, etc.
    this.clear(e.currentTarget);
  },

  handleClickDestroy: function() {
    this.store.dispatch(Actions.removeItem(this.options.context.view.id));
  },

  handleChangeToggle: function() {
    this.store.dispatch(Actions.toggleCompleted(this.options.context.view.id));
  },

  handleDblClickTodoTitle: function() {
    const { id, title } = this.options.context.view;
    this.store.dispatch(Actions.toggleEditItem({ id, title, editing: true }));
    this.listenToOnce(this, 'rendered', function() {
      this.el.querySelector('.js-todo-edit').focus();
    });
  },

  handleKeyDownTodoEdit: function(e) {
    if (e.which === ESC_KEY) {
      const { id, title } = this.options.context.view;
      this.store.dispatch(Actions.toggleEditItem({ id, title, editing: false }));
    }
  },

  handleKeyPressTodoEdit: function(e) {
    if (e.which === ENTER_KEY) {
      this.clear(e.currentTarget);
    }
  },

  clear: function(input) {
    const { id, title } = this.options.context.view;
    var value = input.value;
    var trimmedValue = value.trim();

    if (trimmedValue) {
      this.store.dispatch(Actions.toggleEditItem({ id, title: trimmedValue, editing: false }));
    } else {
      this.handleClickDestroy();
    }
  }
});
