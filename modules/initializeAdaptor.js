import { _Context as Context } from '@ndreckshage/tungstenjs';
import contextAdaptor from './contextAdaptor';

// @TODO does this has to be a side effect
export default () => {
  Context.setAdapterFunctions(contextAdaptor);
};
