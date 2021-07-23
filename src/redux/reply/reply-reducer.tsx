import { ReplyAction, ReplyState } from './interfaces';

const INITIAL_STATE : ReplyState = {
  reply : 0
}

export function replyReducer(state:ReplyState = INITIAL_STATE, action: ReplyAction) {
  switch (action.type) {
    case 'reply/set': {
      return {...state, ...action.payload};
    }
    default:{
      return {...state};
    }
  }
}