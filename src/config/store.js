// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../reducers';

const storeConfig = () => createStore(reducers, applyMiddleware(thunk));

export default storeConfig;
