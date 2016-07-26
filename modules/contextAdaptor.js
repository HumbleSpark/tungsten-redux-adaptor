import { ComponentWidget } from '@ndreckshage/tungstenjs';

const initialize = function(view, parentContext) {
  if (view == null) view = {};
  view.tungstenModel = true; // hardcode true for redux pojos. tungstenjs/src/template/template_context#isModel needs it
  if (!parentContext && view.parent) {
    this.parent = new Context(view.parent);
  } else {
    this.parent = parentContext;
  }
};

const lookupValue = function(view, name) {
  if (view[name] != null) return view[name];
  if (typeof value === 'function') return value.call(view); // not sure why needed but keep
  return null;
};

export default {
  initialize,
  lookupValue,
  ComponentWidget,
}
