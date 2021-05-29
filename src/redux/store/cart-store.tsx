import { createStore } from 'redux';
import { cartPersitedReducer } from '../reducers/cart';
import { persistStore } from 'redux-persist';

export const cartStore = createStore(cartPersitedReducer);
export const cartPersitor = persistStore(cartStore)

// export const cartStore = () =>{
//     let store =  createStore(cartPersitedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor }
// };