import { Response } from './common';

export interface User {
    id : number,
    name : string,
    email : string,
    admin: boolean,
}

export interface DataUser {
    token : string | null,
    user : User | null
}

export interface UserResponse extends Response {
    data : DataUser
}