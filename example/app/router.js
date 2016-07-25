import { Backbone } from 'tungstenjs';
import { Actions } from 'app/reducer';
import { FILTER_ALL } from 'app/lib/constants';

export default store => Backbone.Router.extend({
  routes: {
    '*filter': 'setFilter',
  },

  setFilter: function (filter) {
    store.dispatch(Actions.updateFilter(filter || FILTER_ALL));
  },
});
