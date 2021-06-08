import { DataUser } from '../../interfaces';

export interface UserStateProps {
    state: DataUser,
}

export enum USER_ACTION {
    login = 'user/login',
    logout = 'user/logout'
}

export interface UserAction {
    type: USER_ACTION,
    payload?: DataUser,
}