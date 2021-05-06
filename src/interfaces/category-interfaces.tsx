import { Response } from './common';

export interface Category {
    id: number,
    name: string,
    description: string,
    enable: boolean
}

export interface CategoryResponse extends Response{
    data : Category[]
}