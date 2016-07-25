import { createStore } from 'redux';
import reducer from 'app/reducer';
import router from 'app/router';

import tungsten from 'tungstenjs';
import template from 'app/templates/todo_app_view.mustache';
import AppView from 'app/views/todo_app_view';

import 'todomvc-app-css/index.css';

const { View, Model, Collection, Backbone } = tungsten;

const store = createStore(reducer);
const el = document.getElementById('app');
const view = new AppView({
  el, template, store,
  dynamicInitialize: true,
});

if (!Backbone.history.started) {
  const Router = router(store);
  new Router(store);
  Backbone.history.start();
};
