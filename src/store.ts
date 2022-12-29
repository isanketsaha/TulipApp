import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loginApi } from './shared/redux/api/feature/auth/loginApi';
import userAuthReducer from './shared/redux/slices/UserAuthSlice';
import { finacialYearApi } from './shared/redux/api/feature/financialYear/api';
import { GlobalListener } from './GlobalListener';
import GlobalAppSlice from './shared/redux/slices/GlobalAppSlice';
import { employeeApi } from './shared/redux/api/feature/employee/api';
import { commonApi } from './shared/redux/api/feature/common/api';
import CommonSlice from './shared/redux/slices/CommonSlice';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [finacialYearApi.reducerPath]: finacialYearApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    userAuth: userAuthReducer,
    globalState: GlobalAppSlice,
    commonData: CommonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, GlobalListener, finacialYearApi.middleware, employeeApi.middleware, commonApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector