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
import { paymentApi } from './shared/redux/api/feature/payment/api';
import { reportApi } from './shared/redux/api/feature/report/api';
import { auditApi } from './shared/redux/api/feature/audit/api';
import { accountApi } from './shared/redux/api/feature/account/api';
import { visualizeApi } from './shared/redux/api/feature/vizualize/api';
import { profileApi } from "./shared/redux/api/feature/profile/api"
import { dataeApi } from "./shared/redux/api/feature/data/api"

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [dataeApi.reducerPath]: dataeApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [onboardingApi.reducerPath]: onboardingApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [auditApi.reducerPath]: auditApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [visualizeApi.reducerPath]: visualizeApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    userAuth: userAuthReducer,
    globalState: GlobalAppSlice,
    commonData: CommonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      GlobalListener,
      employeeApi.middleware,
      visualizeApi.middleware,
      onboardingApi.middleware,
      commonApi.middleware,
      studentApi.middleware,
      classroomApi.middleware,
      catalogApi.middleware,
      paymentApi.middleware,
      reportApi.middleware,
      auditApi.middleware,
      accountApi.middleware,
      profileApi.middleware,
      dataeApi.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useUserState() {
  return useAppSelector((state) => state.userAuth)
}