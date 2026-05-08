// store.ts
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from 'redux-persist';

import {storage} from '~/helpers';

import authReducer from './redux/auth/slice';

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);

    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);

    return Promise.resolve();
  },
};

export const rootReducer = combineReducers({
  auth: authReducer,
});

const config = {
  key: 'root',
  storage: reduxStorage,
};

export const reducer = persistReducer(config, rootReducer);

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootStoreType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppSelector = typeof store.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector;

export default store;
