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
import { registerReducer } from './user/registerSlice';
import { userPreferencesReducer } from './themes/userPreferencesSlice';
import { boardsReducer } from './boards/boardsSlice';
import { supportReducer } from './support/supportSlice';
import { columnsReducer } from './columns/columnsSlice';

const persistUser = {
  key: ['user'],
  version: 1,
  storage,
  whitelist: ['refreshToken', 'accessToken', 'sid', 'userTheme', 'userAvatar'],
};
const persistUserPreferences = {
  key: ['preferences'],
  version: 1,
  storage,
  whitelist: ['userTheme', 'userAvatar'],
};

export const store = configureStore({
  reducer: {
    registration: registerReducer,
    user: persistReducer(persistUser, userReducer),
    preferences: persistReducer(persistUserPreferences, userPreferencesReducer),
    boards: boardsReducer,
    columns: columnsReducer,
    modal: modalReducer,
    support: supportReducer,
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
