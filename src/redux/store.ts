import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../apis/products';
import cartSlice from './cartSlice';
import historySlice from './historySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


export const rootReducer = combineReducers({

  cart: cartSlice,
  history: historySlice,
  [productApi.reducerPath]: productApi.reducer,
  
  
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }).concat(productApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
