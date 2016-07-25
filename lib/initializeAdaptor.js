import { _Context as Context } from 'tungstenjs';
import contextAdaptor from './contextAdaptor';

// @TODO does this has to be a side effect
export default () => {
  Context.setAdapterFunctions(contextAdaptor);
};
