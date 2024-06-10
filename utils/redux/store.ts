import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from './slices/user.slice';
import tokenReducer from './slices/token.slice';
import storage from './webStore';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: '__wsappid__',
  version: 1,
  storage,
  whitelist: ['user', 'token'],
};

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
