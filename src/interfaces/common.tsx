export interface Response {
    data : any,
    error : string | null
}

export interface Props {
    navigation: any,
    route: {
        key : string,
        name: string,
        params : any
    }
}