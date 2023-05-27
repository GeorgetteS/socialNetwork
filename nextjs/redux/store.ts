import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import user from './user/userSlice';
import { authApi } from '../api/authApi/authApi';

export function makeStore() {
  return configureStore({
    reducer: { user, [authApi.reducerPath]: authApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
