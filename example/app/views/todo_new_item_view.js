import BaseView from 'app/views/base_view';
import { Actions } from 'app/reducer';
import { ENTER_KEY } from 'app/lib/constants';

export default BaseView.extend({
  events: {
    'keyup': 'handleKeyup',
  },

  handleKeyup: function(e) {
    if (e.which === ENTER_KEY) {
      this.store.dispatch(Actions.addTodo())
    } else {
      this.store.dispatch(Actions.updateNewValue(e.target.value));
    }
  }
});
