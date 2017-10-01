import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const logger = createLogger();
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk)),
  applyMiddleware(...middlewares),
);

export default configureStore;
