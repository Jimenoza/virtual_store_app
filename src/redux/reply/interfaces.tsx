
export interface ReplyState {
    reply : number
}

export enum REPLY_ACTION {
    set = 'reply/set',
}

export interface ReplyAction {
    type: REPLY_ACTION,
    payload?: ReplyState,
}