import { Response } from './common';
export interface Product {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    available: boolean,
    califications: number,
    average: number,
    category_id: number,
    category_name: string,
    loading?: boolean,
}

interface Link {
    url: string | null,
    label: string,
    active: boolean,
}

interface ProductMetaData {
    current_page: number,
    data: Product[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: Link[],
    next_page_url?: string,
    path: string,
    per_page: string,
    prev_page_url?: string,
    to: number,
    total: number
}

export interface ProductOverviewResponse extends Response {
    data: ProductMetaData
}

export interface Reply {
    id: number,
    reply: string,
    calification_id: number,
    user_id: number,
    userName: string
}

export interface Comment {
    id: number,
    comment: string,
    calification: number,
    product_id: number,
    user_id: number,
    userName: number,
    replies: Reply[]
}

export interface ProductDetail{
    product : Product, 
    comments : Comment[]
}

export interface ProductDetailedResponse extends Response {
    data: ProductDetail
}