import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { userReducer } from './user-reducer';

export const userStore = createStore(userReducer);
export const userPersitor = persistStore(userStore)