import Tungsten from 'tungstenjs';
import renderQueue from '@ndreckshage/tungstenjs/adaptors/shared/render_queue';
import shallowEqual from './shallowEqual';

// @TODO own a Tungsten base view in Tungsten core (even if based on Backbone.View)?
// then have a separate backbone adaptor to actually use with backbone. many things
// like validateVdom seem like they are needed regardless, and should avoid duplication.
// would be great if api is limited to how to subscribe and when to update, etc.
// and throw errors if adaptors doesnt implement necessary api

export default Tungsten.View.extend({
  // Setup store, then defer to Tungsten base view
  initialize: function(options = {}) {
    // Pass store to all views. Initialize parent model w/ store state.
    if (options.parentView && options.parentView.store) {
      this.store = options.parentView.store;
    } else if (options.store) {
      this.store = options.store;
      this.model = this.serialize();
    }

    Tungsten.View.prototype.initialize.apply(this, arguments);
  },

  initializeRenderListener: function(dataItem) {
    // If this has a model and is the top level view, set up the listener for rendering
    if (dataItem) {
      if (!this.parentView) {
        const boundRender = _.bind(this.render, this);
        const runOnChange = () => {
          renderQueue.queue(this, boundRender);
        };

        this.store.subscribe(() => {
          // Since we're attaching a very naive listener, we may get many events in sequence, so we set a small debounce
          clearTimeout(this.debouncer);
          this.debouncer = setTimeout(runOnChange, 1);
        });
      }
    }
  },

  update: function(newModel) {
    if (!shallowEqual(newModel, this.model)) {
      this.model = newModel;
      this.render();
    }
  },

  serialize: function() {
    return this.store.getState();
  },
});
