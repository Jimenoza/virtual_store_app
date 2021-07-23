import { createStore } from 'redux';
import { replyReducer } from './reply-reducer';

export const replyStore = createStore(replyReducer);