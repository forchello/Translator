import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import langReducer from '../reducers/LanguageReducers';
import microReducer from '../reducers/MicroReducers';
import translateReducer from '../reducers/TranslateReducers';

const rootReducer = combineReducers({
  langReducer,
  microReducer,
  translateReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
