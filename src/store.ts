import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loginApi } from './shared/redux/api/auth/loginApi';
import userAuthReducer from './shared/redux/slices/UserAuth';



export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
      userAuth : userAuthReducer,

  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loginApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector