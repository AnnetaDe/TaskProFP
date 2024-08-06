import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { userReducer } from './user/userSlice';
import { modalReducer } from './modal/modalSlice';

export const persistCurrentColorScheme = {
  key: ['currentColorScheme'],
  version: 1,
  storage,
  whitelist: ['theme'],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistCurrentColorScheme, userReducer),
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
