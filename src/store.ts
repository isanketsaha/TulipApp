import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loginApi } from './shared/redux/api/feature/auth/loginApi';
import userAuthReducer from './shared/redux/slices/UserAuthSlice';
import { GlobalListener } from './GlobalListener';
import GlobalAppSlice from './shared/redux/slices/GlobalAppSlice';
import { employeeApi } from './shared/redux/api/feature/employee/api';
import { commonApi } from './shared/redux/api/feature/common/api';
import CommonSlice from './shared/redux/slices/CommonSlice';
import { onboardingApi } from './shared/redux/api/feature/onboarding/api';
import { studentApi } from './shared/redux/api/feature/student/api';
import { classroomApi } from './shared/redux/api/feature/classroom/api';
import { catalogApi } from './shared/redux/api/feature/catalog/api';
import CatalogSlice from './shared/redux/slices/CatalogSlice';
import { paymentApi } from './shared/redux/api/feature/payment/api';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [onboardingApi.reducerPath]: onboardingApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [catalogApi.reducerPath] : catalogApi.reducer,
    [paymentApi.reducerPath] : paymentApi.reducer,
    userAuth: userAuthReducer,
    catalog: CatalogSlice,
    globalState: GlobalAppSlice,
    commonData: CommonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, GlobalListener, employeeApi.middleware,
       onboardingApi.middleware, commonApi.middleware, studentApi.middleware, classroomApi.middleware, catalogApi.middleware,
       paymentApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector