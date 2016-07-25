import { View } from 'tungstenjs';
export default View.extend({
  serialize: function() {
    const state = View.prototype.serialize.call(this);
    return state.toJS();
  },
});
