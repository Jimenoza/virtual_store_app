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

const combinedReducers = combineReducers({cartReducer, userReducer})

export const combinedPersistedReducers = persistReducer(persistConfig,combinedReducers);
export const combinedStores = createStore(combinedPersistedReducers);
export const combinedPersitors = persistStore(combinedStores)