import Reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(Reducers, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;