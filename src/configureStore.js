import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers';

export default function configureStore(preloadedState) {
  const middlewares = [
    thunkMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [
    middlewareEnhancer
  ];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const rootReducer = combineReducers({
    ...reducers,
    form: formReducer
  });

  const store = createStore(rootReducer, undefined, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}