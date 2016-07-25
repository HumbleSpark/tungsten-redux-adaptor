import { BaseView } from 'tungsten-redux-adaptor';

// serialize immutable reducer
export default BaseView.extend({
  serialize: function() {
    const state = BaseView.prototype.serialize.call(this);
    return state.toJS();
  },
});
