export function productReducer(state:any = {}, action: any) {
      switch (action.type) {
        case 'cart/set': {
          return {...state, ...action.payload};
        }
        case 'cart/delete':{
          return {};
        }
        default:{
          return {...state};
        }
      }
  }