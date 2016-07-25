import Tungsten from 'tungstenjs';
import { initializeAdaptor } from 'tungsten-redux-adaptor';

import { createStore } from 'redux';
import reducer from 'app/reducer';
import router from 'app/router';

import AppView from 'app/views/todo_app_view';
import template from 'app/templates/todo_app_view.mustache';

import 'todomvc-app-css/index.css';

initializeAdaptor(); // @TODO can this be done differently? side effect

const store = createStore(reducer);
const el = document.getElementById('app');
const view = new AppView({
  el, template, store,
  dynamicInitialize: true,
});

if (!Tungsten.Backbone.history.started) {
  const Router = router(store);
  new Router();
  Tungsten.Backbone.history.start();
};
