'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tungstenjs = require('@ndreckshage/tungstenjs');

var _contextAdaptor = require('./contextAdaptor');

var _contextAdaptor2 = _interopRequireDefault(_contextAdaptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO does this has to be a side effect
exports.default = function () {
  _tungstenjs._Context.setAdapterFunctions(_contextAdaptor2.default);
};