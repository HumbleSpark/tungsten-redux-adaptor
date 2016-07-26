'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tungstenjs = require('@ndreckshage/tungstenjs');

var _tungstenjs2 = _interopRequireDefault(_tungstenjs);

var _render_queue = require('@ndreckshage/tungstenjs/adaptors/shared/render_queue');

var _render_queue2 = _interopRequireDefault(_render_queue);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO own a Tungsten base view in Tungsten core (even if based on Backbone.View)?
// then have a separate backbone adaptor to actually use with backbone. many things
// like validateVdom seem like they are needed regardless, and should avoid duplication.
// would be great if api is limited to how to subscribe and when to update, etc.
// and throw errors if adaptors doesnt implement necessary api

exports.default = _tungstenjs2.default.View.extend({
  // Setup store, then defer to Tungsten base view
  initialize: function initialize() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    // Pass store to all views. Initialize parent model w/ store state.
    if (options.parentView && options.parentView.store) {
      this.store = options.parentView.store;
    } else if (options.store) {
      this.store = options.store;
      this.model = this.serialize();
    }

    _tungstenjs2.default.View.prototype.initialize.apply(this, arguments);
  },

  initializeRenderListener: function initializeRenderListener(dataItem) {
    var _this = this;

    // If this has a model and is the top level view, set up the listener for rendering
    if (dataItem) {
      if (!this.parentView) {
        (function () {
          var boundRender = _.bind(_this.render, _this);
          var runOnChange = function runOnChange() {
            _render_queue2.default.queue(_this, boundRender);
          };

          _this.store.subscribe(function () {
            // Since we're attaching a very naive listener, we may get many events in sequence, so we set a small debounce
            clearTimeout(_this.debouncer);
            _this.debouncer = setTimeout(runOnChange, 1);
          });
        })();
      }
    }
  },

  update: function update(newModel) {
    if (!(0, _shallowEqual2.default)(newModel, this.model)) {
      this.model = newModel;
      this.render();
    }
  },

  serialize: function serialize() {
    return this.store.getState();
  }
});