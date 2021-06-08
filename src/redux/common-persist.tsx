import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer} from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import { cartReducer } from './cart/cart-reducer';
import { userReducer } from './user/user-reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const cartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage,
}
const userPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    cartState : persistReducer(cartPersistConfig,cartReducer),
    userState : persistReducer(userPersistConfig,userReducer)
});

export const combinedPersistedReducers = persistReducer(persistConfig,rootReducer);
export const combinedStores = createStore(rootReducer);
export const combinedPersitors = persistStore(combinedStores)