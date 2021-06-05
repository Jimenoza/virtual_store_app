import { UserAction, } from './interfaces';
import { DataUser } from '../../interfaces';

const INITIAL_STATE = {
    token : null,
    user: null,
}

export function userReducer(state: DataUser = INITIAL_STATE, action: UserAction) {
    switch (action.type) {
      case 'user/login': {
        return {...state, ...action.payload};
      }
      case 'user/logout': {
          return INITIAL_STATE;
        }
      default:{
        return {...state};
      }
    }
}